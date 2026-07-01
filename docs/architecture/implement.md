# Implement &mdash; maintain the digital twin

**Implement** is the act of authoring and maintaining an
implementation model &mdash; the organisation's *digital twin*: a
Primmel model that describes how the organisation actually operates.

## The digital-twin model

The implementation model is a standing artifact. It exists whether or not
the organisation has decided to adopt any standard. Modelling the
organisation's own processes, data requirements, and roles is
valuable on its own:

- It gives operations a single source of truth for how the work flows.
- It gives engineering a schema to validate records against.
- It gives audit and compliance a structural place to start.

When the organisation later decides to adopt a standard, the
implementation model is the *starting point* &mdash; not a blank slate.

## Output artifact

An implementation `.prl` &mdash; structurally identical to a reference
`.prl`, with two distinguishing conventions:

- **Local namespace** &mdash; `metadata.namespace` is the organisation's
  own (e.g. `AcmeCoffeeProgramme`), not the standard's.
- **Local processes and data** &mdash; processes, classes, registries
  describe the org's actual operations. Roles like `Org`, `Roaster`,
  `QA` are the org's own.

## Example

```text
root AcmeCoffeeProgramme

version "v1.0.0-dev1"

metadata {
  title "Acme Coffee Programme"
  schema "Primmel 0.1"
  edition "1"
  author "Acme Corporation (fictional)"
  shortname "AcmeCoffeeProgramme"
  namespace "AcmeCoffeeProgramme"
}

role Org     { name "Organization" }
role Roaster { name "Roaster" }
role QA      { name "Quality assurance" }

// ... local processes, data registries, subprocesses ...
```

The model describes Acme's own operations: bean receiving, roasting,
quality testing. There is no reference to any standard here yet &mdash;
this is the digital twin, in isolation.

## Standing artifact, not per-standard

The implementation model is **not** rebuilt per standard adoption. If
Acme today adopts the OCS standard, and tomorrow adopts a separate
quality standard, the implementation model is the same one. The
adoption step adds *mappings*; it does not duplicate or fork the
implementation.

This is the key insight: the implementation model is the org's
**long-lived operational truth**. Standards adoption is a
**cross-cutting concern** that touches this model but does not replace
it.

## Where to see it in action

- [Example 02: Data and registries](/docs/examples/data-and-registries)
  &mdash; a small org's implementation of a roastery logbook, with no
  reference to any standard.
- [Implementation package &mdash; `acme-coffee-programme.prl`](/docs/examples/files/06-implementation-package/acme-coffee-programme.prl)
  &mdash; Acme's full digital twin, before/after adopting the OCS
  standard. The implementation existed as the org's operational model;
  the standard was overlaid on it.

## After maintaining

The implementation model is maintained continuously &mdash; whenever the
org's actual processes change, the implementation changes too. When the
org decides to take up a reference model, it moves to the
[Adopt](/docs/architecture/adopt) pillar. The day-to-day running of
the implementation is the [Operate](/docs/architecture/operate) pillar.