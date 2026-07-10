# Visual tests

Playwright visual regression tests for key pages.

## Running

```bash
npx playwright install        # first time only
npm test                      # run all tests
npx playwright test --update  # update baselines
```

## Structure

- `tests/visual.spec.ts` — screenshot comparisons (light + dark) for 10 key pages + mobile sidebar test
- Baselines stored in `tests/visual.spec.ts-snapshots/`

## CI

Tests use `npm run build && astro preview --port 4328` as the web server.
In CI mode (`CI=true`), retries = 2, workers = 1.
