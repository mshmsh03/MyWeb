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
// A mark's button, which is what a finger presses (viewer.css).
const MARK = 44;

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

  // On a small picture two marks can come closer than the 44px each is
  // pressed by, and one would take part of the other. Such marks are moved
  // apart along the line between them, just far enough and never out of the
  // picture (--sx, --sy in viewer.css); their dots go with them, a few pixels
  // further off what they mark.
  useEffect(() => {
    const screen = frameRef.current?.querySelector('.vw-screen');
    if (!screen || !('ResizeObserver' in window)) return;
    const spread = () => {
      const marks = [...screen.querySelectorAll('.vw-mark')];
      for (const m of marks) {
        m.style.removeProperty('--sx');
        m.style.removeProperty('--sy');
      }
      const box = screen.getBoundingClientRect();
      const at = marks.map((m) => {
        const r = m.getBoundingClientRect();
        return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top];
      });
      const to = at.map(([x, y]) => [x, y]);
      const half = MARK / 2;
      for (let round = 0; round < 6; round++) {
        for (let i = 0; i < to.length; i++) {
          for (let j = i + 1; j < to.length; j++) {
            const dx = to[j][0] - to[i][0];
            const dy = to[j][1] - to[i][1];
            const d = Math.hypot(dx, dy);
            if (d >= MARK) continue;
            const [ux, uy] = d ? [dx / d, dy / d] : [1, 0];
            const push = (MARK - d) / 2;
            to[i][0] -= ux * push;
            to[i][1] -= uy * push;
            to[j][0] += ux * push;
            to[j][1] += uy * push;
          }
        }
        for (const p of to) {
          p[0] = Math.min(Math.max(p[0], half), box.width - half);
          p[1] = Math.min(Math.max(p[1], half), box.height - half);
        }
      }
      marks.forEach((m, i) => {
        const [sx, sy] = [to[i][0] - at[i][0], to[i][1] - at[i][1]];
        if (Math.abs(sx) < 0.5 && Math.abs(sy) < 0.5) return;
        m.style.setProperty('--sx', `${sx.toFixed(1)}px`);
        m.style.setProperty('--sy', `${sy.toFixed(1)}px`);
      });
    };
    const ro = new ResizeObserver(spread);
    ro.observe(screen);
    return () => ro.disconnect();
  }, [siteId, shotLang, size]);

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

  // Once the visitor shows an interest in the viewer, the current site's
  // other languages at this size, and this language at the other size, are
  // fetched while the browser is idle, so the next switch has its picture
  // ready. An interest is a mouse over the viewer, focus in it, or the window
  // held at least half on screen for a second; a visitor who scrolls past
  // fetches nothing. Touch shows no interest before a tap: a finger landing
  // on the viewer may only be scrolling.
  const interested = () => setSeen(true);
  const onPointerEnter = (e) => {
    if (e.pointerType === 'mouse') interested();
  };
  useEffect(() => {
    if (seen) return;
    const el = frameRef.current;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }
    let dwell = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(dwell);
        if (entry.intersectionRatio >= 0.5) dwell = setTimeout(() => setSeen(true), 1000);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      clearTimeout(dwell);
      io.disconnect();
    };
  }, [seen]);

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
      onPointerEnter={seen ? undefined : onPointerEnter}
      onFocus={seen ? undefined : interested}
    />
  );
}
