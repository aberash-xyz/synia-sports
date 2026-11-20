<script>
  import { t } from '$lib/i18n.js';

  export let data;
  $: w = data.week;
</script>

<svelte:head>
  <title>Visibility Index, week of {w.label} | {$t('brand.name')}</title>
  <meta
    name="description"
    content="Ethiopian Premier League clubs ranked by share of views on public Telegram football channels, week of {w.label}."
  />
</svelte:head>

<article>
  <section class="section section-lg head">
    <div class="container">
      <a class="back" href="/visibility">← Visibility Index</a>
      <span class="eyebrow">Week of {w.label}</span>
      <h1>Telegram Visibility Index</h1>
      {#if w.commentary}<p class="lede">{w.commentary}</p>{/if}
    </div>
  </section>

  <section class="section body">
    <div class="container">
      <img
        src="/weekly/{w.week}.svg"
        alt="Bar chart: Ethiopian Premier League clubs by share of Telegram views, week of {w.label}. Same data as the table below."
      />

      <div class="scroll">
        <table>
          <thead>
            <tr><th>#</th><th>Club</th><th>Share</th><th>Views</th><th>Posts</th><th>Change</th></tr>
          </thead>
          <tbody>
            {#each w.rows as r}
              <tr>
                <td>{r.rank}</td>
                <td class="club">{r.name}</td>
                <td>{r.share.toFixed(1)}%</td>
                <td>{r.views.toLocaleString('en-US')}</td>
                <td>{r.posts}</td>
                <td class="delta">{r.delta}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <ul class="notes">
        {#each w.notes as n}<li>{n}</li>{/each}
      </ul>
    </div>
  </section>
</article>

<style>
  .head { padding-bottom: 2rem; }
  .body { padding-top: 0; }
  .back { display: inline-block; margin-bottom: 1.5rem; font-size: var(--fs-small); color: var(--text-muted); }
  h1 { margin-top: 0.5rem; font-size: clamp(2.25rem, 5vw, 3.5rem); line-height: 1.1; }
  .lede { margin-top: 1.5rem; font-size: 1.125rem; line-height: 1.6; max-width: 44rem; }
  img { display: block; width: 100%; max-width: var(--container-sm); height: auto; border: 1px solid var(--border); }
  .scroll { overflow-x: auto; margin-top: 3rem; max-width: var(--container-sm); }
  table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  th, td { padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--border); text-align: right; white-space: nowrap; }
  th { font-size: var(--fs-tiny); letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); font-weight: var(--fw-medium); }
  th:nth-child(2), td.club { text-align: left; }
  td.delta { text-align: center; color: var(--text-muted); }
  .notes { margin-top: 2rem; padding-left: 1.1rem; max-width: 44rem; color: var(--text-muted); font-size: var(--fs-small); line-height: 1.6; }
</style>
