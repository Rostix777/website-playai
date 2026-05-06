"""Portfolio Battle agent: engine tools + optional trading analyst as ``agent.as_tool``."""

from __future__ import annotations

import json
import logging
import time
from typing import Any

from agents import Agent, AgentBase, RunContextWrapper, function_tool, ModelSettings
from agents.agent_tool_input import StructuredToolInputBuilderOptions
from openai.types.shared import Reasoning

from trading_assistant.agents.models import GameTradingAnalysisInput, TAContext
from trading_assistant.config import settings
from trading_assistant.services.instrumentation import increment_summary_field

logger = logging.getLogger("trading_assistant.agent.portfolio_battle")


async def _dispatch_engine(ctx: TAContext, message: str) -> str:
    """Run engine once; mirror webhook responsibility for non-None text replies."""
    from trading_assistant.services.portfolio_battle_engine import PortfolioBattleEngine

    chat_id = getattr(ctx, "chat_id", None)
    qid = getattr(ctx, "question_id", None) or "agent"
    client = getattr(ctx, "chat_client", None)
    if not chat_id or client is None:
        return "Game delivery context is missing (chat_id or chat_client)."
    text = (message or "").strip()
    if not text:
        return "Empty message."
    t0 = time.perf_counter()
    try:
        reply = await PortfolioBattleEngine.handle_user_input(
            chat_id=chat_id,
            message=text,
            question_id=qid,
            chat_client=client,
            original_user_id=getattr(ctx, "original_user_id", None),
        )
        if reply:
            reply = await PortfolioBattleEngine.add_game_emoji_if_active(chat_id, reply)
            await client.post_response(chat_id, qid, reply)
        setattr(ctx, "portfolio_battle_engine_delivered_via_chat", True)
        return "Turn processed by PortfolioBattleEngine (text/media sent via chat client where applicable)."
    except Exception as exc:
        logger.exception("portfolio_battle_dispatch_failed")
        setattr(ctx, "portfolio_battle_engine_delivered_via_chat", True)
        return f"Game engine error: {exc.__class__.__name__}: {exc}"
    finally:
        try:
            increment_summary_field("portfolio_battle_engine_ms", (time.perf_counter() - t0) * 1000.0)
        except Exception:
            pass


@function_tool
async def tool_portfolio_battle_user_message(
    wrapper: RunContextWrapper[TAContext],
    user_message: str,
) -> str:
    """
    Forward the user's latest message verbatim to the deterministic game engine.
    Preserves slash commands (e.g. /menu, /portfolio, /rebalance, /exit) and natural-language forms the engine already parses.
    Call exactly once per user turn with the full user text unchanged.
    """
    ctx = getattr(wrapper, "context", None) or TAContext()
    return await _dispatch_engine(ctx, user_message)


@function_tool
async def tool_portfolio_battle_list_open_positions(
    wrapper: RunContextWrapper[TAContext],
    limit: int = 40,
) -> str:
    """
    Lazy load: return capped JSON list of open positions (ticker, qty, prices).
    Use when the user asks for portfolio breakdown; not included in the default compact snapshot.
    """
    ctx = getattr(wrapper, "context", None) or TAContext()
    chat_id = getattr(ctx, "chat_id", None)
    if not chat_id:
        return json.dumps({"error": "missing_chat_id"}, ensure_ascii=False)
    game_id = None
    pbc = getattr(ctx, "portfolio_battle_context", None)
    if pbc is not None:
        game_id = getattr(pbc, "portfolio_battle_game_id", None)
    if not game_id:
        from trading_assistant.services.portfolio_battle_engine import PortfolioBattleEngine

        try:
            sess = await PortfolioBattleEngine.get_active_session(chat_id)
        except Exception as exc:
            return json.dumps({"error": str(exc)}, ensure_ascii=False)
        if isinstance(sess, dict):
            raw_gid = sess.get("game_id")
            if raw_gid is not None:
                game_id = str(raw_gid).strip() or None
    if not game_id:
        return json.dumps({"positions": [], "note": "no_active_game_id"}, ensure_ascii=False)
    from trading_assistant.services.portfolio_battle_game_logic import list_open_positions_compact

    cap = max(1, min(int(limit), 120))
    try:
        rows = await list_open_positions_compact(game_id, chat_id, limit=cap)
    except Exception as exc:
        return json.dumps({"error": exc.__class__.__name__, "detail": str(exc)[:500]}, ensure_ascii=False)
    return json.dumps({"game_id": game_id, "count": len(rows), "positions": rows}, ensure_ascii=False)


@function_tool
async def tool_portfolio_battle_slash(
    wrapper: RunContextWrapper[TAContext],
    command: str,
) -> str:
    """
    Run a single slash command (with or without leading slash). Examples: menu, /portfolio, /leaderboard, rebalance, exit.
    Prefer ``tool_portfolio_battle_user_message`` when forwarding the raw user line is simpler.
    """
    ctx = getattr(wrapper, "context", None) or TAContext()
    cmd = (command or "").strip()
    if not cmd:
        return "Empty command."
    if not cmd.startswith("/"):
        cmd = "/" + cmd
    return await _dispatch_engine(ctx, cmd)


def build_game_trading_tool_input(options: StructuredToolInputBuilderOptions) -> str:
    """Turn structured tool args into a single user-role string for the nested trading analyst."""
    params = options.get("params")
    if isinstance(params, GameTradingAnalysisInput):
        data = params.model_dump()
    elif hasattr(params, "model_dump"):
        data = params.model_dump()
    elif isinstance(params, dict):
        data = params
    else:
        data = {"question": str(params)}
    q = (data.get("question") or "").strip()
    tick = data.get("focus_tickers") or []
    tick_line = ""
    if isinstance(tick, list) and tick:
        tick_line = "Demo-game ticker hints: " + ", ".join(str(t) for t in tick[:24]) + ".\n"
    return (
        "[Portfolio Battle nested analyst — read-only; no real orders or account actions.]\n"
        f"{tick_line}"
        f"Question:\n{q}"
    )


async def compact_game_trading_subagent_output(run_result: Any) -> str:
    """Trim nested trading agent output before returning to the game agent."""
    fo = getattr(run_result, "final_output", None)
    text = getattr(fo, "text", None) if fo is not None else None
    if isinstance(text, str) and text.strip():
        out = text.strip()
    else:
        out = (str(fo) if fo is not None else "").strip()
    cap = 6000
    if len(out) > cap:
        return out[:cap] + "\n…(truncated for game chat)"
    return out


def _game_trading_analysis_enabled(wrapper: RunContextWrapper[TAContext], agent: AgentBase) -> bool:
    ctx = getattr(wrapper, "context", None)
    return bool(getattr(ctx, "portfolio_battle_trading_analysis_tool_enabled", True))


def build_portfolio_battle_agent(trading_agent: Agent | None = None) -> Agent:
    """
    Game orchestrator agent.

    ``trading_agent`` should be the read-only game analyst from ``build_trading_agent_game_readonly``;
    it is exposed as ``game_trading_analysis`` (agent-as-tool), not as a handoff.
    """
    small = getattr(settings, "agents_model_small", None) or settings.agents_model
    tools: list[Any] = [
        tool_portfolio_battle_user_message,
        tool_portfolio_battle_slash,
        tool_portfolio_battle_list_open_positions,
    ]
    if trading_agent is not None:
        tools.append(
            trading_agent.as_tool(
                tool_name="game_trading_analysis",
                tool_description=(
                    "Nested read-only market/instruments analyst for **Portfolio Battle** only. "
                    "Use when the user needs quotes, ticker search, short instrument facts, market overview, "
                    "or curated ideas while in the game — not for scripted slash game commands or onboarding "
                    "(those go through ``tool_portfolio_battle_user_message`` verbatim). "
                    "Structured input: question + optional focus_tickers. No real orders or portfolio account actions."
                ),
                parameters=GameTradingAnalysisInput,
                include_input_schema=True,
                input_builder=build_game_trading_tool_input,
                custom_output_extractor=compact_game_trading_subagent_output,
                max_turns=8,
                is_enabled=_game_trading_analysis_enabled,
            )
        )

    return Agent(
        name="portfolio_battle_agent",
        instructions=(
            "You are the Portfolio Battle game assistant for ai-chat.\n"
            "- **Default:** call ``tool_portfolio_battle_user_message`` once with the user's message copied verbatim "
            "(including /slash commands) so the deterministic game engine handles the turn.\n"
            "- **Open positions detail:** only if the user asks for holdings/lines/sizes, call "
            "``tool_portfolio_battle_list_open_positions`` (lazy JSON); the system preamble already has a compact snapshot.\n"
            "- **Market/instruments only:** if the user clearly asks for live-style analytics (prices, "
            "ticker lookup, market overview, instrument facts) and it is not a pure game command, call "
            "``game_trading_analysis`` with a structured `question` and optional `focus_tickers` from the game.\n"
            "- Do not invent game rules or catalog copy.\n"
            "- After tools run: if the engine already delivered text/media to chat, reply with at most one short line "
            "or nothing. If you only used ``game_trading_analysis``, write the final user-facing answer yourself "
            "(concise markdown), grounded in the tool output."
        ),
        tools=tools,
        model=small,
        model_settings=ModelSettings(
            tool_choice="auto",
            max_tokens=1200,
            temperature=0.0,
            reasoning=Reasoning(effort="none"),
            verbosity="low",
        ),
    )
