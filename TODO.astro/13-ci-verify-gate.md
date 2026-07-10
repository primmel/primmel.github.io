# 13 — CI: run type check + unit specs before deploy

## Problem

The deploy workflow (`deploy-pages.yml`) only runs `npm run build`.
No type checking, no unit tests, no link validation. Broken code
can deploy if Astro's build happens to succeed.

## Fix

Add a `verify` job to the workflow that runs before build+deploy:

```yaml
verify:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
    - run: npm install
    - run: npm run check      # astro check (0 errors expected)
    - run: npm test           # vitest unit specs (33 tests)
    - run: npm run build      # build succeeds
    - run: npm run check:links  # validate internal links
```

Deploy job should `needs: [verify]`.

## Files

- `.github/workflows/deploy-pages.yml`
