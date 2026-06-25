
/**
 * scroll-character.js
 * Kamil Portfolio — animacja sylwetki przy scrollowaniu
 * Sylwetka: https://kamillimak.github.io/Human-scroll/assets/brand/kamil-silhouette.png
 *
 * Fazy:
 *   0 → hero widoczne, brak sylwetki
 *   1 → sylwetka wyskakuje z ramki (fade in na prawym marginesie)
 *   2 → schodzi po prawym marginesie
 *   3 → teleport: prawy zanika, lewy pojawia się
 *   4 → schodzi po lewym marginesie
 *   5 → stoi nieruchomo na dole (przy #process)
 */

(function () {
  'use strict';

  var SILHOUETTE = 'https://kamillimak.github.io/Human-scroll/assets/brand/kamil-silhouette.png';

  /* ── rozmiar sylwetki ─────────────────────────────────────── */
  var CHAR_W = 90;   /* px — szerokość obrazka na ekranie */
  var CHAR_H = 160;  /* px — wysokość obrazka */

  /* ── progi scrolla jako % całego scrollHeight ─────────────── */
  var P_START  = 0.04;  /* kiedy zaczyna wyskakiwać                */
  var P_RIGHT  = 0.12;  /* kiedy jest w pełni na prawym marginesie */
  var P_TELE_S = 0.50;  /* start teleportu                         */
  var P_TELE_E = 0.62;  /* koniec teleportu / start lewego         */
  var P_STOP   = 0.88;  /* kiedy zatrzymuje się na dole            */

  /* ── marginesy strony (px od krawędzi viewport) ──────────── */
  var MARGIN_INNER = 12; /* odstęp sylwetki od krawędzi contentu   */
  var MARGIN_TOP   = 80; /* nav height — nie zasłaniamy nava        */

  /* ─────────────────────────────────────────────────────────── */

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t)    { return a + (b - a) * clamp(t, 0, 1); }
  function easeOut(t)        { return 1 - Math.pow(1 - clamp(t, 0, 1), 2); }

  /* ── elementy DOM ─────────────────────────────────────────── */
  var hero      = document.querySelector('.hero');
  var heroVisual = document.querySelector('.hero-visual');
  var heroImg   = heroVisual ? heroVisual.querySelector('img') : null;

  if (!hero || !heroVisual || !heroImg) return; /* strona bez hero — wyjdź */

  /* ── tworzymy element "pusta ramka" ─────────────────────── */
  var emptyOverlay = document.createElement('div');
  emptyOverlay.setAttribute('aria-hidden', 'true');
  emptyOverlay.style.cssText = [
    'position:absolute',
    'inset:0',
    'display:flex',
    'flex-direction:column',
    'align-items:center',
    'justify-content:center',
    'gap:8px',
    'opacity:0',
    'pointer-events:none',
    'transition:opacity 0.4s',
    'color:#6B7280',
    'font-size:13px',
    'text-align:center',
    'padding:12px',
  ].join(';');
  emptyOverlay.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><line x1="17" y1="17" x2="20" y2="20"/></svg><span>Kamil wyszedł z ramki</span>';
  heroVisual.style.position = 'relative';
  heroVisual.appendChild(emptyOverlay);

  /* ── tworzymy dwie sylwetki (prawy i lewy margines) ──────── */
  function makeChar(flipX) {
    var el = document.createElement('div');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = [
      'position:fixed',
      'z-index:90',
      'width:' + CHAR_W + 'px',
      'pointer-events:none',
      'opacity:0',
      'will-change:transform,opacity',
      'top:' + MARGIN_TOP + 'px',
      'transition:none',
    ].join(';');
    var img = document.createElement('img');
    img.src = SILHOUETTE;
    img.alt = '';
    img.width  = CHAR_W;
    img.style.cssText = [
      'width:100%',
      'display:block',
      'mix-blend-mode:multiply',
      flipX ? 'transform:scaleX(-1)' : '',
    ].join(';');
    el.appendChild(img);
    document.body.appendChild(el);
    return el;
  }

  var charRight = makeChar(false); /* patrzy w lewo (w stronę treści) */
  var charLeft  = makeChar(true);  /* odbicie lustrzane                */

  /* ── obliczanie pozycji X ─────────────────────────────────── */
  function getRightX() {
    /* prawy margines: na prawo od contentu (max-width 1120px) */
    var contentRight = Math.min(
      (window.innerWidth + Math.min(window.innerWidth, 1120)) / 2,
      window.innerWidth - MARGIN_INNER - CHAR_W
    );
    return Math.max(contentRight, window.innerWidth - CHAR_W - MARGIN_INNER);
  }

  function getLeftX() {
    var contentLeft = Math.max(
      (window.innerWidth - Math.min(window.innerWidth, 1120)) / 2,
      MARGIN_INNER
    );
    return Math.max(contentLeft - CHAR_W - MARGIN_INNER, MARGIN_INNER);
  }

  /* ── obliczanie pozycji Y (top w px od góry viewport) ─────── */
  function charTopForNorm(normY, minTop, maxTop) {
    /* minTop = zaraz pod navem, maxTop = nad dolną krawędzią viewport */
    return Math.round(lerp(minTop, maxTop, easeOut(normY)));
  }

  var minTop = MARGIN_TOP + 16;
  var maxTop; /* obliczamy dynamicznie */

  function calcMaxTop() {
    maxTop = window.innerHeight - CHAR_H - 24;
  }
  calcMaxTop();
  window.addEventListener('resize', calcMaxTop, { passive: true });

  /* ── główna pętla update ──────────────────────────────────── */
  var raf = null;

  function update() {
    var scroll = window.scrollY;
    var maxS   = document.documentElement.scrollHeight - window.innerHeight;
    var n      = maxS > 0 ? scroll / maxS : 0;

    var rightX = getRightX();
    var leftX  = getLeftX();

    /* ─── faza 0: sylwetka niewidoczna ─── */
    if (n < P_START) {
      heroImg.style.opacity    = '1';
      emptyOverlay.style.opacity = '0';
      charRight.style.opacity  = '0';
      charLeft.style.opacity   = '0';
      return;
    }

    /* ─── faza 1: wyskakiwanie ─── */
    if (n < P_RIGHT) {
      var t1 = (n - P_START) / (P_RIGHT - P_START);
      heroImg.style.opacity      = String(1 - easeOut(t1));
      emptyOverlay.style.opacity = String(easeOut(t1));
      charLeft.style.opacity     = '0';

      /* sylwetka wyjeżdża z dołu ramki hero ku górze viewport */
      var heroRect = heroVisual.getBoundingClientRect();
      var startTop = heroRect.bottom - CHAR_H * 0.7;
      var endTop   = minTop;
      var curTop   = Math.round(lerp(startTop, endTop, easeOut(t1)));

      charRight.style.left    = rightX + 'px';
      charRight.style.top     = curTop + 'px';
      charRight.style.opacity = String(easeOut(t1));
      return;
    }

    /* ─── faza 2: prawy margines ─── */
    if (n < P_TELE_S) {
      heroImg.style.opacity      = '0';
      emptyOverlay.style.opacity = '1';
      charLeft.style.opacity     = '0';

      var t2  = (n - P_RIGHT) / (P_TELE_S - P_RIGHT);
      var top2 = charTopForNorm(t2, minTop, maxTop);

      charRight.style.left    = rightX + 'px';
      charRight.style.top     = top2 + 'px';
      charRight.style.opacity = '1';
      return;
    }

    /* ─── faza 3: teleport ─── */
    if (n < P_TELE_E) {
      heroImg.style.opacity      = '0';
      emptyOverlay.style.opacity = '1';

      var t3 = (n - P_TELE_S) / (P_TELE_E - P_TELE_S);
      charRight.style.left    = rightX + 'px';
      charRight.style.top     = maxTop + 'px';
      charRight.style.opacity = String(1 - clamp(t3 * 2, 0, 1));

      charLeft.style.left    = leftX + 'px';
      charLeft.style.top     = minTop + 'px';
      charLeft.style.opacity = String(clamp((t3 - 0.5) * 2, 0, 1));
      return;
    }

    /* ─── faza 4: lewy margines ─── */
    if (n < P_STOP) {
      heroImg.style.opacity      = '0';
      emptyOverlay.style.opacity = '1';
      charRight.style.opacity    = '0';

      var t4   = (n - P_TELE_E) / (P_STOP - P_TELE_E);
      var top4 = charTopForNorm(t4, minTop, maxTop);

      charLeft.style.left    = leftX + 'px';
      charLeft.style.top     = top4 + 'px';
      charLeft.style.opacity = '1';
      return;
    }

    /* ─── faza 5: stoi ─── */
    heroImg.style.opacity      = '0';
    emptyOverlay.style.opacity = '1';
    charRight.style.opacity    = '0';

    charLeft.style.left    = leftX + 'px';
    charLeft.style.top     = maxTop + 'px';
    charLeft.style.opacity = '1';
  }

  window.addEventListener('scroll', function () {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = null; update(); });
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = null; update(); });
  }, { passive: true });

  /* pierwsze wywołanie */
  update();

})();
