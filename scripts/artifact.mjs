// Builds a self-contained version of the presentation (all JS/CSS inlined) into dist-artifact/,
// alongside the downloadable files the page links to. Used for sharing the presentation as a
// hosted page that only allows inline scripts. Run after `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'dist-artifact');
const tmp = path.join(root, 'dist-stage-artifact');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });

async function single(entry) {
  const dir = path.join(tmp, entry.replace('.html', ''));
  await build({
    root, configFile: false, base: './', logLevel: 'warn', plugins: [react()],
    build: { outDir: dir, emptyOutDir: true, chunkSizeWarningLimit: 4000, copyPublicDir: false, assetsInlineLimit: 1e9, cssCodeSplit: false,
      rollupOptions: { input: path.join(root, entry), output: { inlineDynamicImports: true } } },
  });
  const assets = path.join(dir, 'assets');
  const files = fs.readdirSync(assets);
  const css = files.filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(path.join(assets, f), 'utf8')).join('\n');
  const js = files.filter((f) => f.endsWith('.js')).map((f) => fs.readFileSync(path.join(assets, f), 'utf8')).join('\n').replace(/<\/script/gi, '<\\/script');
  return { css, js };
}

const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap">';

// Main page: body content only (the host wraps it in a document skeleton)
{
  const { css, js } = await single('index.html');
  fs.writeFileSync(path.join(out, 'index.html'),
    `<title>Creekside Tackle Brand Identity</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${FONTS}\n<style>${css}</style>\n<div id="root"></div>\n<script type="module">${js}</script>\n`);
}
// Guide page: a complete standalone document
{
  const { css, js } = await single('guide.html');
  fs.writeFileSync(path.join(out, 'guide.html'),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Creekside Tackle Brand Guidelines</title>${FONTS}<style>${css}</style></head><body><div id="root"></div><script type="module">${js}</script></body></html>`);
}
fs.rmSync(tmp, { recursive: true, force: true });

// Downloadable files: the whole kit as individual files plus the size manifest. Hosts that can't
// serve .zip files get ZIPs assembled in the browser from these (see src/lib/kit.ts → buildZip).
fs.mkdirSync(path.join(out, 'downloads'), { recursive: true });
fs.copyFileSync(path.join(root, 'dist/downloads/manifest.json'), path.join(out, 'downloads/manifest.json'));
fs.cpSync(path.join(root, 'dist/brand-kit'), path.join(out, 'brand-kit'), { recursive: true });
const all = []; const walk = (d, rel = '') => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => e.isDirectory() ? walk(path.join(d, e.name), `${rel}${e.name}/`) : all.push(`${rel}${e.name}`));
walk(out);
const CT = { '.ase': 'application/octet-stream', '.scss': 'text/plain' };
const list = all.filter((f) => f !== 'index.html').map((f) => (CT[path.extname(f)] ? { path: f, contentType: CT[path.extname(f)] } : { path: f }));
fs.writeFileSync(path.join(root, 'dist-artifact.files.json'), JSON.stringify(list));
console.log(`dist-artifact: ${all.length} files, index ${(fs.statSync(path.join(out, 'index.html')).size / 1e6).toFixed(2)} MB`);
