# Process flow

::: tip Source file
[`03-process-flow.prl`](/examples/files/03-process-flow.prl)
:::

This example models an order-fulfillment flow with two **subprocess
diagrams on the same model**: a main order flow and a recurring restock
flow. It introduces branching (`exclusive_gateway`), timed waits
(`timer_event`), and the multi-page subprocess pattern that real-world
models rely on.

## Primitives introduced

| Primitive | Purpose |
| --- | --- |
| Multiple `start_event`s | One entry point per subprocess diagram. |
| Multiple `end_event`s | Different terminal states (e.g. shipped vs cancelled). |
| `timer_event` (`WAIT`) | Wait for a fixed period (e.g. "72 hours after order placed"). |
| `timer_event` (`REPEAT`) | Fire on a recurring schedule (e.g. "first of every month"). |
| `exclusive_gateway` | Branch the flow based on a condition. |
| `"default"` edge | The fallback edge when no other gateway condition matches. |
| Multi-page subprocess | One model, multiple subprocess diagrams, each with its own start. |

## Multiple starts and ends

```text
start_event OrderStart   { }
start_event RestockStart { }

end_event OrderShipped   { }
end_event OrderCancelled { }
```

A model with *N* subprocess diagrams typically has *N* `start_event`s.
Each diagram has exactly one entry point. There can be more
`end_event`s than `start_event`s &mdash; a single flow can terminate in
multiple outcomes (here: shipped vs cancelled).

## Timer events

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

A `REPEAT` timer is the engine of recurring processes &mdash; see
[the timer loop pattern](#timer-loops) below.

## Exclusive gateways

```text
exclusive_gateway StockCheck {
  label "Is the item in stock?"
}

exclusive_gateway PaymentConfirmed {
  label "Was payment received within the window?"
}
```

An `exclusive_gateway` is a decision point. Its outgoing edges are
label-led with mutually exclusive descriptions; exactly one is taken.

## Processes with subprocess references

```text
process FulfillOrder {
  name "Fulfill a customer order"
  actor Warehouse
  subprocess OrderFlow
}

process ScheduleRestock {
  name "Schedule restock for next cycle"
  actor CustomerService
  subprocess RestockFlow
}
```

The `subprocess OrderFlow` clause binds the process to a named diagram.
This is how a model declares which subprocess a process "lives on" when
there are multiple diagrams.

## The two subprocess diagrams

### OrderFlow: branching with default fallback

```text
subprocess OrderFlow {
  elements {
    OrderStart        { x 0    y 0 }
    StockCheck        { x 0    y 100 }
    PaymentWindow     { x -150 y 220 }
    PaymentConfirmed  { x -150 y 330 }
    PickAndPack       { x -150 y 440 }
    OrderShipped      { x -150 y 550 }
    CancelOrder       { x 150  y 220 }
    RefundCustomer    { x 150  y 330 }
    OrderCancelled    { x 150  y 440 }
  }
  process_flow {
    Edge1 { from OrderStart       to StockCheck }

    Edge2 { from StockCheck       to PaymentWindow   description "Item is in stock" }
    Edge3 { from StockCheck       to CancelOrder     description "default" }

    Edge4 { from PaymentWindow    to PaymentConfirmed }

    Edge5 { from PaymentConfirmed to PickAndPack     description "Payment received" }
    Edge6 { from PaymentConfirmed to RefundCustomer  description "default" }

    Edge7 { from PickAndPack      to OrderShipped }
    Edge8 { from CancelOrder      to OrderCancelled }
    Edge9 { from RefundCustomer   to OrderCancelled }
  }
  data { }
}
```

Two gateways, each with a labelled branch and a `"default"` branch:

- **`StockCheck`** &mdash; in stock goes left to payment; out of stock
  goes right to cancellation.
- **`PaymentConfirmed`** &mdash; paid goes left to fulfilment; unpaid
  goes right to refund.

The `"default"` description marks the edge taken when no other condition
matches. (This model uses human-readable descriptions only; the
[compliance example](/examples/compliance-and-measurement) shows
gateway edges with machine-readable `condition` expressions.)

### RestockFlow: the timer loop

```text
subprocess RestockFlow {
  elements {
    RestockStart      { x 0 y 0 }
    OrderNewInventory { x 0 y 100 }
    RestockTimer      { x 0 y 200 }
  }
  process_flow {
    Edge1 { from RestockStart      to OrderNewInventory }
    Edge2 { from OrderNewInventory to RestockTimer }
    Edge3 { from RestockTimer      to OrderNewInventory }
  }
  data { }
}
```

This is the **timer loop pattern**:

```text
RestockStart → OrderNewInventory → RestockTimer ─┐
                    ↑                            │
                    └────────────────────────────┘
```

The flow enters, places a restock order, waits for the timer to fire on
its recurring schedule, then loops back to place another order. This
models "place an order every month, forever."

## Pattern: timer loops

The recurring-process pattern is so common it has its own shape:

```text
Edge1 { from Start                to SomeProcess }
Edge2 { from SomeProcess          to Timer }
Edge3 { from Timer                to SomeProcess }   // ← the loop
```

The same shape appears in the [implementation package](/examples/implementation-package)
for `ReviewSuppliers → SupplierReviewTimer → ReviewSuppliers`.

## Pattern: default edges

A gateway lists its outgoing edges in priority order. The edge with
`description "default"` is taken only when no other edge's condition
(or description, in human-readable models) matches. Every
`exclusive_gateway` should have exactly one `"default"` edge as a
fallback.

## What this example leaves out

- **Compliance** &mdash; no `provision` or `modality`. Added in
  [compliance and measurement](/examples/compliance-and-measurement).
- **Data** &mdash; the `data { }` blocks are empty. Data appears in
  [data and registries](/examples/data-and-registries).
- **Machine-readable conditions** &mdash; edges use only `description`.
  Conditions are added in
  [compliance and measurement](/examples/compliance-and-measurement).