# Examples

The Primmel examples corpus is a set of small, self-contained models
that introduce the language one primitive group at a time. Every file
is **entirely fictional** &mdash; no real standards, organisations, or
proprietary content appears anywhere. The patterns the examples
exercise (cross-model aliasing, multi-page subprocesses, subject
bindings, dual mapping) are the same ones used in real-world Primmel
models for standards like ISO 14971, ISO 13485, BS 20400, and MDSAP.

## Reading order

Each example adds one new primitive group to the previous one.

### 1. [Minimal model](/docs/examples/minimal-model)

The smallest valid Primmel model: a `root`, `version`, `metadata`, two
roles, one process, start/end events, a single-page diagram. Nothing
else.

- Demonstrates: model header, `role`, `start_event`, `end_event`,
  `process`, `subprocess`, `process_flow`.
- File: [`01-minimal-model.prl`](/examples/files/01-minimal-model.prl)

### 2. [Data and registries](/docs/examples/data-and-registries)

A roastery logbook. Introduces typed data classes, registries, and the
distinction between a *data class* (`#data` suffix, can be registered)
and a *helper class* (no suffix, embedded inside other classes).

- Demonstrates: `enum`, `class#data`, helper class,
  `reference(Target#data)` fields, untyped fields, `data_registry`,
  process `output` writes, process `reference_data_registry` reads.
- File: [`02-data-and-registries.prl`](/examples/files/02-data-and-registries.prl)

### 3. [Process flow](/docs/examples/process-flow)

An order-fulfillment flow with two subprocess diagrams on the same
model. Shows how `start_event`s, `timer_event`s, and
`exclusive_gateway`s combine with the `"default"` fallback edge.

- Demonstrates: multi-page subprocesses, multiple `start_event`s,
  `timer_event` (`WAIT` and `REPEAT`), self-connection loop,
  `exclusive_gateway` with labelled branches and `"default"` fallback.
- File: [`03-process-flow.prl`](/examples/files/03-process-flow.prl)

### 4. [Compliance and measurement](/docs/examples/compliance-and-measurement)

A bean-freshness programme that ties quality provisions to derived
measurements, with a gateway whose outgoing edges carry
machine-readable conditions.

- Demonstrates: `provision` with `modality`, `subject#N` binding, `note`,
  `table`, `measurement` (`DATALIST`, `DERIVED`, `TEXT`,
  `TABLE_REFERENCE`, `NUMERIC`), `validate_provision`,
  `validate_measurement`, gateway edge with `condition`.
- File: [`04-compliance-and-measurement.prl`](/examples/files/04-compliance-and-measurement.prl)

### 5. [Approval workflow](/docs/examples/approval-workflow)

A new-roast-profile sign-off. Introduces the `approval` step, the
`approve_by` role, and the `approval_record` registry where each
signed approval is written.

- Demonstrates: `approval` with `approve_by`, `approval_record`,
  role-typed fields.
- File: [`05-approval-workflow.prl`](/examples/files/05-approval-workflow.prl)

### 6. [Implementation package](/docs/examples/implementation-package)

The showcase. A fictional Acme Corporation implements a fictional
Office Coffee Standard (OCS). Four files work together: a `.prd`
standard extract, Acme's `.prl` implementation model, a `.prm` JSON
mapping, and a `.pws` workspace with real records.

- Demonstrates: the full Primmel workflow &mdash; `.prl` + `.prd` +
  `.prm` + `.pws` working together, with `OCS#ElementID` cross-model
  aliasing.
- Files: [`06-implementation-package/`](/examples/files/06-implementation-package/ocs-standard.prd)

## How to read a `.prl` file

A `.prl` file is plain text. Open it in any editor. The structure is
always:

1. The header (`root`, `version`, `metadata { ... }`).
2. Declarations in any order: `role`, `process`, `provision`, `class`,
   `data_registry`, `measurement`, `reference`, `note`, `link`,
   `table`, `figure`, `approval`, `start_event`, `end_event`,
   `exclusive_gateway`, `subprocess`, `map_profile`.
3. Comments with `//` for inline notes and section dividers.

Real-world models commonly group declarations by type with comment
separators &mdash; the examples in this corpus follow the same
convention.

## Patterns to recognise

The patterns below appear across multiple examples. Recognising them
makes any real-world Primmel model readable.

### Cross-model aliasing (`Namespace#ElementID`)

An implementation model can declare elements that originate in a
standard model by prefixing their IDs with the standard's namespace and
`#`:

```text
process OCS#SourceBeans {
  name "Source beans"
}

process AcmeSourceBeans {
  name "Source beans (Acme implementation)"
  validate_provision {
    OCS#Provision4-2-1
  }
}
```

This is how implementation models link their processes to standard-defined
requirements. See the [implementation package](/docs/examples/implementation-package).

### Subject bindings (`subject#N`)

A provision can be bound to a specific data registry, which makes its
compliance evaluation data-aware:

```text
provision StandardMeetQuality {
  subject#1 RoastBatchRegistry
  condition "{ Roast batches (Data) } selected meet the quality requirements"
  modality SHALL
}
```

The `{ ... (Data) }` placeholder is replaced by the bound registry's
records at evaluation time. See
[compliance and measurement](/docs/examples/compliance-and-measurement)
and the implementation package.

### Gateway conditions

Gateway outgoing edges may carry both a human-readable `description` and
a machine-readable `condition` (a measurement expression):

```text
Edge3 {
  from MoistureGateway
  to Pass
  description "Moisture is within the required threshold"
  condition "[MaxMoisture] <= [RequiredMaxMoisture]"
}
Edge5 {
  from MoistureGateway
  to Fail
  description "default"
}
```

The edge marked `description "default"` is taken when no other condition
matches. See [compliance and measurement](/docs/examples/compliance-and-measurement).

### Timer loops

A `timer_event` with `type REPEAT` can be wired in a loop to model a
recurring process:

```text
Edge1 { from Start            to ReviewSuppliers }
Edge2 { from ReviewSuppliers  to SupplierReviewTimer }
Edge3 { from SupplierReviewTimer to ReviewSuppliers }
```

This reads as "review suppliers, wait the specified period, review
again." See [process flow](/docs/examples/process-flow) and the
implementation package.

### Helper classes (without `#data`)

Classes without the `#data` suffix define reusable complex types that
can be embedded as fields inside data classes, but cannot be linked to
registries directly:

```text
class RoastProfile {        // helper class, no registry
  name { definition "Profile name" }
  target_level: RoastLevel { definition "Target roast level" }
}

class RoastBatch#data {     // data class, can be linked to a registry
  profile: RoastProfile { definition "Roast profile applied" }
}
```

See [data and registries](/docs/examples/data-and-registries).

## Conventions used in these examples

- Every model declares `schema "Primmel 0.1"`. The schema string may
  evolve in future versions; tooling reads this field to pick a parser.
- Roles use `PascalCase` (`Roaster`, `QA`) or short lowercase IDs
  (`Org`).
- Processes use descriptive IDs (`SourceBeans`, `TestBatchMoisture`).
- Subprocesses are named `Root` (the top-level flow) plus page-style
  names (`BeanSourcingFlow`, `QualityCheckFlow`).
- Multiple `start_event`s are normal &mdash; one per subprocess diagram.
- Diagram coordinates are integers for readability.
- All clauses, references, provisions, standards, organisations, and
  suppliers are invented for teaching.