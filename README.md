# Brayden Moritz — Cinematographer Portfolio

A single-page static portfolio built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step. Deployed on Cloudflare Pages (auto-redeploys on every push to `main`).

**Live:** https://braydens-portfolio-website.pages.dev
**Repo:** https://github.com/ppenguin24/Braydens-Portfolio-Website

---

## Layout

The site is organized around a **radial project selector** on the hero, plus scrollable sections below.

- **Stage (hero)** — 6 featured works arranged around a ring. Hover a spoke to preview its poster behind; click to play it in a modal.
- **About** — bio and meta (based, works, since).
- **Films** — full short-film list (includes the three on the radial plus any others).
- **Travel** — full travel-film list.
- **Design** — tile grid of graphic design.
- **Photography** — tile grid of stills.
- **Contact** — email and social links.

The radial is desktop-only. On mobile it collapses into a vertical list of the same 6 projects.

---

## File layout

```
.
├── index.html              # All page content (sections, radial spokes, reel items)
├── css/
│   └── styles.css          # All styling (tokens, radial geometry, views, modal)
├── js/
│   └── main.js             # Radial preview, video modal, mobile nav, custom cursor
├── images/
│   ├── placeholder.svg     # Fallback shown when an image path 404s
│   ├── hero.jpeg           # Stage background poster
│   ├── design/             # 01.jpeg, 02.png, 03.jpeg
│   └── photography/        # 01.jpg, 02.jpeg, 03.jpg, 04.jpeg
└── README.md
```

---

## Preview locally

```bash
cd "~/Desktop/Braydens Portfolio Website"
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Stop with `Ctrl+C`.

---

## How to edit

### Change a radial spoke (the 6 featured works)

Open `index.html`, find the `<ul class="radial-items">` block. Each spoke is a `<li class="radial-item" style="--i:N">` where `N` is 0–5 (position around the ring, starting at top, clockwise).

```html
<li class="radial-item" style="--i:0">
  <button class="spoke" type="button"
          data-video="xKcxjtx9H4Y"
          data-title="Rebuke"
          data-meta="Cinematic Short Film · 1st Place Award"
          data-year="2024"
          data-kind="Film">
    <span class="spoke-dot" aria-hidden="true"></span>
    <span class="spoke-label">
      <span class="spoke-num">01</span>
      <span class="spoke-name">Rebuke</span>
    </span>
  </button>
</li>
```

- `data-video` — YouTube ID (the part after `v=`)
- `data-title`, `data-meta`, `data-year`, `data-kind` — shown in the ring center on hover, and in the modal on click
- `spoke-num` / `spoke-name` — small label printed next to the dot on the ring

To reorder or swap, change the `--i` values (0 = top, 1 = upper-right, 2 = lower-right, 3 = bottom, 4 = lower-left, 5 = upper-left) and/or change the `data-video` + name.

### Add or edit a film/travel entry (the reel lists)

Same pattern, under `<section id="films">` or `<section id="travel">`. Copy a `<li class="reel-item">` block and update:

```html
<button class="reel-trigger" type="button" data-video="ID_HERE" data-title="Title" data-meta="Subtitle">
  <span class="reel-num">06</span>
  <span class="reel-title">Title</span>
  <span class="reel-meta">Subtitle</span>
  <span class="reel-year">2026</span>
  <span class="reel-cue" aria-hidden="true">Play</span>
</button>
```

### Replace Design / Photography tiles

Drop a file in `images/design/` or `images/photography/`. Either keep the same filename (overwrites) or update both `src="..."` and `href="..."` on that tile's `<a class="tile">`. The fallback script in `<head>` tries `.jpeg / .jpg / .png` (+ uppercase) if the initial path 404s.

### Change colors, fonts, or radial size

Edit the `:root { ... }` block at the top of `css/styles.css`:

```css
--bg:          #0A0A0A;
--text:        #EFEBE4;
--text-dim:    #B8B4AD;
--text-mute:   #6F6B65;
--radial-size: min(78vh, 640px);
```

### Hero background image

Save a landscape JPEG at `images/hero.jpeg` (roughly 2400px wide). The stage applies a grayscale + darken filter in CSS, so high-contrast frames work best. On hover over a radial spoke, the poster swaps to that YouTube video's thumbnail automatically.

### Contact / social

Edit the `<section id="contact">` block in `index.html`.

---

## Deploying

Every push to `main` triggers a Cloudflare rebuild (usually live in under a minute).

```bash
git add .
git commit -m "Describe what changed"
git push
```

---

## Troubleshooting

- **Wrong image shows** — likely a CDN cache ghost. Renaming the file is the reliable fix; incognito window confirms.
- **Image not showing** — check case: `01.JPG` ≠ `01.jpg` on the server. Prefer lowercase.
- **Radial looks crowded / labels overlap** — lower `--radial-size` or shorten spoke names.
- **Change didn't appear** — hard refresh (`Cmd+Shift+R`). Still missing? Check the Cloudflare Pages deploy log.
- **Push rejected** — `git pull --rebase` then `git push`.
- **YouTube embed blank** — video must allow embedding in YouTube Studio.
