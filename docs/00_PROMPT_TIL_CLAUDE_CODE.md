# Prompt til Claude Code

> **Slik bruker du den:** legg hele mappa `nettside 3` i prosjektroten. Åpne Claude Code der. Lim inn alt under streken.

---

Du skal bygge en salgsnettside for **noXcuse** (No Xcuse AS), et norsk salgsselskap for fabrikkbygde småhus og hytter produsert av Husvik 3D SIA i Riga, Latvia.

## Les først

Les disse filene i `docs/` før du skriver en eneste linje kode. De er spesifikasjonen — ikke inspirasjon, ikke forslag.

1. `01_BYGGEPLAN.md` — stack, filstruktur, faser, rekkefølge, sjekkliste
2. `02_DESIGNSYSTEM.md` — farger, fonter, rom, bevegelse, komponenter
3. `03_SALGSFUNNEL.md` — fire kundesegmenter, fire spor, lead magnets, måling
4. `04_TEKST_ALLE_SIDER.md` — **all tekst, ferdig skrevet. Kopier ordrett.**
5. `05_LEADMAGNET_KOSTNADSGUIDEN.md` — innhold i lead magnetene
6. `06_EPOSTSEKVENSER.md` — seks e-postsekvenser koblet til skjemaene
7. `07_BEKREFT_LISTE.md` — fakta som ikke finnes ennå
8. `08_SEGMENTSIDER_TEKST.md` — **tekst til segmentvelgeren og de fire sporene**
9. `09_TJENESTEMENY.md` — **tjenestene, mva-regelen og § 12-regelen. Les denne før du skriver noe om pris eller garanti.**
10. `10_BACKEND.md` — **skjemaendepunkt, database, e-postruting og GDPR. Bygges etter fase 3.**

Følg byggerekkefølgen i `01_BYGGEPLAN.md` fase 3. Ikke hopp fram til animasjoner.

## Hva du bygger

Astro 5 + Tailwind 4 + TypeScript, statisk output. Prosjektet skal ligge i mappa `nettside-3/`.

Sider: forside · **tomta-er-klar** · **vi-tar-resten** · **egen-entreprenor** · modelloversikt · modell-mal · hva-koster-det · slik-gjor-vi-det · kvalitet · om-oss · befaring · **kan-du-bygge-her** · mulighetsvurdering · kostnadsguiden (landingsside) · takk · kunnskap (oversikt + mal) · personvern · 404.

**Én mal, mange innganger.** Modeller er JSON-filer i `src/data/modeller/`, artikler er markdown i `src/content/kunnskap/`. En ny modell skal kunne legges inn som én ny fil, uten at du rører komponenter eller ruter.

## Det viktigste strukturelle valget

Kunden kommer til siden fra fire forskjellige steder, og en segmentvelger rett under hero lar hen si hvor. Tre av fire har allerede tomt og vil ha et tall — tvinger vi dem gjennom en kostnadsguide først, mister vi dem.

| # | Segment | Rute | Trenger |
|---|---|---|---|
| 1 | Opparbeidet tomt, alle godkjenninger | `/tomta-er-klar` | Ett tall, fort. Kortest side på nettstedet |
| 2 | Har tomt, vil ikke være byggherre | `/vi-tar-resten` | Hus + hele tjenestelisten |
| 3 | Har tomt og egen entreprenør | `/egen-entreprenor` | Hus + valgte tjenester |
| 4 | Vil bare vite mer | `/kostnadsguiden` | Kostnadsguiden, ingen selger |

**Kostnadstrappen forblir tre nivåer.** Tjenestelisten er en à la carte-meny som prises oppå nivå 2. Ikke lag et fjerde leveransenivå — trappen med tre trinn er det klareste selskapet eier.

**Nivå 2 består av tre deler:** huset + montasje og tilkobling + transport. Transport prises per sone, ikke som én nasjonal sats. Datamodellen må tåle et sonetillegg fra dag én — se `01_BYGGEPLAN.md`.

## Dette er en pre-launch-bygging

**Siden skal ikke publiseres i denne omgang.** Prisene er ikke verifisert og avtalene ikke ferdige. Du bygger alt ferdig nå, slik at lansering senere er å sette flagg til `true` og fylle datafiler.

| | |
|---|---|
| **Bygges og testes nå** | All struktur, tekst, komponenter, skjemaer, mobil, tilgjengelighet, ytelse |
| **Fylles senere** | Priser, transportsoner, modellnavn og m², bilder, kontaktopplysninger |
| **Lansering** | Flagg i `src/config.ts` → `true`, datafiler fylles, siden går live |

**Ingen kode skal måtte skrives om ved lansering.** Må den det, er datamodellen feil — fiks den nå, ikke da.

⚠️ **Tjenestene finnes, prisene gjør ikke.** Navn og omfang på alle åtte postene står i `09_TJENESTEMENY.md` §3. Legg dem inn i `src/data/tjenester.ts` med `belopInkMva: null` og `prisstatus: 'ikke-kalibrert'`. **Ikke finn på priser, og ikke lag eksempelbeløp «for å teste» — de blir stående.**

Test begge tilstander før du sier deg ferdig: menyen med tomme priser, og menyen med priser fylt inn. Den andre er den som faktisk skal lanseres, og den er den som aldri blir testet hvis man glemmer det.

⚠️ **Bilder mangler.** Bruk tydelige plassholdere med riktig størrelsesforhold, aldri stockbilder som kan bli stående og se ut som norske leveranser.

## Tolv regler du ikke kan bryte

Disse kommer fra merkevaregrunnlaget. Navnet «No Xcuse» betyr at selskapet ikke har noen unnskyldning for ikke å levere som avtalt. Brytes en av disse, er hovedløftet brutt.

1. **Aldri en pris uten leveransenivå.** De tre nivåene er «Huset fra fabrikk», «Levert og montert», «Totalpris med tomt». `Prisboks.astro` skal kaste feil i build hvis `nivaa` mangler. Dette er ikke en overreaksjon — det er hoveddifferensiatoren.
2. **Aldri «fra»-priser.** Ikke i tekst, ikke i data, ikke i plassholdere.
3. **Aldri «nøkkelferdig»** uten presis definisjon av hva som gjenstår på tomt. Bruk «levert og montert».
4. **Aldri superlativer uten tall bak.** «Norges billigste» og «markedets beste» finnes ikke i vokabularet.
5. **Aldri «laget i Norge».** Produksjonen skjer i Latvia, og det står tydelig på siden.
6. **Aldri «modulbygg» eller «brakke»** om produktet. Det er ordinær bolig etter TEK17.
7. **Aldri «kontakt oss for tilbud»** som CTA. Hoved-CTA er alltid *befaring* eller *«Kan du bygge her?»* — den gratis førstevurderingen. **Aldri** den betalte mulighetsvurderingen, den koster 18 750–31 250 kr inkl. mva.
8. **Aldri oppdiktede kundesitater, referanser eller case-studier.** Selskapet har null leverte prosjekter før Eidsfoss 20. august 2026. Ingen stockbilder som ser ut som leverte norske hus. Ingen «fornøyde kunder»-seksjon.
9. **Aldri en tjenestepris.** Navn og omfang er bekreftet og kan skrives. Beløpene er uverifiserte utkast oppgitt som intervaller, og skal ikke inn noe sted — heller ikke som eksempeldata.
10. **Alle priser oppgis inkl. mva, og bare inkl. mva.** Nettsiden er forbrukerrettet, og prisopplysningsforskriften krever det. Aldri to kolonner i samme flate. Feltet heter `belopInkMva` så ingen kan ta feil. Se `09_TJENESTEMENY.md` §2.
11. **Aldri § 12-garanti eller reklamasjonsrett som fordelspunkt.** Det er lovpålagte rettigheter, og å presentere dem som et særtrekk ved eget tilbud er forbudt handelspraksis. De skal nevnes — som opplysning. «Én kontrakt, én garantiadresse» er derimot et reelt fortrinn og kan brukes fritt. Se `04_TEKST_ALLE_SIDER.md` §14b.
12. **Aldri gjett på et faktum.** Priser i kroner, org.nr., telefon, e-post, modellnavn, kvadratmeter, domene og importselskapets navn **finnes ikke ennå**. Er verdien `null` i `src/config.ts`, rendre en synlig plassholder i dev og la produksjonsbygget feile. Et plausibelt tall som viser seg feil, er nøyaktig det navnet lover at selskapet ikke gjør.

Kjør denne før hver commit:

```bash
grep -rniE "fra kr|fra [0-9]|nøkkelferdig|modulbygg|brakke|Norges billigste|markedets beste|laget i Norge|kontakt oss for tilbud|noXcuse AS|eks\. mva|5 års reklamasjonsrett" src/ || echo "OK"
```

(`noXcuse AS` er med fordi merkevareskrivemåten aldri brukes i juridisk tekst — der heter det `No Xcuse AS`.)

## Tone i teksten

Du skal ikke skrive ny tekst. Teksten ligger ferdig i `04_TEKST_ALLE_SIDER.md`. Trenger du likevel en mikrotekst som ikke står der: du-tiltale, korte klare setninger, konkrete tall, klart norsk uten arkitektfloskler. Er noe uklart i teksten, er det vår feil — ikke leserens.

## Design

Minimalistisk og moderne. Én retning, holdes hele veien.

Marine `#172E57`, gull `#E3CEA4`, bomull `#FAF8F2`, lin `#F0ECE4`. Gull brukes **aldri** som tekst på lys bakgrunn — bruk `#7A5E1C` (målt 5,74:1). Montserrat til overskrifter, Inter til brødtekst, begge selvhostet som woff2.

Logoen er ordmerket `noXcuse` med taklinje over og X-en i gull. Aldri rød eller terrakotta X. Aldri verktøysymboler i ikonsettet — hammer, pensel og malerrulle hører til vedlikeholdsbransjen.

Tagline «levert som avtalt» brukes i footer og signatur, aldri i løpende tekst.

## Bevegelse

Én easing: `cubic-bezier(0.22, 0.61, 0.36, 1)`. Bygg statisk fallback først, effekten etterpå. Alt innhold skal være lesbart uten JS. `prefers-reduced-motion: reduce` skal gi statisk side. Animasjoner legges til **sist**, etter at hele strukturen står.

## Skjemaer

Syv skjemaer: tre segmentskjemaer (spor 1, 2, 3), kostnadsguide, prisliste, mulighetsvurdering, befaring. Felt står i `03_SALGSFUNNEL.md` §9.

Hvert skjema har et skjult `segment`-felt med verdi 1–4. Det følger med i det interne varselet og styrer hvilken e-postsekvens kunden havner i. En kunde er i **én** sekvens om gangen.

Krav: fungerer uten JS (vanlig POST → `/takk`), honeypot mot spam (ikke reCAPTCHA), server-side validering, synlig feilmelding ved teknisk feil, redirect til `/takk` ved suksess, internt e-postvarsel.

**Skjemaene skal testes med ekte innsending før siden er ferdig.** Et tidligere prosjekt hadde ugyldig endepunkt og mistet henvendelser uten feilmelding. Bekreft at e-posten faktisk kommer fram — ikke bare at siden viste «takk».

## Mobil

Mobil-først, testes underveis og ikke til slutt. Hamburgermeny under 1024px.

To ting må virke på 360px før noe annet regnes som ferdig: **kostnadstrappen** skal være lesbar og forståelig, og **segmentvelgeren** skal vise fire kort uten at kunden må scrolle for å se at det finnes fire valg. Klarer den ikke det, komprimer kortene — ikke fjern ett.

Spor 1 skal komme til pris på under tre skjermer på mobil. Den kunden er ferdig med å lese.

## Dokumentasjon

Opprett `DESIGN.md` i prosjektroten som kopi av designsystemet, og oppdater den i **samme commit** som CSS-en endres. Et tidligere designsystem forsvant og måtte gjenskapes fra CSS.

## Slik vil jeg jobbe

1. Les alle ti filene og gi meg en kort plan for hvordan du angriper fase 1–3. Ikke bygg ennå.
2. Vent på grønt lys.
3. Bygg fase for fase. Vis meg resultatet etter fase 1 (fundament + nav + footer), etter forsiden med segmentvelgeren, etter spor 1, og etter modell-malen.
4. Ikke installer avhengigheter utover Astro, Tailwind, `@astrojs/sitemap` og Lucide-ikoner uten å spørre først.
5. Er noe i spesifikasjonen uklart eller selvmotsigende: si fra. Ikke gjett, og ikke fyll hullet med noe plausibelt.
6. Hold en løpende `MANGLER.md` i prosjektroten: hver gang du treffer på noe som må fylles før lansering, skriv det ned med filnavn og linjenummer. Den lista er sjekklista vi bruker på lanseringsdagen.

Start med punkt 1.
