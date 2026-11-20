import { useMemo, type ReactNode } from 'react';
import { Svg, Logo, Icon } from '../components/ui';
import { kit } from '../lib/kit';
import { sceneSvg } from '../../brand/scene.mjs';
import { productSvg, PRODUCTS } from '../../brand/products.mjs';

export function Phone({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="phone">
      <div className="phone__notch" />
      <div className="phone__screen" style={{ background: dark ? '#000' : '#fff' }}>{children}</div>
    </div>
  );
}

const IgIcons = () => (
  <div className="ig__actions" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
    <svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" /></svg>
    <svg viewBox="0 0 24 24"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" /></svg>
    <svg viewBox="0 0 24 24" className="ig__save"><path d="M6 3h12v18l-6-4-6 4z" /></svg>
  </div>
);

export function InstagramProfile() {
  const tiles = useMemo(() => [
    kit.social['instagram-product'].svg,
    kit.social['instagram-promo'].svg,
    kit.social['instagram-educational'].svg,
    sceneSvg({ w: 600, h: 750, mood: 'dawn', seed: 3, horizon: 0.6 }),
    kit.social['instagram-brand-post'].svg,
    productSvg('bobber', { bg: '#E2EAE6' }),
    productSvg('spool', { bg: '#F2F1E9' }),
    sceneSvg({ w: 600, h: 750, mood: 'mist', seed: 8, dock: true, angler: false }),
    productSvg('box', { bg: '#D8C6A6' }),
  ], []);
  return (
    <Phone>
      <div className="ig">
        <div className="ig__top"><strong>creeksidetackle</strong><span aria-hidden="true">☰</span></div>
        <div className="ig__head">
          <div className="ig__avatar"><Svg svg={kit.social['profile-image'].svg} /></div>
          <div className="ig__stats"><span><b>48</b>posts</span><span><b>1,204</b>followers</span><span><b>312</b>following</span></div>
        </div>
        <div className="ig__bio">
          <strong>Creekside Tackle</strong>
          <span className="ig__cat">Fishing store</span>
          <p>Honest gear. Local water. 🇨🇦<br />Tackle for everyday Canadian anglers.</p>
          <a>creeksidetackle.ca</a>
        </div>
        <div className="ig__btns"><span>Follow</span><span>Message</span><span>Shop</span></div>
        <div className="ig__highlights">
          {['New', 'Knots', 'Lures', 'Trips'].map((h, i) => (
            <div key={h}><span className="ig__hl"><Icon name={['spinner', 'hook', 'bobber', 'canoe'][i]} size={18} /></span>{h}</div>
          ))}
        </div>
        <div className="ig__grid">
          {tiles.map((t, i) => <Svg key={i} svg={t} fit="cover" className="ig__tile" />)}
        </div>
      </div>
    </Phone>
  );
}

export function InstagramPost() {
  return (
    <Phone>
      <div className="ig ig--feed">
        <div className="ig__top"><strong>Instagram</strong></div>
        <div className="ig__post-head"><div className="ig__mini"><Svg svg={kit.social['profile-image'].svg} /></div><strong>creeksidetackle</strong><span>Sponsored</span></div>
        <Svg svg={kit.social['instagram-product'].svg} className="ig__post-img" />
        <IgIcons />
        <div className="ig__caption"><strong>creeksidetackle</strong> New in the shop: the Creek Spinner 3-Pack. A steady retrieve does the work. Tap to shop. <span className="ig__tag">#fishingcanada #troutfishing</span></div>
      </div>
    </Phone>
  );
}

export function InstagramStory() {
  return (
    <Phone dark>
      <div className="story-screen">
        <Svg svg={kit.social['instagram-story'].svg} fit="cover" className="story-screen__img" />
        <div className="story-screen__bars"><i className="is-done" /><i className="is-on" /><i /></div>
      </div>
    </Phone>
  );
}

export function FacebookPage() {
  return (
    <div className="fb">
      <div className="fb__bar"><span className="fb__f">f</span><span className="fb__search">Search Facebook</span></div>
      <div className="fb__cover"><Svg svg={kit.social['facebook-cover'].svg} /></div>
      <div className="fb__info">
        <div className="fb__avatar"><Svg svg={kit.social['profile-image'].svg} /></div>
        <div className="fb__name"><strong>Creekside Tackle</strong><span>Fishing store · creeksidetackle.ca</span></div>
        <div className="fb__btns"><span className="fb__btn fb__btn--primary">Shop now</span><span className="fb__btn">Message</span></div>
      </div>
    </div>
  );
}

export function EmailClient() {
  const items = ['spinner', 'bobber', 'spool'] as const;
  return (
    <div className="mail">
      <div className="mail__chrome">
        <div className="mail__from"><div className="mail__av"><Logo k="symbol" /></div><div><strong>Creekside Tackle</strong><span>The water is open: spring gear is in</span></div></div>
      </div>
      <div className="mail__body">
        <Svg svg={kit.social['email-header'].svg} />
        <div className="mail__content">
          <p className="mail__eyebrow">SPRING NEWSLETTER</p>
          <h4>Ready for opening weekend</h4>
          <p>Fresh line, floats and spinners are back on the shelf. Here is what we would pack for a first trip to the creek this year.</p>
          <div className="mail__grid">
            {items.map((k) => (
              <div key={k} className="mail__item"><Svg svg={productSvg(k, { bg: '#F2F1E9' })} /><strong>{PRODUCTS[k].name}</strong><span>${PRODUCTS[k].price}</span></div>
            ))}
          </div>
          <span className="btn btn--primary btn--sm">Shop spring gear</span>
        </div>
        <div className="mail__foot"><div style={{ width: 120 }}><Logo k="wordmark" scheme="reverse" /></div><span>You're receiving this because you subscribed at creeksidetackle.ca</span></div>
      </div>
    </div>
  );
}
