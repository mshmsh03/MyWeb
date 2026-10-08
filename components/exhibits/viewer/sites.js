import { asset } from '@/lib/site-data';

// The two client sites the viewer shows. Each has a screenshot of its home
// page in each language at each size, captured from the live site (the
// origin is recorded inside each file in public/assets/work/). Desktop
// shots are the top of a 1440px window scaled to 1200 wide; phone shots are
// a 390×844 screen at 2×.
export const SIZES = {
  desktop: { width: 1200, height: 572 },
  phone: { width: 780, height: 1688 },
};

// `copy` names the site's entry in the copy's `jobs`. `marks` places each
// fact on the part of the screenshot it is about, as [x, y] in the
// screenshot's own pixels. Arabic and Kurdish pages are mirrored, so their
// marks move with what they point at: the language switch, for one, is on
// the other side. On a phone both sites fold their menu into a button.
export const SITES = [
  {
    id: 'ellin',
    copy: 'ellinSite',
    host: 'ellincompany.com',
    shots: {
      desktop: { en: 'ellin.jpg', ar: 'ellin-ar.jpg', ku: 'ellin-ku.jpg' },
      phone: { en: 'ellin-en-phone.jpg', ar: 'ellin-ar-phone.jpg', ku: 'ellin-ku-phone.jpg' },
    },
    // work: under the logo; languages: under the language switch (on a
    // phone, the menu that holds it); client: at the end of the headline.
    marks: {
      desktop: {
        en: { work: [146, 70], languages: [1030, 66], client: [560, 212] },
        ar: { work: [1054, 70], languages: [172, 66], client: [395, 215] },
        ku: { work: [1054, 70], languages: [170, 66], client: [340, 215] },
      },
      phone: {
        en: { work: [110, 162], languages: [685, 152], client: [618, 462] },
        ar: { work: [670, 162], languages: [96, 152], client: [92, 472] },
        ku: { work: [670, 162], languages: [96, 152], client: [360, 662] },
      },
    },
  },
  {
    id: 'bv',
    copy: 'bvSite',
    host: 'brightvolition.com',
    shots: {
      desktop: { en: 'bright-volition.jpg', ar: 'bright-volition-ar.jpg', ku: 'bright-volition-ku.jpg' },
      phone: {
        en: 'bright-volition-en-phone.jpg',
        ar: 'bright-volition-ar-phone.jpg',
        ku: 'bright-volition-ku-phone.jpg',
      },
    },
    // hosting: under the menu, whose every old link still works; languages:
    // under the language switch; client: beside the headline, which names
    // the firm's line of work.
    marks: {
      desktop: {
        en: { hosting: [600, 80], languages: [1020, 80], client: [615, 230] },
        ar: { hosting: [600, 80], languages: [180, 80], client: [490, 240] },
        ku: { hosting: [600, 80], languages: [180, 80], client: [510, 235] },
      },
      phone: {
        en: { languages: [522, 158], hosting: [693, 158], client: [500, 525] },
        ar: { languages: [259, 158], hosting: [88, 158], client: [182, 462] },
        ku: { languages: [259, 158], hosting: [88, 158], client: [305, 558] },
      },
    },
  },
];

export const LANGS = ['en', 'ar', 'ku'];
export const SIZE_KEYS = ['desktop', 'phone'];

export const site = (id) => SITES.find((s) => s.id === id);

export const address = (s, lang) => `https://${s.host}/${lang}/`;

export const shotSrc = (s, size, lang) => asset(`/assets/work/${s.shots[size][lang]}`);

// The marks on one screenshot as percentages of it, numbered in that page's
// own reading order: by row from the top, then from its reading start. The
// list under the frame follows the same order, so mark 2 is line 2.
export function marksOn(s, size, lang) {
  const { width, height } = SIZES[size];
  const rtl = lang !== 'en';
  return Object.entries(s.marks[size][lang])
    .map(([id, [x, y]]) => ({ id, x: (x / width) * 100, y: (y / height) * 100 }))
    .sort((a, b) => (Math.abs(a.y - b.y) > 5 ? a.y - b.y : rtl ? b.x - a.x : a.x - b.x))
    .map((m, i) => ({ ...m, n: i + 1 }));
}
