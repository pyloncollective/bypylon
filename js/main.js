/**
 * PYLON COLLECTIVE — V1 INTERACTION ENGINE
 * Reverse-engineered from Paragon Productions & 1st December
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeaderScroll();
  initMobileDrawer();
  initTorontoTime();
  initAudioToggle();
  initWorkFilter();
  initCapabilitiesAccordion();
  initCaseStudyModal();
  initInquiryForm();
});

/* --------------------------------------------------------------------------
   1. CUSTOM CINEMATIC CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const follower = document.querySelector('.custom-cursor-follower');

  if (!dot || !follower || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  // Hover states for interactive elements
  const hoverables = document.querySelectorAll('a, button, .filter-btn, .radio-pill');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('is-hover'));
  });

  // View state for project cards
  const cards = document.querySelectorAll('.work-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => follower.classList.add('is-view'));
    card.addEventListener('mouseleave', () => follower.classList.remove('is-view'));
  });

  // Play state for reel triggers
  const playTriggers = document.querySelectorAll('.play-reel-trigger, .play-circle-btn');
  playTriggers.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      follower.classList.remove('is-view');
      follower.classList.add('is-play');
    });
    btn.addEventListener('mouseleave', () => follower.classList.remove('is-play'));
  });
}

/* --------------------------------------------------------------------------
   2. HEADER SCROLL STATE
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-menu-link, .mobile-socials a');

  if (!toggleBtn || !drawer) return;

  function toggleDrawer() {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      drawer.classList.remove('is-open');
      toggleBtn.classList.remove('is-active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('is-open');
      toggleBtn.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      toggleBtn.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   4. LIVE TORONTO TIMECLOCK (EST)
   -------------------------------------------------------------------------- */
function initTorontoTime() {
  const timeEl = document.getElementById('toronto-time');
  if (!timeEl) return;

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'America/Toronto',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat([], options).format(now);
      timeEl.textContent = `TORONTO ${timeStr} EST`;
    } catch (e) {
      timeEl.textContent = 'TORONTO (EST)';
    }
  }
  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   5. SOUND AMBIENCE TOGGLE (Cinematic Atmosphere)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let oscillatorNode = null;
let gainNode = null;

function initAudioToggle() {
  const soundBtn = document.querySelector('.sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    const isActive = soundBtn.classList.contains('is-active');

    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (isActive) {
      // Mute
      if (gainNode) gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
      soundBtn.classList.remove('is-active');
      soundBtn.innerHTML = '<span>SOUND OFF</span>';
    } else {
      // Unmute & Play subtle 60Hz/120Hz analog hum
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (!oscillatorNode) {
        oscillatorNode = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();
        oscillatorNode.type = 'sine';
        oscillatorNode.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A hum
        gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime); // very subtle
        oscillatorNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillatorNode.start();
      } else {
        gainNode.gain.setTargetAtTime(0.015, audioCtx.currentTime, 0.2);
      }
      soundBtn.classList.add('is-active');
      soundBtn.innerHTML = '<span>SOUND ON ◬</span>';
    }
  });
}

/* --------------------------------------------------------------------------
   6. PORTFOLIO WORK FILTERING
   -------------------------------------------------------------------------- */
function initWorkFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. CAPABILITIES ACCORDION (Paragon interactive cards)
   -------------------------------------------------------------------------- */
function initCapabilitiesAccordion() {
  const items = document.querySelectorAll('.capability-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.capability-header');
    header.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('is-active');

      // Close all
      items.forEach(i => i.classList.remove('is-active'));

      // If wasn't active, activate
      if (!isAlreadyActive) {
        item.classList.add('is-active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. CASE STUDY MODAL ENGINE & DATA STORE
   -------------------------------------------------------------------------- */
const PROJECT_DATABASE = {
  'maze': {
    title: 'MAZE — Narrative Short',
    category: 'Narrative Film // Festival Official Selection',
    year: '2025',
    client: 'Pylon Pictures',
    synopsis: 'A psychological neo-noir tracking an isolated protagonist navigating the architectural underbelly of Toronto during an unseasonable blackout. Winner of multiple indie festival selections.',
    credits: {
      'Directors': 'Declan McKenna & Mason Cline',
      'Director of Photography': 'Dario Butera',
      'Lead Actor': 'Kai Banks',
      'Post Supervisor & Lead Color': 'Jackson McMurdo (Muk Post)',
      'Sound Design & Score': 'Daniel Fusco',
      'Production Designer': 'Jessica Binns',
      'Grip & Electric Lead': 'Dickson Ntiamoah',
      'Camera System': 'ARRI Alexa 35 // Cooke Anamorphic /i',
      'Color Pipeline': 'DaVinci Wide Gamut CST / 35mm Print Emulation'
    },
    stills: [
      'assets/images/maze-titlecard.png',
      'assets/images/still-01.jpg',
      'assets/images/still-02.jpg',
      'assets/images/still-03.jpg'
    ],
    videoPlaceholder: 'MAZE_TEASER_REEL'
  },
  'kai-banks': {
    title: 'KAI BANKS — EPILOGUE',
    category: 'Music Video & Visual Album',
    year: '2025',
    client: 'Sony Music / Independent',
    synopsis: 'An analog 16mm celluloid journey capturing nighttime Toronto kinetics, street reflections, and intimate vocal performance framed through high-contrast cinematic portraiture.',
    credits: {
      'Director': 'Mason Cline',
      'Cinematography': 'Dario Butera',
      'Executive Producer': 'Declan McKenna & Maya Chariandy',
      'Editorial & Color Grade': 'Jackson McMurdo',
      'Visual Curation': 'Jessica Binns',
      'Format': '16mm Kodak Vision3 500T // Arriflex 416'
    },
    stills: [
      'assets/images/still-04.jpg',
      'assets/images/still-05.jpg',
      'assets/images/still-06.jpg'
    ],
    videoPlaceholder: 'KAI_BANKS_REEL'
  },
  'toronto-35mm': {
    title: 'TORONTO ARCHIVE — 35MM SPEC',
    category: 'Commercial Spec / Fashion Film',
    year: '2025',
    client: 'Pylon Collective × Archival Wear',
    synopsis: 'Exploration of brutalist Toronto transit hubs, concrete textures, and tailored outerwear, graded on 35mm tungsten film science.',
    credits: {
      'Directors': 'Mason Cline & Misan Edema',
      'DPs': 'Jordan Wong & Dario Butera',
      'Art Direction': 'Jessica Binns',
      'Finishing & Colorist': 'Jackson McMurdo',
      'Music Composition': 'Daniel Fusco'
    },
    stills: [
      'assets/images/still-07.jpg',
      'assets/images/still-08.jpg',
      'assets/images/still-09.jpg'
    ],
    videoPlaceholder: 'TORONTO_ARCHIVE_REEL'
  },
  'forest-city': {
    title: 'FOREST CITY — DOCUMENTARY',
    category: 'Documentary Short // Festival Winner',
    year: '2024',
    client: 'Forest City Film Series',
    synopsis: 'Intimate retrospective examining independent underground artists and community preservation across Ontario.',
    credits: {
      'Director': 'Declan McKenna',
      'Producers': 'Maya Chariandy & Justin Tan',
      'Cinematography': 'Dario Butera',
      'Sound Mix': 'Daniel Fusco',
      'Color Finishing': 'Jackson McMurdo'
    },
    stills: [
      'assets/images/still-10.jpg',
      'assets/images/still-01.jpg',
      'assets/images/still-03.jpg'
    ],
    videoPlaceholder: 'FOREST_CITY_REEL'
  },
  'kinetic': {
    title: 'KINETIC RUNNING — ATHLETIC SPEC',
    category: 'Commercial Campaign',
    year: '2025',
    client: 'Kinetic Movement Club',
    synopsis: 'High-speed track and field campaign capturing explosive acceleration, physical endurance, and morning mist over Toronto pavement.',
    credits: {
      'Director / Creative': 'Misan Edema',
      'DP': 'Dario Butera',
      'Grip & Lighting': 'Dickson Ntiamoah',
      'Editor & Colorist': 'Jackson McMurdo',
      'Sound Design': 'Daniel Fusco'
    },
    stills: [
      'assets/images/still-02.jpg',
      'assets/images/still-05.jpg',
      'assets/images/still-08.jpg'
    ],
    videoPlaceholder: 'KINETIC_SPEC_REEL'
  },
  'hallam-sessions': {
    title: '124 HALLAM — LIVE SESSIONS',
    category: 'Live Music & Studio Documentary',
    year: '2025',
    client: 'Pylon Studio Collective',
    synopsis: 'Stripped-down live multi-camera acoustic recording session captured at 124 Hallam St, highlighting intimate analog performance.',
    credits: {
      'Production Designer': 'Jessica Binns',
      'Cameras': 'Dario Butera & Dickson Ntiamoah',
      'Live Audio Engineer': 'Daniel Fusco',
      'Finishing Supervisor': 'Jackson McMurdo'
    },
    stills: [
      'assets/images/still-03.jpg',
      'assets/images/still-06.jpg',
      'assets/images/still-09.jpg'
    ],
    videoPlaceholder: 'HALLAM_SESSIONS_REEL'
  }
};

function initCaseStudyModal() {
  const modal = document.querySelector('.case-study-modal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const workCards = document.querySelectorAll('.work-card');

  if (!modal || !closeBtn) return;

  function openProject(projectId) {
    const data = PROJECT_DATABASE[projectId];
    if (!data) return;

    // Populate titles & meta
    modal.querySelector('.modal-project-title').textContent = data.title;
    modal.querySelector('.modal-project-category').textContent = data.category;
    modal.querySelector('.modal-synopsis-text').textContent = data.synopsis;

    // Populate credits table
    const tbody = modal.querySelector('.modal-credits-table tbody');
    tbody.innerHTML = '';
    for (const [key, value] of Object.entries(data.credits)) {
      const row = document.createElement('tr');
      row.innerHTML = `<th>${key}</th><td>${value}</td>`;
      tbody.appendChild(row);
    }

    // Populate stills
    const stillsGrid = modal.querySelector('.modal-stills-grid');
    stillsGrid.innerHTML = '';
    data.stills.forEach(src => {
      const div = document.createElement('div');
      div.className = 'modal-still-item';
      div.innerHTML = `<img src="${src}" alt="Film Still" loading="lazy">`;
      stillsGrid.appendChild(div);
    });

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      openProject(id);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Hero watch showreel trigger
  const heroReelBtn = document.querySelector('.play-reel-trigger');
  if (heroReelBtn) {
    heroReelBtn.addEventListener('click', () => {
      openProject('maze');
    });
  }
}

/* --------------------------------------------------------------------------
   9. INQUIRY FORM DISPATCH (Inbound CRM Simulator)
   -------------------------------------------------------------------------- */
function initInquiryForm() {
  const form = document.getElementById('project-inquiry-form');
  const statusMsg = document.getElementById('form-status-msg');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>DISPATCHING TO EP DESK...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      statusMsg.className = 'form-status-msg is-success';
      statusMsg.innerHTML = '✦ INQUIRY RECEIVED. Routed to Declan McKenna & Mason Cline (01 | Client & Outreach Desk). Jackson McMurdo (Operations) notified.';

      setTimeout(() => {
        statusMsg.style.display = 'none';
      }, 8000);
    }, 1200);
  });
}
