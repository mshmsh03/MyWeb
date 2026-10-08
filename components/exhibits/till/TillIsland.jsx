'use client';

import { useEffect, useState } from 'react';
import useNearView from '@/components/useNearView';

// The till's script is fetched only when the visitor is about to reach it.
// Until then, and for good if it never arrives, the server's drawing of the
// same till stands in its place.
export default function TillIsland({ lang, requestHref, children }) {
  const [ref, near] = useNearView();
  const [Live, setLive] = useState(null);

  useEffect(() => {
    if (!near) return;
    let current = true;
    import('./TillLive')
      .then((m) => current && setLive(() => m.default))
      .catch(() => {});
    return () => {
      current = false;
    };
  }, [near]);

  return <div ref={ref}>{Live ? <Live lang={lang} requestHref={requestHref} /> : children}</div>;
}
