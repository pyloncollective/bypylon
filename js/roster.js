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
    if (filter === 'all') url.searchParams.delete('role');
    else url.searchParams.set('role', filter);
    history.replaceState(null, '', url);
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => apply(btn.dataset.filter)));

  const initial = new URLSearchParams(location.search).get('role');
  if (initial && buttons.some((b) => b.dataset.filter === initial && !b.hidden)) apply(initial);
})();

