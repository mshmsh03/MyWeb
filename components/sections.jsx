import Link from 'next/link';
import { EMAIL, PHONE_HREF, SHOTS, WHATSAPP_HREF, asset, pagePath } from '@/lib/site-data';
import { STOCK, serial } from '@/lib/jobs';
import Reveal from './Reveal';

// The site's vocabulary. Everything a page is made of is one of the things a
// job-ticket book has: the ground the book lies on, a sheet of paper, the
// labels the printer put on it, the rules to write along, the number stamped
// in its corner. The files in app/[lang]/_pages/ arrange these and nothing
// else; the words come from app/[lang]/_content/.

// ---------- Links and marks ----------

// One anchor for every destination. mailto:, tel:, and off-site links have
// nothing for the client router to do; everything else goes through next/link
// so it picks up the basePath.
export function Anchor({ href, className, children, ...rest }) {
  if (/^(mailto:|tel:|https?:|#)/.test(href)) {
    return (
      <a
        href={href}
        className={className}
        {...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

// The site's two icons, drawn at one weight. They point the way the script is
// read, so both are mirrored under RTL.
const ICONS = {
  arrow: 'M3 8h10M9 4l4 4-4 4',
  out: 'M6 3h7v7M13 3 4.5 11.5',
};

export function Icon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`inline-block shrink-0 rtl:-scale-x-100 ${className}`}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

// `ink` and `canary` are the one filled action on paper and on the ground;
// `paper` is the quieter outline beside an ink button.
const BUTTON_TONES = {
  ink: 'bg-ink text-sheet hover:bg-form',
  canary: 'bg-canary text-ink hover:bg-sheet',
  paper: 'border border-ink/40 text-ink hover:border-ink hover:bg-ink/5',
};

export function Button({ href, tone = 'ink', children, ...rest }) {
  return (
    <Anchor
      href={href}
      className={`inline-flex min-h-11 items-center gap-2 rounded-paper px-5 py-2 text-[0.95rem] leading-tight font-semibold transition-colors ${BUTTON_TONES[tone]}`}
      {...rest}
    >
      {children}
    </Anchor>
  );
}

export function ButtonRow({ className = '', children }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className}`}>{children}</div>;
}

// A link inside a sentence or on its own line: underlined in the printer's
// blue on paper, in canary on the ground.
export function TextLink({ href, ground = false, className = '', children }) {
  return (
    <Anchor
      href={href}
      className={`inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 transition-colors ${
        ground ? 'decoration-canary hover:text-canary' : 'decoration-form hover:text-form'
      } ${className}`}
    >
      {children}
    </Anchor>
  );
}

// ---------- The ground ----------

export function Band({ id, className = '', children }) {
  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

// Headings on the ground are set like the header printed across the top of a
// ticket book: the wide cut of the face, heavy. Arabic and Kurdish take the
// kufi through .display and need more leading than Latin capitals do.
export function PageTitle({ children }) {
  return (
    <h1 className="display wd-wide m-fade mb-5 text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.015em] rtl:leading-[1.4] rtl:tracking-normal">
      {children}
    </h1>
  );
}

export function Heading({ children }) {
  return (
    <h2 className="display wd-wide mb-7 text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.015em] rtl:leading-[1.45] rtl:tracking-normal">
      {children}
    </h2>
  );
}

export function SubHeading({ children }) {
  return (
    <h2 className="display wd-wide mb-5 text-xl leading-tight font-bold rtl:leading-[1.5]">{children}</h2>
  );
}

export function Lead({ className = '', children }) {
  return <p className={`m-0 max-w-[60ch] text-[1.05rem] text-ground-dim ${className}`}>{children}</p>;
}

// A ruled list written straight on the ground: a name on one side, a sentence
// about it on the other. Used where the content is a short set of parallel
// things and a row of identical cards would say nothing more. The two sides
// sit side by side only when the list itself is wide enough — it is a
// container, so the same list stacks in a narrow column on a wide screen.
export function RuledList({ children }) {
  return (
    <Reveal as="dl" stagger className="@container m-0 border-t border-carbon-line">
      {children}
    </Reveal>
  );
}

export function RuledRow({ term, children }) {
  return (
    <div className="grid gap-x-10 gap-y-1.5 border-b border-carbon-line py-5 @2xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <dt className="display wd-wide text-[1.15rem] leading-snug font-bold rtl:leading-[1.6]">{term}</dt>
      <dd className="m-0 max-w-[60ch] text-ground-dim">{children}</dd>
    </div>
  );
}

// ---------- Paper ----------

const STOCKS = { sheet: 'bg-sheet', canary: 'bg-canary', pink: 'bg-pink' };

// A sheet of paper lying on the ground. `perforated` gives it the row of
// punched holes it was torn along. Everything on a sheet is written in ink,
// and .on-paper switches the focus ring to match.
export function Sheet({ stock = 'sheet', perforated = false, className = '', children }) {
  return (
    <div
      className={`on-paper relative rounded-paper text-ink shadow-sheet ${STOCKS[stock]} ${
        perforated ? 'perforated pt-8' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

// What the printer put on the sheet: small condensed capitals in form blue.
// Arabic and Kurdish have no capitals and must not be letter-spaced — tracking
// pulls joined script apart — so they are set a little larger instead.
export function FieldLabel({ as: Tag = 'span', id, className = '', children }) {
  return (
    <Tag
      id={id}
      className={`wd-cond text-[0.78rem] leading-tight font-semibold tracking-[0.09em] whitespace-nowrap text-form uppercase rtl:text-[0.82rem] rtl:tracking-normal ${className}`}
    >
      {children}
    </Tag>
  );
}

// The ticket number, the way a numbering machine leaves it: red, and never
// small — the red only reads on the coloured stocks at this size.
export function Serial({ no, label }) {
  return (
    <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
      <FieldLabel>{label}</FieldLabel>
      <span className="ltr-fixed wd-wide text-[1.4rem] leading-none font-bold text-serial">{serial(no)}</span>
    </span>
  );
}

// Label/value rows written along ruled lines. The labels share one column
// whatever their length, so the values line up down the sheet in any language.
export function Fields({ className = '', children }) {
  return (
    <dl className={`m-0 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-5 border-t border-ink/25 ${className}`}>
      {children}
    </dl>
  );
}

export function Field({ label, children }) {
  return (
    <div className="col-span-2 grid grid-cols-subgrid items-baseline border-b border-ink/25 py-2.5">
      <dt>
        <FieldLabel>{label}</FieldLabel>
      </dt>
      <dd className="m-0 min-w-0">{children}</dd>
    </div>
  );
}

export function Shot({ shot, alt, caption, ground = false }) {
  return (
    <figure className="m-0">
      <img
        src={asset(shot.src)}
        width={shot.width}
        height={shot.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`block h-auto w-full rounded-paper ${ground ? 'shadow-sheet' : 'border border-ink/20'}`}
      />
      {caption ? (
        <figcaption className={`mt-2.5 text-[0.85rem] ${ground ? 'text-ground-dim' : 'text-ink-soft'}`}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// A picture and the words about it, side by side while there is room.
export function Split({ media, top = false, children }) {
  return (
    <Reveal as="div" className={`flex flex-wrap gap-x-12 gap-y-7 ${top ? 'items-start' : 'items-center'}`}>
      <div className="min-w-0 flex-[1_1_460px]">{media}</div>
      <div className="min-w-0 flex-[1_1_300px]">{children}</div>
    </Reveal>
  );
}

// ---------- Tickets ----------

export function TicketStack({ children }) {
  return (
    <Reveal as="div" stagger className="grid gap-6">
      {children}
    </Reveal>
  );
}

// A client or product name. Names written in Latin on their own material stay
// in the Latin face, and LTR, inside an Arabic or Kurdish heading.
function Name({ children }) {
  return /^[ -~]+$/.test(children) ? <span className="ltr-fixed">{children}</span> : children;
}

// One piece of work with something to show, written up as a ticket: the name,
// the job and what was done on one half, the screenshot on the other. Every
// job on the site is written up the same way — a website, a till, a business
// card — which is the point: whatever the job, it is taken on the same way.
//
// `job` is the entry from lib/jobs.js and `t` is the page's copy. The link's
// hit area is stretched over the whole sheet, so the ticket is one target
// rather than several.
export function JobCard({ job, t, lang }) {
  const c = t.jobs[job.id];
  const shot = SHOTS[job.shots?.[lang] ?? job.shot];
  const href = job.href ?? (job.page ? pagePath(lang, job.page) : null);

  return (
    <Sheet
      stock={STOCK[job.kind]}
      className={`p-5 sm:p-7 ${
        href
          ? 'transition-[transform,box-shadow] duration-300 has-[a:hover]:shadow-lift motion-safe:has-[a:hover]:-translate-y-1'
          : ''
      }`}
    >
      {/* The name and the number run across the whole sheet, above both
          halves, so the number sits in the sheet's corner on every ticket. */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="display wd-wide m-0 text-[clamp(1.35rem,2.2vw,1.7rem)] leading-[1.15] font-extrabold tracking-[-0.01em] rtl:leading-[1.5] rtl:tracking-normal">
          <Name>{c.name}</Name>
        </h3>
        <Serial no={job.no} label={t.no} />
      </div>
      <div className="grid items-start gap-x-9 gap-y-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
        <div>
          <Fields>
            <Field label={t.fields.job}>
              <span className="font-semibold">{c.job}</span>
            </Field>
            <Field label={t.fields.done}>
              <span className="text-ink-soft">{c.done}</span>
            </Field>
          </Fields>
          {href ? (
            <TextLink href={href} className="mt-2 after:absolute after:inset-0">
              {job.domain ? <span className="ltr-fixed">{job.domain}</span> : t.more}
              <Icon name={job.domain ? 'out' : 'arrow'} />
            </TextLink>
          ) : null}
        </div>
        <Shot shot={shot} alt={c.alt} />
      </div>
    </Sheet>
  );
}

// Work with no picture yet, entered as lines on one sheet the way a ledger
// page lists them: who it was for and what the job was, what was done, and
// the ticket number. One sheet, however many lines — a grid of small tickets
// that say nothing a line does not would only take more room.
export function JobRows({ jobs, t, stock }) {
  return (
    <Reveal as="div">
      <Sheet stock={stock} className="px-5 py-1 sm:px-7">
        <ul className="m-0 list-none p-0">
          {jobs.map((job) => {
            const c = t.jobs[job.id];
            return (
              <li
                key={job.id}
                className="grid gap-x-9 gap-y-1.5 border-b border-ink/25 py-4 last:border-b-0 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_auto] md:items-baseline"
              >
                <div>
                  <h3 className="display wd-wide m-0 text-[1.15rem] leading-snug font-extrabold rtl:leading-[1.6]">
                    <Name>{c.name}</Name>
                  </h3>
                  <p className="m-0 font-semibold">{c.job}</p>
                </div>
                <p className="m-0 max-w-[58ch] text-ink-soft">{c.done}</p>
                <div className="order-first justify-self-end md:order-none">
                  <Serial no={job.no} label={t.no} />
                </div>
              </li>
            );
          })}
        </ul>
      </Sheet>
    </Reveal>
  );
}

// The close of every page: the next ticket in the book is the visitor's. It is
// the one place a stock is used at full size — a canary sheet the width of the
// page, with its row of holes along the top where it tears off. `href` is
// where the ticket itself is: the top of the home page, or the contact page
// from anywhere else.
export function NextTicket({ t, href }) {
  return (
    <section className="on-paper perforated mt-8 bg-canary pt-14 pb-14 text-ink sm:pt-16 sm:pb-16">
      <div className="wrap">
        <h2 className="display wd-wide m-0 mb-7 text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.05] font-black tracking-[-0.02em] rtl:leading-[1.4] rtl:tracking-normal">
          {t.next.heading}
        </h2>
        <ButtonRow>
          <Button href={href}>
            {t.next.start}
            <Icon name="arrow" />
          </Button>
          <Button href={WHATSAPP_HREF} tone="paper">
            {t.next.whatsapp}
          </Button>
          <Button href={`mailto:${EMAIL}`} tone="paper">
            {t.next.email}
          </Button>
          <Button href={PHONE_HREF} tone="paper">
            {t.next.call}
          </Button>
        </ButtonRow>
      </div>
    </section>
  );
}

export { Reveal };
