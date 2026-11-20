import fs from 'node:fs';
import { LOGOS, SCHEMES } from './lib/logo.mjs';
const out = process.argv[2];
let html = '<body style="margin:0;font-family:sans-serif">';
for (const [name, fn] of Object.entries(LOGOS)) for (const sc of Object.keys(SCHEMES)) {
  if (name === 'badge' && !['full-color','reverse','mono-spruce','mono-white'].includes(sc)) continue;
  const dark = sc === 'reverse' || sc === 'mono-white';
  html += `<div style="display:inline-block;vertical-align:top;margin:8px;padding:24px;background:${dark ? '#1F3D2E' : '#F2F1E9'}"><div style="width:260px;height:180px;display:grid;place-items:center">${fn(sc).replace(/width="[\d.]+" height="[\d.]+"/, 'style="max-width:260px;max-height:180px;width:auto;height:auto"')}</div><small style="color:#888">${name} / ${sc}</small></div>`;
}
fs.writeFileSync(out, html);
