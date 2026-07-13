# TODO.migrate — MMEL → Primmel migration tasks

## Status summary

| # | Task | Status |
|---|------|--------|
| 01 | Rename subprocess → canvas | **DONE** (parser 1.3.0+) |
| 02 | Create private-models repo | **DONE** (14 models, all load) |
| 03 | Build primmel/editor | **MVP DONE** (visual canvas, tree, inspector) |
| 04 | Parser browser build | **DONE** (needs 1.3.1 publish — TODO 11) |
| 05 | Showcase real models | **BLOCKED** (needs clearance) |
| 06 | Embed editor in website | **DONE** (playground with SVG canvas) |
| 07 | Convert .sdc → .prd | **DONE** (dptm.prd) |
| 08 | Convert .sws → .pws | **DONE** (ribose-crimson.pws/) |
| 09 | Nested processes | **PARTIAL** (parent field only — TODO 14) |
| 10 | Update website content | **DONE** (all canvas, deployed) |
| 11 | Publish 1.3.1 | **PENDING** (user must tag) |
| 12 | Deploy editor | **PENDING** |
| 13 | Editor advanced features | **PENDING** (Monaco, CRUD, mapping) |
| 14 | Parser nested processes | **PENDING** (full implementation) |

## Completed in this session

- TODO 02: All 14 private-models .prl files validated, canvas keyword applied,
  schema standardized, format conversions (.prd, .pws) verified
- TODO 03: Full editor built — ProcessCanvas (SVG), ModelTree, CodeEditor,
  ElementInspector, CompliancePanel, Pinia stores
- TODO 04: Browser build fixed — exports path, files array, prepublishOnly,
  vite config outDir
- TODO 06: Playground upgraded — split-pane live editor with visual SVG
  process flow diagram (pan/zoom, multi-canvas tabs)
- TODO 07-08: Format converters verified and outputs confirmed
- TODO 10: All website content uses canvas keyword, deployed to primmel.org

## Remaining work

1. **TODO 11**: Tag and release `v1.3.1` (user action — requires git tag push)
2. **TODO 12**: Deploy editor to GitHub Pages
3. **TODO 13**: Monaco editor, data registry CRUD, mapping view
4. **TODO 14**: Full nested process support in the parser
5. **TODO 05**: Get clearance on which model snippets can be shown publicly
