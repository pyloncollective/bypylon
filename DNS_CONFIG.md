# bypylon.com — Master DNS & Domain Configuration

**Domain:** `bypylon.com`  
**Registrar:** Spaceship (Namecheap Inc.)  
**Purchase Date:** October 24, 2026 (1-Year Registration, Renews Oct 24, 2027)  
**Order ID:** `a7fe03b4-df18-4412-9e01-ad12aef148db`  
**Receipt Number:** `QR-202610242258027`  
**Owner / Contact:** Jackson McMurdo (`mcmurdo.jackson@gmail.com`)  
**Target Hosting:** GitHub Pages (Free SSL, Global CDN)

---

## 🌐 Required DNS Records for GitHub Pages

To point `bypylon.com` directly to GitHub Pages, log into **Spaceship** → **Domain List** → **bypylon.com** → **Advanced DNS** (or DNS Manager), and add the following 5 records:

### 1. Apex Domain (A Records)
Add four `A` records pointing `@` (or blank root) to GitHub's Anycast IP addresses:

| Type | Host / Name | Value / Points To | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | Automatic / 1 Hour | GitHub Pages Anycast Node 1 |
| **A** | `@` | `185.199.109.153` | Automatic / 1 Hour | GitHub Pages Anycast Node 2 |
| **A** | `@` | `185.199.110.153` | Automatic / 1 Hour | GitHub Pages Anycast Node 3 |
| **A** | `@` | `185.199.111.153` | Automatic / 1 Hour | GitHub Pages Anycast Node 4 |

### 2. Subdomain (CNAME Record)
Add one `CNAME` record to route `www.bypylon.com` to your GitHub Pages URL:

| Type | Host / Name | Value / Points To | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `pyloncollective.github.io` | Automatic / 1 Hour | Routes www to GitHub Pages |

---

## 🔒 SSL / HTTPS Security Settings
* **Certificate Authority:** Let's Encrypt (automatically provisioned for free by GitHub Pages).
* **Enforce HTTPS:** Once DNS propagates, check **"Enforce HTTPS"** in GitHub repository settings.
* **CAA Records:** Not required (default Spaceship CAA allows Let's Encrypt).

---

## 📧 Email DNS (When Setting up Google Workspace or Forwarding)
When you're ready to activate `contact@bypylon.com` or `jackson@bypylon.com`, add:
* **Spaceship Free Email Forwarding** (zero cost):
  Forward `contact@bypylon.com` → `pylon.collective@gmail.com`
  Forward `jackson@bypylon.com` → `mcmurdo.jackson@gmail.com`
  *(Takes 60 seconds inside Spaceship dashboard under "Email Forwarding").*
