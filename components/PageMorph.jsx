'use client';

import { use, useEffect, useLayoutEffect, useRef } from 'react';
import { effectsOn } from './MotionRoot';

// One end of a pair of pages that share a device: a project's screen on the
// Projects page and the same software working at full size on its own page.
// Going from one to the other (a link, or the browser's Back and Forward)
// carries the screen across with a View Transition, the way the bench grows a
// device into its exhibit on the home page. With Effects off, or where View
// Transitions are missing, it is a plain navigation; either way focus lands as
// focusLanding says.
//
// Both ends render this with the same `name`; `to` is the other end's path,
// basePath included. The element that travels is the `[data-frame]` inside.
// `item` marks the end that is one item in a list (see focusLanding); `as` is
// the element rendered, so an item needs no wrapper of its own.
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

// Whether the trip is coming to this end: the other end of the pair, the one
// whose `to` is the page the trip left. Not this end mounting again, as it
// does when the visitor comes back to the page the trip left.
function arrivingAt(trip, name, to) {
  return trip?.name === name && new URL(to, location.href).pathname === trip.origin;
}

// Where the visitor was on each page a trip left, by history entry.
//
// On Back and Forward the browser puts a page back where it was, but only once
// the page is drawn again, which the transition holds off until the new page's
// picture is taken: the page would jump under the morph, to the wrong place.
// And it decides whether to do this as the visitor leaves the entry, not on
// the way back. So a trip that leaves an entry keeps its place here and tells
// the browser to leave that entry alone (scrollRestoration, which belongs to
// the current entry); the next arrival there puts the place back itself and
// gives the job back to the browser (takePlace). Only with the Navigation API,
// which is also what makes Back and Forward a trip.
const places = new Map();

function takePlace() {
  if (history.scrollRestoration !== 'manual') return undefined;
  history.scrollRestoration = 'auto';
  const key = window.navigation?.currentEntry?.key;
  const y = places.get(key);
  places.delete(key);
  return y;
}

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

// Where focus lands on arrival, without scrolling. On a page of its own, the
// page's h1. On an `item` end (one project among others on Projects), the
// item's link back to the page just left, so the visitor carries on from the
// item they opened.
function focusLanding(el, item, target) {
  const link = item
    ? [...(el?.querySelectorAll('a[href]') ?? [])].find((a) => new URL(a.href).pathname === target)
    : null;
  const to = link ?? document.querySelector('main h1');
  if (!to) return;
  if (!link) to.tabIndex = -1;
  to.focus({ preventScroll: true });
}

export default function PageMorph({ name, to, item = false, as: Tag = 'div', className, children }) {
  const ref = useRef(null);

  // Arriving: hold this render until the old page's picture is taken.
  const trip = leaving;
  if (typeof document !== 'undefined' && arrivingAt(trip, name, to)) {
    if (!trip.taken) start(trip);
    use(trip.taken.promise);
  }

  useLayoutEffect(() => {
    const trip = leaving;
    const arriving = arrivingAt(trip, name, to);
    if (arriving) leaving = null;
    const target = new URL(to, location.href).pathname;
    // The router scrolls the new page into place in its own layout effect,
    // which runs after this one; the frame is looked at once it has. Back or
    // Forward to a page a trip left puts it where the visitor was (takePlace),
    // also when this visit is not a trip itself. Otherwise the router has put
    // the page at its top, so an item, which may be far down it, is brought to
    // the middle of the screen.
    queueMicrotask(() => {
      const place = takePlace();
      const goBack = () => window.scrollTo({ top: place, behavior: 'instant' });
      if (!arriving) {
        // Not a trip: the place goes back a frame after the page is drawn, as
        // the browser itself does it. Moved in the same frame as the page goes
        // in, a short page being left counts as layout shift.
        if (place !== undefined) requestAnimationFrame(() => setTimeout(goBack, 0));
        return;
      }
      if (place !== undefined) goBack();
      else if (item) ref.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
      focusLanding(ref.current, item, target);
      if (!trip.vt) return;
      const frame = frameIn(ref.current);
      if (onScreen(frame)) {
        frame.style.viewTransitionName = name;
        trip.to = frame;
      }
      // A picture coming back into a fresh page may not be decoded yet; its
      // frame would be captured empty. A lazy one is not even fetched until
      // the page is drawn, which the transition holds off, so it is asked
      // for now.
      const img = frame?.querySelector('img');
      if (img?.loading === 'lazy') img.loading = 'eager';
      Promise.resolve(img?.decode?.())
        .catch(() => {})
        .then(trip.landed.done);
    });
  }, [name, to, item]);

  // Leaving: a click on a link to the other end that the router took over (it
  // calls preventDefault on the click), or a `navigate` event for Back or
  // Forward landing on it. Where the Navigation API is missing, Back and
  // Forward are plain navigations without the morph.
  useEffect(() => {
    const target = new URL(to, location.href).pathname;
    const go = () => {
      leaving = { name, from: ref, origin: location.pathname };
      const nav = window.navigation;
      if (nav?.currentEntry) {
        const left = nav.currentEntry.key;
        places.set(left, window.scrollY);
        history.scrollRestoration = 'manual';
        // An entry pushed from this one takes on 'manual' as well. Wherever
        // the visitor lands next, an entry with no place kept here is handed
        // straight back to the browser: a page that is not an end of the pair
        // would never hand it back itself.
        const onChange = () => {
          if (nav.currentEntry.key === left) return;
          nav.removeEventListener('currententrychange', onChange);
          if (!places.has(nav.currentEntry.key)) history.scrollRestoration = 'auto';
        };
        nav.addEventListener('currententrychange', onChange);
      }
      // The other end consumes the trip when it renders. If it never does (the
      // fetch fails and the router loads the page in full, or the visitor goes
      // somewhere else first), the trip is dropped, so a later visit to the
      // other end does not start a morph from a page long gone. Ten seconds
      // covers a slow phone fetching the page. The place kept above stays: a
      // return to this entry by Back puts it back all the same.
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
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
