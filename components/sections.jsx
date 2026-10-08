import Link from 'next/link';
import { asset } from '@/lib/site-data';
import Reveal from './Reveal';

// The site's vocabulary, one component per class from the pre-Next stylesheet
// (.section-title, .service-card, .card, .btn, .contact-list, …), so the files
// in app/[lang]/_content/ hold copy and nothing else.

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-11 sm:py-16 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

// Both of the site's labels — the section headings and the subpage header —
// are introduced the way a comment introduces a block of code. The `//` is
// decoration, so it is generated rather than typed into the copy, and it stays
// in the mono face in Arabic and Kurdish where the label beside it does not.
// The tracking is for Latin capitals only: letter-spacing pulls joined Arabic
// script apart, so the RTL languages set the label at its natural spacing.
function CommentLabel({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag className={`text-xs font-normal tracking-[.12em] text-fg-dim uppercase rtl:tracking-normal ${className}`}>
      <span aria-hidden="true" className="mono text-accent-dim">
        //{' '}
      </span>
      {children}
    </Tag>
  );
}

export function SectionTitle({ children }) {
  return (
    <CommentLabel as="h2" className="mb-6">
      {children}
    </CommentLabel>
  );
}

// The subpage header. Deliberately just the section label — the page's real
// title is the browser tab; repeating it as a display <h1> would be the same
// words twice on a page this short. It takes the body leading rather than the
// tighter one text-xs implies, so a wrapped Arabic heading stays readable.
export function PageHeader({ children }) {
  return (
    <section className="pt-11 pb-2 sm:pt-16">
      <div className="wrap">
        <CommentLabel as="h1" className="m-fade leading-[1.7]">
          {children}
        </CommentLabel>
      </div>
    </section>
  );
}

// The sentence that opens a page. The column is wide enough for screenshots
// now, so prose caps its own measure instead of running the full width.
export function Lead({ children }) {
  return <p className="m-0 max-w-[640px]">{children}</p>;
}

// The hero is the one place with two columns of text: who he is, and a few
// facts beside it. The facts drop under the name when there is no room.
export function Hero({ aside, children }) {
  return (
    <div className="flex flex-wrap items-end gap-x-14 gap-y-10">
      <div className="min-w-0 flex-[1_1_520px]">{children}</div>
      {aside}
    </div>
  );
}

// A few facts set like the output of a status command. The keys are machine
// strings — mono and LTR in every language, the same way the About page's
// /* notes */ are — and only the values are translated.
export function StatusPanel({ children }) {
  return (
    <div className="m-fade w-full max-w-[420px] min-w-0 flex-[1_1_340px] rounded-md border border-line bg-panel px-5.5 py-5">
      <div className="mono mb-3.5 text-[13px] text-accent-dim">status</div>
      <dl className="m-0 flex flex-col gap-2.5 text-[13.5px]">{children}</dl>
    </div>
  );
}

export function StatusRow({ label, children }) {
  return (
    <div className="flex gap-3.5">
      <dt className="ltr-fixed w-[82px] shrink-0 text-fg-dim rtl:text-right">{label}</dt>
      <dd className="m-0">{children}</dd>
    </div>
  );
}

export function Prompt({ children }) {
  return <div className="mono mb-3.5 min-h-[1em] text-[13px] text-accent-dim">{children}</div>;
}

export function Role({ children }) {
  return <div className="mb-5 text-base text-amber">{children}</div>;
}

export function Tagline({ children }) {
  return <p className="mb-7 max-w-[600px]">{children}</p>;
}

export function ButtonRow({ className = '', children }) {
  return <div className={`flex flex-wrap gap-3 ${className}`}>{children}</div>;
}

// One anchor for every destination. mailto:, tel:, and off-site links have
// nothing for the client router to do; everything else goes through next/link
// so it picks up the basePath.
function Anchor({ href, className, children }) {
  if (/^(mailto:|tel:|https?:)/.test(href)) {
    return (
      <a href={href} className={className} {...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// Directional glyphs point the way the script is read, so they are mirrored
// under rtl: rather than left pointing back at the margin.
function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
      →
    </span>
  );
}

// A bordered, not filled, button — the accent is spent on the outline and the
// text, so a row of them stays quiet until hovered. `ghost` is the secondary
// pairing: the same shape in the neutral rule colour.
const BUTTON_TONES = {
  accent: 'border-accent-dim text-accent hover:bg-accent-dim hover:text-bg motion-safe:hover:-translate-y-0.5',
  ghost: 'border-line text-fg-dim hover:border-fg-dim hover:text-fg motion-safe:hover:-translate-y-0.5',
};

export function Button({ href, tone = 'accent', children }) {
  return (
    <Anchor
      href={href}
      className={`inline-block rounded border px-4 py-2.5 text-[13px] transition hover:no-underline ${BUTTON_TONES[tone]}`}
    >
      {children}
    </Anchor>
  );
}

// The one surface in the system: a panel a step lighter than the page, flat at
// rest, that answers a hover with the accent border and the lift.
const CARD =
  'rounded-md border border-line bg-panel transition-[border-color,transform,box-shadow] duration-200 hover:border-accent-dim motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lift';

export function ServicesGrid({ children }) {
  return (
    <Reveal as="div" stagger className="mb-8 grid gap-4.5 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
      {children}
    </Reveal>
  );
}

// The ▸ marker is generated rather than typed, so it stays a bullet the copy
// does not have to carry, and it moves to the reading start on its own when the
// layout flips to RTL.
export function ServiceCard({ title, children }) {
  return (
    <div className={`${CARD} p-5`}>
      <div className="mb-2 font-bold text-bright">
        <span aria-hidden="true" className="mono inline-block text-accent-dim rtl:-scale-x-100">
          ▸
        </span>{' '}
        {title}
      </div>
      <p className="m-0 text-[13.5px] text-fg-dim">{children}</p>
    </div>
  );
}

export function CtaRow({ text, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3.5 pt-2">
      <p className="m-0">{text}</p>
      {children}
    </div>
  );
}

export function AboutList({ children }) {
  return (
    <Reveal as="div" stagger className="mb-8 grid gap-4.5">
      {children}
    </Reveal>
  );
}

// The C-style annotation stays in the mono face and stays LTR even in Arabic
// and Kurdish: it is a code comment, and reordering `/* why */` by the bidi
// algorithm would turn it into `*/ why /*`.
export function AboutItem({ note, children }) {
  return (
    <p className="m-0 max-w-[640px]">
      <span className="ltr-fixed text-fg-dim">/* {note} */</span>{' '}
      {children}
    </p>
  );
}

export function Card({ className = '', children }) {
  return <div className={`${CARD} p-5.5 ${className}`}>{children}</div>;
}

export function SiteGrid({ children }) {
  return (
    <Reveal as="div" stagger className="grid gap-4.5 sm:grid-cols-2">
      {children}
    </Reveal>
  );
}

// Work that can be shown is shown. The whole card is the link, so the picture,
// the name and the address are one target rather than three. `domain` is a
// machine string and stays mono and LTR; `more` is a sentence and is translated.
// `wide` lays the card on its side across both columns, for a piece of work
// that has the row to itself.
export function SiteCard({ href, shot, alt, title, domain, more, wide = false, children }) {
  return (
    <Anchor
      href={href}
      className={`${CARD} flex flex-col overflow-hidden text-fg hover:no-underline ${wide ? 'sm:col-span-2 sm:flex-row sm:items-center' : ''}`}
    >
      <img
        src={asset(shot.src)}
        width={shot.width}
        height={shot.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`block h-auto w-full border-b border-line ${wide ? 'sm:w-[56%] sm:shrink-0 sm:border-e sm:border-b-0' : ''}`}
      />
      <span className="flex flex-col gap-2 p-5.5">
        <span className="text-base font-bold text-bright">{title}</span>
        <span className="text-[13.5px] text-fg-dim">{children}</span>
        <span className="text-[12.5px] text-accent">
          <Arrow /> {domain ? <span className="ltr-fixed">{domain}</span> : more}
        </span>
      </span>
    </Anchor>
  );
}

// A heading and what sits under it. The Projects page is three of these in one
// section, so they are spaced by the group rather than by section padding.
export function WorkGroup({ title, children }) {
  return (
    <div className="mt-14">
      <SectionTitle>{title}</SectionTitle>
      <div className="flex flex-col gap-4.5">{children}</div>
    </div>
  );
}

// Work without a picture: a ruled list where every entry has the same shape, a
// name and one line about it, the way a directory listing does.
export function WorkList({ children }) {
  return (
    <Reveal as="ul" stagger className="m-0 list-none border-t border-line p-0">
      {children}
    </Reveal>
  );
}

export function WorkRow({ title, href, more, children }) {
  const body = (
    <>
      <span className="block font-bold text-bright">{title}</span>
      <span className="block max-w-[640px] text-[13.5px] text-fg-dim">{children}</span>
    </>
  );
  return (
    <li className="border-b border-line">
      {href ? (
        <Anchor
          href={href}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-1 py-4.5 text-fg hover:no-underline"
        >
          <span className="min-w-0 flex-[1_1_420px]">{body}</span>
          <span className="text-[12.5px] text-accent">
            <Arrow /> {more}
          </span>
        </Anchor>
      ) : (
        <div className="px-1 py-4.5">{body}</div>
      )}
    </li>
  );
}

// Where a nested page sits, printed the way a shell prints a working
// directory. A machine string, so it stays mono and LTR in every language; the
// parent segment is the way back.
export function PathCrumb({ href, parent, leaf }) {
  return (
    <div className="m-fade mb-5">
      <span className="ltr-fixed text-[13px] text-fg-dim">
        <Link href={href} className="inline-block py-2">
          ~/{parent}
        </Link>
        /{leaf}
      </span>
    </div>
  );
}

// Label/value pairs under a rule, for the handful of facts that describe a
// piece of work at a glance.
export function FactList({ children }) {
  return <dl className="my-8 grid gap-x-6 border-y border-line sm:grid-cols-2 lg:grid-cols-4">{children}</dl>;
}

export function Fact({ label, children }) {
  return (
    <div className="py-4">
      <dt className="text-xs tracking-[.12em] text-fg-dim uppercase rtl:tracking-normal">{label}</dt>
      <dd className="m-0 mt-1 text-bright">{children}</dd>
    </div>
  );
}

export function Shot({ shot, alt, caption }) {
  return (
    <figure className="m-0">
      <img
        src={asset(shot.src)}
        width={shot.width}
        height={shot.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-md border border-line"
      />
      {caption ? <figcaption className="mt-2.5 text-[12.5px] text-fg-dim">{caption}</figcaption> : null}
    </figure>
  );
}

// A picture and the words about it, side by side while there is room. `top`
// aligns the two at their first line, for when the words are a list longer
// than the picture is tall.
export function Split({ media, top = false, children }) {
  return (
    <Reveal as="div" className={`flex flex-wrap gap-x-12 gap-y-7 ${top ? 'items-start' : 'items-center'}`}>
      <div className="min-w-0 flex-[1_1_460px]">{media}</div>
      <div className="min-w-0 flex-[1_1_300px]">{children}</div>
    </Reveal>
  );
}

export function Note({ title, children }) {
  return (
    <>
      <p className="m-0 mb-3 text-lg leading-snug font-bold text-bright">{title}</p>
      <p className="m-0 max-w-[420px] text-fg-dim">{children}</p>
    </>
  );
}

// What something contains, one named part per row.
export function SpecList({ children }) {
  return <dl className="m-0 border-t border-line">{children}</dl>;
}

export function SpecRow({ term, children }) {
  return (
    <div className="flex flex-wrap gap-x-4.5 gap-y-0.5 border-b border-line py-3">
      <dt className="w-24 shrink-0 font-bold text-bright">{term}</dt>
      <dd className="m-0 min-w-0 flex-[1_1_240px] text-[13.5px] text-fg-dim">{children}</dd>
    </div>
  );
}

// key/value rows under a rule — the closest thing the site has to a table.
export function ContactList({ children }) {
  return <ul className="mt-0 border-t border-line pt-5">{children}</ul>;
}

export function ContactRow({ label, href, children }) {
  return (
    <li className="mb-2 last:mb-0">
      <span className="inline-block min-w-[90px] text-fg-dim">{label}</span>{' '}
      <a href={href} className="ltr-fixed" {...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener' } : {})}>
        {children}
      </a>
    </li>
  );
}

export { Reveal };
