import { useMemo } from 'react';
import { Logo, Svg, SaveHtmlButton } from '../components/ui';
import { treelineBorder } from '../../brand/graphics.mjs';
import { brand } from '../lib/kit';

export function Footer() {
  const tree = useMemo(() => treelineBorder({ w: 2400, h: 64, color: '#14281E' }), []);
  return (
    <footer className="foot">
      <Svg svg={tree} className="foot__tree" />
      <div className="foot__in">
        <div className="wrap foot__grid">
          <div className="foot__logo"><Logo k="horizontal" scheme="reverse" /></div>
          <p className="foot__tag">{brand.tagline}</p>
          <SaveHtmlButton className="btn btn--ghost btn--sm foot__html" />
          <p className="foot__meta">Creekside Tackle brand identity · Version 1.0 · November 2026<br />Prepared for Luke, Creekside Tackle · creeksidetackle.ca</p>
        </div>
      </div>
    </footer>
  );
}
