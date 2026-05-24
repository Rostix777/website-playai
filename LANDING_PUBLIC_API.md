# Публичный API Лендинга Portfolio Battle

Контракт публичного API для лендинга Portfolio Battle.

Базовые URL:

- Production: `https://play.freedomf24.com/api/v1`
- Staging: `https://staging.play.freedomf24.com/api/v1`

Публичные ссылки лендинга, которые используются в текстах бота:

- Оферта / условия: `https://rostix777.github.io/website-playai/#terms`
- Полный список тикеров: `https://rostix777.github.io/website-playai/#stocks`
- Остальные ссылки на лендинг (до уточнения): `https://rostix777.github.io/website-playai/`

Runtime-реализация находится в `trading_assistant/api/portfolio_battle_landing_routes.py`, подготовка read-only ответов из Mongo — в `trading_assistant/services/portfolio_battle_landing.py`.

## Безопасность И Транспорт

- Публичные браузерные `GET` endpoints не требуют авторизации.
- `POST /cache/invalidate` требует `Authorization: Bearer <PORTFOLIO_BATTLE_LANDING_CACHE_TOKEN>`; если отдельный token не задан, для dev-совместимости сервис использует существующий webhook token.
- Опциональный HMAC: `X-Webhook-Signature: sha256=<hex>` считается по строке `X-Webhook-Timestamp + "." + raw_body` с секретом `PORTFOLIO_BATTLE_LANDING_WEBHOOK_SECRET`. Окно защиты от replay: 5 минут.
- CORS ограничен настройкой `PORTFOLIO_BATTLE_LANDING_CORS_ORIGINS`; по умолчанию разрешены `https://play.freedomf24.com,https://staging.play.freedomf24.com`.
- Rate limit для публичных `GET`: 10 запросов/сек на IP.
- Rate limit для service token: 100 запросов/сек на token.
- При превышении лимита API возвращает `429` и header `Retry-After`.
- HTTPS обязателен на уровне edge/proxy; HTTP должен редиректиться на HTTPS с кодом `301`.

## Контракт Приватности

Ответы не должны содержать PII: email, phone, полную фамилию, account id, дату рождения, адрес, `chat_id` или `original_user_id`.

Leaderboard и winners отдают только безопасные публичные поля:

- `display_name`: формируется только на backend из public profile полей как `first_name + " " + первая буква last_name + "."`; fallback — `Anonymous`.
- `user_id`: opaque public id из `portfolio_battle_public_profiles.public_user_id` или детерминированный HMAC-derived id.
- `avatar_url`: signed CDN URL с TTL 1 час из `avatar_object_key`, либо `null`, если signing не настроен.
- `country_code`: страна резиденства участника, либо `null`. Допустимые форматы: ISO 3166-1 alpha-2 код (`"DE"`, `"KZ"`) или полное англоязычное название (`"Germany"`, `"Kazakhstan"`). Фронтенд нормализует оба формата в emoji-флаг. Источник: `portfolio_battle_public_profiles.country_code`, заполняется из KYC-данных аккаунта Freedom Finance. Не является PII — это страна резиденства, а не гражданство или точное местоположение.

## Эндпоинты

### `GET /seasons/current`

Возвращает текущий публичный сезон.

Query-параметры:

- `lang`: `en` или `ru`, по умолчанию `en`
- `include_counts`: boolean, по умолчанию `true`

Cache: `public, max-age=60, s-maxage=300, stale-while-revalidate=600`

Ответ:

```json
{
  "season_id": "s1-2026",
  "game_id": "season_1",
  "slug": "bull-run-season-1",
  "name": "Bull Run Season 1",
  "status": "active",
  "registration_status": "open",
  "starts_at": "2026-05-11T00:00:00Z",
  "ends_at": "2026-06-11T23:59:59Z",
  "server_time": "2026-05-12T16:35:00Z",
  "initial_balance": 25000,
  "currency": "USD",
  "participants_total": 4823,
  "leaderboard_update_interval_seconds": 10800,
  "prize_pool_coupons": 95,
  "reward_grid": [
    { "rank": 1, "coupons": 40 },
    { "rank": 2, "coupons": 25 },
    { "rank": 3, "coupons": 15 },
    { "rank": 4, "coupons": 10 },
    { "rank": 5, "coupons": 5 }
  ],
  "offer_version": "promotion-rules-2026-05-11-en-v1",
  "lang": "en"
}
```

### `GET /leaderboard`

Возвращает Top N, последнее место, общее число участников и изменение позиции в рейтинге. `rank_change = previous_position - current_position`; положительное значение означает, что игрок поднялся выше. Если исторического snapshot ещё нет, `rank_change` будет `null`.

Источник данных: публичный endpoint сначала использует последний `portfolio_battle_ranking_snapshots` для сезона, чтобы сохранить стабильный `rank_change`; если snapshot ещё не создан, читает live `portfolio_battle_rankings`. Live rankings пересчитываются из `portfolio_battle_participants.total_portfolio_value` / `profit_loss_percent`, которые обновляются по позициям `portfolio_battle_positions` (связь через `participant_id`, даже если у позиции нет `chat_id`).

Query-параметры:

- `season_id`: опционально, например `s1-2026`
- `limit`: по умолчанию `5`, максимум `100`
- `snapshot_at`: опциональная ISO datetime
- `lang`: `en` или `ru`, по умолчанию `en`

Cache: `public, max-age=30, s-maxage=180, stale-while-revalidate=600`

Ответ:

```json
{
  "season_id": "s1-2026",
  "snapshot_at": "2026-05-12T15:00:00Z",
  "updated_at": "2026-05-12T15:00:03Z",
  "participants_total": 4823,
  "top": [
    {
      "rank": 1,
      "user_id": "usr_pb_public1",
      "display_name": "Alexandra K.",
      "avatar_url": null,
      "country_code": "DE",
      "profit_loss_percent": 18.42,
      "portfolio_value": 29605,
      "currency": "USD",
      "rank_change": 0
    }
  ],
  "last_place": {
    "rank": 4823,
    "user_id": "usr_pb_last",
    "display_name": "Anonymous",
    "avatar_url": null,
    "country_code": null,
    "profit_loss_percent": -45.2,
    "portfolio_value": 13700,
    "currency": "USD",
    "rank_change": -87
  }
}
```

### `GET /winners`

Возвращает победителей завершённого сезона. Призовая сетка фиксированная: `40 / 25 / 15 / 10 / 5 coupons`.

Query-параметры:

- `season_id`: опционально
- `lang`: `en` или `ru`, по умолчанию `en`

Cache:

- до финализации: `public, max-age=60, s-maxage=3600, stale-while-revalidate=86400`
- после финализации: `public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400`

Ответ:

```json
{
  "season_id": "s1-2026",
  "status": "final",
  "finalized_at": "2026-06-12T08:00:00Z",
  "winners": [
    {
      "rank": 1,
      "user_id": "usr_pb_public1",
      "display_name": "Alexandra K.",
      "avatar_url": null,
      "country_code": "DE",
      "profit_loss_percent": 18.42,
      "portfolio_value": 29605,
      "currency": "USD",
      "rank_change": null,
      "coupons": 40,
      "reward_status": "granted"
    }
  ]
}
```

### `GET /tickers/allowed`

Возвращает список инструментов, доступных для торговли в игре. Это не endpoint котировок: лендинг может напрямую использовать публичный Tradernet market data API для live quotes.

Query-параметры:

- `season_id`: опционально
- `limit`: по умолчанию `1000`, максимум `3000`
- `cursor`: numeric offset cursor
- `include_performance`: boolean, по умолчанию `false`

Cache: `public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400`

Ответ:

```json
{
  "season_id": "s1-2026",
  "total": 1000,
  "next_cursor": null,
  "items": [
    {
      "ticker": "AAPL.US",
      "name": "Apple Inc.",
      "exchange": "NASDAQ",
      "currency": "USD",
      "performance": {
        "1d": 1.2,
        "1w": -0.4,
        "1m": 6.8,
        "1y": 18.1
      }
    }
  ],
  "performance_as_of": "2026-05-12T15:00:00Z"
}
```

### `POST /cache/invalidate`

Инвалидирует кэш лендинга по указанным targets. Текущая реализация возвращает принятый список targets; CDN/edge purge можно подключить за этим endpoint.

Headers:

- `Authorization: Bearer <service-token>`
- опционально `X-Webhook-Timestamp`
- опционально `X-Webhook-Signature`

Cache: `no-store`

Запрос:

```json
{
  "season_id": "s1-2026",
  "targets": ["leaderboard"],
  "reason": "admin_publish"
}
```

Ответ `202`:

```json
{
  "accepted": true,
  "invalidated": ["leaderboard"],
  "request_id": "req_..."
}
```

### `GET /offer`

Возвращает официальный legal-approved текст Promotion Rules без перефразирования. Marketing copy и тексты бота не являются валидным источником для этого endpoint.

Query-параметры:

- `season_id`: опционально
- `version`: опционально
- `lang`: `en` или `ru`, по умолчанию `en`
- `format`: `markdown`, `html` или `text`, по умолчанию `markdown`

Cache: `public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400`

Ответ:

```json
{
  "season_id": "s1-2026",
  "version": "promotion-rules-2026-05-11-en-v1",
  "lang": "en",
  "effective_from": "2026-05-11T00:00:00Z",
  "content_type": "text/markdown",
  "content": "Promotion Rules / Terms & Conditions\n\n...",
  "sha256": "..."
}
```

### `GET /disclaimer`

Возвращает юридический disclaimer для footer лендинга. Текст должен совпадать с disclaimer на основном сайте freedom24.com.

Query-параметры:

- `lang`: `en` или `ru`, по умолчанию `en`

Cache: `public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400`

Ответ:

```json
{
  "lang": "en",
  "sections": [
    {
      "type": "company_disclaimer",
      "content": "Information and analytical services and materials are provided by Freedom Finance Europe Ltd..."
    },
    {
      "type": "risk_disclosure",
      "content": "Freedom Finance Europe Ltd provides financial services within the European Union under CIF license 275/15..."
    },
    {
      "type": "access_restriction",
      "content": "Access to this site is possible worldwide. However, none of the products and services..."
    },
    {
      "type": "us_persons_restriction",
      "content": "For the avoidance of doubt, all information on this site is not addressed to..."
    }
  ],
  "updated_at": "2026-05-11T00:00:00Z"
}
```

## Источники Данных

| Поле ответа | Текущий источник | Что отсутствует / нужна ли миграция |
|---|---|---|
| `season_id` | `portfolio_battle_games.public_season_id`; fallback выводится из `game_id` и года сезона | Нужно добавить и поддерживать уникальный `public_season_id`, например `s1-2026`. |
| `game_id` | `portfolio_battle_games.game_id` | Уже есть как внутренний id. |
| `participants_total` | `count(portfolio_battle_participants where game_id + status=active)` или metadata snapshot | Count уже можно получить; snapshots рекомендуются для стабильных публичных reads. |
| `leaderboard.top` | `portfolio_battle_ranking_snapshots.items`, fallback на `portfolio_battle_rankings` | Для ненулевого `rank_change` нужны исторические snapshots. |
| `last_place` | последний item из latest snapshot, fallback на максимальную позицию из `portfolio_battle_rankings` | Текущий ranking уже может служить fallback. |
| `rank_change` | предыдущий `portfolio_battle_ranking_snapshots` | Будет отсутствовать, если snapshots ещё не заполнены. |
| `display_name`, `user_id`, `avatar_url`, `country_code` | `portfolio_battle_public_profiles` | Новая public projection collection. `country_code` из KYC-данных аккаунта (ISO 3166-1 alpha-2). |
| `winners` | `portfolio_battle_final_rankings` + `portfolio_battle_game_rewards` | Уже есть, но reward grid фиксируется публичным контрактом. |
| `allowed tickers` | `portfolio_battle_games.allowed_tickers` | Уже есть. |
| ticker names/performance | `portfolio_battle_ticker_public_stats` | Новый опциональный public stats cache. |
| offer versions | `portfolio_battle_offer_versions` | Новая legal-approved collection. |

## Формат Ошибки

```json
{
  "error": {
    "code": "season_not_found",
    "message": "Public Portfolio Battle season was not found",
    "request_id": "req_...",
    "details": {}
  }
}
```

Коды ошибок: `invalid_request`, `invalid_cursor`, `invalid_lang`, `invalid_limit`, `unauthorized`, `forbidden`, `invalid_signature`, `season_not_found`, `offer_not_found`, `snapshot_not_found`, `season_not_public`, `rate_limited`, `cache_unavailable`, `upstream_unavailable`, `internal_error`.
