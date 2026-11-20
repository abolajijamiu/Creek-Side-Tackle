// Iconography + patterns. Icons: 24px grid, 1.75 stroke, round caps and joins, no fills.

export const ICONS = {
  hook: { label: 'Hooks', d: '<circle cx="14.5" cy="3.6" r="1.6"/><path d="M14.5 5.2V15a4.6 4.6 0 0 1-9.2 0v-4.2l2.6 2.6"/>' },
  bobber: { label: 'Floats', d: '<circle cx="12" cy="14" r="5.2"/><path d="M6.8 14h10.4M12 8.8V2.8M12 19.2v2.3"/>' },
  fish: { label: 'Species', d: '<path d="M2.8 12c3-4.6 9.4-5.8 13.4-2l4.2-3.2v10.4L16.2 14c-4 3.8-10.4 2.6-13.4-2z"/><circle cx="7.6" cy="11.2" r=".9" fill="currentColor" stroke="none"/>' },
  spinner: { label: 'Lures', d: '<path d="M12 2.5v2.6"/><ellipse cx="12" cy="8.6" rx="2.6" ry="3.5"/><path d="M12 12.1v1.6M10.6 13.7h2.8l-.5 4.1h-1.8zM12 17.8v2.2m0 0a1.6 1.6 0 0 1-3.2 0m3.2 0a1.6 1.6 0 0 0 3.2 0"/>' },
  spool: { label: 'Line', d: '<rect x="4.5" y="3.5" width="11" height="17" rx="2"/><path d="M7.5 7.5h5M7.5 10.5h5M7.5 13.5h5M7.5 16.5h5M15.5 12c3 0 3.5 3.5 5 5"/>' },
  tacklebox: { label: 'Storage', d: '<rect x="3" y="9" width="18" height="11" rx="1.6"/><path d="M3 13.5h18M9 9V6.6A1.6 1.6 0 0 1 10.6 5h2.8A1.6 1.6 0 0 1 15 6.6V9M10.8 13.5v2h2.4v-2"/>' },
  pine: { label: 'Outdoors', d: '<path d="M12 2.5l4 5.5h-2.2l3.7 5h-2.3l4 5.5H4.8l4-5.5H6.5l3.7-5H8zM12 18.5V22"/>' },
  water: { label: 'Water', d: '<path d="M2.5 8.5c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0 3.2-1.4 4.8 0 3.2 1.4 4.8 0M2.5 13c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0 3.2-1.4 4.8 0 3.2 1.4 4.8 0M2.5 17.5c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0 3.2-1.4 4.8 0 3.2 1.4 4.8 0"/>' },
  canoe: { label: 'Trips', d: '<path d="M2 13c2.8 4 17.2 4 20 0-6.4 1.4-13.6 1.4-20 0z"/><path d="M17.5 3 12.6 12"/><path d="M11.4 11.4l2.6 1.4-2.2 3.9a1.5 1.5 0 0 1-2.6-1.4z"/>' },
  pin: { label: 'Local', d: '<path d="M12 21.2s-6.6-6-6.6-11.1a6.6 6.6 0 0 1 13.2 0c0 5.1-6.6 11.1-6.6 11.1z"/><circle cx="12" cy="10" r="2.4"/>' },
  shipping: { label: 'Shipping', d: '<path d="M3.5 7.4 12 3l8.5 4.4v9.2L12 21l-8.5-4.4z"/><path d="M3.5 7.4 12 11.8l8.5-4.4M12 11.8V21M7.8 5.2l8.4 4.4"/>' },
  secure: { label: 'Secure', d: '<path d="M12 3l7.5 3v5.6c0 4.6-3.2 8.2-7.5 9.4-4.3-1.2-7.5-4.8-7.5-9.4V6z"/><path d="m8.8 12.1 2.2 2.2 4.3-4.5"/>' },
  compass: { label: 'Guides', d: '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.2 5-5 2.2 2.2-5z"/>' },
  sun: { label: 'Season', d: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>' },
  chat: { label: 'Advice', d: '<path d="M4 5.5h16v10.5H10l-4.5 3.8V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>' },
  ruler: { label: 'Sizing', d: '<rect x="2.5" y="8" width="19" height="8" rx="1.2"/><path d="M6.5 8v3M10.5 8v4.2M14.5 8v3M18.5 8v4.2"/>' },
};

export function iconSvg(key, { size = 24, color = 'currentColor', stroke = 1.75 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${ICONS[key].d.replace(/currentColor/g, color)}</svg>`;
}

/** "Current" — offset rows of wave strokes. Tile is seamless. */
export function currentPattern({ color = '#1F3D2E', bg = 'none', size = 64, stroke = 2 } = {}) {
  const w = size, h = size / 2;
  const wave = (y, off) => `<path d="M${-w + off} ${y} q${w / 8} ${-h / 5} ${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${bg !== 'none' ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}${wave(h * 0.3, 0)}${wave(h * 0.8, w / 4)}</svg>`;
}

/** "Depth Chart" — lake contour lines like a fishing map. */
export function contourPattern({ w = 1200, h = 800, color = '#1F3D2E', bg = 'none', seed = 3, stroke = 1.4, rings = 14, cx = 0.62, cy = 0.55 } = {}) {
  let s = seed; const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const harmonics = Array.from({ length: 4 }, (_, i) => ({ k: i + 2, a: 0.05 + rand() * 0.08, p: rand() * 6.28 }));
  const centers = [[w * cx, h * cy], [w * 0.16, h * 0.2]];
  let paths = '';
  centers.forEach(([x0, y0], ci) => {
    const n = ci === 0 ? rings : Math.round(rings / 2);
    for (let r = 1; r <= n; r++) {
      const R = (ci === 0 ? 46 : 38) * r * (Math.min(w, h) / 800); const pts = [];
      for (let t = 0; t <= 96; t++) {
        const a = (t / 96) * Math.PI * 2;
        const m = 1 + harmonics.reduce((acc, hm) => acc + hm.a * Math.sin(hm.k * a + hm.p + r * 0.13), 0);
        pts.push(`${(x0 + Math.cos(a) * R * 1.35 * m).toFixed(1)} ${(y0 + Math.sin(a) * R * m).toFixed(1)}`);
      }
      paths += `<path d="M${pts.join('L')}Z" fill="none" stroke="${color}" stroke-width="${stroke}" opacity="${r % 5 === 0 ? 1 : 0.55}"/>`;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">${bg !== 'none' ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}${paths}</svg>`;
}

/** "Treeline" border — repeating pine row for footers, box bottoms and dividers. */
export function treelineBorder({ w = 1200, h = 60, color = '#1F3D2E' } = {}) {
  let d = ''; let x = 0; let i = 0; const hs = [1, 0.72, 0.86, 0.62, 0.94, 0.7];
  while (x < w + 30) {
    const th = h * hs[i % hs.length]; const tw = th * 0.5;
    d += `M${x} ${h - th}l${tw / 2} ${th * 0.4}h${-tw * 0.18}l${tw * 0.32} ${th * 0.32}h${-tw * 0.16}l${tw * 0.35} ${th * 0.28}H${x - tw * 0.83}l${tw * 0.35} ${-th * 0.28}h${-tw * 0.16}l${tw * 0.32} ${-th * 0.32}h${-tw * 0.18}z`;
    x += tw * 0.78; i++;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="none"><path d="${d}" fill="${color}"/><rect y="${h - 3}" width="${w}" height="3" fill="${color}"/></svg>`;
}
