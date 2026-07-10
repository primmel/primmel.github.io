# 09 — Fix Astro 7 `z` deprecation + unused vars

## Problem

1. `content.config.ts` imports `z` from `astro:content` — deprecated in
   Astro 7. 24 deprecation warnings.
2. `ProcessFlowDiagram.astro:63` — unused `i` parameter.
3. `PillarsList.astro:4` — unused `Hero` import.

## Fix

Import `z` from `astro:schema` instead of `astro:content`:

```typescript
import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
```

Remove unused `i` parameter and `Hero` import.
