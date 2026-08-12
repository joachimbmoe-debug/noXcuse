// Transportsoner — sonepris på transport fra grense til tomt.
// Kilde: 09_TJENESTEMENY.md §4 og §8 note til 3.3; 01_BYGGEPLAN.md fase 2.
//
// Tom med vilje — sonene er ikke definert ennå. Se 09_TJENESTEMENY.md §8.
// Fylles i fase 3.3 (kalibrering) etter tilbud fra transportør (§8, 1.2).
// IKKE finn på sonenavn eller kommuner her.

export interface Transportsone {
  id: string;
  navn: string; // f.eks. «Sone 1 — Østlandet»
  kommuner: string[]; // eller fylker
  tilleggInkMva: number | null;
}

export const transportsoner: Transportsone[] = [];
