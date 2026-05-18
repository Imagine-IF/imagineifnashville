// Chrome: topbar, off-canvas drawer, footer

window.IFChrome = (() => {
  const { useEffect, useState, useRef } = React;

  const NAV = [
  { id: 'home', label: 'Home', num: '01' },
  { id: 'idea', label: 'The Imagine IF Idea', num: '02' },
  { id: 'speakers', label: 'Speakers', num: '03' },
  { id: 'agenda', label: 'Agenda', num: '04' },
  { id: 'sponsors', label: 'Sponsors', num: '05' },
  { id: 'tickets', label: 'Tickets', num: '06' },
  { id: 'venue', label: 'Venue & Nashville', num: '07' },
  { id: 'past', label: 'Past Ignite Talks', num: '08' }];


  function Wordmark({ as = 'a', href = '#home', onClick, dark = false }) {
    const Tag = as;
    return (
      <Tag href={href} onClick={onClick} className={'wordmark wordmark--logo' + (dark ? ' wordmark--dark' : '')} aria-label="Imagine IF">
        <img src="logo-white.png" alt="Imagine IF" />
      </Tag>);

  }

  function TopBar({ page, onNav, onMenu, dark = false }) {
    return (
      <div className={'topbar' + (dark ? ' is-dark' : '')}>
        <div className="topbar__brand">
          <Wordmark onClick={(e) => {e.preventDefault();onNav('home');}} dark={dark} />
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
                Attend Imagine IF
                <span style={{ display: 'inline-block', width: 14, height: 14 }}>
                  <svg viewBox="0 0 14 14" width="14" height="14"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </div>
          </div>
        </aside>
      </>);

  }

  function Footer({ onNav }) {
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
                Three rails of freedom tech — AI, energy, and bitcoin — converging in one room.
              </div>
              <div style={{ marginTop: 28 }}>
                <a className="btn btn--primary" href="https://luma.com/uanee3xb?tk=yqFBKj" target="_blank" rel="noopener noreferrer">
                  Attend Imagine IF <span className="arr"></span>
                </a>
              </div>
            </div>
            <div>
              <h5>Experience</h5>
              <ul>
                <li><a href="#idea" onClick={(e) => {e.preventDefault();onNav('idea');}}>The idea</a></li>
                <li><a href="#speakers" onClick={(e) => {e.preventDefault();onNav('speakers');}}>Speakers</a></li>
                <li><a href="#agenda" onClick={(e) => {e.preventDefault();onNav('agenda');}}>Agenda</a></li>
                <li><a href="#sponsors" onClick={(e) => {e.preventDefault();onNav('sponsors');}}>Sponsors</a></li>
              </ul>
            </div>
            <div>
              <h5>Practical</h5>
              <ul>
                <li><a href="#tickets" onClick={(e) => {e.preventDefault();onNav('tickets');}}>Tickets</a></li>
                <li><a href="#venue" onClick={(e) => {e.preventDefault();onNav('venue');}}>Venue</a></li>
                <li><a href="#past" onClick={(e) => {e.preventDefault();onNav('past');}}>Past Imagine IF Talks</a></li>
              </ul>
            </div>
            <div>
              <h5>Family</h5>
              <ul>
                <li><a href="https://bitcoinpark.com" target="_blank" rel="noopener noreferrer">Bitcoin Park ↗</a></li>
                <li><a href="https://aifreedomlab.org" target="_blank" rel="noopener noreferrer">AI Freedom Lab ↗</a></li>
                <li><a href="mailto:community@bitcoinpark.com">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="foot__bottom">
            <div>© Imagine IF 2026</div>
          </div>
        </div>
      </footer>);

  }

  return { TopBar, Drawer, Footer, NAV, Wordmark };
})();