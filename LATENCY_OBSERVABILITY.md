# Portfolio Battle — latency observability (baseline & game-agent flow)

This document maps **where time is spent** before further optimization work, and how to read the **metrics / trace summaries** added for Portfolio Battle (direct engine vs SDK game agent).

## 1. Latency touchpoints (current architecture)

| Stage | Location | Notes |
|--------|-----------|--------|
| **Webhook receive** | `trading_assistant/api/routes.py` → `webhook_handler` | Auth, `ensure_trace_id`, `set_request_context`, TestEngine short-circuit, then Portfolio Battle branches. |
| **Deterministic PB routing** | Same file: allowlist + `should_use_portfolio_battle_agent` | Decides **direct** `PortfolioBattleEngine` vs **background** `run_assistant` (SDK). |
| **Direct engine** | `PortfolioBattleEngine.handle_user_input` | Full command pipeline; `[TIMING]` logs in `portfolio_battle_engine.py`. |
| **Orchestrator (SDK)** | `trading_assistant/agents/orchestrator.py` → `Runner.run_streamed` + `_consume_streamed` | LLM + tools; `StatusHooks` → `record_tool_start` / `record_tool_end`. |
| **SSE stream** | `routes.py` → `assistant_stream` → `Runner.run_streamed` | Same SDK stream; tool timing via `record_tool_*` on stream events. |
| **Game tools → engine** | `portfolio_battle_agent.py` → `_dispatch_engine` | Wraps `handle_user_input` + `post_response` / media on `ChatClient`. |
| **Mongo** | Engine, triggers, messages, participants, positions | Not individually timed in hot path except existing engine `[TIMING]` sub-steps (e.g. portfolio query). Use `trace_summary.totals.db_ms` where DB instrumentation is wired. |
| **Message / image resolution** | `portfolio_battle_messages.get_message_image` (and `get_message`) | Packaged PNG first, then Mongo `image` field. **`media_resolution_ms`** in `trace_summary.extras` sums wall time per `get_message_image` call in the trace. |
| **Chat delivery** | `chat_client.py` / `telegram_chat_client.py` | `span("chat.post_response", …)` / `telegram.post_response`. |

## 2. Existing instrumentation (use as-is)

- **`trading_assistant/services/instrumentation.py`**
  - `emit(kind, **fields)` → JSON lines logger `metrics` (see `settings.metrics_log_path`, default `app_metrics.jsonl`).
  - `span(name, attrs=…)` / `async_span` → `emit("span", span=…, duration_ms=…)`.
  - `emit_summary(meta=…)` → `emit("trace_summary", totals=…, meta=…, extras=…)` at end of request/stream.
  - `add_summary_field(key, value)` → merged into `trace_summary.extras`.
  - `record_tool_start` / `record_tool_end` → per-tool durations in `trace_summary.totals.tools`.
- **`PortfolioBattleEngine`**: `logger.info("[TIMING] …")` for parse, session, handler, DB sub-phases (grep `[TIMING]` in `portfolio_battle_engine.py`).

## 3. New / extended summary & events (game flow)

Populated in **`trace_summary.extras`** (and some companion `emit`s) where applicable:

| Field | Meaning |
|--------|---------|
| **`allowlist_check_ms`** | Wall time for `is_portfolio_battle_allowed` on the **routes** path (webhook + SSE PB gate). |
| **`portfolio_battle_agent_route_ms`** | Wall time for `should_use_portfolio_battle_agent` (allowlist already applied; includes onboarding check + `get_active_session`). |
| **`game_context_load_ms`** | `load_portfolio_battle_agent_context` (Mongo read-only snapshot) when SDK game route wins. |
| **`game_agent_total_ms`** | Webhook background: wall time for `_consume_streamed` only. SSE: wall time from just before `Runner.run_streamed` until stream loop finishes (approx. agent run). |
| **`game_tool_call_ms`** | Sum of SDK tool durations from `record_tool_start` / `record_tool_end` (`get_tools_wall_time_ms()`). |
| **`portfolio_battle_engine_ms`** | Cumulative wall time inside `PortfolioBattleEngine.handle_user_input` when invoked from **`_dispatch_engine`** (SDK tool path); increments per engine call. |
| **`media_resolution_ms`** | Cumulative wall time spent in `get_message_image` (per call added). |
| **`portfolio_battle_direct_flow`** | `onboarding` \| `active_session` \| `sse_onboarding` \| `sse_active_session` for **direct** engine short-circuits. |

**Events**

- `emit("portfolio_battle_game_agent_timings", game_agent_total_ms=…, game_tool_call_ms=…)` — webhook SDK path (orchestrator) and SSE SDK path for quick greps.

**Direct webhook** returns also call `emit_summary` with `portfolio_battle_engine_ms`, `allowlist_check_ms`, `portfolio_battle_agent_route_ms`, and `portfolio_battle_direct_flow`.

## 4. How to capture a baseline (measurements first)

1. **Enable metrics file**: ensure `metrics_log_path` is writable; tail `app_metrics.jsonl` (or configured path).
2. **Correlate**: each line includes `trace_id`, `chat_id`, `question_id`, `original_user_id` when set.
3. **Webhook**
   - **Direct PB**: filter `kind=="trace_summary"` and `meta.endpoint=="webhook"` with `extras.portfolio_battle_direct_flow` set.
   - **SDK PB**: same but `run_assistant` ends with `extras.game_agent_total_ms` / `game_tool_call_ms` / `game_context_load_ms`; grep `portfolio_battle_game_agent_timings`.
4. **SSE**: `meta.original_user_id` on `trace_summary`; SDK PB uses same extras as above; direct PB uses `portfolio_battle_direct_flow` starting with `sse_`.
5. **Benchmark mode**: webhook header `X-Benchmark: 1` skips real chat HTTP (see `routes.py` comments) so wall times are not dominated by chat-webhook timeouts in dev.
6. **Compare scenarios** (same user / chat_id, same game_id if applicable):

   | Scenario | Expected route | Primary signals |
   |-----------|----------------|------------------|
   | Slash command, active session | Often **direct** engine if SDK off; else tool `tool_portfolio_battle_*` | `[TIMING]` + `portfolio_battle_engine_ms` |
   | Natural language in game | Engine NL parser or SDK agent → tool | `game_tool_call_ms`, `[TIMING] Parsed as: …` |
   | Onboarding phrase | Direct or SDK depending on flags | `portfolio_battle_direct_flow` vs `game_*` fields |
   | SDK game agent on | `should_use` true | `game_agent_total_ms`, `llm_stream_ms`, `totals.tools` breakdown |

## 5. Likely bottlenecks (hypotheses — validate with traces)

After collecting baselines, typical candidates (not ordered):

1. **Extra LLM round-trip** on SDK path vs deterministic direct engine.
2. **`should_use_portfolio_battle_agent`**: duplicate Mongo read (`get_active_session`) when routes already resolved routing (measure `portfolio_battle_agent_route_ms`).
3. **`game_context_load_ms`**: several Mongo reads (user doc, participant, rank, free %); compare with/without active session.
4. **Engine `handle_user_input`**: heavy commands (e.g. ranking with recalc) — see existing `[TIMING]` breakdown.
5. **`get_message_image`**: cold Mongo + disk; **`media_resolution_ms`** spikes.
6. **Outbound chat**: `chat.post_response` / Telegram spans vs `game_agent_total_ms`.

## 6. Optimization ideas (only after baseline — separate tasks)

Do **not** treat these as implemented; track as follow-ups once data shows pain:

- **Compact context** (already reduces prompt payload vs full positions).
- **Lazy tools** (`tool_portfolio_battle_list_open_positions`) — keep large payloads out of default prompt.
- **Deterministic slash fast path** — bypass LLM when message is clearly `/menu`-style and flags allow (product decision).
- **Hosted tool search / deferred tool loading** (OpenAI Agents SDK): see [Tools — hosted tool search](https://openai.github.io/openai-agents-python/tools/#hosted-tool-search) and [Agents as tools](https://openai.github.io/openai-agents-python/tools/#agents-as-tools) to shrink initial tool registration / discovery cost if the SDK version in use supports it.

## 7. Testing outbound chat without images (Typi)

Set **`CHAT_SUPPRESS_MEDIA_ATTACHMENTS=1`** (or `true`/`yes`) in the service environment. Restart not always required if settings are read at process start — redeploy/restart the worker after change.

- **Effect:** `ChatClient.post_response` and `StreamCaptureChatClient.post_response` strip `image`/`file` before building the JSON body; `TelegramChatClient` skips `send_photo`.
- **Restore:** unset the variable or set to `0` / `false`.

## 8. Definition of Done (latency doc deliverable)

- [x] Documented latency map + how to read `trace_summary` / `[TIMING]`.
- [x] Added summary fields / emits for game-agent and direct PB routes without changing game semantics.
- [x] Listed concrete bottleneck **hypotheses** gated on measurement.
- [x] No gameplay / routing logic changes beyond observability (and SSE `set_request_context` now passes `chat_id` for clearer metrics correlation).
