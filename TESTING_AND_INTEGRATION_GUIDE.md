# Руководство администратора Portfolio Battle

Этот документ объясняет, как администратору создать и настроить игру, загрузить участников, проверить триггеры и понять, где заканчивается админка и начинается пользовательская игровая сессия.

Для разработчиков здесь также оставлены curl-примеры, Swagger UI и notes по webhook/TN Chat Assistant.

Короткая инструкция без dev-деталей: [ADMIN_GUIDE.md](ADMIN_GUIDE.md).

---

## 1. Обзор компонентов

| Компонент | Назначение | Кто вызывает |
|-----------|------------|--------------|
| **Admin API** (`/v1/portfolio-battle/admin/*`) | Создание и настройка игр, загрузка правил и участников | Админы, скрипты, интеграции |
| **Webhook** (`/v1/ai-assistant/webhook`) | Приём сообщений от TN Chat; игровой навык включается флагами и allowlist | TN Chat / ai-chat |
| **Telegram Bot** | Отдельное приложение; та же логика игры через MongoDB | Пользователи в Telegram |

Админка **не зависит** от канала доставки (TN Chat или Telegram): она только создаёт игры и настройки в MongoDB. Игровая механика (покупка/продажа, портфель, рейтинг) одна и та же и используется и в webhook, и в Telegram-боте.

### 1.1. Быстрый сценарий для администратора

Обычный порядок работы:

1. Открыть Swagger UI: `http://<host>:<port>/docs`.
2. В секции **Portfolio Battle Admin** авторизоваться через **Authorize**, если включён Bearer token.
3. Создать игру: `POST /v1/portfolio-battle/admin/games`.
4. Проверить игру в списке: `GET /v1/portfolio-battle/admin/games`.
5. Сделать игру активной, когда она готова к запуску: `PUT /v1/portfolio-battle/admin/games/{game_id}` с `{"status":"active"}`.
6. Загрузить правила: `POST /v1/portfolio-battle/admin/games/{game_id}/rules`.
7. Загрузить участников CSV: `POST /v1/portfolio-battle/admin/games/{game_id}/participants`.
8. Проверить триггеры: `GET /v1/portfolio-battle/admin/triggers`.
9. После деплоя/обновления текстов убедиться, что сообщения и картинки загружены в Mongo: запустить `python scripts/ensure_triggers_and_messages.py` в контейнере/окружении бота или сервиса.

Что админка **не делает**:

- Не создаёт активную игровую сессию пользователя напрямую.
- Не завершает активную игровую сессию пользователя напрямую.
- Не отправляет сообщения в Telegram или TN Chat.
- Не включает игровой навык в ai-chat для всех пользователей — это контролируется флагами и allowlist.

Активная пользовательская сессия создаётся движком игры, когда пользователь входит в игру (`/offerta`, `/play`, onboarding-команды). Состояние хранится в Mongo в `users_assistant.active_portfolio_battle_session`.

### 1.2. Что изменили и как теперь всё работает

Чтобы контейнер `trading-assistant-dev` стабильно стартовал и Admin API проходил автоматические проверки, внесены такие изменения:

| Где | Что сделано |
|-----|-------------|
| **config.py** | Для `POSTGRES_DSN`, `MONGO_URI`, `CHAT_BASE_URL`: пустая строка из окружения не ломает старт — используется значение из переменной `*_DEV` (из `env_file: .env.dev` в контейнере) или дефолт. Так контейнер поднимается даже когда Compose подставляет с хоста пустые `${POSTGRES_DSN_DEV}` и т.д. |
| **requirements.txt** | Добавлена зависимость `python-telegram-bot==21.7` — модуль `telegram` нужен для `triggers_updater` и `telegram_chat_client`. Без него при импорте возникал `ModuleNotFoundError: No module named 'telegram'`. |
| **admin_routes.py** | В `create_game_endpoint` убран лишний `import logging` внутри блока `except`. Из‑за него переменная `logging` считалась локальной во всей функции и при первом вызове `logging.getLogger(__name__)` возникал `UnboundLocalError` → ответ 500 на `POST /games`. |
| **scripts/test_admin_api.py** | При ошибке «Connection reset by peer» (Errno 104) выводится подсказка: проверить `docker compose ps` и логи контейнера. |

**Как теперь запускать и тестировать:**

1. В корне проекта должен быть файл **`.env.dev`** с нужными переменными (в т.ч. `POSTGRES_DSN_DEV`, `MONGO_URI_DEV`, `WEBHOOK_AUTH_TOKEN_DEV` и др.).
2. Запуск контейнера (порт 7001):
   ```bash
   docker compose -f docker-compose-A6000.yml up -d trading-assistant-dev
   ```
   Опционально, чтобы убрать предупреждения Compose про «variable is not set», перед этим выполнить: `set -a && source .env.dev && set +a`.
3. Подождать 10–20 секунд. В логах должно появиться `Application startup complete` и `Uvicorn running on http://0.0.0.0:7000`. Health check может сообщить о сбоях postgres/rag — приложение при этом продолжает работать; Admin API (MongoDB) доступен.
4. Автоматическая проверка Admin API:
   ```bash
   python3 scripts/test_admin_api.py
   ```
   Скрипт читает токен из `.env.dev` (или `.env`), по умолчанию дергает `http://localhost:7001`. Ожидаемый результат: все пункты OK (POST /games → 201, остальные → 200, в конце «Все проверки пройдены»).

Если при запросах приходит «Connection reset by peer», контейнер мог перезапускаться или только что подняться — проверьте `docker compose -f docker-compose-A6000.yml ps` и логи; повторите тесты после стабильного старта.

---

## 2. Авторизация

- **Переменные:** `WEBHOOK_AUTH_TYPE` (или для dev — из `.env.dev`), `WEBHOOK_AUTH_TOKEN` / `WEBHOOK_AUTH_TOKEN_DEV`.
- **Режимы:**
  - `WEBHOOK_AUTH_TYPE=none` — проверка отключена (удобно для dev).
  - `WEBHOOK_AUTH_TYPE=bearer` — нужен заголовок `Authorization: Bearer <token>`.
- И **Admin API**, и **webhook** используют один и тот же тип и токен.
- Если токен не задан, проверка для админки не выполняется (для удобства разработки).
- **PORTFOLIO_BATTLE_WEBHOOK_ENABLED** — master-флаг игры в webhook/SSE. По умолчанию `0`/`false`: webhook ведёт себя как обычный ассистент.
- **PORTFOLIO_BATTLE_AGENT_SDK_ENABLED** — включает новый путь через Portfolio Battle SDK agent. Если выключен, остаётся прямой fallback через `PortfolioBattleEngine`.
- **trading_assistant/data/portfolio_battle/id_allow.txt** — allowlist пользователей для ai-chat game skill. Telegram-бот этот allowlist не использует.

---

## 3. Тестирование Admin API

Базовый URL (пример): `http://localhost:7000` или ваш хост (например `http://localhost:7001` для dev).  
Префикс админки: `/v1/portfolio-battle/admin`.

### 3.0. Важные сущности

- **Игра** хранится в `portfolio_battle_games`. Её создают и обновляют через Admin API.
- **Участник** хранится в `portfolio_battle_participants` по `game_id` + `chat_id`. CSV участников создаёт участников, но не запускает им активную сессию.
- **Активная сессия пользователя** хранится отдельно: `users_assistant.active_portfolio_battle_session`. Админка её не создаёт и не удаляет.
- **Портфель и сделки** хранятся в `portfolio_battle_positions`, `portfolio_battle_actions`, `portfolio_battle_rankings`; ими управляет игровой движок.
- **Тексты и картинки сообщений** хранятся в Mongo `portfolio_battle_messages`, а исходники лежат в `trading_assistant/data/portfolio_battle/default_messages_*.json` и `trading_assistant/data/portfolio_battle/message_images/`.

### 3.1. POST — создание игры

**Endpoint:** `POST /v1/portfolio-battle/admin/games`  
**Тело (JSON):**

```json
{
  "game_id": "season_1",
  "name": "Portfolio Battle Season 1",
  "status": "scheduled",
  "start_date": "2024-01-15T00:00:00Z",
  "end_date": "2024-02-14T23:59:59Z",
  "warmup_start_date": "2024-01-08T00:00:00Z",
  "initial_balance": 25000,
  "currency": "USD",
  "max_balance": 25000,
  "allowed_tickers": ["AAPL", "GOOGL", "MSFT"],
  "rebalance_frequency": "daily",
  "prizes": {
    "top_1": 50,
    "top_5": 20,
    "top_20": 5,
    "top_100": 1
  }
}
```

Поля `start_date`, `end_date`, `warmup_start_date`, `max_balance`, `allowed_tickers`, `prizes` — опциональны.  
**Ожидаемый ответ:** `201 Created`, тело — созданная игра (в т.ч. `game_id`).

**curl:**

```bash
curl -X POST "http://localhost:7000/v1/portfolio-battle/admin/games" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"game_id":"season_1","name":"Season 1","status":"scheduled","initial_balance":25000,"currency":"USD"}'
```

---

### 3.2. GET — список игр

**Endpoint:** `GET /v1/portfolio-battle/admin/games`  
**Query (опционально):** `status_filter` — одно из: `scheduled`, `active`, `completed`, `cancelled`.

**Пример:** `GET /v1/portfolio-battle/admin/games?status_filter=active`

**Ответ:** JSON с полями `games` (массив игр) и `total` (число).

**curl:**

```bash
curl -X GET "http://localhost:7000/v1/portfolio-battle/admin/games?status_filter=scheduled" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 3.3. GET — одна игра

**Endpoint:** `GET /v1/portfolio-battle/admin/games/{game_id}`

**Пример:** `GET /v1/portfolio-battle/admin/games/season_1`

**Ответ:** Объект игры или `404 Not Found`.

**curl:**

```bash
curl -X GET "http://localhost:7000/v1/portfolio-battle/admin/games/season_1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 3.4. PUT — обновление игры

**Endpoint:** `PUT /v1/portfolio-battle/admin/games/{game_id}`  
**Тело (JSON):** все поля опциональны, например:

```json
{
  "name": "Season 1 (updated)",
  "status": "active",
  "start_date": "2024-01-15T00:00:00Z"
}
```

**Ответ:** Обновлённая игра или `404`.

**curl:**

```bash
curl -X PUT "http://localhost:7000/v1/portfolio-battle/admin/games/season_1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"active"}'
```

---

### 3.5. POST — сохранение правил

**Endpoint:** `POST /v1/portfolio-battle/admin/games/{game_id}/rules`  
**Тело (JSON):**

```json
{
  "rules_text": "Правила игры.\nНачало: 15.01.2024\nКонец: 14.02.2024\nНачальный баланс: 25000 USD\nТоп 1: 50 акций\nТоп 5: 20\nТоп 20: 5\nТоп 100: 1\nРебалансировка раз в сутки.\nРазрешенные тикеры: AAPL, GOOGL, MSFT",
  "updated_by": "admin_123"
}
```

**Ответ:** Сохранённые настройки (в т.ч. распарсенные правила). Парсер извлекает даты, призы, баланс, тикеры, ребалансировку.

**curl:**

```bash
curl -X POST "http://localhost:7000/v1/portfolio-battle/admin/games/season_1/rules" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"rules_text":"Начало: 15.01.2024\nКонец: 14.02.2024\nБаланс: 25000 USD\nТоп 1: 50 акций"}'
```

---

### 3.6. GET — настройки игры

**Endpoint:** `GET /v1/portfolio-battle/admin/games/{game_id}/settings`

**Ответ:** Объект с `rules_text`, `rules_parsed`, `participants_csv` (если есть), `updated_at` и т.д.

**curl:**

```bash
curl -X GET "http://localhost:7000/v1/portfolio-battle/admin/games/season_1/settings" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 3.7. POST — загрузка участников (CSV)

**Endpoint:** `POST /v1/portfolio-battle/admin/games/{game_id}/participants`  
**Content-Type:** `multipart/form-data`  
**Поля:** `file` — CSV-файл (одна строка = один `chat_id`), опционально `updated_by`.

Важно:

- Для Telegram обычно используется `chat_id` в формате `tg_<telegram_user_id>` или тот формат, который уже использует бот в Mongo.
- Для TN Chat / ai-chat используйте тот `chat_id`, который приходит в webhook.
- Загрузка CSV создаёт записи участников и начальные балансы, но пользователь всё равно должен войти в игру через игровой flow (`/start`, `/offerta`, `/play` или onboarding-фразу).
- Если участник уже есть для `game_id` + `chat_id`, повторная загрузка не сбрасывает его портфель.

**Пример CSV:**

```text
chat_id_1
chat_id_2
chat_id_3
```

**Ответ:** JSON с полями `game_id`, `total_chat_ids`, `created_participants`, `uploaded_at`.

**curl:**

```bash
curl -X POST "http://localhost:7000/v1/portfolio-battle/admin/games/season_1/participants" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@participants.csv"
```

**Автоматический прогон:** `python3 scripts/test_admin_api.py` или `./scripts/run_admin_tests.sh` (токен и BASE_URL из `.env.dev`/`.env`).

---

### 3.7.1. Тексты и картинки сообщений

Команды `/about`, `/faq`, `/menu`, триггеры и баннеры берут тексты из Mongo collection `portfolio_battle_messages`.

Runtime-источники в репозитории:

- `trading_assistant/data/portfolio_battle/default_messages_ru.json`
- `trading_assistant/data/portfolio_battle/default_messages_en.json` (если есть в текущей ветке)
- `trading_assistant/data/portfolio_battle/message_images/`

После деплоя или изменения JSON/картинок нужно синхронизировать Mongo:

```bash
python scripts/ensure_triggers_and_messages.py
```

В Docker-контейнере бота пример:

```bash
docker exec telegram-bot-portfolio-battle python scripts/ensure_triggers_and_messages.py
```

Если в командах пустой текст или пропали картинки, сначала проверьте, что:

1. Скрипт синхронизации был запущен против правильной MongoDB.
2. Каталог `trading_assistant/data/portfolio_battle/message_images/` попал в контейнер/образ.
3. В Mongo нет старых битых `image`-путей; актуальный код предпочитает PNG из репозитория, если файл есть.

---

### 3.8. GET — список триггеров

**Endpoint:** `GET /v1/portfolio-battle/admin/triggers`  
**Query (опционально):** `status_filter` — `active` или `inactive`; `game_id` — фильтр по аудитории (триггеры, применимые к этой игре).

**Ответ:** `{ "triggers": [...], "total": N }`. Каждый триггер: `trigger_id`, `trigger_event`, `message_id`, `condition`, `action_time`, `status`, при необходимости `audience` (`game_ids`, `exclude_chat_ids`).

**curl:**

```bash
curl -X GET "http://localhost:7000/v1/portfolio-battle/admin/triggers?status_filter=active" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 3.9. GET — один триггер

**Endpoint:** `GET /v1/portfolio-battle/admin/triggers/{trigger_id}`

**Пример:** `GET /v1/portfolio-battle/admin/triggers/9` (daily_update).

**Ответ:** Объект триггера или `404 Not Found`.

---

### 3.10. PUT — обновление триггера

**Endpoint:** `PUT /v1/portfolio-battle/admin/triggers/{trigger_id}`  
**Тело (JSON):** все поля опциональны:

- **status** — `active` | `inactive` (включить/выключить отправку).
- **action_time** — время или режим отправки, например `"09:00"`, `"раз в сутки"`, `"мгновенно"`.
- **audience** — аудитория:
  - **game_ids** — массив `game_id`; пустой или отсутствует = все игры.
  - **exclude_chat_ids** — массив `chat_id`, которым не отправлять этот триггер.

**Пример тела:**

```json
{
  "status": "inactive",
  "action_time": "09:00",
  "audience": {
    "game_ids": ["auto_game_1768214049"],
    "exclude_chat_ids": ["tg_358377512"]
  }
}
```

**Ответ:** Обновлённый триггер или `404`.

**curl:**

```bash
curl -X PUT "http://localhost:7000/v1/portfolio-battle/admin/triggers/9" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"active","action_time":"09:00"}'
```

Использование полей в движке:

- **status** — учитывается сразу: только триггеры со статусом `active` выбираются при отправке.
- **action_time** — используется в проверке условий (например, «раз в сутки», «09:00») в `portfolio_battle_triggers.check_trigger_condition`.
- **audience** — сохраняется в БД; фильтрация по `game_ids` и `exclude_chat_ids` в планировщике может быть добавлена в следующих версиях (сейчас глобальное исключение — через `TRIGGER_EXCLUDE_CHAT_IDS` в env).

---

## 4. Тестирование через Swagger UI

- Откройте в браузере: `http://<host>:<port>/docs` (например `http://localhost:7000/docs`).
- Секция **Portfolio Battle Admin** содержит все перечисленные выше endpoints.

**Авторизация в Swagger:**

- Если в приложении включён Bearer (`WEBHOOK_AUTH_TYPE=bearer` и задан токен):
  - Нажмите **Authorize** (если отображается) и введите значение: `Bearer YOUR_TOKEN` или просто `YOUR_TOKEN`.
  - Либо в каждом запросе вручную заполните заголовок **Authorization** тем же значением.
- Для dev можно отключить проверку: `WEBHOOK_AUTH_TYPE=none` — тогда кнопка Authorize и заголовок не обязательны.

**Порядок проверки в Swagger (пример):**

1. `POST /games` — создать игру.
2. `GET /games` — убедиться, что игра в списке.
3. `GET /games/{game_id}` — получить одну игру.
4. `PUT /games/{game_id}` — обновить (например `status: "active"`).
5. `POST /games/{game_id}/rules` — сохранить правила.
6. `GET /games/{game_id}/settings` — проверить настройки.
7. `POST /games/{game_id}/participants` — загрузить CSV (выбрать файл в форме).
8. **Триггеры:** `GET /triggers` — список, `GET /triggers/{trigger_id}` — один, `PUT /triggers/{trigger_id}` — обновить (status, action_time, audience).

---

## 5. Webhook: интеграция с TN Chat Assistant

Webhook — это точка входа, через которую **TN Chat** отправляет сообщения пользователя в AI Assistant. Ответы пользователю не возвращаются в теле ответа webhook, а отправляются обратно в чат через **Chat Server**.

### 5.1. Схема взаимодействия (Chat → Assistant → Chat)

1. **Chat → Assistant (получение вопроса)**  
   - **Endpoint:** ваш webhook URL (например `https://your-assistant.example.com/v1/ai-assistant/webhook`).  
   - **Method:** `POST`.  
   - **Тело запроса** (совместимо с [AI Assistant Webhook Integration](https://file.notion.so/f/f/d9049561-f2eb-4191-8d1d-29f78e66a8a1/fba37d65-f5d1-42ce-bece-3eae581a2dca/AI_Assisntant_Webhook_Integration.pdf)):

```json
{
  "chat_id": "chat123",
  "question_id": "msg789",
  "message": "Сколько времени занимает открытие счета?",
  "reception": 35,
  "original_user_id": 123456,
  "author": "123456",
  "properties": { "key1": "value1" },
  "context": [
    { "chat_id": "chat123", "question_id": "msg001", "message": "Здравствуйте!", "author": "123456" }
  ]
}
```

- **Ответ:** HTTP 200 в течение 3 секунд (без тела ответа пользователю — он идёт через Chat Server).

2. **Assistant → Chat (статус и ответ)**  
   - Assistant вызывает **Chat Server** (адрес задаётся в `CHAT_BASE_URL` / `SUPPORT_AI_BASE_URL`):
     - статус: `POST {chat_server}/v1/support/ai/2/status`
     - ответ: `POST {chat_server}/v1/support/ai/2/response`
   - В коде: `trading_assistant/services/chat_client.py` — `ChatClient.post_status`, `ChatClient.post_response`.
   - В PDF-спецификации могут быть указаны пути вида `/v1/support/webhook/status` и `/v1/support/webhook/response` — фактические пути в приложении приведены выше.

Окружения Chat (из документации):  
- Тест: `https://tradernet-chat-test.tradernet.com`  
- Prod: `https://tradernet-chat.tradernet.com`

### 5.2. Где в коде обрабатывается webhook и игра

- Входная точка: `POST /v1/ai-assistant/webhook` в `trading_assistant/api/routes.py`.
- Авторизация: та же, что и для админки (`WEBHOOK_AUTH_TYPE`, `WEBHOOK_AUTH_TOKEN`).
- Обработка игры в webhook выполняется **только при** `PORTFOLIO_BATTLE_WEBHOOK_ENABLED=1` (или `true`). Иначе webhook ведёт себя как обычный ассистент.
- Новый путь через SDK-агента включается отдельно: `PORTFOLIO_BATTLE_AGENT_SDK_ENABLED=1`.
- Для ai-chat игровой навык дополнительно ограничен allowlist: `trading_assistant/data/portfolio_battle/id_allow.txt`.
- Если SDK game agent включён и пользователь разрешён allowlist, routing идёт через стандартный agent pipeline (`trading_assistant/agents/orchestrator.py`) к `portfolio_battle_agent`.
- Если SDK game agent выключен или gate не прошёл, остаётся fallback: активная игровая сессия или onboarding-команда обрабатываются напрямую через `PortfolioBattleEngine.handle_user_input`.
- Ответ пользователю уходит в чат через `ChatClient.post_response` (и при необходимости `post_status`).

Для администратора это означает: создать игру и участников через Admin API недостаточно, чтобы пользователь в ai-chat сразу увидел игровой навык. Нужны флаги окружения, allowlist и вход пользователя в игровой flow.

### 5.3. Тестирование webhook вручную (curl)

Проверка приёма запроса (без обязательной игровой сессии):

```bash
curl -X POST "http://localhost:7000/v1/ai-assistant/webhook" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "chat_id": "test_chat_123",
    "question_id": "msg_001",
    "message": "Привет",
    "reception": 35,
    "original_user_id": 123456,
    "author": "123456"
  }'
```

Ожидание: HTTP 200. Ответ пользователю в чат при этом уходит через Chat Server (если настроен `CHAT_BASE_URL` и доступна отправка ответа).

---

## 6. Связь админки с Telegram-ботом и TN Chat Assistant

### 6.1. Общая картина

- **Админка (Admin API)** — только управление играми и настройками в MongoDB (игры, правила, участники). Не зависит от того, откуда пользователь играет (Telegram или TN Chat).
- **Одна и та же игровая механика** используется:
  - в **TN Chat / ai-chat** — через webhook (`/v1/ai-assistant/webhook`), затем через Portfolio Battle SDK agent или fallback `PortfolioBattleEngine`, ответы уходят через Chat Server;
  - в **Telegram-боте** — отдельное приложение, читает/пишет те же коллекции MongoDB и использует тот же движок (см. [README_TELEGRAM_BOT_DEPLOY.md](README_TELEGRAM_BOT_DEPLOY.md)).

### 6.2. Telegram-бот

- Развёртывается отдельно (отдельный скрипт/контейнер).
- Подключается к той же MongoDB (игры, участники, позиции, рейтинги и т.д.).
- Пользователь в Telegram идентифицируется по `chat_id` (Telegram chat id); в MongoDB участники игры хранятся по `chat_id` и `game_id`.
- Админка создаёт игру и загружает участников (в т.ч. Telegram `chat_id`); бот для этих пользователей запускает игру и обрабатывает команды.

### 6.3. TN Chat Assistant

- Чат отправляет сообщения на webhook AI Assistant.
- Assistant проверяет флаги игры, allowlist и активную игровую сессию. Если включён SDK game agent и пользователь разрешён — сообщение идёт в `portfolio_battle_agent`; иначе активная игровая сессия или onboarding-команда могут быть обработаны fallback-движком `PortfolioBattleEngine.handle_user_input`.
- Ответы уходят в чат через Chat Server (`/v1/support/ai/2/status`, `/v1/support/ai/2/response`), как в [AI Assistant Webhook Integration](https://file.notion.so/f/f/d9049561-f2eb-4191-8d1d-29f78e66a8a1/fba37d65-f5d1-42ce-bece-3eae581a2dca/AI_Assisntant_Webhook_Integration.pdf).
- Чтобы пользователь TN Chat участвовал в игре, он должен быть в списке участников (загружен через админку), быть разрешён allowlist для ai-chat game skill и иметь созданную игровую сессию в MongoDB (создаётся при входе в игру/онбординге).

### 6.4. Итог

| Действие | Админка | Telegram Bot | TN Chat (webhook) |
|----------|---------|--------------|-------------------|
| Создать игру, правила, участников | ✅ Admin API | — | — |
| Играть (портфель, сделки, рейтинг) | — | ✅ Бот → MongoDB + движок | ✅ Chat → webhook → game agent или fallback-движок → Chat Server |
| Данные игр и участников | Читает/пишет MongoDB | Читает/пишет MongoDB | Читает/пишет MongoDB |

Админка **не отправляет** сообщения в Telegram или в чат; она только подготавливает данные. Доставка сообщений — у Telegram-бота и у TN Chat (через Chat Server).

### 6.5. Управление активными сессиями пользователей

На текущий момент отдельного Admin API для ручного старта/остановки `active_portfolio_battle_session` нет.

Где хранится состояние:

- Активная игровая сессия: `users_assistant.active_portfolio_battle_session`.
- Очередь операций ребалансировки внутри сессии: `users_assistant.active_portfolio_battle_session.rebalance_session`.
- Участник игры: `portfolio_battle_participants`.
- Позиции: `portfolio_battle_positions`.

Как сессия создаётся:

- При регистрации/согласии с офертой (`/offerta`) или при `/play`, если пользователь уже участник активной/запланированной игры.

Как сессия завершается:

- Игровыми командами выхода (`/exit`, switch/«реальный портфель» и соответствующие сценарии движка), которые удаляют `active_portfolio_battle_session`.

Для тестового сброса Telegram-аккаунта есть команда `/reset` в боте. Она сбрасывает позиции и баланс участника через `telegram_reset_service.py`, но не является Admin API endpoint и требует авторизации в Telegram-боте.

---

## 7. Полезные ссылки

- **API TN Chats Connect:** [Notion — API TN Chats Connect](https://torch-scallop-990.notion.site/API-TN-Chats-Connect-2ed748784bae80279902ef7fc46a1076)
- **AI Assistant Webhook Integration (PDF):** [AI_Assisntant_Webhook_Integration.pdf](https://file.notion.so/f/f/d9049561-f2eb-4191-8d1d-29f78e66a8a1/fba37d65-f5d1-42ce-bece-3eae581a2dca/AI_Assisntant_Webhook_Integration.pdf) — формат запроса к webhook и требования (ответ 200 в течение 3 секунд, использование `chat_id` и `question_id`).
- **Деплой Telegram-бота:** [README_TELEGRAM_BOT_DEPLOY.md](README_TELEGRAM_BOT_DEPLOY.md)
- **Готовность задач Portfolio Battle:** [PORTFOLIO_BATTLE_TASKS_READINESS.md](PORTFOLIO_BATTLE_TASKS_READINESS.md)

---

## 8. Админка триггеров (события и рассылки)

Триггеры хранятся в коллекции `portfolio_battle_trigger_map` (MongoDB). Через Admin API можно:

- **Просматривать** список триггеров и один триггер по `trigger_id`.
- **Редактировать:** активность (status: active/inactive), время отправки (action_time), аудиторию (audience: game_ids, exclude_chat_ids).

Типы событий (примеры): `daily_update`, `ranking_update_top1` … `ranking_update_top1000`, `user_goal_achievement_5` … `user_goal_achievement_30`, `portfolio_more_than_25_free` / `50_free` / `75_free` (срабатывают только по событию, например после ребалансировки), `user_registration`, `portfolio_update`, `first_trade`, `trade_profit`, `trade_loss`, `user_exit_game` и др.

Отключение триггера «свободные активы» по расписанию: периодическая проверка (каждые 15 мин) отключена; триггеры `portfolio_more_than_*_free` продолжают срабатывать по событиям (например после ребалансировки в движке). Чтобы полностью отключить их для участников — выставить у соответствующих записей в `portfolio_battle_trigger_map` поле `status: "inactive"` через `PUT /admin/triggers/{trigger_id}`.

---

## 9. Краткий чек-лист тестирования

- [ ] Авторизация: при `bearer` — передать токен в Swagger или в заголовке `Authorization` в curl.
- [ ] `POST /games` — создание игры, ответ 201.
- [ ] `GET /games` и `GET /games/{game_id}` — список и одна игра.
- [ ] `PUT /games/{game_id}` — обновление (например статус `active`).
- [ ] `POST /games/{game_id}/rules` — сохранить правила, проверить ответ.
- [ ] `GET /games/{game_id}/settings` — настройки и распарсенные правила.
- [ ] `POST /games/{game_id}/participants` — загрузка CSV, проверка `created_participants`.
- [ ] `python scripts/ensure_triggers_and_messages.py` — тексты команд/триггеров и картинки синхронизированы в Mongo.
- [ ] **Триггеры:** `GET /triggers`, `GET /triggers/{id}`, `PUT /triggers/{id}` (status, action_time, audience).
- [ ] Webhook: `POST /v1/ai-assistant/webhook` с телом из п. 5.1 — ответ 200.
- [ ] Для ai-chat game skill: `PORTFOLIO_BATTLE_WEBHOOK_ENABLED=1`, при необходимости `PORTFOLIO_BATTLE_AGENT_SDK_ENABLED=1`, пользователь есть в `trading_assistant/data/portfolio_battle/id_allow.txt`.
- [ ] При наличии игровой сессии в MongoDB — отправить игровую команду через webhook и проверить ответ в чате (или логи).

---

## 10. Troubleshooting

### 10.1. Контейнер не стартует: «Could not parse SQLAlchemy URL» / «variable is not set»

При запуске `docker compose -f docker-compose-A6000.yml up` Compose подставляет переменные **с хоста** (`${POSTGRES_DSN_DEV}` и т.д.). Если на хосте они не заданы, в контейнер попадают пустые значения.

**Что сделано в коде:** см. п. **1.1** — в `config.py` для `POSTGRES_DSN`, `MONGO_URI`, `CHAT_BASE_URL` используется fallback на `*_DEV` (из `env_file: .env.dev` в контейнере) или дефолт. Контейнер стартует при корректном `.env.dev`.

**Рекомендация:** чтобы убрать предупреждения Compose и гарантировать подстановку на хосте, перед запуском загрузите `.env.dev` в текущую оболочку:

```bash
set -a && source .env.dev && set +a
docker compose -f docker-compose-A6000.yml up -d
```

Либо скопируйте/симлинкните `.env.dev` в `.env` в корне проекта — Compose по умолчанию подставляет переменные из `.env`.

### 10.2. «Connection refused» при вызове Admin API

Сервер не запущен или не слушает указанный адрес. Проверьте:

1. Контейнер запущен: `docker compose -f docker-compose-A6000.yml ps`
2. Логи без падений при старте: `docker compose -f docker-compose-A6000.yml logs trading-assistant-dev`
3. В тестах указан правильный `BASE_URL` (по умолчанию `http://localhost:7001` для порта из compose).

После исправления конфигурации или кода перезапустите сервис: `docker compose -f docker-compose-A6000.yml up -d --build trading-assistant-dev`.
