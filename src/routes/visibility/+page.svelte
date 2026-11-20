<script>
  import { t } from '$lib/i18n.js';
  import { weeks } from '$lib/weekly.js';
</script>

<svelte:head>
  <title>Visibility Index | {$t('brand.name')}</title>
  <meta
    name="description"
    content="Weekly ranking of Ethiopian Premier League clubs by share of views on public Telegram football channels."
  />
</svelte:head>

<section class="section section-lg">
  <div class="container">
    <span class="eyebrow">Weekly</span>
    <h1>Telegram Visibility Index</h1>
    <p class="lede">
      Every week, Ethiopian Premier League clubs ranked by their share of views on public Telegram football channels.
    </p>
  </div>
</section>

<section class="section list">
  <div class="container">
    {#if weeks.length}
      <ul>
        {#each weeks as w}
          <li>
            <a href="/visibility/{w.week}">
              <span class="label">Week of {w.label}</span>
              {#if w.rows[0]}<span class="top">#1 {w.rows[0].name} · {w.rows[0].share.toFixed(1)}%</span>{/if}
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="empty">The first week will be published soon.</p>
    {/if}
  </div>
</section>

<style>
  .list { padding-top: 0; }
  h1 { margin-top: 0.5rem; font-size: clamp(2.5rem, 6vw, 4rem); line-height: 1.1; max-width: 16ch; }
  .lede { margin-top: 1.5rem; font-size: 1.125rem; line-height: 1.6; color: var(--text-muted); max-width: 44rem; }
  ul { list-style: none; margin: 0; padding: 0; max-width: var(--container-sm); }
  a { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding: 1.25rem 0; border-bottom: 1px solid var(--border); }
  a:hover .label { text-decoration: underline; text-underline-offset: 3px; }
  .label { font-size: 1.25rem; }
  .top, .empty { color: var(--text-muted); }
</style>
