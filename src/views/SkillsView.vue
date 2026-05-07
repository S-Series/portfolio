<script setup lang="ts">
const skillGroups = [
  {
    title: 'Frontend Core',
    note: 'UI foundations for building responsive application screens.',
    items: ['Vue', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Interface Craft',
    note: 'The layer that makes a portfolio feel polished, usable, and alive.',
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
    <section class="skills-hero" aria-labelledby="skills-title">
      <p class="eyebrow">Capability Matrix</p>
      <h1 id="skills-title">Skills</h1>
      <p>
        A developer skills page usually groups core languages, frameworks, UI strengths, workflow,
        and the way the developer thinks through product problems.
      </p>
    </section>

    <section class="skill-groups" aria-label="Skill groups">
      <article v-for="group in skillGroups" :key="group.title" class="skill-panel">
        <div>
          <p class="panel-kicker">Stack Layer</p>
          <h2>{{ group.title }}</h2>
          <p>{{ group.note }}</p>
        </div>

        <div class="skill-chip-grid">
          <span v-for="item in group.items" :key="item">{{ item }}</span>
        </div>
      </article>
    </section>

    <section class="focus-section" aria-labelledby="focus-title">
      <div>
        <p class="eyebrow">Working Style</p>
        <h2 id="focus-title">What this page can grow into</h2>
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
  padding: clamp(44px, 6vw, 78px) 0 120px;
}

.skills-hero {
  max-width: 760px;
  margin: 0 auto clamp(42px, 6vw, 72px);
  text-align: center;
}

.eyebrow,
.panel-kicker {
  margin: 0 0 12px;
  color: #75f0ff;
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0;
  text-transform: uppercase;
}

.panel-kicker {
  color: rgba(117, 240, 255, 0.78);
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

h2 {
  margin-bottom: 14px;
  color: #ffffff;
  font-size: clamp(1.9rem, 3vw, 3.1rem);
  line-height: 1.04;
}

.skills-hero p,
.skill-panel p,
.focus-section li {
  color: rgba(238, 247, 255, 0.68);
  line-height: 1.7;
}

.skills-hero p {
  max-width: 660px;
  margin: 0 auto;
}

.skill-groups {
  display: grid;
  gap: 16px;
}

.skill-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(280px, 0.78fr);
  align-items: center;
  gap: clamp(24px, 5vw, 64px);
  border: 1px solid rgba(117, 240, 255, 0.2);
  border-radius: 8px;
  padding: clamp(22px, 4vw, 38px);
  background:
    linear-gradient(135deg, rgba(3, 37, 58, 0.72), rgba(9, 17, 36, 0.5)),
    rgba(255, 255, 255, 0.045);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.skill-panel:nth-child(even) {
  background:
    linear-gradient(135deg, rgba(36, 18, 61, 0.42), rgba(0, 64, 76, 0.36)),
    rgba(255, 255, 255, 0.045);
}

.skill-chip-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.skill-chip-grid span,
.focus-section li {
  border: 1px solid rgba(117, 240, 255, 0.22);
  border-radius: 999px;
  background: rgba(5, 7, 18, 0.46);
  color: rgba(238, 247, 255, 0.86);
  font-weight: 900;
}

.skill-chip-grid span {
  padding: 11px 14px;
}

.focus-section {
  display: grid;
  grid-template-columns: minmax(240px, 0.72fr) 1fr;
  align-items: center;
  gap: clamp(28px, 5vw, 60px);
  margin-top: clamp(34px, 6vw, 72px);
  border-top: 1px solid rgba(238, 247, 255, 0.12);
  padding-top: clamp(34px, 6vw, 62px);
}

.focus-section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.focus-section li {
  padding: 12px 15px;
}

@media (max-width: 760px) {
  .skill-panel,
  .focus-section {
    grid-template-columns: 1fr;
  }

  .skill-panel,
  .focus-section {
    text-align: center;
  }
}
</style>
