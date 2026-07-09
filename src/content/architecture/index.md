---
title: "Architecture"
sidebar:
  section: "Architecture"
  order: 0
  label: "Overview"
---

# Architecture

Primmel has **two sides** branching off the published reference: a
**Reference** side (read, interact, evaluate a standard) and an
**Application** side (implement, operate, audit against a standard).
The Publisher is upstream &mdash; they produce the reference both
sides consume.

## The flow

<div class="diagram">
<svg viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="flow-title">
  <title id="flow-title">Primmel's two sides: Reference and Application, branching off the published reference</title>
  <defs>
    <marker id="arr-arch" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="var(--primmel-rule-strong)"/>
    </marker>
  </defs>

  <!-- DEFINE (top, ochre) -->
  <g transform="translate(310 20)">
    <rect width="280" height="80" rx="6" fill="var(--primmel-surface)" stroke="var(--primmel-ochre)" stroke-width="1.5"/>
    <text x="20" y="28" font-family="var(--primmel-mono)" font-size="11" font-weight="500" fill="var(--primmel-burgundy)" letter-spacing="1.5">DEFINE  ·  PUBLISHER</text>
    <text x="20" y="55" font-family="var(--primmel-display)" font-size="18" font-weight="500" fill="var(--primmel-ink)">Author &amp; publish</text>
    <text x="20" y="72" font-family="var(--primmel-body)" font-size="12" fill="var(--primmel-text-2)">reference .prl + optional .prd extract</text>
  </g>

  <!-- arrow down -->
  <line x1="450" y1="105" x2="450" y2="135" stroke="var(--primmel-rule-strong)" stroke-width="1.5" marker-end="url(#arr-arch)"/>

  <!-- Published reference (middle, neutral) -->
  <g transform="translate(290 145)">
    <rect width="320" height="60" rx="6" fill="var(--primmel-surface-2)" stroke="var(--primmel-rule-strong)" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="160" y="30" text-anchor="middle" font-family="var(--primmel-display)" font-size="15" font-style="italic" fill="var(--primmel-ink)">published reference model</text>
    <text x="160" y="48" text-anchor="middle" font-family="var(--primmel-body)" font-size="11" fill="var(--primmel-text-3)">consumed by both sides</text>
  </g>

  <!-- Branch arrows -->
  <path d="M 380 210 Q 200 240 130 280" fill="none" stroke="var(--primmel-rule-strong)" stroke-width="1.5" marker-end="url(#arr-arch)"/>
  <path d="M 520 210 Q 700 240 770 280" fill="none" stroke="var(--primmel-rule-strong)" stroke-width="1.5" marker-end="url(#arr-arch)"/>

  <!-- REFERENCE side (left, indigo) -->
  <g transform="translate(30 290)">
    <rect width="380" height="290" rx="6" fill="var(--primmel-surface)" stroke="var(--primmel-indigo)" stroke-width="1.5"/>
    <text x="20" y="32" font-family="var(--primmel-mono)" font-size="11" font-weight="500" fill="var(--primmel-burgundy)" letter-spacing="1.5">REFERENCE  ·  READERS</text>
    <text x="20" y="58" font-family="var(--primmel-display)" font-size="22" font-weight="400" fill="var(--primmel-indigo)" font-style="italic">Read &middot; Interact &middot; Evaluate</text>

    <g transform="translate(20 85)" font-family="var(--primmel-body)">
      <text x="0" y="0" font-size="13" font-weight="600" fill="var(--primmel-ink)">Read</text>
      <text x="0" y="18" font-size="12" fill="var(--primmel-text-2)">Navigate the standard's provisions, processes,</text>
      <text x="0" y="33" font-size="12" fill="var(--primmel-text-2)">data classes, and references.</text>
    </g>

    <g transform="translate(20 145)" font-family="var(--primmel-body)">
      <text x="0" y="0" font-size="13" font-weight="600" fill="var(--primmel-ink)">Interact</text>
      <text x="0" y="18" font-size="12" fill="var(--primmel-text-2)">Run the test processes the model declares.</text>
      <text x="0" y="33" font-size="12" fill="var(--primmel-text-2)">Evaluate formulas against sample inputs.</text>
    </g>

    <g transform="translate(20 205)" font-family="var(--primmel-body)">
      <text x="0" y="0" font-size="13" font-weight="600" fill="var(--primmel-ink)">Evaluate</text>
      <text x="0" y="18" font-size="12" fill="var(--primmel-text-2)">Check whether a product, process, or dataset</text>
      <text x="0" y="33" font-size="12" fill="var(--primmel-text-2)">meets the standard. Dimensional &amp; formula checks.</text>
    </g>
  </g>

  <!-- APPLICATION side (right, burgundy) -->
  <g transform="translate(490 290)">
    <rect width="380" height="290" rx="6" fill="var(--primmel-surface)" stroke="var(--primmel-burgundy)" stroke-width="1.5"/>
    <text x="20" y="32" font-family="var(--primmel-mono)" font-size="11" font-weight="500" fill="var(--primmel-burgundy)" letter-spacing="1.5">APPLICATION  ·  IMPLEMENTERS / OPERATORS / AUDITORS</text>

    <g transform="translate(20 60)" font-family="var(--primmel-body)">
      <circle cx="8" cy="6" r="7" fill="var(--primmel-indigo)" opacity="0.15"/>
      <text x="8" y="10" text-anchor="middle" font-family="var(--primmel-display)" font-size="11" fill="var(--primmel-indigo)" font-weight="500">3</text>
      <text x="26" y="2" font-size="13" font-weight="600" fill="var(--primmel-ink)">Implement</text>
      <text x="26" y="18" font-size="12" fill="var(--primmel-text-2)">Maintain the digital twin. Adopt, import, customize.</text>
      <text x="26" y="33" font-size="12" fill="var(--primmel-text-2)">Map to references. Close Statement of Applicability.</text>
    </g>

    <g transform="translate(20 130)" font-family="var(--primmel-body)">
      <circle cx="8" cy="6" r="7" fill="var(--primmel-olive)" opacity="0.15"/>
      <text x="8" y="10" text-anchor="middle" font-family="var(--primmel-display)" font-size="11" fill="var(--primmel-olive)" font-weight="500">4</text>
      <text x="26" y="2" font-size="13" font-weight="600" fill="var(--primmel-ink)">Operate</text>
      <text x="26" y="18" font-size="12" fill="var(--primmel-text-2)">Run the implementation in production.</text>
      <text x="26" y="33" font-size="12" fill="var(--primmel-text-2)">Store evidence as required (.pws/ YAML records).</text>
    </g>

    <g transform="translate(20 200)" font-family="var(--primmel-body)">
      <circle cx="8" cy="6" r="7" fill="var(--primmel-ochre)" opacity="0.15"/>
      <text x="8" y="10" text-anchor="middle" font-family="var(--primmel-display)" font-size="11" fill="var(--primmel-ochre)" font-weight="500">5</text>
      <text x="26" y="2" font-size="13" font-weight="600" fill="var(--primmel-ink)">Audit</text>
      <text x="26" y="18" font-size="12" fill="var(--primmel-text-2)">Navigate like readers; view evidence like operators;</text>
      <text x="26" y="33" font-size="12" fill="var(--primmel-text-2)">correlate via .prm. Compliance verdict + trace.</text>
    </g>
  </g>

  <!-- Inheritance callout: Auditor inherits from Reader + Operator -->
  <path d="M 410 380 Q 450 380 490 380" fill="none" stroke="var(--primmel-ochre)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="450" y="372" text-anchor="middle" font-family="var(--primmel-body)" font-size="10" font-style="italic" fill="var(--primmel-ochre)">inherits</text>
  <path d="M 410 510 Q 450 510 490 510" fill="none" stroke="var(--primmel-ochre)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="450" y="502" text-anchor="middle" font-family="var(--primmel-body)" font-size="10" font-style="italic" fill="var(--primmel-ochre)">inherits</text>

</svg>
</div>

## The five pillars

| Pillar | Audience | Side | Output artifact |
| --- | --- | --- | --- |
| [**Define**](/architecture/define) | [Publishers](/architecture/audiences/publishers) | upstream | reference `.prl` + `.prd` |
| [**Reference**](/architecture/reference) | [Readers](/architecture/audiences/readers) | Reference | transient verdicts (read/interact/evaluate) |
| [**Implement**](/architecture/implement) | [Implementers](/architecture/audiences/implementers) | Application | implementation `.prl` + `.prm` + Statement of Applicability |
| [**Operate**](/architecture/operate) | [Operators](/architecture/audiences/operators) | Application | `.pws/` workspace directory (YAML records) |
| [**Audit**](/architecture/audit) | [Auditors](/architecture/audiences/auditors) | Application | compliance verdict + evidence trace |

The five pillars are **MECE** by output artifact &mdash; each pillar
produces a distinct artefact, and every Primmel activity fits into one
of them.

## Cross-cutting: capability inheritance

The Auditor role is notable because it **inherits capabilities** from
both Readers and Operators:

- Standard navigation &mdash; from Readers.
- Evidence viewing &mdash; from Operators.
- **Correlation via `.prm`** &mdash; the Auditor's own distinct skill.

Tools built for Readers and Operators can be reused by Auditors
without modification. The Auditor-specific tool is the mapping
navigator. See [Auditors](/architecture/audiences/auditors) for the
full breakdown.

## Cross-cutting: Reference primitive

A `reference { ... }` declaration in any `.prl` model cites an external
source clause (typically a `.prd` extract of a source standard). It is
a primitive type used by every pillar &mdash; by a publisher to cite
the source standard, by an organisation to cite both standard and
internal-policy clauses. It is not itself a phase; it is the mechanism
every phase uses to point at things outside the local model.

## File types

| Extension | Kind | Purpose |
| --- | --- | --- |
| `.prl` | File | Primmel model &mdash; the core artifact. Plain text, UTF-8. |
| `.prd` | File | Primmel Document &mdash; clause-level extracts of a source standard. |
| `.prm` | File | Primmel Map &mdash; a JSON mapping between two models (e.g. implementation ↔ reference). |
| `.pws` | Directory | Primmel Workspace &mdash; actual records produced when a model runs. One YAML file per record, organised into subdirectories per data registry, with a `manifest.yaml` at the root. |

The same artifact can appear in multiple pillars:

- A `.prl` is produced in **Define** (reference) or **Implement**
  (implementation).
- A `.prd` is produced in **Define** (from a source standard) and
  consulted in **Reference** and **Implement**.
- A `.prm` is produced in **Implement** (mapping) and consulted in
  **Audit**.
- A `.pws/` is produced in **Operate** and consulted in **Audit**.

## Pillar pages

Each pillar has its own page describing the activity and its artifacts:

- [Define](/architecture/define)
- [Reference](/architecture/reference)
- [Implement](/architecture/implement)
- [Operate](/architecture/operate)
- [Audit](/architecture/audit)

## Audience pages

Each pillar has a corresponding audience page describing the people
who drive it, what they're trying to accomplish, and the tools they
use:

- [Publishers](/architecture/audiences/publishers)
- [Readers](/architecture/audiences/readers)
- [Implementers](/architecture/audiences/implementers)
- [Operators](/architecture/audiences/operators)
- [Auditors](/architecture/audiences/auditors)