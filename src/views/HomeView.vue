<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { portfolioProjects } from '../datas/portfolio'

const projects = portfolioProjects

const skills = ['Vue', 'TypeScript', 'Responsive UI', 'Interaction', 'Design Systems', 'Git']

const routes = [
  { title: 'Projects', path: '/projects' },
  { title: 'Skills', path: '/skills' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
]

const socialLinks = [
  { label: 'Discord', handle: 'Community', url: 'https://discord.com' },
  { label: 'X', handle: '@sseries', url: 'https://x.com' },
  { label: 'GitHub', handle: 'S-Series', url: 'https://github.com/S-Series' },
  { label: 'Ko-fi', handle: 'Support', url: 'https://ko-fi.com' },
]

const typingWords = ['Frontend', 'Interactive', 'Responsive', 'Creative']
const typedWord = ref('')
let typingTimer = 0
let wordIndex = 0
let charIndex = 0
let isDeleting = false

let revealObserver: IntersectionObserver | undefined

const typeNextFrame = () => {
  const currentWord: string = typingWords[wordIndex] ?? 'frontend'

  if (!isDeleting) {
    charIndex += 1
    typedWord.value = currentWord.slice(0, charIndex)

    if (charIndex === currentWord.length) {
      isDeleting = true
      typingTimer = window.setTimeout(typeNextFrame, 1100)
      return
    }
  } else {
    charIndex -= 1
    typedWord.value = currentWord.slice(0, charIndex)

    if (charIndex === 0) {
      isDeleting = false
      wordIndex = (wordIndex + 1) % typingWords.length
      typingTimer = window.setTimeout(typeNextFrame, 240)
      return
    }
  }

  typingTimer = window.setTimeout(typeNextFrame, isDeleting ? 54 : 92)
}

onMounted(() => {
  const revealItems = document.querySelectorAll<HTMLElement>('.reveal')

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
  )

  revealItems.forEach((item) => revealObserver?.observe(item))
  typeNextFrame()
})

onUnmounted(() => {
  revealObserver?.disconnect()
  window.clearTimeout(typingTimer)
})
</script>

<template>
  <main class="home-view">
    <section class="screen-section hero-section" aria-labelledby="hero-title">
      <div class="section-inner hero-inner reveal">
        <div class="hero-copy reveal">
          <p class="eyebrow">Portfolio Interface 2026</p>
          <h1 id="hero-title">
            <span>Hello, I'm SSeries.</span>
            <span class="hero-intro-line">I'm a</span>
            <span class="hero-role-line">
              <span class="typing-word">{{ typedWord }}</span>
              <span class="typing-cursor" aria-hidden="true"></span>
              <span class="developer-word">Developer</span>
            </span>
          </h1>
          <p class="hero-description">
            A responsive Vue foundation with a cinematic visual language, clean routing, and modular
            spaces ready for real project content.
          </p>
          <div class="hero-actions">
            <RouterLink class="primary-action" to="/projects">Explore Work</RouterLink>
            <RouterLink class="secondary-action" to="/contact">Start Contact</RouterLink>
          </div>
        </div>

        <aside
          class="mech-panel reveal tilt-card"
          data-tilt
          data-tilt-strength="strong"
          aria-label="Portfolio status"
        >
          <div class="machine-core" aria-hidden="true">
            <span class="float-line line-one"></span>
            <span class="float-line line-two"></span>
            <span class="float-line line-three"></span>
            <span class="float-line line-four"></span>
            <div class="hex-frame">
              <img src="/sseries.png" alt="S Series" />
            </div>
            <div class="machine-rail rail-top"></div>
            <div class="machine-rail rail-right"></div>
            <div class="machine-rail rail-bottom"></div>
            <div class="machine-rail rail-left"></div>
          </div>
          <div class="panel-skills" aria-label="Skills">
            <span v-for="skill in skills" :key="skill">{{ skill }}</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="screen-section project-section" aria-labelledby="projects-title">
      <div class="section-inner reveal">
        <div class="section-heading reveal">
          <p class="eyebrow">Selected Nodes</p>
          <h2 id="projects-title">Project grid</h2>
        </div>

        <div class="project-grid">
          <article
            v-for="project in projects"
            :key="project.title"
            class="project-card reveal"
          >
            <span>{{ project.code }}</span>
            <a
              v-if="project.url"
              class="project-thumb"
              :href="project.url"
              target="_blank"
              rel="noopener"
            >
              <img :src="project.image" :alt="`${project.title} preview`" />
              <strong>{{ project.url }}</strong>
            </a>
            <div v-else class="project-thumb">
              <img :src="project.image" :alt="`${project.title} preview`" />
            </div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.meta }}</p>
            <div v-if="project.url || project.repo" class="project-links">
              <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">Visit</a>
              <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener">Repo</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="screen-section skill-section" aria-labelledby="skills-title">
      <div class="section-inner split-inner reveal">
        <div class="section-heading">
          <p class="eyebrow">Core Protocols</p>
          <h2 id="skills-title">Skills</h2>
        </div>

        <div class="skill-grid reveal">
          <span v-for="skill in skills" :key="skill">{{ skill }}</span>
        </div>
      </div>
    </section>

    <section class="screen-section social-section" aria-labelledby="social-title">
      <div class="section-inner social-inner reveal">
        <div class="section-heading">
          <p class="eyebrow">Signal Links</p>
          <h2 id="social-title">Connect</h2>
        </div>

        <div class="social-grid">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.url"
            class="social-card reveal"
            target="_blank"
            rel="noopener"
          >
            <span>{{ social.label }}</span>
            <strong>{{ social.handle }}</strong>
          </a>
        </div>
      </div>
    </section>

    <section class="screen-section route-section" aria-labelledby="routes-title">
      <div class="section-inner route-inner reveal">
        <div class="section-heading">
          <p class="eyebrow">Route Shells</p>
          <h2 id="routes-title">Empty pages are ready</h2>
        </div>

        <div class="route-grid">
          <RouterLink
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="route-card reveal"
          >
            <span>{{ route.path }}</span>
            <strong>{{ route.title }}</strong>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-view {
  overflow: hidden;
}

.screen-section {
  position: relative;
  display: grid;
  min-height: clamp(500px, 68svh, 700px);
  align-items: center;
  padding: clamp(28px, 4vw, 56px) 0;
  border-top: 1px solid rgba(238, 247, 255, 0.12);
}

.hero-section {
  min-height: auto;
  border-top: 0;
  padding: clamp(32px, 4vw, 52px) 0 clamp(34px, 4vw, 56px);
  background: linear-gradient(120deg, rgba(0, 126, 158, 0.16), rgba(74, 37, 135, 0.12));
}

.project-section,
.skill-section,
.social-section,
.route-section {
  min-height: auto;
  padding: clamp(40px, 5vw, 66px) 0;
}

.project-section {
  background: linear-gradient(135deg, rgba(3, 37, 58, 0.72), rgba(9, 17, 36, 0.5));
}

.skill-section {
  background: linear-gradient(135deg, rgba(36, 18, 61, 0.55), rgba(0, 64, 76, 0.42));
}

.social-section {
  background: linear-gradient(135deg, rgba(4, 43, 65, 0.58), rgba(46, 18, 62, 0.5));
}

.route-section {
  background: linear-gradient(135deg, rgba(5, 7, 18, 0.34), rgba(24, 64, 85, 0.46));
}

.section-inner {
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(300px, 0.72fr);
  align-items: center;
  gap: clamp(24px, 4vw, 48px);
  border: 1px solid rgba(117, 240, 255, 0.22);
  border-radius: 8px;
  padding: clamp(24px, 4vw, 42px);
  background:
    linear-gradient(135deg, rgba(7, 30, 58, 0.62), rgba(14, 10, 34, 0.4)),
    rgba(255, 255, 255, 0.025);
  box-shadow: inset 0 0 64px rgba(117, 240, 255, 0.055);
}

.hero-copy {
  max-width: 720px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #75f0ff;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 20px;
  color: #ffffff;
  font-size: clamp(2.7rem, 5.4vw, 5.15rem);
  line-height: 1.06;
}

.hero-role-line {
  display: block;
  margin-top: 0.08em;
  font-size: 0.72em;
}

.hero-intro-line {
  display: block;
  margin-top: 0.12em;
  font-size: 0.62em;
  color: rgba(238, 247, 255, 0.86);
}

.typing-word {
  display: inline-block;
  color: #75f0ff;
  text-shadow: 0 0 22px rgba(117, 240, 255, 0.28);
}

.typing-cursor {
  display: inline-block;
  width: 0.08em;
  height: 0.78em;
  margin: 0 0.1em 0 0.02em;
  border-radius: 999px;
  background: #ff5bd7;
  box-shadow: 0 0 16px rgba(255, 91, 215, 0.45);
  animation: cursor-blink 820ms steps(2, jump-none) infinite;
  vertical-align: -0.04em;
}

.developer-word {
  display: block;
  color: #ffffff;
}

@keyframes cursor-blink {
  50% {
    opacity: 0;
  }
}

h2 {
  margin-bottom: 0;
  color: #ffffff;
  font-size: clamp(2.1rem, 4vw, 4rem);
  line-height: 1;
}

h3 {
  margin-bottom: 12px;
  color: #ffffff;
  font-size: 1.35rem;
}

.hero-description {
  max-width: 620px;
  margin-bottom: 28px;
  color: rgba(238, 247, 255, 0.72);
  font-size: clamp(1rem, 2vw, 1.16rem);
  line-height: 1.72;
}

.hero-actions,
.project-links,
.panel-skills,
.skill-grid {
  display: flex;
  flex-wrap: wrap;
}

.hero-actions {
  gap: 12px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0 22px;
  font-weight: 900;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease,
    background 150ms ease;
}

.primary-action {
  background: linear-gradient(135deg, #75f0ff, #ff5bd7);
  box-shadow: 0 0 30px rgba(117, 240, 255, 0.28);
  color: #06101c;
}

.secondary-action {
  border: 1px solid rgba(238, 247, 255, 0.22);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.primary-action:hover,
.secondary-action:hover {
  transform: translateY(-2px);
}

.primary-action:hover {
  box-shadow:
    0 0 24px rgba(117, 240, 255, 0.36),
    0 0 38px rgba(255, 91, 215, 0.18);
}

.secondary-action:hover {
  border-color: rgba(117, 240, 255, 0.48);
  background: rgba(117, 240, 255, 0.09);
  box-shadow: 0 0 18px rgba(117, 240, 255, 0.14);
}

.mech-panel {
  position: relative;
  display: grid;
  gap: 18px;
  align-content: center;
  min-height: 340px;
  border: 1px solid rgba(117, 240, 255, 0.24);
  border-radius: 8px;
  padding: clamp(18px, 3vw, 28px);
  background:
    linear-gradient(145deg, rgba(117, 240, 255, 0.12), rgba(255, 91, 215, 0.07)),
    rgba(255, 255, 255, 0.045);
  box-shadow: inset 0 0 70px rgba(117, 240, 255, 0.08), 0 28px 80px rgba(0, 0, 0, 0.28);
  overflow: hidden;
}

.mech-panel::before,
.mech-panel::after {
  position: absolute;
  content: '';
  pointer-events: none;
}

.mech-panel::before {
  inset: 16px;
  border: 1px solid rgba(238, 247, 255, 0.1);
  clip-path: polygon(8% 0, 92% 0, 100% 12%, 100% 88%, 92% 100%, 8% 100%, 0 88%, 0 12%);
}

.mech-panel::after {
  top: 0;
  left: 14%;
  width: 72%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #75f0ff, transparent);
  box-shadow: 0 0 26px #75f0ff;
}

.machine-core {
  position: relative;
  display: grid;
  width: min(100%, 320px);
  min-height: 220px;
  place-items: center;
  justify-self: center;
  border: 1px solid rgba(117, 240, 255, 0.22);
  background:
    linear-gradient(90deg, transparent 0 48%, rgba(117, 240, 255, 0.16) 48% 52%, transparent 52%),
    linear-gradient(0deg, transparent 0 48%, rgba(255, 91, 215, 0.12) 48% 52%, transparent 52%);
  clip-path: polygon(10% 0, 90% 0, 100% 18%, 100% 82%, 90% 100%, 10% 100%, 0 82%, 0 18%);
  transition:
    background 260ms ease,
    border-color 260ms ease,
    box-shadow 260ms ease,
    filter 260ms ease;
}

.machine-core::after {
  position: absolute;
  inset: 22px;
  border: 1px solid rgba(117, 240, 255, 0.24);
  content: '';
  pointer-events: none;
  animation: core-ring 9s linear infinite;
  clip-path: polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0 50%);
}

.float-line {
  position: absolute;
  z-index: 2;
  display: block;
  width: 72px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(117, 240, 255, 0.86), transparent);
  box-shadow: 0 0 14px rgba(117, 240, 255, 0.36);
  pointer-events: none;
  animation: float-line 5.8s ease-in-out infinite;
}

.line-one {
  top: 24%;
  left: 13%;
}

.line-two {
  top: 35%;
  right: 13%;
  animation-delay: -1.6s;
}

.line-three {
  bottom: 28%;
  left: 18%;
  width: 54px;
  animation-delay: -2.7s;
}

.line-four {
  right: 18%;
  bottom: 18%;
  width: 48px;
  animation-delay: -4s;
}

@keyframes float-line {
  0%,
  100% {
    opacity: 0.28;
    transform: translate3d(-8px, 0, 0);
  }

  50% {
    opacity: 0.92;
    transform: translate3d(10px, -7px, 0);
  }
}

@keyframes core-ring {
  to {
    transform: rotate(360deg);
  }
}

.hex-frame {
  display: grid;
  width: 152px;
  aspect-ratio: 1;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(117, 240, 255, 0.55);
  background: rgba(5, 7, 18, 0.72);
  box-shadow: 0 0 42px rgba(117, 240, 255, 0.22), inset 0 0 36px rgba(117, 240, 255, 0.12);
  clip-path: polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0 50%);
}

.hex-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: drop-shadow(0 0 14px rgba(117, 240, 255, 0.35));
  transition:
    filter 260ms ease,
    transform 260ms ease;
}

.machine-rail {
  position: absolute;
  background: rgba(117, 240, 255, 0.5);
  box-shadow: 0 0 18px rgba(117, 240, 255, 0.5);
}

.rail-top,
.rail-bottom {
  left: 20%;
  width: 60%;
  height: 1px;
}

.rail-left,
.rail-right {
  top: 18%;
  width: 1px;
  height: 64%;
}

.rail-top {
  top: 18px;
}

.rail-right {
  right: 18px;
}

.rail-bottom {
  bottom: 18px;
}

.rail-left {
  left: 18px;
}

.panel-skills {
  justify-content: center;
  gap: 9px;
}

.panel-skills span,
.skill-grid span,
.project-links a {
  border: 1px solid rgba(117, 240, 255, 0.2);
  border-radius: 999px;
  background: rgba(5, 7, 18, 0.46);
  color: rgba(238, 247, 255, 0.86);
  font-weight: 900;
}

.panel-skills span {
  padding: 10px 12px;
  font-size: 0.82rem;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: clamp(24px, 4vw, 42px);
}

.project-grid,
.social-grid,
.route-grid {
  display: grid;
  gap: 14px;
}

.project-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.project-card,
.social-card,
.route-card {
  border: 1px solid rgba(117, 240, 255, 0.18);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.project-card {
  min-height: 280px;
  padding: 24px;
  transition:
    border-color 170ms ease,
    box-shadow 170ms ease,
    background 170ms ease,
    transform 170ms ease;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: rgba(117, 240, 255, 0.46);
  background:
    linear-gradient(135deg, rgba(117, 240, 255, 0.08), rgba(255, 91, 215, 0.055)),
    rgba(255, 255, 255, 0.06);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.09),
    0 0 24px rgba(117, 240, 255, 0.14);
}

.project-card span {
  display: inline-flex;
  margin-bottom: 14px;
  color: #ff8ee4;
  font-weight: 950;
}

.project-thumb {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid rgba(117, 240, 255, 0.18);
  border-radius: 8px;
  background: rgba(5, 7, 18, 0.42);
  box-shadow: inset 0 0 24px rgba(117, 240, 255, 0.04);
}

.project-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition:
    filter 180ms ease,
    transform 180ms ease;
}

.project-thumb strong {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  max-width: calc(100% - 26px);
  padding: 10px 13px;
  border: 1px solid rgba(117, 240, 255, 0.38);
  border-radius: 999px;
  background: rgba(5, 7, 18, 0.82);
  box-shadow: 0 0 22px rgba(117, 240, 255, 0.18);
  color: #ffffff;
  font-size: 0.78rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -40%) scale(0.96);
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.project-thumb strong::after {
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 9px;
  height: 9px;
  border-right: 1px solid rgba(117, 240, 255, 0.38);
  border-bottom: 1px solid rgba(117, 240, 255, 0.38);
  background: rgba(5, 7, 18, 0.82);
  content: '';
  transform: translateX(-50%) rotate(45deg);
}

.project-card:hover .project-thumb img,
.project-thumb:hover img {
  filter: brightness(0.74) saturate(1.12);
  transform: scale(1.08);
}

.project-card:hover .project-thumb strong,
.project-thumb:hover strong {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.project-card p {
  margin-bottom: 0;
  color: rgba(238, 247, 255, 0.62);
}

.project-links {
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}

.project-links a {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  padding: 0 11px;
  font-size: 0.78rem;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease,
    background 150ms ease;
}

.project-links a:hover {
  transform: translateY(-1px);
  border-color: rgba(117, 240, 255, 0.5);
  background: rgba(117, 240, 255, 0.14);
  box-shadow: 0 0 16px rgba(117, 240, 255, 0.16);
}

.split-inner,
.social-inner,
.route-inner {
  display: grid;
  align-items: center;
  gap: 34px;
}

.split-inner {
  grid-template-columns: minmax(220px, 0.58fr) 1fr;
}

.social-inner {
  grid-template-columns: minmax(240px, 0.56fr) 1fr;
}

.route-inner {
  grid-template-columns: minmax(260px, 0.72fr) 1fr;
}

.split-inner .section-heading,
.social-inner .section-heading,
.route-inner .section-heading {
  display: block;
  margin-bottom: 0;
}

.skill-grid {
  min-height: 220px;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.skill-grid span {
  padding: 13px 16px;
  background: rgba(117, 240, 255, 0.09);
}

.social-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.route-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.social-card,
.route-card {
  display: grid;
  min-height: 132px;
  align-content: space-between;
  padding: 18px;
}

.social-card {
  position: relative;
  overflow: hidden;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.social-card::before {
  content: none;
}

.social-card:hover {
  border-color: rgba(117, 240, 255, 0.58);
  background:
    linear-gradient(135deg, rgba(117, 240, 255, 0.1), rgba(255, 91, 215, 0.08)),
    rgba(255, 255, 255, 0.058);
  box-shadow:
    inset 0 0 20px rgba(117, 240, 255, 0.06),
    0 0 18px rgba(117, 240, 255, 0.16),
    0 0 34px rgba(255, 91, 215, 0.08);
  animation: social-glow 2.4s ease-in-out infinite;
}

.route-card {
  min-height: 150px;
  padding: 20px;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;
}

.route-card:hover {
  transform: translateY(-3px);
  border-color: rgba(117, 240, 255, 0.46);
  background: rgba(117, 240, 255, 0.08);
  box-shadow:
    inset 0 0 22px rgba(117, 240, 255, 0.06),
    0 0 24px rgba(117, 240, 255, 0.14);
}

.social-card span,
.route-card span {
  color: #75f0ff;
  font-size: 0.82rem;
  font-weight: 950;
}

.social-card strong,
.route-card strong {
  color: #ffffff;
  font-size: 1.15rem;
}

.route-card strong {
  font-size: 1.35rem;
}

@keyframes social-glow {
  0%,
  100% {
    border-color: rgba(117, 240, 255, 0.44);
    box-shadow:
      inset 0 0 16px rgba(117, 240, 255, 0.05),
      0 0 14px rgba(117, 240, 255, 0.14),
      0 0 24px rgba(255, 91, 215, 0.06);
  }

  50% {
    border-color: rgba(117, 240, 255, 0.68);
    box-shadow:
      inset 0 0 26px rgba(117, 240, 255, 0.08),
      0 0 22px rgba(117, 240, 255, 0.22),
      0 0 42px rgba(255, 91, 215, 0.12);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 560ms ease,
    transform 560ms ease,
    filter 560ms ease,
    box-shadow 180ms ease;
  filter: blur(6px);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.mech-panel.tilt-card {
  transform-style: preserve-3d;
  transition: box-shadow 160ms ease;
  will-change: transform;
}

.mech-panel.tilt-card.is-visible {
  transform: perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0);
}

.mech-panel.tilt-card:hover {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 34px rgba(117, 240, 255, 0.16);
}

.project-card.reveal:nth-child(2),
.route-card.reveal:nth-child(2),
.social-card.reveal:nth-child(2) {
  transition-delay: 90ms;
}

.project-card.reveal:nth-child(3),
.route-card.reveal:nth-child(3),
.social-card.reveal:nth-child(3) {
  transition-delay: 180ms;
}

.route-card.reveal:nth-child(4),
.social-card.reveal:nth-child(4) {
  transition-delay: 270ms;
}

@media (max-width: 900px) {
  .screen-section {
    min-height: auto;
    padding: 58px 0;
  }

  .hero-inner,
  .split-inner,
  .social-inner,
  .route-inner {
    grid-template-columns: 1fr;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .mech-panel {
    min-height: 320px;
  }
}

@media (max-width: 560px) {
  .section-inner {
    width: min(100% - 28px, 1180px);
  }

  h1 {
    font-size: 3rem;
  }

  .social-grid,
  .route-grid {
    grid-template-columns: 1fr;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .skill-grid {
    justify-content: center;
    min-height: 180px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .mech-panel.tilt-card {
    opacity: 1;
    transition: none;
    filter: none;
  }
}
</style>
