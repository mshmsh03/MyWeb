import { buildMetadata } from './metadata';
import en from '@/app/[lang]/_content/copy.en';
import ar from '@/app/[lang]/_content/copy.ar';
import ku from '@/app/[lang]/_content/copy.ku';

// Every word on the site, by language. A page is laid out once, in
// app/[lang]/_pages/, and is handed the copy for whichever language the route
// asked for — so the three languages cannot drift apart in structure.
export const COPY = { en, ar, ku };

// Every route under app/[lang] is the same shape: await the language out of
// the params, hand that language's copy to the page's template — with the
// page's metadata built from the same two facts.
//
// `structuredData` is optional and returns a JSON-LD object for the page. Only
// the home page has any, but threading it through here keeps the route files
// down to what is genuinely specific to them.
export function createLangPage(page, Template, structuredData) {
  async function generateMetadata({ params }) {
    const { lang } = await params;
    return buildMetadata(lang, page);
  }

  async function Page({ params }) {
    const { lang } = await params;
    const body = <Template lang={lang} t={COPY[lang]} />;

    if (!structuredData) return body;
    return (
      <>
        <script
          type="application/ld+json"
          // `<` is escaped so no string in the data can close the script tag.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(lang)).replace(/</g, '\\u003c') }}
        />
        {body}
      </>
    );
  }

  return { generateMetadata, Page };
}
