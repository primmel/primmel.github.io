<script setup lang="ts">
const features = [
  { num: '01', title: 'Executable standards', body: 'Process requirements and data requirements expressed in a language a computer can read and run — not just a document humans have to interpret.' },
  { num: '02', title: 'Single source of truth', body: 'One canonical model per standard. Auditors, implementers, and certifiers all read from the same artefact, eliminating drift between document, code, and evidence.' },
  { num: '03', title: 'Mapping and extension',  body: 'Map your own processes and controls onto the elements of any Primmel-modelled standard. Reuse, extend, and specialise without forking the source.' },
  { num: '04', title: 'Process and data primitives', body: 'Built-in primitives for classes, processes, gateways, provisions, and measurements — what BPMN and UML wish they had for standards work.' },
  { num: '05', title: 'Evidence built in', body: 'Every requirement carries evidential hooks. Auditors locate compliance evidence by following the model, not by digging through folders.' },
  { num: '06', title: 'Open and vendor-neutral', body: 'A public language, available for any standards organisation to adopt. Built on the legacy of the BSI SMART and OIML SMART programmes.' },
]

const pillars = [
  { num: '01', name: 'Define',    desc: 'A reference publisher — standards body, industry consortium, regulator, or any organisation — authors a reference model and publishes it for others to map to.' },
  { num: '02', name: 'Implement', desc: 'An organisation maintains its own implementation model: a standing digital twin of its actual operations, existing whether or not any standard is in scope.' },
  { num: '03', name: 'Adopt',     desc: 'The organisation takes up a reference model. It modifies the implementation as needed and declares mappings from implementation elements to reference elements.' },
  { num: '04', name: 'Operate',   desc: 'The organisation runs the implementation in production. Each process execution produces records — the evidence of conformance on the ground.' },
  { num: '05', name: 'Audit',     desc: 'An auditor follows the mapping from each reference requirement to its implementation elements, then to the operational evidence. A structural compliance verdict.' },
]
</script>

<template>
  <div class="primmel-home">

    <!-- ─────────────────────── HERO ─────────────────────── -->
    <section class="home-hero">
      <img
        class="home-hero-logo light-only"
        src="/primmel-logo-light.svg"
        alt="Primmel"
      />
      <img
        class="home-hero-logo dark-only"
        src="/primmel-logo-dark.svg"
        alt="Primmel"
      />

      <p class="eyebrow">An executable language for SMART standards</p>

      <h1>Standards, instantly executable.</h1>

      <p class="tagline">
        Primmel is a typed, machine-readable language for representing
        ISO, BSI, and OIML standards as
        <strong>runnable programs</strong>. Process flows, data
        requirements, and evidential hooks in one plain-text file.
      </p>

      <div class="actions">
        <a class="VPButton brand" href="/docs/introduction">Read the introduction</a>
        <a class="VPButton alt" href="/docs/examples/">Browse the examples</a>
      </div>
    </section>

    <!-- ──────────────── THE FIVE PILLARS ────────────────── -->
    <section class="section">
      <p class="section-eyebrow">Architecture</p>
      <h2 class="section-title">
        Five activities, one lifecycle.
      </h2>
      <p class="section-description">
        From the moment a reference model is published to the moment
        an auditor hands down a verdict — each activity has a distinct
        actor and a distinct artefact.
      </p>

      <nav class="pillars-list">
        <a
          v-for="p in pillars"
          :key="p.name"
          class="pillar"
          :href="`/docs/architecture/${p.name.toLowerCase()}`"
        >
          <span class="num">{{ p.num }}</span>
          <span class="name">{{ p.name }}</span>
          <span class="desc">{{ p.desc }}</span>
          <span class="arrow">→</span>
        </a>
      </nav>
    </section>

    <!-- ────────────────── WHY PRIMMEL ───────────────────── -->
    <section class="section">
      <p class="section-eyebrow">Why Primmel</p>
      <h2 class="section-title">
        A modelling language built for the work standards actually do.
      </h2>

      <div class="features-list">
        <article
          v-for="f in features"
          :key="f.num"
          class="feature"
        >
          <span class="num">{{ f.num }}</span>
          <div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.body }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- ──────────────────── FOOTER CTA ──────────────────── -->
    <section class="home-footer-cta">
      <h2>
        From BSI SMART and OIML SMART, into the public record.
      </h2>
      <a class="VPButton alt" href="/about">Read the story →</a>
    </section>

  </div>
</template>

<style scoped>
.primmel-home { width: 100%; }
.dark-only { display: none; }
.light-only { display: block; }
.dark .dark-only { display: block; }
.dark .light-only { display: none; }
</style>