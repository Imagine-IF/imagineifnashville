// Home page with 3 hero variants

window.IFHome = (() => {
  const { useState, useEffect, useRef, useMemo } = React;
  const { HeroOrb, GradientField, Convergence, Spark } = window.IFArt;

  // ---------------- HERO VARIANTS ----------------

  // Variant A — Cycling prompts (typewriter feel)
  // Three rails of freedom tech: intelligence (AI), humanity (energy), money (bitcoin)
  function HeroCycling({ onNav }) {
    const prompts = [
    'intelligence, power, and money belonged to anyone.',
    'intelligence became electricity — and you owned the meter.',
    'the cheapest energy in history rewrote the dollar.',
    'bitcoin worked for the next eight billion.',
    'technology outlived the quantum decade.',
    'we built the life we have imagined.',
    'AI worked for you, not on you.',
    'energy stopped being the binding constraint.',
    'atoms came back to the grid edge.',
    'privacy was the floor, not the fight.'];

    const [idx, setIdx] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setIdx((i) => (i + 1) % prompts.length), 3600);
      return () => clearInterval(t);
    }, []);
    return (
      <section className="hero hero--cycling">
        <GradientField className="hero__bg" intensity={1} />
        <div className="hero__veil" />
        <div className="shell hero__inner hero__inner--cycling">
          <div className="hero__col-text">
            <h1 className="hero__title">
              <span className="italic-hero" style={{ color: 'var(--coral)' }}>Imagine IF</span>…<br />
              <span className="hero__cycle">
                {prompts.map((p, i) =>
                <span key={i} className={'hero__cycle-line' + (i === idx ? ' is-active' : '')}>{p}</span>
                )}
              </span>
            </h1>
            <div className="hero__sub">
              <p><strong>AI, energy, and bitcoin</strong> in one room. Where frontier systems touch, new trajectories begin.</p>
              <p>Keynotes, firesides, and real conversations with the people building at the frontier.</p>
            </div>
            <div className="hero__cta">
              <button className="btn btn--ghost-light btn--lg" onClick={() => onNav('idea')}>What is Imagine IF?</button>
              <a className="btn btn--primary btn--lg" href="#tickets" onClick={(e) => { e.preventDefault(); onNav('tickets'); }}>Attend Imagine IF <span className="arr"></span></a>
            </div>
          </div>
          <div className="hero__col-video">
            <TrailerSlot />
          </div>
        </div>
      </section>);

  }

  function TrailerSlot() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const togglePlay = () => {
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) { v.play(); setPlaying(true); }
      else { v.pause(); setPlaying(false); }
    };
    return (
      <figure className="trailer">
        <div className="trailer__frame">
          <video
            ref={videoRef}
            src="uploads/trailer-90day.mp4"
            poster="uploads/trailer-90day-poster.jpg"
            className="trailer__video"
            preload="metadata"
            playsInline
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <button className="trailer__play" type="button" aria-label="Play trailer" onClick={togglePlay}>
              <span className="trailer__play-bg"></span>
              <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
                <path d="M9 6 L23 14 L9 22 Z" fill="currentColor" />
              </svg>
            </button>
          )}
          <div className="trailer__corner trailer__corner--tl"></div>
          <div className="trailer__corner trailer__corner--tr"></div>
          <div className="trailer__corner trailer__corner--bl"></div>
          <div className="trailer__corner trailer__corner--br"></div>
        </div>
        <figcaption className="trailer__cap">
          <span className="eyebrow" style={{ color: 'var(--coral)' }}>Trailer · 1:38</span>
          <span style={{ color: 'rgba(251,246,241,0.7)', fontSize: 13 }}>
            Imagine IF · Nashville · <a href="https://youtu.be/7Vc6TplLaB4" target="_blank" rel="noopener" style={{ color: 'rgba(251,246,241,0.7)' }}>Watch the first trailer</a>
          </span>
        </figcaption>
      </figure>
    );
  }

  function HeroScrollHint() {
    return (
      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line"></div>
        <span>scroll</span>
      </div>);

  }

  // ---------------- CONVERGENCE STRIP — 3 RAILS → 1 OUTCOME ----------------
  function ConvergenceStrip() {
    const rails = [
    { name: 'Intelligence', rail: 'AI', body: 'The substrate every consequential decision now runs on.' },
    { name: 'Power', rail: 'Energy', body: 'The binding constraint, until it isn’t.' },
    { name: 'Money', rail: 'Bitcoin', body: 'Sound money for sovereign capital.' }];

    return (
      <section className="section section--tight" style={{ background: 'var(--midnight)', color: 'var(--paper)' }}>
        <div className="shell">
          <div className="conv-lead">
            <span className="eyebrow" style={{ color: 'var(--coral)' }}>The convergence</span>
            <h2 style={{ color: 'var(--paper)', maxWidth: '20ch', margin: '16px auto 16px', textAlign: 'center' }}>
              Three systems, <span className="italic-hero" style={{ color: 'var(--sunrise)' }}>one point of contact.</span>
            </h2>
            <p style={{ color: 'rgba(251,246,241,0.7)', maxWidth: '52ch', margin: '0 auto', textAlign: 'center' }}>
              Imagine IF is built around the conversations that happen when intelligence, power, and money meet on the same stage.
            </p>
          </div>
          <div className="conv-rails">
            {rails.map((r, i) =>
            <div key={r.name} className="conv-rail">
                <span className="conv-rail__num">0{i + 1}</span>
                <h3 style={{ color: 'var(--paper)' }}>{r.name}</h3>
                <span className="conv-rail__tag">({r.rail})</span>
                <p style={{ color: 'rgba(251,246,241,0.7)' }}>{r.body}</p>
              </div>
            )}
          </div>
          <div className="conv-outcome">
            <div className="conv-outcome__arrow" aria-hidden="true">
              <svg viewBox="0 0 200 60" width="200" height="60">
                <path d="M20 10 L100 50 L180 10" fill="none" stroke="url(#conv-grad)" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="conv-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e68158" />
                    <stop offset="100%" stopColor="#7958ed" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="eyebrow" style={{ color: 'var(--coral)' }}>The outcome</span>
            <h3 style={{ color: 'var(--paper)', marginTop: 8, fontSize: 32 }}>
              <span className="italic-hero" style={{ color: 'var(--sunrise)', fontSize: '1.1em' }}>Freedom Tech.</span>
            </h3>
            <p style={{ color: 'rgba(251,246,241,0.7)', maxWidth: '40ch', margin: '8px auto 0', textAlign: 'center' }}>
              What you get when all three systems are open.
            </p>
          </div>
        </div>
      </section>);

  }

  // ---------------- "IMAGINE IF…" PROMPT REEL ----------------
  function PromptReel() {
    // Two prompts from each rail — pulled from the hero cycling set.
    const seeds = [
    { rail: 'AI', prompt: 'intelligence became electricity — and you owned the meter.' },
    { rail: 'AI', prompt: 'AI worked for you, not on you.' },
    { rail: 'Energy', prompt: 'energy stopped being the binding constraint.' },
    { rail: 'Energy', prompt: 'atoms came back to the grid edge.' },
    { rail: 'Bitcoin', prompt: 'bitcoin worked for the next eight billion.' },
    { rail: 'Bitcoin', prompt: 'technology outlived the quantum decade.' }];

    return (
      <section className="section">
        <div className="shell">
          <div className="reel-head">
            <span className="eyebrow">The format</span>
            <h2>Every talk opens with a prompt.</h2>
          </div>
          <div className="reel-grid">
            {seeds.map((s, i) =>
            <div key={i} className={'reel-card reel-card--' + i % 3}>
                <span className="reel-card__seed">
                  <em className="italic-hero">Imagine IF…</em>
                </span>
                <p className="reel-card__prompt">{s.prompt}</p>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  // ---------------- FEATURED SPEAKERS PREVIEW ----------------
  // Headshots come from speaker.photo in data.js. Missing photos fall back to SpeakerArt.
  function FeaturedHeadshot({ photo, photoPos, seed }) {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);
    return (
      <div className="fm-card__art">
        <window.IFArt.SpeakerArt seed={seed} className="fm-card__svg" />
        {photo && !errored && (
          <img
            src={photo}
            alt=""
            style={photoPos ? { objectPosition: photoPos } : undefined}
            className={'fm-card__photo' + (loaded ? ' is-loaded' : '')}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        )}
      </div>
    );
  }

  function SpeakerPreview({ onNav }) {
    const featured = window.IF_DATA.speakers.filter((s) => s.featured);
    return (
      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Speakers</span>
              <h2>Voices in the room.</h2>
            </div>
            <button className="btn btn--ghost" onClick={() => onNav('speakers')}>See all <span className="arr"></span></button>
          </div>
          <div className="featured-mosaic">
            {featured.map((s, i) =>
            <article key={s.id} className={'fm-card fm-card--' + i} onClick={() => onNav('speakers')}>
                <FeaturedHeadshot photo={s.photo} photoPos={s.photoPos} seed={i} />
                <div className="fm-card__meta">
                  <h4>{s.name}</h4>
                  <span className="muted" style={{ fontSize: 13 }}>{s.role} · {s.org}</span>
                </div>
              </article>
            )}
            <div className="fm-card fm-card--more" onClick={() => onNav('speakers')}>
              <div className="fm-card__art fm-card__art--more">
                <span className="italic-hero" style={{ fontSize: 56, color: 'var(--paper)' }}>+ more</span>
              </div>
            </div>
          </div>
        </div>
      </section>);

  }

  // ---------------- AT A GLANCE ----------------
  function AtAGlance() {
    const stats = [
    { v: '2', l: 'days', sub: 'Oct 5 & 6' },
    { v: '2', l: 'stages', sub: 'Main Theatre + Second Stage' },
    { v: '3', l: 'systems', sub: 'Intelligence · Power · Money' },
    { v: '30+', l: 'sessions', sub: 'Keynotes, firesides, panels' }];

    return (
      <section className="section section--tight">
        <div className="shell">
          <div className="glance">
            {stats.map((s, i) =>
            <div key={i} className="glance__cell">
                <div className="glance__v tnum">{s.v}</div>
                <div className="glance__l">{s.l}</div>
                <div className="glance__sub muted">{s.sub}</div>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  // ---------------- AGENDA TEASE ----------------
  function AgendaTease({ onNav }) {
    return (
      <section className="section section--tight" style={{ background: 'var(--midnight)', color: 'var(--paper)' }}>
        <div className="shell">
          <span className="eyebrow" style={{ color: 'var(--coral)' }}>Agenda</span>
          <h2 style={{ color: 'var(--paper)', marginTop: 12 }}>
            Agenda <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>to be announced</em>.
          </h2>
        </div>
      </section>);

  }


  // ---------------- PROCEEDS / CTA ----------------
  function ProceedsCTA({ onNav }) {
    const bodyParas = [
      "Bitcoin Park and AI Freedom Lab's mission is to support and accelerate the grassroots freedom tech movement.",
      "Your participation plays a significant role in doing just that.",
      "We create spaces for mission-obsessed Bitcoiners, builders, and freedom fighters to work, learn, collaborate, and build.",
      "Imagine IF brings all these folks together to celebrate and push forward.",
    ];
    return (
      <section className="section" style={{ background: 'var(--coral)' }}>
        <div className="shell">
          <div className="proceeds">
            <span className="eyebrow" style={{ color: '#8a3a32' }}>The mission behind the room</span>
            <div className="proceeds__body">
              {bodyParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="proceeds__cta">
              <a className="btn btn--dark btn--lg" href="https://bitcoinpark.com" target="_blank" rel="noopener noreferrer">Bitcoin Park <span className="arr"></span></a>
              <a className="btn btn--ghost btn--lg" href="https://aifreedomlab.org" target="_blank" rel="noopener noreferrer">AI Freedom Lab <span className="arr"></span></a>
            </div>
          </div>
        </div>
      </section>);

  }

  function Page({ onNav }) {
    return (
      <div className="page">
        <HeroCycling onNav={onNav} />
        <ConvergenceStrip />
        <PromptReel />
        <SpeakerPreview onNav={onNav} />
        <AtAGlance />
        <AgendaTease onNav={onNav} />
        <ProceedsCTA onNav={onNav} />
      </div>);

  }

  return { Page };
})();