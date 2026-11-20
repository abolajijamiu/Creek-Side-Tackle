import { useMemo } from 'react';
import { Svg, Logo } from '../components/ui';
import { kit, logo, svgUrl, uniq } from '../lib/kit';
import { productSvg, PRODUCTS } from '../../brand/products.mjs';
import { treelineBorder, contourPattern } from '../../brand/graphics.mjs';

const inner = (svg: string) => {
  const vb = svg.match(/viewBox="([^"]+)"/)![1];
  return { vb, body: uniq(svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')) };
};

/* ── Business cards on slate ─────────────────────────────── */
export function BusinessCards() {
  return (
    <div className="bc surface-slate">
      <div className="bc__card bc__card--back shadow-object"><Svg svg={kit.card.back} /></div>
      <div className="bc__card bc__card--front shadow-object"><Svg svg={kit.card.front} /></div>
    </div>
  );
}

/* ── Blister hang card for lures ─────────────────────────── */
export function BlisterCard() {
  const p = PRODUCTS.spinner;
  const contour = useMemo(() => contourPattern({ w: 300, h: 260, color: '#A9C9CF', rings: 8, cx: 0.7, cy: 0.4, stroke: 1.4 }), []);
  return (
    <div className="blister shadow-object">
      <div className="blister__head">
        <Svg svg={contour} fit="cover" className="blister__contour" />
        <span className="blister__slot" aria-hidden="true" />
        <div className="blister__logo"><Logo k="primary" scheme="reverse" /></div>
      </div>
      <div className="blister__body">
        <div className="blister__bubble">
          <Svg svg={productSvg('spinner')} className="blister__product" />
          <span className="blister__sheen" aria-hidden="true" />
        </div>
        <p className="blister__cat">INLINE SPINNERS</p>
        <p className="blister__name">Creek Spinner</p>
        <div className="blister__specs"><span>1/8 OZ</span><span>#2 BLADE</span><span>3 PACK</span></div>
      </div>
      <div className="blister__foot">
        <span>Trout · Bass · Panfish</span><span className="blister__price">${p.price}</span>
      </div>
    </div>
  );
}

/* ── Kraft box for hooks (CSS 3D) ────────────────────────── */
export function HookBox() {
  const tree = useMemo(() => treelineBorder({ w: 400, h: 40, color: '#1F3D2E' }), []);
  return (
    <div className="box3d-scene">
      <div className="box3d">
        <div className="box3d__face box3d__front">
          <div className="box3d__band"><Logo k="horizontal" scheme="reverse" /></div>
          <div className="box3d__content">
            <p className="box3d__cat">OFFSET WORM HOOKS</p>
            <p className="box3d__name">Weedless Pro-Pack</p>
            <div className="box3d__art"><Svg svg={productSvg('hooks')} /></div>
            <p className="box3d__spec">SIZE 2/0 · 10 PCS · BLACK NICKEL</p>
          </div>
          <Svg svg={tree} className="box3d__tree" />
        </div>
        <div className="box3d__face box3d__side" style={{ backgroundImage: svgUrl(kit.patterns.currentLight), backgroundSize: '48px 24px' }}>
          <p>HONEST GEAR.<br />LOCAL WATER.</p>
        </div>
        <div className="box3d__face box3d__top"><div className="box3d__seal"><Logo k="symbol" scheme="mono-spruce" /></div></div>
      </div>
      <div className="box3d__shadow" />
    </div>
  );
}

/* ── Line spool ──────────────────────────────────────────── */
export function Spool() {
  const seal = inner(logo('symbol', 'mono-spruce'));
  return (
    <svg viewBox="0 0 240 240" className="spool shadow-object" role="img" aria-label="Line spool with Creekside Mono label">
      <defs>
        <radialGradient id="spool-g" cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#2A5440" /><stop offset="1" stopColor="#152B20" /></radialGradient>
        <path id="spool-arc" d="M120 120 m-74 0 a74 74 0 1 1 148 0" />
        <path id="spool-arc2" d="M120 120 m-86 0 a86 86 0 0 0 172 0" />
      </defs>
      <circle cx="120" cy="120" r="116" fill="url(#spool-g)" />
      <circle cx="120" cy="120" r="104" fill="none" stroke="#A9C9CF" strokeWidth="1" opacity=".35" />
      <circle cx="120" cy="120" r="96" fill="#F2F1E9" />
      <text fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="21" letterSpacing="3" fill="#1F3D2E"><textPath href="#spool-arc" startOffset="50%" textAnchor="middle">CREEKSIDE MONO</textPath></text>
      <text fontFamily="IBM Plex Mono, monospace" fontWeight="500" fontSize="11" letterSpacing="2" fill="#2B6077"><textPath href="#spool-arc2" startOffset="50%" textAnchor="middle">8 LB · 300 YD · CLEAR</textPath></text>
      <svg x="84" y="84" width="72" height="72" viewBox={seal.vb} dangerouslySetInnerHTML={{ __html: seal.body }} />
      <circle cx="120" cy="120" r="9" fill="#14281E" />
      <circle cx="120" cy="120" r="9" fill="none" stroke="#000" strokeOpacity=".3" strokeWidth="2" />
      <ellipse cx="88" cy="70" rx="40" ry="18" fill="#fff" opacity=".07" transform="rotate(-30 88 70)" />
    </svg>
  );
}

/* ── Kraft pouch with product label ──────────────────────── */
export function Pouch() {
  const lbl = inner(kit.label);
  return (
    <svg viewBox="0 0 300 380" className="pouch shadow-object" role="img" aria-label="Kraft pouch with a Creekside product label">
      <defs>
        <linearGradient id="pouch-g" x1="0" x2="1"><stop offset="0" stopColor="#C9B48F" /><stop offset=".18" stopColor="#D8C6A6" /><stop offset=".8" stopColor="#D5C2A0" /><stop offset="1" stopColor="#BFA983" /></linearGradient>
        <linearGradient id="pouch-sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset=".85" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".16" /></linearGradient>
      </defs>
      <path d="M22 18h256l6 330q-134 22-268 0z" fill="url(#pouch-g)" />
      <path d="M22 18h256l6 330q-134 22-268 0z" fill="url(#pouch-sh)" />
      <rect x="40" y="34" width="220" height="5" rx="2.5" fill="#B49D76" />
      <rect x="40" y="46" width="220" height="2" fill="#B49D76" opacity=".7" />
      <ellipse cx="150" cy="70" rx="16" ry="6" fill="#F2F1E9" stroke="#B49D76" />
      <g transform="translate(34 120) rotate(-1 116 58)">
        <rect width="232" height="116" fill="#000" opacity=".12" x="2" y="3" />
        <svg width="232" height="116" viewBox={lbl.vb} dangerouslySetInnerHTML={{ __html: lbl.body }} />
      </g>
      <path d="M50 260q100 18 200 0" stroke="#B49D76" strokeWidth="1.2" fill="none" opacity=".6" />
      <path d="M40 90 L44 330" stroke="#fff" strokeOpacity=".12" strokeWidth="10" />
    </svg>
  );
}

/* ── Stickers on a lake-blue cooler ──────────────────────── */
export function Stickers() {
  return (
    <div className="stickers surface-cooler">
      <div className="sticker sticker--badge shadow-object"><Svg svg={kit.sticker} /><span className="sticker__peel" aria-hidden="true" /></div>
      <div className="sticker sticker--bumper shadow-object">
        <div className="sticker__bumper-in">
          <div style={{ width: 56 }}><Logo k="symbol" scheme="reverse" /></div>
          <p>HONEST GEAR.<br /><span>LOCAL WATER.</span></p>
        </div>
      </div>
    </div>
  );
}

/* ── Trucker cap with woven badge patch ──────────────────── */
export function Cap() {
  const b = inner(logo('badge', 'full-color'));
  return (
    <svg viewBox="0 0 400 320" className="cap" role="img" aria-label="Spruce trucker cap with the Creekside badge patch">
      <defs>
        <clipPath id="cap-crown"><path d="M70 212C68 124 124 58 200 56s132 68 130 156z" /></clipPath>
        <pattern id="cap-mesh" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#E9E6DA" /><circle cx="3.5" cy="3.5" r="1.9" fill="#BDB9A8" /></pattern>
        <radialGradient id="cap-shade" cx="42%" cy="30%" r="75%"><stop offset="0" stopColor="#fff" stopOpacity=".14" /><stop offset=".6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".38" /></radialGradient>
        <linearGradient id="cap-brim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A3427" /><stop offset="1" stopColor="#10221A" /></linearGradient>
      </defs>
      <ellipse cx="200" cy="276" rx="132" ry="12" fill="#000" opacity=".16" />
      <g clipPath="url(#cap-crown)">
        <rect width="400" height="320" fill="url(#cap-mesh)" />
        <path d="M122 214C116 138 150 66 200 60c50 6 84 78 78 154z" fill="#1F3D2E" />
        <rect width="400" height="320" fill="url(#cap-shade)" />
      </g>
      <path d="M200 60v150" stroke="#14281E" strokeWidth="1.4" opacity=".6" />
      <path d="M122 214C116 138 150 66 200 60c50 6 84 78 78 154" fill="none" stroke="#14281E" strokeWidth="1.5" opacity=".55" />
      <g transform="translate(148 90)">
        <circle cx="52" cy="52" r="54" fill="#000" opacity=".22" />
        <svg width="104" height="104" viewBox={b.vb} dangerouslySetInnerHTML={{ __html: b.body }} />
        <circle cx="52" cy="52" r="49" fill="none" stroke="#F2F1E9" strokeWidth="1.2" strokeDasharray="2.5 2" opacity=".75" />
      </g>
      <ellipse cx="200" cy="58" rx="10" ry="5" fill="#1F3D2E" stroke="#14281E" />
      <path d="M72 208Q200 188 328 208C334 232 292 256 200 258C108 256 66 232 72 208Z" fill="url(#cap-brim)" />
      <path d="M84 212Q200 194 316 212" stroke="#F2F1E9" strokeOpacity=".3" strokeDasharray="3 3" fill="none" />
      <path d="M96 232Q200 248 304 232" stroke="#F2F1E9" strokeOpacity=".18" strokeDasharray="3 3" fill="none" />
    </svg>
  );
}

/* ── T-shirts ────────────────────────────────────────────── */
function Tee({ color, art, artW, artY, label, small = false }: { color: string; art: string; artW: number; artY: number; label: string; small?: boolean }) {
  const a = inner(art);
  const [, , w, h] = a.vb.split(' ').map(Number);
  const ah = (artW * h) / w;
  const id = useMemo(() => `tee${Math.random().toString(36).slice(2, 7)}`, []);
  return (
    <svg viewBox="0 0 400 440" className="tee" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}s`} x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".22" /><stop offset=".25" stopColor="#000" stopOpacity="0" /><stop offset=".75" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".22" /></linearGradient>
      </defs>
      <ellipse cx="200" cy="428" rx="140" ry="8" fill="#000" opacity=".15" />
      <path d="M136 28q64 34 128 0l96 40 34 84-64 24-10-30v280q-120 14-240 0V146l-10 30-64-24 34-84z" fill={color} />
      <path d="M136 28q64 34 128 0l96 40 34 84-64 24-10-30v280q-120 14-240 0V146l-10 30-64-24 34-84z" fill={`url(#${id}s)`} />
      <path d="M136 28q64 44 128 0" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="7" />
      <path d="M80 146l-10 30M320 146l10 30" stroke="#000" strokeOpacity=".2" strokeWidth="1.5" />
      <path d="M110 250c20 30 10 90 30 130M300 230c-16 40-6 100-22 150" stroke="#000" strokeOpacity=".07" strokeWidth="12" fill="none" strokeLinecap="round" />
      <svg x={small ? 236 : 200 - artW / 2} y={artY} width={artW} height={ah} viewBox={a.vb} opacity=".94" dangerouslySetInnerHTML={{ __html: a.body }} />
    </svg>
  );
}

export function Tees() {
  return (
    <div className="tees">
      <Tee color="#1F3D2E" art={logo('primary', 'reverse')} artW={130} artY={96} label="Spruce t-shirt with the primary logo printed on the chest" />
      <Tee color="#E4DCC9" art={logo('badge', 'mono-spruce')} artW={58} artY={92} small label="Oatmeal t-shirt with a small badge on the left chest" />
    </div>
  );
}

/* ── Enamel camp mug + canvas tote ───────────────────────── */
export function Merch() {
  const mark = inner(logo('pine-hook', 'mono-spruce'));
  const tote = inner(logo('primary', 'mono-spruce'));
  return (
    <div className="merch">
      <svg viewBox="0 0 260 240" className="mug" role="img" aria-label="White enamel camp mug with a Spruce rim and the Pine Hook mark">
        <defs><linearGradient id="mug-g" x1="0" x2="1"><stop offset="0" stopColor="#D9D9D2" /><stop offset=".22" stopColor="#FFFFFF" /><stop offset=".7" stopColor="#F2F2EC" /><stop offset="1" stopColor="#C7C7BF" /></linearGradient></defs>
        <ellipse cx="118" cy="222" rx="92" ry="10" fill="#000" opacity=".18" />
        <path d="M192 76c40 0 46 62 6 86" fill="none" stroke="#1F3D2E" strokeWidth="13" strokeLinecap="round" />
        <path d="M192 76c40 0 46 62 6 86" fill="none" stroke="#E9E9E3" strokeWidth="7" strokeLinecap="round" />
        <path d="M38 52h160v150c0 14-14 22-80 22s-80-8-80-22z" fill="url(#mug-g)" />
        <ellipse cx="118" cy="52" rx="80" ry="13" fill="#1F3D2E" />
        <ellipse cx="118" cy="53" rx="72" ry="9" fill="#2A3A31" />
        <path d="M38 200c0 14 14 24 80 24s80-10 80-24" fill="none" stroke="#1F3D2E" strokeWidth="5" />
        <svg x="84" y="88" width="68" height={68 * 91 / 70} viewBox={mark.vb} dangerouslySetInnerHTML={{ __html: mark.body }} />
      </svg>
      <svg viewBox="0 0 280 330" className="tote" role="img" aria-label="Canvas tote bag with the primary logo printed in Spruce">
        <defs><pattern id="tote-weave" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#E6DCC6" /><path d="M0 0h4M0 2h4" stroke="#D6CBB2" strokeWidth=".6" /></pattern></defs>
        <ellipse cx="140" cy="318" rx="118" ry="8" fill="#000" opacity=".15" />
        <path d="M78 110V60a62 62 0 0 1 124 0v50" fill="none" stroke="#CFC2A6" strokeWidth="14" />
        <path d="M30 100h220l10 214H20z" fill="url(#tote-weave)" />
        <path d="M30 100h220l10 214H20z" fill="none" stroke="#C7B999" strokeWidth="2" />
        <path d="M30 112h220" stroke="#C7B999" strokeDasharray="4 3" />
        <svg x="70" y="150" width="140" height={(140 * +tote.vb.split(' ')[3]) / +tote.vb.split(' ')[2]} viewBox={tote.vb} dangerouslySetInnerHTML={{ __html: tote.body }} />
      </svg>
    </div>
  );
}
