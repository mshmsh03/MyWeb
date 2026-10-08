// The live till's English words. The till has its own language switch and
// can be English on a Kurdish page, so it carries all three of its languages
// itself; till.ar.js and till.ku.js have exactly the same shape.
//
// {name}, {n}, {qty}, {amount}, {pct}, {qasa} and {total} are filled in by
// the till.

export default {
  // The language as the switch names it, in itself.
  name: 'English',
  lang: 'en',
  dir: 'ltr',

  language: 'Language of the till',
  categories: 'Categories',
  all: 'All',
  category: { hot: 'Hot drinks', cold: 'Cold drinks', sweets: 'Sweets' },
  products: {
    espresso: 'Espresso',
    americano: 'Americano',
    cappuccino: 'Cappuccino',
    icedLatte: 'Iced latte',
    lemonade: 'Lemonade',
    kleicha: 'Kleicha',
    baklava: 'Baklava',
    cheesecake: 'Cheesecake',
  },
  sample: 'The products and prices are a sample, taken from {qasa}.',
  rate: 'Sample rate',

  order: 'New order',
  paid: 'Paid',
  // By Intl.PluralRules category; `other` is used for any category missing.
  items: { one: '{n} item', other: '{n} items' },
  empty: 'Tap a product to add it.',
  less: 'One fewer {name}',
  more: 'One more {name}',
  remove: 'Remove {name}',

  discount: '{pct} discount',
  subtotal: 'Subtotal',
  discountRow: 'Discount',
  rounding: 'Rounding',
  total: 'Total',
  iqd: 'IQD',

  payIn: 'Pay in',
  dinars: 'Dinars',
  dollars: 'Dollars',
  received: 'Received',
  exact: 'Exact',
  other: 'Other amount',
  change: 'Change',
  short: 'Short by {amount}',
  inDinars: 'Change is given in dinars.',
  charge: 'Charge',
  newSale: 'New sale',

  printer: 'Receipt printer',
  waiting: 'Charge the sale and the receipt prints here.',
  receipt: 'Sample receipt',
  cash: 'Cash',
  sampleSale: 'A sample sale: nothing was paid.',
  ask: 'Want a till like this for your shop?',

  // Read out by screen readers as the order changes.
  said: {
    qty: '{name}: {qty}.',
    removed: '{name} removed.',
    total: 'Total {total}.',
    printed: 'Receipt printed.',
  },
};
