# 09 — Examples pages

## Goal
Migrate 7 example walkthrough pages + example file serving to Astro.

## Pages

| Route | Source |
| --- | --- |
| `/examples/` | `examples/index.md` |
| `/examples/minimal-model` | `examples/minimal-model.md` |
| `/examples/data-and-registries` | `examples/data-and-registries.md` |
| `/examples/process-flow` | `examples/process-flow.md` |
| `/examples/compliance-and-measurement` | `examples/compliance-and-measurement.md` |
| `/examples/approval-workflow` | `examples/approval-workflow.md` |
| `/examples/implementation-package` | `examples/implementation-package.md` |

## Static example files

These live in `public/examples/files/` and are served as-is:
- `.prl`, `.prd`, `.prm` files
- `.pws/` workspace directory with YAML records
- Links from walkthrough pages point at these static paths

## Frontmatter

```yaml
---
title: "Minimal model"
order: 1
demonstrates:
  - "model header"
  - "role"
  - "start_event / end_event"
  - "process"
  - "subprocess"
sourceFile: "/examples/files/01-minimal-model.prl"
sidebar:
  section: "Examples"
  order: 1
  label: "1. Minimal Model"
---
```

## Route

```astro
---
// src/pages/examples/[...slug].astro
import { getCollection } from 'astro:content';
import DocLayout from '@layouts/DocLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection('examples');
  return entries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
const { entry } = Astro.props;
const { Content, headings } = await entry.render();
---
<DocLayout title={entry.data.title} collection="examples" slug={entry.slug} headings={headings}>
  <Content />
</DocLayout>
```

## Process flow diagrams

The examples contain ASCII-art process flow diagrams in markdown code blocks. These should be replaced with inline SVG process-flow components (like the existing architecture diagrams):

```
src/components/diagrams/
├── ProcessFlow.astro        ← renders a .prl subprocess as an SVG flowchart
└── WorkspaceTree.astro      ← renders the .pws/ directory tree
```

A `ProcessFlow.astro` component could parse the subprocess elements + edges from the model and render an SVG automatically — model-driven diagramming. This is a future enhancement beyond the initial migration.

## Acceptance criteria
- All 7 example pages render with DocLayout
- Example file links resolve to `public/examples/files/` static assets
- Sidebar shows Examples group
- Prev/next pager works within the examples collection