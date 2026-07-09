# 10 — Docs pages (language reference)

## Goal
Migrate the 7 language reference + getting-started pages.

## Pages

| Route | Source | Sidebar section |
| --- | --- | --- |
| `/docs/introduction` | `docs/introduction.md` | Getting Started |
| `/docs/first-model` | `docs/first-model.md` | Getting Started |
| `/docs/data-model` | `docs/data-model.md` | Language Reference |
| `/docs/process-model` | `docs/process-model.md` | Language Reference |
| `/docs/compliance` | `docs/compliance.md` | Language Reference |
| `/docs/measurement` | `docs/measurement.md` | Language Reference |
| `/docs/mapping` | `docs/mapping.md` | Language Reference |

## Route

Same pattern as architecture and examples — `[...slug].astro` dynamic route with `DocLayout`.

## Frontmatter

```yaml
---
title: "Data Model"
sidebar:
  section: "Language Reference"
  order: 1
  label: "Data Model"
---
```

## Acceptance criteria
- All 7 pages render with DocLayout
- Sidebar groups: Getting Started, Language Reference
- Cross-links to examples and architecture pages work