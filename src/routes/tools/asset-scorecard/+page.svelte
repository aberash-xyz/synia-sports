<script>
  import { t } from '$lib/i18n.js';
  import AssetScorecard from '$lib/components/AssetScorecard.svelte';

  const legend = [
    { axis: 'Moat', encoded: 'Fill', note: 'Warm neutral → accent → deep. Darker means harder to copy.' },
    { axis: 'Reach', encoded: 'Size', note: 'City, intercity, regional Africa, global.' },
    { axis: 'Gap', encoded: 'Vertical position', note: 'Potential value minus value realised today.' },
    { axis: 'Clock', encoded: 'Horizontal position', note: 'How long until it can be activated.' },
    { axis: 'Sellability', encoded: 'Ring', note: 'No ring, dashed, solid — nothing for sale through to a defined, priced offer.' }
  ];
</script>

<svelte:head>
  <title>Asset scorecard &amp; portfolio plot — {$t('brand.name')}</title>
  <meta
    name="description"
    content="An interactive tool for scoring sports assets on moat, reach, gap, clock and sellability, and plotting them into the activate / build / maintain / park matrix."
  />
</svelte:head>

<article>
  <section class="section">
    <div class="container container-lg">
      <a class="back" href="/writing/sports-asset-activation-framework">← The framework</a>
      <span class="eyebrow">Working tool</span>
      <h1>Asset scorecard &amp; portfolio plot</h1>
      <p class="standfirst">
        Score one asset at a time on the four axes, add sellability, and watch it land in the
        matrix. Built for the 30-minute team exercise in the framework — real assets out of your
        own plan, not hypotheticals.
      </p>
    </div>
  </section>

  <section class="tool-section">
    <div class="container container-lg">
      <AssetScorecard />
    </div>
  </section>

  <section class="section">
    <div class="container container-lg">
      <div class="reading">
        <h2>Reading the plot</h2>
        <p class="note">
          Gap and clock decide the quadrant, so they decide what kind of work the asset needs this
          year. Moat and reach decide the order inside a quadrant — when four things land in
          <strong>Activate</strong>, the strongest moat goes first. Sellability is the commercial
          test: if you cannot say what is for sale and what evidence prices it, the asset is not
          ready to take to a sponsor regardless of where it plotted.
        </p>
        <dl class="encoding">
          {#each legend as row}
            <div>
              <dt>{row.axis}</dt>
              <dd><span class="enc">{row.encoded}</span>{row.note}</dd>
            </div>
          {/each}
        </dl>
        <p class="footnote">
          Scores stay in this browser only — nothing is uploaded. Clearing site data clears the
          portfolio, so export the PNG if you need to keep it.
        </p>
      </div>
    </div>
  </section>
</article>

<style>
  .back {
    display: inline-block;
    margin-bottom: 2rem;
    font-size: var(--fs-small);
    color: var(--text-muted);
  }
  .back:hover { color: var(--text); }

  h1 {
    margin-top: 0.5rem;
    font-size: clamp(2.25rem, 5vw, 3.25rem);
    line-height: 1.1;
    max-width: 18ch;
  }
  .standfirst {
    margin-top: 1.25rem;
    max-width: 44rem;
    font-size: 1.15rem;
    line-height: 1.6;
    color: var(--text-muted);
  }

  .tool-section {
    padding-block: 0 var(--section-padding);
  }

  .reading {
    max-width: 44rem;
    padding-top: var(--sp-md);
    border-top: 1px solid var(--border);
  }
  .reading h2 { font-size: 2rem; }
  .note {
    margin-top: 1rem;
    line-height: 1.7;
    color: var(--text-medium);
  }
  .note strong { font-weight: var(--fw-semibold); color: var(--text); }

  .encoding {
    margin: 2rem 0 0;
    display: grid;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .encoding > div {
    display: grid;
    grid-template-columns: 8rem 1fr;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--bg-default);
  }
  .encoding dt {
    font-family: var(--font-heading);
    font-size: 1.15rem;
  }
  .encoding dd {
    margin: 0;
    font-size: var(--fs-small);
    line-height: 1.6;
    color: var(--text-muted);
  }
  .enc {
    display: block;
    font-size: var(--fs-tiny);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent-deep);
  }

  .footnote {
    margin-top: 1.5rem;
    font-size: var(--fs-small);
    line-height: 1.6;
    color: var(--text-muted);
  }

  @media (max-width: 40rem) {
    .encoding > div { grid-template-columns: 1fr; gap: 0.35rem; }
  }
</style>
