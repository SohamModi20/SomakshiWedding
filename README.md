# Wedding Invitation Website

A romantic single-page wedding invitation site — no framework, no build step, just HTML/CSS/JS.

---

## How to Edit Content

All placeholder text uses `[brackets]` so you can search-and-replace easily.

### 1. Couple Names & Date (`index.html`)

Open `index.html` and update these placeholders:

| Placeholder | Replace with |
|---|---|
| `[Fiance]` | Your fiancé's name |
| `[Month] [Day], [Year]` | e.g. December 15, 2026 |
| `[City, Country]` | e.g. Mumbai, India |

Also update the `<title>` tag near the top of the file.

### 2. Wedding Date for Countdown (`script.js`)

Open `script.js` and change the first config line:

```js
const WEDDING_DATE = new Date('2026-12-15T10:00:00');
```

Use the format `YYYY-MM-DDTHH:MM:SS` (24-hour time, local timezone).

### 3. Event Details (`index.html`)

In the **Events** section, each event is an `<article class="event-card">` block.
Edit `[Date]`, `[Time]`, and `[Venue Name]` in each card. To add/remove events, copy or delete an entire `<article>` block.

### 4. Venue & Map (`index.html`)

In the **Venue** section:
- Replace `[Venue Name]`, `[Street Address]`, `[City, State, PIN]`
- Replace the Google Maps `<iframe>` `src` URL:
  1. Go to [Google Maps](https://maps.google.com)
  2. Search for your venue
  3. Click **Share** → **Embed a map** → Copy the `<iframe>` src URL
  4. Paste it into the `src="..."` attribute

- Update the "Get Directions" link `href` with your venue's Google Maps URL.

### 5. Caricatures (`assets/`)

Replace these files with your actual caricature images:
- `assets/caricature-groom.svg` (or use `.png` / `.jpg` and update the `src` in `index.html`)
- `assets/caricature-bride.svg`

Square images work best (they'll be displayed as circles).

### 6. Gallery Slideshow (`images/`)

The gallery is an auto-playing slideshow (fades every 4 seconds, pauses on hover, click a photo to enlarge in the lightbox). Photos live in the `images/` folder.

To add, remove, or reorder photos: edit the `<div class="slide">` blocks inside `<div class="slides">` in `index.html`, pointing each `src` at a file in `images/`. The navigation dots are generated automatically from the number of slides.

---

## Free Deployment (No Domain Needed)

### Option A: Netlify (Easiest — drag & drop)

1. Go to [app.netlify.com](https://app.netlify.com) and sign up (free)
2. From the **Sites** page, drag your entire project folder onto the deploy area
3. Your site is live at `https://your-site-name.netlify.app`
4. Click **Site settings** → **Change site name** to pick a custom subdomain

### Option B: Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in this folder and follow the prompts
4. Your site is live at `https://your-project.vercel.app`

### Option C: GitHub Pages

1. Create a GitHub repo and push this folder to it
2. Go to **Settings** → **Pages** → set source to `main` branch, root folder
3. Your site is live at `https://yourusername.github.io/repo-name`

### Option D: Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) and sign up (free)
2. Connect your GitHub repo or use Direct Upload
3. Your site is live at `https://your-project.pages.dev`

---

## File Structure

```
index.html              Main page
styles.css              Romantic theme styles
script.js               Countdown, scroll animations, lightbox
assets/
  caricature-groom.svg  Groom placeholder (swap with real image)
  caricature-bride.svg  Bride placeholder (swap with real image)
  florals/
    corner.svg          Decorative corner floral motif
  gallery/
    1.svg ... 6.svg     Gallery placeholders (swap with real photos)
```

---

## Optional: Custom Domain (Later)

If you ever want a domain like `sohamandfiance.com`:

1. Buy one from [Namecheap](https://namecheap.com), [Cloudflare](https://cloudflare.com), or [Google Domains](https://domains.google) (~₹800–1500/year)
2. Point the DNS to your hosting provider (Netlify/Vercel/etc. all have guides)
3. The free hosting stays free — you only pay for the domain name
