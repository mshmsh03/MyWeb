// Every piece of work on the site, in the order it is listed. What a job
// *says* is copy and lives per language in app/[lang]/_content/; this file
// holds only what is the same in all three.
//
// `shot` names the screenshot for each page language (under
// public/assets/work/) and its size; a job only has one when a real picture
// of it exists. `copies` are the same picture at smaller widths, or re-encoded
// smaller, for a browser to pick from by the width it draws the frame at. `site` is a client's own live site, whose pages are at
// /en/, /ar/ and /ku/; `page` is a page of this site that says more.
const SITE_SHOT = [1200, 572];
const TILL_SHOT = [1366, 820];
const webp = (name, widths) => widths.map((w) => [`${name}-${w}.webp`, w]);

export const JOBS = [
  {
    id: 'ellinSite',
    kind: 'website',
    shot: {
      size: SITE_SHOT,
      en: 'ellin.jpg',
      ar: 'ellin-ar.jpg',
      ku: 'ellin-ku.jpg',
      copies: { en: webp('ellin', [600, 1200]), ar: webp('ellin-ar', [600, 1200]), ku: webp('ellin-ku', [600, 1200]) },
    },
    site: 'ellincompany.com',
  },
  {
    id: 'bvSite',
    kind: 'website',
    shot: {
      size: SITE_SHOT,
      en: 'bright-volition.jpg',
      ar: 'bright-volition-ar.jpg',
      ku: 'bright-volition-ku.jpg',
      copies: {
        en: webp('bright-volition', [600, 1200]),
        ar: webp('bright-volition-ar', [600, 1200]),
        ku: webp('bright-volition-ku', [600, 1200]),
      },
    },
    site: 'brightvolition.com',
  },
  { id: 'chrispySite', kind: 'website' },
  {
    id: 'qasa',
    kind: 'software',
    // Qasa has no Arabic screenshot; the Kurdish one shows the same
    // right-to-left mirror.
    shot: {
      size: TILL_SHOT,
      en: 'qasa-sell-en.png',
      ar: 'qasa-sell-ckb.png',
      ku: 'qasa-sell-ckb.png',
      copies: { en: webp('qasa-sell-en', [600]), ar: webp('qasa-sell-ckb', [600]), ku: webp('qasa-sell-ckb', [600]) },
    },
    page: 'projects/qasa',
  },
  { id: 'chrispyPos', kind: 'software' },
  { id: 'krofi', kind: 'print' },
  { id: 'chrispyMenu', kind: 'print' },
  { id: 'ellinCard', kind: 'print' },
  { id: 'ellinProfile', kind: 'print' },
  { id: 'bvProfile', kind: 'print' },
];

export const KINDS = ['website', 'software', 'print'];

export const job = (id) => JOBS.find((j) => j.id === id);

// The live address of a client's site in the page's language.
export const siteUrl = (j, lang) => `https://${j.site}/${lang}/`;
