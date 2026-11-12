/* ==========================================================================
   PYLON — Intro loader
   Timing reverse-engineered from paragonproductions.co screen rec (60fps):
     first logo fades in + holds ~0.9s
     rapid hard-cut flash, ~1 logo every 80–120ms
     final mark holds ~0.5s
     background ramps black → grey → white (mark inverts)
     black curtain wipes up from bottom
     short black hold → site fades in
   ========================================================================== */

(() => {
  const TIMING = {
    preRoll: 200,       // black before first logo
    firstHold: 900,     // original logo hold (incl. fade)
    flash: 110,         // each mockup in the rapid sequence
    finalHold: 550,     // final mark hold on black
    rampStep: 90,       // each step of the bg ramp
    whiteHold: 260,     // final mark on white before curtain
    curtain: 520,       // curtain wipe duration (match CSS)
    blackHold: 550,     // black before site fades in
  };

  const intro = document.getElementById('intro');
  const stage = document.getElementById('introStage');
  const curtain = document.getElementById('introCurtain');
  const site = document.getElementById('site');
  const library = document.getElementById('logoLibrary').content;
  const replayBtn = document.getElementById('replayBtn');

  // Order = order in <template>. First = original, last = .is-final.
  const logos = Array.from(library.querySelectorAll('.logo'));

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let runId = 0;

  function show(node, fade = false) {
    const el = node.cloneNode(true);
    if (fade) el.classList.add('fade-in');
    stage.replaceChildren(el);
  }

  function reset() {
    stage.className = 'intro-stage';
    stage.replaceChildren();
    curtain.classList.remove('is-up');
    intro.classList.remove('is-done');
    site.classList.remove('is-in');
    document.body.classList.add('is-loading');
    window.scrollTo(0, 0);
  }

  async function play() {
    const id = ++runId;
    const alive = () => id === runId;
    reset();

    await wait(TIMING.preRoll); if (!alive()) return;

    // 1. Original logo
    show(logos[0], true);
    await wait(TIMING.firstHold); if (!alive()) return;

    // 2. Rapid flash through mockups
    for (let i = 1; i < logos.length - 1; i++) {
      show(logos[i]);
      await wait(TIMING.flash); if (!alive()) return;
    }

    // 3. Land on final
    show(logos[logos.length - 1]);
    await wait(TIMING.finalHold); if (!alive()) return;

    // 4. Background ramp to white
    for (let s = 1; s <= 4; s++) {
      stage.classList.add(`ramp-${s}`);
      await wait(TIMING.rampStep); if (!alive()) return;
    }
    await wait(TIMING.whiteHold); if (!alive()) return;

    // 5. Curtain wipe up
    curtain.classList.add('is-up');
    await wait(TIMING.curtain + TIMING.blackHold); if (!alive()) return;

    // 6. Reveal site
    intro.classList.add('is-done');
    document.body.classList.remove('is-loading');
    requestAnimationFrame(() => site.classList.add('is-in'));
  }

  function skip() {
    runId++;
    intro.classList.add('is-done');
    document.body.classList.remove('is-loading');
    site.classList.add('is-in');
  }

  const params = new URLSearchParams(location.search);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Wait for webfonts + original logo so the flash never shows fallback type.
  const ready = Promise.all([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => {
      const img = new Image();
      img.onload = img.onerror = r;
      img.src = 'assets/logo.png';
    }),
  ]);

  ready.then(() => {
    if (params.has('skip') || reduced) skip();
    else play();
  });

  replayBtn.addEventListener('click', play);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') play();
    if (e.key === 'Escape') skip();
  });
})();
