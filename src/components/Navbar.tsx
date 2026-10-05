import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { DEFAULT_SERVICES } from '../data/defaultData';

const NAV_LINKS = [
  { label: 'Request', to: '/#request' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'About', to: '/about' },
];

export function Navbar() {
  const { openWhatsApp } = useSite();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Close the drawer on navigation, and let Escape dismiss it.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (path: string) =>
    path !== '/' && location.pathname.startsWith(path);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-rule bg-paper">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link to="/" className="group text-left">
            {/* No tagline under the wordmark. "Care at home" reads as a second
                name for the business, and the wordmark is enough on its own. */}
            <span className="font-display text-xl leading-none text-forest transition-colors group-hover:text-terracotta sm:text-2xl">
              MR. PAL
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`border-b-2 py-1 text-small transition-settle ${
                  isActive(link.to)
                    ? 'border-terracotta font-semibold text-ink'
                    : 'border-transparent text-ink-muted hover:border-rule hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openWhatsApp()}
              className="hidden cursor-pointer items-center gap-2 rounded-sm bg-forest px-4 py-2.5 text-small font-semibold tracking-[0.04em] text-on-dark transition-settle hover:bg-forest-deep md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp us
            </button>

            <button
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-forest transition-settle hover:bg-paper-sunk md:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="animate-fade-rise absolute inset-0 bg-forest/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="animate-fade-rise absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col justify-between overflow-y-auto bg-paper-raised"
          >
            <div className="p-6">
              <div className="flex items-start justify-between border-b border-rule pb-5">
                <span className="font-display text-xl text-forest">MR. PAL</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center text-ink-muted transition-settle hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="border-b border-rule-soft py-3.5 text-lead transition-settle hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-7">
                <div className="docket-meta text-ink-faint">What we place</div>
                <div className="mt-3 flex flex-col">
                  {DEFAULT_SERVICES.map(service => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="py-2 text-small text-ink-muted transition-settle hover:text-terracotta"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-rule p-6">
              <Link
                to="/book-a-call"
                className="flex w-full items-center justify-center rounded-sm border border-forest px-4 py-3 text-small font-semibold transition-settle hover:bg-paper-sunk"
              >
                Request a call
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  openWhatsApp();
                }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-forest px-4 py-3 text-small font-semibold text-on-dark transition-settle hover:bg-forest-deep"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp us
              </button>
              <Link
                to="/admin"
                className="block pt-1 text-center text-meta text-ink-faint transition-settle hover:text-ink-muted"
              >
                Website manager (CMS demo)
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}