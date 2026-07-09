---
title: "Publishers"
audience: "publishers"
pillar: "define"
sidebar:
  section: "Audiences"
  order: 1
  label: "Publishers"
---

# Publishers

::: tip CORRESPONDING PILLAR
[Publishers](/architecture/audiences/publishers) drive the
[**Define**](/architecture/define) pillar. They author and publish the
reference models that everyone else consumes.
:::

## Who they are

Publishers are the **originating authors** of a Primmel reference
model. The defining feature isn't who they are &mdash; it's *what they
do*: they release a model for others to consume. Common publisher
types:

- **Standards bodies** &mdash; BSI, OIML, ISO, IEC and other national
  or international standards organisations.
- **Industry consortia** &mdash; sector-specific groups publishing
  reference frameworks for their members.
- **Regulators** &mdash; government or quasi-government bodies
  publishing compliance frameworks they enforce.
- **Large organisations** &mdash; companies publishing internal
  frameworks intended for their subsidiaries, suppliers, or business
  partners to map to.
- **Tooling vendors** &mdash; occasionally, vendors publish reference
  models as templates that customers can extend.

## What they're trying to accomplish

- Express a standard's provisions, processes, and data requirements in
  a typed, machine-readable form.
- Make the standard **instantly available** &mdash; not just as a PDF,
  but as an executable artefact.
- Provide a stable, versioned namespace (`OCS#`, `ISO13485#`, etc.)
  that downstream implementers can alias in their own models.
- Trace every provision back to the source clause in the original
  standard document (via `.prd` extracts and `reference` declarations).
- Publish the model under terms that allow adopters, readers, and
  auditors to consume it freely.

## Artifacts they consume / produce

| Artifact | Role |
| --- | --- |
| Source standard document (PDF, Word) | Consumed &mdash; the human-readable source |
| `.prd` extract | Produced &mdash; clause-level extracts of the source |
| Reference `.prl` | Produced &mdash; the executable model itself |

## Tools they use

- **Authoring editors** &mdash; purpose-built Primmel editors (e.g.
  the Paneron extension) for structuring models.
- **Validation tooling** &mdash; structural checks on the model before
  publication: parse errors, broken cross-references, missing
  declarations.
- **`.prd` extractors** &mdash; tools that turn a source PDF or
  document into a clause-level extract aligned with the reference
  model's provisions.
- **Publication registries** &mdash; versioned distribution points
  where adopters can fetch the published `.prl`.

## A worked example

The [implementation package](/examples/implementation-package)
includes a fictional Office Coffee Standard. The publisher's
artefacts are [`ocs-standard.prd`](/examples/files/06-implementation-package/ocs-standard.prd)
(the clause extract) and the `OCS#`-prefixed declarations inside
[`acme-coffee-programme.prl`](/examples/files/06-implementation-package/acme-coffee-programme.prl)
(which mirror what the published reference would declare). Acme, as
the adopter, doesn't author these &mdash; the publisher does. Acme
simply imports them via the `OCS#` namespace prefix.

## See also

- [**Define** pillar](/architecture/define) &mdash; the architectural
  activity this audience drives.
- [Readers](/architecture/audiences/readers) &mdash; the next audience downstream,
  who consume what Publishers produce.
- [Implementers](/architecture/audiences/implementers) &mdash; the audience that
  adopts and maps to the published reference.