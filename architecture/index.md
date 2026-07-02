# Architecture

Primmel supports a complete lifecycle for executable standards, from
publication to audit. This section walks through that lifecycle and
explains the MECE structure: five pillars, each with a distinct actor,
a distinct artifact, and a distinct point in time.

## The flow

<div class="diagram">
<svg viewBox="0 0 900 580" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="flow-title">
  <title id="flow-title">The Primmel five-pillar lifecycle</title>
  <defs>
    <marker id="arrow-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="var(--primmel-rule-strong)"/>
    </marker>
  </defs>

  <!-- ─── LAYER 1: Reference publisher ─── -->
  <g transform="translate(50 30)">
    <rect width="800" height="100" rx="6" fill="var(--primmel-surface)" stroke="var(--primmel-indigo)" stroke-width="1.5"/>
    <text x="20" y="28" font-family="var(--primmel-mono)" font-size="11" font-weight="500" fill="var(--primmel-burgundy)" letter-spacing="1.5">REFERENCE MODEL PUBLISHER</text>
    <text x="20" y="46" font-family="var(--primmel-display)" font-size="13" fill="var(--primmel-text-3)" font-style="italic">standards body · industry consortium · regulator · any org</text>

    <g transform="translate(20 60)">
      <circle cx="14" cy="14" r="14" fill="var(--primmel-indigo)" opacity="0.12"/>
      <text x="14" y="18" text-anchor="middle" font-family="var(--primmel-display)" font-size="13" font-weight="500" fill="var(--primmel-indigo)">1</text>
      <text x="40" y="12" font-family="var(--primmel-display)" font-size="16" font-weight="500" fill="var(--primmel-ink)">Define</text>
      <text x="40" y="28" font-family="var(--primmel-body)" font-size="11" fill="var(--primmel-text-2)">reference .prl + optional .prd clause extract</text>
    </g>
  </g>

  <!-- arrow down -->
  <line x1="450" y1="135" x2="450" y2="165" stroke="var(--primmel-rule-strong)" stroke-width="1.5" marker-end="url(#arrow-flow)"/>

  <!-- ─── LAYER 2: Organization ─── -->
  <g transform="translate(50 175)">
    <rect width="800" height="260" rx="6" fill="var(--primmel-surface)" stroke="var(--primmel-burgundy)" stroke-width="1.5"/>
    <text x="20" y="28" font-family="var(--primmel-mono)" font-size="11" font-weight="500" fill="var(--primmel-burgundy)" letter-spacing="1.5">ORGANIZATION (the operator)</text>
    <text x="20" y="46" font-family="var(--primmel-display)" font-size="13" fill="var(--primmel-text-3)" font-style="italic">always exists, with or without a standard in scope</text>

    <!-- Implement -->
    <g transform="translate(20 65)">
      <circle cx="14" cy="14" r="14" fill="var(--primmel-indigo)" opacity="0.12"/>
      <text x="14" y="18" text-anchor="middle" font-family="var(--primmel-display)" font-size="13" font-weight="500" fill="var(--primmel-indigo)">2</text>
      <text x="40" y="12" font-family="var(--primmel-display)" font-size="16" font-weight="500" fill="var(--primmel-ink)">Implement</text>
      <text x="40" y="28" font-family="var(--primmel-body)" font-size="11" fill="var(--primmel-text-2)">implementation .prl — the org's digital twin</text>
    </g>

    <!-- Adopt -->
    <g transform="translate(20 125)">
      <circle cx="14" cy="14" r="14" fill="var(--primmel-burgundy)" opacity="0.15"/>
      <text x="14" y="18" text-anchor="middle" font-family="var(--primmel-display)" font-size="13" font-weight="500" fill="var(--primmel-burgundy)">3</text>
      <text x="40" y="12" font-family="var(--primmel-display)" font-size="16" font-weight="500" fill="var(--primmel-ink)">Adopt</text>
      <text x="40" y="28" font-family="var(--primmel-body)" font-size="11" fill="var(--primmel-text-2)">.prm mapping + Statement of Applicability</text>
      <text x="40" y="42" font-family="var(--primmel-body)" font-size="10" fill="var(--primmel-text-3)" font-style="italic">complete when every reference element → ≥1 impl element</text>
    </g>

    <!-- Operate -->
    <g transform="translate(20 190)">
      <circle cx="14" cy="14" r="14" fill="var(--primmel-olive)" opacity="0.15"/>
      <text x="14" y="18" text-anchor="middle" font-family="var(--primmel-display)" font-size="13" font-weight="500" fill="var(--primmel-olive)">4</text>
      <text x="40" y="12" font-family="var(--primmel-display)" font-size="16" font-weight="500" fill="var(--primmel-ink)">Operate</text>
      <text x="40" y="28" font-family="var(--primmel-body)" font-size="11" fill="var(--primmel-text-2)">.pws/ workspace directory — registry records in YAML</text>
    </g>
  </g>

  <!-- arrow down -->
  <line x1="450" y1="440" x2="450" y2="470" stroke="var(--primmel-rule-strong)" stroke-width="1.5" marker-end="url(#arrow-flow)"/>

  <!-- ─── LAYER 3: Auditor ─── -->
  <g transform="translate(50 480)">
    <rect width="800" height="80" rx="6" fill="var(--primmel-surface)" stroke="var(--primmel-ochre)" stroke-width="1.5"/>
    <text x="20" y="28" font-family="var(--primmel-mono)" font-size="11" font-weight="500" fill="var(--primmel-burgundy)" letter-spacing="1.5">AUDITOR · ASSESSOR · REGULATOR</text>

    <g transform="translate(20 42)">
      <circle cx="14" cy="14" r="14" fill="var(--primmel-ochre)" opacity="0.15"/>
      <text x="14" y="18" text-anchor="middle" font-family="var(--primmel-display)" font-size="13" font-weight="500" fill="var(--primmel-ochre)">5</text>
      <text x="40" y="12" font-family="var(--primmel-display)" font-size="16" font-weight="500" fill="var(--primmel-ink)">Audit</text>
      <text x="40" y="28" font-family="var(--primmel-body)" font-size="11" fill="var(--primmel-text-2)">follow mapping → impl → workspace evidence. Compliance verdict + trace.</text>
    </g>
  </g>
</svg>
</div>

## The five pillars

| # | Pillar | Actor | Output artifact | When |
| --- | --- | --- | --- | --- |
| 1 | **Define** | Reference publisher (anyone) | reference `.prl` (± `.prd`) | at publication |
| 2 | **Implement** | Organization | implementation `.prl` (digital twin) | standing, maintained continuously |
| 3 | **Adopt** | Organization (compliance) | `.prm` + Statement of Applicability | per reference model taken up |
| 4 | **Operate** | Organization (operations) | `.pws/` workspace directory | continuous |
| 5 | **Audit** | Auditor / assessor / regulator | compliance verdict + evidence trace | periodic |

These five are **MECE**: each produces a distinct artifact, and every
Primmel activity is one of them.

## Cross-cutting: Reference

A `reference { ... }` declaration in any `.prl` model cites an external
source clause (typically a `.prd` extract of a source standard). It is
a primitive type used by every pillar — by a publisher to cite the source
standard, by an organisation to cite both standard and internal-policy
clauses. It is not itself a phase; it is the mechanism every phase uses
to point at things outside the local model.

## Cross-cutting: Test

Testing a model for structural correctness is a sub-activity, not a
pillar:

- A **publisher** tests the reference model before publication &mdash;
  catches parse errors, broken cross-references, missing declarations.
- An **adopter** tests the implementation against the reference as part
  of the Adopt pillar &mdash; catches gaps, dead references, and other
  reasons the mapping won't close.

Both are scoped within their respective pillars.

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
  consulted in **Implement** (by the adopter).
- A `.prm` is produced in **Adopt** (mapping) and consulted in
  **Audit**.
- A `.pws/` is produced in **Operate** and consulted in **Audit**.

## Pillar pages

Each pillar has its own page describing what the actor does, what the
artifact looks like, and where to see it in the example corpus:

- [Define](/architecture/define)
- [Implement](/architecture/implement)
- [Adopt](/architecture/adopt)
- [Operate](/architecture/operate)
- [Audit](/architecture/audit)