import { buildMetadata, BASE, pageUrl } from '../../lib/metadata';
import { EMAIL, NAME, PAGE_META, PHONE_HREF, SITE } from '../../lib/site-data';
import IndexEn from './_content/index.en';
import IndexAr from './_content/index.ar';
import IndexKu from './_content/index.ku';

const CONTENT = { en: IndexEn, ar: IndexAr, ku: IndexKu };

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata(lang, 'index');
}

// Person rather than Organization: this is one student's portfolio, and every
// claim below is already stated on the page itself.
function jsonLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: NAME,
    url: pageUrl(lang, 'index'),
    email: EMAIL,
    telephone: PHONE_HREF.replace('tel:', ''),
    jobTitle: 'Computer Engineering Student',
    description: PAGE_META[lang].index.description,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Tishk International University',
      address: { '@type': 'PostalAddress', addressLocality: 'Erbil', addressCountry: 'IQ' },
    },
    knowsAbout: ['Web development', 'Hardware maintenance and repair', 'Local network setup'],
    inLanguage: SITE[lang].hreflang,
    mainEntityOfPage: `${BASE}/${lang}/`,
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const Content = CONTENT[lang];
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }}
      />
      <Content />
    </>
  );
}
