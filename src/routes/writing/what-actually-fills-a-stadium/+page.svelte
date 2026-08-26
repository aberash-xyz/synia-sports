<script>
  import { t } from '$lib/i18n.js';

  const sources = [
    {
      cite: 'Rintaugu, E. G., Mwangi, F. K., & Ndiwa, T. (2019). Organizational factors influencing football development in East African countries. Soccer & Society, 20(1), 107–121.',
      finding:
        'Governance deficiencies, inadequate funding structures and weak commercial infrastructure are the primary constraints on league development across Kenya, Uganda and Tanzania — not talent, and not interest.'
    },
    {
      cite: 'Semon, H. (2022). Identity and dissent in Ethiopian football fandom (2012–2019). Journal of Eastern African Studies, 16(2), 234–252.',
      finding:
        'Community identity and emotional investment in Ethiopian Premier League clubs run deep. The barrier to commercial growth is not absent passion; it is the absent organisational infrastructure that would convert passion into attendance.'
    },
    {
      cite: 'Richau, L., Emrich, E., Follert, F., & Pierdzioch, C. (2022). New sports stadia for Africa? The impact of sportscape features on attendance intentions in sub-Saharan African club football. European Sport Management Quarterly, 23(4), 1–22.',
      finding:
        'Attendance in developing African football markets is driven by facility experience, social belonging and organisational trust — not by competitive uncertainty.'
    },
    {
      cite: 'Schreyer, D., & Ansari, P. (2022). Stadium attendance demand research: A scoping review. Journal of Sport Management, 36(2), 165–180.',
      finding:
        'A persistent gap exists in academic and commercial methodology for African and other emerging-market leagues, with an explicit call for context-specific research.'
    }
  ];
</script>

<svelte:head>
  <title>What Actually Fills a Stadium — {$t('brand.name')}</title>
  <meta
    name="description"
    content="Research on attendance in sub-Saharan African football finds that facility experience, social belonging and organisational trust drive attendance — not competitive uncertainty. What that means for Ethiopian football, and two things I got wrong."
  />
</svelte:head>

<article>
  <!-- HEADER -->
  <section class="section section-lg">
    <div class="container container-sm">
      <a class="back" href="/writing">← {$t('nav.writing')}</a>
      <span class="eyebrow">Research</span>
      <h1>What actually fills a stadium</h1>
      <p class="standfirst">
        The research on African football attendance says something most commercial thinking about
        the game gets backwards. Working through what it means for Ethiopian football — including
        two conclusions of my own that it overturns.
      </p>
      <p class="byline">
        Adapted from <em>Synia Sports: A Fan Development and Commercial Intelligence Business Plan
        for Emerging African Football Markets</em> — capstone research, MSA, Northwestern
        University, 2026. Revised where I now think the original was wrong.
      </p>
    </div>
  </section>

  <!-- THE PARADOX -->
  <section class="section">
    <div class="container container-sm prose">
      <p class="lede">
        Ethiopian football contains a contradiction that ought to be impossible to sustain, and
        has been sustained for decades.
      </p>
      <p>
        On one side: 135.5 million people, a median age of 19.1 years, and roughly 57.4 million
        of them under 25 — one of the largest youth demographics on earth (UNFPA, 2025). Addis
        Ababa alone holds about six million people and is growing at over four percent a year
        (World Population Review, 2026). Add a diaspora of 2.5 to 3 million with genuine
        emotional attachment to the domestic game. By any structural measure this is a market
        that should be commercially significant.
      </p>
      <p>
        On the other: clubs spending an estimated 80 to 90 percent of their budgets on player
        salaries, with effectively nothing left for developing an audience. Roughly 84 percent of
        Ethiopian sports clubs are government-owned, producing near-total dependency on public
        subsidy (Ethiopian Business Review, 2023). And in 2025 the league's only international
        broadcast deal was not renewed, removing international distribution entirely (Pan Africa
        Football, 2025).
      </p>
      <p>
        The usual explanation for this gap is that the football isn't good enough, or that the
        audience doesn't care enough. The research says both of those are wrong.
      </p>
    </div>
  </section>

  <!-- THE CYCLE -->
  <section class="section section-grey">
    <div class="container container-sm prose">
      <h2>A cycle, not a deficiency</h2>
      <p>
        What the numbers above actually describe is a loop that feeds itself. Low attendance
        suppresses sponsor interest. Thin sponsorship limits revenue. Limited revenue prevents
        any investment in the matchday product. And a product nobody has invested in gives
        people no particular reason to show up — which returns you to low attendance, one season
        later and slightly worse.
      </p>
      <p class="pull">
        No individual actor in that loop is behaving irrationally. A club spending 90 percent of
        its budget on players is responding correctly to the incentive it faces. The loop is the
        problem, not the participants.
      </p>
      <p>
        That matters for where you intervene. If the diagnosis is "the clubs are badly run," the
        remedy is governance reform, which is slow, political, and mostly outside anyone's
        control. If the diagnosis is a self-reinforcing cycle, then the question becomes narrower
        and far more tractable: which single link is cheapest to break?
      </p>
    </div>
  </section>

  <!-- THE RESEARCH -->
  <section class="section">
    <div class="container container-sm prose">
      <h2>What the research actually found</h2>
      <p>
        Four peer-reviewed sources anchored the original research. Taken together they redraw the
        problem.
      </p>

      <div class="sources">
        {#each sources as s, i}
          <div class="source">
            <span class="source-num">{String(i + 1).padStart(2, '0')}</span>
            <p class="finding">{s.finding}</p>
            <p class="cite">{s.cite}</p>
          </div>
        {/each}
      </div>

      <p>
        The Richau finding is the one that should change how clubs behave, and it is the one most
        likely to be dismissed by people who reason about attendance from European experience.
        In developed leagues, a substantial body of work links attendance to competitive balance
        — the closer the title race, the fuller the ground. It is an intuitive result and it
        travels badly.
      </p>
      <p>
        In sub-Saharan African club football, Richau et al. find attendance intentions driven by
        <strong>facility experience, social belonging and organisational trust</strong>. Whether
        the match is likely to be close does not do the work people assume it does. Whether
        someone can find their seat, sit with people they know, trust that the gate will open
        when it says it will, and get home afterwards — that does.
      </p>
      <p>
        Put beside Semon's documentation of how deep club identity runs in Ethiopian fandom, the
        conclusion is uncomfortable for the conventional view. The passion is already there. It
        has been there the whole time. What is missing is the organisational layer that would let
        someone act on it on a Saturday.
      </p>
      <p class="pull">
        Sponsors do not create audiences. They buy access to audiences that already exist. If the
        audience exists but cannot be counted, the sponsorship conversation never starts.
      </p>
    </div>
  </section>

  <!-- CORRECTION 1 -->
  <section class="section section-grey">
    <div class="container container-sm prose">
      <span class="step">Revision one</span>
      <h2>The denominator was wrong</h2>
      <p>
        My original research described Ethiopia as a low-data, largely offline market, and cited
        the standard figures to support it: internet penetration around 21.3 percent, smartphone
        penetration around 15 percent (DataReportal, 2025). Nearly every outside analysis of the
        Ethiopian market uses those numbers or ones like them.
      </p>
      <p>
        The same source reports something else: <strong>85.4 million mobile connections — 63.8
        percent of the population.</strong> I quoted that figure too, and did not sit with the
        tension between it and the conclusion I drew from the others.
      </p>
      <p>
        Operator reporting points the same way, and harder. For the financial year ending June
        2025, Ethio Telecom reported <strong>46.6 million mobile data users</strong> against a
        total base of 83.2 million subscribers, and <strong>54.84 million telebirr accounts</strong>
        through which 2.38 trillion birr moved in that year alone. Safaricom Ethiopia — a second
        operator, absent from those totals — reported 14.7 million active customers by June 2026.
      </p>
      <p>
        These figures are not directly comparable to DataReportal's, and it would be sloppy to
        pretend otherwise. Subscription counts overstate unique people, because one person can
        hold several SIMs; mobile money accounts are identity-linked and closer to one per person,
        but include dormant ones. Different methods, different questions. Still: the distance
        between "21.3 percent of Ethiopians use the internet" and "one operator counts 46.6
        million mobile data users" is too large to be explained by methodology alone.
      </p>
      <p>
        The problem is the unit of analysis. A national penetration figure for Ethiopia averages
        across a large rural majority. It is a real number and it answers a real question, but it
        is not the question a club is asking. The relevant population is not "Ethiopians." It is
        people who attend Ethiopian Premier League matches — overwhelmingly urban, concentrated
        in Addis Ababa, and skewed young and male. There is no serious reason to think that
        group's connectivity resembles the national average, and good reason to think it is
        dramatically higher.
      </p>
      <p class="pull">
        "Low-data market" is, to a significant degree, an artefact of the wrong denominator.
      </p>
      <p>
        This is not a small correction. It changes what kind of problem this is. If the audience
        genuinely cannot be reached digitally, you are facing an infrastructure problem that
        takes a decade and a telecoms operator to solve. If the audience is reachable and simply
        has never been asked for anything, you are facing an instrumentation problem — and
        instrumentation is a quarter's work, not a decade's.
      </p>
      <p>
        The signals largely exist. Gate counts exist. Ticket sales exist. Someone in the building
        knows roughly how many people came last Saturday. What does not exist is any structured
        collection of it, because nobody has been asked to collect it in a form that would survive
        contact with a sponsor's finance director.
      </p>
    </div>
  </section>

  <!-- CORRECTION 2 -->
  <section class="section">
    <div class="container container-sm prose">
      <span class="step">Revision two</span>
      <h2>Which kills the hardware I proposed</h2>
      <p>
        The original research proposed NFC and RFID readers at stadium gates, running on
        Raspberry Pi-class hardware, storing data locally and syncing when connectivity allowed.
        Passive cards for regular attendees. Roughly $150 to $300 per gate.
      </p>
      <p>
        That design was reasoning correctly from a premise I now think is wrong. Edge hardware
        and physical cards are what you build when you have concluded your audience cannot be
        reached any other way. With a corrected denominator that recommendation falls away.
      </p>
      <p>
        If the matchgoing audience carries phones then admission keyed to a phone
        number does the same job with no capital expenditure, no hardware to maintain, no cards
        to replace, and no installation to negotiate with a stadium operator. Ticket purchase or
        collection can run the same way. The direction of travel is not ambiguous: people acquire
        more devices over time, not fewer, and any system justified by device scarcity is
        depreciating from the day it is installed.
      </p>
      <p>
        The rail for this is not hypothetical and does not need building. Ethiopia has roughly 60
        million phone-number-linked mobile money accounts across telebirr and M-PESA. Since
        October 2025 M-PESA has been integrated with EthSwitch, the national payment switch,
        connecting it to more than 30 banks and regulated wallets and enabling EthQR merchant
        payments at over 50,000 merchants. A national, interoperable, phone-keyed payment
        network already exists, and Ethiopians are already using it to buy things.
      </p>
      <p class="pull">
        Specifying proprietary card hardware for a stadium gate in a country with 50,000 EthQR
        merchants is not designing for constraint. It is failing to check what has been built
        since.
      </p>
      <p>
        The phone-based approach is also <em>better</em>, not merely cheaper, for the thing that
        actually matters. A card tapped at a turnstile produces an anonymous count. A phone
        number produces a returning identity, which is what the useful metric requires. The
        original research proposed measuring first-match-to-return rate, targeting 35 percent
        within a season. You cannot measure return without recognising a person across two
        Saturdays, and a phone number does that natively. It also leaves you with something a
        turnstile never yields: a way to reach that person before the next fixture.
      </p>

      <div class="callout">
        <h3>What survives</h3>
        <p>
          One part of the original argument holds regardless of collection method, and it is the
          part that matters commercially. A valuation built on attendance figures supplied by the
          organisation being valued is not evidence. Whoever operates the collection system needs
          to be independent of the club whose asset is being priced — that is the difference
          between a number a sponsor can underwrite and a number a sponsor is asked to trust.
        </p>
        <p>
          That was always an <em>integrity</em> argument rather than a connectivity one. I had it
          filed under the wrong heading.
        </p>
      </div>
    </div>
  </section>

  <!-- WHAT INTERVENTION LOOKS LIKE -->
  <section class="section section-grey">
    <div class="container container-sm prose">
      <h2>What breaking the loop looks like</h2>
      <p>
        Take the Richau finding seriously and the intervention list stops being about the football
        and starts being about the experience of going.
      </p>
      <ul class="interventions">
        <li>
          <strong>Structured first-match access.</strong> Formal partnerships with schools,
          universities and community organisations to bring first-time attendees in. The barrier
          to a first match is rarely price. It is not knowing how it works.
        </li>
        <li>
          <strong>Neighbourhood ambassadors.</strong> Trusted local figures equipped to bring
          groups. This is the social-belonging variable, addressed directly rather than hoped for.
        </li>
        <li>
          <strong>Matchday friction removal.</strong> Organised supporter sections, working
          wayfinding, coordinated transport. Unglamorous, cheap, and precisely what the research
          says moves the number.
        </li>
        <li>
          <strong>A baseline before any of it.</strong> A documented prior-season attendance
          figure, collected the same way every week. Without it, nothing above can be shown to
          have worked, and a 20 percent improvement is indistinguishable from a good fixture list.
        </li>
      </ul>
      <p>
        Note what is absent: no stadium construction, no broadcast negotiation, no governance
        reform. Those are real and they are slow. This list is a season's work, and its output is
        the first thing a sponsor has ever been able to check.
      </p>
    </div>
  </section>

  <!-- FRAMEWORK -->
  <section class="section">
    <div class="container container-sm prose">
      <h2>Where domestic football sits</h2>
      <p>
        Scored against the <a href="/writing/sports-asset-activation-framework">Sports Asset
        Activation Framework</a>, the domestic club game does not land where its cultural
        significance suggests it should.
      </p>

      <div class="scorecard">
        <div><span>Moat</span><strong>Strong</strong><em>Club identity is not replicable or transferable</em></div>
        <div><span>Reach</span><strong>Domestic + diaspora</strong><em>Not global; that distinction matters</em></div>
        <div><span>Gap</span><strong>Large</strong><em>Almost none of the value is captured</em></div>
        <div><span>Clock</span><strong>1–3 years</strong><em>Requires a season of baseline before anything is sellable</em></div>
      </div>

      <p class="verdict">Large gap, long clock. <strong>Build toward</strong> — not Activate.</p>

      <p>
        That will be an unpopular reading in a room that cares about football, so it is worth
        being precise about what it does and does not say. It does not say the domestic game is
        unimportant, or that it should be deprioritised. It says the work this year is
        pre-positioning rather than revenue, and that treating it as an Activate asset — pitching
        sponsors now, on numbers that do not yet exist — is the mistake that has already been
        made repeatedly.
      </p>
      <p>
        The pre-positioning work is specific: establish the collection method, run a full season
        of baseline, and get the measurement layer in place <em>before</em> the commercial
        conversation rather than during it. That sequencing is the whole argument. A sponsor
        approached with a verified attendance trend is in a different conversation from a sponsor
        approached with a story.
      </p>
      <p>
        Two adjacent assets score differently and deserve separating out. <strong>Diaspora
        engagement</strong> has a materially shorter clock — the 2024 collaboration between D.C.
        United and the Ethiopian Football Federation that brought Saint George FC and Ethiopian
        Coffee SC to Audi Field drew a substantial crowd and established the proof of concept
        publicly. That audience is reachable today, on platforms that already exist, with no
        infrastructure to build. And <strong>event hosting rights</strong> — continental fixtures,
        regional tournaments — carry their own economics, largely independent of domestic league
        attendance.
      </p>
      <p>
        Which produces a conclusion worth stating plainly, because it is where this argument will
        be contested: international football tourism is a hard market for an emerging league to
        enter, and the realistic near-term prize is regional and diaspora travel plus hosting
        rights — not global audiences for the domestic product. The scoring keeps producing that
        answer. It is less exciting than the alternative and it has the advantage of being
        defensible.
      </p>
    </div>
  </section>

  <!-- CLOSE -->
  <section class="section section-grey">
    <div class="container container-sm prose">
      <h2>The gap is not inevitable</h2>
      <p>
        The distance between a league's cultural weight and its commercial reality is not a fact
        of nature and not a verdict on the audience. It is an infrastructure problem, and
        infrastructure problems are solvable in a way that cultural deficits are not.
      </p>
      <p>
        The research is fairly unified on where to start. Not with the product on the pitch, and
        not with a pitch deck. With the unglamorous work of making it easy to attend, and then
        counting — consistently, independently, and in a form somebody outside the building can
        check.
      </p>
      <p class="footnote sources-note">
        <strong>Operator figures cited above.</strong> Ethio Telecom results for FY2024/25
        (July 2024 – June 2025): 83.2m subscribers, 46.6m mobile data users, 54.84m telebirr
        users, 2.38tn birr in telebirr transactions. Safaricom Ethiopia: 14.7m active customers
        at June 2026, up from 10.06m a year earlier; M-PESA Ethiopia 5.2m active customers in
        the quarter to December 2025, following EthSwitch integration in October 2025.
        Demographic and market figures are as cited in the original capstone research.
      </p>
      <p class="footnote">
        This piece revises two conclusions from the original capstone research: the
        characterisation of Ethiopia as a low-data market, and the physical data-collection
        infrastructure that followed from it. The academic findings and market data cited are
        unchanged. Where the original was wrong, it was wrong in a direction worth naming —
        it accepted a national statistic as a description of a specific audience.
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
    max-width: 15ch;
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
    line-height: 1.6;
    color: var(--text-muted);
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
    max-width: 44rem;
  }
  .byline em { font-style: italic; }

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
  .prose a { text-decoration: underline; text-underline-offset: 0.2em; }

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
    color: var(--text) !important;
  }

  .sources {
    margin-block: 2rem;
    display: grid;
    gap: 1.25rem;
  }
  .source {
    padding: 1.75rem;
    background: var(--bg-default);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .source-num {
    font-family: var(--font-heading);
    font-size: 0.95rem;
    color: var(--accent);
    letter-spacing: 0.05em;
  }
  .source .finding {
    margin-block: 0.5rem 0.9rem;
    color: var(--text);
    line-height: 1.6;
  }
  .source .cite {
    margin: 0;
    font-size: var(--fs-small);
    line-height: 1.55;
    color: var(--text-muted);
  }

  .callout {
    margin-block: 2.5rem;
    padding: 2rem;
    background: var(--bg-default);
    border: 1px solid var(--accent);
    border-radius: var(--radius-md);
  }
  .callout h3 {
    font-size: 1.3rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }
  .callout p { margin-block: 0.75rem 0; }

  .interventions {
    margin-block: 1.5rem;
    padding-left: 1.25rem;
  }
  .interventions li {
    margin-block: 1.1rem;
    line-height: 1.7;
    color: var(--text-medium);
  }

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
    font-size: 1.4rem;
    font-weight: var(--fw-normal);
    margin-block: 0.2rem;
    color: var(--text);
  }
  .scorecard em {
    font-size: var(--fs-small);
    color: var(--text-muted);
    font-style: normal;
  }
  .verdict { font-size: 1.2rem; }
  .verdict strong { color: var(--accent); }

  .sources-note { margin-bottom: 0; }
  .footnote {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
    font-size: var(--fs-small);
    line-height: 1.65;
    color: var(--text-muted) !important;
  }

  @media (max-width: 767px) {
    .scorecard { grid-template-columns: 1fr; }
    .source { padding: 1.5rem; }
  }
</style>
