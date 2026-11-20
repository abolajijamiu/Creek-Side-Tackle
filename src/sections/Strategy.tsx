import { Section, SectionHead, SubHead, Icon, Label } from '../components/ui';
import { brand } from '../lib/kit';

const VALUE_ICONS = ['tacklebox', 'hook', 'chat', 'canoe', 'water'];

export function Strategy() {
  const p = brand.positioning;
  return (
    <>
      <Section id="strategy" tone="paper">
        <SectionHead num="02" eyebrow="Brand strategy" title="What Creekside stands for" lede="The strategy is short on purpose. It gives Luke a clear filter for product choices, copy and partnerships, so the brand stays consistent as the business grows." />

        <div className="essence">
          <Label>Brand essence</Label>
          <p className="essence__line">{brand.essence}</p>
        </div>

        <div className="grid-2 mv">
          <div className="mv__item">
            <Label>Mission · why we exist</Label>
            <p>{brand.mission}</p>
          </div>
          <div className="mv__item">
            <Label>Vision · where we're headed</Label>
            <p>{brand.vision}</p>
          </div>
        </div>

        <SubHead note="Five values that decide how products are chosen, described and sold.">Values</SubHead>
        <div className="values">
          {brand.values.map((v, i) => (
            <article key={v.name} className="value">
              <Icon name={VALUE_ICONS[i]} size={28} />
              <h4>{v.name}</h4>
              <p>{v.text}</p>
            </article>
          ))}
        </div>

        <SubHead note={brand.personality.summary}>Personality</SubHead>
        <div className="grid-2">
          <div className="traits">
            {brand.personality.traits.map((t) => <span key={t} className="trait">{t}</span>)}
          </div>
          <table className="isnot">
            <thead><tr><th scope="col">We are</th><th scope="col">We are not</th></tr></thead>
            <tbody>
              {brand.personality.isNot.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}
            </tbody>
          </table>
        </div>

        <SubHead note="How Creekside should be different from the alternatives anglers already know.">Positioning</SubHead>
        <p className="positioning">{p.statement}</p>
        <div className="grid-3 pillars">
          {p.pillars.map((pl) => (
            <div key={pl.title} className="pillar">
              <h4>{pl.title}</h4>
              <p>{pl.text}</p>
            </div>
          ))}
        </div>
        <div className="landscape" role="table" aria-label="Competitive landscape">
          <div className="landscape__row landscape__row--head" role="row"><span role="columnheader">Alternative</span><span role="columnheader">The gap</span><span role="columnheader">Creekside's answer</span></div>
          {p.against.map((a, i) => (
            <div key={a.who} className="landscape__row" role="row">
              <span role="cell"><strong>{a.who}</strong></span>
              <span role="cell">{a.gap}</span>
              <span role="cell">{['A short, clear range with advice on every product page.', 'Dependable gear at prices that suit everyday fishing.', 'A named, recognisable Canadian shop with a consistent look and voice.'][i]}</span>
            </div>
          ))}
        </div>

        <SubHead note="Five directions were written and tested against the brief. One was selected.">Tagline</SubHead>
        <ol className="taglines">
          {brand.taglines.map((t) => (
            <li key={t.line} className={t.selected ? 'is-selected' : ''}>
              <span className="taglines__line">{t.line}</span>
              <span className="taglines__note">{t.note}</span>
              {t.selected && <span className="taglines__pick">Selected</span>}
            </li>
          ))}
        </ol>
        <p className="tag-why"><strong>Why it works.</strong> {brand.taglineRationale}</p>
      </Section>

      <Section id="story" tone="spruce" className="story">
        <div className="story__grid">
          <div>
            <SectionHead dark num="03" eyebrow="Brand story" title="Where most anglers start" />
          </div>
          <div className="story__body">
            {brand.story.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      </Section>
    </>
  );
}
