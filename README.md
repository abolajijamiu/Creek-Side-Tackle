# Creekside Tackle — Brand Identity

**Honest Gear. Local Water.**

The complete brand identity for [Creekside Tackle](https://creeksidetackle.ca), a Canadian fishing tackle shop. This repository contains:

- **The brand presentation website**: an interactive brand book covering strategy, logo system, colour, typography, visual language, mockups, a website concept, guidelines and downloads.
- **The brand guidelines**: a 26-page document (`guide.html`), exported to PDF.
- **The brand kit**: every logo, colour file, graphic, social template and print file, generated from code into `public/brand-kit/`.

## The identity in brief

| | |
|---|---|
| Symbol | **The Pine Hook.** A spruce whose trunk becomes the shank of a fish hook, its bend dipping below a creek's waterline, set in a round seal. |
| Lockups | Primary (stacked), Secondary (horizontal), Wordmark, Brand Symbol, Pine Hook Mark, Badge. Each comes in five colourways. |
| Colour | Spruce `#1F3D2E`, Lake `#2B6077`, Moss `#5E7A49`, Glacier `#A9C9CF`, Driftwood `#B8956A`, Bobber Red `#C2412A`, Granite `#24292A`, Stone `#636A60`, Birch `#F2F1E9`, Paper `#FBFBF7` |
| Type | Barlow Condensed (headlines), Barlow (body), IBM Plex Mono (specs). All are free Google Fonts. |
| Tagline | Honest Gear. Local Water. |

## Brand kit contents (`public/brand-kit/`)

```
README.txt
Creekside-Tackle-Brand-Guidelines.pdf
01-Logos/          6 lockups × 5 colourways, SVG + transparent PNG
02-Colour/         .ase .css .scss .json .txt + swatch sheet
03-Typography/     font guide + specimen
04-Graphics/       16 icons, 3 patterns, 4 landscape illustrations, 7 product illustrations
05-Social-Media/   profile, Facebook cover, 4 post templates, story, email header (PNG + editable SVG)
06-Print/          business card (print-ready PDF with bleed), 3 in sticker, 4 × 2 in label
07-Web/            favicons, web manifest, HTML email signature, Tailwind tokens
```

## Development

Requires Node 18+ and Playwright's Chromium (used to render PNGs and PDFs).

```bash
npm install
npm run build        # generate brand kit → type-check → build site → render guide PDF → zip kit
npm run preview      # serve the production build at http://localhost:4173
npm run dev          # live-reload development server
```

`npm run build` outputs a static site in `dist/` that can be hosted anywhere (Netlify, Vercel, GitHub Pages or a Shopify page link). Downloads in `dist/downloads/` include the full kit ZIP and one ZIP per folder.

### Single-file version (`standalone/index.html`)

`npm run build` also writes **`standalone/index.html`**, the whole presentation as one 4 MB HTML file. Fonts, styles and scripts are inlined, and the complete brand kit is packed inside it. It opens offline in any modern browser, straight from disk, and every download button still works: SVGs, PDFs and text files are unpacked from the page, PNGs are redrawn from their SVG sources, and ZIPs are assembled in the browser.

The **Download as HTML** button (nav, Downloads chapter and footer) saves the page itself as that same `index.html`, so anyone viewing the presentation can keep their own copy.

### How it's built

- `brand/brand.json` holds the strategy, palette and type definitions. The site and the generators both read it.
- `scripts/lib/logo.mjs` is the single geometry source for every logo. Type is converted to outlines with opentype.js, so logo files never depend on installed fonts.
- `brand/scene.mjs`, `brand/graphics.mjs` and `brand/products.mjs` generate the illustrations, icons, patterns and product art.
- `scripts/build-assets.mjs` writes the brand kit. `scripts/package.mjs` renders the guide PDF and builds the ZIPs.
- The site is React + TypeScript + Tailwind (Vite). The website concept uses container queries, so its desktop and mobile layouts can be previewed inside the presentation.

## Before printing or publishing

- Business card and email signature contact details (name, title, email, social handle) are examples. Confirm them first.
- Product names, prices and trust messages in the website and social concepts are illustrative. Match them to the store's real catalogue and policies.
- Illustrated landscapes stand in for photography. Follow the photography direction in the guide when commissioning or selecting real images.
