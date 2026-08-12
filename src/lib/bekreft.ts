// Kontrakt: aldri la et uverifisert fakta (null i config.ts) nå produksjon.
// I dev vises en synlig plassholder. I prod stopper bygget.
export function faktaEllerPlassholder(verdi: string | null, feltnavn: string): string {
  if (verdi !== null) return verdi;
  if (import.meta.env.DEV) return `⚠️ BEKREFT: ${feltnavn}`;
  throw new Error(`Bygg stoppet: ${feltnavn} er null i config.ts. Publiseres ikke med et uverifisert fakta.`);
}
