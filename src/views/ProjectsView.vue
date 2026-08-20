<script setup lang="ts">
import { portfolioProjects } from '../datas/portfolio'
</script>

<template>
  <main class="projects-view">
    <header class="page-intro" aria-labelledby="projects-title">
      <p class="eyebrow">Portfolio</p>
      <h1 id="projects-title">Projects</h1>
      <p>Selected builds with summaries, technology tags, and direct project links.</p>
    </header>

    <section class="project-list" aria-label="Portfolio projects">
      <article v-for="project in portfolioProjects" :key="project.code" class="project-row">
        <div class="project-copy">
          <p class="project-status">{{ project.status }} / {{ project.code }}</p>
          <h2>{{ project.title }}</h2>
          <p class="project-meta">{{ project.meta }}</p>
          <p>{{ project.summary }}</p>

          <ul class="tag-list" aria-label="Project tags">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>

          <div v-if="project.url || project.repo" class="project-actions">
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">Visit</a>
            <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener">Repo</a>
          </div>
        </div>

        <a
          v-if="project.url"
          class="project-visual"
          :href="project.url"
          target="_blank"
          rel="noopener"
          :aria-label="`Open ${project.title} website`"
        >
          <img :src="project.image" :alt="`${project.title} preview`" />
        </a>

        <figure v-else class="project-visual">
          <img :src="project.image" :alt="`${project.title} preview`" />
        </figure>
      </article>
    </section>
  </main>
</template>

<style scoped>
.projects-view {
  width: min(1060px, calc(100% - 36px));
  margin: 0 auto;
  padding: clamp(48px, 7vw, 88px) 0 96px;
}

.page-intro {
  position: relative;
  max-width: 720px;
  margin-bottom: clamp(48px, 7vw, 80px);
}

.page-intro::after {
  position: absolute;
  bottom: -22px;
  left: -6px;
  width: min(420px, 78%);
  height: 18px;
  background: url('/notebook/pencil-underline.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0.62;
  transform: rotate(-1deg);
}

.eyebrow,
.project-status {
  margin: 0 0 10px;
  color: var(--ink-soft);
  font-size: 1.02rem;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  font-size: clamp(4rem, 10vw, 7.8rem);
  line-height: 0.78;
  transform: rotate(-1deg);
}

h2 {
  margin-bottom: 12px;
  font-size: clamp(2.5rem, 5vw, 4.4rem);
  line-height: 0.9;
}

p {
  line-height: 1.7;
}

.project-list {
  display: grid;
}

.project-row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(320px, 1fr);
  align-items: center;
  gap: clamp(32px, 7vw, 80px);
  padding: clamp(36px, 6vw, 72px) 0;
  border-top: 2px dashed var(--pencil-line);
}

.project-row:last-child {
  border-bottom: 2px dashed var(--pencil-line);
}

.project-row:nth-child(even) .project-copy {
  grid-column: 2;
  grid-row: 1;
}

.project-row:nth-child(even) .project-visual {
  grid-column: 1;
  grid-row: 1;
}

.project-row::after {
  position: absolute;
  top: 24px;
  right: 0;
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.35rem;
  content: 'project note';
  opacity: 0.22;
  transform: rotate(4deg);
}

.project-meta {
  font-weight: 700;
}

.tag-list,
.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-list {
  margin: 24px 0 18px;
  padding: 0;
  list-style: none;
}

.tag-list li {
  border: 1px solid var(--pencil-line);
  border-radius: 48% 52% 46% 54% / 52% 44% 56% 48%;
  padding: 7px 10px;
  background: rgb(255 250 240 / 46%);
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.08rem;
}

.project-actions a {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  padding: 0 14px;
  border: 1.5px solid var(--ink);
  border-radius: 48% 52% 45% 55%;
  background: rgb(255 250 240 / 52%);
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.15rem;
  text-decoration: none;
  transform: rotate(-0.6deg);
}

.project-actions a:nth-child(even) {
  transform: rotate(0.9deg);
}

.project-visual {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  margin: 8px 0;
  border: 10px solid var(--paper-light);
  border-bottom-width: 32px;
  background: var(--paper-light);
  box-shadow:
    0 0 0 1px var(--pencil-line),
    7px 9px 0 rgb(76 66 52 / 10%);
  clip-path: polygon(1% 0, 99% 2%, 100% 95%, 96% 100%, 2% 98%, 0 7%);
  overflow: hidden;
  transform: rotate(1.2deg);
}

.project-row:nth-child(even) .project-visual {
  transform: rotate(-1deg);
}

.project-row:nth-child(even)::after {
  right: auto;
  left: 0;
  transform: rotate(-4deg);
}

.project-visual::before {
  position: absolute;
  top: -3px;
  left: 50%;
  z-index: 2;
  width: 100px;
  height: 34px;
  background: url('/notebook/tape.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0.9;
  pointer-events: none;
  transform: translateX(-50%) rotate(-2deg);
}

.project-visual img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.74) sepia(0.1);
}

@media (max-width: 760px) {
  .project-row {
    grid-template-columns: 1fr;
  }

  .project-row:nth-child(even) .project-copy,
  .project-row:nth-child(even) .project-visual {
    grid-column: auto;
    grid-row: auto;
  }

  .project-visual,
  .project-row:nth-child(even) .project-visual {
    transform: none;
  }
}
</style>
