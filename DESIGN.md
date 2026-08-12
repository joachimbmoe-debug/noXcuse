# DESIGN.md — noXcuse nettside-3

> Levende kopi av designsystemet. **Denne fila er sannheten for dette prosjektet** og har forrang foran
> `../nettside 3/02_DESIGNSYSTEM.md` der de to er i konflikt. Oppdateres i samme commit som `src/styles/global.css` —
> aldri etterpå. Estetisk retning: minimalistisk og moderne. Én retning, holdes hele veien.

---

## 0. Tre korrigerte verdier — avviker bevisst fra `02_DESIGNSYSTEM.md`

Bekreftet av kunde i tidligere planleggingsrunde. Kildefila er kjent utdatert på disse tre punktene — ikke revert til dens verdier.

| Token | 02_DESIGNSYSTEM.md (utdatert) | Denne fila (gjeldende) |
|---|---|---|
| `--ease` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | **`cubic-bezier(0.22, 1, 0.36, 1)`** |
| Feil (systemfarge) | `#9B2C1F` | **`#B3261E`** |
| Gull dyp (tekst på lys bakgrunn) | `#7A5E1C` | **`#856629`** |

### Om navngivning i koden

Tailwind 4 sin `@theme`-blokk navngir tokens med et strukturelt prefiks per namespace: `--color-*`, `--text-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--ease-*`. Identitetsnavnet etter prefikset er uendret fra designsystemet — `--gull-dyp` lever videre som `--color-gull-dyp`, `--marine-80` som `--color-marine-80`, osv. Varigheter (`--tid-rask/-nor/-treg`) har ikke et eget Tailwind-namespace og ligger som vanlige CSS-variabler i `:root`.

---

## 1. Farger

Brand-paletten er låst av merkevaren. Fire roller pluss én tilgjengelighetssøster.

| Rolle | Navn | Hex | Tailwind-token | Bruk |
|---|---|---|---|---|
| Bakgrunn | Bomull | `#FAF8F2` | `--color-bomull` | Sidebakgrunn, kort |
| Bakgrunn støtte | Lin | `#F0ECE4` | `--color-lin` | Alternerende seksjoner, felter, tabellstriper |
| Tekst / mørk flate | Marine | `#172E57` | `--color-marine` | All brødtekst, overskrifter, mørke seksjoner, footer |
| Tekst dempet | Marine 80 | `#45577c` | `--color-marine-80` | Dempet tekst på lys bakgrunn — 7,1:1 |
| Aksent | Gull | `#E3CEA4` | `--color-gull` | Kun på marine bakgrunn: X i logo, understreking, ikoner, kantlinjer |
| Aksent AA | Gull dyp | **`#856629`** | `--color-gull-dyp` | Gull som **tekst** på lys bakgrunn. Aldri bruk `#E3CEA4` til tekst på lyst |
| System | Feil | **`#B3261E`** | `--color-feil` | Kun skjemavalidering, ikke dekor |
| System | OK | `#1F5D3A` | `--color-ok` | Kun skjemavalidering, ikke dekor |
| Kant | Kant | `rgba(23,46,87,.14)` | `--color-kant` | Standard kantlinje |
| Kant | Kant sterk | `rgba(23,46,87,.28)` | `--color-kant-sterk` | Sterk kantlinje, sekundærknapp |

**Kontrastmålinger (WCAG, målt — ikke antatt):**

| Kombinasjon | Ratio | Status |
|---|---|---|
| Marine `#172E57` på Bomull `#FAF8F2` | 12,64 : 1 | AAA |
| Bomull `#FAF8F2` på Marine `#172E57` | 12,64 : 1 | AAA |
| Gull `#E3CEA4` på Marine `#172E57` | 8,71 : 1 | AAA |
| Gull `#E3CEA4` på Bomull `#FAF8F2` | 1,45 : 1 | ❌ Aldri tekst |
| Gull dyp `#856629` på Bomull `#FAF8F2` | ikke re-målt etter korrigering — mål på nytt før seksjoner med løpende gull-dyp-tekst bygges | ⚠️ |

**Aldri:** rød eller terrakotta X. Aldri gradient over marine. Aldri ekstra aksentfarge «for variasjon».

---

## 2. Typografi

To fonter. Ikke flere.

- **Display:** Montserrat — 600 og 700. Overskrifter, tall, knapper, nav.
- **Brødtekst:** Inter — 400 og 500. All løpende tekst.

Selvhostes som woff2 fra `public/fonts/`, `font-display: swap`. **Ikke** Google Fonts-CDN.

> ⚠️ Fontfilene i `public/fonts/` er tomme plassholder-stubber (0 byte) satt i Fase 1 — se `MANGLER.md`. Ekte
> woff2-filer for Montserrat 600/700 og Inter 400/500 må hentes inn før noen side kan vise ekte typografi.

| Token | Verdi |
|---|---|
| `--font-display` | `'Montserrat', system-ui, sans-serif` |
| `--font-tekst` | `'Inter', system-ui, sans-serif` |
| `--text-hero` (h1) | `clamp(2.5rem, 1.4rem + 4.6vw, 4.5rem)` |
| `--text-h2` | `clamp(1.9rem, 1.3rem + 2.4vw, 3rem)` |
| `--text-h3` | `clamp(1.35rem, 1.1rem + 1vw, 1.75rem)` |
| `--text-stor` (ingress) | `clamp(1.1rem, 1rem + 0.5vw, 1.3rem)` |
| `--text-brod` | `1.0625rem` (17px) |
| `--text-liten` | `0.9375rem` |
| `--text-mikro` | `0.8125rem` («Leveransenivå»-etiketter) |

**Regler**

- h1 kun én gang per side.
- Overskrifter: Montserrat 700, `letter-spacing: -0.02em`, `line-height: 1.08`.
- Brødtekst: Inter 400, `line-height: 1.65`, maks `68ch` linjelengde.
- Priser og tall: Montserrat 700 med `font-variant-numeric: tabular-nums`.
- Etiketten over hver pris («Levert og montert») er Montserrat 600, `--text-mikro`, `letter-spacing: 0.12em`, VERSALER, farge `--color-gull-dyp`.
- Aldri kursiv i overskrifter. Aldri understreking som dekor — kun lenker.

---

## 3. Rom

8px-grid. Bruk kun disse.

| Token | Verdi |
|---|---|
| `--spacing-rom-1` | `0.5rem` |
| `--spacing-rom-2` | `1rem` |
| `--spacing-rom-3` | `1.5rem` |
| `--spacing-rom-4` | `2rem` |
| `--spacing-rom-5` | `3rem` |
| `--spacing-rom-6` | `4rem` |
| `--spacing-rom-7` | `6rem` |
| `--spacing-rom-8` | `8rem` |
| `--spacing-seksjon-y` | `clamp(4rem, 2rem + 8vw, 8rem)` |
| `--spacing-bredde` | `1200px` (maks innholdsbredde) |
| `--spacing-bredde-tekst` | `68ch` (maks tekstbredde) |
| `--spacing-side-x` | `clamp(1.25rem, 5vw, 4rem)` |

---

## 4. Form og skygge

- **Hjørner:** `--radius-knapp: 4px` på knapper og felt, `--radius-kort: 8px` på kort. Ikke mer. Sterkt avrundet leser som «app», ikke som bolig.
- **Skygge:** kun én, og kun på hevede kort og sticky nav: `--shadow-skygge: 0 1px 2px rgba(23,46,87,.06), 0 8px 24px rgba(23,46,87,.08)`.
- Kantlinje foretrekkes over skygge. Rolig og dokumentarisk framfor «salgsside».

---

## 5. Bevegelse

**Én easing. Alle animasjoner bruker den.**

| Token | Verdi |
|---|---|
| `--ease-brand` | **`cubic-bezier(0.22, 1, 0.36, 1)`** (korrigert, se §0) |
| `--tid-rask` | `160ms` |
| `--tid-nor` | `280ms` |
| `--tid-treg` | `520ms` |

Tillatt bevegelse:

1. Fade + 16px opp når en seksjon kommer i view (`IntersectionObserver`, `once: true`).
2. Hover: farge og kantlinje. Ikke skalering av kort.
3. Sticky nav som får bakgrunn og skygge etter 40px scroll.
4. Tallteller på kostnadstrappen — kun hvis tallene finnes. Ellers ingen.

**Bygg statisk fallback først, effekten etterpå.** Alt innhold skal være synlig og lesbart uten JS.
`prefers-reduced-motion: reduce` er implementert i `src/styles/global.css` allerede i Fase 1, selv om ingen
animerte komponenter finnes ennå — se blokken der.

---

## 6. Komponenter — kommer i Fase 2/3

Ikke bygget i Fase 1. Spesifikasjonen ligger i `../nettside 3/01_BYGGEPLAN.md` (Fase 2/3) og
`../nettside 3/02_DESIGNSYSTEM.md` §6. Kort oppsummert til referanse når Fase 2 starter:

### Knapp

| Variant | Bakgrunn | Tekst | Bruk |
|---|---|---|---|
| Primær | `--color-marine` | `--color-bomull` | Book befaring · Kan du bygge her? |
| Sekundær | transparent, 1px `--color-kant-sterk` | `--color-marine` | Se modeller · Les mer |
| Gull | `--color-gull` | `--color-marine` | Kun på marine seksjoner. Én per seksjon |
| Tekstlenke | — | `--color-gull-dyp` m/ understrek | I løpende tekst |

Minst 48px høyde. Fokusring: `outline: 2px solid var(--color-gull-dyp); outline-offset: 3px;` — aldri fjernet. Implementert globalt allerede i Fase 1 (`:focus-visible` i `global.css`).

**Marine/mørke flater — bruk `--color-gull`, ikke `--color-gull-dyp`, til fokusringen.** `--gull-dyp` er kalibrert for lys bakgrunn (5,74:1). På marine gir den ~2,5:1 — samme dårlige tall som fargeregelen advarer mot for gull tekst på marine. Funnet og rettet i `Footer.astro` (`.footer :focus-visible { outline-color: var(--color-gull); }`, ~8,7:1 på marine). Enhver ny komponent med marine flate (f.eks. `LeadBaand`) må gjøre det samme lokalt — vurder å flytte dette til en global `[data-flate="marine"] :focus-visible`-regel i `global.css` når mønsteret gjentar seg tredje gang, i stedet for å kopiere det per komponent.

### Prisboks (den viktigste komponenten på siden)

Rendres **aldri** uten leveransenivå — skal kaste feil i build hvis `nivaa` mangler. Mangler `belop`: vis
«Prisen på denne modellen er ikke publisert ennå» + knapp. Aldri tom pris, aldri «fra».

### Andre komponenter

Nav, Footer, Kostnadstrapp, OrdnerSelv, ModellKort, Tillitsstripe, Prosess, Segmentvelger, SegmentBytte,
Tjenestemeny, syv skjemakomponenter, LeadBaand, CtaBlokk, Reveal. Se filstruktur i `01_BYGGEPLAN.md` Fase 2.

---

## 7. Bilder

- Alle bilder samles og optimaliseres **før** bygging.
- Astro `<Image>` → AVIF + WebP, `loading="lazy"` unntatt hero, eksplisitt `width`/`height` mot layout shift.
- Alt-tekst på norsk, beskrivende. Aldri «bilde av hus».
- ⚠️ Ingen stockbilder som gir inntrykk av leverte norske prosjekter. Har vi ikke bildet, bruker vi det ikke.

---

## 8. Ikoner

Tynn strek (1,5px), marine eller gull. Sett: **Lucide** (`lucide-astro`, installert i Fase 1). **Aldri
verktøysymboler** — hammer, pensel, malerrulle hører til vedlikeholdsbransjen.

---

## 9. Brytepunkter

| Navn | Bredde | Tailwind default |
|---|---|---|
| sm | 640px | matcher — ingen override nødvendig |
| md | 768px | matcher — ingen override nødvendig |
| lg | 1024px | matcher — ingen override nødvendig |
| xl | 1280px | matcher — ingen override nødvendig |

Mobil-først. Hamburgermeny under 900px per `01_BYGGEPLAN.md`/prompt (avviker fra `02_DESIGNSYSTEM.md`s 1024px —
avklares i Fase 2 når `Nav.astro` bygges, ikke låst her).

---

## 10. Plassholdere satt i Fase 1

| Hva | Verdi nå | Hvor |
|---|---|---|
| `site` (domene for sitemap) | `https://nettside-3-placeholder.noxcuse.no` | `astro.config.mjs` |
| Fontfiler | Tomme 0-byte woff2-stubber | `public/fonts/*.woff2` |

Begge er listet i `MANGLER.md`.
