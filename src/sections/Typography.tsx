import { Section, SectionHead, SubHead, Label } from '../components/ui';
import { brand } from '../lib/kit';

const SCALE = [
  { token: 'Display', font: 'Barlow Condensed Bold', size: '72 / 0.9', case: 'Uppercase', sample: 'The water is open', cls: 'ts-display' },
  { token: 'H1', font: 'Barlow Condensed Bold', size: '48 / 1.0', case: 'Uppercase', sample: 'Lures for trout', cls: 'ts-h1' },
  { token: 'H2', font: 'Barlow Condensed SemiBold', size: '32 / 1.05', case: 'Uppercase', sample: 'Rig it weedless', cls: 'ts-h2' },
  { token: 'Subhead', font: 'Barlow SemiBold', size: '21 / 1.35', case: 'Sentence', sample: 'Everything you need for opening weekend', cls: 'ts-sub' },
  { token: 'Body', font: 'Barlow Regular', size: '17 / 1.6', case: 'Sentence', sample: 'Cast past the weed edge, let it sink for a three-count, then retrieve slowly.', cls: 'ts-body' },
  { token: 'Small', font: 'Barlow Medium', size: '14 / 1.45', case: 'Sentence', sample: 'Prices shown in Canadian dollars', cls: 'ts-small' },
  { token: 'Spec', font: 'IBM Plex Mono Medium', size: '13 / 1.4 · +0.12em', case: 'Uppercase', sample: '8 LB · 300 YD · CLEAR', cls: 'ts-spec' },
];

export function Typography() {
  const t = brand.type;
  return (
    <Section id="type" tone="birch">
      <SectionHead num="06" eyebrow="Typography" title="Stamped, sturdy, readable" lede="A condensed display face with the confidence of trail signage, a friendly body face from the same family, and a mono face reserved for the numbers anglers care about. All three are free Google Fonts, also available in Shopify." />

      <div className="faces">
        <article className="face face--primary">
          <div className="face__head"><Label>Primary · Headlines</Label><span className="face__weights">{t.primary.weights.join(' · ')}</span></div>
          <p className="face__name">{t.primary.family}</p>
          <p className="face__glyphs">Aa Bb Cc 0123</p>
          <p className="face__role">{t.primary.role}</p>
          <p className="face__why">{t.primary.why}</p>
        </article>
        <article className="face face--secondary">
          <div className="face__head"><Label>Secondary · Body</Label><span className="face__weights">{t.secondary.weights.join(' · ')}</span></div>
          <p className="face__name">{t.secondary.family}</p>
          <p className="face__glyphs">Aa Bb Cc 0123</p>
          <p className="face__role">{t.secondary.role}</p>
          <p className="face__why">{t.secondary.why}</p>
        </article>
        <article className="face face--accent">
          <div className="face__head"><Label>Accent · Specs</Label><span className="face__weights">{t.accent.weights.join(' · ')}</span></div>
          <p className="face__name">{t.accent.family}</p>
          <p className="face__glyphs">8 LB #6 1/8</p>
          <p className="face__role">{t.accent.role}</p>
          <p className="face__why">{t.accent.why}</p>
        </article>
      </div>

      <SubHead note="Sizes are for desktop web. Scale display sizes down by about 30% on phones.">Type scale</SubHead>
      <div className="scale">
        {SCALE.map((s) => (
          <div key={s.token} className="scale__row">
            <div className="scale__meta"><strong>{s.token}</strong><span>{s.font}</span><span>{s.size} · {s.case}</span></div>
            <p className={`scale__sample ${s.cls}`}>{s.sample}</p>
          </div>
        ))}
      </div>

      <SubHead note="The hierarchy applied to the things Creekside actually prints and publishes.">In use</SubHead>
      <div className="grid-3">
        <div className="panel type-demo">
          <Label>Headline + subheadline</Label>
          <h3 className="ts-h1" style={{ marginTop: 14 }}>Opening weekend starts here</h3>
          <p className="ts-sub" style={{ marginTop: 10 }}>Spinners, floats and fresh line, ready for the first cast of the season.</p>
          <p className="ts-body" style={{ marginTop: 12 }}>Everything in the starter range has been chosen for Canadian freshwater, from small creeks to big lakes, and priced for anglers who fish often.</p>
        </div>
        <div className="panel type-demo">
          <Label>Product title + labels</Label>
          <p className="ts-spec" style={{ marginTop: 14, color: 'var(--lake)' }}>Lures · Inline spinners</p>
          <h3 className="ts-h2" style={{ marginTop: 6 }}>Creek Spinner 3-Pack</h3>
          <div className="type-demo__specs">
            <span><em>Weight</em>1/8 OZ</span><span><em>Blade</em>#2</span><span><em>Target</em>Trout · Bass</span>
          </div>
          <p className="ts-h2" style={{ marginTop: 14 }}>$9.99 <small className="ts-small" style={{ color: 'var(--stone)' }}>CAD</small></p>
        </div>
        <div className="panel type-demo">
          <Label>Buttons + links</Label>
          <div className="type-demo__btns">
            <span className="btn btn--primary">Shop lures</span>
            <span className="btn btn--accent">Add to cart</span>
            <span className="btn btn--ghost" style={{ color: 'var(--spruce)' }}>Read the guide</span>
          </div>
          <p className="ts-body" style={{ marginTop: 16 }}>Inline link style: <a href="#type" className="link-demo">see the knot guide</a>.</p>
          <p className="ts-small" style={{ marginTop: 8, color: 'var(--stone)' }}>Buttons use Barlow Condensed Bold, uppercase, +0.08em tracking.</p>
        </div>
      </div>
    </Section>
  );
}
