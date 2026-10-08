'use client';

import { useIsland } from '@/components/useNearView';

// The till's script is fetched only when the visitor is about to reach it.
// Until then, and for good if it never arrives, the server's drawing of the
// same till stands in its place.
export default function TillIsland({ lang, requestHref, children }) {
  const [ref, Live] = useIsland(() => import('./TillLive'));
  return <div ref={ref}>{Live ? <Live lang={lang} requestHref={requestHref} /> : children}</div>;
}
