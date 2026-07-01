# Compliance and measurement

::: tip Source file
[`04-compliance-and-measurement.prl`](/docs/examples/files/04-compliance-and-measurement.prl)
:::

This example is where Primmel stops being just a flowchart tool and
becomes a compliance engine. A fictional bean-freshness programme
binds quality provisions to derived measurements, with a gateway whose
outgoing edges carry **machine-readable conditions**.

This is the pattern that lets an auditor answer the question *"which of
these batches comply, and which don't?"* by following the model
structurally.

## Primitives introduced

| Primitive | Purpose |
| --- | --- |
| `provision` with `modality` | A requirement with RFC 2119 weight (`SHALL` / `SHOULD` / `MAY`). |
| `subject#N` binding | Bind a provision to a registry so its evaluation is data-aware. |
| `reference` | Cite an external document clause that the provision traces back to. |
| `note` | A NOTE annotation tied to a clause. |
| `table` | A lookup table used by `TABLE_REFERENCE` measurements. |
| `measurement` (`DATALIST`) | A list of raw readings. |
| `measurement` (`DERIVED`) | A value computed from other measurements (`max`, `min`, `average`, `count`). |
| `measurement` (`TEXT`) | A free-form text value. |
| `measurement` (`NUMERIC`) | A single numeric value. |
| `measurement` (`TABLE_REFERENCE`) | A value looked up in a `table` by row/column. |
| `validate_provision` | A process clause: the provisions this process must satisfy. |
| `validate_measurement` | A process clause: the measurement expressions that must hold. |
| Gateway edge `condition` | A machine-readable measurement expression on a gateway outgoing edge. |

## References

```text
reference BFS-4-2 {
  document "Bean Freshness Standard (fictional)"
  clause "4.2"
  title "Moisture content"
}

reference BFS-4-2-note {
  document "Bean Freshness Standard (fictional)"
  clause "4.2 NOTE"
  title "Moisture measurement tolerance"
}
```

A `reference` is a pointer to an external document clause. The
`document` names the source; `clause` cites the section; `title` is a
short label. A reference is what a `provision` cites to justify its
existence.

In a real workspace, references typically point at clauses in a `.prd`
file (source document content). See the [implementation package](/docs/examples/implementation-package)
for that pattern.

## Provisions

```text
provision MoistureRecorded {
  condition "Every roast batch shall have its moisture content recorded"
  modality SHALL
  reference {
    BFS-4-2
  }
}

provision MoistureWithinRange {
  condition "Moisture content shall be between 8 percent and 12 percent by mass"
  modality SHALL
  reference {
    BFS-4-2
  }
}
```

A provision has:

- A `condition` &mdash; the human-readable requirement.
- A `modality` &mdash; `SHALL`, `SHOULD`, `MAY`, `CAN`, or `MUST` (RFC
  2119).
- A `reference { ... }` block &mdash; the clauses this provision
  derives from.

### Subject bindings

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
evaluation to records in `RoastBatchRegistry`. The `{ Roast batches (Data) }`
placeholder in the condition text is replaced at evaluation time by the
actual records of the bound registry. This is what makes the provision
**data-aware**.

A provision can have multiple subject bindings (`subject#1`,
`subject#2`, etc.), each bound to a different registry.

## Notes

```text
note MoistureNote {
  type NOTE
  message "The moisture tolerance reflects typical commercial storage conditions; tighter tolerances may apply for export-grade stock."
  reference {
    BFS-4-2-note
  }
}
```

A `note` is an annotation. The `type` is typically `NOTE` or
`EXAMPLE`, mirroring the annotation vocabulary of formal standards
documents. Notes are referenced by processes via `note { ... }`.

## Tables

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

A `table` is a lookup table. The first row of `data` is the header; the
remaining rows are values. Tables are referenced by
`TABLE_REFERENCE` measurements (see below) to look up specific cells.

## Measurements

```text
measurement MoistureReading {
  type DATALIST
  description "Per-batch moisture readings in percent by mass"
}

measurement MaxMoisture {
  type DERIVED
  definition "[MoistureReading].max"
  description "Highest moisture reading across all batches"
}

measurement MinMoisture {
  type DERIVED
  definition "[MoistureReading].min"
  description "Lowest moisture reading across all batches"
}

measurement AvgMoisture {
  type DERIVED
  definition "[MoistureReading].average"
  description "Average moisture reading across all batches"
}

measurement TotalTestedBatchCount {
  type DERIVED
  definition "[MoistureReading].count"
  description "Number of batches with a moisture reading on file"
}

measurement RequiredGrade {
  type TEXT
  description "Contractual freshness grade (A, B, or C)"
}

measurement RequiredMaxMoisture {
  type TABLE_REFERENCE
  definition "FreshnessGradeTable,1,0,2"
  description "Maximum moisture percent for the required grade"
}
```

| `type` | Meaning |
| --- | --- |
| `DATALIST` | A list of raw readings (e.g. one per batch). |
| `DERIVED` | A value computed from another measurement via `[Other].max`, `.min`, `.average`, `.count`. |
| `TEXT` | A free-form text value. |
| `NUMERIC` | A single numeric value. |
| `TABLE_REFERENCE` | A value looked up in a `table` by `TableName,row_query,column_index`. |

A `DERIVED` measurement references other measurements using the
`[MeasurementName]` syntax inside its `definition`. The same syntax is
used in `validate_measurement` expressions and gateway edge
`condition`s.

## Processes that validate

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

A compliance-carrying process has three new clauses:

| Clause | Meaning |
| --- | --- |
| `modality SHALL` | This process is mandatory. |
| `validate_provision { ... }` | The provisions this process must satisfy. |
| `validate_measurement { ... }` | The measurement expressions that must hold for the process to pass. |
| `note { ... }` | Notes attached to this process. |

The `validate_measurement` block is where the model becomes executable.
Each expression is a predicate over measurements; the process passes
its compliance check if and only if all of them hold.

## Gateway conditions

```text
process_flow {
  Edge1 { from Start1         to TestMoisture }
  Edge2 { from TestMoisture   to MoistureGateway }
  Edge3 {
    from MoistureGateway
    to Pass
    description "Moisture is within the required threshold"
    condition "[MaxMoisture] <= [RequiredMaxMoisture]"
  }
  Edge4 {
    from MoistureGateway
    to SellAgedStock
    description "Batch is aged but still marketable"
    condition "[MaxMoisture] <= 12"
  }
  Edge5 {
    from MoistureGateway
    to Fail
    description "default"
  }
}
```

Each gateway edge can carry both:

- A `description` &mdash; what a human reads on the diagram.
- A `condition` &mdash; a measurement expression that the runtime
  evaluates to decide whether this edge is taken.

The edge marked `description "default"` is the fallback when none of the
other edges' conditions hold.

This is how a Primmel model encodes *decision logic* in a way that an
auditor or test harness can replay against real data.

## What this example leaves out

- **Cross-model aliasing** &mdash; provisions live entirely inside this
  file. Cross-model aliasing is added in the
  [implementation package](/docs/examples/implementation-package).
- **Workspace data** &mdash; the model declares measurements but does
  not carry any actual readings. Workspace data is added in the
  [implementation package](/docs/examples/implementation-package).
- **Approval steps** &mdash; see
  [approval workflow](/docs/examples/approval-workflow).