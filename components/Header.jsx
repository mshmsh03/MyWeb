'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND, LANGS, PAGES, SITE, pagePath } from '../lib/site-data';

// The header lives in the layout, not in each page, so client-side navigation
// leaves it mounted — it reads the active page from the URL rather than taking
// it as a prop. Routes are /<lang>/ and /<lang>/<page>/; next/link puts the
// GitHub Pages basePath in front, so usePathname() returns it too and has to be
// matched loosely rather than anchored at the string start.
function pageFromPathname(pathname) {
  const match = /\/[a-z]{2}\/([a-z]+)\/?$/.exec(pathname);
  return match && PAGES.includes(match[1]) ? match[1] : 'index';
}

// The nav underline grows in from the inline start rather than appearing — the
// same "typing in" motion as the hero, at a smaller scale. It is drawn with a
// scaled pseudo-element so it stays off the layout path, and its origin flips
// for Arabic and Kurdish.
const UNDERLINE =
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:content-[''] rtl:after:origin-right";

export default function Header({ lang }) {
  const t = SITE[lang];
  const pathname = usePathname();
  const page = pageFromPathname(pathname);

  return (
    <header className="sticky top-0 z-100 border-b border-line bg-bg/95 py-3.5 supports-[backdrop-filter]:backdrop-blur-[4px]">
      <div className="wrap flex flex-wrap items-center justify-between gap-4">
        {/* The wordmark is a shell prompt, so it stays mono and LTR in every
            language — and the @ pulses like a connection indicator. */}
        <Link href={pagePath(lang, 'index')} className="ltr-fixed text-sm font-bold text-bright hover:no-underline">
          {BRAND.split('@')[0]}
          <span className="m-pulse text-accent">@</span>
          {BRAND.split('@')[1]}
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <nav className="flex flex-wrap items-center gap-x-5">
            {PAGES.map((p) => {
              const active = p === page;
              return (
                <Link
                  key={p}
                  href={pagePath(lang, p)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative pb-0.5 text-[13px] transition-colors hover:no-underline ${UNDERLINE} ${
                    active ? 'text-accent after:scale-x-100' : 'text-fg-dim hover:text-accent hover:after:scale-x-100'
                  }`}
                >
                  {t.nav[p]}
                </Link>
              );
            })}
          </nav>

          {/* Language is a setting, so it is set the way a shell sets one.
              Each option links to the same page in that language, which is
              what makes all three indexable. */}
          <div className="ltr-fixed flex items-center text-[13px] text-fg-dim">
            <span aria-hidden="true" className="text-accent-dim">
              lang=
            </span>
            {LANGS.map((l, i) => (
              <span key={l}>
                {i > 0 ? <span aria-hidden="true">|</span> : null}
                <Link
                  href={pagePath(l, page)}
                  lang={SITE[l].hreflang}
                  aria-current={l === lang ? 'true' : undefined}
                  aria-label={`${t.langSwitchLabel}: ${SITE[l].langName}`}
                  className={`transition-colors hover:no-underline ${
                    l === lang ? 'text-accent' : 'text-fg-dim hover:text-accent'
                  }`}
                >
                  {SITE[l].langName}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
