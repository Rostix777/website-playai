# 🚀 AI Game | Portfolio Battle — Site Build Specification

**Document version:** 2.0 (Nuxt migration)  
**Target handoff:** Claude Opus → repository scaffolding via [claude.ai/new](https://claude.ai/new)  
**Component system:** [shadcn/ui Pro Blocks](https://www.figma.com/design/RSzpND9XjRPW3uAk1AuZZu/) + [shadcn-vue registry preset b2pl3aBRQ](https://www.shadcn-vue.com/)

> **⚠️ Migration notice:** This version replaces the Next.js stack from v1.0 with **Nuxt 3** (latest). All affected sections (§4, §5, §6, §8, §9, §10, §12, §15, §17, §22, §23) are updated. Sections related to product mechanics, prizes, legal content, and Promotion Rules remain unchanged.

---

## 📑 Table of Contents

1. [Executive Brief](#1-executive-brief)
2. [Product Context & Source of Truth](#2-product-context--source-of-truth)
3. [Information Architecture](#3-information-architecture)
4. [Tech Stack & Repository Structure](#4-tech-stack--repository-structure) ⚡ updated
5. [Design System (shadcn-vue based)](#5-design-system) ⚡ updated
6. [Component Inventory](#6-component-inventory) ⚡ updated
7. [Page Specifications](#7-page-specifications)
8. [Three Hero States (Pre / Live / Post)](#8-three-hero-states) ⚡ updated
9. [Live Data Integrations](#9-live-data-integrations) ⚡ updated
10. [Internationalization (i18n)](#10-internationalization-i18n) ⚡ updated
11. [Hyper-personalization Engine](#11-hyper-personalization-engine)
12. [A/B/C Testing Framework](#12-abc-testing-framework) ⚡ updated
13. [Mobile Adaptation](#13-mobile-adaptation)
14. [Analytics & Tracking](#14-analytics--tracking) ⚡ updated
15. [Backend API Contracts](#15-backend-api-contracts) ⚡ updated
16. [Legal Pages — Verbatim Content](#16-legal-pages--verbatim-content)
17. [SEO & Meta](#17-seo--meta) ⚡ updated
18. [Performance Budget](#18-performance-budget)
19. [Security & GDPR](#19-security--gdpr)
20. [Build Roadmap (Sprints)](#20-build-roadmap-sprints) ⚡ updated
21. [Acceptance Checklist](#21-acceptance-checklist)
22. [Claude Opus Handoff Prompt](#22-claude-opus-handoff-prompt) ⚡ updated
23. [E2E Testing with Playwright](#23-e2e-testing-with-playwright) ⚡ updated

---

## 1. Executive Brief

### 1.1. Product
**AI Game | Portfolio Battle** — promotional investment challenge by Freedom Finance Europe Ltd. Participants receive USD 25,000 in virtual funds and compete by virtual portfolio return. Top 5 win real gift stocks via coupons [3].

### 1.2. Site Goal
Build a promo/sales website that:
- Drives app downloads via OneLink (`https://freedom24.onelink.me/pHBR`)
- Drives in-bot game launches via Taplink (`https://tap.freedom24.com/to/chat/ai?text=playgame`)
- Provides legal compliance (Terms, Disclaimer, Privacy)
- Supports 5 markets (EN as base + DE, ES, PL, EL)

### 1.3. Tone of Voice
Premium financial editorial — **GQ × Forbes × Bloomberg**. Informal "ты"/"you". FOMO-driven psychology. Humor and fun-facts at the closing of each section. Hyper-personalized greetings.

### 1.4. Audience
Mass-market clients of Freedom Finance Europe across Greece, Germany, Spain, Poland (extensible to broader EU).

---

## 2. Product Context & Source of Truth

### 2.1. Authoritative documents (priority order)
| Priority | Source | Use for |
|----------|--------|---------|
| 🥇 P0 | **PROMOTION RULES / Terms & Conditions** [3] | All legal/prize text on the site (verbatim) |
| 🥈 P1 | **Main Product Task** [2] | Internal mechanics, DB schema, engines |
| 🥉 P2 | **AI GAME Collection** [1] | Cross-checks, tickers list, message engine |

### 2.2. Key facts derived from sources

| Fact | Value | Source |
|------|-------|--------|
| Organizer | Freedom Finance Europe Ltd, regulated by CySEC | [3] |
| Promotion Period | May 11 – June 11, 2026 (inclusive) | [3] |
| Registration opens | 7 calendar days before start | [3] |
| Virtual capital | USD 25,000 | [2] |
| Tradable instruments | Stocks and ETFs available in the Bot (per legal) / ~1000 stock tickers (per product MVP) | [3][2] |
| Rebalance limit | Maximum once per Promotion Period | [3] |
| Ranking method | Virtual portfolio return only (PnL%) | [3][2] |
| Tie-breaker | First in time wins higher rank | [3] |
| Snapshot frequency | Every 3 hours (Ranking Engine) | [2] |
| Reward grid | 1st: 40 / 2nd: 25 / 3rd: 15 / 4th: 10 / 5th: 5 coupons | [3] |
| Coupon mechanics | 1 coupon = 1 random gift stock | [3] |
| Gift stock list | https://freedom24.com/gift-stocks-list | [3] |
| Cash alternative | Not available | [3] |
| Transferability | Non-transferable | [3] |
| Virtual funds nature | No monetary value, cannot be withdrawn or exchanged | [3] |

### 2.3. Out of scope (NOT to feature on the site)
The following from the product task [2] must NOT appear on the public site:
- Internal DB table names, message_id, trigger_id
- Anti-spam logic, message prioritization
- Achievements (planned for future seasons) [2]
- ETF/derivatives/crypto trading mentions beyond the legal "stocks and ETFs" line [3][2]
- Leverage, commissions, slippage discussions [2]
- Top 20 prize tier, 125 stocks budget (this was internal early draft — final official rule is Top 5 with coupons [3])

### 2.4. Source-of-truth rule for the build team
> **Anything visible to users must be backed by [3]. Internal mechanics from [2] only inform engineering, never the public copy.**

---

## 3. Information Architecture

### 3.1. Sitemap

```
/[locale]/
├── /                  → Landing (3 dynamic states)
├── /how-it-works
├── /prizes
├── /leaderboard       → full leaderboard view
├── /faq
├── /terms             → Promotion Rules (verbatim)
├── /disclaimer
├── /privacy
└── /gift-stocks-info  → explainer + link to /gift-stocks-list
```

`[locale]` ∈ `{en, de, es, pl, el}`. `en` is default and served at root without prefix.

### 3.2. Global navigation

**Header:** Logo · How It Works · Prizes · Leaderboard · FAQ · [Language Switcher] · [Primary CTA]

**Footer:** Brand block · Game links · Legal links · Language switcher · Disclaimers · Copyright

### 3.3. URL parameters reserved for tracking
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_creative`
- `variant` (A/B/C override for QA)
- `state` (pre/live/post override for QA)
- `lang` (override locale for QA)

---

## 4. Tech Stack & Repository Structure

### 4.1. Stack ⚡ updated

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Nuxt 3** (latest, Nitro server, hybrid SSR/SSG/ISR) | SSR + ISR + edge, Vue 3 ecosystem |
| Language | **TypeScript** (strict) | Type safety |
| Styling | **Tailwind CSS** + CSS variables | Tokenized theming |
| Components | **shadcn-vue** (registry preset `b2pl3aBRQ`) | Pro blocks, accessible primitives, Radix Vue under the hood |
| Icons | **lucide-vue-next** | shadcn-vue default |
| Animations | **@vueuse/motion** + CSS animations | Vue-native motion library, low CLS |
| i18n | **@nuxtjs/i18n** | Native Nuxt module, SSR-friendly |
| Data fetching | **`useFetch` / `useAsyncData`** (SSR) + **swrv** (client SWR) | Built-in Nuxt + SWR semantics on client |
| Forms | **zod** + **vee-validate** | Validation + Vue form bindings |
| Analytics | **GA4** + custom `window.dataLayer` | Multi-source tracking |
| QR generation | **qrcode** (server-side in Nitro routes) | Static SVG output |
| Deployment | **Vercel / Netlify / Cloudflare Pages** (Nitro presets) | Edge + CDN |
| CMS (admin) | **Payload CMS** (RU UI) | Russian admin language |

### 4.2. Repository structure (Nuxt 3 conventions)

```
ai-game-site/
├── app.vue                                  # Root layout
├── error.vue                                # Error page
├── nuxt.config.ts
├── tailwind.config.ts
├── components.json                          # shadcn-vue registry config
├── pages/
│   ├── index.vue                            # Landing → renders hero state
│   ├── how-it-works.vue
│   ├── prizes.vue
│   ├── leaderboard.vue
│   ├── faq.vue
│   ├── terms.vue
│   ├── disclaimer.vue
│   ├── privacy.vue
│   └── gift-stocks-info.vue
├── layouts/
│   ├── default.vue                          # Header + Footer
│   └── legal.vue                            # Legal pages (no sticky CTA)
├── components/
│   ├── ui/                                  # shadcn-vue primitives
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   ├── Badge.vue
│   │   ├── Accordion.vue
│   │   ├── Avatar.vue
│   │   ├── Dialog.vue
│   │   └── ...
│   ├── blocks/                              # composed shadcn-vue pro blocks
│   │   ├── HeroPre.vue
│   │   ├── HeroLive.vue
│   │   ├── HeroPost.vue
│   │   ├── BenefitsGrid.vue
│   │   ├── HowItWorksTimeline.vue
│   │   ├── PrizesPodium.vue
│   │   ├── CouponsExplainer.vue
│   │   ├── LiveLeaderboard.vue
│   │   ├── LiveTickersStrip.vue
│   │   ├── QRJoinBlock.vue
│   │   ├── FAQAccordion.vue
│   │   ├── FOMOBanner.vue
│   │   ├── CountdownTimer.vue
│   │   ├── FunFactCard.vue
│   │   ├── MobileStickyCTA.vue
│   │   ├── LanguageSwitcher.vue
│   │   └── CookieConsent.vue
│   └── layout/
│       ├── SiteHeader.vue
│       └── SiteFooter.vue
├── composables/
│   ├── useSeasonState.ts                    # pre/live/post resolver
│   ├── useABVariant.ts                      # variant assignment
│   ├── usePersonalization.ts
│   ├── useOnelink.ts                        # OneLink URL builder
│   ├── useTaplink.ts                        # Taplink URL builder
│   ├── useAnalytics.ts                      # GA4 + DataLayer
│   ├── useLeaderboard.ts                    # SWR client poll
│   └── useQuotes.ts
├── server/
│   ├── api/
│   │   ├── leaderboard.get.ts               # proxy to backend
│   │   ├── season.get.ts
│   │   ├── quotes.get.ts
│   │   ├── qr.get.ts                        # server-side QR generation
│   │   └── revalidate.post.ts               # webhook for ISR invalidation
│   ├── middleware/
│   │   └── ab-variant.ts                    # cookie assignment
│   └── utils/
│       └── format-display-name.ts
├── middleware/
│   └── locale-redirect.global.ts
├── plugins/
│   ├── analytics.client.ts
│   └── motion.ts
├── locales/
│   ├── en.json
│   ├── de.json
│   ├── es.json
│   ├── pl.json
│   └── el.json
├── content/
│   ├── fun-facts.json
│   ├── benefits.json
│   └── faq.json
├── public/
│   ├── images/
│   ├── fonts/
│   └── og/
├── assets/
│   └── css/
│       ├── tokens.css                       # design tokens
│       └── tailwind.css
├── types/
│   └── index.ts
├── tests/
│   └── e2e/
└── package.json
```

### 4.3. shadcn-vue registry initialization

```bash
# Create Nuxt project
pnpm dlx nuxi@latest init ai-game-site
cd ai-game-site

# Install Tailwind + shadcn-vue
pnpm add -D @nuxtjs/tailwindcss
pnpm dlx shadcn-vue@latest init --preset b2pl3aBRQ

# Install required pro blocks
pnpm dlx shadcn-vue@latest add hero-section
pnpm dlx shadcn-vue@latest add feature-grid
pnpm dlx shadcn-vue@latest add timeline
pnpm dlx shadcn-vue@latest add pricing-cards
pnpm dlx shadcn-vue@latest add testimonial-marquee
pnpm dlx shadcn-vue@latest add faq-accordion
pnpm dlx shadcn-vue@latest add cta-section
pnpm dlx shadcn-vue@latest add stats-section
pnpm dlx shadcn-vue@latest add data-table

# Primitives
pnpm dlx shadcn-vue@latest add button card badge accordion avatar
pnpm dlx shadcn-vue@latest add tooltip dialog sheet select tabs
pnpm dlx shadcn-vue@latest add skeleton separator scroll-area

# Core deps
pnpm add @nuxtjs/i18n @vueuse/motion @vueuse/core lucide-vue-next
pnpm add zod vee-validate @vee-validate/zod
pnpm add swrv qrcode
pnpm add -D @types/qrcode
```

### 4.4. `nuxt.config.ts` skeleton

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
  ],

  css: ['~/assets/css/tokens.css', '~/assets/css/tailwind.css'],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'de', iso: 'de-DE', file: 'de.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' },
      { code: 'pl', iso: 'pl-PL', file: 'pl.json' },
      { code: 'el', iso: 'el-GR', file: 'el.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },

  nitro: {
    preset: 'vercel',                   // or 'netlify', 'cloudflare-pages'
    routeRules: {
      '/':              { isr: 300 },   // Season metadata refresh: 5 min [1]
      '/leaderboard':   { isr: 60 },    // Client SWR drives finer updates
      '/terms':         { isr: 86400 },
      '/disclaimer':    { isr: 86400 },
      '/privacy':       { isr: 86400 },
      '/api/**':        { cors: true },
    },
  },

  runtimeConfig: {
    backendApiUrl: process.env.BACKEND_API_URL,
    backendApiToken: process.env.BACKEND_API_TOKEN,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://game.freedom24.com',
      ga4Id: process.env.NUXT_PUBLIC_GA4_ID,
      onelinkBase: 'https://freedom24.onelink.me/pHBR',
      taplinkBase: 'https://tap.freedom24.com/to/chat/ai',
      qaMode: process.env.NUXT_PUBLIC_QA_MODE === 'true',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
});
```

### 4.5. Hybrid rendering map

| Page / Route | Strategy | Reason |
|---|---|---|
| `/` | ISR 300s | Season metadata refresh [1] |
| `/leaderboard` | ISR 60s + client SWR | 3h source / 60s client [1] |
| `/terms`, `/disclaimer`, `/privacy` | ISR 24h | Static legal content [1] |
| `/how-it-works`, `/prizes`, `/faq` | SSG | Pure content |
| `/api/leaderboard`, `/api/quotes` | Server route (proxy) | Backend protection |

---

## 5. Design System

### 5.1. Brand identity tokens

Identical to v1.0 — tokens are framework-agnostic. Stored at `assets/css/tokens.css` and imported globally via `nuxt.config.ts`.

```css
/* assets/css/tokens.css */
@layer base {
  :root {
    --background: 222 39% 6%;
    --foreground: 210 17% 98%;
    --card: 220 26% 11%;
    --card-foreground: 210 17% 98%;
    --popover: 220 26% 11%;
    --muted: 217 19% 16%;
    --muted-foreground: 215 16% 63%;
    --border: 0 0% 100% / 0.06;
    --input: 217 19% 16%;
    --ring: 239 84% 67%;

    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 100%;
    --secondary: 258 90% 66%;
    --accent: 330 81% 60%;

    --positive: 158 64% 40%;
    --negative: 0 84% 60%;
    --warning: 38 92% 50%;

    --gold: 45 93% 58%;
    --silver: 220 9% 75%;
    --bronze: 25 76% 50%;

    --gradient-hero: linear-gradient(135deg, hsl(239 84% 67%), hsl(258 90% 66%), hsl(330 81% 60%));
    --gradient-glow: radial-gradient(50% 50% at 50% 50%, hsl(239 84% 67% / 0.4), transparent);

    --radius: 0.75rem;
    --shadow-glow: 0 0 40px hsl(239 84% 67% / 0.3);
    --shadow-glow-lg: 0 0 80px hsl(239 84% 67% / 0.4);
  }
}
```

### 5.2. Tailwind config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{vue,ts}',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './app.vue',
    './error.vue',
  ],
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1280px' } },
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Text', 'system-ui', 'sans-serif'],
        display: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--primary-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        positive: 'hsl(var(--positive))',
        negative: 'hsl(var(--negative))',
        warning: 'hsl(var(--warning))',
        gold: 'hsl(var(--gold))',
        silver: 'hsl(var(--silver))',
        bronze: 'hsl(var(--bronze))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-glow': 'var(--gradient-glow)',
        'ai-grid': `linear-gradient(hsl(239 84% 67% / 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(239 84% 67% / 0.03) 1px, transparent 1px)`,
      },
      backgroundSize: { 'ai-grid': '60px 60px' },
      boxShadow: { glow: 'var(--shadow-glow)', 'glow-lg': 'var(--shadow-glow-lg)' },
      keyframes: {
        'pulse-glow': { '0%, 100%': { boxShadow: '0 0 20px hsl(239 84% 67% / 0.4)' }, '50%': { boxShadow: '0 0 40px hsl(239 84% 67% / 0.8)' } },
        'scroll-x':   { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'fade-up':    { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scroll-x': 'scroll-x 60s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

### 5.3. Component theming rules
- All shadcn-vue components consume CSS variables from `tokens.css` [1]
- No hardcoded colors outside `tokens.css` [1]
- Dark theme is the default and only theme [1]
- All cards use glassmorphism: `bg-card/70 backdrop-blur-xl border border-border` [1]
- Primary CTA always uses `bg-gradient-hero` + `animate-pulse-glow` [1]
- Typography: Display font for H1/H2, sans for body, mono for numeric data [1]

---

## 6. Component Inventory

### 6.1. Mapping shadcn-vue pro-blocks → custom blocks

| shadcn-vue block (from preset) | Adapted to | Used on |
|---|---|---|
| `hero-section-7` | `HeroPre.vue`, `HeroLive.vue`, `HeroPost.vue` | Landing |
| `feature-grid-3` | `BenefitsGrid.vue` | Landing |
| `timeline-vertical` | `HowItWorksTimeline.vue` | Landing, /how-it-works |
| `pricing-cards-3` | `PrizesPodium.vue` (5-card layout) | Landing, /prizes |
| `stats-section-2` | `HeroStats.vue` | All hero variants |
| `testimonial-marquee` | `LiveTickersStrip.vue` | Landing |
| `faq-accordion-2` | `FAQAccordion.vue` | Landing, /faq |
| `cta-section-3` | `FinalCTA.vue` | Landing |
| `data-table` | `FullLeaderboard.vue` | /leaderboard |
| `dialog` | `CookieConsent.vue`, `JoinModal.vue` | Global |

### 6.2. Custom blocks (no direct shadcn equivalent)

- `CountdownTimer.vue` — animated digits with monospace font
- `LiveLeaderboard.vue` — server-rendered initial state + client SWR refresh
- `QRJoinBlock.vue` — server-generated SVG via Nitro route + Taplink fallback
- `MobileStickyCTA.vue` — fixed bottom bar (mobile only)
- `FunFactCard.vue` — closing element under sections
- `FOMOBanner.vue` — urgency strip with live participant count
- `WinnersPodium.vue` — post-state hero podium with confetti

### 6.3. Component contracts (TypeScript)

```typescript
// types/index.ts

export type Locale = 'en' | 'de' | 'es' | 'pl' | 'el';
export type SeasonState = 'pre' | 'live' | 'post';
export type Variant = 'A' | 'B' | 'C';
export type CTALocation = 'hero' | 'prizes' | 'footer' | 'popup_fomo' | 'how_it_works' | 'final_cta' | 'sticky';

export interface Season {
  season_id: string;
  name: string;
  start_at: string;          // ISO 8601
  end_at: string;
  status: 'scheduled' | 'active' | 'closed';
  rules_version: string;
  last_snapshot_at?: string;
  next_snapshot_at?: string;
  participants_total?: number;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  display_name: string;       // "Alexandra K."
  avatar_url: string;
  country_code: string;       // ISO 3166-1 alpha-2
  pnl_percent: number;
  equity: number;
  achieved_at: string;
}

export interface Winner extends LeaderboardEntry {
  coupons: number;            // 40 | 25 | 15 | 10 | 5 per [3]
  reward_status: 'pending' | 'granted' | 'failed';
}

export interface Quote {
  ticker: string;
  name: string;
  logo_url: string;
  price: number;
  currency: string;
  change_percent_1d: number;
  change_absolute_1d: number;
  ts: string;
}
```

---

## 7. Page Specifications

Identical to v1.0. All 9 pages described in §7.1–§7.9 of v1.0 remain valid; only the implementation language changes from `.tsx` → `.vue`.

Section ordering on Landing:

1. Header (sticky, glassmorphism)
2. Hero (state-dependent: Pre / Live / Post — see §8)
3. Live Tickers Strip (auto-scrolling, 15s refresh)
4. Benefits Grid
5. How It Works Timeline (4 steps)
6. Prizes Podium (5 winners cards: 40/25/15/10/5 coupons [3])
7. Coupons Explainer Flow
8. Live Leaderboard Preview (Top 5, only in Live state)
9. QR Join Block (desktop) / Sticky CTA (mobile)
10. FOMO Banner
11. FAQ Accordion (top 8 questions)
12. Final CTA Section
13. Fun Fact Card
14. Footer

---

## 8. Three Hero States

### 8.1. State resolution composable

```typescript
// composables/useSeasonState.ts
import type { Season, SeasonState } from '~/types';

export function useSeasonState(season: Ref<Season | null>) {
  const state = computed<SeasonState>(() => {
    if (!season.value) return 'pre';
    const now = Date.now();
    const start = new Date(season.value.start_at).getTime();
    const end = new Date(season.value.end_at).getTime();
    if (now < start) return 'pre';
    if (now > end) return 'post';
    return 'live';
  });

  // QA override
  const route = useRoute();
  const config = useRuntimeConfig();
  if (config.public.qaMode && route.query.state) {
    return computed(() => route.query.state as SeasonState);
  }

  return state;
}
```

### 8.2. Page-level usage

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const { data: season } = await useFetch<Season>('/api/season');
const state = useSeasonState(season);

useHead({
  title: 'AI Investment Challenge | Win Real Stocks | Freedom Finance',
  meta: [
    { name: 'description', content: '$25,000 virtual capital. Real prizes. Zero risk.' },
  ],
});
</script>

<template>
  <div>
    <HeroPre   v-if="state === 'pre'"  :season="season" />
    <HeroLive  v-else-if="state === 'live'" :season="season" />
    <HeroPost  v-else :season="season" />
    
    <LiveTickersStrip />
    <BenefitsGrid />
    <HowItWorksTimeline />
    <PrizesPodium />
    <CouponsExplainer />
    <LiveLeaderboard v-if="state === 'live'" :limit="5" />
    <QRJoinBlock />
    <FOMOBanner />
    <FAQAccordion />
    <FinalCTA :state="state" />
    <FunFactCard />
  </div>
</template>
```

### 8.3. State A — PRE-SEASON

| Element | Content |
|---|---|
| Badge | `Season 1 — Starts Soon` |
| Headline (variant A) | *"The AI Investment Challenge launches in"* |
| Visual | Idle particles + large countdown targeting `start_at` |
| Stats grid | 95 gift stocks · $25K virtual · TOP 5 winners · 1 month duration |
| Primary CTA | "Reserve My $25K" → OneLink |
| Note | *"Registration is already open. Every hour you wait costs you potential return."* |

### 8.4. State B — LIVE

| Element | Content |
|---|---|
| Badge | `LIVE NOW` (red pulse dot) |
| Headline | *"The race is on. You can still catch up."* |
| Visual | Active particles + side-by-side Top 5 leaderboard widget |
| Countdown | Time until `end_at` |
| Note | *"Leaderboard updates every 3 hours."* [2] |
| Primary CTA | "Join the Battle" → OneLink |
| Adjacent | QR block (desktop) / Tap-to-Play (mobile) |

### 8.5. State C — POST-SEASON

| Element | Content |
|---|---|
| Badge | `🏁 Season 1 — Closed` |
| Headline | *"Congratulations to the Champions of Season 1"* |
| Visual | Confetti animation + 5 winner cards |
| Per winner card | rank emoji, avatar, `display_name + country flag`, return %, coupon count [3] |
| Primary CTA | "Pre-register for Season 2" → OneLink |
| Disclaimer | "Coupons credited to winner accounts. Gift stocks randomly selected from approved list. Non-transferable. No cash alternative." [3] |

### 8.6. Hero copy by variant

Stored in `locales/{lang}.json` under nested keys `hero.{state}.{variant}.{headline|subheadline|cta}`. 9 variants × 5 languages = 45 entries. Master EN copy as documented in v1.0 §10.4.

---

## 9. Live Data Integrations

### 9.1. Live Leaderboard

**Source:** `Product_game` DB tables (rankings, participants) [2]. Snapshot every 3 hours [2].

**Server route (Nitro proxy):**
```typescript
// server/api/leaderboard.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  
  const data = await $fetch(`${config.backendApiUrl}/v1/leaderboard`, {
    query,
    headers: { Authorization: `Bearer ${config.backendApiToken}` },
  });
  
  setHeader(event, 'Cache-Control', 'public, s-maxage=60, stale-while-revalidate=180');
  return data;
});
```

**Client composable (SWR):**
```typescript
// composables/useLeaderboard.ts
import useSWRV from 'swrv';

export function useLeaderboard(limit = 5) {
  const { data, error, isValidating, mutate } = useSWRV(
    () => `/api/leaderboard?limit=${limit}`,
    (url) => $fetch(url),
    {
      refreshInterval: 60_000,        // 60s client poll [1]
      revalidateOnFocus: true,
      dedupingInterval: 30_000,
    }
  );
  return { data, error, isValidating, refresh: mutate };
}
```

**Usage in component:**
```vue
<!-- components/blocks/LiveLeaderboard.vue -->
<script setup lang="ts">
const props = defineProps<{ limit?: number }>();
const { data, error } = useLeaderboard(props.limit ?? 5);
</script>

<template>
  <div v-if="error" class="lb-error">Failed to load leaderboard</div>
  <div v-else-if="!data" class="lb-skeleton"><!-- skeleton --></div>
  <div v-else class="leaderboard-live">
    <header>
      <h3>Top {{ limit }} — Live</h3>
      <span>Updated {{ timeAgo(data.season.last_snapshot_at) }}</span>
    </header>
    <ul>
      <li v-for="p in data.leaders" :key="p.user_id" :data-testid="'leaderboard-row'">
        <span>{{ rankEmoji(p.rank) }}</span>
        <img :src="p.avatar_url" :alt="p.display_name" data-testid="leaderboard-avatar" />
        <span>{{ p.display_name }} {{ flagEmoji(p.country_code) }}</span>
        <span :class="p.pnl_percent >= 0 ? 'positive' : 'negative'" data-testid="pnl-percent">
          {{ p.pnl_percent >= 0 ? '+' : '' }}{{ p.pnl_percent.toFixed(2) }}%
        </span>
      </li>
    </ul>
  </div>
</template>
```

### 9.2. OneLink Download CTA

**Composable:**
```typescript
// composables/useOnelink.ts
export function useOnelink() {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const variant = useCookie<string>('hero_variant');

  function build(params: { location: CTALocation; variantOverride?: string }) {
    const search = new URLSearchParams({
      utm_source:  'ai_game_site',
      utm_medium:  'web',
      utm_campaign:'portfolio_battle_s1',
      utm_content: params.location,
      utm_term:    locale.value,
      pid:         'ai_game_site',
      c:           'portfolio_battle_s1',
      af_adset:    `${locale.value}_${params.location}`,
      af_xp:       'custom',
      deep_link_value: 'open_account',
      af_dp:       'freedom24://open_account',
    });
    const v = params.variantOverride ?? variant.value;
    if (v) search.set('utm_creative', v);
    return `${config.public.onelinkBase}?${search.toString()}`;
  }

  return { build };
}
```

### 9.3. Taplink (instant game launch)

```typescript
// composables/useTaplink.ts
export function useTaplink() {
  const config = useRuntimeConfig();
  const { locale } = useI18n();

  function build(opts: { text?: string; source?: string; medium?: string } = {}) {
    const search = new URLSearchParams({
      text: opts.text ?? 'playgame',
      utm_source: opts.source ?? 'ai_game_site',
      utm_medium: opts.medium ?? 'web',
      utm_campaign: 'portfolio_battle_s1',
      utm_term: locale.value,
    });
    return `${config.public.taplinkBase}?${search.toString()}`;
  }

  return { build };
}
```

### 9.4. Live Tickers Strip

```typescript
// composables/useQuotes.ts
import useSWRV from 'swrv';

const POPULAR_TICKERS = ['AAPL','NVDA','TSLA','MSFT','GOOGL','AMZN','META','NFLX','AMD','INTC'];

export function useQuotes(tickers: string[] = POPULAR_TICKERS) {
  return useSWRV(
    () => `/api/quotes?tickers=${tickers.join(',')}`,
    (url) => $fetch(url),
    { 
      refreshInterval: 15_000,        // 15s [1]
      revalidateOnFocus: true,
    }
  );
}
```

Mandatory micro-disclaimer below the strip: *"Live market data shown for informational purposes only. Does not constitute investment advice."* (per [3] §1.4)

### 9.5. QR Join Block (server-generated SVG)

```typescript
// server/api/qr.get.ts
import QRCode from 'qrcode';

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);
  if (!url) throw createError({ statusCode: 400, statusMessage: 'url required' });
  
  const svg = await QRCode.toString(url as string, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 1,
    color: { dark: '#FFFFFF', light: '#0A0E17' },
  });
  
  setHeader(event, 'Content-Type', 'image/svg+xml');
  setHeader(event, 'Cache-Control', 'public, max-age=86400');
  return svg;
});
```

```vue
<!-- components/blocks/QRJoinBlock.vue -->
<script setup lang="ts">
const { build } = useTaplink();
const taplinkUrl = build({ text: 'playgame', source: 'ai_game_site_qr', medium: 'qr' });
const { data: qrSvg } = await useFetch('/api/qr', { query: { url: taplinkUrl } });
</script>

<template>
  <div class="qr-join">
    <div class="qr-content">
      <h3>Scan. Play. Win.</h3>
      <p>One scan opens the AI chat and launches the game instantly.</p>
      <a :href="taplinkUrl" data-testid="qr-fallback-link">Or tap here on mobile →</a>
    </div>
    <div class="qr-code" data-testid="qr-svg" v-html="qrSvg" />
  </div>
</template>
```

### 9.6. Cache invalidation strategy [1]

| Resource | Strategy | TTL |
|---|---|---|
| Season metadata | ISR | 5 min |
| Leaderboard | Webhook + SWR | 60s client / 3h source |
| Quotes | SWR only | 15s |
| Static pages (Terms, etc.) | ISR | 24h |
| Avatars | CDN | 1h |
| Logos | CDN | 24h |

Webhook from Ranking Engine triggers `POST /api/revalidate` to invalidate Nitro ISR cache for `/leaderboard` after each snapshot.

---

## 10. Internationalization (i18n)

### 10.1. Locale matrix

| Code | Language | Region | URL prefix |
|---|---|---|---|
| `en` | English | Default / global | `/` (no prefix) |
| `de` | Deutsch | Germany, Austria | `/de/` |
| `es` | Español | Spain | `/es/` |
| `pl` | Polski | Poland | `/pl/` |
| `el` | Ελληνικά | Greece, Cyprus | `/el/` |

### 10.2. Configuration

Configured in `nuxt.config.ts` via `@nuxtjs/i18n` (see §4.4). Strategy: `prefix_except_default`.

### 10.3. Usage in templates

```vue
<script setup lang="ts">
const { t, locale, setLocale } = useI18n();
</script>

<template>
  <h1>{{ t('hero.pre.A.headline') }}</h1>
  <p>{{ t('hero.pre.A.subheadline') }}</p>
  <button>{{ t('hero.pre.A.cta') }}</button>
</template>
```

### 10.4. Translation rules

1. Brand terms remain in English: "AI Investment Challenge", "Portfolio Battle", "Freedom Finance Europe"
2. Legal pages (`/terms`, `/disclaimer`, `/privacy`) must be reviewed by legal counsel per jurisdiction. Until reviewed, only EN version is published; other locales display "Available in English only — translation under review"
3. Currency format: Always `$25,000` (USD) — virtual capital denomination is fixed [2]
4. Numeric format: locale-aware via `Intl.NumberFormat`
5. Date format: locale-aware via `Intl.DateTimeFormat` with `dateStyle: 'long'`
6. Informal address: "you" in EN; "du" in DE; "tú" in ES; "ty" in PL; "εσύ" in EL

### 10.5. Cross-language terminology QA

Same matrix as v1.0 — Coupon / Gift Stock / Leaderboard / Portfolio / Virtual Funds / Challenge / Rebalance / Tie-breaker terms verified for each language.

---

## 11. Hyper-personalization Engine

Identical to v1.0. Implementation moves from `lib/personalization.ts` → `composables/usePersonalization.ts`. Privacy guardrails, vectors and consent gating remain unchanged.

```typescript
// composables/usePersonalization.ts
export function usePersonalization() {
  const { locale } = useI18n();
  const headers = useRequestHeaders(['x-vercel-ip-country']);
  const countryCode = headers['x-vercel-ip-country']?.toUpperCase();
  const isReturning = !!useCookie('returning_visitor').value;
  const variant = useCookie<Variant>('hero_variant').value ?? 'A';

  // ...rest of personalization logic
  return { countryCode, isReturning, variant, locale };
}
```

---

## 12. A/B/C Testing Framework

### 12.1. Server-side variant assignment via Nitro middleware

```typescript
// server/middleware/ab-variant.ts
const VARIANTS = ['A', 'B', 'C'] as const;
const COOKIE_NAME = 'hero_variant';
const COOKIE_TTL_S = 60 * 60 * 24 * 30;

export default defineEventHandler((event) => {
  const existing = getCookie(event, COOKIE_NAME);
  if (!existing || !VARIANTS.includes(existing as any)) {
    const v = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    setCookie(event, COOKIE_NAME, v, {
      maxAge: COOKIE_TTL_S,
      path: '/',
      sameSite: 'lax',
    });
  }
});
```

### 12.2. Composable for component access

```typescript
// composables/useABVariant.ts
export function useABVariant(): Ref<Variant> {
  const cookie = useCookie<Variant>('hero_variant', { default: () => 'A' });
  const route = useRoute();
  const config = useRuntimeConfig();
  
  // QA override
  if (config.public.qaMode && route.query.variant) {
    return ref(route.query.variant as Variant);
  }
  
  return cookie;
}
```

### 12.3. Hero template usage

```vue
<script setup lang="ts">
const variant = useABVariant();
const { t } = useI18n();
const props = defineProps<{ season: Season }>();

const copy = computed(() => ({
  headline:    t(`hero.pre.${variant.value}.headline`),
  subheadline: t(`hero.pre.${variant.value}.subheadline`),
  cta:         t(`hero.pre.${variant.value}.cta`),
}));
</script>
```

### 12.4. Tracking, sample sizes, KPIs — identical to v1.0 §12.3–§12.5

---

## 13. Mobile Adaptation

### 13.1. Breakpoints

```
sm:  ≤480px  — phones
md:  ≤768px  — large phones / phablets
lg:  ≤1024px — tablets
xl:  ≤1280px — small laptops
2xl: ≥1280px — desktop
```

### 13.2. Mobile-specific behavior [1]

| Element | Mobile rule |
|---|---|
| Hero title | 32–36px, line-height 1.2 |
| CTA buttons | Full-width within container |
| Sticky CTA | Appears after 600px scroll |
| Leaderboard | Card layout (vertical), not table |
| Ticker strip | Logos 22px, scroll 40s, hide name on tiny screens |
| Prizes podium | Vertical stack, 1 column |
| QR block | Hidden, replaced with prominent "Tap to Play" CTA |
| Hover effects | Replaced with `:active` states |
| Animations | Honor `prefers-reduced-motion` |

### 13.3. Sticky bottom CTA component (Vue)

```vue
<!-- components/blocks/MobileStickyCTA.vue -->
<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();
const visible = computed(() => y.value > 600);

const route = useRoute();
const isLegalPage = computed(() => 
  ['/terms', '/disclaimer', '/privacy'].some(p => route.path.includes(p))
);

const { build } = useTaplink();
const tapLink = build({ source: 'sticky_cta' });
</script>

<template>
  <div
    v-if="!isLegalPage"
    :class="['sticky-cta md:hidden', visible && 'visible']"
    data-testid="mobile-sticky-cta"
  >
    <a :href="tapLink" class="btn btn-primary w-full">
      🚀 {{ $t('cta.sticky_label') }}
    </a>
  </div>
</template>

<style scoped>
.sticky-cta {
  position: fixed; left: 0; right: 0; bottom: 0;
  padding: 12px 16px env(safe-area-inset-bottom);
  background: rgba(10,14,23,0.95);
  backdrop-filter: blur(16px);
  border-top: 1px solid hsl(var(--border));
  transform: translateY(100%);
  transition: transform .3s ease;
  z-index: 1000;
}
.sticky-cta.visible { transform: translateY(0); }
</style>
```

### 13.4. Touch targets, performance — identical to v1.0 §13.3–§13.5

---

## 14. Analytics & Tracking

### 14.1. Stack

- **GA4** — primary analytics, demographics, funnel
- **Custom DataLayer** — `window.dataLayer.push(...)` for GTM compatibility and any future server-side ingestion

> Mixpanel removed per stack update. If future needs require event-driven user analytics, consider Plausible or PostHog (also gated by cookie consent).

### 14.2. Plugin (client-only)

```typescript
// plugins/analytics.client.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const consent = useCookie<string>('cookie_consent');
  
  if (consent.value !== 'accepted') return;
  
  // GA4 init
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.public.ga4Id}`;
  script.async = true;
  document.head.appendChild(script);
  
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
  gtag('js', new Date());
  gtag('config', config.public.ga4Id, { anonymize_ip: true });
  
  return { provide: { gtag } };
});
```

### 14.3. Composable wrapper

```typescript
// composables/useAnalytics.ts
export function useAnalytics() {
  function trackEvent(event: string, properties: Record<string, any> = {}) {
    if (import.meta.server) return;
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ event, ...properties });
    }
    if ((window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
  }
  return { trackEvent };
}
```

### 14.4. Event taxonomy

Identical to v1.0 §14.2. All `mixpanel.track(...)` calls replaced with `useAnalytics().trackEvent(...)`.

### 14.5. Privacy

All analytics blocked until `cookie_consent === 'accepted'` (per GDPR [3] §11). IP anonymization enabled in GA4. No PII in event properties.

---

## 15. Backend API Contracts

### 15.1. Required endpoints (built by Product_game team)

Identical to v1.0 §15.1. The Nuxt site consumes these via Nitro server routes (`server/api/*.get.ts`) acting as authenticated proxies.

#### Required endpoints
- `GET /api/v1/seasons/current`
- `GET /api/v1/leaderboard?season_id=&limit=&user_id=`
- `GET /api/v1/winners?season_id=`
- `GET /api/v1/quotes?tickers=AAPL,NVDA,...`
- `POST /api/v1/cache/invalidate` (webhook → Nuxt revalidate)

### 15.2. Nuxt server proxy pattern

```typescript
// server/api/season.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  const data = await $fetch<Season>(`${config.backendApiUrl}/v1/seasons/current`, {
    headers: { Authorization: `Bearer ${config.backendApiToken}` },
  });
  
  setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  return data;
});
```

### 15.3. ISR revalidation webhook

```typescript
// server/api/revalidate.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);
  
  // Verify webhook signature
  if (headers['x-webhook-token'] !== config.backendApiToken) {
    throw createError({ statusCode: 401 });
  }
  
  const body = await readBody(event);
  // Trigger Nitro cache purge for affected routes
  // Implementation depends on deploy preset (Vercel / Netlify / Cloudflare)
  
  return { revalidated: true, paths: ['/leaderboard', '/'] };
});
```

### 15.4. Privacy handling and consent — identical to v1.0 §15.2–§15.3

The site must ONLY display: `display_name` (server-formatted as `first_name + " " + last_name[0] + "."`), `avatar_url` (signed CDN URL with TTL), `country_code` (ISO alpha-2). Never expose: `user_id`, email, phone, full name, account_id.

---

## 16. Legal Pages — Verbatim Content

Identical to v1.0. All sections from PROMOTION RULES [3] are rendered verbatim. Implementation moves to `pages/terms.vue`, `pages/disclaimer.vue`, `pages/privacy.vue`.

Required clauses:
- Promotion Period: May 11 – June 11, 2026 (inclusive) [3]
- Eligibility: 18+, FFE client, received invite [3]
- Virtual Funds: no monetary value, cannot be withdrawn or exchanged [3]
- Virtual Transactions: stocks and ETFs available in the Bot, simulated only [3]
- Rebalance: max once per Promotion Period [3]
- Performance: based on official closing prices on the final trading day [3]
- Tie-breaker: first in time wins higher rank [3]
- Rewards grid: 40/25/15/10/5 coupons [3]
- 1 coupon = 1 random gift stock from approved list [3]

---

## 17. SEO & Meta

### 17.1. Per-page meta via `useHead`

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const { t, locale } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();

useHead({
  title: t('seo.home.title'),
  meta: [
    { name: 'description', content: t('seo.home.description') },
    { property: 'og:title', content: t('seo.home.og_title') },
    { property: 'og:description', content: t('seo.home.og_description') },
    { property: 'og:image', content: `${config.public.siteUrl}/og/${locale.value}-home.jpg` },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale.value },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: `${config.public.siteUrl}${route.path}` },
    { rel: 'alternate', hreflang: 'en', href: `${config.public.siteUrl}/` },
    { rel: 'alternate', hreflang: 'de', href: `${config.public.siteUrl}/de` },
    { rel: 'alternate', hreflang: 'es', href: `${config.public.siteUrl}/es` },
    { rel: 'alternate', hreflang: 'pl', href: `${config.public.siteUrl}/pl` },
    { rel: 'alternate', hreflang: 'el', href: `${config.public.siteUrl}/el` },
    { rel: 'alternate', hreflang: 'x-default', href: `${config.public.siteUrl}/` },
  ],
});
</script>
```

### 17.2. Structured data (JSON-LD)

Inject via `useHead` `script` array. Includes `Organization`, `WebSite`, `Event` (Promotion period), `FAQPage` on `/faq`.

### 17.3. Sitemap & robots

Use `nuxt-simple-sitemap` and `nuxt-simple-robots` modules:

```bash
pnpm add -D nuxt-simple-sitemap nuxt-simple-robots
```

Add to `nuxt.config.ts` modules and configure to disallow `/api/`, allow everything else.

---

## 18. Performance Budget

Identical to v1.0 §18. Targets: LCP < 2.5s mobile, CLS < 0.1, JS bundle < 200KB gzip.

Nuxt-specific optimizations:
- Server Components (Nuxt 3 islands) for static sections
- `<NuxtImg>` with AVIF/WebP and responsive `sizes`
- `nuxt-font` for font subsetting + `font-display: swap`
- `defineLazyHydrate` for below-fold heavy components
- Pause SWR polling via `document.visibilityState` watcher

---

## 19. Security & GDPR

Identical to v1.0 §19. Compliance basis [3] §11. Cookie consent banner, CSP headers, HSTS, rate limiting on `/api/*`, signed avatar URLs, DSAR form linked from Privacy page.

---

## 20. Build Roadmap (Sprints)

### Sprint 1 — Foundations (Week 1)
- `pnpm dlx nuxi@latest init ai-game-site`
- `pnpm dlx shadcn-vue@latest init --preset b2pl3aBRQ`
- Install all required pro blocks and primitives
- Tokens, Tailwind config, layout primitives
- `SiteHeader.vue` / `SiteFooter.vue` / `LanguageSwitcher.vue`
- `@nuxtjs/i18n` setup with all 5 locales scaffolded
- A/B/C Nitro middleware

### Sprint 2 — Static Landing (Week 2)
- Hero (single state — pre-season)
- `BenefitsGrid.vue`
- `HowItWorksTimeline.vue`
- `PrizesPodium.vue` (40/25/15/10/5 per [3])
- `CouponsExplainer.vue`
- `FAQAccordion.vue`
- Footer & Legal pages (verbatim from [3])

### Sprint 3 — Dynamic Hero States (Week 3)
- `HeroPre.vue` / `HeroLive.vue` / `HeroPost.vue`
- `useSeasonState.ts` composable
- `CountdownTimer.vue`
- `WinnersPodium.vue` for post state
- Confetti animation (CSS or `@vueuse/motion`)

### Sprint 4 — Live Integrations (Week 4)
- Backend API contracts finalized with Product_game team
- Nitro proxy routes (`server/api/*.get.ts`)
- `LiveLeaderboard.vue` with `swrv` + skeleton
- `LiveTickersStrip.vue` with logos + prices
- `revalidate.post.ts` webhook

### Sprint 5 — Mobile + CTA Wiring (Week 5)
- Mobile adaptation pass (all components)
- `MobileStickyCTA.vue`
- `useOnelink` / `useTaplink` composables
- QR generation via `server/api/qr.get.ts`
- Touch-target QA

### Sprint 6 — Personalization + Analytics (Week 6)
- `usePersonalization.ts`
- GA4 plugin + `useAnalytics`
- `CookieConsent.vue`
- A/B/C tracking
- FOMO popups

### Sprint 7 — i18n Completion (Week 7)
- All 5 languages translated
- Legal review per jurisdiction
- Cross-language QA
- SEO meta + hreflang per locale

### Sprint 8 — Hardening & Launch (Week 8)
- Performance audit (Lighthouse + Web Vitals)
- Security headers + CSP
- Accessibility audit (WCAG AA)
- E2E tests (Playwright — see §23)
- Staging UAT
- Production deploy
- Post-launch monitoring

---

## 21. Acceptance Checklist

Identical to v1.0 §21 — all "Must-have for launch" criteria remain valid. The only change is replacing references to:
- "Mixpanel + GA4" → "GA4 + DataLayer"
- "Next.js" → "Nuxt 3"
- "shadcn/ui" → "shadcn-vue"

---

## 22. Claude Opus Handoff Prompt

> **Copy everything below this line into [claude.ai/new](https://claude.ai/new) along with this full document.**

---

### 🎯 Mission

You are scaffolding the production repository for **AI Game | Portfolio Battle**, a promotional website for Freedom Finance Europe Ltd. Use the full specification document above as the single source of truth. Implement the project step by step, sprint by sprint, as defined in §20.

### 🛠️ Stack constraints (non-negotiable)

- **Nuxt 3** (latest version) with Nitro server, hybrid SSR/SSG/ISR
- **Vue 3** + **TypeScript** strict
- **shadcn-vue** with preset `b2pl3aBRQ` — initialize with `pnpm dlx shadcn-vue@latest init --preset b2pl3aBRQ`
- **Tailwind CSS** with the tokens defined in §5.1
- **@nuxtjs/i18n** for i18n (locales: en, de, es, pl, el)
- **`useFetch` / `useAsyncData`** for SSR data, **swrv** for client SWR
- **lucide-vue-next** for icons
- **@vueuse/motion** for animations
- **GA4 + custom dataLayer** for analytics (no Mixpanel)
- **vee-validate + zod** for forms
- **qrcode** package (server-side in Nitro routes)

### 📋 Execution order

1. Initialize the repository per §4.2 structure with `nuxi init`
2. Run `shadcn-vue init` with the preset, then add all components listed in §4.3
3. Implement sprints sequentially as defined in §20
4. Cross-check every public-facing string against [3] (Promotion Rules) — never invent legal/prize content
5. Use only the `useOnelink` and `useTaplink` composables for any external CTA — never hardcode URLs in components
6. Ensure all three hero states (Pre/Live/Post) are functional with mock season data before wiring real API
7. Backend endpoints (§15.1) are implemented separately by the Product_game team — mock them in `server/api/*.get.ts` with realistic JSON until live

### 🚫 Forbidden

- Do not invent prize tiers other than 40/25/15/10/5 coupons for ranks 1–5 [3]
- Do not reference Top 20 or 125 stocks (those were early internal drafts from [2])
- Do not display any DB internals, message_id, trigger_id on the public site
- Do not paraphrase legal text — use verbatim from [3]
- Do not commit any real user data or actual avatar URLs in the repo (use placeholders)
- Do not skip the cookie consent flow — analytics must be gated
- Do not introduce React, Next.js or React-specific libraries — this is a Vue/Nuxt project

### ✅ Definition of done

After each sprint, verify against §21 (Acceptance Checklist) and report which items are now ✅. After Sprint 8, the site should pass all "Must-have for launch" criteria.

### 🆘 When uncertain

If a requirement seems contradictory or missing:
1. Defer to the Promotion Rules [3] for anything user-facing
2. Defer to the Main Product Task [2] for anything internal
3. Ask the user to clarify before guessing

---

**End of specification. Ready for handoff.**

---

## 23. E2E Testing with Playwright

### 23.1. Why Playwright

Playwright is framework-agnostic and works identically against Nuxt 3 SSR pages as it does against Next.js. All test scenarios from v1.0 §23 remain valid.

### 23.2. Project setup

```bash
pnpm add -D @playwright/test
pnpm exec playwright install --with-deps
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['github'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox-desktop',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit-desktop',   use: { ...devices['Desktop Safari'] } },
    { name: 'iphone-14',        use: { ...devices['iPhone 14'] } },
    { name: 'pixel-7',          use: { ...devices['Pixel 7'] } },
    { name: 'galaxy-s23',       use: { ...devices['Galaxy S9+'] } },
    { name: 'de-locale',        use: { ...devices['Desktop Chrome'], locale: 'de-DE' } },
    { name: 'es-locale',        use: { ...devices['Desktop Chrome'], locale: 'es-ES' } },
    { name: 'pl-locale',        use: { ...devices['Desktop Chrome'], locale: 'pl-PL' } },
    { name: 'el-locale',        use: { ...devices['Desktop Chrome'], locale: 'el-GR' } },
  ],
  webServer: {
    command: 'pnpm dev',                    // Nuxt dev server
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,                       // Nuxt cold start
  },
});
```

### 23.3. Priority matrix and test scenarios

Identical to v1.0 §23.3–§23.6. All Critical (P0), Important (P1), and Smoke (P2) specs remain valid. Test files use the same `data-testid` selectors which are framework-agnostic.

### 23.4. Mock fixtures — Nuxt-aware

```typescript
// tests/e2e/fixtures/mock-api.ts
import { Page } from '@playwright/test';

export async function mockSeason(page: Page, override = {}) {
  const defaults = {
    season_id: 's1-2026',
    name: 'Season 1',
    start_at: '2026-05-11T00:00:00Z',
    end_at: '2026-06-11T23:59:59Z',
    status: 'active',
    rules_version: '1.0',
    last_snapshot_at: new Date(Date.now() - 30 * 60_000).toISOString(),
    next_snapshot_at: new Date(Date.now() + 2.5 * 60 * 60_000).toISOString(),
    participants_total: 4823,
  };
  
  // Mock the Nuxt server route, not the upstream backend
  await page.route('**/api/season', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ...defaults, ...override }),
    });
  });
}

export async function mockLeaderboard(page: Page, leaders: any[]) {
  await page.route('**/api/leaderboard*', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        season: { season_id: 's1-2026', last_snapshot_at: new Date().toISOString() },
        leaders,
        current_user: null,
      }),
    });
  });
}
```

### 23.5. CI/CD integration

Same workflow structure as v1.0 §23.8.1. Only difference: the `webServer.command` runs `pnpm dev` (Nuxt) instead of `next dev`.

### 23.6. All other test specs unchanged

Critical (P0), Important (P1), Smoke (P2) — all scenarios from v1.0 §23.4–§23.6 work as-is with Vue components, since they rely on `data-testid` and behavioral assertions, not framework internals.

---

**End of v2.0 specification. Ready for Nuxt-based handoff to Claude Opus.**