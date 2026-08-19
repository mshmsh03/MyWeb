'use client';

import { useEffect } from 'react';

// Owns html[data-motion], the single switch every animation on the site hangs
// off. The inline script in app/[lang]/layout.jsx sets it before first paint so
// entrances never flash their final state first; this component takes over once
// React is running.
//
// Two jobs the inline script cannot do:
//   1. Confirm hydration. The inline script arms a timer that forces motion off
//      if this never mounts, so a broken bundle can never leave scroll-revealed
//      content stuck at opacity 0.
//   2. Track the preference live, so toggling "reduce motion" in the OS takes
//      effect without a reload.
export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.hydrated = '1';

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      root.dataset.motion = mq.matches ? 'off' : 'on';
    };

    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return null;
}
