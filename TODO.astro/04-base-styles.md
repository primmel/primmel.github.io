# 04 — Base styles

## Goal
Port the global element styles from the current monolithic custom.css into modular files. Each file one concern.

## Files to create

### `src/styles/base.css`
```css
/* Reset + global element styles */
* { box-sizing: border-box; }
html, body { background: var(--c-bg); color: var(--c-ink); }
body {
  font-family: var(--font-body);
  font-feature-settings: 'ss01';
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  line-height: 1.6;
}
h1, h2, h3, h4 {
  font-family: var(--font-display);
  color: var(--c-ink);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.025em;
}
a { /* link styles */ }
::selection { /* selection color */ }
:focus-visible { /* focus ring */ }
::-webkit-scrollbar { /* custom scrollbar */ }
```

### `src/styles/code.css`
```css
/* Inline code, code blocks, Shiki token overrides, copy button */
```

### `src/styles/tables.css`
```css
/* Table styling: th, td, hover, bottom border on every row */
```

### `src/styles/components.css`
```css
/* Custom blocks (tip/warning/danger), diagrams, blockquotes, hr, kbd */
```

### `src/styles/print.css`
```css
/* @media print — clean spec sheet output */
```

## Migration checklist
- [ ] Port body/heading/link styles → `base.css`
- [ ] Port code block + Shiki tokens → `code.css`
- [ ] Port table styles (with bottom border fix) → `tables.css`
- [ ] Port custom-block/diagram/blockquote → `components.css`
- [ ] Port print styles → `print.css`
- [ ] Create `global.css` that imports all in order
- [ ] Import `global.css` in `BaseLayout.astro`
- [ ] Verify no hardcoded colors remain outside `tokens.css`

## Acceptance criteria
- Monolithic 1,473-line `custom.css` is replaced by 6 modular files
- Each file is <200 lines
- No selector appears in more than one file (MECE)
- Visual output matches current site exactly