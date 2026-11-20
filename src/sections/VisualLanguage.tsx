import { useMemo } from 'react';
import { Section, SectionHead, SubHead, Svg, Icon, Label, Logo } from '../components/ui';
import { kit, svgUrl } from '../lib/kit';
import { ICONS, contourPattern, treelineBorder } from '../../brand/graphics.mjs';
import { sceneSvg } from '../../brand/scene.mjs';
import { productSvg } from '../../brand/products.mjs';

const SHOTS = [
  { title: 'Real anglers, real water', text: 'Everyday people on creeks, docks and shorelines. Waist-up or wider, mid-action, never posed at the camera. Early morning or evening light.', scene: { mood: 'dawn', seed: 9, horizon: 0.55, sun: 0.7 } },
  { title: 'The Canadian seasons', text: 'Open-water spring, cottage summer, autumn colour and ice fishing. Season-specific imagery keeps the feed honest and timely.', scene: { mood: 'mist', seed: 3, horizon: 0.6, dock: true, angler: false, sun: 0.3 } },
  { title: 'Wide, quiet landscapes', text: 'Space for headlines. Water occupies the lower third, the treeline sits on the horizon. Calm compositions, no drama filters.', scene: { mood: 'dusk', seed: 13, horizon: 0.62, angler: false, sun: 0.75 } },
];

export function VisualLanguage() {
  const contour = useMemo(() => contourPattern({ w: 1200, h: 700, color: '#A9C9CF', stroke: 1.6 }), []);
  const tree = useMemo(() => treelineBorder({ w: 1200, h: 70, color: '#1F3D2E' }), []);
  const moods = useMemo(() => (['day', 'dawn', 'dusk', 'mist'] as const).map((m, i) => ({ m, svg: sceneSvg({ w: 800, h: 500, mood: m, seed: 5 + i * 4, dock: i % 2 === 1, horizon: 0.58 }) })), []);
  const shots = useMemo(() => SHOTS.map((s) => sceneSvg({ w: 900, h: 640, ...s.scene })), []);
  const treat = useMemo(() => sceneSvg({ w: 800, h: 560, mood: 'day', seed: 27, horizon: 0.56 }), []);

  return (
    <Section id="visual" tone="paper">
      <SectionHead num="07" eyebrow="Visual language" title="Field-guide graphics" lede="The supporting graphics come from the same outdoor kit as the logo: depth-chart contours from fishing maps, creek currents, a spruce treeline and a flat landscape style. Use them to give layouts texture without clutter." />

      <SubHead note="24px grid, 1.75px stroke, rounded caps and joins, no fills. Drawn to sit beside Barlow at text size.">Iconography</SubHead>
      <div className="icons">
        {Object.entries(ICONS).map(([k, v]) => (
          <div key={k} className="icons__item"><Icon name={k} size={34} stroke={1.6} /><span>{v.label}</span></div>
        ))}
      </div>

      <SubHead note="Three patterns, each with one job. Keep them tone-on-tone and in the background.">Patterns</SubHead>
      <div className="patterns">
        <figure className="pattern pattern--contour">
          <div className="pattern__swatch stage stage--spruce"><Svg svg={contour} fit="cover" className="absolute inset-0 opacity-40" /><Label className="pattern__label">Depth Chart</Label></div>
          <figcaption className="caption"><strong>Depth Chart</strong><span>Lake contour lines from a fishing map. Behind hero areas, packaging fields and business cards at 15–25% opacity.</span></figcaption>
        </figure>
        <figure className="pattern">
          <div className="pattern__swatch stage stage--lake" style={{ backgroundImage: svgUrl(kit.patterns.currentLight), backgroundSize: '72px 36px' }}><Label className="pattern__label">Current</Label></div>
          <figcaption className="caption"><strong>Current</strong><span>Offset creek ripples. For tissue paper, box interiors, social backgrounds and web section fills.</span></figcaption>
        </figure>
        <figure className="pattern">
          <div className="pattern__swatch stage stage--birch pattern__swatch--tree"><Svg svg={tree} className="pattern__tree" /><Label className="pattern__label" >Treeline</Label></div>
          <figcaption className="caption"><strong>Treeline</strong><span>A spruce horizon used as a footer edge, a box base or a divider between sections.</span></figcaption>
        </figure>
      </div>

      <SubHead note="Simple, repeatable parts used across print and screen.">Shapes, borders and UI elements</SubHead>
      <div className="ui-kit">
        <div className="ui-kit__group">
          <Label>Shapes</Label>
          <div className="ui-kit__shapes">
            <div className="shape-seal"><Logo k="symbol" /></div>
            <svg viewBox="0 0 160 60" className="shape-wave" aria-label="Waterline edge"><path d="M0 26 Q20 16 40 26 T80 26 T120 26 T160 26 V60 H0Z" fill="#2B6077" /></svg>
            <svg viewBox="0 0 120 70" className="shape-tag" aria-label="Hang tag"><path d="M18 2h100v66H18L2 35z" fill="#B8956A" /><circle cx="22" cy="35" r="5" fill="#FBFBF7" /></svg>
          </div>
          <p className="ui-kit__note">Circle (the seal), the waterline wave and a hang tag. Corners stay square or 4px; never pill-shaped except small chips.</p>
        </div>
        <div className="ui-kit__group">
          <Label>Borders + dividers</Label>
          <div className="ui-kit__borders">
            <div style={{ borderTop: '3px solid var(--spruce)' }}><span>3px Spruce · section rule</span></div>
            <div style={{ borderTop: '1px solid rgba(31,61,46,.18)' }}><span>1px Spruce 18% · hairline</span></div>
            <div style={{ borderTop: '2px dashed var(--driftwood)' }}><span>2px dashed Driftwood · cut / coupon</span></div>
            <div style={{ borderTop: '3px double var(--lake)' }}><span>3px double Lake · packaging band</span></div>
          </div>
        </div>
        <div className="ui-kit__group">
          <Label>Buttons, tags and chips</Label>
          <div className="ui-kit__controls">
            <span className="btn btn--primary btn--sm">Shop now</span>
            <span className="btn btn--accent btn--sm">Add to cart</span>
            <span className="btn btn--ghost btn--sm" style={{ color: 'var(--spruce)' }}>Learn more</span>
            <span className="chip chip--cat">Soft plastics</span>
            <span className="chip chip--sale">Sale</span>
            <span className="chip chip--new">New</span>
            <span className="chip chip--spec">8 LB</span>
            <span className="chip chip--spec">#6</span>
          </div>
        </div>
      </div>

      <SubHead note="Flat colour planes, one light source, no outlines. Used where photography is not available, and for seasonal campaigns.">Illustration style</SubHead>
      <div className="moods">
        {moods.map(({ m, svg }) => (
          <figure key={m} className="mood">
            <Svg svg={svg} fit="cover" className="mood__art" />
            <figcaption><Label>{m === 'day' ? 'Day · default' : m === 'dawn' ? 'Dawn · promotions' : m === 'dusk' ? 'Dusk · brand moments' : 'Mist · editorial'}</Label></figcaption>
          </figure>
        ))}
      </div>

      <SubHead note="These frames are illustrated stand-ins that show composition and mood. Replace them with real photography from Luke, customers and local creators.">Photography direction</SubHead>
      <div className="shots">
        {SHOTS.map((s, i) => (
          <figure key={s.title} className="shot">
            <Svg svg={shots[i]} fit="cover" className="shot__art" />
            <figcaption className="caption"><strong>{s.title}</strong><span>{s.text}</span></figcaption>
          </figure>
        ))}
        <figure className="shot">
          <div className="shot__art shot__art--product surface-wood">
            <div className="shot__product shadow-object"><Svg svg={productSvg('spinner')} /></div>
            <div className="shot__product shot__product--b shadow-object"><Svg svg={productSvg('bobber')} /></div>
          </div>
          <figcaption className="caption"><strong>Gear on natural surfaces</strong><span>Products on weathered wood, dock boards, stone or a tackle-box tray. Daylight, soft shadows, shot from above or at 45°.</span></figcaption>
        </figure>
      </div>
      <div className="grid-2 dodont">
        <div className="dodont__col dodont__col--do">
          <Label>Do</Label>
          <ul>
            <li>Natural, slightly warm colour with true greens and blues</li>
            <li>Real hands, real fish, real weather, including rain and cloud</li>
            <li>Catch-and-release handling: wet hands, fish kept near the water</li>
            <li>Leave calm space for a headline in the sky or the water</li>
          </ul>
        </div>
        <div className="dodont__col dodont__col--dont">
          <Label>Don't</Label>
          <ul>
            <li>Heavy HDR, teal-and-orange grading or vignettes</li>
            <li>Trophy grip-and-grin shots held at arm's length</li>
            <li>Stock imagery from oceans, tropics or saltwater species</li>
            <li>Busy product collages or cut-outs with fake drop shadows</li>
          </ul>
        </div>
      </div>

      <SubHead note="Three treatments cover every need. The same image, three jobs.">Image treatments</SubHead>
      <div className="treatments">
        <figure><div className="treat"><Svg svg={treat} fit="cover" className="treat__img" /></div><figcaption className="caption"><strong>Natural</strong><span>Default. Product pages, social posts, editorial.</span></figcaption></figure>
        <figure><div className="treat"><Svg svg={treat} fit="cover" className="treat__img" /><div className="treat__overlay treat__overlay--spruce" /><p className="treat__text">The water is open.</p></div><figcaption className="caption"><strong>Spruce wash</strong><span>Spruce at 55% over the image so text stays readable. Heroes and banners.</span></figcaption></figure>
        <figure><div className="treat"><Svg svg={treat} fit="cover" className="treat__img treat__img--mono" /><div className="treat__overlay treat__overlay--lake" /></div><figcaption className="caption"><strong>Lake duotone</strong><span>Greyscale with Lake multiplied on top. Ties mismatched photos together in a grid.</span></figcaption></figure>
      </div>

      <SubHead note="An 8px base grid keeps print and screen layouts in step.">Layout and spacing</SubHead>
      <div className="grid-2">
        <div className="spacing">
          {[4, 8, 16, 24, 32, 48, 64, 96].map((s) => (
            <div key={s} className="spacing__row"><span className="spacing__tok">{s}</span><span className="spacing__bar" style={{ width: s * 2.6 }} /></div>
          ))}
        </div>
        <ul className="principles">
          <li><strong>One idea per layout.</strong> One headline, one image, one action. Let the water and sky do the breathing.</li>
          <li><strong>Left-aligned, flush to a grid.</strong> 12 columns on web, 6 on packaging faces. Centre only the logo and badges.</li>
          <li><strong>Flat planes, not boxes.</strong> Separate content with colour fields and rules rather than drop-shadowed cards.</li>
          <li><strong>Generous margins.</strong> At least one-twelfth of the width on print. 16px minimum on phones, 40px on desktop.</li>
          <li><strong>Specs in mono.</strong> Any number an angler compares (weight, size, length) is set in IBM Plex Mono.</li>
        </ul>
      </div>
    </Section>
  );
}
