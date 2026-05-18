// Past Imagine IF Talks archive — grid of YouTube thumbnails that swap to
// in-page iframe embeds on click (no leaving the site).
window.IFPast = (() => {
  const { useState } = React;
  const PLAYLIST = 'PL2L0KLglmktkV95Iv6SAis4DsqoIROzJz';

  function VideoCard({ t }) {
    const [playing, setPlaying] = useState(false);
    const thumbUrl = `https://img.youtube.com/vi/${t.videoId}/hqdefault.jpg`;
    // youtube-nocookie + autoplay so click → instant playback. Playlist param keeps
    // the playlist context so "next video" works inside the embed.
    const embedUrl = `https://www.youtube-nocookie.com/embed/${t.videoId}?autoplay=1&rel=0&modestbranding=1&list=${PLAYLIST}`;

    return (
      <article className="pa-card">
        <div className="pa-card__thumb">
          {playing ? (
            <iframe
              src={embedUrl}
              title={t.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="pa-card__iframe"
            />
          ) : (
            <button type="button" className="pa-card__playbtn" onClick={() => setPlaying(true)} aria-label={`Play: ${t.title}`}>
              <img src={thumbUrl} alt="" loading="lazy" />
              <span className="pa-card__play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <polygon points="8,5 20,12 8,19" fill="currentColor" />
                </svg>
              </span>
            </button>
          )}
        </div>
        <div className="pa-card__meta">
          <h4>{t.title}</h4>
          {t.speakers && <span className="pa-card__speakers">{t.speakers}</span>}
        </div>
      </article>
    );
  }

  function Page({ onNav }) {
    const talks = window.IF_DATA.pastTalks;
    const byYear = {};
    talks.forEach(t => { (byYear[t.year] = byYear[t.year] || []).push(t); });
    const years = Object.keys(byYear).sort().reverse();

    return (
      <div className="page">
        <section className="section section--tight" style={{ paddingTop: 180 }}>
          <div className="shell">
            <span className="eyebrow">Archive · Imagine IF Talks</span>
            <h1 style={{ marginTop: 16, maxWidth: '14ch' }}>
              Ten minutes.<br/><em className="italic-hero" style={{ color: 'var(--sunrise)' }}>One idea each.</em>
            </h1>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)', maxWidth: '58ch', marginTop: 16 }}>
              The full Imagine IF 2025 archive — {talks.length} talks at Bitcoin Park, each one a ten-minute prompt on bitcoin, AI, energy, and freedom tech. The format that grew into the summit.
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
              <div className="pa-grid">
                {byYear[yr].map((t) => <VideoCard key={t.videoId} t={t} />)}
              </div>
            </div>
          </section>
        ))}
      </div>
    );
  }
  return { Page };
})();
