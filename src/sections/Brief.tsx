import { Section, SectionHead, Icon } from '../components/ui';
import { brand } from '../lib/kit';

const ANSWERS = [
  { word: 'Clean', icon: 'water', answer: 'Flat colour, simple geometry and generous space. No gradients, bevels or effects in the identity itself, so it prints well on anything from a hook pack to a hat.' },
  { word: 'Professional', icon: 'ruler', answer: 'A complete, systemised logo suite drawn on one grid, with fixed colours, a type hierarchy and usage rules. Every touchpoint looks like it came from the same shop.' },
  { word: 'Outdoor & Canadian', icon: 'pine', answer: 'A spruce, a creek and a fish hook combined in one symbol. The palette is taken from boreal forest, cold lakes, birch bark and driftwood.' },
  { word: 'Trustworthy & Established', icon: 'secure', answer: 'A seal-style symbol and condensed lettering that recall park trail signs and stamped tackle-box lids. The look is steady and confident without being old-fashioned.' },
  { word: 'Approachable', icon: 'chat', answer: 'Warm neutrals, friendly language and illustrations of everyday anglers rather than pros. The brand speaks the way a helpful regular at the boat launch does.' },
  { word: 'Affordable', icon: 'tacklebox', answer: 'No luxury cues: no black-and-gold, foil or script. The look is practical and honest, the kind of shop where a snagged lure is a shrug, not a setback.' },
];

export function Brief() {
  return (
    <Section id="brief" tone="birch">
      <SectionHead num="01" eyebrow="The brief" title="Built on Luke's own words" lede="Every decision in this identity traces back to one sentence from the client. Here is that sentence, and how each part of it was answered." />
      <figure className="brief-quote">
        <svg className="brief-quote__mark" viewBox="0 0 48 40" aria-hidden="true"><path d="M0 40V22C0 9 7 2 20 0l2 6C14 8 11 13 11 20h9v20zm26 0V22C26 9 33 2 46 0l2 6c-8 2-11 7-11 14h9v20z" fill="currentColor" /></svg>
        <blockquote>{brand.brief}</blockquote>
        <figcaption><span className="label">Luke · Creekside Tackle</span></figcaption>
      </figure>
      <div className="answers">
        {ANSWERS.map((a) => (
          <article key={a.word} className="answer">
            <Icon name={a.icon} size={30} className="answer__icon" />
            <h3>{a.word}</h3>
            <p>{a.answer}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
