(() => {
  const toast = document.querySelector('.toast');
  let timer;
  document.querySelectorAll('[data-copy], [data-copy-target]').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || document.getElementById(button.dataset.copyTarget).textContent;
      try {
        if (!navigator.clipboard) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(value);
        toast.textContent = button.dataset.copy ? `${value} copied` : 'Text copied to clipboard';
      } catch {
        toast.textContent = 'Copy unavailable. Select and copy the text manually.';
      }
      clearTimeout(timer);
      toast.classList.add('visible');
      timer = setTimeout(() => toast.classList.remove('visible'), 3500);
    });
  });
})();
