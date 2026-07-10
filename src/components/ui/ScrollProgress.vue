<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function update() {
  const doc = document.documentElement
  const scrollHeight = doc.scrollHeight - doc.clientHeight
  progress.value = scrollHeight > 0
    ? Math.min(100, Math.max(0, (doc.scrollTop / scrollHeight) * 100))
    : 0
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
  update()
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div
    class="fixed top-0 left-0 h-0.5 z-50 pointer-events-none transition-[width] duration-75 ease-linear bg-burgundy dark:bg-ochre"
    :style="{ width: progress + '%' }"
    aria-hidden="true"
  />
</template>