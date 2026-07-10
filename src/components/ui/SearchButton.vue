<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const pagefindLoaded = ref(false)

function open() {
  isOpen.value = true
  if (!pagefindLoaded.value) {
    pagefindLoaded.value = true
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/pagefind/pagefind-ui.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = '/pagefind/pagefind-ui.js'
    script.onload = () => {
      if (window.PagefindUI) {
        new window.PagefindUI({
          element: '#pagefind-search',
          showSubResults: true,
        })
      }
    }
    document.body.appendChild(script)
  }
}

function close() {
  isOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value ? close() : open()
  }
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <button
    @click="open"
    aria-label="Search"
    class="flex items-center gap-1.5 px-2.5 py-1 text-sm text-text-3 bg-surface border border-rule rounded-md cursor-pointer transition-colors duration-100 hover:border-indigo-mid"
  >
    <span>Search</span>
    <kbd class="font-mono text-xs px-1 py-0.5 bg-surface-2 border border-rule-strong rounded-sm">⌘K</kbd>
  </button>

  <Teleport to="body">
    <div
      v-if="isOpen"
      @click.self="close"
      class="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[10vh]"
    >
      <div class="relative w-[90%] max-w-[600px] bg-cream border border-rule-strong rounded-lg p-6 shadow-2xl">
        <div id="pagefind-search" />
        <button
          @click="close"
          aria-label="Close search"
          class="absolute top-3 right-3 w-7 h-7 text-xl leading-none border-none bg-transparent text-text-3 cursor-pointer hover:text-ink"
        >
          &times;
        </button>
      </div>
    </div>
  </Teleport>
</template>