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

/* ── Gallery Slideshow + Lightbox ───────────── */

function initGallery() {
  const slides   = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  const dotsWrap = document.getElementById('slideshow-dots');
  const slidePrev = document.getElementById('slide-prev');
  const slideNext = document.getElementById('slide-next');

  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev  = document.getElementById('lightbox-prev');
  const btnNext  = document.getElementById('lightbox-next');

  const srcs = slides.map((slide) => slide.querySelector('img').src);
  const AUTOPLAY_MS = 4000;
  let current = 0;
  let timer   = null;

  /* build dots */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
    dot.addEventListener('click', () => { show(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function nextSlide() { show(current + 1); }
  function prevSlide() { show(current - 1); }

  function start() { timer = setInterval(nextSlide, AUTOPLAY_MS); }
  function stop()  { clearInterval(timer); }
  function restart() { stop(); start(); }

  slideNext.addEventListener('click', () => { nextSlide(); restart(); });
  slidePrev.addEventListener('click', () => { prevSlide(); restart(); });

  const slideshow = document.getElementById('slideshow');
  slideshow.addEventListener('mouseenter', stop);
  slideshow.addEventListener('mouseleave', start);

  /* Lightbox */
  function openLightbox(index) {
    current = index;
    lbImg.src = srcs[current];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    stop();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    show(current);
    start();
  }

  function lbPrev() { current = (current - 1 + srcs.length) % srcs.length; lbImg.src = srcs[current]; }
  function lbNext() { current = (current + 1) % srcs.length; lbImg.src = srcs[current]; }

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => openLightbox(i));
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', lbPrev);
  btnNext.addEventListener('click', lbNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbPrev();
    if (e.key === 'ArrowRight') lbNext();
  });

  show(0);
  start();
}

document.addEventListener('DOMContentLoaded', initGallery);
