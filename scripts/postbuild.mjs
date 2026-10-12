// Next's static export writes its own out/404.html from the framework's
// built-in not-found route. GitHub Pages serves exactly that file for any
// unknown path, so it is the site's real 404 page — and the default one is
// unstyled, unbranded, and does not point anyone back to the site.
//
// A file in public/ cannot fix this: the export copies public/ first and then
// writes the route output over the top. So the site's own page is swapped in
// after the build instead, with the base path filled in the way next.config.js
// sets it.
import { readFile, writeFile } from 'node:fs/promises';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/MyWeb';
const page = await readFile('scripts/404.html', 'utf8');
await writeFile('out/404.html', page.replaceAll('{{BASE}}', BASE));
console.log('postbuild: 404.html in place');
