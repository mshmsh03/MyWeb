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
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0d1117;color:#c9d1d9;
       font:400 15px/1.7 SFMono-Regular,Consolas,'Liberation Mono',Menlo,Courier,monospace;padding:24px}
  .p{color:#39a37e;font-size:13px;margin-bottom:14px}
  h1{color:#f0f6fc;font-size:28px;margin:0 0 8px;line-height:1.3}
  .d{color:#8b949e}
  a{color:#4fd1a5;text-decoration:none}
  a:hover{text-decoration:underline}
</style>
</head>
<body>
<div>
  <div class="p">cat $REQUEST_URI</div>
  <h1>404: no such file or directory</h1>
  <p class="d">// returning to <a href="${target('en', 'index')}">~</a></p>
</div>
</body>
</html>
`,
);

fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);

const today = new Date().toISOString().slice(0, 10);
const entries = [];
for (const { seg } of LANGS) {
  for (const page of PAGES) {
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
