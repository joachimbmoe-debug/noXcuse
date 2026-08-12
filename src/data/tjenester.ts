// Tjenestelisten — à la carte-meny oppå leveransenivå 2.
// Kilde: 09_TJENESTEMENY.md §3 (navn/omfang) og §7 (datamodell).
//
// Alle åtte postene er lagt inn med belopInkMva: null og
// prisstatus: 'ikke-kalibrert' — priser finnes ikke før kalibrering
// etter Eidsfoss 20. august 2026 (se 09_TJENESTEMENY.md §8, fase 3-4).
// IKKE fyll inn beløp her uten at 09_TJENESTEMENY.md §8 fase 4 er gjennomført.
//
// Er prisstatus 'ikke-kalibrert' skal komponenten aldri rendre en pris —
// bare navn, omfang og ventetekst. Se §1 og §7.

export type Prisstatus = 'publisert' | 'etter-befaring' | 'ikke-kalibrert';

export interface Tjeneste {
  id: string;
  navn: string;
  omfang: string; // påkrevd — ingen post uten forklaring
  belopInkMva: number | null; // alltid inkl. mva. Aldri intervall
  prisenhet: 'fast' | 'per-aar' | 'prosent' | 'per-time';
  prisstatus: Prisstatus;
  segmenter: (1 | 2 | 3)[];
  kunEksterne: boolean;
}

export const tjenester: Tjeneste[] = [
  {
    id: 'byggesoknad-ansvarlig-soker',
    navn: 'Byggesøknad, ansvarlig søker',
    omfang:
      'Komplett søknad med nabovarsel, gjennomføringsplan og ansvarsretter. Standardtomt — dispensasjonssaker etter tilbud',
    belopInkMva: null,
    prisenhet: 'fast',
    prisstatus: 'ikke-kalibrert',
    segmenter: [2],
    kunEksterne: false,
  },
  {
    id: 'situasjonsplan-og-plassering',
    navn: 'Situasjonsplan og plassering',
    omfang: 'Kart, plassering, avstandskrav, terrengtilpasning',
    belopInkMva: null,
    prisenhet: 'fast',
    prisstatus: 'ikke-kalibrert',
    segmenter: [2, 3],
    kunEksterne: false,
  },
  {
    id: 'prosjektering-og-tilpasning-av-standardtegninger',
    navn: 'Prosjektering og tilpasning av standardtegninger',
    omfang:
      'Tilpasning av modellens tegninger til tomt og kommune. Full omprosjektering etter tilbud',
    belopInkMva: null,
    prisenhet: 'fast',
    prisstatus: 'ikke-kalibrert',
    segmenter: [2, 3],
    kunEksterne: false,
  },
  {
    id: 'fundamentplan',
    navn: 'Fundamentplan',
    omfang:
      'Fundamentløsning etter leveransebeskrivelsens grensesnitt — punkt eller ringmur',
    belopInkMva: null,
    prisenhet: 'fast',
    prisstatus: 'ikke-kalibrert',
    segmenter: [2, 3],
    kunEksterne: false,
  },
  {
    id: 'montasje-og-tilkobling',
    navn: 'Montasje og tilkobling',
    omfang: 'Løft, nedsetting, tilkobling til fremlagt VA, strøm og fiber',
    belopInkMva: null,
    prisenhet: 'fast',
    prisstatus: 'ikke-kalibrert',
    // Inngår i leveransenivå 2 for segment 1-3 — ikke en egen valgbar linje
    // for dem. Gjelder kun når montasje selges separat: til eksterne, eller
    // til noen som har kjøpt huset på nivå 1. Se 09_TJENESTEMENY.md §4.
    segmenter: [],
    kunEksterne: false,
  },
  {
    id: 'byggeledelse-og-koordinering-av-grunnarbeid',
    navn: 'Byggeledelse og koordinering av grunnarbeid',
    omfang:
      'Koordinering av lokale entreprenører for grunn, fundament og utomhus',
    belopInkMva: null,
    prisenhet: 'prosent',
    prisstatus: 'ikke-kalibrert',
    segmenter: [2],
    kunEksterne: false,
  },
  {
    id: 'overtakelse-og-fdv-dokumentasjon',
    navn: 'Overtakelse og FDV-dokumentasjon',
    omfang:
      'Overtakelsesforretning, protokoll, FDV-perm, garantidokumenter',
    belopInkMva: null,
    prisenhet: 'fast',
    prisstatus: 'ikke-kalibrert',
    segmenter: [1, 2, 3],
    kunEksterne: false,
  },
  {
    id: 'serviceavtale-valgfri',
    navn: 'Serviceavtale, valgfri',
    omfang:
      'Årlig gjennomgang, prioritert reklamasjonshåndtering etter år 1',
    belopInkMva: null,
    prisenhet: 'per-aar',
    prisstatus: 'ikke-kalibrert',
    segmenter: [1, 2, 3],
    kunEksterne: false,
  },
];
