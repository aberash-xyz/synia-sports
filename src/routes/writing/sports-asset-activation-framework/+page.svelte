<script>
  import { t } from '$lib/i18n.js';

  const axes = [
    { name: 'Moat',  question: 'Why here and nowhere else?',            scale: 'None / Weak / Strong' },
    { name: 'Reach', question: 'How far will someone travel for it?',   scale: 'Within city → Intercity → Regional Africa → Global' },
    { name: 'Gap',   question: 'Potential value minus value realised today?', scale: 'Small / Medium / Large' },
    { name: 'Clock', question: 'How long until it can be activated?',   scale: '0–12mo / 1–3yr / 3yr+' }
  ];

  const quadrants = [
    {
      key: 'activate',
      label: 'Activate',
      condition: 'Large gap · Short clock',
      job: 'This is the 90-day list. Underpriced and ready now. The work is commercial, not strategic — pick the metric, name the owner, start collecting.'
    },
    {
      key: 'build',
      label: 'Build toward',
      condition: 'Large gap · Long clock',
      job: 'The job today is not revenue, it is pre-positioning. Decide now what data, what technical specification, and what event calendar the asset will need — those get roughly ten times cheaper to embed before construction finishes than after.'
    },
    {
      key: 'maintain',
      label: 'Maintain',
      condition: 'Small gap · Short clock',
      job: 'Already working. Protect it, do not over-invest attention in it. The temptation is to keep optimising the asset you already understand.'
    },
    {
      key: 'park',
      label: 'Park',
      condition: 'Small gap · Long clock',
      job: 'Not abandoned — scheduled. Naming the binding constraint is the output here. If the constraint is roads rather than strategy, say so and set a date to revisit.'
    }
  ];

  const multipliers = [
    {
      name: 'Technology',
      body: 'Instrumentation layered onto an existing asset — testing, wearables, recovery and performance data. Raises what a visitor is willing to pay without changing the underlying asset.'
    },
    {
      name: 'Health',
      body: 'Facilities built for visitors have off-peak capacity that serves residents and local clubs. Same asset, second constituency — and a domestic political story rather than only a foreign-currency one.'
    },
    {
      name: 'MICE adjacency',
      body: 'Conferences, federations, and governing-body meetings attached to sporting events. High spend per head, and it uses infrastructure a destination has usually already built.'
    }
  ];
</script>

<svelte:head>
  <title>The Sports Asset Activation Framework — {$t('brand.name')}</title>
  <meta
    name="description"
    content="A framework for scoring, plotting and activating a portfolio of sports assets — built for cities and public bodies deciding where sports tourism investment should go first."
  />
</svelte:head>

<article>
  <!-- HEADER -->
  <section class="section section-lg">
    <div class="container container-sm">
      <a class="back" href="/writing">← {$t('nav.writing')}</a>
      <span class="eyebrow">Framework</span>
      <h1>The Sports Asset Activation Framework</h1>
      <p class="standfirst">
        Score, plot, activate. A way for a city to decide which of its sports assets to move
        on this year, which to prepare for, and which to leave alone on purpose.
      </p>
      <p class="byline">Free to use, adapt and reproduce with attribution.</p>
    </div>
  </section>

  <!-- PROBLEM -->
  <section class="section">
    <div class="container container-sm prose">
      <p class="lede">
        Most destinations do not have a sports tourism problem. They have a sequencing problem.
      </p>
      <p>
        A city with a serious tourism plan usually already knows what it has. The stadium, the
        marathon, the altitude, the league, the diaspora, the calendar of continental fixtures.
        What it rarely has is a defensible answer to a harder question: <em>of everything on this
        list, which two things should we move on in the next ninety days, and which are we
        deliberately not touching until 2029?</em>
      </p>
      <p>
        Without that answer, attention distributes evenly across a portfolio — which in practice
        means the most visible asset absorbs the most resource, regardless of whether it is the
        one with the most value left on the table. This framework exists to force that
        distinction, and to make it defensible to someone who was not in the room.
      </p>
    </div>
  </section>

  <!-- STEP 1 -->
  <section class="section section-grey">
    <div class="container container-sm prose">
      <span class="step">Step 1</span>
      <h2>Score every asset on four things</h2>
      <p>
        Take the assets straight out of the plan you already have. Score each one on four axes.
        The scoring is deliberately coarse — three or four bands, no decimals. Precision here is
        false comfort, and it slows the exercise down.
      </p>

      <div class="table-scroll">
        <table class="axes">
          <thead>
            <tr><th>Axis</th><th>Question</th><th>Scale</th></tr>
          </thead>
          <tbody>
            {#each axes as axis}
              <tr>
                <th scope="row">{axis.name}</th>
                <td>{axis.question}</td>
                <td class="scale">{axis.scale}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="callout">
        <h3>Why four axes when you only plot two?</h3>
        <p>
          <strong>Gap and Clock tell you what to do. Moat and Reach tell you what to do first.</strong>
          When several assets land in the same quadrant — and they will — you sequence them by
          moat, then by reach. A strong moat means nobody can copy the position out from under
          you; global reach means the ceiling is high enough to justify the effort. Two assets
          can be equally ready and equally underpriced, and still deserve very different
          amounts of attention.
        </p>
      </div>
    </div>
  </section>

  <!-- STEP 2 -->
  <section class="section">
    <div class="container container-sm prose">
      <span class="step">Step 2</span>
      <h2>Plot gap against clock</h2>
      <p>
        Gap on the vertical axis, clock on the horizontal. Four quadrants, and — this is the
        part that matters — four genuinely different jobs. An asset's quadrant does not tell you
        how important it is. It tells you what kind of work it needs this year.
      </p>

      <div class="matrix" role="img" aria-label="Two-by-two matrix plotting value gap against time to activate">
        <span class="axis-label y">Value gap →</span>
        {#each quadrants as q}
          <div class="quadrant {q.key}">
            <span class="q-condition">{q.condition}</span>
            <h3>{q.label}</h3>
            <p>{q.job}</p>
          </div>
        {/each}
        <span class="axis-label x">Time to activate →</span>
      </div>

      <p>
        The <strong>Park</strong> quadrant does more work than it looks like it does. Every
        portfolio contains an asset that matters politically but cannot move this year — a
        domestic product blocked by road quality, a regional circuit blocked by air links.
        Parking it explicitly, with the constraint named and a review date attached, is what
        lets a team honour the ambition without pretending it is actionable. The alternative is
        that it quietly consumes attention every quarter and produces nothing.
      </p>
    </div>
  </section>

  <!-- STEP 3 -->
  <section class="section section-grey">
    <div class="container container-sm prose">
      <span class="step">Step 3</span>
      <h2>One metric, one owner, one collection method</h2>
      <p>
        This is the step that makes the rest real, and it is the step most often skipped. Every
        asset gets <em>exactly one</em> metric, and a way of collecting it that exists today.
        Not a dashboard. Not a measurement framework to be procured next year. One number, one
        named person responsible for it, one method that can run this quarter.
      </p>
      <p class="pull">
        If you cannot name the collection method, the asset is not ready to activate — regardless
        of where it plotted.
      </p>
      <p>
        That test is unforgiving on purpose. It is also more often passed than people expect.
        The instinct in a low-data environment is to assume nothing is measurable and to design
        a survey instrument from scratch. In practice the number usually already exists inside
        somebody's business — it has simply never been asked for. A camp operator knows their
        bed-nights. A club knows its gate. A federation knows its registered participants. A
        monthly one-line return from four operators is a functioning measurement system, and it
        can be running within a quarter.
      </p>
      <p>
        The gap in most emerging sports markets is not the absence of digital infrastructure.
        It is the absence of instrumentation — nobody has been asked to collect, in a structured
        form, what they already know.
      </p>
    </div>
  </section>

  <!-- STEP 4 -->
  <section class="section">
    <div class="container container-sm prose">
      <span class="step">Step 4</span>
      <h2>Apply the three multipliers</h2>
      <p>
        Technology, health and MICE adjacency are not separate assets and should never be scored
        as such. They are layers applied to an existing asset to raise its ceiling. The same
        asset, higher potential value — which moves its gap score, and can move it into a
        different quadrant.
      </p>
      <div class="multipliers">
        {#each multipliers as m}
          <div class="multiplier">
            <h4>{m.name}</h4>
            <p>{m.body}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- WORKED EXAMPLE -->
  <section class="section section-grey">
    <div class="container container-sm prose">
      <span class="step">Worked example</span>
      <h2>Altitude running</h2>

      <div class="scorecard">
        <div><span>Moat</span><strong>Strong</strong><em>Altitude and terrain are not replicable</em></div>
        <div><span>Reach</span><strong>Global</strong><em>Athletes travel continents for it</em></div>
        <div><span>Gap</span><strong>Large</strong><em>Little of the demand is captured commercially</em></div>
        <div><span>Clock</span><strong>0–12 months</strong><em>The product already exists informally</em></div>
      </div>

      <p class="verdict">Plots into <strong>Activate</strong>.</p>

      <p>
        <strong>The metric:</strong> international camp bed-nights per quarter.
        <strong>The collection method:</strong> three or four camp operators already exist and
        already know this number. A monthly one-line return, not a survey instrument. No new
        system, no procurement, no budget line.
      </p>
      <p>
        <strong>The multipliers change what the product is.</strong> Lactate testing, wearables,
        sleep and recovery data move the offer from <em>run where the greats ran</em> to
        <em>train with instrumentation most amateurs cannot access at home</em>. That is the
        difference between a low-spend long-stay traveller and a high-spend one, and it is a
        change in pricing power rather than a change in volume.
      </p>
      <p>
        The health layer compounds it. A testing and recovery facility built for visiting
        athletes has capacity off-peak that serves residents and local clubs. Same asset, second
        constituency — and it converts a foreign-currency argument into a domestic one, which
        is usually what a public body actually needs in order to fund it.
      </p>

      <div class="callout contrast">
        <h3>Now score the stadium</h3>
        <p>
          Run the same four axes on a stadium under construction and it lands somewhere else
          entirely: large gap, long clock — <strong>Build toward</strong>. Same portfolio, same
          scoring, completely different job this year. The stadium's near-term work is not
          revenue. It is deciding, now, what data capture, what technical specification and
          what event calendar the building needs — because embedding those before completion
          costs a fraction of retrofitting them afterwards.
        </p>
        <p>That contrast is the lesson. The framework does not rank assets. It assigns them different work.</p>
      </div>
    </div>
  </section>

  <!-- THE BUILD -->
  <section class="section">
    <div class="container container-sm prose">
      <span class="step">The 30-minute build</span>
      <h2>Running it with a team</h2>
      <ol class="build">
        <li>
          <strong>15 minutes — score and plot.</strong> Teams take four or five assets straight
          out of their own plan. Not hypotheticals. The exercise only works on real assets the
          team already argues about.
        </li>
        <li>
          <strong>10 minutes — one activation card.</strong> Pick a single asset from the
          Activate quadrant and fill in: the one metric, who owns it, how it gets collected this
          quarter, one multiplier to test, and what "working" looks like in 90 days.
        </li>
        <li>
          <strong>5 minutes — report out.</strong> One card per team, read aloud. The cards are
          the artefact people leave with; the scorecard is the tool they re-run later.
        </li>
      </ol>
    </div>
  </section>

  <!-- HONEST NOTE -->
  <section class="section">
    <div class="container container-sm prose">
      <h2>An honest note on football</h2>
      <p>
        In most emerging markets the
        domestic club game today is a maintain-or-build asset with a strong domestic economy
        story and a weak international tourism one. The stadium plus continental fixtures is a
        separate asset, and it sits in <strong>Build toward</strong> — with rising continental
        competitiveness as the case for why its ceiling is going up.
      </p>
      <p>
        International football tourism is a hard market to enter. The realistic near-term prize
        is regional and diaspora travel plus event hosting rights. That
        conclusion is less exciting than the alternative, and it is the one the scoring keeps
        producing.
      </p>
    </div>
  </section>

  <!-- COMPARABLES -->
  <section class="section section-grey">
    <div class="container container-sm prose">
      <h2>Where this comes from</h2>
      <p>
        The framework is assembled from what has worked elsewhere, and from what those cases
        cost. Three worth studying:
      </p>
      <ul class="comparables">
        <li>
          <strong>Iten, Kenya.</strong> The clearest case of an altitude-running asset converted
          into a durable visitor economy — camps, accommodation, coaching, and a global
          reputation built over decades. Worth studying for the shape of the demand and for how
          little of the value was captured formally in the early years.
        </li>
        <li>
          <strong>Rwanda.</strong> A destination-marketing strategy executed through sport
          sponsorship at scale. Instructive on both sides: it demonstrably moved brand awareness,
          and it drew sustained public argument about cost per visitor. Any city considering the
          approach should be able to answer that second question before it spends.
        </li>
        <li>
          <strong>Morocco.</strong> Sustained investment in hosting capability and training
          infrastructure, paying off across multiple sports over a long horizon. The relevant
          lesson is about the length of the clock, not the size of the budget.
        </li>
      </ul>
      <p class="footnote">
        Each of these is a starting point for your own reading rather than a settled conclusion.
      </p>
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
    font-size: clamp(2.5rem, 6vw, 4rem);
    line-height: 1.1;
    max-width: 16ch;
  }
  .standfirst {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    line-height: 1.55;
    color: var(--text-muted);
    max-width: 44rem;
  }
  .byline {
    margin-top: 2rem;
    font-size: var(--fs-small);
    color: var(--text-muted);
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
    max-width: 44rem;
  }

  .prose { max-width: 44rem; }
  .prose p {
    margin-block: 1.25rem;
    line-height: 1.7;
    color: var(--text-medium);
  }
  .prose .lede {
    font-size: 1.25rem;
    line-height: 1.55;
    color: var(--text);
  }
  .prose h2 {
    margin-top: 0.5rem;
    font-size: 2rem;
    line-height: 1.2;
    max-width: 20ch;
  }
  .prose em { font-style: italic; }
  .prose strong { font-weight: var(--fw-semibold); color: var(--text); }

  .step {
    display: inline-block;
    font-family: var(--font-heading);
    font-size: 0.95rem;
    letter-spacing: 0.05em;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  .pull {
    margin-block: 2rem;
    padding-left: 1.5rem;
    border-left: 3px solid var(--accent);
    font-size: 1.2rem;
    line-height: 1.5;
    color: var(--text);
  }

  /* Scorecard table */
  .table-scroll { overflow-x: auto; margin-block: 2rem; }
  table.axes {
    width: 100%;
    min-width: 34rem;
    border-collapse: collapse;
    font-size: var(--fs-small);
  }
  table.axes th, table.axes td {
    text-align: left;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  table.axes thead th {
    font-family: var(--font-heading);
    font-weight: var(--fw-semibold);
    color: var(--text);
    border-bottom-width: 2px;
  }
  table.axes tbody th {
    font-family: var(--font-heading);
    font-size: 1.05rem;
    font-weight: var(--fw-semibold);
    white-space: nowrap;
  }
  table.axes td { color: var(--text-muted); }
  table.axes .scale { font-variant-numeric: tabular-nums; }

  .callout {
    margin-block: 2.5rem;
    padding: 2rem;
    background: var(--bg-default);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .callout h3 {
    font-size: 1.3rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }
  .callout p { margin-block: 0.75rem 0; }
  .callout.contrast { background: var(--bg-default); border-color: var(--accent); }

  /* 2x2 matrix */
  .matrix {
    margin-block: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    position: relative;
  }
  .quadrant {
    background: var(--bg-default);
    padding: 1.75rem;
  }
  .quadrant.activate { background: #fdf4ec; }
  .q-condition {
    display: block;
    font-size: var(--fs-tiny);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 0.4rem;
  }
  .quadrant h3 {
    font-size: 1.4rem;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }
  .quadrant p {
    margin: 0;
    font-size: var(--fs-small);
    line-height: 1.6;
    color: var(--text-muted);
  }
  .axis-label {
    font-size: var(--fs-tiny);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    background: var(--bg-default);
    grid-column: 1 / -1;
    padding: 0.6rem 1.75rem;
  }
  .axis-label.y { order: -1; }

  /* Multipliers */
  .multipliers {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  .multiplier {
    padding: 1.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .multiplier h4 {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
  }
  .multiplier p {
    margin: 0;
    font-size: var(--fs-small);
    line-height: 1.6;
    color: var(--text-muted);
  }

  /* Worked-example scorecard */
  .scorecard {
    margin-block: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .scorecard > div {
    background: var(--bg-default);
    padding: 1.25rem 1.5rem;
  }
  .scorecard span {
    display: block;
    font-size: var(--fs-tiny);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .scorecard strong {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: var(--fw-normal);
    margin-block: 0.2rem;
  }
  .scorecard em {
    font-size: var(--fs-small);
    color: var(--text-muted);
    font-style: normal;
  }
  .verdict {
    font-size: 1.2rem;
  }
  .verdict strong { color: var(--accent); }

  .build {
    margin-block: 1.5rem;
    padding-left: 1.25rem;
  }
  .build li {
    margin-block: 1rem;
    line-height: 1.7;
    color: var(--text-medium);
  }

  .comparables {
    margin-block: 1.5rem;
    padding-left: 1.25rem;
  }
  .comparables li {
    margin-block: 1.25rem;
    line-height: 1.7;
    color: var(--text-medium);
  }
  .footnote {
    font-size: var(--fs-small);
    color: var(--text-muted);
  }

  @media (max-width: 767px) {
    .matrix { grid-template-columns: 1fr; }
    .multipliers { grid-template-columns: 1fr; }
    .scorecard { grid-template-columns: 1fr; }
  }
</style>
