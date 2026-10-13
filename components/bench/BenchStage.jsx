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
      if (!link) return;
      const id = link.dataset.device;
      const exhibit = document.getElementById(id);
      if (!exhibit) return;
      const heading = () => exhibit.querySelector('h2')?.focus({ preventScroll: true });

      // No transition: the link jumps there as a link does, and focus follows
      // to the section's heading once it has.
      if (!document.startViewTransition || !effectsOn()) {
        requestAnimationFrame(heading);
        return;
      }
      e.preventDefault();
      // One morph at a time: once the page is on its way to an exhibit, a
      // further tap on the bench is let go.
      const root = document.documentElement;
      if (root.dataset.morphing) return;
      // While the morph runs the page is marked, so the exhibit waits to
      // swap in its working version until the morph has landed (useIsland).
      // Nothing is styled off this mark: any change to the root's style
      // restyles the whole page.
      root.dataset.morphing = '1';

      // The device is picked up at once, and that frame is painted before the
      // transition starts: taking the snapshots restyles the whole page
      // several times over, which on a slow phone holds the screen still for
      // a third of a second, too long for a tap to go unanswered. Focus moves
      // to the section's heading now too, while that is cheap; inside the
      // transition's update it would force one more of those restyles.
      link.dataset.picked = '';
      heading();

      // The device's screen and the exhibit's frame take turns carrying the
      // one transition name, so the browser morphs one into the other. The
      // computer's glass is drawn on both sides; the one that faces the
      // reader is the last in right-to-left.
      const screens = link.querySelectorAll('[data-screen]');
      const from = screens[document.dir === 'rtl' ? screens.length - 1 : 0];
      const to = exhibit.querySelector('[data-frame]');
      const morph = () => {
        from.style.viewTransitionName = 'exhibit';
        const vt = document.startViewTransition(() => {
          from.style.viewTransitionName = '';
          if (to) to.style.viewTransitionName = 'exhibit';
          // The new history entry before the scroll: the browser keeps the
          // place of the entry being left as it is at pushState, so Back
          // comes up to the bench again, not to the exhibit.
          history.pushState(null, '', `#${id}`);
          exhibit.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        vt.finished.finally(() => {
          if (to) to.style.viewTransitionName = '';
          delete link.dataset.picked;
          delete root.dataset.morphing;
          window.dispatchEvent(new Event('morphend'));
        });
      };
      requestAnimationFrame(() => setTimeout(morph, 0));
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
