// De fire segmentene / sporene — én sannhet.
// Kilde: 08_SEGMENTSIDER_TEKST.md §1 (kortTekst, ferdig tekst — kopiert
// ordrett) og §7 (navCta per spor).
//
// Segmentvalget lagres i sessionStorage som `noxcuse_segment` og styrer
// hvilken CTA som vises ellers på siden. Uten JS fungerer alle fire
// kortene som vanlige lenker. Se 08_SEGMENTSIDER_TEKST.md §6.

export interface Segment {
  nr: 1 | 2 | 3 | 4;
  slug: string;
  kortTittel: string;
  kortTekst: string;
  kortCta: string;
  navCta: string;
  epostsekvens: 'A' | 'B' | 'C' | 'D';
}

export const segmenter: Segment[] = [
  {
    nr: 1,
    slug: 'tomta-er-klar',
    kortTittel: 'Tomta er klar',
    kortTekst:
      'Du har opparbeidet tomt og alle godkjenninger på plass. Du vil vite hva huset koster levert og montert.',
    kortCta: 'Få pris på huset',
    navCta: 'Få pris',
    epostsekvens: 'A',
  },
  {
    nr: 2,
    slug: 'vi-tar-resten',
    kortTittel: 'Du har tomt, vi tar resten',
    kortTekst:
      'Du har tomt, men vil ikke være byggherre. Vi ordner huset og jobben på tomta.',
    kortCta: 'Se hva vi kan ta',
    navCta: 'Book befaring',
    epostsekvens: 'B',
  },
  {
    nr: 3,
    slug: 'egen-entreprenor',
    kortTittel: 'Du har tomt og egen entreprenør',
    kortTekst:
      'Du har folk på plass, og trenger bare huset — pluss det du velger av tjenester fra oss.',
    kortCta: 'Sett sammen din leveranse',
    navCta: 'Sett sammen leveransen',
    epostsekvens: 'C',
  },
  {
    nr: 4,
    slug: 'kostnadsguiden',
    kortTittel: 'Du vil bare vite mer',
    kortTekst:
      'Du vurderer småhus eller hytte, og er ikke i nærheten av å bestemme deg. Helt greit.',
    kortCta: 'Last ned kostnadsguiden',
    navCta: 'Last ned guiden',
    epostsekvens: 'D',
  },
];
