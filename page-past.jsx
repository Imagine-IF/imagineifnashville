// Past Ignite Talks archive
window.IFPast = (() => {
  function Page({ onNav }) {
    const talks = window.IF_DATA.pastTalks;
    const byYear = {};
    talks.forEach(t => { (byYear[t.year] = byYear[t.year] || []).push(t); });
    const years = Object.keys(byYear).sort().reverse();

    return (
      <div className="page">
        <section className="section section--tight" style={{ paddingTop: 180 }}>
          <div className="shell">
            <span className="eyebrow">Archive · Ignite Talks</span>
            <h1 style={{ marginTop: 16, maxWidth: '14ch' }}>
              Twelve minutes.<br/><em className="italic-hero" style={{ color: 'var(--sunrise)' }}>One idea each.</em>
            </h1>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)', maxWidth: '54ch', marginTop: 16 }}>
              Before there was an Imagine IF summit, there were Ignite Talks at Bitcoin Park: short, sharp, and built on the same prompt. The full archive lives here. The format inspired the summit.
            </p>
          </div>
        </section>

        {years.map(yr => (
          <section key={yr} className="pa-year">
            <div className="shell">
              <div className="pa-year__head">
                <h2 className="pa-year__num">{yr}</h2>
                <span className="muted">{byYear[yr].length} talks</span>
              </div>
              <div className="pa-list">
                {byYear[yr].map((t, i) => (
                  <article key={i} className="pa-row">
                    <div className="pa-row__left">
                      <span className="pa-row__num">0{i + 1}</span>
                      <div>
                        <h4>{t.title.replace(/^Ignite Talk: /, '')}</h4>
                        <span className="muted" style={{ fontSize: 14 }}>{t.speaker}</span>
                      </div>
                    </div>
                    <div className="pa-row__right">
                      <span className="muted tnum" style={{ fontSize: 14, fontFamily: 'var(--f-head)' }}>{t.length}</span>
                      <span className="pa-row__play">▶</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="section" style={{ background: 'var(--midnight)', color: 'var(--paper)' }}>
          <div className="shell" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--coral)' }}>Newsletter</span>
              <h3 style={{ color: 'var(--paper)', marginTop: 8 }}>One short essay, one talk, every other Friday.</h3>
            </div>
            <button className="btn btn--primary">Subscribe <span className="arr"></span></button>
          </div>
        </section>
      </div>
    );
  }
  return { Page };
})();
