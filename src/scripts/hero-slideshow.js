// hero-slideshow.js — kryssfading + scroll-drevet bildebytte + idle-autoveksling
// for fotoheroen på forsiden (.hero__bg[data-hero-fade]). Lastet fra
// src/layouts/Base.astro, samme sted som reveal.js — no-op på sider uten
// [data-hero-fade] (dvs. alle sider unntatt forsiden i dag).
//
// Portert fra Husviks "Hero image engine" (Kunder/Husvik/Nettside/js/site.js,
// linje ~91-150), på Joachims eksplisitte instruks 2026-08-12 ("samme type
// hero som på Husvik siden ... menyen gjennomsiktig oppå"). Klassenavnene er
// tilpasset noXcuse sin BEM-konvensjon (.hero__bg i stedet for .hero-bg) —
// selve mekanikken (kryssfading, scroll-band, 5s idle-timer) er identisk.
//
// Uten JS: markup setter allerede class="active" på første bilde i
// index.astro, så det første fabrikkfotoet er alltid synlig uten JS.
//
// Med prefers-reduced-motion: reduce — kun første bilde vises, ingen
// kryssfading, ingen autoveksling, ingen zoom. global.css sin utvidede
// reduced-motion-blokk nuller i tillegg ut hero-zoom-animasjonen i CSS, så
// begge lag (JS og CSS) håndhever det samme kravet uavhengig av hverandre.

document.querySelectorAll('.hero__bg[data-hero-fade]').forEach((bg) => {
  const imgs = bg.querySelectorAll('img');
  if (imgs.length < 2) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    imgs.forEach((img, n) => img.classList.toggle('active', n === 0));
    return;
  }

  const container = bg.closest('.hero') || bg.parentElement;
  let i = 0;
  imgs.forEach((img, n) => {
    if (img.classList.contains('active')) i = n;
  });

  function setActive(next) {
    next = ((next % imgs.length) + imgs.length) % imgs.length;
    if (next === i) return;
    imgs[i].classList.remove('active');
    i = next;
    imgs[i].classList.add('active');
  }

  let idleTimer = null;
  function scheduleIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      setActive(i + 1);
      scheduleIdle();
    }, 5000);
  }

  function updateFromScroll() {
    const rect = container.getBoundingClientRect();
    const height = container.offsetHeight || 1;
    let progress = -rect.top;
    if (progress < 0) progress = 0;
    if (progress > height) progress = height;
    let band = Math.floor((progress / height) * imgs.length);
    if (band >= imgs.length) band = imgs.length - 1;
    setActive(band);
  }

  // Ingen requestAnimationFrame-strupning — samme grunn som Nav.astro sin
  // updateNavState: en rAF-callback kjører ikke mens fanen er skjult, og et
  // "ticking"-flagg som bare nullstilles inne i callbacken ville da blitt
  // stående true for alltid og fryse bildet i feil tilstand. Én rect-lesning
  // per scroll-hendelse er billig nok til å gjøre direkte.
  window.addEventListener(
    'scroll',
    () => {
      clearTimeout(idleTimer);
      updateFromScroll();
      scheduleIdle();
    },
    { passive: true }
  );

  updateFromScroll();
  scheduleIdle();
});
