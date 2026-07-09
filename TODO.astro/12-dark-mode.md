# 12 — Dark mode

## Goal
Implement dark mode with no flash-of-wrong-theme (FOWT). Theme toggle persists to localStorage. Runs before first paint.

## Implementation

### Theme init script (in `<head>`, before CSS)

```html
<script is:inline>
  const theme = localStorage.getItem('theme') ?? 'auto';
  const isDark = theme === 'dark' || (theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
</script>
```

This is `is:inline` so Astro doesn't process or defer it — it runs synchronously before paint.

### `ThemeToggle.astro`

A small button that toggles `.dark` on `<html>` and saves to localStorage. This is the ONLY component that needs client-side JS:

```astro
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
  <span class="icon sun">☀</span>
  <span class="icon moon">☾</span>
</button>
<script>
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
</script>
```

### CSS

All dark-mode overrides live in `tokens.css` under `.dark { ... }`. No other CSS file has dark-mode rules. Single source of truth.

## Acceptance criteria
- No flash of wrong theme on page load
- Toggle persists across page navigations
- System preference respected when no manual choice
- Only one component (`ThemeToggle`) ships client-side JS