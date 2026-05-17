<script>
  import { t } from '$lib/i18n.js';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>{$t('brand.name')} — {$t('home.title')}</title>
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="container container-lg">
    <span class="eyebrow">{$t('home.eyebrow')}</span>
    <h1 class="hero-title">{$t('home.title')}</h1>
    <p class="lede">{$t('home.lede')}</p>
    <div class="cta-row">
      <Button href="/about" variant="primary">{$t('home.ctaPrimary')}</Button>
      <Button href="/about#contact" variant="secondary">{$t('home.ctaSecondary')}</Button>
    </div>
  </div>
</section>

<!-- PROOF STATEMENT -->
<section class="section section-grey">
  <div class="container container-sm proof">
    <h2>{$t('home.proofTitle')}</h2>
    <p class="lede">{$t('home.proofBody')}</p>
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
    padding-block: clamp(4rem, 12vw, 9rem) clamp(3rem, 8vw, 6rem);
  }
  .hero-title {
    font-size: var(--fs-hero);
    line-height: var(--lh-hero);
    font-weight: var(--fw-hero);
    max-width: 22ch;
    margin-top: 0.5rem;
  }
  .lede {
    margin-top: 1.5rem;
    max-width: 48rem;
    font-size: 1.125rem;
    color: var(--text-muted);
    line-height: 1.6;
  }
  .cta-row {
    margin-top: 2.25rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .proof { text-align: left; }
  .proof h2 { max-width: 22ch; }

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

  @media (max-width: 767px) {
    .segments { grid-template-columns: 1fr; }
    .segment-card { padding: 1.75rem; }
    .cta-block { padding: 3rem 1.5rem; }
  }
</style>
