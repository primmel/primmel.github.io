# 08 — Resource hints + performance budget

## Problem

No `<link rel="preconnect">` or `<dns-prefetch>` for font loading.
No critical CSS inlining.

## Fix

### BaseLayout head additions
```html
<link rel="preconnect" href="/" />
<link rel="dns-prefetch" href="/" />
<link rel="preload" as="style" href="/_astro/app.css" />
```

### Font loading optimization
- Add `font-display: swap` (already via @fontsource)
- Preload critical font weights (400, 600)

### Performance budget
Document in CLAUDE.md:
- CSS: < 50KB gzipped
- JS: < 30KB gzipped per page (Vue islands)
- Fonts: < 100KB total (woff2)
- Images: < 100KB per page

## Files

- `src/layouts/BaseLayout.astro`
- `CLAUDE.md` — performance budget section
