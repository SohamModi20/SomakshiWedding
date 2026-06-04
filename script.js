/* ============================================
   WEDDING INVITATION — Scripts
   ============================================

   ┌─────────────────────────────────────────┐
   │  EDIT THIS to set your wedding date:    │
   └─────────────────────────────────────────┘ */

const WEDDING_DATE = new Date('2026-07-19T12:33:00');

/* ── Countdown Timer ────────────────────────── */

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent    = '00';
    document.getElementById('cd-hours').textContent   = '00';
    document.getElementById('cd-minutes').textContent = '00';
    document.getElementById('cd-seconds').textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('cd-days').textContent    = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ── Scroll Reveal ──────────────────────────── */

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);

/* ── Gallery Lightbox ───────────────────────── */

function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const btnClose   = document.getElementById('lightbox-close');
  const btnPrev    = document.getElementById('lightbox-prev');
  const btnNext    = document.getElementById('lightbox-next');
  const items      = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  const srcs = Array.from(items).map((item) => item.querySelector('img').src);

  function open(index) {
    currentIndex = index;
    lbImg.src = srcs[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prev() {
    currentIndex = (currentIndex - 1 + srcs.length) % srcs.length;
    lbImg.src = srcs[currentIndex];
  }

  function next() {
    currentIndex = (currentIndex + 1) % srcs.length;
    lbImg.src = srcs[currentIndex];
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
}

document.addEventListener('DOMContentLoaded', initLightbox);
