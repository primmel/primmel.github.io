# 16 — RSS: use git commit date for pubDate

## Problem

All RSS items have the same `pubDate` (build time). RSS readers can't
sort items chronologically — they all appear as "published just now"
on every rebuild.

## Fix

Use the file's git last-commit date as `pubDate`:

```typescript
import { execSync } from 'node:child_process';

function getGitDate(filePath: string): Date {
  try {
    const ts = execSync(`git log -1 --format=%ct "${filePath}"`).toString().trim();
    return new Date(parseInt(ts) * 1000);
  } catch {
    return new Date('2026-01-01');
  }
}
```

Pass the markdown file path to compute per-item pubDate.

## Files

- `src/pages/rss.xml.ts`
