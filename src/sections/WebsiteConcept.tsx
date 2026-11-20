import { useMemo, useState } from 'react';
import { Section, SectionHead, Segmented, Svg, Logo, Icon } from '../components/ui';
import { sceneSvg } from '../../brand/scene.mjs';
import { productSvg, PRODUCTS } from '../../brand/products.mjs';
import { treelineBorder } from '../../brand/graphics.mjs';
import { brand } from '../lib/kit';

type Page = 'home' | 'product';
type Device = 'desktop' | 'mobile';

const NAV = ['Lures', 'Soft Plastics', 'Hooks & Terminal', 'Line', 'Storage', 'Learn'];
const CATS = [
  { name: 'Lures', icon: 'spinner' }, { name: 'Soft Plastics', icon: 'fish' }, { name: 'Hooks', icon: 'hook' },
  { name: 'Floats', icon: 'bobber' }, { name: 'Line', icon: 'spool' }, { name: 'Storage', icon: 'tacklebox' },
];
const FEATURED = ['spinner', 'grub', 'bobber', 'spool'] as const;
const CARD_BG: Record<string, string> = { spinner: '#E2EAE6', grub: '#F2F1E9', bobber: '#E2EAE6', spool: '#F2F1E9', hooks: '#E2EAE6', jig: '#F2F1E9', box: '#E2EAE6' };

function SiteHeader({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <div className="site-ann">Spring gear is in. <a onClick={() => go('home')}>Shop opener essentials →</a></div>
      <header className="site-head">
        <button type="button" className="site-head__menu" aria-label="Menu (concept)"><svg viewBox="0 0 20 20" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 5h16M2 10h16M2 15h16" /></svg></button>
        <a className="site-head__logo" onClick={() => go('home')} aria-label="Creekside Tackle home"><Logo k="horizontal" /></a>
        <nav className="site-head__nav">{NAV.map((n) => <a key={n}>{n}</a>)}</nav>
        <div className="site-head__tools">
          <span className="site-search"><svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" /></svg><span>Search tackle</span></span>
          <span className="site-cart" aria-label="Cart with 2 items"><Icon name="tacklebox" size={22} /><i>2</i></span>
        </div>
      </header>
    </>
  );
}

function ProductCard({ k, go }: { k: string; go: (p: Page) => void }) {
  const p = (PRODUCTS as Record<string, (typeof PRODUCTS)["spinner"]>)[k];
  return (
    <article className="pcard" onClick={() => go('product')}>
      <div className="pcard__img" style={{ background: CARD_BG[k] }}>
        <Svg svg={productSvg(k)} />
        {k === 'spinner' && <span className="chip chip--new pcard__flag">New</span>}
      </div>
      <span className="pcard__cat">{p.cat}</span>
      <h4 className="pcard__name">{p.name}</h4>
      <span className="pcard__spec">{p.spec}</span>
      <div className="pcard__row"><strong>${p.price}</strong><span className="pcard__add">Add</span></div>
    </article>
  );
}

function SiteFooter() {
  const tree = useMemo(() => treelineBorder({ w: 1600, h: 50, color: '#1F3D2E' }), []);
  return (
    <footer className="site-foot">
      <Svg svg={tree} className="site-foot__tree" />
      <div className="site-foot__in">
        <div className="site-foot__brand">
          <div style={{ width: 170 }}><Logo k="horizontal" scheme="reverse" /></div>
          <p>{brand.tagline} Tackle for everyday Canadian anglers.</p>
        </div>
        <div className="site-foot__cols">
          <div><strong>Shop</strong><a>Lures</a><a>Soft plastics</a><a>Hooks & terminal</a><a>Line</a></div>
          <div><strong>Learn</strong><a>Knot School</a><a>Beginner's guide</a><a>Species guides</a></div>
          <div><strong>Help</strong><a>Shipping</a><a>Returns</a><a>Contact</a></div>
        </div>
        <form className="site-foot__news" onSubmit={(e) => e.preventDefault()}>
          <strong>Fishing notes, once a month</strong>
          <div><input id="concept-email" type="email" placeholder="Email address" aria-label="Email address (concept only)" /><button type="submit" className="btn btn--light btn--sm">Join</button></div>
        </form>
      </div>
      <div className="site-foot__legal">© 2026 Creekside Tackle · creeksidetackle.ca · Prices in CAD</div>
    </footer>
  );
}

function Home({ go }: { go: (p: Page) => void }) {
  const hero = useMemo(() => sceneSvg({ w: 1600, h: 760, mood: 'dawn', seed: 19, horizon: 0.6, sun: 0.78 }), []);
  const story = useMemo(() => sceneSvg({ w: 900, h: 700, mood: 'mist', seed: 6, dock: true, horizon: 0.55, sun: 0.3 }), []);
  return (
    <>
      <section className="site-hero">
        <Svg svg={hero} fit="cover" className="site-hero__img" />
        <div className="site-hero__wash" />
        <div className="site-hero__in">
          <span className="site-eyebrow">Tackle for Canadian anglers</span>
          <h3>Good gear for the water close to home.</h3>
          <p>Dependable lures, line and terminal tackle at fair prices, with plain-language advice on every product.</p>
          <div className="site-hero__ctas"><span className="btn btn--light" onClick={() => go('product')}>Shop lures</span><span className="btn btn--ghost">New to fishing? Start here</span></div>
        </div>
      </section>
      <div className="site-trust">
        {[['tacklebox', 'Fair prices on everyday tackle'], ['chat', 'Plain-language product advice'], ['pine', 'Picked for Canadian freshwater'], ['secure', 'Secure checkout in CAD']].map(([i, t]) => (
          <div key={t}><Icon name={i} size={22} /><span>{t}</span></div>
        ))}
      </div>
      <section className="site-sec">
        <div className="site-sec__head"><h3>Shop by category</h3></div>
        <div className="site-cats">
          {CATS.map((c) => <a key={c.name} className="site-cat"><Icon name={c.icon} size={30} stroke={1.5} /><span>{c.name}</span></a>)}
        </div>
      </section>
      <section className="site-sec">
        <div className="site-sec__head"><h3>Opening weekend essentials</h3><a>View all →</a></div>
        <div className="site-products">{FEATURED.map((k) => <ProductCard key={k} k={k} go={go} />)}</div>
      </section>
      <section className="site-learn">
        <div className="site-learn__card">
          <span className="site-eyebrow">Knot School</span>
          <h3>Five knots that cover almost everything.</h3>
          <p>Short, illustrated guides to the improved clinch, Palomar, uni, surgeon's loop and double uni.</p>
          <span className="btn btn--light btn--sm">Learn the knots</span>
        </div>
        <div className="site-learn__card site-learn__card--b">
          <span className="site-eyebrow">Starter guide</span>
          <h3>Your first creek trip, start to finish.</h3>
          <p>What to pack, what to tie on and how to read the water. Written for beginners, useful for everyone.</p>
          <span className="btn btn--primary btn--sm">Read the guide</span>
        </div>
      </section>
      <section className="site-story">
        <Svg svg={story} fit="cover" className="site-story__img" />
        <div className="site-story__text">
          <span className="site-eyebrow">Our story</span>
          <h3>Most anglers learn on a creek.</h3>
          <p>{brand.story[0]}</p>
          <span className="btn btn--primary btn--sm">About Creekside</span>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

function Product() {
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const variants = [{ n: 'Gold blade', c: '#B8956A' }, { n: 'Silver blade', c: '#B9BDB8' }, { n: 'Spruce body', c: '#1F3D2E' }];
  const p = PRODUCTS.spinner;
  return (
    <>
      <div className="site-crumbs">Home / Lures / Inline spinners</div>
      <section className="pdp">
        <div className="pdp__gallery">
          <div className="pdp__main" style={{ background: '#E2EAE6' }}><Svg svg={productSvg('spinner')} /></div>
          <div className="pdp__thumbs">
            {(['spinner', 'jig', 'box'] as const).map((k, i) => <div key={k} className={`pdp__thumb ${i === 0 ? 'is-on' : ''}`} style={{ background: CARD_BG[k] }}><Svg svg={productSvg(k)} /></div>)}
          </div>
        </div>
        <div className="pdp__info">
          <span className="chip chip--cat">Lures · Inline spinners</span>
          <h3 className="pdp__title">{p.name}</h3>
          <p className="pdp__price">${p.price} <span>CAD</span></p>
          <p className="pdp__blurb">{p.blurb}</p>
          <div className="pdp__variant">
            <span className="pdp__label">Colour · {variants[variant].n}</span>
            <div className="pdp__swatches">{variants.map((v, i) => <button key={v.n} type="button" aria-label={v.n} aria-pressed={variant === i} onClick={() => setVariant(i)} style={{ background: v.c }} className={variant === i ? 'is-on' : ''} />)}</div>
          </div>
          <div className="pdp__buy">
            <div className="pdp__qty"><button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button><span>{qty}</span><button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button></div>
            <span className="btn btn--accent pdp__add">Add to cart · ${(qty * +p.price).toFixed(2)}</span>
          </div>
          <dl className="pdp__specs">
            <div><dt>Weight</dt><dd>1/8 OZ</dd></div><div><dt>Blade</dt><dd>#2 COLORADO</dd></div><div><dt>Hook</dt><dd>#10 TREBLE</dd></div><div><dt>Pack</dt><dd>3 PCS</dd></div>
          </dl>
          <div className="pdp__for">
            <div><Icon name="fish" size={22} /><span><strong>Catches</strong>Trout, smallmouth bass, perch, panfish</span></div>
            <div><Icon name="water" size={22} /><span><strong>Where</strong>Creeks, small rivers, ponds and lake edges</span></div>
            <div><Icon name="compass" size={22} /><span><strong>How</strong>Cast upstream, retrieve just fast enough to spin the blade</span></div>
          </div>
          <div className="pdp__tip"><strong>Rig it right:</strong> tie direct with an improved clinch knot and use 4–8 lb line so the spinner keeps its action.</div>
        </div>
      </section>
      <section className="site-sec">
        <div className="site-sec__head"><h3>Pairs well with</h3></div>
        <div className="site-products">{(['spool', 'bobber', 'hooks', 'box'] as const).map((k) => <ProductCard key={k} k={k} go={() => undefined} />)}</div>
      </section>
      <SiteFooter />
    </>
  );
}

export function SitePreview({ page = 'home' }: { page?: Page }) {
  return (
    <div className="site">
      <SiteHeader go={() => undefined} />
      {page === 'home' ? <Home go={() => undefined} /> : <Product />}
    </div>
  );
}

export function WebsiteConcept() {
  const [page, setPage] = useState<Page>('home');
  const [device, setDevice] = useState<Device>('desktop');
  const go = (p: Page) => { setPage(p); document.querySelector('.browser__viewport')?.scrollTo({ top: 0 }); };
  return (
    <Section id="website" tone="mist">
      <SectionHead num="09" eyebrow="Website direction" title="creeksidetackle.ca, rebranded" lede="A visual concept for the storefront. Clean product cards, clear categories, trust cues and a real brand story. It is a design reference for a Shopify theme, not a live store. Switch pages and devices below; product cards open the product page." />
      <div className="wc-controls">
        <Segmented label="Page" value={page} onChange={go} options={[{ value: 'home', label: 'Homepage' }, { value: 'product', label: 'Product page' }]} />
        <Segmented label="Device" value={device} onChange={setDevice} options={[{ value: 'desktop', label: 'Desktop' }, { value: 'mobile', label: 'Mobile' }]} />
      </div>
      <div className="browser" style={{ maxWidth: device === 'mobile' ? 400 : '100%' }}>
        <div className="browser__bar"><div className="browser__dots"><i /><i /><i /></div><div className="browser__url">creeksidetackle.ca{page === 'product' ? '/products/creek-spinner-3-pack' : ''}</div></div>
        <div className="browser__viewport">
          <div className="site">
            <SiteHeader go={go} />
            {page === 'home' ? <Home go={go} /> : <Product />}
          </div>
        </div>
      </div>
      <div className="wc-notes">
        <div><strong>Header</strong><span>Secondary logo at 40px tall, six categories plus Learn. The cart icon is the tackle box.</span></div>
        <div><strong>Hero</strong><span>Illustration or photography with a Spruce wash. One headline, two actions.</span></div>
        <div><strong>Trust</strong><span>Four plain promises the business can keep. Confirm policy wording before launch.</span></div>
        <div><strong>Product cards</strong><span>Flat Mist or Birch backgrounds, a spec line in mono and one clear price.</span></div>
      </div>
    </Section>
  );
}
