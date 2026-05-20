<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Playground', to: '/playground' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const isMenuOpen = ref(false)
const shellRef = ref<HTMLElement>()
const isPointerInside = ref(false)
const particles = ref<
  {
    id: number
    x: number
    y: number
    dx: number
    dy: number
    rotate: number
    color: string
    size: number
  }[]
>([])
let particleId = 0
let lastParticleAt = 0
let tiltFrame = 0
let latestPointerEvent: PointerEvent | undefined
let activeTiltTarget: HTMLElement | undefined

const particleColors = ['#75f0ff', '#ff5bd7', '#ffffff', '#a9ff68']

const closeMenu = () => {
  isMenuOpen.value = false
}

const resetTilt = () => {
  activeTiltTarget?.style.removeProperty('transform')
  activeTiltTarget = undefined
}

const emitParticle = (event: PointerEvent) => {
  const now = performance.now()

  if (now - lastParticleAt < 70 || particles.value.length > 18) return

  lastParticleAt = now

  const id = particleId++
  const angle = Math.random() * Math.PI * 2
  const distance = 16 + Math.random() * 24
  const particle = {
    id,
    x: event.clientX,
    y: event.clientY,
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance - 18,
    rotate: Math.random() * 220 - 110,
    color: particleColors[id % particleColors.length] ?? '#75f0ff',
    size: 5 + Math.random() * 5,
  }

  particles.value.push(particle)
  window.setTimeout(() => {
    particles.value = particles.value.filter((item) => item.id !== id)
  }, 760)
}

const updateTilt = (event: PointerEvent) => {
  const tiltTarget = (event.target as HTMLElement).closest<HTMLElement>('[data-tilt]')

  if (!tiltTarget) {
    resetTilt()
    return
  }

  if (activeTiltTarget && activeTiltTarget !== tiltTarget) {
    activeTiltTarget.style.removeProperty('transform')
  }

  activeTiltTarget = tiltTarget

  const rect = tiltTarget.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5
  const tiltStrength = tiltTarget.dataset.tiltStrength === 'strong' ? 2 : 1
  const rotateX = (-y * 5 * tiltStrength).toFixed(2)
  const rotateY = (x * 6 * tiltStrength).toFixed(2)

  tiltTarget.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
}

const handlePointerMove = (event: PointerEvent) => {
  if (event.pointerType && event.pointerType !== 'mouse') return

  emitParticle(event)
  latestPointerEvent = event

  if (!tiltFrame) {
    tiltFrame = requestAnimationFrame(() => {
      if (latestPointerEvent) updateTilt(latestPointerEvent)
      tiltFrame = 0
    })
  }
}

const handlePointerEnter = (event: PointerEvent) => {
  if (event.pointerType === 'mouse') {
    isPointerInside.value = true
  }
}

const handlePointerLeave = () => {
  isPointerInside.value = false
  resetTilt()
}

onUnmounted(() => {
  if (tiltFrame) cancelAnimationFrame(tiltFrame)
  resetTilt()
})
</script>

<template>
  <div
    ref="shellRef"
    class="app-shell"
    :class="{ 'is-pointer-inside': isPointerInside }"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    @pointermove="handlePointerMove"
  >
    <div class="galaxy-dust" aria-hidden="true"></div>
    <div class="paper-particles" aria-hidden="true">
      <span
        v-for="particle in particles"
        :key="particle.id"
        :style="{
          '--x': `${particle.x}px`,
          '--y': `${particle.y}px`,
          '--dx': `${particle.dx}px`,
          '--dy': `${particle.dy}px`,
          '--rotate': `${particle.rotate}deg`,
          '--particle-color': particle.color,
          '--particle-size': `${particle.size}px`,
        }"
      ></span>
    </div>

    <header class="site-header">
      <RouterLink class="brand-mark" to="/" aria-label="Go home">
        <img src="/sseries.png" alt="S Series" />
      </RouterLink>

      <nav class="nav-links" aria-label="Primary navigation">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" @click="closeMenu">
          {{ item.label }}
        </RouterLink>
      </nav>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="sidebar-menu"
        aria-label="Open menu"
        @click="isMenuOpen = true"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <button
      v-if="isMenuOpen"
      class="sidebar-backdrop"
      type="button"
      aria-label="Close menu"
      @click="closeMenu"
    ></button>

    <aside id="sidebar-menu" class="sidebar-menu" :class="{ 'is-open': isMenuOpen }">
      <div class="sidebar-head">
        <span>Navigation</span>
        <button type="button" aria-label="Close menu" @click="closeMenu">X</button>
      </div>
      <nav aria-label="Sidebar navigation">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" @click="closeMenu">
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <RouterView />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  color: #eef7ff;
  background:
    radial-gradient(circle at 18% 12%, rgba(0, 224, 255, 0.28), transparent 28rem),
    radial-gradient(circle at 82% 10%, rgba(255, 44, 196, 0.2), transparent 24rem),
    linear-gradient(135deg, #050712 0%, #0a1022 48%, #08131c 100%);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

#app {
  min-height: 100vh;
}

.app-shell {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  padding-top: 74px;
}

.app-shell::before {
  position: fixed;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 56px 56px;
  content: '';
  mask-image: linear-gradient(to bottom, black, transparent 82%);
}

.app-shell::after {
  position: fixed;
  inset: auto 0 0;
  z-index: -1;
  height: 36vh;
  background: linear-gradient(to top, rgba(0, 240, 255, 0.08), transparent);
  content: '';
  pointer-events: none;
}

.paper-particles {
  position: fixed;
  inset: 0;
  z-index: 18;
  pointer-events: none;
}

.paper-particles span {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--particle-size);
  height: calc(var(--particle-size) * 0.72);
  border-radius: 1px;
  background: var(--particle-color);
  box-shadow: 0 0 10px color-mix(in srgb, var(--particle-color) 72%, transparent);
  opacity: 0;
  transform: translate3d(var(--x), var(--y), 0) rotate(0deg);
  animation: paper-pop 760ms ease-out forwards;
  will-change: transform, opacity;
}

@keyframes paper-pop {
  0% {
    opacity: 0;
    transform: translate3d(var(--x), var(--y), 0) scale(0.5) rotate(0deg);
  }

  18% {
    opacity: 0.95;
  }

  100% {
    opacity: 0;
    transform: translate3d(
        calc(var(--x) + var(--dx)),
        calc(var(--y) + var(--dy) + 36px),
        0
      )
      scale(0.86)
      rotate(var(--rotate));
  }
}

.galaxy-dust,
.galaxy-dust::before,
.galaxy-dust::after {
  position: fixed;
  inset: 0;
  z-index: -1;
  content: '';
  pointer-events: none;
}

.galaxy-dust {
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.82) 0 1px, transparent 1.7px),
    radial-gradient(circle, rgba(117, 240, 255, 0.62) 0 1px, transparent 1.8px),
    radial-gradient(circle, rgba(255, 91, 215, 0.44) 0 1px, transparent 1.6px);
  background-position:
    12px 18px,
    92px 140px,
    180px 52px;
  background-size:
    240px 240px,
    360px 360px,
    460px 460px;
  opacity: 0.38;
  animation: dust-drift 34s linear infinite;
}

.galaxy-dust::before {
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.72) 0 1px, transparent 1.5px),
    radial-gradient(circle, rgba(117, 240, 255, 0.34) 0 1px, transparent 1.6px);
  background-position:
    50px 20px,
    180px 96px;
  background-size:
    520px 520px,
    680px 680px;
  opacity: 0.42;
  animation: dust-drift-slow 58s linear infinite;
}

.galaxy-dust::after {
  background:
    linear-gradient(115deg, transparent 18%, rgba(117, 240, 255, 0.08) 48%, transparent 74%),
    linear-gradient(150deg, transparent 24%, rgba(255, 91, 215, 0.06) 58%, transparent 82%);
  opacity: 0.52;
  animation: dust-band 24s ease-in-out infinite alternate;
}

@keyframes dust-drift {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-120px, 90px, 0);
  }
}

@keyframes dust-drift-slow {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(160px, -110px, 0);
  }
}

@keyframes dust-band {
  from {
    transform: translateX(-2%);
  }

  to {
    transform: translateX(2%);
  }
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 18px clamp(18px, 4vw, 72px);
  border-bottom: 1px solid rgba(164, 232, 255, 0.16);
  background: rgba(5, 7, 18, 0.72);
  backdrop-filter: blur(20px);
}

.brand-mark {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(117, 240, 255, 0.55);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(0, 224, 255, 0.18), rgba(255, 44, 196, 0.12));
  box-shadow: 0 0 28px rgba(0, 224, 255, 0.2);
  color: #ffffff;
  font-weight: 900;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.brand-mark:hover {
  transform: translateY(-2px);
  border-color: rgba(117, 240, 255, 0.78);
  box-shadow:
    0 0 20px rgba(117, 240, 255, 0.28),
    0 0 32px rgba(255, 91, 215, 0.12);
}

.brand-mark img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.nav-links a {
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0 14px;
  color: rgba(238, 247, 255, 0.72);
  font-size: 0.92rem;
  font-weight: 700;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    background 150ms ease,
    color 150ms ease,
    box-shadow 150ms ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  border-color: rgba(117, 240, 255, 0.42);
  background: rgba(117, 240, 255, 0.1);
  color: #ffffff;
}

.nav-links a:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 14px rgba(117, 240, 255, 0.12);
}

.menu-toggle {
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(117, 240, 255, 0.42);
  border-radius: 14px;
  background: rgba(117, 240, 255, 0.08);
  cursor: pointer;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease,
    background 150ms ease;
}

.menu-toggle:hover {
  transform: translateY(-2px);
  border-color: rgba(117, 240, 255, 0.7);
  background: rgba(117, 240, 255, 0.14);
  box-shadow: 0 0 18px rgba(117, 240, 255, 0.18);
}

.menu-toggle span {
  display: block;
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: #eef7ff;
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  z-index: 29;
  border: 0;
  background: rgba(0, 0, 0, 0.44);
  cursor: pointer;
}

.sidebar-menu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 30;
  display: grid;
  grid-template-rows: auto 1fr;
  width: min(360px, 88vw);
  height: 100vh;
  border-left: 1px solid rgba(117, 240, 255, 0.24);
  background:
    linear-gradient(145deg, rgba(9, 25, 48, 0.96), rgba(24, 15, 42, 0.96)),
    rgba(5, 7, 18, 0.98);
  box-shadow: -28px 0 80px rgba(0, 0, 0, 0.42);
  transform: translateX(100%);
  transition: transform 220ms ease;
}

.sidebar-menu.is-open {
  transform: translateX(0);
}

.sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(238, 247, 255, 0.12);
  padding: 22px;
  color: #ffffff;
  font-weight: 900;
}

.sidebar-head button {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgba(238, 247, 255, 0.16);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  cursor: pointer;
  font-size: 1.4rem;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    background 150ms ease,
    box-shadow 150ms ease;
}

.sidebar-head button:hover {
  transform: translateY(-1px);
  border-color: rgba(117, 240, 255, 0.48);
  background: rgba(117, 240, 255, 0.12);
  box-shadow: 0 0 16px rgba(117, 240, 255, 0.14);
}

.sidebar-menu nav {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 20px;
}

.sidebar-menu nav a {
  display: flex;
  min-height: 54px;
  align-items: center;
  border: 1px solid rgba(117, 240, 255, 0.16);
  border-radius: 8px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.045);
  color: rgba(238, 247, 255, 0.82);
  font-weight: 900;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    background 150ms ease,
    color 150ms ease,
    box-shadow 150ms ease;
}

.sidebar-menu nav a.router-link-active {
  border-color: rgba(117, 240, 255, 0.48);
  background: rgba(117, 240, 255, 0.12);
  color: #ffffff;
}

.sidebar-menu nav a:hover {
  transform: translateX(-4px);
  border-color: rgba(117, 240, 255, 0.42);
  background: rgba(117, 240, 255, 0.1);
  color: #ffffff;
  box-shadow: 0 0 18px rgba(117, 240, 255, 0.12);
}

@media (max-width: 680px) {
  .app-shell {
    padding-top: 86px;
  }

  .site-header {
    align-items: center;
    flex-direction: row;
  }

  .nav-links {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .paper-particles {
    display: none;
  }
}
</style>
