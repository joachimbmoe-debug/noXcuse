// Fakta og lanseringsflagg — ingen unntak. Se MANGLER.md for hva som mangler og hvorfor.
// Ingen PRISLISTE_KLAR: droppet, det finnes ingen egen prisliste-side/-funksjon i denne versjonen.
export const config = {
  TJENESTELISTE_KLAR: false,    // true når tjenestelisten m/ priser foreligger — blokkerer spor 2 og 3
  TRANSPORTSONER_KLAR: false,   // true når sonepris på transport er satt
  TOMTEVURDERING_KLAR: false,   // true når svartid og innhold er avklart
  GRENSESNITT_RUTINE: false,    // true når Erik bekrefter at rutinen mot kundens entreprenør finnes
  VIS_REFERANSER: false,        // true etter Eidsfoss-overtakelse 20.08.2026

  ORGNR: "915612474" as string | null,   // Bekreftet av Joachim i samtale 2026-08-12
  TELEFON: "91661470" as string | null,        // Bekreftet av Joachim i samtale 2026-08-11
  EPOST: "erik@no-xcuse.no" as string | null,  // Bekreftet av Joachim i samtale 2026-08-11
  ADRESSE: "Gamleveien 35B, 1406 Ski" as string | null,  // Bekreftet av Joachim i samtale 2026-08-12
  DOMENE: "no-xcuse.no" as string | null,  // Bekreftet av Joachim i samtale 2026-08-12, satt i astro.config.mjs `site`
  IMPORTSELSKAP: "Levert Norge AS" as string | null,  // Bekreftet av Joachim i samtale 2026-08-12
} as const;
