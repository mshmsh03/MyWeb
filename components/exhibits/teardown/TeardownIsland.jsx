'use client';

import { useEffect, useState } from 'react';
import useNearView from '@/components/useNearView';

// Shows the server-drawn teardown (its children) until the visitor is about a
// screen away, then fetches the working one and puts it in its place. Its
// code is a chunk of its own, so the home page does not carry it up front. If
// the chunk cannot be fetched, the static version simply stays.
export default function TeardownIsland({ children, ...props }) {
  const [ref, near] = useNearView();
  const [Live, setLive] = useState(null);

  useEffect(() => {
    if (!near) return;
    let current = true;
    import('./TeardownLive')
      .then((m) => current && setLive(() => m.default))
      .catch(() => {});
    return () => {
      current = false;
    };
  }, [near]);

  return <div ref={ref}>{Live ? <Live {...props} /> : children}</div>;
}
