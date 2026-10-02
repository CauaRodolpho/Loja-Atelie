import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteScroll() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}
