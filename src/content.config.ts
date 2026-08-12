// src/content.config.ts — Fase 3 steg 14, 01_BYGGEPLAN.md linje 265.
// Definerer `kunnskap`-collection (SEO-artikler, /kunnskap). Erstatter Astro sin
// implisitte "auto-generating collections"-oppførsel med et eksplisitt skjema —
// se advarselen den fjerner i dev-loggen.
//
// Collection er TOM i denne runden (src/content/kunnskap/ har ingen .md-filer).
// De åtte planlagte artiklene i 04_TEKST_ALLE_SIDER.md §12 skal IKKE skrives før
// søkeordgrensen mot husvik.no er avklart med Erik — se MANGLER.md. Denne fila
// bygger kun malen/skjemaet som skal vise artikler NÅR de finnes.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const kunnskap = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kunnskap' }),
  schema: z.object({
    tittel: z.string(),
    sokeintensjon: z.string(),
    ingress: z.string(),
    publisertDato: z.date().optional(),
  }),
});

export const collections = { kunnskap };
