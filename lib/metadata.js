import { LANGS, SITE, PAGE_META, BASE_PATH, NAME, pagePath } from './site-data';
import en from '@/app/[lang]/_content/copy.en';
import ar from '@/app/[lang]/_content/copy.ar';
import ku from '@/app/[lang]/_content/copy.ku';

const PREVIEW_COPY = { en: en.preview, ar: ar.preview, ku: ku.preview };

// The published origin plus the project-page prefix. Change both here and in
// next.config.js (or via NEXT_PUBLIC_BASE_PATH) if the site ever moves to a
// custom domain — canonicals and hreflang are absolute and will not follow
// basePath on their own.
export const ORIGIN = 'https://mshmsh03.github.io';
export const BASE = `${ORIGIN}${BASE_PATH}`;

// The absolute form of pagePath(). Keeping it as origin + path means the
// trailing-slash rule that GitHub Pages depends on is written down once.
export function pageUrl(lang, page) {
  return `${BASE}${pagePath(lang, page)}`;
}

// A page's own name is the part of its title before the site name. The home
// page's title is the name alone, so it has none. scripts/make-previews.mjs
// prints the same name on the page's picture.
export function pageName(lang, page) {
  const [name, rest] = PAGE_META[lang][page].title.split(' | ');
  return rest ? name : null;
}

// The picture a shared link shows: the bench with the page's name, one per
// page and language, made by scripts/make-previews.mjs and committed under
// public/assets/preview/. Previewers fetch it from their own servers, so the
// URL is absolute.
export function previewImage(lang, page) {
  const slug = page === 'index' ? 'home' : page.replace('/', '-');
  const name = pageName(lang, page);
  const t = PREVIEW_COPY[lang];
  return {
    url: `${BASE}/assets/preview/${lang}-${slug}.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: name ? t.page.replace('{page}', name) : t.home,
  };
}

export function buildMetadata(lang, page) {
  const t = SITE[lang];
  const meta = PAGE_META[lang][page];
  const canonical = pageUrl(lang, page);
  const image = previewImage(lang, page);

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
      siteName: NAME,
      title: meta.title,
      description: meta.description,
      url: canonical,
      locale: t.ogLocale,
      alternateLocale: otherLocales,
      images: [image],
    },
    // X reads its own tags and falls back to Open Graph only in part; the
    // large card is the one that shows the picture at full width.
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
