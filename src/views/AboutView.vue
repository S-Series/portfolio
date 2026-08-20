<script setup lang="ts">
const profilePoints = [
  {
    label: 'Focus',
    value: 'Vue interface builds, responsive portfolio pages, and interaction details.',
  },
  {
    label: 'Approach',
    value: 'Clear page structure first, followed by visual direction and feedback states.',
  },
  {
    label: 'Current',
    value: 'Expanding this portfolio into a record of projects, skills, and process.',
  },
]

const workNotes = [
  'Turns rough page ideas into routed, usable Vue screens.',
  'Keeps layouts responsive and easy to scan.',
  'Separates content structure from the visual layer.',
]
</script>

<template>
  <main class="about-view">
    <section class="about-hero" aria-labelledby="about-title">
      <div class="about-copy">
        <p class="eyebrow">Profile</p>
        <h1 id="about-title">About</h1>
        <p>
          SSeries is a frontend-focused portfolio identity for building responsive and interactive
          web interfaces. The current work centers on Vue, TypeScript, and page systems.
        </p>
      </div>

      <aside class="profile-panel" aria-label="Profile summary">
        <dl>
          <div v-for="point in profilePoints" :key="point.label">
            <dt>{{ point.label }}</dt>
            <dd>{{ point.value }}</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section class="about-grid" aria-labelledby="working-title">
      <div>
        <p class="eyebrow">Working Notes</p>
        <h2 id="working-title">How the work takes shape</h2>
      </div>

      <ul>
        <li v-for="note in workNotes" :key="note">{{ note }}</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.about-view {
  width: min(1080px, calc(100% - 36px));
  margin: 0 auto;
  padding: clamp(48px, 7vw, 88px) 0 96px;
}

.about-hero,
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(300px, 0.65fr);
  gap: clamp(32px, 6vw, 72px);
}

.about-hero {
  margin-bottom: clamp(52px, 8vw, 88px);
}

.about-copy,
.profile-panel,
.about-grid {
  position: relative;
  border-top: 2px dashed var(--pencil-line);
  padding-top: 28px;
}

.about-copy::after {
  position: absolute;
  top: clamp(118px, 15vw, 170px);
  left: -6px;
  width: min(420px, 82%);
  height: 18px;
  background: url('/notebook/pencil-underline.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0.58;
  transform: rotate(-1deg);
}

.profile-panel {
  padding: 36px 28px 28px;
  border: 1.5px solid var(--pencil-line);
  background:
    url('/notebook/paper-grain.svg') repeat,
    var(--paper-light);
  box-shadow: 6px 8px 0 rgb(77 67 52 / 9%);
  clip-path: polygon(1% 1%, 98% 0, 100% 95%, 96% 100%, 2% 98%, 0 8%);
  transform: rotate(0.8deg);
}

.profile-panel::before {
  position: absolute;
  top: -5px;
  left: 50%;
  width: 104px;
  height: 35px;
  background: url('/notebook/tape.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0.88;
  transform: translateX(-50%) rotate(-2deg);
}

.eyebrow,
dt {
  margin: 0 0 10px;
  color: var(--ink-soft);
  font-size: 1.02rem;
  text-transform: uppercase;
}

h1,
h2,
p,
dl,
dd {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  font-size: clamp(4rem, 10vw, 7.8rem);
  line-height: 0.78;
  transform: rotate(-1deg);
}

h2 {
  margin-bottom: 20px;
  font-size: clamp(2.2rem, 4vw, 3.7rem);
  line-height: 0.92;
}

p,
dd,
li {
  line-height: 1.7;
}

.profile-panel dl {
  margin-bottom: 0;
}

.profile-panel dl > div {
  padding: 0 0 18px;
  border-bottom: 1px dashed var(--pencil-line);
}

.profile-panel dl > div + div {
  padding-top: 18px;
}

.profile-panel dd {
  margin-bottom: 0;
  margin-left: 0;
}

.about-grid ul {
  display: grid;
  gap: 12px;
  margin: 0;
  padding-left: 20px;
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.3rem;
}

.about-grid li::marker {
  content: '□  ';
}

@media (max-width: 760px) {
  .about-hero,
  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-copy::after {
    top: clamp(112px, 32vw, 148px);
  }

  .profile-panel {
    transform: none;
  }
}
</style>
