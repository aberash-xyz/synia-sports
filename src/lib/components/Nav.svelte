<script>
  import { page } from '$app/stores';
  import { t } from '$lib/i18n.js';
  // LangToggle hidden until Amharic copy is retranslated and reviewed — restore with the markup below
  // import LangToggle from './LangToggle.svelte';

  const pathname = $derived($page.url.pathname);
  /** @param {string} href */
  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  let open = $state(false);
  // The drawer is fixed rather than absolute so it can fill the viewport exactly,
  // which means it needs the bar's measured height as its top offset.
  let navH = $state(0);

  // Close on navigation — covers back/forward, not just taps on the links.
  $effect(() => {
    pathname;
    open = false;
  });

  $effect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  });

  /** @param {KeyboardEvent} e */
  function onKeydown(e) {
    if (e.key === 'Escape') open = false;
  }

  function onResize() {
    if (window.innerWidth >= 768) open = false;
  }
</script>

<svelte:window onkeydown={onKeydown} onresize={onResize} />

<header class="nav" bind:clientHeight={navH}>
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

    <button
      type="button"
      class="burger"
      class:open
      aria-label={$t('nav.menu')}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onclick={() => (open = !open)}
    >
      <span></span>
      <span></span>
    </button>
  </div>

</header>

<!-- Outside <header> on purpose: .nav has a backdrop-filter, which makes it a
     containing block for fixed descendants — nested here the drawer would size
     against the bar, not the viewport, and push out the document's scroll width. -->
<div id="mobile-menu" class="drawer" class:open style="--nav-h: {navH}px">
  <nav class="drawer-links" aria-label="Mobile">
    <a href="/" class:active={isActive('/')}>{$t('nav.home')}</a>
    <a href="/about" class:active={isActive('/about')}>{$t('nav.about')}</a>
    <a href="/writing" class:active={isActive('/writing')}>{$t('nav.writing')}</a>
    <a href="/tools" class:active={isActive('/tools')}>{$t('nav.tools')}</a>
  </nav>
  <a class="drawer-cta" href="/about#contact">{$t('nav.cta')}</a>
</div>

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

  /* ---- mobile menu ---- */
  .burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 44px;
    height: 44px;
    margin-right: -0.6rem;
    padding: 0;
    align-items: flex-end;
    background: none;
    border: 0;
    cursor: pointer;
  }
  /* Zero-height rules rather than filled blocks, so the bars stay hairline-crisp. */
  .burger span {
    display: block;
    width: 24px;
    height: 0;
    border-top: 2px solid var(--text);
    transition: transform 0.3s ease;
  }
  /* Bars sit 8px apart centre-to-centre, so each travels 4px to meet in the middle. */
  .burger:focus { outline: none; }
  .burger:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
  .burger.open span:first-child { transform: translateY(4px) rotate(45deg); }
  .burger.open span:last-child { transform: translateY(-4px) rotate(-45deg); }

  .drawer {
    display: none;
    position: fixed;
    z-index: 40;
    top: var(--nav-h);
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    padding: 2.5rem 1.5rem calc(2.5rem + env(safe-area-inset-bottom));
    background: var(--bg-default);
    border-top: 1px solid var(--border);
    overflow-y: auto;
    transform: translateX(100%);
    visibility: hidden;
    /* Visibility flips only once the slide-out has finished, so the panel is
       untabbable while closed without cutting the animation short. */
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0.35s;
  }
  .drawer.open {
    transform: translateX(0);
    visibility: visible;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s;
  }
  .drawer-links {
    display: flex;
    flex-direction: column;
  }
  .drawer-links a {
    padding: 1.1rem 0;
    font-family: var(--font-heading);
    font-size: 1.75rem;
    font-weight: var(--fw-semibold);
    letter-spacing: -0.01em;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }
  .drawer-links a.active { color: var(--text); }
  .drawer-cta {
    display: block;
    padding: 0.9rem 1rem;
    background: var(--bg-invert);
    color: var(--text-invert);
    border-radius: var(--radius-button);
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
    text-align: center;
  }

  @media (max-width: 767px) {
    .nav-inner { gap: 0.75rem; }
    .links { display: none; }
    .actions { display: none; }
    .burger { display: flex; }
    .drawer { display: flex; }
    .logo-text { font-size: 1.1rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .burger span,
    .drawer,
    .drawer.open { transition-duration: 0.01ms; }
  }
</style>
