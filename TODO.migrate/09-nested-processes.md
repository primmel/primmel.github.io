# 09 — Support nested processes (processes within processes)

> **Status: DONE** — Implemented in PR #38 (primmel-ts). Parser
> supports lexical nesting (`process` blocks inside a `process` body).
> Children get `parent` set automatically. Dumper emits children
> inline with proper indentation. 3 tests: parse, round-trip, field
> preservation. All 125 tests pass.

## What

Currently, Primmel flattens all processes at the top level. A
`canvas` references processes by ID and lays them out visually. But
there's no semantic hierarchy — a process can't contain child
processes.

The user pointed out that processes naturally nest: "Manufacture
product" contains "Assemble components" and "Inspect quality". The
language should support this.

## Proposed syntax

```
process Manufacturing {
  name "Manufacture product"
  actor Factory

  process Assembly {
    name "Assemble components"
    actor AssemblyLine
  }

  process QualityControl {
    name "Inspect quality"
    actor QA
  }
}
```

A parent process contains child processes. The children inherit the
parent's context (actor can be overridden, provisions cascade).

## Parser changes

- `parseProcess` in `config/process.ts`: allow nested `process` blocks
  inside a process body
- The `Process` type: add optional `children: Process[]` field
- The resolver: resolve child process references recursively
- The dumper: emit nested process blocks

## Canvas interaction

A `canvas` can reference a parent process — its children are rendered
as a sub-diagram. Or each process level can have its own canvas:

```
process Manufacturing {
  ...
  process Assembly { ... }
  process QualityControl { ... }
}

canvas Manufacturing {
  Assembly { x 0 y 0 }
  QualityControl { x 200 y 0 }
  ...
}
```

## Breaking change assessment

- **Not breaking** — existing flat models still work (no nesting = no children)
- **Additive** — nesting is opt-in
- **Parser**: needs recursive parse in process body

## Dependencies

- TODO 01 (canvas keyword) — canvas replaces subprocess as the layout concept, making the process/canvas distinction clearer
