// Tickets — mirrors imagineifnashville.com/tickets.html
// 3 tiers, shared bullets, single Luma funnel + DM Rod exception.

window.IFTickets = (() => {

  const LUMA = 'https://luma.com/uanee3xb?tk=yqFBKj';

  const SHARED_INCLUDES = [
    'All-Access to Two Day Summit',
    'Main Theatre Stage Presentations & Panels',
    'Second Stage Presentations & Panels',
    'Connect: Natural Collisions With Investors, Engineers, Policymakers, and Entrepreneurs',
    'Full Hospitality: Breakfast, Lunch, Coffee & Drinks While Onsite',
  ];

  const TIERS = [
    {
      id: 'member',
      name: 'I am a Bitcoin Park Member',
      tag: 'Members only',
      price: 'Free',
      priceNote: 'Complimentary for Park members.',
      ctaLabel: 'DM Rod',
      ctaHref: null, // styled button, no destination
      color: 'var(--royal)',
    },
    {
      id: 'student',
      name: 'Student Pass',
      tag: 'Students',
      price: 'Discounted',
      priceNote: 'Discounted pass for students.',
      ctaLabel: 'Join Waitlist',
      ctaHref: LUMA,
      color: 'var(--coral)',
    },
    {
      id: 'summit',
      name: 'Summit Pass',
      tag: 'Full access',
      price: '$5,000',
      priceNote: 'Full access ticket to the summit.',
      ctaLabel: 'Join Waitlist',
      ctaHref: LUMA,
      color: 'var(--sunrise)',
    },
  ];

  function Page({ onNav }) {
    return (
      <div className="page tk-page">
        {/* HERO */}
        <section className="tk-hero">
          <div className="shell">
            <div className="tk-hero__inner">
              <span className="eyebrow" style={{ color: 'var(--coral)' }}>Tickets · {window.IF_DATA.event.dates}</span>
              <h1 style={{ color: 'var(--paper)', maxWidth: '14ch', marginTop: 16 }}>
                Pick a seat. <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>Be in the room.</em>
              </h1>
              <p style={{ color: 'rgba(251,246,241,0.85)', fontSize: 18, maxWidth: '52ch', marginTop: 16 }}>
                Three rails of freedom tech — AI, energy, and bitcoin — converging in one room at the Fisher Center for two days.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <button className="btn btn--primary btn--lg" onClick={() => document.getElementById('tk-tiers').scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  See the tiers <span className="arr"></span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section className="section" id="tk-tiers" style={{ background: 'var(--paper)' }}>
          <div className="shell">
            <div className="section-head">
              <div>
                <span className="eyebrow">Tiers</span>
                <h2>Three ways in.</h2>
              </div>
            </div>
            <div className="tk-tiers">
              {TIERS.map(t => (
                <div key={t.id} className="tk-tier" style={{ '--tier-color': t.color }}>
                  <div className="tk-tier__head">
                    <span className="eyebrow" style={{ color: t.color }}>{t.tag}</span>
                    <h3 style={{ marginTop: 8 }}>{t.name}</h3>
                  </div>
                  <div className="tk-tier__price">
                    <span className="tk-tier__amt">{t.price}</span>
                    <span className="muted" style={{ fontSize: 13, marginTop: 6 }}>{t.priceNote}</span>
                  </div>
                  <ul className="tk-tier__list">
                    {SHARED_INCLUDES.map(line => (
                      <li key={line}>
                        <span className="tk-tier__check" style={{ color: t.color }}>✦</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  {t.ctaHref ? (
                    <a className="btn btn--ghost"
                       href={t.ctaHref} target="_blank" rel="noopener noreferrer">
                      {t.ctaLabel} <span className="arr"></span>
                    </a>
                  ) : (
                    <button className="btn btn--ghost" type="button" aria-label="DM Rod" style={{ cursor: 'default' }}>
                      {t.ctaLabel}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return { Page };
})();
