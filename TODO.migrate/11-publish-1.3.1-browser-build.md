# 11 — Publish @primmel/primmel@1.3.1 (browser build fix)

## What

The browser build fix (PR #37 in primmel-ts) is merged to main but
not yet published. Version is bumped to 1.3.1 in package.json.

## Blocker

The v1.3.0 tag exists at the old broken commit. A new v1.3.1 tag
needs to be created at the current main HEAD and a GitHub Release
published to trigger the trusted-publishing `release.yml` workflow.

## Steps (user must run — cannot push tags per policy)

```bash
cd /Users/mulgogi/src/primmel/primmel-ts
git checkout main && git pull
git tag v1.3.1
git push origin v1.3.1
gh release create v1.3.1 --repo primmel/primmel-ts \
  --title "v1.3.1" --generate-notes
```

## What the release includes

- `exports.browser` → `./dist-browser/index.mjs` (was wrong `.js`)
- `dist-browser/` added to `files` (was missing from npm tarball)
- `prepublishOnly` now runs both `build` and `build:browser`
- `vite.browser.config.ts` outDir uses `resolve(__dirname, ...)` (was
  producing double-nested path)
- `build:browser` script uses root vite binary path

## After publish

Remove the Vite alias workaround from:
- `primmel.github.io/astro.config.mjs`
- `primmel/editor/vite.config.ts`

The `exports.browser` condition will resolve correctly once 1.3.1
includes the browser bundle.
