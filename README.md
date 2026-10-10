# AntikFinder: AI-Enhanced Antique Market Calendar (PoC)

## Concept

**Niche:** Regional antique market calendar for the DACH region (Germany, Austria, Switzerland) with an AI layer on top  
**Thesis:** Existing antique market calendars are plain "calendar dumps" built on 2010s technology. Nobody has AI. The high-spending 50+ target demographic is completely underserved.

## What This PoC Demonstrates

A user uploads a photo of an antique → Claude Vision identifies the period, style & market value → Affiliate links to eBay, Catawiki, and Pamono are generated automatically.

```
User uploads photo
    ↓ POST /api/identify
route.ts → convert to base64
    ↓
claudeIdentify.ts → Claude Opus 4.7 (Vision)
    ↓ structured JSON
{title, period, style, valueRange, searchTerms, confidence}
    ↓
affiliateLinks.ts → generate 3 tracking URLs
    ↓
UI shows: object details + 3 CTA buttons (eBay / Catawiki / Pamono)
```

---

## Market Analysis

### Competitors (DACH)

| Platform | Strengths | Weaknesses |
|----------|-----------|------------|
| meine-flohmarkt-termine.de | Large DB, DE/AT/CH | No AI, no photo, 2005 UI |
| marktcom.de | App available, 30 categories | No recommendations, no price context |
| melan.de | 4M visitors, 1,500 events/year | Own events only, not an aggregator |
| Antiques Atlas (UK) | Best search depth, dealer profiles | UK only, no DACH |

**Conclusion:** Nobody has AI. Clear market gap.

---

## Monetization Strategy

### Phase 1: Affiliate (Day 1)

| Platform | Commission | Network | Cookie | Requirements |
|----------|------------|---------|--------|--------------|
| eBay EPN | 3% on antiques (max. €550) | Direct (EPN) | 24h | Instant, no traffic minimum |
| Catawiki | €40 per new customer | Partnerize | 30-60 days | Website required |
| Pamono | 5-7% by volume | FlexOffers | n/a | Website + approval |

**Mechanic:** Photo upload → AI identifies object → affiliate links to matching search results

### Phase 2: B2B Organizers (Month 3)

- Base: free listings
- Premium (€29-€79/month): featured placement, AI-generated event descriptions, statistics

### Phase 3: Premium Users (Month 6)

| Tier | Price | Features |
|------|-------|----------|
| Free | €0 | Calendar, 3 photo scans/month |
| Collector | €7/month | Unlimited scans, alerts, route planner |
| Dealer | €29/month | Dealer profile, inventory AI, analytics |

### Unit Economics (example at 1,000 active users)

```
300 Collector users × €7/month   = €2,100
50 premium organizers × €49      = €2,450
Affiliate (conservative)          = €1,500
                                   ───────
                                   ~€6,000/month
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 + Tailwind CSS |
| Backend | Next.js API Routes (serverless) |
| AI | Claude API (claude-opus-4-7) via `@anthropic-ai/sdk` |
| DB (Phase 2) | Supabase (PostgreSQL + Auth + Storage) |
| Maps (Phase 2) | Mapbox GL |
| Hosting | Vercel |

---

## Installation & Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Optional — affiliate links work without these, but without tracking
EBAY_CAMP_ID=YOUR_CAMPAIGN_ID
```

### 3. Start dev server

```bash
npm run dev
# → http://localhost:3000
```

---

## Activating Affiliate Programs

| Platform | Steps | Time |
|----------|-------|------|
| eBay EPN | [partnernetwork.ebay.com](https://partnernetwork.ebay.com) → add Camp ID to `.env.local` | 10 min |
| Catawiki | [join.partnerize.com/catawiki](https://join.partnerize.com/catawiki/en) → replace tracking prefix | 30 min |
| Pamono | [flexoffers.com](https://www.flexoffers.com) → wait for approval, then replace URL | 1-7 days |

Links work without affiliate IDs: they just forward without tracking.

---

## Project Structure

```
getreliq/
├── lib/
│   ├── claudeIdentify.ts     ← Claude Vision API (object identification)
│   └── affiliateLinks.ts     ← Affiliate link generator (eBay/Catawiki/Pamono)
├── app/
│   ├── page.tsx              ← Main UI (drag & drop upload + results card)
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       └── identify/
│           └── route.ts      ← API endpoint (POST /api/identify)
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Roadmap

### MVP (this PoC: weeks 1-6)
- [x] Drag & drop photo upload
- [x] Claude Vision identification (period, style, market value, condition)
- [x] Automatic affiliate links (eBay, Catawiki, Pamono)
- [ ] Activate affiliate accounts

### Phase 2 (months 2-3)
- [ ] Antique market calendar aggregator (scraping top 3 DACH platforms)
- [ ] Map view with radius search
- [ ] Personal market alerts ("I'm looking for Biedermeier within 50km")

### Phase 3 (months 4-6)
- [ ] Dealer profiles
- [ ] Route planner ("3 markets, one weekend")
- [ ] User accounts (Supabase Auth)
- [ ] Premium subscriptions (Stripe)
