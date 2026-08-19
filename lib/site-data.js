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

// The wordmark and the footer line are the site's signature — they stay in
// Latin in every language, the same way a logo would.
export const BRAND = 'mustafa@portfolio';
export const FOOTNOTE = '// built by hand, deployed with intent.';

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
// without a rewrite rule. next/link adds the basePath in front.
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
        'Mustafa Deari Ahmed — Computer Engineering student building websites and repairing hardware, with real, shipped work across software and hardware systems.',
    },
    about: {
      title: 'About | Mustafa Deari Ahmed',
      description:
        'Computer Engineering student at Tishk International University, Erbil — website development and deployment, hardware diagnostics and repair, and local network setup.',
    },
    projects: {
      title: 'Projects | Mustafa Deari Ahmed',
      description:
        'Shipped work: the Ellin Company website, the Bright Volition company website, a construction company portfolio, and Prayer Times app page designs.',
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
        'مصطفى ديري أحمد — طالب هندسة حاسوب يبني المواقع ويصلح العتاد، بخبرة عملية في أنظمة البرمجيات والعتاد.',
    },
    about: {
      title: 'نبذة عني | Mustafa Deari Ahmed',
      description:
        'طالب هندسة حاسوب في جامعة تيشك الدولية، أربيل — تطوير المواقع ونشرها، تشخيص العتاد وإصلاحه، وإعداد الشبكات المحلية.',
    },
    projects: {
      title: 'المشاريع | Mustafa Deari Ahmed',
      description:
        'أعمال منجزة: موقع شركة إيلين، موقع شركة برايت فوليشن، ملف تعريفي لشركة إنشاءات، وتصاميم صفحات تطبيق أوقات الصلاة.',
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
        'مستەفا دیاری ئەحمەد — خوێندکاری ئەندازیاری کۆمپیوتەر کە ماڵپەڕ دروست دەکات و ڕەقەکاڵا چاک دەکاتەوە، بە ئەزموونی کردەیی لە سیستەمی نەرمەکاڵا و ڕەقەکاڵادا.',
    },
    about: {
      title: 'دەربارەم | Mustafa Deari Ahmed',
      description:
        'خوێندکاری ئەندازیاری کۆمپیوتەر لە زانکۆی نێودەوڵەتی تیشک، هەولێر — دروستکردن و بڵاوکردنەوەی ماڵپەڕ، دەستنیشانکردن و چاککردنەوەی ڕەقەکاڵا، و دامەزراندنی تۆڕی ناوخۆیی.',
    },
    projects: {
      title: 'پڕۆژەکان | Mustafa Deari Ahmed',
      description:
        'کاری ڕادەستکراو: ماڵپەڕی کۆمپانیای ئێلین، ماڵپەڕی کۆمپانیای برایت ڤۆلیشن، پرۆفایلی کۆمپانیایەکی بیناسازی، و دیزاینی پەڕەی ئەپی کاتەکانی نوێژ.',
    },
    contact: {
      title: 'پەیوەندی | Mustafa Deari Ahmed',
      description:
        'پەیوەندیم پێوە بکە بۆ بنیاتنان، چاککردنەوە یان شیکردنەوەی کێشەی پڕۆژەی داهاتووت. کراوەم بۆ ڕاهێنان، کاری ئازاد و هاوکاری.',
    },
  },
};
