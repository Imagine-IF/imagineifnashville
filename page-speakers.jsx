// Speakers page — asymmetric mosaic + filterable + detail modal

window.IFSpeakers = (() => {
  const { useState } = React;
  const { SpeakerArt } = window.IFArt;

  // Mosaic size pattern — repeats. Variety in cells creates the editorial feel.
  // Headshot-friendly: only uses 'lg' (4×4), 'md' (3×3), and 'tall' (3×4).
  // 'wide' (6×3) and 'sm' (3×2) are landscape ratios that crop portraits awkwardly.
  const SIZE_PATTERN = ['lg', 'md', 'md', 'tall', 'tall', 'md', 'tall', 'md', 'md', 'tall', 'md', 'tall'];

  function SpeakerCard({ s, idx, onOpen }) {
    const size = SIZE_PATTERN[idx % SIZE_PATTERN.length];
    const [photoOk, setPhotoOk] = useState(true);
    return (
      <article className={'sp-card sp-card--' + size} onClick={() => onOpen(s)}>
        <div className="sp-card__art">
          <SpeakerArt seed={idx} className="sp-card__svg" />
          {s.photo && photoOk && (
            <img
              src={s.photo}
              alt=""
              style={s.photoPos ? { objectPosition: s.photoPos } : undefined}
              className="sp-card__photo"
              onError={() => setPhotoOk(false)}
            />
          )}
        </div>
        <div className="sp-card__meta">
          <h4>{s.name}</h4>
          <span className="sp-card__role">{s.role}{s.org ? ' · ' + s.org : ''}</span>
        </div>
      </article>
    );
  }

  function renderBioParagraph(para) {
    const parts = String(para).split(/(https?:\/\/[^\s]+|personaldatacenter\.xyz)/g);
    return parts.map((part, i) => {
      if (/^https?:\/\//.test(part) || part === 'personaldatacenter.xyz') {
        const href = /^https?:\/\//.test(part) ? part : 'http://' + part;
        return <a key={i} href={href} target="_blank" rel="noopener noreferrer">{part.replace(/^https?:\/\//, '')}</a>;
      }
      return part;
    });
  }

  function SpeakerModal({ speaker, onClose }) {
    if (!speaker) return null;
    return (
      <div className="sp-modal" onClick={onClose}>
        <div className="sp-modal__inner" onClick={(e) => e.stopPropagation()}>
          <button className="drawer__close" style={{ position: 'absolute', top: 24, right: 24 }} onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <div className="sp-modal__art">
            <SpeakerArt seed={(speaker.id.length * 7) % 5} className="sp-modal__svg" />
            {speaker.photo && (
              <img src={speaker.photo} alt="" style={speaker.photoPos ? { objectPosition: speaker.photoPos } : undefined} className="sp-modal__photo" />
            )}
          </div>
          <div className="sp-modal__body">
            <h2 style={{ marginTop: 0 }}>{speaker.name}</h2>
            <div className="muted" style={{ fontSize: 16, marginBottom: 24 }}>{speaker.role} · {speaker.org}</div>
            {String(speaker.bio || '').split(/\n\s*\n/).map((para, i) => (
              <p key={i} style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 'none' }}>{renderBioParagraph(para)}</p>
            ))}
            {(speaker.x || speaker.linkedin) && (
              <div className="sp-modal__social">
                {speaker.x && (
                  <a href={speaker.x} target="_blank" rel="noopener noreferrer" className="sp-social" aria-label={`${speaker.name} on X`}>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path fill="currentColor" d="M18.244 2H21.5l-7.5 8.572L23 22h-6.834l-5.348-6.99L4.7 22H1.44l8.02-9.166L1 2h6.99l4.84 6.404L18.244 2Zm-1.197 18h1.83L7.04 4H5.07L17.047 20Z"/>
                    </svg>
                    <span>X</span>
                  </a>
                )}
                {speaker.linkedin && (
                  <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="sp-social" aria-label={`${speaker.name} on LinkedIn`}>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V9.67H5.67v8.67h2.67Zm-1.34-9.84a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.34 9.84V13.6c0-2.5-1.34-3.66-3.12-3.66a2.7 2.7 0 0 0-2.45 1.34h-.04V9.67h-2.67c.04.76 0 8.67 0 8.67h2.67v-4.84c0-.24.02-.48.09-.65.19-.48.63-.97 1.36-.97.96 0 1.34.73 1.34 1.8v4.66h2.67Z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function Page({ onNav }) {
    const speakers = window.IF_DATA.speakers;
    const [open, setOpen] = useState(null);

    return (
      <div className="page">
        <section className="section section--tight" style={{ paddingTop: 180 }}>
          <div className="shell">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
              <div>
                <span className="eyebrow">Speakers · more announced soon</span>
                <h1 style={{ marginTop: 16, maxWidth: '14ch' }}>
                  The room you walk into is <em className="italic-hero" style={{ color: 'var(--royal)' }}>the point</em>.
                </h1>
              </div>
              <p style={{ maxWidth: '38ch', color: 'var(--ink-soft)', fontSize: 17 }}>
                Investors, engineers, policymakers, founders. We bring people who've already done the hard parts — and people about to.
              </p>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 'var(--s-10)' }}>
          <div className="shell">
            <div className="sp-mosaic">
              {speakers.map((s, i) => <SpeakerCard key={s.id} s={s} idx={i} onOpen={setOpen} />)}
              {/* TBA placeholder cards to show the system scales */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <article key={'tba-' + i} className={'sp-card sp-card--sm sp-card--tba sp-card--' + SIZE_PATTERN[(speakers.length + i) % SIZE_PATTERN.length]}>
                  <div className="sp-card__tba">
                    <span className="italic-hero">to be announced</span>
                    <span className="muted" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'var(--f-head)' }}>more soon</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SpeakerModal speaker={open} onClose={() => setOpen(null)} />
      </div>
    );
  }

  return { Page };
})();
