'use client';

import { useEffect, useRef, useState } from 'react';

// Flips an element's reveal attribute the first time it crosses into view; the
// entrance itself lives in the motion layer of app/globals.css. This component
// only decides *when*, never *what*, so the whole site shares one set of
// curves and durations.
//
// `variant` picks the entrance grammar, and the three are deliberately
// different so scrolling the page does not replay one identical effect:
//   register — text and prose blocks rise a little and settle (the default)
//   wipe     — full-bleed media and feature panels are uncovered by a passing
//              level line, which suits a photograph better than a rise
//   fade     — for anything already carried by a background or gradient
//
// `stagger` marks the element as a list that may arrive as a list: its direct
// children cascade instead of the container animating as one block. CSS caps
// the cascade at four steps, so wide grids never turn into a slow drip.
//
// Nothing here hides content on its own. The hidden state is scoped to
// html[data-motion="on"] in CSS, which is only ever set when motion is both
// possible and wanted — so no-JS, failed hydration, and reduced-motion
// visitors get the fully rendered page.
export default function Reveal({
  as: Tag = 'div',
  variant = 'register',
  stagger = false,
  delay = 0,
  duration,
  className = '',
  style,
  ...props
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Nothing to observe if the page is not animating: the element is already
    // at its final state, so skip the observer entirely.
    if (document.documentElement.dataset.motion !== 'on') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      // Fires a touch before the element is properly on screen, so the
      // entrance is already underway by the time it is worth looking at
      // rather than starting under the reader's eye.
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const attr = stagger ? 'data-reveal-group' : 'data-reveal';

  return (
    <Tag
      ref={ref}
      {...{ [attr]: inView ? 'in' : '' }}
      data-variant={stagger ? undefined : variant}
      className={className}
      style={{
        ...(delay ? { '--m-delay': `${delay}ms` } : null),
        ...(duration ? { '--m-dur': `${duration}ms` } : null),
        ...style,
      }}
      {...props}
    />
  );
}
