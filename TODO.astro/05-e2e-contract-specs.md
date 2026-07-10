# 05 — E2e contract specs with Playwright

## Problem

Visual regression tests exist but no contract specs verify page
correctness (status codes, sidebar links, meta tags, code blocks).

## Fix

Add `tests/contract.spec.ts` with specs for:

- Every page in sitemap returns 200
- Every sidebar link in each collection resolves to 200
- Every page has `<title>`, `<meta description>`, `<meta og:image>`
- Every `<pre>` code block has a copy button after hydration
- Sidebar `aria-current="page"` matches active URL
- Pager prev/next links resolve to 200
- 404 page renders for unknown URLs
- RSS feed returns valid XML
- Sitemap returns valid XML

## Files

- `tests/contract.spec.ts`
