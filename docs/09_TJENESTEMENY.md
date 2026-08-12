# Tjenestemenyen

> Kilde: `kunnskap/2026-08-09 Importselskapet_tjenester_og_prisliste_UTKAST_v2.docx`
> **Status: UTKAST. Ingen sats er kostnadsverifisert eller markedstestet.** Kalibreres etter Eidsfoss 20. august 2026.

---

## 1. Lanseringsbeslutning

**Siden publiseres ikke før prisene er verifisert og avtalene er på plass.** Vi bygger alt ferdig nå, slik at lansering er et bytte av flagg — ikke et byggeprosjekt.

Det betyr at ventetekstene i denne fila og i `08_SEGMENTSIDER_TEKST.md` er **byggetilstander, ikke publisert innhold**. De skal fungere i dev og i staging, og de skal aldri møte en kunde.

### Hva det gjør med byggingen

| | |
|---|---|
| **Bygges nå** | Alt. Struktur, tekst, komponenter, skjemaer, e-postsekvenser, måling |
| **Testes nå** | Alle skjemaer med ekte innsending, mobil, tilgjengelighet, ytelse |
| **Fylles senere** | Priser, modellnavn, kontaktopplysninger, tjenestesatser |
| **Lansering** | Flaggene i `src/config.ts` settes til `true`, datafilene fylles, siden går live |

**Ingen kode skal måtte skrives om ved lansering.** Er det tilfellet, er datamodellen feil — fiks den nå, ikke da.

### Konsekvens for datamodellen

Alle åtte tjenestene legges inn med navn og omfang, `belopInkMva: null` og `prisstatus: 'ikke-kalibrert'` — akkurat som beskrevet i §7. Da er strukturen testet lenge før tallene kommer, og kalibreringen blir en datajobb.

Test begge tilstander før du sier deg ferdig: menyen med tomme priser, og menyen med priser fylt inn. Den andre tilstanden er den som faktisk skal lanseres, og den er den som aldri blir testet hvis man glemmer det.

---

## 2. MVA-regelen — hard

Fra dokumentet: mot forbrukere **skal** prisen oppgis inkl. mva. Det følger av prisopplysningsforskriften og markedsføringsloven. Mot næringsdrivende er eks. mva vanlig.

> **Nettsiden er forbrukerrettet. Alle priser på siden oppgis inkl. mva, og bare inkl. mva.**

- Aldri to kolonner i samme kundevendte flate. Ett tall, tydelig merket «inkl. mva».
- Gjelder også husprisene, ikke bare tjenestene.
- Skal utbyggersporet ha eks. mva senere, blir det en **egen flate** med egen merking — ikke en kolonne ved siden av.
- `Prisboks.astro` og `Tjenestemeny.astro` tar `belop` som **inkl. mva**. Feltnavnet er `belopInkMva`, så ingen kan ta feil.

---

## 3. Del 1 — tjenester i husleveransen

Dette er menyen som gjelder nettsiden. Navn og omfang er publiserbart. Priser er det ikke.

| # | Tjeneste | Omfang | Segment | Pris |
|---|---|---|---|---|
| 1 | Byggesøknad, ansvarlig søker | Komplett søknad med nabovarsel, gjennomføringsplan og ansvarsretter. Standardtomt — dispensasjonssaker etter tilbud | 2 | ⚠️ Utkast |
| 2 | Situasjonsplan og plassering | Kart, plassering, avstandskrav, terrengtilpasning | 2, 3 | ⚠️ Utkast |
| 3 | Prosjektering og tilpasning av standardtegninger | Tilpasning av modellens tegninger til tomt og kommune. Full omprosjektering etter tilbud | 2, 3 | ⚠️ Utkast |
| 4 | Fundamentplan | Fundamentløsning etter leveransebeskrivelsens grensesnitt — punkt eller ringmur | 2, 3 | ⚠️ Utkast |
| 5 | **Montasje og tilkobling** | Løft, nedsetting, tilkobling til fremlagt VA, strøm og fiber | — | **Inngår i nivå 2. Se §4** |
| 6 | Byggeledelse og koordinering av grunnarbeid | Koordinering av lokale entreprenører for grunn, fundament og utomhus | 2 | ⚠️ Prosentsats |
| 7 | Overtakelse og FDV-dokumentasjon | Overtakelsesforretning, protokoll, FDV-perm, garantidokumenter | 1, 2, 3 | ⚠️ Utkast |
| 8 | Serviceavtale, valgfri | Årlig gjennomgang, prioritert reklamasjonshåndtering etter år 1 | 1, 2, 3 | ⚠️ Utkast, per år |

**Inngår uten egen linje:** § 12-garantistillelse og reklamasjonshåndtering. De er en del av importpåslaget, ikke noe kunden kan velge bort — og de omtales som **opplysning**, aldri som fortrinn. Se § 12-regelen i `04_TEKST_ALLE_SIDER.md` §14b.

### Post 6 har et uavklart punkt kunden vil oppdage

Byggeledelse prises som **3–5 % av arbeidenes verdi**. Dokumentet flagger selv: beregnes prosenten av verdien eks. eller inkl. mva?

På et grunnarbeid til 500 000 kr er forskjellen rundt 5 000 kr. Det er lite nok til å bli oversett i en avtale, og stort nok til å bli en diskusjon på fakturaen. **Skal stå eksplisitt både i avtalen og på nettsiden.**

⚠️ En prosentsats er dessuten det eneste stedet i hele prismodellen der kunden ikke kan se sluttbeløpet på forhånd. Vurder om post 6 heller bør prises som fastpris etter befaring — det ville vært mer i tråd med resten.

---

## 4. Montasje og nivå 2 — låst

**Beslutning:** montasje og tilkobling **inngår i leveransenivå 2.**

> **Nivå 2 — Levert og montert** = huset + transport til tomta + montasje på ferdig fundament + tilkobling til fremlagt vann, avløp, strøm og fiber.

Tjenestelinjen «Montasje og tilkobling» fra Del 1 gjelder derfor **kun** når montasje selges separat: til eksterne kunder, eller til noen som har kjøpt huset på nivå 1.

Uten dette betyr «levert og montert» ikke montert, og da har vi laget nøyaktig den typen udefinert begrep selskapet er bygget for å slippe unna.

### Nivå 2 består av tre deler, ikke én

Montasjekostnaden er ukjent i dag, og det blokkerer nivå 2 — og dermed spor 1, det enkleste kundesegmentet. Løsningen er å slutte å behandle nivå 2 som ett tall:

| Del | Varierer med | Kan prises |
|---|---|---|
| Huset fra fabrikk | Modell | ✅ I dag — det er nivå 1 |
| **Montasje og tilkobling** | Lite. Kran og mannskap, i praksis én dag | ✅ Tilbud fra kranfirma, denne uka |
| **Transport** | Kilometer fra grensen | ✅ Tilbud fra transportør, priset per sone |

To av tre deler kan innhentes før 20. august. Da er Eidsfoss en **kontroll av tall dere allerede har**, ikke jakten på ett dere mangler.

⚠️ Transport bør oppgis som **sonepris**, ikke som én nasjonal sats. Én pris blir for høy på Østlandet og for lav i nord — og en pris som er feil overalt er verre enn tre priser som stemmer. Se handlingsplanen §8, punkt 3.3.

---

## 5. Del 2 — tjenester for eksterne

Rettet mot næringsdrivende: utbyggere, byggmestere, kommuner. **Ikke på privatsiden.**

| Tjeneste | Omfang |
|---|---|
| Byggesøknadspakke per enhet | Som Del 1, for prosjekter uten husleveranse. Volumrabatt ved flere enheter i samme felt |
| Mulighetsvurdering av tomt eller felt | Regelverkssjekk, plasseringsmuligheter, antall enheter, grov økonomi. Trekkes fra ved senere husleveranse |
| Prosjekterings- og tegningspakke | Standardtegninger tilpasset felt, per hustype |
| Byggeledelse for utbygger | Timepris, eller fastpris per prosjekt |
| Rådgivning om Husbanken-finansiering | Lån til boligkvalitet-krav i prosjekteringen |
| Finansieringsformidling mot bank | ⛔ **Markedsføres ikke.** Krever avklaring av konsesjonsplikt. Skal ikke nevnes på nettsiden i noen form |

⚠️ **Utbyggersporet bygges ikke nå.** Kontrakts- og garantistrukturen for B2B er ikke avklart i importmodellen. Egen side når den er det — ikke en kolonne på privatsidene.

---

## 6. Mulighetsvurderingen deles i to

Del 2 priser mulighetsvurdering av tomt til **18 750–31 250 kr inkl. mva**. Det er en betalt konsulenttjeneste, ikke en lead magnet — og den kan ikke være primær-CTA på en forside.

**Beslutning: to nivåer.**

### 6.1 «Kan du bygge her?» — gratis, primær-CTA

Førstevurdering fra kart og reguleringsplan. Ingen befaring, ingen rapport.

Kunden får svar på fire spørsmål:

1. Hva tillater reguleringsplanen på denne tomta?
2. Er det plass til en enhet innenfor utnyttelsesgrad og byggegrenser?
3. Ser adkomsten ut til å tåle trailer og kran?
4. Hva må undersøkes videre, og hvem gjør det?

Svaret er kort og skriftlig. Går det ikke, får kunden vite det — det er halve verdien.

⚠️ BEKREFT: hvor lang tid dette tar, og hvem som gjør det. En gratis tjeneste som tar tre uker er verre enn ingen.

### 6.2 Mulighetsvurdering — betalt, full gjennomgang

Den fra Del 2. Befaring, grunnforhold, avstand til VA og strøm, hvilke modeller som passer, grov økonomi, skriftlig notat.

- **Ett fast beløp inkl. mva.** Ikke et intervall. Dokumentet krever det selv for forbrukerrettede tjenester.
- **Trekkes fra ved senere husleveranse.** Det står allerede for eksterne og bør gjelde privatkunder også — da er den reelt gratis for den som kjøper, og prisen filtrerer bort de som aldri skulle kjøpt.
- Tilbys etter «Kan du bygge her?», ikke i stedet for.

⚠️ BEKREFT: det faste beløpet, og at fratrekket gjelder privatkunder.

**Konsekvens for funnelen:** primær-CTA over hele siden blir **«Kan du bygge her?»** eller **befaring**. Den betalte mulighetsvurderingen selges i spor 2 og 3, og etter den gratis førstevurderingen.

---

## 7. Datamodell

```ts
type Prisstatus = 'publisert' | 'etter-befaring' | 'ikke-kalibrert';

interface Tjeneste {
  id: string;
  navn: string;
  omfang: string;                 // påkrevd — ingen post uten forklaring
  belopInkMva: number | null;     // alltid inkl. mva. Aldri intervall
  prisenhet: 'fast' | 'per-aar' | 'prosent' | 'per-time';
  prisstatus: Prisstatus;
  segmenter: (1 | 2 | 3)[];
  kunEksterne: boolean;
}
```

**Regler i kode:**

- `belopInkMva` er alltid inkl. mva. Feltnavnet sier det, så ingen kan ta feil.
- Er `prisstatus: 'ikke-kalibrert'`, rendres **ingen** pris — bare navn, omfang og ventetekst fra §1.
- `prisstatus: 'etter-befaring'` er lovlig og ærlig, og krever en setning om hva som avgjør prisen.
- Aldri to tall for samme tjeneste. Intervaller finnes ikke i datamodellen — det er bevisst.
- Tjenester med `kunEksterne: true` rendres aldri på privatsidene.
- Finansieringsformidling legges **ikke** inn i det hele tatt, i noen status.

**Startverdi:** alle åtte postene i Del 1 legges inn med navn og omfang, `belopInkMva: null` og `prisstatus: 'ikke-kalibrert'`. Da er strukturen ferdig testet den dagen tallene kommer, og kalibreringen er en datajobb — ikke en ombygging.

---

## 8. Handlingsplan — verifisering av tjenestepriser

> Siden lanseres ikke før denne planen er gjennomført. Rekkefølgen er ikke valgfri: fase 1 må skje **før** Eidsfoss, ellers blir 20. august en datainnsamling i stedet for en kontroll.

### Premisset

Én leveranse på én tomt med én adkomstsituasjon gir **ett tall, ikke en modell.** Venter dere på at Eidsfoss skal «gi tallene», står dere 21. august med et tall — og leveranse nummer to til en skrånende tomt i Telemark velter det.

**Bygg modellen først. Bruk Eidsfoss til å verifisere den.**

---

### Fase 1 — Før Eidsfoss · 10.–19. august

Målet er å ha et **anslag på hver post** før leveransen, slik at avviket kan måles.

| # | Handling | Ansvar | Leveranse |
|---|---|---|---|
| 1.1 | Innhent tilbud fra **kranfirma** — løft og nedsetting av én enhet, standard adkomst | Erik | Kr per oppdrag |
| 1.2 | Innhent tilbud fra **transportør** — grensen til tomt, priset per sone eller per km | Erik | Kr per sone |
| 1.3 | Hent **Husviks kostnadsgrunnlag** for montasje i andre markeder | Erik → Husvik | Referansetall |
| 1.4 | Anslå **tilkobling** til fremlagt VA, strøm og fiber — timer × sats | Erik | Kr per enhet |
| 1.5 | Skriv ned anslaget for hver av de åtte postene i Del 1, med begrunnelse | Erik | Anslagsark |
| 1.6 | Be **Ole Marius / Håkon** om tjenesteoversikt med priser — samme runde som samarbeidsavtalen | Erik | Deres prisliste |

⚠️ 1.6 har lengst ledetid og er utenfor egen kontroll. **Send forespørselen først**, ikke sist.

**Resultat av fase 1:** en kostnadsmodell med anslag på hver post. Ikke priser — anslag som skal etterprøves.

---

### Fase 2 — Eidsfoss 20. august · måling

Dette er den eneste dagen dere får måle uten å ha solgt noe først. Bruk den.

| # | Handling | Ansvar |
|---|---|---|
| 2.1 | Logg **faktisk tid** på montasje: kran inn, løft, nedsetting, kran ut | På stedet |
| 2.2 | Logg **faktisk tid** på tilkobling, per fag | På stedet |
| 2.3 | Noter **hva som gikk annerledes enn planlagt**, og hvorfor | På stedet |
| 2.4 | Noter **adkomstforholdene** konkret: veibredde, snuplass, avstand fra vei til fundament, underlag for kran | På stedet |
| 2.5 | Foto før, under og etter — også til referansebruk senere | På stedet |
| 2.6 | Samle **alle fakturaer** på leveransen, ikke bare de store | Erik |

⚠️ 2.4 er det punktet som avgjør om tallet kan generaliseres. Uten en beskrivelse av hvor lett tomta var, vet dere ikke om Eidsfoss var et normaltilfelle eller et lykketreff.

---

### Fase 3 — Kalibrering · 21. august–15. september

| # | Handling | Ansvar | Avhenger av |
|---|---|---|---|
| 3.1 | Sammenlign anslag mot faktisk kost, post for post. Forklar hvert avvik over 15 % | Erik | 1.5, 2.6 |
| 3.2 | Sett **montasje og tilkobling** som fast beløp | Erik | 3.1 |
| 3.3 | Sett **transport** som sonepris — se note under | Erik | 1.2, 3.1 |
| 3.4 | Sett **nivå 2-pris per modell** = hus + montasje + transportsone | Erik | 3.2, 3.3 |
| 3.5 | Kalibrer mot Ole Marius' system. Marker hva som er harmonisert, og hvor dere bevisst avviker | Erik | 1.6 |
| 3.6 | Sjekk konkurrentenes tjenestepakker på samme leveransenivå | Erik | — |
| 3.7 | Gjør hver forbrukerrettet sats om til **ett fast beløp inkl. mva.** Ingen intervaller | Erik | 3.1–3.6 |
| 3.8 | Avgjør **byggeledelse**: prosentgrunnlag eks. eller inkl. mva — eller gjør posten om til fastpris etter befaring | Eierne | — |
| 3.9 | Sett fast beløp for **betalt mulighetsvurdering**, og avklar om fratrekket gjelder privatkunder | Eierne | — |
| 3.10 | Juridisk avklaring: **finansieringsformidling** og konsesjonsplikt | Jurist | — |
| 3.11 | Skriv **gyldighetstid** på prisene: hvor lenge de står, og hva som utløser endring | Eierne | 3.7 |

**Note til 3.3 — sonepris på transport.** Én nasjonal pris blir feil overalt: for høy på Østlandet, for lav i Nord-Norge. Del inn i soner etter avstand fra grensen, og oppgi «levert og montert innenfor sone 1» som eget leveransenivå-tillegg. Det er ærlig, det er publiserbart, og det er slik bransjen faktisk fungerer.

**Note til 3.11.** Dette er punktet som gjør «prisen skal stå seg» til noe konkret. Uten gyldighetstid er det en påstand.

---

### Fase 4 — Beslutning og lansering

| # | Handling | Ansvar |
|---|---|---|
| 4.1 | Prisene vedtas av **importselskapets eiere** | Eierne |
| 4.2 | Fyll `src/data/tjenester.ts` med beløp og `prisstatus: 'publisert'` | Utvikler |
| 4.3 | Fyll `src/data/modeller/*.json` med nivå 2-priser inkl. mva | Utvikler |
| 4.4 | Sett `TJENESTELISTE_KLAR`, `PRISLISTE_KLAR`, `TOMTEVURDERING_KLAR` til `true` | Utvikler |
| 4.5 | Kontroller at **ingen** pris står som intervall, og at alle er inkl. mva | Utvikler |
| 4.6 | Kjør merkevaresjekken i `00_PROMPT_TIL_CLAUDE_CODE.md` | Utvikler |
| 4.7 | Test alle skjemaer med ekte innsending på produksjonsdomenet | Utvikler |
| 4.8 | Gå gjennom hele sjekklista i `01_BYGGEPLAN.md` fase 7 | Erik + utvikler |
| 4.9 | Lanser | — |

⚠️ 4.7 gjøres på **produksjonsdomenet**, ikke i staging. Endepunkter oppfører seg ulikt, og et skjema som mister henvendelser uten feilmelding er den dyreste feilen på hele siden.

---

### Årlig

Prisene revideres én gang i året, og gyldighetstiden fra 3.11 settes deretter. Sett en påminnelse ved lansering — ellers oppdages det først når en kunde påpeker at prisen på siden er fjorten måneder gammel.
