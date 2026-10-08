import { EMAIL, MOTTO, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site-data';

// The back cover of the book: the motto, and the two ways to reach him that
// work from anywhere. Email and phone are machine strings, so they stay in the
// Latin face and LTR in every language.
export default function Footer() {
  return (
    <footer className="border-t border-carbon-line bg-carbon-deep py-9">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
        <p className="ltr-fixed wd-wide m-0 text-[0.95rem] font-bold">{MOTTO}</p>
        <p className="m-0 flex flex-wrap items-center gap-x-6 text-[0.95rem] text-ground-dim">
          <a href={`mailto:${EMAIL}`} className="ltr-fixed py-2.5 transition-colors hover:text-ground">
            {EMAIL}
          </a>
          <a href={PHONE_HREF} className="ltr-fixed py-2.5 transition-colors hover:text-ground">
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    </footer>
  );
}
