# pylonpictures.com — Master DNS, GitHub Pages & Email Routing Configuration

**Primary Domain:** `pylonpictures.com`  
**Registrar:** Spaceship (Namecheap Inc.) — Invoice `QR-202611170002831` (`CA$13.84`)  
**Registration Date:** November 16, 2026 (Active through Nov 17, 2027)  
**Secondary / Redirect Domains:** `bypylon.com` (Spaceship, exp Oct 24, 2027 — 301 Redirect), `pyloncollective.com` (Squarespace legacy, exp Sep 2027)  
**Cloud Storage & AI Hub (10 Months Remaining):** `pylon.collective@gmail.com` (2 TB Google Drive + Google AI Pro + Master Calendars)  
**Target Web Hosting:** GitHub Pages ($0/mo, Automated Let's Encrypt SSL — HTTPS Enforced)  
**Email Stack (Next 10 Months):** Spaceship Free Domain Email Forwarding (Inbound) + Resend Free SMTP Relay (Outbound Gmail *"Send mail as"*, `3,000 emails/mo` free)

---

## 1. GitHub Pages DNS Records (Spaceship -> Advanced DNS)

Verified live with Let's Encrypt SSL active (`https://pylonpictures.com`):

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
| **CNAME** | `www` | `pylonpictures.github.io` | Automatic / 30m | Live (rename GitHub account `pyloncollective` -> `pylonpictures` so username matches 1:1) |

---

## 2. Important MX Rule: Spaceship Forwarding vs. Spacemail

A domain can only have **one** set of `MX` records handling incoming mail:
* **Do NOT enable Spacemail and Spaceship Domain Email Forwarding at the same time on `pylonpictures.com`** — turning on Spacemail (`mx1/mx2.spacemail.com`) disables Spaceship's free 100-rule Domain Email Forwarding, and Spacemail aliases only drop into one shared inbox rather than forwarding to 11 separate personal Gmails.
* **Cleanest $0/mo Architecture:**
  1. **Inbound (`MX`):** Use **Spaceship Domain Email Forwarding** (*Spaceship -> Domain Manager -> `pylonpictures.com` -> Email Forwarding*) — free, up to 100 rules, routes all 11 `<firstname>@` and all 6 studio/team addresses directly to members' personal inboxes.
  2. **Outbound Sending (`resend._domainkey` / `send` / `rsend` — Zero `@` `MX` Conflict):** Verified via **Resend** (`smtp.resend.com`, Port `465` SSL, Username `resend` — full member setup in [`docs/EMAIL_SETUP_RUNBOOK.md`](file:///Users/jacksonmcmurdo/Desktop/Pylon/docs/EMAIL_SETUP_RUNBOOK.md)). Because Resend scopes its records to `resend._domainkey`, `send`, and `rsend`, your root `@` Spaceship Forwarding `MX` and `SPF` records stay completely untouched, and all 11 members + 6 studio/team aliases can send authenticated `@pylonpictures.com` emails for **$0/mo**.

---

## 3. Active Email Forwarding Directory (`LIVE` on Spaceship `efwd`)

**Verified Live DNS Records (Nov 16, 2026):**
* `MX` (`@`, Priority `0`): `mx1.efwd.spaceship.net`, `mx2.efwd.spaceship.net`
* `TXT` (`@`): `"v=spf1 include:spf.efwd.spaceship.net ~all"` *(Note: if adding an outbound SMTP relay later, append its `include:` inside this same `v=spf1` string rather than creating a second SPF record).*

### A. Active Studio & Departmental Team Emails (7 Live Rules)
| Active `@pylonpictures.com` Email | Purpose / Team | Active Forwarding Recipients |
| :--- | :--- | :--- |
| `contact@pylonpictures.com` | General Studio Inquiries (Website Footer) | `pylon.collective@gmail.com`, `mayachariandy@gmail.com`, `declanfmckenna@gmail.com`, `mcmurdo.jackson@gmail.com`, `clinemase5@gmail.com` |
| `workwithus@pylonpictures.com` | `01 \| Client & Outreach` (Commercial / MV Inbound) | `pylon.collective@gmail.com`, `declanfmckenna@gmail.com`, `misanedema38@gmail.com`, `clinemase5@gmail.com`, `justin.c.tan2004@gmail.com` |
| `finance@pylonpictures.com` | `02 \| Finance & Books` (Invoices, Receipts & Bidding) | `pylon.collective@gmail.com`, `dntiamoah8@gmail.com`, `justin.c.tan2004@gmail.com`, `mcmurdo.jackson@gmail.com`, `declanfmckenna@gmail.com` |
| `ops@pylonpictures.com` | `03 \| Operations` (Call Sheets, Scheduling & Governance) | `pylon.collective@gmail.com`, `mayachariandy@gmail.com`, `justin.c.tan2004@gmail.com`, `mcmurdo.jackson@gmail.com` |
| `tech@pylonpictures.com` | `04 \| Tech, Web & Post` | `pylon.collective@gmail.com`, `mcmurdo.jackson@gmail.com`, `dariob99@icloud.com`, `jessbinnss@gmail.com` |
| `post@pylonpictures.com` | Post-Production Supervision | `mcmurdo.jackson@gmail.com`, `pylon.collective@gmail.com` |
| `brand@pylonpictures.com` | `05 \| Brand & Strategy` (Press, Screenings & Socials) | `pylon.collective@gmail.com`, `jordanmkwong@gmail.com`, `clinemase5@gmail.com`, `daniel.fusco.04@gmail.com`, `jessbinnss@gmail.com` |

### B. Active Individual Member Emails (11 Live Rules)
| Active `@pylonpictures.com` Email | Member Name | Destination Personal Email |
| :--- | :--- | :--- |
| `mason@pylonpictures.com` | Mason Cline | `clinemase5@gmail.com` |
| `jackson@pylonpictures.com` | Jackson McMurdo | `mcmurdo.jackson@gmail.com` |
| `declan@pylonpictures.com` | Declan McKenna | `declanfmckenna@gmail.com` |
| `maya@pylonpictures.com` | Maya Chariandy | `mayachariandy@gmail.com` |
| `jordan@pylonpictures.com` | Jordan Wong | `jordanmkwong@gmail.com` |
| `dario@pylonpictures.com` | Dario Butera | `dariob99@icloud.com` |
| `dickson@pylonpictures.com` | Dickson Ntiamoah | `dntiamoah8@gmail.com` |
| `jess@pylonpictures.com` | Jessica Binns | `jessbinnss@gmail.com` |
| `daniel@pylonpictures.com` | Daniel Fusco | `daniel.fusco.04@gmail.com` |
| `misan@pylonpictures.com` | Misan Edema | `misanedema38@gmail.com` |
| `justin@pylonpictures.com` | Justin Tan | `justin.c.tan2004@gmail.com` |
