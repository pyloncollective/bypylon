/* ==========================================================================
   PYLON PICTURES — SITE ANALYTICS & CREW TELEMETRY (analytics.js)
   - Cloudflare Web Analytics (pageviews, Core Web Vitals, referrers, devices)
   - Google Sheets Live Telemetry (Site_Traffic + Crew_Activity + Sheet1 sync)
   ========================================================================== */
(() => {
  'use strict';

  // Central config: update these two values once deployed
  const CONFIG = {
    CLOUD_ENDPOINT: 'https://script.google.com/macros/s/AKfycbyB9xsyedDeQ6SMAFK9YR4eY-yRtDkrBDT-GCP6RDiiEom9H7F5spgCj0ueQEsnLo4mzg/exec',   // Google Apps Script Web App (/exec) URL
    CF_BEACON_TOKEN: '98823fa98d0c4355a6c3892e8f8ccb8b'   // Cloudflare Web Analytics site token
  };

  window.PYLON_ANALYTICS_CONFIG = CONFIG;

  // 1. Load Cloudflare Web Analytics beacon if token is configured
  if (CONFIG.CF_BEACON_TOKEN && !document.querySelector('script[data-cf-beacon]')) {
    const cf = document.createElement('script');
    cf.defer = true;
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', JSON.stringify({ token: CONFIG.CF_BEACON_TOKEN }));
    document.head.appendChild(cf);
  }

  // Session ID (ephemeral per browser tab session, no cookies/PII)
  const SESS_KEY = 'pylon_sid_v1';
  let sid = '';
  try {
    sid = sessionStorage.getItem(SESS_KEY);
    if (!sid) {
      sid = 's_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
      sessionStorage.setItem(SESS_KEY, sid);
    }
  } catch (_) {
    sid = 's_anon';
  }

  function getDeviceLabel() {
    const ua = navigator.userAgent || '';
    if (/iPhone|iPod/i.test(ua)) return 'iPhone';
    if (/iPad/i.test(ua)) return 'iPad';
    if (/Android/i.test(ua)) return /Mobile/i.test(ua) ? 'Android Phone' : 'Android Tablet';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac';
    if (/Windows/i.test(ua)) return 'Windows';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Other';
  }

  function getViewportLabel() {
    return `${window.innerWidth}x${window.innerHeight}`;
  }

  function sendToCloud(payload) {
    const url = (window.PYLON_ANALYTICS_CONFIG && window.PYLON_ANALYTICS_CONFIG.CLOUD_ENDPOINT) || CONFIG.CLOUD_ENDPOINT;
    if (!url) return;
    const body = JSON.stringify(payload);
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
        if (navigator.sendBeacon(url, blob)) return;
      }
    } catch (_) {}
    try {
      fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body
      }).catch(() => {});
    } catch (_) {}
  }

  // Public helper for site-wide events -> Site_Traffic tab
  function trackSiteEvent(eventName, target = '') {
    sendToCloud({
      action: 'site_event',
      event: eventName,
      pagePath: window.location.pathname + window.location.hash,
      pageTitle: document.title || '',
      referrer: document.referrer || '(direct)',
      target: String(target || '').slice(0, 200),
      device: getDeviceLabel(),
      viewport: getViewportLabel(),
      sessionId: sid
    });
  }

  // Public helper for crew portal events -> Crew_Activity tab (+ Sheet1 login stats)
  function trackPortalEvent({ username, fullName, eventAction, step, detail }) {
    sendToCloud({
      action: 'portal_event',
      username: username || '',
      fullName: fullName || '',
      eventAction: eventAction || '',
      step: step || '',
      detail: String(detail || '').slice(0, 300),
      device: getDeviceLabel(),
      viewport: getViewportLabel(),
      referrer: document.referrer || '(direct)'
    });
  }

  window.pylonAnalytics = {
    trackSiteEvent,
    trackPortalEvent,
    getDeviceLabel,
    getViewportLabel,
    getEndpoint: () => (window.PYLON_ANALYTICS_CONFIG && window.PYLON_ANALYTICS_CONFIG.CLOUD_ENDPOINT) || CONFIG.CLOUD_ENDPOINT
  };

  // 2. Track initial page view
  trackSiteEvent('page_view');

  // 3. Track key clicks (roster cards, crew portal link, external links, inquiry submit)
  document.addEventListener('click', (e) => {
    const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const label = (link.textContent || link.getAttribute('aria-label') || href).trim().replace(/\s+/g, ' ').slice(0, 80);

    if (href.includes('roster/')) {
      trackSiteEvent('roster_click', `${label} (${href})`);
    } else if (href.includes('portal')) {
      trackSiteEvent('portal_link_click', href);
    } else if (/^https?:\/\//i.test(href) && !href.includes(window.location.hostname)) {
      trackSiteEvent('outbound_click', `${label} -> ${href}`);
    }
  }, { passive: true });

  // Track inquiry form submission if present
  const inqForm = document.getElementById('inqForm');
  if (inqForm) {
    inqForm.addEventListener('submit', () => {
      trackSiteEvent('inquiry_submit', 'Contact Form');
    });
  }
})();

