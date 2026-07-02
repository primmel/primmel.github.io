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
  { num: '01', name: 'Define',    desc: 'A reference publisher — standards body, industry consortium, regulator, or any organisation — authors a reference model and publishes it for others to consume.' },
  { num: '02', name: 'Reference', desc: 'Readers consume the published model: navigate the standard, run its test procedures, check dimensional and formula requirements, evaluate whether a product or process complies.' },
  { num: '03', name: 'Implement', desc: 'An organisation maintains its digital twin, takes up a reference, customizes to satisfy it, and declares mappings. Closes when every reference element → ≥1 impl element (Statement of Applicability).' },
  { num: '04', name: 'Operate',   desc: 'Operators run the implementation in production. Each process execution produces records — the evidence of conformance on the ground.' },
  { num: '05', name: 'Audit',     desc: 'An auditor navigates the standard like readers, correlates through mappings to find the implementation, and views evidence like operators. A structural compliance verdict.' },
]
</script>

<template>
  <div class="primmel-home">

    <!-- ─────────────────────── HERO ─────────────────────── -->
    <section class="home-hero">

      <div class="hero-content">
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

        <h1>Standards,<br /><em>instantly</em> executable.</h1>

        <p class="tagline">
          Primmel is a typed, machine-readable language for
          representing ISO, BSI, and OIML standards as
          <strong>runnable programs</strong>. Process flows, data
          requirements, and evidential hooks in one plain-text file.
        </p>

        <div class="actions">
          <a class="VPButton brand" href="/docs/introduction">Read the introduction</a>
          <a class="VPButton alt" href="/examples/">Browse the examples</a>
        </div>
      </div>

      <!-- Hero lifecycle diagram -->
      <div class="hero-visual">
        <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The five-pillar lifecycle">
          <defs>
            <linearGradient id="g-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--primmel-surface)"/>
              <stop offset="100%" stop-color="var(--primmel-surface-2)"/>
            </linearGradient>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--primmel-rule-strong)"/>
            </marker>
          </defs>

          <!-- Outer frame -->
          <rect x="8" y="8" width="464" height="464" rx="8" fill="url(#g-bg)" stroke="var(--primmel-rule)" stroke-width="1"/>

          <!-- Center cycle indicator -->
          <circle cx="240" cy="240" r="48" fill="none" stroke="var(--primmel-rule-strong)" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="240" y="232" text-anchor="middle" font-family="var(--primmel-display)" font-size="14" font-style="italic" fill="var(--primmel-text-3)">lifecycle</text>
          <text x="240" y="254" text-anchor="middle" font-family="var(--primmel-mono)" font-size="9" fill="var(--primmel-text-3)" letter-spacing="1.5">5 PILLARS</text>

          <!-- Connecting arrows around the cycle (clockwise) -->
          <g stroke="var(--primmel-rule-strong)" stroke-width="1" fill="none" marker-end="url(#arrow)">
            <path d="M 275 75 Q 350 95 374 135"/>
            <path d="M 405 200 Q 410 285 354 335"/>
            <path d="M 294 380 Q 240 395 186 380"/>
            <path d="M 126 335 Q 70 285 75 200"/>
            <path d="M 106 135 Q 130 95 205 75"/>
          </g>

          <!-- Five pillar nodes -->
          <g font-family="var(--primmel-display)" font-weight="400">
            <g transform="translate(240 70)">
              <circle r="36" fill="var(--primmel-surface-2)" stroke="var(--primmel-indigo)" stroke-width="1.5"/>
              <text y="-2" text-anchor="middle" font-size="10" fill="var(--primmel-burgundy)" font-family="var(--primmel-mono)">01</text>
              <text y="14" text-anchor="middle" font-size="14" fill="var(--primmel-ink)">Define</text>
            </g>
            <g transform="translate(385 165)">
              <circle r="36" fill="var(--primmel-surface-2)" stroke="var(--primmel-indigo)" stroke-width="1.5"/>
              <text y="-2" text-anchor="middle" font-size="10" fill="var(--primmel-burgundy)" font-family="var(--primmel-mono)">02</text>
              <text y="14" text-anchor="middle" font-size="13" fill="var(--primmel-ink)">Implement</text>
            </g>
            <g transform="translate(330 360)">
              <circle r="36" fill="var(--primmel-surface-2)" stroke="var(--primmel-burgundy)" stroke-width="1.5"/>
              <text y="-2" text-anchor="middle" font-size="10" fill="var(--primmel-burgundy)" font-family="var(--primmel-mono)">03</text>
              <text y="14" text-anchor="middle" font-size="15" fill="var(--primmel-ink)">Adopt</text>
            </g>
            <g transform="translate(150 360)">
              <circle r="36" fill="var(--primmel-surface-2)" stroke="var(--primmel-olive)" stroke-width="1.5"/>
              <text y="-2" text-anchor="middle" font-size="10" fill="var(--primmel-burgundy)" font-family="var(--primmel-mono)">04</text>
              <text y="14" text-anchor="middle" font-size="13" fill="var(--primmel-ink)">Operate</text>
            </g>
            <g transform="translate(95 165)">
              <circle r="36" fill="var(--primmel-surface-2)" stroke="var(--primmel-ochre)" stroke-width="1.5"/>
              <text y="-2" text-anchor="middle" font-size="10" fill="var(--primmel-burgundy)" font-family="var(--primmel-mono)">05</text>
              <text y="14" text-anchor="middle" font-size="15" fill="var(--primmel-ink)">Audit</text>
            </g>
          </g>
        </svg>
      </div>

    </section>

    <!-- ──────────────── THE FIVE PILLARS ────────────────── -->
    <section class="section">
      <p class="section-eyebrow">Architecture</p>
      <h2 class="section-title">
        Five activities, <em>one</em> lifecycle.
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
          :href="`/architecture/${p.name.toLowerCase()}`"
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
        A modelling language built for the work standards <em>actually</em> do.
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
        From <em>BSI SMART</em> and <em>OIML SMART</em>,<br />
        into the public record.
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