'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANGS, NAME, PAGES, SITE, pagePath } from '@/lib/site-data';
import EffectsSwitch from './EffectsSwitch';

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

// The mark under the current page is a short bar in ruler yellow that grows
// from the reading start, so its origin flips for Arabic and Kurdish.
const MARK =
  "after:absolute after:inset-x-2 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-ruler after:transition-transform after:duration-200 after:content-[''] rtl:after:origin-right";

// The header is the ruler printed along the top edge of the mat: an opaque
// strip with its ticks standing on the bottom edge. It is sticky from 768px
// up; on a phone it takes two rows and scrolls away with the page.
export default function Header({ lang }) {
  const t = SITE[lang];
  const pathname = usePathname();
  const { section, path } = routeFromPathname(pathname);

  return (
    <header className="ruler-edge z-50 bg-mat pb-2 md:sticky md:top-0 md:pb-3.5">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6">
        {/* The home link. The home page prints the name large across the mat
            right under it, so on a phone, where room is short, it is left out
            and Home in the nav does the job. */}
        <Link
          href={pagePath(lang, 'index')}
          className="ltr-fixed wd-wide hidden py-3 text-[0.95rem] leading-tight font-extrabold tracking-[0.01em] uppercase md:inline-block"
        >
          {NAME}
        </Link>

        <nav className="-mx-2 flex w-full flex-wrap items-center md:ms-auto md:w-auto">
          {PAGES.map((p) => {
            const active = p === section;
            return (
              <Link
                key={p}
                href={pagePath(lang, p)}
                aria-current={active ? 'page' : undefined}
                className={`relative inline-block px-2 py-2.5 text-[0.95rem] font-medium transition-colors ${MARK} ${
                  active ? 'text-chalk after:scale-x-100' : 'text-chalk-dim hover:text-chalk hover:after:scale-x-100'
                }`}
              >
                {t.nav[p]}
              </Link>
            );
          })}
        </nav>

        <div className="-mx-1.5 flex w-full items-center justify-between md:w-auto md:gap-4">
          {/* Each option links to the same page in that language, which is
              what makes all three indexable. They are not prefetched: few
              visitors switch, and a prefetch would also fetch that page's
              screen images on a phone's data. */}
          <div className="ltr-fixed flex items-center">
            {LANGS.map((l) => (
              <Link
                key={l}
                href={pagePath(l, path)}
                prefetch={false}
                hrefLang={SITE[l].hreflang}
                aria-current={l === lang ? 'true' : undefined}
                aria-label={`${t.langSwitchLabel}: ${SITE[l].langName}`}
                className={`label inline-flex min-h-11 min-w-9 items-center justify-center px-1.5 !text-[0.85rem] transition-colors ${
                  l === lang ? 'text-ruler' : 'text-chalk-dim hover:text-chalk'
                }`}
              >
                {SITE[l].langName}
              </Link>
            ))}
          </div>
          <EffectsSwitch label={t.effects} />
        </div>
      </div>
    </header>
  );
}
