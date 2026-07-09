# 08 — Architecture pages

## Goal
Migrate 12 architecture pages (overview + 5 pillars + 5 audiences + overview index) to Astro content collection with `DocLayout`.

## Pages

| Route | Source | Layout |
| --- | --- | --- |
| `/architecture/` | `architecture/index.md` | DocLayout |
| `/architecture/define` | `architecture/define.md` | DocLayout |
| `/architecture/reference` | `architecture/reference.md` | DocLayout |
| `/architecture/implement` | `architecture/implement.md` | DocLayout |
| `/architecture/operate` | `architecture/operate.md` | DocLayout |
| `/architecture/audit` | `architecture/audit.md` | DocLayout |
| `/architecture/audiences/publishers` | `architecture/audiences/publishers.md` | DocLayout |
| `/architecture/audiences/readers` | `architecture/audiences/readers.md` | DocLayout |
| `/architecture/audiences/implementers` | `architecture/audiences/implementers.md` | DocLayout |
| `/architecture/audiences/operators` | `architecture/audiences/operators.md` | DocLayout |
| `/architecture/audiences/auditors` | `architecture/audiences/auditors.md` | DocLayout |

## Dynamic route

```astro
---
// src/pages/architecture/[...slug].astro
import { getCollection } from 'astro:content';
import DocLayout from '@layouts/DocLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection('architecture');
  return entries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content, headings } = await entry.render();
---
<DocLayout
  title={entry.data.title}
  collection="architecture"
  slug={entry.slug}
  headings={headings}
>
  <Content />
</DocLayout>
```

## Frontmatter schema

Each architecture page gets:
```yaml
---
title: "Define — author a reference model"
pillar: define        # which pillar this is (for sidebar grouping)
audience: publishers  # which audience this maps to (for cross-linking)
sidebar:
  section: "Architecture"
  order: 1
  label: "Define"
---
```

Audience pages get:
```yaml
---
title: "Publishers"
audience: publishers
pillar: define
sidebar:
  section: "Audiences"
  order: 1
  label: "Publishers"
---
```

## SVG diagrams

The two-sides diagram on the architecture overview and the lifecycle diagram on the home page are inline SVGs. They should be extracted into reusable Astro components:

```
src/components/diagrams/
├── TwoSidesDiagram.astro     ← the branching reference/application diagram
├── LifecycleDiagram.astro    ← the 5-pillar circular diagram
└── FileFlowDiagram.astro     ← the .prd→.prl→.prm→.pws flow
```

All diagrams use CSS variables for colors, never hardcoded fills.

## Acceptance criteria
- All 11 architecture pages render with DocLayout
- Sidebar shows Architecture group + Audiences group
- Active page highlighted
- Prev/next pager works
- SVG diagrams render with theme-adaptive colors
- All cross-links between pillars and audiences work