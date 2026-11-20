import { useState } from 'react';
import { Section, SectionHead, Logo, Label } from '../components/ui';
import { GUIDE_TOC } from '../lib/guideContents';
import { download } from '../lib/kit';

const RULES = [
  { t: 'Use the supplied artwork', d: 'Never redraw, retype or rearrange the logo. Every lockup and colourway is in the kit.' },
  { t: 'Match logo to ground', d: 'Full colour on light grounds, reverse on dark grounds, single colour for one-colour print.' },
  { t: 'Lead with Spruce', d: 'Spruce and Birch carry most layouts. Lake supports. Bobber Red appears once, if at all.' },
  { t: 'Headlines in Barlow Condensed', d: 'Uppercase with slight tracking. Body text in Barlow. Specs in IBM Plex Mono only.' },
  { t: 'Speak like a regular', d: 'Short sentences, plain words, real advice. No hype, no unprovable claims.' },
  { t: 'Show real water', d: 'Canadian freshwater, real anglers, real weather. No oceans, no trophy poses.' },
];

export function Guidelines() {
  const [msg, setMsg] = useState('');
  const getPdf = async () => {
    setMsg('Preparing…');
    const r = await download('brand-kit/Creekside-Tackle-Brand-Guidelines.pdf', 'Creekside-Tackle-Brand-Guidelines.pdf');
    setMsg(r === 'saved' ? 'Saved' : r === 'started' ? 'Download started' : r === 'declined' ? 'Download cancelled' : 'Download unavailable here. Use the Downloads chapter.');
  };
  return (
    <Section id="guidelines" tone="spruce">
      <SectionHead dark num="10" eyebrow="Brand guidelines" title="The rulebook, in 26 pages" lede="Everything in this presentation is collected into a printable brand guide that Luke can share with printers, web developers, embroiderers and anyone else who touches the brand." />
      <div className="guide-promo">
        <div className="guide-cover">
          <div className="guide-cover__logo"><Logo k="primary" scheme="reverse" /></div>
          <div className="guide-cover__meta"><span>Brand Guidelines</span><span>Version 1.0 · 2026</span></div>
        </div>
        <div className="guide-promo__body">
          <ol className="toc">
            {GUIDE_TOC.map((s) => (
              <li key={s.n}><span className="toc__n">{s.n}</span><span className="toc__t">{s.title}</span><span className="toc__p">p.{s.page}</span></li>
            ))}
          </ol>
          <div className="guide-promo__ctas">
            <button type="button" className="btn btn--light" onClick={getPdf}>Download PDF guide</button>
            <a className="btn btn--ghost" href="guide.html" target="_blank" rel="noopener">View guide online</a>
            <span className="guide-promo__msg" role="status">{msg}</span>
          </div>
        </div>
      </div>
      <div className="golden">
        <Label>Six rules that matter most</Label>
        <div className="golden__grid">
          {RULES.map((r) => <div key={r.t} className="golden__rule"><strong>{r.t}</strong><p>{r.d}</p></div>)}
        </div>
      </div>
    </Section>
  );
}
