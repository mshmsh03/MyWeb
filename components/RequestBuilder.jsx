'use client';

import { useEffect, useId, useState } from 'react';
import { NAME, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site-data';
import { compose, sendLinks } from '@/lib/request';

// The request builder, on every page that asks for work. The visitor says
// what they need, and may add a line and their name; the message is drawn as
// a chat bubble on a phone lying beside the form, exactly as it will be sent,
// and changes with every keystroke. Send hands it to their own WhatsApp (or
// mail app). The site sends and keeps nothing itself.
//
// An exhibit can open it with a need already chosen, and a line already
// written, two ways: a link to #request carrying data-need="pos" (and
// data-detail), or ?need=pos&detail=… in the page address, for a link from
// another page. requestLinkProps() in lib/request.js writes either.
//
// Without JavaScript the fields are plain fields and the send links open an
// empty chat or an empty email.
//
// `t` is the ticket copy (the needs, the field hints, the message wording and
// the send labels); `r` is the builder's own copy.
export default function RequestBuilder({ t, r }) {
  const [name, setName] = useState('');
  const [picked, setPicked] = useState([]);
  const [details, setDetails] = useState('');
  const id = useId();
  const needs = Object.keys(t.jobs);

  useEffect(() => {
    const open = (need, detail) => {
      if (needs.includes(need)) setPicked((now) => (now.includes(need) ? now : [...now, need]));
      if (detail) setDetails(detail);
    };
    const query = new URLSearchParams(window.location.search);
    open(query.get('need'), query.get('detail'));
    const onClick = (e) => {
      const link = e.target.closest?.('a[data-need]');
      if (link) open(link.dataset.need, link.dataset.detail);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
    // `needs` comes from static copy and never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (key) => setPicked((now) => (now.includes(key) ? now.filter((k) => k !== key) : [...now, key]));

  const touched = Boolean(name.trim() || picked.length || details.trim());
  const message = compose(t, name, picked, details);
  const { whatsapp, mail } = sendLinks(message, touched, r.subject);

  return (
    <section id="request" aria-labelledby={`${id}-title`} className="scroll-mt-24 py-16 sm:py-24">
      <div className="wrap grid items-start gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_384px]">
        <div>
          <h2
            id={`${id}-title`}
            tabIndex={-1}
            className="display wd-display m-0 text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.015em] rtl:leading-[1.45] rtl:tracking-normal"
          >
            {r.title}
          </h2>
          <p className="m-0 mt-4 max-w-[58ch] text-chalk-dim">{r.lead}</p>

          <fieldset className="m-0 mt-9 border-0 p-0">
            <legend className="label p-0 text-chalk">{r.need}</legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {needs.map((key) => (
                <label key={key} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="need"
                    value={key}
                    checked={picked.includes(key)}
                    onChange={() => toggle(key)}
                    className="peer sr-only"
                  />
                  {/* Chosen is a signal-orange fill with a tick, so the state
                      never rests on colour alone. */}
                  <span className="inline-flex min-h-12 items-center gap-2 rounded-part border border-chalk-dim/55 px-4 font-medium text-chalk transition-colors peer-checked:border-signal peer-checked:bg-signal peer-checked:text-graphite peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ruler hover:border-chalk peer-checked:[&>svg]:block">
                    <svg viewBox="0 0 16 16" className="hidden size-4" aria-hidden="true">
                      <path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t.jobs[key]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="label text-chalk">{t.customerHint}</span>{' '}
              <span className="text-[0.85rem] text-chalk-dim">({r.optional})</span>
              <input
                type="text"
                name="name"
                dir="auto"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block min-h-12 w-full rounded-part border-0 bg-screen px-3.5 text-graphite"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="label text-chalk">{t.details}</span>{' '}
              <span className="text-[0.85rem] text-chalk-dim">({r.optional})</span>
              <textarea
                name="details"
                dir="auto"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t.detailsHint}
                className="mt-2 block min-h-12 w-full resize-y rounded-part border-0 bg-screen px-3.5 py-3 text-graphite [unicode-bidi:plaintext] placeholder:text-graphite-soft"
              />
            </label>
          </div>
        </div>

        {/* The phone the message will be sent from, lying on the mat. */}
        <div className="mx-auto w-full max-w-[384px] rounded-[34px] bg-graphite p-2.5 shadow-[0_22px_36px_-14px_rgb(3_18_13/0.75)] lg:mt-2">
          <div className="on-screen overflow-hidden rounded-[26px] bg-screen text-graphite">
            <div className="flex items-center gap-3 border-b border-graphite/10 bg-[#ebf0ec] px-4 py-3">
              <span
                aria-hidden="true"
                className="ltr-fixed grid size-10 shrink-0 place-items-center rounded-full bg-mat font-bold text-chalk"
              >
                M
              </span>
              <span className="min-w-0">
                <span className="ltr-fixed block truncate leading-tight font-semibold">{NAME}</span>
                <span className="ltr-fixed block text-[0.9rem] text-graphite-soft">{PHONE_DISPLAY}</span>
              </span>
            </div>

            <div className="flex min-h-[236px] flex-col justify-end px-4 py-5">
              <h3 className="sr-only">{t.copyLabel}</h3>
              {/* Each line of the message takes its own direction, so a line
                  written in Latin inside a Kurdish message reads left to
                  right, as it will in the chat. */}
              {touched ? (
                <p
                  dir="auto"
                  className="m-0 max-w-[88%] self-end rounded-2xl rounded-ee-md bg-bubble px-3.5 py-2.5 leading-normal whitespace-pre-line [overflow-wrap:anywhere] [unicode-bidi:plaintext]"
                >
                  {message}
                </p>
              ) : (
                <p className="m-0 self-center text-center text-[0.95rem] text-graphite-soft">{r.blank}</p>
              )}
            </div>

            <div className="border-t border-graphite/10 px-4 pt-4 pb-5">
              <a
                href={whatsapp}
                className="flex min-h-12 w-full items-center justify-center rounded-part bg-signal px-4 font-semibold text-graphite transition-colors hover:bg-[#ff8a5c]"
              >
                {t.send}
              </a>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5">
                <a href={mail} className="inline-flex min-h-11 items-center font-semibold underline decoration-graphite/40 underline-offset-4 hover:decoration-graphite">
                  {t.email}
                </a>
                <a href={PHONE_HREF} className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-graphite/40 underline-offset-4 hover:decoration-graphite">
                  {t.call} <span className="ltr-fixed font-normal">{PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
