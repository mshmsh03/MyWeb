import { test } from 'node:test';
import assert from 'node:assert/strict';

// The till's sale rules: what the cashier's actions do to a sale, on top of
// the money rules that lib/till/money.test.mjs pins.

// sale.js and catalogue.js are ES modules in a package that does not say so
// (Next reads them either way), and Node warns about that on every import.
// Here the warning is known and harmless, so it alone is let go.
process.removeAllListeners('warning');
process.on('warning', (w) => {
  if (w.code !== 'MODULE_TYPELESS_PACKAGE_JSON') console.warn(w);
});
const { SETTLE_MS, describe, openingSale, reduce } = await import('./sale.js');
const { OPENING, PRODUCT, RATE } = await import('./catalogue.js');

const run = (sale, ...actions) => actions.reduce(reduce, sale);
const empty = () => run(openingSale('en'), { type: 'newSale' });

test('the opening sale is the one the catalogue sets, with every rule showing', () => {
  const sale = openingSale('en');
  assert.deepEqual(
    sale.lines.map((l) => [l.id, l.qty]),
    OPENING.lines,
  );
  for (const l of sale.lines) assert.equal(l.price, PRODUCT[l.id].price);
  const view = describe(sale);
  assert.equal(view.subtotal, 14000);
  assert.equal(view.discount, 1400);
  assert.equal(view.rounding, -100);
  assert.equal(view.total, 12500);
  assert.equal(view.given, 15000);
  assert.equal(view.pay.change, 2500);
  assert.equal(view.canCharge, true);
});

test('the first quick tender follows the total', () => {
  let sale = run(empty(), { type: 'add', id: 'espresso' });
  assert.equal(sale.tender, 'first');
  assert.equal(describe(sale).given, 2000);
  sale = run(sale, { type: 'add', id: 'kleicha' });
  assert.equal(describe(sale).given, 3500);
  assert.equal(describe(sale).pay.change, 0);
});

test('any change to the order starts the payment over at the exact amount', () => {
  const picked = run(openingSale('en'), { type: 'tender', tender: 20000 });
  assert.equal(describe(picked).given, 20000);
  for (const action of [
    { type: 'add', id: 'baklava' },
    { type: 'more', id: 'espresso' },
    { type: 'less', id: 'espresso' },
    { type: 'remove', id: 'kleicha' },
    { type: 'discount' },
  ]) {
    const sale = run(picked, action);
    assert.equal(sale.tender, 'first', action.type);
    assert.equal(describe(sale).given, describe(sale).total, action.type);
  }
  const typed = run(openingSale('en'), { type: 'other', text: '50000' }, { type: 'add', id: 'baklava' });
  assert.equal(typed.other, '');
});

test('a currency picked starts the payment over too, in that currency', () => {
  const sale = run(openingSale('en'), { type: 'currency', currency: 'usd' });
  assert.equal(sale.tender, 'first');
  const view = describe(sale);
  // 12,500 dinars at 1,470 needs $9, worth 13,230: 730 over, 750 in cash.
  assert.equal(view.given, 9);
  assert.equal(view.pay.value, 9 * RATE);
  assert.equal(view.pay.change, 750);
});

test('a typed amount that cannot be read counts as nothing handed over', () => {
  for (const text of ['abc', '12.5', '-5']) {
    const view = describe(run(openingSale('en'), { type: 'other', text }));
    assert.equal(view.unreadable, true, text);
    assert.equal(view.given, 0, text);
    assert.equal(view.pay.ok, false, text);
    assert.equal(view.canCharge, false, text);
  }
  const view = describe(run(openingSale('en'), { type: 'other', text: '٢٠٬٠٠٠' }));
  assert.equal(view.unreadable, false);
  assert.equal(view.given, 20000);
  assert.equal(describe(openingSale('en')).unreadable, false);
});

test('Charge is refused for an empty order or a short tender', () => {
  const none = empty();
  assert.equal(describe(none).canCharge, false);
  assert.equal(run(none, { type: 'charge', at: 0 }), none);

  const short = run(openingSale('en'), { type: 'other', text: '5000' });
  assert.equal(describe(short).pay.short, 7500);
  assert.equal(describe(short).canCharge, false);
  assert.equal(run(short, { type: 'charge', at: 0 }), short);
});

test('Charge prints the sale as it stood, and a paid sale takes no more changes', () => {
  const paid = run(openingSale('en'), { type: 'charge', at: 1000 });
  assert.equal(paid.phase, 'paid');
  assert.equal(paid.printed.at, 1000);
  assert.equal(paid.printed.total, 12500);
  assert.equal(paid.printed.change, 2500);
  assert.equal(paid.said.kind, 'printed');
  assert.equal(describe(paid).canCharge, false);
  for (const action of [
    { type: 'add', id: 'baklava' },
    { type: 'remove', id: 'espresso' },
    { type: 'discount' },
    { type: 'tender', tender: 20000 },
    { type: 'charge', at: 5000 },
  ]) {
    assert.equal(run(paid, action), paid, action.type);
  }
  // The language and the categories still work, and the paper keeps its
  // language.
  const ku = run(paid, { type: 'lang', lang: 'ckb' }, { type: 'category', category: 'cold' });
  assert.equal(ku.lang, 'ckb');
  assert.equal(ku.category, 'cold');
  assert.equal(ku.printed.lang, 'en');
});

test('New sale right after Charge is the second half of a double click, and is ignored', () => {
  const paid = run(openingSale('en'), { type: 'charge', at: 1000 });
  assert.equal(run(paid, { type: 'newSale', at: 1000 + 180 }), paid);
  assert.equal(run(paid, { type: 'newSale', at: 1000 + SETTLE_MS - 1 }), paid);
  assert.equal(run(paid, { type: 'newSale', at: 1000 + SETTLE_MS }).phase, 'order');
});

test('New sale clears the order, the discount, the currency and the payment', () => {
  const paid = run(
    openingSale('en'),
    { type: 'currency', currency: 'usd' },
    { type: 'tender', tender: 20 },
    { type: 'charge', at: 1000 },
  );
  assert.equal(paid.phase, 'paid');
  const next = run(paid, { type: 'lang', lang: 'ar' }, { type: 'newSale', at: 5000 });
  assert.equal(next.phase, 'order');
  assert.deepEqual(next.lines, []);
  assert.equal(next.discount, false);
  assert.equal(next.currency, 'iqd');
  assert.equal(next.tender, 'first');
  assert.equal(next.other, '');
  assert.equal(next.printed, null);
  assert.equal(next.lang, 'ar');
  assert.deepEqual(describe(next).tenders, []);
});

test('the change or the shortfall is said once the amount handed over is settled on', () => {
  const picked = run(openingSale('en'), { type: 'tender', tender: 20000 });
  assert.equal(picked.said.kind, 'pay');
  assert.equal(picked.said.ok, true);
  assert.equal(picked.said.change, 7500);

  // Typing is not read out; finishing the amount is, once.
  const typing = run(picked, { type: 'other', text: '5000' });
  assert.equal(typing.said, picked.said);
  const done = run(typing, { type: 'otherDone' });
  assert.equal(done.said.ok, false);
  assert.equal(done.said.short, 7500);
  assert.equal(run(done, { type: 'otherDone' }), done);

  const unreadable = run(done, { type: 'other', text: 'abc' }, { type: 'otherDone' });
  assert.equal(unreadable.said.unreadable, true);

  // Clearing a typed amount away brings back the picked tender, and says so.
  const cleared = run(done, { type: 'other', text: '' }, { type: 'otherDone' });
  assert.equal(cleared.said.ok, true);
  assert.equal(cleared.said.change, 7500);

  // Passing through an empty field, or an empty order, has nothing to say.
  assert.equal(run(picked, { type: 'otherDone' }), picked);
  assert.equal(run(openingSale('en'), { type: 'otherDone' }).said, null);
  assert.equal(run(empty(), { type: 'currency', currency: 'usd' }).said, null);
});
