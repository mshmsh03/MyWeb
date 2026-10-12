'use client';

import { use, useEffect, useLayoutEffect, useRef } from 'react';
import { effectsOn } from './MotionRoot';

// One end of a pair of pages that share a device: a project's screen on the
// Projects page and the same software working at full size on its own page.
// Going from one to the other (a link, or the browser's Back and Forward)
// carries the screen across with a View Transition, the way the bench grows a
// device into its exhibit on the home page. With Effects off, or where View
// Transitions are missing, it is a plain navigation; either way focus lands on
// the new page's h1.
//
// Both ends render this with the same `name`; `to` is the other end's path,
// basePath included. The element that travels is the `[data-frame]` inside.
//
// Timing. The router fetches the new page first and only then renders it, so
// the transition is not started on the click, which would hold the screen
// still for as long as the fetch takes. It starts when the arriving end first
// renders: that render waits (suspends) until the browser has taken its
// picture of the old page, so React cannot put the new page in before it, and
// the arriving end's layout effect lets the transition go once the new page
// is in place and scrolled. This is how the router itself waits for a page
// that has not arrived yet, and it keeps the code on these two pages only.

// The navigation on its way from one end to the other. Module state, because
// the end that sets it is gone by the time the other end reads it.
let leaving = null;

const TAKE_MS = 1000; // longest wait for the old page's picture
const LAND_MS = 2000; // longest wait for the new page (and its picture) to be ready

function frameIn(el) {
  return el?.querySelector('[data-frame]') ?? null;
}

// Whether any of the element is on screen. One that is not would fly in from
// off screen; the page crossfades without it instead.
function onScreen(el) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
}

function settle(ms) {
  let done;
  const promise = new Promise((resolve) => {
    done = resolve;
  });
  const timer = setTimeout(done, ms);
  return { promise, done: () => (clearTimeout(timer), done()) };
}

// Started from the arriving end's first render. The old page is still on
// screen; the travelling element gets the name now, so it is in the picture
// of the old page, and gives it up in the update, so the name is unique when
// the new page's picture is taken.
function start(trip) {
  const from = frameIn(trip.from.current);
  trip.taken = settle(TAKE_MS);
  trip.landed = settle(LAND_MS);
  if (!document.startViewTransition || !effectsOn()) {
    trip.taken.done();
    trip.landed.done();
    return;
  }
  const root = document.documentElement;
  const named = onScreen(from);
  if (named) from.style.viewTransitionName = trip.name;
  // The till waits to swap in its working version until this is over
  // (useIsland), so the element being morphed into is not replaced midway.
  root.dataset.morphing = '1';
  trip.vt = document.startViewTransition(() => {
    if (named) from.style.viewTransitionName = '';
    trip.taken.done();
    return trip.landed.promise;
  });
  trip.vt.finished.finally(() => {
    if (trip.to) trip.to.style.viewTransitionName = '';
    delete root.dataset.morphing;
    window.dispatchEvent(new Event('morphend'));
  });
}

// The new page's heading takes focus, without scrolling: on the way back the
// page may stand where the visitor left it.
function focusTitle() {
  const h1 = document.querySelector('main h1');
  if (!h1) return;
  h1.tabIndex = -1;
  h1.focus({ preventScroll: true });
}

export default function PageMorph({ name, to, className, children }) {
  const ref = useRef(null);

  // Arriving: hold this render until the old page's picture is taken.
  const trip = leaving;
  if (trip && trip.name === name && trip.from !== ref && typeof document !== 'undefined') {
    if (!trip.taken) start(trip);
    use(trip.taken.promise);
  }

  useLayoutEffect(() => {
    const trip = leaving;
    if (!trip || trip.name !== name || trip.from === ref) return;
    leaving = null;
    if (!trip.vt) {
      focusTitle();
      return;
    }
    // The router scrolls the new page into place in its own layout effect,
    // which runs after this one; the frame is looked at once it has.
    queueMicrotask(() => {
      const to = frameIn(ref.current);
      if (onScreen(to)) {
        to.style.viewTransitionName = name;
        trip.to = to;
      }
      focusTitle();
      // A picture coming back into a fresh page may not be decoded yet; its
      // frame would be captured empty.
      const img = to?.querySelector('img');
      Promise.resolve(img?.decode?.())
        .catch(() => {})
        .then(trip.landed.done);
    });
  }, [name]);

  // Leaving: a link to the other end that the router took over (it calls
  // preventDefault on the click), or Back and Forward landing on it.
  useEffect(() => {
    const target = new URL(to, location.href).pathname;
    const go = () => {
      leaving = { name, from: ref };
      // Never left waiting if the router does not get there after all.
      const trip = leaving;
      setTimeout(() => {
        if (leaving === trip) leaving = null;
      }, 10000);
    };
    const onClick = (e) => {
      const link = e.target.closest?.('a[href]');
      if (!e.defaultPrevented || !link || link.target) return;
      if (new URL(link.href).pathname === target) go();
    };
    const onNavigate = (e) => {
      if (e.navigationType === 'traverse' && new URL(e.destination.url).pathname === target) go();
    };
    const nav = window.navigation;
    window.addEventListener('click', onClick);
    nav?.addEventListener('navigate', onNavigate);
    return () => {
      window.removeEventListener('click', onClick);
      nav?.removeEventListener('navigate', onNavigate);
    };
  }, [name, to]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
