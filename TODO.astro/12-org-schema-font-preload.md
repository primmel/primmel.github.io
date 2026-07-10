# 12 — Organization schema + font preloading

## Problem

1. No `Organization` JSON-LD — search engines don't know who publishes
   the site.
2. No font preloading — browser discovers fonts late, causing FOIT/FOUT.

## Fix

### Organization schema (BaseLayout or separate component)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ribose",
  "url": "https://www.ribose.com",
  "logo": "https://www.primmel.org/primmel-logo-light.svg"
}
```

### Font preloading (BaseLayout head)
```html
<link rel="preload" as="font" type="font/woff2"
  href="/path/to/hanken-grotesk-400.woff2" crossorigin />
```

Only preload the 400 + 600 weights (most common).

## Files

- `src/layouts/BaseLayout.astro` — add Organization schema + font preload
