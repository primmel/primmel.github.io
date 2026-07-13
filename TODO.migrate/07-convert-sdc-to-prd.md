# 07 — Convert .sdc → .prd format

## What

The old `.sdc` (Supplementary Document Content) format uses a custom
pipe-delimited text format. Primmel's `.prd` (Primmel Document)
format should be a structured, machine-readable clause extract.

## Current .sdc format

```
namespace#DPTM-doc
title#DPTM certification requirements
version#v1.0.0-dev1
###
1#Governance and Transparency
1.1#Establish data protection policies and practices
1.1.1#Organisation shall have data protection policies...
```

Pipe-delimited: `clause-id#content` with `###` as header separator.
No structured metadata per clause. No nesting hierarchy.

## Proposed .prd format

Structured YAML or JSON — machine-readable, typed, queryable:

```yaml
namespace: DPTM-doc
title: DPTM certification requirements
version: v1.0.0-dev1
clauses:
  - id: "1"
    title: Governance and Transparency
    clauses:
      - id: "1.1"
        title: Establish data protection policies and practices
        clauses:
          - id: "1.1.1"
            text: |
              Organisation shall have data protection policies...
              approved by management...
```

Or as a `.prl`-adjacent format using the same block syntax:

```
document DPTM {
  title "DPTM certification requirements"
  version "v1.0.0-dev1"

  clause 1 {
    title "Governance and Transparency"

    clause 1.1 {
      title "Establish data protection policies and practices"

      clause 1.1.1 {
        text "Organisation shall have data protection policies..."
      }
    }
  }
}
```

## Migration

1. Write a converter script: `.sdc` → `.prd`
2. Each `.sdc` file in mmel-models/ gets a corresponding `.prd`
3. Update `reference` blocks in `.prl` files to point to `.prd` clauses
4. The parser already supports `reference` with document/clause/title

## Dependencies

- None (format conversion is standalone)
