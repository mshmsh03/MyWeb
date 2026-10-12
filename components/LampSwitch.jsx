'use client';

import { useEffect, useState } from 'react';
import { effectsOn } from './MotionRoot';

// The lamp over the bench. On, the mat is lit (the light bench in
// globals.css); off, it is the dark bench the site opens on. The choice is
// remembered, and the inline script in app/[lang]/layout.jsx lights the bench
// before the first paint of every later page. With motion on, the light
// spreads out from the switch, or goes back into it (a View Transition of the
// whole page); otherwise the bench simply changes.
//
// Like the Effects switch, its state is read once React is running; before
// that the bulb is drawn lit or not from html[data-lamp] by CSS.

// The browser's own bar takes the mat's colour.
const BAR = { on: '#e6ede7', off: '#0f3d30' };

export const lampOn = () => document.documentElement.dataset.lamp === 'on';

function setLamp(on) {
  const root = document.documentElement;
  if (on) root.dataset.lamp = 'on';
  else delete root.dataset.lamp;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', on ? BAR.on : BAR.off);
  try {
    localStorage.setItem('lamp', on ? 'on' : 'off');
  } catch {
    // Not remembered, but still switched for this page.
  }
  window.dispatchEvent(new Event('lampchange'));
}

function toggle(button) {
  const on = !lampOn();
  const root = document.documentElement;
  // While a device is being carried across the page, the page is already in
  // a transition; the lamp just switches.
  if (!document.startViewTransition || !effectsOn() || root.dataset.morphing) {
    setLamp(on);
    return;
  }
  // The light is a circle centred on the bulb, as big as the screen at the
  // full: from the bulb to the farthest corner.
  const r = button.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const full = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const circle = [`circle(0px at ${x}px ${y}px)`, `circle(${full}px at ${x}px ${y}px)`];
  root.dataset.vt = on ? 'lamp-on' : 'lamp-off';
  const vt = document.startViewTransition(() => setLamp(on));
  vt.ready
    .then(() => {
      // Switched on, the lit page grows out of the bulb over the dark one;
      // switched off, the lit page shrinks back into it.
      root.animate(
        { clipPath: on ? circle : [...circle].reverse() },
        {
          duration: on ? 560 : 420,
          easing: on ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.5, 0, 0.75, 0)',
          fill: 'both',
          pseudoElement: on ? '::view-transition-new(root)' : '::view-transition-old(root)',
        },
      );
    })
    .catch(() => {});
  vt.finished.finally(() => delete root.dataset.vt);
}

export default function LampSwitch({ label }) {
  const [on, setOn] = useState(null);

  useEffect(() => {
    const sync = () => setOn(lampOn());
    sync();
    window.addEventListener('lampchange', sync);
    return () => window.removeEventListener('lampchange', sync);
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on === null ? undefined : on}
      title={label}
      onClick={(e) => toggle(e.currentTarget)}
      className="inline-flex size-11 items-center justify-center text-chalk-dim transition-colors hover:text-chalk"
    >
      <span className="sr-only">{label}</span>
      {/* A bulb. Lit, its glass is filled and it gives off light. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[22px] fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
      >
        <path
          className="in-data-[lamp=on]:fill-marker"
          d="M12 5a5 5 0 0 0-3 9c.5.4.8 1 .8 1.6V17h4.4v-1.4c0-.6.3-1.2.8-1.6A5 5 0 0 0 12 5z"
        />
        <path d="M10 19.2h4M10.7 21.4h2.6" />
        <path
          className="opacity-0 in-data-[lamp=on]:opacity-100"
          d="M12 1.4V2.8M4.9 4.4l1 1M19.1 4.4l-1 1M2.2 10h1.4M20.4 10h1.4"
        />
      </svg>
    </button>
  );
}
