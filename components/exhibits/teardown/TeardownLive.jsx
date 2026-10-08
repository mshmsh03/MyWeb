'use client';

import { useEffect, useRef, useState } from 'react';
import { effectsOn } from '@/components/MotionRoot';
import TeardownView from './TeardownView';
import { OPEN_AT_REST, OPEN_STEPS } from './parts';

// The working teardown. It starts as the static version is drawn, part-way
// open with no part and no symptom chosen.
//
// How far open it is lives in two places: the slider's value (state, which
// the controls show) and the drawing's --open, which follows that value on a
// damped spring, a frame at a time, and stops when it settles. Dragging the
// slider pulls the parts after the thumb; the buttons send them all the way.
// With effects off the drawing jumps straight to the value.
const PULL = 0.1;
const DAMPING = 0.66;

export default function TeardownLive({ copy, requestHref }) {
  const [open, setOpen] = useState(Math.round(OPEN_AT_REST * OPEN_STEPS));
  const [part, setPart] = useState(null);
  const [symptom, setSymptom] = useState(null);
  const frameRef = useRef(null);
  const spring = useRef({ pos: OPEN_AT_REST, vel: 0, target: OPEN_AT_REST, frame: 0 });

  useEffect(() => {
    const s = spring.current;
    const frame = frameRef.current;
    const draw = () => frame.style.setProperty('--open', Math.max(0, s.pos).toFixed(3));
    const settle = () => {
      cancelAnimationFrame(s.frame);
      s.frame = 0;
      s.pos = s.target;
      s.vel = 0;
      draw();
    };
    const step = () => {
      if (!effectsOn()) return settle();
      s.vel = (s.vel + (s.target - s.pos) * PULL) * DAMPING;
      s.pos += s.vel;
      if (Math.abs(s.target - s.pos) < 0.001 && Math.abs(s.vel) < 0.001) return settle();
      draw();
      s.frame = requestAnimationFrame(step);
    };

    s.target = open / OPEN_STEPS;
    if (!effectsOn()) settle();
    else if (!s.frame) s.frame = requestAnimationFrame(step);
  }, [open]);

  useEffect(() => {
    const s = spring.current;
    return () => {
      cancelAnimationFrame(s.frame);
      s.frame = 0;
    };
  }, []);

  const on = {
    open: setOpen,
    close: () => setOpen(0),
    openAll: () => setOpen(OPEN_STEPS),
    part: (id) => setPart((now) => (now === id ? null : id)),
    symptom: setSymptom,
    clear: () => setSymptom(null),
  };

  return (
    <TeardownView
      copy={copy}
      requestHref={requestHref}
      open={open}
      part={part}
      symptom={symptom}
      on={on}
      frameRef={frameRef}
    />
  );
}
