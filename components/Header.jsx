'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND, LANGS, PAGES, SITE, pagePath } from '@/lib/site-data';

// The header lives in the layout, not in each page, so client-side navigation
// leaves it mounted — it reads the route from the URL rather than taking it as
// a prop. Routes are /<lang>/, /<lang>/<page>/ and /<lang>/<page>/<sub>/.
// `section` is the nav entry the route belongs to; `path` is the whole route
// under the language, so the language switch lands on the same page rather
// than on its parent. next/link puts the GitHub Pages basePath in front and
// usePathname() can return it too, so the language segment is found rather
// than assumed to come first.
function routeFromPathname(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  const rest = parts.slice(parts.findIndex((p) => LANGS.includes(p)) + 1);
  if (!PAGES.includes(rest[0])) return { section: 'index', path: 'index' };
  return { section: rest[0], path: rest.join('/') };
}

// The nav underline grows in from the inline start rather than appearing — the
// same "typing in" motion as the hero, at a smaller scale. It is drawn with a
// scaled pseudo-element so it stays off the layout path, and its origin flips
// for Arabic and Kurdish. The links carry vertical padding so they are a
// comfortable target on a phone, which is why the line sits a little above the
// bottom of the box rather than on it.
const UNDERLINE =
  "after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:content-[''] rtl:after:origin-right";

export default function Header({ lang }) {
  const t = SITE[lang];
  const pathname = usePathname();
  const { section, path } = routeFromPathname(pathname);

  return (
    <header className="sticky top-0 z-100 border-b border-line bg-bg/95 py-1.5 supports-[backdrop-filter]:backdrop-blur-[4px]">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-4">
        {/* The wordmark is a shell prompt, so it stays mono and LTR in every
            language — and the @ pulses like a connection indicator. */}
        <Link href={pagePath(lang, 'index')} className="ltr-fixed py-2 text-sm font-bold text-bright hover:no-underline">
          {BRAND.split('@')[0]}
          <span className="m-pulse text-accent">@</span>
          {BRAND.split('@')[1]}
        </Link>

        <div className="flex flex-wrap items-center gap-x-5">
          <nav className="flex flex-wrap items-center gap-x-5">
            {PAGES.map((p) => {
              const active = p === section;
              return (
                <Link
                  key={p}
                  href={pagePath(lang, p)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative inline-block py-2 text-[13px] transition-colors hover:no-underline ${UNDERLINE} ${
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
                  href={pagePath(l, path)}
                  hrefLang={SITE[l].hreflang}
                  aria-current={l === lang ? 'true' : undefined}
                  aria-label={`${t.langSwitchLabel}: ${SITE[l].langName}`}
                  className={`inline-block px-1 py-2 transition-colors hover:no-underline ${
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
