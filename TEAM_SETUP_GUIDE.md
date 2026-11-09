# Pylon Collective — `04 | Tech, Web & Post` Onboarding & Live Build Guide
**Master Studio Email:** `pylon.collective@gmail.com`  
**Production Website:** `https://bypylon.com`  
**Core Team:** Jackson McMurdo, Dario Butera, Jessica Binns  

This runbook gets Jackson, Dario, and Jess set up on your own Macs using **Antigravity IDE**, **GitHub**, and **Cloudflare** under the shared `pylon.collective@gmail.com` account so all three of you can vibe-code and deploy directly to `bypylon.com`.

---

## Step 1: Unify GitHub & Cloudflare Under `pylon.collective@gmail.com` (5 Mins)

Right now, the website code is hosted at `https://github.com/mukpostproduction-debug/bypylon`. To keep Pylon Collective 100% separate from Muk Post and under the shared Pylon email:

### Option A (Fastest — Do This Right Now): Add Pylon Email as Collaborator / Transfer Repo
1. **Create/Log into the Pylon GitHub Account:**
   * Open an incognito window (or Dario/Jess's laptop) and go to `https://github.com/signup`.
   * Sign up (or sign in) using **`pylon.collective@gmail.com`** with username **`bypylon`** (or **`pyloncollective`**).
2. **Transfer or Share the `bypylon` Repository:**
   * On Jackson's laptop (`mukpostproduction-debug`), go to `https://github.com/mukpostproduction-debug/bypylon/settings` -> **Collaborators** -> Invite `bypylon` (or scroll to the bottom Danger Zone -> **Transfer ownership** to the new `bypylon` account).
   * *Bonus:* Even if you transfer the repo to the new `bypylon` GitHub account, GitHub Pages automatically keeps `bypylon.com` live via the `CNAME` file!

### Create the Shared Pylon Cloudflare Account
1. Go to `https://dash.cloudflare.com/sign-up`.
2. Sign up using **`pylon.collective@gmail.com`**.
3. This gives all three of you access to **Cloudflare Pages** and **Cloudflare R2** (10 GB free zero-egress video storage for our hero reels and hover loops).

---

## Step 2: Install Antigravity IDE on Dario & Jess's Macs

On both **Dario's Mac** and **Jessica's Mac**:

1. **Download & Open Antigravity:**
   * Download Antigravity for macOS (`https://antigravity.dev` or AirDrop the `Antigravity.app` installer directly from Jackson's Mac to Dario and Jess's Macs — AirDrop is way faster!).
   * Drag `Antigravity.app` into the `/Applications` folder and open it.
2. **Sign In with the Shared Pylon Google Account:**
   * When Antigravity prompts you to sign in with Google, sign in using **`pylon.collective@gmail.com`**.
   * Now all three of you share the exact same Google account access for Antigravity!

---

## Step 3: Clone the `bypylon.com` Website Repo on Dario & Jess's Macs

Once Antigravity is open on Dario's and Jess's Macs, open the integrated terminal inside Antigravity (`Ctrl + ~` or `Cmd + J`) or just tell the Antigravity AI chat: *"Run these setup commands for me"*:

```bash
# 1. Install GitHub CLI (if not already installed) or use Git directly
# Clone the live bypylon.com website repository onto Desktop:
cd ~/Desktop
git clone https://github.com/mukpostproduction-debug/bypylon.git pylon-website
cd pylon-website

# 2. Set your Git identity so we know who pushed which update, tied to the Pylon email:
# (On Dario's Mac):
git config user.name "Dario Butera (Pylon)"
git config user.email "pylon.collective@gmail.com"

# (On Jess's Mac):
git config user.name "Jessica Binns (Pylon)"
git config user.email "pylon.collective@gmail.com"
```

Then, inside Antigravity on Dario & Jess's Macs:
* Click **File -> Open Folder...** and select `~/Desktop/pylon-website` (or on Jackson's Mac, `/Users/jacksonmcmurdo/Desktop/Pylon/website`).

---

## Step 4: Authenticate GitHub on All 3 Macs (So Push Works Without Errors)

To allow Dario and Jess's Macs to run `git push` straight to `bypylon.com`, authenticate once inside the terminal:

```bash
# Authenticate with GitHub CLI (easiest method):
gh auth login
# Select: GitHub.com -> HTTPS -> Yes -> Login with a web browser
# Log in using the shared Pylon GitHub account (or personal GitHub invited as collaborator)
```

*(If `gh` isn't installed on Dario or Jess's Mac, you can generate a Classic Personal Access Token in GitHub -> **Settings** -> **Developer Settings** -> **Personal Access Tokens (Tokens classic)** -> check `repo`, and paste that token when Git asks for a password on the first `git push`).*

---

## Step 5: The Golden 3-Person Workflow (So You Never Overwrite Each Other's Work)

Since all three of you will be vibe-coding on the same repository, follow this simple 3-step loop every time you sit down to edit the site:

### 1. ALWAYS Pull Before You Start Vibe-Coding
Tell Antigravity: *"Pull the latest website changes"* (or run in terminal):
```bash
git pull origin main
```

### 2. Vibe-Code & Preview Locally (`localhost:8000`)
Tell Antigravity what you want to build or change (e.g., *"Add a full-bleed dark cinema hero section with a project grid below it"*), and preview it locally on your Mac before pushing it live:
```bash
python3 -m http.server 8000
```
Open **`http://localhost:8000`** in Chrome/Safari to see your changes live.

### 3. Push Live to `bypylon.com`
When it looks good locally, tell Antigravity: *"Commit and push my changes to main"*:
```bash
git add .
git commit -m "Describe what you updated"
git push origin main
```
Within **30–45 seconds**, your update is live at **`https://bypylon.com`**! Tell the others in the `04 | Tech, Web & Post` WhatsApp chat to run `git pull` so their Macs get your new changes.

