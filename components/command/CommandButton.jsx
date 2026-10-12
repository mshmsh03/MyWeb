'use client';

import './command.css';
import { useEffect, useRef, useState } from 'react';

// The command menu: jump to any page or exhibit, switch the language, copy the
// email address, work the lamp and Effects. It opens from the search button at
// the end of the nav, or Ctrl+K (⌘K on a Mac) anywhere.
//
// Only this button and the shortcut load with the page. The menu itself
// (CommandMenu) is fetched once the page has settled, so a phone's first tap
// opens it at once (the offline install saves that file anyway), or sooner
// if it is about to be wanted: the pointer over the button, the button
// focused.
const load = () => import('./CommandMenu');
const prefetch = () => load().catch(() => {});

export default function CommandButton({ lang, words }) {
  const [Menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  // The shortcut as this keyboard writes it, once React knows the platform.
  const [keys, setKeys] = useState('');
  const isOpen = useRef(false);
  isOpen.current = open;

  useEffect(() => {
    const show = () =>
      load()
        .then((m) => {
          setMenu(() => m.default);
          setOpen(true);
        })
        .catch(() => {});
    const platform = navigator.userAgentData?.platform ?? navigator.platform ?? '';
    setKeys(/mac|iphone|ipad/i.test(platform) ? '⌘K' : 'Ctrl K');
    // KeyK is the key's place, so the shortcut works whatever the keyboard
    // writes there (an Arabic layout writes ن).
    const onKey = (e) => {
      if (!(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey) return;
      if (e.code !== 'KeyK' && e.key?.toLowerCase() !== 'k') return;
      e.preventDefault();
      if (isOpen.current) setOpen(false);
      else show();
    };
    const onOpen = () => show();
    window.addEventListener('keydown', onKey);
    window.addEventListener('commandmenu', onOpen);
    const idle = window.requestIdleCallback ?? ((f) => setTimeout(f, 2000));
    const settled = idle(prefetch);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('commandmenu', onOpen);
      (window.cancelIdleCallback ?? clearTimeout)(settled);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={words.name}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
        title={keys ? `${words.name} (${keys})` : words.name}
        onClick={() => window.dispatchEvent(new Event('commandmenu'))}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        className="ms-auto inline-flex h-11 min-w-11 items-center justify-center gap-2 px-1.5 text-chalk-dim transition-colors [-webkit-tap-highlight-color:transparent] hover:text-chalk md:ms-1"
      >
        {/* A magnifier, the same one the menu's field shows. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-[22px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round]"
        >
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l5.5 5.5" />
        </svg>
        {/* The shortcut, from the width where there is room for it. Its box
            keeps one width, so the label arriving after the page has loaded
            moves nothing. */}
        <kbd aria-hidden="true" className="cm-key hidden w-[3.25rem] md:inline-grid">
          {keys}
        </kbd>
      </button>
      {Menu ? <Menu lang={lang} words={words} open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
