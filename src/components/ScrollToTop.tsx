import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top on a route change, or to the target when the route
 * carries a hash (the nav links to /#request and /#services). Retries on the
 * next frame so the target exists when arriving from another page.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = hash.replace('#', '');

    if (id) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scrollToTarget = () => {
        const target = document.getElementById(id);
        if (!target) return;
        target.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      };
      scrollToTarget();
      const frame = requestAnimationFrame(scrollToTarget);
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
};