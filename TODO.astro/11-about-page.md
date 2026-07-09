# 11 — About page + 404

## Goal
Migrate the about page and 404 to Astro. Both use `PageLayout` (no sidebar).

## About page

`src/pages/about.astro`:
- Renders `about.md` content via `PageLayout`
- Logo showcase with light/dark cards
- Color legend with swatches
- All existing content preserved

## 404 page

`src/pages/404.astro`:
- Custom editorial 404 (large display headline, burgundy eyebrow)
- Two button actions (Return home, Read the introduction)

## About frontmatter

Currently `about.md` has no frontmatter. Add:
```yaml
---
title: "About Primmel"
description: "Prime MMEL — the torch carried forward."
---
```

## Acceptance criteria
- About page renders with all sections (logo, colors, origin, mission, use cases)
- 404 renders for any unknown URL
- Both use `PageLayout` (no sidebar, no outline)