# 12 — Deploy primmel/editor to a public URL

## What

The editor MVP at `primmel/editor` builds successfully but is not
deployed. Deploy it as a static site so users can access it at a
public URL.

## Options

### Option A: GitHub Pages (recommended)

Add a `.github/workflows/deploy-pages.yml` to `primmel/editor` that:
1. Runs `npm ci && npm run build` on push to main
2. Uploads `dist/` as a Pages artifact
3. Deploys to `primmel.github.io/editor/` (subpath)

The `vite.config.ts` already has `base: './'` for relative paths,
which works with subpath hosting.

### Option B: Subdomain (editor.primmel.org)

Configure DNS + GitHub Pages custom domain. More setup but cleaner
URL. Can be done after Option A is working.

### Option C: Embed in primmel.org via iframe

Add an iframe to a primmel.org page that loads the editor. Simplest
integration but iframe limitations (no shared state, separate JS
context).

## Prerequisites

- TODO 11 (publish 1.3.1) — so the browser bundle resolves correctly
  without the Vite alias workaround. Until then, the alias in
  `vite.config.ts` handles it.

## Deploy workflow template

```yaml
name: Deploy Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```
