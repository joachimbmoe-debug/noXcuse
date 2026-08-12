# Salgsfunnel — noXcuse

> Fire kundesegmenter, fire spor. Kunden velger selv hvilket som gjelder.
> Budskapshierarki hele veien: **pris åpner, kvalitet lukker.**

---

## 0. Innsikten som styrer alt

De fire segmentene skiller seg på **ett** spørsmål: *hvor mye av jobben på tomta gjør vi?*

Det er samme akse som kostnadstrappen. Segmentvelgeren og kostnadstrappen er altså den samme tanken, sett fra to sider — og det er derfor de kan stå side om side på forsiden uten å konkurrere.

| Segment | Har tomt | Godkjenninger | Entreprenør | Kjøper | Lander på |
|---|---|---|---|---|---|
| **1** Tomta er klar | Ja, opparbeidet | Alle på plass | Trenger ingen | Kun huset, levert og montert | Nivå 2, rent |
| **2** Vi tar resten | Ja | ⚠️ varierer | Kjøper av importselskapet | Hus + hele tjenestelisten inkl. entreprenør | Nivå 2 + full tjenestemeny |
| **3** Egen entreprenør | Ja | ⚠️ varierer | Har egen | Hus + utvalgte tjenester | Nivå 2 + delvis meny |
| **4** Vil vite mer | Kanskje ikke | Nei | — | Ingenting ennå | Kostnadsguiden |

### Konsekvens for kostnadstrappen — les denne

Segment 2 og 3 har allerede tomt. De er derfor **ikke** nivå 3 («totalpris med tomt»), men heller ikke rent nivå 2. Det finnes ingen ferdig hylle for «hus + tjenester på egen tomt».

**Løsningen er ikke et fjerde nivå.** Trappen med tre trinn er det klareste selskapet eier, og et fjerde trinn ødelegger den.

> **Kostnadstrappen forblir tre nivåer. Tjenestelisten er en meny som prises oppå nivå 2.**

Da håndteres alle fire segmentene uten å røre trappen:

- Segment 1 = nivå 2, tom meny
- Segment 3 = nivå 2 + de postene kunden faktisk vil ha
- Segment 2 = nivå 2 + hele menyen
- Segment 4 = ikke klar for et tall ennå

Og fordi menyen er à la carte, ser kunden prisen på hver enkelt tjeneste. Det er kostnadstrappe-logikken én etasje ned, og det er nøyaktig det ingen konkurrent gjør.

⚠️ **BLOKKERING: tjenestelisten finnes ikke.** Den er ikke i kunnskapsbasen, og segment 2 og 3 er *definert* av den. Se `07_BEKREFT_LISTE.md` punkt 31. Ikke finn på poster.

---

## 1. Funnelen

```
        ANNONSE · SØK · husvik.no-leads · DELING
                        │
                        ▼
              ┌──── FORSIDEN ────┐
              │ «Egen bolig til   │
              │ en pris du        │
              │ forstår»          │
              └─────────┬─────────┘
                        │
              «Hvor langt har du kommet?»
                        │
     ┌──────────┬───────┴───────┬──────────┐
     ▼          ▼               ▼          ▼
  SPOR 1     SPOR 2          SPOR 3     SPOR 4
  Tomta      Vi tar          Egen       Vil vite
  er klar    resten          entrep.    mer
     │          │               │          │
  Pris på    Pris på hus     Pris på    Kostnads-
  hus        + hele          hus +      guiden
  levert     menyen          valgte     (PDF)
  og montert                 poster
     │          │               │          │
  Skjema:    Skjema:         Skjema:    Skjema:
  4 felt     8 felt          7 felt     3 felt
     │          │               │          │
  Sekvens B  Sekvens C       Sekvens D  Sekvens A
  (2 e-post) (3 e-post)      (3 e-post) (5 e-post)
     │          │               │          │
     └──────────┴───────┬───────┴──────────┘
                        ▼
                    BEFARING
                        ▼
          KONTRAKT (med importselskapet)
```

**Én konvertering per seksjon.** Ingen seksjon har to konkurrerende CTA-er.

---

## 2. Segmentvelgeren

Plassering: **rett under hero på forsiden.** Over kostnadstrappen. Fire kort, like store, ingen fremhevet framfor de andre.

Hvorfor så høyt: tre av fire segmenter har allerede tomt og vil ha et tall. Tvinger vi dem gjennom en kostnadsguide først, mister vi dem. Og en velger som lar kunden si hvor hen er, er den ærlige måten å svare på det hen faktisk spurte om.

**Regler**

- Ingen av de fire er «feil svar». Segment 4 skal ikke føles som annenrangs.
- Ingen progress bar, ingen «steg 1 av 4». Det er ikke en quiz.
- Valget lagres i `sessionStorage` og styrer hvilken CTA som vises resten av besøket. Fjern det ikke — men gjør det enkelt å bytte spor.
- Hvert kort er en ekte `<a>` til en ekte side. Skal fungere uten JS.
- Fungerer velgeren ikke, faller alt tilbake til `/befaring`.

**Tekst:** se `08_SEGMENTSIDER_TEKST.md`.

---

## 3. Spor 1 — Tomta er klar

**Rute:** `/tomta-er-klar`
**Kunden:** Ferdig opparbeidet tomt, alle godkjenninger på plass. Vil ha ett tall på ett hus.
**Hva vi selger:** Huset, levert og montert på ferdig fundament. Nivå 2. Ingen tjenester.

Dette er den enkleste kunden selskapet har, og den som blir mest irritert av en kostnadsguide. Kortest mulig vei fra forside til pris.

**Skjema — 4 felt:** Navn · Telefon · E-post · Adresse på tomta *(+ samtykke)*
Nedtrekk «Hvilken modell ser du på?» hvis modellene finnes — ellers utelates feltet.

**CTA:** Få pris på huset levert og montert
**Sekvens:** B (2 e-poster)

⚠️ Merk: kunden ber om et tilbud, og det er helt greit. Regelen om at vi aldri sier «kontakt oss for tilbud» gjelder **vår** CTA-tekst, ikke kundens ærend.

---

## 4. Spor 2 — Vi tar resten

**Rute:** `/vi-tar-resten`
**Kunden:** Har tomt. Vil ikke være byggherre. Kjøper hus + hele tjenestelisten fra importselskapet, entreprenørtjenester inkludert.
**Hva vi selger:** Nivå 2 + full tjenestemeny.

Høyest ordreverdi, lengst avklaring. Her må vi vite mest om tomta før vi kan si noe.

**Skjema — 8 felt:** Navn · Telefon · E-post · Adresse eller gnr/bnr · Kommune · Er tomta opparbeidet? *(Ja / Delvis / Nei, råtomt)* · Har du byggetillatelse? *(Ja / Søkt / Nei)* · Hva ser du for deg? *(fritekst)* *(+ samtykke)*

**CTA:** Få pris på hus og hele jobben
**Sekvens:** C (3 e-poster)

⚠️ Siden kan ikke publiseres ferdig før tjenestelisten finnes. Bygg strukturen, hold `TJENESTELISTE_KLAR = false`. Er den `false`, viser siden hva vi kan bistå med i generelle ordelag og ber om befaring — den lover **ingen** konkrete tjenester.

---

## 5. Spor 3 — Egen entreprenør

**Rute:** `/egen-entreprenor`
**Kunden:** Har tomt og egen entreprenør. Vil ha huset, pluss noen få poster fra tjenestelisten — typisk transport, kran og montasje.
**Hva vi selger:** Nivå 2 + valgte poster.

Dette sporet er grunnen til at menyen må være à la carte. En kunde med egen graver skal ikke betale for vår.

**Skjema — 7 felt:** Navn · Telefon · E-post · Adresse eller gnr/bnr · Kommune · **Hvilke tjenester trenger du?** *(avkrysning, flervalg — fra tjenestelisten)* · Når skal entreprenøren din i gang? *(nedtrekk)* *(+ samtykke)*

Avkrysningsfeltet er sporets hele poeng. Det speiler tjenestelisten én til én og er kilden til de mest kvalifiserte leadene på hele siden.

**CTA:** Sett sammen din leveranse
**Sekvens:** D (3 e-poster)

⚠️ Avkrysningsboksene kan ikke skrives før tjenestelisten finnes. Ingen oppdiktede poster.

---

## 6. Spor 4 — Vil vite mer

**Rute:** `/kostnadsguiden`
**Kunden:** Nysgjerrig på småhus eller hytte. Har kanskje ikke tomt. Skal ikke kjøpe med det første.
**Hva vi gir:** Kostnadsguiden. Ingen pris, ingen selger som ringer.

**Skjema — 3 felt:** Fornavn · E-post · Samtykke
**Valgfritt nedtrekk:** «Hus eller hytte?» — verdifullt for segmentering, men gjør det valgfritt. Hvert ekstra påkrevd felt koster konvertering i toppen av funnelen.

**CTA:** Send meg kostnadsguiden
**Sekvens:** A (5 e-poster)

⚠️ Velger kunden «hytte»: sekvens A kjører uten hytteeksempler og uten referanser, til hytter faktisk er levert.

---

## 7. Lead magnets

| # | Magnet | Segment | Status |
|---|---|---|---|
| 1 | **Kostnadsguiden** — PDF, 10 sider, tre nivåer og seks poster | 4 | ✅ Tekst ferdig i `05_LEADMAGNET_KOSTNADSGUIDEN.md`. Kan lages nå — den inneholder ingen kronebeløp |
| 2 | **Prislisten** — alle modeller, alle tre nivåer | 1, 3 | ⚠️ Venter på priser. `PRISLISTE_KLAR = false` |
| 3 | **Tjenestelisten med priser** — menyen som legges oppå nivå 2 | 2, 3 | ⚠️ Venter på selve listen. Dette er den viktigste manglende brikken |
| 4 | **«Kan du bygge her?»** — gratis førstevurdering fra kart og reguleringsplan | Alle, primær-CTA | ⚠️ Venter på svartid og hvem som utfører |

Magnet 1 kan lanseres nå. De tre andre kan bygges som struktur og fylles når fakta finnes.

### Den betalte mulighetsvurderingen er ikke en lead magnet

Tjenestelisten priser mulighetsvurdering av tomt til **18 750–31 250 kr inkl. mva**. Det er en konsulenttjeneste, og den kan ikke være primær-CTA på en forside — særlig ikke for et selskap uten leverte referanser.

**Løsningen er to nivåer.** Gratis «Kan du bygge her?» fra kart og planregister blir hovedkonvertering. Den betalte gjennomgangen med befaring selges etterpå, og i spor 2 og 3, til ett fast beløp inkl. mva som trekkes fra ved kjøp.

Se `09_TJENESTEMENY.md` §6. **Primær-CTA på hele siden er heretter «Kan du bygge her?» eller «Book befaring» — aldri den betalte vurderingen.**

---

## 8. E-postsekvenser

| Sekvens | Segment | Lengde | Poeng |
|---|---|---|---|
| A | 4 | 5 e-poster / 16 dager | Bygge forståelse, så tillit, så invitere |
| B | 1 | 2 e-poster / 4 dager | Bekreft mottatt, lever prisen, be om befaring. Ferdig |
| C | 2 | 3 e-poster / 10 dager | Kartlegg tomta, forklar hva vi tar, én garantiadresse |
| D | 3 | 3 e-poster / 10 dager | Bekreft valgte tjenester, grensesnitt mot egen entreprenør, tidsplan |

Full tekst i `06_EPOSTSEKVENSER.md`.

**Regel for alle:** én CTA, ingen kunstige frister, avmelding synlig, aldri en pris uten leveransenivå. Svarer noen, svarer et menneske.

---

## 9. Skjemafelter samlet

### Felles

Alle skjemaer har til slutt:

**Samtykke (påkrevd):**
> Ja, noXcuse kan kontakte meg om denne henvendelsen. Vi lagrer opplysningene så lenge det er nødvendig for å følge den opp, og deler dem ikke med andre enn selskapene som er involvert i leveransen. Du kan be om innsyn eller sletting når som helst.

Skjult felt `segment` med verdi `1`–`4`, satt av siden. Følger med i varselet og i CRM-taggen.

### Validering

- Minst ett av *Adresse* eller *Gnr/bnr* i spor 2 og 3 — valider på klient **og** server
- Telefon: åtte siffer, mellomrom tillatt
- Honeypot + tidsfelle. Ikke reCAPTCHA — det sender brukerdata til Google og passer dårlig for et selskap som selger på tillit

### «Kan du bygge her?» — gratis førstevurdering

Primær-CTA. Terskelen må være lav, men vi trenger nok til å kunne slå opp tomta.

| Felt | Type | Påkrevd |
|---|---|---|
| Navn | text | ja |
| E-post | email | ja |
| Telefon | tel | nei |
| Adresse på tomta | text | nei |
| Gnr/bnr | text | nei |
| Kommune | text | ja |
| Har du tomta i dag? | radio: Ja / Nei, ser etter / Arver eller deler fra | ja |
| Samtykke | checkbox | ja |

⚠️ Minst ett av *Adresse* eller *Gnr/bnr* må fylles ut — uten det finner vi ikke tomta. Valider på klient og server.

### Mulighetsvurdering — betalt

Samme felt, pluss: Hva ser du for deg? *(textarea)* · Når ønsker du å bygge? *(Innen 6 mnd / 6–12 mnd / 1–2 år / Vet ikke)*

Prisen skal stå **over** knappen, ikke under. En betalt tjeneste der prisen står i liten skrift under, er akkurat det selskapet er bygget for å slippe unna.

### Befaring (felles for alle spor)

Navn · Telefon · E-post · Sted · Ønsket tidspunkt · Samtykke

---

## 10. Måling

| Hendelse | Navn |
|---|---|
| Segment valgt | `velg_segment` *(med 1–4)* |
| Prisforespørsel, tomt klar | `lead_spor1` |
| Prisforespørsel, hele jobben | `lead_spor2` |
| Prisforespørsel, egen entreprenør | `lead_spor3` |
| Kostnadsguide lastet ned | `lead_spor4` |
| Befaring bestilt | `lead_befaring` *(med segment)* |
| Modellside sett | `view_modell` *(med modellnavn)* |
| Kostnadstrapp utvidet | `interact_kostnadstrapp` |

Verktøy: **Plausible** eller **Umami**. Cookiefritt, ingen samtykkebanner, ingen data til tredjepart — det passer et selskap som selger på tillit.

**Det viktigste tallet å følge det første halvåret:** fordelingen mellom de fire sporene. Den forteller hvilket marked noXcuse faktisk har, og den vil sannsynligvis overraske. Ikke lås annonsebudsjettet før dere har tre måneders fordeling.

⚠️ Ikke sett konverteringsmål ennå. Bransjetall er gjetning på et selskap uten historikk. Mål i tre måneder, sett mål etterpå.

---

## 11. Trafikk inn

| Kilde | Segment det treffer | Status |
|---|---|---|
| Leads fra husvik.no | Sannsynligvis 4, noe 1 | ⚠️ Tilgang sikres i aksjonæravtalen |
| Organisk søk — «hva koster et minihus» | 4 | Bygges med `/kunnskap` |
| Organisk søk — «småhus levert på tomt» | 1, 3 | Høyest intensjon. Prioriter disse ordene |
| Annonser | 4, med retargeting mot 1–3 | ⚠️ Budsjett ikke avklart |
| Finn.no | 1 | ⚠️ Ikke avklart |

⚠️ **Uavklart, må løses før SEO-teksten låses:** grensen mot husvik.no. Husvik har allerede minihus-innhold mot privatpersoner. Ranker begge sider på samme søkeord, konkurrerer dere med dere selv.
