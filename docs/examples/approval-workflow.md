# Approval workflow

::: tip Source file
[`05-approval-workflow.prl`](/examples/files/05-approval-workflow.prl)
:::

This example introduces the `approval` step &mdash; a specialised
process that requires sign-off by a designated role and writes an
approval record to a registry when signed.

The flow is intentionally short: a single approval gate. The interest
is in the approval primitive itself.

## Primitives introduced

| Primitive | Purpose |
| --- | --- |
| `approval` | A process step that requires sign-off. |
| `approve_by <Role>` | Names the role that must sign. |
| `approval_record { ... }` | Names the registry where each signed approval is written. |
| Role-typed fields | Fields of type `role` (e.g. `approved_by: role`) record who performed a role action. |

## The data class for approval records

```text
class RoastProfileApproval#data {
  profile_name: string   { definition "Name of the proposed roast profile"; modality SHALL }
  target_bean:  string   { definition "Target bean variety"; modality SHALL }
  approved_at:  datetime { definition "Approval timestamp"; modality SHALL }
  approved_by:  role     { definition "Operations manager who approved"; modality SHALL }
  notes                 { definition "Approval notes" }
}

data_registry RoastProfileApprovalRegistry {
  title "Roast profile approval records"
  data_class RoastProfileApproval#data
}
```

Every approval produces a record in a designated registry. The data
class for that registry typically carries:

- The thing being approved (`profile_name`, `target_bean`).
- The timestamp of approval (`approved_at`).
- The approver (`approved_by: role`).
- Optional notes.

The `role` type for `approved_by` is a *role-typed field* &mdash; it
holds the identity of the person who filled the role at the time of the
approval.

## The approval step

```text
approval ApproveNewRoast {
  name "Approve a new roast profile"
  actor HeadRoaster
  modality SHALL
  approve_by OperationsManager
  approval_record {
    RoastProfileApprovalRegistry
  }
  reference {
    InternalRoastPolicy-3-1
  }
}
```

| Clause | Meaning |
| --- | --- |
| `actor HeadRoaster` | The role responsible for *initiating* the approval. |
| `approve_by OperationsManager` | The role that must *sign* the approval. |
| `approval_record { ... }` | The registry each signed approval is written to. |
| `reference { ... }` | The clause this approval requirement traces back to. |

The `approval` primitive is a specialised `process`: in addition to
everything a process can do, it carries an `approve_by` clause and an
`approval_record`. Tooling can list every approval gate across a model
and answer: *who can sign this, and where is the record of that
signature stored?*

## The flow

```text
start_event Start1 { }
end_event   End1   { }

subprocess Root {
  elements {
    Start1         { x 0 y 0 }
    ApproveNewRoast { x 0 y 100 }
    End1           { x 0 y 220 }
  }
  process_flow {
    Edge1 { from Start1         to ApproveNewRoast }
    Edge2 { from ApproveNewRoast to End1 }
  }
  data {
    RoastProfileApprovalRegistry { x 200 y 130 }
  }
}
```

Visually:

```text
  ●  Start1
  │
  ▼
  ◆  ApproveNewRoast       (actor: HeadRoaster, approve_by: OperationsManager)
  │                        ──► RoastProfileApprovalRegistry
  ▼
  ●  End1
```

When the approval is signed, a new record lands in
`RoastProfileApprovalRegistry` with the profile name, target bean,
approval timestamp, and the operations manager who signed.

## Why a separate primitive?

You could model the same thing with a `process` plus a `role` field on
an output record. The `approval` primitive exists because approvals are
common enough and structurally distinct enough that they deserve their
own first-class treatment:

- Tooling can scan for `approval` declarations specifically and render
  an *approval matrix* across the whole model.
- The `approve_by` clause is distinct from the `actor` clause &mdash;
  one initiates, one signs. Folding both into a single role would lose
  that distinction.
- The `approval_record` registry is structurally tied to the approval,
  not just an arbitrary `output`. Tooling can find every approval
  that writes to a given registry.

## What this example leaves out

- **Compliance** &mdash; no `provision` or `modality` on the approval.
  Combined with `validate_provision` in
  [compliance and measurement](/docs/examples/compliance-and-measurement).
- **Cross-model aliasing** &mdash; see the
  [implementation package](/docs/examples/implementation-package).