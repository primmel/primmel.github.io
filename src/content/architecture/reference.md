---
title: "Reference — read, interact, and evaluate"
pillar: "reference"
side: "reference"
sidebar:
  section: "Architecture"
  order: 2
  label: "Reference"
---

# Reference &mdash; read, interact, and evaluate a published standard

::: tip WHO THIS IS FOR
The **Reference** pillar is for **Readers** &mdash; anyone who needs to
understand, test, or evaluate against a published standard: engineers
checking product fit, test labs running standardised procedures,
conformity assessors verifying requirements, students learning the
domain, compliance researchers comparing standards. See
[Readers](/architecture/audiences/readers).
:::

**Reference** is the consumption side of Primmel. Once a publisher has
released a reference `.prl`, anyone can load it into a tool and do
three kinds of work:

- **Read** &mdash; navigate the standard's structure: provisions,
  processes, data classes, references. Find what a clause requires,
  where it lives, what it traces back to.
- **Interact** &mdash; exercise the standard dynamically: run the test
  processes it declares, follow its process flows, evaluate its
  measurement expressions against sample inputs.
- **Evaluate** &mdash; check whether a product, process, or dataset
  meets the standard: dimensional checks, formula evaluation,
  applicable-requirement checks.

This is fundamentally different from the
[Application](/architecture/implement) side. Readers don't maintain an
implementation. They don't produce long-lived evidence. They consume
the published standard to answer a question: *does this thing meet
the requirement?*

## Output artifacts

Reference use produces **transient verdicts**, not standing artifacts:

| Activity | Typical output |
| --- | --- |
| Read | A navigated view of the standard (in a browser/editor) |
| Interact | A test run &mdash; executed process flows, evaluated formulas |
| Evaluate | A pass/fail verdict for a specific product, process, or dataset |

These outputs may be saved as test reports or evaluation records, but
they are not part of the Primmel artifact set the way `.prl`,
`.prm`, and `.pws` are. They are *uses* of the published reference.

## What Readers consume

| Artifact | Purpose |
| --- | --- |
| Published reference `.prl` | The standard itself &mdash; provisions, processes, data classes, references |
| Optional `.prd` | Source clause text, for cross-checking provisions against the underlying standard document |

## Tools Readers use

- **Spec browsers** &mdash; navigate the model: tree view, full-text
  search, cross-reference jumps, dependency graphs.
- **Test harnesses** &mdash; execute the standard's test processes
  against sample or real inputs; produce pass/fail verdicts per step.
- **Formula evaluators** &mdash; run the standard's `validate_measurement`
  expressions and `condition`s against provided values.
- **Dimensional checkers** &mdash; verify whether a product's
  dimensions, weights, or other measurable properties fall within the
  ranges the standard declares.
- **Applicability checkers** &mdash; given a context (product type,
  use case, jurisdiction), determine which provisions apply and which
  do not.

## What Readers do not do

- They do not maintain an implementation `.prl` of their own
  operations. That's the [Implement](/architecture/implement) pillar.
- They do not produce `.pws/` evidence of running operations. That's
  the [Operate](/architecture/operate) pillar.
- They do not audit implementations against the standard. That's the
  [Audit](/architecture/audit) pillar &mdash; which *uses* reader-style
  navigation as one of its capabilities.

## Where to see it in action

- The published reference `.prl` in the
  [implementation package](/examples/implementation-package) (`ocs-standard.prd`
  alongside the `OCS#`-aliased declarations in `acme-coffee-programme.prl`)
  is exactly what a Reader would load into a tool to navigate, test, or
  evaluate against.
- [Compliance and measurement example](/examples/compliance-and-measurement)
  &mdash; the gateway edges with `condition` expressions and the
  `validate_measurement` blocks are precisely what a Reader's formula
  evaluator would run.

## After reading

A Reader's verdict may feed into other pillars: a conformity assessor's
evaluation can become the basis for a certification (which a Publisher
then records); a test lab's run can become evidence a Regulator
reviews. But the Reader activity itself stops at the verdict &mdash;
the verdict's downstream use is someone else's pillar.