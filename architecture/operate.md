# Operate &mdash; run the implementation, produce evidence

**Operate** is the continuous production of evidence. The
implementation model, possibly extended by adopted mappings, is
*run*: processes execute, records are written, measurements are taken,
approvals are signed. The result is a `.pws/` workspace directory
holding the actual records.

## Output artifact

A `.pws/` directory, structured as:

```text
.pws/
├── manifest.yaml                  # workspace identity + registry list
├── BeanLotRegistry/              # one subdirectory per data_registry
│   ├── lot-2026-001.yaml         # one YAML file per record
│   └── lot-2026-002.yaml
├── RoastBatchRegistry/
│   ├── b-2026-001.yaml
│   └── b-2026-002.yaml
└── SupplierRegistry/
    └── sup-001.yaml
```

Each registry declared in the implementation (and in scope for this
workspace) has its own subdirectory. Each record produced by running
the implementation is its own YAML file.

## Manifest

`manifest.yaml` ties the workspace to its model:

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

Tooling reads the manifest to know what registries to expect, and which
data class shape each record should conform to.

## Records

Each record is a YAML file with the shape declared by its data class:

```yaml
# RoastBatchRegistry/b-2026-001.yaml
id: b-2026-001
name: Batch 2026-001
attributes:
  batch_id: b-2026-001
  lot: lot-2026-001           # → BeanLotRegistry/lot-2026-001.yaml
  roast_level: Medium
  roast_date: 2026-04-12
  moisture_pct: "10.4"
```

References between records (`lot: lot-2026-001` here) point at other
files in the workspace, matching the `reference(BeanLot#data)` type
declared on the `RoastBatch#data` class.

## Why YAML and why a directory

A single-file workspace (e.g. one JSON document) is convenient for
distribution but inconvenient for change:

- One record's update rewrites the whole file. VCS diffs are noisy.
- Concurrent edits collide.
- The whole artefact is all-or-nothing.

A directory of YAML files addresses each:

- Editing one record touches one file. Diffs are surgical.
- Records can be edited independently; merge conflicts are per-record.
- The workspace can be read or written one record at a time.

YAML was chosen because it is human-readable, supports comments, and
makes typed references (`reference(BeanLot#data)`) easy to express as
natural string values pointing at sibling files.

## What triggers a record

The implementation `.prl` says which processes write which registries:

```text
process AcmeRoastAndLog {
  name "Roast a batch and log it in one combined step"
  actor Roaster
  output {
    RoastBatchRegistry           // ← writes here
  }
}
```

When that process runs in production, a YAML file lands in
`RoastBatchRegistry/` with the record's `attributes` populated from the
process's inputs.

## Where to see it in action

- [Implementation package walkthrough](/examples/implementation-package)
  &mdash; the showcase, including a populated `sample-workspace.pws/`
  directory in the example corpus.

## After operating

The workspace is the input to [Audit](/architecture/audit).
Auditors need the workspace (or a subset of it) to verify that the
mapping the organisation declared actually corresponds to evidence on
the ground.