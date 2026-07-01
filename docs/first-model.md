# A First Model

This page walks through the smallest meaningful Primmel model line by
line. By the end, you will recognize every construct that appears in
larger real-world models.

::: tip You can follow along
The complete file is in the examples corpus:
[`01-minimal-model.prl`](/docs/examples/files/01-minimal-model.prl).
Open it in another tab.
:::

## The header

Every model begins with three things: a `root`, a `version`, and a
`metadata` block.

```text
root HelloWorld

version "v1.0.0-dev1"

metadata {
  title "Minimal Primmel model"
  schema "Primmel 0.1"
  edition "1"
  author "Primmel project"
  shortname "HelloWorld"
  namespace "HelloWorld"
}
```

| Field | Meaning |
| --- | --- |
| `root HelloWorld` | Names the top-level subprocess &mdash; the entry point of the model. |
| `version "v1.0.0-dev1"` | Semantic version of the model itself. |
| `metadata.schema` | The DSL schema identifier. `"Primmel 0.1"` is the current value. |
| `metadata.namespace` | The model's namespace. Used when **other** models import this model's elements with the `Namespace#ElementID` pattern (see [the implementation package](/docs/examples/implementation-package)). |

## Roles

Roles describe *who* does the work. A role has an ID and a human-readable name.

```text
role Org {
  name "Organization"
}

role Greeter {
  name "Greeter"
}
```

`Org` is a conventional ID for the generic organization-wide role
(matching real-world models). `Greeter` is a more specific role that we
will assign to a process below.

## Events

A process flow has a beginning and an end. Both are events:

```text
start_event Start1 { }
end_event   End1   { }
```

A model with multiple subprocess diagrams has multiple `start_event`s
&mdash; one per subprocess. This is normal: each diagram needs its own
entry point.

## Processes

A `process` is a unit of work performed by a role:

```text
process Greet {
  name "Greet the world"
  actor Greeter
}
```

The `actor` clause binds the process to a role. At evaluation time, this
is how tooling determines whose responsibility the step is.

A real-world process usually also has:

- `modality SHALL` / `SHOULD` / `MAY` &mdash; the compliance weight of
  the step.
- `validate_provision { ... }` &mdash; the provisions this process must
  satisfy. See [example 04](/docs/examples/compliance-and-measurement).
- `reference_data_registry { ... }` &mdash; data registries this process
  reads from.
- `output { ... }` &mdash; data registries this process writes to.

## The subprocess

A `subprocess` is a container that lays out a flow. The
[header](#the-header) named `HelloWorld` as the root; now we define it:

```text
subprocess Root {
  elements {
    Start1 { x 0  y 0 }
    Greet  { x 0  y 100 }
    End1   { x 0  y 200 }
  }
  process_flow {
    Edge1 { from Start1  to Greet }
    Edge2 { from Greet   to End1 }
  }
  data { }
}
```

A subprocess has three blocks:

| Block | Purpose |
| --- | --- |
| `elements { ... }` | The events, processes, gateways, and timers on this diagram, each with `x`/`y` coordinates for visual layout. |
| `process_flow { ... }` | The directed edges between elements. Each `Edge` has a `from` and a `to`. |
| `data { ... }` | The data registries visible on this diagram, with `x`/`y` coordinates. |

The `Root` subprocess is the top-level flow. A model with multiple
subprocesses names them like pages (`OrderFlow`, `QualityCheckFlow`,
`SupplierReviewFlow`) &mdash; see [example 03](/docs/examples/process-flow)
and the [implementation package](/docs/examples/implementation-package).

## What this model lacks

The minimal model is correct Primmel, but it does not exercise:

- **Data** &mdash; no `class`, `enum`, or `data_registry`. Added in
  [example 02](/docs/examples/data-and-registries).
- **Compliance** &mdash; no `provision` or `reference`. Added in
  [example 04](/docs/examples/compliance-and-measurement).
- **Branching** &mdash; no `exclusive_gateway`. Added in
  [example 03](/docs/examples/process-flow).
- **Mapping** &mdash; no `map_profile` or `.prm` file. Added in the
  [implementation package](/docs/examples/implementation-package).

That is what the rest of the example corpus adds, one primitive at a
time.

## Next

Open [the examples index](/docs/examples/) and pick the next file in the
reading order. Each example introduces one new primitive group, with the
relevant lines highlighted and explained.