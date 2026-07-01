<script setup lang="ts">
import { useData } from 'vitepress'

const { site } = useData()

const features = [
  {
    num: '01',
    title: 'Executable Standards',
    body: 'Logic, process requirements, and data requirements expressed in a language a computer can read and run — not just a document humans have to interpret.',
  },
  {
    num: '02',
    title: 'Single Source of Truth',
    body: 'One canonical model per standard. Auditors, implementers, and certifiers all read from the same artifact, eliminating drift between document, code, and evidence.',
  },
  {
    num: '03',
    title: 'Mapping & Extension',
    body: 'Map your own processes and controls onto the elements of any Primmel-modelled standard. Reuse, extend, and specialise without forking the source.',
  },
  {
    num: '04',
    title: 'Process & Data Primitives',
    body: 'Built-in primitives for classes, processes, gateways, provisions, and measurements — what BPMN and UML wish they had for standards work.',
  },
  {
    num: '05',
    title: 'Evidence Built In',
    body: 'Every requirement carries evidential hooks. Auditors locate compliance evidence by following the model, not by digging through folders.',
  },
  {
    num: '06',
    title: 'Open & Vendor-Neutral',
    body: 'A public language, available for any standards organisation to adopt. Built on the legacy of the BSI SMART and OIML SMART programmes.',
  },
]

const pillars = [
  { num: '01', name: 'Define',  role: 'Reference publisher' },
  { num: '02', name: 'Implement', role: 'The digital twin' },
  { num: '03', name: 'Adopt',   role: 'Statement of Applicability' },
  { num: '04', name: 'Operate', role: 'Evidence on the ground' },
  { num: '05', name: 'Audit',   role: 'Compliance verdict' },
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

      <h1>
        Standards,<br />
        <em>instantly</em> executable.
      </h1>

      <p class="tagline">
        Not a static reference, but a
        <strong>runnable program</strong> — process flows, data
        requirements, and evidential hooks in a single machine-readable
        form. Maintained by Ribose with BSI, OIML, and the standards
        community.
      </p>

      <div class="actions">
        <a class="VPButton brand" href="/docs/introduction">Read the introduction</a>
        <a class="VPButton alt" href="/docs/examples/">Browse the examples</a>
      </div>
    </section>

    <!-- ──────────────── THE FIVE PILLARS ────────────────── -->
    <section class="section">
      <p class="section-eyebrow">The architecture</p>
      <h2 class="section-title">
        Five pillars, one lifecycle.
      </h2>
      <p class="section-description">
        From the moment a reference model is published to the moment an
        auditor hands down a verdict — five distinct activities, each
        with its own actor and its own artefact. MECE by design.
      </p>

      <nav class="pillars-grid">
        <a
          v-for="p in pillars"
          :key="p.name"
          class="pillar"
          :href="`/docs/architecture/${p.name.toLowerCase()}`"
        >
          <span class="num">No. {{ p.num }}</span>
          <span class="name">{{ p.name }}</span>
          <span class="role">{{ p.role }}</span>
        </a>
      </nav>
    </section>

    <!-- ────────────────── WHY PRIMMEL ───────────────────── -->
    <section class="section">
      <p class="section-eyebrow">Why Primmel</p>
      <h2 class="section-title">
        A modelling language built for the work standards actually do.
      </h2>
      <p class="section-description">
        Primmel is a domain-specific language for turning SMART
        standards into executable artefacts: process flows, data
        requirements, and evidential requirements, in one
        machine-readable form.
      </p>

      <div class="features-grid">
        <article
          v-for="f in features"
          :key="f.num"
          class="feature-card"
          :data-num="`№ ${f.num}`"
        >
          <h3>{{ f.title }}</h3>
          <p>{{ f.body }}</p>
        </article>
      </div>
    </section>

    <!-- ──────────────────── FOOTER CTA ──────────────────── -->
    <section class="home-footer-cta">
      <h2>
        From <em>BSI SMART</em> and <em>OIML SMART</em><br />
        into the public record.
      </h2>
      <a class="VPButton alt" href="/about">Read the story →</a>
    </section>

  </div>
</template>

<style scoped>
.primmel-home {
  width: 100%;
}

.dark-only { display: none; }
.light-only { display: inline-block; }

.dark .dark-only { display: inline-block; }
.dark .light-only { display: none; }
</style>