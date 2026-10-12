// Makes the export installable and usable offline. Called by postbuild.mjs
// once Next has written out/, it writes:
//
//   out/manifest.<lang>.webmanifest  one per language, linked from that
//                                    language's pages (app/[lang]/layout.jsx)
//   out/offline/<lang>.html          scripts/offline.html in each language
//   out/sw.js                        scripts/sw.js with this build's shell
//                                    list and version filled in
//
// The shell is what the worker saves at install: the three home pages and
// every file they load up front or load on their own (the exhibits' chunks),
// the fonts they set text in, the pictures on their first screen, the offline
// pages, the manifests and the icons.
// It is read from the built pages, so it always names this build's files.
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const OUT = 'out';
const ICONS = '/assets/icons';

// The copy files and lib/site-data.js are ES modules in a package Node treats
// as CommonJS. They import nothing, so each is loaded from its own source.
const load = async (file) =>
  (await import(`data:text/javascript,${encodeURIComponent(await readFile(file, 'utf8'))}`));

const escape = (s) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const attr = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

export async function writeOffline({ base, fonts, fontFiles }) {
  const { LANGS, SITE, PAGE_META } = await load('lib/site-data.js');

  const page = await readFile('scripts/offline.html', 'utf8');
  await mkdir(join(OUT, 'offline'), { recursive: true });
  for (const lang of LANGS) {
    const { default: copy } = await load(`app/[lang]/_content/copy.${lang}.js`);
    const t = copy.offline;
    const words = {
      LANG: SITE[lang].hreflang,
      DIR: SITE[lang].dir,
      SEGMENT: lang,
      TITLE: t.title,
      HEADING: t.heading,
      TEXT: t.text,
      RETRY: t.retry,
      HOME: SITE[lang].nav.index,
    };
    let html = page.replace('/*{{FONTS}}*/', fonts).replaceAll('{{BASE}}', base);
    for (const [k, v] of Object.entries(words)) html = html.replaceAll(`{{${k}}}`, escape(v));
    await writeFile(join(OUT, 'offline', `${lang}.html`), html);

    // Each language installs as its own app that opens on its own home page;
    // the scope is the whole site, so the language switch stays in the app.
    const home = `${base}/${lang}/`;
    const manifest = {
      id: home,
      name: PAGE_META[lang].index.title,
      short_name: 'Mustafa',
      description: PAGE_META[lang].index.description,
      lang: SITE[lang].hreflang,
      dir: SITE[lang].dir,
      start_url: home,
      scope: `${base}/`,
      display: 'standalone',
      theme_color: '#0f3d30',
      background_color: '#0f3d30',
      icons: [
        { src: `${base}${ICONS}/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: `${base}${ICONS}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: `${base}${ICONS}/maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    };
    await writeFile(join(OUT, `manifest.${lang}.webmanifest`), `${JSON.stringify(manifest, null, 2)}\n`);
  }

  // The shell, as URLs.
  const shell = new Set([`${base}/`]);
  for (const lang of LANGS) {
    shell.add(`${base}/${lang}/`);
    shell.add(`${base}/offline/${lang}.html`);
    shell.add(`${base}/manifest.${lang}.webmanifest`);
    const html = await readFile(join(OUT, lang, 'index.html'), 'utf8');
    // A nomodule script is for browsers too old to run the site.
    for (const m of html.matchAll(/<script([^>]*)\ssrc="([^"]+)"([^>]*)>/g)) {
      if (!/nomodule/i.test(m[1] + m[3])) shell.add(m[2]);
    }
    for (const href of attr(html, /<link rel="stylesheet" href="([^"]+)"/g)) shell.add(href);
    // The pictures on the first screen (the ones the page preloads), so a
    // home page in another language does not open offline with a hole in
    // the laptop. Other pictures are saved as they are used.
    for (const href of attr(html, /<link rel="preload" href="([^"]+)" as="image"/g)) shell.add(href);
  }
  // Chunks the up-front scripts load by themselves, as scripts/js-budget.mjs
  // counts them.
  for (const url of [...shell].filter((u) => u.endsWith('.js'))) {
    const js = await readFile(join(OUT, url.slice(base.length)), 'utf8');
    for (const m of js.matchAll(/static\/chunks\/[\w.~-]+\.js/g)) shell.add(`${base}/_next/${m[0]}`);
  }
  for (const f of fontFiles) shell.add(`${base}/_next/static/media/${f}`);
  for (const f of ['icon-192.png', 'icon-512.png', 'maskable-512.png']) shell.add(`${base}${ICONS}/${f}`);
  shell.add(`${base}/assets/favicon.svg`);

  // What installing costs a visitor: the files as GitHub Pages sends them,
  // text compressed, fonts and pictures as they are.
  let bytes = 0;
  for (const url of shell) {
    const path = url.slice(base.length);
    const body = await readFile(join(OUT, path.endsWith('/') ? `${path}index.html` : path));
    bytes += /\.(woff2|png|webp|jpg)$/.test(path) ? body.length : gzipSync(body, { level: 9 }).length;
  }

  // The version is a hash of the whole export, the worker and its shell list,
  // so any change to the site replaces the caches. (Next gives every build a
  // new build ID, so in practice every deploy does.)
  const worker = await readFile('scripts/sw.js', 'utf8');
  const hash = createHash('sha256').update(worker).update(JSON.stringify([...shell]));
  for (const file of (await readdir(OUT, { recursive: true, withFileTypes: true }))
    .filter((d) => d.isFile())
    .map((d) => join(d.parentPath, d.name))
    .filter((p) => p !== join(OUT, 'sw.js'))
    .sort()) {
    hash.update(file).update(await readFile(file));
  }
  const version = hash.digest('hex').slice(0, 12);

  await writeFile(
    join(OUT, 'sw.js'),
    worker
      .replace("'/*{{BASE}}*/'", JSON.stringify(base))
      .replace("'/*{{VERSION}}*/'", JSON.stringify(version))
      .replace('/*{{SHELL}}*/ []', JSON.stringify([...shell]))
      .replace('/*{{LANGS}}*/ []', JSON.stringify(LANGS)),
  );
  console.log(`postbuild: sw.js ${version}, ${shell.size} files saved at install, ${(bytes / 1024).toFixed(0)}KB to download`);
}
