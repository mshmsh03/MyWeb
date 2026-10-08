'use client';

import { useCallback, useEffect, useReducer, useRef } from 'react';
import TillView from './TillView';
import { describe, openingSale, reduce } from './sale';

// The working till. It starts from the same sale the server drew, so taking
// over from the static version changes nothing on screen.
export default function TillLive({ lang, requestHref }) {
  const [sale, dispatch] = useReducer(reduce, lang, openingSale);
  const root = useRef(null);
  // Where focus should land when the control holding it goes away: a line
  // removed from the order, or the Charge button disabled by a new sale.
  const refocus = useRef(null);

  const act = useCallback((action) => {
    const focused = document.activeElement;
    const line = focused?.closest?.('[data-line]');
    if (line && line.dataset.line === action.id && (action.type === 'remove' || action.type === 'less')) {
      const lines = [...root.current.querySelectorAll('[data-line]')];
      refocus.current = { index: lines.indexOf(line), act: focused.dataset.act };
    } else if (action.type === 'newSale') {
      refocus.current = { tiles: true };
    }
    dispatch(action);
  }, []);

  useEffect(() => {
    const want = refocus.current;
    if (!want) return;
    refocus.current = null;
    // A 'less' that left the line in place left focus where it was.
    if (document.activeElement && document.activeElement !== document.body) return;
    const el = root.current;
    if (want.tiles) {
      el.querySelector('.till-tile:not(:disabled)')?.focus();
      return;
    }
    // The line that moved into the removed one's place, or the one above.
    const lines = el.querySelectorAll('[data-line]');
    const next = lines[Math.min(want.index, lines.length - 1)];
    (next?.querySelector(`[data-act="${want.act}"]`) ?? el.querySelector('#till-order-title'))?.focus();
  });

  // On a phone the printer stands under the till, usually below the fold when
  // Charge is pressed: bring it into view as it prints, unless it already is.
  // The page's own scroll-behavior decides whether that glides or jumps.
  const printed = sale.printed;
  useEffect(() => {
    if (!printed) return;
    const printer = root.current.querySelector('.till-printer');
    if (printer.getBoundingClientRect().top > window.innerHeight - 160) printer.scrollIntoView({ block: 'nearest' });
  }, [printed]);

  return <TillView sale={sale} view={describe(sale)} requestHref={requestHref} act={act} rootRef={root} />;
}
