// The Imagine IF Idea — merged with About

window.IFIdea = (() => {
  const { useState, useEffect, useRef } = React;

  function Page({ onNav }) {
    return (
      <div className="page">
        <section className="section section--tight" style={{ paddingTop: 180 }}>
          <div className="shell">
            <span className="eyebrow">The format</span>
            <h1 style={{ marginTop: 16, maxWidth: '14ch' }}>
              Two words<br/>that <em className="italic-hero" style={{ color: 'var(--royal)' }}>open the door.</em>
            </h1>
            <div className="idea-lede">
              <p style={{ fontSize: 22, lineHeight: 1.4, color: 'var(--ink-soft)', maxWidth: '38ch' }}>
                Every talk at Imagine IF starts with the same prompt. <em className="italic-hero" style={{ fontSize: '1.15em', color: 'var(--royal)' }}>Imagine IF…</em> what comes next is the speaker's, the audience's, and ours together.
              </p>
              <p style={{ fontSize: 18, color: 'var(--ink-soft)', maxWidth: '52ch' }}>
                It's not a slogan. It's a hinge. The speaker walks through. So do you.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="idea-grid">
              <div className="idea-card">
                <span className="eyebrow">01 · Imagination</span>
                <h3>Plant the seed.</h3>
                <p className="muted">Every talk opens with an "Imagine IF…" — a future worth wanting. Specific, not abstract. Built from real projects, real places, real people.</p>
              </div>
              <div className="idea-card idea-card--accent">
                <span className="eyebrow" style={{ color: '#fbf6f1' }}>02 · Agency</span>
                <h3 style={{ color: '#fbf6f1' }}>Bring the tools.</h3>
                <p style={{ color: 'rgba(251,246,241,0.8)' }}>Imagination without agency is daydreaming. Every session pairs the prompt with the work — across the three rails of freedom tech: intelligence, humanity, money.</p>
              </div>
              <div className="idea-card">
                <span className="eyebrow">03 · Convergence</span>
                <h3>Cross the streams.</h3>
                <p className="muted">The interesting conversations happen in the overlap. An investor next to an engineer. A policymaker next to a builder. AI sitting next to bitcoin sitting next to energy. Hallway energy, on stage.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--paper-2)' }}>
          <div className="shell">
            <span className="eyebrow">What you won't find</span>
            <h2 style={{ maxWidth: '14ch', marginTop: 16, marginBottom: 28 }}>
              We cut three things <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>on purpose</em>.
            </h2>
            <div className="cuts-grid">
              <div className="cut">
                <span className="cut__num">×</span>
                <h4>Sponsor pitch decks on the main stage.</h4>
                <p className="muted">If a check buys you a logo, that's it. The stage is for ideas, not invoices.</p>
              </div>
              <div className="cut">
                <span className="cut__num">×</span>
                <h4>Panels with five strangers.</h4>
                <p className="muted">No filler panels. Two voices, three at most, with something real to disagree about.</p>
              </div>
              <div className="cut">
                <span className="cut__num">×</span>
                <h4>"In today's world…"</h4>
                <p className="muted">Cut every unnecessary word. Real people, real projects, real places. We hold ourselves to it; we hold our speakers to it.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 'var(--s-7)', alignItems: 'center' }} className="idea-quote-block">
              <div className="quote">
                "Imagination plus agency, never one without the other."
                <cite>— The Imagine IF brief</cite>
              </div>
              <div>
                <p style={{ fontSize: 18 }}>
                  We picked the format because the alternative — "trends in [thing] for [year]" — produces the same conference twelve times a year. None of it survives the elevator ride home.
                </p>
                <p style={{ fontSize: 18 }}>
                  An <em className="italic-hero" style={{ color: 'var(--royal)' }}>Imagine IF…</em> survives. It plants. People walk out repeating it.
                </p>
                <button className="btn btn--primary" style={{ marginTop: 12 }} onClick={() => onNav('speakers')}>See the speakers <span className="arr"></span></button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- About: family / sibling orgs ---------- */}
        <section className="section" style={{ background: 'var(--paper-2)' }}>
          <div className="shell">
            <span className="eyebrow">About</span>
            <h2 style={{ marginTop: 12, maxWidth: '16ch' }}>
              A summit run <em className="italic-hero" style={{ color: 'var(--royal)' }}>by builders</em>, for the people they're building for.
            </h2>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)', maxWidth: '56ch', marginTop: 20 }}>
              Imagine IF is produced under the Bitcoin Park ecosystem. It's a sibling to AI Freedom Lab — same family, distinct identity. Every dollar that comes through this site funds the work both organizations do the rest of the year.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="ab-grid">
              <div className="ab-org">
                <div className="ab-org__art" style={{ background: 'linear-gradient(135deg, #FF9974, #d6724a)' }}>
                  <span style={{ fontFamily: 'var(--f-head)', fontWeight: 800, fontSize: 28, color: '#fff', letterSpacing: '-0.01em' }}>Bitcoin Park</span>
                </div>
                <span className="eyebrow">Sibling org · since 2022</span>
                <h3 style={{ marginTop: 8 }}>Bitcoin Park</h3>
                <p className="muted">A members-only campus in Nashville for Bitcoiners and freedom-tech builders. Co-working, education, events, and the gathering point for the broader community across the South.</p>
                <a href="https://bitcoinpark.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sunrise)', fontWeight: 600 }}>Visit bitcoinpark.com →</a>
              </div>
              <div className="ab-org">
                <div className="ab-org__art" style={{ background: 'linear-gradient(135deg, #b683ed, #7958ed)' }}>
                  <span style={{ fontFamily: 'var(--f-head)', fontWeight: 800, fontSize: 28, color: '#fff', letterSpacing: '-0.01em' }}>AI Freedom Lab</span>
                </div>
                <span className="eyebrow">Sibling org · launched 2025</span>
                <h3 style={{ marginTop: 8 }}>AI Freedom Lab</h3>
                <p className="muted">An open-source lab building AI systems that don't require permission, censorship, or surveillance to work. Research, software, and a place for builders to actually ship.</p>
              </div>
              <div className="ab-org ab-org--us">
                <div className="ab-org__art" style={{ background: 'linear-gradient(135deg, var(--sunrise), var(--royal), var(--midnight))' }}>
                  <span className="italic-hero" style={{ color: 'var(--coral)', fontSize: 44 }}>Imagine if…</span>
                </div>
                <span className="eyebrow">This summit</span>
                <h3 style={{ marginTop: 8 }}>Imagine IF</h3>
                <p style={{ color: 'var(--paper)', opacity: 0.85 }}>The annual gathering of both communities — and the people they want in the room. Two days, two stages, three rails of freedom tech, one door opening.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--snug" style={{ background: 'var(--midnight)', color: 'var(--paper)' }}>
          <div className="shell" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--coral)' }}>Press & media</span>
              <h3 style={{ color: 'var(--paper)', marginTop: 8 }}>Reach the team.</h3>
              <p style={{ color: 'rgba(251,246,241,0.7)', marginTop: 8, maxWidth: '40ch' }}>For credentials, interviews, or anything else, email community@bitcoinpark.com.</p>
            </div>
            <a className="btn btn--ghost-light btn--lg" href="mailto:community@bitcoinpark.com">community@bitcoinpark.com <span className="arr"></span></a>
          </div>
        </section>
      </div>
    );
  }

  return { Page };
})();
