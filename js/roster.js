/* ==========================================================================
   PYLON — Roster filter
   Each .roster-row has data-roles="director dp ..." (space-separated).
   Filter buttons hide non-matching rows. ?role=director deep-links a filter.
   Buttons with zero matches are hidden automatically.
   ========================================================================== */

(() => {
  const buttons = Array.from(document.querySelectorAll('.roster-filters button'));
  const rows = Array.from(document.querySelectorAll('.roster-row'));
  const count = document.getElementById('rosterCount');

  const rolesOf = (row) => (row.dataset.roles || '').split(/\s+/).filter(Boolean);

  // Hide filters nobody is tagged with
  buttons.forEach((btn) => {
    const f = btn.dataset.filter;
    if (f !== 'all' && !rows.some((r) => rolesOf(r).includes(f))) btn.hidden = true;
  });

  function apply(filter) {
    let shown = 0;
    rows.forEach((row) => {
      const match = filter === 'all' || rolesOf(row).includes(filter);
      row.hidden = !match;
      if (match) shown++;
    });
    buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.filter === filter));
    count.textContent = String(shown);

    const url = new URL(location.href);
    url.searchParams.delete('skip');
    if (filter === 'all') url.searchParams.delete('role');
    else url.searchParams.set('role', filter);
    history.replaceState(null, '', url);
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => { apply(btn.dataset.filter); fit(); }));

  /* Fit guard: CSS sizes names so name + craft share one row. If a name ever
     outgrows that (new member, font swap), shrink the whole list uniformly
     via --roster-fit so no craft line is pushed off-screen. Stacked mobile
     layout (<=760px) wraps naturally and is skipped. */
  const list = document.querySelector('.roster-list');
  const stacked = window.matchMedia('(max-width: 760px)');
  function fit() {
    if (!list) return;
    list.style.removeProperty('--roster-fit');
    if (stacked.matches) return;
    let scale = 1;
    rows.forEach((row) => {
      if (row.hidden) return;
      const link = row.querySelector('.roster-link');
      const name = row.querySelector('.roster-name');
      const craft = row.querySelector('.roster-craft');
      if (!link || !name) return;
      const cs = getComputedStyle(link);
      const sideBySide = cs.flexDirection !== 'column';
      const gap = parseFloat(cs.columnGap) || 0;
      const avail =
        link.clientWidth -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight) -
        (craft && sideBySide ? craft.offsetWidth + gap : 0);
      const need = name.scrollWidth;
      if (need > avail && avail > 0) scale = Math.min(scale, avail / need);
    });
    if (scale < 1) list.style.setProperty('--roster-fit', (scale * 0.98).toFixed(4));
  }
  let fitRaf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(fitRaf);
    fitRaf = requestAnimationFrame(fit);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();

  const initial = new URLSearchParams(location.search).get('role');
  if (initial && buttons.some((b) => b.dataset.filter === initial && !b.hidden)) {
    apply(initial);
    const sec = document.getElementById('roster');
    if (sec) requestAnimationFrame(() => sec.scrollIntoView());
  }
})();

