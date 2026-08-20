<script setup lang="ts">
import { portfolioProjects } from '../datas/portfolio'

const projects = portfolioProjects

const skills = [
  {
    name: 'Vue',
    evidence: 'The portfolio is built as a Vue app with routed views and reusable data sections.',
  },
  {
    name: 'TypeScript',
    evidence: 'Project data and application setup use typed structures.',
  },
  {
    name: 'Responsive UI',
    evidence: 'Layouts adapt across desktop and mobile breakpoints.',
  },
  {
    name: 'Interaction',
    evidence: 'Navigation, project links, and contact routes remain functional.',
  },
  {
    name: 'Component Structure',
    evidence: 'Pages are separated by route and content is mapped from shared data.',
  },
  {
    name: 'Git',
    evidence: 'Project links and repository references are part of the portfolio content.',
  },
]

const routes = [
  { title: 'Projects', path: '/projects' },
  { title: 'Skills', path: '/skills' },
  { title: 'Playground', path: '/playground' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
]

const socialLinks = [
  { label: 'Discord', handle: 'Community', url: 'https://discord.com' },
  { label: 'X', handle: '@sseries', url: 'https://x.com' },
  { label: 'GitHub', handle: 'S-Series', url: 'https://github.com/S-Series' },
  { label: 'Ko-fi', handle: 'Support', url: 'https://ko-fi.com' },
]
</script>

<template>
  <main class="home-view">
    <section class="screen-section hero-section" aria-labelledby="hero-title">
      <div class="section-inner hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Portfolio</p>
          <h1 id="hero-title">Hello, I'm SSeries.</h1>
          <p class="hero-description">
            A Vue portfolio foundation with routing, responsive sections, and shared project data.
          </p>
          <div class="link-row">
            <RouterLink to="/projects">Explore Work</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
          </div>
        </div>

        <aside class="summary-panel" aria-label="Portfolio summary">
          <h2>Frontend Developer</h2>
          <ul>
            <li v-for="skill in skills" :key="skill.name">{{ skill.name }}</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="screen-section project-section" aria-labelledby="projects-title">
      <div class="section-inner">
        <div class="section-heading">
          <p class="eyebrow">Selected Work</p>
          <h2 id="projects-title">Projects</h2>
        </div>

        <div class="project-grid">
          <article v-for="project in projects" :key="project.title" class="project-card">
            <span>{{ project.code }}</span>
            <a
              v-if="project.url"
              class="project-thumb"
              :href="project.url"
              target="_blank"
              rel="noopener"
            >
              <img :src="project.image" :alt="`${project.title} preview`" />
            </a>
            <div v-else class="project-thumb">
              <img :src="project.image" :alt="`${project.title} preview`" />
            </div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.meta }}</p>
            <div v-if="project.url || project.repo" class="link-row">
              <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">Visit</a>
              <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener">Repo</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="screen-section skill-section" aria-labelledby="skills-title">
      <div class="section-inner split-inner">
        <div class="section-heading">
          <p class="eyebrow">Capabilities</p>
          <h2 id="skills-title">Skills</h2>
        </div>

        <div class="skill-grid">
          <article v-for="skill in skills" :key="skill.name">
            <h3>{{ skill.name }}</h3>
            <p>{{ skill.evidence }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="screen-section social-section" aria-labelledby="social-title">
      <div class="section-inner">
        <div class="section-heading">
          <p class="eyebrow">Links</p>
          <h2 id="social-title">Connect</h2>
        </div>

        <div class="social-grid">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.url"
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
      <div class="section-inner">
        <div class="section-heading">
          <p class="eyebrow">Routes</p>
          <h2 id="routes-title">Pages</h2>
        </div>

        <div class="route-grid">
          <RouterLink v-for="route in routes" :key="route.path" :to="route.path">
            <span>{{ route.path }}</span>
            <strong>{{ route.title }}</strong>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.screen-section {
  position: relative;
  padding: clamp(44px, 7vw, 88px) 0;
}

.screen-section + .screen-section::before {
  position: absolute;
  top: 0;
  right: 4vw;
  left: 4vw;
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--pencil-line) 0 18px, transparent 18px 28px);
  content: '';
  opacity: 0.65;
  transform: rotate(-0.15deg);
}

.section-inner {
  width: min(1120px, calc(100% - 36px));
  margin: 0 auto;
}

.hero-section::after {
  position: absolute;
  top: clamp(28px, 6vw, 76px);
  right: clamp(20px, 5vw, 80px);
  width: clamp(54px, 7vw, 86px);
  aspect-ratio: 1;
  background: url('/notebook/doodle-star.svg') center / contain no-repeat;
  content: '';
  opacity: 0.34;
  pointer-events: none;
  transform: rotate(8deg);
}

.hero-inner,
.split-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(280px, 0.6fr);
  gap: clamp(32px, 6vw, 80px);
  align-items: start;
}

.skill-section .split-inner {
  grid-template-columns: minmax(220px, 0.34fr) minmax(0, 1fr);
}

.social-section .section-inner,
.route-section .section-inner {
  display: grid;
  grid-template-columns: minmax(220px, 0.34fr) minmax(0, 1fr);
  align-items: start;
  gap: clamp(32px, 6vw, 80px);
}

.social-section .section-heading,
.route-section .section-heading {
  margin-bottom: 0;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--ink-soft);
  font-size: 1.02rem;
  text-transform: uppercase;
  transform: rotate(-0.5deg);
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 760px;
  margin-bottom: 30px;
  font-size: clamp(3.6rem, 9vw, 7.4rem);
  line-height: 0.78;
  letter-spacing: -0.025em;
  transform: rotate(-1deg);
}

h2 {
  margin-bottom: 24px;
  font-size: clamp(2.35rem, 5vw, 4.4rem);
  line-height: 0.9;
}

h3 {
  margin-bottom: 10px;
  font-size: 1.65rem;
  line-height: 1;
}

p {
  line-height: 1.7;
}

.hero-description {
  max-width: 640px;
  margin-bottom: 28px;
  padding-left: 18px;
  border-left: 2px solid var(--margin-red);
}

.summary-panel,
.project-card,
.skill-grid article,
.social-grid a,
.route-grid a {
  position: relative;
  border: 1.5px solid var(--pencil-line);
  padding: 20px;
  background:
    url('/notebook/paper-grain.svg') repeat,
    var(--paper-light);
  box-shadow: 5px 7px 0 rgb(79 69 54 / 9%);
}

.summary-panel {
  margin-top: 12px;
  padding: 34px 28px 28px;
  clip-path: polygon(1% 2%, 98% 0, 100% 96%, 96% 100%, 2% 98%, 0 7%);
  transform: rotate(1deg);
}

.summary-panel::before,
.project-card::before,
.skill-grid article::before {
  position: absolute;
  top: -3px;
  left: 50%;
  width: 96px;
  height: 34px;
  background: url('/notebook/tape.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0.84;
  pointer-events: none;
  transform: translateX(-50%) rotate(-2deg);
}

.summary-panel h2 {
  margin-bottom: 18px;
  font-size: 2rem;
}

.summary-panel ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin: 0;
  padding-left: 18px;
}

.section-heading {
  position: relative;
  display: inline-block;
  margin-bottom: 32px;
}

.section-heading h2 {
  margin-bottom: 0;
}

.section-heading::after {
  position: absolute;
  right: -12px;
  bottom: -14px;
  left: 10px;
  height: 18px;
  background: url('/notebook/pencil-underline.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0.66;
  transform: rotate(-1deg);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: clamp(24px, 3vw, 36px);
  padding-top: 10px;
}

.project-card {
  padding: 30px 22px 24px;
  clip-path: polygon(1% 1%, 98% 0, 100% 95%, 96% 100%, 3% 98%, 0 7%);
}

.project-card:nth-child(2) {
  transform: rotate(0.8deg) translateY(8px);
}

.project-card:nth-child(3) {
  transform: rotate(-0.7deg);
}

.project-card:nth-child(2)::before {
  left: 32%;
  transform: translateX(-50%) rotate(3deg);
}

.project-card:nth-child(3)::before {
  left: 66%;
  transform: translateX(-50%) rotate(-4deg);
}

.project-card > span {
  display: block;
  margin-bottom: 12px;
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.2rem;
}

.project-thumb {
  display: block;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;
  border: 1px solid var(--pencil-line);
  clip-path: polygon(1% 0, 100% 2%, 98% 97%, 4% 100%, 0 8%);
  overflow: hidden;
  filter: saturate(0.72) sepia(0.08);
}

.project-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.link-row a {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  padding: 0 14px;
  border: 1.5px solid var(--ink);
  border-radius: 49% 51% 45% 55% / 54% 46% 52% 48%;
  background: rgb(255 250 240 / 52%);
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.15rem;
  text-decoration: none;
  transform: rotate(-0.7deg);
}

.link-row a:nth-child(even) {
  transform: rotate(0.9deg);
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.skill-grid article {
  padding: 24px 24px 20px;
  clip-path: polygon(0 2%, 99% 0, 100% 94%, 97% 100%, 2% 98%);
}

.skill-grid article:nth-child(even) {
  transform: rotate(0.45deg);
}

.skill-grid article:nth-child(odd)::before {
  left: 18%;
}

.skill-grid article p,
.project-card p {
  margin-bottom: 16px;
}

.social-grid,
.route-grid {
  display: grid;
  gap: 20px;
}

.social-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.route-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.route-grid a {
  grid-column: span 2;
}

.route-grid a:nth-last-child(-n + 2) {
  grid-column: span 3;
}

.social-grid a,
.route-grid a {
  display: grid;
  gap: 8px;
  min-height: 112px;
  align-content: center;
  clip-path: polygon(1% 3%, 97% 0, 100% 92%, 95% 100%, 3% 97%, 0 10%);
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.4rem;
  text-decoration: none;
}

.social-grid a:nth-child(even),
.route-grid a:nth-child(odd) {
  transform: rotate(0.7deg);
}

.social-grid a:nth-child(odd),
.route-grid a:nth-child(even) {
  transform: rotate(-0.6deg);
}

.social-grid span,
.route-grid span {
  color: var(--ink-soft);
  font-size: 1rem;
}

@media (max-width: 860px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .social-section .section-inner,
  .route-section .section-inner {
    grid-template-columns: 1fr;
  }

  .social-section .section-heading,
  .route-section .section-heading {
    margin-bottom: 32px;
  }

  .route-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .route-grid a,
  .route-grid a:nth-last-child(-n + 2) {
    grid-column: auto;
  }
}

@media (max-width: 960px) {
  .skill-section .split-inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .hero-inner,
  .split-inner,
  .project-grid,
  .skill-grid,
  .social-grid,
  .route-grid {
    grid-template-columns: 1fr;
  }

  .hero-section::after {
    top: 26px;
    right: 14px;
    width: 48px;
  }

  h1 {
    font-size: clamp(3.4rem, 19vw, 5.6rem);
  }

  .project-card,
  .project-card:nth-child(2),
  .project-card:nth-child(3) {
    transform: none;
  }
}
</style>
