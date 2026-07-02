# Minimal model

::: tip Source file
[`01-minimal-model.prl`](/examples/files/01-minimal-model.prl)
:::

This is the smallest valid Primmel model that contains a real
subprocess. It exists to show the language's skeleton with no
distractions &mdash; no data, no compliance, no branching.

If you read only one example file, read this one. Every larger model
extends the patterns here.

## The complete file

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

role Org {
  name "Organization"
}

role Greeter {
  name "Greeter"
}

start_event Start1 {
}

end_event End1 {
}

process Greet {
  name "Greet the world"
  actor Greeter
}

subprocess Root {
  elements {
    Start1 {
      x 0
      y 0
    }
    Greet {
      x 0
      y 100
    }
    End1 {
      x 0
      y 200
    }
  }
  process_flow {
    Edge1 {
      from Start1
      to Greet
    }
    Edge2 {
      from Greet
      to End1
    }
  }
  data {
  }
}
```

## What's going on

### Header

The `root` declaration names the entry-point subprocess. The `version`
identifies this model revision. The `metadata` block gives tooling what
it needs: `schema "Primmel 0.1"` declares the DSL schema (used by
parsers), and `namespace` is the prefix other models use to import this
model's elements (via the `Namespace#ElementID` pattern).

### Roles

`role Org { name "Organization" }` is the conventional generic
organization-wide role. `role Greeter` is a more specific role, used by
the `Greet` process below.

### Events

`start_event Start1` and `end_event End1` are the boundaries of the
flow. Both are empty declarations &mdash; an ID is all they need.

### Process

`process Greet` is one unit of work. The `actor Greeter` clause binds it
to a role. In a real model it would also carry `modality`,
`validate_provision`, and `reference_data_registry` clauses; this
minimal version omits them.

### Subprocess

`subprocess Root` is the diagram. The header's `root HelloWorld` would
normally point to a subprocess named `HelloWorld`; here, the root name
is `HelloWorld` but the subprocess defined is `Root`. **In practice the
root subprocess is conventionally named `Root`** &mdash; real-world
models follow this pattern, and the `root` line uses the model's
*namespace* name to keep things readable.

The subprocess has three blocks:

- `elements { ... }` &mdash; every node on this diagram, each with `x`
  and `y` layout coordinates.
- `process_flow { ... }` &mdash; the directed edges between nodes.
- `data { ... }` &mdash; empty in this minimal example. In a real model
  it would list the data registries visible on the diagram with their
  coordinates.

### Edges

```text
Edge1 { from Start1 to Greet }
Edge2 { from Greet  to End1 }
```

Each edge has a unique ID, a `from` source, and a `to` target. In
larger models edges can also carry `description` (a label) and
`condition` (a measurement expression, used on gateway outgoing edges).

## The diagram it implies

Rendered as a flowchart, this model produces a single vertical line:

```text
  ●  Start1
  │
  ▼
  ■  Greet      (actor: Greeter)
  │
  ▼
  ●  End1
```

That is the whole flow: start, do the work, end. Every larger model in
the corpus adds branches, data, and compliance on top of this skeleton.

## What this model deliberately leaves out

| Construct | Where it shows up |
| --- | --- |
| `class`, `enum`, `data_registry` | [Data and registries](/examples/data-and-registries) |
| `exclusive_gateway`, `timer_event` | [Process flow](/examples/process-flow) |
| `provision`, `measurement`, `note`, `table` | [Compliance and measurement](/examples/compliance-and-measurement) |
| `approval`, `approve_by` | [Approval workflow](/examples/approval-workflow) |
| `.prd`, `.prm`, `.pws` integration | [Implementation package](/examples/implementation-package) |