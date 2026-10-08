import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  addItem,
  changeQty,
  dinarTenders,
  dollarTenders,
  formatAmount,
  formatDollars,
  formatSigned,
  lineTotal,
  parseAmount,
  payInDinars,
  payInDollars,
  removeItem,
  roundCash,
  toDollars,
  totals,
} from './money.mjs';

const RATE = 1470;
const espresso = { id: 'espresso', price: 2000 };
const baklava = { id: 'baklava', price: 2500 };
const kleicha = { id: 'kleicha', price: 1500 };

const order = (...pairs) => pairs.map(([p, qty]) => ({ id: p.id, price: p.price, qty }));

test('an empty order costs nothing and offers no tenders', () => {
  assert.deepEqual(totals([], false), { subtotal: 0, discount: 0, rounding: 0, total: 0 });
  assert.deepEqual(totals([], true), { subtotal: 0, discount: 0, rounding: 0, total: 0 });
  assert.deepEqual(dinarTenders(0), []);
  assert.deepEqual(dollarTenders(0, RATE), []);
  assert.equal(toDollars(0, RATE), 0);
});

test('cash rounding goes to the nearest 250, halves up', () => {
  assert.equal(roundCash(1800), 1750);
  assert.equal(roundCash(1874), 1750);
  assert.equal(roundCash(1875), 2000);
  assert.equal(roundCash(1876), 2000);
  assert.equal(roundCash(12600), 12500);
  assert.equal(roundCash(12625), 12750);
  assert.equal(roundCash(124), 0);
  assert.equal(roundCash(125), 250);
  assert.equal(roundCash(15000), 15000);
});

test('a line is price × quantity and the subtotal is the sum of lines', () => {
  const lines = order([espresso, 2], [baklava, 1]);
  assert.equal(lineTotal(lines[0]), 4000);
  assert.equal(totals(lines, false).subtotal, 6500);
  assert.equal(totals(lines, false).total, 6500);
  assert.equal(totals(lines, false).rounding, 0);
});

test('adding a product again raises its quantity instead of adding a line', () => {
  let lines = addItem([], espresso);
  lines = addItem(lines, baklava);
  lines = addItem(lines, espresso);
  assert.deepEqual(lines, order([espresso, 2], [baklava, 1]));
});

test('quantity changes, and a line taken to zero leaves the order', () => {
  let lines = order([espresso, 2], [baklava, 1]);
  lines = changeQty(lines, 'espresso', 1);
  assert.equal(lines[0].qty, 3);
  lines = changeQty(lines, 'espresso', -1);
  lines = changeQty(lines, 'espresso', -1);
  assert.deepEqual(lines, order([espresso, 1], [baklava, 1]));
  lines = changeQty(lines, 'espresso', -1);
  assert.deepEqual(lines, order([baklava, 1]));
  assert.equal(totals(lines, false).total, 2500);
});

test('removing a line drops it whatever its quantity, and leaves the rest alone', () => {
  const lines = order([espresso, 3], [baklava, 1], [kleicha, 2]);
  assert.deepEqual(removeItem(lines, 'baklava'), order([espresso, 3], [kleicha, 2]));
  assert.deepEqual(removeItem(lines, 'cheesecake'), lines);
  assert.deepEqual(removeItem(order([espresso, 3]), 'espresso'), []);
});

test('changing the order never changes the list it was given', () => {
  const lines = order([espresso, 1]);
  addItem(lines, espresso);
  changeQty(lines, 'espresso', -1);
  removeItem(lines, 'espresso');
  assert.deepEqual(lines, order([espresso, 1]));
});

test('the 10% discount is rounded to the dinar, then the total to cash', () => {
  // The till's opening order: 14,000 − 1,400 = 12,600, which is 12,500 in
  // cash.
  const opening = order([espresso, 2], [{ id: 'iced', price: 4500 }, 1], [{ id: 'cake', price: 4000 }, 1], [kleicha, 1]);
  assert.deepEqual(totals(opening, true), { subtotal: 14000, discount: 1400, rounding: -100, total: 12500 });
  // 13,750 − 1,375 = 12,375: exactly half a step, so up to 12,500.
  assert.deepEqual(totals(order([{ id: 'x', price: 13750 }, 1]), true), {
    subtotal: 13750,
    discount: 1375,
    rounding: 125,
    total: 12500,
  });
  // 13,000 − 1,300 = 11,700: rounded up by 50.
  assert.deepEqual(totals(order([{ id: 'x', price: 13000 }, 1]), true), {
    subtotal: 13000,
    discount: 1300,
    rounding: 50,
    total: 11750,
  });
  // Off, there is no discount and the total is the subtotal rounded.
  assert.deepEqual(totals(order([{ id: 'x', price: 13000 }, 1]), false), {
    subtotal: 13000,
    discount: 0,
    rounding: 0,
    total: 13000,
  });
});

test('the discount rounds half a dinar up', () => {
  assert.equal(totals(order([{ id: 'x', price: 1005 }, 1]), true).discount, 101);
  assert.equal(totals(order([{ id: 'x', price: 1004 }, 1]), true).discount, 100);
});

test('subtotal − discount + rounding is always the total', () => {
  for (let subtotal = 0; subtotal <= 60000; subtotal += 50) {
    for (const on of [false, true]) {
      const t = totals(order([{ id: 'x', price: subtotal }, 1]), on);
      assert.equal(t.subtotal - t.discount + t.rounding, t.total);
      assert.equal(t.total % 250, 0);
      assert.ok(Math.abs(t.rounding) <= 125);
    }
  }
});

test('the dollar equivalent is to the cent at the shop rate', () => {
  assert.equal(toDollars(14500, RATE), 9.86);
  assert.equal(toDollars(12500, RATE), 8.5);
  assert.equal(toDollars(14700, RATE), 10);
  assert.equal(formatDollars(toDollars(14500, RATE)), '$9.86');
  assert.equal(formatDollars(toDollars(12500, RATE)), '$8.50');
  assert.equal(formatDollars(1470), '$1,470.00');
});

test('paying in dinars: change is the amount over, and a short tender is refused', () => {
  assert.deepEqual(payInDinars(12500, 15000), { ok: true, value: 15000, change: 2500, short: 0 });
  assert.deepEqual(payInDinars(12500, 12500), { ok: true, value: 12500, change: 0, short: 0 });
  assert.deepEqual(payInDinars(12500, 10000), { ok: false, value: 10000, change: 0, short: 2500 });
  assert.equal(payInDinars(12500, 12499).ok, false);
});

test('paying in dollars: change comes back in dinars, rounded to cash', () => {
  // $10 is 14,700: 2,200 over, which is 2,250 in cash.
  assert.deepEqual(payInDollars(12500, 10, RATE), { ok: true, value: 14700, change: 2250, short: 0 });
  // $9 is 13,230: 730 over, which is 750.
  assert.equal(payInDollars(12500, 9, RATE).change, 750);
  // $10 for 14,500: 200 over, rounded to 250.
  assert.equal(payInDollars(14500, 10, RATE).change, 250);
  // $1 for 1,350: 120 over, which rounds to nothing.
  assert.equal(payInDollars(1350, 1, RATE).change, 0);
  // Exactly at the half: 125 over rounds up.
  assert.equal(payInDollars(1345, 1, RATE).change, 250);
  // Short.
  assert.deepEqual(payInDollars(12500, 8, RATE), { ok: false, value: 11760, change: 0, short: 740 });
});

test('quick tenders in dinars: exact first, then each note rounded up, without repeats', () => {
  assert.deepEqual(dinarTenders(12500), [12500, 13000, 15000, 20000, 25000, 50000]);
  assert.deepEqual(dinarTenders(15000), [15000, 20000, 25000, 50000]);
  assert.deepEqual(dinarTenders(21000), [21000, 25000, 30000, 50000]);
  assert.deepEqual(dinarTenders(1500), [1500, 2000, 5000, 10000, 25000, 50000]);
  assert.deepEqual(dinarTenders(50000), [50000]);
  assert.deepEqual(dinarTenders(60250), [60250, 61000, 65000, 70000, 75000, 100000]);
});

test('quick tenders in dollars: whole dollars first, then single bills that cover it', () => {
  // 14,500 is $9.86.
  assert.deepEqual(dollarTenders(14500, RATE), [10, 20, 50, 100]);
  // 12,500 is $8.50.
  assert.deepEqual(dollarTenders(12500, RATE), [9, 10, 20, 50, 100]);
  // Exactly $10.
  assert.deepEqual(dollarTenders(14700, RATE), [10, 20, 50, 100]);
  assert.deepEqual(dollarTenders(1250, RATE), [1, 5, 10, 20, 50, 100]);
  // More than any one bill: only the whole dollars.
  assert.deepEqual(dollarTenders(150000, RATE), [103]);
  for (const total of [250, 1500, 12500, 14500, 73500]) {
    for (const dollars of dollarTenders(total, RATE)) assert.ok(payInDollars(total, dollars, RATE).ok);
  }
});

test('amounts print in Latin digits with commas, with signs on adjustments', () => {
  assert.equal(formatAmount(0), '0');
  assert.equal(formatAmount(250), '250');
  assert.equal(formatAmount(12500), '12,500');
  assert.equal(formatAmount(1250000), '1,250,000');
  assert.equal(formatSigned(-100), '−100');
  assert.equal(formatSigned(-1400), '−1,400');
  assert.equal(formatSigned(50), '+50');
  assert.equal(formatSigned(0), '0');
});

test('a typed amount reads Latin and Arabic-Indic digits, and nothing else', () => {
  assert.equal(parseAmount('15000'), 15000);
  assert.equal(parseAmount(' 15,000 '), 15000);
  assert.equal(parseAmount('١٥٠٠٠'), 15000);
  assert.equal(parseAmount('١٥٬٠٠٠'), 15000);
  assert.equal(parseAmount('۲۰۰۰۰'), 20000);
  assert.equal(parseAmount(''), null);
  assert.equal(parseAmount('12.5'), null);
  assert.equal(parseAmount('-500'), null);
  assert.equal(parseAmount('ten'), null);
});
