// Main app — router, mounting

const { useState, useEffect, useCallback } = React;
const { TopBar, Drawer, Footer } = window.IFChrome;

const PAGES = {
  home: { Comp: () => null, label: 'Home' },
  idea: { Comp: () => null, label: 'The Imagine IF Idea' },
  speakers: { Comp: () => null, label: 'Speakers' },
  agenda: { Comp: () => null, label: 'Agenda' },
  sponsors: { Comp: () => null, label: 'Sponsors' },
  tickets: { Comp: () => null, label: 'Tickets' },
  venue: { Comp: () => null, label: 'Venue & Nashville' },
  past: { Comp: () => null, label: 'Past Ignite Talks' },
};

function App() {
  // hash routing
  const getPage = () => {
    const h = (window.location.hash || '#home').replace('#', '');
    return PAGES[h] ? h : 'home';
  };
  const [page, setPage] = useState(getPage);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navTo = useCallback((id) => {
    setDrawerOpen(false);
    if (id === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = '#' + id;
    // scroll to top after page swap
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 0);
  }, [page]);

  // Reveal-on-scroll observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [page]);

  const isDarkHero = page === 'home' || page === 'tickets';

  // Render the right page
  const renderPage = () => {
    switch (page) {
      case 'home': return <window.IFHome.Page onNav={navTo} />;
      case 'idea': return <window.IFIdea.Page onNav={navTo} />;
      case 'speakers': return <window.IFSpeakers.Page onNav={navTo} />;
      case 'agenda': return <window.IFAgenda.Page onNav={navTo} />;
      case 'sponsors': return <window.IFSponsors.Page onNav={navTo} />;
      case 'tickets': return <window.IFTickets.Page onNav={navTo} />;
      case 'venue': return <window.IFVenue.Page onNav={navTo} />;
      case 'past': return <window.IFPast.Page onNav={navTo} />;
      default: return <window.IFHome.Page onNav={navTo} />;
    }
  };

  return (
    <div data-screen-label={(Object.keys(PAGES).indexOf(page) + 1).toString().padStart(2, '0') + ' ' + PAGES[page].label}>
      <TopBar page={page} onNav={navTo} onMenu={() => setDrawerOpen(true)} dark={isDarkHero} />
      <Drawer open={drawerOpen} page={page} onNav={navTo} onClose={() => setDrawerOpen(false)} />
      <main key={page}>
        {renderPage()}
      </main>
      <Footer onNav={navTo} />
    </div>
  );
}

// Root mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
