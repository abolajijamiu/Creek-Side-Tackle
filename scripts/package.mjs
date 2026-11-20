// Post-build packaging: renders the brand guide to PDF, zips the brand kit and writes a size manifest.
// Run after `vite build` (npm run build does this automatically).
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dist = path.join(root, 'dist');
const kitSrc = path.join(root, 'public/brand-kit');
const GUIDE = 'Creekside-Tackle-Brand-Guidelines.pdf';

// 1. Serve dist and print guide.html to PDF
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const f = path.join(dist, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(dist) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(4319, r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4319/guide.html', { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);
const pdfPath = path.join(kitSrc, GUIDE);
await page.pdf({ path: pdfPath, width: '1280px', height: '720px', printBackground: true });
await browser.close(); server.close();
fs.mkdirSync(path.join(dist, 'brand-kit'), { recursive: true });
fs.copyFileSync(pdfPath, path.join(dist, 'brand-kit', GUIDE));
console.log('Guide PDF written');

// 2. Zips — a full kit with a named root folder, plus one zip per top-level folder
const outDl = path.join(dist, 'downloads');
fs.rmSync(outDl, { recursive: true, force: true }); fs.mkdirSync(outDl, { recursive: true });
const stage = path.join(root, 'dist-stage'); const named = path.join(stage, 'Creekside-Tackle-Brand-Kit');
fs.rmSync(stage, { recursive: true, force: true }); fs.mkdirSync(stage, { recursive: true });
fs.cpSync(kitSrc, named, { recursive: true });
execFileSync('zip', ['-qr', '-9', path.join(outDl, 'creekside-tackle-brand-kit.zip'), 'Creekside-Tackle-Brand-Kit'], { cwd: stage });
const folders = fs.readdirSync(kitSrc).filter((d) => fs.statSync(path.join(kitSrc, d)).isDirectory());
for (const d of folders) execFileSync('zip', ['-qr', '-9', path.join(outDl, `${d}.zip`), d], { cwd: kitSrc });
fs.rmSync(stage, { recursive: true, force: true });

// 3. Manifest of sizes (zips + every kit file), used by the Downloads chapter
const manifest = {};
const count = (dir) => fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(path.join(dir, e.name)) : 1), 0);
for (const z of fs.readdirSync(outDl)) {
  const folder = z.replace(/\.zip$/, '');
  manifest[`downloads/${z}`] = { bytes: fs.statSync(path.join(outDl, z)).size, files: folders.includes(folder) ? count(path.join(kitSrc, folder)) : count(kitSrc) };
}
const walk = (dir, rel = '') => fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
  const r = rel ? `${rel}/${e.name}` : e.name;
  if (e.isDirectory()) walk(path.join(dir, e.name), r); else manifest[`brand-kit/${r}`] = { bytes: fs.statSync(path.join(dir, e.name)).size };
});
walk(kitSrc);
fs.writeFileSync(path.join(outDl, 'manifest.json'), JSON.stringify(manifest, null, 1));

// Mirror downloads into public/ so `npm run dev` serves them too (git-ignored)
fs.rmSync(path.join(root, 'public/downloads'), { recursive: true, force: true });
fs.cpSync(outDl, path.join(root, 'public/downloads'), { recursive: true });
console.log(`Packaged ${Object.keys(manifest).length} entries; full kit ${(manifest['downloads/creekside-tackle-brand-kit.zip'].bytes / 1e6).toFixed(1)} MB`);
