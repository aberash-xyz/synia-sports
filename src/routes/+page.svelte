<script>
  import { t } from '$lib/i18n.js';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>{$t('brand.name')} — {$t('home.title')}</title>
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="container container-sm">
    <h1 class="hero-title">{$t('home.title')}</h1>
    <p class="lede">{$t('home.lede')}</p>
    <div class="cta-row">
      <Button href="/about" variant="primary">{$t('home.ctaPrimary')}</Button>
      <Button href="/about#contact" variant="secondary">{$t('home.ctaSecondary')}</Button>
    </div>
  </div>
</section>

<!-- PROOF STATEMENT: argument left, the same argument drawn on the right -->
<section>
  <div class="container container-lg split">
    <div class="split-text">
      <h2>{$t('home.proofTitle')}</h2>
      <p>{$t('home.proofBody')}</p>
    </div>
    <div class="split-visual">
      <p class="tl-title">{$t('home.timeline.title')}</p>
      <div class="tl" role="img" aria-label={$t('home.timeline.aria')}>
        <div class="tl-phases">
          {#each $t('home.timeline.phases') as phase}<span>{phase}</span>{/each}
        </div>
        {#each $t('home.timeline.rows') as row}
          <div class="tl-row" class:usual={row.usual}>
            <span class="tl-label">{row.label}</span>
            <div class="tl-track">
              {#each row.marks as mark, i}
                {#if mark}
                  <span class="tl-mark" style="--col: {i}"><i></i>{mark}</span>
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- EVIDENCE -->
<section class="section evidence-section">
  <div class="container container-sm evidence">
    <h2>{$t('home.evidence.title')}</h2>
    <p class="lede">{$t('home.evidence.body')}</p>
    <figure class="fig">
      <figcaption>
        <span class="fig-kicker">{$t('home.figure.kicker')}</span>
        <p class="fig-title">{$t('home.figure.title')}</p>
      </figcaption>
      <dl class="fig-rows">
        {#each $t('home.figure.rows') as row}
          <div class="fig-row" class:muted={row.muted} class:circled={row.circle}>
            <dt>{row.label} <span>{row.source}</span></dt>
            <dd>
              <span class="fig-track"><span class="fig-bar" style="width: {(row.value / 135.5) * 100}%"></span></span>
              <span class="fig-value">
                {row.value.toFixed(1)}
                {#if row.circle}
                  <!-- Hand-drawn loop, deliberately left open so it reads as pen, not shape. -->
                  <svg class="hand-circle" viewBox="0 0 100 50" aria-hidden="true"><path d="M86 12C74 2 22 1 8 17C-3 31 26 47 58 46C90 45 101 27 78 9"/></svg>
                {/if}
              </span>
            </dd>
            {#if row.note}
              <span class="hand-note">
                <svg viewBox="0 0 40 24" aria-hidden="true"><path d="M38 6C26 2 12 6 4 18M4 18L5 9M4 18L12 16"/></svg>
                {row.note}
              </span>
            {/if}
          </div>
        {/each}
      </dl>
      <p class="fig-note">{$t('home.figure.unit')} {$t('home.figure.note')}</p>
      <a class="fig-link" href="/writing/what-actually-fills-a-stadium">{$t('home.figure.link')} →</a>
    </figure>
  </div>
</section>

<!-- SEGMENTS -->
<section class="section section-lg">
  <div class="container container-lg">
    <h2 class="segments-heading">{$t('home.segmentsTitle')}</h2>
    <div class="segments">
      <article class="segment-card">
        <span class="eyebrow">{$t('home.segments.clubs.eyebrow')}</span>
        <h3>{$t('home.segments.clubs.title')}</h3>
        <p>{$t('home.segments.clubs.body')}</p>
        <ul>
          {#each $t('home.segments.clubs.bullets') as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      </article>

      <article class="segment-card">
        <span class="eyebrow">{$t('home.segments.brands.eyebrow')}</span>
        <h3>{$t('home.segments.brands.title')}</h3>
        <p>{$t('home.segments.brands.body')}</p>
        <ul>
          {#each $t('home.segments.brands.bullets') as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      </article>
    </div>
  </div>
</section>

<!-- CTA BLOCK -->
<section class="section">
  <div class="container container-md">
    <div class="cta-block">
      <h2>{$t('home.ctaBlock.title')}</h2>
      <p class="lede">{$t('home.ctaBlock.body')}</p>
      <Button href="/about#contact" variant="primary">{$t('home.ctaBlock.cta')}</Button>
    </div>
  </div>
</section>

<style>
  .hero {
    padding-block: clamp(2.5rem, 7vw, 5rem) clamp(3rem, 8vw, 6rem);
    text-align: center;
  }
  .hero-title {
    font-size: var(--fs-hero);
    line-height: var(--lh-hero);
    font-weight: var(--fw-semibold);
    letter-spacing: -0.02em;
    max-width: 22ch;
    margin-inline: auto;
  }
  .lede {
    margin-top: 1.5rem;
    max-width: 48rem;
    font-size: 1.125rem;
    color: var(--text-muted);
    line-height: 1.6;
  }
  .hero .lede { margin-inline: auto; max-width: 40rem; }
  .cta-row {
    margin-top: 2.25rem;
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .evidence-section { padding-bottom: 0; }
  .evidence h2 { max-width: 26ch; }
  .evidence .lede { max-width: 40rem; }

  /* Fig. 1: editorial chart, no card chrome. Ink rule on top, hairline tracks.
     Narrower than its container so the right margin is free for hand notes. */
  .fig {
    margin: 3.5rem 0 0;
    max-width: 44rem;
    border-top: 1px solid var(--text);
    padding-top: 1.25rem;
  }
  .fig-kicker {
    font-size: var(--fs-tiny);
    font-weight: var(--fw-medium);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-deep);
  }
  .fig-title {
    margin-top: 0.5rem;
    font-family: var(--font-heading);
    font-size: 1.5rem;
    line-height: 1.3;
    max-width: 34ch;
  }
  .fig-rows {
    margin: 2rem 0 0;
    display: grid;
    gap: 1.1rem;
  }
  .fig-row { position: relative; }
  .fig-row dt {
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
  }
  .fig-row dt span {
    margin-left: 0.4rem;
    font-weight: var(--fw-normal);
    color: var(--text-muted);
  }
  .fig-row dd {
    margin: 0.35rem 0 0;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .fig-track {
    flex: 1;
    height: 10px;
    border-bottom: 1px solid var(--border);
  }
  .fig-bar {
    display: block;
    height: 100%;
    background: var(--primary);
  }
  .fig-row.muted .fig-bar { background: var(--neutral-200); }
  .fig-row.muted dt { color: var(--text-muted); }
  .fig-value {
    position: relative;
    min-width: 3ch;
    text-align: right;
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-variant-numeric: tabular-nums;
  }
  /* Margin notes: a researcher's pen on the draft. Use sparingly, two per chart max. */
  .hand-circle {
    position: absolute;
    left: -0.7rem;
    top: -0.55rem;
    width: calc(100% + 1.4rem);
    height: calc(100% + 1.1rem);
    overflow: visible;
  }
  .hand-circle path,
  .hand-note path {
    fill: none;
    stroke: var(--accent-deep);
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
  .hand-note {
    position: absolute;
    left: calc(100% + 2.75rem);
    bottom: -0.35rem;
    width: 13rem;
    font-family: var(--font-hand);
    font-size: 1.35rem;
    line-height: 1.1;
    color: var(--accent-deep);
    transform: rotate(-2deg);
    transform-origin: left center;
  }
  .hand-note svg {
    position: absolute;
    left: -2.3rem;
    top: -0.2rem;
    width: 1.9rem;
    height: 1.15rem;
    overflow: visible;
  }
  /* Uncircled values: aim at the digits, not where a loop would be. */
  .fig-row:not(.circled) .hand-note svg { left: -2.65rem; }
  /* No margin to write in: the note drops under its bar, arrow dropped. */
  @media (max-width: 1099px) {
    .hand-note {
      position: static;
      display: block;
      width: auto;
      margin-top: 0.35rem;
      transform: none;
    }
    .hand-note svg { display: none; }
  }

  .fig-note {
    margin-top: 1.5rem;
    font-size: var(--fs-tiny);
    line-height: 1.6;
    color: var(--text-muted);
  }
  .fig-link {
    display: inline-block;
    margin-top: 0.75rem;
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
    border-bottom: 1px solid var(--accent);
  }
  .fig-link:hover { border-color: var(--text); }

  /* Split: grey argument panel + logo-gradient diagram panel. */
  .split {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 1rem;
  }
  .split-text,
  .split-visual {
    border-radius: var(--radius-lg);
    padding: clamp(2rem, 4vw, 3.5rem);
    min-height: 30rem;
  }
  .split-text {
    background: var(--bg-grey);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .split-text p {
    color: var(--text-muted);
    line-height: 1.65;
  }
  .split-visual {
    background: var(--brand-gradient);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2.5rem;
  }
  .tl-title {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    line-height: 1.2;
    max-width: 20ch;
  }

  /* Timeline: four phase columns; each row is a rail with marks placed by column. */
  .tl { display: grid; gap: 2.25rem; }
  .tl-phases {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--text);
    font-size: var(--fs-tiny);
    font-weight: var(--fw-medium);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .tl-phases span { padding-right: 0.75rem; }
  .tl-label {
    display: block;
    margin-bottom: 0.9rem;
    font-size: var(--fs-small);
    font-weight: var(--fw-semibold);
  }
  .tl-track {
    position: relative;
    height: 4.5rem;
    border-top: 2px solid var(--text);
  }
  .tl-row.usual .tl-track { border-top-style: dashed; border-top-color: rgba(0, 0, 0, 0.45); }
  .tl-row.usual .tl-label { color: var(--neutral-800); font-weight: var(--fw-medium); }
  .tl-mark {
    position: absolute;
    top: 0.85rem;
    left: calc(var(--col) * 25%);
    width: 25%;
    padding-right: 0.75rem;
    font-size: var(--fs-small);
    line-height: 1.3;
  }
  .tl-mark i {
    position: absolute;
    top: calc(-0.85rem - 7px);
    left: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--text);
  }
  .tl-row.usual .tl-mark i {
    background: #f78a3f; /* approximates the gradient where the dot lands; hides the dashed rail */
    border: 2px solid var(--text);
  }

  .segments-heading {
    margin-bottom: 3rem;
  }
  .segments {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .segment-card {
    background: var(--bg-default);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: transform 0.35s ease, border-color 0.35s ease;
  }
  .segment-card:hover {
    transform: translateY(-3px);
    border-color: var(--primary);
  }
  .segment-card h3 {
    font-size: 1.75rem;
    line-height: 1.2;
  }
  .segment-card p { color: var(--text-muted); }
  .segment-card ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    display: grid;
    gap: 0.55rem;
    font-size: var(--fs-small);
  }
  .segment-card li {
    position: relative;
    padding-left: 1.25rem;
  }
  .segment-card li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55rem;
    width: 0.5rem;
    height: 0.5rem;
    background: var(--accent);
    border-radius: 999px;
  }

  .cta-block {
    background: var(--bg-invert);
    color: var(--text-invert);
    padding: 4rem 3rem;
    border-radius: var(--radius-lg);
    text-align: center;
  }
  .cta-block h2 {
    color: var(--text-invert);
    max-width: 24ch;
    margin-inline: auto;
  }
  .cta-block .lede {
    color: rgba(255, 255, 255, 0.7);
    margin-inline: auto;
    margin-bottom: 2rem;
  }

  @media (max-width: 991px) {
    .split { grid-template-columns: 1fr; }
    .split-text, .split-visual { min-height: 0; }
  }

  @media (max-width: 767px) {
    .tl-phases, .tl-mark { font-size: 0.6875rem; }
    .tl-phases { letter-spacing: 0.04em; }
    .segments { grid-template-columns: 1fr; }
    .segment-card { padding: 1.75rem; }
    .cta-block { padding: 3rem 1.5rem; }
  }
</style>
