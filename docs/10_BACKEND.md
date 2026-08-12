# Backend

> Ett krav styrer alt: **en henvendelse skal aldri kunne forsvinne.**
> For et selskap som selger på at kunden får svar, er en tapt lead den dyreste feilen som finnes.

---

## 1. Grunnregelen

**Skriv til database før du prøver å sende e-post.**

```
POST /api/skjema
   ↓
1. Valider              → 400 med feltvise feil hvis ugyldig
2. Skriv til Supabase   → feiler dette: 500, og brukeren får beskjed
3. Svar 200 / redirect  ← kunden er trygg fra dette punktet
   ↓ (etter at svaret er sendt)
4. Varsle Erik (Resend)     — feiler stille, logges
5. Meld inn i sekvens (Brevo) — feiler stille, logges
6. Marker `varslet_at` / `sekvens_at` i databasen
```

Punkt 4 og 5 kan feile uten at kunden merker det, fordi leaden allerede ligger lagret. Feiler punkt 2, skal kunden få en synlig feilmelding — aldri en takkeside.

⚠️ **Motsatt rekkefølge er den vanligste feilen.** Sender du e-post først og lagrer etterpå, forsvinner leaden når e-posten lander i søppelpost. Det var nøyaktig dette som skjedde med Zest-siden: ugyldig endepunkt, ingen feilmelding, tapte henvendelser.

---

## 2. Stack

| Lag | Valg | Region | Merknad |
|---|---|---|---|
| Hosting | Vercel | Frankfurt (`fra1`) | Statisk Astro + serverless i samme deploy |
| Endepunkt | Astro API-route | `fra1` | `output: 'server'` kun for `/api/*`, resten prerendret |
| Database | Supabase | EU Frankfurt | Én tabell. Innebygd tabellvisning = Eriks leadliste |
| Transaksjonell e-post | Resend | EU | Varsel til Erik, levering av kostnadsguiden |
| Sekvenser | Brevo *(eller MailerLite)* | EU | Tagger og automasjon, én sekvens per segment |
| Analyse | Plausible *(eller Umami)* | EU | Cookiefritt, ingen samtykkebanner |

**Hvorfor EU-hostet hele veien:** dere behandler personopplysninger om norske forbrukere. EU-leverandører fjerner hele Schrems II-diskusjonen fra personvernerklæringen. Ikke et krav, men en billig forenkling for et selskap som selger på etterrettelighet.

⚠️ **Ikke CRM ennå.** Salgsmålet er 5–10–15 enheter over tre år. Database pluss e-postvarsel holder lenge. HubSpot nå er verktøy for et problem dere ikke har.

---

## 3. Datamodell

Én tabell. Alle syv skjemaene skriver hit.

```sql
create table lead (
  id                uuid primary key default gen_random_uuid(),
  opprettet         timestamptz not null default now(),

  -- ruting
  segment           smallint not null check (segment between 1 and 4),
  skjematype        text not null,      -- 'spor1' | 'spor2' | 'spor3' | 'kostnadsguide'
                                        -- | 'prisliste' | 'kan-du-bygge-her'
                                        -- | 'mulighetsvurdering' | 'befaring'
  kilde_side        text,               -- hvilken URL skjemaet ble sendt fra
  kilde_kanal       text,               -- utm_source e.l., hvis satt

  -- person
  navn              text,
  fornavn           text,
  epost             text not null,
  telefon           text,

  -- tomt
  adresse           text,
  gnr_bnr           text,
  kommune           text,
  har_tomt          text,               -- 'ja' | 'ser-etter' | 'arver'
  tomt_opparbeidet  text,               -- 'ja' | 'delvis' | 'raatomt'
  byggetillatelse   text,               -- 'ja' | 'sokt' | 'nei'

  -- ønske
  interesse         text,               -- 'helaarsbolig' | 'hytte' | 'utleie' | 'utbygger' | 'vet-ikke'
  modell            text,
  tjenester         text[],             -- spor 3, valgte poster
  tidsperspektiv    text,
  fritekst          text,

  -- samtykke og sporing
  samtykke          boolean not null,
  samtykke_tekst    text not null,      -- ordlyden kunden faktisk godtok
  ip_hash           text,               -- sha256, aldri rå IP
  varslet_at        timestamptz,
  sekvens_at        timestamptz,
  behandlet         boolean not null default false,
  notat             text
);

create index on lead (opprettet desc);
create index on lead (segment, behandlet);
```

### Tre felt som er lette å hoppe over, og ikke skal hoppes over

**`samtykke_tekst`** — lagre *ordlyden* kunden godtok, ikke bare `true`. Endrer dere teksten om et halvt år, må dere kunne dokumentere hva den enkelte faktisk sa ja til. Det er hele forskjellen på et samtykke og en avkrysning.

**`ip_hash`** — sha256 med salt, aldri rå IP. Nok til å stoppe spam, ikke nok til å være personopplysning dere må rydde i.

**`behandlet` og `notat`** — Erik jobber i Supabase-tabellen. Uten disse to har han ingen måte å se hva han har svart på, og da blir det et regneark ved siden av. Da er det regnearket som er systemet.

---

## 4. Endepunkt

**`POST /api/skjema`** — ett endepunkt, alle syv skjemaene. `skjematype` styrer validering og ruting.

### Krav

- **Fungerer uten JS.** Vanlig `<form method="post">` → `303` redirect til `/takk?type=…`. Med JS: `fetch` og inline-svar
- **Honeypot** — skjult felt `firmanavn`. Utfylt = svar 200, lagre ingenting. Boten skal tro den lyktes
- **Tidsfelle** — skjult `_t` med tidsstempel ved sidelast. Under 3 sekunder = avvis
- **Ingen reCAPTCHA.** Sender brukerdata til Google, og passer dårlig for et selskap som selger på tillit
- **Server-side validering av alt.** Klientvalidering er en tjeneste til brukeren, ikke en sikring
- **Rate limit** — 5 innsendinger per IP-hash per time

### Validering per skjematype

| Skjematype | Segment | Påkrevd | Spesialregel |
|---|---|---|---|
| `spor1` | 1 | navn, telefon, epost, adresse | — |
| `spor2` | 2 | navn, telefon, epost, kommune, tomt_opparbeidet, byggetillatelse | adresse **eller** gnr_bnr |
| `spor3` | 3 | navn, telefon, epost, kommune, tidsperspektiv | adresse **eller** gnr_bnr |
| `kostnadsguide` | 4 | fornavn, epost | — |
| `prisliste` | 4 | fornavn, epost | tagges `venter-pris` hvis `PRISLISTE_KLAR = false` |
| `kan-du-bygge-her` | uendret | navn, epost, kommune, har_tomt | adresse **eller** gnr_bnr |
| `mulighetsvurdering` | uendret | navn, telefon, epost, kommune, tidsperspektiv | adresse **eller** gnr_bnr |
| `befaring` | uendret | navn, telefon, epost | — |

`samtykke === true` er påkrevd overalt. Er den `false`, avvis — ikke lagre og «be om samtykke senere».

**«Uendret» segment:** `kan-du-bygge-her`, `mulighetsvurdering` og `befaring` går på tvers av sporene. Behold segmentet fra `sessionStorage` hvis det finnes, ellers `null`. **Ikke gjett.**

### Svar

| Situasjon | Uten JS | Med JS |
|---|---|---|
| OK | `303` → `/takk?type=…` | `200` + `{ok: true, redirect}` |
| Valideringsfeil | `422`, skjema rendret på nytt med feil per felt og verdiene beholdt | `422` + `{feil: {felt: melding}}` |
| Databasefeil | `500`, feilside med e-postadresse | `500` + `{ok: false}` |

⚠️ **Skjemaet skal aldri tømmes ved feil.** En kunde som har fylt ut åtte felt og mister alt, kommer ikke tilbake.

Feilmeldingstekster ligger i `04_TEKST_ALLE_SIDER.md` §13.

---

## 5. Varsel til Erik

Sendes etter at svaret er levert til kunden.

**Emne:** `Spor {segment} — {navn}, {kommune}`

Segmentnummeret står først fordi hastegraden er ulik. En spor 1-lead venter på ett tall og bør besvares samme dag. En spor 4-lead har akkurat lastet ned en PDF og skal ikke ringes i det hele tatt.

**Innhold:** alle utfylte felt, tidspunkt, kildeside, kildekanal, og direktelenke til raden i Supabase.

**Til:** ⚠️ BEKREFT internmottaker.

⚠️ Sett opp **en daglig oppsummering** i tillegg: «3 nye henvendelser i går, 1 ubehandlet fra i forrige uke». Enkeltvarsler blir borte i innboksen. Oppsummeringen er det som fanger den ene som glapp.

---

## 6. Sekvensruting

| Segment | Skjema | Sekvens | Tag i Brevo |
|---|---|---|---|
| 1 | `spor1` | B — 2 e-poster / 4 dager | `spor-1` |
| 2 | `spor2` | C — 3 e-poster / 10 dager | `spor-2` |
| 3 | `spor3` | D — 3 e-poster / 10 dager | `spor-3` |
| 4 | `kostnadsguide` | A — 5 e-poster / 16 dager | `spor-4` |
| — | `kan-du-bygge-her` | E1 | `tomtevurdering` |
| — | `mulighetsvurdering` | E1 | `tomtevurdering-betalt` |
| — | `prisliste` (venter) | F1 | `venter-pris` |
| — | `befaring` | ingen sekvens | `befaring` |

**Harde regler:**

- **Én sekvens om gangen.** Kommer en kontakt inn på et nytt spor, stopp den forrige. Ingen skal få både B og C
- Er kontakten allerede i Brevo, **oppdater** tags — ikke opprett duplikat
- Befaring utløser ingen sekvens. Den kunden skal ha en telefon, ikke en e-post
- Avmelding i Brevo skal skrives tilbake til `lead`-tabellen

Sekvenstekstene ligger i `06_EPOSTSEKVENSER.md`.

---

## 7. Levering av kostnadsguiden

PDF-en ligger i `public/nedlasting/`. Ingen signerte URL-er, ingen utløpstid.

**Kunden får den to steder:** direkte på `/takk` med én gang, og i e-post A1. Guiden er ikke hemmelig — den er skrevet for å deles, også med folk som kjøper av noen andre. Å låse den ned motsier hele poenget.

⚠️ Én knapp «Last ned nå» på takkesiden. En kunde som venter på en e-post som havner i søppelpost, er en tapt lead vi selv laget.

---

## 8. Miljøvariabler

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=     # kun server-side. ALDRI i klientkode
RESEND_API_KEY=
BREVO_API_KEY=
VARSEL_EPOST=                  # ⚠️ BEKREFT
IP_SALT=                       # tilfeldig streng, brukes til ip_hash
```

**Regler:**

- `.env` og `.env.*` er i `.gitignore`. Sjekk før første push
- `SUPABASE_SERVICE_ROLE_KEY` gir full tilgang forbi row level security. Den skal **aldri** importeres i en `.astro`-komponent som rendres i nettleseren — kun i `/api/*`
- Slå på row level security på `lead`-tabellen og gi anon-nøkkelen **ingen** rettigheter. Endepunktet bruker service role, klienten skal ikke kunne lese tabellen i det hele tatt

---

## 9. Testprotokoll

Kjøres på **produksjonsdomenet**, ikke i staging. Endepunkter oppfører seg ulikt.

- [ ] Ekte innsending fra **hvert av de syv skjemaene**
- [ ] Raden dukker opp i Supabase, med riktig `segment` og `skjematype`
- [ ] Varselet kommer fram til Erik — **sjekk søppelpostmappen hos mottaker**
- [ ] Kontakten havner i riktig sekvens i Brevo, med riktig tag
- [ ] Første e-post i sekvensen kommer fram
- [ ] Avmeldingslenken virker, og skrives tilbake til databasen
- [ ] Test med **JS slått av** — skjemaet skal fortsatt virke
- [ ] Test med **ugyldige felt** — feilmeldinger vises, og de utfylte verdiene beholdes
- [ ] Simuler databasefeil — kunden skal se en feilmelding, ikke en takkeside
- [ ] Fyll honeypot-feltet — skal svare 200 og lagre ingenting
- [ ] Send inn på under 3 sekunder — skal avvises
- [ ] Test på faktisk mobil

⚠️ Punkt 3 er det som feilet sist. «Siden viste takk» er ikke det samme som «e-posten kom fram».

---

## 10. GDPR

**Databehandlere som må stå navngitt i personvernerklæringen:** Vercel, Supabase, Resend, Brevo, Plausible.

**Databehandleravtale må inngås med hver av dem.** Alle fem tilbyr standard DPA — det er skjemaarbeid, ikke forhandling, men det må gjøres før lansering.

**Behandlingsansvarlig:** No Xcuse AS, org.nr. ⚠️ BEKREFT.

**Sletting:** ⚠️ BEKREFT oppbevaringstid. Forslag: lead uten kundeforhold slettes etter 24 måneder. Sett opp en månedlig jobb — en oppbevaringstid som står i erklæringen og ikke håndheves, er verre enn ingen.

**Innsyn og sletting på forespørsel:** ett menneske må kunne finne alle rader for én e-postadresse. Med én tabell er det ett søk. Det er en av grunnene til at det er én tabell.

---

## 11. Rekkefølge

Bygges etter fase 3 i `01_BYGGEPLAN.md`, når skjemaene står.

| # | Steg | Klar før lansering? |
|---|---|---|
| 1 | Supabase-prosjekt i EU Frankfurt, tabell, RLS på | Ja |
| 2 | `/api/skjema` med validering, honeypot, tidsfelle | Ja |
| 3 | Databaseskriving + feilhåndtering + takkeside | Ja |
| 4 | Resend: varsel til Erik | Ja |
| 5 | Test uten JS, med feil, med simulert databasefeil | Ja |
| 6 | Brevo: lister, tagger, sekvens A | Ja |
| 7 | Brevo: sekvens B, C, D | Ja |
| 8 | Daglig oppsummering til Erik | Ja |
| 9 | Plausible | Ja |
| 10 | Databehandleravtaler + personvernerklæring | **Blokkerer lansering** |
| 11 | Slettejobb, 24 måneder | Kan komme rett etter |

Alt fra 1 til 9 kan bygges og testes nå. Det er ingenting her som venter på priser.
