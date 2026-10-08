import { requestLinkProps } from '@/lib/request';
import { formatAmount, formatDollars, formatSigned, lineTotal } from '@/lib/till/money.mjs';
import { CATEGORIES, PRODUCTS, RATE } from './catalogue';
import { TILL_LANGS, WORDS, around, countItems, fillText } from './words';

// The till and its receipt printer, drawn from one sale (see sale.js). Pure
// markup: the server draws it once for the version that works without
// script, with every control disabled, and TillLive draws it again with
// `act` wired to the controls. Both come out the same size, so the swap from
// one to the other moves nothing.
//
// The till is a small working copy of Qasa's sell screen: the products in a
// grid, and the order drawn as a receipt at the inline end. It carries its
// own language and direction, which need not be the page's, so nothing in it
// may lean on the page's `dir` (no `rtl:` variants): logical properties only.

// A money figure, in the till's own face. Always left to right, so a minus
// sign stays in front of its number inside a Kurdish line.
const Num = ({ className = '', children }) => <span className={`till-num ${className}`}>{children}</span>;

const Row = ({ label, className, children }) => (
  <div className={className}>
    <dt>{label}</dt>
    <dd>{children}</dd>
  </div>
);

function Icon({ d }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
const MINUS = 'M3.5 8h9';
const PLUS = 'M3.5 8h9M8 3.5v9';
const CROSS = 'm4 4 8 8m0-8-8 8';

// A set of radio buttons drawn as keys. Arrow keys move between them, as in
// any radio group. Without `pick` (no script, or a sale already paid) they
// show their state and do nothing.
function Choice({ legend, hideLegend, name, value, options, pick, className = '' }) {
  return (
    <fieldset className={`till-choice ${className}`}>
      <legend className={hideLegend ? 'sr-only' : 'till-label'}>{legend}</legend>
      <div className="till-options">
        {options.map((o) => (
          <label key={o.value} className="till-option">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={pick ? () => pick(o.value) : undefined}
              readOnly={!pick}
              disabled={!pick}
              className="sr-only"
            />
            <span lang={o.lang}>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Line({ line, t, act, fresh }) {
  const name = t.products[line.id];
  const on = act ? (type) => () => act({ type, id: line.id }) : () => undefined;
  return (
    <li className="till-line" data-line={line.id} data-fresh={fresh || undefined}>
      <span className="till-line-name">
        {name}{' '}
        {line.qty > 1 && (
          <Num className="till-line-each">
            {line.qty} × {formatAmount(line.price)}
          </Num>
        )}
      </span>
      <Num className="till-line-total">{formatAmount(lineTotal(line))}</Num>
      <span className="till-step">
        <button type="button" data-act="less" aria-label={fillText(t.less, { name })} disabled={!act} onClick={on('less')}>
          <Icon d={MINUS} />
        </button>
        {/* Keyed on the quantity only on the line just changed, so that
            number alone is drawn afresh, and bumps. */}
        <Num key={fresh ? line.qty : 'qty'} className="till-qty">
          {line.qty}
        </Num>
        <button type="button" data-act="more" aria-label={fillText(t.more, { name })} disabled={!act} onClick={on('more')}>
          <Icon d={PLUS} />
        </button>
      </span>
      <button
        type="button"
        data-act="remove"
        className="till-drop"
        aria-label={fillText(t.remove, { name })}
        disabled={!act}
        onClick={on('remove')}
      >
        <Icon d={CROSS} />
      </button>
    </li>
  );
}

// The receipt as it came out of the printer. It keeps the language the till
// was in when it was printed, like paper would.
function Receipt({ sale, requestHref }) {
  const t = WORDS[sale.lang];
  const usd = sale.currency === 'usd';
  const iqd = (n) => (
    <span className="whitespace-nowrap">
      <Num>{formatAmount(n)}</Num> {t.iqd}
    </span>
  );
  return (
    <section className="till-paper on-screen" lang={t.lang} dir={t.dir} aria-labelledby="till-receipt-title">
      <p className="till-paper-brand">
        <Num>Qasa POS</Num>
      </p>
      <h3 id="till-receipt-title" className="till-paper-title">
        {t.receipt}
      </h3>
      <ul className="till-paper-lines" role="list">
        {sale.lines.map((l) => (
          <li key={l.id}>
            <span>{t.products[l.id]}</span>
            <Num>{formatAmount(lineTotal(l))}</Num>
            <Num className="till-paper-each">
              {l.qty} × {formatAmount(l.price)}
            </Num>
          </li>
        ))}
      </ul>
      <dl className="till-paper-sums">
        <Row label={t.subtotal}>
          <Num>{formatAmount(sale.subtotal)}</Num>
        </Row>
        <Row label={t.discountRow}>
          <Num>{formatSigned(-sale.discount)}</Num>
        </Row>
        <Row label={t.rounding}>
          <Num>{formatSigned(sale.rounding)}</Num>
        </Row>
        <Row label={t.total} className="till-paper-total">
          {iqd(sale.total)}
          <Num className="till-paper-usd">≈ {formatDollars(sale.dollars)}</Num>
        </Row>
      </dl>
      <dl className="till-paper-sums">
        <Row label={t.cash}>{usd ? <Num>${sale.given}</Num> : iqd(sale.given)}</Row>
        {usd && (
          <Row label={<Num>$1 = {formatAmount(RATE)}</Num>}>{iqd(sale.value)}</Row>
        )}
        <Row label={t.change} className="till-paper-total">
          {iqd(sale.change)}
        </Row>
      </dl>
      <p className="till-paper-note">
        {t.sampleSale}
        <br />
        {t.rate}: <Num>$1 = {formatAmount(RATE)}</Num> {t.iqd}
      </p>
      <a {...requestLinkProps(requestHref, 'pos')} className="till-paper-ask">
        {t.ask}
      </a>
    </section>
  );
}

// What the screen reader hears after a change: the line touched and the new
// total, or that the receipt printed. A repeat gets a trailing space, so the
// live region still counts it as new.
function announce(sale, view, t) {
  const said = sale.said;
  if (!said) return '';
  const total = fillText(t.said.total, { total: `${formatAmount(view.total)} ${t.iqd}` });
  const name = t.products[said.id];
  const text = {
    qty: () => `${fillText(t.said.qty, { name, qty: said.qty })} ${total}`,
    removed: () => `${fillText(t.said.removed, { name })} ${total}`,
    total: () => total,
    printed: () => `${t.said.printed} ${t.change} ${formatAmount(said.change)} ${t.iqd}.`,
  }[said.kind]();
  return said.n % 2 ? `${text} ` : text;
}

export default function TillView({ sale, view, requestHref, act, rootRef }) {
  const t = WORDS[sale.lang];
  const open = view.open;
  const usd = sale.currency === 'usd';
  const empty = sale.lines.length === 0;
  const shown = PRODUCTS.filter((p) => sale.category === 'all' || p.category === sale.category);
  // A control works only on the live till, and the order only until it is
  // paid; the language and the category filter work either side of that.
  const any = act ? (action) => () => act(action) : () => undefined;
  const ordering = act && open ? act : null;
  const [sampleBefore, sampleAfter] = around(t.sample, 'qasa');
  const [shortBefore, shortAfter] = around(t.short, 'amount');
  const [pctBefore, pctAfter] = around(t.discount, 'pct');

  return (
    <div ref={rootRef} className="till" lang={t.lang} dir={t.dir} data-phase={sale.phase}>
      <div className="till-rig">
        <div className="till-device">
          <div data-frame className="till-screen on-screen">
            <div className="till-bar">
              <span className="till-logo" aria-hidden="true">
                Q
              </span>
              <span className="ltr-fixed font-semibold">Qasa POS</span>
              <Choice
                legend={t.language}
                hideLegend
                name="till-lang"
                value={sale.lang}
                options={TILL_LANGS.map((k) => ({ value: k, label: WORDS[k].name, lang: WORDS[k].lang }))}
                pick={act ? (lang) => act({ type: 'lang', lang }) : null}
                className="till-langs"
              />
            </div>

            <div className="till-body">
              <div className="till-cat">
                <Choice
                  legend={t.categories}
                  hideLegend
                  name="till-category"
                  value={sale.category}
                  options={[
                    { value: 'all', label: t.all },
                    ...CATEGORIES.map((c) => ({
                      value: c,
                      label: (
                        <>
                          <i className="till-dot" data-cat={c} aria-hidden="true" />
                          {t.category[c]}
                        </>
                      ),
                    })),
                  ]}
                  pick={act ? (category) => act({ type: 'category', category }) : null}
                  className="till-filter"
                />
                <ul className="till-tiles" role="list">
                  {shown.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        className="till-tile"
                        data-cat={p.category}
                        disabled={!ordering}
                        onClick={ordering ? () => act({ type: 'add', id: p.id }) : undefined}
                      >
                        {/* The spaces keep the parts apart in the button's
                            accessible name; the flex layout ignores them. */}
                        <span className="till-tile-name">{t.products[p.id]}</span>{' '}
                        <span className="till-tile-cat">{t.category[p.category]}</span>{' '}
                        <Num className="till-tile-price">{formatAmount(p.price)}</Num>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="till-note">
                  {sampleBefore}
                  <span className="ltr-fixed">Qasa POS</span>
                  {sampleAfter}
                </p>
              </div>

              <section className="till-order" aria-labelledby="till-order-title">
                <div className="till-slip">
                  <div className="till-slip-head">
                    <h3 id="till-order-title" tabIndex={-1}>
                      {open ? t.order : t.paid}
                    </h3>
                    <span className="till-count">{countItems(t, sale.lines.length)}</span>
                  </div>
                  {empty ? (
                    <p className="till-empty">{t.empty}</p>
                  ) : (
                    <ul className="till-lines" role="list">
                      {sale.lines.map((line) => (
                        <Line
                          key={line.id}
                          line={line}
                          t={t}
                          act={ordering}
                          fresh={sale.touched?.id === line.id && (sale.touched.arrived ? 'new' : 'qty')}
                        />
                      ))}
                    </ul>
                  )}
                  <dl className="till-sums">
                    <Row label={t.subtotal}>
                      <Num>{formatAmount(view.subtotal)}</Num>
                    </Row>
                    <Row label={t.discountRow}>
                      <Num>{formatSigned(-view.discount)}</Num>
                    </Row>
                    <Row label={t.rounding}>
                      <Num>{formatSigned(view.rounding)}</Num>
                    </Row>
                    <Row label={t.total} className="till-total">
                      <Num className="till-total-figure">{formatAmount(view.total)}</Num>{' '}
                      <span className="till-unit">{t.iqd}</span>
                    </Row>
                  </dl>
                  <p className="till-usd">
                    <Num>≈ {formatDollars(view.dollars)}</Num>
                    <span className="till-rate">
                      {t.rate}: <Num>$1 = {formatAmount(RATE)}</Num> {t.iqd}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={sale.discount}
                  className="till-switch"
                  disabled={!ordering}
                  onClick={any({ type: 'discount' })}
                >
                  <span className="till-track" aria-hidden="true">
                    <span className="till-knob" />
                  </span>
                  <span>
                    {pctBefore}
                    <span className="ltr-fixed">10%</span>
                    {pctAfter}
                  </span>
                </button>
              </section>

              <div className="till-pay">
                <Choice
                  legend={t.payIn}
                  name="till-currency"
                  value={sale.currency}
                  options={[
                    { value: 'iqd', label: t.dinars },
                    { value: 'usd', label: t.dollars },
                  ]}
                  pick={ordering ? (currency) => act({ type: 'currency', currency }) : null}
                  className="till-currency"
                />
                <fieldset className="till-choice">
                  <legend className="till-label">{t.received}</legend>
                  <div className="till-tenders">
                    {view.tenders.map((amount, i) => {
                      const value = i === 0 ? 'first' : amount;
                      return (
                        <label key={i === 0 ? 'first' : amount} className="till-option">
                          <input
                            type="radio"
                            name="till-tender"
                            value={value}
                            checked={!view.typed && sale.tender === value}
                            onChange={ordering ? () => act({ type: 'tender', tender: value }) : undefined}
                            readOnly={!ordering}
                            disabled={!ordering}
                            className="sr-only"
                          />
                          <span>
                            {i === 0 && !usd && <small>{t.exact}</small>}
                            <Num>{usd ? `$${amount}` : formatAmount(amount)}</Num>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <label className="till-other">
                    <span>{t.other}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      enterKeyHint="done"
                      dir="ltr"
                      value={sale.other}
                      onChange={ordering ? (e) => act({ type: 'other', text: e.target.value }) : undefined}
                      readOnly={!ordering}
                      disabled={!ordering}
                      className="till-num"
                    />
                    <span>{usd ? '$' : t.iqd}</span>
                  </label>
                </fieldset>
              </div>

              {/* What the customer gets back, beside the one action. One
                  button for that action, so it keeps focus when a sale is
                  charged and it turns into the start of the next. */}
              <div className="till-go">
                <div className="till-change">
                  {empty ? null : view.pay.ok ? (
                    <p className="till-change-row">
                      <span>{t.change}</span>{' '}
                      <span>
                        <Num className="till-change-figure">{formatAmount(view.pay.change)}</Num>{' '}
                        <span className="till-unit">{t.iqd}</span>
                      </span>
                    </p>
                  ) : (
                    <p data-short="">
                      {shortBefore}
                      <Num className="till-change-figure">{formatAmount(view.pay.short)}</Num> {t.iqd}
                      {shortAfter}
                    </p>
                  )}
                  {usd && !empty && (
                    <p className="till-rate">
                      <Num>
                        ${view.given} = {formatAmount(view.pay.value)}
                      </Num>{' '}
                      {t.iqd}. {t.inDinars}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="till-charge"
                  disabled={!act || (open && !view.canCharge)}
                  onClick={any({ type: open ? 'charge' : 'newSale' })}
                >
                  <span>{open ? t.charge : t.newSale}</span>
                  {open && (
                    <span>
                      <Num className="till-charge-figure">{formatAmount(view.total)}</Num>{' '}
                      <span className="till-unit">{t.iqd}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="till-printer" data-printed={sale.printed ? '' : undefined}>
          <div className="till-printer-body">
            <span className="till-printer-name">{t.printer}</span>
            <span className="till-led" aria-hidden="true" />
            <span className="till-slot" aria-hidden="true" />
          </div>
          <div className="till-out">
            {sale.printed ? (
              <Receipt sale={sale.printed} requestHref={requestHref} />
            ) : (
              <span className="till-stub" aria-hidden="true" />
            )}
          </div>
          {!sale.printed && (
            <div className="till-wait">
              <p>{t.waiting}</p>
              <a {...requestLinkProps(requestHref, 'pos')} className="till-ask">
                {t.ask}
              </a>
            </div>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce(sale, view, t)}
      </p>
    </div>
  );
}
