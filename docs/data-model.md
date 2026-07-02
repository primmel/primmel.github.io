# Data Model

The Primmel data model provides primitives for describing the structure
of records, registries, and references in your domain. It plays the
same role as a UML class diagram, but in a form tooling can validate
against.

## Primitives

### `enum` &mdash; closed value set

```text
enum RoastLevel {
  Light   { definition "Light roast" }
  Medium  { definition "Medium roast" }
  Dark    { definition "Dark roast" }
}
```

A closed set of named values, each with a definition. Use enums for
any field whose value comes from a fixed list.

### `class#data` &mdash; registerable record

```text
class BeanLot#data {
  lot_id:           string   { definition "Supplier lot identifier"; modality SHALL }
  origin:           string   { definition "Country or region of origin"; modality SHALL }
  received_on:      datetime { definition "Date received at the roastery"; modality SHALL }
  certified_organic: boolean { definition "Whether the lot is certified organic"; modality MAY }
}
```

The `#data` suffix is the marker: only `class#data` declarations can
appear in a `data_registry`. Each field has a name, a type, and a block
with at least a `definition` and a `modality` (`SHALL`/`SHOULD`/`MAY`/
`CAN`/`MUST`).

### Helper `class` &mdash; embedded complex type

```text
class RoastProfile {
  name             { definition "Profile name (e.g. City+, Full City)" }
  target_level:    RoastLevel { definition "Target roast level" }
  development_time: string    { definition "Target development time in seconds" }
}
```

A class without the `#data` suffix is a *helper class* &mdash; a
reusable complex type that lives as a field inside other data classes.
It cannot be registered directly.

### `reference(Target#data)` &mdash; typed foreign key

```text
class RoastBatch#data {
  lot: reference(BeanLot#data) {
    definition "Bean lot used for this batch"
    modality SHALL
  }
}
```

A typed pointer to another record in another registry. At evaluation
time, tooling follows these references to traverse the data graph.

### `data_registry` &mdash; named store of records

```text
data_registry BeanLotRegistry {
  title "Bean lots"
  data_class BeanLot#data
}
```

A named store of records. The `data_class` clause declares which
`class#data` shape its records conform to. Registries are what
processes read from (`reference_data_registry`) and write to
(`output`).

## Field types

| Type | Holds |
| --- | --- |
| `string` | Free-form text. |
| `datetime` | ISO 8601 date or timestamp. |
| `boolean` | `true` or `false`. |
| `role` | A reference to a person in a role. |
| `reference(Target#data)` | A foreign key to another registry's record. |
| `<EnumName>` | One of the values of the named `enum`. |
| `<HelperClassName>` | An embedded complex value. |
| (no type) | Free-form, used for `notes`-style fields. |

## Process clauses that touch data

```text
process RoastBatch {
  reference_data_registry {     // this process reads from
    BeanLotRegistry
  }
  output {                       // this process writes to
    RoastBatchRegistry
  }
}
```

| Clause | Meaning |
| --- | --- |
| `reference_data_registry { ... }` | Registries this process reads from. |
| `output { ... }` | Registries this process writes to. |

## Where to see it in action

- [Example 02: Data and registries](/examples/data-and-registries) &mdash;
  the dedicated walkthrough.
- [Implementation package](/examples/implementation-package) &mdash;
  data classes and registries at production scale.