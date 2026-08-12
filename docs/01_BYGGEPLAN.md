# Byggeplan — noXcuse salgsnettside

> Stack: **Astro 5 + Tailwind CSS 4 + TypeScript**. Statisk output. Hosting: Vercel eller Netlify.
> Mønster: **én mal, mange innganger.** Modeller og artikler er datafiler, ikke sider.
> Rekkefølge er ikke valgfri. Fase 0 er ferdig (innhold og designsystem foreligger). Start på fase 1.

---

## Fase 0 — Innhold først ✅ ferdig

| | |
|---|---|
| **Formål** | Skaffe kvalifiserte leads til befaring og gratis førstevurdering av tomt, før første leveranse i Eidsfoss 20. august 2026 |
| **Målgruppe** | Fire segmenter, se under. Førstegangsetablereren, senioren i nedsalgsfase, familien med egen tomt, hyttekjøperen. Sekundært utbyggere |
| **Kjernebeskjed** | **Egen bolig til en pris du forstår** |
| **Seksjoner** | Se `04_TEKST_ALLE_SIDER.md` og `08_SEGMENTSIDER_TEKST.md` |

### De fire segmentene styrer arkitekturen

| # | Segment | Rute | Lander på |
|---|---|---|---|
| 1 | Tomta er klar — opparbeidet tomt, alle godkjenninger | `/tomta-er-klar` | Nivå 2, ingen tjenester |
| 2 | Vi tar resten — har tomt, kjøper hele tjenestelisten | `/vi-tar-resten` | Nivå 2 + full meny |
| 3 | Egen entreprenør — har tomt og entreprenør, vil ha valgte poster | `/egen-entreprenor` | Nivå 2 + valgte poster |
| 4 | Vil vite mer | `/kostnadsguiden` | Kostnadsguiden |

**Arkitekturkonsekvensen:** kostnadstrappen forblir tre nivåer. **Tjenestelisten er en à la carte-meny som prises oppå nivå 2.** Ikke lag et fjerde leveransenivå — det ødelegger det klareste selskapet eier. Se `03_SALGSFUNNEL.md` §0.

**Estetisk retning:** minimalistisk og moderne. Holdes hele veien. Ingen blanding.

---

## Fase 1 — Fundament

```bash
npm create astro@latest -- --template minimal --typescript strict
npx astro add tailwind sitemap
```

1. Kopier tokens fra `02_DESIGNSYSTEM.md` inn i `src/styles/global.css` som `@theme`-variabler (Tailwind 4).
2. Last ned Montserrat (600, 700) og Inter (400, 500) som woff2 til `public/fonts/`. `font-display: swap`. **Ikke** Google Fonts-CDN.
3. Opprett `DESIGN.md` i prosjektroten — kopi av designsystemet. Oppdateres samtidig med koden, aldri etterpå.
4. Sett opp `src/config.ts` med feature flags.

```ts
// src/config.ts
export const config = {
  PRISLISTE_KLAR: false,        // ⚠️ true når kronebeløp er låst
  TJENESTELISTE_KLAR: false,    // ⚠️ true når tjenestelisten m/ priser foreligger — blokkerer spor 2 og 3
  TRANSPORTSONER_KLAR: false,   // ⚠️ true når sonepris på transport er satt
  TOMTEVURDERING_KLAR: false,   // ⚠️ true når svartid og innhold er avklart
  GRENSESNITT_RUTINE: false,    // ⚠️ true når Erik bekrefter at rutinen mot kundens entreprenør finnes
  VIS_REFERANSER: false,        // ⚠️ true etter Eidsfoss-overtakelse 20.08.2026
  ORGNR: null,                  // ⚠️ BEKREFT
  TELEFON: null,                // ⚠️ BEKREFT
  EPOST: null,                  // ⚠️ BEKREFT
  DOMENE: null,                 // ⚠️ BEKREFT
  IMPORTSELSKAP: null,          // ⚠️ BEKREFT
} as const;
```

**Regel:** en komponent som trenger en `null`-verdi skal rendre en synlig plassholder i utvikling og feile i produksjonsbygg. Bedre at bygget stopper enn at et oppdiktet telefonnummer går live.

---

## Fase 2 — Filstruktur

```
nettside-3/
├─ DESIGN.md
├─ src/
│  ├─ config.ts
│  ├─ styles/global.css
│  ├─ layouts/
│  │  ├─ Base.astro            # <head>, meta, OG, skip-link, nav, footer
│  │  ├─ Side.astro            # standard innholdsside
│  │  └─ Landing.astro         # uten hovednav — til /kostnadsguiden
│  ├─ components/
│  │  ├─ Nav.astro
│  │  ├─ Footer.astro
│  │  ├─ Knapp.astro
│  │  ├─ Prisboks.astro        # ⚠️ kjernekomponent — se regel under
│  │  ├─ Kostnadstrapp.astro
│  │  ├─ OrdnerSelv.astro      # de seks postene
│  │  ├─ ModellKort.astro
│  │  ├─ Tillitsstripe.astro
│  │  ├─ Prosess.astro
│  │  ├─ Segmentvelger.astro    # fire kort, forsiden
│  │  ├─ SegmentBytte.astro     # «passer ikke dette?» — bunn av segmentsider
│  │  ├─ Tjenestemeny.astro     # à la carte-meny, oppå nivå 2
│  │  ├─ Skjema/
│  │  │  ├─ Spor1TomtKlar.astro
│  │  │  ├─ Spor2HeleJobben.astro
│  │  │  ├─ Spor3EgenEntreprenor.astro
│  │  │  ├─ Kostnadsguide.astro
│  │  │  ├─ Prisliste.astro
│  │  │  ├─ KanDuByggeHer.astro   # gratis førstevurdering
│  │  │  ├─ Tomtevurdering.astro  # betalt mulighetsvurdering
│  │  │  └─ Befaring.astro
│  │  ├─ LeadBaand.astro       # mørk seksjon m/ skjema
│  │  ├─ CtaBlokk.astro
│  │  └─ Reveal.astro          # scroll-animasjon m/ fallback
│  ├─ data/
│  │  ├─ modeller/*.json       # én fil per modell
│  │  ├─ leveransenivaa.ts     # de tre nivåene, én sannhet
│  │  ├─ tjenester.ts          # ⚠️ tjenestelisten — én sannhet, tom til den foreligger
│  │  ├─ segmenter.ts          # de fire sporene, én sannhet
│  │  └─ ordner-selv.ts        # de seks postene, én sannhet
│  ├─ content/
│  │  └─ kunnskap/*.md         # SEO-artikler
│  └─ pages/
│     ├─ index.astro
│     ├─ tomta-er-klar.astro        # spor 1
│     ├─ vi-tar-resten.astro        # spor 2
│     ├─ egen-entreprenor.astro     # spor 3
│     ├─ modeller/index.astro
│     ├─ modeller/[slug].astro
│     ├─ hva-koster-det.astro
│     ├─ slik-gjor-vi-det.astro
│     ├─ kvalitet.astro
│     ├─ om-oss.astro
│     ├─ befaring.astro
│     ├─ kan-du-bygge-her.astro     # gratis førstevurdering — primær-CTA
│     ├─ mulighetsvurdering.astro   # betalt, full gjennomgang
│     ├─ kostnadsguiden.astro
│     ├─ takk.astro
│     ├─ kunnskap/index.astro
│     ├─ kunnskap/[slug].astro
│     ├─ personvern.astro
│     └─ 404.astro
└─ public/
   ├─ fonts/
   ├─ bilder/
   ├─ nedlasting/kostnadsguiden.pdf
   ├─ favicon.svg
   └─ og-bilde.jpg
```

### Datamodell — modell

```ts
type Leveransenivaa = 'fabrikk' | 'levert-montert' | 'totalpris-tomt';

interface Pris {
  nivaa: Leveransenivaa;        // påkrevd — ingen unntak
  belopInkMva: number | null;   // ALLTID inkl. mva. null = ikke publisert. Aldri 0, aldri «fra», aldri intervall
  inkludert: string[];
  ikkeInkludert: string[];
}
```

**Nivå 2 er låst:** `levert-montert` = huset + transport + montasje + tilkobling til **fremlagt** VA, strøm og fiber. Tjenestelinjen «Montasje og tilkobling» gjelder kun når montasje selges separat, til eksterne eller til nivå 1-kjøp. Se `09_TJENESTEMENY.md` §4.

**Transport prises per sone.** Datamodellen må derfor tåle at nivå 2-prisen har et sonetillegg — bygg det inn nå, ikke etterpå:

```ts
interface Transportsone {
  id: string;
  navn: string;              // f.eks. «Sone 1 — Østlandet»
  kommuner: string[];        // eller fylker
  tilleggInkMva: number | null;
}
```

Nivå 2-prisen som vises = husets nivå 2-grunnpris + sonetillegget for kundens kommune. Kjenner vi ikke kommunen ennå, vises grunnprisen med teksten «pluss transport, se soner» og en lenke — **aldri** grunnprisen alene som om den var totalen.

⚠️ **Siden lanseres ikke før prisene er verifisert.** Alt bygges og testes ferdig nå; lansering er å sette flagg til `true` og fylle datafiler. Må kode skrives om ved lansering, er datamodellen feil — fiks den nå. Handlingsplan i `09_TJENESTEMENY.md` §8.

```ts

interface Modell {
  slug: string;
  navn: string;                 // ⚠️ BEKREFT
  kvadratmeter: number | null;  // ⚠️ BEKREFT
  kategori: 'helaarsbolig' | 'hytte' | 'utleieenhet';
  romfordeling: string | null;
  priser: Pris[];               // 1–3 stk, alltid med nivå
  tekniskeData: Record<string, string | null>;
  bilder: { src: string; alt: string }[];
  plantegning: string | null;
}
```

### Datamodell — tjeneste

⚠️ Selve listen finnes ikke ennå. Strukturen kan bygges, innholdet kan ikke gjettes.

```ts
Navn og omfang **finnes** — de står i `09_TJENESTEMENY.md` §3, hentet fra importselskapets prisdokument. **Prisene finnes ikke**: de er utkast, oppgitt som intervaller, og ikke kostnadsverifisert. Kalibreres etter Eidsfoss.

```ts
type Prisstatus = 'publisert' | 'etter-befaring' | 'ikke-kalibrert';

interface Tjeneste {
  id: string;
  navn: string;
  omfang: string;                 // påkrevd — ingen post uten forklaring
  belopInkMva: number | null;     // ALLTID inkl. mva. Aldri intervall
  prisenhet: 'fast' | 'per-aar' | 'prosent' | 'per-time';
  prisstatus: Prisstatus;
  segmenter: (1 | 2 | 3)[];
  kunEksterne: boolean;           // true rendres aldri på privatsidene
}
```

**Regler:**

- Legg inn alle åtte postene fra `09_TJENESTEMENY.md` §3 med navn og omfang, `belopInkMva: null`, `prisstatus: 'ikke-kalibrert'`. Da er strukturen testet før tallene kommer.
- Er `prisstatus: 'ikke-kalibrert'`, rendres **ingen** pris — bare navn, omfang og ventetekst fra `09_TJENESTEMENY.md` §1.
- Intervaller finnes ikke i datamodellen. Det er bevisst.
- `prisstatus: 'etter-befaring'` er tillatt og ærlig, og krever en setning om hva som avgjør prisen.
- Finansieringsformidling legges **ikke** inn i noen status — krever konsesjonsavklaring.
- Skjemaet i spor 3 bytter avkrysningsfeltet med fritekst så lenge ingen post er publisert.

### Datamodell — segment

```ts
interface Segment {
  nr: 1 | 2 | 3 | 4;
  slug: string;
  kortTittel: string;
  kortTekst: string;
  kortCta: string;
  navCta: string;
  epostsekvens: 'A' | 'B' | 'C' | 'D';
}
```

Segmentvalget lagres i `sessionStorage` som `noxcuse_segment` og styrer hvilken CTA som vises ellers på siden. **Uten JS skal alle fire kortene fungere som vanlige lenker**, og standard-CTA er «Book befaring».

### Hard regel — `Prisboks.astro`

```astro
---
const { pris } = Astro.props;
if (!pris.nivaa) {
  throw new Error('Prisboks uten leveransenivå. Dette er et merkevarebrudd — fiks dataene.');
}
---
```

Mangler `belop`: rendre «Prisen på denne modellen er ikke publisert ennå» + knapp. **Aldri** tom pris, aldri «fra», aldri en prislapp uten nivåetikett over.

---

## Fase 3 — Byggerekkefølge

Bygg i denne rekkefølgen. Test mobil etter hver seksjon, ikke til slutt.

| # | Hva | Ferdig når |
|---|---|---|
| 1 | `Base.astro`, Nav, Footer | Nav virker på 360px med hamburger, fokusring synlig |
| 2 | `Knapp.astro` + alle varianter | Alle fire varianter, 48px høyde, fokusring |
| 3 | `Prisboks.astro` | Kaster feil uten nivå, håndterer `belop: null` |
| 4 | `Kostnadstrapp.astro` | Tre trinn, lesbar på 360px, forstås uten forklaring |
| 5 | `OrdnerSelv.astro` | Seks poster fra `ordner-selv.ts` |
| 6 | `Segmentvelger.astro` | Fire kort, fungerer uten JS, ingen fremhevet |
| 7 | Forsiden — alle seksjoner | Tekst ordrett fra `04_TEKST_ALLE_SIDER.md`. Velger under hero, trapp under den |
| 8 | De tre segmentsidene | Tekst ordrett fra `08_SEGMENTSIDER_TEKST.md`. Spor 1 først — den er kortest og viktigst |
| 9 | `Tjenestemeny.astro` | Rendrer ventetekst når `tjenester` er tom. Test begge tilstander |
| 10 | Modell-mal + oversikt | Én mal, modeller fra JSON. Ny modell = ny fil, ingen kodeendring |
| 11 | `/hva-koster-det` | Pilarsiden, lengste tekstsiden |
| 12 | Øvrige innholdssider | Slik gjør vi det, kvalitet, om oss |
| 13 | Alle syv skjemaer + takkesider | **Testet med ekte innsending**, `segment`-felt følger med |
| 14 | `/kunnskap` + collection | Én mal, artikler som markdown |
| 15 | Animasjoner | Legges til **sist**, etter at alt står statisk |

**Prioritering hvis tiden blir knapp:** spor 1 og 4 kan lanseres alene. Spor 2 og 3 er blokkert av tjenestelisten uansett. Én fungerende inngang for kunden med ferdig tomt er verdt mer enn fire halvferdige.

---

## Fase 4 — Skjemaer

**Dette er punktet der prosjekter feiler.** Zest-siden hadde ugyldig endepunkt og mistet henvendelser uten feilmelding. Ikke gjenta det.

**Anbefalt:** Netlify Forms eller Formspark + Zapier/Make til e-postverktøyet. Ingen egen backend å drifte.

Krav:

- Progressiv forbedring: skjemaet skal fungere uten JS (vanlig POST → `/takk`).
- Honeypot-felt + tidsfelle mot spam. **Ikke** reCAPTCHA — det sender brukerdata til Google og passer dårlig for et selskap som selger på tillit.
- Server-side validering av alle felt.
- Synlig feilmelding ved teknisk feil. En bruker skal aldri tro at skjemaet gikk gjennom når det ikke gjorde det.
- Suksess = redirect til `/takk`, ikke en toast som forsvinner.
- E-postvarsel til intern mottaker ved hver innsending.

**Testprotokoll før lansering:**

1. Send ekte innsending fra hvert eneste skjema
2. Bekreft at e-posten faktisk kommer fram — ikke bare at siden viste «takk»
3. Sjekk søppelpostmappen hos mottaker
4. Test med JS slått av
5. Test på faktisk mobil, ikke bare i devtools

---

## Fase 5 — Tilgjengelighet

- Skip-link til hovedinnhold som første fokuserbare element
- Semantisk HTML: `<nav>`, `<main>`, `<article>`, `<footer>`. Én `<h1>` per side, ingen hopp i nivå
- Alle interaktive elementer nåbare med tastatur, synlig fokusring — aldri `outline: none`
- Alt-tekst på alle bilder, på norsk, beskrivende
- `lang="nb"` på `<html>`
- Skjemafelt har `<label>`, ikke bare placeholder
- Feilmeldinger knyttet til feltet med `aria-describedby`
- `prefers-reduced-motion` respekteres — se designsystemet
- Kontrast: alle kombinasjoner er målt i `02_DESIGNSYSTEM.md`. Gull `#E3CEA4` er aldri tekst på lys bakgrunn

---

## Fase 6 — Ytelse og SEO

**Ytelse**

- Astro `<Image>` → AVIF + WebP, eksplisitt `width`/`height`
- Hero-bilde `loading="eager"` + `fetchpriority="high"`, alt annet lazy
- Null JS på sider som ikke trenger det — Astro leverer det som standard, ikke ødelegg det
- Mål: Lighthouse ≥ 95 på alle fire kategorier, mobil

**SEO**

- Unik `<title>` og meta-beskrivelse per side, skrevet for mennesker
- OG-bilde 1200×630 med logo og kjernebeskjed
- JSON-LD: `Organization` på forsiden, `Product` på modellsider (kun med faktisk pris og `priceValidUntil`), `FAQPage` på `/hva-koster-det`
- `sitemap.xml` og `robots.txt`
- Kanoniske URL-er
- Norsk `nb-NO`

⚠️ **Før SEO-teksten låses:** avklar søkeordgrensen mot husvik.no. Husvik har allerede minihus-innhold mot privatpersoner. Ranker begge sider på samme ord, konkurrerer dere med dere selv.

---

## Fase 7 — Før lansering

- [ ] **Hvert skjema testet med ekte innsending, og e-posten bekreftet mottatt**
- [ ] Testet på faktisk telefon, ikke bare devtools
- [ ] Alle bilder optimalisert, ingen over 200 kB
- [ ] `prefers-reduced-motion` respekteres
- [ ] Ingen API-nøkler i klartekst i repoet
- [ ] Alle interne lenker fungerer
- [ ] Favicon og OG-bilde på plass
- [ ] **Ingen oppdiktede referanser, kundesitater eller case-studier**
- [ ] **Ingen pris uten leveransenivå noe sted på siden**
- [ ] **Ingen «fra»-priser**
- [ ] **Ingen «nøkkelferdig» uten definisjon**
- [ ] **Ingen superlativer uten tall bak**
- [ ] **Ingen «laget i Norge»** — Latvia står tydelig
- [ ] **Ingen «kontakt oss for tilbud»** som CTA
- [ ] **Ingen tjeneste nevnt ved navn** før tjenestelisten er bekreftet
- [ ] Alle fire segmentkortene lenker til en side som finnes, og fungerer uten JS
- [ ] Hvert spor har inngang, side, skjema, e-postsekvens og målepunkt
- [ ] Skjult `segment`-felt følger med i hver eneste innsending
- [ ] Ordene «modulbygg» og «brakke» finnes ikke om produktet
- [ ] Ingen konkurrentnavn og ingen publisert prissammenligning
- [ ] Alle `BEKREFT`-punkter er enten løst eller synlig markert som uferdig — ingen gjettede tall
- [ ] Personvernerklæring med riktig org.nr. og faktiske databehandlere
- [ ] Lighthouse ≥ 95 mobil
- [ ] `No Xcuse AS` brukt i alle juridiske sammenhenger, `noXcuse` som merkevare

**Kjør denne før hver deploy:**

```bash
grep -rniE "fra kr|fra [0-9]|nøkkelferdig|modulbygg|brakke|Norges billigste|markedets beste|laget i Norge|kontakt oss for tilbud|noXcuse AS" src/ || echo "OK — ingen merkevarebrudd"
```

---

## Fase 8 — Etter Eidsfoss 20. august 2026

- Sett `VIS_REFERANSER = true`
- Legg inn bilder fra før, under og etter montasje
- Legg inn kundeuttalelse — først etter at den faktisk er gitt
- Erstatt setningen «Vi har ikke levert hus i Norge ennå» med faktisk dokumentasjon. **Ikke bare slett den**
- Hyttesporet får referanser først når hytter faktisk er levert

---

## Harde regler for hele prosjektet

1. **Skreddersydd, aldri mal.** Ingen kjøpt tema.
2. **Publiser.** Perfeksjon er fienden av ferdig. Én runde tilbakemeldinger, så ut.
3. **Skriv designsystemet ned mens du bygger.** `DESIGN.md` oppdateres i samme commit som CSS-en.
4. **Aldri gjett på fakta.** Mangler et tall, står det `BEKREFT`. Et plausibelt tall som viser seg feil, er nøyaktig det navnet lover at vi ikke gjør.
