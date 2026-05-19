// Venue & Nashville
window.IFVenue = (() => {
  function Page({ onNav }) {
    return (
      <div className="page">
        <section className="section section--tight" style={{ paddingTop: 180 }}>
          <div className="shell">
            <div className="vn-grid">
              <div>
                <span className="eyebrow">The venue</span>
                <h1 style={{ marginTop: 16 }}>
                  Fisher Center.<br/><em className="italic-hero" style={{ color: 'var(--royal)' }}>Two stages.</em>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--ink-soft)', marginTop: 16 }}>
                  Belmont's Fisher Center for the Performing Arts is the kind of room a real conversation deserves. Expected attendance is ~1,000 across both stages — the Main Theatre and a flexible Second Stage — with the kind of acoustics that makes a fireside actually feel like one.
                </p>
                <div className="vn-meta">
                  <div><span className="field-label">Address</span><strong>2002 Belmont Blvd</strong><br/>Nashville, TN 37212</div>
                  <div><span className="field-label">Expected Attendance</span><strong>~1,000</strong><br/>Across both stages</div>
                  <div><span className="field-label">Second Stage</span><strong>Flexible hall</strong><br/>Off the Main Theatre</div>
                </div>
              </div>
              <div className="vn-map">
                <image-slot id="venue-map" src="uploads/fisher-center.jpg?v=2" placeholder="Venue exterior or map graphic" shape="rounded" radius="20"></image-slot>
              </div>
            </div>
          </div>
        </section>

        <section id="accommodations" className="section" style={{ background: 'var(--paper-2)' }}>
          <div className="shell">
            <span className="eyebrow">Accommodations</span>
            <h2 style={{ maxWidth: '14ch', marginTop: 12 }}>Where to stay. <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>Close to the room.</em></h2>
            <p className="muted" style={{ maxWidth: '54ch', fontSize: 17, marginTop: 16 }}>
              Four hotels within easy reach of the Fisher Center.
            </p>

            <div className="vn-cards">
              {[
                { tag: 'Vanderbilt', title: 'The Moxy', url: 'https://www.marriott.com/en-us/hotels/bnaov-moxy-nashville-vanderbilt-area/overview/', body: 'Design-forward and walkable to the venue.' },
                { tag: 'Midtown', title: 'The Kimpton Aertson', url: 'https://www.aertsonhotel.com/', body: 'Upscale modern, a short Lyft from Belmont.' },
                { tag: 'Downtown', title: '1 Hotel Nashville', url: 'https://www.1hotels.com/nashville', body: 'Sustainability-led luxury downtown.' },
                { tag: 'Hillsboro', title: 'The Chloe', url: 'https://www.chloenashville.com/', body: 'New boutique landmark in Hillsboro Village.' },
              ].map(c => (
                <a key={c.title} href={c.url} target="_blank" rel="noopener noreferrer" className="vn-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <span className="pill pill--orange">{c.tag}</span>
                  <h4 style={{ marginTop: 12 }}>{c.title}</h4>
                  <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>{c.body}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--snug" style={{ background: 'var(--midnight)', color: 'var(--paper)' }}>
          <div className="shell" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--coral)' }}>Travel</span>
              <h3 style={{ color: 'var(--paper)', marginTop: 8 }}>BNA → venue, 15 minutes.</h3>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return { Page };
})();
