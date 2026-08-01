// Agenda — two-column timeline per day, filterable

window.IFAgenda = (() => {
  const { useState, useMemo } = React;
  const data = () => window.IF_DATA;

  // Hybrid choice: tabbed by day, with a two-column visual timeline (Main Theatre | Second Stage)
  // Why: one clear axis (time, vertical), one clear axis (stage, horizontal), and tabs handle the day switch.
  // Calendar grid is too dense at 1920px and unreadable on mobile; pure list loses stage-as-spatial-cue.

  function Page({ onNav }) {
    const d = data();
    const [day, setDay] = useState(0);
    const [track, setTrack] = useState('All');
    const [stage, setStage] = useState('Both');

    const agendaEmpty = !d.agenda || d.agenda.length === 0;

    const allTracks = useMemo(() => {
      const set = new Set();
      d.agenda.forEach(s => set.add(s.track));
      return ['All', ...Array.from(set)];
    }, []);

    const sessions = d.agenda.filter(s => s.day === day
      && (track === 'All' || s.track === track)
      && (stage === 'Both' || (stage === 'Main' && s.stage === 0) || (stage === 'Second' && s.stage === 1)));

    if (agendaEmpty) {
      return (
        <div className="page">
          <section className="section" style={{ paddingTop: 180, paddingBottom: 'var(--s-10)' }}>
            <div className="shell">
              <span className="eyebrow">Agenda</span>
              <h1 style={{ marginTop: 16, maxWidth: '16ch' }}>
                The lineup is <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>coming together</em>.
              </h1>
              <p className="muted" style={{ fontSize: 19, maxWidth: '52ch', marginTop: 20 }}>
                Two days, two stages. AI, energy, and bitcoin, and everything they touch. Keynotes, firesides, and panels with the people building at the frontier. The full agenda drops closer to the experience.
              </p>
              <p className="muted" style={{ fontSize: 17, maxWidth: '52ch', marginTop: 12 }}>
                Want to be in the room? Attendance is by invitation.
              </p>
              <div style={{ marginTop: 28 }}>
                <a className="btn btn--primary btn--lg" href="https://luma.com/uanee3xb?tk=yqFBKj" target="_blank" rel="noopener noreferrer">
                  Request an Invitation <span className="arr"></span>
                </a>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="page">
        <section className="section section--tight" style={{ paddingTop: 180 }}>
          <div className="shell">
            <span className="eyebrow">Agenda · two days · two stages</span>
            <h1 style={{ marginTop: 16, maxWidth: '14ch' }}>
              Two days, <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>built dense</em>.
            </h1>
            <p className="muted" style={{ fontSize: 18, maxWidth: '52ch', marginTop: 16 }}>
              Main Theatre is keynotes and big-idea panels. The Second Stage is firesides, working sessions, and the things you don't get on YouTube. The agenda updates as speakers confirm.
            </p>

            <div className="ag-controls">
              <div className="ag-tabs">
                {d.event.days.map((label, i) => (
                  <button key={i}
                    className={'ag-tab' + (day === i ? ' is-on' : '')}
                    onClick={() => setDay(i)}>
                    <span className="ag-tab__d">Day {i + 1}</span>
                    <span className="ag-tab__date">{label}</span>
                  </button>
                ))}
              </div>
              <div className="ag-filters">
                <div className="ag-filter-group">
                  <span className="field-label">Stage</span>
                  <div className="ag-pills">
                    {['Both', 'Main', 'Second'].map(s => (
                      <button key={s} className={'ag-pill' + (stage === s ? ' is-on' : '')} onClick={() => setStage(s)}>{s}</button>
                    ))}
                  </div>
                </div>
                <div className="ag-filter-group">
                  <span className="field-label">Track</span>
                  <div className="ag-pills">
                    {allTracks.map(t => (
                      <button key={t} className={'ag-pill' + (track === t ? ' is-on' : '')} onClick={() => setTrack(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 'var(--s-10)' }}>
          <div className="shell">
            <div className="ag-grid">
              <div className="ag-stage-head">
                <span className="eyebrow" style={{ color: 'var(--sunrise)' }}>Main Theatre</span>
              </div>
              <div className="ag-stage-head">
                <span className="eyebrow" style={{ color: 'var(--royal)' }}>Second Stage</span>
              </div>
              {[0, 1].map(stageIdx => (
                <div key={stageIdx} className="ag-col">
                  {sessions.filter(s => s.stage === stageIdx).map((s, i) => (
                    <SessionBlock key={i} s={s} stageIdx={stageIdx} />
                  ))}
                  {sessions.filter(s => s.stage === stageIdx).length === 0 && (
                    <div className="ag-empty">
                      <span className="italic-hero" style={{ fontSize: 28, color: 'var(--ink-soft)' }}>nothing matches your filters</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--paper-2)', paddingTop: 'var(--s-8)' }}>
          <div className="shell" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span className="eyebrow">Be in the room</span>
              <h3 style={{ marginTop: 8 }}>Two days. <em className="italic-hero" style={{ color: 'var(--sunrise)' }}>Two stages.</em> One door.</h3>
            </div>
            <a className="btn btn--primary" href="https://luma.com/uanee3xb?tk=yqFBKj" target="_blank" rel="noopener noreferrer">Request an Invitation <span className="arr"></span></a>
          </div>
        </section>
      </div>
    );
  }

  function SessionBlock({ s, stageIdx }) {
    const accent = stageIdx === 0 ? 'var(--sunrise)' : 'var(--royal)';
    const lineup = [s.lead, ...(s.panel || [])].filter(Boolean);
    return (
      <article className="ag-block" style={{ '--accent': accent }}>
        <div className="ag-block__time">
          <span className="tnum">{s.start}</span>
          <span className="ag-block__sep">→</span>
          <span className="tnum">{s.end}</span>
        </div>
        <div className="ag-block__body">
          <div className="ag-block__meta">
            <span className="pill pill--ink" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>{s.kind}</span>
            <span className="ag-block__track muted">{s.track}</span>
          </div>
          <h4 className="ag-block__title">{s.title}</h4>
          {s.abstract && <p className="muted" style={{ fontSize: 14 }}>{s.abstract}</p>}
          {lineup.length > 0 && (
            <div className="ag-block__speakers">
              {lineup.map((name, i) => (
                <span key={i} className="ag-block__sp">
                  <span className="ag-block__dot" style={{ background: 'var(--accent)' }}></span>
                  <strong>{name}</strong>
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    );
  }

  return { Page };
})();
