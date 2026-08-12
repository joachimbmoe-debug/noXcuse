// Dette ordner du selv — de seks postene som ikke inngår i prisen på huset.
// Kilde: 04_TEKST_ALLE_SIDER.md §1.4. Kopiert ordrett.

export interface OrdnerSelvPost {
  punkt: string;
  tekst: string;
}

export const ordnerSelv: OrdnerSelvPost[] = [
  {
    punkt: 'Fundament',
    tekst:
      'Støpt plate, ringmur eller peler — avhengig av grunnforhold. Må stå ferdig før huset kommer.',
  },
  {
    punkt: 'Vann og avløp',
    tekst:
      'Tilkobling til kommunalt nett, eller privat løsning med brønn og renseanlegg.',
  },
  {
    punkt: 'Strøm',
    tekst: 'Framføring til tomta og tilknytningsavgift til nettselskapet.',
  },
  {
    punkt: 'Fiber',
    tekst: 'Framføring dit du vil ha den.',
  },
  {
    punkt: 'Tomt',
    tekst: 'Kjøp eller fradeling. Har du tomta, er dette gjort.',
  },
  {
    punkt: 'Offentlige gebyrer',
    tekst:
      'Byggesak, tilknytning, oppmåling. Varierer mye fra kommune til kommune.',
  },
];
