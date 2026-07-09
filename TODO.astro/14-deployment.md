# 14 — Deployment

## Goal
GitHub Actions workflow that builds the Astro site and deploys to GitHub Pages.

## Workflow

```yaml
# .github/workflows/deploy-astro.yml
name: Deploy Astro

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Migration strategy

During migration, the old VitePress and new Astro coexist:
1. Astro builds to `dist/` (the default)
2. VitePress builds to `.vitepress/dist/`
3. Deploy workflow builds whichever is active
4. Once Astro is complete, remove VitePress config and `.vitepress/`

## Acceptance criteria
- `npm run build` produces `dist/` with all pages
- Pagefind index generated post-build
- GitHub Pages serves the site
- Old VitePress workflow is removed when migration is complete