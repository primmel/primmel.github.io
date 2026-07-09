import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://www.primmel.org',
  output: 'static',
  integrations: [
    sitemap(),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      wrap: true,
    },
  },
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
});