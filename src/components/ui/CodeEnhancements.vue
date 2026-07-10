<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  addCopyButtons()
  setupScrollSpy()
})

function addCopyButtons() {
  document.querySelectorAll('pre').forEach((pre) => {
    if (pre.querySelector('.copy-btn')) return
    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.textContent = 'Copy'
    btn.setAttribute('aria-label', 'Copy code')
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')
      const text = code ? code.textContent : pre.textContent
      try {
        await navigator.clipboard.writeText(text)
        btn.textContent = 'Copied!'
        setTimeout(() => { btn.textContent = 'Copy' }, 1500)
      } catch { btn.textContent = 'Failed' }
    })
    pre.appendChild(btn)
  })
}

function setupScrollSpy() {
  const headings = document.querySelectorAll('h2[id], h3[id]')
  const links = document.querySelectorAll('.outline a')
  if (headings.length === 0 || links.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          links.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`)
          })
        }
      })
    },
    { rootMargin: '-80px 0px -70% 0px' }
  )
  headings.forEach((h) => observer.observe(h))
}
</script>

<template>
  <!-- invisible wrapper — this component only runs client-side effects -->
  <span class="hidden" aria-hidden="true" />
</template>