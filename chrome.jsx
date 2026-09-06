// Chrome: topbar, off-canvas drawer, footer

window.IFChrome = (() => {
  const { useEffect, useState, useRef } = React;

  const NAV = [
  { id: 'idea', label: 'The Idea', num: '01' },
  { id: 'speakers', label: 'Speakers', num: '02' },
  { id: 'agenda', label: 'Agenda', num: '03' },
  { id: 'tickets', label: 'Tickets', num: '04' },
  { id: 'past', label: 'History', num: '05' }];

  // Smooth-scroll to the sponsor strip (which is rendered globally on every page).
  function scrollToSponsors(e) {
    e.preventDefault();
    document.getElementById('sponsors-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  function Wordmark({ as = 'a', href = '#home', onClick, dark = false }) {
    const Tag = as;
    return (
      <Tag href={href} onClick={onClick} className={'wordmark wordmark--logo' + (dark ? ' wordmark--dark' : '')} aria-label="Imagine IF">
        <img src="logo-white.png" alt="Imagine IF" />
      </Tag>);

  }

  function TopBar({ page, onNav, onMenu, dark = false }) {
    const ev = window.IF_DATA && window.IF_DATA.event;
    return (
      <div className={'topbar' + (dark ? ' is-dark' : '')}>
        <div className="topbar__brand">
          <Wordmark onClick={(e) => {e.preventDefault();onNav('home');}} dark={dark} />
          {ev && (
            <span className="topbar__when">{ev.datesShort} · {ev.venueCity}</span>
          )}
        </div>
        <div className="topbar__right">
          <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
            <span className="lines"><i></i><i></i></span>
            Menu
          </button>
        </div>
      </div>);

  }

  function Drawer({ open, page, onNav, onClose }) {
    // ESC to close
    useEffect(() => {
      if (!open) return;
      const onKey = (e) => {if (e.key === 'Escape') onClose();};
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }, [open, onClose]);

    return (
      <>
        <div className={'drawer-scrim' + (open ? ' is-open' : '')} onClick={onClose} />
        <aside className={'drawer' + (open ? ' is-open' : '')} aria-hidden={!open}>
          <div className="drawer__head">
            <Wordmark onClick={(e) => {e.preventDefault();onNav('home');}} dark={true} />
            <button className="drawer__close" onClick={onClose} aria-label="Close menu">
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
          <nav className="drawer__nav" aria-label="Primary">
            {NAV.map((n) =>
            <a key={n.id} href={'#' + n.id}
            onClick={(e) => {e.preventDefault();onNav(n.id);}}
            className={page === n.id ? 'is-current' : ''}>
                <span>{n.label}</span>
                <span className="num">{n.num}</span>
              </a>
            )}
          </nav>
          <div className="drawer__foot">
            <div className="row">
              <div>
                <strong>Imagine IF 2026</strong><br />
                Oct 5–6 · Fisher Center · Nashville
              </div>
              <span className="meta">two days</span>
            </div>
            <div className="row" style={{ justifyContent: 'flex-start', gap: 12, marginTop: 8 }}>
              <a href="https://luma.com/uanee3xb?tk=yqFBKj" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--sunrise)', fontWeight: 600, fontSize: 14 }}>
                Request an Invitation
                <span style={{ display: 'inline-block', width: 14, height: 14 }}>
                  <svg viewBox="0 0 14 14" width="14" height="14"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </div>
          </div>
        </aside>
      </>);

  }

  function SponsorStrip() {
    const sp = window.IF_DATA.sponsors;
    const all = [...sp.presenting, ...sp.founding, ...sp.pillar, ...sp.supporting];
    return (
      <section id="sponsors-section" className="section section--snug">
        <div className="shell">
          <div className="sp-strip-head">
            <span className="eyebrow">Supported by</span>
          </div>
          <div className="sp-static-grid">
            {all.map((s, i) => (
              <a key={i}
                 className="sp-static-cell"
                 href={s.url || '#'}
                 target="_blank"
                 rel="noopener noreferrer">
                {s.short || s.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Newsletter() {
    return (
      <section className="newsletter">
        <div className="shell newsletter__inner">
          <div className="newsletter__copy">
            <span className="eyebrow" style={{ color: 'var(--coral)' }}>Tangents Daily (formerly OP_Daily)</span>
            <p className="newsletter__h" style={{ margin: '10px 0 0' }}>
              <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>Six bytes a day across AI, energy, and bitcoin.</em>
            </p>
            <h3 className="newsletter__h" style={{ fontSize: 'clamp(18px, 1.4vw, 22px)', lineHeight: 1.4, marginTop: 14 }}>
              Imagine IF is two days a year.<br />
              Tangents runs all 365.<br />
              The weekly show premieres this August.
            </h3>
          </div>
          <a className="btn btn--primary newsletter__btn" href="https://tangentsdaily.substack.com" target="_blank" rel="noopener noreferrer">
            Subscribe <span className="arr"></span>
          </a>
        </div>
      </section>
    );
  }

  function Footer({ onNav, page }) {
    const goToAccommodations = (e) => {
      e.preventDefault();
      if (page === 'venue') {
        document.getElementById('accommodations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.hash = '#venue';
        setTimeout(() => {
          document.getElementById('accommodations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    };
    return (
      <footer className="foot">
        <div className="shell">
          <div className="foot__top">
            <div>
              <div className="foot__big">
                Imagine <em>IF</em><br />
                we built it.
              </div>
              <div style={{ marginTop: 28, color: 'rgba(251,246,241,0.7)', fontSize: 14, maxWidth: '32ch' }}>
                AI, energy, and bitcoin in one room. Where frontier systems touch, new trajectories begin.
              </div>
              <div style={{ marginTop: 28 }}>
                <a className="btn btn--primary" href="https://luma.com/uanee3xb?tk=yqFBKj" target="_blank" rel="noopener noreferrer">
                  Request an Invitation <span className="arr"></span>
                </a>
              </div>
            </div>
            <div>
              <h5>Experience</h5>
              <ul>
                <li><a href="#idea" onClick={(e) => {e.preventDefault();onNav('idea');}}>The Idea</a></li>
                <li><a href="#speakers" onClick={(e) => {e.preventDefault();onNav('speakers');}}>Speakers</a></li>
                <li><a href="#agenda" onClick={(e) => {e.preventDefault();onNav('agenda');}}>Agenda</a></li>
                <li><a href="#sponsors-section" onClick={scrollToSponsors}>Sponsors</a></li>
              </ul>
            </div>
            <div>
              <h5>Practical</h5>
              <ul>
                <li><a href="#tickets" onClick={(e) => {e.preventDefault();onNav('tickets');}}>Tickets</a></li>
                <li><a href="#venue" onClick={(e) => {e.preventDefault();onNav('venue');}}>Venue</a></li>
                <li><a href="#accommodations" onClick={goToAccommodations}>Accommodations</a></li>
                <li><a href="#past" onClick={(e) => {e.preventDefault();onNav('past');}}>History — Imagine IF 2025</a></li>
              </ul>
            </div>
            <div>
              <h5>Family</h5>
              <ul>
                <li><a href="https://bitcoinpark.com" target="_blank" rel="noopener noreferrer">Bitcoin Park ↗</a></li>
                <li><a href="https://aifreedomlab.org" target="_blank" rel="noopener noreferrer">AI Freedom Lab ↗</a></li>
                <li><a href="https://tangentsdaily.substack.com" target="_blank" rel="noopener noreferrer">Tangents ↗</a></li>
                <li><a href="mailto:rod@bitcoinpark.com?subject=Press%20Inquiry%20-%20Imagine%20IF">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="foot__bottom">
            <div>© Imagine IF 2026</div>
          </div>
        </div>
      </footer>);

  }

  return { TopBar, Drawer, Footer, Newsletter, SponsorStrip, NAV, Wordmark };
})();