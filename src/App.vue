<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import PageTurnOverlay from './components/PageTurnOverlay.vue'

type PageTurnOverlayHandle = {
  cover: (label: string) => Promise<void>
  reveal: () => Promise<void>
  cancel: () => void
}

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Playground', to: '/playground' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const isMenuOpen = ref(false)
const router = useRouter()
const turnPhase = ref<'idle' | 'covering' | 'covered' | 'revealing'>('idle')
const nextPageLabel = ref('')
const pageTurnRef = ref<PageTurnOverlayHandle>()

const pageLabels: Record<string, string> = {
  home: 'Home',
  projects: 'Projects',
  skills: 'Skills',
  playground: 'Playground',
  about: 'About',
  contact: 'Contact',
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const resetPageTurn = () => {
  pageTurnRef.value?.cancel()
  turnPhase.value = 'idle'
}

const removeBeforeGuard = router.beforeEach(async (to, from) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (from.name == null || to.fullPath === from.fullPath || prefersReducedMotion) return true
  if (turnPhase.value !== 'idle') return false

  const routeName = String(to.name ?? '')
  nextPageLabel.value = pageLabels[routeName] ?? 'Next Page'
  turnPhase.value = 'covering'

  try {
    await pageTurnRef.value?.cover(nextPageLabel.value)
  } catch {
    resetPageTurn()
    return true
  }

  turnPhase.value = 'covered'
  return true
})

const removeAfterGuard = router.afterEach((_to, _from, failure) => {
  if (failure) {
    resetPageTurn()
    return
  }

  if (turnPhase.value !== 'covered') return

  void (async () => {
    await nextTick()
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

    if (turnPhase.value !== 'covered') return

    turnPhase.value = 'revealing'
    try {
      await pageTurnRef.value?.reveal()
    } finally {
      resetPageTurn()
    }
  })()
})

const removeErrorHandler = router.onError(resetPageTurn)

watch(turnPhase, (phase) => {
  document.body.classList.toggle('is-page-turning', phase !== 'idle')
})

onUnmounted(() => {
  resetPageTurn()
  removeBeforeGuard()
  removeAfterGuard()
  removeErrorHandler()
  document.body.classList.remove('is-page-turning')
})
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand-mark" to="/" aria-label="Go home">SSeries</RouterLink>

      <nav class="nav-links" aria-label="Primary navigation">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
          {{ item.label }}
        </RouterLink>
      </nav>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="sidebar-menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        Menu
      </button>
    </header>

    <button
      v-if="isMenuOpen"
      class="sidebar-backdrop"
      type="button"
      aria-label="Close menu"
      @click="closeMenu"
    ></button>

    <aside
      v-if="isMenuOpen"
      id="sidebar-menu"
      class="sidebar-menu"
      :class="{ 'is-open': isMenuOpen }"
    >
      <div class="sidebar-head">
        <span>Navigation</span>
        <button type="button" aria-label="Close menu" @click="closeMenu">Close</button>
      </div>
      <nav aria-label="Sidebar navigation">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" @click="closeMenu">
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <PageTurnOverlay ref="pageTurnRef" :phase="turnPhase" />

    <RouterView />
  </div>
</template>

<style>
@font-face {
  font-family: 'Notebook Handwriting';
  src: url('/notebook/handwriting.ttf') format('truetype');
  font-display: swap;
  font-style: normal;
  font-weight: 400;
}

:root {
  --ink: #36332e;
  --ink-soft: #6f675b;
  --paper: #f7f1e3;
  --paper-light: #fffaf0;
  --paper-deep: #e5dcc6;
  --rule-blue: rgb(92 132 171 / 18%);
  --margin-red: rgb(177 81 72 / 28%);
  --pencil-line: rgb(54 51 46 / 42%);
  color: var(--ink);
  background: var(--paper-deep);
  font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background: var(--paper-deep);
  color: var(--ink);
}

body.is-page-turning {
  overflow: hidden;
}

body::selection {
  background: #d8c77f;
  color: var(--ink);
}

a {
  color: inherit;
}

button,
input,
textarea {
  color: inherit;
  font: inherit;
}

button,
a {
  touch-action: manipulation;
}

:focus-visible {
  outline: 2px dashed var(--ink);
  outline-offset: 4px;
}

h1,
h2,
h3,
.eyebrow,
.panel-kicker,
.project-status,
.experiment-status,
dt,
button,
.nav-links,
.sidebar-menu {
  font-family: 'Notebook Handwriting', 'Segoe Print', cursive;
  font-weight: 400 !important;
}

#app,
.app-shell {
  min-height: 100vh;
}

.app-shell {
  position: relative;
  isolation: isolate;
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 31px,
      var(--rule-blue) 32px,
      transparent 33px
    ),
    var(--paper);
}

.app-shell::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: url('/notebook/paper-grain.svg') repeat;
  content: '';
  opacity: 0.28;
  pointer-events: none;
}

.app-shell::after {
  position: fixed;
  top: 0;
  bottom: 0;
  left: clamp(18px, 2.2vw, 34px);
  z-index: -1;
  width: 2px;
  background: var(--margin-red);
  content: '';
  pointer-events: none;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  min-height: 74px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 13px clamp(20px, 5vw, 72px) 18px;
  background:
    url('/notebook/paper-grain.svg') repeat,
    rgb(247 241 227 / 96%);
  box-shadow: 0 5px 12px rgb(75 65 50 / 9%);
}

.site-header::after {
  position: absolute;
  right: 0;
  bottom: -16px;
  left: 0;
  height: 18px;
  background: url('/notebook/torn-edge.svg') repeat-x bottom / 240px 18px;
  content: '';
  pointer-events: none;
}

.brand-mark {
  position: relative;
  font-family: 'Notebook Handwriting', 'Segoe Print', cursive;
  font-size: 1.75rem;
  line-height: 1;
  text-decoration: none;
  transform: rotate(-1.5deg);
}

.brand-mark::after {
  position: absolute;
  right: -8px;
  bottom: -10px;
  left: -6px;
  height: 12px;
  background: url('/notebook/pencil-underline.svg') center / 100% 100% no-repeat;
  content: '';
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: clamp(10px, 2vw, 24px);
  font-size: 1.18rem;
}

.nav-links a,
.sidebar-menu a {
  position: relative;
  text-decoration: none;
}

.nav-links a::after,
.sidebar-menu a::after {
  position: absolute;
  right: -4px;
  bottom: -8px;
  left: -4px;
  height: 10px;
  background: url('/notebook/pencil-underline.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0;
  transform: scaleX(0.45) rotate(-1deg);
  transform-origin: left;
  transition:
    opacity 140ms ease,
    transform 140ms ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after,
.sidebar-menu a:hover::after,
.sidebar-menu a.router-link-active::after {
  opacity: 0.82;
  transform: scaleX(1) rotate(-1deg);
}

.menu-toggle {
  display: none;
  border: 2px solid var(--ink);
  border-radius: 48% 52% 46% 54% / 52% 44% 56% 48%;
  padding: 6px 14px 8px;
  background: rgb(255 250 240 / 72%);
  cursor: pointer;
  font-size: 1.2rem;
  transform: rotate(1deg);
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  z-index: 29;
  border: 0;
  background: rgb(68 57 43 / 32%);
  cursor: pointer;
}

.sidebar-menu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 30;
  display: grid;
  grid-template-rows: auto 1fr;
  width: min(340px, 90vw);
  height: 100vh;
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 31px,
      var(--rule-blue) 32px,
      transparent 33px
    ),
    url('/notebook/paper-grain.svg') repeat,
    var(--paper-light);
  box-shadow: -12px 0 28px rgb(68 57 43 / 20%);
  clip-path: polygon(
    3% 0,
    100% 0,
    100% 100%,
    2% 100%,
    3.8% 93%,
    1.7% 86%,
    3.5% 78%,
    1.3% 68%,
    4% 58%,
    1.5% 48%,
    3.6% 38%,
    1.2% 28%,
    3.8% 17%,
    1.5% 8%
  );
  animation: sheet-slide 180ms ease-out both;
}

.sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 22px 18px 30px;
  border-bottom: 2px dashed var(--pencil-line);
  font-size: 1.35rem;
}

.sidebar-head button {
  border: 1.5px solid var(--ink);
  border-radius: 48% 52% 44% 56%;
  padding: 5px 10px 7px;
  background: var(--paper-light);
  cursor: pointer;
}

.sidebar-menu nav {
  display: grid;
  align-content: start;
  gap: 22px;
  padding: 28px 26px 28px 36px;
  font-size: 1.5rem;
}

@keyframes sheet-slide {
  from {
    opacity: 0;
    transform: translateX(28px) rotate(0.7deg);
  }

  to {
    opacity: 1;
    transform: translateX(0) rotate(0);
  }
}

@media (max-width: 720px) {
  .nav-links {
    display: none;
  }

  .menu-toggle {
    display: inline-block;
  }

  .app-shell::after {
    left: 12px;
  }

}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .sidebar-menu,
  .nav-links a::after,
  .sidebar-menu a::after {
    animation: none;
    transition: none;
  }

  .page-turn-overlay {
    display: none;
  }
}
</style>
