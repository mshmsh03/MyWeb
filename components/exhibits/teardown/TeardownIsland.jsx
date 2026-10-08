'use client';

import { useIsland } from '@/components/useNearView';

// Shows the server-drawn teardown (its children) until the visitor is about a
// screen away, then fetches the working one and puts it in its place. Its
// code is a chunk of its own, so the home page does not carry it up front. If
// the chunk cannot be fetched, the static version simply stays.
export default function TeardownIsland({ children, ...props }) {
  const [ref, Live] = useIsland(() => import('./TeardownLive'));
  return <div ref={ref}>{Live ? <Live {...props} /> : children}</div>;
}
