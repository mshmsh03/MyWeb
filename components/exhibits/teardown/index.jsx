import '@/components/bench/bench.css';
import './teardown.css';
import TeardownIsland from './TeardownIsland';
import TeardownView from './TeardownView';
import { OPEN_AT_REST, OPEN_STEPS } from './parts';

// The teardown (the computer's exhibit): a desktop computer drawn in layers
// that the visitor opens and takes apart. Each part says what it does and how
// it usually fails; a symptom lights up the parts usually behind it; and the
// symptom goes into the request, already written.
//
// The server draws it part-way open, with every part labelled and every
// control disabled. That is the version a visitor without JavaScript keeps,
// and what the working one (TeardownLive, loaded by TeardownIsland as it
// nears the screen) replaces, the same size and in the same place.
//
// The drawing is made of the bench's boxes (bench.css); what is its own is in
// teardown.css.
export default function Teardown({ t, requestHref = '#request' }) {
  // Only the words the teardown uses cross to the browser.
  const copy = { ...t.teardown, join: t.ticket.message.join };
  return (
    <TeardownIsland copy={copy} requestHref={requestHref}>
      <TeardownView copy={copy} requestHref={requestHref} open={Math.round(OPEN_AT_REST * OPEN_STEPS)} />
    </TeardownIsland>
  );
}
