# Pylon Pictures — Web Engineering & Portfolio

**Lead Engineer:** Jackson McMurdo (Head of Operations & Post Supervisor)  
**Primary Domain:** `pylonpictures.com` (Registrar: Spaceship)  
**Redirect / Secondary Domains:** `bypylon.com` (Spaceship 301 Redirect), `pyloncollective.com` (Archived in `website/squarespace_archive/`)  
**Host Target:** GitHub Pages ($0/mo)  
**Developer Agent:** [`pylon-web-dev`](file:///Users/jacksonmcmurdo/Desktop/Pylon/.agents/skills/pylon-web-dev/SKILL.md)

This directory contains the complete source code, responsive styling, DNS records, and deployment automation for `pylonpictures.com`.

---

## Architecture & Guides
```
website/
├── index.html              <- Portfolio showcase, reel player & director roster
├── CNAME                   <- Maps to pylonpictures.com
├── DNS_CONFIG.md           <- Master DNS records (GitHub Pages + Google Workspace)
├── GITHUB_DEPLOYMENT.md    <- Step-by-step GitHub Pages & gh CLI deployment
├── TEAM_SETUP_GUIDE.md     <- Dario, Jess & Jackson multi-Mac Git workflow
├── backup_engine.py        <- Static mirror crawler for legacy Squarespace
├── squarespace_archive/    <- 102 MB full offline backup of legacy site
├── css/                    <- Custom responsive styling
├── js/                     <- Interactive video players & navigation
└── assets/                 <- Web stills, logos, and fonts
```

---

## Quick DNS Settings for pylonpictures.com
Points directly to GitHub Pages:
* `A` Record `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
* `CNAME` Record `www`: `pylonpictures.github.io`
*(Full GitHub + Google Workspace MX/SPF/Groups details in [`website/DNS_CONFIG.md`](file:///Users/jacksonmcmurdo/Desktop/Pylon/website/DNS_CONFIG.md)).*

---

## Local Development
```bash
# Start local preview:
cd /Users/jacksonmcmurdo/Desktop/Pylon/website
python3 -m http.server 8000
# Open http://localhost:8000
```
