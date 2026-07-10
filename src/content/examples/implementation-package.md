---
title: "Implementation package"
order: 6
demonstrates:
  - OCS#ElementID aliasing
  - .prm mapping
  - .pws workspace
sidebar:
  section: "Examples"
  order: 6
  label: "6. Implementation Package"
---

# Implementation package

::: tip Where this fits
The implementation package is a concrete demonstration of the
[**Adopt**](/architecture/implement) pillar in the Primmel
architecture. It is the activity of taking up a reference model (the
OCS standard, defined by [Define](/architecture/define)) by
modifying an existing implementation model (already maintained under
[Implement](/architecture/implement)), and building the mapping
that closes with a Statement of Applicability. The accompanying
`sample-workspace.pws/` shows what the
[**Operate**](/architecture/operate) pillar produces; together
with the mapping it is what an
[**Audit**](/architecture/audit) consumes.
:::

This is the showcase example. A fictional **Acme Corporation**
implements a fictional **Office Coffee Standard (OCS)** using every
file type Primmel defines, working together. If you read only one
example in detail, read this one.

It mirrors the patterns used in real implementation models for ISO
13485, ISO 14971, ISO 27001, MDSAP, and other major standards &mdash;
with invented content suitable for public distribution.

## Files in the package

| File | Purpose |
| --- | --- |
| [`ocs-standard.prd`](/examples/files/06-implementation-package/ocs-standard.prd) | The source standard. Clause-level content extracted into Primmel Document format, including `NOTE` and `EXAMPLE` annotations. |
| [`acme-coffee-programme.prl`](/examples/files/06-implementation-package/acme-coffee-programme.prl) | Acme's implementation model. Local processes interleave with `OCS#`-prefixed aliases imported from the standard. |
| [`acme-to-ocs.prm`](/examples/files/06-implementation-package/acme-to-ocs.prm) | JSON mapping from Acme processes to OCS processes. Mirrors the `map_profile OCS { ... }` block in the model. |
| [`sample-workspace.pws/`](/examples/files/06-implementation-package/sample-workspace.pws/manifest.yaml) | A workspace directory: bean lots, roast batches, and an approved supplier as actual YAML records, one file per record. |

## How the four files fit together

<div class="diagram">
<svg viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pkg-title">
  <title id="pkg-title">How the four implementation-package files fit together</title>
  <defs>
    <marker id="pkg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--c-rule-strong)"/>
    </marker>
  </defs>

  <!-- prd (top-left) -->
  <g transform="translate(40 40)">
    <rect width="260" height="100" rx="6" style="fill: var(--c-surface); stroke: var(--c-indigo)" stroke-width="1.5"/>
    <text x="20" y="28" style="font-family: var(--font-mono)" font-size="11" font-weight="500" style="fill: var(--c-burgundy)" letter-spacing="1.5">.PRD</text>
    <text x="20" y="52" style="font-family: var(--font-display)" font-size="18" font-weight="500" style="fill: var(--c-ink)">ocs-standard.prd</text>
    <text x="20" y="75" style="font-family: var(--font-body)" font-size="12" style="fill: var(--c-text-2)">The source standard.</text>
    <text x="20" y="90" style="font-family: var(--font-body)" font-size="12" style="fill: var(--c-text-2)">Clause-level extracts.</text>
  </g>

  <!-- prl (top-right) -->
  <g transform="translate(600 40)">
    <rect width="260" height="100" rx="6" style="fill: var(--c-surface); stroke: var(--c-indigo)" stroke-width="1.5"/>
    <text x="20" y="28" style="font-family: var(--font-mono)" font-size="11" font-weight="500" style="fill: var(--c-burgundy)" letter-spacing="1.5">.PRL</text>
    <text x="20" y="52" style="font-family: var(--font-display)" font-size="18" font-weight="500" style="fill: var(--c-ink)">acme-coffee-programme.prl</text>
    <text x="20" y="75" style="font-family: var(--font-body)" font-size="12" style="fill: var(--c-text-2)">Acme's implementation.</text>
    <text x="20" y="90" style="font-family: var(--font-body)" font-size="12" style="fill: var(--c-text-2)">Local + OCS# aliased elements.</text>
  </g>

  <!-- arrow prd → middle (referenced via) -->
  <path d="M 300 90 Q 380 90 420 175" fill="none" style="stroke: var(--c-rule-strong)" stroke-width="1.5" marker-end="url(#pkg-arrow)"/>
  <text x="330" y="105" style="font-family: var(--font-body)" font-size="11" font-style="font-style: italic; fill: var(--c-text-3)">referenced</text>

  <!-- arrow prl → prm (maps via) -->
  <path d="M 600 90 Q 540 130 460 175" fill="none" style="stroke: var(--c-rule-strong)" stroke-width="1.5" marker-end="url(#pkg-arrow)"/>
  <text x="510" y="115" style="font-family: var(--font-body)" font-size="11" font-style="font-style: italic; fill: var(--c-text-3)">maps via</text>

  <!-- prm (middle) -->
  <g transform="translate(320 180)">
    <rect width="260" height="100" rx="6" style="fill: var(--c-surface); stroke: var(--c-burgundy)" stroke-width="1.5"/>
    <text x="20" y="28" style="font-family: var(--font-mono)" font-size="11" font-weight="500" style="fill: var(--c-burgundy)" letter-spacing="1.5">.PRM</text>
    <text x="20" y="52" style="font-family: var(--font-display)" font-size="18" font-weight="500" style="fill: var(--c-ink)">acme-to-ocs.prm</text>
    <text x="20" y="75" style="font-family: var(--font-body)" font-size="12" style="fill: var(--c-text-2)">The mapping JSON.</text>
    <text x="20" y="90" style="font-family: var(--font-body)" font-size="12" style="fill: var(--c-text-2)">Each impl → reference element.</text>
  </g>

  <!-- arrow prm → pws (validated against) -->
  <line x1="450" y1="285" x2="450" y2="320" style="stroke: var(--c-rule-strong)" stroke-width="1.5" marker-end="url(#pkg-arrow)"/>
  <text x="460" y="305" style="font-family: var(--font-body)" font-size="11" font-style="font-style: italic; fill: var(--c-text-3)">validated against</text>

  <!-- pws (bottom) -->
  <g transform="translate(320 325)">
    <rect width="260" height="80" rx="6" style="fill: var(--c-surface); stroke: var(--c-olive)" stroke-width="1.5"/>
    <text x="20" y="28" style="font-family: var(--font-mono)" font-size="11" font-weight="500" style="fill: var(--c-burgundy)" letter-spacing="1.5">.PWS/  (directory)</text>
    <text x="20" y="52" style="font-family: var(--font-display)" font-size="18" font-weight="500" style="fill: var(--c-ink)">sample-workspace.pws/</text>
    <text x="20" y="70" style="font-family: var(--font-body)" font-size="12" style="fill: var(--c-text-2)">Actual records. YAML, one file per record.</text>
  </g>
</svg>
</div>

The four file types each play a distinct role:

- `.prd` &mdash; the *source of truth* for what the standard says.
- `.prl` &mdash; the *implementation* model.
- `.prm` &mdash; the *alignment* between implementation and standard.
- `.pws` &mdash; the *evidence* &mdash; actual records produced when
  the implementation runs.

## Pattern: cross-model aliasing (`Namespace#ElementID`)

The most important pattern in this package. Acme's implementation
model declares elements that **originate in the OCS standard model**
by prefixing their IDs with the standard's namespace and `#`:

```text
process OCS#SourceBeans {
  name "Source beans"
}

process OCS#LogRoast {
  name "Log every roast batch"
  validate_provision {
    OCS#Provision4-3-1
  }
}

provision OCS#Provision4-2-1 {
  condition "The organization shall source beans only from approved suppliers"
  reference {
    OCS#Ref4-2
  }
}

reference OCS#Ref4-2 {
  document "Office Coffee Standard (OCS) (fictional)"
  clause "4.2"
  title "Bean sourcing"
}

start_event OCS#Start1 { }
```

These aliased elements are *local declarations* in Acme's model. The
`OCS#` prefix is the namespace marker. They are referenced by Acme's
own processes via `validate_provision`:

```text
process SourceBeans {
  name "Source beans from approved supplier"
  actor Roaster
  modality SHALL
  validate_provision {
    SourceBeansFromApprovedSuppliers
    OCS#Provision4-2-1                  // ← imported standard provision
  }
  reference_data_registry {
    SupplierRegistry
  }
  output {
    BeanLotRegistry
  }
  subprocess BeanSourcingFlow
}
```

This says: *Acme's `SourceBeans` process satisfies both Acme's local
`SourceBeansFromApprovedSuppliers` provision and the imported
`OCS#Provision4-2-1` provision*. The standard's text is in the `.prd`
file; the binding to that text is via the `reference` declaration.

## Pattern: multi-page subprocesses

The model has four subprocesses:

| Subprocess | Diagram contents |
| --- | --- |
| `Root` | The top-level Acme flow: `SourceBeans → AcmeRoastAndLog → TestBatchMoisture`. |
| `BeanSourcingFlow` | A close-up of bean sourcing. |
| `QualityCheckFlow` | A close-up of moisture testing with its gateway. |
| `SupplierReviewFlow` | The recurring supplier-review loop, drawn with `OCS#Start1` as its entry point. |

Each subprocess is a separate diagram with its own `start_event`. The
pattern mirrors how real-world implementation models decompose a large
flow into multiple pages for readability.

## Pattern: timer loops

`SupplierReviewFlow` is the recurring-process pattern:

```text
subprocess SupplierReviewFlow {
  elements {
    OCS#Start1          { x 0 y 0 }
    ReviewSuppliers     { x 0 y 100 }
    SupplierReviewTimer { x 0 y 200 }
  }
  process_flow {
    Edge1 { from OCS#Start1          to ReviewSuppliers }
    Edge2 { from ReviewSuppliers     to SupplierReviewTimer }
    Edge3 { from SupplierReviewTimer to ReviewSuppliers }
  }
  data {
    SupplierRegistry { x 250 y 130 }
  }
}
```

`SupplierReviewTimer` is a `REPEAT` timer. Every time it fires, the
flow loops back to `ReviewSuppliers`. This models *"review suppliers,
wait 12 months, review again"* &mdash; indefinitely.

## Pattern: dual mapping (`.prl` and `.prm`)

The same Acme → OCS mapping is expressed **twice**:

### Inside the `.prl` file: `map_profile`

```text
map_profile OCS {
  mapping {
    from SourceBeans
    to OCS#SourceBeans
  }
  mapping {
    from AcmeRoastAndLog
    to OCS#LogRoast
  }
  mapping {
    from TestBatchMoisture
    to OCS#VerifyQuality
  }
}
```

### As a standalone `.prm` JSON file

```json
{
  "@context": "https://primmel.org",
  "@type": "Primmel_MAP",
  "id": "AcmeCoffeeProgramme",
  "mapSet": {
    "OCS": {
      "id": "OCS",
      "mappings": {
        "SourceBeans": {
          "OCS#SourceBeans": {
            "description": "",
            "justification": ""
          }
        },
        "AcmeRoastAndLog": {
          "OCS#LogRoast": {
            "description": "Acme combines roasting and logging into a single step, satisfying OCS's separate log requirement as a side effect.",
            "justification": "Acme's roasting system writes the batch record automatically when the roaster confirms batch completion."
          }
        },
        "TestBatchMoisture": {
          "OCS#VerifyQuality": {
            "description": "Acme's moisture test is the chosen implementation of OCS's broader quality verification requirement.",
            "justification": "Acme has selected moisture as its quality gate. OCS clause 4.4 permits the organization to define its own threshold."
          }
        }
      }
    }
  }
}
```

The two forms are equivalent. The `.prl` form keeps the mapping with
the model; the `.prm` form allows the mapping to be maintained and
versioned independently, and to carry richer metadata (`description`
and `justification` per pair).

Notice that `SourceBeans` → `OCS#SourceBeans` has empty
description/justification in the `.prm` file &mdash; this is normal
during mapping authoring, where some entries are still being drafted.

## Pattern: subject bindings

```text
provision StandardMeetQuality {
  subject#1 RoastBatchRegistry
  condition "{ Roast batches (Data) } selected meet the quality requirements"
  modality SHALL
  reference {
    OCS-doc-4-4
  }
}
```

The `subject#1 RoastBatchRegistry` line binds this provision's
evaluation to records in `RoastBatchRegistry`. At evaluation time, the
`{ Roast batches (Data) }` placeholder is replaced by the actual
records from the registry.

Combined with the workspace directory (`.pws/`), this lets an auditor answer
*which roast batches comply, and which don't?* structurally.

## Pattern: reference layering

The model declares **both** local references and standard-namespace
references:

```text
reference OCS-doc-4-2 {
  document "Office Coffee Standard (OCS) (fictional)"
  clause "4.2"
  title "Bean sourcing"
}

reference OCS#Ref4-2 {
  document "Office Coffee Standard (OCS) (fictional)"
  clause "4.2"
  title "Bean sourcing"
}
```

Both point at the same clause in the source standard. The local
(`OCS-doc-4-2`) is used by Acme's own provisions; the
standard-namespace (`OCS#Ref4-2`) is used by the imported
`OCS#Provision*` provisions. Maintaining both lets Acme cite the
standard either by its local alias or by its imported alias, depending
on context.

## The workspace: actual evidence

`sample-workspace.pws` is where the model meets reality. A workspace is
a **directory** rather than a single file: each registry gets its own
subdirectory, and each record is its own YAML file. A `manifest.yaml`
at the root identifies the namespace and lists the registries.

```text
sample-workspace.pws/
├── manifest.yaml
├── BeanLotRegistry/
│   ├── lot-2026-001.yaml
│   └── lot-2026-002.yaml
├── RoastBatchRegistry/
│   ├── b-2026-001.yaml
│   └── b-2026-002.yaml
└── SupplierRegistry/
    └── sup-001.yaml
```

The `manifest.yaml` ties the workspace to the model:

```yaml
namespace: AcmeCoffeeProgramme
version: v1.0.0-dev1
registries:
  BeanLotRegistry:
    data_class: BeanLot#data
  RoastBatchRegistry:
    data_class: RoastBatch#data
  SupplierRegistry:
    data_class: SupplierApproval#data
```

Each record is one YAML file. For example,
`RoastBatchRegistry/b-2026-001.yaml`:

```yaml
id: b-2026-001
name: Batch 2026-001
attributes:
  batch_id: b-2026-001
  lot: lot-2026-001           # → BeanLotRegistry/lot-2026-001.yaml
  roast_level: Medium
  roast_date: 2026-04-12
  moisture_pct: "10.4"
```

The fields in each record match the data class declared in the model
(`class BeanLot#data { ... }`, `class RoastBatch#data { ... }`). The
references between records (`lot: lot-2026-001` in a batch file,
pointing back at a bean lot) match the `reference(BeanLot#data)` type
declared on the `RoastBatch#data` class.

This is what an auditor sees: the model declares the shape, the
workspace directory provides the records, the provisions and
`validate_measurement` expressions evaluate against those records, and
the result is a structural compliance verdict.

## Reading path through the package

If you are reading the package files for the first time:

1. Start with [`ocs-standard.prd`](/examples/files/06-implementation-package/ocs-standard.prd).
   Note the clause numbers (`4.1`, `4.2`, `4.3`, `4.4`) &mdash; these
   are what everything else traces back to.
2. Open [`acme-coffee-programme.prl`](/examples/files/06-implementation-package/acme-coffee-programme.prl).
   Find each `reference OCS-doc-4-N` declaration and match it to a `.prd`
   clause.
3. Find each `provision OCS#Provision*` declaration. These are Acme's
   local copies of standard provisions, used to make Acme's processes
   validate against the standard.
4. Find each Acme process. Every one carries `validate_provision { ... }`
   listing the provisions (both local and `OCS#`) it must satisfy.
5. Open [`acme-to-ocs.prm`](/examples/files/06-implementation-package/acme-to-ocs.prm).
   Each Acme process maps to an `OCS#`-prefixed process with a
   `description` and `justification`.
6. Open [`sample-workspace.pws/`](/examples/files/06-implementation-package/sample-workspace.pws/manifest.yaml).
   It's a directory. Pick any batch file (e.g.
   [`RoastBatchRegistry/b-2026-001.yaml`](/examples/files/06-implementation-package/sample-workspace.pws/RoastBatchRegistry/b-2026-001.yaml)).
   Its `attributes` map onto the fields of `class RoastBatch#data` &mdash;
   that is the record shape `LogEveryRoastBatch` requires Acme to maintain.

## What is fictional here

Everything. Acme Corporation, the Office Coffee Standard (OCS), Highland
Beans Co., and the bean origins are invented for teaching purposes. No
real standards, organisations, or proprietary content appears in any
file in this package.