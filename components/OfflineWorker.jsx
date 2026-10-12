'use client';

import { useEffect } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Hands the site to its service worker (scripts/sw.js), once the page has
// loaded and the browser is idle, so it never competes with the page. Where
// service workers are missing or blocked, nothing happens and the site works
// as it always has. Development builds skip it: a worker there would serve
// yesterday's code.
//
// The worker only sees requests made after it takes over, so the page then
// tells it what it has already loaded, and the first page visited is kept too.
export default function OfflineWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    const register = () =>
      navigator.serviceWorker
        .register(`${BASE}/sw.js`, { scope: `${BASE}/` })
        .then(() => navigator.serviceWorker.ready)
        .then((reg) =>
          reg.active?.postMessage({
            keep: { page: location.href, files: performance.getEntriesByType('resource').map((e) => e.name) },
          }),
        )
        .catch(() => {});
    const idle = () => (window.requestIdleCallback ?? setTimeout)(register);
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
  }, []);

  return null;
}
