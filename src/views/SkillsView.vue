<script setup lang="ts">
const skillGroups = [
  {
    title: 'Frontend Core',
    note: 'UI foundations for building responsive application screens.',
    items: ['Vue', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Interface Craft',
    note: 'The layer used to make an interface usable and consistent.',
    items: ['Responsive UI', 'Animation', 'Accessibility', 'Design Systems', 'Interaction'],
  },
  {
    title: 'Build Workflow',
    note: 'Tools used to ship, inspect, and maintain frontend projects.',
    items: ['Vite', 'Git', 'GitHub', 'Component Structure', 'Performance'],
  },
]

const focusItems = [
  'Reusable Vue components',
  'Route based page structure',
  'Adaptive layouts',
  'Motion with restraint',
  'Clean project documentation',
]
</script>

<template>
  <main class="skills-view">
    <header class="page-intro" aria-labelledby="skills-title">
      <p class="eyebrow">Capabilities</p>
      <h1 id="skills-title">Skills</h1>
      <p>Core languages, frameworks, interface strengths, and build workflow.</p>
    </header>

    <section class="skill-groups" aria-label="Skill groups">
      <article v-for="group in skillGroups" :key="group.title" class="skill-panel">
        <div>
          <p class="panel-kicker">Stack Layer</p>
          <h2>{{ group.title }}</h2>
          <p>{{ group.note }}</p>
        </div>

        <ul>
          <li v-for="item in group.items" :key="item">{{ item }}</li>
        </ul>
      </article>
    </section>

    <section class="focus-section" aria-labelledby="focus-title">
      <div>
        <p class="eyebrow">Working Style</p>
        <h2 id="focus-title">Current focus</h2>
      </div>

      <ul>
        <li v-for="item in focusItems" :key="item">{{ item }}</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.skills-view {
  width: min(1080px, calc(100% - 36px));
  margin: 0 auto;
  padding: clamp(48px, 7vw, 88px) 0 96px;
}

.page-intro {
  position: relative;
  max-width: 720px;
  margin-bottom: clamp(44px, 7vw, 72px);
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
.panel-kicker {
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
  font-size: clamp(2.1rem, 4vw, 3.4rem);
  line-height: 0.9;
}

p,
li {
  line-height: 1.7;
}

.skill-groups {
  display: grid;
  gap: 34px;
  padding-top: 16px;
}

.skill-panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(280px, 1fr);
  align-items: start;
  gap: clamp(28px, 6vw, 72px);
  padding: clamp(30px, 5vw, 48px);
  border: 1.5px solid var(--pencil-line);
  background:
    url('/notebook/paper-grain.svg') repeat,
    var(--paper-light);
  box-shadow: 6px 8px 0 rgb(78 68 54 / 9%);
  clip-path: polygon(1% 1%, 98% 0, 100% 95%, 97% 100%, 2% 98%, 0 8%);
  transform: rotate(-0.35deg);
  width: 94%;
}

.skill-panel:nth-child(even) {
  margin-left: auto;
  transform: rotate(0.45deg);
}

.skill-panel:nth-child(3) {
  margin-left: 3%;
}

.skill-panel::before {
  position: absolute;
  top: -6px;
  left: 14%;
  width: 102px;
  height: 35px;
  background: url('/notebook/tape.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0.84;
  transform: rotate(-3deg);
}

.skill-panel:nth-child(even)::before {
  right: 14%;
  left: auto;
  transform: rotate(3deg);
}

.skill-panel ul,
.focus-section ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-panel li,
.focus-section li {
  border: 1.5px solid var(--pencil-line);
  border-radius: 49% 51% 47% 53% / 53% 46% 54% 47%;
  padding: 8px 11px;
  background: rgb(247 241 227 / 54%);
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.18rem;
  transform: rotate(-0.8deg);
}

.skill-panel li:nth-child(even),
.focus-section li:nth-child(even) {
  transform: rotate(0.9deg);
}

.focus-section {
  position: relative;
  display: grid;
  grid-template-columns: minmax(240px, 0.7fr) 1fr;
  align-items: start;
  gap: clamp(28px, 6vw, 72px);
  margin-top: clamp(48px, 7vw, 80px);
  padding-top: 40px;
  border-top: 2px dashed var(--pencil-line);
}

@media (max-width: 720px) {
  .skill-panel,
  .focus-section {
    grid-template-columns: 1fr;
  }

  .skill-panel,
  .skill-panel:nth-child(even) {
    width: 100%;
    margin-left: 0;
    transform: none;
  }
}
</style>
