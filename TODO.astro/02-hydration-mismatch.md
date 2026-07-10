# 02 — Fix Vue hydration mismatches

## Problem

Every page logs: `Hydration completed but contains mismatches.`

## Root cause

NavBar.astro uses scoped styles. Astro automatically passes the
`data-astro-cid-*` scope attribute to child components, including Vue
islands (SearchButton, ThemeToggle). During SSR, the attribute renders
as `data-astro-cid-xxx="true"` on the Vue root element. During client
hydration, Vue re-renders and the attribute value or presence differs.

## Fix

Move Vue islands out of scoped-style containers in NavBar. Use a
wrapper `<div>` without scoped styles, or make the relevant styles
`:global()`. Alternatively, set `inheritAttrs: false` on the Vue
components and pass classes explicitly.

## Verification

After fix, dev console should show zero hydration warnings on all
pages.
