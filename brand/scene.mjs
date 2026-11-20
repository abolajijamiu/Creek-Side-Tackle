// Layered landscape illustration — the brand's stand-in for photography in concept work.
// Flat colour planes only (no gradients), in the style of a park trail poster.

export const PAL = {
  day: { sky: '#E2EAE6', sun: '#F2F1E9', far: '#A9C9CF', mid: '#5E7A49', near: '#1F3D2E', water: '#2B6077', shimmer: '#A9C9CF', shore: '#14281E', figure: '#14281E' },
  dawn: { sky: '#D8C6A6', sun: '#F2F1E9', far: '#B8956A', mid: '#5E7A49', near: '#1F3D2E', water: '#2B6077', shimmer: '#D8C6A6', shore: '#14281E', figure: '#14281E' },
  dusk: { sky: '#173C4B', sun: '#D8C6A6', far: '#2B6077', mid: '#1F3D2E', near: '#14281E', water: '#173C4B', shimmer: '#3F7E96', shore: '#0E1D16', figure: '#0E1D16' },
  mist: { sky: '#F2F1E9', sun: '#E2EAE6', far: '#E2EAE6', mid: '#A9C9CF', near: '#5E7A49', water: '#A9C9CF', shimmer: '#F2F1E9', shore: '#1F3D2E', figure: '#1F3D2E' },
};

function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const f = (n) => Math.round(n * 10) / 10;

/** Pine silhouette with three tiers, base centred on (x, y). */
export function pine(x, y, h, w = h * 0.42) {
  const tiers = [[0, 0.4], [0.27, 0.68], [0.52, 1]]; // [top position, width] per tier
  const tierH = h * 0.4; const tw = Math.max(w * 0.06, 1);
  const T = tiers.map(([top, wf]) => ({ bottom: y - h + top * h + tierH, half: (w / 2) * wf }));
  const right = [[0, y - h]];
  T.forEach((t, i) => { right.push([t.half, t.bottom]); right.push([i < 2 ? T[i + 1].half * 0.42 : tw, t.bottom]); });
  right.push([tw, y]);
  const pts = [...right, ...right.slice(1).reverse().map(([dx, yy]) => [-dx, yy])];
  return 'M' + pts.map(([dx, yy]) => `${f(x + dx)} ${f(yy)}`).join('L') + 'Z';
}

function ridge(w, base, amp, rand, steps = 7) {
  const pts = []; for (let i = 0; i <= steps; i++) pts.push([(w / steps) * i, base - amp * (0.35 + rand() * 0.65)]);
  let d = `M0 ${f(base + 400)} L0 ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; const mx = (x0 + x1) / 2; d += ` Q${f(x0 + (x1 - x0) * 0.25)} ${f(y0)} ${f(mx)} ${f((y0 + y1) / 2)} T${f(x1)} ${f(y1)}`; }
  return d + ` L${w} ${f(base + 400)} Z`;
}

function treeline(w, base, hMin, hMax, rand, density = 1) {
  let d = ''; let x = -20;
  while (x < w + 20) { const h = hMin + rand() * (hMax - hMin); d += pine(x, base + rand() * hMin * 0.15, h); x += h * (0.16 + rand() * 0.22) / density; }
  return d + `M-20 ${f(base)} H${w + 20} V${f(base + hMax)} H-20 Z`;
}

/**
 * scene({ w, h, mood, seed, angler, dock, horizon })
 * horizon: 0..1 — where the waterline sits.
 */
export function scene({ w = 1600, h = 900, mood = 'day', seed = 7, angler = true, dock = false, horizon = 0.6, sun = 0.72 } = {}) {
  const p = PAL[mood]; const rand = rng(seed); const H = h * horizon;
  const u = Math.min(w, h * 1.6) / 1600; // unit scale
  let s = `<rect width="${w}" height="${h}" fill="${p.sky}"/>`;
  s += `<circle cx="${f(w * sun)}" cy="${f(H - h * 0.27)}" r="${f(110 * u)}" fill="${p.sun}"/>`;
  s += `<path d="${ridge(w, H - 120 * u, 170 * u, rand, 6)}" fill="${p.far}"/>`;
  s += `<path d="${treeline(w, H - 34 * u, 70 * u, 120 * u, rand, 1.2)}" fill="${p.mid}"/>`;
  // near treeline only on the left shore, leaving open water to the right
  const near = treeline(w * 0.46, H + 2, 140 * u, 250 * u, rand, 1.1);
  s += `<path d="${near}" fill="${p.near}"/>`;
  s += `<rect y="${f(H)}" width="${w}" height="${f(h - H)}" fill="${p.water}"/>`;
  // reflection of the sun + shimmer lines
  for (let i = 0; i < 9; i++) {
    const y = H + 22 * u + i * (h - H) / 9; const len = (150 - i * 9) * u * (0.6 + rand() * 0.8); const x = w * sun - len / 2 + (rand() - 0.5) * 40 * u;
    s += `<rect x="${f(x)}" y="${f(y)}" width="${f(len)}" height="${f(4 * u)}" rx="${f(2 * u)}" fill="${p.shimmer}" opacity="${i < 4 ? 1 : 0.6}"/>`;
  }
  for (let i = 0; i < 7; i++) {
    const y = H + 40 * u + rand() * (h - H - 60 * u); const x = rand() * w * 0.9; const len = 40 * u + rand() * 120 * u;
    s += `<rect x="${f(x)}" y="${f(y)}" width="${f(len)}" height="${f(3 * u)}" rx="${f(1.5 * u)}" fill="${p.shimmer}" opacity=".45"/>`;
  }
  // foreground bank
  const bankY = h - 70 * u;
  s += `<path d="M0 ${f(bankY - 70 * u)} C${f(w * 0.12)} ${f(bankY - 92 * u)} ${f(w * 0.24)} ${f(bankY - 80 * u)} ${f(w * 0.31)} ${f(bankY - 40 * u)} S${f(w * 0.42)} ${f(h - 4 * u)} ${f(w * 0.5)} ${f(h + 2)} L0 ${f(h + 2)} Z" fill="${p.shore}"/>`;
  if (dock) {
    const dx = w * 0.52, dy = H + (h - H) * 0.42;
    s += `<path d="M${f(dx)} ${f(dy)} L${f(w + 10)} ${f(dy - 10 * u)} L${f(w + 10)} ${f(dy + 14 * u)} L${f(dx)} ${f(dy + 12 * u)} Z" fill="${p.shore}"/>`;
    for (let i = 0; i < 6; i++) { const x = dx + 30 * u + i * (w - dx) / 6; s += `<rect x="${f(x)}" y="${f(dy)}" width="${f(8 * u)}" height="${f(70 * u)}" fill="${p.shore}"/>`; }
  }
  if (angler) {
    // a single angler on the bank, mid-cast — rod tip high, line falling to the water
    const ax = w * 0.15, ay = bankY - 84 * u, k = 1.15 * u;
    s += `<g fill="${p.figure}" transform="translate(${f(ax)} ${f(ay)}) scale(${f(k)})">` +
      `<circle cx="0" cy="-118" r="11"/><path d="M-12 -122 h24 l-3 -9 h-18 z M-17 -121 h34 v4 h-34z"/>` +
      `<path d="M-13 -104 Q0 -110 13 -104 L17 -48 L-15 -48 Z"/>` +
      `<path d="M-15 -50 L15 -50 L19 0 L9 0 L1 -36 L-5 0 L-15 0 Z"/>` +
      `<path d="M10 -100 L44 -128 L48 -123 L16 -92 Z"/></g>` +
      `<path d="M${f(ax + 44 * k)} ${f(ay - 126 * k)} L${f(ax + 300 * k)} ${f(ay - 330 * k)}" stroke="${p.figure}" stroke-width="${f(3.2 * u)}" stroke-linecap="round"/>` +
      `<path d="M${f(ax + 300 * k)} ${f(ay - 330 * k)} Q${f(w * 0.5)} ${f(H - 40 * u)} ${f(w * 0.56)} ${f(H + (h - H) * 0.3)}" fill="none" stroke="${p.figure}" stroke-width="${f(1.4 * u)}" opacity=".85"/>` +
      `<circle cx="${f(w * 0.56)}" cy="${f(H + (h - H) * 0.3)}" r="${f(5 * u)}" fill="#C2412A"/>` +
      `<path d="M${f(w * 0.56 - 18 * u)} ${f(H + (h - H) * 0.3 + 9 * u)} q${f(18 * u)} -6 ${f(36 * u)} 0" fill="none" stroke="${p.shimmer}" stroke-width="${f(2.4 * u)}" stroke-linecap="round"/>`;
  }
  return s;
}

export function sceneSvg(opts = {}) {
  const { w = 1600, h = 900 } = opts;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">${scene(opts)}</svg>`;
}
