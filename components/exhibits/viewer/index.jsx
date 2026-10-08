import './viewer.css';
import ViewerIsland from './ViewerIsland';
import ViewerView from './ViewerView';
import { SITES } from './sites';

// The site viewer (the laptop's exhibit): two real client sites in a browser
// window, switched between English, Arabic and Kurdish and between a desktop
// and a phone, with the facts about each marked on its page.
//
// The server draws it in its opening state with every control disabled. That
// is the version a visitor without JavaScript keeps, and what the working one
// (ViewerLive, loaded by ViewerIsland as it nears the screen) replaces, the
// same size and in the same place.
export default function SiteViewer({ lang, t, requestHref = '#request' }) {
  // Only the words the viewer uses cross to the browser.
  const copy = {
    ...t.viewer,
    names: Object.fromEntries(SITES.map((s) => [s.id, t.jobs[s.copy].name])),
    alts: Object.fromEntries(SITES.map((s) => [s.id, t.jobs[s.copy].alt])),
    start: t.bench.start,
  };
  return (
    <ViewerIsland lang={lang} copy={copy} requestHref={requestHref}>
      <ViewerView copy={copy} requestHref={requestHref} siteId={SITES[0].id} shotLang={lang} size="desktop" />
    </ViewerIsland>
  );
}
