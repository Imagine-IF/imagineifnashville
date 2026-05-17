// Sponsors — tier system with visual hierarchy that doesn't become a logo wall

window.IFSponsors = (() => {
  const data = () => window.IF_DATA;

  const TIERS = [
    { key: 'presenting', label: 'Presenting partner', cap: 1, role: 'One. Top of every page, named in every keynote intro, named on the stage.' },
    { key: 'founding', label: 'Founding sponsors', cap: 4, role: 'Four. Built the room with us. Custom moments across both days.' },
    { key: 'pillar', label: 'Pillar sponsors', cap: 12, role: 'Twelve. Each anchored to a track — Bitcoin, AI, Energy, or Freedom Tech.' },
    { key: 'supporting', label: 'Supporting sponsors', cap: 23, role: 'Twenty-three. The community that makes the rest possible.' },
  ];

  function Page({ onNav }) {
    const sp = data().sponsors;
    const total = TIERS.reduce((acc, t) => acc + (sp[t.key]?.length || 0), 0);

    return (
      <div className="page">
        <section className="section section--tight" style={{ paddingTop: 180 }}>
          <div className="shell">
            <span className="eyebrow">Sponsors · {total} confirmed · 40 by October</span>
            <h1 style={{ marginTop: 16, maxWidth: '14ch' }}>
              The room <em className="italic-hero" style={{ color: 'var(--royal)' }}>belongs</em> to the sponsors.
            </h1>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)', maxWidth: '54ch', marginTop: 16 }}>
              Not on stage — in the hallways, on the doors, in the after-hours dinners. We design partnerships around real moments, not logo placements. Below is what we've committed to honor.
            </p>
          </div>
        </section>

        {TIERS.map((tier, ti) => {
          const list = sp[tier.key] || [];
          return (
            <section key={tier.key} className={'sp-tier sp-tier--' + tier.key} style={ti === 0 ? { paddingTop: 0 } : {}}>
              <div className="shell">
                <div className="sp-tier__head">
                  <div>
                    <span className="eyebrow" style={{ color: ti === 0 ? 'var(--sunrise)' : ti === 1 ? 'var(--royal)' : 'var(--ink-soft)' }}>
                      {String(ti + 1).padStart(2, '0')} · {tier.label}
                    </span>
                    <h2 style={{ marginTop: 8, fontSize: ti === 0 ? 'clamp(40px, 5vw, 64px)' : 'clamp(28px, 3vw, 44px)' }}>
                      {list.length} of {tier.cap}
                    </h2>
                  </div>
                  <p className="muted" style={{ maxWidth: '38ch', fontSize: ti === 0 ? 18 : 15 }}>{tier.role}</p>
                </div>

                <div className={'sp-grid sp-grid--' + tier.key}>
                  {list.map(s => (
                    <div key={s.name} className="sp-cell">
                      <div className="sp-cell__logo">
                        <span style={{ fontFamily: 'var(--f-head)', fontWeight: 700, fontSize: ti === 0 ? 36 : ti === 1 ? 26 : ti === 2 ? 20 : 16, letterSpacing: '-0.01em', color: 'var(--midnight)', textAlign: 'center' }}>
                          {s.short || s.name}
                        </span>
                      </div>
                    </div>
                  ))}
                  {Array.from({ length: tier.cap - list.length }).map((_, i) => (
                    <div key={'open-' + i} className="sp-cell sp-cell--open">
                      <span className="italic-hero" style={{ color: 'var(--royal)', fontSize: ti === 0 ? 28 : 20 }}>your name here</span>
                      <span className="muted" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--f-head)', marginTop: 4 }}>open slot</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="section" style={{ background: 'var(--midnight)', color: 'var(--paper)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--s-7)' }} className="sp-cta">
              <div>
                <span className="eyebrow" style={{ color: 'var(--coral)' }}>Become a sponsor</span>
                <h2 style={{ color: 'var(--paper)', marginTop: 12, maxWidth: '14ch' }}>
                  We're holding <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>real seats</em> at the table.
                </h2>
                <p style={{ color: 'rgba(251,246,241,0.75)', maxWidth: '46ch', marginTop: 16 }}>
                  We don't have a "tier menu" you check off. Tell us what you're building, who you want to meet, and what would make this trip the best one you took this year. We'll build the partnership around that.
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                  <a className="btn btn--primary btn--lg" href="mailto:sponsors@imagineifnashville.com">Email the team <span className="arr"></span></a>
                  <button className="btn btn--ghost-light btn--lg">Download the kit</button>
                </div>
              </div>
              <div className="sp-cta__art">
                <window.IFArt.HeroOrb className="sp-cta__orb" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return { Page };
})();
