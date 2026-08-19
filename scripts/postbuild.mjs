// Next's static export writes its own out/404.html from the framework's
// built-in not-found route. GitHub Pages serves exactly that file for any
// unknown path, so it is the site's real 404 page — and the default one is
// unstyled, unbranded, and does not point anyone back to the site.
//
// A file in public/ cannot fix this: the export copies public/ first and then
// writes the route output over the top. So the branded page is swapped in
// after the build instead.
import { copyFile } from 'node:fs/promises';

await copyFile('scripts/404.html', 'out/404.html');
console.log('postbuild: branded 404.html in place');
