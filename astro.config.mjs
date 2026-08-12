// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Domene bekreftet av Joachim 2026-08-12, se config.ts DOMENE og MANGLER.md #4.
  site: 'https://no-xcuse.no',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  // i18n-infrastruktur lagt til 2026-08-12 på Joachims eksplisitte instruks —
  // KUN routing + språkvelger, ikke oversatt innhold ennå (se src/pages/en/**
  // og MANGLER.md). Norsk forblir på rot-URL-er (ingen /nb/-prefiks), engelsk
  // får /en/-prefiks. https://docs.astro.build/en/guides/internationalization/
  i18n: {
    locales: ['nb', 'en'],
    defaultLocale: 'nb',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [sitemap()]
});