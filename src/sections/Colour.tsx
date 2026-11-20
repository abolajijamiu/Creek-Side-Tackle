import { Section, SectionHead, SubHead, CopyChip, Logo } from '../components/ui';
import { brand, contrast, hexToRgb, isLight } from '../lib/kit';

type Col = { name: string; hex: string; use?: string; rec?: string };

export function Swatch({ c, big = false }: { c: Col; big?: boolean }) {
  const fg = isLight(c.hex) ? 'var(--granite)' : 'var(--birch)';
  return (
    <article className={`swatch ${big ? 'swatch--big' : ''}`}>
      <div className="swatch__chip" style={{ background: c.hex, color: fg, boxShadow: c.hex === '#FBFBF7' || c.hex === '#F2F1E9' ? 'inset 0 0 0 1px rgba(31,61,46,.14)' : undefined }}>
        <span className="swatch__name">{c.name}</span>
        <div className="swatch__codes">
          <CopyChip value={c.hex} />
          <span className="swatch__rgb">RGB {hexToRgb(c.hex).join(' · ')}</span>
        </div>
      </div>
      {c.use && (
        <div className="swatch__text">
          <p>{c.use}</p>
          {c.rec && <p className="swatch__rec">{c.rec}</p>}
        </div>
      )}
    </article>
  );
}

export const PROPORTION = [
  { name: 'Spruce', hex: '#1F3D2E', pct: 38 },
  { name: 'Birch', hex: '#F2F1E9', pct: 30 },
  { name: 'Lake', hex: '#2B6077', pct: 12 },
  { name: 'Paper', hex: '#FBFBF7', pct: 8 },
  { name: 'Granite', hex: '#24292A', pct: 6 },
  { name: 'Driftwood', hex: '#B8956A', pct: 4 },
  { name: 'Bobber', hex: '#C2412A', pct: 2 },
];

export const TEXTS = [
  { name: 'Spruce', hex: '#1F3D2E' }, { name: 'Granite', hex: '#24292A' }, { name: 'Lake', hex: '#2B6077' }, { name: 'Stone', hex: '#636A60' },
  { name: 'Bobber Red', hex: '#C2412A' }, { name: 'Birch', hex: '#F2F1E9' }, { name: 'Glacier', hex: '#A9C9CF' }, { name: 'Driftwood', hex: '#B8956A' },
];
export const BGS = [
  { name: 'Birch', hex: '#F2F1E9' }, { name: 'Paper', hex: '#FBFBF7' }, { name: 'Spruce', hex: '#1F3D2E' }, { name: 'Night', hex: '#14281E' }, { name: 'Lake', hex: '#2B6077' },
];

export function Colour() {
  const c = brand.colors;
  return (
    <Section id="colour" tone="paper">
      <SectionHead num="05" eyebrow="Colour system" title="Colours from the water's edge" lede="Spruce forest, cold lake water, birch bark and driftwood make up the everyday palette. One small, bright accent comes from the red-and-white fishing float. Select any HEX code to copy it." />

      <SubHead note="Spruce leads. Lake supports it. Together they are the brand.">Primary</SubHead>
      <div className="swatches swatches--primary">{c.primary.map((x) => <Swatch key={x.name} c={x} big />)}</div>

      <SubHead note="Supporting tones for illustration, packaging, tags and panels.">Secondary</SubHead>
      <div className="swatches swatches--3">{c.secondary.map((x) => <Swatch key={x.name} c={x} />)}</div>

      <div className="grid-2">
        <div>
          <SubHead note="Used sparingly: one accent moment per layout.">Accent</SubHead>
          <div className="swatches swatches--1">{c.accent.map((x) => <Swatch key={x.name} c={x} />)}</div>
        </div>
        <div>
          <SubHead note="Text, borders and backgrounds.">Neutrals</SubHead>
          <div className="swatches swatches--2">{c.neutral.map((x) => <Swatch key={x.name} c={x} />)}</div>
        </div>
      </div>

      <SubHead note="A typical layout, by area. Spruce and Birch carry the identity; the accent is a small flag.">Balance</SubHead>
      <div className="proportion" role="img" aria-label={PROPORTION.map((p) => `${p.name} ${p.pct}%`).join(', ')}>
        {PROPORTION.map((p) => (
          <div key={p.name} style={{ flexGrow: p.pct, background: p.hex, color: isLight(p.hex) ? 'var(--granite)' : 'var(--birch)' }}>
            {p.pct >= 4 && <><strong>{p.name}</strong><span>{p.pct}%</span></>}
          </div>
        ))}
      </div>

      <SubHead note="Approved grounds for layouts. The logo colourway switches automatically with the background.">Backgrounds</SubHead>
      <div className="grounds">
        {[...c.lightBackgrounds, ...c.darkBackgrounds].map((b) => {
          const light = isLight(b.hex);
          return (
            <div key={b.name + b.hex} className="ground" style={{ background: b.hex, color: light ? 'var(--granite)' : 'var(--birch)', boxShadow: b.hex === '#FBFBF7' ? 'inset 0 0 0 1px rgba(31,61,46,.14)' : undefined }}>
              <div className="ground__logo"><Logo k="horizontal" scheme={light ? 'full-color' : 'reverse'} /></div>
              <div className="ground__meta"><strong>{b.name}</strong><span>{b.hex}</span><span>{light ? 'Light ground' : 'Dark ground'}</span></div>
            </div>
          );
        })}
      </div>

      <SubHead note="Contrast ratios against WCAG 2.2. AA needs 4.5:1 for body text and 3:1 for large text (24px+, or 19px+ bold).">Accessible pairings</SubHead>
      <div className="contrast-wrap">
        <table className="contrast">
          <thead>
            <tr><th scope="col">Text ↓ / Ground →</th>{BGS.map((b) => <th key={b.name} scope="col">{b.name}</th>)}</tr>
          </thead>
          <tbody>
            {TEXTS.map((t) => (
              <tr key={t.name}>
                <th scope="row">{t.name}</th>
                {BGS.map((b) => {
                  const r = contrast(t.hex, b.hex); const grade = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'Large' : 'Avoid';
                  return (
                    <td key={b.name} style={{ background: b.hex, color: t.hex }} className={`contrast__cell contrast__cell--${grade.toLowerCase()}`}>
                      <span className="contrast__aa">Aa</span>
                      <span className="contrast__ratio" style={{ color: isLight(b.hex) ? '#24292A' : '#F2F1E9' }}>{r.toFixed(1)} · {grade}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
