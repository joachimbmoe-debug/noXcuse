# MANGLER.md — nettside-3

> Alt her mangler. Ingenting av det skal gjettes — se `src/lib/bekreft.ts` nederst for hvordan koden
> håndhever det. Sådd fra `07_BEKREFT_LISTE.md` sine to blokkerende tabeller; nummereringen (`#1`, `#2` …)
> følger fortsatt den kildefila så de to kan krysjekkes. Bokstav-suffiks (`10b`) betyr «oppdaget under
> bygging, ikke i kilden». Kryss av `[x]` og skriv svaret rett i lista når noe blir bekreftet — ikke
> flytt det til en annen fil.

**Oppdatert sist:** 2026-08-12 — telefon, e-post, importselskapets navn (Levert Norge AS), domene (no-xcuse.no), org.nr (915612474) og postadresse (Gamleveien 35B, 1406 Ski) bekreftet av Joachim. «Grunnfakta»-gruppen under Erik er nå komplett.

---

## 🔥 Haster mest

De tyngste blokkerne — én stopper to hele kundesegmenter, én er en juridisk skranke, én (domenet) er nå løst.

- [ ] **[#31] ⭐ Tjenestelisten fra importselskapet, med pris per post** — Erik / importselskapet. Blokkerer spor 2 og 3 (to av fire kundesegmenter) helt. Se `docs/07_BEKREFT_LISTE.md` for detaljer.
- [ ] **[#43] ⛔ Finansieringsformidling — konsesjonsplikt** — avklares juridisk. Markedsføres ikke i noen form før dette er avklart. Ikke engang som «kommer».
- [x] **[#4] Domene** — **no-xcuse.no**. Bekreftet av Joachim 2026-08-12, satt i `config.ts` og `astro.config.mjs` sin `site`-verdi.

---

## Erik

### Grunnfakta (kontaktinfo, juridisk enhet)

- [x] **[#1] Org.nr. for No Xcuse AS** — **915612474**. Bekreftet av Joachim 2026-08-12, satt i `config.ts`.
- [x] **[#2] Telefonnummer** — **91661470**. Bekreftet av Joachim 2026-08-11, satt i `config.ts`.
- [x] **[#3] E-postadresse** — **erik@no-xcuse.no**. Bekreftet av Joachim 2026-08-11, satt i `config.ts`.
- [x] **[#10b] Postadresse** — **Gamleveien 35B, 1406 Ski**. Bekreftet av Joachim 2026-08-12, satt i `config.ADRESSE`.
- [x] **[#9] Importselskapets navn** — **Levert Norge AS**. Bekreftet av Joachim 2026-08-12, satt i `config.ts`.

### Priser

- [ ] **[#8] Priser i kroner, per modell, per leveransenivå** — Prisboks. Nivå 1 må være åpent publisert.
- [ ] **[#39] Betalt mulighetsvurdering: ett fast beløp inkl. mva** — i dag et intervall (18 750–31 250), kan ikke stå slik mot forbruker.
- [ ] **[#40] Trekkes mulighetsvurderingen fra ved kjøp, også for privatkunder?** — står i dag bare bekreftet for eksterne.
- [ ] **[#37] Byggeledelse: 3–5 % av verdi eks. eller inkl. mva?** — flagget i prisdokumentet selv.
- [ ] **[#42] Gyldighetstid på prisene** — hvor lenge de står, og hva som utløser endring.
- [ ] **[#17] Prislistens gyldighetstid** — prisliste-PDF og e-post C2. Del av løftet «prisen skal stå seg».

### Prosess og tekst

- [ ] **[#14] Mulighetsvurdering: pris, svartid, innhold** — blokkerer hele `/mulighetsvurdering`. Hold `TOMTEVURDERING_KLAR = false` til dette er låst.
- [ ] **[#15] Befaring: svartid** — teksten under befaringsskjemaet.
- [ ] **[#16] Skriftlig oppsummering etter befaring — gjøres det?** — punktlista på `/befaring`. Ikke lov det hvis rutinen ikke finnes.
- [ ] **[#34] Svartid per spor** — spor 1 bør ha kortest. Teksten under alle tre segmentskjemaene.
- [ ] **[#35] Prises spor 1 automatisk, eller manuelt hver gang?** — avgjør om spor 1 kan love svar samme dag.
- [ ] **[#38] «Kan du bygge her?» — svartid og hvem som utfører** — den nye gratis primær-CTA-en.
- [ ] **[#18] Erik Moes rolle, bakgrunn, bilde** — `/om-oss`. Ingen oppdiktet historie i mellomtiden.

### Juridisk og avtaler

- [ ] **[#19] Betalingsbetingelser** — `/kjopsbetingelser`.
- [ ] **[#32] Rutinen mot kundens egen entreprenør** — sendes fundamentspesifikasjon skriftlig direkte til ham? Gjelder spor 3, seksjonen «Grensesnittet mot entreprenøren din», og e-post D2. `GRENSESNITT_RUTINE = false` til dette er avklart.
- [ ] **[#33] Selger dere tjenestene, eller formidler dere dem?** — avgjør avtalepart på tomtearbeid og om § 12-garantien dekker det. Påvirker spor 2 og 3 og garantiteksten på begge.
- [ ] **[#36] § 12 som salgsargument — rettet i tekst, men resten må gjennomgås** — `/kvalitet` seksjon 6, kostnadsguiden side 10, salgsmateriell utenfor nettsiden.
- [ ] **[#44] Søkeordgrense mot husvik.no** — Husvik har allerede minihus-innhold mot privatpersoner, og de to sidene ville rangert på samme ord og konkurrert med hverandre. Blokkerer de åtte planlagte `/kunnskap`-artiklene (`docs/04_TEKST_ALLE_SIDER.md` §12). Malen og collection er bygget (steg 14), men ingen artikkel skrives før dette er avklart med Erik/Husvik sammen.

### Drift

- [ ] **[#20] Internmottaker for skjemavarsler** — alle sju skjemaer. E-postvarsel konfigureres i Netlify sitt dashbord, men trenger en mottaker-adresse først.

---

## Husvik

- [ ] **[#5] Modellnavn** — modellkort, modell-mal, prisliste.
- [ ] **[#6] Kvadratmeter og romfordeling per modell** — modellkort, modell-mal.
- [ ] **[#7] Bilder av modellene** — hele siden. Ingen stockfoto som later som norske leveranser.
- [ ] **[#11] SINTEF TG-nummer + lenke til dokumentet** — `/kvalitet`. Påstanden står svakere uten.
- [ ] **[#12] Veggtykkelse i mm, U-verdier, energimerke** — kvalitetspunktet «lavenergi». Uten tall: skriv punktet uten tall i mellomtiden.
- [ ] **[#13] Leveringstid i uker** — prosesseksjonen. Aldri lov tid uten bekreftet fabrikkkapasitet.

## Erik og jurist sammen

- [ ] **[#10] Personvernerklæring med faktiske databehandlere** — `/personvern`.

## Ole Marius / Håkon

- [ ] **[#41] Tjenesteoversikt med priser** — innhentes i samme runde som samarbeidsavtalen.

---

## Tekniske plassholdere — ikke BEKREFT-punkter, men rydd før lansering

Satt i Fase 1 for at bygget skulle fungere, ikke reelle fakta i seg selv:

- [x] **Placeholder-domene for `site`** — løst sammen med `[#4]`. `astro.config.mjs` bruker nå `https://no-xcuse.no`.
- [ ] **Fontfiler er tomme 0-byte woff2-stubber**, ikke ekte skrift — Montserrat 600/700 og Inter 400/500 i `public/fonts/`. Hent inn ekte woff2 og bytt ut.

---

## Avgjørelser tatt underveis

Ikke BEKREFT-punkter, men verdt å spore.

- **Fire bilder avvist fra forsidekarusellen.** Joachim la til seks bilder i `nettside-3/`-roten. Tre (`IMG_1657–1660.jpeg`) er skjermbilder av et Husvik-tegningsdokument (`Module_V8-1.pdf`) med eksplisitt copyright-forbehold trykt på dokumentet selv. To (`v8-1 visualisjon.png`, `hf_20260802_...png`) har sparkle-vannmerke — sannsynlig KI-generert, og `v8-1` var allerede eksplisitt avvist av Joachim tidligere. Kun ekte fabrikkfoto brukes (`fabrikk-1/2/3.webp` i `public/bilder/`). De fire avviste filene er ikke slettet, men skal ikke brukes noe sted på siden.

- **«Informasjonskapsler» som egen side droppet.** Footer-spesifikasjonen ga ingen verbatim lenketekst for dette, og en dedikert cookie-side finnes ikke i sideinventaret. Kommer tilbake som en seksjon i `/personvern` eller egen side den dagen det faktisk avgjøres.

- **ModellKort viser mindre enn `04_TEKST_ALLE_SIDER.md` §1.5 spesifiserer.** Kortet (forsiden og `/modeller`) mangler romfordeling og en ekte nivå-1-prisboks — viser i dag kun navn/kvm/generisk «Pris: ikke publisert ennå». Ikke en regresjon, men en liten oppgradering å ta senere, gjerne når `/modeller/[slug]` sin ekte Prisboks-logikk kan gjenbrukes i kortet også.

---

## Engelsk versjon

i18n-infrastruktur (Astro sin innebygde `i18n`-routing, `/en/`-prefiks, språkvelger i Nav.astro)
er bygget 2026-08-12. Selve innholdet er ikke.

- [ ] **Engelsk tekst for alle 16 `/en/`-sider** — stubbene i `src/pages/en/` viser i dag kun en
  «English content is on its way»-setning med lenke tilbake til norsk. Joachim skaffer og leverer
  den engelske teksten selv; ingen dato satt for når.

---

## Regelen

Trengs et av disse tallene i en tekst, skriv at det mangler. Ikke fyll inn noe plausibelt.
`src/lib/bekreft.ts` sin `faktaEllerPlassholder()` håndhever dette i kode: viser `⚠️ BEKREFT: <felt>`
i dev, kaster feil og stopper produksjonsbygget (bekreftet i et ekte Netlify-bygg 2026-08-12) hvis
et felt fortsatt er `null`.
