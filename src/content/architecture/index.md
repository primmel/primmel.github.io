---
title: "Architecture"
sidebar:
  section: "Architecture"
  order: 0
  label: "Overview"
---

# Architecture

Primmel has **two sides** branching off the published reference: a
**Reference** side (read, interact, evaluate a standard) and an
**Application** side (implement, operate, audit against a standard).
The Publisher is upstream &mdash; they produce the reference both
sides consume.

## The flow



## The five pillars

| Pillar | Audience | Side | Output artifact |
| --- | --- | --- | --- |
| [**Define**](/architecture/define) | [Publishers](/audiences/publishers) | upstream | reference `.prl` + `.prd` |
| [**Reference**](/architecture/reference) | [Readers](/audiences/readers) | Reference | transient verdicts (read/interact/evaluate) |
| [**Implement**](/architecture/implement) | [Implementers](/audiences/implementers) | Application | implementation `.prl` + `.prm` + Statement of Applicability |
| [**Operate**](/architecture/operate) | [Operators](/audiences/operators) | Application | `.pws/` workspace directory (YAML records) |
| [**Audit**](/architecture/audit) | [Auditors](/audiences/auditors) | Application | compliance verdict + evidence trace |

The five pillars are **MECE** by output artifact &mdash; each pillar
produces a distinct artefact, and every Primmel activity fits into one
of them.

## Cross-cutting: capability inheritance

The Auditor role is notable because it **inherits capabilities** from
both Readers and Operators:

- Standard navigation &mdash; from Readers.
- Evidence viewing &mdash; from Operators.
- **Correlation via `.prm`** &mdash; the Auditor's own distinct skill.

Tools built for Readers and Operators can be reused by Auditors
without modification. The Auditor-specific tool is the mapping
navigator. See [Auditors](/audiences/auditors) for the
full breakdown.

## Cross-cutting: Reference primitive

A `reference { ... }` declaration in any `.prl` model cites an external
source clause (typically a `.prd` extract of a source standard). It is
a primitive type used by every pillar &mdash; by a publisher to cite
the source standard, by an organisation to cite both standard and
internal-policy clauses. It is not itself a phase; it is the mechanism
every phase uses to point at things outside the local model.

## File types

| Extension | Kind | Purpose |
| --- | --- | --- |
| `.prl` | File | Primmel model &mdash; the core artifact. Plain text, UTF-8. |
| `.prd` | File | Primmel Document &mdash; clause-level extracts of a source standard. |
| `.prm` | File | Primmel Map &mdash; a JSON mapping between two models (e.g. implementation ↔ reference). |
| `.pws` | Directory | Primmel Workspace &mdash; actual records produced when a model runs. One YAML file per record, organised into subdirectories per data registry, with a `manifest.yaml` at the root. |

The same artifact can appear in multiple pillars:

- A `.prl` is produced in **Define** (reference) or **Implement**
  (implementation).
- A `.prd` is produced in **Define** (from a source standard) and
  consulted in **Reference** and **Implement**.
- A `.prm` is produced in **Implement** (mapping) and consulted in
  **Audit**.
- A `.pws/` is produced in **Operate** and consulted in **Audit**.

## Pillar pages

Each pillar has its own page describing the activity and its artifacts:

- [Define](/architecture/define)
- [Reference](/architecture/reference)
- [Implement](/architecture/implement)
- [Operate](/architecture/operate)
- [Audit](/architecture/audit)

## Audience pages

Each pillar has a corresponding audience page describing the people
who drive it, what they're trying to accomplish, and the tools they
use:

- [Publishers](/audiences/publishers)
- [Readers](/audiences/readers)
- [Implementers](/audiences/implementers)
- [Operators](/audiences/operators)
- [Auditors](/audiences/auditors)