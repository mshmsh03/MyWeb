'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { effectsOn } from '@/components/MotionRoot';
import ViewerView from './ViewerView';
import { LANGS, SITES, shotSrc, site } from './sites';

// The working site viewer. It opens as the static version is drawn, Ellin
// Company on a desktop in the page's language, then the visitor switches
// site, language and size, and opens the marks.
const RESIZE_MS = 420;
// --ease-out-quart: a resize this long reads as a snap on the steeper expo.
const EASE_OUT = 'cubic-bezier(0.25, 1, 0.5, 1)';

// Screenshots fetched ahead of a click. Kept for the page's life, so a
// picture is asked for at most once.
const warmed = new Set();
function warm(src) {
  if (warmed.has(src)) return;
  warmed.add(src);
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}

export default function ViewerLive({ lang, copy, requestHref }) {
  const [siteId, setSiteId] = useState(SITES[0].id);
  const [shotLang, setShotLang] = useState(lang);
  const [size, setSize] = useState('desktop');
  const [open, setOpen] = useState(null);
  const [resizing, setResizing] = useState(false);
  // The screenshot being replaced stays under the new one until the new one
  // has loaded and come in; `fade` is how it comes in.
  const [under, setUnder] = useState(null);
  const [fade, setFade] = useState(null);
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState(false);
  const frameRef = useRef(null);
  const resize = useRef(null);

  const src = shotSrc(site(siteId), size, shotLang);

  const swap = (how, apply) => {
    setOpen(null);
    setReady(false);
    if (effectsOn()) {
      // Switched again before the last picture came in: the one under it is
      // the last one actually on screen, so it stays.
      setUnder((now) => (now && !ready ? now : src));
      setFade(how);
    } else {
      setUnder(null);
      setFade(null);
    }
    apply();
  };

  const onSite = (id) => {
    if (id !== siteId) swap('site', () => setSiteId(id));
  };
  const onLang = (l) => {
    if (l !== shotLang) swap(l === 'en' ? 'ltr' : 'rtl', () => setShotLang(l));
  };

  // The window is measured before and after the change, then its width and
  // height are run from one to the other, so it reads as one window being
  // resized rather than one swapped for another.
  const onSize = (next) => {
    if (next === size) return;
    const el = frameRef.current;
    const from = el.getBoundingClientRect();
    const moving = effectsOn() && Boolean(el.animate);
    resize.current?.cancel();
    // The old picture stays under the new one while the window moves, so
    // the page is never blank while the new picture is decoded.
    flushSync(() => {
      setSize(next);
      setOpen(null);
      setUnder(moving ? src : null);
      setFade(null);
    });
    if (!moving) return;
    const to = el.getBoundingClientRect();
    setResizing(true);
    const a = el.animate(
      [
        { width: `${from.width}px`, height: `${from.height}px` },
        { width: `${to.width}px`, height: `${to.height}px` },
      ],
      { duration: RESIZE_MS, easing: EASE_OUT },
    );
    resize.current = a;
    a.onfinish = a.oncancel = () => {
      if (resize.current !== a) return;
      resize.current = null;
      setResizing(false);
      setUnder(null);
    };
  };

  // Tabs move with the arrow keys, in the direction they are laid out, and
  // the tab moved to opens at once.
  const onTabKey = (e) => {
    const ids = SITES.map((x) => x.id);
    const i = ids.indexOf(siteId);
    const back = getComputedStyle(e.currentTarget).direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const forth = back === 'ArrowLeft' ? 'ArrowRight' : 'ArrowLeft';
    const next = {
      [forth]: ids[(i + 1) % ids.length],
      [back]: ids[(i - 1 + ids.length) % ids.length],
      Home: ids[0],
      End: ids[ids.length - 1],
    }[e.key];
    if (!next) return;
    e.preventDefault();
    onSite(next);
    document.getElementById(`viewer-tab-${next}`)?.focus();
  };

  const onMark = (id) => setOpen((now) => (now === id ? null : id));

  // A new picture comes in only once it is decoded, or it would wipe in
  // blank and appear a moment later.
  const onShotLoad = (e) => {
    if (!effectsOn()) return onShotIn();
    const img = e.currentTarget;
    Promise.resolve(img.decode?.())
      .catch(() => {})
      .then(() => setReady(true));
  };
  const onShotIn = () => {
    setUnder(null);
    setFade(null);
    setReady(false);
  };

  // An open mark closes on Escape or on a press anywhere else.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!e.target.closest?.('.vw-mark')) setOpen(null);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Once the window is on screen, the current site's other languages at
  // this size, and this language at the other size, are fetched while the
  // browser is idle, so the next switch has its picture ready. Nothing is
  // fetched for a visitor who scrolls past.
  useEffect(() => {
    const el = frameRef.current;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setSeen(true);
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    const s = site(siteId);
    const other = size === 'desktop' ? 'phone' : 'desktop';
    const srcs = [...LANGS.filter((l) => l !== shotLang).map((l) => shotSrc(s, size, l)), shotSrc(s, other, shotLang)];
    const run = () => srcs.forEach(warm);
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(run, 300);
    return () => clearTimeout(id);
  }, [seen, siteId, shotLang, size]);

  return (
    <ViewerView
      copy={copy}
      requestHref={requestHref}
      siteId={siteId}
      shotLang={shotLang}
      size={size}
      live
      open={open}
      resizing={resizing}
      under={under}
      fade={fade}
      ready={ready}
      frameRef={frameRef}
      onSite={onSite}
      onTabKey={onTabKey}
      onLang={onLang}
      onSize={onSize}
      onMark={onMark}
      onShotLoad={onShotLoad}
      onShotIn={onShotIn}
    />
  );
}
