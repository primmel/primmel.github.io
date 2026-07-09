# 03 — Theme tokens (CSS custom properties)

## Goal
Single source of truth for all design tokens. MECE split: colors, typography, spacing, motion.

## Structure

```
src/styles/
├── tokens.css       ← Variables only — no rules, no selectors
├── base.css         ← Reset + global element styles (body, headings, links, etc.)
├── code.css         ← Code blocks, Shiki token overrides
├── tables.css       ← Table styling
├── components.css   ← Custom blocks, callouts, diagrams
├── print.css        ← @media print
└── global.css       ← @imports the above in order
```

## tokens.css

```css
:root {
  /* ── Brand palette (each color has a role) ── */
  --c-indigo:        #1e3a8a;
  --c-indigo-mid:    #3b6ee6;
  --c-indigo-light:  #8aabf5;

  --c-burgundy:      #7d2a2a;
  --c-burgundy-mid:  #a84444;

  --c-ochre:         #a87410;
  --c-ochre-mid:     #c89020;

  --c-olive:         #5a6b3f;
  --c-olive-mid:     #7a8b5a;

  /* ── Surfaces ── */
  --c-bg:            #f7f2e7;
  --c-surface:       #fdfaf2;
  --c-surface-2:     #efe8d4;
  --c-surface-3:     #e6dec5;

  /* ── Ink ── */
  --c-ink:           #1a1f2e;
  --c-text-2:        #4d4d4d;
  --c-text-3:        #8a857a;

  /* ── Rules ── */
  --c-rule:          #d8cfb6;
  --c-rule-strong:   #b0a78a;

  /* ── Typography ── */
  --font-display:    'Hanken Grotesk', system-ui, sans-serif;
  --font-body:       'Hanken Grotesk', system-ui, sans-serif;
  --font-mono:       'Spline Sans Mono', monospace;

  /* ── Spacing scale ── */
  --sp-0:  0;
  --sp-1:  0.25rem;
  --sp-2:  0.5rem;
  --sp-3:  0.75rem;
  --sp-4:  1rem;
  --sp-5:  1.5rem;
  --sp-6:  2rem;
  --sp-7:  3rem;
  --sp-8:  4rem;
  --sp-9:  6rem;

  /* ── Motion ── */
  --ease:            cubic-bezier(0.2, 0.7, 0.2, 1);
  --dur-fast:        0.12s;
  --dur-normal:      0.2s;
}

.dark {
  --c-bg:            #1a1810;
  --c-surface:       #22201a;
  /* ... dark overrides ... */
}
```

## MECE check
- `tokens.css` — variables only, zero rules
- `base.css` — element selectors only (`body`, `h1`, `a`, `p`, `code`, etc.)
- `code.css` — `.shiki`, `pre`, `code` selectors
- `tables.css` — `table`, `th`, `td` selectors
- `components.css` — `.custom-block`, `.diagram`, `.vp-doc` overrides
- `print.css` — `@media print` only

No overlap. No gap. Each concern in one file.

## Acceptance criteria
- All CSS variables live in `tokens.css`
- No hardcoded colors anywhere else
- Dark mode overrides only in `tokens.css` under `.dark`
- All other CSS files reference variables, never literal values