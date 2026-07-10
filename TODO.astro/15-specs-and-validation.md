# 15 — Specs and validation

## Status: NOT STARTED

## Goal
Build-time content validation beyond Zod schemas. Catch broken links, verify content structure, add structured data.

## Tasks

### Link validation
- [ ] Add a custom Astro integration or build script that validates:
  - All internal markdown links (`[text](/path)`) point to existing pages
  - All `.prl`/`.prd`/`.prm`/`.yaml` file links exist in `public/`
  - All cross-collection references (pillar ↔ audience) are bidirectional

### robots.txt
- [ ] Add `public/robots.txt` allowing all crawlers, pointing to sitemap

### JSON-LD structured data
- [ ] Add `TechArticle` schema to doc pages
- [ ] Add `BreadcrumbList` to navigation context
- [ ] Add `WebSite` schema to home page

### Reading time
- [ ] Install `reading-time` package
- [ ] Add estimated read time to doc page headers (build-time computation)

### Example file metadata
- [ ] Create typed registry for example files in `src/lib/examples-registry.ts`
- [ ] Walkthrough pages reference files by ID, not raw path

### Acceptance criteria
- [ ] `npm run build` fails on broken links
- [ ] `robots.txt` served at `/robots.txt`
- [ ] JSON-LD present in page source
- [ ] Reading time shown on doc pages