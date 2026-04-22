# Brayden Moritz — Portfolio Site

A single-page static portfolio built with plain HTML, CSS, and a tiny bit of vanilla JavaScript. No frameworks, no build step. Deployed on Cloudflare Pages (auto-redeploys on every push to GitHub).

---

## File layout

```
.
├── index.html              # All page content (edit text + links here)
├── css/
│   └── styles.css          # All styling (colors, layout, fonts)
├── js/
│   └── main.js             # Mobile menu toggle + footer year
├── images/
│   ├── placeholder.svg     # Fallback shown when a real image is missing
│   ├── hero.jpg            # Drop your hero background photo here (optional)
│   ├── design/             # Drop graphic design images here as 01.jpg, 02.jpg, ...
│   └── photography/        # Drop photographs here as 01.jpg, 02.jpg, ...
└── README.md
```

---

## Preview the site locally

Open Terminal, `cd` into this folder, and run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Stop the server with `Ctrl+C`.

---

## How to update content

### Change the headline, tagline, or bio
Open `index.html`. Look for the `<section id="home">` (hero) and `<section id="about">` (bio). Edit the text between the tags. Save.

### Add or replace the hero background image
The hero section has a photo layer behind the big name. To set or swap it:

1. Save a landscape-oriented JPG at `images/hero.jpg`. Wide images (roughly 2400×1600 or bigger) look best.
2. No HTML edits needed — the page already points at that path. While no file exists, it falls back to the placeholder SVG automatically.
3. To use a PNG instead, rename your file to `hero.png` and edit `index.html` — find `src="images/hero.jpg"` and change it to `src="images/hero.png"`.
4. To remove the photo entirely and go back to just the gradient, delete the `<img class="hero-image" ...>` line in `index.html`.

### Add or swap Short Films / Travel Videos
1. Go to the YouTube video, copy its ID (the part after `v=` in the URL — e.g. in `https://www.youtube.com/watch?v=abc123`, the ID is `abc123`).
2. In `index.html`, find the `<section id="short-films">` or `<section id="travel">` block.
3. Copy an existing `<article class="video-card">` block and paste a new one, or edit an existing one.
4. Replace the ID in `src="https://www.youtube-nocookie.com/embed/ID_HERE"`.
5. Update the title inside `<h3 class="card-title">` and the description inside `<p class="card-meta">`.

### Replace Graphic Design / Photography images
The tiles default to a placeholder. To show a real image:

1. Save your file as `images/design/01.jpg` (or `02.jpg`, etc.). The HTML already points at these paths, so you don't need to edit anything — just drop the file in.
2. Use the same numbering for photography: `images/photography/01.jpg`, `02.jpg`, ...
3. If you want to use PNG instead of JPG, open `index.html`, find the `<img src="images/design/01.jpg" ...>` line, and change `.jpg` to `.png` in both the `src` and the `href` on the parent `<a>`.
4. If you want to link a tile to a PDF, change the `<a href="images/design/01.jpg">` to `<a href="images/design/01.pdf">` and put your PDF at that path.
5. Update the caption text inside `<span class="tile-label">` and the `alt` attribute for accessibility.

### Add more tiles or videos
Copy an existing `<article>` or `<a class="tile">` block and paste it right below the last one inside the same grid. Adjust the number and content.

### Change colors, fonts, or spacing
Open `css/styles.css`. The top of the file has a `:root` block with color and sizing variables. Change them there to recolor the whole site at once.

```css
--accent-green: #2BD27B;   /* change to any hex code */
--accent-blue: #4DA8FF;
--bg: #0B0F0D;
```

### Update contact / social links
In `index.html`, find the `<section id="contact">` block. Edit the email inside `href="mailto:..."` and the URLs inside the `<ul class="social-links">`.

---

## Deploying updates

The site is connected to Cloudflare Pages through a GitHub repo. Every time you push to the `main` branch, Cloudflare rebuilds and redeploys automatically — usually live in under a minute.

```bash
cd "~/Desktop/Braydens Portfolio Website"
git add .
git commit -m "Update photography section"
git push
```

No build step needed. The site is static HTML/CSS/JS.

---

## Troubleshooting

- **Images not showing** — check the file path and extension exactly (case-sensitive on the server). `01.jpg` and `01.JPG` are different.
- **YouTube embed blank** — make sure the video isn't set to private or "embedding disabled" in YouTube Studio.
- **Site looks unstyled** — hard refresh with `Cmd+Shift+R`; the browser may be caching an old version.
- **Mobile menu won't open** — make sure `js/main.js` is present and `<script src="js/main.js" defer></script>` is in `index.html`.
