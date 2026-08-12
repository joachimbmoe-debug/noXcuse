# BEKREFT-liste

> Alt her mangler. Ingenting av det skal gjettes. Sorterte etter når de blokkerer.

---

## Blokkerer lansering — må løses

| # | Hva | Hvem | Hvor det brukes |
|---|---|---|---|
| 1 | **Org.nr. for No Xcuse AS** | Erik | Footer, personvern, kjøpsbetingelser |
| 2 | **Telefonnummer** | Erik | Nav, footer, alle CTA-er, e-postsignatur |
| 3 | **E-postadresse** | Erik | Footer, skjemasvar, avsender i sekvenser |
| 4 | **Domene** | Erik | Alt. Kanoniske URL-er, OG, e-poster |
| 5 | **Modellnavn** | Husvik | Modellkort, modell-mal, prisliste |
| 6 | **Kvadratmeter og romfordeling per modell** | Husvik | Modellkort, modell-mal |
| 7 | **Bilder av modellene** | Husvik | Hele siden. Ingen stock som later som norske leveranser |
| 8 | **Priser i kroner, per modell, per leveransenivå** | Erik | Prisboks. Nivå 1 må være åpent publisert |
| 9 | **Importselskapets navn** | Erik | Footer, kvalitetsside, prosesside, e-post A5 og C3 |
| 10 | **Personvernerklæring** med faktiske databehandlere | Erik/jurist | `/personvern` |
| 31 | **⭐ Tjenestelisten fra importselskapet, med pris per post** | Erik / importselskapet | **Blokkerer to av fire kundesegmenter.** Se under |

---

## ⭐ Punkt 31 — tjenestelisten: delvis løst

**Levert 9. august:** `kunnskap/2026-08-09 Importselskapet_tjenester_og_prisliste_UTKAST_v2.docx`

**Det som nå finnes:** åtte tjenester i Del 1 med navn og omfang, seks i Del 2 for eksterne. Nok til å bygge menyen. Se `09_TJENESTEMENY.md`.

**Det som fortsatt mangler — prisene:**

| Problem | Konsekvens |
|---|---|
| Satsene er **intervaller** (30 000–45 000) | Mot forbruker er et intervall funksjonelt det samme som en «fra»-pris. Dokumentet krever selv ett fast beløp inkl. mva ved kalibrering |
| Ingen sats er **kostnadsverifisert eller markedstestet** | Publiseres de og endres etterpå, ryker «prisen skal stå seg» |
| **Montasje og tilkobling** står `[etter Eidsfoss]` | Viktigste posten for tre av fire segmenter. Blokkerer også nivå 2-prisen — og dermed spor 1 |
| **Ole Marius' system** ikke kalibrert mot | To Husvik-kanaler kan ikke stå med ulik pris på samme tjeneste |

**Beslutning:** siden lanseres ikke før prisene er verifisert og avtalene er på plass. Alt bygges ferdig nå; lansering er å sette flagg og fylle datafiler.

**Handlingsplan for verifisering: `09_TJENESTEMENY.md` §8.** Kort oppsummert:

- **Før 20. august:** innhent kran- og transporttilbud, hent Husviks kostnadsgrunnlag, be Ole Marius om prislista. Bygg et anslag på hver post
- **20. august:** mål faktisk tid, kost og adkomstforhold på Eidsfoss
- **21. august–15. september:** sammenlign anslag mot faktisk, sett faste beløp inkl. mva, kalibrer mot Ole Marius
- **Deretter:** eierne vedtar, flaggene settes, siden lanseres

⚠️ Det viktigste punktet: **bygg kostnadsmodellen før Eidsfoss.** Én leveranse gir ett tall, ikke en modell. Venter dere på at Eidsfoss skal gi tallene, står dere 21. august med ett tall som velter på leveranse nummer to.

---

## ⭐ Punkt 36 — § 12 som salgsargument: rettet, men sjekk resten

Prisdokumentet slår fast at § 12-garanti og reklamasjonsrett er **lovpålagte rettigheter**, og «omtales som opplysning – aldri som et fortrinn ved tilbudet».

Å presentere en lovfestet rettighet som et særtrekk ved eget tilbud er forbudt handelspraksis etter markedsføringsloven.

**Rettet i:** tillitsstripe forsiden, kvalitetsseksjon forsiden, spor 1, e-post A3 og A5.

**Må gjennomgås av Erik før lansering:** `/kvalitet` seksjon 6, kostnadsguiden side 10, alt salgsmateriell utenfor nettsiden, og enhver presentasjon som bruker garantien som trygghetsargument.

⚠️ For et selskap som posisjonerer seg på etterrettelighet er dette dyrere enn for andre. Regelen står i `04_TEKST_ALLE_SIDER.md` §14b.

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
| 32 | **Rutinen mot kundens egen entreprenør** — sendes fundamentspesifikasjon skriftlig direkte til ham? | Spor 3, seksjonen «Grensesnittet mot entreprenøren din», og e-post D2. Finnes ikke rutinen, kan ikke seksjonen publiseres. `GRENSESNITT_RUTINE = false` |
| 33 | **Selger dere tjenestene, eller formidler dere dem?** | Avgjør avtalepart på tomtearbeid og om § 12-garantien dekker det. Påvirker spor 2 og 3 og garantiteksten på begge |
| 34 | **Svartid per spor** — spor 1 bør ha kortest | Teksten under alle tre segmentskjemaene. Ikke lov timer eller dager før dere vet at dere holder det |
| 35 | **Prises spor 1 automatisk, eller manuelt hver gang?** | Avgjør om spor 1 kan love svar samme dag, som er hele poenget med det sporet |
| 37 | **Byggeledelse: beregnes 3–5 % av verdi eks. eller inkl. mva?** | Flagget i prisdokumentet selv. På et grunnarbeid til 500 000 er forskjellen ca. 5 000 kr — lite nok til å bli oversett i avtalen, stort nok til å bli en diskusjon på fakturaen. Vurder heller fastpris etter befaring: en prosentsats er det eneste stedet i modellen der kunden ikke ser sluttbeløpet |
| 38 | **«Kan du bygge her?» — svartid og hvem som utfører** | Ny gratis primær-CTA. En gratis tjeneste som tar tre uker er verre enn ingen |
| 39 | **Betalt mulighetsvurdering: ett fast beløp inkl. mva** | I dag 18 750–31 250. Et intervall kan ikke stå mot forbruker |
| 40 | **Trekkes mulighetsvurderingen fra ved kjøp også for privatkunder?** | Står i dag bare for eksterne. Med fratrekk er den reelt gratis for den som kjøper, og prisen filtrerer bort de som aldri skulle kjøpt |
| 41 | **Ole Marius / Håkon — tjenesteoversikt med priser** | Innhentes i samme runde som samarbeidsavtalen. Uten den kan ikke listen kalibreres, og to Husvik-kanaler kan ende med ulik pris på samme tjeneste |
| 42 | **Gyldighetstid på prisene** | Hvor lenge de står, og hva som utløser endring. Det er dette som gjør «prisen skal stå seg» til noe konkret framfor en påstand |
| 43 | ⛔ **Finansieringsformidling — konsesjonsplikt** | Markedsføres ikke i noen form før juridisk avklaring foreligger. Skal ikke inn på nettsiden, ikke engang som «kommer» |

---

## Strategisk — bør avklares før SEO-teksten låses

| # | Hva | Hvorfor det haster |
|---|---|---|
| 21 | **Grensen mot husvik.no** | Husvik har allerede minihus-innhold mot privatpersoner. Ranker begge sider på samme søkeord, konkurrerer dere med dere selv. Hvem eier hvilket innhold, og hvilke ord? |
| 22 | **Tilgang til leads fra husvik.no** | Sikres i aksjonæravtalen. Dette er den eneste kjente trafikkilden i dag |
| 23 | **Nærmeste priskonkurrents navn** | Kun til intern argumentasjon. **Skal ikke** publiseres |
| 24 | **B2B-spor mot utbyggere** | Kontrakts- og garantistruktur for proffsalg er ikke avklart i importmodellen. Ikke bygg B2B-side før den er det |
| 25 | **Annonsebudsjett og oppstart** | Avgjør om `/kostnadsguiden` trengs som separat annonseside fra dag én |
| 26 | **Finn.no — skal småhus legges ut der?** | Påvirker hvordan modellsidene struktureres |

---

## Etter Eidsfoss 20. august 2026

| # | Hva |
|---|---|
| 27 | Foto før, under og etter montasje — **planlegg dette nå**, ikke etterpå |
| 28 | Kundeuttalelse, innhentet rett etter overtakelse |
| 29 | Faktiske tall fra prosjektet: tidsbruk, hva som gikk som avtalt, hva som ikke gjorde det |
| 30 | Sett `VIS_REFERANSER = true` og erstatt «vi har ikke levert ennå»-setningene — ikke bare slett dem |

---

## Regelen

Trengs et av disse tallene i en tekst, skriv at det mangler. Ikke fyll inn noe plausibelt.

Et selskap som heter No Xcuse kan ikke lansere en nettside med et oppdiktet tall på. Det er hovedløftet, brutt på dag én, på det ene stedet ingen glemmer det.
