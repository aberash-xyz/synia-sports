<script>
  import { t } from '$lib/i18n.js';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>{$t('about.title')} — {$t('brand.name')}</title>
</svelte:head>

<!-- ABOUT INTRO -->
<section class="section section-lg">
  <div class="container container-md about-intro">
    <span class="eyebrow">{$t('about.eyebrow')}</span>
    <h1>{$t('about.title')}</h1>
    <p class="lede">{$t('about.intro')}</p>
  </div>
</section>

<!-- METHODOLOGY -->
<section class="section section-grey">
  <div class="container container-md methodology">
    <div>
      <span class="eyebrow muted">Methodology</span>
      <h2>{$t('about.methodologyTitle')}</h2>
    </div>
    <p class="lede">{$t('about.methodologyBody')}</p>
  </div>
</section>

<!-- TECHNICAL OFFERINGS -->
<section class="section section-lg">
  <div class="container container-lg">
    <header class="offerings-header">
      <span class="eyebrow">{$t('about.offeringsEyebrow')}</span>
      <h2>{$t('about.offeringsTitle')}</h2>
      <p class="lede">{$t('about.offeringsLede')}</p>
    </header>

    <div class="offerings-grid">
      {#each $t('about.offerings') as offering, i}
        <article class="offering-card">
          <div class="offering-number">{String(i + 1).padStart(2, '0')}</div>
          <h3>{offering.title}</h3>
          <p>{offering.body}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- VALUES / HOW WE WORK -->
<section class="section section-lg">
  <div class="container container-lg">
    <h2 class="values-title">{$t('about.valuesTitle')}</h2>
    <div class="values-grid">
      {#each $t('about.values') as value}
        <div class="value">
          <h4>{value.title}</h4>
          <p>{value.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CLOSE / CONTACT ANCHOR -->
<section id="contact" class="section">
  <div class="container container-md">
    <div class="close-block">
      <h2>{$t('about.closeTitle')}</h2>
      <p class="lede">{$t('about.closeBody')}</p>
      <Button href="mailto:{$t('footer.contact.email')}" variant="primary">{$t('about.closeCta')}</Button>
      <p class="contact-note">{$t('footer.contact.note')}</p>
    </div>
  </div>
</section>

<style>
  .about-intro {
    text-align: left;
  }
  .about-intro h1 {
    margin-top: 0.5rem;
    max-width: 18ch;
  }
  .lede {
    margin-top: 1.5rem;
    font-size: 1.125rem;
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 52rem;
  }

  .methodology {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    align-items: start;
  }
  .methodology h2 {
    margin-top: 0.5rem;
    font-size: 2rem;
    max-width: 14ch;
  }

  .offerings-header { margin-bottom: 3rem; max-width: 48rem; }
  .offerings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.25rem;
  }
  .offering-card {
    background: var(--bg-default);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: transform 0.35s ease, border-color 0.35s ease, background 0.35s ease;
  }
  .offering-card:hover {
    transform: translateY(-3px);
    border-color: var(--primary);
    background: var(--bg-surface);
  }
  .offering-number {
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: var(--fw-medium);
    color: var(--accent);
    letter-spacing: 0.05em;
  }
  .offering-card h3 {
    font-size: 1.35rem;
    line-height: 1.25;
  }
  .offering-card p {
    color: var(--text-muted);
    font-size: var(--fs-small);
    line-height: 1.6;
  }

  .values-title { margin-bottom: 2.5rem; max-width: 20ch; }
  .values-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem 3rem;
  }
  .value h4 {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  .value p { color: var(--text-muted); }

  .close-block {
    background: var(--bg-invert);
    color: var(--text-invert);
    padding: 4rem 3rem;
    border-radius: var(--radius-lg);
    text-align: center;
  }
  .close-block h2 {
    color: var(--text-invert);
    max-width: 22ch;
    margin-inline: auto;
  }
  .close-block .lede {
    color: rgba(255, 255, 255, 0.7);
    margin-inline: auto;
    margin-bottom: 2rem;
  }
  .contact-note {
    margin-top: 1.25rem;
    font-size: var(--fs-small);
    color: rgba(255, 255, 255, 0.55);
  }

  @media (max-width: 991px) {
    .offerings-grid { grid-template-columns: 1fr 1fr; }
    .methodology { grid-template-columns: 1fr; gap: 1.5rem; }
  }
  @media (max-width: 767px) {
    .offerings-grid { grid-template-columns: 1fr; }
    .values-grid { grid-template-columns: 1fr; gap: 1.75rem; }
    .close-block { padding: 3rem 1.5rem; }
  }
</style>
