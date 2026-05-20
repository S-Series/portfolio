<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()
const pointer = { x: 0, y: 0 }
let animationFrame = 0
let resizeObserver: ResizeObserver | undefined
let reducedMotion = false

type Point3D = {
  x: number
  y: number
  z: number
}

const cubePoints: Point3D[] = [
  { x: -1, y: -1, z: -1 },
  { x: 1, y: -1, z: -1 },
  { x: 1, y: 1, z: -1 },
  { x: -1, y: 1, z: -1 },
  { x: -1, y: -1, z: 1 },
  { x: 1, y: -1, z: 1 },
  { x: 1, y: 1, z: 1 },
  { x: -1, y: 1, z: 1 },
]

const cubeEdges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
]

const experiments = [
  {
    code: '01',
    status: 'Canvas',
    title: 'Canvas Motion',
    meta: 'requestAnimationFrame / 2D drawing context',
    note: 'A native canvas loop renders rotating wireframe objects and orbit points.',
    details: ['Frame loop', 'Glow strokes', 'Orbit particles'],
  },
  {
    code: '02',
    status: 'Input',
    title: 'Pointer Depth',
    meta: 'Pointer event mapping / camera tilt',
    note: 'Mouse position changes the camera angle, giving the scene a light 3D response.',
    details: ['Pointer tracking', 'Rotation bias', 'Depth scaling'],
  },
  {
    code: '03',
    status: 'Next',
    title: 'Future Track',
    meta: 'WebGL / Three.js / shader experiments',
    note: 'This route can grow into WebGL, Three.js, shaders, or physics experiments later.',
    details: ['Three.js scene', 'Shader pass', 'Physics motion'],
  },
]

const projectPoint = (
  point: Point3D,
  width: number,
  height: number,
  time: number,
) => {
  const pointerTiltX = pointer.y * 0.34
  const pointerTiltY = pointer.x * 0.42
  const angleX = time * 0.00042 + pointerTiltX
  const angleY = time * 0.00058 + pointerTiltY
  const cosX = Math.cos(angleX)
  const sinX = Math.sin(angleX)
  const cosY = Math.cos(angleY)
  const sinY = Math.sin(angleY)
  const y = point.y * cosX - point.z * sinX
  const z = point.y * sinX + point.z * cosX
  const x = point.x * cosY + z * sinY
  const depth = -point.x * sinY + z * cosY + 4.2
  const scale = Math.min(width, height) * 0.22

  return {
    x: width * 0.5 + (x / depth) * scale,
    y: height * 0.5 + (y / depth) * scale,
    depth,
  }
}

const drawScene = (time: number) => {
  const canvas = canvasRef.value
  const context = canvas?.getContext('2d')
  if (!canvas || !context) return

  const rect = canvas.getBoundingClientRect()
  const density = window.devicePixelRatio || 1
  const width = Math.max(1, Math.floor(rect.width * density))
  const height = Math.max(1, Math.floor(rect.height * density))

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }

  context.clearRect(0, 0, width, height)

  const gradient = context.createRadialGradient(width * 0.55, height * 0.44, 20, width * 0.5, height * 0.5, width * 0.62)
  gradient.addColorStop(0, 'rgba(117, 240, 255, 0.18)')
  gradient.addColorStop(0.5, 'rgba(255, 91, 215, 0.08)')
  gradient.addColorStop(1, 'rgba(5, 7, 18, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)

  const projected = cubePoints.map((point) => projectPoint(point, width, height, time))

  cubeEdges.forEach(([from, to]) => {
    const start = projected[from]
    const end = projected[to]
    if (!start || !end) return

    context.beginPath()
    context.moveTo(start.x, start.y)
    context.lineTo(end.x, end.y)
    context.lineWidth = 2 * density
    context.strokeStyle = `rgba(117, 240, 255, ${0.34 + Math.min(start.depth, end.depth) * 0.08})`
    context.shadowBlur = 14 * density
    context.shadowColor = 'rgba(117, 240, 255, 0.34)'
    context.stroke()
  })

  context.shadowBlur = 0

  for (let index = 0; index < 28; index += 1) {
    const angle = time * 0.00036 + index * 0.72
    const orbit = Math.min(width, height) * (0.16 + (index % 5) * 0.028)
    const depth = 0.62 + Math.sin(angle * 1.7) * 0.28
    const x = width * 0.5 + Math.cos(angle) * orbit * (1.15 + pointer.x * 0.1)
    const y = height * 0.5 + Math.sin(angle * 1.24) * orbit * (0.42 + pointer.y * 0.08)
    const radius = (2.2 + depth * 3.2) * density

    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fillStyle = index % 3 === 0 ? 'rgba(255, 91, 215, 0.76)' : 'rgba(238, 247, 255, 0.7)'
    context.fill()
  }

  context.beginPath()
  context.arc(width * 0.5, height * 0.5, Math.min(width, height) * 0.24, 0, Math.PI * 2)
  context.lineWidth = density
  context.strokeStyle = 'rgba(255, 255, 255, 0.12)'
  context.stroke()

  if (!reducedMotion) {
    animationFrame = window.requestAnimationFrame(drawScene)
  }
}

const handlePointerMove = (event: PointerEvent) => {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return

  pointer.x = (event.clientX - rect.left) / rect.width - 0.5
  pointer.y = (event.clientY - rect.top) / rect.height - 0.5
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resizeObserver = new ResizeObserver(() => drawScene(performance.now()))

  if (canvasRef.value) {
    resizeObserver.observe(canvasRef.value)
    canvasRef.value.addEventListener('pointermove', handlePointerMove)
  }

  drawScene(performance.now())
})

onUnmounted(() => {
  window.cancelAnimationFrame(animationFrame)
  resizeObserver?.disconnect()
  canvasRef.value?.removeEventListener('pointermove', handlePointerMove)
})
</script>

<template>
  <main class="playground-view">
    <section class="playground-intro" aria-labelledby="playground-title">
      <p class="eyebrow">Motion Lab</p>
      <h1 id="playground-title">Playground</h1>
      <p>
        A small route for visual experiments: canvas motion, pseudo-3D geometry, pointer-driven
        depth, and the kind of interaction work that does not fit neatly inside a static project
        card.
      </p>
    </section>

    <section class="playground-stage" aria-label="Animated canvas playground">
      <div class="canvas-panel" aria-label="Animated canvas playground">
        <canvas ref="canvasRef"></canvas>
      </div>
    </section>

    <section class="experiment-editorial" aria-label="Playground experiment notes">
      <template v-for="(experiment, index) in experiments" :key="experiment.title">
        <div class="status-divider">
          <span>{{ experiment.status }}</span>
        </div>

        <article
          class="experiment-row"
          :class="index % 2 === 0 ? 'visual-right' : 'visual-left'"
        >
          <div class="experiment-copy">
            <p class="experiment-status">{{ experiment.status }} / {{ experiment.code }}</p>
            <h2>{{ experiment.title }}</h2>
            <p class="experiment-meta">{{ experiment.meta }}</p>
            <p class="experiment-summary">{{ experiment.note }}</p>
          </div>

          <div class="experiment-visual" aria-hidden="true">
            <span>{{ experiment.code }}</span>
            <strong>{{ experiment.title }}</strong>
            <ul>
              <li v-for="detail in experiment.details" :key="detail">{{ detail }}</li>
            </ul>
          </div>
        </article>
      </template>
    </section>
  </main>
</template>

<style scoped>
.playground-view {
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
  padding: clamp(44px, 6vw, 78px) 0 120px;
}

.playground-intro {
  margin-bottom: clamp(34px, 6vw, 64px);
}

.playground-intro,
.canvas-panel,
.experiment-visual {
  min-width: 0;
  border: 1px solid rgba(117, 240, 255, 0.2);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(3, 37, 58, 0.72), rgba(9, 17, 36, 0.5)),
    rgba(255, 255, 255, 0.045);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.playground-intro {
  padding: clamp(26px, 5vw, 52px);
  animation: playground-enter 640ms ease both;
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
  overflow-wrap: anywhere;
}

.playground-intro p {
  max-width: 620px;
  margin-bottom: 0;
  color: rgba(238, 247, 255, 0.7);
  line-height: 1.75;
}

.playground-stage {
  margin-bottom: clamp(42px, 7vw, 86px);
}

.canvas-panel {
  position: relative;
  min-height: clamp(360px, 52vw, 640px);
  overflow: hidden;
  background:
    linear-gradient(145deg, rgba(117, 240, 255, 0.08), rgba(255, 91, 215, 0.08)),
    rgba(5, 7, 18, 0.72);
  animation: playground-enter 640ms ease 120ms both;
}

.canvas-panel::before,
.canvas-panel::after {
  position: absolute;
  content: '';
  pointer-events: none;
}

.canvas-panel::before {
  inset: 18px;
  border: 1px solid rgba(238, 247, 255, 0.1);
  clip-path: polygon(8% 0, 92% 0, 100% 14%, 100% 86%, 92% 100%, 8% 100%, 0 86%, 0 14%);
}

.canvas-panel::after {
  top: 0;
  left: 16%;
  width: 68%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #75f0ff, transparent);
  box-shadow: 0 0 26px rgba(117, 240, 255, 0.72);
}

canvas {
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: inherit;
}

.experiment-editorial {
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

.experiment-row {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(360px, 0.9fr);
  align-items: center;
  gap: clamp(32px, 7vw, 88px);
  margin-bottom: clamp(44px, 7vw, 86px);
  animation: playground-enter 620ms ease both;
}

.experiment-row.visual-left {
  grid-template-columns: minmax(360px, 0.9fr) minmax(0, 0.78fr);
}

.visual-left .experiment-copy {
  grid-column: 2;
}

.visual-left .experiment-visual {
  grid-column: 1;
  grid-row: 1;
  justify-self: start;
  transform: perspective(920px) rotateY(16deg) rotateX(4deg) rotateZ(-1.5deg);
}

.experiment-copy {
  max-width: 520px;
}

.experiment-status {
  margin: 0 0 12px;
  color: #75f0ff;
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
}

h2 {
  margin-bottom: 16px;
  color: #ffffff;
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  line-height: 0.98;
}

.experiment-meta {
  margin-bottom: 16px;
  color: rgba(117, 240, 255, 0.78);
  font-weight: 900;
}

.experiment-summary {
  margin-bottom: 0;
  color: rgba(238, 247, 255, 0.68);
  line-height: 1.75;
}

.experiment-visual {
  position: relative;
  display: grid;
  width: min(100%, 560px);
  aspect-ratio: 16 / 9;
  align-content: center;
  gap: 16px;
  justify-self: end;
  overflow: hidden;
  padding: clamp(20px, 4vw, 36px);
  background:
    linear-gradient(135deg, rgba(117, 240, 255, 0.1), rgba(255, 91, 215, 0.08)),
    rgba(255, 255, 255, 0.045);
  box-shadow:
    inset 0 0 34px rgba(117, 240, 255, 0.08),
    0 24px 80px rgba(0, 0, 0, 0.26);
  transform: perspective(920px) rotateY(-16deg) rotateX(4deg) rotateZ(1.5deg);
  transform-style: preserve-3d;
}

.experiment-visual::before,
.experiment-visual::after {
  position: absolute;
  content: '';
  pointer-events: none;
}

.experiment-visual::before {
  inset: 12px;
  z-index: 1;
  border: 1px solid rgba(238, 247, 255, 0.12);
  border-radius: 6px;
  transform: translateZ(18px);
}

.experiment-visual::after {
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.14), transparent 38%, rgba(0, 0, 0, 0.22)),
    repeating-linear-gradient(
      90deg,
      rgba(117, 240, 255, 0.08) 0 1px,
      transparent 1px 36px
    );
  transform: translateZ(12px);
}

.experiment-visual span,
.experiment-visual strong,
.experiment-visual ul {
  position: relative;
  z-index: 2;
  transform: translateZ(24px);
}

.experiment-visual span {
  color: #ff8ee4;
  font-size: 0.78rem;
  font-weight: 950;
}

.experiment-visual strong {
  color: #ffffff;
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  line-height: 1.02;
}

.experiment-visual ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.experiment-visual li {
  border: 1px solid rgba(117, 240, 255, 0.22);
  border-radius: 999px;
  padding: 8px 11px;
  background: rgba(5, 7, 18, 0.48);
  color: rgba(238, 247, 255, 0.82);
  font-size: 0.82rem;
  font-weight: 900;
}

@keyframes playground-enter {
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

@media (max-width: 1100px) {
  .experiment-row,
  .experiment-row.visual-left {
    grid-template-columns: 1fr;
  }

  .visual-left .experiment-copy,
  .visual-left .experiment-visual {
    grid-column: auto;
    grid-row: auto;
  }

  .experiment-visual,
  .visual-left .experiment-visual {
    justify-self: stretch;
    width: 100%;
    transform: perspective(840px) rotateY(-7deg) rotateX(2deg);
  }

  .canvas-panel {
    min-height: clamp(360px, 52vw, 520px);
  }
}

@media (max-width: 560px) {
  .playground-view {
    width: min(100% - 28px, 1180px);
  }

  .canvas-panel {
    min-height: 340px;
  }

  .experiment-editorial {
    gap: 64px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .playground-intro,
  .canvas-panel,
  .experiment-row {
    animation: none;
  }

  .experiment-visual,
  .visual-left .experiment-visual {
    transform: none;
  }
}
</style>
