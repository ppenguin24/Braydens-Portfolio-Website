(() => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  document.querySelectorAll('a.tile img').forEach((img) => {
    const sync = () => {
      const a = img.closest('a.tile');
      const src = img.getAttribute('src');
      if (a && src && !src.endsWith('placeholder.svg')) {
        a.setAttribute('href', src);
      }
    };
    img.addEventListener('load', sync);
    if (img.complete && img.naturalWidth > 0) sync();
  });
})();
