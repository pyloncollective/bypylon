# pylonpictures.com — Master DNS, GitHub Pages & Google Workspace Configuration

**Primary Domain:** `pylonpictures.com`  
**Registrar:** Spaceship (Namecheap Inc.)  
**Registration Date:** November 16, 2026 (Active through Nov 17, 2027)  
**Secondary / Redirect Domains:** `bypylon.com` (Spaceship, exp Oct 24, 2027 — 301 Redirect), `pyloncollective.com` (Squarespace legacy, exp Sep 2027)  
**Owner / Technical Lead:** Jackson McMurdo (`mcmurdo.jackson@gmail.com`)  
**Target Hosting:** GitHub Pages ($0/mo, Automated Let's Encrypt SSL)  
**Email Infrastructure:** Google Workspace Business Starter (1 Admin Seat + Free Google Groups Routing)

---

## 1. GitHub Pages DNS Records (Spaceship -> Advanced DNS)

Verified live on `launch1.spaceship.net` / `launch2.spaceship.net`:

### Apex Domain (`A` Records)
| Type | Host / Name | Value / Points To | TTL | Status |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | Automatic / 30m | Live |
| **A** | `@` | `185.199.109.153` | Automatic / 30m | Live |
| **A** | `@` | `185.199.110.153` | Automatic / 30m | Live |
| **A** | `@` | `185.199.111.153` | Automatic / 30m | Live |

### Subdomain (`CNAME` Record)
| Type | Host / Name | Value / Points To | TTL | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `pylonpictures.github.io` | Automatic / 30m | Rename GitHub account `pyloncollective` -> `pylonpictures` so username matches 1:1 |

---

## 2. Google Workspace DNS Records (Spaceship -> Advanced DNS)

Add these records alongside the GitHub Pages `A` and `CNAME` records (do **not** delete the four `185.199.xxx.153` `A` records):

| Type | Host / Name | Value / Points To | Priority | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **TXT** | `@` | `google-site-verification=<token>` | — | Google Workspace domain ownership verification |
| **MX** | `@` | `smtp.google.com` | `1` | Routes all `@pylonpictures.com` inbound mail to Google Workspace |
| **TXT** | `@` | `v=spf1 include:_spf.google.com ~all` | — | SPF anti-spoofing (keeps outbound emails out of spam) |
| **TXT** | `google._domainkey` | `v=DKIM1; k=rsa; p=<generated-in-admin>` | — | Generate inside `admin.google.com` -> Apps -> Gmail -> Authenticate email |
| **TXT** | `_dmarc` | `v=DMARC1; p=none; rua=mailto:admin@pylonpictures.com` | — | Basic DMARC alignment required by Gmail/Yahoo |

---

## 3. Single-Seat Google Workspace + Google Groups Architecture

1. **Create Only 1 Paid Seat:** Use `admin@pylonpictures.com` (or `studio@pylonpictures.com`) as the single paid Business Starter license (`~$11 CAD/mo`).
2. **Enable External Posting on Every Group (Critical):**
   * In `admin.google.com` -> **Directory -> Groups -> Create group**:
   * Under **Access settings**, check **"External -> Anyone on the web -> Publish posts"** AND **"Allow members outside your organization"**. *(If "Anyone on the web -> Publish posts" is left unchecked, outside clients emailing `@pylonpictures.com` will get a bounce error).*

### Shared Studio Inboxes (Google Groups)
* `contact@pylonpictures.com` -> General inquiries (`03 | Operations` + `01 | Client & Outreach`: Maya, Justin, Declan, Misan, Mason, Jackson)
* `workwithus@pylonpictures.com` -> Commercial & music video inbound (`01 | Client & Outreach`: Declan, Misan, Mason, Justin)

### 11-Member `@pylonpictures.com` Routing Directory (Copy-Paste Ready)

| Group Email (`@pylonpictures.com`) | Member Name | Destination Personal Email |
| :--- | :--- | :--- |
| `mason@pylonpictures.com` | Mason Cline | `Clinemase5@gmail.com` |
| `jackson@pylonpictures.com` | Jackson McMurdo | `mcmurdo.jackson@gmail.com` |
| `declan@pylonpictures.com` | Declan McKenna | `Declanfmckenna@gmail.com` |
| `maya@pylonpictures.com` | Maya Chariandy | `mayachariandy@gmail.com` |
| `jordan@pylonpictures.com` | Jordan Wong | `jordanmkwong@gmail.com` |
| `dario@pylonpictures.com` | Dario Butera | `dariob99@icloud.com` |
| `dickson@pylonpictures.com` | Dickson Ntiamoah | `dntiamoah8@gmail.com` |
| `jess@pylonpictures.com` *(alias `jessica@`)* | Jessica Binns | `jessbinnss@gmail.com` |
| `daniel@pylonpictures.com` | Daniel Fusco | `daniel.fusco.04@gmail.com` |
| `misan@pylonpictures.com` | Misan Edema | `misanedema38@gmail.com` |
| `justin@pylonpictures.com` | Justin Tan | `justin.c.tan2004@gmail.com` |

*(Optional: each member can also configure Gmail "Send mail as" via SMTP or reply directly once added to their personal group).*
