# 13 — Search (Pagefind)

## Goal
Replace VitePress local search with Pagefind — a static site search that works at build time with zero server-side cost.

## Why Pagefind

- Builds a search index at build time (after Astro build)
- Zero server cost — index is static files
- Works offline
- Tiny client-side JS (~10KB)
- Respects content structure (headings, sections)

## Setup

```bash
npm install pagefind
```

### Build pipeline

```json
// package.json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

Pagefind runs AFTER Astro build, scans the `dist/` output, and creates a `dist/pagefind/` directory with the search index.

### Search component

```astro
---
// src/components/ui/SearchButton.astro
---
<button class="search-button" id="search-button">
  <span>Search</span>
  <kbd>⌘K</kbd>
</button>
<div class="search-modal" id="search-modal" hidden>
  <input type="text" id="search-input" placeholder="Search..." />
  <div id="search-results"></div>
</div>
<script>
  import { searchInput } from './search-client';
  // Lazy-load Pagefind only when search is opened
</script>
```

### ⌘K shortcut

Add a global keydown listener for `Cmd+K` / `Ctrl+K` that opens the search modal. Pagefind JS is loaded lazily on first open.

## Acceptance criteria
- Search index builds as part of `npm run build`
- ⌘K opens search modal
- Search results show page title + excerpt
- Zero JS loaded until search is opened
- Works offline