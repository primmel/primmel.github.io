import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

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
    resolve: {
      alias: {
        '@primmel/primmel': fileURLToPath(new URL('./node_modules/@primmel/primmel/dist/index.js', import.meta.url)),
      },
    },
  },
});