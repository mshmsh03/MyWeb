export const LANGS = ['en', 'ar', 'ku'];
export const PAGES = ['index', 'about', 'projects', 'contact'];

// GitHub Pages serves this repo as a project page, so everything lives under
// /MyWeb/. next/link and the chunk URLs get that prefix from `basePath` in
// next.config.js automatically; raw asset URLs written into a <script src> or a
// favicon tag do not, so those go through asset() below.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (p) => `${BASE_PATH}${p}`;

export const NAME = 'Mustafa Deari Ahmed';
export const EMAIL = 'mustafadiyary03@gmail.com';
// One number, three spellings: E.164 for structured data, tel: for the link,
// and grouped for the reader. The href is derived so it cannot drift from the
// number; the grouping is written out because it is a typographic choice.
export const PHONE_E164 = '+9647728110303';
export const PHONE_HREF = `tel:${PHONE_E164}`;
export const PHONE_DISPLAY = '+964 772 811 0303';
// WhatsApp is on the same number; wa.me takes it without the plus.
export const WHATSAPP_HREF = `https://wa.me/${PHONE_E164.slice(1)}`;

// Screenshots under public/assets/work/, with the intrinsic size each <img>
// needs to reserve its box before the file arrives. Alt text is copy, so it
// lives with the copy in app/[lang]/_content/.
export const SHOTS = {
  ellin: { src: '/assets/work/ellin.jpg', width: 1200, height: 572 },
  brightVolition: { src: '/assets/work/bright-volition.jpg', width: 1200, height: 572 },
  qasaSell: { src: '/assets/work/qasa-sell-en.png', width: 1366, height: 820 },
  qasaSellKu: { src: '/assets/work/qasa-sell-ckb.png', width: 1366, height: 820 },
  qasaReports: { src: '/assets/work/qasa-reports-en.png', width: 1366, height: 820 },
};

// The footer line is the site's signature. It stays in English in every
// language, the way a motto printed on a letterhead would.
export const MOTTO = 'Built by hand, deployed with intent.';

export const SITE = {
  en: {
    dir: 'ltr',
    langName: 'en',
    ogLocale: 'en_US',
    hreflang: 'en',
    nav: {
      index: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    langSwitchLabel: 'Language',
  },
  ar: {
    dir: 'rtl',
    langName: 'ar',
    ogLocale: 'ar_IQ',
    hreflang: 'ar',
    nav: {
      index: 'الرئيسية',
      about: 'نبذة عني',
      projects: 'المشاريع',
      contact: 'تواصل',
    },
    langSwitchLabel: 'اللغة',
  },
  ku: {
    dir: 'rtl',
    langName: 'ku',
    ogLocale: 'ckb_IQ',
    hreflang: 'ckb',
    nav: {
      index: 'سەرەکی',
      about: 'دەربارەم',
      projects: 'پڕۆژەکان',
      contact: 'پەیوەندی',
    },
    langSwitchLabel: 'زمان',
  },
};

// Root-relative internal link path for a given language/page pair. The trailing
// slash is not cosmetic: `trailingSlash: true` makes the export emit
// `out/en/about/index.html`, and that is the only path GitHub Pages will serve
// without a rewrite rule. next/link adds the basePath in front. A page nested
// under another is named by its route — 'projects/qasa' — and takes the same
// shape.
export function pagePath(lang, page) {
  return page === 'index' ? `/${lang}/` : `/${lang}/${page}/`;
}

// Per-page <title>/<meta description>. The name itself is left in Latin in all
// three languages, as it is on every other credential — transliterating it
// would invent a spelling.
export const PAGE_META = {
  en: {
    index: {
      title: 'Mustafa Deari Ahmed',
      description:
        'Mustafa Deari Ahmed — Computer Engineering student building websites and point-of-sale systems and repairing hardware, with real client work across software and hardware.',
    },
    about: {
      title: 'About | Mustafa Deari Ahmed',
      description:
        'Computer Engineering student at Tishk International University, Erbil — website development and deployment, point-of-sale systems, and hardware diagnostics and repair.',
    },
    projects: {
      title: 'Projects | Mustafa Deari Ahmed',
      description:
        'Client websites for Ellin Company and Bright Volition, the Qasa point-of-sale system, and print work for local businesses.',
    },
    'projects/qasa': {
      title: 'Qasa POS | Mustafa Deari Ahmed',
      description:
        'Qasa is a sample point-of-sale system in Kurdish, Arabic and English that runs without internet — the kind of system I build around a client’s business.',
    },
    contact: {
      title: 'Contact | Mustafa Deari Ahmed',
      description:
        'Get in touch about building, repairing, or troubleshooting your next project. Open to internships, freelance work, and collaboration.',
    },
  },
  ar: {
    index: {
      title: 'Mustafa Deari Ahmed',
      description:
        'مصطفى ديري أحمد — طالب هندسة حاسوب يبني المواقع وأنظمة نقاط البيع ويصلح العتاد، بخبرة عملية في البرمجيات والعتاد.',
    },
    about: {
      title: 'نبذة عني | Mustafa Deari Ahmed',
      description:
        'طالب هندسة حاسوب في جامعة تيشك الدولية، أربيل — تطوير المواقع ونشرها، أنظمة نقاط البيع، وتشخيص العتاد وإصلاحه.',
    },
    projects: {
      title: 'المشاريع | Mustafa Deari Ahmed',
      description:
        'مواقع العملاء لشركة إيلين وشركة برايت فوليشن، نظام نقطة البيع Qasa، وأعمال مطبوعة لشركات ومتاجر محلية.',
    },
    'projects/qasa': {
      title: 'Qasa POS | Mustafa Deari Ahmed',
      description:
        'Qasa نظام نقطة بيع نموذجي بالكردية والعربية والإنجليزية يعمل دون إنترنت — مثال على الأنظمة التي أبنيها حول عمل العميل.',
    },
    contact: {
      title: 'تواصل | Mustafa Deari Ahmed',
      description:
        'تواصل معي بشأن بناء مشروعك القادم أو إصلاحه أو تشخيص أعطاله. منفتح على فرص التدريب والعمل الحر والتعاون.',
    },
  },
  ku: {
    index: {
      title: 'Mustafa Deari Ahmed',
      description:
        'مستەفا دیاری ئەحمەد — خوێندکاری ئەندازیاری کۆمپیوتەر کە ماڵپەڕ و سیستەمی خاڵی فرۆشتن دروست دەکات و ڕەقەکاڵا چاک دەکاتەوە، بە ئەزموونی کردەیی لە نەرمەکاڵا و ڕەقەکاڵادا.',
    },
    about: {
      title: 'دەربارەم | Mustafa Deari Ahmed',
      description:
        'خوێندکاری ئەندازیاری کۆمپیوتەر لە زانکۆی نێودەوڵەتی تیشک، هەولێر — دروستکردن و بڵاوکردنەوەی ماڵپەڕ، سیستەمی خاڵی فرۆشتن، و دەستنیشانکردن و چاککردنەوەی ڕەقەکاڵا.',
    },
    projects: {
      title: 'پڕۆژەکان | Mustafa Deari Ahmed',
      description:
        'ماڵپەڕی کڕیاران بۆ کۆمپانیای ئێلین و برایت ڤۆلیشن، سیستەمی فرۆشتنی Qasa، و کاری چاپکراو بۆ کۆمپانیا و دوکانە ناوخۆییەکان.',
    },
    'projects/qasa': {
      title: 'Qasa POS | Mustafa Deari Ahmed',
      description:
        'Qasa سیستەمێکی نموونەیی خاڵی فرۆشتنە بە کوردی، عەرەبی و ئینگلیزی کە بەبێ ئینتەرنێت کار دەکات — نموونەیەک لەو سیستەمانەی بۆ کڕیاران دروستیان دەکەم.',
    },
    contact: {
      title: 'پەیوەندی | Mustafa Deari Ahmed',
      description:
        'پەیوەندیم پێوە بکە بۆ بنیاتنان، چاککردنەوە یان شیکردنەوەی کێشەی پڕۆژەی داهاتووت. کراوەم بۆ ڕاهێنان، کاری ئازاد و هاوکاری.',
    },
  },
};
