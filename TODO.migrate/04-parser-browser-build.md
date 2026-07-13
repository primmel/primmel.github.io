# 04 — Parser: browser-compatible ESM build

## What

The `@primmel/primmel` parser currently uses Node.js APIs (`fs`,
`path`, `child_process`). For the editor (TODO 03) and the website's
interactive features, the parser must run in the browser.

## What needs to change

### Remove Node.js dependencies from the parser

The parser's core (`tokenize → parse → resolve`) is pure JavaScript
— no Node APIs. But:

- `loadFile()` uses `fs.readFileSync` — browser can't read files
  synchronously. Solution: keep `loadFile` for Node, use `load()`
  (takes string content) in browser.
- The website's `model-parser.ts` uses `readFileSync` and
  `createRequire` — these run at BUILD TIME (Astro SSG), not in the
  browser. This is fine.
- The editor will call `load(content)` directly — no file I/O needed.

### Create a browser-compatible bundle

```
packages/primmel/
├── package.json
│   ├── "main": "dist/index.js"          (Node CJS)
│   ├── "module": "dist/index.mjs"       (ESM)
│   └── "browser": "dist/index.browser.mjs"  (browser ESM, no Node polyfills)
├── vite.config.ts                       (new — builds browser bundle)
└── src/                                 (unchanged — parser is already pure)
```

A Vite build produces an optimized browser bundle:
- No `fs`, `path`, `child_process` imports
- Tree-shakes to only include `load`, `dump`, `validate`
- Minified, gzipped

### Verify browser compatibility

```typescript
// In the editor:
import { load, dump } from '@primmel/primmel'
const model = load(fileContent)  // pure JS, works in browser
```

The parser's ser-des pipeline (tokenize, parse, resolve, dump) uses
only string manipulation and object construction — no Node APIs.

## Verification

- `npm run build:browser` produces a working ESM bundle
- Bundle size < 50KB gzipped (parser is ~5K lines of TS)
- `load()` works in Chrome, Firefox, Safari
- No `process`, `require`, `Buffer` in bundle output
