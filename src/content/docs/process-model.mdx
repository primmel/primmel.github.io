---
title: "Process Model"
sidebar:
  section: "Language Reference"
  order: 2
  label: "Process Model"
---

# Process Model

The Primmel process model provides BPMN-style primitives for describing
flows of work. Processes are bound to roles, may read and write data
registries, and may carry compliance requirements.

## Primitives

### `role`

```text
role Roaster {
  name "Roaster"
}
```

A role has an ID and a human-readable `name`. Roles are bound to
processes via the `actor` clause.

### `start_event`, `end_event`

```text
start_event Start1 { }
end_event   End1   { }
```

The boundaries of a flow. A model with multiple subprocess diagrams
typically has multiple `start_event`s &mdash; one per diagram. There
can be more `end_event`s than `start_event`s &mdash; a flow can
terminate in multiple outcomes.

### `timer_event`

```text
timer_event PaymentWindow {
  type WAIT
  para "72 hours after order placed"
}

timer_event RestockTimer {
  type REPEAT
  para "First of every month"
}
```

| `type` | Meaning |
| --- | --- |
| `WAIT` | Pause the flow until the specified time elapses. |
| `REPEAT` | Fire on a recurring schedule, regardless of flow position. |

`REPEAT` timers are typically wired in a loop to model recurring
processes (see [timer loop pattern](/examples/process-flow#pattern-timer-loops)).

### `exclusive_gateway`

```text
exclusive_gateway StockCheck {
  label "Is the item in stock?"
}
```

A decision point. Its outgoing edges are labelled with mutually
exclusive descriptions; exactly one is taken. One edge should be
marked `description "default"` as the fallback.

### `process`

```text
process Greet {
  name "Greet the world"
  actor Greeter
}
```

A unit of work. The `actor` clause binds it to a role. A real-world
process also carries:

- `modality SHALL` / `SHOULD` / `MAY` &mdash; the compliance weight.
- `validate_provision { ... }` &mdash; the provisions it must satisfy.
  See [compliance](/docs/compliance).
- `validate_measurement { ... }` &mdash; the measurement expressions
  that must hold.
- `reference_data_registry { ... }` &mdash; registries it reads from.
- `output { ... }` &mdash; registries it writes to.
- `subprocess <Name>` &mdash; binds the process to a named diagram.

### `approval`

```text
approval ApproveNewRoast {
  name "Approve a new roast profile"
  actor HeadRoaster
  modality SHALL
  approve_by OperationsManager
  approval_record { RoastProfileApprovalRegistry }
}
```

A specialised process that requires sign-off. Distinct from `process`
because it carries an `approve_by` clause and an `approval_record`
registry. See [approval workflow](/examples/approval-workflow).

### `subprocess`

```text
subprocess OrderFlow {
  elements {
    OrderStart  { x 0 y 0 }
    StockCheck  { x 0 y 100 }
    /* ... */
  }
  process_flow {
    Edge1 { from OrderStart to StockCheck description "Item is in stock" }
    Edge2 { from OrderStart to CancelOrder description "default" }
  }
  data { }
}
```

A container that lays out a flow on one diagram. Has three blocks:

| Block | Purpose |
| --- | --- |
| `elements { ... }` | Nodes on this diagram, each with `x`/`y` layout coordinates. |
| `process_flow { ... }` | Directed edges between nodes. Each edge has `from`, `to`, optional `description` and `condition`. |
| `data { ... }` | Data registries visible on this diagram, with coordinates. |

The header's `root <Name>` declaration names the top-level subprocess.
A model with multiple subprocesses names them like pages.

## Where to see it in action

- [Example 01: Minimal model](/examples/minimal-model) &mdash; the
  smallest valid subprocess.
- [Example 03: Process flow](/examples/process-flow) &mdash;
  gateways, timers, multi-page subprocesses.
- [Example 05: Approval workflow](/examples/approval-workflow) &mdash;
  the `approval` primitive.
- [Implementation package](/examples/implementation-package) &mdash;
  four subprocesses on one model, with a recurring timer loop.