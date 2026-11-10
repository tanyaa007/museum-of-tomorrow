import { NAV_LINKS } from './Navbar';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <a href="#top" className="wordmark" aria-label="Museum of Tomorrow, back to top">
            <span className="wordmark__mark" aria-hidden="true" />
            <span>MUSEUM OF TOMORROW</span>
          </a>
          <p className="footer__tag">Explore What Doesn&apos;t Exist. Yet.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="nav__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="label footer__id">ARCHIVE ID: MOT-2089-A7F3</p>
      </div>

      <div className="container footer__legal">
        <p>&copy; {new Date().getFullYear()} Museum of Tomorrow. A fictional institution.</p>
        <p>
          All exhibits, dates and ideas are speculative concepts created for imagination and discussion. They are not
          claims about existing or planned technologies.
        </p>
      </div>
    </footer>
  );
}
