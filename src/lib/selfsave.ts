// "Download as HTML": rebuilds this page as a single self-contained index.html from the pieces
// the standalone build inlines (fonts, styles, embedded brand kit and the app script).
const PARTS = ['app-fonts', 'app-style', 'kit-meta', 'kit-pack'] as const;

export const canSaveSelf = () => typeof document !== 'undefined' && !!document.getElementById('app-script') && !!document.getElementById('kit-pack');

export function selfHtml(): string | null {
  const script = document.getElementById('app-script');
  if (!script) return null;
  const parts = PARTS.map((id) => document.getElementById(id)?.outerHTML || '').join('\n');
  const desc = 'Brand identity system for Creekside Tackle: logo, colour, typography, visual language, applications, guidelines and brand kit.';
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n` +
    `<title>Creekside Tackle Brand Identity</title>\n<meta name="description" content="${desc}">\n<meta name="theme-color" content="#1F3D2E">\n</head>\n<body>\n` +
    `${parts}\n<div id="root"></div>\n${script.outerHTML}\n</body>\n</html>\n`;
}
