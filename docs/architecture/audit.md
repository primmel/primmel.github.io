# Audit &mdash; verify conformance against a reference

**Audit** is the verification step. An auditor takes a reference
model, the organisation's implementation model, the mapping between
them, and a slice of the organisation's workspace, and determines
whether the organisation is in conformance with the reference.

## How an auditor reads the model

For each requirement in the reference model, the auditor follows three
steps:

```text
┌─────────────────────────┐
│ 1. follow the mapping   │  reference.prl provision Provision4-2-1
│                         │           │
│                         │           ▼  (per .prm)
│                         │  implementation.prl process AcmeSourceBeans
│                         │           │
│                         │           ▼  (per validate_provision)
│                         │  real-world operation "sourcing beans
│                         │  from approved suppliers"
│                         │
│ 2. follow the impl      │  .pws/SupplierRegistry/sup-001.yaml
│    element to evidence  │     — supplier approved on 2026-01-05
│                         │     — approved_by: operations.manager
│                         │
│ 3. evaluate against      │  validate_measurement expressions:
│    the workspace        │    "[SuppliersApproved].count >= 1"  → true
│                         │  validate_provision:
│                         │    Provision4-2-1                   → satisfied
│                         │
│                         │  → COMPLIANT for this requirement
└─────────────────────────┘
```

This sequence repeats for every requirement in the reference. The result
is a structural compliance verdict, traceable element by element from
the standard down to evidence on the ground.

## Output artifact

A compliance verdict &mdash; typically a report stating which
requirements were satisfied, which were not, and where the evidence
sits. The verdict is *not* a Primmel artifact; it is the auditor's
deliverable to whoever commissioned the audit.

## What the auditor needs

To run an audit, the auditor needs:

| Input | What it provides |
| --- | --- |
| Reference `.prl` | The requirements being audited against. |
| Optional reference `.prd` | The literal clause text, for cross-checking. |
| Implementation `.prl` | The org's processes, data shape, and any local provisions. |
| `.prm` mapping | How each reference element maps to impl element(s). |
| `.pws/` workspace | The actual records produced by running the org. |

Without the mapping, the auditor has to reconstruct the alignment by
hand. With the mapping, the structural answer falls out.

## Compliance verdict vs. workspace verification

There are two things an auditor checks, which can be confused:

- **Statement of Applicability** &mdash; does the mapping cover every
  reference element? This is a *structural* check on the `.prm`. It
  answers: *has the organisation declared which provisions it claims to
  satisfy, and does each one have at least one binding?*
- **Operational conformance** &mdash; do the records in `.pws/` actually
  show that the mapped-to processes have run, with passing
  `validate_measurement` results, recorded approvals, and so on? This
  is a *workspace* check on the `.pws/`. It answers: *is what the
  organisation said it does, what it actually does?*

Both must hold for a clean audit. A complete mapping without supporting
workspace evidence is a hollow statement. Workspace evidence without a
complete mapping is unmoored data.

## Where to see it in action

- [Compliance and measurement example](/docs/examples/compliance-and-measurement)
  &mdash; the gateway edge `condition` expressions and
  `validate_measurement` blocks that an auditor would evaluate.
- [Implementation package walkthrough](/docs/examples/implementation-package)
  &mdash; the showcase that demonstrates both kinds of audit input.

## After auditing

A clean audit verdict is the certification outcome. An audit that finds
gaps triggers remediation: the organisation modifies its implementation,
updates its mapping, fills in missing workspace evidence, and is
re-audited.

This is the lifecycle closing: Define → Implement → Adopt → Operate →
Audit → (gap?) → Implement → ... → clean Audit.