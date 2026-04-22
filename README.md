# Brayden Moritz — Portfolio Site

A single-page static portfolio built with plain HTML, CSS, and a tiny bit of vanilla JavaScript. No frameworks, no build step. Deployed on Cloudflare Pages (auto-redeploys on every push to GitHub).

**Live:** https://braydens-portfolio-website.pages.dev
**Repo:** https://github.com/ppenguin24/Braydens-Portfolio-Website

---

## File layout

```
.
├── index.html              # All page content (edit text + links here)
├── css/
│   └── styles.css          # All styling (colors, layout, fonts)
├── js/
│   └── main.js             # Mobile menu, footer year, tile link sync
├── images/
│   ├── placeholder.svg     # Fallback shown when a real image is missing
│   ├── hero.jpeg           # Hero background photo
│   ├── design/             # 3 tiles: 01.jpeg, 02.png, 03.jpeg
│   └── photography/        # 4 tiles: 01.jpg, 02.jpeg, 03.jpg, 04.jpeg
└── README.md
```

---

## Preview the site locally

```bash
cd "~/Desktop/Braydens Portfolio Website"
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). Stop with `Ctrl+C`.

---

## How to update content

### Change the headline, tagline, or bio
Open `index.html`. Edit text inside `<section id="home">` (hero) or `<section id="about">` (bio).

### Replace the hero background image
Save a landscape JPEG at `images/hero.jpeg` (any size; ~2400px wide recommended). If you use a different extension, also update `src="images/hero.jpeg"` in `index.html`.

### Add or swap Short Films / Travel Videos
1. Grab the video's ID (the part after `v=` in the YouTube URL).
2. In `index.html`, find `<section id="short-films">` or `<section id="travel">`.
3. Copy an existing `<article class="video-card">` block; paste a new one.
4. Replace the ID in `src="https://www.youtube-nocookie.com/embed/ID_HERE"`.
5. Update the `<h3 class="card-title">` and `<p class="card-meta">` text.

### Replace Graphic Design / Photography tiles
The HTML currently points directly at the real filenames. Two ways to swap:

**Easiest — keep the same filename and extension:**
- Overwrite the file in place (e.g. drop a new file at `images/design/02.png` replacing the old one).

**Change the extension or add a new tile:**
1. Drop your new file in `images/design/` or `images/photography/`.
2. Open `index.html` and update both `src="..."` and `href="..."` on that tile's `<a class="tile">` block to match the new filename.
3. Safety net: the JS in `<head>` of `index.html` tries `.jpeg`, `.jpg`, `.png` (and uppercase) automatically if the initial path 404s, so mistakes generally still load.

### Add more tiles (each section currently has 3 design / 4 photo)
Copy an existing `<a class="tile">` block and paste below it. Update the filename.

### Change colors, fonts, or spacing
Edit the `:root { ... }` block at the top of `css/styles.css`:

```css
--accent-green: #2BD27B;
--accent-blue: #4DA8FF;
--bg: #0B0F0D;
```

### Update contact / social links
Edit the `<section id="contact">` block in `index.html`.

---

## Deploying updates

Every push to `main` triggers a Cloudflare rebuild (usually live in under a minute).

```bash
cd "~/Desktop/Braydens Portfolio Website"
git add .
git commit -m "Describe what changed"
git push
```

---

## Troubleshooting

- **Image shows the wrong picture** — likely a CDN cache ghost. If you renamed a file recently, the old path may still be cached at Cloudflare's edge or in your browser. Fixes: (a) bump the filename to something new, or (b) open an incognito window to confirm, or (c) purge cache from Cloudflare dashboard.
- **Image not showing at all** — check case: `01.JPG` is different from `01.jpg` on the server. Prefer lowercase extensions.
- **Change didn't appear** — hard refresh (`Cmd+Shift+R`). If still missing, check the Cloudflare Pages deploy log for errors.
- **Push rejected** — `git pull --rebase` then `git push` again.
- **YouTube embed blank** — confirm the video isn't set to private or "embedding disabled" in YouTube Studio.
- **Large image file** — Cloudflare Pages free tier limits per-file size. Keep images under ~5 MB; compress at squoosh.app before dropping in.
