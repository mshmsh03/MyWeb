import { LANGS, SITE, PAGE_META, BASE_PATH } from './site-data';

// The published origin plus the project-page prefix. Change both here and in
// next.config.js (or via NEXT_PUBLIC_BASE_PATH) if the site ever moves to a
// custom domain — canonicals and hreflang are absolute and will not follow
// basePath on their own.
export const ORIGIN = 'https://mshmsh03.github.io';
export const BASE = `${ORIGIN}${BASE_PATH}`;

export function pageUrl(lang, page) {
  return page === 'index' ? `${BASE}/${lang}/` : `${BASE}/${lang}/${page}/`;
}

export function buildMetadata(lang, page) {
  const t = SITE[lang];
  const meta = PAGE_META[lang][page];
  const canonical = pageUrl(lang, page);

  // hreflang is keyed by the tag search engines expect, not by the route
  // segment — Kurdish Sorani routes at /ku/ but must be announced as `ckb`.
  const languages = {};
  for (const l of LANGS) languages[SITE[l].hreflang] = pageUrl(l, page);
  languages['x-default'] = pageUrl('en', page);

  const otherLocales = LANGS.filter((l) => l !== lang).map((l) => SITE[l].ogLocale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Mustafa Deari Ahmed',
      title: meta.title,
      description: meta.description,
      url: canonical,
      locale: t.ogLocale,
      alternateLocale: otherLocales,
    },
  };
}
