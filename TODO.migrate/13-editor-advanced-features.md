# 13 — Editor: Monaco integration + advanced features

> **Status: ALL DONE (P1-P5)**
> - P1: Monaco Editor with Primmel language definition ✓
> - P2: Two-way sync (drag element → code updates) ✓
> - P3: Data registry CRUD (TODO 15) ✓
> - P4: Mapping view (TODO 16) ✓
> - P5: File System Access API (native open/save) ✓

## What

The editor MVP uses a plain `<textarea>` for code editing. Upgrade to
Monaco Editor for syntax highlighting, autocomplete, and inline error
markers. Monaco is already listed as a dependency.

## Feature priorities

### P1: Monaco Editor
- Replace `<textarea>` in `CodeEditor.vue` with Monaco
- Define a Primmel language definition (keywords: `root`, `process`,
  `canvas`, `role`, `provision`, `start_event`, `end_event`, etc.)
- Syntax highlighting: keywords, strings, comments, IDs
- Inline parse error markers (red squiggly underlines)
- Auto-indent, bracket matching

### P2: Two-way sync (visual ↔ code)
- Drag element on ProcessCanvas → update `x`/`y` in the model →
  regenerate `.prl` text via `dump()`
- Edit code → live re-parse → canvas updates
- Debounced (300ms) to avoid lag

### P3: Data registry CRUD
- List registries from the model
- Render records as forms (driven by data class fields)
- Add/edit/delete records
- Save as `.pws/` directory (one YAML file per record)

### P4: Mapping view
- Visual `.prm` editor
- Draw lines between reference model elements and implementation elements
- Side-by-side model trees with drag-to-map

### P5: File persistence
- File System Access API for native open/save dialogs (Chrome/Edge)
- IndexedDB for working state (save without download)
- Recent files list

## Architecture notes

- Monaco adds ~2MB to the bundle. Use dynamic import:
  `const monaco = await import('monaco-editor')` so it only loads
  when the Code tab is active.
- The language definition should be a standalone module
  (`src/lib/monaco-language.ts`) so it can be tested independently.
- Two-way sync requires a canonical model representation that both
  the text and visual views can read/write. The `Standard` type from
  `@primmel/primmel` is that representation.

## Dependencies

- TODO 11 (publish 1.3.1) for reliable parser import
- TODO 12 (deploy editor) so the public can use it
