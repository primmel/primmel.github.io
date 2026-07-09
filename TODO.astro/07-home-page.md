# 07 — Home page

## Goal
Migrate the home page from `HomePage.vue` to Astro components. No Vue needed — the home page is entirely static.

## Structure

```
src/pages/index.astro
src/components/home/
├── Hero.astro          ← logo, eyebrow, headline, tagline, actions, lifecycle SVG
├── PillarsList.astro   ← 5 pillars as narrative list with huge numerals
├── FeaturesList.astro  ← 6 features as numbered prose entries
└── FooterCTA.astro     ← "From BSI SMART..." call to action
```

## Hero.astro

The hero is a two-column grid: content on left, lifecycle SVG on right. The SVG is inline — no external file dependency.

Data (pillars, features) lives in `src/consts.ts` as typed arrays, not hardcoded in the component:

```ts
// src/consts.ts
export const PILLARS = [
  { num: '01', name: 'Define',    href: '/architecture/define',    desc: '...' },
  { num: '02', name: 'Reference', href: '/architecture/reference', desc: '...' },
  { num: '03', name: 'Implement', href: '/architecture/implement', desc: '...' },
  { num: '04', name: 'Operate',   href: '/architecture/operate',   desc: '...' },
  { num: '05', name: 'Audit',     href: '/architecture/audit',     desc: '...' },
] as const;

export const FEATURES = [
  { num: '01', title: 'Executable standards', body: '...' },
  // ...
] as const;
```

## Lifecycle SVG

Extract from current `HomePage.vue` into a standalone `LifecycleDiagram.astro` component. The SVG uses CSS variables for colors (not hardcoded fills), so it adapts to dark mode automatically.

## index.astro

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
import Hero from '@components/home/Hero.astro';
import PillarsList from '@components/home/PillarsList.astro';
import FeaturesList from '@components/home/FeaturesList.astro';
import FooterCTA from '@components/home/FooterCTA.astro';
---
<PageLayout title="Primmel" description="...">
  <Hero />
  <PillarsList />
  <FeaturesList />
  <FooterCTA />
</PageLayout>
```

## Acceptance criteria
- Home page renders identically to current VitePress version
- Zero client-side JS on home page (pure static HTML)
- Lifecycle SVG uses CSS variables for all colors
- Pillar/feature data comes from `consts.ts`, not component-internal