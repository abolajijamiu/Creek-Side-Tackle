// Generates the complete downloadable brand kit into public/brand-kit.
// Run: npm run assets
import fs from 'node:fs';
import path from 'node:path';
import { LOGOS, SCHEMES, C, symbol, FIGURE } from './lib/logo.mjs';
import { Renderer, ratio } from './lib/render.mjs';
import { social, businessCard, sticker, productLabel, emailSignatureHtml } from './lib/templates.mjs';
import { ICONS, iconSvg, currentPattern, contourPattern, treelineBorder } from '../brand/graphics.mjs';
import { sceneSvg } from '../brand/scene.mjs';
import { PRODUCTS, productSvg } from '../brand/products.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const KIT = path.join(root, 'public/brand-kit');
const brand = JSON.parse(fs.readFileSync(path.join(root, 'brand/brand.json'), 'utf8'));
const write = (rel, data) => { const p = path.join(KIT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, data); return p; };
const manifest = [];
const log = (rel) => { manifest.push(rel); };

fs.rmSync(KIT, { recursive: true, force: true });
const R = new Renderer(); await R.start();

// ── 01 Logos ─────────────────────────────────────────────────────────────
const LOGO_DIRS = { primary: 'Primary', horizontal: 'Secondary-Horizontal', wordmark: 'Wordmark', symbol: 'Brand-Symbol', 'pine-hook': 'Pine-Hook-Mark', badge: 'Badge' };
const PNG_W = { primary: 2000, horizontal: 2400, wordmark: 2400, symbol: 1024, 'pine-hook': 1024, badge: 1500 };
for (const [key, fn] of Object.entries(LOGOS)) {
  for (const scheme of Object.keys(SCHEMES)) {
    const svg = fn(scheme); const base = `creekside-tackle-${key}-${scheme}`;
    const dir = `01-Logos/${LOGO_DIRS[key]}`;
    write(`${dir}/SVG/${base}.svg`, svg); log(`${dir}/SVG/${base}.svg`);
    const w = PNG_W[key];
    await R.png(svg, path.join(KIT, `${dir}/PNG/${base}.png`), w, w * ratio(svg)); log(`${dir}/PNG/${base}.png`);
  }
}
// Extra symbol sizes for avatars and app icons
for (const s of [512, 256]) { await R.png(symbol(), path.join(KIT, `01-Logos/Brand-Symbol/PNG/creekside-tackle-symbol-full-color-${s}px.png`), s, s); }

// ── 02 Colour ────────────────────────────────────────────────────────────
const groups = ['primary', 'secondary', 'accent', 'neutral'];
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const allColors = groups.flatMap((g) => brand.colors[g].map((c) => ({ ...c, group: g })));
const extras = [...brand.colors.lightBackgrounds, ...brand.colors.darkBackgrounds].filter((c) => !allColors.find((a) => a.hex === c.hex)).map((c) => ({ ...c, group: 'background' }));
const palette = [...allColors, ...extras];
write('02-Colour/creekside-tackle-palette.json', JSON.stringify(palette.map((c) => ({ name: c.name, group: c.group, hex: c.hex, rgb: hexToRgb(c.hex), use: c.use || 'Background' })), null, 2));
const slug = (n) => n.toLowerCase().replace(/\s+/g, '-');
write('02-Colour/creekside-tackle-palette.css', `/* Creekside Tackle colour tokens */\n:root {\n${palette.map((c) => `  --ct-${slug(c.name)}: ${c.hex};`).join('\n')}\n}\n`);
write('02-Colour/creekside-tackle-palette.scss', palette.map((c) => `$ct-${slug(c.name)}: ${c.hex};`).join('\n') + '\n');
write('02-Colour/creekside-tackle-palette.txt', palette.map((c) => `${c.name.padEnd(14)} ${c.hex}   RGB ${hexToRgb(c.hex).join(', ').padEnd(13)} ${c.group}`).join('\n') + '\n');
// Adobe Swatch Exchange
{
  const blocks = palette.map((c) => {
    const name = c.name; const nameBuf = Buffer.alloc((name.length + 1) * 2); for (let i = 0; i < name.length; i++) nameBuf.writeUInt16BE(name.charCodeAt(i), i * 2);
    const body = Buffer.alloc(2 + nameBuf.length + 4 + 12 + 2); let o = 0;
    body.writeUInt16BE(name.length + 1, o); o += 2; nameBuf.copy(body, o); o += nameBuf.length; body.write('RGB ', o, 'ascii'); o += 4;
    hexToRgb(c.hex).forEach((v) => { body.writeFloatBE(v / 255, o); o += 4; }); body.writeUInt16BE(2, o);
    const head = Buffer.alloc(6); head.writeUInt16BE(0x0001, 0); head.writeUInt32BE(body.length, 2); return Buffer.concat([head, body]);
  });
  const hdr = Buffer.alloc(12); hdr.write('ASEF', 0, 'ascii'); hdr.writeUInt16BE(1, 4); hdr.writeUInt16BE(0, 6); hdr.writeUInt32BE(blocks.length, 8);
  write('02-Colour/creekside-tackle-palette.ase', Buffer.concat([hdr, ...blocks]));
}
// Palette sheet
{
  const cols = 4; const cw = 400, ch = 300; const rows = Math.ceil(allColors.length / cols); const W = cols * cw + 120, H = rows * ch + 220;
  const lum = (h) => { const [r, g, b] = hexToRgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  let s = `<rect width="${W}" height="${H}" fill="${C.paper}"/><text x="60" y="110" font-family="'Barlow Condensed'" font-weight="700" font-size="64" fill="${C.spruce}">CREEKSIDE TACKLE — COLOUR PALETTE</text>`;
  allColors.forEach((c, i) => {
    const x = 60 + (i % cols) * cw, y = 170 + Math.floor(i / cols) * ch; const fg = lum(c.hex) > 0.35 ? C.granite : C.birch;
    s += `<rect x="${x}" y="${y}" width="${cw - 20}" height="${ch - 20}" fill="${c.hex}" ${c.hex === C.paper ? `stroke="#D7D6CC"` : ''}/>` +
      `<text x="${x + 24}" y="${y + 56}" font-family="'Barlow Condensed'" font-weight="700" font-size="40" fill="${fg}">${c.name.toUpperCase()}</text>` +
      `<text x="${x + 24}" y="${y + ch - 76}" font-family="'IBM Plex Mono'" font-weight="500" font-size="22" fill="${fg}">${c.hex}</text>` +
      `<text x="${x + 24}" y="${y + ch - 44}" font-family="'IBM Plex Mono'" font-weight="500" font-size="22" fill="${fg}">RGB ${hexToRgb(c.hex).join(' ')}</text>`;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${s}</svg>`;
  write('02-Colour/creekside-tackle-palette.svg', svg); await R.png(svg, path.join(KIT, '02-Colour/creekside-tackle-palette.png'), W, H, { transparent: false });
}

// ── 03 Typography ────────────────────────────────────────────────────────
write('03-Typography/fonts.txt', `CREEKSIDE TACKLE — TYPOGRAPHY

All three typefaces are free under the SIL Open Font License and available from Google Fonts.

PRIMARY — Barlow Condensed (SemiBold 600, Bold 700)
  ${brand.type.primary.role}
  https://fonts.google.com/specimen/Barlow+Condensed

SECONDARY — Barlow (Regular 400, Medium 500, SemiBold 600)
  ${brand.type.secondary.role}
  https://fonts.google.com/specimen/Barlow

ACCENT — IBM Plex Mono (Medium 500)
  ${brand.type.accent.role}
  https://fonts.google.com/specimen/IBM+Plex+Mono

Web embed:
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap">

Fallbacks: 'Arial Narrow', Arial, sans-serif (display) · Arial, Helvetica, sans-serif (body) · Menlo, Consolas, monospace (specs)
Shopify: Barlow and Barlow Condensed are both available in the Shopify font library.
`);
{
  const W = 2000, H = 1300;
  const s = `<rect width="${W}" height="${H}" fill="${C.birch}"/>
  <text x="100" y="140" font-family="'IBM Plex Mono'" font-weight="500" font-size="26" fill="${C.lake}" letter-spacing="3">PRIMARY · BARLOW CONDENSED BOLD</text>
  <text x="96" y="370" font-family="'Barlow Condensed'" font-weight="700" font-size="250" fill="${C.spruce}">CAST CLOSE TO HOME</text>
  <text x="100" y="470" font-family="'Barlow Condensed'" font-weight="600" font-size="64" fill="${C.spruce}" letter-spacing="4">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</text>
  <rect x="100" y="540" width="1800" height="2" fill="${C.spruce}" opacity=".2"/>
  <text x="100" y="620" font-family="'IBM Plex Mono'" font-weight="500" font-size="26" fill="${C.lake}" letter-spacing="3">SECONDARY · BARLOW REGULAR / MEDIUM / SEMIBOLD</text>
  <text x="100" y="720" font-family="Barlow" font-weight="400" font-size="52" fill="${C.granite}">Inline spinners for trout, bass and panfish.</text>
  <text x="100" y="800" font-family="Barlow" font-weight="500" font-size="52" fill="${C.granite}">Cast, count down and retrieve steadily.</text>
  <text x="100" y="880" font-family="Barlow" font-weight="600" font-size="52" fill="${C.granite}">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk 0123456789</text>
  <rect x="100" y="950" width="1800" height="2" fill="${C.spruce}" opacity=".2"/>
  <text x="100" y="1030" font-family="'IBM Plex Mono'" font-weight="500" font-size="26" fill="${C.lake}" letter-spacing="3">ACCENT · IBM PLEX MONO MEDIUM — SPECS ONLY</text>
  <text x="100" y="1140" font-family="'IBM Plex Mono'" font-weight="500" font-size="64" fill="${C.spruce}">8 LB · 300 YD · #6 · 1/8 OZ</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${s}</svg>`;
  write('03-Typography/creekside-tackle-type-specimen.svg', svg);
  await R.png(svg, path.join(KIT, '03-Typography/creekside-tackle-type-specimen.png'), W, H, { transparent: false });
}

// ── 04 Graphics ──────────────────────────────────────────────────────────
for (const key of Object.keys(ICONS)) {
  write(`04-Graphics/Icons/SVG/icon-${key}.svg`, iconSvg(key, { size: 24, color: C.spruce }));
  await R.png(iconSvg(key, { size: 24, color: C.spruce }), path.join(KIT, `04-Graphics/Icons/PNG/icon-${key}-spruce.png`), 192, 192);
  await R.png(iconSvg(key, { size: 24, color: C.birch }), path.join(KIT, `04-Graphics/Icons/PNG/icon-${key}-birch.png`), 192, 192);
}
const patterns = {
  'pattern-current-spruce': currentPattern({ color: C.spruce, size: 96, stroke: 2.4 }),
  'pattern-current-glacier-on-spruce': currentPattern({ color: C.glacier, bg: C.spruce, size: 96, stroke: 2.4 }),
  'pattern-depth-chart-spruce': contourPattern({ w: 2400, h: 1600, color: C.spruce, stroke: 2 }),
  'pattern-depth-chart-on-spruce': contourPattern({ w: 2400, h: 1600, color: C.glacier, bg: C.spruce, stroke: 2 }),
  'border-treeline-spruce': treelineBorder({ w: 2400, h: 120, color: C.spruce }),
};
for (const [n, svg] of Object.entries(patterns)) {
  write(`04-Graphics/Patterns/${n}.svg`, svg);
  const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/); const w = +vb[1], h = +vb[2]; const sc = w < 200 ? 4 : 1;
  await R.png(svg, path.join(KIT, `04-Graphics/Patterns/${n}.png`), w * sc, h * sc);
}
const scenes = { 'landscape-day': { mood: 'day', seed: 7 }, 'landscape-dawn': { mood: 'dawn', seed: 9, dock: true }, 'landscape-dusk': { mood: 'dusk', seed: 13 }, 'landscape-mist': { mood: 'mist', seed: 3, dock: true } };
for (const [n, o] of Object.entries(scenes)) {
  const svg = sceneSvg({ w: 2400, h: 1350, ...o }).replace('<svg ', '<svg width="2400" height="1350" ');
  write(`04-Graphics/Illustrations/${n}.svg`, svg); await R.png(svg, path.join(KIT, `04-Graphics/Illustrations/${n}.png`), 2400, 1350, { transparent: false });
}
for (const key of Object.keys(PRODUCTS)) {
  write(`04-Graphics/Product-Illustrations/product-${key}.svg`, productSvg(key));
  await R.png(productSvg(key), path.join(KIT, `04-Graphics/Product-Illustrations/product-${key}.png`), 800, 800);
}

// ── 05 Social ────────────────────────────────────────────────────────────
for (const [n, a] of Object.entries(social())) {
  write(`05-Social-Media/Editable-SVG/${n}.svg`, a.svg);
  await R.png(a.svg, path.join(KIT, `05-Social-Media/${n}.png`), a.w, a.h, { transparent: false });
}

// ── 06 Print ─────────────────────────────────────────────────────────────
{
  const bc = businessCard();
  write('06-Print/Business-Card/business-card-front.svg', bc.front); write('06-Print/Business-Card/business-card-back.svg', bc.back);
  await R.pdf([bc.front, bc.back], path.join(KIT, '06-Print/Business-Card/business-card-print-ready-with-bleed.pdf'), 3.75, 2.25);
  for (const [n, svg] of [['front', bc.front], ['back', bc.back]]) {
    const crop = svg.replace(/viewBox="0 0 [\d.]+ [\d.]+"/, `viewBox="${bc.trim.x} ${bc.trim.y} ${bc.trim.w} ${bc.trim.h}"`);
    await R.png(crop, path.join(KIT, `06-Print/Business-Card/business-card-${n}.png`), bc.trim.w, bc.trim.h, { transparent: false });
  }
  const st = sticker(); write('06-Print/Sticker/sticker-badge-3in.svg', st); await R.png(st, path.join(KIT, '06-Print/Sticker/sticker-badge-3in.png'), 900, 900);
  const lb = productLabel(); write('06-Print/Labels/product-label-4x2in.svg', lb); await R.png(lb, path.join(KIT, '06-Print/Labels/product-label-4x2in.png'), 1200, 600, { transparent: false });
  await R.pdf([lb], path.join(KIT, '06-Print/Labels/product-label-4x2in.pdf'), 4, 2);
}

// ── 07 Web ───────────────────────────────────────────────────────────────
{
  const fav = symbol();
  write('07-Web/Favicon/favicon.svg', fav); fs.mkdirSync(path.join(root, 'public'), { recursive: true }); fs.writeFileSync(path.join(root, 'public/favicon.svg'), fav);
  for (const [n, s] of [['favicon-32', 32], ['favicon-48', 48], ['apple-touch-icon', 180], ['icon-192', 192], ['icon-512', 512]]) {
    const svg = n.startsWith('apple') || n.startsWith('icon') ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="${C.spruce}"/>${symbol().replace(/^<svg[^>]*>/, '').replace('</svg>', '').replace(/<title>.*?<\/title>/, '')}</svg>` : fav;
    await R.png(svg, path.join(KIT, `07-Web/Favicon/${n}.png`), s, s, { transparent: !n.startsWith('apple') && !n.startsWith('icon') });
  }
  write('07-Web/Favicon/site.webmanifest', JSON.stringify({ name: 'Creekside Tackle', short_name: 'Creekside', icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }], theme_color: C.spruce, background_color: C.birch, display: 'standalone' }, null, 2));
  await R.png(symbol(), path.join(KIT, '07-Web/Email-Signature/creekside-signature-logo.png'), 144, 144);
  write('07-Web/Email-Signature/email-signature.html', emailSignatureHtml('https://creeksidetackle.ca/path-to/creekside-signature-logo.png'));
  write('07-Web/Brand-Tokens/tailwind.brand.js', `// Drop into tailwind.config.js → theme.extend\nmodule.exports = {\n  colors: {\n${palette.map((c) => `    '${slug(c.name)}': '${c.hex}',`).join('\n')}\n  },\n  fontFamily: {\n    display: ['"Barlow Condensed"', '"Arial Narrow"', 'sans-serif'],\n    sans: ['Barlow', 'Arial', 'sans-serif'],\n    mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],\n  },\n};\n`);
}

// ── README ───────────────────────────────────────────────────────────────
write('README.txt', `CREEKSIDE TACKLE — BRAND KIT v1.0
${brand.tagline}

Folders
  01-Logos            Primary, Secondary (horizontal), Wordmark, Brand Symbol, Pine Hook Mark, Badge.
                      Every logo comes in five colourways: full-color, reverse (dark backgrounds),
                      mono-spruce, mono-black and mono-white. SVG is the master format; PNGs have
                      transparent backgrounds.
  02-Colour           Palette as JSON, CSS, SCSS, TXT, Adobe Swatch Exchange (.ase) and a swatch sheet.
  03-Typography       Font names, weights, links and a specimen.
  04-Graphics         Icon set, patterns (Current, Depth Chart, Treeline), landscape illustrations and
                      product illustrations.
  05-Social-Media     Ready-to-post PNGs plus editable SVG templates with live text.
  06-Print            Business card (print-ready PDF with 0.125 in bleed), 3 in die-cut sticker,
                      4 × 2 in product label.
  07-Web              Favicons, web manifest, email signature, Tailwind tokens.
  Creekside-Tackle-Brand-Guidelines.pdf

Which logo do I use?
  Website header ............ Secondary (horizontal)
  Packaging, signage ........ Primary (stacked)
  Narrow spaces ............. Wordmark
  Avatars, favicons, stamps . Brand Symbol
  Embroidery, engraving ..... Pine Hook Mark (single colour)
  Hats, stickers, merch ..... Badge

Notes
  • Contact details on the business card and email signature (name, title, email, social handle)
    are set as examples and should be confirmed before printing.
  • Fonts are free (SIL OFL) from Google Fonts — see 03-Typography/fonts.txt.
`);

// ── Inline data for the presentation website ───────────────────────────
{
  const clean = (svg) => svg.replace(/<title>.*?<\/title>/, '').replace(/<style>@import[^<]*<\/style>/, '');
  const logos = {}; for (const [k, fn] of Object.entries(LOGOS)) { logos[k] = {}; for (const sc of Object.keys(SCHEMES)) logos[k][sc] = clean(fn(sc)); }
  const soc = {}; for (const [n, a] of Object.entries(social())) soc[n] = { w: a.w, h: a.h, svg: clean(a.svg) };
  const bc = businessCard(); const crop = (svg) => clean(svg).replace(/viewBox="0 0 [\d.]+ [\d.]+"/, `viewBox="${bc.trim.x} ${bc.trim.y} ${bc.trim.w} ${bc.trim.h}"`);
  const kit = { figure: FIGURE, logos, social: soc, card: { front: crop(bc.front), back: crop(bc.back) }, sticker: clean(sticker()), label: clean(productLabel()),
    patterns: { current: currentPattern({ color: C.spruce, size: 96, stroke: 2.4 }), currentLight: currentPattern({ color: C.glacier, size: 96, stroke: 2.4 }) } };
  fs.mkdirSync(path.join(root, 'src/generated'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src/generated/kit.json'), JSON.stringify(kit));
}

await R.stop();
console.log(`Brand kit written to ${KIT}`);
