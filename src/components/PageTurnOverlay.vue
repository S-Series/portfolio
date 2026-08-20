<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { PageFlip } from 'page-flip'

defineProps<{
  phase: 'idle' | 'covering' | 'covered' | 'revealing'
}>()

const overlayRef = ref<HTMLElement>()
const mountRef = ref<HTMLElement>()
const isActive = ref(false)

let pageFlip: PageFlip | undefined
let bookElement: HTMLElement | undefined
let oldPageElement: HTMLElement | undefined
let interludePageElement: HTMLElement | undefined
let nextPageSlot: HTMLElement | undefined
let expectedPage: number | undefined
let resolveFlip: (() => void) | undefined
let flipFallbackTimer = 0
let transitionToken = 0

const afterPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })

const settleFlip = () => {
  window.clearTimeout(flipFallbackTimer)
  flipFallbackTimer = 0
  expectedPage = undefined
  resolveFlip?.()
  resolveFlip = undefined
}

const waitForPage = (pageNumber: number) =>
  new Promise<void>((resolve) => {
    if (pageFlip?.getCurrentPageIndex() === pageNumber) {
      resolve()
      return
    }

    expectedPage = pageNumber
    resolveFlip = resolve
    flipFallbackTimer = window.setTimeout(() => {
      pageFlip?.turnToPage(pageNumber)
      settleFlip()
    }, 1150)
  })

const createSnapshot = () => {
  const source = document.querySelector<HTMLElement>('.app-shell')
  const viewport = document.createElement('div')
  viewport.className = 'page-turn-snapshot-viewport'

  if (!source) return viewport

  const clone = source.cloneNode(true) as HTMLElement
  const capturedScroll = window.scrollY

  clone
    .querySelectorAll('.page-turn-overlay, .sidebar-backdrop, .sidebar-menu')
    .forEach((element) => element.remove())

  clone.removeAttribute('id')
  clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'))
  clone.querySelectorAll<HTMLElement>('a, button, input, textarea, select').forEach((element) => {
    element.setAttribute('tabindex', '-1')
  })

  clone.classList.add('page-turn-snapshot-clone')
  clone.style.width = `${document.documentElement.clientWidth}px`
  clone.style.minHeight = `${Math.max(source.scrollHeight, window.innerHeight)}px`
  clone.style.pointerEvents = 'none'
  clone.style.transform = `translate3d(0, -${capturedScroll}px, 0)`
  clone.style.transformOrigin = 'top left'

  const clonedHeader = clone.querySelector<HTMLElement>('.site-header')
  if (clonedHeader) {
    clonedHeader.style.position = 'absolute'
    clonedHeader.style.top = `${capturedScroll}px`
    clonedHeader.style.right = '0'
    clonedHeader.style.left = '0'
  }

  viewport.append(clone)
  return viewport
}

const createPage = (modifier: string) => {
  const page = document.createElement('section')
  page.className = `page-turn-page ${modifier}`
  page.setAttribute('aria-hidden', 'true')
  return page
}

const createPaperUnderlay = () => {
  const paper = document.createElement('div')
  paper.className = 'page-turn-underlay-paper'
  return paper
}

const createEngine = (oldSnapshot: HTMLElement, label: string) => {
  if (!mountRef.value) throw new Error('Page turn mount is not ready')

  const viewportWidth = Math.max(document.documentElement.clientWidth, 320)
  const viewportHeight = Math.max(window.innerHeight, 480)
  const minimumPortraitWidth = Math.floor(viewportWidth / 2) + 1

  bookElement = document.createElement('div')
  bookElement.className = 'page-turn-book'

  const oldPage = createPage('page-turn-page--snapshot')
  oldPage.append(oldSnapshot)
  oldPageElement = oldPage

  const interludePage = createPage('page-turn-page--interlude')
  interludePageElement = interludePage
  const interludePaper = document.createElement('div')
  interludePaper.className = 'page-turn-interlude-paper'

  const kicker = document.createElement('span')
  kicker.className = 'page-turn-kicker'
  kicker.textContent = 'TURNING TO'

  const title = document.createElement('strong')
  title.className = 'page-turn-title'
  title.textContent = label

  const underline = document.createElement('span')
  underline.className = 'page-turn-title-line'

  interludePaper.append(kicker, title, underline)
  interludePage.append(interludePaper)

  const nextPage = createPage('page-turn-page--snapshot page-turn-page--next')
  nextPageSlot = document.createElement('div')
  nextPageSlot.className = 'page-turn-next-slot'
  nextPage.append(nextPageSlot)

  bookElement.append(oldPage, interludePage, nextPage)
  mountRef.value.replaceChildren(bookElement)

  pageFlip = new PageFlip(bookElement, {
    width: viewportWidth,
    height: viewportHeight,
    size: 'stretch',
    minWidth: minimumPortraitWidth,
    maxWidth: viewportWidth,
    minHeight: Math.min(480, viewportHeight),
    maxHeight: viewportHeight,
    autoSize: false,
    usePortrait: true,
    showCover: false,
    drawShadow: true,
    maxShadowOpacity: 0.42,
    flippingTime: 760,
    mobileScrollSupport: false,
    useMouseEvents: false,
    showPageCorners: false,
    disableFlipByClick: true,
  })

  pageFlip.on<number>('flip', (event) => {
    if (event.data === expectedPage) settleFlip()
  })
  pageFlip.loadFromHTML([oldPage, interludePage, nextPage])
}

const cleanupEngine = () => {
  settleFlip()

  if (pageFlip) {
    try {
      pageFlip.destroy()
    } catch {
      bookElement?.remove()
    }
  }

  pageFlip = undefined
  bookElement = undefined
  oldPageElement = undefined
  interludePageElement = undefined
  nextPageSlot = undefined
  mountRef.value?.replaceChildren()
}

const cover = async (label: string) => {
  const token = ++transitionToken
  const oldSnapshot = createSnapshot()

  cleanupEngine()
  isActive.value = true
  await nextTick()
  createEngine(oldSnapshot, label)
  await afterPaint()

  if (token !== transitionToken || !pageFlip) return

  const flipFinished = waitForPage(1)
  pageFlip.flipNext('bottom')
  requestAnimationFrame(() => oldPageElement?.replaceChildren(createPaperUnderlay()))
  await flipFinished
}

const reveal = async () => {
  const token = transitionToken

  if (!pageFlip || !nextPageSlot) return

  nextPageSlot.replaceChildren(createSnapshot())
  await afterPaint()

  if (token !== transitionToken || !pageFlip) return

  const flipFinished = waitForPage(2)
  pageFlip.flipNext('bottom')
  requestAnimationFrame(() => interludePageElement?.replaceChildren(createPaperUnderlay()))
  await flipFinished
  await afterPaint()

  if (token !== transitionToken) return

  isActive.value = false
  await nextTick()
  cleanupEngine()
}

const cancel = () => {
  transitionToken += 1
  isActive.value = false
  cleanupEngine()
}

defineExpose({ cover, reveal, cancel })

onBeforeUnmount(cancel)
</script>

<template>
  <div
    v-show="isActive"
    ref="overlayRef"
    class="page-turn-overlay"
    :data-phase="phase"
    aria-hidden="true"
    @wheel.prevent
    @touchmove.prevent
  >
    <div ref="mountRef" class="page-turn-book-mount"></div>
  </div>
</template>

<style>
.page-turn-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: hidden;
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 31px,
      var(--rule-blue) 32px,
      transparent 33px
    ),
    url('/notebook/paper-grain.svg') repeat,
    var(--paper);
  pointer-events: auto;
  user-select: none;
}

.page-turn-book-mount,
.page-turn-book,
.page-turn-book.stf__parent,
.page-turn-book .stf__wrapper,
.page-turn-book .stf__block {
  width: 100% !important;
  height: 100% !important;
}

.page-turn-book-mount,
.page-turn-book {
  position: absolute;
  inset: 0;
}

.page-turn-book .stf__wrapper {
  position: relative;
  padding-bottom: 0 !important;
}

.page-turn-page {
  position: relative;
  overflow: hidden;
  background: var(--paper-light);
  color: var(--ink);
  backface-visibility: hidden;
}

.page-turn-page--snapshot,
.page-turn-next-slot,
.page-turn-snapshot-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.page-turn-page--next,
.page-turn-next-slot {
  background: var(--paper);
}

.page-turn-snapshot-clone {
  position: absolute !important;
  top: 0;
  left: 0;
  max-width: none !important;
}

.page-turn-interlude-paper,
.page-turn-underlay-paper {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 31px,
      var(--rule-blue) 32px,
      transparent 33px
    ),
    url('/notebook/paper-grain.svg') repeat,
    var(--paper-light);
}

.page-turn-interlude-paper {
  display: grid;
  place-content: center;
  justify-items: center;
}

.page-turn-interlude-paper::before,
.page-turn-underlay-paper::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: clamp(18px, 2.2vw, 34px);
  width: 2px;
  background: var(--margin-red);
  content: '';
}

.page-turn-kicker {
  margin-bottom: 12px;
  font-family: 'Notebook Handwriting', 'Segoe Print', cursive;
  font-size: clamp(0.9rem, 2vw, 1.3rem);
  letter-spacing: 0.08em;
  opacity: 0.42;
}

.page-turn-title {
  font-family: 'Notebook Handwriting', 'Segoe Print', cursive;
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 400;
  line-height: 0.9;
  opacity: 0.2;
  transform: rotate(-2deg);
}

.page-turn-title-line {
  width: min(72%, 520px);
  height: 22px;
  margin-top: 8px;
  background: url('/notebook/pencil-underline.svg') center / 100% 100% no-repeat;
  opacity: 0.26;
}

@media (prefers-reduced-motion: reduce) {
  .page-turn-overlay {
    display: none !important;
  }
}
</style>
