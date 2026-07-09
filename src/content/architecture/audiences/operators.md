---
title: "Operators"
audience: "operators"
pillar: "operate"
side: "application"
sidebar:
  section: "Audiences"
  order: 4
  label: "Operators"
---

# Operators

::: tip CORRESPONDING PILLAR
[Operators](/architecture/audiences/operators) drive the
[**Operate**](/architecture/operate) pillar. They run the
implementation in production and produce the `.pws/` evidence that
auditors will later follow.
:::

## Who they are

Operators are the people who **run the implementation day-to-day** and
record what happens. Common operator types:

- **Operations staff** &mdash; people performing the processes the
  implementation describes (roasters, QA testers, line workers,
  supervisors).
- **Production teams** &mdash; teams running the actual workflow,
  whose activities produce registry records.
- **Record-keepers** &mdash; staff responsible for the integrity,
  retention, and retrievability of workspace evidence.
- **System integrators** &mdash; engineers binding the implementation
  to real production systems: data registries, process engines,
  compliance trackers that emit records on the org's behalf.

## What they're trying to accomplish

- **Use** &mdash; run the implementation's processes as the org's
  actual operations unfold. Each process execution corresponds to a
  real-world activity.
- **Store evidence as required** &mdash; produce `.pws/` workspace
  records that conform to the data class shapes the implementation
  declares. Every record is one YAML file in a registry subdirectory.
- **Maintain a complete evidentiary trail** &mdash; ensure that for
  every provision-bound process, the records needed to demonstrate
  compliance actually exist in the workspace.

## Artifacts they consume / produce

| Artifact | Role |
| --- | --- |
| Implementation `.prl` | Consumed &mdash; the digital twin that defines what records to keep |
| `.pws/` workspace directory | Produced &mdash; the actual records, one YAML file per record |
| `manifest.yaml` | Produced &mdash; workspace identity and registry list |
| Registry record YAML files | Produced &mdash; one per record per registry |

## Tools they use

- **Production systems** &mdash; ERPs, MES, QMS, custom operational
  tools that perform the actual work.
- **Workspace collectors** &mdash; integrations that take outputs from
  production systems and write them as YAML record files in the
  correct registry subdirectory.
- **Workspace validators** &mdash; tools that check every produced
  record against its declared data class shape.
- **Workspace browsers** &mdash; readers for navigating the directory
  tree, filtering records, following references between them.

## A worked example

The [implementation package](/examples/implementation-package)
includes a populated
[`sample-workspace.pws/`](/examples/files/06-implementation-package/sample-workspace.pws/manifest.yaml)
directory showing what this audience produces:

```
sample-workspace.pws/
├── manifest.yaml          ← workspace identity + registry list
├── BeanLotRegistry/
│   ├── lot-2026-001.yaml  ← one record per YAML file
│   └── lot-2026-002.yaml
├── RoastBatchRegistry/
│   ├── b-2026-001.yaml
│   └── b-2026-002.yaml
└── SupplierRegistry/
    └── sup-001.yaml
```

Each YAML file holds one record whose `attributes` conform to the data
class the implementation declares. References between records
(`lot: lot-2026-001` in a roast batch, pointing at a bean lot) match
the `reference(BeanLot#data)` type declared on the `RoastBatch#data`
class. This is the evidence trail that
[Auditors](/architecture/audiences/auditors) will later follow.

## See also

- [**Operate** pillar](/architecture/operate) &mdash; the
  architectural activity this audience drives.
- [Implementers](/architecture/audiences/implementers) &mdash; who builds and
  maintains what Operators run.
- [Auditors](/architecture/audiences/auditors) &mdash; who view the evidence
  Operators produce (Auditors inherit operator-style evidence viewing
  as one of their capabilities).