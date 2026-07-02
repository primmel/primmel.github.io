# Define &mdash; author a reference model

::: tip WHO THIS IS FOR
The **Define** pillar is for **Publishers** &mdash; standards bodies,
industry consortia, regulators, or any organisation that publishes a
model for others to consume. See
[Publishers](/architecture/audiences/publishers).
:::

**Define** is the act of authoring a reference model: a published
Primmel model that other organisations may adopt and map their
implementations to. It is the first pillar of the lifecycle.

## Who publishes a reference model

Reference-model publishing is **not** exclusive to standards bodies.
The defining feature of a reference model is that it is *published for
others to map to*, not who published it. Common publishers include:

- **Standards bodies** (BSI, OIML, ISO, IEC, etc.) &mdash; publish
  reference models for their published standards.
- **Industry consortia** &mdash; publish reference models for sector-wide
  best practices.
- **Regulators** &mdash; publish reference models for compliance
  frameworks they enforce.
- **Large organisations** &mdash; publish reference models for internal
  frameworks, intended for their subsidiaries, suppliers, or business
  partners to map to.

## Output artifacts

A Define pillar produces:

- A reference `.prl` model &mdash; the core artifact. Contains the
  reference processes, data classes, provisions, and references.
- An optional `.prd` extract &mdash; clause-level content from the
  source standard document. Useful for tooling that needs the original
  normative text.

The reference `.prl` is what adopters actually consume. The `.prd` is
supporting material &mdash; it lets adopters follow a provision back to
the literal text it derives from.

## What goes in a reference `.prl`

A reference model is structurally identical to any Primmel model:

```text
root AcmeCoffeeStandard

version "v1.0.0"

metadata {
  title "Office Coffee Standard"
  schema "Primmel 0.1"
  edition "1"
  author "Office Coffee Standards Body (fictional)"
  shortname "OCS"
  namespace "OCS"
}

role Org { name "Organization" }

process SourceBeans {
  name "Source beans from approved suppliers"
  modality SHALL
}

provision Provision4-2-1 {
  condition "The organization shall source beans only from approved suppliers"
  modality SHALL
}
```

The conventions in a reference model are slightly different from an
implementation model:

- **Namespace discipline** &mdash; the `metadata.namespace` value is the
  namespace prefix other models use to import this model's elements
  (e.g. `OCS#SourceBeans`).
- **No `validate_provision`** &mdash; a reference model declares
  requirements; it doesn't bind any process to them. That binding is
  the adopter's job.
- **`reference { ... }` everywhere** &mdash; every provision cites the
  source standard clause it derives from.

## Where to see it in action

- [Example 06: Implementation package &mdash; `ocs-standard.prd`](/examples/files/06-implementation-package/ocs-standard.prd)
  is the source standard's `.prd` extract. The matching `acme-coffee-programme.prl`
  (in the same directory) shows how the standard's namespace is
  imported by an adopter.

## After publishing

Once published, the reference model enters the flow: an organisation's
[Implement](/architecture/implement) pillar may already have an
implementation `.prl` for its own operations. When the organisation
decides to take up this reference model, it moves to the
[Implement](/architecture/implement) pillar.