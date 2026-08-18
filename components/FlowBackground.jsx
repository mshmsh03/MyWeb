'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { asset } from '../lib/site-data';

// The flow-field canvas that drifts behind the whole site. It is a large,
// self-contained vanilla script (simplex noise plus a particle system) that
// owns its own canvas, resize handling, pointer tracking, and tab-visibility
// pausing, so it is loaded as a plain script rather than rewritten as a
// component — React has nothing to add to it.
//
// It is gated on the same html[data-motion] switch as everything else. The
// script itself has no prefers-reduced-motion check and runs an unconditional
// requestAnimationFrame loop, so the only way to honour the preference — which
// DESIGN.md commits to site-wide — is to not load it at all. Not loading it
// also saves the download and the loop for anyone who asked for stillness.
//
// The canvas element still renders either way: it is the ground the content
// sits above, and leaving it out would shift nothing but would make the
// z-index stack differ between the two states.
export default function FlowBackground() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAnimate(!mq.matches);
    sync();
    // Turning the preference on mid-session cannot unload a running script, so
    // this only ever takes effect on the next page load — but it does mean a
    // visitor who turns it *off* gets the background without a reload.
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <>
      <canvas
        id="bg-canvas"
        aria-hidden="true"
        className="fixed inset-0 z-0 h-screen w-screen [filter:hue-rotate(90deg)_saturate(1.2)]"
      />
      {/* lazyOnload: it is decoration, and must never compete with the content
          for the first paint. */}
      {animate ? <Script src={asset('/assets/flow-bg.js')} strategy="lazyOnload" /> : null}
    </>
  );
}
