---
title: "Implement — maintain the digital twin, adopt, and map"
pillar: "implement"
side: "application"
sidebar:
  section: "Architecture"
  order: 3
  label: "Implement"
---

# Implement &mdash; maintain the digital twin, adopt, and map

::: tip WHO THIS IS FOR
The **Implement** pillar is for **Implementers** &mdash; the people who
maintain an organisation's implementation `.prl`, take up reference
models, customize the implementation to satisfy them, and declare the
mappings that close a Statement of Applicability. See
[Implementers](/architecture/audiences/implementers).
:::

**Implement** covers everything an organisation does to its own
implementation model: maintaining the digital twin, adopting a
reference, customizing to satisfy it, and declaring the mappings that
link the two.

## The digital twin

The implementation model is a **standing artifact**. It exists whether
or not the organisation has decided to adopt any standard. Modelling
the organisation's own processes, data requirements, and roles is
valuable on its own:

- It gives operations a single source of truth for how the work flows.
- It gives engineering a schema to validate records against.
- It gives audit and compliance a structural place to start.

When the organisation later decides to adopt a standard, the
implementation model is the *starting point* &mdash; not a blank slate.

## Output artifact (standing)

An implementation `.prl` &mdash; structurally identical to a reference
`.prl`, with two distinguishing conventions:

- **Local namespace** &mdash; `metadata.namespace` is the organisation's
  own (e.g. `AcmeCoffeeProgramme`), not the standard's.
- **Local processes and data** &mdash; processes, classes, registries
  describe the org's actual operations. Roles like `Org`, `Roaster`,
  `QA` are the org's own.

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

The implementation model is **not** rebuilt per standard adoption. If
Acme today adopts the OCS standard, and tomorrow adopts a separate
quality standard, the implementation model is the same one. The
adoption step adds *mappings*; it does not duplicate or fork the
implementation. The implementation is the org's **long-lived
operational truth**. Standards adoption is a **cross-cutting concern**
that touches this model but does not replace it.

## Adopting a reference

When the organisation takes up a reference model, three things happen:

1. **Adopt / import / customize** &mdash; modify the implementation
   `.prl` as needed (adding processes, changing data fields, refining
   approvals) so it can satisfy the reference's provisions.
2. **Map** &mdash; declare mappings from implementation elements to
   reference elements, in a `.prm` file (or a `map_profile` block
   inside the implementation `.prl`).
3. **Close** &mdash; iterate until every reference element maps to at
   least one implementation element. When that holds, the
   implementation has stated its conformance toward that reference:
   a **Statement of Applicability**.

### Output artifacts (per adoption)

- The implementation `.prl`, modified as needed.
- A `.prm` JSON mapping (and/or a `map_profile` block).
- Implicit: a Statement of Applicability, derivable from the mapping by
  tooling &mdash; "every reference element → ≥1 implementation element".

### How the mapping closes

The mapping is a many-to-many relation between elements of two models:

```text
reference.prl  ─────►  implementation.prl
SourceBeans    ─────►  AcmeSourceBeans    (via .prm)
LogRoast       ─────►  AcmeRoastAndLog    (via .prm)
VerifyQuality  ─────►  TestBatchMoisture   (via .prm)
                  ─────►  ReviewSuppliers    (also satisfies VerifyQuality)
```

The Statement of Applicability holds when:

- Every `process` in the reference maps to ≥1 process in the
  implementation.
- Every `provision` in the reference maps to ≥1 process in the
  implementation that `validate_provision`s it.
- Every `data_class` declared by the reference is matched by an
  implementation data class (or the implementer documents an exclusion).

This is the audit term *Statement of Applicability*: a formal record
of which controls/provisions are applicable and how each is satisfied.

## Cross-model aliasing

The implementation declares elements that originate in the reference by
prefixing their IDs with the reference's namespace and `#`:

```text
process OCS#SourceBeans {        // local copy of a reference process
  name "Source beans"
}

process AcmeSourceBeans {        // Acme's own implementation process
  name "Source beans (Acme implementation)"
  validate_provision {
    OCS#Provision4-2-1            // ← binds to the imported provision
  }
}
```

This is how implementation elements *reference* standard elements.

## The dual mapping forms

The same mapping can be expressed in two equivalent places:

- **Inside the implementation `.prl`**: a `map_profile` block.
- **As a standalone `.prm` JSON file**: easier to version independently
  and to carry richer per-pair metadata.

Both forms are used in tandem in practice &mdash; the `.prm` is the
canonical artefact submitted to auditors.

## Where to see it in action

- [Example 02: Data and registries](/examples/data-and-registries)
  &mdash; a small org's implementation of a roastery logbook, with no
  reference to any standard.
- [Implementation package walkthrough](/examples/implementation-package)
  &mdash; the showcase. Acme adopts the OCS standard, modifies its
  implementation as needed, builds the mapping, and closes it.
- [Implementation package &mdash; `acme-coffee-programme.prl`](/examples/files/06-implementation-package/acme-coffee-programme.prl)
  &mdash; Acme's full digital twin, before/after adopting the OCS
  standard.
- [Mapping](/docs/mapping) &mdash; the dual forms of mapping in detail.

## After implementing

The implementation model is maintained continuously &mdash; whenever
the org's actual processes change, the implementation changes too, and
new adoptions add mappings without disturbing the underlying twin.
Day-to-day running of the implementation is the
[Operate](/architecture/operate) pillar; periodic verification that
the mapping is still complete and the provisions still hold is the
[Audit](/architecture/audit) pillar.