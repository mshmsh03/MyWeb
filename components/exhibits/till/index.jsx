import './till.css';
import { plexMono } from './font';
import TillIsland from './TillIsland';
import TillView from './TillView';
import { describe, openingSale } from './sale';

// The live till (the till's exhibit): a sale the visitor can ring up, pay in
// dinars or dollars, and print.
//
// The server draws the till with its opening sale already rung up, the totals
// worked out by the same money rules the live till uses, and every control
// disabled. That drawing is what a visitor without script sees, and what
// stands in until the working till's code arrives (TillIsland).
export default function Till({ lang, requestHref = '#request' }) {
  const sale = openingSale(lang);
  return (
    <div className={plexMono.variable}>
      <TillIsland lang={lang} requestHref={requestHref}>
        <TillView sale={sale} view={describe(sale)} requestHref={requestHref} />
      </TillIsland>
    </div>
  );
}
