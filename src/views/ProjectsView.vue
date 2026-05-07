<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { portfolioProjects } from '../datas/portfolio'

let revealObserver: IntersectionObserver | undefined

onMounted(() => {
  const revealItems = document.querySelectorAll<HTMLElement>('.project-reveal')

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -14% 0px', threshold: 0.16 },
  )

  revealItems.forEach((item) => revealObserver?.observe(item))
})

onUnmounted(() => {
  revealObserver?.disconnect()
})
</script>

<template>
  <main class="projects-view">
    <section class="projects-hero" aria-labelledby="projects-title">
      <p class="eyebrow">Project Gallery</p>
      <h1 id="projects-title">Projects</h1>
      <p>Selected builds with angled visual panels, compact notes, and direct launch links.</p>
    </section>

    <section class="project-editorial" aria-label="Portfolio projects">
      <template
        v-for="(project, index) in portfolioProjects"
        :key="project.code"
      >
        <div class="status-divider project-reveal">
          <span>{{ project.status }}</span>
        </div>

        <article
          class="project-row"
          :class="index % 2 === 0 ? 'image-right' : 'image-left'"
        >
          <div class="project-copy">
            <p class="project-status project-reveal">{{ project.status }} / {{ project.code }}</p>
            <h2 class="project-reveal">{{ project.title }}</h2>
            <p class="project-meta project-reveal">{{ project.meta }}</p>
            <p class="project-summary project-reveal">{{ project.summary }}</p>

            <ul class="tag-list project-reveal" aria-label="Project tags">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>

            <div class="project-actions project-reveal" v-if="project.url || project.repo">
              <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">Visit</a>
              <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener">Repo</a>
            </div>
          </div>

          <a
            v-if="project.url"
            class="project-visual project-reveal project-visual-link"
            :href="project.url"
            target="_blank"
            rel="noopener"
            :aria-label="`Open ${project.title} website`"
          >
            <img :src="project.image" :alt="`${project.title} preview`" />
            <span class="visual-hint">Open Site</span>
          </a>

          <figure v-else class="project-visual project-reveal">
            <img :src="project.image" :alt="`${project.title} preview`" />
          </figure>
        </article>
      </template>
    </section>
  </main>
</template>

<style scoped>
.projects-view {
  width: min(1060px, calc(100% - 36px));
  margin: 0 auto;
  padding: clamp(44px, 6vw, 78px) 0 120px;
}

.projects-hero {
  max-width: 760px;
  margin: 0 auto clamp(54px, 8vw, 96px);
  text-align: center;
}

.eyebrow,
.project-status {
  margin: 0 0 12px;
  color: #75f0ff;
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0;
  text-transform: uppercase;
}

.projects-hero .eyebrow {
  display: inline-flex;
  color: #ff8ee4;
  text-shadow: 0 0 22px rgba(255, 91, 215, 0.2);
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  color: #ffffff;
  font-size: clamp(2.8rem, 6.2vw, 5.9rem);
  line-height: 0.98;
}

.projects-hero > p {
  max-width: 560px;
  margin: 0 auto;
  color: rgba(179, 231, 255, 0.74);
  line-height: 1.7;
}

.project-editorial {
  display: grid;
  gap: clamp(30px, 5vw, 64px);
}

.status-divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
  color: #75f0ff;
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
}

.status-divider::before,
.status-divider::after {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(117, 240, 255, 0.38));
  content: '';
}

.status-divider::after {
  background: linear-gradient(90deg, rgba(117, 240, 255, 0.38), transparent);
}

.status-divider span {
  border: 1px solid rgba(117, 240, 255, 0.24);
  border-radius: 999px;
  padding: 8px 13px;
  background: rgba(5, 7, 18, 0.48);
  box-shadow: 0 0 18px rgba(117, 240, 255, 0.08);
}

.project-row {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(360px, 0.9fr);
  align-items: center;
  gap: clamp(32px, 7vw, 88px);
  margin-bottom: clamp(44px, 7vw, 86px);
}

.project-row.image-left {
  grid-template-columns: minmax(360px, 0.9fr) minmax(0, 0.78fr);
}

.image-left .project-copy {
  grid-column: 2;
}

.image-left .project-visual {
  grid-column: 1;
  grid-row: 1;
}

.project-copy {
  max-width: 520px;
}

h2 {
  margin-bottom: 16px;
  color: #ffffff;
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  line-height: 0.98;
}

.project-meta {
  margin-bottom: 16px;
  color: rgba(117, 240, 255, 0.78);
  font-weight: 900;
}

.project-summary {
  margin-bottom: 22px;
  color: rgba(238, 247, 255, 0.68);
  line-height: 1.75;
}

.tag-list,
.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-list {
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}

.tag-list li,
.project-actions a {
  border: 1px solid rgba(117, 240, 255, 0.2);
  border-radius: 999px;
  background: rgba(5, 7, 18, 0.46);
  color: rgba(238, 247, 255, 0.86);
  font-size: 0.82rem;
  font-weight: 900;
}

.tag-list li {
  padding: 9px 12px;
}

.project-actions a {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease,
    background 150ms ease;
}

.project-actions a:first-child {
  border-color: transparent;
  background: linear-gradient(135deg, #75f0ff, #ff5bd7);
  box-shadow: 0 0 30px rgba(117, 240, 255, 0.28);
  color: #06101c;
}

.project-actions a:nth-child(2) {
  border: 1px solid rgba(238, 247, 255, 0.22);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.project-actions a:hover {
  transform: translateY(-2px);
}

.project-actions a:first-child:hover {
  box-shadow:
    0 0 24px rgba(117, 240, 255, 0.36),
    0 0 38px rgba(255, 91, 215, 0.18);
}

.project-actions a:nth-child(2):hover {
  border-color: rgba(117, 240, 255, 0.48);
  background: rgba(117, 240, 255, 0.09);
  box-shadow: 0 0 18px rgba(117, 240, 255, 0.14);
}

.project-visual {
  position: relative;
  display: block;
  width: min(100%, 560px);
  aspect-ratio: 16 / 9;
  margin: 0;
  border: 1px solid rgba(117, 240, 255, 0.28);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(117, 240, 255, 0.1), rgba(255, 91, 215, 0.08)),
    rgba(255, 255, 255, 0.045);
  box-shadow:
    inset 0 0 34px rgba(117, 240, 255, 0.08),
    0 24px 80px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  transform: perspective(920px) rotateY(-16deg) rotateX(4deg) rotateZ(1.5deg);
  transform-style: preserve-3d;
  justify-self: end;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    filter 180ms ease;
}

.image-left .project-visual {
  justify-self: start;
  transform: perspective(920px) rotateY(16deg) rotateX(4deg) rotateZ(-1.5deg);
}

.project-visual-link {
  cursor: pointer;
}

.project-reveal {
  opacity: 0;
  transition:
    opacity 620ms ease,
    transform 620ms ease,
    filter 620ms ease;
  filter: blur(5px);
}

.project-copy .project-reveal {
  transform: translateY(28px);
}

.project-copy .project-reveal:nth-child(2) {
  transition-delay: 80ms;
}

.project-copy .project-reveal:nth-child(3) {
  transition-delay: 150ms;
}

.project-copy .project-reveal:nth-child(4) {
  transition-delay: 220ms;
}

.project-copy .project-reveal:nth-child(5) {
  transition-delay: 290ms;
}

.project-copy .project-reveal:nth-child(6) {
  transition-delay: 360ms;
}

.image-right .project-visual.project-reveal {
  transform: translateX(90px) perspective(920px) rotateY(-16deg) rotateX(4deg) rotateZ(1.5deg);
}

.image-left .project-visual.project-reveal {
  transform: translateX(-90px) perspective(920px) rotateY(16deg) rotateX(4deg) rotateZ(-1.5deg);
}

.project-reveal.is-visible {
  opacity: 1;
  filter: blur(0);
}

.project-copy .project-reveal.is-visible {
  transform: translateY(0);
}

.image-right .project-visual.project-reveal.is-visible {
  transform: perspective(920px) rotateY(-16deg) rotateX(4deg) rotateZ(1.5deg);
}

.image-left .project-visual.project-reveal.is-visible {
  transform: perspective(920px) rotateY(16deg) rotateX(4deg) rotateZ(-1.5deg);
}

.project-visual::before {
  position: absolute;
  inset: 12px;
  z-index: 1;
  border: 1px solid rgba(238, 247, 255, 0.12);
  border-radius: 6px;
  content: '';
  pointer-events: none;
  transform: translateZ(18px);
}

.project-visual::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.16), transparent 38%, rgba(0, 0, 0, 0.2));
  content: '';
  pointer-events: none;
  transform: translateZ(12px);
  transition: background 180ms ease;
}

.project-visual-link:hover {
  border-color: rgba(117, 240, 255, 0.58);
  box-shadow:
    inset 0 0 34px rgba(117, 240, 255, 0.1),
    0 24px 80px rgba(0, 0, 0, 0.26),
    0 0 34px rgba(117, 240, 255, 0.22);
}

.project-visual-link:hover::after {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.16), transparent 38%, rgba(0, 0, 0, 0.26)),
    rgba(5, 7, 18, 0.28);
}

.project-visual img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.04);
  filter: saturate(0.92) contrast(1.04);
  transition:
    transform 200ms ease,
    filter 200ms ease;
}

.project-visual-link:hover img {
  transform: scale(1.08);
  filter: saturate(1.04) contrast(1.08) brightness(0.84);
}

.visual-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(117, 240, 255, 0.46);
  border-radius: 999px;
  padding: 0 18px;
  background: rgba(5, 7, 18, 0.72);
  box-shadow: 0 0 24px rgba(117, 240, 255, 0.2);
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 950;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -40%) translateZ(24px);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.project-visual-link:hover .visual-hint {
  opacity: 1;
  transform: translate(-50%, -50%) translateZ(24px);
}

@media (max-width: 820px) {
  .project-row,
  .project-row.image-left {
    grid-template-columns: 1fr;
  }

  .image-left .project-copy,
  .image-left .project-visual {
    grid-column: auto;
    grid-row: auto;
  }

  .project-visual,
  .image-left .project-visual {
    transform: perspective(840px) rotateY(-7deg) rotateX(2deg);
  }

  .image-right .project-visual.project-reveal,
  .image-left .project-visual.project-reveal {
    transform: translateX(0) translateY(28px) perspective(840px) rotateY(-7deg) rotateX(2deg);
  }

  .image-right .project-visual.project-reveal.is-visible,
  .image-left .project-visual.project-reveal.is-visible {
    transform: perspective(840px) rotateY(-7deg) rotateX(2deg);
  }
}

@media (max-width: 560px) {
  .projects-view {
    width: min(100% - 28px, 1060px);
  }

  .project-editorial {
    gap: 64px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-reveal,
  .project-copy .project-reveal,
  .image-right .project-visual.project-reveal,
  .image-left .project-visual.project-reveal {
    opacity: 1;
    transform: none;
    transition: none;
    filter: none;
  }
}
</style>
