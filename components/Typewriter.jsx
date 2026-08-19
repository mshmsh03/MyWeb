'use client';

import { useEffect, useState } from 'react';

// How long each character takes to land.
const CHAR_MS = 40;

// The hero's signature: the prompt and the name are typed out rather than
// rendered, one character at a time, staggered so they read as one session.
//
// The full text is rendered on the server and only *replaced* by the typing
// animation once this mounts and motion is actually on — so the page is
// complete and legible with no JS, with reduced motion, or if hydration never
// happens. The visual state during typing is a substring of the final text,
// which means nothing reflows when it finishes.
export default function Typewriter({ text, delay = 0, caret = false, className = '' }) {
  const [shown, setShown] = useState(null);

  useEffect(() => {
    if (document.documentElement.dataset.motion !== 'on') return;

    let i = 0;
    let timer;
    setShown('');

    const start = setTimeout(function type() {
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) timer = setTimeout(type, CHAR_MS);
    }, delay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, delay]);

  return (
    <span className={className}>
      {shown === null ? text : shown}
      {caret ? (
        <span
          aria-hidden="true"
          className="m-caret ms-1 inline-block h-[1em] w-2.5 -translate-y-[2px] bg-accent align-middle"
        />
      ) : null}
    </span>
  );
}
