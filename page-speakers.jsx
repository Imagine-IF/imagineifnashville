// Speakers page — asymmetric mosaic + filterable + detail modal

window.IFSpeakers = (() => {
  const { useState, useMemo } = React;
  const { SpeakerArt } = window.IFArt;

  // Mosaic size pattern — repeats. Variety in cells creates the editorial feel.
  const SIZE_PATTERN = ['lg', 'md', 'md', 'sm', 'tall', 'md', 'wide', 'sm', 'md', 'sm', 'md', 'tall'];

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
              className="sp-card__photo"
              onError={() => setPhotoOk(false)}
            />
          )}
          <div className="sp-card__overlay">
            <div className="sp-card__tags">
              {s.tags && s.tags.slice(0, 2).map(t => <span key={t} className="pill pill--solid-ink">{t}</span>)}
            </div>
          </div>
        </div>
        <div className="sp-card__meta">
          <h4>{s.name}</h4>
          <span className="sp-card__role">{s.role}{s.org ? ' · ' + s.org : ''}</span>
          {s.talk && size !== 'sm' && (
            <p className="sp-card__talk italic-hero">{s.talk}</p>
          )}
        </div>
      </article>
    );
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
              <img src={speaker.photo} alt="" className="sp-modal__photo" />
            )}
          </div>
          <div className="sp-modal__body">
            <div className="row">
              {speaker.tags && speaker.tags.map(t => <span key={t} className="pill pill--purple">{t}</span>)}
            </div>
            <h2 style={{ marginTop: 16 }}>{speaker.name}</h2>
            <div className="muted" style={{ fontSize: 16, marginBottom: 24 }}>{speaker.role} · {speaker.org}</div>
            <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 'none' }}>{speaker.bio}</p>
            {speaker.talk && (
              <div className="sp-modal__talk">
                <span className="eyebrow">Their prompt</span>
                <div className="italic-hero" style={{ fontSize: 36, color: 'var(--royal)', lineHeight: 1.15, marginTop: 8 }}>
                  {speaker.talk}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function Page({ onNav }) {
    const speakers = window.IF_DATA.speakers;
    const allTags = useMemo(() => {
      const set = new Set();
      speakers.forEach(s => (s.tags || []).forEach(t => set.add(t)));
      return ['All', ...Array.from(set)];
    }, [speakers]);
    const [filter, setFilter] = useState('All');
    const [open, setOpen] = useState(null);

    const filtered = filter === 'All' ? speakers : speakers.filter(s => (s.tags || []).includes(filter));

    return (
      <div className="page">
        <section className="section section--tight" style={{ paddingTop: 180 }}>
          <div className="shell">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
              <div>
                <span className="eyebrow">Speakers · {speakers.length} confirmed · more announced weekly</span>
                <h1 style={{ marginTop: 16, maxWidth: '14ch' }}>
                  The room you walk into is <em className="italic-hero" style={{ color: 'var(--royal)' }}>the point</em>.
                </h1>
              </div>
              <p style={{ maxWidth: '38ch', color: 'var(--ink-soft)', fontSize: 17 }}>
                Investors, engineers, policymakers, founders. We bring people who've already done the hard parts — and people about to. Lineup updates weekly.
              </p>
            </div>

            <div className="sp-filters">
              {allTags.map(t => (
                <button key={t}
                  className={'sp-filter' + (filter === t ? ' is-on' : '')}
                  onClick={() => setFilter(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 'var(--s-10)' }}>
          <div className="shell">
            <div className="sp-mosaic">
              {filtered.map((s, i) => <SpeakerCard key={s.id} s={s} idx={i} onOpen={setOpen} />)}
              {/* TBA placeholder cards to show the system scales */}
              {filter === 'All' && [0, 1, 2, 3, 4, 5].map((i) => (
                <article key={'tba-' + i} className={'sp-card sp-card--sm sp-card--tba sp-card--' + SIZE_PATTERN[(filtered.length + i) % SIZE_PATTERN.length]}>
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
