'use client';

import { useEffect, useRef } from 'react';
import { effectsOn } from '../MotionRoot';

// The behaviour the first screen gains once its script has loaded. The bench
// itself is server-rendered and complete without this.
//
// 1. Moving a mouse over the first screen tilts the bench a few degrees. The
//    tilt follows the pointer on a spring and stops when it settles; nothing
//    runs while the pointer is still. Touch has no hover, so it is left out.
// 2. Choosing a device grows its screen into the exhibit below with a View
//    Transition. Where those are not supported, or Effects are off, the link
//    does what a link does and jumps there.
const TILT_X = 4; // degrees, top to bottom
const TILT_Y = 7; // degrees, side to side

export default function BenchStage({ className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const stage = ref.current;
    const bench = stage.querySelector('.bench');
    const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');

    // A damped spring per axis, stepped once a frame.
    let target = [0, 0];
    let pos = [0, 0];
    let vel = [0, 0];
    let frame = 0;
    const step = () => {
      let moving = false;
      for (let i = 0; i < 2; i++) {
        vel[i] = (vel[i] + (target[i] - pos[i]) * 0.07) * 0.74;
        pos[i] += vel[i];
        if (Math.abs(target[i] - pos[i]) > 0.01 || Math.abs(vel[i]) > 0.01) moving = true;
      }
      bench.style.setProperty('--tilt-x', `${pos[0].toFixed(2)}deg`);
      bench.style.setProperty('--tilt-y', `${pos[1].toFixed(2)}deg`);
      frame = moving ? requestAnimationFrame(step) : 0;
    };
    const aim = (x, y) => {
      target = [x, y];
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse' || !mouse.matches || !effectsOn()) return;
      const r = stage.getBoundingClientRect();
      aim(-((e.clientY - r.top) / r.height - 0.5) * TILT_X * 2, ((e.clientX - r.left) / r.width - 0.5) * TILT_Y * 2);
    };
    const onLeave = () => aim(0, 0);

    const onClick = (e) => {
      const link = e.target.closest('a[data-device]');
      if (!link || !document.startViewTransition || !effectsOn()) return;
      const id = link.dataset.device;
      const exhibit = document.getElementById(id);
      if (!exhibit) return;
      e.preventDefault();

      // The device's screen and the exhibit's frame take turns carrying the
      // one transition name, so the browser morphs one into the other. The
      // computer's glass is drawn on both sides; the one that faces the
      // reader is the last in right-to-left.
      const screens = link.querySelectorAll('[data-screen]');
      const from = screens[document.dir === 'rtl' ? screens.length - 1 : 0];
      const to = exhibit.querySelector('[data-frame]');
      from.style.viewTransitionName = 'exhibit';
      const vt = document.startViewTransition(() => {
        from.style.viewTransitionName = '';
        if (to) to.style.viewTransitionName = 'exhibit';
        exhibit.scrollIntoView({ behavior: 'instant', block: 'start' });
        history.pushState(null, '', `#${id}`);
        exhibit.querySelector('h2')?.focus({ preventScroll: true });
      });
      vt.finished.finally(() => {
        if (to) to.style.viewTransitionName = '';
      });
    };

    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    stage.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      stage.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
