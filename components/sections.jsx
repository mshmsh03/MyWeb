import Link from 'next/link';
import { asset } from '@/lib/site-data';

// The site's vocabulary for pages on the bench. Everything a page is made of
// is printed on the mat (headings, text, ruled rows, links) or is a device
// standing on it (a browser window, a screen). The files in
// app/[lang]/_pages/ arrange these; the words come from app/[lang]/_content/.

// ---------- Links and marks ----------

// One anchor for every destination. mailto:, tel:, in-page and off-site links
// have nothing for the client router to do; everything else goes through
// next/link so it picks up the basePath. Nothing is prefetched: a prefetch
// fetches the other page's first-screen pictures and styles too, on a
// visitor's phone data, for a page they may never open. The pages are small
// static files and arrive quickly on the click.
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
    <Link href={href} prefetch={false} className={className} {...rest}>
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

// `signal` is the one filled action in a group; `outline` is the quieter one
// beside it.
const BUTTON_TONES = {
  signal: 'bg-signal text-graphite hover:bg-[#ff8a5c]',
  outline: 'border border-chalk-dim/60 text-chalk hover:border-chalk',
};

export function Button({ href, tone = 'signal', className = '', children, ...rest }) {
  return (
    <Anchor
      href={href}
      className={`inline-flex min-h-12 items-center gap-2 rounded-part px-5 font-semibold transition-colors ${BUTTON_TONES[tone]} ${className}`}
      {...rest}
    >
      {children}
    </Anchor>
  );
}

// A link on its own line or inside a sentence: underlined in ruler yellow on
// the mat, in graphite on a light screen.
export function TextLink({ href, screen = false, className = '', children, ...rest }) {
  return (
    <Anchor
      href={href}
      className={`inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 transition-colors ${
        screen ? 'decoration-graphite/40 hover:decoration-graphite' : 'decoration-ruler hover:text-ruler'
      } ${className}`}
      {...rest}
    >
      {children}
    </Anchor>
  );
}

// A client or product name written in Latin stays in the Latin face, and
// left-to-right, inside an Arabic or Kurdish line.
export function Name({ children }) {
  return /^[ -~]+$/.test(children) ? <span className="ltr-fixed">{children}</span> : children;
}

// ---------- The mat ----------

// A band of the page. Bands after the first are divided by a hairline, the
// way the mat's heavier lines divide it. The padding is two cells on a phone
// and four above, the same on every page (BAND), and the band is a whole
// number of cells tall (globals.css), so the hairline lies on a grid line.
// The hairline is painted over the band's top edge (RULE_TOP) rather than
// being a border, which would push everything in the band a pixel off the
// grid.
export const BAND = 'py-12 sm:py-24';
export const RULE_TOP = 'shadow-[inset_0_1px_0_var(--color-mat-line)]';

export function Band({ id, rule = true, className = '', children }) {
  return (
    <section id={id} className={`${BAND} ${rule ? RULE_TOP : ''} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

const DISPLAY = 'display wd-display m-0 font-extrabold rtl:tracking-normal';

export function PageTitle({ children }) {
  return (
    <h1 className={`${DISPLAY} text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.98] tracking-[-0.02em] rtl:leading-[1.35]`}>
      {children}
    </h1>
  );
}

// Headings are a whole number of cells tall, so a ruled list a cell or two
// under one starts on a grid line.
export function Heading({ id, children }) {
  return (
    <h2
      id={id}
      className={`${DISPLAY} on-grid text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] tracking-[-0.015em] rtl:leading-[1.45]`}
    >
      {children}
    </h2>
  );
}

export function SubHeading({ children }) {
  return (
    <h2 className={`${DISPLAY} on-grid text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.1] tracking-[-0.01em] rtl:leading-[1.5]`}>
      {children}
    </h2>
  );
}

export function Lead({ className = '', children }) {
  return <p className={`m-0 max-w-[60ch] text-[1.1rem] text-chalk-dim ${className}`}>{children}</p>;
}

// A ruled list printed on the mat: a name on one side, a sentence about it on
// the other. The two sides sit side by side only when the list itself is
// wide enough; it is a container, so the same list stacks in a narrow column.
//
// Each row is a whole number of cells tall with its text centred in it, and
// draws the rule above itself; the list draws the last one just below its
// bottom edge. So every rule falls exactly on a grid line and picks it out.
// RULED and RULE_ROW are shared with the other ruled lists of the site.
//
// A list that shares its rows with a neighbour through subgrid cannot be a
// container (containment makes it lay out on its own), so it passes
// `contained={false}` and its rows stay stacked.
export const RULED = 'm-0 shadow-[0_1px_0_var(--color-mat-line)]';
export const RULE_ROW = 'on-grid content-center border-t border-mat-line py-4';

export function RuledList({ contained = true, className = '', children }) {
  return (
    <dl className={`${contained ? '@container' : ''} ${RULED} ${className}`}>
      {children}
    </dl>
  );
}

export function RuledRow({ term, children }) {
  return (
    <div className={`grid gap-x-10 gap-y-1 ${RULE_ROW} @2xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] @2xl:items-baseline`}>
      <dt className="display wd-wide text-[1.1rem] leading-snug font-bold rtl:leading-[1.6]">{term}</dt>
      <dd className="m-0 max-w-[60ch] text-chalk-dim">{children}</dd>
    </div>
  );
}

// ---------- Devices on the mat ----------

const DEVICE_SHADOW = 'shadow-[0_22px_36px_-14px_rgb(3_18_13/0.75)]';

// The attributes of a screenshot's <img>. `copies` are [file, width] pairs of
// the same picture, offered with the original for the browser to choose from
// by `sizes`. A `first` picture is the largest thing on the first screen, so
// it is fetched at once and ahead of everything else rather than lazily.
function shotProps({ src, width, height, alt, copies, sizes, first }) {
  return {
    src: asset(src),
    srcSet: copies
      ? [...copies.map(([file, w]) => `${asset(`/assets/work/${file}`)} ${w}w`), `${asset(src)} ${width}w`].join(', ')
      : undefined,
    sizes: copies ? sizes : undefined,
    width,
    height,
    alt,
    loading: first ? 'eager' : 'lazy',
    fetchPriority: first ? 'high' : undefined,
    decoding: 'async',
  };
}

// A browser window showing a screenshot of a site: the address in its bar.
export function BrowserFrame({ address, className = '', ...shot }) {
  return (
    <figure className={`on-screen m-0 overflow-hidden rounded-part bg-screen text-graphite ${DEVICE_SHADOW} ${className}`}>
      <div className="flex items-center gap-1.5 bg-[#e6ebe7] px-3 py-2" aria-hidden="true">
        <i className="size-2 rounded-full bg-[#b9c3be]" />
        <i className="size-2 rounded-full bg-[#b9c3be]" />
        <i className="size-2 rounded-full bg-[#b9c3be]" />
        <span className="ltr-fixed ms-3 min-w-0 truncate rounded-full bg-screen px-3 py-0.5 text-[0.8rem] text-graphite-soft">
          {address}
        </span>
      </div>
      <img {...shotProps(shot)} className="block h-auto w-full" />
    </figure>
  );
}

// A device's screen: a graphite bezel round a screenshot of software. A
// `frame` screen is the one that travels to the software's own page
// (PageMorph).
export function DeviceScreen({ caption, frame = false, className = '', ...shot }) {
  return (
    <figure className={`m-0 ${className}`}>
      <div data-frame={frame || undefined} className={`rounded-[10px] bg-graphite p-2 sm:p-2.5 ${DEVICE_SHADOW}`}>
        <img {...shotProps(shot)} className="block h-auto w-full rounded-[3px]" />
      </div>
      {caption ? <figcaption className="mt-3 text-[0.95rem] text-chalk-dim">{caption}</figcaption> : null}
    </figure>
  );
}
