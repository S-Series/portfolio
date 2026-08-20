<template>
  <main class="contact-view">
    <section class="contact-hero" aria-labelledby="contact-title">
      <div class="contact-copy">
        <p class="eyebrow">Get in touch</p>
        <h1 id="contact-title">Contact</h1>
        <p>
          Portfolio work, interface builds, and Vue-based experiments are good fits. Send the
          context, deadline, and the shape of the thing you want to make.
        </p>
      </div>

      <aside class="contact-details" aria-label="Contact details">
        <dl>
          <div>
            <dt>Primary</dt>
            <dd>
              <a href="https://github.com/S-Series" target="_blank" rel="noopener">
                github.com/S-Series
              </a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href="https://github.com/S-Series" target="_blank" rel="noopener">S-Series</a>
            </dd>
          </div>
          <div>
            <dt>Response</dt>
            <dd>Usually within 1-2 days</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section class="contact-grid" aria-label="Contact topics">
      <article>
        <span>01</span>
        <h2>Project Inquiry</h2>
        <p>Share the goal, audience, core screens, and any existing repository context.</p>
      </article>

      <article>
        <span>02</span>
        <h2>Collaboration</h2>
        <p>Useful for frontend work, Vue page structure, and portfolio systems.</p>
      </article>

      <article>
        <span>03</span>
        <h2>Quick Signal</h2>
        <p>
          A short note is enough when the idea is early. The first reply can shape the next step.
        </p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.contact-view {
  width: min(1080px, calc(100% - 36px));
  margin: 0 auto;
  padding: clamp(48px, 7vw, 88px) 0 96px;
}

.contact-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(280px, 0.6fr);
  gap: clamp(32px, 6vw, 72px);
  margin-bottom: clamp(52px, 8vw, 88px);
}

.contact-copy,
.contact-details,
.contact-grid article {
  position: relative;
  border-top: 2px dashed var(--pencil-line);
  padding-top: 28px;
}

.contact-copy::after {
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

.contact-details {
  padding: 36px 28px 28px;
  border: 1.5px solid var(--pencil-line);
  background:
    url('/notebook/paper-grain.svg') repeat,
    var(--paper-light);
  box-shadow: 6px 8px 0 rgb(77 67 52 / 9%);
  clip-path: polygon(1% 1%, 98% 0, 100% 95%, 96% 100%, 2% 98%, 0 8%);
  transform: rotate(0.8deg);
}

.contact-details::before,
.contact-grid article::before {
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
dt,
.contact-grid span {
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
  margin-bottom: 12px;
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 0.94;
}

p,
dd {
  line-height: 1.7;
}

.contact-details dl {
  margin-bottom: 0;
}

.contact-details dl > div {
  padding-bottom: 18px;
  border-bottom: 1px dashed var(--pencil-line);
}

.contact-details dl > div + div {
  padding-top: 18px;
}

.contact-details dd {
  margin-bottom: 0;
  margin-left: 0;
  overflow-wrap: anywhere;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.contact-grid article {
  min-height: 220px;
  padding: 34px 24px 26px;
  border: 1.5px solid var(--pencil-line);
  background:
    url('/notebook/paper-grain.svg') repeat,
    rgb(255 250 240 / 88%);
  box-shadow: 5px 7px 0 rgb(77 67 52 / 8%);
  clip-path: polygon(1% 1%, 98% 0, 100% 95%, 96% 100%, 2% 98%, 0 8%);
}

.contact-grid article:nth-child(1) {
  transform: rotate(-0.7deg);
}

.contact-grid article:nth-child(2) {
  transform: translateY(8px) rotate(0.6deg);
}

.contact-grid article:nth-child(3) {
  transform: rotate(-0.4deg);
}

.contact-grid article:nth-child(even)::before {
  left: 30%;
  transform: translateX(-50%) rotate(3deg);
}

.contact-grid span {
  display: block;
}

.contact-grid p {
  margin-bottom: 0;
}

@media (max-width: 760px) {
  .contact-hero,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-copy::after {
    top: clamp(112px, 32vw, 148px);
  }

  .contact-details,
  .contact-grid article,
  .contact-grid article:nth-child(2) {
    transform: none;
  }
}
</style>
