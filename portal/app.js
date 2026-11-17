/* ==========================================================================
   PYLON PICTURES — BACKSTAGE ROSTER BUILDER (app.js)
   Salted SHA-256 Crew Auth + 7-Step Incremental Builder + Live Page Preview
   ========================================================================== */

(() => {
  'use strict';

  const SALT = 'pylon-pictures-backstage-2026-v1::';
  const STORAGE_PREFIX = 'pylon_portal_v1_';
  const SESSION_KEY = 'pylon_portal_session_v1';

  // Google Apps Script Web App URL tied to Sheet 11UP6yDEN0-DvDxrsiEeVINW_E6orUm4Q70mYz9zKlOo
  // (Works instantaneously via localStorage even before Web App URL is pasted here)
  const CLOUD_ENDPOINT = '';

  const CREW = {
    jackson: {
      name: 'Jackson McMurdo',
      slug: 'jackson-mcmurdo',
      email: 'jackson@pylonpictures.com',
      isAdmin: true,
      hash: '2b5a516723bc4234c818c3105df80a2e65de0c7afb552c7c5865928b7f19c85c',
      defaults: {
        headline: 'Post-Production Supervisor / Lead Colourist / DIT / Sound',
        primaryCraft: 'Colour & Finishing, Editorial, DIT, Production Sound, Motion/Graphics',
        secondaryCraft: 'Cinematography (DP), Camera Dept (1st/2nd AC)',
        gear: 'DaVinci Resolve Studio, Zoom F6 (32-bit Float), Custom Film Emulation CSTs',
        tags: ['Post & Colour', 'DIT', 'Production Sound', '3D / Graphics / Type', 'Cinematographer (DP)', 'Camera / AC'],
        personalSiteUrl: 'https://mukpost.com',
        personalSiteLabel: 'mukpost.com'
      }
    },
    mason: {
      name: 'Mason Cline',
      slug: 'mason-cline',
      email: 'mason@pylonpictures.com',
      hash: 'b2374a01ef8081dbc4a08a46c4e942fd22e357e3ae2ebafc7898bdb4c4b2bb53',
      defaults: {
        headline: 'Director / Photographer / Writer',
        primaryCraft: 'Directing, Photography, Screenwriting',
        secondaryCraft: 'Location Scouting, Editorial, Camera Dept (AC), Producing',
        gear: '',
        tags: ['Director', 'Cinematographer (DP)', 'Photography', 'Writer', 'Editor', 'Camera / AC']
      }
    },
    dario: {
      name: 'Dario Butera',
      slug: 'dario-butera',
      email: 'dario@pylonpictures.com',
      isAdmin: true,
      hash: 'f8652e95fa7a7ecb6bfe73189274a6620dc94212013220ef775c629a9c1741d0',
      defaults: {
        headline: 'Director of Photography / Gaffer',
        primaryCraft: 'Cinematography (DP), Lighting & Gaffer',
        secondaryCraft: 'Camera Dept (1st/2nd AC), Editorial, Colour Grading',
        gear: '',
        tags: ['Cinematographer (DP)', 'Gaffer / Lighting', 'Camera / AC', 'Editor', 'Post & Colour']
      }
    },
    jess: {
      name: 'Jessica Binns',
      slug: 'jessica-binns',
      email: 'jess@pylonpictures.com',
      isAdmin: true,
      hash: 'be59d478f4429822405ae5905cae8c04baeadcce4ecd90dd57ee54b7f638e35b',
      defaults: {
        headline: '3D & Graphics / Fabrication & Props / Production Design / Audio',
        primaryCraft: 'Graphics, 3D Design, Robotics, Projection Mapping, Custom Props',
        secondaryCraft: 'Audio Mixing & Mastering, Production Design, Practical/Gore SFX Makeup',
        gear: '',
        tags: ['3D / Graphics / Type', 'Props / Robotics / SFX', 'Production Design', 'Audio Mix / Score']
      }
    },
    declan: {
      name: 'Declan McKenna',
      slug: 'declan-mckenna',
      email: 'declan@pylonpictures.com',
      hash: '55e636edc1d7ebf3ec756d97dd6c8b1b0bdb4c191105e17c116301eeac037658',
      defaults: {
        headline: 'Executive Producer / Producer / Director',
        primaryCraft: 'Executive Producing, Line Producing, Directing',
        secondaryCraft: 'Camera Operating, Lighting & Gaffer, Commercial Bidding',
        gear: '',
        tags: ['Producer / EP', 'Director', 'Gaffer / Lighting', 'Camera / AC']
      }
    },
    maya: {
      name: 'Maya Chariandy',
      slug: 'maya-chariandy',
      email: 'maya@pylonpictures.com',
      hash: '8b508a8f10c8c895769e816a521cf3c77e681a74fee65515d179593db44ddb6e',
      defaults: {
        headline: 'Director / Writer / Actor / Casting',
        primaryCraft: 'Directing, Screenwriting, Acting, Casting',
        secondaryCraft: 'Documentary DP, Colour Grading, 1st AD, Producing, Editorial',
        gear: '',
        tags: ['Director', 'Writer', 'Acting / Casting', 'Cinematographer (DP)', 'Post & Colour', '1st AD']
      }
    },
    jordan: {
      name: 'Jordan Wong',
      slug: 'jordan-wong',
      email: 'jordan@pylonpictures.com',
      hash: '6ddc09d46e57c20e36c814a6700b075bcf13d539be79d4008c7150ab99d741bf',
      defaults: {
        headline: 'Director / Writer / Actor / Creative Producer',
        primaryCraft: 'Directing, Screenwriting, Acting, Creative Pitching',
        secondaryCraft: 'Producing, Storyboarding & Drawing, Production Design, Casting',
        gear: '',
        tags: ['Director', 'Writer', 'Acting / Casting', 'Producer / EP', 'Production Design']
      }
    },
    dickson: {
      name: 'Dickson Ntiamoah',
      slug: 'dickson-ntiamoah',
      email: 'dickson@pylonpictures.com',
      hash: 'cbca271c0e4174e3dfd5f7872fd12eef7972d6f320ed44eea4901c41f0939f61',
      defaults: {
        headline: 'Costume Design & Styling / Production Design / Apparel',
        primaryCraft: 'Costume Design & Styling, Screenprinting & Textile Fabrication',
        secondaryCraft: 'Production Design, Acting, Lighting & Gaffer',
        gear: '',
        tags: ['Costume & Styling', 'Production Design', 'Gaffer / Lighting', 'Acting / Casting']
      }
    },
    daniel: {
      name: 'Daniel Fusco',
      slug: 'daniel-fusco',
      email: 'daniel@pylonpictures.com',
      hash: 'ed953a80ae6f8f56fb725b2c518971d17d5226e47c7fb02ff96dc34ed47a376b',
      defaults: {
        headline: 'Director / Typography & Design / Writer',
        primaryCraft: 'Directing, Typography, Illustration & Drawing, Screenwriting',
        secondaryCraft: 'Cinematography (DP), Acting, Graphics, Editorial, Gaffer',
        gear: '',
        tags: ['Director', '3D / Graphics / Type', 'Writer', 'Cinematographer (DP)', 'Editor', 'Gaffer / Lighting', 'Acting / Casting']
      }
    },
    misan: {
      name: 'Misan Edema',
      slug: 'misan-edema',
      email: 'misan@pylonpictures.com',
      hash: 'fcb963fdd03693fb9020c3e167e84037c4aefbd3aa624c13de857e7a3d8b8a53',
      defaults: {
        headline: 'Producer / Client & Grant Strategy / Director / DP',
        primaryCraft: 'Producing, Client & Resource Sourcing, Production Grants',
        secondaryCraft: '1st AD, Directing, Marketing, Cinematography, Photography, Writing',
        gear: '',
        tags: ['Producer / EP', '1st AD', 'Director', 'Cinematographer (DP)', 'Photography', 'Writer']
      }
    },
    justin: {
      name: 'Justin Tan',
      slug: 'justin-tan',
      email: 'justin@pylonpictures.com',
      hash: '2083729a61432c7217625646a9715ffae8a315452bca0a0ad545f6feb9f113ce',
      defaults: {
        headline: 'Producer / Operations & Finance Strategy',
        primaryCraft: 'Line & Creative Producing, Budgeting & Production Strategy',
        secondaryCraft: 'Institutional & Arts Grant Research, Deliverables & Scheduling',
        gear: '',
        tags: ['Producer / EP']
      }
    }
  };

  const ALL_FILTER_TAGS = [
    'Director',
    'Cinematographer (DP)',
    'Producer / EP',
    '1st AD',
    'Writer',
    'Editor',
    'Post & Colour',
    'DIT',
    'Production Sound',
    'Audio Mix / Score',
    'Production Design',
    'Costume & Styling',
    '3D / Graphics / Type',
    'Props / Robotics / SFX',
    'Photography',
    'Gaffer / Lighting',
    'Camera / AC',
    'Acting / Casting'
  ];

  const CUSTOM_MODULES = [
    'Video Showreel / Montage Player',
    'Stills / Photography Masonry Grid',
    'Before & After Colour / VFX Slider',
    'Audio / Score / Mix Stem Player',
    'Garment / Apparel / Props Lookbook',
    'Typography / Storyboard / Sketch Strip'
  ];

  const STEPS = [
    {
      id: 'identity',
      num: '01',
      label: 'Identity & Bio',
      title: 'Identity, Headline & Bio',
      desc: 'How your name, role headline, and artist bio appear at the top of your official Pylon Pictures page.'
    },
    {
      id: 'craft',
      num: '02',
      label: 'Craft, Tags & Kit',
      title: 'Roles, Roster Filters & Kit',
      desc: 'We pre-loaded your skills from Maya’s sheet — tweak how clients filter for you and list any signature gear, software, or mediums.'
    },
    {
      id: 'reel',
      num: '03',
      label: 'Reel, Hero & Marks',
      title: 'Showreel, Hero Visual & Loader Mark',
      desc: 'Pick what plays at the top of your page, drop your portrait link, and share any Pylon logo variation sketch for the site intro loader.'
    },
    {
      id: 'projects',
      num: '04',
      label: 'Film & Work Credits',
      title: 'Selected Works & Credits',
      desc: 'Add both Pylon projects and standout personal/external credits you want showcased on your profile. Star your top 3.'
    },
    {
      id: 'stills',
      num: '05',
      label: 'Stills, Art & BTS',
      title: 'Stills Gallery, Process BTS & Laurels',
      desc: 'Drop Drive folders for standalone photography, design, garments, 3D/props, BTS shots of you on set, and festival laurels.'
    },
    {
      id: 'links',
      num: '06',
      label: 'Websites & Socials',
      title: 'External Websites, Socials & Contact',
      desc: 'Link out to your personal portfolio website, Instagram, Vimeo/YouTube, IMDb, Spotify/Bandcamp, or design profiles.'
    },
    {
      id: 'vibe',
      num: '07',
      label: 'Page Vibe & Archive',
      title: 'Custom Sections, Inspo & Hard-Drive Check',
      desc: 'Tell Jess, Dario & Jackson any special interactive modules you want on your page, plus any Pylon project drives at your place.'
    }
  ];

  let loggedInUser = null;
  let activeMemberKey = null;
  let currentStepIdx = 0;
  let state = null;
  let toastTimer = null;

  /* ------------------------------------------------------------------------
     CRYPTO & STATE HELPERS
     ------------------------------------------------------------------------ */

  async function sha256Hex(str) {
    const buf = new TextEncoder().encode(str);
    const digest = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  function normalizeUsername(raw) {
    const clean = (raw || '').trim().toLowerCase().replace(/\s+/g, '');
    if (clean === 'jessica') return 'jess';
    if (clean === 'fusco') return 'daniel';
    return clean;
  }

  function createEmptyProject() {
    return {
      id: 'proj_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      title: '',
      category: 'Commercial / Spec',
      year: '2026',
      banner: 'Pylon Production',
      role: '',
      clientOrArtist: '',
      watchUrl: '',
      stillsDriveUrl: '',
      hoverTimecode: '',
      laurels: '',
      featured: true
    };
  }

  function buildInitialState(memberKey) {
    const m = CREW[memberKey];
    const d = m.defaults || {};
    return {
      memberKey,
      updatedAt: null,
      displayName: m.name,
      pronouns: '',
      basedIn: 'Toronto, ON',
      headline: d.headline || '',
      logline: '',
      bio: '',
      bioPolishPref: 'polish',
      tags: Array.isArray(d.tags) ? [...d.tags] : [],
      primaryCraft: d.primaryCraft || '',
      secondaryCraft: d.secondaryCraft || '',
      gear: d.gear || '',
      unionAndCerts: '',
      reelUrl: '',
      needReelCutHelp: false,
      heroType: 'video-loop',
      heroSourceUrl: '',
      heroTimecode: '',
      portraitDriveUrl: '',
      portraitNotes: '',
      loaderLogoDriveUrl: '',
      projects: [createEmptyProject()],
      standaloneGalleryDriveUrl: '',
      btsDriveUrl: '',
      awardsAndPress: '',
      personalSiteUrl: d.personalSiteUrl || '',
      personalSiteLabel: d.personalSiteLabel || '',
      instagramUrl: '',
      videoChannelUrl: '',
      imdbOrLetterboxdUrl: '',
      otherLinks: '',
      contactPref: 'direct',
      bookingNote: '',
      customModules: ['Video Showreel / Montage Player', 'Stills / Photography Masonry Grid'],
      referenceLinks: '',
      hardDrivesHeld: '',
      notesForTechTeam: ''
    };
  }

  function loadLocalState(memberKey) {
    const base = buildInitialState(memberKey);
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + memberKey);
      if (!raw) return base;
      const parsed = JSON.parse(raw);
      return {
        ...base,
        ...parsed,
        projects: Array.isArray(parsed.projects) && parsed.projects.length
          ? parsed.projects
          : base.projects
      };
    } catch (_) {
      return base;
    }
  }

  function saveLocalState() {
    if (!activeMemberKey || !state) return;
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_PREFIX + activeMemberKey, JSON.stringify(state));
    const t = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setStatus(`Saved locally · ${t}`, false);
    updateReadinessAndNav();
    renderLivePreview();
  }

  async function syncToCloud(showToastMsg = true) {
    saveLocalState();
    if (!CLOUD_ENDPOINT) {
      if (showToastMsg) showToast('Draft saved in browser (Cloud Sheet link ready to attach)');
      return;
    }
    try {
      setStatus('Syncing to Pylon Sheet...', true);
      await fetch(CLOUD_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'upsert',
          username: activeMemberKey,
          fullName: CREW[activeMemberKey].name,
          stepsCompleted: `${countCompletedSteps(state)}/${STEPS.length}`,
          readinessPct: computeReadinessPct(state),
          payload: state
        })
      });
      const t = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      setStatus(`Synced to Pylon Sheet · ${t}`, false);
      if (showToastMsg) showToast('Synced to Pylon Web Team');
    } catch (err) {
      setStatus('Saved locally (offline)', false);
      if (showToastMsg) showToast('Saved locally on this device');
    }
  }

  async function tryFetchCloudDraft(memberKey) {
    if (!CLOUD_ENDPOINT) return;
    try {
      const res = await fetch(`${CLOUD_ENDPOINT}?username=${encodeURIComponent(memberKey)}`);
      if (!res.ok) return;
      const json = await res.json();
      if (json && json.payload && json.payload.updatedAt) {
        const local = loadLocalState(memberKey);
        if (!local.updatedAt || json.payload.updatedAt > local.updatedAt) {
          localStorage.setItem(STORAGE_PREFIX + memberKey, JSON.stringify(json.payload));
          if (activeMemberKey === memberKey) {
            state = loadLocalState(memberKey);
            renderCurrentStep();
            updateReadinessAndNav();
            renderLivePreview();
            setStatus('Loaded latest cloud draft', false);
          }
        }
      }
    } catch (_) {
      // Silent fallback to local state
    }
  }

  /* ------------------------------------------------------------------------
     COMPLETION & STEP STATUS LOGIC
     ------------------------------------------------------------------------ */

  function isStepComplete(stepId, s) {
    if (!s) return false;
    switch (stepId) {
      case 'identity':
        return Boolean(s.displayName.trim() && s.headline.trim() && s.bio.trim().length >= 25);
      case 'craft':
        return Boolean(s.primaryCraft.trim() && s.tags.length > 0);
      case 'reel':
        return Boolean(s.reelUrl.trim() || s.needReelCutHelp || s.portraitDriveUrl.trim() || s.heroSourceUrl.trim());
      case 'projects':
        return s.projects.some((p) => p.title && p.title.trim() && p.role && p.role.trim());
      case 'stills':
        return Boolean(s.standaloneGalleryDriveUrl.trim() || s.btsDriveUrl.trim() || s.awardsAndPress.trim());
      case 'links':
        return Boolean(s.personalSiteUrl.trim() || s.instagramUrl.trim() || s.videoChannelUrl.trim() || s.imdbOrLetterboxdUrl.trim() || s.otherLinks.trim());
      case 'vibe':
        return Boolean(s.referenceLinks.trim() || s.hardDrivesHeld.trim() || s.notesForTechTeam.trim());
      default:
        return false;
    }
  }

  function countCompletedSteps(s) {
    return STEPS.filter((st) => isStepComplete(st.id, s)).length;
  }

  function computeReadinessPct(s) {
    return Math.round((countCompletedSteps(s) / STEPS.length) * 100);
  }

  /* ------------------------------------------------------------------------
     UI RENDERING
     ------------------------------------------------------------------------ */

  function esc(val) {
    return String(val ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setStatus(text, syncing) {
    document.getElementById('statusText').textContent = text;
    document.getElementById('statusDot').classList.toggle('syncing', Boolean(syncing));
  }

  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-shown'), 2400);
  }

  function updateReadinessAndNav() {
    const pct = computeReadinessPct(state);
    document.getElementById('readinessPct').textContent = `${pct}%`;
    document.getElementById('readinessFill').style.width = `${pct}%`;

    const nav = document.getElementById('stepNav');
    nav.innerHTML = STEPS.map((st, idx) => {
      const active = idx === currentStepIdx ? 'is-active' : '';
      const done = isStepComplete(st.id, state) ? 'is-done' : '';
      return `
        <li>
          <button type="button" class="step-btn ${active} ${done}" data-step="${idx}">
            <span class="step-btn-left">
              <span class="step-num">${st.num}</span>
              <span class="step-label">${esc(st.label)}</span>
            </span>
            <span class="step-check">DONE</span>
          </button>
        </li>
      `;
    }).join('');

    nav.querySelectorAll('.step-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        currentStepIdx = Number(btn.dataset.step);
        renderCurrentStep();
        updateReadinessAndNav();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function renderLivePreview() {
    const m = CREW[activeMemberKey];
    document.getElementById('liveSiteLink').href = `../roster/${m.slug}.html`;
    document.getElementById('mockUrl').textContent = `pylonpictures.com/roster/${m.slug}`;
    document.getElementById('mockName').textContent = state.displayName || m.name;
    document.getElementById('mockHeadline').textContent = state.headline || 'Filmmaker';

    const logEl = document.getElementById('mockLogline');
    if (state.logline && state.logline.trim()) {
      logEl.hidden = false;
      logEl.textContent = state.logline.trim();
    } else {
      logEl.hidden = true;
    }

    document.getElementById('mockBio').textContent = state.bio.trim()
      ? state.bio.trim()
      : 'Your artist bio will appear right here as you type...';

    document.getElementById('mockPrimary').textContent = state.primaryCraft || '—';
    document.getElementById('mockSecondary').textContent = state.secondaryCraft || '—';
    document.getElementById('mockGear').textContent = state.gear || '—';
    document.getElementById('mockContact').textContent =
      state.contactPref === 'studio' ? 'contact@pylonpictures.com' : m.email;

    // External link chips
    const chips = [];
    if (state.personalSiteUrl.trim()) {
      chips.push(state.personalSiteLabel.trim() || 'Website ↗');
    }
    if (state.instagramUrl.trim()) chips.push('Instagram ↗');
    if (state.videoChannelUrl.trim()) chips.push('Reel / Vimeo ↗');
    if (state.imdbOrLetterboxdUrl.trim()) chips.push('IMDb ↗');
    if (state.otherLinks.trim()) chips.push('More Links ↗');
    document.getElementById('mockLinks').innerHTML = chips
      .map((c) => `<span class="mock-link-chip">${esc(c)}</span>`)
      .join('');

    // Featured credits
    const filledProjects = state.projects.filter((p) => p.title && p.title.trim());
    document.getElementById('mockWorksCount').textContent = String(filledProjects.length);
    const listEl = document.getElementById('mockWorksList');
    if (!filledProjects.length) {
      listEl.innerHTML = `<div class="helper">Add films, commercials, music videos or design projects in Step 04.</div>`;
    } else {
      const sorted = [...filledProjects].sort((a, b) => Number(b.featured) - Number(a.featured));
      listEl.innerHTML = sorted.map((p) => `
        <div class="mock-work-row">
          <strong>${p.featured ? '★ ' : ''}${esc(p.title)} ${p.year ? `(${esc(p.year)})` : ''}</strong>
          <span>${esc(p.role || p.category)}</span>
        </div>
      `).join('');
    }
  }

  function bindFieldInputs(container) {
    container.querySelectorAll('[data-field]').forEach((el) => {
      const key = el.dataset.field;
      const evt = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evt, () => {
        state[key] = el.type === 'checkbox' ? el.checked : el.value;
        if (key === 'bio') {
          const wc = document.getElementById('bioWordCount');
          if (wc) {
            const words = state.bio.trim() ? state.bio.trim().split(/\s+/).length : 0;
            wc.textContent = `${words} words (sweet spot: 50–130 words)`;
          }
        }
        saveLocalState();
      });
    });
  }

  function renderCurrentStep() {
    const st = STEPS[currentStepIdx];
    document.getElementById('stepKicker').textContent = `Step ${st.num} of 0${STEPS.length} · ${CREW[activeMemberKey].name}`;
    document.getElementById('stepTitle').textContent = st.title;
    document.getElementById('stepDesc').textContent = st.desc;

    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    prevBtn.style.visibility = currentStepIdx === 0 ? 'hidden' : 'visible';
    nextBtn.innerHTML = currentStepIdx === STEPS.length - 1
      ? 'Submit &amp; Sync Profile &rarr;'
      : 'Save &amp; Next Step &rarr;';

    const body = document.getElementById('stepBody');

    if (st.id === 'identity') {
      const words = state.bio.trim() ? state.bio.trim().split(/\s+/).length : 0;
      body.innerHTML = `
        <div class="grid-3">
          <div class="field">
            <label>Display / Credit Name</label>
            <input class="input" data-field="displayName" value="${esc(state.displayName)}" placeholder="Full credit name">
          </div>
          <div class="field">
            <label>Pronouns <span class="hint-inline">Optional</span></label>
            <input class="input" data-field="pronouns" value="${esc(state.pronouns)}" placeholder="e.g. he/him, she/her, they/them">
          </div>
          <div class="field">
            <label>Home Base</label>
            <input class="input" data-field="basedIn" value="${esc(state.basedIn)}" placeholder="Toronto, ON">
          </div>
        </div>

        <div class="field">
          <label>Hero Role Headline <span class="hint-inline">Shown in orange directly under your name</span></label>
          <input class="input" data-field="headline" value="${esc(state.headline)}" placeholder="e.g. Director / Photographer / Writer">
        </div>

        <div class="field">
          <label>One-Sentence Positioning / Logline <span class="hint-inline">Optional punchy opener</span></label>
          <input class="input" data-field="logline" value="${esc(state.logline)}" placeholder="e.g. Toronto director and writer crafting kinetic narrative shorts and tactile commercial worlds.">
        </div>

        <div class="field">
          <label>Artist / Filmmaker Bio <span class="hint-inline" id="bioWordCount">${words} words (sweet spot: 50–130 words)</span></label>
          <textarea class="textarea" rows="6" data-field="bio" placeholder="Write 2–4 sentences about what you make, the visual/sonic/story sensibility you bring to set, favourite collaborations, or background. Bullet points or rough notes are totally fine too if you want us to tighten the prose!">${esc(state.bio)}</textarea>
          <p class="helper">Stuck? Answer: (1) What crafts are you most obsessed with right now? (2) What kind of tone/stories draw you in? (3) Any standout projects, festivals, or background worth mentioning?</p>
        </div>

        <div class="field">
          <label>Editorial Copy Preference</label>
          <select class="select" data-field="bioPolishPref">
            <option value="polish" ${state.bioPolishPref === 'polish' ? 'selected' : ''}>Feel free to tighten / copy-edit my bio to match the Pylon site voice</option>
            <option value="verbatim" ${state.bioPolishPref === 'verbatim' ? 'selected' : ''}>Keep my exact wording verbatim (check with me before changing)</option>
            <option value="draft-from-bullets" ${state.bioPolishPref === 'draft-from-bullets' ? 'selected' : ''}>I wrote rough bullet points above — please draft a clean bio for me to approve</option>
          </select>
        </div>
      `;
      bindFieldInputs(body);
    }

    else if (st.id === 'craft') {
      body.innerHTML = `
        <div class="field">
          <label>Website Roster Filter Tags <span class="hint-inline">Click to toggle which filters show your name on pylonpictures.com</span></label>
          <div class="pill-grid" id="tagPillGrid">
            ${ALL_FILTER_TAGS.map((tag) => `
              <button type="button" class="pill ${state.tags.includes(tag) ? 'is-on' : ''}" data-tag="${esc(tag)}">${esc(tag)}</button>
            `).join('')}
          </div>
        </div>

        <div class="field">
          <label>Primary Craft Line <span class="hint-inline">Your main disciplines on your profile card</span></label>
          <input class="input" data-field="primaryCraft" value="${esc(state.primaryCraft)}" placeholder="e.g. Cinematography (DP), Lighting & Gaffer">
        </div>

        <div class="field">
          <label>Additional / Supporting Disciplines</label>
          <input class="input" data-field="secondaryCraft" value="${esc(state.secondaryCraft)}" placeholder="e.g. 1st/2nd AC, Editorial, Colour Grading">
        </div>

        <div class="field">
          <label>Signature Gear, Software, Mediums or Formats <span class="hint-inline">Optional — great for EPs &amp; agencies</span></label>
          <input class="input" data-field="gear" value="${esc(state.gear)}" placeholder="e.g. 16mm/35mm, ARRI/FX6, DaVinci Resolve, Blender, TouchDesigner, Screenprinting, Zoom F6">
        </div>

        <div class="field">
          <label>Unions, Certifications or Set Credentials <span class="hint-inline">Optional (internal + EP reference)</span></label>
          <input class="input" data-field="unionAndCerts" value="${esc(state.unionAndCerts)}" placeholder="e.g. Non-Union, ACTRA Apprentice, Drone RPAS Cert, Full G Driver's License">
        </div>
      `;
      bindFieldInputs(body);
      body.querySelectorAll('[data-tag]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const t = btn.dataset.tag;
          if (state.tags.includes(t)) {
            state.tags = state.tags.filter((x) => x !== t);
            btn.classList.remove('is-on');
          } else {
            state.tags.push(t);
            btn.classList.add('is-on');
          }
          saveLocalState();
        });
      });
    }

    else if (st.id === 'reel') {
      body.innerHTML = `
        <div class="field">
          <label>Personal Showreel / Montage Link <span class="hint-inline">Vimeo, YouTube, or Google Drive ProRes/H.264</span></label>
          <input class="input" data-field="reelUrl" value="${esc(state.reelUrl)}" placeholder="https://vimeo.com/... or Google Drive link">
        </div>

        <div class="field">
          <label style="justify-content:flex-start; gap:10px; cursor:pointer; color:var(--white);">
            <input type="checkbox" data-field="needReelCutHelp" ${state.needReelCutHelp ? 'checked' : ''}>
            <span>I don't have a standalone reel yet — let's pull my best shots from Pylon projects instead</span>
          </label>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>Top-of-Page Hero Style</label>
            <select class="select" data-field="heroType">
              <option value="video-loop" ${state.heroType === 'video-loop' ? 'selected' : ''}>Silent 10–15s Looping Video Clip</option>
              <option value="still-frame" ${state.heroType === 'still-frame' ? 'selected' : ''}>Signature High-Res Still / Frame Grab</option>
              <option value="minimal-type" ${state.heroType === 'minimal-type' ? 'selected' : ''}>Clean Typography + Portrait Only</option>
            </select>
          </div>
          <div class="field">
            <label>Hero Loop Timecode <span class="hint-inline">If pulling from a film/reel</span></label>
            <input class="input" data-field="heroTimecode" value="${esc(state.heroTimecode)}" placeholder="e.g. 00:42 – 00:56 of Beer League">
          </div>
        </div>

        <div class="field">
          <label>Hero Video / Still Source Link <span class="hint-inline">Drive or video URL</span></label>
          <input class="input" data-field="heroSourceUrl" value="${esc(state.heroSourceUrl)}" placeholder="https://drive.google.com/...">
        </div>

        <div class="field">
          <label>Current Portrait / On-Set Photo of You <span class="hint-inline">Google Drive link (until our Jan 2027 group shoot)</span></label>
          <input class="input" data-field="portraitDriveUrl" value="${esc(state.portraitDriveUrl)}" placeholder="https://drive.google.com/...">
        </div>

        <div class="field">
          <label>Pylon Intro Loader — Personal Logo Sketch / Variation <span class="hint-inline">Optional Drive link</span></label>
          <input class="input" data-field="loaderLogoDriveUrl" value="${esc(state.loaderLogoDriveUrl)}" placeholder="Drop a PNG/SVG/sketch link if you made a custom Pylon mark for the opening flash loader!">
        </div>
      `;
      bindFieldInputs(body);
    }

    else if (st.id === 'projects') {
      renderProjectsStep(body);
    }

    else if (st.id === 'stills') {
      body.innerHTML = `
        <div class="field">
          <label>Standalone Photography, Design, 3D, Props or Styling Folder <span class="hint-inline">Google Drive link</span></label>
          <input class="input" data-field="standaloneGalleryDriveUrl" value="${esc(state.standaloneGalleryDriveUrl)}" placeholder="https://drive.google.com/... (35mm photos, garment lookbooks, 3D renders, typography, props)">
          <p class="helper">Awesome for non-reel visual work — photography series, screenprinted apparel, production design decks, storyboards, robotics/projection builds, or colour grade stills.</p>
        </div>

        <div class="field">
          <label>Behind-the-Scenes (BTS) Photos / Clips of You Working <span class="hint-inline">Google Drive link</span></label>
          <input class="input" data-field="btsDriveUrl" value="${esc(state.btsDriveUrl)}" placeholder="https://drive.google.com/...">
        </div>

        <div class="field">
          <label>Festival Laurels, Awards, Grants, Exhibitions or Press <span class="hint-inline">Optional</span></label>
          <textarea class="textarea" rows="4" data-field="awardsAndPress" placeholder="e.g.&#10;• VFF23 Official Selection — [Film Name]&#10;• Forest City Film Festival Special Jury Prize&#10;• Zine / Gallery / Publication feature">${esc(state.awardsAndPress)}</textarea>
        </div>
      `;
      bindFieldInputs(body);
    }

    else if (st.id === 'links') {
      const m = CREW[activeMemberKey];
      body.innerHTML = `
        <div class="grid-2">
          <div class="field">
            <label>Personal Portfolio Website URL <span class="hint-inline">Optional</span></label>
            <input class="input" data-field="personalSiteUrl" value="${esc(state.personalSiteUrl)}" placeholder="https://yoursite.com">
          </div>
          <div class="field">
            <label>Website Button Label</label>
            <input class="input" data-field="personalSiteLabel" value="${esc(state.personalSiteLabel)}" placeholder="e.g. yoursite.com or Visit Studio">
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>Instagram URL or @Handle</label>
            <input class="input" data-field="instagramUrl" value="${esc(state.instagramUrl)}" placeholder="@handle or https://instagram.com/...">
          </div>
          <div class="field">
            <label>Vimeo / YouTube Channel</label>
            <input class="input" data-field="videoChannelUrl" value="${esc(state.videoChannelUrl)}" placeholder="https://vimeo.com/... or YouTube">
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>IMDb / Letterboxd / LinkedIn</label>
            <input class="input" data-field="imdbOrLetterboxdUrl" value="${esc(state.imdbOrLetterboxdUrl)}" placeholder="https://imdb.com/name/...">
          </div>
          <div class="field">
            <label>Other Links <span class="hint-inline">Spotify, Bandcamp, Behance, Are.na</span></label>
            <input class="input" data-field="otherLinks" value="${esc(state.otherLinks)}" placeholder="Comma-separated links">
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>Public Email Shown on Your Page</label>
            <select class="select" data-field="contactPref">
              <option value="direct" ${state.contactPref === 'direct' ? 'selected' : ''}>Show ${esc(m.email)} directly</option>
              <option value="studio" ${state.contactPref === 'studio' ? 'selected' : ''}>Route inquiries through contact@pylonpictures.com</option>
            </select>
          </div>
          <div class="field">
            <label>Booking / Rep Note <span class="hint-inline">Optional</span></label>
            <input class="input" data-field="bookingNote" value="${esc(state.bookingNote)}" placeholder="e.g. Commercial bookings via Pylon Outreach">
          </div>
        </div>
      `;
      bindFieldInputs(body);
    }

    else if (st.id === 'vibe') {
      body.innerHTML = `
        <div class="field">
          <label>Interactive Sections You'd Love on Your Page <span class="hint-inline">Click any that fit your work</span></label>
          <div class="pill-grid">
            ${CUSTOM_MODULES.map((mod) => `
              <button type="button" class="pill ${state.customModules.includes(mod) ? 'is-on' : ''}" data-mod="${esc(mod)}">${esc(mod)}</button>
            `).join('')}
          </div>
          <p class="helper">All 11 pages share our unified Pylon header &amp; typography, and within the body we can tailor media blocks to fit your craft (video, stills, audio stems, grade sliders, garments, or design).</p>
        </div>

        <div class="field">
          <label>2–3 Favourite Reference Websites, Portfolios or Visual Touchstones <span class="hint-inline">Optional</span></label>
          <textarea class="textarea" rows="3" data-field="referenceLinks" placeholder="Drop any director/DP/designer websites, layouts, or aesthetics you love for inspiration...">${esc(state.referenceLinks)}</textarea>
        </div>

        <div class="field">
          <label>Hard-Drive &amp; Raw Footage Check (For Dario's Master Archive)</label>
          <textarea class="textarea" rows="3" data-field="hardDrivesHeld" placeholder="List any past Pylon shoots where the raw footage, project files, or ProRes masters are currently on a drive at your house (e.g. 'Beer League raw on Samsung T7, Shot Caller selects')...">${esc(state.hardDrivesHeld)}</textarea>
        </div>

        <div class="field">
          <label>Anything Else for Jackson, Jess &amp; Dario?</label>
          <textarea class="textarea" rows="3" data-field="notesForTechTeam" placeholder="Special requests, questions, or assets you're still waiting on...">${esc(state.notesForTechTeam)}</textarea>
        </div>
      `;
      bindFieldInputs(body);
      body.querySelectorAll('[data-mod]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const m = btn.dataset.mod;
          if (state.customModules.includes(m)) {
            state.customModules = state.customModules.filter((x) => x !== m);
            btn.classList.remove('is-on');
          } else {
            state.customModules.push(m);
            btn.classList.add('is-on');
          }
          saveLocalState();
        });
      });
    }
  }

  function renderProjectsStep(body) {
    body.innerHTML = `
      <div class="projects-list" id="projectsList">
        ${state.projects.map((p, idx) => `
          <div class="project-card" data-proj-idx="${idx}">
            <div class="project-card-head">
              <span class="project-index mono">Credit #${String(idx + 1).padStart(2, '0')}</span>
              <div class="project-actions">
                <button type="button" class="star-btn ${p.featured ? 'is-featured' : ''}" data-star="${idx}">
                  ${p.featured ? '★ Featured on Page' : '☆ Feature'}
                </button>
                ${state.projects.length > 1 ? `<button type="button" class="remove-btn" data-remove="${idx}">Remove</button>` : ''}
              </div>
            </div>

            <div class="grid-3">
              <div class="field">
                <label>Project Title</label>
                <input class="input" data-pfield="title" data-idx="${idx}" value="${esc(p.title)}" placeholder="e.g. To Catch a Bear, Beer League">
              </div>
              <div class="field">
                <label>Category</label>
                <select class="select" data-pfield="category" data-idx="${idx}">
                  ${['Commercial / Spec', 'Music Video', 'Narrative Short', 'Documentary', 'Design / 3D / Apparel', 'Photography Series', 'Other'].map((cat) => `
                    <option value="${esc(cat)}" ${p.category === cat ? 'selected' : ''}>${esc(cat)}</option>
                  `).join('')}
                </select>
              </div>
              <div class="field">
                <label>Year</label>
                <input class="input" data-pfield="year" data-idx="${idx}" value="${esc(p.year)}" placeholder="2026">
              </div>
            </div>

            <div class="grid-3">
              <div class="field">
                <label>Your Exact Credit / Role(s)</label>
                <input class="input" data-pfield="role" data-idx="${idx}" value="${esc(p.role)}" placeholder="e.g. Director, Editor / DP / Costume Designer">
              </div>
              <div class="field">
                <label>Client / Artist / Collaborator <span class="hint-inline">Optional</span></label>
                <input class="input" data-pfield="clientOrArtist" data-idx="${idx}" value="${esc(p.clientOrArtist)}" placeholder="e.g. Lady Marge">
              </div>
              <div class="field">
                <label>Banner</label>
                <select class="select" data-pfield="banner" data-idx="${idx}">
                  <option value="Pylon Production" ${p.banner === 'Pylon Production' ? 'selected' : ''}>Pylon Production</option>
                  <option value="Personal / External Credit" ${p.banner === 'Personal / External Credit' ? 'selected' : ''}>Personal / External Credit</option>
                </select>
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>Watch Link <span class="hint-inline">YouTube, Vimeo, or Drive Master</span></label>
                <input class="input" data-pfield="watchUrl" data-idx="${idx}" value="${esc(p.watchUrl)}" placeholder="https://...">
              </div>
              <div class="field">
                <label>Stills / BTS Drive Folder <span class="hint-inline">6–10 stills if you have them</span></label>
                <input class="input" data-pfield="stillsDriveUrl" data-idx="${idx}" value="${esc(p.stillsDriveUrl)}" placeholder="https://drive.google.com/...">
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>Best 3-Second Hover Clip Timecode <span class="hint-inline">Optional</span></label>
                <input class="input" data-pfield="hoverTimecode" data-idx="${idx}" value="${esc(p.hoverTimecode)}" placeholder="e.g. 01:14 – 01:17">
              </div>
              <div class="field">
                <label>Laurels, Festivals or Notes <span class="hint-inline">Optional</span></label>
                <input class="input" data-pfield="laurels" data-idx="${idx}" value="${esc(p.laurels)}" placeholder="e.g. VFF23 Official Selection">
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div>
        <button type="button" class="btn btn-paper" id="addProjectBtn">+ Add Another Film / Project Credit</button>
      </div>
    `;

    body.querySelectorAll('[data-pfield]').forEach((el) => {
      const idx = Number(el.dataset.idx);
      const key = el.dataset.pfield;
      const evt = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evt, () => {
        state.projects[idx][key] = el.value;
        saveLocalState();
      });
    });

    body.querySelectorAll('[data-star]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.star);
        state.projects[idx].featured = !state.projects[idx].featured;
        saveLocalState();
        renderProjectsStep(body);
      });
    });

    body.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.remove);
        state.projects.splice(idx, 1);
        saveLocalState();
        renderProjectsStep(body);
      });
    });

    document.getElementById('addProjectBtn').addEventListener('click', () => {
      state.projects.push(createEmptyProject());
      saveLocalState();
      renderProjectsStep(body);
    });
  }

  /* ------------------------------------------------------------------------
     SESSION & BOOTSTRAP
     ------------------------------------------------------------------------ */

  function openWorkspaceFor(userKey, targetMemberKey) {
    loggedInUser = userKey;
    activeMemberKey = targetMemberKey || userKey;
    currentStepIdx = 0;
    state = loadLocalState(activeMemberKey);

    document.getElementById('loginGate').hidden = true;
    document.getElementById('portalApp').hidden = false;
    document.getElementById('activeCrewChip').textContent = CREW[activeMemberKey].name;

    // Admin switcher for Tech/Web team (Jackson, Dario, Jess)
    const adminSel = document.getElementById('adminMemberSwitch');
    if (CREW[loggedInUser].isAdmin) {
      adminSel.hidden = false;
      adminSel.innerHTML = Object.keys(CREW).map((k) => `
        <option value="${k}" ${k === activeMemberKey ? 'selected' : ''}>
          Admin View: ${CREW[k].name}
        </option>
      `).join('');
    } else {
      adminSel.hidden = true;
    }

    renderCurrentStep();
    updateReadinessAndNav();
    renderLivePreview();
    setStatus('Ready · Auto-saving', false);
    tryFetchCloudDraft(activeMemberKey);
  }

  document.getElementById('pwToggle').addEventListener('click', () => {
    const inp = document.getElementById('loginPass');
    const btn = document.getElementById('pwToggle');
    const isPw = inp.type === 'password';
    inp.type = isPw ? 'text' : 'password';
    btn.textContent = isPw ? 'Hide' : 'Show';
  });

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('loginError');
    errEl.hidden = true;

    const user = normalizeUsername(document.getElementById('loginUser').value);
    const pw = document.getElementById('loginPass').value.trim().toLowerCase();

    if (!CREW[user]) {
      errEl.hidden = false;
      return;
    }

    const digest = await sha256Hex(`${SALT}${user}::${pw}`);
    if (digest !== CREW[user].hash) {
      errEl.hidden = false;
      return;
    }

    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user }));
    openWorkspaceFor(user, user);
  });

  document.getElementById('adminMemberSwitch').addEventListener('change', (e) => {
    openWorkspaceFor(loggedInUser, e.target.value);
  });

  document.getElementById('prevStepBtn').addEventListener('click', () => {
    if (currentStepIdx > 0) {
      currentStepIdx--;
      renderCurrentStep();
      updateReadinessAndNav();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.getElementById('saveStepOnlyBtn').addEventListener('click', () => {
    syncToCloud(true);
  });

  document.getElementById('nextStepBtn').addEventListener('click', async () => {
    await syncToCloud(currentStepIdx === STEPS.length - 1);
    if (currentStepIdx < STEPS.length - 1) {
      currentStepIdx++;
      renderCurrentStep();
      updateReadinessAndNav();
      showToast(`Step 0${currentStepIdx} saved`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Full profile synced to Pylon Web Team');
    }
  });

  document.getElementById('syncNowBtn').addEventListener('click', () => {
    syncToCloud(true);
  });

  document.getElementById('togglePreviewBtn').addEventListener('click', () => {
    const pane = document.getElementById('previewPane');
    const grid = document.getElementById('workspaceGrid');
    const hiding = !pane.hidden;
    pane.hidden = hiding;
    grid.classList.toggle('with-preview', !hiding);
  });

  document.getElementById('exportJsonBtn').addEventListener('click', () => {
    saveLocalState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pylon-portfolio-${CREW[activeMemberKey].slug}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('Downloaded JSON backup');
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    loggedInUser = null;
    activeMemberKey = null;
    document.getElementById('portalApp').hidden = true;
    document.getElementById('loginGate').hidden = false;
    document.getElementById('loginPass').value = '';
  });

  // Restore active tab session if refreshed
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    if (saved && saved.user && CREW[saved.user]) {
      openWorkspaceFor(saved.user, saved.user);
    }
  } catch (_) {}
})();
