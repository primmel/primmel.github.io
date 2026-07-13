# 14 — Parser: implement nested processes (full TODO 09)

> **Status: DONE** — Implemented in PR #38. See TODO 09 for details.

## What

TODO 09 assessed the current state: the `parent` field exists and the
`canvas` keyword is accepted in process bodies, but true nesting
(`process` blocks inside a `process` block) is not implemented.

## Current state

In `primmel-ts/packages/primmel/src/ser-des/config/process.ts`:

```typescript
// These keywords are handled in a process body:
'modality', 'name', 'actor', 'parent', 'canvas'/'subprocess',
'validate_provision', 'validate_measurement', 'output',
'reference_data_registry'
```

There is no `process` keyword handler — nested processes are silently
ignored.

## Implementation plan

### 1. Process type change

```typescript
// packages/primmel/src/types/process.ts
export default interface Process {
  id: string;
  name: string;
  // ... existing fields ...
  parent: string;        // already exists
  children: string[];    // NEW: IDs of child processes
}
```

### 2. Parser change

In `parseProcess`, add handling for nested `process` keyword:

```typescript
} else if (keyword === 'process') {
  // Recursively parse the child process
  const childId = value();  // extract the ID
  result.children.push(childId);
  // The child process block is parsed as a top-level process
  // but with parent set to this process's ID
}
```

The challenge: `forEachEntry` processes one keyword at a time. A
nested `process ChildName { ... }` block is a full construct, not a
simple key-value. The parser needs to delegate to `parseProcess`
recursively.

### 3. Resolver change

`resolveProcess` needs to populate `children` from `_relations.children`.

### 4. Dumper change

`dumpProcess` needs to emit nested process blocks inside the parent:

```
process Manufacturing {
  name "Manufacture product"
  actor Factory

  process Assembly {
    name "Assemble components"
    actor AssemblyLine
  }
}
```

### 5. Canvas interaction

A parent process can be placed on a canvas. Its children are rendered
as a sub-diagram (either inline or on a separate canvas page).

Syntax options:
```
// Option A: children on the same canvas
canvas Manufacturing {
  elements {
    Assembly { x 0 y 0 }
    QualityControl { x 200 y 0 }
  }
}

// Option B: each nesting level gets its own canvas
canvas Manufacturing-Overview { ... }
canvas Assembly-Detail { ... }
```

Option A is simpler for MVP.

## Testing

- Unit test: parse a model with nested processes, verify `children`
  array is populated
- Round-trip: `dump(load(content))` preserves nesting
- Validation: warn if a child process references a non-existent parent

## Dependencies

- None (additive feature, doesn't break existing models)
