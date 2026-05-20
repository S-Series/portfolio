<script setup lang="ts">
const profilePoints = [
  {
    label: 'Focus',
    value: 'Vue interface builds, responsive portfolio pages, and polished interaction details.',
  },
  {
    label: 'Style',
    value: 'Clear page structure first, then visual rhythm, motion, and small feedback states.',
  },
  {
    label: 'Current',
    value: 'Expanding this portfolio into a stronger record of projects, skills, and process.',
  },
]

const workNotes = [
  'Turns rough page ideas into routed, usable Vue screens.',
  'Keeps layouts compact, responsive, and easy to scan.',
  'Uses interaction carefully so the interface feels alive without getting noisy.',
]
</script>

<template>
  <main class="about-view">
    <section class="about-hero" aria-labelledby="about-title">
      <div class="about-copy">
        <p class="eyebrow">Profile Node</p>
        <h1 id="about-title">About</h1>
        <p>
          SSeries is a frontend-focused portfolio identity for building clean, responsive, and
          interactive web interfaces. The current work centers on Vue, TypeScript, page systems, and
          small details that make a screen feel finished.
        </p>
      </div>

      <aside class="profile-panel" aria-label="Profile summary">
        <div v-for="point in profilePoints" :key="point.label">
          <span>{{ point.label }}</span>
          <strong>{{ point.value }}</strong>
        </div>
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
  padding: clamp(44px, 6vw, 78px) 0 120px;
}

.about-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(300px, 0.62fr);
  gap: clamp(20px, 4vw, 42px);
  margin-bottom: clamp(34px, 6vw, 64px);
}

.about-copy,
.profile-panel,
.about-grid {
  border: 1px solid rgba(117, 240, 255, 0.2);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(3, 37, 58, 0.72), rgba(9, 17, 36, 0.5)),
    rgba(255, 255, 255, 0.045);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.about-copy {
  padding: clamp(26px, 5vw, 52px);
  animation: about-enter 620ms ease both;
}

.eyebrow {
  margin: 0 0 12px;
  color: #75f0ff;
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  color: #ffffff;
  font-size: clamp(3rem, 7vw, 6.4rem);
  line-height: 0.98;
}

.about-copy p {
  max-width: 680px;
  margin-bottom: 0;
  color: rgba(238, 247, 255, 0.7);
  line-height: 1.75;
}

.profile-panel {
  display: grid;
  align-content: center;
  gap: 14px;
  padding: clamp(22px, 4vw, 34px);
  background:
    linear-gradient(135deg, rgba(36, 18, 61, 0.48), rgba(0, 64, 76, 0.38)),
    rgba(255, 255, 255, 0.045);
  animation: about-enter 620ms ease 110ms both;
}

.profile-panel div {
  display: grid;
  gap: 8px;
  border-bottom: 1px solid rgba(238, 247, 255, 0.12);
  padding-bottom: 14px;
}

.profile-panel div:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.profile-panel span {
  color: #ff8ee4;
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
}

.profile-panel strong {
  color: #ffffff;
  font-size: 1.02rem;
  font-weight: 850;
  line-height: 1.55;
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(260px, 0.65fr) 1fr;
  align-items: center;
  gap: clamp(24px, 5vw, 56px);
  padding: clamp(24px, 4vw, 40px);
  animation: about-enter 620ms ease 220ms both;
}

h2 {
  margin-bottom: 0;
  color: #ffffff;
  font-size: clamp(1.9rem, 3.8vw, 3.4rem);
  line-height: 1.04;
}

.about-grid ul {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.about-grid li {
  border: 1px solid rgba(117, 240, 255, 0.2);
  border-radius: 8px;
  padding: 16px 18px;
  background: rgba(5, 7, 18, 0.46);
  color: rgba(238, 247, 255, 0.7);
  line-height: 1.65;
  animation: about-note-enter 520ms ease both;
}

.about-grid li:nth-child(1) {
  animation-delay: 330ms;
}

.about-grid li:nth-child(2) {
  animation-delay: 410ms;
}

.about-grid li:nth-child(3) {
  animation-delay: 490ms;
}

@keyframes about-enter {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(28px) scale(0.985);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }
}

@keyframes about-note-enter {
  from {
    opacity: 0;
    filter: blur(5px);
    transform: translateX(18px);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
  }
}

@media (max-width: 820px) {
  .about-hero,
  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .about-view {
    width: min(100% - 28px, 1080px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-copy,
  .profile-panel,
  .about-grid,
  .about-grid li {
    animation: none;
  }
}
</style>
