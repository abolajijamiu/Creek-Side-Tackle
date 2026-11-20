import { useMemo, useState, type ReactNode, type CSSProperties } from 'react';
import { logo, uniq, type LogoKey, type Scheme } from '../lib/kit';
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
