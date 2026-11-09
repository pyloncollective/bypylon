# Pylon Collective — `04 | Tech, Web & Post` Team Setup & Live Build Guide
**Master Studio Email:** `pylon.collective@gmail.com`  
**GitHub Account:** `pyloncollective` (`https://github.com/pyloncollective/bypylon`)  
**Cloudflare Account:** `pylon.collective@gmail.com`  
**Production Website:** `https://bypylon.com`  
**Core Team:** Jackson McMurdo, Dario Butera, Jessica Binns  

---

## Step 1: Install Antigravity IDE on Dario & Jess's Macs
1. **AirDrop `Antigravity.app`** from Jackson's `/Applications` folder to Dario's Mac and Jess's Mac (or download from `https://antigravity.dev`).
2. Drag `Antigravity.app` into `/Applications` and open it.
3. Sign in with Google using **`pylon.collective@gmail.com`**.

---

## Step 2: Open the `bypylon` Website Folder on Dario & Jess's Macs
Either **AirDrop the `website/` folder** from Jackson's Mac onto Dario & Jess's Desktops (it already has the Git connection pointing to `https://github.com/pyloncollective/bypylon.git`!), **OR** run this inside Antigravity's terminal (`Cmd + J`):

```bash
cd ~/Desktop
git clone https://github.com/pyloncollective/bypylon.git pylon-website
cd pylon-website
git config user.email "pylon.collective@gmail.com"
git config user.name "Dario Butera (Pylon)"   # or "Jessica Binns (Pylon)"
```

Then in Antigravity: **File -> Open Folder...** and select the folder.

---

## Step 3: Authorize GitHub Push on Dario & Jess's Macs (One-Time Setup)
In Antigravity's terminal (`Cmd + J`) on Dario and Jess's Macs, run:
```bash
gh auth login -h github.com -p https -w
```
*(Or if `gh` isn't installed, paste a GitHub Personal Access Token from `github.com/pyloncollective` when prompted for a password on the first `git push`).*

---

## Step 4: The 3-Person Vibe-Coding Loop
Whenever any of you wants to update `bypylon.com`:

1. **Pull Latest Changes First:**
   Tell Antigravity: *"Pull the latest changes from GitHub"* (`git pull origin main`).
2. **Vibe-Code & Preview Locally:**
   Tell Antigravity what layout, animation, or section to build, and preview it at **`http://localhost:8000`** (`python3 -m http.server 8000`).
3. **Push Live to `bypylon.com`:**
   Tell Antigravity: *"Commit and push my changes to main"* (`git add . && git commit -m "Update" && git push origin main`).
   Within **30–45 seconds**, it goes live at **`https://bypylon.com`**!
