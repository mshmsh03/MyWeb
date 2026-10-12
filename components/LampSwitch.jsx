'use client';

import { useEffect, useState } from 'react';
import { effectsOn } from './MotionRoot';

// The lamp over the bench. On, the mat is lit (the light bench in
// globals.css); off, it is the dark bench the site opens on. The choice is
// remembered, and the inline script in app/[lang]/layout.jsx lights the bench
// before the first paint of every later page. With motion on, the light
// spreads out from the switch, or goes back into it (a View Transition of the
// whole page, drawn in globals.css); otherwise the bench simply changes.
//
// Like the Effects switch, its state is read once React is running; before
// that the bulb is drawn lit or not from html[data-lamp] by CSS.

// The browser's own bar takes the mat's colour.
const BAR = { on: '#e6ede7', off: '#0f3d30' };

export const lampOn = () => document.documentElement.dataset.lamp === 'on';

function stored() {
  try {
    return localStorage.getItem('lamp') === 'on';
  } catch {
    return false;
  }
}

// How many times the lamp has changed on this page.
let switches = 0;

function showLamp(on) {
  const root = document.documentElement;
  // Every colour changes in one go (data-switching, globals.css). Controls
  // ease their colours again once the new ones have been drawn, after the
  // latest change if it changes twice in quick succession.
  const n = ++switches;
  root.dataset.switching = '';
  if (on) root.dataset.lamp = 'on';
  else delete root.dataset.lamp;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (n === switches) delete root.dataset.switching;
    }),
  );
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', on ? BAR.on : BAR.off);
  window.dispatchEvent(new Event('lampchange'));
}

function setLamp(on) {
  showLamp(on);
  try {
    localStorage.setItem('lamp', on ? 'on' : 'off');
  } catch {
    // Not remembered, but still switched for this page.
  }
}

// The lamp's transition, while it runs.
let running = null;

function toggle(button) {
  const root = document.documentElement;
  // Pressed again while the light is still moving: that change finishes at
  // once, and this one is made without a transition.
  if (running) {
    const vt = running;
    vt.skipTransition();
    vt.updateCallbackDone.finally(() => setLamp(!lampOn()));
    return;
  }
  const on = !lampOn();
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
  root.style.setProperty('--lamp-x', `${x}px`);
  root.style.setProperty('--lamp-y', `${y}px`);
  root.style.setProperty('--lamp-r', `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
  root.dataset.vt = on ? 'lamp-on' : 'lamp-off';
  const vt = document.startViewTransition(() => setLamp(on));
  running = vt;
  // The page's picture lies over the page while the light moves, so a click
  // on the bulb lands on the root instead of the bulb.
  const onStray = (e) => {
    if (e.target !== root) return;
    const b = button.getBoundingClientRect();
    if (e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom) toggle(button);
  };
  root.addEventListener('click', onStray);
  vt.finished.finally(() => {
    root.removeEventListener('click', onStray);
    running = null;
    delete root.dataset.vt;
    for (const p of ['--lamp-x', '--lamp-y', '--lamp-r']) root.style.removeProperty(p);
  });
}

export default function LampSwitch({ label }) {
  const [on, setOn] = useState(null);

  useEffect(() => {
    const sync = () => setOn(lampOn());
    // The page comes back from the browser's memory (Back after the language
    // switch, which loads a page in full), or the lamp is switched in another
    // tab: the bench follows the visitor's latest choice.
    const follow = (e) => {
      if (e.type === 'pageshow' ? !e.persisted : e.key !== 'lamp') return;
      if (stored() !== lampOn()) showLamp(stored());
    };
    sync();
    window.addEventListener('lampchange', sync);
    window.addEventListener('pageshow', follow);
    window.addEventListener('storage', follow);
    return () => {
      window.removeEventListener('lampchange', sync);
      window.removeEventListener('pageshow', follow);
      window.removeEventListener('storage', follow);
    };
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on === null ? undefined : on}
      title={label}
      onClick={(e) => toggle(e.currentTarget)}
      className="inline-flex size-11 items-center justify-center text-chalk-dim transition-colors [-webkit-tap-highlight-color:transparent] hover:text-chalk"
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
