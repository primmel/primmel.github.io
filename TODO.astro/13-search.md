# 13 — Search (Pagefind)

## Status: NOT STARTED

## Goal
Add Pagefind static search. Zero server cost, works offline, ~10KB client JS loaded lazily on first search open.

## Implementation

### Install
```bash
npm install pagefind
```

### Build pipeline
```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

Pagefind runs AFTER Astro build, scans `dist/`, creates `dist/pagefind/` with the index.

### Component
Create `src/components/ui/SearchButton.astro`:
- Button in NavBar with ⌘K shortcut
- Modal overlay with input + results
- Lazy-load Pagefind JS only when modal opens

### Acceptance criteria
- [ ] `npm run build` generates search index in `dist/pagefind/`
- [ ] ⌘K opens search modal
- [ ] Results show page title + excerpt
- [ ] Zero JS loaded until search is opened
- [ ] Works offline