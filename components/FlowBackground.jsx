'use client';

import Script from 'next/script';
import { asset } from '@/lib/site-data';

// The flow-field canvas that drifts behind the whole site. It is a large,
// self-contained vanilla script (simplex noise plus a particle system) that
// owns its own canvas, resize handling, pointer tracking, and tab-visibility
// pausing, so it is loaded as a plain script rather than rewritten as a
// component — React has nothing to add to it.
//
// DELIBERATE EXCEPTION to the site-wide prefers-reduced-motion rule: this one
// always runs. Do not "fix" it — it has been reverted twice already.
//
// Everything else on the site (typewriter, caret, scroll reveals, hover lifts)
// still switches off under reduced motion via html[data-motion]. This does not,
// because it is ambient wallpaper rather than an entrance: nothing enters,
// exits, moves under the cursor's focus, or shifts the reading position. The
// drift is slow and low-contrast, sitting behind an opaque content column.
// Gating it produced a dead flat background, which is a worse page for the
// owner — whose own machine has Windows animations off — than a slow drift is
// for a reduced-motion visitor. Owner's call, made twice; see DESIGN.md.
export default function FlowBackground() {
  return (
    <>
      <canvas
        id="bg-canvas"
        aria-hidden="true"
        className="fixed inset-0 z-0 h-screen w-screen [filter:hue-rotate(90deg)_saturate(1.2)]"
      />
      {/* lazyOnload: it is decoration, and must never compete with the content
          for the first paint. */}
      <Script src={asset('/assets/flow-bg.js')} strategy="lazyOnload" />
    </>
  );
}
