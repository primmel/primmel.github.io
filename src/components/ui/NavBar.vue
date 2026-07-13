<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import SearchButton from './SearchButton.vue'

defineOptions({ inheritAttrs: false })

interface NavItem {
  text: string
  href: string
}

const props = defineProps<{
  navItems: NavItem[]
  siteTitle: string
  githubUrl: string
}>()

const mobileOpen = ref(false)

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  document.body.style.overflow = mobileOpen.value ? 'hidden' : ''
}

function closeMobile() {
  mobileOpen.value = false
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMobile()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('astro:after-swap', closeMobile)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('astro:after-swap', closeMobile)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <!-- Logo + title -->
      <a href="/" class="brand">
        <img src="/primmel-logo-light.svg" class="brand-logo logo-light" alt="Primmel" width="28" height="28" />
        <img src="/primmel-logo-dark.svg" class="brand-logo logo-dark" alt="Primmel" width="28" height="28" />
        <span class="brand-text">{{ siteTitle }}</span>
      </a>

      <!-- Desktop nav links -->
      <nav class="desktop-nav">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="nav-link"
        >
          {{ item.text }}
        </a>
      </nav>

      <!-- Actions (always visible) -->
      <div class="nav-actions">
        <SearchButton />
        <ThemeToggle />
        <a :href="githubUrl" class="github-icon" aria-label="GitHub repository" target="_blank" rel="noopener">
          <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="hamburger"
        :class="{ 'is-open': mobileOpen }"
        aria-label="Toggle navigation menu"
        :aria-expanded="mobileOpen"
        @click="toggleMobile"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile slide-in drawer -->
    <Transition name="drawer">
      <nav v-if="mobileOpen" class="mobile-drawer">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="drawer-link"
          @click="closeMobile"
        >
          {{ item.text }}
        </a>
      </nav>
    </Transition>

    <!-- Backdrop -->
    <Transition name="fade">
      <div v-if="mobileOpen" class="drawer-backdrop" @click="closeMobile"></div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-cream);
  border-bottom: 1px solid var(--color-rule);
  backdrop-filter: saturate(140%) blur(8px);
}

.navbar-inner {
  max-width: 1300px;
  margin: 0 auto;
  height: 60px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.brand-logo {
  width: 28px;
  height: 28px;
}
.logo-light { display: inline; }
.logo-dark { display: none; }
:global(.dark) .logo-light { display: none; }
:global(.dark) .logo-dark { display: inline; }

/* Desktop nav */
.desktop-nav {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}
.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-2);
  text-decoration: none;
  transition: color var(--dur-fast) ease;
}
.nav-link:hover {
  color: var(--color-ink);
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}
.github-icon {
  color: var(--color-text-2);
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: color var(--dur-fast) ease;
}
.github-icon:hover {
  color: var(--color-ink);
}

/* Hamburger — hidden on desktop */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-ink);
  border-radius: 1px;
  transition: transform var(--dur-base) ease, opacity var(--dur-base) ease;
}
.hamburger.is-open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.hamburger.is-open span:nth-child(2) {
  opacity: 0;
}
.hamburger.is-open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile drawer */
.mobile-drawer {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 280px;
  background: var(--color-surface);
  border-right: 1px solid var(--color-rule);
  padding: 1.5rem 0;
  overflow-y: auto;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.drawer-link {
  display: block;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-2);
  text-decoration: none;
  transition: background var(--dur-fast) ease, color var(--dur-fast) ease;
}
.drawer-link:hover {
  background: var(--color-surface-2);
  color: var(--color-ink);
}

.drawer-backdrop {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 98;
  cursor: pointer;
}

/* Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform var(--dur-slow) ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-base) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive: show hamburger, hide desktop nav */
@media (max-width: 768px) {
  .navbar-inner {
    padding: 0 1.25rem;
    gap: 1rem;
  }
  .desktop-nav {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .nav-actions {
    margin-left: 0;
  }
  /* On very small screens, hide search text to save space */
  .brand-text {
    display: none;
  }
}
</style>
