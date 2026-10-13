'use client';

import { useEffect } from 'react';

// Owns html[data-motion], the single switch every animation on the site hangs
// off. The inline script in app/[lang]/layout.jsx sets it before first paint;
// this component takes over once React is running.
//
// Three jobs the inline script cannot do:
//   1. Confirm hydration. The inline script arms a timer that forces motion off
//      if this never mounts, so a page whose script failed is left still. A
//      slow phone on a slow connection can take longer than the timer to get
//      here, so motion is then put back as the visitor has it. Nothing replays:
//      what moves when first drawn has already been drawn, as when Effects is
//      switched on by hand.
//   2. Track the system preference live, so toggling "reduce motion" in the OS
//      takes effect without a reload. A choice made with the Effects switch in
//      the header is the visitor's own and is left alone.
//   3. Keep Back and Forward to another page from gliding (pageTurnScroll).
export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.hydrated = '1';

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stored = readEffects();
    const wanted = (stored ? stored === 'on' : !mq.matches) ? 'on' : 'off';
    if (root.dataset.motion !== wanted) {
      root.dataset.motion = wanted;
      window.dispatchEvent(new Event('effectschange'));
    }
    const sync = () => {
      if (readEffects() !== null) return;
      root.dataset.motion = mq.matches ? 'off' : 'on';
      window.dispatchEvent(new Event('effectschange'));
    };

    mq.addEventListener('change', sync);
    window.navigation?.addEventListener('currententrychange', pageTurnScroll);
    return () => {
      mq.removeEventListener('change', sync);
      window.navigation?.removeEventListener('currententrychange', pageTurnScroll);
    };
  }, []);

  return null;
}

// Back or Forward to another page of the site: the browser puts that page back
// where the visitor left it. With motion on the page scrolls smoothly
// (globals.css), and Chrome glides there too, from wherever the page just left
// was scrolled: the page shows at the wrong place first and takes up to a
// second to arrive, and the wheel does nothing until it has. For that one
// restore the scroll is instant, as it is with motion off; the browser makes
// it in the next frame. Back and Forward within a page still glide, from where
// the visitor is. Only with the Navigation API, which says where the visitor
// came from.
function pageTurnScroll(e) {
  if (e.navigationType !== 'traverse' || !e.from?.url) return;
  if (new URL(e.from.url).pathname === location.pathname) return;
  const root = document.documentElement;
  root.style.scrollBehavior = 'auto';
  requestAnimationFrame(() => requestAnimationFrame(() => root.style.removeProperty('scroll-behavior')));
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
