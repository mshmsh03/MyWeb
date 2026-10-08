// Writes the redirect stubs, 404, robots.txt, and sitemap that a static export
// cannot produce for itself. Run once; the output is committed under public/
// (and scripts/404.html — see postbuild.mjs for why that one is not in public/).
//
//   node scripts/make-stubs.cjs public
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];

// Kept in step with next.config.js. The site is a GitHub Pages *project* page,
// so every absolute path below has to carry the /MyWeb prefix: these files are
// plain HTML served straight off disk, and nothing rewrites them for us.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/MyWeb';
const BASE = `https://mshmsh03.github.io${BASE_PATH}`;

const LANGS = [
  { seg: 'en', hreflang: 'en' },
  { seg: 'ar', hreflang: 'ar' },
  { seg: 'ku', hreflang: 'ckb' },
];
const PAGES = ['index', 'about', 'projects', 'contact'];
// Routes added after the move to Next never had a flat .html URL, so they need
// no redirect stub — but they do belong in the sitemap.
const SITEMAP_PAGES = [...PAGES, 'projects/qasa'];

const url = (seg, page) => (page === 'index' ? `${BASE}/${seg}/` : `${BASE}/${seg}/${page}/`);
const target = (seg, page) =>
  page === 'index' ? `${BASE_PATH}/${seg}/` : `${BASE_PATH}/${seg}/${page}/`;

// The pre-Next site was English-only at flat URLs (/about.html …). These stubs
// keep those working and pick a language from the browser rather than always
// dumping an Arabic-speaking visitor on English.
const stub = (page) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Mustafa Deari Ahmed</title>
<link rel="canonical" href="${url('en', page)}">
<meta name="robots" content="noindex,follow">
<meta http-equiv="refresh" content="0; url=${target('en', page)}">
<script>
(function () {
  var seg = 'en';
  try {
    var nav = (navigator.language || '').toLowerCase();
    if (nav.indexOf('ar') === 0) seg = 'ar';
    else if (nav.indexOf('ckb') === 0 || nav.indexOf('ku') === 0) seg = 'ku';
  } catch (e) {}
  location.replace('${BASE_PATH}/' + seg + '${page === 'index' ? '/' : `/${page}/`}');
})();
</script>
</head>
<body><p>Redirecting to <a href="${target('en', page)}">${target('en', page)}</a>…</p></body>
</html>
`;

for (const page of PAGES) {
  // index.html doubles as the site root: GitHub Pages serves it for /MyWeb/ too.
  fs.writeFileSync(path.join(OUT, `${page}.html`), stub(page));
}

// GitHub Pages serves /404.html for anything it cannot find. Written next to
// this script rather than into public/ — postbuild.mjs copies it over Next's
// own generated 404.
fs.writeFileSync(
  path.join(__dirname, '404.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>404 — Mustafa Deari Ahmed</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="3; url=${target('en', 'index')}">
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1a2a7c;color:#0f1838;
       font:400 16px/1.6 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;padding:24px}
  .t{background:#fbfbf7;border-radius:3px;padding:28px 32px;max-width:440px;
     box-shadow:0 1px 0 rgba(8,13,48,.25),0 18px 34px -16px rgba(5,9,40,.75)}
  .l{display:flex;justify-content:space-between;align-items:baseline;color:#2540c4;font-size:12px;
     font-weight:600;letter-spacing:.09em;text-transform:uppercase}
  .n{color:#d1232a;font-size:22px;font-weight:700;letter-spacing:0}
  h1{font-size:26px;line-height:1.15;margin:14px 0 8px}
  p{margin:0;color:#3a4366}
  a{color:#0f1838;font-weight:600;text-decoration:underline;text-decoration-color:#2540c4;
    text-decoration-thickness:2px;text-underline-offset:4px}
  a:hover{color:#2540c4}
</style>
</head>
<body>
<div class="t">
  <div class="l"><span>Job ticket</span><span class="n">404</span></div>
  <h1>No ticket with this number.</h1>
  <p>This page does not exist. Taking you back to <a href="${target('en', 'index')}">the front of the book</a>.</p>
</div>
</body>
</html>
`,
);

fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);

const today = new Date().toISOString().slice(0, 10);
const entries = [];
for (const { seg } of LANGS) {
  for (const page of SITEMAP_PAGES) {
    const alts = LANGS.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${url(l.seg, page)}"/>`,
    ).join('\n');
    entries.push(`  <url>
    <loc>${url(seg, page)}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', page)}"/>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === 'index' ? '1.0' : '0.8'}</priority>
  </url>`);
  }
}

fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`,
);

console.log(
  `wrote ${PAGES.length} stubs + scripts/404.html + robots.txt + sitemap.xml (${entries.length} urls)`,
);
