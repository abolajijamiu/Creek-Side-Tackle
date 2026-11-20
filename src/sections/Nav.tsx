import { useEffect, useState } from 'react';
import { CHAPTERS } from '../lib/chapters';
import { Logo } from '../components/ui';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="nav" aria-label="Brand presentation">
      <div className="wrap nav__in">
        <a href="#top" className="nav__logo" aria-label="Creekside Tackle — back to top" onClick={() => setOpen(false)}>
          <Logo k="horizontal" scheme="reverse" />
        </a>
        <div className="nav__links">
          {CHAPTERS.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'is-active' : ''}>{c.label}</a>
          ))}
        </div>
        <a href="#kit" className="btn btn--light btn--sm nav__cta">Brand Kit</a>
        <button type="button" className="nav__menu" aria-expanded={open} aria-controls="nav-drawer" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M2 5h16M2 10h16M2 15h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div id="nav-drawer" className="wrap nav__drawer">
          {CHAPTERS.map((c) => <a key={c.id} href={`#${c.id}`} onClick={() => setOpen(false)}>{c.label}</a>)}
        </div>
      )}
    </nav>
  );
}
