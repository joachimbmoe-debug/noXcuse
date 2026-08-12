// Nivå 2-prising — grunnpris + transportsonetillegg.
// Kilde: 01_BYGGEPLAN.md fase 2 "Datamodell — modell" og 09_TJENESTEMENY.md §4/§8.
//
// Ren funksjon, bevisst uavhengig av Prisboks.astro (som er en dum presentasjonskomponent —
// se 01_BYGGEPLAN.md fase 3 steg 3). Tar inn primitiver, ikke en Modell — Modell-interfacet
// finnes ikke ennå (bygges i fase 3 steg 10). Fant ikke et behov for å forhåndsdefinere et
// delt type nå; flagg i rapport hvis det viser seg feil når modell-arbeidet starter.
//
// Nivå 2 er låst: levert-montert = huset + transport + montasje + tilkobling til FREMLAGT
// vann, avløp, strøm og fiber. Kjenner vi ikke kundens kommune eller sonetillegget for den,
// vises ALDRI grunnprisen alene som om den var totalen — se 01_BYGGEPLAN.md fase 2.

import type { Transportsone } from '../data/transportsoner';

export interface Nivaa2PrisResultat {
  belopInkMva: number | null;
  forklaring: string | null; // f.eks. en "vi kjenner ikke sonen din ennå"-forklaring når sonen er uløst
}

const SONE_IKKE_SATT =
  'Vi har ikke satt transporttillegget for kommunen din ennå, så vi kan ikke vise totalprisen for levert og montert her ennå.';

export function beregnNivaa2Pris(
  basisInkMva: number | null,
  kommune: string | null,
  transportsoner: Transportsone[]
): Nivaa2PrisResultat {
  // Ingen grunnpris — Prisbokens egen null-fallback dekker dette tilfellet, ingen egen
  // forklaring trengs her.
  if (basisInkMva === null) {
    return { belopInkMva: null, forklaring: null };
  }

  // Ingen soner definert ennå (dagens faktiske tilstand — se data/transportsoner.ts).
  if (transportsoner.length === 0) {
    return { belopInkMva: null, forklaring: SONE_IKKE_SATT };
  }

  const sone = kommune
    ? transportsoner.find((s) => s.kommuner.includes(kommune))
    : undefined;

  // Ingen treff på kommunen, eller sonen finnes men tillegget er ikke satt ennå —
  // begge tilfellene er "vi vet ikke sonetillegget", ikke "tillegget er 0".
  if (!sone || sone.tilleggInkMva === null) {
    return { belopInkMva: null, forklaring: SONE_IKKE_SATT };
  }

  return { belopInkMva: basisInkMva + sone.tilleggInkMva, forklaring: null };
}
