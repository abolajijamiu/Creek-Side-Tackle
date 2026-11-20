import { useEffect, useMemo, useState, type ReactNode, type CSSProperties } from 'react';
import { logo, uniq, downloadPageAsHtml, type LogoKey, type Scheme } from '../lib/kit';
import { ICONS } from '../../brand/graphics.mjs';

/** Render an SVG string responsively. */
export function Svg({ svg, className = '', style, label, fit = 'width' }: { svg: string; className?: string; style?: CSSProperties; label?: string; fit?: 'width' | 'cover' | 'contain' }) {
  const html = useMemo(() => uniq(svg), [svg]);
  return <div className={`svgbox svgbox--${fit} ${className}`} style={style} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Logo({ k, scheme = 'full-color', className = '', label }: { k: LogoKey; scheme?: Scheme; className?: string; label?: string }) {
  return <Svg svg={logo(k, scheme)} className={className} label={label ?? 'Creekside Tackle logo'} />;
}

export function Icon({ name, size = 24, className = '', stroke = 1.75 }: { name: string; size?: number; className?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: (ICONS as Record<string, { d: string }>)[name].d }} />
  );
}

export function Section({ id, children, tone = 'birch', className = '' }: { id: string; children: ReactNode; tone?: 'birch' | 'paper' | 'spruce' | 'night' | 'mist' | 'lake'; className?: string }) {
  return (
    <section id={id} className={`sec sec--${tone} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({ num, eyebrow, title, lede, dark = false }: { num: string; eyebrow: string; title: ReactNode; lede?: ReactNode; dark?: boolean }) {
  return (
    <header className={`sec-head ${dark ? 'is-dark' : ''}`}>
      <div className="sec-head__meta">
        <span className="sec-head__num">{num}</span>
        <span className="sec-head__eyebrow">{eyebrow}</span>
      </div>
      <h2 className="sec-head__title">{title}</h2>
      {lede && <p className="sec-head__lede">{lede}</p>}
    </header>
  );
}

export function SubHead({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="subhead">
      <h3>{children}</h3>
      {note && <p>{note}</p>}
    </div>
  );
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`label ${className}`}>{children}</span>;
}

export function CopyChip({ value, className = '' }: { value: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setDone(true); }
    catch { setDone(false); }
    window.setTimeout(() => setDone(false), 1400);
  };
  return (
    <button type="button" className={`copychip ${className}`} onClick={copy} aria-label={`Copy ${value}`}>
      <span>{value}</span>
      <span className="copychip__state">{done ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

export function Segmented<T extends string>({ value, options, onChange, label, dark = false }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label: string; dark?: boolean }) {
  return (
    <div className={`seg ${dark ? 'seg--dark' : ''}`} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} className={value === o.value ? 'is-on' : ''} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Caption under a mockup or artwork. */
export function Caption({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <figcaption className="caption">
      <strong>{title}</strong>
      {children && <span>{children}</span>}
    </figcaption>
  );
}

/* ── Status toast + "Download as HTML" ─────────────────────────── */
export function notify(msg: string) { window.dispatchEvent(new CustomEvent('ct-status', { detail: msg })); }

export function Toast() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    let t = 0;
    const on = (e: Event) => { setMsg((e as CustomEvent<string>).detail); window.clearTimeout(t); t = window.setTimeout(() => setMsg(''), 4200); };
    window.addEventListener('ct-status', on);
    return () => window.removeEventListener('ct-status', on);
  }, []);
  return <p className="dl-status" role="status" aria-live="polite">{msg}</p>;
}

export function SaveHtmlButton({ className = 'btn btn--ghost', label = 'Download as HTML', onDone }: { className?: string; label?: string; onDone?: () => void }) {
  const [busy, setBusy] = useState(false);
  const run = async () => {
    setBusy(true); notify('Preparing index.html…');
    const r = await downloadPageAsHtml();
    setBusy(false); onDone?.();
    notify(r === 'saved' ? 'Saved index.html' : r === 'started' ? 'Downloading index.html (one file, works offline)' : r === 'declined' ? 'Download cancelled' : 'The single-file version is only available in the built presentation (npm run build).');
  };
  return (
    <button type="button" className={className} onClick={run} disabled={busy} aria-busy={busy}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg>
      {label}
    </button>
  );
}
