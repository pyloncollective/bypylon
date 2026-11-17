# Pylon Pictures — GitHub Repository and Deployment Guide

This document defines how the Pylon Pictures website (`pylonpictures.com`) is hosted on GitHub Pages for $0/month, with automatic deployments, version control, and free SSL.

---

## Active Repository and Deployment Status

* Repository URL: https://github.com/pyloncollective/bypylon *(rename account/repo to `pylonpictures/pylonpictures.com` when ready — GitHub auto-redirects old git URLs)*
* Production URL: https://pylonpictures.com
* Redirect URLs:
  * `http://www.pylonpictures.com` -> `https://pylonpictures.com`
  * `https://bypylon.com` -> `https://pylonpictures.com` (301 Redirect via Spaceship)
* Branch: `main`
* Build Engine: GitHub Pages (Root path `/`)
* SSL Certificate: Let's Encrypt (Automated, HTTPS Enforced)
* Hosting Cost: $0.00 / month

---

## Daily Deployment Workflow

Whenever updates are made to HTML, CSS, assets, or director portfolios in `website/`:

```bash
cd /Users/jacksonmcmurdo/Desktop/Pylon/website
git add .
git commit -m "Update portfolio reels and crew credits"
git push origin main
```

GitHub Pages will automatically build and publish changes to `https://pylonpictures.com` within 30-45 seconds.

---

## Local Staging for Preview

To preview the website locally before committing or during meetings without publishing to production:

```bash
cd /Users/jacksonmcmurdo/Desktop/Pylon/website
python3 -m http.server 8000
```

Open `http://localhost:8000` in any browser.
