'use client';

import { useId, useState } from 'react';
import { EMAIL, NAME, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '@/lib/site-data';
import { NEXT_NO } from '@/lib/jobs';
import { Button, FieldLabel, Icon, Serial, Sheet, TextLink } from './sections';

// The next ticket in the book, made out to the visitor. They say who they
// are, tick what they need, add a line — and what they wrote comes through on
// the canary copy underneath as the message that will be sent. Send hands that
// message to their own WhatsApp (or mail app), addressed to Mustafa. The site
// sends and keeps nothing itself.
//
// It works with no JavaScript too. The fields are then just fields, and the
// send links open an empty chat or an empty email.
//
// `t` is the ticket's copy; `children` is whatever is printed across the top
// of the sheet (on the home page, the name and what he does).

function compose(t, name, picked, details) {
  const lines = [t.message.hello];
  if (name.trim()) lines.push(`${t.message.from} ${name.trim()}.`);
  if (picked.length) lines.push(`${t.message.need} ${picked.map((k) => t.jobs[k]).join(t.message.join)}.`);
  if (details.trim()) lines.push(details.trim());
  return lines.join('\n');
}

const INPUT = 'w-full min-w-0 border-0 bg-transparent py-1 text-ink placeholder:text-ink-soft focus:outline-none';

// The row a field sits on. The ruled line under it is the field's edge, so it
// is the line — not a box around the input — that shows where focus is: it
// thickens and turns the printer's blue.
const ROW =
  'col-span-2 grid grid-cols-subgrid items-center border-b border-ink/30 py-3 transition-shadow focus-within:border-form focus-within:shadow-[inset_0_-2px_0_var(--color-form)]';

export default function JobTicket({ t, children }) {
  const [name, setName] = useState('');
  const [picked, setPicked] = useState([]);
  const [details, setDetails] = useState('');
  const id = useId();

  const toggle = (key) =>
    setPicked((now) => (now.includes(key) ? now.filter((k) => k !== key) : [...now, key]));

  const touched = name.trim() || picked.length || details.trim();
  const message = compose(t, name, picked, details);
  const whatsapp = touched ? `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}` : WHATSAPP_HREF;
  const mail = touched
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(message)}`
    : `mailto:${EMAIL}`;

  return (
    <div className="relative">
      {/* The pink copy at the bottom of the set, turned a little so its
          corners show. Decoration only. */}
      <div
        aria-hidden="true"
        className="copy-under perforated absolute inset-0 rounded-paper bg-pink shadow-sheet [--fan:translateY(14px)_rotate(-1.1deg)]"
      />

      <Sheet perforated className="m-feed z-10 px-5 pb-7 sm:px-9 sm:pb-9">
        <div className="flex items-baseline justify-end gap-2.5">
          <FieldLabel>{t.title}</FieldLabel>
          <Serial no={NEXT_NO} label={t.no} />
        </div>

        {children}

        <div className="mt-5 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-5 border-t border-ink/30">
          <label className={ROW}>
            <FieldLabel>{t.customer}</FieldLabel>
            <input
              type="text"
              name="customer"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.customerHint}
              className={INPUT}
            />
          </label>

          <div role="group" aria-labelledby={`${id}-job`} className={`${ROW} !items-start`}>
            <FieldLabel id={`${id}-job`} className="pt-3">
              {t.job}
            </FieldLabel>
            <div className="flex flex-wrap gap-x-7">
              {Object.keys(t.jobs).map((key) => (
                <label key={key} className="inline-flex min-h-11 cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="job"
                    value={key}
                    checked={picked.includes(key)}
                    onChange={() => toggle(key)}
                    className="peer sr-only"
                  />
                  {/* The box is the printer's; the cross in it is the pen's. */}
                  <span className="tick-box grid size-6 shrink-0 place-items-center rounded-[2px] border-2 border-form peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-form">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5 text-ink"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path className="pen-stroke" d="M5 5 19 19" />
                      <path className="pen-stroke" d="M19 5 5 19" />
                    </svg>
                  </span>
                  <span>{t.jobs[key]}</span>
                </label>
              ))}
            </div>
          </div>

          <label className={`${ROW} !items-start`}>
            <FieldLabel className="pt-2">{t.details}</FieldLabel>
            {/* Two lines to start with, and it grows with what is written where
                the browser supports field-sizing. */}
            <textarea
              name="details"
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={t.detailsHint}
              className={`${INPUT} field-sizing-content resize-none`}
            />
          </label>

          <div className="col-span-2 grid grid-cols-subgrid items-baseline border-b border-ink/30 py-3">
            <FieldLabel>{t.takenBy}</FieldLabel>
            {/* justify-self keeps the name beside its label in RTL, where a
                stretched LTR box would push it to the far edge. */}
            <span className="ltr-fixed justify-self-start font-semibold">{NAME}</span>
          </div>
        </div>
      </Sheet>

      {/* The canary copy, pulled out from under the top sheet. What was written
          above comes through here in carbon blue, as the message that will be
          sent — so the visitor reads it before they send it. */}
      <div className="m-feed relative mx-3 -mt-2 [--m-delay:160ms] sm:mx-8">
        <div className="on-paper rotate-[0.5deg] rounded-paper bg-canary px-5 pt-7 pb-5 text-ink shadow-sheet sm:px-8 rtl:-rotate-[0.5deg]">
          <p
            role="group"
            aria-label={t.copyLabel}
            className={`m-0 max-w-[62ch] whitespace-pre-line ${touched ? 'font-medium text-form' : 'text-ink-soft'}`}
          >
            {touched ? message : t.blank}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Button href={whatsapp}>
              {t.send}
              <Icon name="arrow" />
            </Button>
            <TextLink href={mail}>{t.email}</TextLink>
            <TextLink href={PHONE_HREF}>
              {t.call} <span className="ltr-fixed font-normal">{PHONE_DISPLAY}</span>
            </TextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
