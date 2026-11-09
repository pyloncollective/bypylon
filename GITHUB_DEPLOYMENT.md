# Pylon — GitHub Repository and Deployment Guide

This document defines how the Pylon website (`bypylon.com`) is hosted on GitHub Pages for $0/month, with automatic deployments, version control, and free SSL.

---

## Active Repository and Deployment Status

* Repository URL: https://github.com/pyloncollective/bypylon
* Production URL: https://bypylon.com
* Redirect URL: http://www.bypylon.com -> https://bypylon.com
* Branch: `main`
* Build Engine: GitHub Pages (Root path `/`) + Cloudflare CDN / R2
* SSL Certificate: Let's Encrypt (Issued, HTTPS Enforced)
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

GitHub Pages will automatically build and publish changes to `https://bypylon.com` within 30-45 seconds.

---

## Local Staging for Preview

To preview the website locally before committing or during meetings without publishing to production:

```bash
cd /Users/jacksonmcmurdo/Desktop/Pylon/website
python3 -m http.server 8000
```

Open `http://localhost:8000` in any browser.

