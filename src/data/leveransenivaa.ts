// De tre leveransenivåene — kostnadstrappen. Én sannhet.
// Kilde: 04_TEKST_ALLE_SIDER.md §1.3. Beskrivelse er kopiert ordrett.
// inkludert/ikkeInkludert er de samme setningene brutt opp i punkter —
// ingen ord er lagt til utover det som står i §1.3.
//
// Nivå 2 er låst: levert-montert = huset + transport + montasje +
// tilkobling til FREMLAGT vann, avløp, strøm og fiber.
// Se 09_TJENESTEMENY.md §4 og 01_BYGGEPLAN.md fase 2.

export type NivaaId = 'fabrikk' | 'levert-montert' | 'totalpris-tomt';

export interface Leveransenivaa {
  nivaa: NivaaId;
  navn: string;
  beskrivelse: string;
  inkludert: string[];
  ikkeInkludert: string[];
  // Trinn 3 har «Forutsetter:» i kildeteksten i stedet for «Ikke med:» —
  // egen struktur, ikke tvunget inn i ikkeInkludert.
  forutsetter: string | null;
}

export const leveransenivaa: Leveransenivaa[] = [
  {
    nivaa: 'fabrikk',
    navn: 'Huset fra fabrikk',
    beskrivelse:
      'Boenheten ferdig bygget i Husviks fabrikk. Dette er prisen på selve huset, før det har flyttet seg.',
    inkludert: ['Boenheten ferdig bygget i Husviks fabrikk'],
    ikkeInkludert: ['Transport', 'Montasje', 'Alt arbeid på tomta'],
    forutsetter: null,
  },
  {
    nivaa: 'levert-montert',
    navn: 'Levert og montert',
    beskrivelse:
      'Huset kjørt til tomta di, satt ned på ferdig fundament og koblet til vann, avløp, strøm og fiber du har lagt fram. Klart til bruk.',
    inkludert: [
      'Huset kjørt til tomta di',
      'Satt ned på ferdig fundament',
      'Koblet til vann, avløp, strøm og fiber du har lagt fram',
    ],
    ikkeInkludert: [
      'Fundament',
      'Framføring av vann og avløp',
      'Strøm',
      'Fiber',
      'Tomt',
      'Offentlige gebyrer',
    ],
    forutsetter: null,
  },
  {
    nivaa: 'totalpris-tomt',
    navn: 'Totalpris med tomt',
    beskrivelse:
      'Hele regnestykket, inkludert tomta. Dette er tallet du faktisk trenger for å vite om du har råd.',
    inkludert: ['Hele regnestykket, inkludert tomta'],
    ikkeInkludert: [],
    forutsetter: 'At vi har vurdert en konkret tomt sammen med deg',
  },
];
