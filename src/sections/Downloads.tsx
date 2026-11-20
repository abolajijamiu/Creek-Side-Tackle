import { useEffect, useState } from 'react';
import { Section, SectionHead, Icon, Logo } from '../components/ui';
import { download } from '../lib/kit';

type Manifest = Record<string, { bytes: number; files?: number }>;
type FileLink = { label: string; path: string; fmt: string };
type Pack = { id: string; title: string; text: string; zip: string; icon: string; files: FileLink[] };

const L = 'brand-kit/01-Logos';
const PACKS: Pack[] = [
  {
    id: 'logos', title: 'Logos', icon: 'pine', zip: 'downloads/01-Logos.zip',
    text: 'All six lockups in five colourways. SVG masters plus transparent PNGs.',
    files: [
      { label: 'Primary logo · full colour', path: `${L}/Primary/SVG/creekside-tackle-primary-full-color.svg`, fmt: 'SVG' },
      { label: 'Primary logo · full colour', path: `${L}/Primary/PNG/creekside-tackle-primary-full-color.png`, fmt: 'PNG' },
      { label: 'Primary logo · reverse', path: `${L}/Primary/SVG/creekside-tackle-primary-reverse.svg`, fmt: 'SVG' },
      { label: 'Secondary logo · full colour', path: `${L}/Secondary-Horizontal/SVG/creekside-tackle-horizontal-full-color.svg`, fmt: 'SVG' },
      { label: 'Secondary logo · reverse', path: `${L}/Secondary-Horizontal/PNG/creekside-tackle-horizontal-reverse.png`, fmt: 'PNG' },
      { label: 'Brand symbol', path: `${L}/Brand-Symbol/SVG/creekside-tackle-symbol-full-color.svg`, fmt: 'SVG' },
      { label: 'Brand symbol', path: `${L}/Brand-Symbol/PNG/creekside-tackle-symbol-full-color.png`, fmt: 'PNG' },
      { label: 'Monochrome logo · Spruce', path: `${L}/Primary/SVG/creekside-tackle-primary-mono-spruce.svg`, fmt: 'SVG' },
      { label: 'White logo', path: `${L}/Primary/PNG/creekside-tackle-primary-mono-white.png`, fmt: 'PNG' },
      { label: 'Badge', path: `${L}/Badge/SVG/creekside-tackle-badge-full-color.svg`, fmt: 'SVG' },
    ],
  },
  {
    id: 'colour', title: 'Colour palette', icon: 'water', zip: 'downloads/02-Colour.zip',
    text: 'Swatch sheet, Adobe swatches (.ase), CSS, SCSS, JSON and a plain-text reference.',
    files: [
      { label: 'Palette sheet', path: 'brand-kit/02-Colour/creekside-tackle-palette.png', fmt: 'PNG' },
      { label: 'Palette data', path: 'brand-kit/02-Colour/creekside-tackle-palette.json', fmt: 'JSON' },
      { label: 'Palette reference', path: 'brand-kit/02-Colour/creekside-tackle-palette.txt', fmt: 'TXT' },
    ],
  },
  {
    id: 'type', title: 'Typography', icon: 'ruler', zip: 'downloads/03-Typography.zip',
    text: 'Font names, weights, Google Fonts links and a type specimen.',
    files: [
      { label: 'Type specimen', path: 'brand-kit/03-Typography/creekside-tackle-type-specimen.png', fmt: 'PNG' },
      { label: 'Font guide', path: 'brand-kit/03-Typography/fonts.txt', fmt: 'TXT' },
    ],
  },
  {
    id: 'graphics', title: 'Brand graphics', icon: 'sun', zip: 'downloads/04-Graphics.zip',
    text: '16 icons, three patterns, four landscape illustrations and seven product illustrations.',
    files: [
      { label: 'Depth Chart pattern', path: 'brand-kit/04-Graphics/Patterns/pattern-depth-chart-on-spruce.png', fmt: 'PNG' },
      { label: 'Landscape · dawn', path: 'brand-kit/04-Graphics/Illustrations/landscape-dawn.png', fmt: 'PNG' },
      { label: 'Treeline border', path: 'brand-kit/04-Graphics/Patterns/border-treeline-spruce.svg', fmt: 'SVG' },
    ],
  },
  {
    id: 'social', title: 'Social media', icon: 'chat', zip: 'downloads/05-Social-Media.zip',
    text: 'Profile image, Facebook cover, four post templates, story and email header. PNG plus editable SVG.',
    files: [
      { label: 'Profile image', path: 'brand-kit/05-Social-Media/profile-image.png', fmt: 'PNG' },
      { label: 'Facebook cover', path: 'brand-kit/05-Social-Media/facebook-cover.png', fmt: 'PNG' },
      { label: 'Instagram story', path: 'brand-kit/05-Social-Media/instagram-story.png', fmt: 'PNG' },
      { label: 'Product post template', path: 'brand-kit/05-Social-Media/Editable-SVG/instagram-product.svg', fmt: 'SVG' },
    ],
  },
  {
    id: 'print', title: 'Print', icon: 'tacklebox', zip: 'downloads/06-Print.zip',
    text: 'Print-ready business card with bleed, a 3 in die-cut sticker and a 4 × 2 in product label.',
    files: [
      { label: 'Business card · print-ready', path: 'brand-kit/06-Print/Business-Card/business-card-print-ready-with-bleed.pdf', fmt: 'PDF' },
      { label: 'Business card · front', path: 'brand-kit/06-Print/Business-Card/business-card-front.png', fmt: 'PNG' },
      { label: 'Sticker', path: 'brand-kit/06-Print/Sticker/sticker-badge-3in.svg', fmt: 'SVG' },
      { label: 'Product label', path: 'brand-kit/06-Print/Labels/product-label-4x2in.pdf', fmt: 'PDF' },
    ],
  },
  {
    id: 'guide', title: 'Guide + README', icon: 'compass', zip: 'downloads/creekside-tackle-brand-kit.zip',
    text: 'The 26-page brand guide and the kit README that explains which file to use where.',
    files: [
      { label: 'Brand guidelines', path: 'brand-kit/Creekside-Tackle-Brand-Guidelines.pdf', fmt: 'PDF' },
      { label: 'Kit README', path: 'brand-kit/README.txt', fmt: 'TXT' },
    ],
  },
  {
    id: 'web', title: 'Web', icon: 'secure', zip: 'downloads/07-Web.zip',
    text: 'Favicons, web manifest, HTML email signature and Tailwind brand tokens.',
    files: [
      { label: 'Favicon', path: 'brand-kit/07-Web/Favicon/favicon.svg', fmt: 'SVG' },
      { label: 'Email signature', path: 'brand-kit/07-Web/Email-Signature/email-signature.html', fmt: 'HTML' },
    ],
  },
];

const fmtSize = (b?: number) => (b == null ? '' : b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1e3))} KB`);
const fname = (p: string) => p.split('/').pop()!;

export function Downloads() {
  const [man, setMan] = useState<Manifest>({});
  const [status, setStatus] = useState('');
  useEffect(() => {
    fetch('downloads/manifest.json').then((r) => (r.ok ? r.json() : {})).then(setMan).catch(() => setMan({}));
  }, []);
  const get = async (path: string, name = fname(path)) => {
    setStatus(`Preparing ${name}…`);
    const r = await download(path, name);
    setStatus(r === 'saved' ? `Saved ${name}` : r === 'started' ? `Downloading ${name}` : r === 'declined' ? 'Download cancelled' : `Couldn't download ${name}. Try the full kit ZIP instead.`);
  };
  const full = man['downloads/creekside-tackle-brand-kit.zip'];
  return (
    <Section id="kit" tone="paper">
      <SectionHead num="11" eyebrow="Downloads" title="The brand kit" lede="Every file in this presentation, organised and ready to use. SVG is the master format for logos; PNGs have transparent backgrounds. Start with the full kit, or take just what you need." />

      <div className="dl-hero">
        <div className="dl-hero__art"><Logo k="badge" scheme="reverse" /></div>
        <div className="dl-hero__body">
          <h3>Complete brand kit</h3>
          <p>Logos, colour, typography, graphics, social templates, print files, web assets and the 26-page brand guide in one ZIP, with a README that explains which file to use where.</p>
          <div className="dl-hero__ctas">
            <button type="button" className="btn btn--light" onClick={() => get('downloads/creekside-tackle-brand-kit.zip')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M6 10l6 6 6-6M4 20h16" /></svg>
              Download everything {full && <span className="dl-size">· {fmtSize(full.bytes)}</span>}
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => get('brand-kit/Creekside-Tackle-Brand-Guidelines.pdf')}>Brand guide PDF {man['brand-kit/Creekside-Tackle-Brand-Guidelines.pdf'] && <span className="dl-size">· {fmtSize(man['brand-kit/Creekside-Tackle-Brand-Guidelines.pdf'].bytes)}</span>}</button>
          </div>
        </div>
      </div>

      <div className="packs">
        {PACKS.map((p) => (
          <article key={p.id} className="pack">
            <header className="pack__head">
              <Icon name={p.icon} size={26} />
              <div><h4>{p.title}</h4><p>{p.text}</p></div>
            </header>
            <ul className="pack__files">
              {p.files.map((f) => (
                <li key={f.path}>
                  <button type="button" onClick={() => get(f.path)}>
                    <span className="pack__fmt">{f.fmt}</span>
                    <span className="pack__label">{f.label}</span>
                    <span className="pack__size">{fmtSize(man[f.path]?.bytes)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn--primary btn--sm pack__zip" onClick={() => get(p.zip)}>
              {p.id === 'guide' ? 'Download full kit (ZIP)' : 'Download folder (ZIP)'} {man[p.zip] && p.id !== 'guide' && <span className="dl-size">· {man[p.zip].files} files · {fmtSize(man[p.zip].bytes)}</span>}
            </button>
          </article>
        ))}
      </div>

      <div className="dl-tree">
        <h4>Folder structure</h4>
        <pre>{`Creekside-Tackle-Brand-Kit/
├── README.txt
├── Creekside-Tackle-Brand-Guidelines.pdf
├── 01-Logos/
│   ├── Primary/            SVG · PNG   × 5 colourways
│   ├── Secondary-Horizontal/
│   ├── Wordmark/
│   ├── Brand-Symbol/       + 256 / 512 px avatars
│   ├── Pine-Hook-Mark/
│   └── Badge/
├── 02-Colour/              .ase .css .scss .json .txt .svg .png
├── 03-Typography/
├── 04-Graphics/            Icons · Patterns · Illustrations · Product-Illustrations
├── 05-Social-Media/        PNG + Editable-SVG
├── 06-Print/               Business-Card · Sticker · Labels
└── 07-Web/                 Favicon · Email-Signature · Brand-Tokens`}</pre>
      </div>
      <p className="dl-status" role="status" aria-live="polite">{status}</p>
    </Section>
  );
}
