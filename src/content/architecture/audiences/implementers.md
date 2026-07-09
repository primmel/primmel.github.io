---
title: "Implementers"
audience: "implementers"
pillar: "implement"
side: "application"
sidebar:
  section: "Audiences"
  order: 3
  label: "Implementers"
---

# Implementers

::: tip CORRESPONDING PILLAR
[Implementers](/architecture/audiences/implementers) drive the
[**Implement**](/architecture/implement) pillar. They maintain the
organisation's digital twin, adopt references, customize to satisfy
them, and declare the mappings that close a Statement of
Applicability.
:::

## Who they are

Implementers are the people who **build and maintain the
organisation's implementation model**, take up reference models, and
wire the two together with mappings. Common implementer types:

- **Implementation authors** &mdash; consultants or internal teams
  who build the initial digital twin of the org's operations.
- **Engineering teams** &mdash; staff who refine the implementation
  over time as the org's actual processes change.
- **Compliance teams** &mdash; staff who decide which standards to
  adopt and shepherd the mapping process per standard.
- **Quality teams** &mdash; staff who ensure the implementation
  continues to satisfy the mapped-to references between audits.
- **Consultants** &mdash; external specialists who help an org adopt
  a specific standard end-to-end.

## What they're trying to accomplish

- **Maintain** &mdash; keep the implementation `.prl` synchronised
  with how the org actually operates. The model is a standing
  artifact, not a one-off project.
- **Adopt / import / customize** &mdash; when the org decides to take
  up a reference, import the reference's elements (via `Namespace#ID`
  aliasing), customize the implementation as needed (add processes,
  change data fields, refine approvals), and bind the org's processes
  to the reference's provisions via `validate_provision`.
- **Map** &mdash; declare mappings from implementation elements to
  reference elements, in `.prm` files and/or `map_profile` blocks.
- **Close** &mdash; iterate until the mapping satisfies the
  Statement of Applicability: every reference element → ≥1
  implementation element.

## Artifacts they consume / produce

| Artifact | Role |
| --- | --- |
| Published reference `.prl` | Consumed &mdash; the standard being adopted |
| Optional `.prd` extract | Consumed &mdash; for cross-checking provisions against source clauses |
| Implementation `.prl` | Produced and maintained &mdash; the org's digital twin |
| `.prm` JSON mapping | Produced per adoption &mdash; the alignment between impl and reference |
| `map_profile` block (inside `.prl`) | Produced &mdash; in-model form of the mapping |

## Tools they use

- **Primmel editors** &mdash; authoring tools for the implementation
  `.prl` and `map_profile` blocks.
- **Mapping editors** &mdash; tools that help build `.prm` files
  side-by-side with the reference and implementation models, with
  description/justification fields per pair.
- **Coverage checkers** &mdash; tooling that reports on Statement of
  Applicability progress: which reference elements are mapped, which
  are not, which are excluded with justification.
- **Diff tools** &mdash; compare implementation revisions; compare
  mappings across reference-model version upgrades.

## A worked example

The [implementation package](/examples/implementation-package) shows
this audience end-to-end. Acme's implementers:

1. Maintain [`acme-coffee-programme.prl`](/examples/files/06-implementation-package/acme-coffee-programme.prl)
   &mdash; the digital twin of Acme's coffee operations.
2. Decide to adopt the fictional Office Coffee Standard (OCS).
3. Import OCS elements via `OCS#` aliases (e.g. `process OCS#SourceBeans`,
   `provision OCS#Provision4-2-1`).
4. Bind Acme processes to OCS provisions via `validate_provision`.
5. Declare the mapping in [`acme-to-ocs.prm`](/examples/files/06-implementation-package/acme-to-ocs.prm)
   with description and justification per pair.
6. Iterate until the mapping closes &mdash; every OCS requirement has
   at least one Acme process implementing it.

## See also

- [**Implement** pillar](/architecture/implement) &mdash; the full
  architectural activity, including the merged Adopt workflow.
- [Publishers](/architecture/audiences/publishers) &mdash; who produces what
  Implementers adopt.
- [Operators](/architecture/audiences/operators) &mdash; who runs what Implementers
  build.
- [Mapping reference](/docs/mapping) &mdash; the dual forms of
  mapping in detail.