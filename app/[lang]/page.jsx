import { createLangPage } from '@/lib/page';
import { pageUrl } from '@/lib/metadata';
import { EMAIL, NAME, PAGE_META, PHONE_E164, SITE } from '@/lib/site-data';
import Home from './_pages/Home';

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
    knowsAbout: ['Web development', 'Point-of-sale software', 'Hardware maintenance and repair'],
    inLanguage: SITE[lang].hreflang,
    mainEntityOfPage: url,
  };
}

const { generateMetadata, Page } = createLangPage('index', Home, jsonLd);

export { generateMetadata };
export default Page;
