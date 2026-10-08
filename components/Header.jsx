'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANGS, NAME, PAGES, SITE, pagePath } from '@/lib/site-data';

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

// The mark under the current page is a pen stroke in canary: a short bar that
// grows from the reading start, so its origin flips for Arabic and Kurdish.
const MARK =
  "after:absolute after:inset-x-2 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-canary after:transition-transform after:duration-200 after:content-[''] motion-reduce:after:transition-none rtl:after:origin-right";

export default function Header({ lang }) {
  const t = SITE[lang];
  const pathname = usePathname();
  const { section, path } = routeFromPathname(pathname);

  return (
    <header className="z-50 border-b border-carbon-line bg-carbon-deep md:sticky md:top-0">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-4 md:gap-x-6">
        {/* The name printed across the top of the book. It is a name, so it
            stays in Latin in every language. */}
        <Link
          href={pagePath(lang, 'index')}
          className="ltr-fixed wd-wide w-full pt-3.5 pb-1 text-[0.95rem] leading-tight font-extrabold tracking-[0.01em] uppercase md:w-auto md:pb-3.5"
        >
          {NAME}
        </Link>

        {/* On a phone the name takes the first row and the nav and the language
            switch share the second; the header also stops being sticky there,
            where two rows of it would cost too much of the screen. */}
        <nav className="-mx-2 flex flex-wrap items-center md:ms-auto">
          {PAGES.map((p) => {
            const active = p === section;
            return (
              <Link
                key={p}
                href={pagePath(lang, p)}
                aria-current={active ? 'page' : undefined}
                className={`relative inline-block px-2 py-3 text-[0.95rem] font-medium transition-colors ${MARK} ${
                  active ? 'text-ground after:scale-x-100' : 'text-ground-dim hover:text-ground hover:after:scale-x-100'
                }`}
              >
                {t.nav[p]}
              </Link>
            );
          })}
        </nav>

        {/* Each option links to the same page in that language, which is what
            makes all three indexable. */}
        <div className="ltr-fixed wd-cond -me-1.5 flex items-center text-[0.85rem] font-semibold tracking-[0.08em] uppercase">
          {LANGS.map((l) => (
            <Link
              key={l}
              href={pagePath(l, path)}
              hrefLang={SITE[l].hreflang}
              aria-current={l === lang ? 'true' : undefined}
              aria-label={`${t.langSwitchLabel}: ${SITE[l].langName}`}
              className={`inline-block px-1.5 py-3 transition-colors ${
                l === lang ? 'text-canary' : 'text-ground-dim hover:text-ground'
              }`}
            >
              {SITE[l].langName}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
