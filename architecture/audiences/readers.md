# Readers

::: tip CORRESPONDING PILLAR
[Readers](/architecture/audiences/readers) drive the
[**Reference**](/architecture/reference) pillar. They consume a
published reference model to read, interact, and evaluate.
:::

## Who they are

Readers are anyone who **consumes a published reference model** without
modifying it and without producing long-lived operational evidence.
They use the standard to answer a question. Common reader types:

- **Engineers** &mdash; checking whether their product or process
  meets a standard's requirements.
- **Test laboratories** &mdash; running the standardised test
  procedures the model declares.
- **Conformity assessors** &mdash; verifying that a product, process,
  or dataset satisfies the applicable provisions.
- **Students and researchers** &mdash; learning the domain, comparing
  standards, tracking their evolution.
- **Compliance officers** &mdash; researching what a standard requires
  before recommending adoption.
- **Tooling vendors (reference side)** &mdash; building tools that
  consume standard models: browsers, harnesses, simulators,
  validators.

## What they're trying to accomplish

- **Read** &mdash; navigate the standard's structure: provisions,
  processes, data classes, references. Find what a clause requires,
  where it lives, what it traces back to in the source document.
- **Interact** &mdash; exercise the standard dynamically: run its test
  processes against sample inputs, follow its process flows, evaluate
  its `validate_measurement` expressions and gateway `condition`s.
- **Evaluate** &mdash; check whether a specific product, process, or
  dataset meets the standard: dimensional checks, formula evaluation,
  applicable-requirement checks.

## Artifacts they consume / produce

| Artifact | Role |
| --- | --- |
| Published reference `.prl` | Consumed &mdash; the standard itself |
| Optional `.prd` extract | Consumed &mdash; the source clause text, for cross-checking |
| Test reports / evaluation verdicts | Produced (transient) &mdash; not part of the long-lived Primmel artifact set |

## Tools they use

- **Spec browsers** &mdash; navigate the model: tree view, full-text
  search, cross-reference jumps, dependency graphs.
- **Test harnesses** &mdash; execute the standard's declared test
  processes; produce pass/fail verdicts per step.
- **Formula evaluators** &mdash; run the standard's `validate_measurement`
  expressions and `condition`s against provided values.
- **Dimensional checkers** &mdash; verify whether a product's
  dimensions, weights, or measurable properties fall within declared
  ranges.
- **Applicability checkers** &mdash; given a context (product type,
  use case, jurisdiction), determine which provisions apply.

## A worked example

A test laboratory evaluating a coffee roaster against the fictional
Office Coffee Standard would load `ocs-standard.prd` into a spec
browser. They'd navigate to clause 4.4 (*Quality checks*), find the
`MaxMoisture <= 12` expression in the model, and run a formula
evaluator against the actual measured moisture reading from the
roaster under test. The output is a pass/fail verdict &mdash;
transient, not part of the Primmel artifact set.

## What Readers do *not* do

- Maintain an implementation `.prl` of their own operations. That's
  the [Implement](/architecture/implement) pillar, for
  [Implementers](/architecture/audiences/implementers).
- Produce `.pws/` evidence of running operations. That's the
  [Operate](/architecture/operate) pillar, for
  [Operators](/architecture/audiences/operators).
- Audit implementations against the standard. That's the
  [Audit](/architecture/audit) pillar &mdash; but
  [Auditors](/architecture/audiences/auditors) **inherit reader-style navigation**
  as one of their capabilities.

## See also

- [**Reference** pillar](/architecture/reference) &mdash; the
  architectural activity this audience drives.
- [Publishers](/architecture/audiences/publishers) &mdash; who produces what
  Readers consume.
- [Auditors](/architecture/audiences/auditors) &mdash; who inherit Reader
  capabilities and add correlation skill.