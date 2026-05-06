# 📄 AI Game | Portfolio Battle — Текстовая документация по страницам сайта

**Версия:** 1.0  
**Назначение:** Knowledge base для обучения нейросети (RAG / fine-tuning)  
**Формат:** Структурированный текст с метаданными для каждой страницы  
**Языки:** EN (master) + локализационные ноты для DE, ES, PL, EL  
**Источник истины:** Промо-правила [3], продуктовое ТЗ [2], коллекция AI GAME [1]

---

## 📋 Структура документа

Каждая страница описана по единому шаблону:
1. **Метаданные** — URL, цель, целевая аудитория
2. **Тон и стиль** — голос, эмоциональный посыл
3. **Полный текст** — секция за секцией, готовый к публикации
4. **Локализационные пометки** — что нельзя переводить дословно
5. **Юридические якоря** — ссылки на источники
6. **FAQ-фрагменты** — для семантического поиска

---

# 🏠 Страница 1: Главная (Landing) `/`

## 1.1. Метаданные
- **URL:** `/` (en по умолчанию), `/de`, `/es`, `/pl`, `/el`
- **Цель:** Конверсия в скачивание приложения и запуск игры
- **Аудитория:** Mass-market клиенты Freedom Finance Europe в Греции, Германии, Испании, Польше
- **Целевые действия:** Клик OneLink (скачать приложение) / Скан QR-кода (запуск игры в боте)
- **Состояния:** Pre-season / Live / Post-season (динамическое переключение)

## 1.2. Тон и стиль
- Голос: GQ × Forbes × Bloomberg (премиум-финансовый)
- Обращение: на «ты» (informal)
- Эмоция: FOMO (страх упущенной выгоды)
- Юмор: лёгкий, в концах секций — fun-facts

---

## 1.3. Полный текст главной страницы

### Hero Section — состояние PRE-SEASON

**Badge:**  
`Season 1 — Starts Soon`

**Headline (вариант A):**  
The AI Investment Challenge launches in [countdown]

**Subheadline:**  
$25,000 to prove it. Real stocks if you do.

**Description:**  
Build your portfolio. Outsmart the market. Win real stocks deposited to your Freedom Finance account. No deposits. No fees. Just your strategy vs. real market data.

**Primary CTA:**  
Reserve My $25K →

**Secondary CTA:**  
How It Works

**Hero Stats (4 блока):**
- 95 — Real Gift Stocks Up for Grabs
- $25K — Virtual Starting Capital
- TOP 5 — Win Real Shares
- [countdown] — Until Season Starts

**Note под Hero:**  
*Registration is already open. You can also join after the start — but every hour costs you potential return.*

---

### Hero Section — состояние LIVE

**Badge:**  
`LIVE NOW` (с пульсирующей красной точкой)

**Headline (вариант A):**  
The race is on. You can still catch up.

**Subheadline:**  
Leaderboard updates every 3 hours. The whole season is still ahead.

**Description:**  
Get your $25,000 in virtual cash and start climbing. Every move counts. Every hour matters. The market doesn't wait — neither should you.

**Primary CTA:**  
Join the Battle →

**Live Leaderboard Widget (Top 5 справа):**  
Reads from API every 60 seconds. Updates rank, avatar, display name, country flag, PnL%.

**Countdown:**  
Time until `end_at` (June 11, 2026)

---

### Hero Section — состояние POST-SEASON

**Badge:**  
`🏁 Season 1 — Closed`

**Headline:**  
Congratulations to the Champions of Season 1

**Subheadline:**  
95 gift stocks distributed. The market crowned its winners.

**Winners Podium (5 карточек):**
1. 🥇 1st place — [Name L.] [🏳️ flag] — Return: +X.XX% — 40 coupons = 40 gift stocks
2. 🥈 2nd place — [Name L.] [🏳️ flag] — Return: +X.XX% — 25 coupons = 25 gift stocks
3. 🥉 3rd place — [Name L.] [🏳️ flag] — Return: +X.XX% — 15 coupons = 15 gift stocks
4. 4️⃣ 4th place — [Name L.] [🏳️ flag] — Return: +X.XX% — 10 coupons = 10 gift stocks
5. 5️⃣ 5th place — [Name L.] [🏳️ flag] — Return: +X.XX% — 5 coupons = 5 gift stocks

**Block 2:**  
Missed Season 1? Don't miss Season 2.

**Primary CTA:**  
Pre-register for Season 2 →

**Disclaimer под подиумом:**  
*Coupons are credited to winner accounts. Gift stocks are randomly selected from the approved list at freedom24.com/gift-stocks-list. Non-transferable. No cash alternative.* [3]

---

### Live Tickers Strip

**Текстовый формат строки:**  
[Logo] AAPL $234.56 ▲ 1.42%   [Logo] NVDA $142.78 ▲ 2.15%   [Logo] TSLA $248.12 ▼ 1.34%   ...

**Disclaimer (микро-текст под полосой):**  
*Live market data shown for informational purposes only. Does not constitute investment advice.* [3]

---

### Why You Should Be In This Game (Benefits Grid)

**Section title:**  
Why You Should Be In This Game

**Section subtitle:**  
Spoiler: doing nothing is the only losing strategy here.

**Card 1 — Real Prizes, Zero Investment**  
95 real gift stocks distributed among the top 5 traders. No deposit, no fees, no hidden costs. Your only investment is your intellect.

**Card 2 — Test Your Hypotheses**  
That "brilliant" stock idea you had at 3AM? Now you can test it with $25K in virtual cash instead of your savings. You're welcome.

**Card 3 — Level Up Your Financial IQ**  
Learn portfolio management by actually doing it. No textbooks. No boring lectures. Just real market data and real decisions.

**Card 4 — AI-Powered Experience**  
Trade through our AI Assistant — the same kind of technology hedge funds pay millions for. You get it for free. For now.

**Card 5 — Short Selling Included**  
Think a stock is overpriced? Short it. Because real investing isn't just about buying — it's about being right [2].

**Card 6 — Compete Across Europe**  
You're not just playing against yourself. Thousands of traders across Europe are in the ring. Where do you rank?

---

### How It Works Timeline (4 шага)

**Section title:**  
From Zero to Portfolio Hero in 4 Steps

**Step 01 — Get Invited**  
Check your email, push notifications, or app stories. If you see the invite — you're in the club. Don't have an invite? Open a Freedom Finance account. It takes 5 minutes.

**Step 02 — Accept the Challenge**  
Open the AI Bot. Hit `/start`. Accept the terms. Hit `/play`. You now have $25,000 in virtual cash. Feel powerful yet?

**Step 03 — Build Your Portfolio**  
Choose from approximately 1,000 stocks available in the Bot [2]. Buy. Sell. Short. The market is live. Your moves are tracked. Leaderboard updates every 3 hours [2].

**Step 04 — Win Real Gift Stocks**  
The season ends June 11, 2026. Final standings are locked. The TOP 5 traders receive coupons credited to their Freedom Finance account. Open each coupon → a randomly selected real stock lands in your portfolio [3].
- 1st place → 40 coupons → 40 gift stocks
- 2nd place → 25 coupons → 25 gift stocks
- 3rd place → 15 coupons → 15 gift stocks
- 4th place → 10 coupons → 10 gift stocks
- 5th place → 5 coupons → 5 gift stocks

Stocks are randomly selected from an approved list. Once credited — they're yours [3].

---

### Prizes Podium

**Section eyebrow:**  
Season 1 · Rewards

**Section title:**  
Five Spots. Ninety-Five Real Stocks. One Leaderboard.

**Section subtitle:**  
No participation prizes. No consolation rounds. Only the top 5 walk away with shares. Where will you finish?

**Podium cards:**

🥇 1st Place  
40 coupons = 40 gift stocks  
*The market bows to one trader.*

🥈 2nd Place  
25 coupons = 25 gift stocks  
*A photo finish never felt so rewarding.*

🥉 3rd Place  
15 coupons = 15 gift stocks  
*Bronze on paper. Gold in your portfolio.*

4th Place  
10 coupons = 10 gift stocks  
*Top 5 out of thousands. Not bad at all.*

5th Place  
5 coupons = 5 gift stocks  
*You made the cut. The market noticed.*

---

### Coupons Explainer Flow

**Section title:**  
How Coupons Work

**Flow:**  
🏆 You finish in top 5 → 🎟️ Coupons hit your account → 🎁 You open each coupon → 📈 Real stock lands in your portfolio

**Note:**  
One coupon = one randomly selected gift stock from our approved list at freedom24.com/gift-stocks-list. The moment a stock is credited — it's yours to hold, sell, or stack [3].

---

### Transparency Block

**Card 1 — 🎯 Winners by Performance**  
Your rank is decided by virtual portfolio return — not by luck, not by random draws. The market is the only judge [3].

**Card 2 — 🎲 Stocks by Random Allocation**  
Specific gift stocks are drawn at random from the approved list. You can't pick the issuer — but every stock on the list is real, tradeable, and yours to keep [3].

**Card 3 — ⚖️ Weighted by Value**  
Higher-value securities have a lower probability of being allocated. Lower-value securities — higher. Fair, transparent, automated [3].

**Card 4 — 🔒 Non-Transferable**  
Coupons and gift stocks are tied to your account. No cash alternative. No transfers. But once a stock is credited — do whatever you want with it [3].

---

### Tie-breaker Card

**Title:** ⚡ What if there's a tie?

**Body:**  
If two traders post identical returns, the one who got there **first in time** takes the higher rank [3]. Speed of conviction matters.

---

### Live Leaderboard Preview (только в Live state)

**Section title:**  
Live Leaderboard

**Subtitle:**  
Updated every 3 hours. Where do you stand? [2]

**Table header:**  
Rank | Player | Return % | Portfolio Value

**Footer:**  
View Full Leaderboard →

---

### QR Join Block (desktop only)

**Title:**  
Scan. Play. Win.

**Description:**  
One scan opens the AI chat and launches the game instantly.

**Fallback link:**  
Or tap here on mobile →

---

### FOMO Banner

**Body:**  
🔥 Only **5 spots** get rewarded. Thousands are competing. Every day you sit out, someone else climbs the leaderboard.

**CTA:**  
Claim Your Spot →

---

### FAQ Accordion (top 8)

См. Страницу FAQ ниже.

---

### Final CTA Section

**Title:**  
Still Thinking About It?

**Body:**  
While you're reading this, someone in Warsaw just went long on Tesla and someone in Athens just shorted a meme stock. The market doesn't wait. Neither should you.

**CTA:**  
Join the AI Investment Challenge →

**Subtext:**  
Free · No deposit · Takes 60 seconds

---

### Fun Fact Card (закрывающий блок)

**Title:** 💡 Fun Fact

**Body:**  
In 1999, a chimpanzee named Raven outperformed 6,000 professional brokers by throwing darts at a board of stock names. Her portfolio gained 213%.  
*Think you can beat a chimp? Prove it.*

---

### Footer Disclaimer

⚠️ This promotion does not constitute investment advice. Past performance is not indicative of future results. Virtual trading results do not guarantee real-world outcomes. Participation is free and requires no deposit [3].

© 2026 Freedom Finance Europe Ltd. All rights reserved.

---

## 1.4. Локализационные пометки
- Названия "AI Investment Challenge", "Portfolio Battle", "Freedom Finance Europe" — НЕ переводятся
- Сумма "$25,000 USD" — формат сохраняется во всех языках [2]
- Призовая раскладка 40/25/15/10/5 — числа неизменны во всех языках [3]
- Даты "May 11 – June 11, 2026" — формат локализуется через Intl.DateTimeFormat [3]

---

# 🛠️ Страница 2: How It Works `/how-it-works`

## 2.1. Метаданные
- **URL:** `/how-it-works`
- **Цель:** Объяснить полный путь пользователя — от приглашения до получения призов
- **Длина:** Long-form (3000-4000 слов)

## 2.2. Полный текст

### H1
How the AI Investment Challenge Works

### Intro
Three weeks. $25,000 in virtual cash. Real stocks for the top 5. Here's everything you need to know — broken down step by step, with no fluff.

---

### Section: Who Can Play?

To participate in the AI Investment Challenge, you need to meet three simple criteria [3]:

1. **Be at least 18 years old.** No exceptions. This is a financial product and adult content.
2. **Be a client of Freedom Finance Europe Ltd.** If you don't have an account yet, open one — it takes 5 minutes and is free.
3. **Receive an invitation.** Invitations are sent via email, push notifications, in-app pop-ups, or stories notifications.

Employees of Freedom Finance Europe and their immediate family members are not eligible [3].

The Organizer reserves the right to refuse or terminate participation at its sole discretion in case of breach of these Rules or applicable law [3].

---

### Section: How to Start

Step 1: **Get the invitation.** Check your email, app notifications, or stories. The invitation contains a direct link to the AI Bot.

Step 2: **Open the Bot.** Tap the link. The Freedom Finance AI Assistant opens.

Step 3: **Accept the terms.** You'll see a button "I agree to the terms of the offer". Tap it. By doing so, you confirm that you've read and accepted the Promotion Rules [3].

Step 4: **Start playing.** Hit `/play`. Your virtual portfolio with $25,000 USD is created instantly [2].

There's no deposit. No fees. No hidden costs. Participation is completely free [3].

---

### Section: Your Virtual Portfolio

When you start, you receive **USD 25,000 in virtual funds** [2][3]. These funds:
- Have no monetary value [3]
- Cannot be withdrawn or exchanged for real money [3]
- Exist only inside the Promotion [3]
- Are reset to zero when the season ends

Think of it as a sandbox. You get the full freedom of the market without the financial risk.

---

### Section: What You Can Trade

You can trade approximately 1,000 stocks available in the Bot [2]. The exact list is curated and approved by the Organizer.

**Allowed:**
- Long positions (buying stocks) [2]
- Short positions (betting against a stock) [2]
- Market orders [2]

**Not allowed:**
- Leverage [2]
- Limit/stop orders (MVP simplification)
- Crypto, derivatives, options
- Any instrument not on the Bot's approved list

There are no commissions and no slippage in the simulation [2]. The price you see is the price you trade.

---

### Section: Rebalancing — Choose Wisely

You can rebalance your portfolio **at any time during the Promotion Period — but no more than once during the entire Promotion Period** [3].

This is the single most important strategic constraint. You don't get to course-correct multiple times. You build your initial portfolio, watch it ride the market, and have exactly one chance to reshape it before the season closes.

**Strategic implications:**
- Don't rebalance too early — you might want that ammunition later
- Don't rebalance too late — markets can move fast in the final week
- Watch the leaderboard, watch the news, then act

---

### Section: How Performance Is Calculated

Your portfolio performance is calculated based on the total value of your virtual portfolio at the end of the Promotion Period [3].

**The math:**
```
Equity = Cash + Market Value of All Positions
PnL% = (Equity − 25,000) / 25,000 × 100
```

**Price source:**  
Instrument prices are determined by the Organizer's Electronic Trading Platform using official closing prices on the final trading day [3].

**Ranking:**  
Rankings are based **solely** on virtual portfolio return [3]. There are no bonus points, no engagement multipliers, no luck factor.

**Tie-breaker:**  
In the event of a tie, rankings are determined based on the participant who achieved the relevant portfolio performance **first in time** [3].

---

### Section: How Often the Leaderboard Updates

The leaderboard is recalculated every 3 hours throughout the Promotion Period [2]. Each snapshot captures:
- Your current equity
- Your PnL%
- Your rank relative to all participants
- Your country and display name

Snapshots are stored, but only the **final snapshot at the end of the Promotion Period** determines winners [3].

---

### Section: Prizes — How Top 5 Are Rewarded

Per Section 7 of the Promotion Rules, rewards are granted as follows [3]:

| Rank | Coupons | Gift Stocks |
|------|---------|-------------|
| 1st | 40 | 40 |
| 2nd | 25 | 25 |
| 3rd | 15 | 15 |
| 4th | 10 | 10 |
| 5th | 5 | 5 |

**Total:** 95 gift stocks distributed across the top 5 finishers.

**One coupon entitles you to one gift stock** [3]. Coupons are credited to your Freedom Finance account at the end of the season. When you open a coupon, a real stock is credited to your account [3].

---

### Section: How Gift Stocks Are Selected

Gift stocks are selected at **random** from an approved list published at https://freedom24.com/gift-stocks-list [3]. **You cannot choose the issuer** [3].

The allocation uses an automated random selection mechanism with internal weighting [3]:
- **Higher-value securities** are allocated with **lower probability**
- **Lower-value securities** are allocated with **higher probability**

This is by design — to ensure fair distribution across the prize pool.

**Important clarification:**  
The random allocation mechanism applies **solely to the distribution of gift stocks**. It does **not** influence the determination of winners, which is based exclusively on performance criteria [3].

---

### Section: Once You Receive the Stocks

When a gift stock is credited to your account, you acquire the right to dispose of it at your own discretion [3]. You can:
- Hold it
- Sell it
- Use it as part of your real investment portfolio

**The price of the gift stock is determined as of the date the gift stock is credited to your account** [3].

---

### Section: What's Not Allowed

- **Cash alternatives:** Not available [3]
- **Transferability:** Entitlements to gift stocks are non-transferable [3]
- **Multiple accounts per person:** One user, one season [2]

---

### Section: Taxes

Any tax obligations arising from participation in the Promotion or receipt of rewards are **the sole responsibility of the participant** [3].

We strongly recommend consulting a qualified tax advisor in your country of residence before the rewards are credited.

---

### Section: What If Something Goes Wrong?

The Organizer reserves the right to amend these Rules or terminate the Promotion where required for legal, regulatory, or operational reasons [3].

If you experience a technical issue:
- Contact Freedom Finance support
- Reference your participation in the AI Investment Challenge
- Provide your registered email and approximate time of the issue

---

### Closing Fun Fact
💡 *In ancient Rome, only the top 3 chariot racers got crowned. We're feeling generous — we crown 5. Don't waste it.*

---

# 🏆 Страница 3: Prizes `/prizes`

## 3.1. Метаданные
- **URL:** `/prizes`
- **Цель:** Полная прозрачность призовой механики
- **Юридическая опора:** Раздел 7 Promotion Rules [3]

## 3.2. Полный текст

### H1
What's at Stake

### Subtitle
95 real gift stocks. Distributed by performance. Allocated by transparent randomization. Non-transferable. No cash alternative.

---

### Section: The Prize Grid

**One leaderboard. Five spots. Ninety-five gift stocks.**

| Rank | Coupons | = Gift Stocks |
|------|---------|---------------|
| 🥇 1st | 40 | 40 real shares |
| 🥈 2nd | 25 | 25 real shares |
| 🥉 3rd | 15 | 15 real shares |
| 4th | 10 | 10 real shares |
| 5th | 5 | 5 real shares |

The grid above is fixed. It does not change based on number of participants. The top 5 take everything [3].

---

### Section: How Coupons Work

A **coupon** is your ticket to a gift stock. Here's the flow:

1. **Season ends** → Final leaderboard is locked
2. **Coupons credited** → Your earned coupons appear in your Freedom Finance account [3]
3. **Open the coupon** → A randomly selected gift stock is credited to your account [3]
4. **The stock is yours** → Hold it, sell it, build around it [3]

One coupon entitles you to exactly one gift stock [3]. No fractions. No upgrades. One coupon = one stock.

---

### Section: How Gift Stocks Are Chosen

Gift stocks come from an approved list maintained by Freedom Finance Europe and published at:  
**https://freedom24.com/gift-stocks-list**

When you open a coupon, an automated random selection mechanism picks one stock from the list [3].

**The mechanism:**
- Includes internal weighting parameters [3]
- Higher-value securities → lower probability of allocation [3]
- Lower-value securities → higher probability of allocation [3]
- Each coupon is opened independently — you may receive different stocks across multiple coupons [3]

**You cannot:**
- Choose the issuer [3]
- Reroll the allocation
- Trade the coupon for cash [3]

**You can:**
- Hold the stock once credited
- Sell it at market price
- Build it into your real investment portfolio

---

### Section: Pricing

**The price of the gift stock is determined as of the date the gift stock is credited to your account** [3].

This means:
- The valuation date is fixed (the credit date)
- Subsequent market movements affect your real portfolio P&L, not the prize valuation
- Tax basis (if applicable) is established on the credit date

---

### Section: What You Don't Get

To be transparent about the limits:

- ❌ **No cash alternative** [3]
- ❌ **No transferability** — coupons and stocks are tied to your account [3]
- ❌ **No issuer choice** — random allocation only [3]
- ❌ **No re-rolls** — one stock per coupon, final [3]
- ❌ **No participation prizes** — only the top 5 receive rewards [3]

---

### Section: Why This Structure?

Because it's the only way to combine:
- **Real prizes** (actual securities, not virtual points)
- **Fair distribution** (every winner gets a randomized basket, not a fixed cash pool)
- **Regulatory compliance** (the random mechanism keeps the Promotion outside the definition of a lottery under Cypriot law) [3]

The Organizer designed this structure to maximize fairness while keeping the Promotion compliant with MiFID II and Cypriot regulation [3].

---

### Section: Tax Responsibility

Any tax obligations arising from receipt of gift stocks are **your sole responsibility** [3]. Freedom Finance Europe Ltd does not provide tax advice.

We recommend:
- Consulting a qualified tax advisor in your country of residence
- Keeping records of credit dates and prices
- Reviewing your local rules on prize/promotional income taxation

---

### Closing Fun Fact
💡 *In 1999, Berkshire Hathaway's Class A shares hit $80,000 per share — at the time, the highest single-share price ever. Today they trade above $700,000. Imagine getting one as a gift stock. (We can't promise that. But we can promise the random mechanism doesn't discriminate.)*

---

# 🏅 Страница 4: Leaderboard `/leaderboard`

## 4.1. Метаданные
- **URL:** `/leaderboard`
- **Цель:** Прозрачность рейтинга, мотивация к подъёму
- **Update frequency:** Снапшот каждые 3 часа [2]

## 4.2. Полный текст

### H1
Live Leaderboard — Season 1

### Header info
Last updated: [timestamp]  
Next snapshot: [timestamp + 3h]  
Total participants: [count]  

### Disclaimer
Rankings are based solely on virtual portfolio return at the time of the latest snapshot [3]. Snapshots run every 3 hours throughout the Promotion Period [2]. Final ranking is determined at the end of the Promotion Period using official closing prices on the final trading day [3].

### Table columns
- Rank
- Player (display name + country flag + avatar)
- Return %
- Portfolio Value (USD)

### Filters
- All countries / Germany / Spain / Poland / Greece
- Show my rank (sticky row at the top of the visible range)

### Footer note
In the event of a tie, rankings are determined based on the participant who achieved the relevant portfolio performance **first in time** [3].

---

# ❓ Страница 5: FAQ `/faq`

## 5.1. Метаданные
- **URL:** `/faq`
- **Цель:** Снять все возможные возражения и сомнения
- **Группы:** Eligibility, Trading, Rewards, Taxes & Legal, Technical

## 5.2. Полный текст

### H1
Got Questions? We've Got Answers.

---

### Group: Eligibility & Participation

**Q: Is this really free?**  
A: Yes. Zero. Nada. Participation is completely free of charge [3]. No deposits, no hidden fees, no "premium" upsells. You get $25,000 in virtual funds the moment you start [2].

**Q: Do I need to deposit real money?**  
A: Absolutely not. No real funds or deposits are required to participate [3]. This is a demo challenge with real prizes.

**Q: Who can participate?**  
A: You need to be (1) at least 18 years old, (2) a client of Freedom Finance Europe Ltd, (3) have received an invitation via email, push, pop-up, or stories notification [3].

**Q: Can I play if I'm not a Freedom Finance client?**  
A: Not directly. You need to be a client to participate. Opening an account is free and takes about 5 minutes.

**Q: I didn't get an invitation. What now?**  
A: Invitations are rolled out in waves. If you're a Freedom Finance Europe client and haven't received yours, contact support or wait for the next wave.

**Q: Can I participate twice?**  
A: No. One user participates in a season once [2]. We track by user ID, not just email.

---

### Group: Trading & Portfolio

**Q: What can I trade?**  
A: Approximately 1,000 stocks available in the Bot [2]. The list is curated and approved by the Organizer. Stocks and ETFs available within the Bot environment [3].

**Q: Are there commissions or slippage?**  
A: No. Trading is at the visible price, with no commissions and no slippage [2]. The simulation is deliberately simplified.

**Q: Can I use leverage?**  
A: No. Leverage is not allowed [2].

**Q: Can I short-sell?**  
A: Yes. Short positions are allowed [2]. Bet against a stock if you think it's overvalued.

**Q: What order types are available?**  
A: Market orders only [2]. No limit orders, no stop-loss, no take-profit. You decide when to act, the price at execution is what you see.

**Q: How often can I rebalance my portfolio?**  
A: You can rebalance **at any time during the Promotion Period — but no more than once during the entire Promotion Period** [3]. Use this single rebalance wisely.

---

### Group: Rewards & Coupons

**Q: How are winners determined?**  
A: By portfolio return percentage (PnL%) from the starting $25,000 [3]. No random draws, no luck factor for ranking. Best performance wins [3].

**Q: What exactly do I win?**  
A: Coupons. The TOP 5 traders get coupons credited to their Freedom Finance account [3]:
- 1st place — 40 coupons
- 2nd — 25 coupons
- 3rd — 15 coupons
- 4th — 10 coupons
- 5th — 5 coupons

Each coupon entitles you to one real gift stock [3]. Open the coupon — the stock appears in your portfolio.

**Q: Are the prizes real?**  
A: 100% real. Whole shares of publicly traded companies deposited directly into your Freedom Finance account. Not virtual. Not tokens. Real stocks [3].

**Q: Can I choose which stock I get?**  
A: No. Gift stocks are selected randomly from an approved list at freedom24.com/gift-stocks-list [3]. Higher-value securities have a lower probability of being allocated than lower-value ones [3]. The selection is automated and weighted.

**Q: Does the random selection affect who wins?**  
A: Absolutely not. Winners are determined exclusively by performance — your virtual portfolio return [3]. Randomization applies only to which specific gift stocks each winner receives, not to ranking [3].

**Q: Can I get cash instead of stocks?**  
A: No. Cash alternatives are not available [3]. Coupons and gift stocks are non-transferable [3]. Once a stock is credited to your account, however, you can dispose of it at your own discretion [3].

**Q: What if two traders have the same return?**  
A: Tie-breaker rule: whoever achieved that performance **first in time** takes the higher rank [3].

**Q: Is this gambling?**  
A: No. The Promotion is not a lottery, gambling activity, or game of chance within the meaning of Cypriot law [3]. Winners are determined by objective performance criteria, not random selection [3].

---

### Group: Taxes & Legal

**Q: What about taxes?**  
A: Any tax obligations arising from participation or receipt of rewards are your sole responsibility [3]. We recommend consulting a qualified tax advisor in your country of residence.

**Q: Who is the organizer?**  
A: Freedom Finance Europe Ltd, a company incorporated under the laws of the Republic of Cyprus and regulated by the Cyprus Securities and Exchange Commission (CySEC), CIF License 275/15 [3].

**Q: What law governs the Promotion?**  
A: These Rules are governed by the laws of the Republic of Cyprus. Any disputes are subject to the exclusive jurisdiction of the courts of the Republic of Cyprus [3].

**Q: Is this an investment service or advice?**  
A: No. The Promotion does not constitute an investment service, investment advice, portfolio management, or a recommendation within the meaning of Directive 2014/65/EU (MiFID II) or applicable Cypriot law [3].

**Q: What about my data?**  
A: Personal data is processed in accordance with Regulation (EU) 2016/679 (GDPR) and applicable Cypriot data protection laws [3].

---

### Group: Technical / Support

**Q: What if I have a technical issue?**  
A: Contact Freedom Finance support. Reference your participation in the AI Investment Challenge and provide your registered email plus approximate time of the issue.

**Q: Can the rules change mid-season?**  
A: The Organizer reserves the right to amend these Rules or terminate the Promotion where required for legal, regulatory, or operational reasons [3].

**Q: Where can I read the full Promotion Rules?**  
A: On our [Terms & Conditions page](/terms). All clauses are reproduced verbatim from the official Promotion Rules document [3].

---

### Closing Fun Fact
💡 *Warren Buffett once said: "The stock market is a device for transferring money from the impatient to the patient." You have $25,000 virtual and 31 days. Be patient. Be precise. Be in the top 5.*

---

# 📜 Страница 6: Terms & Conditions `/terms`

## 6.1. Метаданные
- **URL:** `/terms`
- **Цель:** Полная юридическая прозрачность
- **Правило:** Текст воспроизводится **дословно** из Promotion Rules [3]

## 6.2. Полный текст

### H1
Promotion Rules / Terms & Conditions

### Effective from
[ ] 2026

---

### 1. General

1.1. These Terms and Conditions ("Rules") govern participation in the promotional campaign titled "Investment Challenge" ("Promotion") [3].

1.2. The Promotion is organized by Freedom Finance Europe Ltd, a company incorporated under the laws of the Republic of Cyprus and regulated by the Cyprus Securities and Exchange Commission (CySEC) ("Organizer") [3].

1.3. The Promotion is conducted exclusively through the Organizer's bot assistant ("Bot") [3].

1.4. The Promotion does not constitute an investment service, investment advice, portfolio management, or a recommendation within the meaning of Directive 2014/65/EU (MiFID II) or applicable Cypriot law [3].

---

### 2. Promotion Period

2.1. The Promotion begins on May 11, 2026 and ends on June 11, 2026 (both dates are inclusive) ("Promotion Period") [3].

2.2. Registration opens seven (7) calendar days prior to the Promotion start date [3].

---

### 3. Eligibility

3.1. Participation is open to individuals who:
- Are at least 18 years old
- Are clients of Freedom Finance Europe Ltd
- Received an invitation to participate via email, push, pop-up, or stories notifications [3]

3.2. Employees of the Organizer and its affiliated entities, as well as their immediate family members, are not eligible to participate [3].

3.3. The Organizer reserves the right to refuse or terminate participation at its sole discretion in case of breach of these Rules or applicable law [3].

---

### 4. Participation Conditions

4.1. Participation in the Promotion is free of charge [3].

4.2. The client's acceptance of the Promotion's terms is confirmed by clicking the 'I agree to the terms of the offer' button within the Bot [3].

4.3. No real funds or deposits are required to participate [3].

4.4. Upon commencement of the Promotion, each participant is credited with USD 25,000 in virtual funds ("Virtual Funds") [3].

---

### 5. Virtual Transactions

5.1. Participants may use Virtual Funds to execute simulated buy and sell transactions in stocks and ETFs available in the Bot [3].

5.2. All transactions are virtual and do not result in real trades on regulated markets [3].

5.3. Participants may rebalance their virtual portfolios at any time during the Promotion Period but no more than once during the entire Promotion Period [3].

---

### 6. Performance Calculation

6.1. Portfolio performance is calculated based on the total value of the virtual portfolio at the end of the Promotion Period [3].

6.2. Instrument prices are determined by the Organizer's Electronic Trading Platform using official closing prices on the final trading day [3].

6.3. Rankings are based solely on virtual portfolio return [3].

6.4. In the event of a tie, rankings shall be determined based on the participant who achieved the relevant portfolio performance first in time [3].

---

### 7. Rewards

7.1. Rewards are granted as follows [3]:
- 1st place — 40 coupons
- 2nd place — 25 coupons
- 3rd place — 15 coupons
- 4th place — 10 coupons
- 5th place — 5 coupons

7.2. One (1) coupon entitles the participant to receive one (1) gift stock [3].

7.3. Gift stocks are selected at random from an approved list published on the Organizer's website https://freedom24.com/gift-stocks-list. Participants cannot choose the issuer [3].

7.4. Gift stocks are allocated through an automated random selection mechanism from a predefined list of eligible securities. The allocation process incorporates internal weighting parameters and operational criteria, including the value of the securities, which determine the relative probability of receiving particular shares. Accordingly, higher-value securities are allocated with a lower probability than lower-value securities. The random allocation mechanism applies solely to the distribution of gift stocks and does not influence the determination of winners, which is based exclusively on performance criteria [3].

7.5. Since the gift stocks are randomly selected, the participant may receive different gift stocks from the list above. The participant shall receive only one gift stock randomly chosen by the Organizer per one coupon [3].

7.6. Upon rewarding, the coupons are credited to the participant's account opened with the Organizer. On opening the coupon, the gift stock is credited to the account [3].

7.7. When the gift stock is credited to the account, the participant acquires the right to dispose of the gift stock at their own discretion [3].

7.8. The price of the gift stock shall be determined as of the date the gift stock is credited to the account [3].

7.9. Entitlements to gift stocks are non-transferable. Cash alternatives are not available [3].

---

### 8. Taxes

8.1. Any tax obligations arising from participation in the Promotion or receipt of rewards are the sole responsibility of the participant [3].

---

### 9. Investment Disclaimer

9.3. Participation in the Promotion does not imply or guarantee future financial results [3].

The Organizer does not guarantee the accuracy, completeness, or reliability of any information provided during the Promotion, including but not limited to the availability of any specific financial instrument, or future investment outcomes [3].

---

### 10. Gambling and Lottery Disclaimer

10.1. The Promotion is not a lottery, gambling activity, or game of chance within the meaning of Cypriot law [3].

10.2. Winners of the Promotion are determined based on objective performance criteria (virtual portfolio returns) and not by random selection. The allocation of specific gift stocks to winners is carried out separately through a randomised mechanism as described in Section 7 and does not affect the determination of winners [3].

---

### 11. Data Protection

11.1. Personal data is processed in accordance with Regulation (EU) 2016/679 (GDPR) and applicable Cypriot data protection laws [3].

---

### 12. Amendments and Termination

12.1. The Organizer reserves the right to amend these Rules or terminate the Promotion where required for legal, regulatory, or operational reasons [3].

---

### 13. Governing Law and Jurisdiction

13.1. These Rules are governed by the laws of the Republic of Cyprus [3].

13.2. Any disputes shall be subject to the exclusive jurisdiction of the courts of the Republic of Cyprus [3].

---

### Organizer Details

**Freedom Finance Europe Ltd**  
Authorised by the CySEC CIF License 275/15  
dated 20 May 2015  
Christaki Kranou 20, Freedom Tower, 5th Floor  
4041 Germasogeia, Limassol Cyprus  
tel: +357 25257787  
www.freedomfinance.eu [3]

---

# ⚠️ Страница 7: Disclaimer `/disclaimer`

## 7.1. Метаданные
- **URL:** `/disclaimer`
- **Цель:** Curated extract ключевых дисклеймеров

## 7.2. Полный текст

### H1
Disclaimer

### Subtitle
Important information about the AI Investment Challenge.

---

### Block 1: ⚠️ Investment Risk Warning

This Promotion does not constitute an investment service, investment advice, portfolio management, or a recommendation within the meaning of Directive 2014/65/EU (MiFID II) or applicable Cypriot law [3].

---

### Block 2: No Guarantee of Results

The Organizer does not guarantee the accuracy, completeness, or reliability of any information provided during the Promotion, including but not limited to the availability of any specific financial instrument, or future investment outcomes. Participation in the Promotion does not imply or guarantee future financial results [3].

---

### Block 3: Not Gambling, Not a Lottery

The Promotion is not a lottery, gambling activity, or game of chance within the meaning of Cypriot law [3]. Winners are determined based on objective performance criteria (virtual portfolio returns) and not by random selection. The allocation of specific gift stocks to winners is carried out separately through a randomised mechanism and does not affect the determination of winners [3].

---

### Block 4: Random Allocation Mechanism

Specific gift stocks are allocated through an automated random selection mechanism from a predefined list of eligible securities. The allocation incorporates internal weighting parameters, including the value of securities, meaning higher-value securities are allocated with lower probability than lower-value securities. This random mechanism applies solely to the distribution of gift stocks and does not influence the determination of winners, which is based exclusively on performance criteria [3].

---

### Block 5: Non-Transferability

Entitlements to gift stocks are non-transferable. Cash alternatives are not available [3]. Once a gift stock is credited to a participant's account, the participant acquires the right to dispose of it at their own discretion. The price of the gift stock is determined as of the date it is credited to the account [3].

---

### Block 6: Tax Responsibility

Any tax obligations arising from participation in the Promotion or receipt of rewards are the sole responsibility of the participant [3]. The Organizer does not provide tax advice. Participants are encouraged to consult qualified tax professionals in their country of residence.

---

### Block 7: Data Protection

Personal data is processed in accordance with Regulation (EU) 2016/679 (GDPR) and applicable Cypriot data protection laws [3].

---

### Block 8: Governing Law

These Rules are governed by the laws of the Republic of Cyprus. Any disputes shall be subject to the exclusive jurisdiction of the courts of the Republic of Cyprus [3].

---

### Block 9: Organizer

Freedom Finance Europe Ltd — a company incorporated under the laws of the Republic of Cyprus, regulated by the Cyprus Securities and Exchange Commission (CySEC), CIF License 275/15 dated 20 May 2015 [3].

Address: Christaki Kranou 20, Freedom Tower, 5th Floor, 4041 Germasogeia, Limassol, Cyprus  
Phone: +357 25257787  
Web: www.freedomfinance.eu [3]

---

# 🔒 Страница 8: Privacy Policy `/privacy`

## 8.1. Метаданные
- **URL:** `/privacy`
- **Цель:** GDPR compliance + site-specific privacy info

## 8.2. Полный текст

### H1
Privacy Policy

### Subtitle
How we handle your data on this site and within the AI Investment Challenge.

---

### Section 1: Who We Are

This site is operated by **Freedom Finance Europe Ltd**, the Organizer of the AI Investment Challenge ("we", "us", "our"). We are incorporated in Cyprus and regulated by the Cyprus Securities and Exchange Commission (CySEC) under CIF License 275/15 [3].

Address: Christaki Kranou 20, Freedom Tower, 5th Floor, 4041 Germasogeia, Limassol, Cyprus

---

### Section 2: What Data We Collect on This Site

**Necessary cookies:**
- Session cookies for navigation
- Cookie consent state
- Language preference
- A/B test variant assignment

**Analytics cookies (with consent):**
- Page views, scroll depth, click events
- Anonymized IP, browser, device type
- Referrer URLs

**Marketing cookies (with consent):**
- UTM parameter tracking
- OneLink/Taplink interaction tracking

We do **not** collect on this site:
- Real names or contact details (these come from the Bot/account, not from this site)
- Financial data
- Trading positions

---

### Section 3: Data Within the Promotion

Personal data processed inside the Promotion (your portfolio, trades, ranking) is governed by Section 11 of the Promotion Rules:

> Personal data is processed in accordance with Regulation (EU) 2016/679 (GDPR) and applicable Cypriot data protection laws [3].

For detailed information on Promotion-related data processing, refer to your Freedom Finance Europe account agreement and our main Privacy Policy at www.freedomfinance.eu.

---

### Section 4: Public Leaderboard

If you participate in the Promotion, your **display name (first name + last initial)**, **avatar**, and **country code** may be shown on the public leaderboard. This is consented to as part of accepting the Promotion Rules within the Bot [3].

---

### Section 5: Your Rights Under GDPR

You have the right to:
- Access your data
- Correct inaccurate data
- Request deletion (where applicable)
- Restrict processing
- Data portability
- Object to processing
- Withdraw consent

To exercise any of these rights, contact our Data Protection Officer at [DPO email].

---

### Section 6: Data Retention

- **Cookies:** Up to 30 days (variant cookies), session-only (necessary), per consent (analytics/marketing)
- **Promotion participation data:** Per Freedom Finance Europe's main retention policy, governed by Cypriot law and GDPR [3]

---

### Section 7: Third-Party Services

We use:
- **Google Analytics 4** — anonymized, with IP truncation
- **AppsFlyer (OneLink)** — for app install attribution
- **Vercel/Netlify/Cloudflare** — hosting and CDN

Each of these processors operates under their own privacy policies and DPAs (Data Processing Agreements).

---

### Section 8: Contact

For privacy questions:
- Email: [DPO email]
- Postal: Freedom Finance Europe Ltd, Christaki Kranou 20, Freedom Tower, 5th Floor, 4041 Germasogeia, Limassol, Cyprus
- Phone: +357 25257787 [3]

---

### Section 9: Changes to This Policy

We may update this Privacy Policy. The "Last updated" date below indicates the most recent version.

**Last updated:** [date]

---

# 🎁 Страница 9: Gift Stocks Info `/gift-stocks-info`

## 9.1. Метаданные
- **URL:** `/gift-stocks-info`
- **Цель:** Подробное объяснение механики gift stocks с переадресацией на официальный список

## 9.2. Полный текст

### H1
About Gift Stocks

### Subtitle
What they are. Where the list lives. How they're allocated.

---

### Section: What Are Gift Stocks?

Gift stocks are real shares of publicly traded companies, awarded to the top 5 finishers of the AI Investment Challenge as part of their prize [3].

These are not virtual rewards. They are credited directly to your Freedom Finance Europe account upon opening a winning coupon, and you acquire full disposal rights from the moment of credit [3].

---

### Section: The Approved List

The full list of eligible gift stocks is maintained at:

**🔗 https://freedom24.com/gift-stocks-list**

The list is curated by Freedom Finance Europe Ltd and may include securities across various sectors and price ranges. Always refer to the live list for the current set of eligible securities.

---

### Section: How a Stock Is Picked for You

When you open a coupon, an **automated random selection mechanism** chooses one stock from the approved list [3].

**Mechanism details:**
- Random per coupon — opening multiple coupons may yield different stocks [3]
- Weighted by security value — higher-value securities have lower probability [3]
- You cannot choose the issuer [3]
- The selection is final — no rerolls [3]

This randomization is the mechanism that **distributes** prizes. It does **not determine winners** — winners are decided exclusively by leaderboard performance [3].

---

### Section: When Are Coupons Credited?

After the season closes (June 11, 2026 [3]) and the final ranking is locked, coupons are credited to the Freedom Finance Europe accounts of the top 5 finishers. From there, you can open them at your convenience.

---

### Section: After You Receive a Stock

**Pricing:**  
The price of the gift stock is determined as of the date it is credited to your account [3].

**Disposal:**  
You acquire full rights to hold, sell, or otherwise dispose of the stock at your discretion [3].

**Transferability:**  
Coupons and entitlements to gift stocks are non-transferable [3]. Once the stock is in your account, it follows the same rules as any other holding in your portfolio.

**Cash alternative:**  
Not available [3]. The reward is the stock itself.

---

### Section: Why Random Allocation?

Three reasons:

1. **Fairness** — Every winner gets a randomized basket. No one negotiates a "better" stock.
2. **Compliance** — The random mechanism keeps the Promotion clearly outside the definition of a lottery under Cypriot law [3].
3. **Diversity** — Across all winners, the prize pool spans many issuers, not just one or two.

---

### Closing Fun Fact
💡 *The first ever IPO was the Dutch East India Company in 1602. Investors who bought shares at the offering had to wait for dividends — and they didn't always know what they owned. You'll know exactly what you own. The moment your stock is credited.*

---

# 🌐 Локализационные принципы (для всех страниц)

## L.1. Что НЕ переводится
- Бренд: "AI Investment Challenge", "Portfolio Battle", "Freedom Finance Europe"
- Численные значения: $25,000, 40/25/15/10/5, 95 stocks
- Технические термины: API, OneLink, Taplink, QR
- Юридические идентификаторы: CySEC, MiFID II, GDPR, CIF License 275/15

## L.2. Что переводится с адаптацией
- Заголовки и хуки — преобразуем смысл и тон, не дословно
- Призывы к действию (CTA) — адаптируем под культурную норму FOMO
- Fun-facts — заменяем на культурно релевантные, если оригинал не работает

## L.3. Ключевые термины — multi-language matrix

| EN | DE | ES | PL | EL |
|---|---|---|---|---|
| Coupon | Gutschein | Cupón | Kupon | Κουπόνι |
| Gift stock | Geschenkaktie | Acción de regalo | Akcja w prezencie | Δωρεάν μετοχή |
| Leaderboard | Rangliste | Clasificación | Ranking | Κατάταξη |
| Portfolio | Portfolio | Portafolio | Portfolio | Χαρτοφυλάκιο |
| Virtual funds | Virtuelles Guthaben | Fondos virtuales | Wirtualne środki | Εικονικά κεφάλαια |
| Challenge | Challenge | Desafío | Wyzwanie | Πρόκληση |
| Tie-breaker | Stichentscheid | Desempate | Rozstrzygnięcie remisu | Διάκριση ισοβαθμίας |
| Short selling | Leerverkauf | Venta en corto | Krótka sprzedaż | Ανοιχτή πώληση |
| Promotion Period | Aktionszeitraum | Período de promoción | Okres promocji | Περίοδος προώθησης |
| Eligibility | Teilnahmeberechtigung | Elegibilidad | Uprawnienia | Επιλεξιμότητα |

## L.4. Юридические страницы — особое правило

Страницы `/terms`, `/disclaimer`, `/privacy` подлежат **юридической экспертизе по каждой юрисдикции** перед публикацией на национальном языке. До прохождения экспертизы — публикуется только английская версия с пометкой:

> ⚠️ *Available in English only — translation under review by local counsel.*

---

# 🧠 Метаданные для обучения нейронки

## M.1. Структура для embedding-индексации

Каждая страница разбита на смысловые чанки:
- **Page-level metadata** (URL, цель, аудитория)
- **Section-level chunks** (заголовок + тело + источник)
- **Q&A pairs** (для FAQ-style retrieval)

## M.2. Семантические якоря (для intent detection)

| Intent | Anchor sections |
|---|---|
| "Сколько я выиграю?" | Prizes podium, Coupons explainer, FAQ rewards |
| "Это азартная игра?" | Disclaimer block 3, FAQ "Is this gambling?" |
| "Когда начало?" | Hero countdown, Terms §2.1, FAQ |
| "Что такое купон?" | Coupons explainer, Gift stocks info, FAQ |
| "Можно ли выбрать акцию?" | Gift stocks info, Disclaimer block 4, FAQ |
| "Какие налоги?" | Terms §8, Disclaimer block 6, FAQ taxes |
| "Кто организатор?" | Terms §1.2 + §13, Disclaimer block 9, Privacy §1 |

## M.3. Источники истины (priority for citations)

При генерации ответов нейросеть должна цитировать в следующем порядке:
1. **Promotion Rules** [3] — для всех юридических, призовых, eligibility-вопросов
2. **Main Product Task** [2] — для механики игры (тикеры, лидерборд, шорты)
3. **AI GAME Collection** [1] — для общих описаний продукта

## M.4. Запрещённые ответы (guardrails)

Нейросеть **не должна**:
- Давать инвестиционные советы (это противоречит §1.4 [3])
- Гарантировать выигрыш или результат
- Описывать призы как «cash» или «monetary value»
- Упоминать TOP 20, 125 stocks (легаси, не в финальной оферте [3])
- Цитировать DB-таблицы, message_id, trigger_id [2]
- Подтверждать возможность выбора эмитента [3]

## M.5. Идеальный паттерн ответа

> [Прямой ответ на вопрос] [Источник [3]/[2]/[1]]. [Дополнительный контекст или нюанс]. [CTA или ссылка на соответствующую страницу сайта].

**Пример:**

User: «Можно ли вывести призы деньгами?»

Bot: «Нет, денежная альтернатива не предусмотрена [3]. Призы выдаются исключительно в виде купонов, каждый из которых обменивается на одну случайно выбранную gift-акцию из утверждённого списка [3]. После зачисления акции на твой счёт ты можешь свободно ею распоряжаться — держать, продать, реинвестировать [3]. Подробнее на странице /gift-stocks-info.»

---

**Конец документации. Готово к индексации в RAG / fine-tuning.**