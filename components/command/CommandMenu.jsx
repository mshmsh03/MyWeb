'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { BASE_PATH, EMAIL, LANGS, SITE, pagePath, routeFromPathname } from '@/lib/site-data';
import { lampOn, switchLamp } from '../LampSwitch';
import { effectsOn, setEffects } from '../MotionRoot';

// The command menu, loaded the first time it is opened (CommandButton). A small
// device laid over the dimmed bench: a field that narrows the list as the
// visitor types, and the list, in groups. It is a modal dialog, so the page
// behind is out of reach until it closes, and focus goes back where it was.
//
// Keys: type to narrow the list, Enter for the first item; Down and Up move
// through the items and back to the field, Home and End jump to either end;
// Esc closes.

const GROUPS = ['pages', 'services', 'language', 'contact', 'settings'];

// So a visitor can type a language's English name in any language's menu.
const LANG_TERMS = { en: 'english', ar: 'arabic', ku: 'kurdish sorani' };

// Letters written more than one way match as one: Latin accents and Arabic
// vowel marks and hamza seats fall away (NFKD splits them off), the tatweel
// and word joiners go, and the Arabic and Kurdish forms of yeh, kaf and heh
// are folded together.
function fold(s) {
  return s
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[̀-ًͯ-ٰٟـ⁠]/g, '')
    .replace(/[ىی]/g, 'ي')
    .replace(/ک/g, 'ك')
    .replace(/[ەة]/g, 'ه');
}

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="cm-check">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

export default function CommandMenu({ lang, words, open, onClose }) {
  const dialog = useRef(null);
  const field = useRef(null);
  const list = useRef(null);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  // The lamp and Effects as they were when the menu opened.
  const [on, setOn] = useState({ lamp: false, effects: false });
  const { path } = routeFromPathname(usePathname());
  const id = useId();

  useEffect(() => {
    const d = dialog.current;
    if (open && !d.open) {
      setQuery('');
      setCopied(false);
      setOn({ lamp: lampOn(), effects: effectsOn() });
      // On a phone the list opens without the keyboard over half of it: the
      // list takes focus, and the field waits to be tapped. (A dialog gives
      // focus to the first control inside it unless one is marked autofocus;
      // Chrome does not take the mark on the dialog itself.)
      list.current.toggleAttribute('autofocus', matchMedia('(pointer: coarse)').matches);
      d.showModal();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const items = useMemo(
    () => [
      ...words.pages.map(({ page, label }) => ({
        key: `page-${page}`,
        group: 'pages',
        label,
        href: pagePath(lang, page),
        current: page === path,
        terms: page.replace('/', ' '),
      })),
      ...words.exhibits.map(({ id: exhibit, label }) => ({
        key: `exhibit-${exhibit}`,
        group: 'services',
        label,
        exhibit,
        terms: exhibit === 'pos' ? 'pos point of sale till' : exhibit,
      })),
      ...LANGS.map((l) => ({
        key: `lang-${l}`,
        group: 'language',
        label: SITE[l].selfName,
        lang: l,
        current: l === lang,
        terms: `${l} ${SITE[l].hreflang} ${LANG_TERMS[l]}`,
      })),
      { key: 'email', group: 'contact', label: words.copyEmail, copy: true, terms: `email mail ${EMAIL}` },
      { key: 'lamp', group: 'settings', label: words.lamp, setting: 'lamp', terms: 'lamp light dark' },
      { key: 'effects', group: 'settings', label: words.effects, setting: 'effects', terms: 'effects motion animation' },
    ],
    [lang, path, words],
  );

  const heading = {
    pages: words.groups.pages,
    services: words.groups.services,
    language: words.language,
    contact: words.contact,
    settings: words.groups.settings,
  };

  // Every word typed has to be found somewhere in the item: its name, its
  // group's name, or the English words kept for it.
  const wanted = fold(query).split(/\s+/).filter(Boolean);
  const shown = items.filter((it) => {
    const hay = fold(`${it.label} ${heading[it.group]} ${it.terms}`);
    return wanted.every((w) => hay.includes(w));
  });

  const close = () => dialog.current?.close();

  // A section of the home page. Already there, the menu brings it up and its
  // heading takes focus, as choosing a device on the bench does; from another
  // page the link goes to it.
  const toExhibit = (e, exhibit) => {
    const section = document.getElementById(exhibit);
    close();
    if (!section) return;
    e.preventDefault();
    history.pushState(null, '', `#${exhibit}`);
    section.scrollIntoView({ block: 'start' });
    section.querySelector('h2')?.focus({ preventScroll: true });
  };

  const copyEmail = () => {
    const done = navigator.clipboard ? navigator.clipboard.writeText(EMAIL) : Promise.reject();
    done.then(
      () => {
        setCopied(true);
        setTimeout(close, 900);
      },
      // Copying is not allowed here: the address is selected instead, ready
      // to copy by hand.
      () => {
        const address = list.current?.querySelector('[data-email]');
        if (address) getSelection()?.selectAllChildren(address);
      },
    );
  };

  // The lamp and Effects change the whole page, so the menu goes first; the
  // lamp's light then comes from its bulb in the header.
  const toggle = (setting) => {
    close();
    requestAnimationFrame(() => (setting === 'lamp' ? switchLamp() : setEffects(!effectsOn())));
  };

  const onKeyDown = (e) => {
    const all = [...list.current.querySelectorAll('[data-item]')];
    const at = all.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      all[(at + 1) % all.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (at <= 0) field.current.focus();
      else all[at - 1].focus();
    } else if ((e.key === 'Home' || e.key === 'End') && at >= 0) {
      e.preventDefault();
      all[e.key === 'Home' ? 0 : all.length - 1].focus();
    } else if (e.key === 'Enter' && e.target === field.current) {
      e.preventDefault();
      all[0]?.click();
    }
  };

  const item = (it) => {
    if (it.href) {
      return (
        <Link data-item className="cm-item" href={it.href} prefetch={false} onClick={close} aria-current={it.current ? 'page' : undefined}>
          <span>{it.label}</span>
          {it.current ? <Check /> : null}
        </Link>
      );
    }
    if (it.exhibit) {
      return (
        <Link data-item className="cm-item" href={`${pagePath(lang, 'index')}#${it.exhibit}`} prefetch={false} onClick={(e) => toExhibit(e, it.exhibit)}>
          <span>{it.label}</span>
        </Link>
      );
    }
    if (it.lang) {
      // A plain link, as in the header: the page loads in full and turns over
      // into the other language.
      const l = SITE[it.lang];
      return (
        <a data-item className="cm-item" href={`${BASE_PATH}${pagePath(it.lang, path)}`} hrefLang={l.hreflang} onClick={close} aria-current={it.current ? 'true' : undefined}>
          <span lang={l.hreflang} dir={l.dir}>
            {it.label}
          </span>
          <span className="cm-hint label">{l.langName}</span>
          {it.current ? <Check /> : null}
        </a>
      );
    }
    if (it.copy) {
      return (
        <button type="button" data-item className="cm-item" onClick={copyEmail}>
          <span>{copied ? words.copied : it.label}</span>
          <span className="cm-hint ltr-fixed" data-email>
            {EMAIL}
          </span>
          {copied ? <Check /> : null}
        </button>
      );
    }
    return (
      <button type="button" data-item className="cm-item" aria-pressed={on[it.setting]} onClick={() => toggle(it.setting)}>
        <span>{it.label}</span>
        <span className="cm-switch" aria-hidden="true" />
      </button>
    );
  };

  return (
    // A click on the dimmed bench around the device closes it.
    <dialog
      ref={dialog}
      className="cm"
      aria-label={words.name}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="cm-device" onKeyDown={onKeyDown}>
        <div className="cm-screen on-screen">
          <div className="cm-search">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="cm-glass">
              <circle cx="10.5" cy="10.5" r="6" />
              <path d="M15 15l5.5 5.5" />
            </svg>
            <input
              ref={field}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={words.hint}
              aria-label={words.name}
              aria-controls={`${id}-list`}
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="go"
            />
            <kbd aria-hidden="true" className="cm-key cm-esc">
              Esc
            </kbd>
          </div>
          <div ref={list} id={`${id}-list`} tabIndex={-1} className="cm-list">
            {GROUPS.map((group) => {
              const its = shown.filter((it) => it.group === group);
              if (!its.length) return null;
              return (
                <div key={group} role="group" aria-labelledby={`${id}-${group}`}>
                  <h2 id={`${id}-${group}`} className="cm-group label">
                    {heading[group]}
                  </h2>
                  <ul>
                    {its.map((it) => (
                      <li key={it.key}>{item(it)}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {shown.length ? null : <p className="cm-none">{words.none}</p>}
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? words.copied : shown.length ? '' : words.none}
      </p>
    </dialog>
  );
}
