# TODO.migrate — MMEL → Primmel migration tasks

## Status summary

| # | Task | Status |
|---|------|--------|
| 01 | Rename subprocess → canvas | **DONE** (parser 1.3.0+) |
| 02 | Create private-models repo | **DONE** (14 models, all load) |
| 03 | Build primmel/editor | **MVP DONE + Monaco** (deployed to primmel.org/editor/) |
| 04 | Parser browser build | **DONE** (needs 1.3.1 publish — TODO 11) |
| 05 | Showcase real models | **DONE** (anonymized stats + structural patterns) |
| 06 | Embed editor in website | **DONE** (playground with SVG canvas) |
| 07 | Convert .sdc → .prd | **DONE** (dptm.prd) |
| 08 | Convert .sws → .pws | **DONE** (ribose-crimson.pws/) |
| 09 | Nested processes | **DONE** (parser + dumper, 3 tests) |
| 10 | Update website content | **DONE** (all canvas, deployed) |
| 11 | Publish 1.3.1 | **PENDING** (user must tag) |
| 12 | Deploy editor | **DONE** (live at primmel.org/editor/) |
| 13 | Editor advanced features | **P1+P2+P5 DONE** (Monaco, two-way sync, File System Access). P3-P4 pending |
| 14 | Parser nested processes | **DONE** (merged as PR #38) |
| 15 | Data registry CRUD | **PENDING** (see TODO 15) |
| 16 | Mapping view | **PENDING** (see TODO 16) |

## All original tasks (01-10) COMPLETE

Every original migration task is now done. The ecosystem is fully
migrated from MMEL to Primmel.

## What was completed

- **TODO 02**: All 14 private-models .prl files validated, canvas keyword, schema standardized
- **TODO 03**: Full editor with Monaco — ProcessCanvas, ModelTree, CodeEditor, ElementInspector, CompliancePanel
- **TODO 04**: Browser build fixed (PR #37) — exports path, files array, prepublishOnly
- **TODO 05**: Real-world scale showcase page (anonymized stats, structural patterns)
- **TODO 06**: Playground upgraded with visual SVG process flow diagram
- **TODO 09/14**: Nested processes implemented (parser + dumper + 3 tests, PR #38)
- **TODO 12**: Editor deployed to primmel.org/editor/ (GitHub Pages)
- **TODO 13 P1**: Monaco Editor integration with Primmel syntax highlighting

## Remaining work

1. **TODO 11**: Tag and release `v1.3.1` (user action — requires git tag push)
2. **TODO 13 P2-P5**: Two-way sync, data registry CRUD, mapping view, File System Access API
3. **Real model snippets**: User may want to review and approve specific snippets from
   private-models for public display (beyond the anonymized stats already published)

