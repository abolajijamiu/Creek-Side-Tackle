// Social media + print templates. Text stays live (<text>) so the SVGs remain editable
// in Figma / Illustrator / Affinity once the brand fonts are installed.
import { C, primary, horizontal, symbol, badge, seal, wordmark, pineHook } from './logo.mjs';
import { place } from './render.mjs';
import { scene } from '../../brand/scene.mjs';
import { contourPattern, treelineBorder, ICONS } from '../../brand/graphics.mjs';
import { PRODUCTS } from '../../brand/products.mjs';

const D = `'Barlow Condensed', 'Arial Narrow', sans-serif`;
const B = `Barlow, Arial, sans-serif`;
const M = `'IBM Plex Mono', Menlo, monospace`;
const FONTS_IMPORT = `<style>@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&amp;family=Barlow:wght@400;500;600&amp;family=IBM+Plex+Mono:wght@500&amp;display=swap');</style>`;

const doc = (w, h, inner, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><title>${title}</title>${FONTS_IMPORT}${inner}</svg>`;
const t = (x, y, str, { f = D, s = 40, w = 700, fill = C.spruce, ls = 0, anchor = 'start', extra = '' } = {}) =>
  `<text x="${x}" y="${y}" font-family="${f}" font-size="${s}" font-weight="${w}" fill="${fill}" letter-spacing="${ls}" text-anchor="${anchor}" ${extra}>${str}</text>`;
const nest = (svgStr, x, y, w, h, vb) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">${svgStr}</svg>`;
const contour = (w, h, color, opts = {}) => contourPattern({ w, h, color, ...opts }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
const icon = (key, x, y, size, color, sw = 1.75) => `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[key].d.replace(/currentColor/g, color)}</g>`;

export function social() {
  const out = {};

  // Profile image — the seal fills the circular crop exactly
  out['profile-image'] = { w: 1080, h: 1080, svg: doc(1080, 1080, `<rect width="1080" height="1080" fill="${C.spruce}"/>${seal({ mode: 'color', x: -22, y: -22, size: 1124 })}`, 'Profile Image') };

  // Facebook cover
  {
    const w = 1640, h = 624;
    const logo = place(horizontal('reverse'), 120, 0, 600);
    out['facebook-cover'] = { w, h, svg: doc(w, h,
      nest(scene({ w: 1640, h: 624, mood: 'day', seed: 21, horizon: 0.62, sun: 0.8 }), 0, 0, w, h, `0 0 ${w} ${h}`) +
      `<path d="M0 0H760C800 160 740 300 800 420S760 560 790 624H0Z" fill="${C.spruce}"/>` +
      logo.svg.replace(`y="0"`, `y="${200 - logo.height / 2}"`) +
      t(122, 352, 'HONEST GEAR. LOCAL WATER.', { s: 46, fill: C.birch, ls: 2 }) +
      t(124, 404, 'Tackle for Canadian anglers · creeksidetackle.ca', { f: B, s: 26, w: 500, fill: C.glacier }),
      'Facebook Cover') };
  }

  // Instagram — promotional post
  {
    const w = 1080, h = 1350;
    out['instagram-promo'] = { w, h, svg: doc(w, h,
      `<rect width="${w}" height="${h}" fill="${C.spruce}"/>` +
      nest(scene({ w: 1080, h: 640, mood: 'dawn', seed: 5, horizon: 0.58, sun: 0.74 }), 0, 0, 1080, 640, '0 0 1080 640') +
      `<rect x="72" y="72" width="292" height="64" fill="${C.bobber}"/>` + t(218, 115, 'OPENING WEEKEND', { f: M, s: 24, w: 500, fill: '#FFFFFF', anchor: 'middle', ls: 1 }) +
      `<g opacity=".18">${contour(1080, 710, C.glacier, { seed: 9, rings: 10, cx: 0.85, cy: 0.9 })}</g>`.replace('<g opacity=".18">', `<g opacity=".18" transform="translate(0 640)">`) +
      t(72, 790, 'SOFT PLASTICS', { s: 132, fill: C.birch, ls: 1 }) +
      t(72, 930, '20% OFF', { s: 160, fill: C.driftwood, ls: 1 }) +
      t(76, 1010, 'Grubs, worms and swimbaits for the opener. In-stock styles only.', { f: B, s: 34, w: 500, fill: C.glacier }) +
      `<rect x="72" y="1188" width="936" height="2" fill="${C.glacier}" opacity=".35"/>` +
      place(horizontal('reverse'), 72, 1222, 270).svg +
      t(1008, 1268, 'CREEKSIDETACKLE.CA', { f: M, s: 24, w: 500, fill: C.birch, anchor: 'end' }),
      'Instagram Promotional Post') };
  }

  // Instagram — product announcement
  {
    const w = 1080, h = 1350; const p = PRODUCTS.spinner;
    out['instagram-product'] = { w, h, svg: doc(w, h,
      `<rect width="${w}" height="${h}" fill="${C.birch}"/>` +
      `<g opacity=".55">${contour(1080, 1350, C.mist, { seed: 4, rings: 16, cx: 0.5, cy: 0.42, stroke: 2 })}</g>` +
      t(72, 120, 'NEW IN THE SHOP', { f: M, s: 26, w: 500, fill: C.lake, ls: 2 }) +
      place(symbol(), 920, 64, 88).svg +
      `<circle cx="540" cy="520" r="290" fill="${C.paper}"/><circle cx="540" cy="520" r="290" fill="none" stroke="${C.spruce}" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>` +
      `<svg x="330" y="310" width="420" height="420" viewBox="0 0 200 200">${p.art}</svg>` +
      t(72, 960, 'CREEK SPINNER', { s: 128, fill: C.spruce }) +
      t(72, 1040, '3-PACK · TROUT, BASS &amp; PANFISH', { s: 50, w: 600, fill: C.lake, ls: 1.5 }) +
      `<rect x="72" y="1088" width="936" height="2" fill="${C.spruce}" opacity=".2"/>` +
      t(72, 1150, p.spec + ' · 3 COLOURS', { f: M, s: 28, w: 500, fill: C.granite }) +
      `<rect x="72" y="1196" width="290" height="84" fill="${C.spruce}"/>` + t(217, 1252, '$9.99 CAD', { s: 46, fill: C.birch, anchor: 'middle', ls: 1 }) +
      t(1008, 1250, 'Link in bio', { f: B, s: 30, w: 600, fill: C.spruce, anchor: 'end' }),
      'Instagram Product Announcement') };
  }

  // Instagram — educational post (knot tutorial)
  {
    const w = 1080, h = 1350;
    const steps = ['Pass the line through the hook eye.', 'Wrap the tag end around the main line 5–7 times.', 'Thread the tag end through the small loop at the eye.', 'Then back through the big loop you just made.', 'Wet the knot, pull tight and trim the tag.'];
    const diagram = `<g transform="translate(414 396) scale(.62)" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="380" cy="150" r="26" stroke="${C.birch}" stroke-width="10"/>
      <path d="M380 176v120a70 70 0 0 1-140 0v-40l26 26" stroke="${C.birch}" stroke-width="10"/>
      <path d="M-320 150H300" stroke="${C.glacier}" stroke-width="5"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${150 + i * 24} 120c14 0 14 60 0 60" stroke="${C.driftwood}" stroke-width="5"/>`).join('')}
      <path d="M300 150c40-50 80-50 80-30M380 128c-50 30-140 30-150 0" stroke="${C.driftwood}" stroke-width="5"/>
    </g>`;
    out['instagram-educational'] = { w, h, svg: doc(w, h,
      `<rect width="${w}" height="${h}" fill="${C.lake}"/>` +
      `<g opacity=".14">${contour(1080, 1350, C.glacier, { seed: 12, rings: 18, cx: 0.8, cy: 0.25 })}</g>` +
      t(72, 120, 'KNOT SCHOOL · 01', { f: M, s: 26, w: 500, fill: C.glacier, ls: 2 }) +
      t(72, 260, 'IMPROVED', { s: 124, fill: C.birch }) + t(72, 376, 'CLINCH KNOT', { s: 124, fill: C.birch }) +
      t(74, 440, 'The everyday knot for tying line to a hook or lure.', { f: B, s: 32, w: 500, fill: C.glacier }) +
      diagram +
      steps.map((s, i) => `<circle cx="104" cy="${712 + i * 96}" r="32" fill="${C.birch}"/>` + t(104, 725 + i * 96, String(i + 1), { s: 38, fill: C.lake, anchor: 'middle' }) + t(164, 724 + i * 96, s, { f: B, s: 34, w: 500, fill: C.birch })).join('') +
      `<rect x="72" y="1188" width="936" height="2" fill="${C.glacier}" opacity=".35"/>` +
      place(horizontal('reverse'), 72, 1222, 270).svg +
      t(1008, 1268, 'SAVE FOR YOUR NEXT TRIP', { f: M, s: 24, w: 500, fill: C.birch, anchor: 'end' }),
      'Instagram Educational Post') };
  }

  // Instagram — brand / square post
  {
    const w = 1080, h = 1080;
    out['instagram-brand-post'] = { w, h, svg: doc(w, h,
      nest(scene({ w: 1080, h: 1080, mood: 'dusk', seed: 33, horizon: 0.74, sun: 0.78 }), 0, 0, 1080, 1080, '0 0 1080 1080') +
      place(seal({ mode: 'reverse' }).replace(/^/, '<svg viewBox="0 0 100 100">') + '</svg>', 490, 70, 100).svg +
      t(540, 300, 'HONEST GEAR.', { s: 132, fill: C.birch, anchor: 'middle', ls: 2 }) +
      t(540, 420, 'LOCAL WATER.', { s: 132, fill: C.glacier, anchor: 'middle', ls: 2 }),
      'Instagram Brand Post') };
  }

  // Instagram story
  {
    const w = 1080, h = 1920;
    out['instagram-story'] = { w, h, svg: doc(w, h,
      `<rect width="${w}" height="${h}" fill="${C.spruce}"/>` +
      nest(scene({ w: 1080, h: 1120, mood: 'day', seed: 17, horizon: 0.6, sun: 0.7 }), 0, 0, 1080, 1120, '0 0 1080 1120') +
      `<path d="M0 1090 q67.5 -26 135 0 t135 0 t135 0 t135 0 t135 0 t135 0 t135 0 t135 0 V1920 H0Z" fill="${C.spruce}"/>` +
      `<rect x="72" y="200" width="372" height="76" rx="38" fill="${C.birch}"/>` + place(symbol(), 80, 208, 60).svg + t(156, 250, 'creeksidetackle', { f: B, s: 30, w: 600, fill: C.spruce }) +
      t(72, 1260, 'THE WATER', { s: 150, fill: C.birch }) + t(72, 1400, 'IS OPEN.', { s: 150, fill: C.driftwood }) +
      t(76, 1480, 'Spinners, floats and fresh line', { f: B, s: 40, w: 500, fill: C.glacier }) +
      t(76, 1534, 'are back in stock.', { f: B, s: 40, w: 500, fill: C.glacier }) +
      `<rect x="72" y="1600" width="400" height="104" fill="${C.birch}"/>` + t(272, 1666, 'SHOP NOW →', { s: 46, fill: C.spruce, anchor: 'middle', ls: 2 }),
      'Instagram Story') };
  }

  // Email header
  {
    const w = 1200, h = 400; const tl = treelineBorder({ w: 1200, h: 70, color: C.night }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    out['email-header'] = { w, h, svg: doc(w, h,
      `<rect width="${w}" height="${h}" fill="${C.spruce}"/>` +
      `<g opacity=".16">${contour(1200, 400, C.glacier, { seed: 2, rings: 9, cx: 0.85, cy: 0.4 })}</g>` +
      `<svg x="0" y="330" width="1200" height="70" viewBox="0 0 1200 70" preserveAspectRatio="none">${tl}</svg>` +
      place(horizontal('reverse'), 330, 110, 540).svg +
      t(600, 300, 'HONEST GEAR. LOCAL WATER.', { f: M, s: 20, w: 500, fill: C.glacier, anchor: 'middle', ls: 3 }),
      'Email Header') };
  }
  return out;
}

// ── Print ───────────────────────────────────────────────────────────────
const DPI = 300; const BLEED = 0.125 * DPI; // 37.5px

export function businessCard() {
  const W = 3.5 * DPI + BLEED * 2, H = 2 * DPI + BLEED * 2; // 1125 × 675 with bleed
  const front = doc(W, H,
    `<rect width="${W}" height="${H}" fill="${C.spruce}"/>` +
    `<g opacity=".2">${contour(W, H, C.glacier, { seed: 7, rings: 12, cx: 0.72, cy: 0.62, stroke: 1.6 })}</g>` +
    (() => { const p = place(primary('reverse'), 0, 0, 430); return p.svg.replace('x="0" y="0"', `x="${(W - 430) / 2}" y="${(H - p.height) / 2}"`); })(),
    'Business Card — Front');
  const back = doc(W, H,
    `<rect width="${W}" height="${H}" fill="${C.birch}"/>` +
    `<rect x="0" y="${H - BLEED - 22}" width="${W}" height="${BLEED + 22}" fill="${C.spruce}"/>` +
    `<svg x="0" y="${H - BLEED - 22 - 46}" width="${W}" height="46" viewBox="0 0 1200 60" preserveAspectRatio="none">${treelineBorder({ w: 1200, h: 60, color: C.spruce }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</svg>` +
    t(BLEED + 80, BLEED + 130, 'LUKE', { s: 78, fill: C.spruce, ls: 1 }) +
    t(BLEED + 82, BLEED + 178, 'OWNER · CREEKSIDE TACKLE', { f: M, s: 22, w: 500, fill: C.lake, ls: 1.5 }) +
    `<rect x="${BLEED + 82}" y="${BLEED + 214}" width="64" height="4" fill="${C.driftwood}"/>` +
    icon('pin', BLEED + 80, BLEED + 252, 30, C.spruce, 2) + t(BLEED + 126, BLEED + 276, 'creeksidetackle.ca', { f: B, s: 30, w: 500, fill: C.granite }) +
    icon('chat', BLEED + 80, BLEED + 308, 30, C.spruce, 2) + t(BLEED + 126, BLEED + 332, 'hello@creeksidetackle.ca', { f: B, s: 30, w: 500, fill: C.granite }) +
    icon('water', BLEED + 80, BLEED + 364, 30, C.spruce, 2) + t(BLEED + 126, BLEED + 388, '@creeksidetackle', { f: B, s: 30, w: 500, fill: C.granite }) +
    place(symbol(), W - BLEED - 80 - 150, BLEED + 70, 150).svg,
    'Business Card — Back');
  return { front, back, W, H, trim: { x: BLEED, y: BLEED, w: 3.5 * DPI, h: 2 * DPI } };
}

export function sticker() {
  const S = 900; // 3in @ 300dpi
  const b = place(badge('full-color'), 30, 30, 840).svg;
  return doc(S, S, `<circle cx="450" cy="450" r="448" fill="#FFFFFF"/><circle cx="450" cy="450" r="448" fill="none" stroke="#D9D9D9" stroke-width="2" stroke-dasharray="6 8"/>${b}`, 'Die-cut Sticker 3 in');
}

export function productLabel() {
  // 4 × 2 in label for line spools, boxes and bags
  const W = 1200, H = 600; const p = PRODUCTS.spool;
  return doc(W, H,
    `<rect width="${W}" height="${H}" fill="${C.birch}"/>` +
    `<rect width="430" height="${H}" fill="${C.spruce}"/>` +
    `<g opacity=".22">${contour(430, 600, C.glacier, { seed: 5, rings: 8, cx: 0.5, cy: 0.7 })}</g>` +
    (() => { const q = place(primary('reverse'), 0, 0, 300); return q.svg.replace('x="0" y="0"', `x="65" y="${(H - q.height) / 2}"`); })() +
    t(490, 110, 'MONOFILAMENT LINE', { f: M, s: 26, w: 500, fill: C.lake, ls: 2 }) +
    t(488, 214, 'CREEKSIDE MONO', { s: 104, fill: C.spruce }) +
    t(490, 270, 'All-round line for everyday freshwater fishing.', { f: B, s: 28, w: 500, fill: C.granite }) +
    `<rect x="490" y="310" width="650" height="2" fill="${C.spruce}" opacity=".25"/>` +
    [['TEST', '8 LB'], ['LENGTH', '300 YD'], ['COLOUR', 'CLEAR']].map(([k, v], i) =>
      t(490 + i * 220, 360, k, { f: M, s: 20, w: 500, fill: C.stone, ls: 2 }) + t(490 + i * 220, 430, v, { s: 64, fill: C.spruce })).join('') +
    `<rect x="490" y="480" width="650" height="2" fill="${C.spruce}" opacity=".25"/>` +
    t(490, 540, 'SKU CT-ML-08300', { f: M, s: 20, w: 500, fill: C.stone, ls: 1 }) +
    t(1140, 540, 'creeksidetackle.ca', { f: B, s: 24, w: 600, fill: C.spruce, anchor: 'end' }),
    'Product Label 4 × 2 in');
}

export function emailSignatureHtml(logoUrl) {
  return `<!-- Creekside Tackle email signature. Paste into your mail client's signature settings.
     Host creekside-signature-logo.png on your website and replace the src below with its full URL. -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#24292A;font-size:14px;line-height:1.45">
  <tr>
    <td style="padding-right:16px;border-right:3px solid #B8956A;vertical-align:top">
      <img src="${logoUrl}" width="72" height="72" alt="Creekside Tackle" style="display:block;border:0">
    </td>
    <td style="padding-left:16px;vertical-align:top">
      <div style="font-size:18px;font-weight:bold;color:#1F3D2E;letter-spacing:.5px">LUKE</div>
      <div style="font-size:12px;color:#2B6077;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px">Owner · Creekside Tackle</div>
      <div><a href="https://creeksidetackle.ca" style="color:#1F3D2E;text-decoration:none;font-weight:bold">creeksidetackle.ca</a></div>
      <div><a href="mailto:hello@creeksidetackle.ca" style="color:#24292A;text-decoration:none">hello@creeksidetackle.ca</a></div>
      <div style="font-size:12px;color:#636A60;margin-top:8px">Honest Gear. Local Water.</div>
    </td>
  </tr>
</table>
`;
}

export { pineHook, wordmark };
