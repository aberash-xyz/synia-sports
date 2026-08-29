<script>
  import { page } from '$app/stores';
  import { t } from '$lib/i18n.js';
  // LangToggle hidden until Amharic copy is retranslated and reviewed — restore with the markup below
  // import LangToggle from './LangToggle.svelte';

  $: pathname = $page.url.pathname;
  $: isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
</script>

<header class="nav">
  <div class="container container-lg nav-inner">
    <a class="logo" href="/">
      <span class="logo-mark" aria-hidden="true"><img src="/black-logo-lettering.png" alt="synia letter logo small"/></span>
      <span class="logo-text">{$t('brand.name')}</span>
    </a>

    <nav class="links" aria-label="Primary">
      <a href="/" class:active={isActive('/')}>{$t('nav.home')}</a>
      <a href="/about" class:active={isActive('/about')}>{$t('nav.about')}</a>
      <a href="/writing" class:active={isActive('/writing')}>{$t('nav.writing')}</a>
      <a href="/tools" class:active={isActive('/tools')}>{$t('nav.tools')}</a>
    </nav>

    <div class="actions">
      <!-- <LangToggle /> -->
      <a class="nav-cta" href="/about#contact">{$t('nav.cta')}</a>
    </div>
  </div>
</header>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: saturate(140%) blur(10px);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 1rem;
    gap: 2rem;
  }
  .logo {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-family: var(--font-heading);
    font-size: 1.4rem;
    font-weight: var(--fw-semibold);
    color: var(--text);
    letter-spacing: -0.01em;
  }
  .logo-mark {
    color: var(--accent);
    font-size: 1.4rem;
    transform: translateY(2px);
    max-height: 50px;
  }
  .logo-mark>img {
    height: 50px;
    width: 50px;

  }
  .links {
    display: flex;
    gap: 1.75rem;
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
  }
  .links a {
    position: relative;
    color: var(--text-muted);
    transition: color 0.3s ease;
  }
  .links a:hover,
  .links a.active {
    color: var(--text);
  }
  .links a.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.4rem;
    height: 2px;
    background: var(--accent);
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .nav-cta {
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 1rem;
    background: var(--bg-invert);
    color: var(--text-invert);
    border-radius: var(--radius-button);
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
    transition: opacity 0.3s ease;
  }
  .nav-cta:hover { opacity: 0.85; }

  @media (max-width: 767px) {
    .nav-inner { gap: 0.75rem; }
    .links { display: none; }
    .logo-text { font-size: 1.1rem; }
  }
</style>
