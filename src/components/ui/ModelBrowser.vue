<script setup lang="ts">
import { ref } from 'vue'
import type { ModelTree } from '../../lib/model-parser'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ tree: ModelTree }>()

const collapsed = ref<Set<string>>(new Set())

function toggle(label: string) {
  if (collapsed.value.has(label)) {
    collapsed.value.delete(label)
  } else {
    collapsed.value.add(label)
  }
  collapsed.value = new Set(collapsed.value)
}

function isCollapsed(label: string) {
  return collapsed.value.has(label)
}

const totalItems = props.tree.groups.reduce((sum, g) => sum + g.items.length, 0)
</script>

<template>
  <div class="model-browser">
    <header class="browser-header">
      <span class="browser-title">{{ tree.title }}</span>
      <span class="browser-count">{{ totalItems }} elements</span>
    </header>
    <div class="browser-body">
      <details v-for="group in tree.groups" :key="group.label" class="browser-group" open>
        <summary @click.prevent="toggle(group.label)">
          <span class="group-chevron" :class="{ collapsed: isCollapsed(group.label) }">&#9662;</span>
          <span class="group-label">{{ group.label }}</span>
          <span class="group-count">{{ group.items.length }}</span>
        </summary>
        <ul v-show="!isCollapsed(group.label)" class="group-items">
          <li v-for="item in group.items" :key="item.id" class="tree-item">
            <code class="item-id">{{ item.id }}</code>
            <span v-if="item.label !== item.id" class="item-label">{{ item.label }}</span>
            <span v-if="item.detail" class="item-detail">{{ item.detail }}</span>
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>

<style scoped>
.model-browser {
  border: 1px solid var(--color-rule);
  border-radius: 6px;
  background: var(--color-surface);
  overflow: hidden;
  font-family: var(--font-body);
}
.browser-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-rule);
  background: var(--color-surface-2);
}
.browser-title {
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--color-ink);
}
.browser-count {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text-3);
}
.browser-body {
  padding: 0.5rem 0;
  max-height: 400px;
  overflow-y: auto;
}
.browser-group {
  margin: 0;
}
.browser-group summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  cursor: pointer;
  user-select: none;
  list-style: none;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-burgundy);
}
.browser-group summary::-webkit-details-marker { display: none; }
:global(.dark) .browser-group summary { color: var(--color-ochre); }
.group-chevron {
  display: inline-block;
  font-size: 0.7rem;
  transition: transform var(--dur-fast) ease;
}
.group-chevron.collapsed { transform: rotate(-90deg); }
.group-count {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-3);
  font-weight: 400;
  letter-spacing: 0;
}
.group-items {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tree-item {
  padding: 0.25rem 1rem 0.25rem 2rem;
  font-size: 0.82rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.tree-item:hover { background: var(--color-surface-2); }
.item-id {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-indigo);
}
:global(.dark) .item-id { color: var(--color-indigo-mid); }
.item-label {
  color: var(--color-text-2);
  font-size: 0.8rem;
}
.item-detail {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-3);
  margin-left: auto;
}
</style>
