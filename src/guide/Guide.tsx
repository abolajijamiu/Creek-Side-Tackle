import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Logo, Svg, Icon, Label } from '../components/ui';
import { brand, kit, isLight, contrast, svgUrl } from '../lib/kit';
import { GUIDE_TOC } from '../lib/guideContents';
import { Construction, ClearSpace, Misuse, SUITE, MIN_SIZES } from '../sections/LogoSystem';
import { Swatch, PROPORTION } from '../sections/Colour';
import { SitePreview } from '../sections/WebsiteConcept';
import { BlisterCard, HookBox, Spool, Pouch, BusinessCards, Cap, Tees, Merch, Stickers } from '../mockups/Physical';
import { sceneSvg } from '../../brand/scene.mjs';
import { ICONS, contourPattern, treelineBorder } from '../../brand/graphics.mjs';

let pageNo = 0;

function Page({ n, title, children, tone = 'birch', bare = false }: { n?: string; title?: string; children: ReactNode; tone?: 'birch' | 'spruce' | 'paper' | 'night'; bare?: boolean }) {
  const num = useMemo(() => ++pageNo, []);
  return (
    <section className={`gpage gpage--${tone}`}>
      {!bare && (
        <header className="gpage__head">
          <span>Creekside Tackle · Brand Guidelines</span>
          {n && <span className="gpage__sec">{n} · {title}</span>}
        </header>
      )}
      <div className="gpage__body">{children}</div>
      {!bare && <footer className="gpage__foot"><span>Version 1.0 · 2026</span><span>{String(num).padStart(2, '0')}</span></footer>}
    </section>
  );
}

const H = ({ children }: { children: ReactNode }) => <h2 className="g-h">{children}</h2>;

function Scaler({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => { const cs = getComputedStyle(el); setS(Math.min(1, (el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) / 1280)); });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return <div ref={ref} className="gscale" style={{ ['--s' as string]: s }}>{children}</div>;
}

export function Guide() {
  pageNo = 0;
  const cover = useMemo(() => sceneSvg({ w: 1280, h: 300, mood: 'dusk', seed: 31, horizon: 0.5, sun: 0.8 }), []);
  const contour = useMemo(() => contourPattern({ w: 1280, h: 720, color: '#A9C9CF', stroke: 1.4 }), []);
  const tree = useMemo(() => treelineBorder({ w: 1280, h: 60, color: '#14281E' }), []);
  const shots = useMemo(() => [
    sceneSvg({ w: 600, h: 700, mood: 'dawn', seed: 9, horizon: 0.55 }),
    sceneSvg({ w: 600, h: 700, mood: 'mist', seed: 3, dock: true, angler: false, sun: 0.3 }),
    sceneSvg({ w: 600, h: 700, mood: 'dusk', seed: 13, angler: false }),
  ], []);
  const t = brand.type;
  return (
    <Scaler>
      {/* 1 — Cover */}
      <Page tone="night" bare>
        <div className="g-cover">
          <Svg svg={contour} fit="cover" className="g-cover__contour" />
          <div className="g-cover__logo"><Logo k="primary" scheme="reverse" /></div>
          <div className="g-cover__title"><span>Brand Guidelines</span><span>Version 1.0 · November 2026</span></div>
          <Svg svg={cover} fit="cover" className="g-cover__scene" />
        </div>
      </Page>

      {/* 2 — Contents */}
      <Page title="Contents">
        <div className="g-two">
          <div><H>Contents</H><p className="g-lede">This guide sets out how the Creekside Tackle identity looks, sounds and behaves. Share it with anyone who designs, prints, embroiders, builds or writes for the brand.</p></div>
          <ol className="g-toc">{GUIDE_TOC.map((s) => <li key={s.n}><span>{s.n}</span><strong>{s.title}</strong><em>{s.page}</em></li>)}</ol>
        </div>
      </Page>

      {/* 3 — 01 Introduction */}
      <Page n="01" title="Brand introduction">
        <div className="g-two">
          <div>
            <H>A tackle shop for everyday anglers</H>
            <p className="g-lede">Creekside Tackle is a Canadian online tackle shop for beginners, families and regular anglers who want dependable gear at fair prices. The identity was designed to answer one sentence from the owner:</p>
            <blockquote className="g-quote">“{brand.brief}”</blockquote>
          </div>
          <div className="g-stack">
            <Label>How to use this guide</Label>
            <ul className="g-list">
              <li><strong>Strategy (01–09)</strong> explains what the brand stands for and how it speaks.</li>
              <li><strong>Identity (10–20)</strong> covers the logo, colour, type, graphics, photography and icons.</li>
              <li><strong>Application (21–24)</strong> shows the system on social media, the website, packaging and merchandise.</li>
              <li><strong>Files</strong> referenced here are in the Creekside Tackle Brand Kit. Always use the supplied artwork.</li>
            </ul>
          </div>
        </div>
      </Page>

      {/* 4 — 02 Story */}
      <Page n="02" title="Brand story" tone="spruce">
        <div className="g-two g-two--story">
          <H>Where most anglers start</H>
          <div className="g-story">{brand.story.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
      </Page>

      {/* 5 — 03 04 05 */}
      <Page n="03–05" title="Essence · Mission · Vision">
        <div className="g-essence">
          <Label>03 · Brand essence</Label>
          <p className="g-essence__line">{brand.essence}</p>
        </div>
        <div className="g-two g-two--mv">
          <div><Label>04 · Mission</Label><p className="g-big">{brand.mission}</p></div>
          <div><Label>05 · Vision</Label><p className="g-big">{brand.vision}</p></div>
        </div>
      </Page>

      {/* 6 — 06 Values */}
      <Page n="06" title="Values">
        <H>Five values</H>
        <div className="g-values">{brand.values.map((v, i) => <div key={v.name}><Icon name={['tacklebox', 'hook', 'chat', 'canoe', 'water'][i]} size={30} /><h4>{v.name}</h4><p>{v.text}</p></div>)}</div>
      </Page>

      {/* 7 — 07 Personality */}
      <Page n="07" title="Brand personality">
        <div className="g-two">
          <div>
            <H>The friendly regular at the boat launch</H>
            <p className="g-lede">{brand.personality.summary}</p>
            <div className="traits" style={{ marginTop: 28 }}>{brand.personality.traits.map((x) => <span key={x} className="trait">{x}</span>)}</div>
          </div>
          <div>
            <table className="isnot"><thead><tr><th>We are</th><th>We are not</th></tr></thead><tbody>{brand.personality.isNot.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody></table>
            <div className="g-voice">
              <Label>Voice in practice</Label>
              <p><span className="g-yes">Say</span> “A good first lure for trout. Cast upstream and reel just fast enough to spin the blade.”</p>
              <p><span className="g-no">Not</span> “The ultimate pro-grade trout-slaying weapon!”</p>
            </div>
          </div>
        </div>
      </Page>

      {/* 8 — 08 Positioning */}
      <Page n="08" title="Positioning">
        <H>Focused, clear and Canadian</H>
        <p className="g-position">{brand.positioning.statement}</p>
        <div className="g-three">{brand.positioning.pillars.map((p) => <div key={p.title} className="pillar"><h4>{p.title}</h4><p>{p.text}</p></div>)}</div>
      </Page>

      {/* 9 — 09 Tagline */}
      <Page n="09" title="Tagline" tone="spruce">
        <div className="g-tagline">
          <Label>Selected tagline</Label>
          <p className="g-tagline__line">Honest Gear.<br /><span>Local Water.</span></p>
          <p className="g-tagline__why">{brand.taglineRationale}</p>
          <div className="g-tagline__alts"><Label>Also explored</Label>{brand.taglines.filter((x) => !x.selected).map((x) => <span key={x.line}>{x.line}</span>)}</div>
        </div>
      </Page>

      {/* 10 — 10 Logo system */}
      <Page n="10" title="Logo system">
        <div className="g-two g-two--logo">
          <div className="stage stage--night g-construct"><Construction /></div>
          <div>
            <H>The Pine Hook</H>
            <p className="g-lede">A spruce whose trunk becomes the shank of a fish hook, with the bend dipping below a creek's waterline, set in a round seal. Forest, fishing and water in one mark.</p>
            <ul className="g-list" style={{ marginTop: 20 }}>
              <li><strong>Spruce:</strong> the Canadian woods. Three straight-cut tiers.</li>
              <li><strong>Hook:</strong> concentric R11 and R5.5 bend with a small barb.</li>
              <li><strong>Creek:</strong> a three-wave waterline across the seal.</li>
              <li><strong>Seal:</strong> a trail marker or maker's stamp. Signals trust.</li>
            </ul>
          </div>
        </div>
      </Page>

      {/* 11 — 11 Variations */}
      <Page n="11" title="Logo variations">
        <H>Six lockups, one geometry</H>
        <div className="g-suite">{SUITE.map((s) => <div key={s.k}><div className={`stage stage--${s.tone} g-suite__stage`}><div className={`g-suite__art g-suite__art--${s.k}`}><Logo k={s.k} /></div></div><strong>{s.name}</strong><span>{s.use}</span></div>)}</div>
      </Page>

      {/* 12 — 11 Colourways */}
      <Page n="11" title="Logo variations · colourways">
        <H>Five colourways</H>
        <div className="g-ways">
          {([['full-color', '#F2F1E9', 'Full colour'], ['reverse', '#1F3D2E', 'Reverse'], ['mono-spruce', '#FBFBF7', 'Mono Spruce'], ['mono-black', '#FFFFFF', 'Mono Black'], ['mono-white', '#14281E', 'Mono White']] as const).map(([sc, bg, name]) => (
            <div key={sc} className="g-way" style={{ background: bg, color: isLight(bg) ? '#24292A' : '#F2F1E9', boxShadow: 'inset 0 0 0 1px rgba(31,61,46,.12)' }}>
              <div className="g-way__p"><Logo k="primary" scheme={sc} /></div>
              <div className="g-way__s"><Logo k="symbol" scheme={sc} /></div>
              <strong>{name}</strong>
            </div>
          ))}
        </div>
      </Page>

      {/* 13 — 12 Usage */}
      <Page n="12" title="Logo usage">
        <H>Which logo, where</H>
        <table className="g-table">
          <thead><tr><th>Use</th><th>Lockup</th><th>Colourway</th></tr></thead>
          <tbody>
            {[['Website header, email, invoices', 'Secondary (horizontal)', 'Full colour / Reverse'], ['Packaging fronts, signage, guide covers', 'Primary (stacked)', 'Full colour / Reverse'], ['Social avatar, favicon, app icon', 'Brand Symbol', 'Full colour'], ['Hats, stickers, event merchandise', 'Badge', 'Full colour / Mono'], ['Embroidery, engraving, emboss', 'Pine Hook Mark', 'Mono (one thread or tool)'], ['Rod labels, receipts, narrow banners', 'Wordmark', 'Mono Spruce / Mono White'], ['One-colour print, kraft, newsprint', 'Any lockup', 'Mono Spruce / Mono Black']].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
          </tbody>
        </table>
        <p className="g-note">On photography, place the logo over calm areas such as sky or water. If the area is busy, use a Spruce wash behind it or a solid Spruce panel.</p>
      </Page>

      {/* 14 — 13 + 14 */}
      <Page n="13–14" title="Clear space · Minimum size">
        <div className="g-two">
          <div><H>Clear space</H><p className="g-lede" style={{ marginBottom: 20 }}>X equals one quarter of the seal's diameter. Keep X clear on every side.</p><div className="stage stage--paper" style={{ padding: 24 }}><ClearSpace /></div></div>
          <div><H>Minimum size</H><div className="minsize" style={{ marginTop: 20 }}>{MIN_SIZES.map((m) => <div key={m.k} className="minsize__row"><div className="minsize__art" style={{ width: m.px }}><Logo k={m.k} /></div><div><strong>{m.name}</strong><span>{m.print} · {m.px}px</span></div></div>)}</div></div>
        </div>
      </Page>

      {/* 15 — 15 Incorrect */}
      <Page n="15" title="Incorrect logo usage">
        <H>Please don't</H>
        <div className="g-misuse"><Misuse /></div>
      </Page>

      {/* 16 — 16 Colour */}
      <Page n="16" title="Colour system">
        <H>Colour palette</H>
        <div className="g-swatches">
          {[...brand.colors.primary, ...brand.colors.secondary, ...brand.colors.accent, ...brand.colors.neutral].map((c) => <Swatch key={c.name} c={{ name: c.name, hex: c.hex }} />)}
        </div>
      </Page>

      {/* 17 — 16 Colour use */}
      <Page n="16" title="Colour system · use">
        <div className="g-two">
          <div>
            <H>Balance and grounds</H>
            <div className="proportion" style={{ marginTop: 20 }}>{PROPORTION.map((p) => <div key={p.name} style={{ flexGrow: p.pct, background: p.hex, color: isLight(p.hex) ? '#24292A' : '#F2F1E9' }}>{p.pct >= 6 && <><strong>{p.name}</strong><span>{p.pct}%</span></>}</div>)}</div>
            <ul className="g-list" style={{ marginTop: 22 }}>
              {[...brand.colors.primary, ...brand.colors.secondary, ...brand.colors.accent].map((c) => <li key={c.name}><strong>{c.name} {c.hex}:</strong> {c.rec}</li>)}
            </ul>
          </div>
          <div>
            <Label>Approved text pairings (WCAG AA)</Label>
            <div className="g-pairs">
              {[['#1F3D2E', '#F2F1E9'], ['#24292A', '#FBFBF7'], ['#2B6077', '#F2F1E9'], ['#F2F1E9', '#1F3D2E'], ['#A9C9CF', '#14281E'], ['#F2F1E9', '#2B6077'], ['#FFFFFF', '#C2412A'], ['#B8956A', '#14281E']].map(([f, b]) => (
                <div key={f + b} style={{ background: b, color: f }}><span>Aa</span><em>{contrast(f, b).toFixed(1)}:1</em></div>
              ))}
            </div>
          </div>
        </div>
      </Page>

      {/* 18 — 17 Type */}
      <Page n="17" title="Typography">
        <div className="g-type">
          {[t.primary, t.secondary, t.accent].map((f, i) => (
            <div key={f.family} className={`g-type__col g-type__col--${i}`}>
              <Label>{['Primary · Headlines', 'Secondary · Body', 'Accent · Specs'][i]}</Label>
              <p className="g-type__glyph">{i === 2 ? '8 LB' : 'Aa'}</p>
              <strong>{f.family}</strong>
              <span className="g-type__w">{f.weights.join(' · ')}</span>
              <p>{f.role}</p>
            </div>
          ))}
        </div>
        <div className="g-hier">
          <p className="ts-h1">Opening weekend starts here</p>
          <p className="ts-sub">Spinners, floats and fresh line, ready for the first cast.</p>
          <p className="ts-spec">8 LB · 300 YD · CLEAR</p>
        </div>
      </Page>

      {/* 19 — 18 Graphics */}
      <Page n="18" title="Graphic elements">
        <H>Patterns, shapes and illustration</H>
        <div className="g-graphics">
          <div className="stage stage--spruce g-graphics__a"><Svg svg={contour} fit="cover" className="absolute inset-0 opacity-40" /><Label className="pattern__label">Depth Chart</Label></div>
          <div className="stage stage--lake g-graphics__b" style={{ backgroundImage: svgUrl(kit.patterns.currentLight), backgroundSize: '64px 32px' }}><Label className="pattern__label">Current</Label></div>
          <div className="stage stage--birch g-graphics__c"><Svg svg={treelineBorder({ w: 600, h: 60, color: '#1F3D2E' })} className="g-tree" /><Label className="pattern__label" >Treeline</Label></div>
          <div className="g-graphics__d"><Svg svg={sceneSvg({ w: 800, h: 400, mood: 'day', seed: 5 })} fit="cover" className="absolute inset-0" /></div>
        </div>
        <p className="g-note">Patterns sit tone-on-tone at 15–40% opacity. Illustrations use flat colour planes only, never gradients or outlines. Shapes: the circle seal, the waterline wave, square or 4px corners.</p>
      </Page>

      {/* 20 — 19 Photography */}
      <Page n="19" title="Photography direction">
        <div className="g-photo">
          {shots.map((s, i) => <figure key={i}><Svg svg={s} fit="cover" className="g-photo__img" /><figcaption>{['Real anglers, real water', 'The Canadian seasons', 'Wide, quiet landscapes'][i]}</figcaption></figure>)}
          <div className="g-photo__rules">
            <H>Real water, real people</H>
            <Label>Do</Label>
            <ul className="g-list"><li>Natural colour, true greens and blues</li><li>Everyday anglers mid-action</li><li>Catch-and-release handling</li><li>Calm space for headlines</li></ul>
            <Label>Don't</Label>
            <ul className="g-list"><li>HDR, heavy grading, vignettes</li><li>Trophy grip-and-grin poses</li><li>Ocean or tropical stock imagery</li></ul>
            <p className="g-note">Frames shown are illustrated stand-ins for composition and mood.</p>
          </div>
        </div>
      </Page>

      {/* 21 — 20 Icons */}
      <Page n="20" title="Iconography">
        <div className="g-two">
          <div><H>Line icons</H><p className="g-lede">24px grid. 1.75px stroke. Rounded caps and joins. No fills, no second colour. Icons sit in Spruce on light grounds and Birch on dark grounds, at 20–32px beside text.</p></div>
          <div className="g-icons">{Object.entries(ICONS).map(([k, v]) => <div key={k}><Icon name={k} size={36} stroke={1.6} /><span>{(v as { label: string }).label}</span></div>)}</div>
        </div>
      </Page>

      {/* 22 — 21 Social */}
      <Page n="21" title="Social media style">
        <div className="g-social">
          {['instagram-promo', 'instagram-product', 'instagram-educational', 'instagram-story'].map((k) => <Svg key={k} svg={kit.social[k].svg} className="g-social__tile" />)}
          <div className="g-social__rules">
            <H>One idea per tile</H>
            <ul className="g-list"><li>Headline in Barlow Condensed, max. 6 words</li><li>Spruce, Lake or Birch grounds; one accent flag at most</li><li>Logo or symbol in the bottom band or top corner</li><li>Mix product, education and landscape tiles in the grid</li><li>Stories: keep the top 250px and bottom 340px clear</li></ul>
          </div>
        </div>
      </Page>

      {/* 23 — 22 Website */}
      <Page n="22" title="Website visual direction">
        <div className="g-web">
          <div className="g-web__frame"><div className="g-web__inner"><SitePreview /></div></div>
          <div className="g-web__rules">
            <H>Storefront</H>
            <ul className="g-list"><li>Secondary logo in the header, 40px tall</li><li>Hero with a Spruce wash and a single headline</li><li>Four trust promises under the hero</li><li>Product cards on flat Mist or Birch, specs in mono</li><li>Accent (Bobber Red) for Add to cart only</li><li>Treeline edge on the footer</li></ul>
          </div>
        </div>
      </Page>

      {/* 24 — 23 Packaging */}
      <Page n="23" title="Packaging direction">
        <div className="g-pack">
          <div className="g-pack__items">
            <div className="stage stage--mist"><BlisterCard /></div>
            <div className="stage stage--paper"><HookBox /></div>
            <div className="stage surface-wood"><Spool /></div>
            <div className="stage stage--mist"><Pouch /></div>
          </div>
          <ul className="g-list g-pack__rules"><li><strong>Top:</strong> Spruce field with the logo and Depth Chart pattern</li><li><strong>Middle:</strong> clear window or product illustration</li><li><strong>Name:</strong> Barlow Condensed Bold, uppercase</li><li><strong>Specs:</strong> IBM Plex Mono in outlined chips</li><li><strong>Base:</strong> Treeline border; kraft stock where possible</li></ul>
        </div>
      </Page>

      {/* 25 — 24 Applications */}
      <Page n="24" title="Brand applications">
        <div className="g-apps">
          <div className="g-apps__bc"><BusinessCards /></div>
          <div className="stage stage--birch"><Cap /></div>
          <div className="stage" style={{ position: 'relative', minHeight: 200 }}><Stickers /></div>
          <div className="stage stage--mist g-apps__wide"><Tees /></div>
          <div className="stage stage--kraft g-apps__wide2"><Merch /></div>
        </div>
      </Page>

      {/* 26 — Back cover */}
      <Page tone="spruce" bare>
        <div className="g-back">
          <div className="g-back__badge"><Logo k="badge" scheme="reverse" /></div>
          <p className="g-back__tag">Honest Gear. Local Water.</p>
          <p className="g-back__meta">creeksidetackle.ca · Brand Guidelines v1.0 · 2026</p>
          <Svg svg={tree} className="g-back__tree" />
        </div>
      </Page>
    </Scaler>
  );
}
