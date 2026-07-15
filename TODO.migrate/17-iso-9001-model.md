# 17 — Create ISO 9001 model from real source

> **Status: DONE** — Model created at
> `primmel/private-models/reference/iso/iso-9001.prl`. 5 roles, 36
> processes (29 nested via PDCA structure), 33 provisions, 4 canvases.
> Source: `~/src/iso-9001/iso-9001.adoc` (2133 lines).

## What

Create a proper Primmel `.prl` model of ISO 9001:2015 (Quality
management systems — Requirements) from the real AsciiDoc source at
`~/src/iso-9001/iso-9001.adoc` (2133 lines).

The website already has a showcase page (`/examples/iso-9001-qms`)
with selected snippets, but there is no full model in
`primmel/private-models/reference/iso/`.

## Source

- AsciiDoc: `~/src/iso-9001/iso-9001.adoc`
- Existing MMEL archive: `~/src/mn/bs-202000-models/referencemodel/archive models/ISO9001/model.mmel`

## Structure to model

ISO 9001 has 10 clauses following the Annex SL high-level structure:

1. Scope
2. Normative references
3. Terms and definitions
4. Context of the organization (4.1-4.4)
5. Leadership (5.1-5.3)
6. Planning (6.1-6.3)
7. Support (7.1-7.5)
8. Operation (8.1-8.7)
9. Performance evaluation (9.1-9.3)
10. Improvement (10.1-10.3)

Each clause has `shall` requirements that become Primmel provisions.

## Target file

```
primmel/private-models/reference/iso/iso-9001.prl
```

## Dependencies

- TODO 01 (canvas keyword) — done
- The model uses nested processes for PDCA decomposition (TODO 09) — done
