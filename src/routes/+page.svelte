<script>
  import { t, locale } from '$lib/i18n.js';
  import Button from '$lib/components/Button.svelte';

  // Typewriter: hold word, delete, type next. SSR and reduced-motion show first word static.
  let typed = $state($t('home.titleWords')[0]);
  // Invisible copy of the longest word holds the slot open, so the line breaks
  // in the same place whatever is typed (no reflow mid-word on mobile).
  const longest = $derived($t('home.titleWords').reduce((a, b) => (b.length > a.length ? b : a)));
  $effect(() => {
    const words = $t('home.titleWords');
    if ($locale !== 'en' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0, n = words[0].length, deleting = true, timer;
    const tick = () => {
      n += deleting ? -1 : 1;
      typed = words[i].slice(0, n);
      let wait = deleting ? 45 : 90;
      if (!deleting && n === words[i].length) { deleting = true; wait = 2200; }
      else if (deleting && n === 0) { deleting = false; i = (i + 1) % words.length; wait = 350; }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 2500);
    return () => clearTimeout(timer);
  });
</script>

<svelte:head>
  <title>{$t('brand.name')} | {$t('home.title')}</title>
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="container">
    {#if $locale === 'en'}
      <h1 class="hero-title" aria-label={$t('home.title')}>
        <span aria-hidden="true">{$t('home.titleLead')} <span class="rotator"><span class="sizer">{longest}</span><span class="typed">{typed}</span></span><br />{$t('home.titleTail')}</span>
      </h1>
    {:else}
      <h1 class="hero-title">{$t('home.title')}</h1>
    {/if}
    <p class="lede">{$t('home.lede')}</p>
    <div class="cta-row">
      <Button href="/about" variant="primary">{$t('home.ctaPrimary')}</Button>
      <Button href="/about#contact" variant="secondary">{$t('home.ctaSecondary')}</Button>
    </div>
  </div>
</section>

<!-- STATS: sourced market figures, not company metrics -->
<section class="stats">
  <div class="container">
    <p class="eyebrow">{$t('home.stats.label')}</p>
    <dl class="stat-row">
      {#each $t('home.stats.items') as stat, i}
        <div class="stat" class:scale={i === 0}>
          <dt>{stat.label}</dt>
          <dd class="stat-value">{stat.value}</dd>
          <dd class="stat-bar"><span style="width: {(stat.n / 135.5) * 100}%"></span></dd>
          <dd class="stat-source">{stat.source}</dd>
        </div>
      {/each}
    </dl>
    <p class="stat-note">{$t('home.stats.note')}</p>
  </div>
</section>

<!-- FEATURE: one flagship thing, full frame width -->
<section class="feature">
  <div class="feature-inner">
    <span class="chip">{$t('home.feature.chip')}</span>
    <h2>{$t('home.feature.title')}</h2>
    <p>{$t('home.feature.body')}</p>
    <Button href={$t('home.feature.href')} variant="primary">{$t('home.feature.cta')}</Button>
  </div>
</section>

<!-- PROOF STATEMENT: argument left, the same argument drawn on the right -->
<section class="section">
  <div class="container split">
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
<section class="section">
  <div class="container evidence">
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
<section class="section">
  <div class="container">
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
  <div class="container">
    <div class="cta-block">
      <h2>{$t('home.ctaBlock.title')}</h2>
      <p class="lede">{$t('home.ctaBlock.body')}</p>
      <Button href="/about#contact" variant="primary">{$t('home.ctaBlock.cta')}</Button>
    </div>
  </div>
</section>

<style>
  /* Every section after the hero is separated by a full-frame hairline. */
  section + section { border-top: 1px solid var(--border); }

  .hero { padding-block: clamp(2.5rem, 6vw, 4.5rem); }
  .hero-title {
    font-size: var(--fs-hero);
    line-height: var(--lh-hero);
    font-weight: var(--fw-normal);
    letter-spacing: -0.045em;
    max-width: 18ch;
  }
  .lede {
    margin-top: 1.5rem;
    max-width: 48rem;
    font-size: 1.125rem;
    color: var(--text-muted);
    line-height: 1.6;
  }
  .rotator {
    display: inline-grid;
    color: var(--accent);
    white-space: nowrap;
  }
  .rotator > * { grid-area: 1 / 1; }
  .sizer { visibility: hidden; }
  /* Zero-width char keeps the line box (and caret) when nothing is typed. */
  .typed::before { content: "\200b"; }
  .typed {
    justify-self: start;
    border-right: 0.06em solid currentColor;
    padding-right: 0.04em;
    animation: caret 1s steps(1) infinite;
  }
  @keyframes caret { 50% { border-color: transparent; } }
  @media (prefers-reduced-motion: reduce) { .typed { animation: none; border-right: 0; } }
  .hero .lede { max-width: 44rem; }
  .cta-row {
    margin-top: 2.25rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .stats { padding-block: 1.75rem 2.25rem; }
  .stats .eyebrow { margin-bottom: 1.25rem; }
  .stat-row {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  /* Instrument readings: label, value, then the value drawn against population. */
  .stat { padding-inline: 2rem; }
  .stat:first-child { padding-left: 0; }
  .stat + .stat { border-left: 1px solid var(--border); }
  .stat dt {
    font-family: var(--font-mono);
    font-size: var(--fs-tiny);
    letter-spacing: 0.04em;
    color: var(--text-muted);
  }
  .stat dd { margin: 0; }
  .stat-value {
    margin-top: 0.35rem !important;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    line-height: 1;
    letter-spacing: -0.05em;
    font-variant-numeric: tabular-nums;
  }
  .stat-bar {
    margin-top: 1rem !important;
    height: 6px;
    border-bottom: 1px solid var(--border);
  }
  .stat-bar span { display: block; height: 100%; background: var(--accent); }
  .stat.scale .stat-bar span { background: var(--neutral-200); }
  .stat-source {
    margin-top: 0.5rem !important;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--text-muted);
  }
  .stat-note {
    margin-top: 1.5rem;
    font-size: var(--fs-tiny);
    color: var(--text-muted);
  }

  /* Feature: dark panel with the contour texture standing in for photography. */
  .feature {
    background: var(--bg-invert);
    color: var(--text-invert);
    text-align: center;
  }
  .feature-inner::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("/contours.svg") center / cover no-repeat;
    filter: invert(1);
    opacity: 0.18;
  }
  .feature-inner::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 60%;
    background: var(--brand-gradient);
    opacity: 0.22;
    mask-image: linear-gradient(transparent, #000);
  }
  .feature-inner {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(5rem, 12vw, 9rem) var(--global-padding);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
  .feature h2 {
    color: var(--text-invert);
    font-size: clamp(2.25rem, 5vw, 3.75rem);
    line-height: 1.05;
    letter-spacing: -0.045em;
    max-width: 18ch;
  }
  .feature p {
    color: rgba(255, 255, 255, 0.75);
    max-width: 36rem;
    margin-bottom: 0.75rem;
  }
  .feature-inner > * { position: relative; z-index: 1; }
  /* On dark panels the black button inverts to white. */
  .feature :global(.btn.primary),
  .cta-block :global(.btn.primary) {
    background: var(--bg-default);
    color: var(--text);
  }
  .chip {
    padding: 0.2rem 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.45);
    color: var(--text-invert);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

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
    font-family: var(--font-mono);
    font-size: var(--fs-tiny);
    font-weight: var(--fw-normal);
    letter-spacing: 0.1em;
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
    font-family: var(--font-mono);
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

  /* Split: grey argument panel + white diagram panel with a logo-gradient border. */
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
  /* Gradient border: white fill clipped to the padding box over the logo gradient
     on the border box, so the rounded corners follow the radius. */
  .split-visual {
    border: 3px solid transparent;
    background:
      linear-gradient(var(--bg-default), var(--bg-default)) padding-box,
      var(--brand-gradient) border-box;
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
    font-family: var(--font-mono);
    font-size: var(--fs-tiny);
    letter-spacing: 0.06em;
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
    /* Logo coral → orange along the rail. */
    border-top: 3px solid;
    border-image: linear-gradient(90deg, #fa7447, #fd882e 60%, #f56e22) 1;
  }
  .tl-row.usual .tl-track { border-image: none; border-top: 2px dashed rgba(0, 0, 0, 0.45); }
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
    top: calc(-0.85rem - 7.5px);
    left: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--bg-default);
    border: 2px solid var(--accent);
  }
  .tl-row.usual .tl-mark i {
    background: var(--bg-default); /* hides the dashed rail behind the hollow dot */
    border: 2px solid var(--text);
  }

  .segments-heading {
    margin-bottom: 3rem;
  }
  .segments {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-block: 1px solid var(--border);
  }
  .segment-card {
    padding: 2.5rem 2.5rem 2.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .segment-card + .segment-card {
    padding-left: 2.5rem;
    border-left: 1px solid var(--border);
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
    background: var(--text);
    border-radius: 999px;
  }

  .cta-block {
    background: var(--bg-invert);
    color: var(--text-invert);
    padding: 4rem 3rem;
    border-radius: var(--radius-lg);
    text-align: left;
  }
  .cta-block h2 {
    color: var(--text-invert);
    max-width: 24ch;
  }
  .cta-block .lede {
    color: rgba(255, 255, 255, 0.7);
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
    .segment-card, .segment-card + .segment-card { padding: 1.75rem 0; border-left: 0; }
    .segment-card + .segment-card { border-top: 1px solid var(--border); }
    .stat-row { grid-template-columns: 1fr; gap: 1.25rem; }
    .stat, .stat:first-child { padding-inline: 0; }
    .stat + .stat { border-left: 0; border-top: 1px solid var(--border); padding-top: 1.25rem; }
    .cta-block { padding: 3rem 1.5rem; }
  }
</style>
