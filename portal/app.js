/* ==========================================================================
   PYLON PICTURES — BACKSTAGE ROSTER BUILDER (app.js)
   Salted SHA-256 Crew Auth + 7-Step Cinema Programme Builder + Live Stage
   ========================================================================== */

(() => {
  'use strict';

  const SALT = 'pylon-pictures-backstage-2026-v1::';
  const STORAGE_PREFIX = 'pylon_portal_v1_';
  const SESSION_KEY = 'pylon_portal_session_v1';

  // Google Apps Script Web App URL tied to Sheet 11UP6yDEN0-DvDxrsiEeVINW_E6orUm4Q70mYz9zKlOo
  const CLOUD_ENDPOINT = '';

  const FALLBACK_STILLS = [
    '../assets/images/still-01.jpg',
    '../assets/images/still-02.jpg',
    '../assets/images/still-03.jpg',
    '../assets/images/still-04.jpg',
    '../assets/images/still-05.jpg',
    '../assets/images/still-06.jpg',
    '../assets/images/still-08.jpg',
    '../assets/images/still-09.jpg',
    '../assets/images/still-10.jpg'
  ];

  const CREW = {
    jackson: {
      name: 'Jackson McMurdo',
      slug: 'jackson-mcmurdo',
      email: 'jackson@pylonpictures.com',
      isAdmin: true,
      hash: '2b5a516723bc4234c818c3105df80a2e65de0c7afb552c7c5865928b7f19c85c',
      defaults: {
        headline: 'Post & Colour · DIT · Sound',
        infoSubtitle: 'Head of Operations & Post Supervisor · Pylon Pictures',
        bio: "Jackson McMurdo is a Toronto-based post-production supervisor, lead colourist, editor, and re-recording mixer. At Pylon Pictures, he oversees technical workflows from on-set camera and DIT management through offline editorial, DaVinci Wide Gamut colour pipelines, sound design, and final master delivery.\n\nTrained at Toronto Metropolitan University (BFA Film Studies, '26) and founder of independent Toronto finishing studio Muk Post, he bridges camera-department precision with obsessive finishing craft across commercials, music videos, documentaries, and 16mm narrative films.",
        primaryCraft: 'Colour Grading & Film Emulation, Editorial & Finishing, Sound Design & Mix, On-Set DIT, Title Design',
        secondaryCraft: 'Cinematography (DP), Camera Dept (1st/2nd AC), 16mm Film Pipeline, Broadcast QC',
        gear: 'DaVinci Resolve Studio, Zoom F6 (32-bit Float), Custom Film Emulation CSTs',
        tags: ['Post & Colour', 'DIT', 'Production Sound', '3D / Graphics / Type', 'Cinematographer (DP)', 'Camera / AC'],
        contactScopes: 'Colour Grading, Offline / Online Edit, Sound Design & Mix, Title Design & VFX, On-Set DIT, Cinematography (DP), Post Supervision',
        personalSiteUrl: 'https://mukpost.com',
        personalSiteLabel: 'Muk Post Finishing',
        instagramUrl: 'https://instagram.com/muk.post',
        videoChannelUrl: 'https://www.youtube.com/@MukPostProduction',
        reelUrl: '../assets/videos/home-reel-colour.mp4',
        heroPosterUrl: '../assets/images/home-reel-colour-poster.jpg',
        awardsAndPress: 'TIFF Programming Lineup (MDFF)\nMDFF Selects — Last Night\nCinema Scope Feature',
        projects: [
          { id: 'j1', title: 'Donat Jackson — sweartogod!', category: 'Music Video', clientOrArtist: 'Dir. Mason Cline', year: '2026', banner: 'Pylon Production', role: 'Edit, Colour Grading & Title Design', watchUrl: 'https://www.youtube.com/watch?v=a3y5_lFqbsE', stillPreviewUrl: '../assets/images/jackson/sweartogod.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: '', featured: true },
          { id: 'j2', title: 'Donat Jackson — needmoretime!', category: 'Music Video', clientOrArtist: 'Dir. Mason Cline & Jackson McMurdo', year: '2026', banner: 'Pylon Production', role: 'Colour Grading, DIT, VFX, Sound & Title Design', watchUrl: 'https://www.youtube.com/watch?v=m3GzM8sJ_V8', stillPreviewUrl: '../assets/images/jackson/needmoretime.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: '', featured: true },
          { id: 'j3', title: 'SP!KE', category: 'Narrative Short', clientOrArtist: 'Dir. Maya Chariandy', year: '2026', banner: 'Pylon Production', role: 'Cinematography (DP), Edit, Sound Design, Mix & DIT', watchUrl: 'https://mukpost.com/portfolio-assets/videos/spike-1080p.mp4', stillPreviewUrl: '../assets/images/jackson/spike.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: '', featured: true },
          { id: 'j4', title: 'insyt. — 360°', category: 'Music Video', clientOrArtist: 'Dir. Mason Cline & Jackson McMurdo', year: '2026', banner: 'Pylon Production', role: 'Colour Grading, Co-Editor, Motion Titles & Sound', watchUrl: 'https://www.youtube.com/watch?v=CKdqD851gQ0', stillPreviewUrl: '../assets/images/jackson/insyt-360.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: '', featured: true },
          { id: 'j5', title: 'Lady Marge — Beer League', category: 'Music Video', clientOrArtist: 'Live Performance Film', year: '2026', banner: 'Pylon Production', role: 'Colour Grading, Live Audio, Asst. Edit & Titling', watchUrl: 'https://youtu.be/zOgTcW_rOoQ', stillPreviewUrl: '../assets/images/jackson/beer-league.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: '', featured: true },
          { id: 'j6', title: 'Between Friends — JAM!', category: 'Music Video', clientOrArtist: 'Live Music Video', year: '2025', banner: 'Personal / External Credit', role: 'Editing, Colour Grading, Motion Graphics & VFX', watchUrl: 'https://mukpost.com/portfolio-assets/videos/between-friends-jam-1080p.mp4', stillPreviewUrl: '../assets/images/jackson/between-friends-jam.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: '', featured: true },
          { id: 'j7', title: 'I Am Because We Are — Hoop Dreams', category: 'Documentary', clientOrArtist: 'Documentary Short', year: '2025', banner: 'Personal / External Credit', role: 'Documentary Editing, Colour Grading & Sound Mix', watchUrl: 'https://mukpost.com/portfolio-assets/videos/hoop-dreams-doc-1080p.mp4', stillPreviewUrl: '../assets/images/jackson/hoop-dreams.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: '', featured: true },
          { id: 'j8', title: 'Cerberus', category: 'Narrative Short', clientOrArtist: 'Dir. Johnny Tsatsos', year: '2026', banner: 'Personal / External Credit', role: 'Sound Design & Re-Recording Mix', watchUrl: 'https://mukpost.com/portfolio-assets/videos/cerberus-1080p.mp4', stillPreviewUrl: '../assets/images/jackson/cerberus.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: '', featured: true },
          { id: 'j9', title: 'Last Night', category: 'Narrative Short', clientOrArtist: '16mm Short · MDFF at TIFF', year: '2023', banner: 'Personal / External Credit', role: 'Edit, 16mm Colour Grading, Sound Design & Mix', watchUrl: 'https://mukpost.com/portfolio-assets/videos/last-night-1080p.mp4', stillPreviewUrl: '../assets/images/jackson/last-night.jpg', stillsDriveUrl: '', hoverTimecode: '', laurels: 'MDFF at TIFF', featured: true }
        ]
      }
    },
    mason: {
      name: 'Mason Cline',
      slug: 'mason-cline',
      email: 'mason@pylonpictures.com',
      hash: 'b2374a01ef8081dbc4a08a46c4e942fd22e357e3ae2ebafc7898bdb4c4b2bb53',
      defaults: {
        headline: 'Director · Photographer · Writer',
        infoSubtitle: 'Director & Writer · Pylon Pictures',
        primaryCraft: 'Commercial & Music Video Direction, Photography, Screenwriting',
        secondaryCraft: 'Location Scouting, Editorial, Camera Dept (AC), Producing',
        contactScopes: 'Commercial Direction, Music Video, Narrative / Writing, Photography, Creative Treatment',
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
        headline: 'Director of Photography · Gaffer',
        infoSubtitle: 'Director of Photography · Pylon Pictures',
        primaryCraft: 'Cinematography (DP), Lighting Design & Gaffer',
        secondaryCraft: 'Camera Dept (1st/2nd AC), 16mm/35mm Film, Editorial, Colour',
        contactScopes: 'Cinematography (DP), Gaffer / Lighting, 16mm / Film Shoot, Camera Dept (AC), Commercial Production',
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
        headline: '3D & Graphics · Fabrication · Audio',
        infoSubtitle: 'Design, Fabrication & Audio Lead · Pylon Pictures',
        primaryCraft: '3D Design, Motion Graphics, Robotics, Projection Mapping, Custom Props',
        secondaryCraft: 'Audio Mixing & Mastering, Production Design, Practical/Gore SFX',
        contactScopes: '3D & Motion Graphics, Custom Props / Fabrication, Production Design, Projection / Interactive, Audio Mix & Score',
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
        headline: 'Executive Producer · Director · Gaffer',
        infoSubtitle: 'Executive Producer & Director · Pylon Pictures',
        primaryCraft: 'Executive Producing, Line Producing, Directing',
        secondaryCraft: 'Camera Operating, Lighting & Gaffer, Commercial Bidding',
        contactScopes: 'Commercial Production, Executive / Line Producing, Directing, Gaffer / Lighting, Full Crew Bid',
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
        headline: 'Director · Writer · Actor · Casting',
        infoSubtitle: 'Director, Writer & Casting · Pylon Pictures',
        primaryCraft: 'Directing, Screenwriting, Acting, Casting',
        secondaryCraft: 'Documentary DP, Colour Grading, 1st AD, Producing, Editorial',
        contactScopes: 'Directing, Screenwriting, Casting, Acting / Performance, 1st AD, Documentary DP',
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
        headline: 'Director · Writer · Actor · Producer',
        infoSubtitle: 'Director, Writer & Creative Producer · Pylon Pictures',
        primaryCraft: 'Directing, Screenwriting, Acting, Creative Pitching',
        secondaryCraft: 'Producing, Storyboarding & Drawing, Production Design, Casting',
        contactScopes: 'Directing, Screenwriting & Treatments, Creative Producing, Storyboarding, Acting',
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
        headline: 'Costume & Styling · Production Design',
        infoSubtitle: 'Costume Designer, Stylist & Art Director · Pylon Pictures',
        primaryCraft: 'Costume Design & Styling, Screenprinting & Textile Fabrication',
        secondaryCraft: 'Production Design, Acting, Lighting & Gaffer',
        contactScopes: 'Costume Design & Styling, Custom Apparel / Screenprinting, Production Design, Commercial Wardrobe',
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
        headline: 'Director · Typography & Design · Writer',
        infoSubtitle: 'Director, Designer & Writer · Pylon Pictures',
        primaryCraft: 'Directing, Typography, Illustration & Title Design, Screenwriting',
        secondaryCraft: 'Cinematography (DP), Acting, Graphics, Editorial, Gaffer',
        contactScopes: 'Directing, Typography & Title Design, Graphic Design / Illustration, Screenwriting, Cinematography',
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
        headline: 'Producer · Grants & Sourcing · 1st AD',
        infoSubtitle: 'Producer & Client Strategy · Pylon Pictures',
        primaryCraft: 'Producing, Client & Resource Sourcing, Production Grants',
        secondaryCraft: '1st AD, Directing, Marketing, Cinematography, Photography, Writing',
        contactScopes: 'Commercial Producing, Brand Partnerships, 1st AD, Grant Strategy, Directing & Photo',
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
        headline: 'Producer · Strategy & Grants',
        infoSubtitle: 'Producer & Operations Strategy · Pylon Pictures',
        primaryCraft: 'Line & Creative Producing, Budgeting & Production Strategy',
        secondaryCraft: 'Institutional & Arts Grant Research, Deliverables & Scheduling',
        contactScopes: 'Line Producing, Production Budgeting, Arts & Film Grants, Creative Producing',
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

  const STEPS = [
    {
      id: 'identity',
      num: '01',
      label: 'Masthead & Bio',
      title: 'Masthead Display & Biography',
      desc: 'Set your top-left Archivo Black display name, top-center craft stack, and the editorial biography shown inside your Information tab.'
    },
    {
      id: 'craft',
      num: '02',
      label: 'Craft & Scopes',
      title: 'Roster Filters, Craft Columns & Contact Scopes',
      desc: 'Choose which filters highlight you on pylonpictures.com, your Primary / Additional discipline columns, and the clickable pills on your Contact form.'
    },
    {
      id: 'reel',
      num: '03',
      label: 'Opening Loop',
      title: 'Full-Bleed Opening Video Loop',
      desc: 'When someone opens your page, a silent full-bleed video loop plays edge-to-edge behind your name and numbered credits list.'
    },
    {
      id: 'projects',
      num: '04',
      label: 'Programme Credits',
      title: 'Numbered Credits (01–15), Hover Stills & Watch Links',
      desc: 'Build your bottom-left numbered programme. Hovering a row reveals its kind, your roles, and swaps the full-bleed background still; clicking opens the film player.'
    },
    {
      id: 'stills',
      num: '05',
      label: 'Press & Stills',
      title: 'Festivals, Press & Extra Visual Folders',
      desc: 'Add festival selections, laurels, grants, or press for your Information tab, plus any Drive folders of standalone stills or lookbooks.'
    },
    {
      id: 'links',
      num: '06',
      label: 'Links & Contact',
      title: 'Elsewhere Links & In-Site Contact Form',
      desc: 'Configure your Elsewhere links and customize the in-site Direct Inquiry form built into your Contact tab (no external mailto popups).'
    },
    {
      id: 'vibe',
      num: '07',
      label: 'Review & Archive',
      title: 'Theme Check, Framing Notes & Drive Archive',
      desc: 'Test your full interactive Cinema Programme in fullscreen, add any crop/loop notes for Tech & Post, and log raw shoot drives for Dario.'
    }
  ];

  let loggedInUser = null;
  let activeMemberKey = null;
  let currentStepIdx = 0;
  let state = null;
  let toastTimer = null;

  // Preview Stage state
  let previewView = 'home'; // 'home' | 'film' | 'information' | 'contact'
  let previewHoveredIdx = -1;
  let previewFilmIdx = 0;

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

  function slugify(str) {
    return String(str || 'project')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'project';
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
      stillPreviewUrl: '',
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
      basedIn: 'Toronto',
      headline: d.headline || '',
      infoSubtitle: d.infoSubtitle || `${d.headline || 'Filmmaker'} · Pylon Pictures`,
      logline: '',
      bio: d.bio || '',
      bioPolishPref: 'polish',
      tags: Array.isArray(d.tags) ? [...d.tags] : [],
      primaryCraft: d.primaryCraft || '',
      secondaryCraft: d.secondaryCraft || '',
      contactScopes: d.contactScopes || d.primaryCraft || '',
      gear: d.gear || '',
      unionAndCerts: '',
      reelUrl: d.reelUrl || '',
      heroPosterUrl: d.heroPosterUrl || '',
      needReelCutHelp: false,
      heroType: 'video-loop',
      heroSourceUrl: '',
      heroTimecode: '',
      cvFileName: '',
      cvDriveUrl: '',
      cvExtractedText: '',
      projects: Array.isArray(d.projects) && d.projects.length
        ? d.projects.map((p) => ({ ...p }))
        : [createEmptyProject()],
      standaloneGalleryDriveUrl: '',
      btsDriveUrl: '',
      awardsAndPress: d.awardsAndPress || '',
      personalSiteUrl: d.personalSiteUrl || '',
      personalSiteLabel: d.personalSiteLabel || '',
      instagramUrl: d.instagramUrl || '',
      videoChannelUrl: d.videoChannelUrl || '',
      imdbOrLetterboxdUrl: '',
      otherLinks: '',
      contactPref: 'direct',
      bookingNote: 'Commercial production, music videos, narrative projects, or direct craft inquiries. Sends directly from this page.',
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
          ? parsed.projects.map((p) => ({ stillPreviewUrl: '', ...p }))
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
      if (showToastMsg) showToast('Saved to browser (Cinema Theme synced)');
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
    } catch (_) {
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
    } catch (_) {}
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
        return Boolean(s.reelUrl.trim() || s.needReelCutHelp || s.heroSourceUrl.trim() || s.heroPosterUrl.trim());
      case 'projects':
        return Boolean(
          (s.cvExtractedText && s.cvExtractedText.trim()) ||
          (s.cvDriveUrl && s.cvDriveUrl.trim()) ||
          s.projects.some((p) => p.title && p.title.trim() && p.role && p.role.trim())
        );
      case 'stills':
        return Boolean(s.standaloneGalleryDriveUrl.trim() || s.btsDriveUrl.trim() || s.awardsAndPress.trim());
      case 'links':
        return Boolean(
          s.personalSiteUrl.trim() ||
          s.instagramUrl.trim() ||
          s.videoChannelUrl.trim() ||
          s.imdbOrLetterboxdUrl.trim() ||
          s.otherLinks.trim() ||
          s.bookingNote.trim()
        );
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
     VIDEO URL PARSER (YOUTUBE / VIMEO / DIRECT MP4)
     ------------------------------------------------------------------------ */

  function parseWatchSource(url = '') {
    const clean = url.trim();
    if (!clean) return null;
    const ytMatch =
      clean.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/) ||
      (/^[A-Za-z0-9_-]{11}$/.test(clean) ? [null, clean] : null);
    if (ytMatch) return { type: 'youtube', id: ytMatch[1] };

    const vmMatch = clean.match(/vimeo\.com\/(?:video\/)?(\d{6,12})/);
    if (vmMatch) return { type: 'vimeo', id: vmMatch[1] };

    if (/\.(mp4|webm|mov)(\?|$)/i.test(clean) || clean.startsWith('../') || clean.startsWith('blob:') || clean.startsWith('data:video')) {
      return { type: 'mp4', url: clean };
    }
    return { type: 'external', url: clean };
  }

  function formatKindLine(p) {
    const parts = [];
    if (p.category) parts.push(p.category);
    if (p.clientOrArtist && p.clientOrArtist.trim()) parts.push(p.clientOrArtist.trim());
    return parts.join(' · ') || 'Film';
  }

  function stillForProject(p, idx) {
    if (p && p.stillPreviewUrl && p.stillPreviewUrl.trim()) {
      return p.stillPreviewUrl.trim();
    }
    return FALLBACK_STILLS[idx % FALLBACK_STILLS.length];
  }

  /* ------------------------------------------------------------------------
     INTERACTIVE CINEMA STAGE PREVIEW
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

  function setPreviewView(nextView, filmIdx = 0) {
    previewView = nextView;
    const stage = document.getElementById('cinemaStage');
    stage.dataset.pview = nextView;

    // Sync top tab buttons
    document.querySelectorAll('#previewTabBar .preview-tab').forEach((btn) => {
      const active =
        (nextView === 'home' || nextView === 'film')
          ? btn.dataset.pview === 'home'
          : btn.dataset.pview === nextView;
      btn.classList.toggle('is-active', active);
    });

    // Sync masthead nav inside stage
    stage.querySelectorAll('[data-csnav]').forEach((btn) => {
      const active =
        (nextView === 'home' || nextView === 'film')
          ? btn.dataset.csnav === 'home'
          : btn.dataset.csnav === nextView;
      btn.classList.toggle('is-on', active);
    });

    const frame = document.getElementById('csFilmFrame');
    if (nextView !== 'film') {
      frame.innerHTML = '';
    } else {
      previewFilmIdx = filmIdx;
      mountPreviewFilm(filmIdx);
    }

    updatePreviewScreenMedia();
  }

  function getPreviewProjects() {
    const filled = (state?.projects || []).filter((p) => p.title && p.title.trim() && p.featured !== false);
    if (filled.length) return filled;
    // Sample preview rows when member hasn't added projects yet so they see how the theme works
    return [
      { title: 'Your First Credit Title', category: 'Commercial / Spec', clientOrArtist: 'Pylon Pictures', year: '2026', role: state?.primaryCraft?.split(',')[0] || 'Lead Role', watchUrl: '', stillPreviewUrl: FALLBACK_STILLS[0], _sample: true },
      { title: 'Second Selected Project', category: 'Music Video', clientOrArtist: 'Artist Name', year: '2026', role: 'Your Credit Line', watchUrl: '', stillPreviewUrl: FALLBACK_STILLS[1], _sample: true },
      { title: 'Third Narrative or Spot', category: 'Narrative Short', clientOrArtist: 'Festival Selection', year: '2025', role: 'Your Credit Line', watchUrl: '', stillPreviewUrl: FALLBACK_STILLS[2], _sample: true }
    ];
  }

  function updatePreviewScreenMedia() {
    const vid = document.getElementById('csVideo');
    const still = document.getElementById('csStill');
    if (!vid || !still || !state) return;

    const projs = getPreviewProjects();
    const parsedLoop = parseWatchSource(state.reelUrl || state.heroSourceUrl || '');
    const customMp4 = parsedLoop && parsedLoop.type === 'mp4' ? parsedLoop.url : '../assets/videos/home-reel-colour.mp4';
    const customPoster = (state.heroPosterUrl && state.heroPosterUrl.trim()) || '../assets/images/home-reel-colour-poster.jpg';

    if (previewView === 'home' && previewHoveredIdx >= 0 && projs[previewHoveredIdx]) {
      still.src = stillForProject(projs[previewHoveredIdx], previewHoveredIdx);
      vid.classList.add('is-hidden');
    } else {
      still.src = customPoster;
      if (vid.getAttribute('src') !== customMp4) {
        vid.setAttribute('src', customMp4);
        vid.load();
      }
      if (previewView === 'film') {
        vid.pause();
        vid.classList.add('is-hidden');
      } else {
        vid.classList.remove('is-hidden');
        vid.play().catch(() => {});
      }
    }
  }

  function mountPreviewFilm(idx) {
    const projs = getPreviewProjects();
    const p = projs[idx] || projs[0];
    if (!p) return;

    document.getElementById('csFilmNo').textContent = String(idx + 1).padStart(2, '0');
    document.getElementById('csFilmTitle').textContent = p.title;
    document.getElementById('csFilmKind').textContent = `${formatKindLine(p)}${p.year ? ` (${p.year})` : ''}`;
    document.getElementById('csFilmRoles').textContent = p.role || '—';

    const frame = document.getElementById('csFilmFrame');
    const src = parseWatchSource(p.watchUrl);
    if (src && src.type === 'youtube') {
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(src.id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1" allow="autoplay; fullscreen; encrypted-media" allowfullscreen></iframe>`;
    } else if (src && src.type === 'vimeo') {
      frame.innerHTML = `<iframe src="https://player.vimeo.com/video/${encodeURIComponent(src.id)}?autoplay=1&title=0&byline=0&portrait=0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    } else if (src && src.type === 'mp4') {
      frame.innerHTML = `<video src="${esc(src.url)}" poster="${esc(stillForProject(p, idx))}" controls autoplay playsinline></video>`;
    } else {
      frame.innerHTML = `
        <img src="${esc(stillForProject(p, idx))}" alt="" style="opacity:0.45;">
        <div class="cs-film-placeholder" style="position:absolute;">
          ${p.watchUrl ? `External Master Linked:<br><span style="color:var(--orange);">${esc(p.watchUrl.slice(0, 46))}...</span>` : 'Paste a YouTube, Vimeo, or MP4 Watch Link in Step 04 to play video right here'}
        </div>`;
    }
  }

  function renderLivePreview() {
    if (!activeMemberKey || !state) return;
    const m = CREW[activeMemberKey];

    document.getElementById('liveSiteLink').href = `../roster/${m.slug}.html`;
    document.getElementById('mockUrl').textContent = `pylonpictures.com/roster/${m.slug}`;
    document.getElementById('fsMemberName').textContent = state.displayName || m.name;

    // Masthead
    document.getElementById('csName').textContent = state.displayName || m.name;
    document.getElementById('csRoleLine').textContent = state.headline || 'Filmmaker';
    document.getElementById('csLocation').textContent = (state.basedIn || 'Toronto').replace(/,\s*ON$/i, '');

    // Programme list & Hover Cue
    const projs = getPreviewProjects();
    if (previewHoveredIdx >= projs.length) previewHoveredIdx = -1;

    const listEl = document.getElementById('csList');
    listEl.innerHTML = projs
      .map(
        (p, i) => `
        <li class="cs-row ${i === previewHoveredIdx ? 'is-on' : ''}" data-csrow="${i}">
          <i>${String(i + 1).padStart(2, '0')}</i>
          <span>${esc(p.title)}</span>
        </li>`
      )
      .join('');

    const cueEl = document.getElementById('csCue');
    if (previewHoveredIdx >= 0 && projs[previewHoveredIdx]) {
      const hp = projs[previewHoveredIdx];
      cueEl.classList.remove('is-off');
      cueEl.style.setProperty('--csi', String(previewHoveredIdx));
      document.getElementById('csCueKind').textContent = formatKindLine(hp);
      document.getElementById('csCueRoles').textContent = hp.role || '';
    } else {
      cueEl.classList.add('is-off');
    }

    listEl.querySelectorAll('[data-csrow]').forEach((row) => {
      const idx = Number(row.dataset.csrow);
      row.addEventListener('mouseenter', () => {
        previewHoveredIdx = idx;
        listEl.querySelectorAll('.cs-row').forEach((r, k) => r.classList.toggle('is-on', k === idx));
        const hp = projs[idx];
        cueEl.classList.remove('is-off');
        cueEl.style.setProperty('--csi', String(idx));
        document.getElementById('csCueKind').textContent = formatKindLine(hp);
        document.getElementById('csCueRoles').textContent = hp.role || '';
        updatePreviewScreenMedia();
      });
      row.addEventListener('click', () => {
        setPreviewView('film', idx);
      });
    });

    // Information View
    document.getElementById('csBioSub').textContent =
      state.infoSubtitle?.trim() || `${state.headline || 'Filmmaker'} · Pylon Pictures`;
    document.getElementById('csBioText').textContent = state.bio.trim()
      ? state.bio.trim()
      : 'Write 2–3 short paragraphs in Step 01 and your biography will appear here over the darkened cinema frame...';

    const splitItems = (raw) =>
      String(raw || '')
        .split(/[\n,•]+/)
        .map((s) => s.trim())
        .filter(Boolean);

    const primaryItems = splitItems(state.primaryCraft);
    const secondaryItems = splitItems(state.secondaryCraft);
    const pressItems = String(state.awardsAndPress || '')
      .split(/\n+/)
      .map((s) => s.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean);

    const elsewhereItems = ['Send Direct Inquiry →'];
    if (state.personalSiteUrl.trim()) elsewhereItems.push(`${state.personalSiteLabel.trim() || 'Website'} ↗`);
    if (state.instagramUrl.trim()) elsewhereItems.push('Instagram ↗');
    if (state.videoChannelUrl.trim()) elsewhereItems.push('Vimeo / YouTube ↗');
    if (state.imdbOrLetterboxdUrl.trim()) elsewhereItems.push('IMDb ↗');

    document.getElementById('csFactsGrid').innerHTML = [
      { h: 'Primary Craft', list: primaryItems.length ? primaryItems : ['—'] },
      { h: 'Additional Lanes', list: secondaryItems.length ? secondaryItems : ['—'] },
      { h: 'Press & Selections', list: pressItems.length ? pressItems : ['Add in Step 05'] },
      { h: 'Elsewhere', list: elsewhereItems }
    ]
      .map(
        (col) => `
        <div class="cs-facts-col">
          <h5>${esc(col.h)}</h5>
          <div>${col.list.slice(0, 5).map((x) => esc(x)).join('<br>')}</div>
        </div>`
      )
      .join('');

    const idxContainer = document.getElementById('csIndexRows');
    idxContainer.innerHTML = projs
      .map(
        (p, i) => `
        <div class="cs-index-row" data-csidx="${i}">
          <span><strong style="color:var(--orange);font-family:'IBM Plex Mono',monospace;">${String(i + 1).padStart(2, '0')}</strong> &nbsp;${esc(p.title)}</span>
          <span style="opacity:0.65;">${esc(formatKindLine(p))}</span>
          <span>${esc(p.role || '—')}</span>
          <span style="text-align:right;">Watch &rarr;</span>
        </div>`
      )
      .join('');

    idxContainer.querySelectorAll('[data-csidx]').forEach((el) => {
      el.addEventListener('click', () => setPreviewView('film', Number(el.dataset.csidx)));
    });

    // Contact View
    const firstName = (state.displayName || m.name).trim().split(/\s+/)[0];
    document.getElementById('csContactHeading').textContent = `Work with ${firstName}`;
    document.getElementById('csContactNote').textContent =
      state.bookingNote?.trim() || 'Direct production or craft inquiries. Sends straight from this page.';
    const targetEmail = state.contactPref === 'studio' ? 'contact@pylonpictures.com' : m.email;
    document.getElementById('csCopyEmail').textContent = `${targetEmail} · Copy`;

    const scopes = splitItems(state.contactScopes);
    document.getElementById('csScopeChips').innerHTML = (scopes.length ? scopes : ['Commercial', 'Music Video', 'Narrative'])
      .slice(0, 7)
      .map((s) => `<span class="cs-scope-chip">${esc(s)}</span>`)
      .join('');

    updatePreviewScreenMedia();

    // Theme Checklist below stage
    const realProjectCount = (state.projects || []).filter((p) => p.title && p.title.trim()).length;
    const hasLoop = Boolean(state.reelUrl.trim() || state.heroSourceUrl.trim() || state.needReelCutHelp);
    const hasBio = state.bio.trim().length >= 25;
    const hasScopes = scopes.length > 0;

    document.getElementById('themeChecklist').innerHTML = `
      <div class="chk-row">
        <span>01 · Opening Video Loop</span>
        <span class="chk-badge ${hasLoop ? 'is-ok' : ''}">${hasLoop ? (state.needReelCutHelp ? 'Post Cut Requested' : 'Linked') : 'Needs Link'}</span>
      </div>
      <div class="chk-row">
        <span>02 · Hoverable Programme Credits</span>
        <span class="chk-badge ${realProjectCount > 0 ? 'is-ok' : ''}">${realProjectCount} Credit${realProjectCount === 1 ? '' : 's'}</span>
      </div>
      <div class="chk-row">
        <span>03 · Information Tab &amp; Bio</span>
        <span class="chk-badge ${hasBio ? 'is-ok' : ''}">${hasBio ? 'Ready' : 'Drafting'}</span>
      </div>
      <div class="chk-row">
        <span>04 · In-Site Contact Form</span>
        <span class="chk-badge ${hasScopes ? 'is-ok' : ''}">${scopes.length} Scope Pills</span>
      </div>
    `;
  }

  /* ------------------------------------------------------------------------
     STEP NAVIGATION & STEP FORMS
     ------------------------------------------------------------------------ */

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
        syncPreviewTabWithStep();
        renderCurrentStep();
        updateReadinessAndNav();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function syncPreviewTabWithStep() {
    const st = STEPS[currentStepIdx];
    if (!st) return;
    if (st.id === 'reel' || st.id === 'projects') setPreviewView('home');
    else if (st.id === 'stills') setPreviewView('information');
    else if (st.id === 'links') setPreviewView('contact');
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
            wc.textContent = `${words} words (sweet spot: 60–150 words)`;
          }
          if (previewView !== 'information') setPreviewView('information');
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
      ? 'Submit &amp; Sync Portfolio &rarr;'
      : 'Save &amp; Next Step &rarr;';

    const body = document.getElementById('stepBody');

    if (st.id === 'identity') {
      const words = state.bio.trim() ? state.bio.trim().split(/\s+/).length : 0;
      body.innerHTML = `
        <div class="theme-banner">
          <strong>Cinema Programme Masthead:</strong> Your name sits top-left in oversized <em>Archivo Black</em>, your craft line &amp; city sit top-center, and <code>Work / Information / Contact</code> sit top-right over your full-bleed looping video.
        </div>

        <div class="grid-3">
          <div class="field">
            <label>Masthead Display Name</label>
            <input class="input" data-field="displayName" value="${esc(state.displayName)}" placeholder="Full credit name">
          </div>
          <div class="field">
            <label>Location Line</label>
            <input class="input" data-field="basedIn" value="${esc(state.basedIn)}" placeholder="Toronto">
          </div>
          <div class="field">
            <label>Pronouns <span class="hint-inline">Optional</span></label>
            <input class="input" data-field="pronouns" value="${esc(state.pronouns)}" placeholder="e.g. he/him">
          </div>
        </div>

        <div class="field">
          <label>Top-Center Masthead Craft Line <span class="hint-inline">Keep concise — use · between 2–4 crafts</span></label>
          <input class="input" data-field="headline" value="${esc(state.headline)}" placeholder="e.g. Director · Photographer · Writer">
        </div>

        <div class="field">
          <label>Information Tab Orange Subtitle <span class="hint-inline">Shown above your Biography when visitors click Information</span></label>
          <input class="input" data-field="infoSubtitle" value="${esc(state.infoSubtitle || '')}" placeholder="e.g. Director & Writer · Pylon Pictures">
        </div>

        <div class="field">
          <label>Artist / Filmmaker Biography <span class="hint-inline" id="bioWordCount">${words} words (sweet spot: 60–150 words)</span></label>
          <textarea class="textarea" rows="6" data-field="bio" placeholder="Write 2–3 short paragraphs for your Information overlay (separate paragraphs with a blank line). Rough notes or bullet points are totally fine too if you want us to polish the prose!">${esc(state.bio)}</textarea>
          <p class="helper">Tip: Click the <strong>Information</strong> tab in the preview stage on the right to see how your paragraphs set at large editorial scale.</p>
        </div>

        <div class="field">
          <label>Editorial Copy Preference</label>
          <select class="select" data-field="bioPolishPref">
            <option value="polish" ${state.bioPolishPref === 'polish' ? 'selected' : ''}>Feel free to tighten / copy-edit my bio to match the Pylon editorial voice</option>
            <option value="verbatim" ${state.bioPolishPref === 'verbatim' ? 'selected' : ''}>Keep my exact wording</option>
            <option value="draft-from-bullets" ${state.bioPolishPref === 'draft-from-bullets' ? 'selected' : ''}>I wrote rough bullet points above — please draft a clean bio for me to approve</option>
          </select>
        </div>
      `;
      bindFieldInputs(body);
    }

    else if (st.id === 'craft') {
      body.innerHTML = `
        <div class="field">
          <label>Homepage Roster Filter Tags <span class="hint-inline">Which filter buttons on pylonpictures.com/#roster highlight your row</span></label>
          <div class="pill-grid" id="tagPillGrid">
            ${ALL_FILTER_TAGS.map((tag) => `
              <button type="button" class="pill ${state.tags.includes(tag) ? 'is-on' : ''}" data-tag="${esc(tag)}">${esc(tag)}</button>
            `).join('')}
          </div>
        </div>

        <div class="field">
          <label>Primary Craft Column <span class="hint-inline">Column 1 inside your Information tab (comma-separated)</span></label>
          <input class="input" data-field="primaryCraft" value="${esc(state.primaryCraft)}" placeholder="e.g. Commercial Direction, Music Videos, Screenwriting, 35mm Photography">
        </div>

        <div class="field">
          <label>Additional Lanes Column <span class="hint-inline">Column 2 inside your Information tab (comma-separated)</span></label>
          <input class="input" data-field="secondaryCraft" value="${esc(state.secondaryCraft)}" placeholder="e.g. Editorial, Location Scouting, Camera Dept (AC)">
        </div>

        <div class="field">
          <label>Contact Form Discipline Pills <span class="hint-inline">Clickable scope tags visitors pick on your Contact form (comma-separated)</span></label>
          <input class="input" data-field="contactScopes" value="${esc(state.contactScopes || '')}" placeholder="e.g. Commercial Direction, Music Video, Photography, Creative Treatment">
          <p class="helper">Preview how these look as interactive pills by clicking <strong>Contact Form</strong> on the right.</p>
        </div>

        <div class="field">
          <label>Signature Gear, Formats, Software or Mediums <span class="hint-inline">Optional</span></label>
          <input class="input" data-field="gear" value="${esc(state.gear)}" placeholder="e.g. 16mm/35mm, ARRI/FX6, DaVinci Resolve, Blender, Screenprinting, Zoom F6">
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
        <div class="theme-banner">
          <strong>How the Opening Screen Works:</strong> Just like <a href="../roster/jackson-mcmurdo.html" target="_blank" rel="noopener" style="color:var(--orange);">Jackson's live page &nearr;</a>, your portfolio opens on a silent, edge-to-edge looping video montage (10–30s) before visitors hover into individual credits.
        </div>

        <div class="field">
          <label>Opening Loop Video Link <span class="hint-inline">Direct .mp4 URL, Vimeo, YouTube, or Google Drive ProRes/H.264</span></label>
          <input class="input" data-field="reelUrl" value="${esc(state.reelUrl)}" placeholder="https://drive.google.com/... or https://vimeo.com/...">
          <p class="helper">If you drop a Google Drive or Vimeo/YouTube link, Tech &amp; Post will encode a fast, web-optimized 1080p loop for your live page.</p>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>Timecode Range <span class="hint-inline">If pulling an excerpt from a longer film/reel</span></label>
            <input class="input" data-field="heroTimecode" value="${esc(state.heroTimecode)}" placeholder="e.g. 00:42 – 00:58 of Beer League">
          </div>
          <div class="field">
            <label>Poster / Fallback Still URL <span class="hint-inline">Optional image URL or upload to test</span></label>
            <div class="still-upload-row">
              <input class="input" data-field="heroPosterUrl" value="${esc(state.heroPosterUrl || '')}" placeholder="https://... or upload image">
              <label class="btn btn-sm" style="cursor:pointer; flex-shrink:0;">
                Test Image
                <input type="file" id="heroPosterFile" accept="image/*" hidden>
              </label>
            </div>
          </div>
        </div>

        <div class="field">
          <label style="justify-content:flex-start; gap:10px; cursor:pointer; color:var(--white);">
            <input type="checkbox" data-field="needReelCutHelp" ${state.needReelCutHelp ? 'checked' : ''}>
            <span>I don't have a loop cut yet — please help assemble a 15-second silent montage from my best Pylon / personal shots</span>
          </label>
        </div>
      `;
      bindFieldInputs(body);

      const posterInp = document.getElementById('heroPosterFile');
      if (posterInp) {
        posterInp.addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          resizeImageToDataUrl(file, 1280).then((dataUrl) => {
            state.heroPosterUrl = dataUrl;
            saveLocalState();
            renderCurrentStep();
            showToast('Opening poster preview updated');
          });
        });
      }
    }

    else if (st.id === 'projects') {
      renderProjectsStep(body);
    }

    else if (st.id === 'stills') {
      body.innerHTML = `
        <div class="field">
          <label>Press, Festival Selections, Awards &amp; Grants <span class="hint-inline">One item per line — populates Column 3 in your Information tab</span></label>
          <textarea class="textarea" rows="5" data-field="awardsAndPress" placeholder="e.g.&#10;VFF23 Official Selection — Film Title&#10;Forest City Film Festival Special Jury Prize&#10;TIFF Next Wave / Publication Feature">${esc(state.awardsAndPress)}</textarea>
        </div>

        <div class="field">
          <label>Additional Stills, Lookbooks, 3D, Apparel or Process Folder <span class="hint-inline">Google Drive link</span></label>
          <input class="input" data-field="standaloneGalleryDriveUrl" value="${esc(state.standaloneGalleryDriveUrl)}" placeholder="https://drive.google.com/... (high-res stills we can pull for your credit hover backgrounds)">
        </div>

        <div class="field">
          <label>Behind-the-Scenes (BTS) Clips / Photos of You on Set <span class="hint-inline">Optional Drive link</span></label>
          <input class="input" data-field="btsDriveUrl" value="${esc(state.btsDriveUrl)}" placeholder="https://drive.google.com/...">
        </div>
      `;
      bindFieldInputs(body);
    }

    else if (st.id === 'links') {
      const m = CREW[activeMemberKey];
      body.innerHTML = `
        <div class="theme-banner">
          <strong>In-Site Contact Form + Elsewhere Links:</strong> Clicking <code>Contact</code> on your page opens an embedded inquiry form right inside your portfolio (no <code>mailto:</code> popups), plus a one-click copy button for your Pylon email.
        </div>

        <div class="grid-2">
          <div class="field">
            <label>In-Site Contact Form Routing</label>
            <select class="select" data-field="contactPref">
              <option value="direct" ${state.contactPref === 'direct' ? 'selected' : ''}>Route to ${esc(m.email)} (Direct)</option>
              <option value="studio" ${state.contactPref === 'studio' ? 'selected' : ''}>Route through contact@pylonpictures.com (Studio EP)</option>
            </select>
          </div>
          <div class="field">
            <label>Contact Tab Intro Blurb</label>
            <input class="input" data-field="bookingNote" value="${esc(state.bookingNote)}" placeholder="e.g. Commercial direction, treatments, or full Pylon production inquiries.">
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>Personal Website / Studio URL <span class="hint-inline">Optional</span></label>
            <input class="input" data-field="personalSiteUrl" value="${esc(state.personalSiteUrl)}" placeholder="https://yoursite.com">
          </div>
          <div class="field">
            <label>Personal Website Label</label>
            <input class="input" data-field="personalSiteLabel" value="${esc(state.personalSiteLabel)}" placeholder="e.g. Visit Studio">
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>Instagram URL or @Handle</label>
            <input class="input" data-field="instagramUrl" value="${esc(state.instagramUrl)}" placeholder="@handle or https://instagram.com/...">
          </div>
          <div class="field">
            <label>Vimeo / YouTube Channel</label>
            <input class="input" data-field="videoChannelUrl" value="${esc(state.videoChannelUrl)}" placeholder="https://vimeo.com/...">
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>IMDb / Letterboxd / LinkedIn</label>
            <input class="input" data-field="imdbOrLetterboxdUrl" value="${esc(state.imdbOrLetterboxdUrl)}" placeholder="https://imdb.com/name/...">
          </div>
          <div class="field">
            <label>Other Links <span class="hint-inline">Behance, Are.na, Bandcamp, etc.</span></label>
            <input class="input" data-field="otherLinks" value="${esc(state.otherLinks)}" placeholder="Comma-separated links">
          </div>
        </div>
      `;
      bindFieldInputs(body);
    }

    else if (st.id === 'vibe') {
      const isAdmin = loggedInUser && CREW[loggedInUser]?.isAdmin;
      body.innerHTML = `
        <div class="theme-banner" style="display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap;">
          <div>
            <strong>Test Your Full Desktop Portfolio:</strong> Pop open the Fullscreen Preview to test your opening loop, credit hover cue bar, film player, Information overlay, and Contact form at full scale.
          </div>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn btn-sm btn-primary" id="step7FsBtn">Open Fullscreen Preview</button>
            ${isAdmin ? `<button type="button" class="btn btn-sm btn-paper" id="step7ExportHtmlBtn">Export roster/${esc(CREW[activeMemberKey].slug)}.html</button>` : ''}
          </div>
        </div>

        <div class="field">
          <label>Framing, Loop &amp; Colour Notes for Your Page <span class="hint-inline">Optional</span></label>
          <textarea class="textarea" rows="3" data-field="referenceLinks" placeholder="Any notes on which shots to feature in your opening loop, still crop preferences, or credit ordering...">${esc(state.referenceLinks)}</textarea>
        </div>

        <div class="field">
          <label>Hard-Drive &amp; Raw Footage Check (For Dario's Master Archive)</label>
          <textarea class="textarea" rows="3" data-field="hardDrivesHeld" placeholder="List any past Pylon shoots where raw footage, project files, or ProRes masters are currently on a drive at your place...">${esc(state.hardDrivesHeld)}</textarea>
        </div>

        <div class="field">
          <label>Anything Else for Jackson, Jess &amp; Dario?</label>
          <textarea class="textarea" rows="3" data-field="notesForTechTeam" placeholder="Assets you're still exporting, upcoming festival premieres, or questions...">${esc(state.notesForTechTeam)}</textarea>
        </div>
      `;
      bindFieldInputs(body);

      document.getElementById('step7FsBtn').addEventListener('click', openFullscreenModal);
      const expBtn = document.getElementById('step7ExportHtmlBtn');
      if (expBtn) expBtn.addEventListener('click', downloadGeneratedPortfolioHtml);
    }
  }

  /* ------------------------------------------------------------------------
     IMAGE THUMB HELPER FOR LIVE STILL PREVIEWING
     ------------------------------------------------------------------------ */

  function resizeImageToDataUrl(file, maxW = 1280) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxW / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.78));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ------------------------------------------------------------------------
     CV UPLOAD (.PDF / .DOCX / .TXT) & CREDIT AUTO-PARSER
     ------------------------------------------------------------------------ */

  let pdfJsPromise = null;

  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (pdfJsPromise) return pdfJsPromise;
    pdfJsPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      s.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      };
      s.onerror = () => reject(new Error('Could not load PDF parser'));
      document.head.appendChild(s);
    });
    return pdfJsPromise;
  }

  async function extractTextFromPdf(file) {
    const pdfjsLib = await loadPdfJs();
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const allLines = [];
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const rows = [];
      for (const item of content.items) {
        if (!item.str || !item.str.trim()) continue;
        const y = Math.round(item.transform[5]);
        const x = item.transform[4];
        let row = rows.find((r) => Math.abs(r.y - y) <= 4);
        if (!row) {
          row = { y, items: [] };
          rows.push(row);
        }
        row.items.push({ x, str: item.str.trim() });
      }
      rows.sort((a, b) => b.y - a.y);
      for (const r of rows) {
        r.items.sort((a, b) => a.x - b.x);
        allLines.push(r.items.map((i) => i.str).join('  '));
      }
    }
    return allLines.join('\n');
  }

  async function extractTextFromDocx(file) {
    const buf = new Uint8Array(await file.arrayBuffer());
    const view = new DataView(buf.buffer);
    let offset = 0;
    while (offset + 30 < buf.length) {
      if (view.getUint32(offset, true) !== 0x04034b50) break;
      const compMethod = view.getUint16(offset + 8, true);
      const compSize = view.getUint32(offset + 18, true);
      const nameLen = view.getUint16(offset + 26, true);
      const extraLen = view.getUint16(offset + 28, true);
      const name = new TextDecoder().decode(buf.subarray(offset + 30, offset + 30 + nameLen));
      const dataStart = offset + 30 + nameLen + extraLen;
      const compData = buf.subarray(dataStart, dataStart + compSize);
      if (name === 'word/document.xml') {
        let xmlBytes = compData;
        if (compMethod === 8 && typeof DecompressionStream !== 'undefined') {
          const ds = new DecompressionStream('deflate-raw');
          const writer = ds.writable.getWriter();
          writer.write(compData);
          writer.close();
          const xmlBuf = await new Response(ds.readable).arrayBuffer();
          xmlBytes = new Uint8Array(xmlBuf);
        }
        const xml = new TextDecoder().decode(xmlBytes);
        return xml
          .replace(/<\/w:tc>/g, '  ')
          .replace(/<\/w:p>/g, '\n')
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
      }
      offset = dataStart + compSize;
    }
    throw new Error('Could not read DOCX XML');
  }

  function parseCvTextIntoProjects(rawText) {
    const ROLE_RX = /\b(executive producer|co-producer|line producer|associate producer|producer|co-director|director of photography|cinematographer|doc dp|dp|dop|director|1st ad|2nd ad|first assistant director|assistant director|gaffer|best boy|key grip|grip|1st ac|2nd ac|focus puller|camera operator|cam op|steadicam|ac|dit|production sound|sound mixer|boom op|sound designer|mixing|mastering|composer|production designer|art director|set dresser|prop master|props|costume designer|wardrobe|stylist|sfx makeup|makeup|editor|assistant editor|colourist|colorist|vfx|motion graphics|graphics|title design|writer|screenwriter|actor|cast|casting)\b/i;

    const SKIP_RX = /^(education|skills|software|equipment|gear|awards|honours|honors|press|exhibitions|references|contact|experience|profile|summary|objective|languages|certifications)\b|@|linkedin\.com|instagram\.com|vimeo\.com|\b(bachelor|bfa|ba\b|toronto metropolitan|ryerson|high school|university|college)\b/i;

    const lines = rawText
      .split(/\r?\n/)
      .map((l) => l.replace(/\s+/g, ' ').trim())
      .filter((l) => l.length >= 4 && l.length <= 200);

    let activeCat = 'Narrative Short';
    const parsed = [];
    const seen = new Set();

    for (const raw of lines) {
      const upper = raw.toUpperCase();
      if (raw.length < 48 && !/\b(19|20)\d{2}\b/.test(raw)) {
        if (/COMMERCIAL|BRANDED|ADVERTISING|SPEC/.test(upper)) { activeCat = 'Commercial / Spec'; continue; }
        if (/MUSIC VIDEO/.test(upper)) { activeCat = 'Music Video'; continue; }
        if (/DOCUMENTARY|NON-FICTION|DOC\b/.test(upper)) { activeCat = 'Documentary'; continue; }
        if (/NARRATIVE|SHORT|FEATURE|FILM|FICTION|TELEVISION|SERIES/.test(upper)) { activeCat = 'Narrative Short'; continue; }
        if (/DESIGN|3D|APPAREL|STYLING|ART/.test(upper)) { activeCat = 'Design / 3D / Apparel'; continue; }
        if (/PHOTO/.test(upper)) { activeCat = 'Photography Series'; continue; }
      }

      if (SKIP_RX.test(raw)) continue;
      if (/^\+?\d[\d\s().-]{7,}$/.test(raw)) continue;

      const yearMatch = raw.match(/\b(201[6-9]|202[0-7])\b/);
      const roleMatch = raw.match(ROLE_RX);
      if (!yearMatch && !roleMatch) continue;
      if (/\b20\d{2}\s*[-–—]\s*(20\d{2}|present|current)\b/i.test(raw) && !/["“”]/.test(raw)) continue;

      const year = yearMatch ? yearMatch[1] : '2026';
      let cat = activeCat;
      if (/\b(music video|mv)\b/i.test(raw)) cat = 'Music Video';
      else if (/\b(commercial|spec|campaign|branded)\b/i.test(raw)) cat = 'Commercial / Spec';
      else if (/\b(documentary|doc)\b/i.test(raw)) cat = 'Documentary';
      else if (/\b(short film|narrative|feature)\b/i.test(raw)) cat = 'Narrative Short';

      let work = raw
        .replace(/\b(201[6-9]|202[0-7])\b/g, '|')
        .replace(/[•·—–|/]+/g, '|');

      const parts = work
        .split('|')
        .map((s) => s.replace(/^[\s()[\]"'“”,-]+|[\s()[\]"'“”,-]+$/g, '').trim())
        .filter(Boolean);

      let title = '';
      let role = '';
      let client = '';

      const qMatch = raw.match(/[“"]([^”"]{2,70})[”"]/);
      if (qMatch) title = qMatch[1].trim();

      for (const seg of parts) {
        if (!role && ROLE_RX.test(seg) && !/^dir\.?\s/i.test(seg)) {
          role = seg;
        } else if (!title && !/^(short film|music video|commercial|feature|documentary|spec|dir\.|prod\.)/i.test(seg)) {
          title = seg;
        } else if (!client && seg !== title && seg !== role && !/^(short film|music video|commercial|feature|documentary|spec)$/i.test(seg)) {
          client = seg;
        }
      }

      if (!role && roleMatch) role = roleMatch[0];
      if (!title || title.length < 2) continue;

      const key = `${title.toLowerCase()}::${year}`;
      if (seen.has(key)) continue;
      seen.add(key);

      parsed.push({
        id: 'proj_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        title,
        category: cat,
        year,
        banner: /pylon/i.test(raw) ? 'Pylon Production' : 'Personal / External Credit',
        role: role || '',
        clientOrArtist: client,
        watchUrl: '',
        stillPreviewUrl: '',
        stillsDriveUrl: '',
        hoverTimecode: '',
        laurels: '',
        featured: true
      });
    }

    return parsed;
  }

  function mergeParsedProjects(newCredits) {
    if (!newCredits.length) {
      showToast('CV saved — add or paste individual credit lines below');
      return;
    }
    const existingFilled = state.projects.filter((p) => p.title && p.title.trim());
    state.projects = [...existingFilled, ...newCredits];
    saveLocalState();
    showToast(`Auto-filled ${newCredits.length} credit${newCredits.length === 1 ? '' : 's'} into your programme`);
  }

  function renderProjectsStep(body) {
    body.innerHTML = `
      <div class="cv-box" id="cvDropBox">
        <div class="cv-top">
          <div>
            <div class="cv-title">Have a Film CV or Credit Sheet? Auto-Fill Your Programme</div>
            <p class="cv-sub">Drop a <strong>.PDF</strong>, <strong>.DOCX</strong>, or <strong>.TXT</strong> CV — we’ll extract your credits directly into numbered programme rows below, then you can reorder them and attach watch links &amp; hover stills.</p>
          </div>
          <div class="cv-actions">
            <label class="btn btn-sm btn-primary" style="cursor:pointer;">
              Upload CV File
              <input type="file" id="cvFileInput" accept=".pdf,.docx,.txt,.md" hidden>
            </label>
            <button type="button" class="btn btn-sm" id="togglePasteCvBtn">Paste CV Text</button>
          </div>
        </div>

        ${state.cvFileName ? `<div class="cv-badge mono">Attached CV: ${esc(state.cvFileName)} (${state.cvExtractedText ? 'Parsed & Saved' : 'Saved'})</div>` : ''}

        <div id="pasteCvArea" hidden style="display:flex; flex-direction:column; gap:10px;">
          <textarea class="textarea" rows="5" id="pasteCvInput" placeholder="Paste your CV / credit list here (e.g. Title — Role — Year)...">${esc(state.cvExtractedText)}</textarea>
          <div>
            <button type="button" class="btn btn-sm btn-paper" id="runPasteParseBtn">Auto-Fill Programme Rows</button>
          </div>
        </div>

        <div class="field" style="margin-top:4px;">
          <label>Optional: Google Drive Link to Original CV PDF</label>
          <input class="input" data-field="cvDriveUrl" value="${esc(state.cvDriveUrl || '')}" placeholder="https://drive.google.com/...">
        </div>
      </div>

      <div class="projects-list" id="projectsList">
        ${state.projects.map((p, idx) => `
          <div class="project-card" data-proj-idx="${idx}">
            <div class="project-card-head">
              <span class="project-index mono">Programme Row #${String(idx + 1).padStart(2, '0')}</span>
              <div class="project-actions">
                ${idx > 0 ? `<button type="button" class="mini-icon-btn" data-moveup="${idx}" title="Move up">&uarr;</button>` : ''}
                ${idx < state.projects.length - 1 ? `<button type="button" class="mini-icon-btn" data-movedown="${idx}" title="Move down">&darr;</button>` : ''}
                <button type="button" class="star-btn ${p.featured !== false ? 'is-featured' : ''}" data-star="${idx}">
                  ${p.featured !== false ? 'On Programme' : 'Hidden'}
                </button>
                ${state.projects.length > 1 ? `<button type="button" class="remove-btn" data-remove="${idx}">Remove</button>` : ''}
              </div>
            </div>

            <div class="grid-3">
              <div class="field">
                <label>Project Title <span class="hint-inline">Row #${String(idx + 1).padStart(2, '0')} Title</span></label>
                <input class="input" data-pfield="title" data-idx="${idx}" value="${esc(p.title)}" placeholder="e.g. Donat Jackson — sweartogod!">
              </div>
              <div class="field">
                <label>Format / Category</label>
                <select class="select" data-pfield="category" data-idx="${idx}">
                  ${['Commercial / Spec', 'Music Video', 'Narrative Short', 'Documentary', 'Live Performance', 'Design / 3D / Apparel', 'Photography Series'].map((cat) => `
                    <option value="${esc(cat)}" ${p.category === cat ? 'selected' : ''}>${esc(cat)}</option>
                  `).join('')}
                </select>
              </div>
              <div class="field">
                <label>Year</label>
                <input class="input" data-pfield="year" data-idx="${idx}" value="${esc(p.year)}" placeholder="2026">
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>Your Exact Credit / Role(s) <span class="hint-inline">Shown on hover &amp; player</span></label>
                <input class="input" data-pfield="role" data-idx="${idx}" value="${esc(p.role)}" placeholder="e.g. Director, Editor & Writer">
              </div>
              <div class="field">
                <label>Director / Client / Festival Note <span class="hint-inline">Shown beside format</span></label>
                <input class="input" data-pfield="clientOrArtist" data-idx="${idx}" value="${esc(p.clientOrArtist)}" placeholder="e.g. Dir. Mason Cline or VFF23 Selection">
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>Watch Link (Film Player) <span class="hint-inline">YouTube, Vimeo, MP4, or Drive</span></label>
                <input class="input" data-pfield="watchUrl" data-idx="${idx}" value="${esc(p.watchUrl)}" placeholder="https://youtube.com/watch?v=... or Vimeo / Drive">
              </div>
              <div class="field">
                <label>Hover Background Still <span class="hint-inline">Paste image URL or upload to preview</span></label>
                <div class="still-upload-row">
                  <input class="input" data-pfield="stillPreviewUrl" data-idx="${idx}" value="${esc(p.stillPreviewUrl || '')}" placeholder="Image URL or click Upload Still">
                  <label class="btn btn-sm" style="cursor:pointer; flex-shrink:0;">
                    Upload Still
                    <input type="file" data-stillfile="${idx}" accept="image/*" hidden>
                  </label>
                </div>
              </div>
            </div>

            <div class="grid-2">
              <div class="field">
                <label>High-Res Stills Drive Folder <span class="hint-inline">Optional master stills link</span></label>
                <input class="input" data-pfield="stillsDriveUrl" data-idx="${idx}" value="${esc(p.stillsDriveUrl)}" placeholder="https://drive.google.com/...">
              </div>
              <div class="field">
                <label>Optional Hover Clip Timecode <span class="hint-inline">If using a video excerpt on hover</span></label>
                <input class="input" data-pfield="hoverTimecode" data-idx="${idx}" value="${esc(p.hoverTimecode)}" placeholder="e.g. 01:14 – 01:20">
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div>
        <button type="button" class="btn btn-paper" id="addProjectBtn">+ Add Another Programme Credit</button>
      </div>
    `;

    body.querySelectorAll('[data-pfield]').forEach((el) => {
      const idx = Number(el.dataset.idx);
      const key = el.dataset.pfield;
      const evt = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evt, () => {
        state.projects[idx][key] = el.value;
        previewHoveredIdx = idx;
        saveLocalState();
      });
    });

    body.querySelectorAll('[data-stillfile]').forEach((inp) => {
      inp.addEventListener('change', (e) => {
        const idx = Number(inp.dataset.stillfile);
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        resizeImageToDataUrl(file, 1280).then((dataUrl) => {
          state.projects[idx].stillPreviewUrl = dataUrl;
          previewHoveredIdx = idx;
          saveLocalState();
          renderProjectsStep(body);
          showToast(`Row #${String(idx + 1).padStart(2, '0')} hover still updated`);
        });
      });
    });

    body.querySelectorAll('[data-moveup]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.moveup);
        if (idx <= 0) return;
        const tmp = state.projects[idx - 1];
        state.projects[idx - 1] = state.projects[idx];
        state.projects[idx] = tmp;
        previewHoveredIdx = idx - 1;
        saveLocalState();
        renderProjectsStep(body);
      });
    });

    body.querySelectorAll('[data-movedown]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.movedown);
        if (idx >= state.projects.length - 1) return;
        const tmp = state.projects[idx + 1];
        state.projects[idx + 1] = state.projects[idx];
        state.projects[idx] = tmp;
        previewHoveredIdx = idx + 1;
        saveLocalState();
        renderProjectsStep(body);
      });
    });

    body.querySelectorAll('[data-star]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.star);
        state.projects[idx].featured = state.projects[idx].featured === false;
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

    bindFieldInputs(body);

    const handleCvFile = async (file) => {
      if (!file) return;
      try {
        setStatus(`Reading ${file.name}...`, true);
        let text = '';
        const lower = file.name.toLowerCase();
        if (lower.endsWith('.pdf')) text = await extractTextFromPdf(file);
        else if (lower.endsWith('.docx')) text = await extractTextFromDocx(file);
        else text = await file.text();
        state.cvFileName = file.name;
        state.cvExtractedText = text.slice(0, 25000);
        const credits = parseCvTextIntoProjects(text);
        mergeParsedProjects(credits);
        renderProjectsStep(body);
      } catch (_) {
        setStatus('Ready', false);
        showToast('Could not read file — try Paste CV Text or Drive link');
      }
    };

    document.getElementById('cvFileInput').addEventListener('change', (e) => handleCvFile(e.target.files[0]));

    const dropBox = document.getElementById('cvDropBox');
    dropBox.addEventListener('dragover', (e) => { e.preventDefault(); dropBox.classList.add('is-dragover'); });
    dropBox.addEventListener('dragleave', () => dropBox.classList.remove('is-dragover'));
    dropBox.addEventListener('drop', (e) => {
      e.preventDefault();
      dropBox.classList.remove('is-dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) handleCvFile(e.dataTransfer.files[0]);
    });

    document.getElementById('togglePasteCvBtn').addEventListener('click', () => {
      const area = document.getElementById('pasteCvArea');
      area.hidden = !area.hidden;
    });

    document.getElementById('runPasteParseBtn').addEventListener('click', () => {
      const txt = document.getElementById('pasteCvInput').value || '';
      state.cvFileName = state.cvFileName || 'Pasted CV Text';
      state.cvExtractedText = txt.slice(0, 25000);
      const credits = parseCvTextIntoProjects(txt);
      mergeParsedProjects(credits);
      renderProjectsStep(body);
    });
  }

  /* ------------------------------------------------------------------------
     COMPILER: EXPORT READY-TO-DEPLOY ROSTER/<SLUG>.HTML
     ------------------------------------------------------------------------ */

  function downloadGeneratedPortfolioHtml() {
    saveLocalState();
    const m = CREW[activeMemberKey];
    const splitItems = (raw) =>
      String(raw || '')
        .split(/[\n,•]+/)
        .map((s) => s.trim())
        .filter(Boolean);

    const paragraphs = state.bio.trim()
      ? state.bio.trim().split(/\n\s*\n/).map((p) => esc(p.trim()))
      : [`${esc(state.displayName || m.name)} is a Toronto-based filmmaker and member of Pylon Pictures.`];

    const pressLines = String(state.awardsAndPress || '')
      .split(/\n+/)
      .map((s) => s.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean)
      .map((label) => ({ label }));

    const elsewhere = [{ label: 'Send Direct Inquiry →', href: '#/contact' }];
    if (state.personalSiteUrl.trim()) elsewhere.push({ label: `${state.personalSiteLabel.trim() || 'Website'} ↗`, href: state.personalSiteUrl.trim(), external: true });
    if (state.instagramUrl.trim()) {
      const ig = state.instagramUrl.trim();
      const igHref = ig.startsWith('http') ? ig : `https://instagram.com/${ig.replace(/^@/, '')}`;
      elsewhere.push({ label: 'Instagram ↗', href: igHref, external: true });
    }
    if (state.videoChannelUrl.trim()) elsewhere.push({ label: 'Vimeo / YouTube ↗', href: state.videoChannelUrl.trim(), external: true });
    if (state.imdbOrLetterboxdUrl.trim()) elsewhere.push({ label: 'IMDb ↗', href: state.imdbOrLetterboxdUrl.trim(), external: true });

    const compiledProjects = (state.projects || [])
      .filter((p) => p.title && p.title.trim() && p.featured !== false)
      .map((p, idx) => {
        const src = parseWatchSource(p.watchUrl);
        const entry = {
          slug: slugify(p.title),
          title: p.title.trim(),
          kind: formatKindLine(p),
          roles: p.role.trim() || state.headline,
          year: p.year.trim() || '2026',
          still: p.stillPreviewUrl && !p.stillPreviewUrl.startsWith('data:')
            ? p.stillPreviewUrl.trim()
            : FALLBACK_STILLS[idx % FALLBACK_STILLS.length],
          focus: 0.45,
          shade: [0.54, 0.64]
        };
        if (src && src.type === 'youtube') entry.youtube = src.id;
        else if (src && src.type === 'vimeo') entry.vimeo = src.id;
        else if (src && src.type === 'mp4') entry.videoUrl = src.url;
        return entry;
      });

    const parsedHero = parseWatchSource(state.reelUrl || '');
    const configObj = {
      slug: m.slug,
      name: state.displayName.trim() || m.name,
      roleLine: state.headline.trim() || 'Filmmaker',
      location: (state.basedIn || 'Toronto').replace(/,\s*ON$/i, ''),
      email: state.contactPref === 'studio' ? 'contact@pylonpictures.com' : m.email,
      formEndpoint: 'https://formspree.io/f/xrpzyngg',
      contactScopes: splitItems(state.contactScopes || state.primaryCraft),
      landing: {
        previewMp4: parsedHero && parsedHero.type === 'mp4' ? parsedHero.url : '../assets/videos/home-reel-colour.mp4',
        still: state.heroPosterUrl && !state.heroPosterUrl.startsWith('data:')
          ? state.heroPosterUrl.trim()
          : '../assets/images/home-reel-colour-poster.jpg',
        focus: 0.4,
        shade: [0.54, 0.64]
      },
      info: {
        subtitle: state.infoSubtitle?.trim() || `${state.headline} · Pylon Pictures`,
        paragraphs,
        facts: [
          { heading: 'Primary Craft', items: splitItems(state.primaryCraft).map((label) => ({ label })) },
          { heading: 'Additional Lanes', items: splitItems(state.secondaryCraft).map((label) => ({ label })) },
          { heading: 'Press & Selections', items: pressLines.length ? pressLines : [{ label: 'Pylon Pictures Ensemble' }] },
          { heading: 'Elsewhere', items: elsewhere }
        ]
      },
      projects: compiledProjects
    };

    const firstName = (state.displayName || m.name).trim().split(/\s+/)[0];
    const targetEmail = configObj.email;
    const html = `<!DOCTYPE html>
<html lang="en" class="js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${esc(configObj.name)} — PYLON PICTURES</title>
  <meta name="description" content="${esc(configObj.name)} — ${esc(configObj.roleLine)} at Pylon Pictures, Toronto.">
  <meta name="theme-color" content="#000000">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600;800&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/portfolio.css">
</head>
<body class="page-portfolio is-opening" data-view="home">

  <div class="screen" id="screen" aria-hidden="true">
    <div class="plates" id="plates"></div>
    <div class="veil" id="veil"></div>
    <div class="shade" id="shade"></div>
  </div>

  <p class="pointer" id="pointer" aria-hidden="true">Watch film</p>

  <header class="mast">
    <h1 class="mast-name">
      <a href="#/">
        <span class="mast-name__clip">
          <span class="mast-name__word" id="artistNameWord">${esc(configObj.name)}</span>
        </span>
      </a>
    </h1>
    <p class="mast-role">
      <span id="artistRoleTitle">${esc(configObj.roleLine)}</span>
      <span class="mast-role__loc" id="artistRoleLoc">${esc(configObj.location)}</span>
    </p>
    <nav class="mast-nav" aria-label="Portfolio navigation">
      <a href="../index.html?skip#roster" class="mast-nav__back">&larr; Roster</a>
      <a href="#/" data-nav="work" class="is-on">Work</a>
      <a href="#/information" data-nav="information">Information</a>
      <a href="#/contact" data-nav="contact">Contact</a>
    </nav>
  </header>

  <main class="programme" id="programme">
    <ol class="programme-list" id="programmeList" aria-label="Selected credits"></ol>
    <div class="cue is-off" id="cue">
      <span class="cue__line"><i id="cueBar"></i></span>
      <p class="cue__kind" id="cueKind"></p>
      <p class="cue__roles" id="cueRoles"></p>
      <a class="cue__watch" id="cueWatch" href="#/">Watch film</a>
    </div>
  </main>

  <section class="film" id="filmView" aria-label="Film player">
    <div class="film__frame" id="filmFrame"></div>
    <div class="film-strip">
      <p class="film-strip__title"><i id="filmNo"></i><span id="filmTitle"></span></p>
      <p class="film-strip__kind" id="filmKind"></p>
      <p class="film-strip__roles" id="filmRoles"></p>
      <p class="film-strip__nav">
        <a href="#/" id="filmPrev">Prev</a>
        <a href="#/" id="filmNext">Next film</a>
        <a href="#/" id="filmClose">Close</a>
      </p>
    </div>
  </section>

  <section class="info" id="infoView" aria-label="Information" tabindex="-1">
    <div class="info__inner">
      <div class="band band--bio">
        <h2 class="band__label">Biography</h2>
        <div class="bio">
          <p class="bio__sub" id="bioSub">${esc(configObj.info.subtitle)}</p>
          <div id="bioBody"></div>
        </div>
      </div>
      <div class="band band--facts" id="factsGrid"></div>
      <div class="band band--index">
        <h2 class="band__label">Selected Credits Index</h2>
        <ol class="index-list" id="indexList"></ol>
      </div>
      <div class="band band--foot">
        <p>&copy; 2026 Pylon Pictures &middot; Toronto, ON</p>
        <button type="button" id="toTopBtn">Back to top &uarr;</button>
      </div>
    </div>
  </section>

  <section class="contact-view" id="contactView" aria-label="Contact" tabindex="-1">
    <div class="contact-view__inner contact-grid">
      <div class="contact-meta">
        <p class="contact-meta__label">Direct Inquiry</p>
        <h2 class="contact-meta__heading" id="contactArtistHeading">Work with ${esc(firstName)}</h2>
        <p class="contact-meta__detail">${esc(state.bookingNote || 'Direct production and craft inquiries. Sends directly from this page.')}</p>
        <button type="button" class="copy-email-btn" id="copyEmailBtn" title="Copy email address">
          <span id="copyEmailLabel">${esc(targetEmail)}</span>
          <span>&middot; Copy</span>
        </button>
      </div>
      <div class="contact-form-wrap">
        <form class="contact-form" id="portfolioContactForm" novalidate>
          <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" hidden>
          <input type="hidden" name="scopes" id="contactScopesInput" value="">
          <div class="field">
            <label for="cfName">Your Name *</label>
            <input type="text" id="cfName" name="name" required placeholder="Jane Doe">
          </div>
          <div class="field">
            <label for="cfEmail">Your Email *</label>
            <input type="email" id="cfEmail" name="email" required placeholder="jane@agency.com">
          </div>
          <div class="field">
            <label for="cfProject">Project / Production</label>
            <input type="text" id="cfProject" name="project" placeholder="Brand Campaign, Music Video, Narrative...">
          </div>
          <div class="field">
            <label for="cfTimeline">Target Timeline / Dates</label>
            <input type="text" id="cfTimeline" name="timeline" placeholder="e.g. Q1 2027">
          </div>
          <div class="field field--full">
            <label>Disciplines Needed</label>
            <div class="scope-pills" id="scopePills"></div>
          </div>
          <div class="field field--full">
            <label for="cfMessage">Project Brief &amp; Notes *</label>
            <textarea id="cfMessage" name="message" required placeholder="Share links, deliverables, or schedule details..."></textarea>
          </div>
          <div class="contact-actions">
            <button type="submit" class="contact-submit" id="contactSubmitBtn">Send Inquiry</button>
            <p class="contact-status" id="contactStatus" role="status" aria-live="polite"></p>
          </div>
        </form>
      </div>
    </div>
  </section>

  <script>
    window.PYLON_PORTFOLIO = ${JSON.stringify(configObj, null, 6)};
  </script>
  <script src="../js/portfolio.js"></script>
</body>
</html>
`;

    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${m.slug}.html`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast(`Exported ${m.slug}.html`);
  }

  /* ------------------------------------------------------------------------
     FULLSCREEN STAGE MODAL & INTERACTIVE STAGE WIRING
     ------------------------------------------------------------------------ */

  function openFullscreenModal() {
    const modal = document.getElementById('fsModal');
    const fsHost = document.getElementById('fsStageMount');
    const stage = document.getElementById('cinemaStage');
    fsHost.appendChild(stage);
    modal.hidden = false;
    updatePreviewScreenMedia();
  }

  function closeFullscreenModal() {
    const modal = document.getElementById('fsModal');
    if (modal.hidden) return;
    const sidebarHost = document.getElementById('sidebarStageMount');
    const stage = document.getElementById('cinemaStage');
    sidebarHost.appendChild(stage);
    modal.hidden = true;
    updatePreviewScreenMedia();
  }

  document.querySelectorAll('#previewTabBar .preview-tab').forEach((btn) => {
    btn.addEventListener('click', () => setPreviewView(btn.dataset.pview));
  });

  document.querySelectorAll('#cinemaStage [data-csnav]').forEach((btn) => {
    btn.addEventListener('click', () => setPreviewView(btn.dataset.csnav));
  });

  document.getElementById('csName').addEventListener('click', () => {
    previewHoveredIdx = -1;
    setPreviewView('home');
    renderLivePreview();
  });

  document.getElementById('csCueWatch').addEventListener('click', () => {
    if (previewHoveredIdx >= 0) setPreviewView('film', previewHoveredIdx);
  });

  document.getElementById('csFilmClose').addEventListener('click', () => {
    setPreviewView('home');
  });

  document.getElementById('csFilmNext').addEventListener('click', () => {
    const projs = getPreviewProjects();
    if (!projs.length) return;
    setPreviewView('film', (previewFilmIdx + 1) % projs.length);
  });

  document.getElementById('expandPreviewBtn').addEventListener('click', openFullscreenModal);
  document.getElementById('sidebarExpandBtn').addEventListener('click', openFullscreenModal);
  document.getElementById('closeFsModalBtn').addEventListener('click', closeFullscreenModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('fsModal').hidden) {
      closeFullscreenModal();
    }
  });

  /* ------------------------------------------------------------------------
     SESSION & BOOTSTRAP
     ------------------------------------------------------------------------ */

  function openWorkspaceFor(userKey, targetMemberKey) {
    loggedInUser = userKey;
    activeMemberKey = targetMemberKey || userKey;
    currentStepIdx = 0;
    previewHoveredIdx = -1;
    state = loadLocalState(activeMemberKey);

    document.getElementById('loginGate').hidden = true;
    document.getElementById('portalApp').hidden = false;
    document.getElementById('activeCrewChip').textContent = CREW[activeMemberKey].name;

    // On mobile/tablet (< 1240px), keep drawer closed initially so form is unobstructed
    if (window.innerWidth <= 1240) {
      document.getElementById('previewPane').hidden = true;
      document.getElementById('workspaceGrid').classList.remove('with-preview');
    }

    const adminSel = document.getElementById('adminMemberSwitch');
    const expHtmlBtn = document.getElementById('exportHtmlBtn');
    if (CREW[loggedInUser].isAdmin) {
      adminSel.hidden = false;
      expHtmlBtn.hidden = false;
      adminSel.innerHTML = Object.keys(CREW).map((k) => `
        <option value="${k}" ${k === activeMemberKey ? 'selected' : ''}>
          Admin View: ${CREW[k].name}
        </option>
      `).join('');
    } else {
      adminSel.hidden = true;
      expHtmlBtn.hidden = true;
    }

    setPreviewView('home');
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

  document.getElementById('exportHtmlBtn').addEventListener('click', downloadGeneratedPortfolioHtml);

  document.getElementById('prevStepBtn').addEventListener('click', () => {
    if (currentStepIdx > 0) {
      currentStepIdx--;
      syncPreviewTabWithStep();
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
      syncPreviewTabWithStep();
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
    closeFullscreenModal();
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
