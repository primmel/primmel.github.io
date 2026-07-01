<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #not-found>
      <div class="not-found">
        <p class="nf-eyebrow">Page not found</p>
        <h1>4<em>0</em>4</h1>
        <p>
          The page you were looking for is not in this model.
          It may have been moved, renamed, or removed — or it never
          existed in the first place.
        </p>
        <div class="nf-actions">
          <a class="VPButton brand" href="/">Return home</a>
          <a class="VPButton alt" href="/docs/introduction">Read the introduction</a>
        </div>
      </div>
    </template>
  </Layout>
</template>