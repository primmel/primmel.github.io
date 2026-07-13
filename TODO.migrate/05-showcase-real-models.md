# 05 — Website: showcase real-world models

> **Status: DONE (anonymized)** — Published `/examples/real-world-scale`
> with element counts for 8 real standards (ISO 27001: 262 processes,
> BS 44003: 560 provisions, etc.) and generic structural pattern
> snippets. No copyrighted clause text — only aggregate statistics
> and pattern shapes.
>
> The full models remain in the private repository. To publish specific
> clause-level snippets, user must review and approve each one
> individually (standards text is copyrighted by ISO/BSI).

## What

Replace the 6 fictional example models on primmel.org with real-world
standards models from primmel/private-models (TODO 02). Real ISO, BSI,
and OIML models demonstrate Primmel's value far better than
"HelloWorld" and "Roastery" examples.

## Current examples (fictional)

- 01-minimal-model.prl — HelloWorld
- 02-data-and-registries.prl — Roastery logbook
- 03-process-flow.prl — Order fulfillment
- 04-compliance-and-measurement.prl — Roastery compliance
- 05-approval-workflow.prl — New roast approval
- 06-implementation-package — Acme coffee + OCS

## Proposed showcase (real models)

Organize by complexity, showing the progression from simple to complex:

### Getting started (keep fictional, they're good for learning)
- 01-hello-world.prl — keep
- 02-data-and-registries.prl — keep

### Real-world reference models
- 03-iso-27001.prl — Information security management (most complex,
  100+ provisions, full process tree)
- 04-iso-14971.prl — Medical device risk management
- 05-bs-20400.prl — Sustainable procurement
- 06-dptm.prl — Data Protection Trustmark (has .prd document)

### Real-world implementation models
- 07-abc-company.prl — BS 20400 implementation (shows implementation
  side: how an org maps to a standard)
- 08-ribose-crimson.prl + .pws/ — Full implementation package with
  workspace evidence

## What each showcase page needs

Each model showcase page should show:
1. **Model summary card** (stats: roles, processes, provisions, etc.)
2. **Process flow diagrams** (auto-rendered from canvas blocks)
3. **Provisions table** (modality, condition, reference clause)
4. **Interactive model browser** (tree view of all elements)
5. **Download link** (to the .prl file)
6. **Context paragraph** (what standard this represents, why it matters)

## Content structure

```
src/content/examples/
├── index.mdx           — Overview of all examples
├── 01-hello-world.mdx  — Keep (learning)
├── 02-data-registries.mdx — Keep (learning)
├── 03-iso-27001.mdx    — NEW: real ISO model
├── 04-iso-14971.mdx    — NEW: real ISO model
├── 05-bs-20400.mdx     — NEW: real BSI model
├── 06-dptm.mdx         — NEW: real model with .prd
├── 07-abc-company.mdx  — NEW: real implementation
└── 08-ribose-crimson.mdx — NEW: full package with evidence
```

## Dependencies

- TODO 01 (canvas keyword) — models use new syntax
- TODO 02 (private-models repo) — source of real models
- Copyright/licensing check — can we publicly display these models?
  ISO standards are copyrighted. The MODELS (representations) may be
  Ribose's IP. Need legal clearance before publishing.
