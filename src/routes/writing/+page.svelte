<script>
  import { t } from '$lib/i18n.js';

  /**
   * Add new pieces here, newest first.
   * `date` is display-only; there is no dated archive yet.
   */
  const pieces = [
    {
      href: '/writing/sports-asset-activation-framework',
      kind: 'Framework',
      title: 'The Sports Asset Activation Framework',
      summary:
        'Score, plot, activate. A way for a city to decide which of its sports assets to move on this year, which to prepare for, and which to leave alone on purpose.',
      date: '2026'
    }
  ];
</script>

<svelte:head>
  <title>{$t('nav.writing')} — {$t('brand.name')}</title>
  <meta
    name="description"
    content="Frameworks, methods and research on the commercial and economic side of sport in emerging markets."
  />
</svelte:head>

<section class="section section-lg">
  <div class="container container-sm">
    <span class="eyebrow">{$t('nav.writing')}</span>
    <h1>Methods, published.</h1>
    <p class="lede">
      We publish how we measure before we report what we found. The frameworks below are free to
      use, adapt and reproduce with attribution — they are more useful in a room than in a
      proposal.
    </p>
  </div>
</section>

<section class="section">
  <div class="container container-sm">
    <ul class="pieces">
      {#each pieces as piece}
        <li>
          <a href={piece.href}>
            <div class="meta">
              <span class="kind">{piece.kind}</span>
              <span class="date">{piece.date}</span>
            </div>
            <h2>{piece.title}</h2>
            <p>{piece.summary}</p>
            <span class="read">Read →</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  h1 {
    margin-top: 0.5rem;
    font-size: clamp(2.5rem, 6vw, 4rem);
    line-height: 1.1;
    max-width: 14ch;
  }
  .lede {
    margin-top: 1.5rem;
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--text-muted);
    max-width: 44rem;
  }

  .pieces {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1.25rem;
  }
  .pieces a {
    display: block;
    padding: 2.25rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transition: transform 0.35s ease, border-color 0.35s ease, background 0.35s ease;
  }
  .pieces a:hover {
    transform: translateY(-3px);
    border-color: var(--primary);
    background: var(--bg-surface);
  }
  .meta {
    display: flex;
    gap: 0.75rem;
    align-items: baseline;
    font-size: var(--fs-tiny);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .kind { color: var(--accent); }
  .date { color: var(--text-muted); }
  .pieces h2 {
    margin-top: 0.6rem;
    font-size: 1.9rem;
    line-height: 1.2;
    max-width: 22ch;
  }
  .pieces p {
    margin-top: 0.75rem;
    color: var(--text-muted);
    line-height: 1.65;
    max-width: 40rem;
  }
  .read {
    display: inline-block;
    margin-top: 1.25rem;
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
  }

  @media (max-width: 767px) {
    .pieces a { padding: 1.75rem; }
  }
</style>
