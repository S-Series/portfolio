<template>
  <main class="contact-view">
    <section class="contact-hero" aria-labelledby="contact-title">
      <div class="contact-copy">
        <p class="eyebrow">Open Channel</p>
        <h1 id="contact-title">Contact</h1>
        <p>
          Portfolio work, small interface builds, and Vue-based experiments are good fits. Send the
          context, deadline, and the shape of the thing you want to make.
        </p>
      </div>

      <aside class="signal-panel" aria-label="Contact details">
        <div>
          <span>Primary</span>
          <a href="https://github.com/S-Series" target="_blank" rel="noopener">github.com/S-Series</a>
        </div>
        <div>
          <span>GitHub</span>
          <a href="https://github.com/S-Series" target="_blank" rel="noopener">S-Series</a>
        </div>
        <div>
          <span>Response</span>
          <strong>Usually within 1-2 days</strong>
        </div>
      </aside>
    </section>

    <section class="contact-grid" aria-label="Contact topics">
      <article>
        <span>01</span>
        <h2>Project Inquiry</h2>
        <p>Share the goal, audience, core screens, and any existing design or repository context.</p>
      </article>

      <article>
        <span>02</span>
        <h2>Collaboration</h2>
        <p>Useful for frontend polish, Vue page structure, interactive details, and portfolio systems.</p>
      </article>

      <article>
        <span>03</span>
        <h2>Quick Signal</h2>
        <p>A short note is enough when the idea is early. The first reply can help shape the next step.</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.contact-view {
  width: min(1080px, calc(100% - 36px));
  margin: 0 auto;
  padding: clamp(44px, 6vw, 78px) 0 120px;
}

.contact-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(280px, 0.56fr);
  align-items: stretch;
  gap: clamp(20px, 4vw, 42px);
  margin-bottom: clamp(34px, 6vw, 64px);
}

.contact-copy,
.signal-panel,
.contact-grid article {
  border: 1px solid rgba(117, 240, 255, 0.2);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(3, 37, 58, 0.72), rgba(9, 17, 36, 0.5)),
    rgba(255, 255, 255, 0.045);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.contact-copy {
  padding: clamp(26px, 5vw, 52px);
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

.contact-copy p {
  max-width: 620px;
  margin-bottom: 0;
  color: rgba(238, 247, 255, 0.7);
  line-height: 1.75;
}

.signal-panel {
  display: grid;
  align-content: center;
  gap: 14px;
  padding: clamp(22px, 4vw, 34px);
  background:
    linear-gradient(135deg, rgba(36, 18, 61, 0.48), rgba(0, 64, 76, 0.38)),
    rgba(255, 255, 255, 0.045);
}

.signal-panel div {
  display: grid;
  gap: 8px;
  border-bottom: 1px solid rgba(238, 247, 255, 0.12);
  padding-bottom: 14px;
}

.signal-panel div:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.signal-panel span,
.contact-grid span {
  color: #ff8ee4;
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
}

.signal-panel a,
.signal-panel strong {
  color: #ffffff;
  font-size: 1.08rem;
  font-weight: 900;
  overflow-wrap: anywhere;
}

.signal-panel a:hover {
  color: #75f0ff;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.contact-grid article {
  min-height: 220px;
  padding: clamp(22px, 3vw, 30px);
}

.contact-grid span {
  display: inline-flex;
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 14px;
  color: #ffffff;
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  line-height: 1.04;
}

.contact-grid p {
  margin-bottom: 0;
  color: rgba(238, 247, 255, 0.66);
  line-height: 1.7;
}

@media (max-width: 820px) {
  .contact-hero,
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .contact-view {
    width: min(100% - 28px, 1080px);
  }
}
</style>
