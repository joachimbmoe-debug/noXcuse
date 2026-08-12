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

  integrations: [sitemap()]
});