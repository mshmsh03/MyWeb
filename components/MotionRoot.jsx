'use client';

import { useEffect } from 'react';

// Owns html[data-motion], the single switch every animation on the site hangs
// off. The inline script in app/[lang]/layout.jsx sets it before first paint;
// this component takes over once React is running.
//
// Two jobs the inline script cannot do:
//   1. Confirm hydration. The inline script arms a timer that forces motion off
//      if this never mounts, so a broken bundle can never leave content stuck
//      at opacity 0.
//   2. Track the system preference live, so toggling "reduce motion" in the OS
//      takes effect without a reload. A choice made with the Effects switch in
//      the header is the visitor's own and is left alone.
export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.hydrated = '1';

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (readEffects() !== null) return;
      root.dataset.motion = mq.matches ? 'off' : 'on';
      window.dispatchEvent(new Event('effectschange'));
    };

    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return null;
}

// The visitor's own choice from the Effects switch: 'on', 'off', or null when
// they have not made one. Storage can be missing or blocked; that is the same
// as no choice.
export function readEffects() {
  try {
    return localStorage.getItem('effects');
  } catch {
    return null;
  }
}

export function setEffects(on) {
  document.documentElement.dataset.motion = on ? 'on' : 'off';
  try {
    localStorage.setItem('effects', on ? 'on' : 'off');
  } catch {
    // Not remembered, but still switched for this page.
  }
  window.dispatchEvent(new Event('effectschange'));
}

export const effectsOn = () => document.documentElement.dataset.motion === 'on';
