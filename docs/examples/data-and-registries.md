# Data and registries

::: tip Source file
[`02-data-and-registries.prl`](/docs/examples/files/02-data-and-registries.prl)
:::

This example introduces the data side of Primmel. It models a small
roastery logbook &mdash; bean lots received at the dock, batches
roasted, batches inspected &mdash; with the registries that hold those
records.

The flow is intentionally linear (`receive → roast → inspect`). The
interesting part is the **data layer**, not the process layer.

## Primitives introduced

| Primitive | Purpose |
| --- | --- |
| `enum` | A closed set of named values (here: roast levels). |
| `class#data` | A typed record that can be linked to a registry. The `#data` suffix is the marker. |
| Helper `class` (no suffix) | A reusable complex type, embeddable inside other classes. |
| `reference(Target#data)` | A typed foreign-key field. |
| `data_registry` | A named store of records of a given data class. |
| `output { ... }` | A process clause: which registries this process writes to. |
| `reference_data_registry { ... }` | A process clause: which registries this process reads from. |

## Enums

```text
enum RoastLevel {
  Light   { definition "Light roast" }
  Medium  { definition "Medium roast" }
  Dark    { definition "Dark roast" }
}
```

An `enum` is a closed set of named values, each with a definition. Use
enums for any field whose value comes from a fixed list.

## Data classes (with `#data`)

```text
class BeanLot#data {
  lot_id:           string   { definition "Supplier lot identifier"; modality SHALL }
  origin:           string   { definition "Country or region of origin"; modality SHALL }
  received_on:      datetime { definition "Date received at the roastery"; modality SHALL }
  certified_organic: boolean { definition "Whether the lot is certified organic"; modality MAY }
}
```

Every field has:

- A name (`lot_id`).
- A type (`string`, `datetime`, `boolean`, an `enum` name, a
  `reference(...)`, a `role`, or another class).
- A block with at least a `definition` (the human-readable meaning of
  the field) and a `modality` (`SHALL`/`SHOULD`/`MAY`/`CAN`/`MUST`).

The `#data` suffix marks this class as registerable &mdash; you can put
records of this shape into a `data_registry`. Without the suffix, the
class is a helper (see below).

## Helper classes (without `#data`)

```text
class RoastProfile {
  name             { definition "Profile name (e.g. City+, Full City)" }
  target_level:    RoastLevel { definition "Target roast level" }
  development_time: string    { definition "Target development time in seconds" }
  notes            { definition "Roaster's notes" }
}
```

`RoastProfile` is a complex type that lives **inside** other data
classes. It cannot be registered directly &mdash; there is no
`RoastProfileRegistry`. Instead, it appears as a field on
`RoastBatch#data`:

```text
class RoastBatch#data {
  batch_id:    string                            { ... }
  lot:         reference(BeanLot#data)           { ... }
  profile:     RoastProfile                      { definition "Roast profile applied" }
  roast_level: RoastLevel                        { ... }
  roast_date:  datetime                          { ... }
  moisture_pct: string                           { ... }
  roasted_by:  role                              { ... }
}
```

This distinction matters: only `class#data` declarations appear in
registries. Helper classes are how you build composite field types.

## References

```text
lot: reference(BeanLot#data) {
  definition "Bean lot used for this batch"
  modality SHALL
}
```

A `reference(Target#data)` field is a typed foreign key. It points at
another record in another registry. At evaluation time, tooling follows
these references to traverse the data graph &mdash; e.g. from a
`RoastBatch` to the `BeanLot` it was roasted from.

The `role` type (used by `roasted_by`) is a special reference to a
person in a role, rather than to another data record.

## Data registries

```text
data_registry BeanLotRegistry {
  title "Bean lots"
  data_class BeanLot#data
}

data_registry RoastBatchRegistry {
  title "Roast batch logbook"
  data_class RoastBatch#data
}
```

A `data_registry` is a named store of records. It declares which
`class#data` shape its records conform to. registries are the things
that processes read from (`reference_data_registry`) and write to
(`output`).

## Processes that read and write data

```text
process ReceiveBeans {
  name "Receive a bean lot from an approved supplier"
  actor Roaster
  output {
    BeanLotRegistry
  }
}

process RoastBatch {
  name "Roast a batch of beans"
  actor Roaster
  reference_data_registry {
    BeanLotRegistry
  }
  output {
    RoastBatchRegistry
  }
}

process InspectBatch {
  name "Inspect a roasted batch"
  actor QA
  reference_data_registry {
    RoastBatchRegistry
  }
}
```

| Process | Reads | Writes |
| --- | --- | --- |
| `ReceiveBeans` | &mdash; | `BeanLotRegistry` |
| `RoastBatch` | `BeanLotRegistry` | `RoastBatchRegistry` |
| `InspectBatch` | `RoastBatchRegistry` | &mdash; |

The data flows down the chain. Each registry becomes the join point
between the process that produces its records and the process that
consumes them.

## The diagram

```text
subprocess Root {
  elements {
    Start1      { x 0    y 0 }
    ReceiveBeans { x -100 y 100 }
    RoastBatch   { x -100 y 200 }
    InspectBatch { x -100 y 300 }
  }
  process_flow {
    Edge1 { from Start1      to ReceiveBeans }
    Edge2 { from ReceiveBeans to RoastBatch }
    Edge3 { from RoastBatch   to InspectBatch }
  }
  data {
    BeanLotRegistry   { x 150 y 130 }
    RoastBatchRegistry { x 150 y 230 }
  }
}
```

The `data { ... }` block places the registries on the diagram at the
given coordinates. Visually, the registries sit to the right of the
process flow, indicating that they are external to the flow itself but
referenced by it.

## What this example leaves out

- **Compliance** &mdash; no `provision`, no `modality` on processes.
  Added in [compliance and measurement](/docs/examples/compliance-and-measurement).
- **Branching** &mdash; the flow is a straight line. Branching is
  added in [process flow](/docs/examples/process-flow).
- **Subject bindings** &mdash; provisions that evaluate against
  registry records. Added in [compliance and measurement](/docs/examples/compliance-and-measurement).