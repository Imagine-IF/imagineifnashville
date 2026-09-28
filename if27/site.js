(() => {
  const url = window.FRONTIER_TRAILER_URL;
  if (!url) return;
  const video = document.getElementById('hero-video');
  const button = document.getElementById('film-toggle');
  const note = document.getElementById('film-note');
  video.src = url;
  video.poster = 'assets/frontier-current.jpg';
  video.hidden = false;
  button.hidden = false;
  note.hidden = true;
  button.addEventListener('click', async () => {
    if (!video.paused) { video.pause(); return; }
    try { video.muted = false; await video.play(); } catch { button.textContent = 'Play film'; }
  });
  video.addEventListener('play', () => { button.textContent = 'Pause film'; });
  video.addEventListener('pause', () => { button.textContent = 'Play film'; });
  video.addEventListener('error', () => {
    video.hidden = true; button.hidden = true; note.hidden = false;
    note.textContent = 'The film is temporarily unavailable.';
  });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => {});
})();
