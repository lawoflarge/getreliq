# AntikFinder — AI-Enhanced Antique Market Calendar (PoC)

## Konzept

**Nische:** Regionaler Antikmarkt-Kalender für den DACH-Raum mit AI-Layer  
**These:** Bestehende Antikmarkt-Kalender sind reine "Kalender-Dumps" aus 2010er-Technologie. Niemand hat AI. Die kaufkräftige Zielgruppe 50+ wird komplett unterversorgt.

## Was dieses PoC demonstriert

Ein User lädt ein Foto einer Antiquität hoch → Claude Vision identifiziert Periode, Stil & Marktwert → Automatische Affiliate-Links zu eBay, Catawiki und Pamono werden generiert.

```
User lädt Foto hoch
    ↓ POST /api/identify
route.ts → base64 konvertieren
    ↓
claudeIdentify.ts → Claude Opus 4.7 (Vision)
    ↓ strukturiertes JSON
{title, period, style, valueRange, searchTerms, confidence}
    ↓
affiliateLinks.ts → 3 Tracking-URLs generieren
    ↓
UI zeigt: Objekt-Details + 3 CTA-Buttons (eBay / Catawiki / Pamono)
```

---

## Marktanalyse

### Konkurrenz (DACH)

| Plattform | Stärken | Schwächen |
|-----------|---------|-----------|
| meine-flohmarkt-termine.de | Große DB, DE/AT/CH | Kein AI, kein Foto, UI 2005 |
| marktcom.de | App vorhanden, 30 Kategorien | Keine Empfehlungen, kein Preiskontext |
| melan.de | 4M Besucher, 1.500 Events/Jahr | Nur eigene Events, kein Aggregator |
| Antiques Atlas (UK) | Beste Suchtiefe, Händlerprofile | Nur UK, kein DACH |

**Fazit:** Niemand hat AI. Klare Marktlücke.

---

## Monetarisierungsstrategie

### Phase 1 — Affiliate (ab Tag 1)

| Plattform | Provision | Netzwerk | Cookie | Einstieg |
|-----------|-----------|----------|--------|----------|
| eBay EPN | 3% auf Antiquitäten (max. €550) | Direkt (EPN) | 24h | Sofort, kein Mindesttraffic |
| Catawiki | €40 pro Neukunde | Partnerize | 30–60 Tage | Website nötig |
| Pamono | 5–7% je nach Volumen | FlexOffers | k.A. | Website + Approval |

**Mechanik:** Foto-Upload → AI identifiziert Objekt → Affiliate-Links zu passenden Suchergebnissen

### Phase 2 — B2B Veranstalter (ab Monat 3)

- Basis: kostenlos listen
- Premium (€29–€79/Monat): Featured-Platzierung, AI-generierte Eventbeschreibung, Statistiken

### Phase 3 — Premium User (ab Monat 6)

| Tier | Preis | Features |
|------|-------|----------|
| Free | €0 | Kalender, 3 Foto-Scans/Monat |
| Collector | €7/Monat | Unbegrenzte Scans, Alerts, Routenplaner |
| Dealer | €29/Monat | Händlerprofil, Inventar-AI, Analytics |

### Unit Economics (Beispielrechnung bei 1.000 aktiven Usern)

```
300 Collector-User × €7/Monat    = €2.100
50 Premium-Veranstalter × €49    = €2.450
Affiliate (konservativ)           = €1.500
                                   ──────
                                   ~€6.000/Monat
```

---

## Tech-Stack

| Layer | Technologie |
|-------|-------------|
| Frontend | Next.js 15 + Tailwind CSS |
| Backend | Next.js API Routes (serverless) |
| AI | Claude API (claude-opus-4-7) via `@anthropic-ai/sdk` |
| DB (Phase 2) | Supabase (PostgreSQL + Auth + Storage) |
| Maps (Phase 2) | Mapbox GL |
| Hosting | Vercel |

---

## Installation & Setup

### 1. Dependencies installieren

```bash
npm install
```

### 2. Umgebungsvariablen setzen

```bash
cp .env.local.example .env.local
```

Dann `.env.local` bearbeiten:

```env
# Pflicht
ANTHROPIC_API_KEY=sk-ant-...

# Optional — Affiliate-Links funktionieren auch ohne, aber ohne Tracking
EBAY_CAMP_ID=YOUR_CAMPAIGN_ID
```

### 3. Dev-Server starten

```bash
npm run dev
# → http://localhost:3000
```

---

## Affiliate-Programme aktivieren

| Plattform | Schritt | Zeitaufwand |
|-----------|---------|-------------|
| eBay EPN | [partnernetwork.ebay.com](https://partnernetwork.ebay.com) → Camp-ID in `.env.local` eintragen | 10 Min |
| Catawiki | [join.partnerize.com/catawiki](https://join.partnerize.com/catawiki/en) → Tracking-Prefix ersetzen | 30 Min |
| Pamono | [flexoffers.com](https://www.flexoffers.com) → Approval abwarten, dann URL ersetzen | 1–7 Tage |

Die Links funktionieren auch ohne Affiliate-IDs — sie leiten dann nur ohne Tracking weiter.

---

## Projektstruktur

```
antikfinder/
├── lib/
│   ├── claudeIdentify.ts     ← Claude Vision API (Objekt-Identifikation)
│   └── affiliateLinks.ts     ← Affiliate-Link-Generator (eBay/Catawiki/Pamono)
├── app/
│   ├── page.tsx              ← Haupt-UI (Drag & Drop Upload + Ergebnisanzeige)
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       └── identify/
│           └── route.ts      ← API-Endpoint (POST /api/identify)
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Roadmap

### MVP (dieses PoC — Woche 1–6)
- [x] Foto-Upload mit Drag & Drop
- [x] Claude Vision Identifikation (Periode, Stil, Marktwert, Zustand)
- [x] Automatische Affiliate-Links (eBay, Catawiki, Pamono)
- [ ] Affiliate-Accounts aktivieren

### Phase 2 (Monat 2–3)
- [ ] Antikmarkt-Kalender Aggregator (Scraping der Top 3 DACH-Plattformen)
- [ ] Kartenansicht mit Radius-Suche
- [ ] Persönliche Markt-Alerts ("Ich suche Biedermeier in 50km")

### Phase 3 (Monat 4–6)
- [ ] Händlerprofile
- [ ] Routen-Planer ("3 Märkte, ein Wochenende")
- [ ] User-Accounts (Supabase Auth)
- [ ] Premium-Subscriptions (Stripe)
