// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // ⚠️ BEKREFT: placeholder-domene — bytt til ekte DOMENE før lansering, se MANGLER.md
  site: 'https://nettside-3-placeholder.noxcuse.no',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});