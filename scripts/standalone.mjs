// Builds the presentation as ONE self-contained HTML file that works offline:
//   dist-standalone/index.html  — complete document (fonts, styles, scripts and the brand kit inlined)
//   dist-artifact/index.html    — same page as body-only content, for hosts that supply the document skeleton
//   dist-artifact/guide.html    — the online brand guide
// The brand kit travels inside the page: every non-PNG file (SVG, PDF, CSS, JSON, TXT, ASE…) is packed,
// gzipped and base64-encoded; PNGs are redrawn in the browser from their SVG sources on demand.
// Run after `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const kitDir = path.join(root, 'public/brand-kit');
const tmp = path.join(root, 'dist-stage-standalone');

// ── 1. Bundle each entry into a single JS + CSS string ──────────────────
async function single(entry) {
  const dir = path.join(tmp, entry.replace('.html', ''));
  await build({
    root, configFile: false, base: './', logLevel: 'warn', plugins: [react()],
    build: { outDir: dir, emptyOutDir: true, chunkSizeWarningLimit: 8000, copyPublicDir: false, assetsInlineLimit: 1e9, cssCodeSplit: false,
      rollupOptions: { input: path.join(root, entry), output: { inlineDynamicImports: true } } },
  });
  const assets = path.join(dir, 'assets'); const files = fs.readdirSync(assets);
  const css = files.filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(path.join(assets, f), 'utf8')).join('\n');
  const js = files.filter((f) => f.endsWith('.js')).map((f) => fs.readFileSync(path.join(assets, f), 'utf8')).join('\n').replace(/<\/script/gi, '<\\/script');
  return { css, js };
}

// ── 2. Fonts as data URIs (no network needed) ───────────────────────────
const ff = (pkg, file) => fs.readFileSync(path.join(root, 'node_modules/@fontsource', pkg, 'files', file)).toString('base64');
const FONTS = [
  ['Barlow Condensed', 500, 'barlow-condensed'], ['Barlow Condensed', 600, 'barlow-condensed'], ['Barlow Condensed', 700, 'barlow-condensed'],
  ['Barlow', 400, 'barlow'], ['Barlow', 500, 'barlow'], ['Barlow', 600, 'barlow'], ['Barlow', 700, 'barlow'], ['IBM Plex Mono', 500, 'ibm-plex-mono'],
].map(([fam, w, pkg]) => `@font-face{font-family:'${fam}';font-style:normal;font-weight:${w};font-display:swap;src:url(data:font/woff2;base64,${ff(pkg, `${pkg}-latin-${w}-normal.woff2`)}) format('woff2')}`).join('');

// ── 3. Pack the brand kit ───────────────────────────────────────────────
const files = []; const walk = (d, rel = '') => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => e.isDirectory() ? walk(path.join(d, e.name), `${rel}${e.name}/`) : files.push(`${rel}${e.name}`));
walk(kitDir); files.sort();
const index = {}; const chunks = []; let off = 0; const pngs = {}; const sizes = {};
for (const rel of files) {
  const buf = fs.readFileSync(path.join(kitDir, rel)); const key = `brand-kit/${rel}`;
  sizes[key] = buf.length;
  if (rel.endsWith('.png')) { pngs[key] = [buf.readUInt32BE(16), buf.readUInt32BE(20)]; continue; }
  index[key] = [off, buf.length]; chunks.push(buf); off += buf.length;
}
const head = Buffer.from(JSON.stringify(index)); const len = Buffer.alloc(4); len.writeUInt32BE(head.length);
const packed = zlib.gzipSync(Buffer.concat([len, head, ...chunks]), { level: 9 }).toString('base64');
// Pre-built zip sizes (for labels) when available
const man = path.join(root, 'dist/downloads/manifest.json');
if (fs.existsSync(man)) { const m = JSON.parse(fs.readFileSync(man, 'utf8')); for (const [k, v] of Object.entries(m)) if (k.startsWith('downloads/')) sizes[k] = v.bytes; }
const meta = JSON.stringify({ pngs, sizes }).replace(/</g, '\\u003c');

// ── 4. Write the outputs ────────────────────────────────────────────────
const main = await single('index.html');
const guide = await single('guide.html');
fs.rmSync(tmp, { recursive: true, force: true });

const TITLE = 'Creekside Tackle Brand Identity';
const DESC = 'Brand identity system for Creekside Tackle: logo, colour, typography, visual language, applications, guidelines and brand kit.';
// The ids below are what the page's "Download as HTML" button reassembles itself from (src/lib/selfsave.ts).
const body = `<style id="app-fonts">${FONTS}</style>\n<style id="app-style">${main.css}</style>\n` +
  `<script id="kit-meta" type="application/json">${meta}</script>\n<script id="kit-pack" type="application/octet-stream">${packed}</script>\n` +
  `<div id="root"></div>\n<script id="app-script" type="module">${main.js}</script>\n`;

const full = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n` +
  `<title>${TITLE}</title>\n<meta name="description" content="${DESC}">\n<meta name="theme-color" content="#1F3D2E">\n</head>\n<body>\n${body}</body>\n</html>\n`;

fs.mkdirSync(path.join(root, 'dist-standalone'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist-standalone/index.html'), full);
fs.mkdirSync(path.join(root, 'standalone'), { recursive: true });
fs.writeFileSync(path.join(root, 'standalone/index.html'), full);
// Hosted multi-file builds offer the same single file from their "Download as HTML" buttons
if (fs.existsSync(path.join(root, 'dist'))) fs.writeFileSync(path.join(root, 'dist/creekside-tackle-brand.html'), full);

fs.rmSync(path.join(root, 'dist-artifact'), { recursive: true, force: true });
fs.mkdirSync(path.join(root, 'dist-artifact'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist-artifact/index.html'), `<title>${TITLE}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${body}`);
fs.writeFileSync(path.join(root, 'dist-artifact/guide.html'),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Creekside Tackle Brand Guidelines</title><style>${FONTS}</style><style>${guide.css}</style></head><body><div id="root"></div><script type="module">${guide.js}</script></body></html>`);

const mb = (n) => (n / 1e6).toFixed(2) + ' MB';
console.log(`standalone/index.html ${mb(Buffer.byteLength(full))} · kit pack ${mb(packed.length)} · ${Object.keys(index).length} packed files, ${Object.keys(pngs).length} PNGs drawn on demand`);
