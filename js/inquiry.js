/* ==========================================================================
   PYLON — Studio inquiry (step-by-step contact form)
   4 steps: Interest → Project → Brief → You. Posts to the same Formspree
   inbox as the individual portfolio forms, tagged as a studio inquiry.
   ========================================================================== */

(() => {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  const ENDPOINT = 'https://formspree.io/f/xrpzyngg';
  const FALLBACK_EMAIL = 'contact@pylonpictures.com';

  const steps = Array.from(form.querySelectorAll('.inq-step'));
  const total = steps.length;
  const progress = Array.from(document.querySelectorAll('#inqProgress li'));
  const backBtn = document.getElementById('inqBack');
  const nextBtn = document.getElementById('inqNext');
  const submitBtn = document.getElementById('inqSubmit');
  const countEl = document.getElementById('inqCount');
  const statusEl = document.getElementById('inqStatus');
  const navEl = document.getElementById('inqNav');
  const doneEl = document.getElementById('inqDone');
  const restartBtn = document.getElementById('inqRestart');

  let current = 1;

  const setStatus = (msg, kind = '') => {
    statusEl.textContent = msg;
    statusEl.className = 'inq-status' + (kind ? ` is-${kind}` : '');
  };

  function show(n, { focus = true } = {}) {
    current = n;
    steps.forEach((s) => {
      const on = Number(s.dataset.step) === n;
      s.hidden = !on;
      s.classList.toggle('is-active', on);
    });
    progress.forEach((li, i) => {
      li.classList.toggle('is-current', i + 1 === n);
      li.classList.toggle('is-done', i + 1 < n);
      if (i + 1 === n) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
    });
    backBtn.hidden = n === 1;
    nextBtn.hidden = n === total;
    submitBtn.hidden = n !== total;
    countEl.textContent = `Step ${n} of ${total}`;
    setStatus('');
    if (focus) {
      const q = steps[n - 1].querySelector('.inq-q');
      if (q) q.focus({ preventScroll: true });
      const top = form.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.6) {
        document.querySelector('.inquiry').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function validate(n) {
    const step = steps[n - 1];
    step.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));

    // Required option groups (at least one ticked)
    for (const group of step.querySelectorAll('.inq-options[data-required="true"]')) {
      if (!group.querySelector('input:checked')) {
        group.classList.add('is-invalid');
        setStatus('Pick at least one option to continue.', 'error');
        const first = group.querySelector('input');
        if (first) first.focus();
        return false;
      }
    }

    // Required text fields
    for (const input of step.querySelectorAll('input[required], textarea[required]')) {
      const val = input.value.trim();
      const bad = !val || (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
      if (bad) {
        input.closest('.inq-field')?.classList.add('is-invalid');
        const label = form.querySelector(`label[for="${input.id}"]`);
        const name = label ? label.textContent.replace('*', '').trim() : 'This field';
        setStatus(input.type === 'email' && val ? 'That email address doesn\u2019t look right.' : `${name} is required.`, 'error');
        input.focus();
        return false;
      }
    }
    return true;
  }

  // Clear error state as soon as the visitor fixes it
  form.addEventListener('input', (e) => {
    const f = e.target.closest('.inq-field, .inq-options');
    if (f && f.classList.contains('is-invalid')) {
      f.classList.remove('is-invalid');
      setStatus('');
    }
  });

  nextBtn.addEventListener('click', () => {
    if (validate(current)) show(Math.min(total, current + 1));
  });
  backBtn.addEventListener('click', () => show(Math.max(1, current - 1)));

  // Enter in a single-line input advances instead of submitting early
  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.target.tagName !== 'INPUT') return;
    if (e.target.type === 'checkbox' || e.target.type === 'radio') return;
    if (current < total) {
      e.preventDefault();
      nextBtn.click();
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (current !== total) {
      nextBtn.click();
      return;
    }
    if (!validate(current)) return;

    const fd = new FormData(form);
    if (fd.get('_gotcha')) return; // honeypot

    const interests = fd.getAll('interests');
    fd.delete('interests');
    fd.append('interests', interests.join(', '));
    fd.append('artist', 'Pylon Pictures (Studio)');
    fd.append('source', 'pylonpictures.com — Contact');
    const who = fd.get('company') ? `${fd.get('name')} (${fd.get('company')})` : fd.get('name');
    fd.append('_subject', `[Pylon Pictures — Studio Inquiry] ${interests[0] || 'New project'} · ${who}`);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending\u2026';
    setStatus('');

    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('Submission failed');
      steps.forEach((s) => { s.hidden = true; });
      navEl.hidden = true;
      progress.forEach((li) => { li.classList.remove('is-current'); li.classList.add('is-done'); });
      doneEl.hidden = false;
      doneEl.focus({ preventScroll: true });
    } catch (err) {
      setStatus(`Couldn\u2019t send just now. Please try again in a moment, or write to ${FALLBACK_EMAIL}.`, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send inquiry';
    }
  });

  restartBtn.addEventListener('click', () => {
    form.reset();
    doneEl.hidden = true;
    navEl.hidden = false;
    show(1);
  });

  show(1, { focus: false });
})();
