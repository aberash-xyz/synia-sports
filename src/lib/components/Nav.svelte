<script>
  import { page } from '$app/stores';
  import { t } from '$lib/i18n.js';
  import LangToggle from './LangToggle.svelte';

  $: pathname = $page.url.pathname;
  $: isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
</script>

<header class="nav">
  <div class="container container-lg nav-inner">
    <a class="logo" href="/">
      <span class="logo-mark" aria-hidden="true">◐</span>
      <span class="logo-text">{$t('brand.name')}</span>
    </a>

    <nav class="links" aria-label="Primary">
      <a href="/" class:active={isActive('/')}>{$t('nav.home')}</a>
      <a href="/about" class:active={isActive('/about')}>{$t('nav.about')}</a>
    </nav>

    <div class="actions">
      <LangToggle />
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
    align-items: baseline;
    gap: 0.5rem;
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
  }
  .links {
    display: flex;
    gap: 1.75rem;
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
  }
  .links a {
    color: var(--text-muted);
    transition: color 0.3s ease;
  }
  .links a:hover,
  .links a.active {
    color: var(--text);
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
