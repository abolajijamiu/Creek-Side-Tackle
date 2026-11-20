import kitJson from '../generated/kit.json';
import brandJson from '../../brand/brand.json';

export type Scheme = 'full-color' | 'reverse' | 'mono-spruce' | 'mono-black' | 'mono-white';
export type LogoKey = 'primary' | 'horizontal' | 'wordmark' | 'symbol' | 'pine-hook' | 'badge';

interface Kit {
  figure: string;
  logos: Record<LogoKey, Record<Scheme, string>>;
  social: Record<string, { w: number; h: number; svg: string }>;
  card: { front: string; back: string };
  sticker: string;
  label: string;
  patterns: { current: string; currentLight: string };
}

export const kit = kitJson as unknown as Kit;
export const brand = brandJson;

export const logo = (k: LogoKey, s: Scheme = 'full-color') => kit.logos[k][s];

/** Make every id inside an SVG string unique so the same artwork can render several times on one page. */
let n = 0;
export function uniq(svg: string) {
  const tag = `u${++n}_`;
  return svg.replace(/id="([^"]+)"/g, `id="${tag}$1"`).replace(/url\(#([^)]+)\)/g, `url(#${tag}$1)`);
}

export const svgUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

// ── Colour maths ────────────────────────────────────────────────────────
export function hexToRgb(h: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}
function lum(h: string) {
  const [r, g, b] = hexToRgb(h).map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
export const isLight = (h: string) => lum(h) > 0.32;

// ── Downloads ───────────────────────────────────────────────────────────
// Inside the claude.ai viewer, files are handed to the viewer through the `downloads`
// capability. Anywhere else (local preview, static hosting), a normal link download is used.
type DownloadsNs = { save: (r: { filename: string; data: Blob }) => Promise<{ status: string }> } | null;
let dlPromise: Promise<DownloadsNs> | null = null;
function downloadsNs(): Promise<DownloadsNs> {
  const c = (window as unknown as { claude?: { use: (n: string) => Promise<DownloadsNs> } }).claude;
  if (!c?.use) return Promise.resolve(null);
  if (!dlPromise) dlPromise = c.use('downloads').catch(() => null);
  return dlPromise;
}
if (typeof window !== 'undefined') setTimeout(() => { void downloadsNs(); }, 0);

export type DownloadResult = 'saved' | 'started' | 'declined' | 'failed';
export async function download(url: string, filename: string): Promise<DownloadResult> {
  const ns = await downloadsNs();
  if (ns) {
    try {
      const res = await fetch(url);
      if (!res.ok) return 'failed';
      await ns.save({ filename, data: await res.blob() });
      return 'saved';
    } catch (e) {
      return (e as { code?: string })?.code === 'declined' ? 'declined' : 'failed';
    }
  }
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  return 'started';
}
