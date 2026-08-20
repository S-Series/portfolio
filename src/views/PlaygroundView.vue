<script setup lang="ts">
const experiments = [
  {
    code: '01',
    status: 'Canvas',
    title: 'Canvas Motion',
    meta: 'requestAnimationFrame / 2D drawing context',
    note: 'A route slot for a native canvas loop and geometry experiments.',
    details: ['Frame loop', 'Drawing context', 'Resize handling'],
  },
  {
    code: '02',
    status: 'Input',
    title: 'Pointer Depth',
    meta: 'Pointer event mapping / camera tilt',
    note: 'A route slot for mapping pointer input into scene state.',
    details: ['Pointer tracking', 'Rotation bias', 'Depth scaling'],
  },
  {
    code: '03',
    status: 'Next',
    title: 'Future Track',
    meta: 'WebGL / Three.js / shader experiments',
    note: 'This route can grow into WebGL, Three.js, shader, or physics experiments later.',
    details: ['Three.js scene', 'Shader pass', 'Physics motion'],
  },
]
</script>

<template>
  <main class="playground-view">
    <header class="page-intro" aria-labelledby="playground-title">
      <p class="eyebrow">Experiments</p>
      <h1 id="playground-title">Playground</h1>
      <p>A route reserved for interactive prototypes and technical experiments.</p>
    </header>

    <section class="output-slot" aria-labelledby="output-title">
      <div>
        <p class="eyebrow">Output Slot</p>
        <h2 id="output-title">Experiment output mounts here</h2>
      </div>
      <p>The previous canvas presentation has been removed while the route structure remains.</p>
    </section>

    <section class="experiment-list" aria-label="Playground experiment notes">
      <article v-for="experiment in experiments" :key="experiment.title">
        <div>
          <p class="experiment-status">{{ experiment.status }} / {{ experiment.code }}</p>
          <h2>{{ experiment.title }}</h2>
          <p class="experiment-meta">{{ experiment.meta }}</p>
          <p>{{ experiment.note }}</p>
        </div>

        <ul>
          <li v-for="detail in experiment.details" :key="detail">{{ detail }}</li>
        </ul>
      </article>
    </section>
  </main>
</template>

<style scoped>
.playground-view {
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
.experiment-status {
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
  font-size: clamp(2rem, 4vw, 3.3rem);
  line-height: 0.92;
}

p,
li {
  line-height: 1.7;
}

.output-slot {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.7fr);
  gap: 32px;
  min-height: 220px;
  align-items: end;
  margin-bottom: clamp(52px, 8vw, 88px);
  border: 2px dashed var(--pencil-line);
  padding: clamp(24px, 5vw, 48px);
  background:
    url('/notebook/paper-grain.svg') repeat,
    rgb(255 250 240 / 72%);
  box-shadow: 7px 9px 0 rgb(77 67 52 / 9%);
  clip-path: polygon(1% 1%, 98% 0, 100% 94%, 97% 100%, 2% 98%, 0 8%);
  transform: rotate(0.35deg);
}

.output-slot::before {
  position: absolute;
  top: -5px;
  left: 50%;
  width: 108px;
  height: 36px;
  background: url('/notebook/tape.svg') center / 100% 100% no-repeat;
  content: '';
  opacity: 0.9;
  transform: translateX(-50%) rotate(-2deg);
}

.output-slot::after {
  position: absolute;
  right: 28px;
  bottom: 22px;
  width: 66px;
  aspect-ratio: 1;
  background: url('/notebook/doodle-star.svg') center / contain no-repeat;
  content: '';
  opacity: 0.18;
  transform: rotate(9deg);
}

.output-slot h2,
.output-slot p {
  margin-bottom: 0;
}

.experiment-list {
  display: grid;
  border-top: 2px dashed var(--pencil-line);
}

.experiment-list article {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(260px, 0.7fr);
  gap: clamp(28px, 6vw, 72px);
  padding: clamp(32px, 5vw, 52px) 0;
  border-bottom: 2px dashed var(--pencil-line);
}

.experiment-meta {
  font-weight: 700;
}

.experiment-list ul {
  margin: 0;
  padding-left: 20px;
  font-family: 'Notebook Handwriting', cursive;
  font-size: 1.3rem;
}

.experiment-list li::marker {
  content: '✓  ';
}

@media (max-width: 720px) {
  .output-slot,
  .experiment-list article {
    grid-template-columns: 1fr;
  }

  .output-slot {
    transform: none;
  }
}
</style>
