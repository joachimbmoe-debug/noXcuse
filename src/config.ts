// Fakta og lanseringsflagg — ingen unntak. Se MANGLER.md for hva som mangler og hvorfor.
// Ingen PRISLISTE_KLAR: droppet, det finnes ingen egen prisliste-side/-funksjon i denne versjonen.
export const config = {
  TJENESTELISTE_KLAR: false,    // true når tjenestelisten m/ priser foreligger — blokkerer spor 2 og 3
  TRANSPORTSONER_KLAR: false,   // true når sonepris på transport er satt
  TOMTEVURDERING_KLAR: false,   // true når svartid og innhold er avklart
  GRENSESNITT_RUTINE: false,    // true når Erik bekrefter at rutinen mot kundens entreprenør finnes
  VIS_REFERANSER: false,        // true etter Eidsfoss-overtakelse 20.08.2026

  ORGNR: null as string | null,          // BEKREFT — org.nr. for No Xcuse AS
  TELEFON: "91661470" as string | null,        // Bekreftet av Joachim i samtale 2026-08-11
  EPOST: "erik@no-xcuse.no" as string | null,  // Bekreftet av Joachim i samtale 2026-08-11
  ADRESSE: null as string | null,        // BEKREFT — postadresse, vises i footer
  DOMENE: null as string | null,         // BEKREFT — astro.config.mjs `site` er et placeholder til dette er satt
  IMPORTSELSKAP: "Levertnorge AS" as string | null,  // Bekreftet av Joachim i samtale 2026-08-12
} as const;
