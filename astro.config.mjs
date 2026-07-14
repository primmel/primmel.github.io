import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.primmel.org',
  output: 'static',
  integrations: [
    sitemap(),
    mdx(),
    vue(),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});