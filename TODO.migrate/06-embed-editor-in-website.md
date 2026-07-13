# 06 — Embed editor in website as "Try it" experience

## What

Add a "Try it" button to primmel.org that opens the Primmel editor
(TODO 03) either as an embedded iframe or as a route within the
Astro site. Visitors can immediately interact with a model without
installing anything.

## Integration options

### Option A: Embedded route (recommended)

Add `/playground/` route to primmel.org that loads the editor as a
Vue island (lazy-loaded, client:only). The editor code lives in the
website repo as a component, using `@primmel/primmel` for parsing.

```
src/pages/playground.astro
  → loads PlaygroundApp.vue (client:only="vue")
  → PlaygroundApp imports ModelEditor.vue, ProcessCanvas.vue, etc.
```

Pros: single deployment, seamless navigation, shares design tokens
Cons: increases JS bundle size for the website

### Option B: Separate subdomain

Deploy editor as a standalone app at `play.primmel.org` or
`editor.primmel.org`. Link from primmel.org opens in new tab.

Pros: isolated, doesn't affect website performance
Cons: separate deployment, separate styling

### Option C: iframe embed

Editor deployed separately, embedded via iframe in a primmel.org page.

Pros: simplest integration
Cons: iframe limitations (CSP, postMessage for communication)

## Recommended: Option A with code splitting

- The playground page uses `client:only="vue"` — zero JS on other pages
- Monaco Editor loaded dynamically only when user visits /playground
- Model parser bundled with the playground chunk
- Shared design tokens from app.css

## User flow

1. User clicks "Try it" on home page hero
2. Navigate to `/playground/`
3. Editor loads with a sample model pre-loaded (hello-world.prl)
4. User sees: code on left, visual canvas on right, tree at bottom
5. User can edit code → canvas updates in real time
6. User can drag elements → code updates
7. User can switch to "Browse models" to load ISO 27001, etc.
8. User can download their model as .prl

## Dependencies

- TODO 03 (editor built)
- TODO 04 (parser works in browser)
- Monaco Editor or CodeMirror as npm dependency
