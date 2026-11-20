import { useMemo } from 'react';
import { Logo, Svg } from '../components/ui';
import { sceneSvg } from '../../brand/scene.mjs';

export function Hero() {
  const scene = useMemo(() => sceneSvg({ w: 2400, h: 640, mood: 'day', seed: 11, horizon: 0.5, sun: 0.78 }), []);
  return (
    <header className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="reveal">
          <div className="hero__eyebrow">
            <span>Brand Identity System</span>
            <span aria-hidden="true">·</span>
            <span>Version 1.0</span>
            <span aria-hidden="true">·</span>
            <span>November 2026</span>
          </div>
          <h1>Honest Gear.<em>Local Water.</em></h1>
          <p className="hero__lede">
            A clean, professional outdoor identity for Creekside Tackle. It is built from the Canadian woods, the creek and the
            fish hook, made to feel established and trustworthy while staying friendly and affordable.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--light" href="#logo">Explore the identity</a>
            <a className="btn btn--ghost" href="#kit">Download brand kit</a>
          </div>
        </div>
        <div className="hero__mark reveal" style={{ animationDelay: '.12s' }}>
          <Logo k="primary" scheme="reverse" label="Creekside Tackle primary logo" />
        </div>
      </div>
      <Svg svg={scene} fit="cover" className="hero__scene" label="Illustration: an angler casting from a bank across a lake lined with spruce trees" />
      <dl className="hero__meta">
        <div><dt>Prepared for</dt><dd>Luke · Creekside Tackle</dd></div>
        <div><dt>Market</dt><dd>Canada · Freshwater</dd></div>
        <div><dt>Deliverables</dt><dd>Identity, Guide, Kit</dd></div>
        <div><dt>Website</dt><dd>creeksidetackle.ca</dd></div>
      </dl>
    </header>
  );
}
