---
title: "Compliance"
sidebar:
  section: "Language Reference"
  order: 3
  label: "Compliance"
---

# Compliance

Compliance in Primmel is built on **provisions** &mdash; statements of
requirement using the RFC 2119 modality vocabulary &mdash; bound to
data and traceable to source standard clauses via **references**.

## Primitives

### `reference` &mdash; cite a source clause

```text
reference BFS-4-2 {
  document "Bean Freshness Standard (fictional)"
  clause "4.2"
  title "Moisture content"
}
```

A pointer to a clause in an external document (typically a `.prd`
extract of a source standard). Provisions cite references to justify
their existence.

### `provision` &mdash; a requirement

```text
provision MoistureRecorded {
  condition "Every roast batch shall have its moisture content recorded"
  modality SHALL
  reference {
    BFS-4-2
  }
}
```

A provision has:

- A `condition` &mdash; the human-readable requirement.
- A `modality` &mdash; `SHALL`, `SHOULD`, `MAY`, `CAN`, or `MUST` (RFC
  2119 vocabulary).
- A `reference { ... }` block &mdash; the clauses this provision
  derives from.

### `subject#N` &mdash; data-aware provisions

```text
provision StandardMeetFreshness {
  subject#1 RoastBatchRegistry
  condition "{ Roast batches (Data) } selected meet the freshness requirements"
  modality SHALL
  reference {
    BFS-4-2
  }
}
```

The `subject#1 RoastBatchRegistry` line binds this provision's
evaluation to records in `RoastBatchRegistry`. The `{ ... (Data) }`
placeholder in the condition is replaced by the bound registry's
records at evaluation time.

A provision can have multiple subject bindings (`subject#1`,
`subject#2`, ...), each bound to a different registry.

### `note` &mdash; an annotation

```text
note MoistureNote {
  type NOTE
  message "The moisture tolerance reflects typical commercial storage conditions."
  reference {
    BFS-4-2-note
  }
}
```

`type` is typically `NOTE` or `EXAMPLE`, mirroring the annotation
vocabulary of formal standards documents. Notes are attached to
processes via `note { ... }`.

### `table` &mdash; a lookup table

```text
table FreshnessGradeTable {
  title "Freshness grade lookup"
  columns "3"
  display "[grade]: [threshold_pct]"
  domain { }
  data {
    "grade" "threshold_pct" "description"
    "A" "10" "Premium freshness"
    "B" "11" "Standard freshness"
    "C" "12" "Acceptable freshness"
  }
}
```

A lookup table. The first row of `data` is the header; remaining rows
are values. Referenced by `TABLE_REFERENCE` measurements to look up
specific cells.

## RFC 2119 modality

| Modality | Meaning |
| --- | --- |
| `SHALL` / `SHALL NOT` | Absolute requirement. |
| `SHOULD` / `SHOULD NOT` | Strong recommendation; deviations need justification. |
| `MAY` / `MAY NOT` | Optional behaviour. |
| `CAN` / `CANNOT` | Statements of possibility or capability. |
| `MUST` / `MUST NOT` | Absolute requirement (synonymous with `SHALL`). |

Modality appears in two places: on a `provision` (the weight of the
requirement) and on a `process` (whether the step itself is mandatory,
recommended, or optional).

## Binding compliance to processes

```text
process TestMoisture {
  name "Test moisture content of a roast batch"
  actor QA
  modality SHALL
  validate_provision {
    MoistureRecorded
    MoistureWithinRange
    StandardMeetFreshness
  }
  validate_measurement {
    "[MaxMoisture] <= 12"
    "[MinMoisture] >= 8"
    "[MaxMoisture] <= [RequiredMaxMoisture]"
  }
  reference_data_registry {
    RoastBatchRegistry
  }
  note {
    MoistureNote
  }
}
```

| Clause | Meaning |
| --- | --- |
| `modality SHALL` | This process is mandatory. |
| `validate_provision { ... }` | The provisions this process must satisfy. |
| `validate_measurement { ... }` | The measurement expressions that must hold. See [measurement](/docs/measurement). |
| `reference_data_registry { ... }` | Registries whose records the provisions evaluate against. |
| `note { ... }` | Notes attached to this process. |

## Where to see it in action

- [Example 04: Compliance and measurement](/examples/compliance-and-measurement) &mdash;
  the dedicated walkthrough, including gateway conditions.
- [Implementation package](/examples/implementation-package) &mdash;
  provisions cross-referenced across standard (`OCS#`) and implementation
  namespaces, plus a `.prd` source extract.