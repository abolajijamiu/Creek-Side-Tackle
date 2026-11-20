// Flat product illustrations (200×200 grid) used for concept product imagery and packaging windows.
const K = { spruce: '#1F3D2E', night: '#14281E', lake: '#2B6077', moss: '#5E7A49', glacier: '#A9C9CF', drift: '#B8956A', driftLight: '#D8C6A6', bobber: '#C2412A', granite: '#24292A', stone: '#636A60', birch: '#F2F1E9', paper: '#FBFBF7' };

const treble = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${K.granite}" stroke-width="3.2" stroke-linecap="round"><path d="M0 0v26"/><path d="M0 26a9 9 0 0 1-18 0v-8l5 4"/><path d="M0 26a9 9 0 0 0 18 0v-8l-5 4"/><circle cx="0" cy="-3" r="3.5"/></g>`;

export const PRODUCTS = {
  spinner: {
    name: 'Creek Spinner 3-Pack', cat: 'Lures', spec: '1/8 OZ · #2 BLADE', price: '9.99',
    blurb: 'Inline spinners for trout, bass and panfish. Cast, count down and retrieve steadily.',
    art: `<g transform="rotate(-18 100 100)">
      <path d="M100 18v22" stroke="${K.granite}" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="100" cy="14" rx="5" ry="6" fill="none" stroke="${K.granite}" stroke-width="3"/>
      <ellipse cx="88" cy="70" rx="17" ry="30" fill="${K.drift}" transform="rotate(16 88 70)"/>
      <ellipse cx="85" cy="66" rx="7" ry="18" fill="${K.driftLight}" transform="rotate(16 85 66)"/>
      <path d="M100 40v70" stroke="${K.granite}" stroke-width="3"/>
      <circle cx="100" cy="98" r="6" fill="${K.bobber}"/><circle cx="100" cy="110" r="6" fill="${K.bobber}"/>
      <path d="M92 116h16l-3 30h-10z" fill="${K.spruce}"/>
      ${treble(100, 150, 1)}
    </g>`,
  },
  grub: {
    name: 'Curly Tail Grubs, 20-Pack', cat: 'Soft Plastics', spec: '3 IN · MOTOR OIL', price: '6.49',
    blurb: 'Soft plastic grubs with a tail that swims at slow speeds. Rig on a jig head or weedless hook.',
    art: `<g transform="rotate(-10 100 100)">
      <path d="M38 92c0-12 10-18 22-18h44c10 0 14 8 14 18s-4 18-14 18H60c-12 0-22-6-22-18z" fill="${K.moss}"/>
      ${[56, 66, 76, 86, 96].map((x) => `<path d="M${x} 76v32" stroke="${K.spruce}" stroke-width="2.4" opacity=".55"/>`).join('')}
      <path d="M116 88c18-2 32 6 34 20s-10 26-24 24-16-16-6-20 12 6 6 8" fill="none" stroke="${K.moss}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="50" cy="88" r="2" fill="${K.spruce}"/>
    </g>`,
  },
  bobber: {
    name: 'Spring Float Kit', cat: 'Floats', spec: '1 IN · 1.25 IN · 1.5 IN', price: '7.99',
    blurb: 'Classic push-button floats in three sizes. Bright on top so you can see every bite.',
    art: `<path d="M100 14v34M100 152v34" stroke="${K.granite}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="54" fill="${K.paper}" stroke="${K.granite}" stroke-width="3"/>
      <path d="M46 100a54 54 0 0 1 108 0z" fill="${K.bobber}"/>
      <path d="M46 100h108" stroke="${K.granite}" stroke-width="3"/>
      <ellipse cx="78" cy="72" rx="10" ry="6" fill="#FFFFFF" opacity=".35" transform="rotate(-30 78 72)"/>
      <path d="M100 14h0" stroke="${K.granite}" stroke-width="10" stroke-linecap="round"/>`,
  },
  spool: {
    name: 'Creekside Mono Line', cat: 'Line', spec: '8 LB · 300 YD · CLEAR', price: '11.99',
    blurb: 'All-round monofilament with easy handling and good knot strength. A dependable first spool.',
    art: `<rect x="42" y="34" width="116" height="132" rx="10" fill="${K.spruce}"/>
      <rect x="54" y="46" width="92" height="108" fill="${K.glacier}"/>
      ${Array.from({ length: 13 }, (_, i) => `<path d="M54 ${52 + i * 8}h92" stroke="#FFFFFF" stroke-width="1.6" opacity=".55"/>`).join('')}
      <rect x="64" y="80" width="72" height="40" rx="3" fill="${K.birch}"/>
      <text x="100" y="107" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="500" font-size="17" fill="${K.spruce}">8 LB</text>
      <path d="M146 140c14 4 20 14 28 30" fill="none" stroke="${K.glacier}" stroke-width="2.4"/>`,
  },
  hooks: {
    name: 'Offset Worm Hooks, 10-Pack', cat: 'Hooks', spec: 'SIZE 2/0 · BLACK NICKEL', price: '5.49',
    blurb: 'Offset shank hooks for rigging soft plastics weedless through weeds and wood.',
    art: [0, 1, 2].map((i) => `<g transform="translate(${54 + i * 34} ${30 + i * 6})" fill="none" stroke="${i === 1 ? K.lake : K.granite}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="6" r="6"/><path d="M18 12v10l-8 6v84a18 18 0 0 1-36 0v-18l10 10"/></g>`).join(''),
  },
  jig: {
    name: 'Round Jig Heads, 8-Pack', cat: 'Terminal', spec: '1/8 OZ · SIZE 1', price: '6.99',
    blurb: 'Painted round jig heads with a strong hook. Pair with grubs or swimbaits.',
    art: `<g transform="rotate(-14 100 100)"><circle cx="70" cy="100" r="30" fill="${K.lake}"/>
      <circle cx="62" cy="92" r="7" fill="${K.birch}"/><circle cx="62" cy="92" r="3.4" fill="${K.granite}"/>
      <path d="M70 70v-18" stroke="${K.granite}" stroke-width="4"/><circle cx="70" cy="46" r="7" fill="none" stroke="${K.granite}" stroke-width="4"/>
      <path d="M98 100h66a22 22 0 0 1 0 44h-6l10 -12" fill="none" stroke="${K.granite}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M100 96l8 0" stroke="${K.lake}" stroke-width="7"/></g>`,
  },
  box: {
    name: 'Two-Tray Tackle Box', cat: 'Storage', spec: '14 IN · 2 TRAYS', price: '24.99',
    blurb: 'Cantilever box with two trays and a deep bottom bin. Fits a full season of tackle.',
    art: `<rect x="34" y="78" width="132" height="84" rx="8" fill="${K.spruce}"/>
      <rect x="34" y="64" width="132" height="28" rx="8" fill="${K.lake}"/>
      <path d="M78 64v-14a6 6 0 0 1 6-6h32a6 6 0 0 1 6 6v14" fill="none" stroke="${K.granite}" stroke-width="6"/>
      <rect x="90" y="86" width="20" height="16" rx="2" fill="${K.drift}"/>
      <rect x="64" y="118" width="72" height="26" rx="3" fill="${K.birch}"/>
      <path d="M75 131h50" stroke="${K.spruce}" stroke-width="4" stroke-linecap="round"/>`,
  },
};

export function productSvg(key, { bg = 'none', size = 200 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}">${bg !== 'none' ? `<rect width="200" height="200" fill="${bg}"/>` : ''}${PRODUCTS[key].art}</svg>`;
}
