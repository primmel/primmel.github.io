<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ScrollProgress from './ScrollProgress.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <ScrollProgress />
  <Layout>
    <template #not-found>
      <div class="not-found">
        <p class="nf-eyebrow">Page not found</p>
        <h1>4<em>0</em>4</h1>
        <p>
          The page you were looking for is not in this model.
          It may have been moved, renamed, or removed &mdash; or it never
          existed in the first place.
        </p>
        <div class="nf-actions">
          <a class="VPButton brand" href="/">Return home</a>
          <a class="VPButton alt" href="/docs/introduction">Read the introduction</a>
        </div>
      </div>
    </template>

    <template #doc-after>
      <!-- Signature fleuron / brand mark at the bottom of every doc page -->
      <div class="doc-fleuron" aria-hidden="true">
        <svg viewBox="0 0 240 24" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="12" x2="86" y2="12" stroke="currentColor" stroke-width="1" opacity="0.5"/>
          <line x1="154" y1="12" x2="240" y2="12" stroke="currentColor" stroke-width="1" opacity="0.5"/>
          <!-- Centered Primmel monogram fragment: ensō echo + square -->
          <circle cx="120" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <rect x="116.5" y="8.5" width="7" height="7" fill="currentColor"/>
        </svg>
      </div>
    </template>
  </Layout>
</template>