'use client';

import { useEffect, useRef, useState } from 'react';

// True once the element is within a screen or so of the viewport, and from
// then on. Exhibits use it to fetch their code only when the visitor is about
// to reach them: early enough that the working version is in place before it
// scrolls into view, so the swap never shifts what is on screen.
export default function useNearView(margin = '600px') {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: `${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return [ref, near];
}

// While the bench grows a device's screen into its exhibit, BenchStage marks
// the page with data-morphing and announces the end with a 'morphend' event.
// Swapping the exhibit's drawing in the middle of that would cut the morph
// short, so the swap waits for it.
function afterMorph() {
  if (document.documentElement.dataset.morphing !== '1') return Promise.resolve();
  return new Promise((resolve) => window.addEventListener('morphend', resolve, { once: true }));
}

// An exhibit's island: the server-drawn version stands in until the visitor
// nears it; then `load` (a dynamic import, written in the island's own file
// so its code stays a chunk of its own) fetches the working version, which
// takes its place. If the chunk never arrives, the static version stays.
export function useIsland(load) {
  const [ref, near] = useNearView();
  const [Live, setLive] = useState(null);

  useEffect(() => {
    if (!near) return;
    let current = true;
    load()
      .then((m) => afterMorph().then(() => current && setLive(() => m.default)))
      .catch(() => {});
    return () => {
      current = false;
    };
    // `load` is a fixed import written in the island's file.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near]);

  return [ref, Live];
}
