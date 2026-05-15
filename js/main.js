(() => {
  'use strict';

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------- Scroll state (hide header on mobile when scrolled) ----------
  const setScrolled = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  // ---------- Mobile nav toggle ----------
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    const setOpen = (open) => {
      mobileNav.classList.toggle('is-open', open);
      mobileNav.setAttribute('aria-hidden', String(!open));
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    navToggle.addEventListener('click', () => {
      setOpen(!mobileNav.classList.contains('is-open'));
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) setOpen(false);
    });
  }

  // ---------- Gallery show-more toggles ----------
  document.querySelectorAll('.gallery-toggle').forEach((btn) => {
    const targetId = btn.getAttribute('aria-controls');
    const grid = targetId ? document.getElementById(targetId) : null;
    if (!grid) return;
    const labelEl = btn.querySelector('.gallery-toggle__label');
    const countEl = btn.querySelector('.gallery-toggle__count');
    const total = grid.querySelectorAll('.tile').length;
    const visible = total - grid.querySelectorAll('.tile.is-extra').length;
    const collapsedLabel = btn.dataset.collapsedLabel || 'Show more';
    const expandedLabel = btn.dataset.expandedLabel || 'Show less';
    btn.addEventListener('click', () => {
      const expanded = grid.classList.toggle('is-expanded');
      btn.setAttribute('aria-expanded', String(expanded));
      if (labelEl) labelEl.textContent = expanded ? expandedLabel : collapsedLabel;
      if (countEl) countEl.textContent = expanded ? `${total}  /  ${total}` : `${visible}  /  ${total}`;
      if (!expanded) {
        // scroll back up to the grid so the user isn't stranded below it
        const top = grid.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Tile link sync (design / photography) ----------
  document.querySelectorAll('a.tile img').forEach((img) => {
    const sync = () => {
      const a = img.closest('a.tile');
      const src = img.getAttribute('src');
      if (a && src && !src.endsWith('placeholder.svg')) a.setAttribute('href', src);
    };
    img.addEventListener('load', sync);
    if (img.complete && img.naturalWidth > 0) sync();
  });

  // ---------- Custom cursor (desktop pointer only) ----------
  const cursor = document.querySelector('.cursor');
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cursor && hasFinePointer) {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('pointermove', move, { passive: true });
    const tick = () => {
      x += (tx - x) * 0.25;
      y += (ty - y) * 0.25;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(tick);
    };
    tick();

    const hoverSelectors = 'a, button, .spoke, .reel-trigger, .tile';
    document.addEventListener('pointerover', (e) => {
      if (e.target.closest(hoverSelectors)) cursor.classList.add('is-hover');
    });
    document.addEventListener('pointerout', (e) => {
      if (e.target.closest(hoverSelectors)) cursor.classList.remove('is-hover');
    });
    window.addEventListener('blur', () => cursor.classList.remove('is-hover'));
  }

  // ---------- Radial menu ----------
  const radial = document.querySelector('.radial');
  const stage = document.querySelector('.stage');
  const posterA = document.getElementById('stage-poster-a');
  const posterB = document.getElementById('stage-poster-b');
  const centerKind = document.querySelector('.radial-kind');
  const centerTitle = document.querySelector('.radial-title');
  const centerMeta = document.querySelector('.radial-meta');
  const centerYear = document.querySelector('.radial-year');
  const spokes = Array.from(document.querySelectorAll('.radial .spoke'));

  const thumbFor = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  const clearPreview = () => {
    if (!radial) return;
    radial.classList.remove('is-active');
    if (stage) stage.classList.remove('is-previewing');
    spokes.forEach((s) => s.classList.remove('is-active'));
  };

  const preview = (btn) => {
    if (!btn || !radial) return;
    radial.classList.add('is-active');
    spokes.forEach((s) => s.classList.toggle('is-active', s === btn));
    if (centerKind) centerKind.textContent = btn.dataset.kind || '';
    if (centerTitle) centerTitle.innerHTML = btn.dataset.title || '';
    if (centerMeta) centerMeta.innerHTML = btn.dataset.meta || '';
    if (centerYear) centerYear.textContent = btn.dataset.year || '';

    const id = btn.dataset.video;
    if (posterB && id) {
      const url = thumbFor(id);
      // preload, then crossfade
      const pre = new Image();
      pre.onload = () => {
        posterB.src = url;
        if (stage) stage.classList.add('is-previewing');
      };
      pre.onerror = () => {
        // fall back to hqdefault if maxres isn't available
        posterB.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        if (stage) stage.classList.add('is-previewing');
      };
      pre.src = url;
    }
  };

  spokes.forEach((spoke, idx) => {
    spoke.addEventListener('pointerenter', () => preview(spoke));
    spoke.addEventListener('focus', () => preview(spoke));
    spoke.addEventListener('click', (e) => {
      e.preventDefault();
      openModal({
        id: spoke.dataset.video,
        title: spoke.dataset.title,
        meta: spoke.dataset.meta,
      });
    });
    // Keyboard: arrow keys rotate between spokes
    spoke.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        spokes[(idx + 1) % spokes.length].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        spokes[(idx - 1 + spokes.length) % spokes.length].focus();
      }
    });
  });

  if (radial) {
    radial.addEventListener('pointerleave', clearPreview);
    // Blur inside radial clears preview when focus leaves
    radial.addEventListener('focusout', (e) => {
      if (!radial.contains(e.relatedTarget)) clearPreview();
    });
  }

  // ---------- Reel triggers (films/travel lists) ----------
  document.querySelectorAll('.reel-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal({
        id: btn.dataset.video,
        title: btn.dataset.title,
        meta: btn.dataset.meta,
      });
    });
  });

  // ---------- Video modal ----------
  const modal = document.getElementById('video-modal');
  const modalEmbed = document.getElementById('modal-embed');
  const modalTitle = document.querySelector('.modal-title');
  const modalMeta = document.querySelector('.modal-meta');
  const modalClose = document.querySelector('.modal-close');
  let lastFocused = null;

  function openModal({ id, title, meta }) {
    if (!modal || !modalEmbed || !id) return;
    lastFocused = document.activeElement;
    if (modalTitle) modalTitle.innerHTML = title || '';
    if (modalMeta) modalMeta.innerHTML = meta || '';
    const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    modalEmbed.innerHTML = `<iframe src="${src}" title="${(title || '').replace(/"/g, '&quot;')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal || !modalEmbed) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalEmbed.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });
})();
