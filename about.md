# About Primmel

<div class="about-hero">
  <h1>About Primmel</h1>
  <p class="tagline">Prime MMEL &mdash; the torch carried forward.</p>
</div>

## The Name & Logo

### The Name

**Primmel** is **Prime MMEL**: the second-generation MMEL, the original
of its kind. The word borrows from the Latin *primus* (first) and the
Greek *protos* (first, original) &mdash; both ultimately from a root
meaning *foremost*. Primmel is the foremost modelling language for
executable standards.

It also reads as a torch-bearer: the first to carry the MMEL flame into
the next generation, lighting the way for the standards organizations,
certifiers, and regulators who follow.

### The Logo

The Primmel logo is an **open brush circle (ensō)** enclosing a single
**small square**. It is drawn from classical Tao philosophy.

<div class="logo-breakdown">
  <img src="/primmel-logo-icon-light.svg" alt="Primmel logo icon" />
  <div class="description">
    <h3>The Ensō &mdash; the Open Way</h3>
    <p>
      The outer brush circle is an <em>ensō</em>: a single stroke,
      deliberately left open. In the Tao Te Ching, the usefulness of a
      vessel is its <em>emptiness</em>, not its form (ch. 11). The
      opening in the circle is the door through which new things enter.
      A standard that cannot be extended is dead; the open ensō marks
      Primmel as a language meant to be lived in, not merely cited.
    </p>
    <h3>The Square &mdash; the Uncarved Block</h3>
    <p>
      Within the circle sits a single small square &mdash; the
      <em>uncarved block</em> (樸, <em>pǔ</em>) of Taoist thought. It is
      the original, undefined potential from which all forms are cut. In
      Primmel terms: the primitive, the foundational element, the
      smallest unit a model is built from. One block, contained,
      complete.
    </p>
    <h3>Round Heaven, Square Earth</h3>
    <p>
      The composition draws from the ancient Chinese cosmology of
      <em>tiān yuán dì fāng</em> (天圓地方): heaven is round, earth is
      square. The round heaven is the way &mdash; infinite, dynamic,
      executable. The square earth is the defined, the stable, the
      standard. The model exists in the space where these two meet.
    </p>
    <h3>The Single Brushstroke</h3>
    <p>
      The ensō is drawn in one continuous, tapered movement &mdash;
      <em>wú wéi</em> (無為), effortless action. No seam, no joint, no
      assembled parts. It is the visual counterpart of Primmel's
      promise: one model, one source of truth, no seams between
      document and code.
    </p>
  </div>
</div>

### Light & Dark Mode Logos

The Primmel logo adapts to light and dark backgrounds by lifting the
saturation of its indigo brushstroke, while the contained square
retains its warm amber:

<div class="logo-showcase">
  <div class="logo-card light-card">
    <div class="logo-card-header">Light Mode</div>
    <img
      src="/primmel-logo-full-light.svg"
      alt="Primmel full logo — light mode"
      class="logo-display"
    />
  </div>
  <div class="logo-card dark-card">
    <div class="logo-card-header">Dark Mode</div>
    <img
      src="/primmel-logo-full-dark.svg"
      alt="Primmel full logo — dark mode"
      class="logo-display"
    />
  </div>
</div>

<style scoped>
.logo-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}
.logo-card {
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
}
.logo-card-header {
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.light-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
}
.light-card .logo-card-header { color: #475569; }
.dark-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid #334155;
}
.dark-card .logo-card-header { color: #94a3b8; }
.logo-display {
  max-width: 280px;
  width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>

### The Colors

The Primmel palette pairs a deep indigo brushstroke with a single warm
amber accent:

<div class="torch-legend">
  <div class="torch-swatch indigo"></div>
  <div><strong>Indigo &mdash; #1e3a8a</strong><span>The ink of the ensō. Deep, formal, contemplative &mdash; the colour of a standard taken seriously.</span></div>

  <div class="torch-swatch indigo-light"></div>
  <div><strong>Sky Indigo &mdash; #60a5fa</strong><span>The dark-mode brushstroke. Lifts the ink so the line stays luminous against dark backgrounds.</span></div>

  <div class="torch-swatch amber"></div>
  <div><strong>Amber &mdash; #f59e0b</strong><span>The contained square. Warm where the ink is cool, earth where heaven is round.</span></div>

  <div class="torch-swatch void"></div>
  <div><strong>The Void &mdash; #ffffff / transparent</strong><span>The empty centre of the ensō. The part of the vessel that makes it useful &mdash; not a colour, but the absence the rest implies.</span></div>
</div>

<style scoped>
.torch-legend {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 1rem 1.5rem;
  margin: 2rem 0;
  align-items: center;
}
.torch-swatch {
  width: 56px;
  height: 32px;
  border-radius: 6px;
}
.torch-swatch.indigo { background: #1e3a8a; }
.torch-swatch.indigo-light { background: #60a5fa; }
.torch-swatch.amber { background: #f59e0b; }
.torch-swatch.void {
  background:
    linear-gradient(135deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%),
    repeating-conic-gradient(#e2e8f0 0 25%, #fff 0 50%) 0 0 / 12px 12px;
  border: 1px solid #cbd5e1;
}
.torch-legend strong {
  display: block;
  margin-bottom: 0.15rem;
  color: var(--vp-c-text-1);
}
.torch-legend span {
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.5;
}
</style>

## Origin Story

Primmel is the successor to **MMEL (Multi-Modal Modelling Language)**,
originally developed jointly by Ribose and the British Standards
Institution (BSI) for the **BSI SMART program**. MMEL was used to give
SMART standards a single, executable, machine-readable form: process
flows, data requirements, evidential requirements, and the mappings
between them &mdash; all defined in one place and consumable by tools.

MMEL went on to become the basis of **OIML SMART**, the international
metrology certification system under the International Organization of
Legal Metrology. OIML SMART publishes international recommendations that
apply to legal metrology certification &mdash; the publication and
dissemination of requirements, conformance tests, and test report forms
&mdash; from test laboratories to evaluation agencies, manufacturers,
and users of devices.

Primmel carries that work into its second generation: the same
discipline, the same rigor, and the same ambition to make standards
*instantly available* &mdash; now made public so any standards
organization can model its work in an executable form.

## Mission Statement

Primmel's mission is to make standards **executable, mappable, and
auditable as a single source of truth** &mdash; not as separate
documents, spreadsheets, and PDFs that drift apart the moment they're
published.

We believe a standard should be:

- **Instantly available** &mdash; not behind a paywall, not in a 600-page
  PDF that no one reads end-to-end, but in a form that machines and
  humans can both consume.
- **Executable** &mdash; its process flows, data requirements, and
  evidential requirements defined precisely enough that a computer can
  check, run, and reason about them.
- **Extensible** &mdash; each adopting organization can map its own
  processes and controls onto the standard without forking the source.
- **Auditable** &mdash; an auditor should be able to locate compliance
  evidence by following the model, not by digging through folders.

## The Power of the Implementation Model

The real power of Primmel is the **implementation model**: an
organization's own working model that maps its processes and
requirements onto the elements of any Primmel-modelled standard.

A standards publisher publishes the reference model. Each organization
that adopts the standard publishes its implementation model &mdash; the
same primitives, but specialized to their context, with their own data,
their own actors, their own evidence.

An auditor, a procurement officer, a regulator, or an integrator can
then navigate from the reference standard down into any implementation
model and see, structurally, where compliance is asserted, where
evidence is attached, and where gaps remain.

This is what *single source of truth, extensible* looks like in practice.

## Use Cases

<div class="use-cases-grid">
  <div class="use-case-card">
    <h4>Standards Publishers</h4>
    <p>Publish standards in a form readers can navigate, integrate, and test against &mdash; not only read.</p>
  </div>
  <div class="use-case-card">
    <h4>Conformity Assessors</h4>
    <p>Audit by following the model. Locate evidential requirements and trace them to evidence in any adopting organization.</p>
  </div>
  <div class="use-case-card">
    <h4>Regulators</h4>
    <p>Model regulatory frameworks once, then map to every licensee, every certificate, every reporting cycle.</p>
  </div>
  <div class="use-case-card">
    <h4>Industry Consortia</h4>
    <p>Maintain a common baseline across members, with each member's implementation as a specialization.</p>
  </div>
  <div class="use-case-card">
    <h4>Tooling Vendors</h4>
    <p>Consume Primmel models as input: editors, validators, dashboards, test harnesses, evidence collectors.</p>
  </div>
  <div class="use-case-card">
    <h4>Integrators</h4>
    <p>Bind Primmel models to real systems: data registries, process engines, compliance trackers.</p>
  </div>
</div>

<style scoped>
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.use-case-card {
  padding: 1.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}
.use-case-card h4 {
  color: #1e3a8a;
  margin: 0 0 0.5rem;
}
:global(.dark) .use-case-card h4 {
  color: #60a5fa;
}
.use-case-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.55;
}
</style>

## Primitives at a Glance

Primmel combines what existing modelling languages leave scattered:

- **Data primitives** &mdash; classes, enums, references, with cardinality
  (a la UML).
- **Process primitives** &mdash; start events, end events, gateways,
  processes, subprocesses (a la BPMN).
- **Compliance primitives** &mdash; provisions with RFC 2119 modality
  (SHALL, SHOULD, MAY, CAN, MUST).
- **Measurement primitives** &mdash; numeric, datalist, derived values
  for quantitative monitoring.
- **Mapping primitives** &mdash; links and alignments between models
  (`.prm` files).
- **Evidential primitives** &mdash; hooks for attaching evidence to any
  requirement, traceable by auditors.

## Standards &amp; Adoption

Primmel is built on the legacy of MMEL, which has been adopted for:

- **OIML SMART** &mdash; international legal metrology certification
  (publication, conformance tests, test report forms).
- **BSI SMART** &mdash; the British Standards Institution's SMART program
  for executable standards.
- **QMS, ISMS, MDSAP, ISO 13485, ISO 14971, ISO 27001** &mdash; quality,
  information security, and medical-device management systems modelled in
  the legacy MMEL.
- **BS 20400, BS 44003, BS 16341** &mdash; British Standards modelled as
  reference Primmel/MMEL artifacts.

## Open Source

Primmel is an open project. Its specifications, examples, and tools are
available to the public:

- **Specifications**: published openly under permissive terms.
- **Examples**: real models from the MMEL legacy, kept as reference and
  learning material.
- **Tools**: editors, validators, and runtime support &mdash; all
  community-driven.
- **Contributing**: standards organizations, tool authors, and adopters
  are invited to participate.

## Get Started

Ready to model a standard in Primmel? Here's the path:

1. **Read the introduction** &mdash; start with
   [Introduction](/docs/introduction).
2. **See a first model** &mdash; work through
   [A First Model](/docs/first-model).
3. **Browse the examples** &mdash; real MMEL models converted to Primmel,
   in [Examples](/docs/examples/).
4. **Read the full specification** &mdash; at
   [primmel.org/spec](https://www.primmel.org/spec/).
5. **Try a model** &mdash; load a model in your editor of choice and
   explore its primitives, processes, and provisions.

---

*An open source project maintained by [Ribose](https://www.ribose.com)*
in collaboration with the standards community.