import { COPY } from './page';
import { PAGE_META, SITE } from './site-data';

// The exhibits on the home page, in the bench's order (DEVICES in
// components/bench/Bench.jsx), each named by its section's heading.
const EXHIBITS = ['websites', 'pos', 'hardware'];

// Everything the command menu shows, in one language. The layout hands it to
// the header, so the menu's code, which loads only when it is opened, needs no
// copy file of its own. Most of it is wording the site already uses.
export function menuWords(lang) {
  const t = COPY[lang];
  const site = SITE[lang];
  const { pages, services, settings, ...words } = t.menu;
  return {
    ...words,
    groups: { pages, services, settings },
    language: site.langSwitchLabel,
    contact: site.nav.contact,
    lamp: site.lamp,
    effects: site.effects,
    pages: [
      { page: 'index', label: site.nav.index },
      { page: 'about', label: site.nav.about },
      { page: 'projects', label: site.nav.projects },
      { page: 'projects/qasa', label: PAGE_META[lang]['projects/qasa'].title.split(' | ')[0] },
      { page: 'contact', label: site.nav.contact },
    ],
    exhibits: [
      ...EXHIBITS.map((id, i) => ({ id, label: t.services[i].title })),
      { id: 'request', label: t.bench.start },
    ],
  };
}
