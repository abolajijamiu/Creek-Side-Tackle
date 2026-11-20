import type { ReactNode } from 'react';
import { Section, SectionHead, SubHead, Svg } from '../components/ui';
import { kit } from '../lib/kit';
import { BusinessCards, BlisterCard, HookBox, Spool, Pouch, Stickers, Cap, Tees, Merch } from '../mockups/Physical';
import { InstagramProfile, InstagramPost, InstagramStory, FacebookPage, EmailClient } from '../mockups/Digital';

function Plate({ title, note, children, className = '', bg = '' }: { title: string; note: string; children: ReactNode; className?: string; bg?: string }) {
  return (
    <figure className={`plate ${className}`}>
      <div className={`plate__stage ${bg}`}>{children}</div>
      <figcaption className="caption"><strong>{title}</strong><span>{note}</span></figcaption>
    </figure>
  );
}

export function Applications() {
  return (
    <Section id="applications" tone="birch">
      <SectionHead num="08" eyebrow="Brand applications" title="On the shelf, in the boat, on the feed" lede="The identity applied to the things Creekside will actually make and use. Packaging and merchandise are concepts drawn to real proportions and ready to brief a printer." />

      <SubHead note="Lure cards, hook boxes, line spools and pouches share one system: a Spruce field on top, a clear product window, specs in mono, and a treeline at the base.">Tackle packaging</SubHead>
      <div className="plates plates--pack">
        <Plate title="Lure hang card" note="Euro-slot blister card with a product window. Depth Chart pattern in the header." className="plate--tall" bg="stage--mist">
          <BlisterCard />
        </Plate>
        <Plate title="Hook box" note="Kraft folding carton with a Spruce band and the Current pattern on the side panels." className="plate--tall" bg="stage--paper">
          <HookBox />
        </Plate>
        <Plate title="Line spool" note="Printed label disc. Product specs follow the curve in IBM Plex Mono." bg="surface-wood">
          <Spool />
        </Plate>
        <Plate title="Product label + pouch" note="4 × 2 in label on a resealable kraft pouch for soft plastics and terminal tackle." bg="stage--mist">
          <Pouch />
        </Plate>
      </div>

      <SubHead note="Print collateral and merchandise. The badge and Pine Hook mark are drawn to embroider and screen print cleanly.">Print and merchandise</SubHead>
      <div className="plates plates--merch">
        <Plate title="Business cards" note="3.5 × 2 in on uncoated 16pt stock. Spruce front with Depth Chart, Birch back." className="plate--wide">
          <BusinessCards />
        </Plate>
        <Plate title="Trucker cap" note="Spruce front panels, birch mesh, woven badge patch with merrowed edge." bg="stage--birch">
          <Cap />
        </Plate>
        <Plate title="Stickers" note="3 in die-cut badge and a bumper sticker, matte vinyl, for coolers, tackle boxes and trucks." bg="">
          <Stickers />
        </Plate>
        <Plate title="T-shirts" note="Water-based screen print. Spruce tee with the primary logo; oatmeal tee with a small chest badge." className="plate--wide" bg="stage--mist">
          <Tees />
        </Plate>
        <Plate title="Outdoor merchandise" note="White enamel camp mug with a Spruce rim, and a heavy canvas tote." className="plate--wide" bg="stage--kraft">
          <Merch />
        </Plate>
      </div>

      <SubHead note="Profile, posts and stories use the same palette, the same type and one idea per tile. Follower counts in these mockups are illustrative.">Social media</SubHead>
      <div className="plates plates--phones">
        <Plate title="Instagram profile" note="Seal avatar, consistent grid of product, education and landscape tiles." bg="stage--mist"><InstagramProfile /></Plate>
        <Plate title="Instagram post" note="Product announcement template in the feed." bg="stage--spruce"><InstagramPost /></Plate>
        <Plate title="Instagram story" note="Story template with clear safe zones top and bottom." bg="stage--lake"><InstagramStory /></Plate>
      </div>
      <div className="plates plates--social">
        <Plate title="Facebook page" note="1640 × 624 cover with the logo kept inside the mobile-safe zone." bg="stage--paper"><FacebookPage /></Plate>
        <Plate title="Email newsletter" note="1200 × 400 header, product grid and footer for Shopify Email or Klaviyo." bg="stage--mist"><EmailClient /></Plate>
      </div>

      <SubHead note="Every template ships as a ready PNG plus an editable SVG with live text in the Downloads chapter.">Social templates</SubHead>
      <div className="templates">
        {[
          ['instagram-promo', 'Promotional post'],
          ['instagram-product', 'Product announcement'],
          ['instagram-educational', 'Educational post'],
          ['instagram-brand-post', 'Brand post'],
          ['instagram-story', 'Story'],
          ['profile-image', 'Profile image'],
        ].map(([k, name]) => (
          <figure key={k} className={`template template--${k}`}>
            <Svg svg={kit.social[k].svg} className="template__art" />
            <figcaption className="caption"><strong>{name}</strong><span>{kit.social[k].w} × {kit.social[k].h}</span></figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
