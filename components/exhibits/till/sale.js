import {
  addItem,
  changeQty,
  dinarTenders,
  dollarTenders,
  parseAmount,
  payInDinars,
  payInDollars,
  removeItem,
  toDollars,
  totals,
} from '@/lib/till/money.mjs';
import { OPENING, PRODUCT, RATE } from './catalogue';

// One sale on the till, as plain data, and every way the cashier can change
// it. The server builds the opening sale to draw the version that works
// without script; the live till starts from the same one, so swapping one for
// the other changes nothing on screen. All arithmetic is in lib/till/money.mjs.
//
//   phase     'order' while it is being rung up, 'paid' once charged
//   tender    'first' (the first quick tender, which follows the total) or an
//             amount picked from the quick tenders
//   other     what the cashier typed as the amount handed over, if anything
//   printed   the sale as it was charged: what the printer printed
//   touched   the line changed last, and whether it has just arrived, so
//             only it moves
//   said      what to announce, with a counter so a repeat is still heard

const lineOf = ([id, qty]) => ({ id, price: PRODUCT[id].price, qty });

export function openingSale(lang) {
  return {
    lang,
    category: 'all',
    phase: 'order',
    lines: OPENING.lines.map(lineOf),
    discount: OPENING.discount,
    currency: 'iqd',
    tender: OPENING.tender,
    other: '',
    printed: null,
    touched: null,
    said: null,
  };
}

function newSale(sale) {
  return {
    ...sale,
    phase: 'order',
    lines: [],
    discount: false,
    currency: 'iqd',
    tender: 'first',
    other: '',
    printed: null,
    touched: null,
    said: null,
  };
}

// Everything the screen shows that follows from the sale.
export function describe(sale) {
  const sums = totals(sale.lines, sale.discount);
  const usd = sale.currency === 'usd';
  const tenders = usd ? dollarTenders(sums.total, RATE) : dinarTenders(sums.total);
  const typed = sale.other.trim() !== '';
  const given = typed ? (parseAmount(sale.other) ?? 0) : sale.tender === 'first' ? (tenders[0] ?? 0) : sale.tender;
  const pay = usd ? payInDollars(sums.total, given, RATE) : payInDinars(sums.total, given);
  const open = sale.phase === 'order';
  return {
    ...sums,
    dollars: toDollars(sums.total, RATE),
    tenders,
    typed,
    given,
    pay,
    open,
    canCharge: open && sale.lines.length > 0 && pay.ok,
  };
}

// Any change to the order starts the payment over at the exact amount: a
// tender picked for the old total means nothing for the new one.
function reorder(sale, lines, touched, said) {
  return { ...sale, lines, touched, tender: 'first', other: '', said: { ...said, n: (sale.said?.n ?? 0) + 1 } };
}

const qtyOf = (lines, id) => lines.find((l) => l.id === id)?.qty ?? 0;

export function reduce(sale, action) {
  const { type, id } = action;
  if (type === 'lang') return { ...sale, lang: action.lang, said: null };
  if (type === 'category') return { ...sale, category: action.category };
  if (type === 'newSale') return newSale(sale);

  if (sale.phase !== 'order') return sale;
  switch (type) {
    case 'add': {
      const lines = addItem(sale.lines, PRODUCT[id]);
      const arrived = !qtyOf(sale.lines, id);
      return reorder(sale, lines, { id, arrived }, { kind: 'qty', id, qty: qtyOf(lines, id) });
    }
    case 'more':
    case 'less': {
      const lines = changeQty(sale.lines, id, type === 'more' ? 1 : -1);
      const qty = qtyOf(lines, id);
      return reorder(sale, lines, { id }, qty ? { kind: 'qty', id, qty } : { kind: 'removed', id });
    }
    case 'remove':
      return reorder(sale, removeItem(sale.lines, id), null, { kind: 'removed', id });
    case 'discount':
      return reorder({ ...sale, discount: !sale.discount }, sale.lines, null, { kind: 'total' });
    case 'currency':
      return { ...sale, currency: action.currency, tender: 'first', other: '' };
    case 'tender':
      return { ...sale, tender: action.tender, other: '' };
    case 'other':
      return { ...sale, other: action.text };
    case 'charge': {
      const now = describe(sale);
      if (!now.canCharge) return sale;
      return {
        ...sale,
        phase: 'paid',
        printed: {
          lang: sale.lang,
          lines: sale.lines,
          currency: sale.currency,
          subtotal: now.subtotal,
          discount: now.discount,
          rounding: now.rounding,
          total: now.total,
          dollars: now.dollars,
          given: now.given,
          value: now.pay.value,
          change: now.pay.change,
        },
        touched: null,
        said: { kind: 'printed', change: now.pay.change, n: (sale.said?.n ?? 0) + 1 },
      };
    }
    default:
      return sale;
  }
}
