// The home page may load at most 200KB of compressed JavaScript before the
// visitor first interacts with it. This reads the exported page, finds every
// script it loads up front, and adds up their gzipped sizes.
//
// The exhibits load their own code as they come near the screen, which
// scrolling alone does, and the site viewer's starts just under the first
// screen, so it loads at once. So the code those up-front scripts can load
// on their own (every chunk they name) is added too, and the limit is
// checked against that total. That counts the command menu's code as well,
// which loads only when the menu is opened: a little over, never under.
//
//   node scripts/js-budget.mjs            report en, ar and ku home pages
//   node scripts/js-budget.mjs --check    the same, and fail over the limit
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const OUT = 'out';
const LIMIT = 200 * 1024;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/MyWeb';

function measure(page) {
  const html = readFileSync(join(OUT, page), 'utf8');
  // A `noModule` script is the polyfill bundle for browsers too old to run
  // modules; every browser that can run the site skips it, so it is not
  // counted.
  const srcs = new Set();
  for (const m of html.matchAll(/<script([^>]*)\ssrc="([^"]+)"([^>]*)>/g)) {
    if (!/nomodule/i.test(m[1] + m[3])) srcs.add(m[2]);
  }
  const gz = (file) => gzipSync(readFileSync(join(OUT, file)), { level: 9 }).length;
  const files = [...srcs].map((src) => src.replace(BASE, '').split('?')[0]);
  let external = 0;
  const later = new Set();
  for (const file of files) {
    external += gz(file);
    for (const m of readFileSync(join(OUT, file), 'utf8').matchAll(/static\/chunks\/[\w.~-]+\.js/g)) {
      const chunk = `/_next/${m[0]}`;
      if (!files.includes(chunk)) later.add(chunk);
    }
  }
  let lazy = 0;
  for (const chunk of later) lazy += gz(chunk);
  // Inline scripts: the React payload, and the motion and lamp switches.
  let inline = 0;
  for (const m of html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    inline += gzipSync(Buffer.from(m[1]), { level: 9 }).length;
  }
  return { files: srcs.size, external, inline, lazy, lazyFiles: later.size, total: external + inline + lazy };
}

const kb = (n) => `${(n / 1024).toFixed(1)}KB`;
let over = false;
for (const lang of ['en', 'ar', 'ku']) {
  const r = measure(`${lang}/index.html`);
  over ||= r.total > LIMIT;
  console.log(
    `${lang}/  ${r.files} script files ${kb(r.external)} + inline ${kb(r.inline)} + ${r.lazyFiles} chunks loaded later ${kb(r.lazy)} = ${kb(r.total)} gzipped (limit ${kb(LIMIT)})`,
  );
}
if (over && process.argv.includes('--check')) {
  console.error('home page JavaScript is over the limit');
  process.exit(1);
}
