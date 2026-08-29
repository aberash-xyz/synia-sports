<script>
  import { t } from '$lib/i18n.js';

  /**
   * Add new tools here, newest first.
   * `pairsWith` links a tool back to the method it implements.
   */
  const tools = [
    {
      href: '/tools/asset-scorecard',
      kind: 'Scorecard',
      title: 'Asset scorecard & portfolio plot',
      summary:
        'Score sports assets on moat, reach, gap, clock and sellability, and plot them into the activate / build / maintain / park matrix. Runs in your browser, exports a chart.',
      pairsWith: {
        label: 'The Sports Asset Activation Framework',
        href: '/writing/sports-asset-activation-framework'
      }
    }
  ];
</script>

<svelte:head>
  <title>{$t('nav.tools')} — {$t('brand.name')}</title>
  <meta
    name="description"
    content="Free working tools that implement the Synia Sports frameworks — asset scoring, portfolio plotting and measurement design for sport in emerging markets."
  />
</svelte:head>

<section class="section section-lg">
  <div class="container container-sm">
    <span class="eyebrow">{$t('nav.tools')}</span>
    <h1>Methods you can run.</h1>
    <p class="lede">
      Each framework we publish gets a working version of itself. These are the instruments, not
      the write-ups — free to use, nothing uploaded, and built to survive a room full of people
      arguing about real assets.
    </p>
  </div>
</section>

<section class="section">
  <div class="container container-sm">
    <ul class="tools">
      {#each tools as tool}
        <li>
          <a href={tool.href}>
            <span class="kind">{tool.kind}</span>
            <h2>{tool.title}</h2>
            <p>{tool.summary}</p>
            <span class="open">Open the tool →</span>
          </a>
          <p class="pairs">
            Implements <a href={tool.pairsWith.href}>{tool.pairsWith.label}</a>
          </p>
        </li>
      {/each}
    </ul>

    <p class="more">
      More to come as the methods get published. If one of these is close to something you need
      but not quite it, <a href="/about#contact">say so</a>.
    </p>
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

  .tools {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1.25rem;
  }
  .tools > li > a {
    display: block;
    padding: 2.25rem;
    background: var(--accent-soft);
    border: 1px solid var(--accent);
    border-radius: var(--radius-md);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }
  .tools > li > a:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 34px -22px var(--scrim-20);
  }
  .kind {
    font-size: var(--fs-tiny);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent-deep);
  }
  .tools h2 {
    margin-top: 0.6rem;
    font-size: 1.9rem;
    line-height: 1.2;
    max-width: 22ch;
  }
  .tools p {
    margin-top: 0.75rem;
    color: var(--text-medium);
    line-height: 1.65;
    max-width: 40rem;
  }
  .open {
    display: inline-block;
    margin-top: 1.25rem;
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
  }
  .pairs {
    margin-top: 0.85rem;
    padding-left: 0.25rem;
    font-size: var(--fs-small);
    color: var(--text-muted);
  }
  .pairs a {
    color: var(--text);
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-underline-offset: 3px;
  }

  .more {
    margin-top: 2.5rem;
    max-width: 40rem;
    font-size: var(--fs-small);
    line-height: 1.7;
    color: var(--text-muted);
  }
  .more a {
    color: var(--text);
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-underline-offset: 3px;
  }

  @media (max-width: 767px) {
    .tools > li > a { padding: 1.75rem; }
  }
</style>
