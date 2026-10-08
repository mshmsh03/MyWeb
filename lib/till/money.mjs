// The money rules of the live till: the same rules Qasa uses at a real
// counter. Everything here is a pure function of whole dinars, so the till's
// screen, its printed receipt and the static version built ahead of time all
// get their numbers from one place, and the tests beside this file pin them.
//
// An order is a list of lines, { id, price, qty }, with the price in dinars.
// Dollars only ever appear at the edge: an amount handed over in dollars is
// turned into dinars at the shop's rate before anything is compared.

// Iraqi cash has no coin below 250 dinars, so totals and change are rounded
// to it.
export const CASH_STEP = 250;

// The notes a customer can hand over, and the amounts a till offers as quick
// tenders above the exact total.
const DINAR_STEPS = [1000, 5000, 10000, 25000, 50000];
const DOLLAR_BILLS = [1, 5, 10, 20, 50, 100];

// To the nearest step, a half step going up: 1,875 is 2,000, 1,800 is 1,750.
// Integer arithmetic only, so no amount ever lands a dinar off.
export function roundCash(amount, step = CASH_STEP) {
  return Math.floor((amount + step / 2) / step) * step;
}

export const lineTotal = (line) => line.price * line.qty;

// Adding a product already on the order adds one to its line instead of
// opening a second line for it.
export function addItem(lines, product) {
  if (lines.some((l) => l.id === product.id)) return changeQty(lines, product.id, 1);
  return [...lines, { id: product.id, price: product.price, qty: 1 }];
}

// A line taken down to nothing leaves the order.
export function changeQty(lines, id, delta) {
  return lines.flatMap((l) => {
    if (l.id !== id) return [l];
    const qty = l.qty + delta;
    return qty > 0 ? [{ ...l, qty }] : [];
  });
}

export const removeItem = (lines, id) => lines.filter((l) => l.id !== id);

// The figures at the foot of the order. The discount is 10% of the subtotal
// to the dinar; the total is what is left, rounded to cash; rounding is the
// difference, so subtotal − discount + rounding is always the total.
export function totals(lines, discountOn) {
  const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0);
  const discount = discountOn ? Math.round(subtotal / 10) : 0;
  const due = subtotal - discount;
  const total = roundCash(due);
  return { subtotal, discount, rounding: total - due, total };
}

// The total in dollars at the shop's rate, to the cent.
export const toDollars = (total, rate) => Math.round((total * 100) / rate) / 100;

// Paid in dinars: the change is whatever is over.
export function payInDinars(total, tendered) {
  const ok = tendered >= total;
  return { ok, value: tendered, change: ok ? tendered - total : 0, short: ok ? 0 : total - tendered };
}

// Paid in dollars: the dollars are worth dollars × rate in dinars, and the
// change comes back in dinars, rounded to cash like a total.
export function payInDollars(total, dollars, rate) {
  const value = dollars * rate;
  const ok = value >= total;
  return {
    ok,
    value,
    change: ok ? Math.max(0, roundCash(value - total)) : 0,
    short: ok ? 0 : total - value,
  };
}

const ascending = (amounts) => [...new Set(amounts)].sort((a, b) => a - b);

// The amounts a cashier is likely to be handed: the exact total first, then
// the total rounded up to each common note. Nothing to offer for an empty
// order.
export function dinarTenders(total) {
  if (total <= 0) return [];
  return ascending([total, ...DINAR_STEPS.map((step) => Math.ceil(total / step) * step)]);
}

// In dollars: the fewest whole dollars that cover the total, then every
// single bill that covers it on its own.
export function dollarTenders(total, rate) {
  if (total <= 0) return [];
  return ascending([Math.ceil(total / rate), ...DOLLAR_BILLS.filter((bill) => bill * rate >= total)]);
}

// Latin digits with comma grouping in every language, the way Qasa prints
// prices, so a cashier reads them the same way whatever the till's language.
export const formatAmount = (n) => String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// A discount or a rounding, with its sign: −400, +50. Zero has none.
export function formatSigned(n) {
  if (n === 0) return '0';
  return `${n < 0 ? '−' : '+'}${formatAmount(n)}`;
}

export function formatDollars(n) {
  const [whole, cents] = Math.abs(n).toFixed(2).split('.');
  return `$${formatAmount(Number(whole))}.${cents}`;
}

// An amount typed by the cashier: whole units, in Latin digits or in the
// Arabic-Indic digits an Arabic or Kurdish keyboard types, with or without
// grouping. Anything else is not an amount.
export function parseAmount(text) {
  const digits = String(text)
    .trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace(/[۰-۹]/g, (d) => d.charCodeAt(0) - 0x06f0)
    .replace(/[,٬\s]/g, '');
  if (!/^\d{1,9}$/.test(digits)) return null;
  return Number(digits);
}
