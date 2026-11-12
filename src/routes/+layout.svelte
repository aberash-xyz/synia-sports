<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { t } from '$lib/i18n.js';
</script>

<a class="announce" href={$t('announce.href')}>
  <span class="chip">{$t('announce.chip')}</span>
  {$t('announce.text')} <span aria-hidden="true">↗</span>
</a>

<Nav />

<main class="frame">
  <slot />
</main>

<Footer />

<style>
  main {
    display: block;
    min-height: 60vh;
    padding-bottom: 6rem;
  }
  .announce {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.45rem var(--global-padding);
    background: var(--bg-invert);
    color: var(--text-invert);
    font-size: var(--fs-small);
    text-align: center;
  }
  .announce:hover { text-decoration: underline; text-underline-offset: 3px; }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }
</style>
