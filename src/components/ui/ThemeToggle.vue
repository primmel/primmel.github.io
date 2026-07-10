<script setup lang="ts">
function toggle() {
  const html = document.documentElement
  html.classList.toggle('dark')
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
}
</script>

<template>
  <button
    @click="toggle"
    aria-label="Toggle dark mode"
    class="w-[30px] h-[30px] flex items-center justify-center border border-rule rounded-md bg-surface text-sm transition-colors duration-100 hover:border-indigo-mid"
  >
    <span class="dark:hidden">&#9788;</span>
    <span class="hidden dark:inline">&#9790;</span>
  </button>
</template>