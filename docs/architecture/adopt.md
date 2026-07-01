# Adopt &mdash; map the implementation to a reference

**Adopt** is the act of taking up a reference model. Concretely, it
means:

1. **Modifying the implementation** `.prl` as needed (adding processes,
   changing data fields, refining approvals) so it can satisfy the
   reference's provisions.
2. **Declaring mappings** from implementation elements to reference
   elements, in a `.prm` file (or a `map_profile` block inside the
   implementation `.prl`).
3. **Closing the mapping** until every reference element maps to at
   least one implementation element. This is the **Statement of
   Applicability**.

The Statement of Applicability is the completion criterion: when it
holds, the organisation has stated its conformance toward the
reference.

## Output artifacts

- The implementation `.prl`, modified as needed.
- A `.prm` JSON mapping (and/or a `map_profile` block).
- Implicit: a Statement of Applicability, derivable from the mapping by
  tooling &mdash; "every reference element → ≥1 implementation element".

## How the mapping closes

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
  implementation data class (or the adopter documents an exclusion).

This is the audit term *Statement of Applicability*: a formal record of
which controls/provisions are applicable and how each is satisfied.

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

- [Implementation package walkthrough](/docs/examples/implementation-package)
  &mdash; the showcase. Acme adopts the OCS standard, modifies its
  implementation as needed, builds the mapping, and closes it.
- [Mapping](/docs/mapping) &mdash; the dual forms of mapping in detail.

## After adoption

Once the Statement of Applicability holds, the organisation is in a
position to be audited. Day-to-day running of the adopted processes is
the [Operate](/docs/architecture/operate) pillar; the periodic
verification that the mapping is still complete and the provisions still
hold is the [Audit](/docs/architecture/audit) pillar.