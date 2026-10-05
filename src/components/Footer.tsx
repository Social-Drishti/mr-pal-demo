import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { DEFAULT_SERVICES } from '../data/defaultData';

export function Footer() {
  const { settings } = useSite();
  const year = new Date().getFullYear();
  const telHref = `tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="bg-forest pb-28 pt-16 text-on-dark md:pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="font-display text-2xl text-on-dark">MR. PAL</div>
            <p className="mt-4 max-w-xs text-small text-on-dark-muted">
              We find, check and place care staff and home helpers into Mumbai homes.
            </p>
            <a
              href={telHref}
              className="mt-6 inline-block text-lead text-on-dark underline decoration-terracotta underline-offset-4 transition-settle hover:decoration-2"
            >
              {settings.phoneNumber}
            </a>
            <div className="mt-1 text-small text-on-dark-muted">
              {settings.officeHours}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="docket-meta text-on-dark/45">What we place</div>
            <ul className="mt-4 space-y-2.5">
              {DEFAULT_SERVICES.map(service => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-small text-on-dark-muted transition-settle hover:text-terracotta"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="docket-meta text-on-dark/45">Pages</div>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/#request"
                  className="text-small text-on-dark-muted transition-settle hover:text-terracotta"
                >
                  Build a request
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-small text-on-dark-muted transition-settle hover:text-terracotta"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-small text-on-dark-muted transition-settle hover:text-terracotta"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/book-a-call"
                  className="text-small text-on-dark-muted transition-settle hover:text-terracotta"
                >
                  Request a call
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-small text-on-dark-muted transition-settle hover:text-terracotta"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="docket-meta text-on-dark/45">Reach us</div>
            <ul className="mt-4 space-y-2.5 text-small text-on-dark-muted">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-settle hover:text-terracotta"
                >
                  {settings.email}
                </a>
              </li>
              <li>{settings.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-on-dark/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-meta text-on-dark/50">
            © {year} MR. PAL. {settings.address}.
          </p>
          <p className="max-w-md text-meta text-on-dark/50">
            MR. PAL places independent staff. We are not a medical provider.
          </p>
        </div>
      </div>
    </footer>
  );
}