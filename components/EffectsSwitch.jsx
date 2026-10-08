'use client';

import { useEffect, useState } from 'react';
import { effectsOn, setEffects } from './MotionRoot';

// Switches every animation on the site off, or back on, by hand: the same
// thing the system's reduced-motion setting does. The state is read once
// React is running; before that the knob's position is drawn from
// html[data-motion] by CSS, so it is right from the first paint.
export default function EffectsSwitch({ label }) {
  const [on, setOn] = useState(null);

  useEffect(() => {
    const sync = () => setOn(effectsOn());
    sync();
    window.addEventListener('effectschange', sync);
    return () => window.removeEventListener('effectschange', sync);
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on === null ? undefined : on}
      onClick={() => setEffects(!effectsOn())}
      className="group inline-flex min-h-11 items-center gap-2 px-1.5 text-chalk-dim transition-colors hover:text-chalk"
    >
      <span className="label">{label}</span>
      {/* The track and knob. On is the knob at the inline end on signal
          orange; off is the knob at the start on the mat. */}
      <span
        aria-hidden="true"
        className="relative inline-block h-[18px] w-8 rounded-full border border-chalk-dim/70 transition-colors in-data-[motion=on]:border-signal in-data-[motion=on]:bg-signal"
      >
        <span className="absolute top-[2px] start-[2px] size-3 rounded-full bg-chalk-dim transition-transform in-data-[motion=on]:translate-x-[14px] in-data-[motion=on]:bg-graphite rtl:in-data-[motion=on]:-translate-x-[14px]" />
      </span>
    </button>
  );
}
