// Reads the brand kit embedded in the standalone page (see scripts/standalone.mjs) and recreates any
// kit file on demand: packed files are returned as-is, PNGs are redrawn from their SVG sources.
type Meta = { pngs: Record<string, [number, number]>; sizes: Record<string, number> };

const metaEl = () => (typeof document === 'undefined' ? null : document.getElementById('kit-meta'));
export const kitMeta: Meta | null = (() => {
  try { const el = metaEl(); return el ? (JSON.parse(el.textContent || '{}') as Meta) : null; } catch { return null; }
})();
export const hasEmbeddedKit = () => !!document.getElementById('kit-pack');

let packPromise: Promise<{ index: Record<string, [number, number]>; data: Uint8Array } | null> | null = null;
function loadPack() {
  if (packPromise) return packPromise;
  packPromise = (async () => {
    const el = document.getElementById('kit-pack');
    if (!el || typeof DecompressionStream === 'undefined') return null;
    const bin = atob((el.textContent || '').trim());
    const gz = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) gz[i] = bin.charCodeAt(i);
    const stream = new Blob([gz]).stream().pipeThrough(new DecompressionStream('gzip'));
    const raw = new Uint8Array(await new Response(stream).arrayBuffer());
    const n = new DataView(raw.buffer).getUint32(0);
    const index = JSON.parse(new TextDecoder().decode(raw.subarray(4, 4 + n)));
    return { index, data: raw.subarray(4 + n) };
  })().catch(() => null);
  return packPromise;
}

async function packed(path: string): Promise<Uint8Array | null> {
  const p = await loadPack(); const e = p?.index[path];
  return e && p ? p.data.subarray(e[0], e[0] + e[1]) : null;
}
const text = async (path: string) => { const b = await packed(path); return b ? new TextDecoder().decode(b) : null; };

const MIME: Record<string, string> = { svg: 'image/svg+xml', pdf: 'application/pdf', json: 'application/json', css: 'text/css', txt: 'text/plain', html: 'text/html', js: 'text/javascript', png: 'image/png' };
const mime = (p: string) => MIME[p.split('.').pop()!] || 'application/octet-stream';

/** Where each PNG's artwork comes from, and how to adjust it before drawing. */
async function pngSource(p: string): Promise<string | null> {
  const dir = p.slice(0, p.lastIndexOf('/')); const base = p.slice(p.lastIndexOf('/') + 1, -4);
  let m: RegExpMatchArray | null;
  if ((m = base.match(/^icon-(.+)-(spruce|birch)$/))) {
    const s = await text(`${dir.replace(/\/PNG$/, '/SVG')}/icon-${m[1]}.svg`);
    return s && (m[2] === 'birch' ? s.replace(/#1F3D2E/gi, '#F2F1E9') : s);
  }
  if ((m = base.match(/^(creekside-tackle-symbol-full-color)-\d+px$/))) return text(`${dir.replace(/\/PNG$/, '/SVG')}/${m[1]}.svg`);
  if (dir.endsWith('/Favicon') || base === 'creekside-signature-logo') {
    const fav = await text('brand-kit/07-Web/Favicon/favicon.svg'); if (!fav) return null;
    if (/^(apple-touch-icon|icon-\d+)$/.test(base)) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#1F3D2E"/>${fav.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>`;
    return fav;
  }
  if (dir.endsWith('/Business-Card')) {
    const s = await text(`${dir}/${base}.svg`);
    return s && s.replace(/viewBox="0 0 [\d.]+ [\d.]+"/, 'viewBox="37.5 37.5 1050 600"');
  }
  if (dir === 'brand-kit/05-Social-Media') {
    const s = await text(`${dir}/Editable-SVG/${base}.svg`);
    const fonts = document.getElementById('app-fonts')?.textContent || '';
    return s && s.replace(/<style>@import[^<]*<\/style>/, '').replace(/(<svg[^>]*>)/, `$1<style>${fonts}</style>`);
  }
  return (await text(`${dir.replace(/\/PNG$/, '/SVG')}/${base}.svg`)) ?? text(`${dir}/${base}.svg`);
}

async function rasterize(svg: string, w: number, h: number): Promise<Blob | null> {
  const sized = svg.replace(/<svg([^>]*?)\swidth="[\d.]+"\sheight="[\d.]+"/, '<svg$1').replace('<svg', `<svg width="${w}" height="${h}"`);
  const url = URL.createObjectURL(new Blob([sized], { type: 'image/svg+xml' }));
  try {
    const img = new Image(); img.src = url; await img.decode();
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d')!.drawImage(img, 0, 0, w, h);
    return await new Promise<Blob | null>((r) => c.toBlob(r, 'image/png'));
  } catch { return null; } finally { URL.revokeObjectURL(url); }
}

/** Recreate one brand-kit file from the embedded kit, or null when this page has no embedded kit. */
export async function embeddedFile(path: string): Promise<Blob | null> {
  if (!hasEmbeddedKit()) return null;
  if (path.endsWith('.png')) {
    const dims = kitMeta?.pngs[path]; const svg = dims && (await pngSource(path));
    return svg && dims ? rasterize(svg, dims[0], dims[1]) : null;
  }
  const b = await packed(path);
  return b ? new Blob([b], { type: mime(path) }) : null;
}

/** Every file path in the brand kit, from the embedded manifest. */
export const kitPaths = () => Object.keys(kitMeta?.sizes || {}).filter((k) => k.startsWith('brand-kit/'));
