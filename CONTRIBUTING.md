# Contributing to Primmel

## Adding a new doc page

1. Create a markdown file in the appropriate collection:
   ```
   src/content/docs/my-new-page.md    # language reference
   src/content/architecture/my-page.md # architecture pillar/audience
   src/content/examples/my-example.md  # example walkthrough
   ```

2. Add frontmatter (validated by Zod schema):
   ```yaml
   ---
   title: "My New Page"
   sidebar:
     section: "Language Reference"
     order: 6
     label: "My New Page"
   ---
   ```

3. The page automatically appears in the sidebar, gets a route, and
   gets prev/next pager links. No config changes needed.

## How navigation works

The sidebar is **derived from content collection frontmatter** via
`src/lib/navigation.ts`. The `sidebar.section` field groups entries;
`sidebar.order` sorts them; `sidebar.label` is the display text.

No hardcoded navigation arrays exist anywhere.

## How theming works

All design tokens live in `src/styles/app.css` under `@theme`:
```css
@theme {
  --color-indigo: #1e3a8a;
  --color-burgundy: #7d2a2a;
  /* ... */
}
```

These are usable as Tailwind utilities (`bg-indigo`, `text-burgundy`)
AND as CSS variables (`var(--color-indigo)`).

Dark mode uses a `.dark` class on `<html>`, toggled by
`ThemeToggle.vue`. Token overrides are in `.dark { ... }` in app.css.

## Adding a new interactive component

1. Create a `.vue` file in `src/components/ui/`
2. Import it in the `.astro` file where it's used
3. Add a hydration directive: `client:load`, `client:idle`, or
   `client:visible`

## Adding example files

Static files (`.prl`, `.prd`, `.prm`, `.pws`) go in
`public/examples/files/`. They're served as-is at
`/examples/files/...`.

To show parsed model metadata on an example page, add a `sourceFile`
to the frontmatter:
```yaml
sourceFile: "/examples/files/01-minimal-model.prl"
```

The `ModelSummary.astro` component will parse it at build time using
`@primmel/primmel`.

## Build

```bash
npm run build   # astro build + pagefind index
npm run dev     # dev server at localhost:4321
npm run check   # TypeScript validation
```