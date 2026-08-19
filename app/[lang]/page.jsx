import { createLangPage } from '@/lib/page';
import { pageUrl } from '@/lib/metadata';
import { EMAIL, NAME, PAGE_META, PHONE_E164, SITE } from '@/lib/site-data';
import IndexEn from './_content/index.en';
import IndexAr from './_content/index.ar';
import IndexKu from './_content/index.ku';

// Person rather than Organization: this is one student's portfolio, and every
// claim below is already stated on the page itself.
function jsonLd(lang) {
  const url = pageUrl(lang, 'index');
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: NAME,
    url,
    email: EMAIL,
    telephone: PHONE_E164,
    jobTitle: 'Computer Engineering Student',
    description: PAGE_META[lang].index.description,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Tishk International University',
      address: { '@type': 'PostalAddress', addressLocality: 'Erbil', addressCountry: 'IQ' },
    },
    knowsAbout: ['Web development', 'Hardware maintenance and repair', 'Local network setup'],
    inLanguage: SITE[lang].hreflang,
    mainEntityOfPage: url,
  };
}

const { generateMetadata, Page } = createLangPage(
  'index',
  { en: IndexEn, ar: IndexAr, ku: IndexKu },
  jsonLd,
);

export { generateMetadata };
export default Page;
