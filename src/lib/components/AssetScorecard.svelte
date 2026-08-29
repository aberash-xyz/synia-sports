<script>
  import { onMount } from 'svelte';
  import { Slider, ToggleGroup } from 'bits-ui';

  const STORAGE_KEY = 'synia.scorecard.v1';

  const REACH = ['Within city', 'Intercity', 'Regional Africa', 'Global'];
  const SELL = ['None', 'Partial', 'Defined'];

  /** @param {number} v @param {string} a @param {string} b @param {string} c */
  const band = (v, a, b, c) => (v < 34 ? a : v < 67 ? b : c);
  /** @param {number} v */
  const moatBand = (v) => band(v, 'None', 'Weak', 'Strong');
  /** @param {number} v */
  const gapBand = (v) => band(v, 'Small', 'Medium', 'Large');
  /** @param {number} v */
  const clockBand = (v) => band(v, '0–12 months', '1–3 years', '3 years +');

  /** @param {number} gap @param {number} clock */
  function quadrant(gap, clock) {
    const big = gap >= 50;
    const soon = clock < 50;
    if (big && soon) return 'Activate';
    if (big && !soon) return 'Build toward';
    if (!big && soon) return 'Maintain';
    return 'Park';
  }

  /** @type {Record<string, string>} */
  const QUAD_NOTE = {
    Activate:
      'Underpriced and ready. This belongs on the 90-day list — the work is commercial, not strategic.',
    'Build toward':
      'Pre-positioning, not revenue. Decide the data, the technical spec and the event calendar before completion.',
    Maintain:
      'Already working. Protect it; resist over-investing attention in the asset you already understand.',
    Park: 'Not abandoned — scheduled. Name the binding constraint and attach a review date.'
  };

  // Moat is encoded as fill: warm neutral → brand accent → deep burnt.
  // Lightness falls monotonically so the ramp still reads in greyscale print.
  /** @param {number} v */
  function moatFill(v) {
    const p = Math.max(0, Math.min(100, v)) / 100;
    if (p <= 0.5) {
      const k = p / 0.5;
      return `hsl(26 ${Math.round(14 + k * 59)}% ${Math.round(93 - k * 22)}%)`;
    }
    const k = (p - 0.5) / 0.5;
    return `hsl(${Math.round(26 - k * 6)} ${Math.round(73 + k * 7)}% ${Math.round(71 - k * 45)}%)`;
  }

  /** @param {number} i */
  const reachRadius = (i) => [6, 8, 10.5, 13][i];

  // ---- plot geometry ----
  const VB_W = 660;
  const VB_H = 560;
  const PAD = { l: 62, r: 26, t: 30, b: 62 };
  const PW = VB_W - PAD.l - PAD.r;
  const PH = VB_H - PAD.t - PAD.b;
  /** @param {number} c */
  const px = (c) => PAD.l + (c / 100) * PW;
  /** @param {number} g */
  const py = (g) => PAD.t + (1 - g / 100) * PH;

  const SANS = '"Poppins", system-ui, -apple-system, sans-serif';
  const SERIF = '"Crimson Pro", Georgia, serif';

  /**
   * @typedef {{ id: string, name: string, moat: number, reach: number,
   *             gap: number, clock: number, sell: number }} Asset
   */

  const WORKED_EXAMPLE = [
    { name: 'Altitude running', moat: 92, reach: 3, gap: 84, clock: 14, sell: 1 },
    { name: 'Stadium + continental fixtures', moat: 48, reach: 2, gap: 74, clock: 82, sell: 0 },
    { name: 'Domestic league', moat: 55, reach: 0, gap: 28, clock: 22, sell: 2 }
  ];

  // ---- state ----
  /** @type {Asset[]} */
  let assets = $state([]);
  /** @type {string | null} */
  let editingId = $state(null);
  let name = $state('');
  let moat = $state(50);
  let gap = $state(50);
  let clock = $state(50);
  let reach = $state('1');
  let sell = $state('1');
  let hydrated = $state(false);
  /** @type {SVGSVGElement | null} */
  let svgEl = $state(null);
  /** @type {HTMLInputElement | null} */
  let nameEl = $state(null);

  const liveQuad = $derived(quadrant(gap, clock));

  onMount(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) assets = parsed.filter(isAsset);
      }
    } catch {
      // corrupt or unavailable storage — start empty rather than fail the page
    }
    hydrated = true;
  });

  $effect(() => {
    if (!hydrated) return;
    const snapshot = JSON.stringify(assets);
    try {
      localStorage.setItem(STORAGE_KEY, snapshot);
    } catch {
      // private mode / quota — the tool still works for this session
    }
  });

  /** @param {any} a @returns {a is Asset} */
  function isAsset(a) {
    return (
      a &&
      typeof a.id === 'string' &&
      typeof a.name === 'string' &&
      ['moat', 'gap', 'clock', 'reach', 'sell'].every((k) => typeof a[k] === 'number')
    );
  }

  function newId() {
    return typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `a${Date.now()}${Math.random().toString(16).slice(2)}`;
  }

  function reset() {
    editingId = null;
    name = '';
    moat = 50;
    gap = 50;
    clock = 50;
    reach = '1';
    sell = '1';
  }

  function commit() {
    const payload = {
      name: name.trim() || `Asset ${assets.length + 1}`,
      moat,
      gap,
      clock,
      reach: Number(reach),
      sell: Number(sell)
    };
    if (editingId) {
      const id = editingId;
      assets = assets.map((a) => (a.id === id ? { ...payload, id } : a));
    } else {
      assets = [...assets, { ...payload, id: newId() }];
    }
    reset();
    nameEl?.focus();
  }

  /** @param {Asset} a */
  function edit(a) {
    editingId = a.id;
    name = a.name;
    moat = a.moat;
    gap = a.gap;
    clock = a.clock;
    reach = String(a.reach);
    sell = String(a.sell);
    nameEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /** @param {string} id */
  function remove(id) {
    assets = assets.filter((a) => a.id !== id);
    if (editingId === id) reset();
  }

  function clearAll() {
    if (!confirm('Remove all plotted assets? This cannot be undone.')) return;
    assets = [];
    reset();
  }

  function loadExample() {
    assets = WORKED_EXAMPLE.map((a) => ({ ...a, id: newId() }));
    reset();
  }

  function savePng() {
    if (!svgEl) return;
    const clone = /** @type {SVGSVGElement} */ (svgEl.cloneNode(true));
    clone.setAttribute('width', String(VB_W * 2));
    clone.setAttribute('height', String(VB_H * 2));
    const xml = new XMLSerializer().serializeToString(clone);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = VB_W * 2;
      canvas.height = VB_H * 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = 'sports-asset-portfolio.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
  }
</script>

<div class="tool">
  <div class="grid">
    <!-- ---------- FORM ---------- -->
    <form class="panel form" onsubmit={(e) => { e.preventDefault(); commit(); }}>
      <div class="panel-head">
        <h3>{editingId ? 'Edit asset' : 'Score an asset'}</h3>
        <p>The hollow marker shows where it lands before you add it.</p>
      </div>

      <div class="field">
        <label for="asset-name">Asset name</label>
        <input
          id="asset-name"
          class="text-input"
          bind:this={nameEl}
          bind:value={name}
          placeholder="Altitude training camps"
          autocomplete="off"
        />
      </div>

      <div class="field">
        <div class="field-head">
          <label for="moat">Moat</label>
          <span class="value">{moatBand(moat)}</span>
        </div>
        <Slider.Root type="single" bind:value={moat} min={0} max={100} step={1} class="sc-slider">
          {#snippet children({ thumbItems })}
            <span class="sc-slider__track">
              <Slider.Range class="sc-slider__range" />
            </span>
            {#each thumbItems as thumb (thumb.index)}
              <Slider.Thumb index={thumb.index} id="moat" class="sc-slider__thumb" />
            {/each}
          {/snippet}
        </Slider.Root>
        <p class="hint">Why here and nowhere else?</p>
      </div>

      <div class="field">
        <span class="group-label" id="reach-label">Reach</span>
        <ToggleGroup.Root
          type="single"
          bind:value={reach}
          class="sc-toggle sc-toggle--4"
          aria-labelledby="reach-label"
        >
          {#each REACH as label, i}
            <ToggleGroup.Item value={String(i)} class="sc-toggle__item" aria-label={label}>
              {['City', 'Intercity', 'Africa', 'Global'][i]}
            </ToggleGroup.Item>
          {/each}
        </ToggleGroup.Root>
        <p class="hint">How far will someone travel for it?</p>
      </div>

      <div class="field">
        <div class="field-head">
          <label for="gap">Gap</label>
          <span class="value">{gapBand(gap)}</span>
        </div>
        <Slider.Root type="single" bind:value={gap} min={0} max={100} step={1} class="sc-slider">
          {#snippet children({ thumbItems })}
            <span class="sc-slider__track">
              <Slider.Range class="sc-slider__range" />
            </span>
            {#each thumbItems as thumb (thumb.index)}
              <Slider.Thumb index={thumb.index} id="gap" class="sc-slider__thumb" />
            {/each}
          {/snippet}
        </Slider.Root>
        <p class="hint">Potential value minus value realised today.</p>
      </div>

      <div class="field">
        <div class="field-head">
          <label for="clock">Clock</label>
          <span class="value">{clockBand(clock)}</span>
        </div>
        <Slider.Root type="single" bind:value={clock} min={0} max={100} step={1} class="sc-slider">
          {#snippet children({ thumbItems })}
            <span class="sc-slider__track">
              <Slider.Range class="sc-slider__range" />
            </span>
            {#each thumbItems as thumb (thumb.index)}
              <Slider.Thumb index={thumb.index} id="clock" class="sc-slider__thumb" />
            {/each}
          {/snippet}
        </Slider.Root>
        <p class="hint">How long until it can be activated?</p>
      </div>

      <div class="field">
        <span class="group-label" id="sell-label">Sellability</span>
        <ToggleGroup.Root
          type="single"
          bind:value={sell}
          class="sc-toggle sc-toggle--3"
          aria-labelledby="sell-label"
        >
          {#each SELL as label, i}
            <ToggleGroup.Item value={String(i)} class="sc-toggle__item" aria-label={label}>
              {label}
            </ToggleGroup.Item>
          {/each}
        </ToggleGroup.Root>
        <p class="hint">What is for sale, and what evidence prices it?</p>
      </div>

      <div class="lands" aria-live="polite">
        <span class="lands-eyebrow">Lands in</span>
        <strong>{liveQuad}</strong>
        <p>{QUAD_NOTE[liveQuad]}</p>
      </div>

      <div class="form-actions">
        <button class="btn btn-primary" type="submit">
          {editingId ? 'Update asset' : 'Add to plot'}
        </button>
        {#if editingId}
          <button class="btn btn-ghost" type="button" onclick={reset}>Cancel</button>
        {/if}
      </div>
    </form>

    <!-- ---------- PLOT ---------- -->
    <div class="plot-col">
      <div class="panel plot">
        <svg
          bind:this={svgEl}
          viewBox="0 0 {VB_W} {VB_H}"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Portfolio matrix plotting value gap against time to activate"
        >
          <rect width={VB_W} height={VB_H} fill="#ffffff" />

          <!-- quadrant tints: Activate carries the accent, as in the framework matrix -->
          <rect x={PAD.l} y={PAD.t} width={PW / 2} height={PH / 2} fill="#fdf4ec" />
          <rect x={PAD.l + PW / 2} y={PAD.t} width={PW / 2} height={PH / 2} fill="#fbfaf9" />
          <rect x={PAD.l} y={PAD.t + PH / 2} width={PW / 2} height={PH / 2} fill="#fbfaf9" />

          <!-- grid -->
          {#each [0, 25, 50, 75, 100] as v}
            <line x1={px(v)} y1={PAD.t} x2={px(v)} y2={PAD.t + PH} stroke="#ececec" />
            <line x1={PAD.l} y1={py(v)} x2={PAD.l + PW} y2={py(v)} stroke="#ececec" />
          {/each}

          <!-- midlines -->
          <line x1={px(50)} y1={PAD.t} x2={px(50)} y2={PAD.t + PH} stroke="#cfc8c1" stroke-width="1.5" />
          <line x1={PAD.l} y1={py(50)} x2={PAD.l + PW} y2={py(50)} stroke="#cfc8c1" stroke-width="1.5" />

          <!-- quadrant labels -->
          <text x={PAD.l + 16} y={PAD.t + 32} font-family={SERIF} font-size="20" fill="#c98a4e">Activate</text>
          <text x={PAD.l + PW - 16} y={PAD.t + 32} text-anchor="end" font-family={SERIF} font-size="20" fill="#c4bdb6">Build toward</text>
          <text x={PAD.l + 16} y={PAD.t + PH - 16} font-family={SERIF} font-size="20" fill="#c4bdb6">Maintain</text>
          <text x={PAD.l + PW - 16} y={PAD.t + PH - 16} text-anchor="end" font-family={SERIF} font-size="20" fill="#c4bdb6">Park</text>

          <!-- axis titles -->
          <text
            x={PAD.l + PW / 2}
            y={VB_H - 20}
            text-anchor="middle"
            font-family={SANS}
            font-size="11"
            font-weight="500"
            letter-spacing="1.5"
            fill="#606060">TIME TO ACTIVATE →</text
          >
          <text
            x={-(PAD.t + PH / 2)}
            y="20"
            transform="rotate(-90)"
            text-anchor="middle"
            font-family={SANS}
            font-size="11"
            font-weight="500"
            letter-spacing="1.5"
            fill="#606060">VALUE GAP →</text
          >

          <!-- ticks -->
          {#each [['0–12mo', 16], ['1–3yr', 50], ['3yr +', 84]] as [label, v]}
            <text x={px(Number(v))} y={PAD.t + PH + 20} text-anchor="middle" font-family={SANS} font-size="10.5" fill="#8d8781">{label}</text>
          {/each}
          {#each [['Large', 84], ['Med', 50], ['Small', 16]] as [label, v]}
            <text x={PAD.l - 10} y={py(Number(v)) + 4} text-anchor="end" font-family={SANS} font-size="10.5" fill="#8d8781">{label}</text>
          {/each}

          <!-- live ghost marker -->
          <line x1={px(clock)} y1={PAD.t} x2={px(clock)} y2={PAD.t + PH} stroke="#111112" stroke-width="1" stroke-dasharray="3 5" opacity="0.3" />
          <line x1={PAD.l} y1={py(gap)} x2={PAD.l + PW} y2={py(gap)} stroke="#111112" stroke-width="1" stroke-dasharray="3 5" opacity="0.3" />
          <circle
            cx={px(clock)}
            cy={py(gap)}
            r={reachRadius(Number(reach)) + 5}
            fill="none"
            stroke="#111112"
            stroke-width="1.5"
            stroke-dasharray="4 4"
          />

          <!-- plotted assets -->
          {#each assets as a (a.id)}
            {#if a.sell > 0}
              <circle
                cx={px(a.clock)}
                cy={py(a.gap)}
                r={reachRadius(a.reach) + 5}
                fill="none"
                stroke="#111112"
                stroke-width="1.3"
                stroke-dasharray={a.sell === 1 ? '3 3' : 'none'}
              />
            {/if}
            <circle
              cx={px(a.clock)}
              cy={py(a.gap)}
              r={reachRadius(a.reach)}
              fill={moatFill(a.moat)}
              stroke="#ffffff"
              stroke-width="1.5"
            />
            <text
              x={px(a.clock)}
              y={py(a.gap) - reachRadius(a.reach) - 11}
              text-anchor="middle"
              font-family={SANS}
              font-size="12"
              font-weight="500"
              fill="#111112">{a.name}</text
            >
          {/each}
        </svg>
      </div>

      <div class="legend">
        <span class="key">
          <svg width="34" height="14" aria-hidden="true">
            <circle cx="6" cy="7" r="4" fill={moatFill(15)} stroke="#fff" />
            <circle cx="17" cy="7" r="4" fill={moatFill(50)} stroke="#fff" />
            <circle cx="28" cy="7" r="4" fill={moatFill(90)} stroke="#fff" />
          </svg>
          Fill — moat
        </span>
        <span class="key">
          <svg width="34" height="14" aria-hidden="true">
            <circle cx="6" cy="7" r="2.5" fill="#8d8781" />
            <circle cx="17" cy="7" r="4" fill="#8d8781" />
            <circle cx="29" cy="7" r="5.5" fill="#8d8781" />
          </svg>
          Size — reach
        </span>
        <span class="key">
          <svg width="34" height="14" aria-hidden="true">
            <circle cx="17" cy="7" r="3" fill="#8d8781" />
            <circle cx="17" cy="7" r="6" fill="none" stroke="#111112" stroke-dasharray="2 2" />
          </svg>
          Ring — sellability
        </span>
        <span class="spacer"></span>
        <button class="btn btn-quiet" type="button" onclick={savePng} disabled={!assets.length}>
          Save chart as PNG
        </button>
      </div>
    </div>
  </div>

  <!-- ---------- ASSET LIST ---------- -->
  <div class="list-block">
    <div class="list-head">
      <h3>Portfolio</h3>
      <div class="list-actions">
        {#if assets.length}
          <button class="btn btn-quiet" type="button" onclick={clearAll}>Clear all</button>
        {:else}
          <button class="btn btn-quiet" type="button" onclick={loadExample}>
            Load the worked example
          </button>
        {/if}
      </div>
    </div>

    {#if assets.length}
      <ul class="asset-list">
        {#each assets as a (a.id)}
          <li>
            <span class="swatch" style="background: {moatFill(a.moat)}"></span>
            <span class="asset-name">{a.name}</span>
            <span class="asset-meta">
              {moatBand(a.moat)} moat · {REACH[a.reach]} · {gapBand(a.gap)} gap · {clockBand(a.clock)}
              · {SELL[a.sell]} sellability
            </span>
            <span class="badge" class:badge-accent={quadrant(a.gap, a.clock) === 'Activate'}>
              {quadrant(a.gap, a.clock)}
            </span>
            <span class="row-actions">
              <button class="btn btn-quiet" type="button" onclick={() => edit(a)}>Edit</button>
              <button class="btn btn-quiet" type="button" onclick={() => remove(a.id)}>Remove</button>
            </span>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="empty">
        Nothing plotted yet. Score an asset above — four or five real ones out of your own plan, not
        hypotheticals.
      </p>
    {/if}
  </div>
</div>

<style>
  .tool {
    --panel-bg: var(--bg-default);
    --panel-border: var(--border);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--gap-md);
    align-items: start;
  }

  .panel {
    background: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-radius: var(--radius-md);
  }

  /* ---------- form ---------- */
  .form {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .panel-head h3 {
    font-size: 1.4rem;
    line-height: 1.2;
  }
  .panel-head p {
    margin-top: 0.4rem;
    font-size: var(--fs-small);
    line-height: 1.5;
    color: var(--text-muted);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }
  .field-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }
  .field label,
  .group-label {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    color: var(--text);
  }
  .value {
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
    color: var(--accent-deep);
    font-variant-numeric: tabular-nums;
  }
  .hint {
    font-size: var(--fs-tiny);
    line-height: 1.5;
    color: var(--text-muted);
  }

  .text-input {
    width: 100%;
    padding: 0.7rem 0.9rem;
    font-family: var(--font-body);
    font-size: var(--fs-small);
    color: var(--text);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    transition: border-color 0.25s ease;
  }
  .text-input::placeholder { color: var(--neutral-300); }
  .text-input:focus-visible {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-ring);
  }

  /* ---------- lands-in readout ---------- */
  .lands {
    padding: 1.1rem 1.25rem;
    background: var(--accent-soft);
    border-left: 3px solid var(--accent);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }
  .lands-eyebrow {
    display: block;
    font-size: var(--fs-tiny);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .lands strong {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: var(--fw-normal);
    margin-block: 0.15rem 0.35rem;
  }
  .lands p {
    font-size: var(--fs-tiny);
    line-height: 1.6;
    color: var(--text-medium);
  }

  /* ---------- buttons ---------- */
  .form-actions {
    display: flex;
    gap: 0.6rem;
  }
  .btn {
    font-family: var(--font-body);
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
    line-height: 1;
    border: 1px solid transparent;
    border-radius: var(--radius-button);
    cursor: pointer;
    transition: opacity 0.25s ease, background 0.25s ease, color 0.25s ease;
  }
  .btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .btn-primary {
    flex: 1;
    padding: 0.8rem 1.25rem;
    background: var(--bg-invert);
    color: var(--text-invert);
  }
  .btn-primary:hover { opacity: 0.85; }
  .btn-ghost {
    padding: 0.8rem 1.1rem;
    background: transparent;
    color: var(--text-muted);
  }
  .btn-ghost:hover { color: var(--text); }
  .btn-quiet {
    padding: 0.45rem 0.8rem;
    background: transparent;
    color: var(--text-muted);
    border-color: var(--border);
  }
  .btn-quiet:hover:not(:disabled) {
    color: var(--text);
    background: var(--bg-surface);
  }
  .btn-quiet:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* ---------- plot ---------- */
  .plot { padding: 0.75rem; overflow: hidden; }
  .plot svg { display: block; width: 100%; height: auto; }

  .legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1.4rem;
    margin-top: 1rem;
    font-size: var(--fs-tiny);
    color: var(--text-muted);
  }
  .key {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  .spacer { flex: 1 1 auto; }

  /* ---------- asset list ---------- */
  .list-block { margin-top: var(--gap-lg); }
  .list-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.9rem;
    border-bottom: 2px solid var(--text);
  }
  .list-head h3 { font-size: 1.5rem; }

  .asset-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .asset-list li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.9rem;
    padding: 1rem 0.25rem;
    border-bottom: 1px solid var(--border);
  }
  .swatch {
    width: 0.85rem;
    height: 0.85rem;
    flex: none;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px var(--scrim-10);
  }
  .asset-name {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    min-width: 10rem;
  }
  .asset-meta {
    flex: 1 1 16rem;
    font-size: var(--fs-tiny);
    color: var(--text-muted);
  }
  .badge {
    padding: 0.28rem 0.7rem;
    font-size: var(--fs-tiny);
    font-weight: var(--fw-medium);
    color: var(--text-medium);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-button);
    white-space: nowrap;
  }
  .badge-accent {
    color: var(--accent-deep);
    background: var(--accent-soft);
    border-color: var(--accent);
  }
  .row-actions { display: flex; gap: 0.4rem; }

  .empty {
    padding: 3rem 0;
    max-width: 34rem;
    font-size: var(--fs-small);
    line-height: 1.7;
    color: var(--text-muted);
  }

  /* ---------- bits-ui parts (global: rendered by child components) ---------- */
  :global(.sc-slider) {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.25rem;
    touch-action: none;
    user-select: none;
  }
  :global(.sc-slider__track) {
    position: relative;
    flex-grow: 1;
    height: 0.375rem;
    border-radius: var(--radius-button);
    background: var(--bg-surface);
    box-shadow: inset 0 0 0 1px var(--border);
    overflow: hidden;
  }
  /* band boundaries at 33 / 67 — drawn over the fill so they stay visible */
  :global(.sc-slider)::after {
    content: "";
    position: absolute;
    inset-inline: 0;
    top: 50%;
    z-index: 1;
    height: 0.375rem;
    transform: translateY(-50%);
    pointer-events: none;
    background:
      linear-gradient(var(--scrim-20), var(--scrim-20)) 33.33% / 1px 100% no-repeat,
      linear-gradient(var(--scrim-20), var(--scrim-20)) 66.66% / 1px 100% no-repeat;
  }
  :global(.sc-slider__range) {
    height: 100%;
    background: var(--accent);
  }
  :global(.sc-slider__thumb) {
    display: block;
    z-index: 2;
    width: 1.15rem;
    height: 1.15rem;
    border-radius: 50%;
    background: var(--bg-default);
    border: 2px solid var(--primary);
    cursor: grab;
    transition: box-shadow 0.2s ease;
  }
  :global(.sc-slider__thumb:active) { cursor: grabbing; }
  :global(.sc-slider__thumb:hover),
  :global(.sc-slider__thumb[data-active]) {
    box-shadow: 0 0 0 5px var(--accent-ring);
  }
  :global(.sc-slider__thumb:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 3px var(--bg-default), 0 0 0 6px var(--accent);
  }

  :global(.sc-toggle) {
    display: grid;
    gap: 0.4rem;
  }
  :global(.sc-toggle--4) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  :global(.sc-toggle--3) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  :global(.sc-toggle__item) {
    padding: 0.6rem 0.35rem;
    font-family: var(--font-body);
    font-size: var(--fs-tiny);
    font-weight: var(--fw-medium);
    color: var(--text-muted);
    background: var(--bg-default);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  :global(.sc-toggle__item:hover) {
    color: var(--text);
    background: var(--bg-surface);
  }
  :global(.sc-toggle__item[data-state='on']) {
    color: var(--accent-deep);
    background: var(--accent-soft);
    border-color: var(--accent);
  }
  :global(.sc-toggle__item:focus-visible) {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* ---------- responsive ---------- */
  @media (min-width: 64rem) {
    .grid { grid-template-columns: minmax(0, 23rem) minmax(0, 1fr); }
    .plot-col {
      position: sticky;
      top: 6.5rem;
    }
  }
  @media (max-width: 30rem) {
    .form { padding: 1.25rem; }
    .asset-name { min-width: 0; flex: 1 1 100%; }
  }
</style>
