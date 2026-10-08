import en from '@/app/[lang]/_content/till.en';
import ar from '@/app/[lang]/_content/till.ar';
import ku from '@/app/[lang]/_content/till.ku';

// The till's words in all three of its languages, keyed like the site's
// languages, in the order its language switch offers them.
export const WORDS = { en, ku, ar };
export const TILL_LANGS = ['en', 'ku', 'ar'];

// A line of copy with {placeholders} filled in.
export const fillText = (template, values) =>
  template.replace(/\{(\w+)\}/g, (m, key) => (key in values ? values[key] : m));

// The text either side of one placeholder, for a line that has an element (a
// figure in the till's own face) in the middle of it.
export function around(template, key) {
  const [before, after = ''] = template.split(`{${key}}`);
  return [before, after];
}

// "4 items", by the plural rules of the till's language.
export function countItems(t, n) {
  const form = new Intl.PluralRules(t.lang).select(n);
  return fillText(t.items[form] ?? t.items.other, { n });
}
