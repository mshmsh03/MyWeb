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
//
// `headingLevel` (2 or 3) is the level of the till's own headings: 3 where
// the till sits in a section under an h2, as on the home page; 2 where it
// comes straight after the page's h1.
export default function Till({ lang, requestHref = '#request', headingLevel = 3 }) {
  const sale = openingSale(lang);
  const level = headingLevel === 2 ? 2 : 3;
  return (
    <div className={plexMono.variable}>
      <TillIsland lang={lang} requestHref={requestHref} headingLevel={level}>
        <TillView sale={sale} view={describe(sale)} requestHref={requestHref} headingLevel={level} />
      </TillIsland>
    </div>
  );
}
