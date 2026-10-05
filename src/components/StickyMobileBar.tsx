import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { DEFAULT_SERVICES } from '../data/defaultData';

/** How far the visitor has to scroll before the bar appears on the homepage. */
const REVEAL_AFTER = 260;

export function StickyMobileBar() {
  const { openWhatsApp, settings } = useSite();
  const location = useLocation();
  const [shown, setShown] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setShown(true);
      return;
    }

    // On the homepage the bar stays out of the way until the visitor has
    // actually started reading, so the hero is not competing with it. Scrolling
    // back up hides it again.
    const onScroll = () => setShown(window.scrollY > REVEAL_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  if (location.pathname.startsWith('/admin')) return null;

  const currentService = DEFAULT_SERVICES.find(
    s => location.pathname === `/services/${s.slug}`,
  );
  const message = currentService
    ? `Hi, I would like to enquire about ${currentService.name}.`
    : undefined;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper px-4 py-2.5 transition-transform duration-300 ease-settle motion-reduce:transition-none md:hidden ${
        shown ? 'translate-y-0' : 'translate-y-full'
      }`}
      // Keeps the bar out of reach of assistive tech until it is on screen.
      aria-hidden={!shown}
      inert={!shown}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href={`tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`}
          tabIndex={shown ? 0 : -1}
          className="flex items-center justify-center gap-2 rounded-sm border border-forest px-3 py-3 text-small font-semibold text-forest"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          Call now
        </a>
        <button
          onClick={() => openWhatsApp(message)}
          tabIndex={shown ? 0 : -1}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-forest px-3 py-3 text-small font-semibold text-on-dark"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          WhatsApp
        </button>
      </div>
    </div>
  );
}