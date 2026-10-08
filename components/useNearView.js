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
