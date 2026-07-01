<script setup lang="ts">
import { useData } from 'vitepress'

const { site } = useData()
</script>

<template>
  <div class="primmel-home">
    <section class="home-hero">
      <img
        class="home-hero-logo"
        src="/primmel-logo-light.svg"
        alt="Primmel"
      />
      <h1>{{ site.title }}</h1>
      <p class="tagline">
        Standards, instantly available &mdash; not as static reference, but as
        <strong>executable programs</strong> you can integrate into your
        management system.
      </p>
      <p>
        <a class="VPButton VPButtonBrand" href="/docs/introduction">
          Get Started
        </a>
        <a class="VPButton" href="/about" style="margin-left: 0.75rem;">
          About Primmel
        </a>
      </p>
    </section>

    <section class="section">
      <h2 class="section-title">Why Primmel?</h2>
      <p class="section-description">
        Primmel is a domain-specific modelling language for turning SMART
        standards into executable artifacts: process flows, data requirements,
        and evidential requirements &mdash; all in one machine-readable form.
      </p>

      <div class="features-grid">
        <div class="feature-card">
          <h3>Executable Standards</h3>
          <p>
            Logic, process requirements, and data requirements expressed in a
            language a computer can read and run &mdash; not just a document
            humans have to interpret.
          </p>
        </div>
        <div class="feature-card">
          <h3>Single Source of Truth</h3>
          <p>
            One canonical model per standard. Auditors, implementers, and
            certifiers all read from the same artifact, eliminating drift.
          </p>
        </div>
        <div class="feature-card">
          <h3>Mapping &amp; Extension</h3>
          <p>
            Map your own processes and controls onto the elements of any
            Primmel-modelled standard. Reuse, extend, and specialize without
            forking the source.
          </p>
        </div>
        <div class="feature-card">
          <h3>Process &amp; Data Primitives</h3>
          <p>
            Built-in primitives for classes, processes, gateways, provisions,
            measurements &mdash; what BPMN and UML wish they had for
            standards.
          </p>
        </div>
        <div class="feature-card">
          <h3>Evidence Built In</h3>
          <p>
            Every requirement carries evidential hooks. Auditors locate
            compliance evidence by following the model, not by digging through
            folders.
          </p>
        </div>
        <div class="feature-card">
          <h3>Open &amp; Vendor-Neutral</h3>
          <p>
            A public, second-generation language &mdash; available for any
            standards organization to adopt.
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">From the legacy</h2>
      <p class="section-description">
        Primmel was developed jointly by Ribose and BSI for the BSI SMART
        program and adopted as the basis of OIML SMART. The torch is
        carried forward &mdash; same rigor, public availability, ready for
        the next generation of standards.
      </p>
      <p>
        <a class="VPButton" href="/about">Read the story</a>
      </p>
    </section>
  </div>
</template>

<style scoped>
.primmel-home {
  width: 100%;
}

.VPButton + .VPButton {
  margin-left: 0.75rem;
}
</style>