# Brayden Moritz — Cinematographer Portfolio

A single-page static portfolio built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step. Deployed on Cloudflare Pages (auto-redeploys on every push to `main`, usually live in under a minute).

**Live:** https://braydens-portfolio-website.pages.dev
**Repo:** https://github.com/ppenguin24/Braydens-Portfolio-Website

---

## Layout

A single long page. The top is a cinematic stage with a radial project selector; below are numbered content sections (01–09). The page ends with a contact section that mirrors the stage treatment (dimmed full-bleed image with content on top), so the page opens and closes with matching frames.

| # | Section | `id` | What's there |
|---|---------|------|--------------|
| — | Stage | `home` | Radial menu of 6 featured works; hover previews the YouTube thumbnail behind; click opens modal |
| 01 | About | `about` | Bio, meta (Based / Works / Since / Part of) |
| 02 | Films | `films` | 6 narrative / action short films (reel list with thumbs + Play cue) |
| 03 | Travel | `travel` | 4 international travel films |
| 04 | Documentary | `documentary` | 3 doc / mini-doc entries |
| 05 | Design | `design` | 4 film poster tiles (2:3 aspect, 4-column grid) |
| 06 | Photography | `photography` | 32 stills; first 20 visible, 12 behind a "Show 12 more" toggle. 16:9 tiles, 4-column grid, hue-sorted |
| 07 | Current Work | `current` | Full-bleed looping hero video + poster (left) + film blurb + role chips (right) |
| 08 | Awards | `awards` | Stat grid (Cinematography, Editing, 48-hour wins, Scholarships) + editorial list of wins/screenings |
| 09 | Contact | `contact` | Email, social links (grouped: YT, IG, LinkedIn), sandunes full-bleed bg |

The radial is desktop-only. On mobile it collapses to a vertical list of the same 6 projects.

---

## File layout

```
.
├── index.html              # All page content; 9 sections + stage + header + video modal
├── css/
│   └── styles.css          # All styling. Tokens live in :root at the top
├── js/
│   └── main.js             # Radial preview, YouTube modal, mobile nav, custom cursor,
│                           # gallery show-more toggle, tile href sync
├── images/
│   ├── hero.jpeg           # Stage (top) background poster
│   ├── sandunes.jpg        # Contact section background (bookend to stage)
│   ├── placeholder.svg     # Fallback if a real image 404s
│   ├── brand/
│   │   └── crimsonflare.png   # CrimsonFlare Productions mark (used in About + Contact)
│   ├── design/             # 4 film poster JPGs (01-04.jpg)
│   ├── photography/        # 32 stills (01-32.jpg, hue-sorted warm → cool)
│   └── current/
│       ├── the-freezing-poster.jpg
│       └── the-freezing-loop.mp4     # 2 MB H.264, autoplay loop for Current section
├── README.md
└── .gitignore              # Ignores *.mp4 in films/, *.pdf in design/, raw .mov sources
```

---

## Preview locally

```bash
cd ~/Desktop/Braydens\ Portfolio\ Website
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Stop with `Ctrl+C`.

---

## How to edit common things

### Add / swap a radial spoke (the 6 featured works on the stage)

In `index.html`, find `<ul class="radial-items">`. Each spoke is a `<li class="radial-item" style="--i:N">`, where `N` is 0–5 (0 = top, then clockwise).

```html
<li class="radial-item" style="--i:0">
  <button class="spoke" type="button"
          data-video="xKcxjtx9H4Y"
          data-title="Rebuke"
          data-meta="Cinematic Short Film &middot; 1st Place Award"
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

- `data-video` — YouTube video ID (the 11-char part after `v=`)
- `data-title` / `data-meta` / `data-year` / `data-kind` — shown in the ring center on hover, and in the modal on click
- `spoke-num` / `spoke-name` — small label next to the dot

To reorder, swap `--i` values. To replace, change `data-video` + title + name.

### Add / edit a reel entry (Films / Travel / Documentary)

Same pattern in each section's `<ol class="reel-list">`. Copy one `<li class="reel-item">` and update:

```html
<li class="reel-item">
  <button class="reel-trigger" type="button" data-video="YT_ID" data-title="Title" data-meta="Subtitle">
    <span class="reel-num">04</span>
    <span class="reel-thumb"><img src="https://i.ytimg.com/vi/YT_ID/mqdefault.jpg" alt="" loading="lazy"></span>
    <span class="reel-title">Title</span>
    <span class="reel-meta">Subtitle</span>
    <span class="reel-year">2026</span>
    <span class="reel-cue" aria-hidden="true">Play</span>
  </button>
</li>
```

Keep `reel-num` sequential within the section.

### Add / remove a Design poster

Design is numbered tile grid (`images/design/01.jpg` … `04.jpg`). If you drop a new poster PDF in `images/design/` you can convert it with Python (PIL + sips for PDFs) — ask Claude to do it. Source PDFs are gitignored; only the rendered JPG gets committed.

### Add / remove Photography stills

Photos are named `01.jpg` through `NN.jpg`. Adding: drop new JPGs in `images/photography/` and ask Claude to rename + add HTML tiles + optionally re-sort by hue + resize to 1600 px edge / JPEG q82. The grid caps at 20 visible; anything past the 20th gets an `is-extra` class and lives behind the "Show more" toggle. To remove specific stills: tell Claude the numbers; deleting files alone isn't enough (HTML references each by name).

### Update a video in Current Work

Replace `images/current/the-freezing-loop.mp4` with a new H.264 file. If the source is HEVC / `.mov` / high-bitrate, ask Claude to compress (ffmpeg is installed — one command transcodes to 1920-wide H.264 q23, strips audio, adds `faststart` moov).

### Change colors, fonts, radial size

Edit the `:root { ... }` block at the top of `css/styles.css`:

```css
--bg:          #0A0A0A;
--text:        #EFEBE4;
--text-dim:    #B8B4AD;
--text-mute:   #6F6B65;
--font-display: "Instrument Serif", serif;
--font-body:    "Inter", system-ui, sans-serif;
--radial-size: min(78vh, 640px);
```

### Hero / Contact background images

- Stage (top): `images/hero.jpeg`. Grayscale + darken filter is applied in CSS.
- Contact (bottom): `images/sandunes.jpg`. Same treatment, plus `object-position: 45% 50%` shifts the crop slightly rightward. Change that value to reposition the frame.

### Contact links

Edit `<section id="contact">` in `index.html`. Social rows are grouped by platform (YT × 2, IG × 2, LinkedIn). The CrimsonFlare row has the logo inline next to the handle.

---

## Deploying

```bash
git add <files you changed>
git commit -m "Describe what changed"
git push
```

Cloudflare Pages rebuilds on every push to `main`, typically live in under a minute. Hard-refresh (`Cmd+Shift+R`) to bypass cache.

---

## Constraints worth remembering

- **Cloudflare Pages: 25 MB per-file cap** on the free tier. Don't commit large raw media — compress to web sizes first (images: max 1600 px edge, JPEG q82; videos: H.264 1920-wide, CRF 23, no audio for loops).
- **Git history**: large blobs persist even if files are later removed. If you commit something big by mistake, ask Claude to amend + force-push + GC so the blob is cleaned up before it ships to GitHub's pack files.
- **No build step** is intentional. Don't add webpack/vite/etc. unless you really need to — editing `index.html` directly is the point.
- **`.gitignore` rules** (already in place):
  - `images/films/*.mp4` — raw film MP4s belong on YouTube/Vimeo, not in the repo
  - `images/design/*.pdf` — source poster PDFs don't ship; only the rendered JPG does
  - `*.mov`, `*.MOV` — raw QuickTime sources
  - `video/` — reserved for any future raw video folder

---

## Troubleshooting

- **Wrong image shows** — CDN cache ghost. Bump the filename, or wait / purge Cloudflare cache.
- **Image not showing** — check case: `01.JPG` ≠ `01.jpg` on the live server. Prefer lowercase.
- **Radial labels overlap** — lower `--radial-size` or shorten `spoke-name`.
- **Change didn't appear after push** — hard refresh (`Cmd+Shift+R`). Still missing? Check the Cloudflare Pages deploy log.
- **Push rejected** — `git pull --rebase` then `git push`.
- **YouTube embed blank** — video's "embedding" setting is off in YouTube Studio, or the video is private (not unlisted).
- **Video doesn't play on some browsers** — likely HEVC instead of H.264. Transcode to H.264 first.
