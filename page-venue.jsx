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
                  Belmont's Fisher Center for the Performing Arts is the kind of room a real conversation deserves. 1,700 in the Main Theatre, a flexible hall for the Second Stage, and the kind of acoustics that makes a fireside actually feel like one.
                </p>
                <div className="vn-meta">
                  <div><span className="field-label">Address</span><strong>2002 Belmont Blvd</strong><br/>Nashville, TN 37212</div>
                  <div><span className="field-label">Capacity</span><strong>1,700 seats</strong><br/>Main Theatre</div>
                  <div><span className="field-label">Second Stage</span><strong>~400</strong><br/>Flexible hall</div>
                </div>
              </div>
              <div className="vn-map">
                <image-slot id="venue-map" src="uploads/fisher-center.jpg" placeholder="Venue exterior or map graphic" shape="rounded" radius="20"></image-slot>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--paper-2)' }}>
          <div className="shell">
            <span className="eyebrow">Nashville · the rest of the trip</span>
            <h2 style={{ maxWidth: '14ch', marginTop: 12 }}>It's not just the room. <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>It's the city.</em></h2>
            <p className="muted" style={{ maxWidth: '54ch', fontSize: 17, marginTop: 16 }}>
              Bitcoin Park is a 10-minute drive. So is Music Row. Bring the family — there's a reason we picked October.
            </p>

            <div className="vn-cards">
              {[
                { tag: 'Stay', title: 'The Moxy, The Kimpton, One Hotel', body: 'Three different price points within a 5-minute Lyft of the venue.' },
                { tag: 'Eat', title: 'Folk, Henrietta Red, Bastion', body: 'The team\u2019s short list. Reservations open 60 days out — book the second your ticket clears.' },
                { tag: 'Drop in', title: 'Bitcoin Park · 1910 21st Ave S', body: 'Coffee, co-working, and most evenings a meetup. Open to attendees the whole week.' },
                { tag: 'Day off', title: 'Centennial Park · Cheekwood · Radnor Lake', body: 'October in Nashville is the right answer. Take half a day.' },
              ].map(c => (
                <div key={c.title} className="vn-card">
                  <span className="pill pill--orange">{c.tag}</span>
                  <h4 style={{ marginTop: 12 }}>{c.title}</h4>
                  <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>{c.body}</p>
                </div>
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
            <button className="btn btn--ghost-light">Travel & lodging guide <span className="arr"></span></button>
          </div>
        </section>
      </div>
    );
  }
  return { Page };
})();
