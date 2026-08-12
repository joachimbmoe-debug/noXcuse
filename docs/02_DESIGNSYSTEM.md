# Designsystem — noXcuse

> Skrives ned samtidig som det bygges. Denne fila er sannheten. Endres noe i CSS, endres det her først.
> Estetisk retning: **minimalistisk og moderne**. Én retning, holdes hele veien. Ingen blanding.

---

## 1. Farger

Brand-paletten er låst av merkevaren. Fire roller pluss én tilgjengelighetssøster.

| Rolle | Navn | Hex | Bruk |
|---|---|---|---|
| Bakgrunn | Bomull | `#FAF8F2` | Sidebakgrunn, kort |
| Bakgrunn støtte | Lin | `#F0ECE4` | Alternerende seksjoner, felter, tabellstriper |
| Tekst / mørk flate | Marine | `#172E57` | All brødtekst, overskrifter, mørke seksjoner, footer |
| Aksent | Gull | `#E3CEA4` | Kun på marine bakgrunn: X i logo, understreking, ikoner, kantlinjer |
| Aksent AA | Gull dyp | `#7A5E1C` | Gull som **tekst** på lys bakgrunn. Aldri bruk `#E3CEA4` til tekst på lyst. |

**Kontrastmålinger (WCAG, målt — ikke antatt):**

| Kombinasjon | Ratio | Status |
|---|---|---|
| Marine `#172E57` på Bomull `#FAF8F2` | 12,64 : 1 | AAA |
| Bomull `#FAF8F2` på Marine `#172E57` | 12,64 : 1 | AAA |
| Gull `#E3CEA4` på Marine `#172E57` | 8,71 : 1 | AAA |
| Gull `#E3CEA4` på Bomull `#FAF8F2` | 1,45 : 1 | ❌ Aldri tekst |
| Gull dyp `#7A5E1C` på Bomull `#FAF8F2` | 5,74 : 1 | AA |

**Systemfarger** (kun til skjemavalidering, ikke til dekor):

| Rolle | Hex | Kontrast på Bomull |
|---|---|---|
| Feil | `#9B2C1F` | 6,4 : 1 |
| OK | `#1F5D3A` | 6,6 : 1 |

**Aldri:** rød eller terrakotta X. Aldri gradient over marine. Aldri ekstra aksentfarge «for variasjon».

```css
:root {
  --bomull:      #FAF8F2;
  --lin:         #F0ECE4;
  --marine:      #172E57;
  --marine-80:   #45577c;   /* dempet tekst på lys bakgrunn — 7,1:1 */
  --gull:        #E3CEA4;
  --gull-dyp:    #7A5E1C;
  --feil:        #9B2C1F;
  --ok:          #1F5D3A;

  --kant:        rgba(23, 46, 87, 0.14);
  --kant-sterk:  rgba(23, 46, 87, 0.28);
}
```

---

## 2. Typografi

To fonter. Ikke flere.

- **Display:** Montserrat — 600 og 700. Overskrifter, tall, knapper, nav.
- **Brødtekst:** Inter — 400 og 500. All løpende tekst.

Selvhostes som woff2 (`/public/fonts/`), `font-display: swap`. Ikke Google Fonts-CDN — GDPR og lastetid.

```css
:root {
  --font-display: 'Montserrat', system-ui, sans-serif;
  --font-tekst:   'Inter', system-ui, sans-serif;

  /* Skala — fluid, clamp mellom 360px og 1440px */
  --t-hero:   clamp(2.5rem, 1.4rem + 4.6vw, 4.5rem);   /* h1 */
  --t-h2:     clamp(1.9rem, 1.3rem + 2.4vw, 3rem);
  --t-h3:     clamp(1.35rem, 1.1rem + 1vw, 1.75rem);
  --t-stor:   clamp(1.1rem, 1rem + 0.5vw, 1.3rem);     /* ingress */
  --t-brod:   1.0625rem;                                /* 17px */
  --t-liten:  0.9375rem;
  --t-mikro:  0.8125rem;                                /* «Leveransenivå»-etiketter */
}
```

**Regler**

- h1 kun én gang per side.
- Overskrifter: Montserrat 700, `letter-spacing: -0.02em`, `line-height: 1.08`.
- Brødtekst: Inter 400, `line-height: 1.65`, maks `68ch` linjelengde.
- Priser og tall: Montserrat 700 med `font-variant-numeric: tabular-nums`.
- Etiketten over hver pris («Levert og montert») er Montserrat 600, `--t-mikro`, `letter-spacing: 0.12em`, VERSALER, farge `--gull-dyp`.
- Aldri kursiv i overskrifter. Aldri understreking som dekor — kun lenker.

---

## 3. Rom

8px-grid. Bruk kun disse.

```css
:root {
  --rom-1: 0.5rem;   --rom-2: 1rem;    --rom-3: 1.5rem;
  --rom-4: 2rem;     --rom-5: 3rem;    --rom-6: 4rem;
  --rom-7: 6rem;     --rom-8: 8rem;

  --seksjon-y:  clamp(4rem, 2rem + 8vw, 8rem);
  --bredde:     1200px;   /* maks innholdsbredde */
  --bredde-tekst: 68ch;   /* maks tekstbredde */
  --side-x:     clamp(1.25rem, 5vw, 4rem);
}
```

---

## 4. Form og skygge

- **Hjørner:** `--radius: 4px` på knapper og felt, `--radius-kort: 8px` på kort. Ikke mer. Sterkt avrundet leser som «app», ikke som bolig.
- **Skygge:** kun én, og kun på hevede kort og sticky nav:
  `--skygge: 0 1px 2px rgba(23,46,87,.06), 0 8px 24px rgba(23,46,87,.08);`
- Kantlinje foretrekkes over skygge. Rolig og dokumentarisk framfor «salgsside».

---

## 5. Bevegelse

**Én easing. Alle animasjoner bruker den.**

```css
:root {
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
  --tid-rask:  160ms;
  --tid-nor:   280ms;
  --tid-treg:  520ms;
}
```

Tillatt bevegelse:

1. Fade + 16px opp når en seksjon kommer i view (`IntersectionObserver`, `once: true`).
2. Hover: farge og kantlinje. Ikke skalering av kort.
3. Sticky nav som får bakgrunn og skygge etter 40px scroll.
4. Tallteller på kostnadstrappen — kun hvis tallene finnes. Ellers ingen.

**Bygg statisk fallback først, effekten etterpå.** Alt innhold skal være synlig og lesbart uten JS.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1 !important; transform: none !important; }
}
```

---

## 6. Komponenter

### Knapp

| Variant | Bakgrunn | Tekst | Bruk |
|---|---|---|---|
| Primær | `--marine` | `--bomull` | Book befaring · Kan du bygge her? |
| Sekundær | transparent, 1px `--kant-sterk` | `--marine` | Se modeller · Les mer |
| Gull | `--gull` | `--marine` | Kun på marine seksjoner. Én per seksjon. |
| Tekstlenke | — | `--gull-dyp` m/ understrek | I løpende tekst |

Minst 48px høyde. Fokusring: `outline: 2px solid var(--gull-dyp); outline-offset: 3px;` — aldri fjernet.

### Prisboks (den viktigste komponenten på siden)

Rendres **aldri** uten leveransenivå. Komponenten skal kaste feil i build hvis `nivaa` mangler.

```
┌─────────────────────────────────┐
│ LEVERT OG MONTERT      ← etikett, gull-dyp, versaler, mikro
│ 1 234 000 kr           ← Montserrat 700, tabular-nums
│ Inkl. mva.             ← liten, marine-80
│ ─────────────────────                │
│ ✓ Dette er med:  …     ← kort liste
│ ✕ Dette ordner du selv: …
└─────────────────────────────────┘
```

Mangler pris: vis `Pris ikke publisert ennå` i `--marine-80` + lenke «Få prisliste med leveransenivå». **Aldri en tom pris, aldri «fra».**

### Kort (modell)

Bilde 4:3 · modellnavn · m² · romfordeling · prisboks (nivå 1) · «Se modellen». Hele kortet klikkbart, men lenketeksten er den faktiske `<a>`.

---

## 7. Bilder

- Alle bilder samles og optimaliseres **før** bygging. Spør Erik/Husvik om egne fabrikk- og Eidsfoss-bilder først — de har som regel bedre enn de tror.
- Astro `<Image>` → AVIF + WebP, `loading="lazy"` unntatt hero, eksplisitt `width`/`height` mot layout shift.
- Alt-tekst på norsk, beskrivende. Aldri «bilde av hus».
- ⚠️ Ingen stockbilder som gir inntrykk av leverte norske prosjekter. Har vi ikke bildet, bruker vi det ikke.

---

## 8. Ikoner

Tynn strek (1,5px), marine eller gull. Sett: Lucide. **Aldri verktøysymboler** — hammer, pensel, malerrulle hører til vedlikeholdsbransjen.

---

## 9. Brytepunkter

| Navn | Bredde |
|---|---|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

Mobil-først. Hamburgermeny under 1024px. Testes underveis, ikke til slutt.
