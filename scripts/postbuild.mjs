// Next's static export writes its own out/404.html from the framework's
// built-in not-found route. GitHub Pages serves exactly that file for any
// unknown path, so it is the site's real 404 page — and the default one is
// unstyled, unbranded, and does not point anyone back to the site.
//
// A file in public/ cannot fix this: the export copies public/ first and then
// writes the route output over the top. So the site's own page is swapped in
// after the build instead, with the base path filled in the way next.config.js
// sets it.
//
// The page is set in the site's own faces. Their files are the ones next/font
// wrote for the build, under hashed names, so their @font-face rules are
// copied out of the build's stylesheets: Archivo's Latin file and the Arabic
// files of the two Arabic faces, with the URLs made absolute.
import { readdir, readFile, writeFile } from 'node:fs/promises';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/MyWeb';
const CHUNKS = 'out/_next/static/chunks';

const css = (
  await Promise.all(
    (await readdir(CHUNKS)).filter((f) => f.endsWith('.css')).map((f) => readFile(`${CHUNKS}/${f}`, 'utf8')),
  )
).join('\n');
const faces = [...new Set(css.match(/@font-face\{[^}]*\}/g) ?? [])];
const pick = (family, range) =>
  faces.find((f) => f.includes(`font-family:${family};`) && f.includes(`unicode-range:${range}`));
const wanted = [pick('Archivo', 'U+??,'), pick('Noto Kufi Arabic', 'U+6??,'), pick('Noto Sans Arabic', 'U+6??,')];
if (wanted.some((f) => !f)) throw new Error('postbuild: a font face for 404.html is missing from the build CSS');
const fonts = wanted.map((f) => f.replaceAll('url(../media/', `url(${BASE}/_next/static/media/`)).join('\n');

const page = await readFile('scripts/404.html', 'utf8');
await writeFile('out/404.html', page.replace('/*{{FONTS}}*/', fonts).replaceAll('{{BASE}}', BASE));
console.log('postbuild: 404.html in place');
