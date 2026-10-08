// What the live till sells: eight products from Qasa's own sample data, in
// its three sample categories, at its sample prices in dinars. The names are
// copy (app/[lang]/_content/till.*.js); this is only what the money needs.
export const CATEGORIES = ['hot', 'cold', 'sweets'];

export const PRODUCTS = [
  { id: 'espresso', category: 'hot', price: 2000 },
  { id: 'americano', category: 'hot', price: 3000 },
  { id: 'cappuccino', category: 'hot', price: 4000 },
  { id: 'icedLatte', category: 'cold', price: 4500 },
  { id: 'lemonade', category: 'cold', price: 2500 },
  { id: 'kleicha', category: 'sweets', price: 1500 },
  { id: 'baklava', category: 'sweets', price: 2500 },
  { id: 'cheesecake', category: 'sweets', price: 4000 },
];

export const PRODUCT = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

// A sample rate, shown on the till as one. It is the rate behind Qasa's own
// sample screen, where 14,500 dinars is about $9.86.
export const RATE = 1470;

// The order already on the till when it is first seen, and in the version
// built ahead of time: one that shows every rule at once. 14,000 less 10% is
// 12,600, which is rounded to 12,500 in cash; 15,000 handed over leaves
// 2,500 in change.
export const OPENING = {
  lines: [
    ['espresso', 2],
    ['icedLatte', 1],
    ['cheesecake', 1],
    ['kleicha', 1],
  ],
  discount: true,
  tender: 15000,
};
