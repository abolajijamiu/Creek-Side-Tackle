import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const ff = (pkg, file) => fs.readFileSync(path.join(root, 'node_modules/@fontsource', pkg, 'files', file)).toString('base64');
export const FONT_CSS = [
  ['Barlow Condensed', 600, 'barlow-condensed', 'barlow-condensed-latin-600-normal.woff2'],
  ['Barlow Condensed', 700, 'barlow-condensed', 'barlow-condensed-latin-700-normal.woff2'],
  ['Barlow', 400, 'barlow', 'barlow-latin-400-normal.woff2'],
  ['Barlow', 500, 'barlow', 'barlow-latin-500-normal.woff2'],
  ['Barlow', 600, 'barlow', 'barlow-latin-600-normal.woff2'],
  ['IBM Plex Mono', 500, 'ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2'],
].map(([fam, w, pkg, file]) => `@font-face{font-family:'${fam}';font-weight:${w};font-style:normal;src:url(data:font/woff2;base64,${ff(pkg, file)}) format('woff2')}`).join('\n');

export class Renderer {
  async start() { this.browser = await chromium.launch(); this.page = await this.browser.newPage(); }
  async stop() { await this.browser.close(); }
  /** Render an SVG document to PNG at exactly w×h pixels. */
  async png(svg, out, w, h, { transparent = true } = {}) {
    w = Math.round(w); h = Math.round(h);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const sized = svg.replace(/<svg([^>]*?)\swidth="[\d.]+"\sheight="[\d.]+"/, '<svg$1').replace('<svg', `<svg width="${w}" height="${h}"`);
    await this.page.setViewportSize({ width: w, height: h });
    await this.page.setContent(`<!doctype html><html><head><style>${FONT_CSS}html,body{margin:0;background:transparent;overflow:hidden}svg{display:block}</style></head><body>${sized}</body></html>`);
    await this.page.evaluate(() => document.fonts.ready);
    await this.page.screenshot({ path: out, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
  }
  /** Render an SVG to a PDF page of the given size in inches. */
  async pdf(svgs, out, wIn, hIn) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const body = svgs.map((s) => `<div class="pg">${s.replace(/<svg([^>]*?)\swidth="[\d.]+"\sheight="[\d.]+"/, '<svg$1').replace('<svg', '<svg width="100%" height="100%"')}</div>`).join('');
    await this.page.setContent(`<!doctype html><html><head><style>${FONT_CSS}@page{size:${wIn}in ${hIn}in;margin:0}html,body{margin:0}.pg{width:${wIn}in;height:${hIn}in;page-break-after:always;overflow:hidden}svg{display:block}</style></head><body>${body}</body></html>`);
    await this.page.evaluate(() => document.fonts.ready);
    await this.page.pdf({ path: out, width: `${wIn}in`, height: `${hIn}in`, printBackground: true });
  }
}

/** Place a full <svg> document inside another SVG at x, y with a given width (height follows the viewBox). */
export function place(svgDoc, x, y, width) {
  const vb = svgDoc.match(/viewBox="([\d.\s-]+)"/)[1].split(/\s+/).map(Number);
  const height = (width * vb[3]) / vb[2];
  const inner = svgDoc.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>.*?<\/title>/, '');
  return { svg: `<svg x="${x}" y="${y}" width="${width}" height="${height.toFixed(2)}" viewBox="${vb.join(' ')}">${inner}</svg>`, height };
}

export const ratio = (svgDoc) => { const vb = svgDoc.match(/viewBox="([\d.\s-]+)"/)[1].split(/\s+/).map(Number); return vb[3] / vb[2]; };
