// Creekside Tackle logo system — single geometry source for every logo file.
// All type is converted to outlines so files render identically without fonts installed.
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const fontFile = (pkg, file) => path.join(root, 'node_modules/@fontsource', pkg, 'files', file);
const load = (p) => { const b = fs.readFileSync(p); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };

export const fonts = {
  bc700: load(fontFile('barlow-condensed', 'barlow-condensed-latin-700-normal.woff')),
  bc600: load(fontFile('barlow-condensed', 'barlow-condensed-latin-600-normal.woff')),
  b600: load(fontFile('barlow', 'barlow-latin-600-normal.woff')),
  mono: load(fontFile('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff')),
};

export const C = {
  spruce: '#1F3D2E', night: '#14281E', lake: '#2B6077', deepLake: '#173C4B', moss: '#5E7A49',
  glacier: '#A9C9CF', driftwood: '#B8956A', bobber: '#C2412A', granite: '#24292A', stone: '#636A60',
  birch: '#F2F1E9', paper: '#FBFBF7', mist: '#E2EAE6', kraft: '#D8C6A6', white: '#FFFFFF', black: '#111111',
  lakeLight: '#3F7E96', waveLine: '#7FA9B6',
};

const r = (n) => Math.round(n * 100) / 100;

/** Lay out a string as outlined glyphs. Returns path data plus metrics. */
export function text(font, str, size, { x = 0, y = 0, tracking = 0 } = {}) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(str);
  let cx = x; const parts = [];
  glyphs.forEach((g, i) => {
    const p = g.getPath(cx, y, size);
    parts.push(p.toPathData(2));
    let adv = g.advanceWidth * scale;
    if (i < glyphs.length - 1) adv += font.getKerningValue(g, glyphs[i + 1]) * scale + tracking * size;
    cx += adv;
  });
  const capH = (font.tables.os2.sCapHeight || font.ascender * 0.7) * scale;
  return { d: parts.join(''), width: cx - x, capH };
}

/** Lay glyphs along a circular arc (badge typography). */
export function arcText(font, str, size, { cx, cy, radius, center = -90, tracking = 0, inside = false }) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(str);
  const advs = glyphs.map((g, i) => g.advanceWidth * scale + (i < glyphs.length - 1 ? tracking * size + font.getKerningValue(g, glyphs[i + 1]) * scale : 0));
  const total = advs.reduce((a, b) => a + b, 0);
  const capH = font.tables.os2.sCapHeight * scale;
  // For top text, baseline sits on the radius; bottom text is read left→right along the inside of the lower arc.
  const rad = inside ? radius + capH : radius;
  const totalAngle = (total / rad) * (180 / Math.PI);
  let a = inside ? center + totalAngle / 2 : center - totalAngle / 2;
  const out = [];
  glyphs.forEach((g, i) => {
    const w = g.advanceWidth * scale;
    const half = (w / 2 / rad) * (180 / Math.PI);
    const mid = inside ? a - half : a + half;
    const t = (mid * Math.PI) / 180;
    const px = cx + rad * Math.cos(t), py = cy + rad * Math.sin(t);
    const rot = inside ? mid - 90 : mid + 90;
    const d = g.getPath(-w / 2, 0, size).toPathData(2);
    if (d) out.push(`<path transform="translate(${r(px)} ${r(py)}) rotate(${r(rot)})" d="${d}"/>`);
    const step = (advs[i] / rad) * (180 / Math.PI);
    a = inside ? a - step : a + step;
  });
  return out.join('');
}

// ── The Pine Hook figure (100×100 grid). A pine whose trunk becomes the shank of a fish hook.
export const FIGURE =
  'M50 11 L59 25 L55.5 25 L61.5 36 L57 36 L64 47 L52.75 47 L52.75 71 A11 11 0 0 1 30.75 71 L30.75 58.5 ' +
  'Q30.75 54.5 33.6 51.2 L38.2 62.6 L36.25 61.6 L36.25 71 A5.5 5.5 0 0 0 47.25 71 L47.25 47 L36 47 L43 36 L38.5 36 L44.5 25 L41 25 Z';
const WATER = 'M0 66 Q12.5 61 25 65 T50 65 T75 65 T100 64.5 V100 H0 Z';
const WAVE_SURFACE = 'M0 66 Q12.5 61 25 65 T50 65 T75 65 T100 64.5';
const WAVE_LOW = 'M8 78 Q19 74 30 77.5 T52 77.5 T74 77.5 T96 77';

let uid = 0;
const id = (p) => `${p}${++uid}`;

/**
 * The seal: the core brand symbol.
 * mode: 'color' | 'reverse' | 'mono'
 */
export function seal({ mode = 'color', color = C.spruce, x = 0, y = 0, size = 100 } = {}) {
  const s = size / 100;
  const g = (inner) => `<g transform="translate(${r(x)} ${r(y)}) scale(${r(s)})">${inner}</g>`;
  if (mode === 'color') {
    const clip = id('sc');
    return g(`<defs><clipPath id="${clip}"><circle cx="50" cy="50" r="48"/></clipPath></defs>` +
      `<circle cx="50" cy="50" r="48" fill="${C.spruce}"/>` +
      `<g clip-path="url(#${clip})"><path d="${WATER}" fill="${C.lake}"/>` +
      `<path d="${WAVE_LOW}" fill="none" stroke="${C.waveLine}" stroke-width="1.8" stroke-linecap="round"/></g>` +
      `<path d="${FIGURE}" fill="${C.birch}"/>`);
  }
  if (mode === 'reverse') {
    const clip = id('sr');
    return g(`<defs><clipPath id="${clip}"><circle cx="50" cy="50" r="44"/></clipPath></defs>` +
      `<circle cx="50" cy="50" r="47" fill="none" stroke="${C.birch}" stroke-width="2.4"/>` +
      `<g clip-path="url(#${clip})"><path d="${WATER}" fill="${C.lakeLight}"/>` +
      `<path d="${WAVE_LOW}" fill="none" stroke="${C.glacier}" stroke-width="1.8" stroke-linecap="round"/></g>` +
      `<path d="${FIGURE}" fill="${C.birch}"/>`);
  }
  // mono: single solid colour, figure and water lines knocked out to true transparency
  const m = id('sm');
  return g(`<defs><mask id="${m}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">` +
    `<rect width="100" height="100" fill="#fff"/><path d="${FIGURE}" fill="#000"/>` +
    `<path d="${WAVE_SURFACE}" fill="none" stroke="#000" stroke-width="2.2"/>` +
    `<path d="${WAVE_LOW}" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/></mask></defs>` +
    `<circle cx="50" cy="50" r="48" fill="${color}" mask="url(#${m})"/>`);
}

/** Standalone Pine Hook mark (no container) — for embroidery, engraving, lure packaging, favicons. */
export function mark({ figure = C.spruce, water = C.lake, x = 0, y = 0, size = 100 } = {}) {
  const s = size / 100;
  const w1 = 'M18 89 Q22 86.6 26 89 T34 89 T42 89 T50 89 T58 89 T66 89 T74 89 T82 89';
  const w2 = 'M30 96.5 Q34 94.1 38 96.5 T46 96.5 T54 96.5 T62 96.5 T70 96.5';
  return `<g transform="translate(${r(x)} ${r(y)}) scale(${r(s)})">` +
    `<path d="${FIGURE}" fill="${figure}"/>` +
    `<path d="${w1}" stroke="${water}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<path d="${w2}" stroke="${water}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
}
export const MARK_BOX = { x: 15, y: 9, w: 70, h: 91 }; // tight bounds of mark() in its 100 grid

/** Colour schemes for full lockups. */
export const SCHEMES = {
  'full-color': { seal: 'color', word: C.spruce, sub: C.lake, rule: C.driftwood },
  reverse: { seal: 'reverse', word: C.birch, sub: C.glacier, rule: C.driftwood },
  'mono-spruce': { seal: 'mono', sealColor: C.spruce, word: C.spruce, sub: C.spruce, rule: C.spruce },
  'mono-black': { seal: 'mono', sealColor: C.black, word: C.black, sub: C.black, rule: C.black },
  'mono-white': { seal: 'mono', sealColor: C.white, word: C.white, sub: C.white, rule: C.white },
};
const sealFor = (sc, o) => seal({ mode: sc.seal, color: sc.sealColor, ...o });

const svgDoc = (w, h, inner, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" width="${r(w)}" height="${r(h)}"><title>${title}</title>${inner}</svg>`;

/** Primary logo: stacked seal + CREEKSIDE + ruled TACKLE */
export function primary(scheme = 'full-color') {
  const sc = SCHEMES[scheme];
  const W = text(fonts.bc700, 'CREEKSIDE', 100, { tracking: 0.01 });
  const sealSize = 150; const pad = 6;
  const width = W.width + pad * 2;
  const sealY = 0; const wordTop = sealSize + 30; const base = wordTop + W.capH;
  const word = text(fonts.bc700, 'CREEKSIDE', 100, { x: pad, y: base, tracking: 0.01 });
  const subSize = 34; const sub0 = text(fonts.bc600, 'TACKLE', subSize, { tracking: 0.42 });
  const subY = base + 22 + sub0.capH;
  const subX = (width - sub0.width) / 2;
  const sub = text(fonts.bc600, 'TACKLE', subSize, { x: subX, y: subY, tracking: 0.42 });
  const ruleY = subY - sub0.capH / 2; const gap = 18;
  const rules = `<rect x="${pad}" y="${r(ruleY - 1.5)}" width="${r(subX - gap - pad)}" height="3" fill="${sc.rule}"/>` +
    `<rect x="${r(subX + sub0.width + gap)}" y="${r(ruleY - 1.5)}" width="${r(width - pad - (subX + sub0.width + gap))}" height="3" fill="${sc.rule}"/>`;
  const inner = sealFor(sc, { x: (width - sealSize) / 2, y: sealY, size: sealSize }) +
    `<path d="${word.d}" fill="${sc.word}"/><path d="${sub.d}" fill="${sc.sub}"/>${rules}`;
  return svgDoc(width, subY + 4, inner, 'Creekside Tackle — Primary Logo');
}

/** Secondary logo: horizontal seal + two-line wordmark */
export function horizontal(scheme = 'full-color') {
  const sc = SCHEMES[scheme];
  const sealSize = 140; const gap = 30;
  const w0 = text(fonts.bc700, 'CREEKSIDE', 84, { tracking: 0.01 });
  const totalTextH = w0.capH + 18 + 26; // word + gap + sub cap
  const top = (sealSize - totalTextH) / 2;
  const x0 = sealSize + gap;
  const word = text(fonts.bc700, 'CREEKSIDE', 84, { x: x0, y: top + w0.capH, tracking: 0.01 });
  const s0 = text(fonts.bc600, 'TACKLE', 34, { tracking: 0.4 });
  const sub = text(fonts.bc600, 'TACKLE', 34, { x: x0 + 3, y: top + w0.capH + 18 + s0.capH, tracking: 0.4 });
  const ruleX = x0 + 3 + s0.width + 18;
  const ruleY = top + w0.capH + 18 + s0.capH / 2;
  const rule = `<rect x="${r(ruleX)}" y="${r(ruleY - 1.5)}" width="${r(x0 + w0.width - ruleX)}" height="3" fill="${sc.rule}"/>`;
  const width = x0 + w0.width + 4;
  const inner = sealFor(sc, { x: 0, y: 0, size: sealSize }) + `<path d="${word.d}" fill="${sc.word}"/><path d="${sub.d}" fill="${sc.sub}"/>${rule}`;
  return svgDoc(width, sealSize, inner, 'Creekside Tackle — Secondary Logo (Horizontal)');
}

/** Single-line wordmark for tight horizontal spaces (website header on mobile, pens, rod labels) */
export function wordmark(scheme = 'full-color') {
  const sc = SCHEMES[scheme];
  const a = text(fonts.bc700, 'CREEKSIDE', 80, { tracking: 0.01 });
  const b0 = text(fonts.bc600, 'TACKLE', 80, { tracking: 0.04 });
  const gap = 26; const dot = 7;
  const word = text(fonts.bc700, 'CREEKSIDE', 80, { x: 2, y: a.capH + 2, tracking: 0.01 });
  const bx = 2 + a.width + gap * 2 + dot * 2;
  const b = text(fonts.bc600, 'TACKLE', 80, { x: bx, y: a.capH + 2, tracking: 0.04 });
  const inner = `<path d="${word.d}" fill="${sc.word}"/>` +
    `<circle cx="${r(2 + a.width + gap + dot)}" cy="${r(a.capH / 2 + 2)}" r="${dot}" fill="${sc.rule === C.driftwood ? (scheme === 'reverse' ? C.glacier : C.lake) : sc.rule}"/>` +
    `<path d="${b.d}" fill="${sc.sub === C.lake ? C.spruce : sc.sub}" opacity="1"/>`;
  return svgDoc(bx + b0.width + 4, a.capH + 4, inner, 'Creekside Tackle — Wordmark');
}

/** Brand symbol (seal only) */
export function symbol(scheme = 'full-color') {
  const sc = SCHEMES[scheme];
  return svgDoc(100, 100, sealFor(sc, { x: 0, y: 0, size: 100 }), 'Creekside Tackle — Brand Symbol');
}

/** Pine Hook mark (no container) */
export function pineHook(scheme = 'full-color') {
  const map = {
    'full-color': [C.spruce, C.lake], reverse: [C.birch, C.glacier],
    'mono-spruce': [C.spruce, C.spruce], 'mono-black': [C.black, C.black], 'mono-white': [C.white, C.white],
  };
  const [f, w] = map[scheme];
  const b = MARK_BOX;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.x} ${b.y} ${b.w} ${b.h}" width="${b.w * 4}" height="${b.h * 4}"><title>Creekside Tackle — Pine Hook Mark</title>${mark({ figure: f, water: w })}</svg>`;
}

/** Outdoor badge / emblem for hats, stickers and merchandise */
export function badge(scheme = 'full-color') {
  const S = 400, c = 200;
  const pal = {
    'full-color': { field: C.spruce, ring: C.spruce, text: C.birch, inner: C.birch, seal: 'color', dot: C.driftwood, bg: C.birch },
    reverse: { field: C.birch, ring: C.birch, text: C.spruce, inner: C.spruce, seal: 'color', dot: C.driftwood, bg: C.spruce },
  }[scheme];
  const mono = scheme.startsWith('mono');
  const col = mono ? SCHEMES[scheme].word : null;
  const m = id('bm');
  const top = arcText(fonts.bc700, 'CREEKSIDE TACKLE', 40, { cx: c, cy: c, radius: 146, center: -90, tracking: 0.14 });
  const bottom = arcText(fonts.bc600, 'HONEST GEAR · LOCAL WATER', 24, { cx: c, cy: c, radius: 148, center: 90, tracking: 0.16, inside: true });
  const stars = [195, -15].map((deg) => { const t = deg * Math.PI / 180; return `<circle cx="${r(c + 158 * Math.cos(t))}" cy="${r(c + 158 * Math.sin(t))}" r="5"/>`; }).join('');
  if (mono) {
    // knock-out construction: everything is one colour, details are transparent
    return svgDoc(S, S,
      `<defs><mask id="${m}" maskUnits="userSpaceOnUse" x="0" y="0" width="${S}" height="${S}"><rect width="${S}" height="${S}" fill="#fff"/>` +
      `<g fill="#000">${top}${bottom}${stars}</g><circle cx="${c}" cy="${c}" r="117" fill="#000"/></mask></defs>` +
      `<circle cx="${c}" cy="${c}" r="196" fill="${col}" mask="url(#${m})"/>` +
      seal({ mode: 'mono', color: col, x: c - 105, y: c - 105, size: 210 }),
      'Creekside Tackle — Badge');
  }
  return svgDoc(S, S,
    `<circle cx="${c}" cy="${c}" r="196" fill="${pal.field}"/>` +
    `<circle cx="${c}" cy="${c}" r="186" fill="none" stroke="${pal.text}" stroke-width="2"/>` +
    `<g fill="${pal.text}">${top}${bottom}</g><g fill="${pal.dot}">${stars}</g>` +
    `<circle cx="${c}" cy="${c}" r="118" fill="${pal.inner}"/>` +
    seal({ mode: 'color', x: c - 108, y: c - 108, size: 216 }),
    'Creekside Tackle — Badge');
}

export const LOGOS = { primary, horizontal, wordmark, symbol, 'pine-hook': pineHook, badge };
