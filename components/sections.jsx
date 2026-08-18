import Link from 'next/link';
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

// Every section is introduced the way a comment introduces a block of code.
// The `//` is decoration, so it is generated rather than typed into the copy —
// and it stays in the mono face in Arabic and Kurdish, where the label beside
// it does not.
export function SectionTitle({ children }) {
  return (
    <div className="mb-6 text-xs tracking-[.12em] text-fg-dim uppercase">
      <span aria-hidden="true" className="mono text-accent-dim">
        //{' '}
      </span>
      {children}
    </div>
  );
}

// The subpage header. Deliberately just the section label — the page's real
// title is the browser tab; repeating it as an <h1> would be the same words
// twice on a page this short.
export function PageHeader({ children }) {
  return (
    <section className="pt-11 pb-2 sm:pt-16">
      <div className="wrap">
        <h1 className="m-fade text-xs tracking-[.12em] text-fg-dim uppercase" style={{ fontSize: '12px', lineHeight: 1.7 }}>
          <span aria-hidden="true" className="mono text-accent-dim">
            //{' '}
          </span>
          {children}
        </h1>
      </div>
    </section>
  );
}

export function Prompt({ children }) {
  return <div className="mono mb-3.5 min-h-[1em] text-[13px] text-accent-dim">{children}</div>;
}

export function Role({ children }) {
  return <div className="mb-5 text-base text-amber">{children}</div>;
}

export function Tagline({ children }) {
  return <p className="mb-7 max-w-[560px] text-fg-dim">{children}</p>;
}

export function ButtonRow({ className = '', children }) {
  return <div className={`flex flex-wrap gap-3 ${className}`}>{children}</div>;
}

// A bordered, not filled, button — the accent is spent on the outline and the
// text, so a row of them stays quiet until hovered. `ghost` is the secondary
// pairing: the same shape in the neutral rule colour.
const BUTTON_TONES = {
  accent: 'border-accent-dim text-accent hover:bg-accent-dim hover:text-bg motion-safe:hover:-translate-y-0.5',
  ghost: 'border-line text-fg-dim hover:border-fg-dim hover:text-fg motion-safe:hover:-translate-y-0.5',
};

export function Button({ href, tone = 'accent', external = false, children }) {
  const className = `inline-block rounded border px-4 py-2.5 text-[13px] transition hover:no-underline ${BUTTON_TONES[tone]}`;
  // mailto:, tel:, and off-site links have nothing for the client router to do.
  if (external || /^(mailto:|tel:|https?:)/.test(href)) {
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
    <div className="rounded-md border border-line bg-panel p-5 transition-[border-color,transform,box-shadow] duration-200 hover:border-accent-dim motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lift">
      <div className="mb-2 font-bold text-bright">
        {/* Directional glyphs point the way the script is read, so they are
            mirrored under rtl: rather than left pointing back at the margin. */}
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

export function CardStack({ children }) {
  return (
    <Reveal as="div" stagger className="flex flex-col gap-4.5">
      {children}
    </Reveal>
  );
}

export function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-md border border-line bg-panel p-5.5 transition-[border-color,transform,box-shadow] duration-200 hover:border-accent-dim motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lift ${className}`}
    >
      {children}
    </div>
  );
}

export function ProjectCard({ title, tag, link, children }) {
  return (
    <Card>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="text-base font-bold text-bright">{title}</div>
        <div className="rounded-[10px] border border-[#3a3120] px-2 py-0.5 text-[11px] whitespace-nowrap text-amber">
          {tag}
        </div>
      </div>
      <p className="mt-2.5 mb-0 text-[13.5px] text-fg-dim">{children}</p>
      {link ? (
        <div className="mt-3.5">
          <a href={link.href} target="_blank" rel="noopener" className="text-[12.5px]">
            <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
              →
            </span>{' '}
            <span className="ltr-fixed">{link.label}</span>
          </a>
        </div>
      ) : null}
    </Card>
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
      <a href={href} className="ltr-fixed">
        {children}
      </a>
    </li>
  );
}

export { Reveal };
