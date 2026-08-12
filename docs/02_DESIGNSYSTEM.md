# Designsystem — noXcuse

> Skrives ned samtidig som det bygges. Denne fila er sannheten. Endres noe i CSS, endres det her først.
> Estetisk retning: **minimalistisk og moderne**. Én retning, holdes hele veien. Ingen blanding.

---

## 1. Farger

> ⚠️ **RETTET 10. august.** Denne fila hadde tre oppdiktede verdier — `#7A5E1C`, `#9B2C1F` og en manglende gull-sterk. Fasiten er `kunnskap/08_Creative_Library.md`, og den hadde allerede de riktige tonene. Alle verdier under er nå hentet derfra og kontrollregnet på nytt.
>
> **Fasiten vinner alltid.** Avviker denne fila fra `08_Creative_Library.md`, er denne fila feil.

### Lyse flater

| Navn | Token | Hex | Rolle |
|---|---|---|---|
| Bomull | `--bomull` | `#FAF8F2` | Standard sideflate |
| Lin | `--lin` | `#F0ECE4` | Alternerende seksjonsflate |
| Papir | `--papir` | `#FFFDF9` | Kort, skjemafelt, trapp-rutenett |
| Hårlinje | `--hairline` | `#E4DED2` | Alle tynne skillelinjer. Dekorativ, **aldri tekst** |

Nøytralene er varme, ikke kalde. En kald grå bakgrunn trekker siden mot entreprenør og brakke — nettopp assosiasjonen produktet må løsrives fra.

### Tekst og struktur

| Navn | Token | Hex | Rolle |
|---|---|---|---|
| Marine | `--marine` | `#172E57` | Primærtekst, mørke flater, knapper, logo |
| Stein | `--stein` | `#5E6671` | Ingress, bildetekst, sekundærtekst |
| Fjord | `--fjord` | `#2C5773` | Lenker og dokumentasjonsmerker — **kun på lys flate** |

### Tekst på marine flate

| Navn | Token | Hex | Rolle |
|---|---|---|---|
| Lys | `--dark-text` | `#F8F7F4` | Brødtekst og titler på marine |
| Lys dempet | `--dark-soft` | `#AEBECD` | Ingress og sekundærtekst på marine |

### Gull — tre stopp

Gullet fra logofila er en blek champagne som gir 1,45:1 mot papir. Ubrukelig på lyst. Alle tre har samme kulør (40°) — **én farge i tre styrker, ikke tre farger.**

| Navn | Token | Hex | Er egentlig | Bruk |
|---|---|---|---|---|
| Gull marine | `--gull-marine` | `#E3CEA4` | **Champagne** | Ordmerke og taklinje **kun på marine** |
| Gull sterk | `--gull-sterk` | `#C69739` | **Gull** | Flater og streker på lyst — taklinje, prisstreker, logo-X. **Aldri løpende tekst** |
| Gull tekst | `--gull-tekst` | `#856629` | **Bronse** | Eneste gulltone som kan være tekst på lyst — eyebrows, versal-etiketter |

⚠️ Alle tre heter «gull», men bare den midterste *er* gull. Leser noen bare tokennavnet, synes de champagnen er for blass og plukker noe midt imellom. Det har allerede skjedd i søsterselskapenes materiell — `#BDA677` og `#EDE1C7` er i omløp. Ingen av dem skal inn her.

**Ikke pipetter fra logofila.** Tonene er allerede målt ut som rene flatefarger. Antialiasing på en skrå kant gir en tone som er litt lysere, litt blassere og noen grader varmere — typisk rundt `#E3D5B0`. En slik tone ligger på 44° og gir et synlig knekkpunkt i toppen av rampen, mot de to andre stoppene på 40°.

### Funksjonell

| Navn | Token | Hex | Rolle |
|---|---|---|---|
| Feil | `--feil` | `#B3261E` | Feilmeldinger og ugyldige skjemafelt |

**Fordeling 60/30/10:** bomull og lin bærer flaten, marine bærer struktur og tekst, gull er reservert prislinjer, logo-X, eyebrow og tynne streker — **aldri stor flate.**

Utover disse finnes ingen farger. Trengs en variant: `color-mix()` eller `rgba()` av en token. Hårlinjer på marine: `rgba(248,247,244,.16–.22)`.

### Kontrast — kontrollregnet

| Kombinasjon | Ratio | |
|---|---|---|
| Marine på papir | 13,21 : 1 | AAA |
| Marine på bomull | 12,64 : 1 | AAA |
| Lys på marine | 12,53 : 1 | AAA |
| Marine på lin | 11,39 : 1 | AAA |
| Gull marine på marine | 8,71 : 1 | AAA |
| Fjord på bomull | 7,28 : 1 | AAA |
| Lys dempet på marine | 7,06 : 1 | AA |
| Feil på bomull | 6,15 : 1 | AA |
| Stein på bomull | 5,47 : 1 | AA |
| Marine på gull sterk | 5,04 : 1 | AA |
| Gull tekst på bomull | 5,03 : 1 | AA |
| Stein på lin | 4,93 : 1 | AA |
| Gull tekst på lin | 4,54 : 1 | AA, så vidt |

### Fire kombinasjoner som aldri skal forekomme

| Kombinasjon | Ratio | Konsekvens |
|---|---|---|
| Gull marine `#E3CEA4` på lys flate | 1,45 : 1 | Forsvinner. Kun marine bakgrunn |
| Fjord `#2C5773` på marine | 1,74 : 1 | Blått på blått. Bruk `--dark-text` eller `--dark-soft` |
| Gull tekst `#856629` på marine | 2,51 : 1 | Kun for lyse flater |
| Gull sterk `#C69739` som løpende tekst | 2,51 : 1 | Strek og flate, aldri bokstaver |

**Aldri:** rød eller terrakotta X. Aldri gradient over marine. Aldri en ekstra aksentfarge «for variasjon».

```css
:root {
  --bomull:      #FAF8F2;
  --lin:         #F0ECE4;
  --papir:       #FFFDF9;
  --hairline:    #E4DED2;

  --marine:      #172E57;
  --stein:       #5E6671;
  --fjord:       #2C5773;

  --dark-text:   #F8F7F4;
  --dark-soft:   #AEBECD;

  --gull-marine: #E3CEA4;
  --gull-sterk:  #C69739;
  --gull-tekst:  #856629;

  --feil:        #B3261E;
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
- Etiketten over hver pris («Levert og montert») er Montserrat 600, `--t-mikro`, `letter-spacing: 0.12em`, VERSALER, farge `--gull-tekst`.
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
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
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
| Tekstlenke | — | `--gull-tekst` m/ understrek | I løpende tekst |

Minst 48px høyde. Fokusring: `outline: 2px solid var(--gull-tekst); outline-offset: 3px;` — aldri fjernet.

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
