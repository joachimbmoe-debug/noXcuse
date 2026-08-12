// reveal.js — deler ett IntersectionObserver-oppsett for hele siden.
// Lastet fra src/layouts/Base.astro, gjelder derfor alle sider.
//
// Kontrakt (02_DESIGNSYSTEM.md §5, punkt 1 og docs/01_BYGGEPLAN.md sitt
// "statisk fallback først"-prinsipp):
// - Elementer merket med [data-reveal] får klassen .reveal i markup
//   (se global.css .reveal for grunntilstand: opacity 0, translateY(16px)).
// - Uten JS overstyrer <noscript>-regelen i Base.astro .reveal til synlig —
//   dette scriptet er derfor ren forbedring, aldri en forutsetning for at
//   innhold vises.
// - Med JS: når et element kommer i view legges .er-synlig til ÉN gang
//   (once: true — observer slutter å observere elementet med det samme).
// - Mangler IntersectionObserver (svært gamle nettlesere): marker alt synlig
//   med det samme i stedet for å la elementene stå skjult i evigheten.

function markerSynlig(elementer) {
  elementer.forEach((el) => el.classList.add('er-synlig'));
}

function settOppReveal() {
  const elementer = document.querySelectorAll('[data-reveal]');
  if (elementer.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    markerSynlig(elementer);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('er-synlig');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  elementer.forEach((el) => observer.observe(el));
}

settOppReveal();

// Tallteller (02_DESIGNSYSTEM.md §5, punkt 4: "kun hvis tallene finnes. Ellers ingen").
// Generisk og betinget — teller opp ETT element merket [data-teller] fra 0 til tallet i
// data-teller-attributtet, når elementet kommer i view. Kjøres KUN når attributtet
// finnes og inneholder et gyldig tall; er attributtet fraværende (ingen ekte tall å vise,
// f.eks. i dagens Kostnadstrapp.astro der leveransenivåene ikke har noe belopInkMva-felt)
// gjør querySelectorAll ingenting og funksjonen er et rent no-op. Ingen komponent
// bruker attributtet ennå — se Kostnadstrapp.astro sin egen filkommentar.
function animerTeller(el) {
  const mal = Number(el.dataset.teller);
  if (!Number.isFinite(mal)) return;

  const formatter = new Intl.NumberFormat('nb-NO');
  const reduserBevegelse = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduserBevegelse) {
    el.textContent = formatter.format(mal);
    return;
  }

  const varighetMs = 520; // matcher --tid-treg — én lesbar tallanimasjon, ikke en CSS-overgang
  const start = performance.now();

  function steg(na) {
    const andel = Math.min((na - start) / varighetMs, 1);
    el.textContent = formatter.format(Math.round(mal * andel));
    if (andel < 1) requestAnimationFrame(steg);
  }
  requestAnimationFrame(steg);
}

function settOppTellere() {
  const tellere = document.querySelectorAll('[data-teller]');
  if (tellere.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    tellere.forEach(animerTeller);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animerTeller(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  tellere.forEach((el) => observer.observe(el));
}

settOppTellere();
