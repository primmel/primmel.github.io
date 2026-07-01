# Architecture

Primmel supports a complete lifecycle for executable standards, from
publication to audit. This section walks through that lifecycle and
explains the MECE structure: five pillars, each with a distinct actor,
a distinct artifact, and a distinct point in time.

## The flow

```text
   ┌──────────────────────────────────────────────────────────────────────┐
   │  REFERENCE MODEL PUBLISHER                                           │
   │  (standards body, industry consortium, regulator, or any org)        │
   │                                                                      │
   │  ① DEFINE                                                            │
   │     ──►  reference .prl  (processes, data classes, provisions,      │
   │           references)                                                │
   │     ──►  optional .prd clause extract                                │
   └─────────────────────────────────┬────────────────────────────────────┘
                                     │  published
                                     ▼
   ┌──────────────────────────────────────────────────────────────────────┐
   │  ORGANIZATION (the operator — always exists, with or without a       │
   │  standard in scope)                                                  │
   │                                                                      │
   │  ② IMPLEMENT  (standing artifact: the org's digital twin)            │
   │     ──►  implementation .prl                                        │
   │           (the org's actual processes, data registries, roles,       │
   │            approvals — modeled whether or not any standard is in     │
   │            scope)                                                    │
   │                                                                      │
   │  ③ ADOPT  (the decision, repeated once per reference model taken up) │
   │     for each reference model the org takes up:                       │
   │       • modify the implementation as needed (add processes, change   │
   │         data fields, refine approvals)                               │
   │       • declare mappings from impl elements to reference elements    │
   │     ──►  .prm JSON (+ map_profile block)                             │
   │     complete when: every reference element → ≥1 impl element         │
   │     result: Statement of Applicability — the org has stated its      │
   │     conformance toward that reference                                │
   │                                                                      │
   │  ④ OPERATE  (continuous)                                             │
   │     run the implementation, produce evidence                        │
   │     ──►  .pws/ workspace directory (registry records in YAML,        │
   │           measurement readings, approval signatures)                 │
   └─────────────────────────────────┬────────────────────────────────────┘
                                     │  mapping + workspace submitted
                                     ▼
   ┌──────────────────────────────────────────────────────────────────────┐
   │  AUDITOR / ASSESSOR / REGULATOR                                      │
   │                                                                      │
   │  ⑤ AUDIT                                                             │
   │     for each requirement in the reference model:                     │
   │       1. follow the mapping → find the impl element(s) it maps to    │
   │       2. follow the impl element → find where in the org's actual    │
   │          operations it lives (the .pws records are the evidence)     │
   │       3. evaluate validate_provision / validate_measurement          │
   │     ──►  compliance verdict + evidence trace                         │
   └──────────────────────────────────────────────────────────────────────┘
```

## The five pillars

| # | Pillar | Actor | Output artifact | When |
| --- | --- | --- | --- | --- |
| 1 | **Define** | Reference publisher (anyone) | reference `.prl` (± `.prd`) | at publication |
| 2 | **Implement** | Organization | implementation `.prl` (digital twin) | standing, maintained continuously |
| 3 | **Adopt** | Organization (compliance) | `.prm` + Statement of Applicability | per reference model taken up |
| 4 | **Operate** | Organization (operations) | `.pws/` workspace directory | continuous |
| 5 | **Audit** | Auditor / assessor / regulator | compliance verdict + evidence trace | periodic |

These five are **MECE**: each produces a distinct artifact, and every
Primmel activity is one of them.

## Cross-cutting: Reference

A `reference { ... }` declaration in any `.prl` model cites an external
source clause (typically a `.prd` extract of a source standard). It is
a primitive type used by every pillar — by a publisher to cite the source
standard, by an organisation to cite both standard and internal-policy
clauses. It is not itself a phase; it is the mechanism every phase uses
to point at things outside the local model.

## Cross-cutting: Test

Testing a model for structural correctness is a sub-activity, not a
pillar:

- A **publisher** tests the reference model before publication &mdash;
  catches parse errors, broken cross-references, missing declarations.
- An **adopter** tests the implementation against the reference as part
  of the Adopt pillar &mdash; catches gaps, dead references, and other
  reasons the mapping won't close.

Both are scoped within their respective pillars.

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
  consulted in **Implement** (by the adopter).
- A `.prm` is produced in **Adopt** (mapping) and consulted in
  **Audit**.
- A `.pws/` is produced in **Operate** and consulted in **Audit**.

## Pillar pages

Each pillar has its own page describing what the actor does, what the
artifact looks like, and where to see it in the example corpus:

- [Define](/docs/architecture/define)
- [Implement](/docs/architecture/implement)
- [Adopt](/docs/architecture/adopt)
- [Operate](/docs/architecture/operate)
- [Audit](/docs/architecture/audit)