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
  // Marks whose line was put away with Escape while pointed at or focused.
  // Each stays quiet until it is pointed at, focused or pressed again.
  const [hush, setHush] = useState([]);
  // While the window is being resized: the width its page will end at.
  const [resizing, setResizing] = useState(null);
  const [seen, setSeen] = useState(false);
  const frameRef = useRef(null);
  const resize = useRef(null);

  const src = shotSrc(site(siteId), size, shotLang);
  // The picture fully on screen. Until the one asked for has loaded and come
  // in, this one stays under it, and its marks wait. Going back to it before
  // then is no change at all. `fade` is how the new one comes in ('' for no
  // motion), `ready` the address of the new one once it is decoded.
  const [shown, setShown] = useState(src);
  const [fade, setFade] = useState('');
  const [ready, setReady] = useState(null);

  const swap = (how, apply) => {
    setOpen(null);
    setHush([]);
    // A picture already coming in is the last one put on screen, so it is
    // the one that stays under the next.
    if (ready === src) setShown(src);
    setReady(null);
    setFade(effectsOn() ? how : '');
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
    flushSync(() => swap('', () => setSize(next)));
    if (!moving) return;
    const to = el.getBoundingClientRect();
    setResizing(el.querySelector('.vw-screen').getBoundingClientRect().width);
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
      setResizing(null);
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

  const wake = (id) => setHush((now) => (now.includes(id) ? now.filter((x) => x !== id) : now));
  const onMark = (id) => {
    wake(id);
    setOpen((now) => (now === id ? null : id));
  };

  // A new picture comes in only once it is decoded, or it would wipe in
  // blank and appear a moment later. By then the visitor may have switched
  // again: a picture no longer in the window, or now the one under the new
  // one, changes nothing. The element itself says which it is.
  const arrive = (img) => {
    const at = img.getAttribute('src');
    Promise.resolve(img.decode?.())
      .catch(() => {})
      .then(() => {
        if (!img.isConnected) return;
        if (img.dataset.fade && effectsOn()) setReady(at);
        else setShown(at);
      });
  };
  const onShotLoad = (e) => arrive(e.currentTarget);
  const onShotIn = (e) => setShown(e.currentTarget.getAttribute('src'));

  // Going back to the picture that was under one still coming in reuses
  // that element, which has loaded already and will not say so again.
  useEffect(() => {
    if (shown === src) return;
    const img = frameRef.current?.querySelector('.vw-shot[data-fade]');
    if (img?.complete && img.naturalWidth) arrive(img);
  }, [shown, src]);

  // An open mark closes on a press anywhere else.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!e.target.closest?.('.vw-mark')) setOpen(null);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Escape puts away every line on show, whether a mark was pressed, is
  // focused or is pointed at, without moving the focus or the pointer.
  useEffect(() => {
    const hover = window.matchMedia('(hover: hover)');
    const onKey = (e) => {
      if (e.key !== 'Escape' || !frameRef.current) return;
      const on = [...frameRef.current.querySelectorAll('.vw-mark')]
        .filter((m) => m.matches('[data-open], :focus-visible') || (hover.matches && m.matches(':hover')))
        .map((m) => m.dataset.id);
      if (!on.length) return;
      setOpen(null);
      setHush(on);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

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
      hush={hush}
      resizing={resizing}
      under={shown === src ? null : shown}
      fade={fade}
      ready={ready === src}
      frameRef={frameRef}
      onSite={onSite}
      onTabKey={onTabKey}
      onLang={onLang}
      onSize={onSize}
      onMark={onMark}
      onMarkWake={wake}
      onShotLoad={onShotLoad}
      onShotIn={onShotIn}
    />
  );
}
