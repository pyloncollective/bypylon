/* ==========================================================================
   PYLON PICTURES — Individual Artist Portfolio Engine
   Drives: Opening Loop, Credit Hover Cue & Plate Changeover, Film Theatre,
           Information Overlay, and In-Site Contact Form.
   ========================================================================== */

(() => {
  const DATA = window.PYLON_PORTFOLIO;
  if (!DATA) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine) document.documentElement.classList.add('fine');

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const pad = (n) => String(n).padStart(2, '0');
  const now = () => performance.now();
  const esc = (s = '') =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const BASE_TITLE = document.title;
  const projects = DATA.projects || [];
  const N = projects.length;

  const DWELL_OPEN = 9500;
  const DWELL_ITEM = 11000;

  const state = {
    index: -1, // -1 = artist opening showreel loop, 0..N-1 = project index
    view: 'home', // 'home' | 'film' | 'information' | 'contact'
    opening: !reduce && !location.hash.replace(/^#\/?/, ''),
    lastInput: now(),
    overList: false,
    touch: false
  };

  /* DOM Elements */
  const screenEl = $('#screen');
  const platesEl = $('#plates');
  const veil = $('#veil');
  const shade = $('#shade');
  const pointerEl = $('#pointer');

  const listEl = $('#programmeList');
  const cueEl = $('#cue');
  const cueKind = $('#cueKind');
  const cueRoles = $('#cueRoles');
  const cueWatch = $('#cueWatch');
  const cueBar = $('#cueBar');

  const filmFrame = $('#filmFrame');
  const filmNo = $('#filmNo');
  const filmTitle = $('#filmTitle');
  const filmKind = $('#filmKind');
  const filmRoles = $('#filmRoles');
  const filmPrev = $('#filmPrev');
  const filmNext = $('#filmNext');

  const infoEl = $('#infoView');
  const indexListEl = $('#indexList');
  const contactEl = $('#contactView');

  /* ------------------------------------------------------------------------
     1. POPULATE MASTHEAD, PROGRAMME, INFORMATION & CONTACT
     ------------------------------------------------------------------------ */

  if ($('#artistNameWord') && DATA.name) $('#artistNameWord').textContent = DATA.name;
  if ($('#artistRoleTitle') && DATA.roleLine) $('#artistRoleTitle').textContent = DATA.roleLine;
  if ($('#artistRoleLoc') && DATA.location) $('#artistRoleLoc').textContent = DATA.location;

  // Render Bottom-Left Programme List
  listEl.innerHTML = projects
    .map(
      (p, i) => `
      <li>
        <a class="programme-row" href="#/${esc(p.slug)}" data-index="${i}" style="transition-delay: ${state.opening ? i * 28 : 0}ms">
          <i>${pad(i + 1)}</i>
          <span>${esc(p.title)}</span>
        </a>
      </li>`
    )
    .join('');

  const rows = $$('.programme-row', listEl);

  // Render Information Index Table
  if (indexListEl) {
    indexListEl.innerHTML = projects
      .map(
        (p, i) => `
        <li>
          <a href="#/${esc(p.slug)}">
            <span class="index-list__title"><i>${pad(i + 1)}</i><span>${esc(p.title)}</span></span>
            <span class="index-list__kind">${esc(p.kind)}${p.year ? ` (${esc(p.year)})` : ''}</span>
            <span class="index-list__roles">${esc(p.roles)}</span>
            <span class="index-list__watch">Watch film &rarr;</span>
          </a>
        </li>`
      )
      .join('');
  }

  // Render Biography & Facts if provided in DATA.info
  if (DATA.info) {
    if ($('#bioSub') && DATA.info.subtitle) $('#bioSub').textContent = DATA.info.subtitle;
    if ($('#bioBody') && Array.isArray(DATA.info.paragraphs)) {
      $('#bioBody').innerHTML = DATA.info.paragraphs.map((p) => `<p>${p}</p>`).join('');
    }
    if ($('#factsGrid') && Array.isArray(DATA.info.facts)) {
      $('#factsGrid').innerHTML = DATA.info.facts
        .map(
          (col) => `
          <div class="facts">
            <h2>${esc(col.heading)}</h2>
            <ul>
              ${col.items
                .map((it) =>
                  it.href
                    ? `<li><a href="${esc(it.href)}" ${it.external ? 'target="_blank" rel="noopener"' : ''}>${esc(it.label)}</a></li>`
                    : `<li>${esc(it.label)}</li>`
                )
                .join('')}
            </ul>
          </div>`
        )
        .join('');
    }
  }

  // Populate Contact Metadata & Scope Pills
  if ($('#contactArtistHeading') && DATA.name) {
    $('#contactArtistHeading').textContent = `Work with ${DATA.name.split(' ')[0]}`;
  }
  if ($('#copyEmailBtn') && DATA.email) {
    const btn = $('#copyEmailBtn');
    const labelSpan = $('#copyEmailLabel');
    labelSpan.textContent = DATA.email;
    btn.addEventListener('click', () => {
      navigator.clipboard?.writeText(DATA.email).then(() => {
        labelSpan.textContent = 'Copied to clipboard';
        setTimeout(() => {
          labelSpan.textContent = DATA.email;
        }, 2000);
      });
    });
  }

  const scopesContainer = $('#scopePills');
  const scopeInput = $('#contactScopesInput');
  if (scopesContainer && Array.isArray(DATA.contactScopes)) {
    const selected = new Set();
    scopesContainer.innerHTML = DATA.contactScopes
      .map((s) => `<button type="button" class="scope-pill" data-scope="${esc(s)}">${esc(s)}</button>`)
      .join('');

    scopesContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.scope-pill');
      if (!pill) return;
      const val = pill.dataset.scope;
      if (selected.has(val)) {
        selected.delete(val);
        pill.classList.remove('is-selected');
      } else {
        selected.add(val);
        pill.classList.add('is-selected');
      }
      if (scopeInput) scopeInput.value = Array.from(selected).join(', ');
    });
  }

  /* ------------------------------------------------------------------------
     2. PLATE ENGINE (OPENING REEL & HOVER PROJECT STILLS/EXCERPTS)
     ------------------------------------------------------------------------ */

  let currentPlate = null;
  let swapToken = 0;

  function setShade(pair) {
    const [top, bot] = pair || [0.54, 0.64];
    shade.style.setProperty('--shade-top', String(top));
    shade.style.setProperty('--shade-bot', String(bot));
  }

  function buildPlate(item, { isOpening = false } = {}) {
    const el = document.createElement('div');
    el.className = 'plate' + (isOpening && !reduce ? ' is-opening-zoom' : '');
    if (item.focus !== undefined) {
      el.style.setProperty('--fy', String(item.focus));
    }

    if (item.still) {
      const soft = new Image();
      soft.className = 'plate__soft';
      soft.alt = '';
      soft.decoding = 'async';
      soft.src = item.still;
      el.appendChild(soft);

      const still = new Image();
      still.className = 'plate__still';
      still.alt = '';
      still.decoding = 'async';
      still.onload = () => {
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-still')));
      };
      still.src = item.still;
      el.appendChild(still);
    }

    let readyPromise = Promise.resolve();
    if (item.previewMp4 && !reduce) {
      const vid = document.createElement('video');
      vid.className = 'plate__video';
      vid.src = item.previewMp4;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.autoplay = true;
      vid.preload = 'auto';
      vid.setAttribute('muted', '');
      vid.setAttribute('playsinline', '');
      if (item.still) vid.poster = item.still;

      readyPromise = new Promise((resolve) => {
        const onPlay = () => {
          el.classList.add('is-playing');
          resolve();
        };
        vid.addEventListener('playing', onPlay, { once: true });
        vid.addEventListener('loadeddata', () => vid.play().catch(() => resolve()), { once: true });
        vid.addEventListener('error', () => resolve(), { once: true });
        setTimeout(resolve, 2000);
      });

      el.appendChild(vid);
    }

    platesEl.appendChild(el);
    return { el, item, mountedAt: now(), readyPromise };
  }

  function destroyPlate(p) {
    if (!p || !p.el) return;
    const v = p.el.querySelector('video');
    if (v) {
      v.pause();
      v.removeAttribute('src');
      v.load();
    }
    p.el.remove();
  }

  function paintProgramme() {
    const i = state.index;
    rows.forEach((r, idx) => {
      const active = idx === i;
      r.classList.toggle('is-on', active);
      if (active) r.setAttribute('aria-current', 'true');
      else r.removeAttribute('aria-current');
    });

    screenEl.classList.toggle('is-live', i >= 0);
    syncPointer();

    const wasOff = cueEl.classList.contains('is-off');
    cueEl.classList.toggle('is-off', i < 0);
    if (i < 0) return;

    const proj = projects[i];
    if (wasOff) cueEl.classList.add('is-instant');
    cueEl.style.setProperty('--i', String(i));
    if (wasOff) {
      void cueEl.offsetHeight;
      cueEl.classList.remove('is-instant');
    }

    cueKind.textContent = proj.kind || '';
    cueRoles.textContent = proj.roles || '';
    cueWatch.href = `#/${proj.slug}`;
  }

  function selectIndex(i, { force = false, isOpening = false } = {}) {
    if (i === state.index && !force) return;
    state.index = i;
    state.lastInput = now();
    paintProgramme();

    const targetItem = i < 0 ? DATA.landing || {} : projects[i];
    // Preload neighbor stills quietly
    if (i >= 0 && N > 1) {
      [1, -1].forEach((dir) => {
        const nb = projects[(i + dir + N) % N];
        if (nb && nb.still) new Image().src = nb.still;
      });
    }

    const token = ++swapToken;
    const commitSwap = () => {
      if (token !== swapToken) return;
      const prev = currentPlate;
      const next = buildPlate(targetItem, { isOpening });
      currentPlate = next;
      requestAnimationFrame(() => next.el.classList.add('is-on'));
      setShade(targetItem.shade);
      if (prev) setTimeout(() => destroyPlate(prev), 80);

      if (!isOpening && state.view === 'home') {
        requestAnimationFrame(() => {
          veil.classList.remove('is-fast');
          veil.classList.add('is-open');
        });
      }
    };

    if (!currentPlate || isOpening || reduce) {
      commitSwap();
      if (reduce && state.view === 'home') veil.classList.add('is-open');
    } else {
      veil.classList.add('is-fast');
      veil.classList.remove('is-open');
      setTimeout(commitSwap, 165);
    }
  }

  const stepProject = (dir) => {
    if (!N) return;
    const next = state.index < 0 ? (dir > 0 ? 0 : N - 1) : (state.index + dir + N) % N;
    selectIndex(next);
  };

  /* ------------------------------------------------------------------------
     3. POINTER, HOVER INTENT, WHEEL & KEYBOARD CONTROLS
     ------------------------------------------------------------------------ */

  let pointerInside = false;
  function syncPointer() {
    if (!pointerEl || !fine) return;
    const show = pointerInside && state.view === 'home' && state.index >= 0 && !state.opening;
    pointerEl.classList.toggle('is-on', show);
  }

  if (fine && pointerEl) {
    screenEl.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      pointerInside = true;
      pointerEl.style.left = `${e.clientX}px`;
      pointerEl.style.top = `${e.clientY}px`;
      syncPointer();
    });
    screenEl.addEventListener('pointerleave', () => {
      pointerInside = false;
      syncPointer();
    });
  }

  const markTouch = () => {
    state.lastInput = now();
  };
  window.addEventListener('pointerdown', (e) => {
    state.touch = e.pointerType === 'touch';
    markTouch();
  }, true);
  window.addEventListener('pointermove', markTouch, { passive: true });

  // Hover intent on programme rows
  rows.forEach((row, i) => {
    let hoverTimer = 0;
    row.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch' || state.opening) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => selectIndex(i), 95);
    });
    row.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
    row.addEventListener('focus', () => {
      if (!state.opening && row.matches(':focus-visible')) selectIndex(i);
    });
    // Touch devices: first tap previews still + cue bar, second tap opens film
    row.addEventListener('click', (e) => {
      if (state.touch && state.index !== i) {
        e.preventDefault();
        selectIndex(i);
      }
    });
  });

  listEl.addEventListener('pointerenter', () => { state.overList = true; });
  listEl.addEventListener('pointerleave', () => { state.overList = false; });

  // Click live cinema screen to watch active project (or step into 01)
  let downPt = null;
  screenEl.addEventListener('pointerdown', (e) => {
    downPt = { x: e.clientX, y: e.clientY };
  });
  screenEl.addEventListener('pointerup', (e) => {
    const d = downPt;
    downPt = null;
    if (!d || state.view !== 'home' || state.opening) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (e.pointerType === 'touch' && Math.abs(dy) > 44 && Math.abs(dy) > Math.abs(dx)) {
      stepProject(dy < 0 ? 1 : -1);
      return;
    }
    if (Math.abs(dx) + Math.abs(dy) > 10) return;
    if (state.index >= 0) {
      location.hash = `#/${projects[state.index].slug}`;
    } else {
      stepProject(1);
    }
  });

  // Wheel steps through credits on Home view
  let wheelAcc = 0;
  let lastWheel = 0;
  let lastStep = 0;
  window.addEventListener(
    'wheel',
    (e) => {
      markTouch();
      if (state.view !== 'home') return;
      e.preventDefault();
      if (state.opening) return;
      const t = now();
      if (t - lastWheel > 160) wheelAcc = 0;
      lastWheel = t;
      if (t - lastStep < 620) return;
      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) >= 48) {
        stepProject(wheelAcc > 0 ? 1 : -1);
        wheelAcc = 0;
        lastStep = t;
      }
    },
    { passive: false }
  );

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    markTouch();
    if (e.target.closest('input, textarea, select')) {
      if (e.key === 'Escape') e.target.blur();
      return;
    }
    if (e.key === 'Escape' && state.view !== 'home') {
      location.hash = '#/';
      return;
    }
    if (state.view === 'film') {
      if (e.key === 'ArrowRight') location.hash = `#/${projects[(state.index + 1) % N].slug}`;
      if (e.key === 'ArrowLeft') location.hash = `#/${projects[(state.index - 1 + N) % N].slug}`;
      return;
    }
    if (state.view !== 'home' || state.opening || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      stepProject(1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      stepProject(-1);
    } else if (e.key === 'Enter' && state.index >= 0 && (!document.activeElement || document.activeElement === document.body)) {
      location.hash = `#/${projects[state.index].slug}`;
    }
  });

  // Reset to opening loop if user clicks Artist Name or Work while already on Home
  $$('a[href="#/"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (state.view === 'home' && state.index >= 0) {
        e.preventDefault();
        selectIndex(-1);
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. IDLE AUTO-ADVANCE & PROGRESS BAR
     ------------------------------------------------------------------------ */

  let barVal = 0;
  function tickProgress() {
    const t = now();
    let prog = 0;
    const armed =
      state.view === 'home' &&
      !state.opening &&
      !reduce &&
      !document.hidden &&
      !state.overList &&
      currentPlate &&
      N > 0;

    if (armed) {
      const dwell = state.index < 0 ? DWELL_OPEN : DWELL_ITEM;
      const from = Math.max(currentPlate.mountedAt, state.lastInput);
      prog = (t - from) / dwell;
      if (prog >= 1) {
        prog = 0;
        selectIndex((state.index + 1) % N);
      }
    }

    barVal = prog >= barVal ? prog : barVal + (prog - barVal) * 0.22;
    if (barVal < 0.001) barVal = 0;
    if (cueBar) cueBar.style.transform = `scaleX(${Math.min(1, barVal).toFixed(4)})`;
    requestAnimationFrame(tickProgress);
  }
  requestAnimationFrame(tickProgress);

  /* ------------------------------------------------------------------------
     5. FILM PLAYER, INFORMATION & CONTACT ROUTING
     ------------------------------------------------------------------------ */

  function mountFilm(proj, idx) {
    filmNo.textContent = pad(idx + 1);
    filmTitle.textContent = proj.title;
    filmKind.textContent = `${proj.kind || ''}${proj.year ? ` (${proj.year})` : ''}`;
    filmRoles.textContent = proj.roles || '';
    filmPrev.href = `#/${projects[(idx - 1 + N) % N].slug}`;
    filmNext.href = `#/${projects[(idx + 1) % N].slug}`;

    if (proj.youtube) {
      const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(proj.youtube)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      filmFrame.innerHTML = `<iframe src="${src}" title="${esc(proj.title)}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;
    } else if (proj.vimeo) {
      const src = `https://player.vimeo.com/video/${encodeURIComponent(proj.vimeo)}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
      filmFrame.innerHTML = `<iframe src="${src}" title="${esc(proj.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else if (proj.videoUrl) {
      filmFrame.innerHTML = `<video src="${esc(proj.videoUrl)}" ${proj.still ? `poster="${esc(proj.still)}"` : ''} controls autoplay playsinline></video>`;
    } else {
      filmFrame.innerHTML = `
        <div class="film__placeholder">
          ${proj.still ? `<img src="${esc(proj.still)}" alt="">` : ''}
          <div class="film__placeholder-copy">
            <strong>${esc(proj.placeholderNote || 'Selected Reel & Project Cut — Coming Soon')}</strong>
            <span>${esc(DATA.name)} &middot; Pylon Pictures</span>
          </div>
        </div>`;
    }

    document.title = `${proj.title} — ${DATA.name} — PYLON PICTURES`;
  }

  let finishOpening = () => {};

  function showView(nextView, projIdx = -1) {
    const prevView = state.view;
    state.view = nextView;
    document.body.dataset.view = nextView;

    // Highlight active masthead tab
    const activeTab =
      nextView === 'information'
        ? 'information'
        : nextView === 'contact'
        ? 'contact'
        : 'work';

    $$('.mast-nav a[data-nav]').forEach((a) => {
      a.classList.toggle('is-on', a.dataset.nav === activeTab);
    });

    if (nextView !== 'film') {
      filmFrame.innerHTML = '';
    }

    syncPointer();

    if (nextView === 'home') {
      document.title = BASE_TITLE;
      if (!currentPlate) {
        selectIndex(state.index, { force: true, isOpening: state.opening });
      } else if (!state.opening) {
        veil.classList.remove('is-fast');
        veil.classList.add('is-open');
        const vid = currentPlate.el.querySelector('video');
        if (vid && vid.paused) vid.play().catch(() => {});
      }
      return;
    }

    // Leaving Home view: end opening animation immediately & pause background video if entering Film
    finishOpening();
    if (currentPlate) {
      const vid = currentPlate.el.querySelector('video');
      if (vid && nextView === 'film') vid.pause();
      else if (vid && vid.paused && !reduce) vid.play().catch(() => {});
    }

    if (nextView === 'film') {
      state.index = projIdx;
      paintProgramme();
      mountFilm(projects[projIdx], projIdx);
    } else if (nextView === 'information') {
      document.title = `Information — ${DATA.name} — PYLON PICTURES`;
      if (prevView !== 'information' && infoEl) infoEl.scrollTop = 0;
    } else if (nextView === 'contact') {
      document.title = `Contact — ${DATA.name} — PYLON PICTURES`;
      if (prevView !== 'contact' && contactEl) contactEl.scrollTop = 0;
    }
  }

  function route() {
    const hash = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    if (hash === 'information') return showView('information');
    if (hash === 'contact') return showView('contact');
    const idx = projects.findIndex((p) => p.slug === hash);
    if (idx >= 0) return showView('film', idx);
    return showView('home');
  }

  window.addEventListener('hashchange', route);

  const toTopBtn = $('#toTopBtn');
  if (toTopBtn && infoEl) {
    toTopBtn.addEventListener('click', () => {
      infoEl.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     6. IN-SITE CONTACT FORM SUBMISSION
     ------------------------------------------------------------------------ */

  const contactForm = $('#portfolioContactForm');
  const contactStatus = $('#contactStatus');
  const contactSubmit = $('#contactSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!DATA.formEndpoint) return;

      const fd = new FormData(contactForm);
      if (fd.get('_gotcha')) return; // Honeypot caught bot

      fd.append('artist', DATA.name || '');
      fd.append('artist_email', DATA.email || '');
      fd.append('_subject', `[Pylon Portfolio — ${DATA.name}] Inquiry from ${fd.get('name') || 'Website'}`);

      contactSubmit.disabled = true;
      contactSubmit.textContent = 'Sending...';
      contactStatus.className = 'contact-status';
      contactStatus.textContent = '';

      try {
        const res = await fetch(DATA.formEndpoint, {
          method: 'POST',
          body: fd,
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          contactForm.reset();
          $$('.scope-pill.is-selected').forEach((p) => p.classList.remove('is-selected'));
          if (scopeInput) scopeInput.value = '';
          contactStatus.className = 'contact-status is-success';
          contactStatus.textContent = `Message sent directly to ${DATA.name.split(' ')[0]}. Expect a reply shortly.`;
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        contactStatus.className = 'contact-status is-error';
        contactStatus.textContent = `Could not send right now — copy ${DATA.email} on the left to reach ${DATA.name.split(' ')[0]} directly.`;
      } finally {
        contactSubmit.disabled = false;
        contactSubmit.textContent = 'Send Inquiry';
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. INITIAL BOOT & OPENING SEQUENCE
     ------------------------------------------------------------------------ */

  if (!state.opening) {
    document.body.classList.remove('is-opening');
  }

  route();

  if (state.opening) {
    let done = false;
    const timers = [];

    finishOpening = () => {
      if (done) return;
      done = true;
      state.opening = false;
      state.lastInput = now();
      timers.forEach(clearTimeout);
      veil.classList.remove('is-opening-fade');
      if (state.view === 'home') veil.classList.add('is-open');
      if (currentPlate) currentPlate.el.classList.remove('is-opening-zoom');
      document.body.classList.remove('is-opening');
      rows.forEach((r) => { r.style.transitionDelay = '0ms'; });
      syncPointer();
      // Quietly warm project stills in background cache
      projects.forEach((p) => { if (p.still) new Image().src = p.still; });
    };

    const readyFonts =
      document.fonts && document.fonts.ready
        ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 800))])
        : Promise.resolve();

    readyFonts.then(() => {
      if (done) return;
      const word = $('#artistNameWord');
      if (word) word.style.transform = 'translateY(0)';
    });

    const plateReady = currentPlate ? currentPlate.readyPromise : Promise.resolve();
    Promise.all([plateReady, new Promise((r) => setTimeout(r, 420))]).then(() => {
      if (done) return;
      veil.classList.add('is-opening-fade', 'is-open');
      if (currentPlate) currentPlate.el.classList.remove('is-opening-zoom');

      timers.push(setTimeout(() => document.body.classList.remove('is-opening'), 360));
      timers.push(setTimeout(finishOpening, 2100));
    });

    ['pointerdown', 'keydown', 'wheel'].forEach((evt) => {
      window.addEventListener(evt, finishOpening, { once: true, passive: true });
    });
  } else {
    projects.forEach((p) => { if (p.still) new Image().src = p.still; });
  }
})();
