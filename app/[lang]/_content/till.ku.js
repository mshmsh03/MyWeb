// The live till's Kurdish (Sorani) words. Same shape as till.en.js. The
// category, product and total labels are Qasa's own Kurdish.

export default {
  name: 'کوردی',
  lang: 'ckb',
  dir: 'rtl',

  language: 'زمانی قاسەکە',
  categories: 'پۆلەکان',
  all: 'هەموو',
  category: { hot: 'خواردنەوەی گەرم', cold: 'خواردنەوەی سارد', sweets: 'شیرینی' },
  products: {
    espresso: 'ئێسپرێسۆ',
    americano: 'ئەمریکانۆ',
    cappuccino: 'کاپۆچینۆ',
    icedLatte: 'لاتێی سارد',
    lemonade: 'لیمۆناتە',
    kleicha: 'کلێچە',
    baklava: 'بەقلاوە',
    cheesecake: 'چیزکەیک',
  },
  sample: 'کاڵا و نرخەکان نموونەن، لە {qasa} وەرگیراون.',
  rate: 'نرخی نموونەیی',

  order: 'داواکاری نوێ',
  paid: 'پارە دراوە',
  items: { one: '{n} کاڵا', other: '{n} کاڵا' },
  empty: 'کاڵایەک هەڵبژێرە بۆ ئەوەی زیاد بکرێت.',
  less: 'دانەیەک کەمتر لە {name}',
  more: 'دانەیەکی تر لە {name}',
  remove: 'لابردنی {name}',

  discount: 'داشکاندنی {pct}',
  subtotal: 'کۆی سەرەتایی',
  discountRow: 'داشکاندن',
  rounding: 'خڕکردنەوە',
  total: 'کۆی گشتی',
  iqd: 'د.ع',

  payIn: 'پارەدان بە',
  dinars: 'دینار',
  dollars: 'دۆلار',
  received: 'وەرگیراو',
  exact: 'ڕێک',
  other: 'بڕێکی تر',
  change: 'باقی',
  short: '{amount} کەمە',
  inDinars: 'باقییەکە بە دینار دەدرێتەوە.',
  charge: 'وەرگرتنی پارە',
  newSale: 'فرۆشتنی نوێ',

  printer: 'پرینتەری پسوولە',
  waiting: 'پارەکە وەربگرە و پسوولەکە لێرە چاپ دەکرێت.',
  receipt: 'پسوولەی نموونەیی',
  cash: 'کاش',
  sampleSale: 'فرۆشتنێکی نموونەییە: هیچ پارەیەک نەدراوە.',
  ask: 'سیستەمێکی فرۆشتنی وەک ئەمەت بۆ دوکانەکەت دەوێت؟',

  said: {
    qty: '{name}: {qty}.',
    removed: '{name} لابرا.',
    total: 'کۆی گشتی {total}.',
    printed: 'پسوولەکە چاپ کرا.',
  },
};
