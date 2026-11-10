import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

export const NAV_LINKS = [
  { href: '#manifesto', id: 'manifesto', label: 'Manifesto' },
  { href: '#exhibits', id: 'exhibits', label: 'Exhibits' },
  { href: '#timeline', id: 'timeline', label: 'Timeline' },
  { href: '#lab', id: 'lab', label: 'Future Lab' },
  { href: '#about', id: 'about', label: 'About' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="wordmark" aria-label="Museum of Tomorrow, back to top" onClick={() => setOpen(false)}>
          <span className="wordmark__mark" aria-hidden="true" />
          <span>MUSEUM OF TOMORROW</span>
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>

        <nav id="primary-navigation" aria-label="Primary" className="nav__links" data-open={open}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="nav__link"
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
