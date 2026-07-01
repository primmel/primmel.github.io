<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function onScroll() {
  const doc = document.documentElement
  const scrollTop = doc.scrollTop || document.body.scrollTop
  const scrollHeight = doc.scrollHeight - doc.clientHeight
  progress.value = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div
    class="scroll-progress"
    :style="{ '--progress': progress + '%' }"
    aria-hidden="true"
  />
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: var(--progress, 0%);
  background: var(--primmel-amber);
  z-index: 100;
  pointer-events: none;
  transition: width 0.08s linear;
  box-shadow: 0 0 8px rgba(180, 83, 9, 0.35);
}
.dark .scroll-progress {
  background: var(--primmel-amber-bright);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.35);
}
</style>