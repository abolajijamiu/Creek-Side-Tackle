import { useMemo, useState } from 'react';
import { Section, SectionHead, SubHead, Logo, Svg, Icon, Segmented, Label } from '../components/ui';
import { kit, logo, type LogoKey, type Scheme } from '../lib/kit';
import { sceneSvg } from '../../brand/scene.mjs';

export const SUITE: { k: LogoKey; name: string; use: string; tone: string }[] = [
  { k: 'primary', name: 'Primary Logo', use: 'The full stacked lockup. Packaging, signage, the brand guide cover and anywhere there is room to breathe.', tone: 'birch' },
  { k: 'horizontal', name: 'Secondary Logo', use: 'Horizontal lockup for website headers, email, invoices, business cards and wide formats.', tone: 'paper' },
  { k: 'symbol', name: 'Brand Symbol', use: 'The Pine Hook seal on its own. Social avatars, favicons, stamps, lure packaging and product tags.', tone: 'mist' },
  { k: 'badge', name: 'Badge / Emblem', use: 'Outdoor patch for hats, stickers, apparel and event merchandise. Carries the tagline.', tone: 'birch' },
  { k: 'wordmark', name: 'Wordmark', use: 'Single-line name for very narrow spaces: rod labels, receipts, mobile headers, pens.', tone: 'paper' },
  { k: 'pine-hook', name: 'Pine Hook Mark', use: 'The symbol without its seal, for one-colour embroidery, laser engraving and blind embossing.', tone: 'mist' },
];

const SCHEMES: { value: Scheme; label: string; bg: string; note: string }[] = [
  { value: 'full-color', label: 'Full colour', bg: 'var(--birch)', note: 'Default on Birch, Paper, white and light photography.' },
  { value: 'reverse', label: 'Reverse', bg: 'var(--spruce)', note: 'For Spruce, Night Spruce, Deep Lake and dark photography.' },
  { value: 'mono-spruce', label: 'Mono Spruce', bg: 'var(--paper)', note: 'One-colour print, stamps, kraft packaging and embroidery.' },
  { value: 'mono-black', label: 'Mono Black', bg: '#FFFFFF', note: 'Newsprint, fax, receipts and black-only printing.' },
  { value: 'mono-white', label: 'Mono White', bg: 'var(--night)', note: 'Screen printing, vinyl decals and engraving on dark materials.' },
];

export function Construction() {
  // Construction drawing: the symbol on its 100-unit grid with guides
  const grid = Array.from({ length: 9 }, (_, i) => (i + 1) * 10);
  return (
    <svg viewBox="-8 -8 116 116" className="construct" role="img" aria-label="Construction drawing of the Pine Hook symbol on a 100-unit grid">
      <defs><clipPath id="cons-clip"><circle cx="50" cy="50" r="48" /></clipPath></defs>
      <circle cx="50" cy="50" r="48" fill="#1F3D2E" />
      <g clipPath="url(#cons-clip)">
        <path d="M0 66 Q12.5 61 25 65 T50 65 T75 65 T100 64.5 V100 H0 Z" fill="#2B6077" />
      </g>
      <path d={kit.figure} fill="#F2F1E9" />
      <g stroke="#B8956A" strokeWidth=".25" fill="none">
        {grid.map((g) => <path key={`v${g}`} d={`M${g} -4V104`} opacity=".45" />)}
        {grid.map((g) => <path key={`h${g}`} d={`M-4 ${g}H104`} opacity=".45" />)}
        <circle cx="50" cy="50" r="48" strokeDasharray="1.2 1.2" />
        <circle cx="41.75" cy="71" r="11" strokeWidth=".45" />
        <circle cx="41.75" cy="71" r="5.5" strokeWidth=".45" />
        <path d="M50 11 L64 47 M50 11 L36 47 M36 47H64" strokeWidth=".45" />
        <path d="M-4 65H104" strokeDasharray="2 1" strokeWidth=".45" />
      </g>
      <g fill="#B8956A" fontFamily="IBM Plex Mono, monospace" fontSize="3.2">
        <text x="66" y="12">A · SPRUCE</text>
        <text x="67" y="54">B · TRUNK = SHANK</text>
        <text x="55" y="88">C · HOOK BEND, R11</text>
        <text x="2" y="62">D · WATERLINE</text>
      </g>
    </svg>
  );
}

export function ClearSpace() {
  const svg = logo('horizontal');
  const [, , W, H] = svg.match(/viewBox="([\d.\s]+)"/)![1].split(' ').map(Number);
  const X = (140 * 0.96) / 4; // a quarter of the seal diameter
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  return (
    <svg viewBox={`${-X - 10} ${-X - 10} ${W + 2 * X + 20} ${H + 2 * X + 20}`} className="w-full h-auto" role="img" aria-label="Clear space around the secondary logo equals one quarter of the seal diameter">
      <rect x={-X} y={-X} width={W + 2 * X} height={H + 2 * X} fill="rgba(43,96,119,.08)" stroke="#2B6077" strokeDasharray="6 5" strokeWidth="1.5" />
      <rect x="0" y="0" width={W} height={H} fill="none" stroke="#2B6077" strokeWidth="1" opacity=".5" />
      {[[-X, -X], [W, -X], [-X, H], [W, H]].map(([x, y], i) => (
        <g key={i}><rect x={x} y={y} width={X} height={X} fill="#2B6077" opacity=".18" /><text x={x + X / 2} y={y + X / 2 + 6} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="16" fill="#2B6077">X</text></g>
      ))}
      <g dangerouslySetInnerHTML={{ __html: inner }} />
    </svg>
  );
}

export const MIN_SIZES: { k: LogoKey; name: string; print: string; px: number }[] = [
  { k: 'primary', name: 'Primary', print: '25 mm / 1 in wide', px: 96 },
  { k: 'horizontal', name: 'Secondary', print: '32 mm / 1.25 in wide', px: 120 },
  { k: 'wordmark', name: 'Wordmark', print: '32 mm / 1.25 in wide', px: 120 },
  { k: 'badge', name: 'Badge', print: '19 mm / 0.75 in wide', px: 64 },
  { k: 'symbol', name: 'Symbol', print: '6 mm / 0.25 in wide', px: 16 },
];

export function Misuse() {
  const busy = useMemo(() => sceneSvg({ w: 600, h: 400, mood: 'day', seed: 4, angler: false, horizon: 0.55 }), []);
  const items: { title: string; node: JSX.Element; bg?: string }[] = [
    { title: 'Don’t stretch or squash', node: <div style={{ transform: 'scaleX(1.45)', width: '58%' }}><Logo k="horizontal" /></div> },
    { title: 'Don’t rotate', node: <div style={{ transform: 'rotate(-14deg)', width: '70%' }}><Logo k="horizontal" /></div> },
    { title: 'Don’t change the colours', node: <div style={{ filter: 'hue-rotate(150deg) saturate(1.6)', width: '70%' }}><Logo k="horizontal" /></div> },
    { title: 'Don’t add shadows or glows', node: <div style={{ filter: 'drop-shadow(4px 6px 3px rgba(0,0,0,.6)) drop-shadow(0 0 10px #C2412A)', width: '70%' }}><Logo k="horizontal" /></div> },
    { title: 'Don’t place on busy artwork', node: <div className="misuse__busy"><Svg svg={busy} fit="cover" className="absolute inset-0" /><div className="relative" style={{ width: '70%' }}><Logo k="horizontal" /></div></div> },
    { title: 'Don’t use low contrast', bg: 'var(--lake)', node: <div style={{ width: '70%' }}><Logo k="horizontal" /></div> },
    { title: 'Don’t rearrange the parts', node: <div className="flex items-center gap-2" style={{ width: '74%' }}><div style={{ width: '62%' }}><Logo k="wordmark" /></div><div style={{ width: '22%' }}><Logo k="symbol" /></div></div> },
    { title: 'Don’t retype the name', node: <div className="flex items-center gap-3" style={{ width: '72%' }}><div style={{ width: '24%', flex: 'none' }}><Logo k="symbol" /></div><span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(16px, 2vw, 22px)', color: '#1F3D2E', lineHeight: 1.1 }}>Creekside Tackle</span></div> },
  ];
  return (
    <div className="misuse">
      {items.map((m) => (
        <figure key={m.title} className="misuse__item">
          <div className="misuse__stage" style={{ background: m.bg ?? 'var(--paper)' }}>{m.node}</div>
          <figcaption><span className="misuse__x" aria-hidden="true">✕</span>{m.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function LogoSystem() {
  const [scheme, setScheme] = useState<Scheme>('full-color');
  const cur = SCHEMES.find((s) => s.value === scheme)!;
  return (
    <Section id="logo" tone="birch">
      <SectionHead num="04" eyebrow="Logo system" title="The Pine Hook" lede="One symbol carries the whole story. A spruce from the Canadian woods grows down into the shank of a fish hook, and the bend of the hook dips below the waterline of a creek. It is set inside a round seal, the shape of a trail marker or a maker's stamp." />

      <div className="concept">
        <div className="concept__eq" aria-label="Spruce plus hook plus creek equals the Pine Hook seal">
          <div className="concept__part"><Icon name="pine" size={56} stroke={1.5} /><span>Spruce</span></div>
          <span className="concept__op">+</span>
          <div className="concept__part"><Icon name="hook" size={56} stroke={1.5} /><span>Hook</span></div>
          <span className="concept__op">+</span>
          <div className="concept__part"><Icon name="water" size={56} stroke={1.5} /><span>Creek</span></div>
          <span className="concept__op">=</span>
          <div className="concept__part concept__part--result"><div style={{ width: 72 }}><Logo k="symbol" /></div><span>Pine Hook</span></div>
        </div>
        <div className="concept__grid">
          <div className="stage stage--night concept__drawing"><Construction /></div>
          <div className="rule-list concept__notes">
            <div><Label>A · Spruce</Label><p>Three stacked tiers. The pine is drawn with straight cuts so it stays crisp when embroidered or printed at 16 pixels.</p></div>
            <div><Label>B · Trunk becomes shank</Label><p>The trunk continues straight down into the hook. Forest and fishing read as one object, which is what makes the mark ownable.</p></div>
            <div><Label>C · Bend and barb</Label><p>The bend is built from two concentric arcs (radius 11 and 5.5). The point curves inward with a small, honest barb, so it reads as a real hook.</p></div>
            <div><Label>D · Waterline</Label><p>A gentle three-wave creek line cuts the seal. The hook sits in the water, which reads as fishing straight away.</p></div>
          </div>
        </div>
      </div>

      <SubHead note="Six lockups cover every size and surface. Each one is drawn from the same geometry.">Logo suite</SubHead>
      <div className="suite">
        {SUITE.map((s) => (
          <figure key={s.k} className={`suite__item suite__item--${s.k}`}>
            <div className={`stage stage--${s.tone} suite__stage`}>
              <div className="suite__art"><Logo k={s.k} /></div>
            </div>
            <figcaption className="caption"><strong>{s.name}</strong><span>{s.use}</span></figcaption>
          </figure>
        ))}
      </div>

      <SubHead note={cur.note}>Colourways</SubHead>
      <Segmented label="Logo colourway" value={scheme} options={SCHEMES.map(({ value, label }) => ({ value, label }))} onChange={setScheme} />
      <div className="variants" style={{ background: cur.bg }}>
        {(['primary', 'horizontal', 'symbol', 'badge', 'wordmark', 'pine-hook'] as LogoKey[]).map((k) => (
          <div key={k} className={`variants__cell variants__cell--${k}`}>
            <Logo k={k} scheme={k === 'badge' && (scheme === 'mono-black') ? 'mono-black' : scheme} />
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 'clamp(56px, 7vw, 88px)' }}>
        <div>
          <SubHead note="Keep this space free of text, images and other logos. X equals one quarter of the seal's diameter.">Clear space</SubHead>
          <div className="stage stage--paper" style={{ padding: 'clamp(16px, 3vw, 32px)' }}><ClearSpace /></div>
        </div>
        <div>
          <SubHead note="Below these sizes, details fill in. Use the Brand Symbol alone when space is tighter.">Minimum size</SubHead>
          <div className="minsize">
            {MIN_SIZES.map((m) => (
              <div key={m.k} className="minsize__row">
                <div className="minsize__art" style={{ width: m.px }}><Logo k={m.k} /></div>
                <div><strong>{m.name}</strong><span>{m.print} · {m.px}px on screen</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SubHead note="The logo is artwork, not a font. Always use the supplied files.">Incorrect use</SubHead>
      <Misuse />
    </Section>
  );
}
