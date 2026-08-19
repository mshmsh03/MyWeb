import { FOOTNOTE } from '@/lib/site-data';

export default function Footer() {
  return (
    <footer className="relative z-1 pt-12 pb-16">
      <div className="wrap">
        {/* The sign-off is a code comment and the site's signature line — it
            stays in the mono face and stays LTR in every language. */}
        <div className="ltr-fixed text-xs text-fg-dim">{FOOTNOTE}</div>
      </div>
    </footer>
  );
}
