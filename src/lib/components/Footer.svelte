<script>
  import { t } from '$lib/i18n.js';

  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container container-lg footer-inner">
    <div class="brand">
      <div class="logo">
        <img class="logo-mark" src="/black-logo-lettering.png"  alt="synia logo"/>
        <span>{$t('brand.name')}</span>
      </div>
      <p class="tagline">{$t('footer.tagline')}</p>
    </div>

    <div class="links-grid">
      <div>
        <h6>{$t('footer.sections.pages')}</h6>
        <ul>
          <li><a href="/">{$t('nav.home')}</a></li>
          <li><a href="/about">{$t('nav.about')}</a></li>
          <li><a href="/writing">{$t('nav.writing')}</a></li>
          <li><a href="/tools">{$t('nav.tools')}</a></li>
        </ul>
      </div>
      <div>
        <h6>{$t('footer.sections.contact')}</h6>
        <ul>
          <li><a href="mailto:{$t('footer.contact.email')}">{$t('footer.contact.email')}</a></li>
          <li class="muted">{$t('footer.contact.note')}</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container container-lg footer-bottom">
    <span>&copy; {year} {$t('brand.name')}. {$t('footer.rights')}</span>
  </div>
</footer>

<style>
  .footer {
    background: var(--bg-grey);
    color: var(--text);
    padding-block: 4rem 2rem;
    margin-top: 6rem;
    border-top: 1px solid var(--border);
  }
  .footer-inner {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 3rem;
  }
  .brand .logo {
    display: inline-flex;
    align-items:center;
    gap: 0.5rem;
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: var(--fw-semibold);
  }
  .brand .logo-mark { color: var(--accent); }
  .tagline {
    margin-top: 0.75rem;
    max-width: 24rem;
    color: var(--text-muted);
    font-size: var(--fs-small);
  }
  
  .logo-mark {
    height: 40px;
    width: 40px;
  }
  .links-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  h6 {
    margin-bottom: 0.75rem;
    font-family: var(--font-body);
    font-size: var(--fs-tiny);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem; font-size: var(--fs-small); }
  ul a { color: var(--text); }
  ul a:hover { color: var(--accent); }

  .footer-bottom {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: var(--fs-tiny);
  }

  @media (max-width: 767px) {
    .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
    .links-grid { grid-template-columns: 1fr 1fr; }
  }
</style>
