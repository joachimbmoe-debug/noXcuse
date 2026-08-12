# MANGLER.md — nettside-3

> Alt her mangler. Ingenting av det skal gjettes. Sådd fra `../nettside 3/07_BEKREFT_LISTE.md` sine to
> blokkerende tabeller. Nummereringen følger kildefila slik at de to kan krysjekkes. Ingen linjenummer i
> kildekomponenter ennå — ingen komponenter er bygget i Fase 1. Fylles inn etter hvert som Fase 2/3 bygger
> filene som faktisk blokkeres.

---

## Satt i Fase 1 — teknisk plassholder, ikke fra BEKREFT-lista

| # | Hva | Verdi nå | Fil:linje |
|---|---|---|---|
| F1-1 | Placeholder-domene for `site` (kreves av `@astrojs/sitemap` for å generere `sitemap.xml`) | `https://nettside-3-placeholder.noxcuse.no` | `astro.config.mjs:6` |
| F1-2 | Fontfiler er tomme 0-byte woff2-stubber, ikke ekte skrift | Montserrat 600/700, Inter 400/500 | `public/fonts/montserrat-600.woff2`, `montserrat-700.woff2`, `inter-400.woff2`, `inter-500.woff2` |

Begge må ryddes før lansering: `DOMENE` inn i `astro.config.mjs` når #4 under er løst, ekte woff2 hentet inn og
byttet i `public/fonts/`.

---

## Blokkerer lansering — må løses

| # | Hva | Hvem | Hvor det brukes |
|---|---|---|---|
| 1 | **Org.nr. for No Xcuse AS** | Erik | Footer, personvern, kjøpsbetingelser |
| 2 | ~~**Telefonnummer**~~ — **91661470**. Bekreftet av Joachim i samtale 2026-08-11, satt i `config.ts` | Erik | Nav, footer, alle CTA-er, e-postsignatur |
| 3 | ~~**E-postadresse**~~ — **erik@no-xcuse.no**. Bekreftet av Joachim i samtale 2026-08-11, satt i `config.ts` | Erik | Footer, skjemasvar, avsender i sekvenser |
| 4 | **Domene** | Erik | Alt. Kanoniske URL-er, OG, e-poster, `astro.config.mjs` `site` |
| 5 | **Modellnavn** | Husvik | Modellkort, modell-mal, prisliste |
| 6 | **Kvadratmeter og romfordeling per modell** | Husvik | Modellkort, modell-mal |
| 7 | **Bilder av modellene** | Husvik | Hele siden. Ingen stock som later som norske leveranser |
| 8 | **Priser i kroner, per modell, per leveransenivå** | Erik | Prisboks. Nivå 1 må være åpent publisert |
| 9 | **Importselskapets navn** | Erik | Footer, kvalitetsside, prosesside, e-post A5 og C3 |
| 10 | **Personvernerklæring** med faktiske databehandlere | Erik/jurist | `/personvern` |
| 10b | **Postadresse** — ikke i kilde-BEKREFT-lista, oppdaget ved bygging av Footer (spesifikasjonen krever «Adresse ⚠️ BEKREFT» der). Lagt til som `config.ADRESSE` | Erik | Footer |
| 31 | **⭐ Tjenestelisten fra importselskapet, med pris per post** | Erik / importselskapet | Blokkerer to av fire kundesegmenter. Se `../nettside 3/07_BEKREFT_LISTE.md` for detaljer |

---

## Blokkerer enkeltseksjoner

| # | Hva | Blokkerer |
|---|---|---|
| 11 | **SINTEF TG-nummer + lenke til dokumentet** | `/kvalitet` — påstanden står svakere uten |
| 12 | **Veggtykkelse i mm, U-verdier, energimerke** | Kvalitetspunktet «lavenergi». Uten tall: skriv punktet uten tall |
| 13 | **Leveringstid i uker** | Prosesseksjonen. Aldri lov tid uten bekreftet fabrikkkapasitet |
| 14 | **Mulighetsvurdering: pris, svartid, innhold** | Hele `/mulighetsvurdering`. Hold `TOMTEVURDERING_KLAR = false` til dette er låst |
| 15 | **Befaring: svartid** | Teksten under befaringsskjemaet |
| 16 | **Skriftlig oppsummering etter befaring — gjøres det?** | Punktlista på `/befaring`. Ikke lov det hvis rutinen ikke finnes |
| 17 | **Prislistens gyldighetstid** | Prisliste-PDF og e-post C2. Del av «prisen skal stå seg» |
| 18 | **Erik Moes rolle, bakgrunn, bilde** | `/om-oss`. Ingen oppdiktet historie |
| 19 | **Betalingsbetingelser** | `/kjopsbetingelser` |
| 20 | **Internmottaker for skjemavarsler** | Alle skjemaer |
| 32 | **Rutinen mot kundens egen entreprenør** — sendes fundamentspesifikasjon skriftlig direkte til ham? | Spor 3, seksjonen «Grensesnittet mot entreprenøren din», og e-post D2. `GRENSESNITT_RUTINE = false` |
| 33 | **Selger dere tjenestene, eller formidler dere dem?** | Avgjør avtalepart på tomtearbeid og om § 12-garantien dekker det. Påvirker spor 2 og 3 og garantiteksten på begge |
| 34 | **Svartid per spor** — spor 1 bør ha kortest | Teksten under alle tre segmentskjemaene |
| 35 | **Prises spor 1 automatisk, eller manuelt hver gang?** | Avgjør om spor 1 kan love svar samme dag |
| 36 | **§ 12 som salgsargument — rettet i tekst, men resten må gjennomgås av Erik** | `/kvalitet` seksjon 6, kostnadsguiden side 10, salgsmateriell utenfor nettsiden |
| 37 | **Byggeledelse: beregnes 3–5 % av verdi eks. eller inkl. mva?** | Flagget i prisdokumentet selv |
| 38 | **«Kan du bygge her?» — svartid og hvem som utfører** | Ny gratis primær-CTA |
| 39 | **Betalt mulighetsvurdering: ett fast beløp inkl. mva** | I dag 18 750–31 250. Et intervall kan ikke stå mot forbruker |
| 40 | **Trekkes mulighetsvurderingen fra ved kjøp også for privatkunder?** | Står i dag bare for eksterne |
| 41 | **Ole Marius / Håkon — tjenesteoversikt med priser** | Innhentes i samme runde som samarbeidsavtalen |
| 42 | **Gyldighetstid på prisene** | Hvor lenge de står, og hva som utløser endring |
| 43 | ⛔ **Finansieringsformidling — konsesjonsplikt** | Markedsføres ikke i noen form før juridisk avklaring. Ikke engang som «kommer» |
| 44 | **Søkeordgrense mot husvik.no** (Erik) — Husvik har allerede minihus-innhold mot privatpersoner, ranker begge sider på samme ord konkurrerer dere med dere selv | De åtte planlagte `/kunnskap`-artiklene i `04_TEKST_ALLE_SIDER.md` §12, linje 564. Malen og collection er bygget (steg 14), men ingen artikkel skrives før dette er avklart |

---

## Avgjørelser tatt underveis (ikke BEKREFT-punkter, men verdt å spore)

- **Fire bilder avvist fra forsidekarusellen.** Joachim la til seks bilder i `nettside-3/`-roten til en karusell. Tre (`IMG_1657–1660.jpeg`, kun fire filer men listet som seks — se under) er skjermbilder av et Husvik-tegningsdokument (`Module_V8-1.pdf`) med eksplisitt copyright-forbehold trykt på selve dokumentet: «cannot be copied or used... without Husvik written permission». To (`v8-1 visualisjon.png`, `hf_20260802_...png`) har sparkle-vannmerke — sannsynlig KI-generert, og v8-1 var allerede eksplisitt avvist av Joachim tidligere i prosjektet. Kun `minihus-fabrikk-lang-1280-kopi.webp` var et ekte fabrikkfoto. Joachim bekreftet: bruk kun ekte fabrikkfoto. Karusellen på forsiden bruker dette bildet + de to tilsvarende ekte fotoene fra `Nettside/assets/img/`. De fire avviste filene er IKKE slettet — de ligger fortsatt i `nettside-3/`-roten. Ikke bruk dem noe sted på siden.

- **«Informasjonskapsler» som egen side droppet.** Footer-spesifikasjonen (04_TEKST_ALLE_SIDER.md §1.11) ga ingen verbatim lenketekst for kolonneoverskrifter, og en dedikert cookie-side finnes ikke i sideinventaret (18 ruter). Footer.astro bygget den likevel i første runde — fjernet ved LEAD-revisjon. Kommer tilbake som en seksjon i `/personvern` eller egen side når det faktisk avgjøres, ikke gjettet fram nå.

- **ModellKort viser mindre enn 04_TEKST_ALLE_SIDER.md §1.5 spesifiserer.** Kortet (brukt på både forsiden og `/modeller`) mangler romfordeling og en ekte nivå-1-prisboks — viser i dag kun navn/kvm/generisk «Pris: ikke publisert ennå». Ikke en regresjon i denne runden (ModellKort er uendret baseline), men verdt en egen liten oppgradering senere, gjerne når `/modeller/[slug]` sin ekte Prisboks-logikk kan gjenbrukes i kortet også.

## Regelen

Trengs et av disse tallene i en tekst, skriv at det mangler. Ikke fyll inn noe plausibelt. Se
`src/lib/bekreft.ts` — `faktaEllerPlassholder()` håndhever dette i kode: viser `⚠️ BEKREFT: <felt>` i dev,
kaster feil i produksjonsbygg.
