import { buildMetadata } from './metadata';

// Every route under app/[lang] is the same shape: await the language out of
// the params, pick that language's copy, render it — with the page's metadata
// built from the same two facts. Only the copy actually differs, so the routes
// name their copy and this builds both exports Next needs from it.
//
// `structuredData` is optional and returns a JSON-LD object for the page. Only
// the home page has any, but threading it through here keeps the route files
// down to what is genuinely specific to them.
export function createLangPage(page, content, structuredData) {
  async function generateMetadata({ params }) {
    const { lang } = await params;
    return buildMetadata(lang, page);
  }

  async function Page({ params }) {
    const { lang } = await params;
    const Content = content[lang];

    if (!structuredData) return <Content />;
    return (
      <>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(lang)) }}
        />
        <Content />
      </>
    );
  }

  return { generateMetadata, Page };
}
