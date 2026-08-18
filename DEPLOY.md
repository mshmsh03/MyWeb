# Deploying the portfolio

A **Next.js app exported to static HTML**, served by **GitHub Pages** as a
*project* page at `https://mshmsh03.github.io/MyWeb/`.

```
source (this repo, main)
   │  GitHub Actions: npm ci && npm run build   →  out/
   ▼
GitHub Pages  ──  mshmsh03.github.io/MyWeb/
```

## The basePath

Because this is a project page rather than a user page, everything is served
from `/MyWeb/`, not from the domain root. `next.config.js` sets

```js
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/MyWeb';
```

and Next puts that prefix on every link, every chunk URL, and the router's own
history entries. The handful of URLs Next does **not** rewrite — the favicon and
the background script — go through `asset()` in `lib/site-data.js`, which reads
the same value.

**Pointing a custom domain here later** is three steps, not a refactor:

1. Build with `NEXT_PUBLIC_BASE_PATH=""` (set it in the workflow's `build` step).
2. Change `ORIGIN` in `lib/metadata.js` to the new domain, so canonicals and
   hreflang follow — those are absolute and do not read basePath.
3. Add a `public/CNAME` file containing the domain, and re-run
   `node scripts/make-stubs.cjs public` to regenerate the stubs and sitemap.

## How the build works

`npm run build` runs `next build` then `scripts/postbuild.mjs`. With
`output: 'export'`, the build writes a complete static site to `out/` — no Node
server runs in production. `trailingSlash: true` makes each route a directory
with an `index.html` inside it (`out/en/about/index.html`), which is the form
Pages serves without rewrite rules.

Files that must appear in the published output live in `public/`, copied
verbatim by the export:

| File | Why it is there |
| --- | --- |
| `.nojekyll` | Without it, Pages runs Jekyll, and Jekyll ignores every directory starting with `_` — including `_next`. The site would load with no CSS or JS. |
| `index.html`, `about.html`, `projects.html`, `contact.html` | Redirect stubs for the pre-Next flat URLs. `index.html` also answers `/MyWeb/`. |
| `robots.txt`, `sitemap.xml` | Regenerate with `node scripts/make-stubs.cjs public`. |
| `assets/` | The favicon and `flow-bg.js`, the background canvas script. |

`scripts/postbuild.mjs` then replaces `out/404.html`. Next writes its own
unstyled 404 there from the framework's not-found route, and a file in `public/`
cannot win that race — the export copies `public/` first and writes route output
over the top. The branded one lives at `scripts/404.html`.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds, checks the expected files
exist in `out/`, and publishes. A pull request builds but does not deploy.

The one-time GitHub setting: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. If it is still "Deploy from a branch", the workflow
runs green and nothing changes on the live site.

## URLs

```
/MyWeb/en/  /MyWeb/en/about/  /MyWeb/en/projects/  /MyWeb/en/contact/
/MyWeb/ar/  …   /MyWeb/ku/  …
```

`/MyWeb/` and the old flat URLs (`/MyWeb/about.html`, …) are handled by the
stubs in `public/`: canonical to the English page, `noindex,follow`, a meta
refresh, and a script that picks a language from `navigator.language`.

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000/MyWeb/en/
```

`next dev` honours basePath, so the dev URL carries `/MyWeb` too. Redirect stubs
are not exercised in dev. To check the real published artefact, the server has
to serve `out/` *at* `/MyWeb/`:

```bash
npm run build
mkdir -p /tmp/site && cp -r out /tmp/site/MyWeb
npx serve /tmp/site -l 4322   # http://localhost:4322/MyWeb/
```

## Changing content

Content lives in `app/[lang]/_content/<page>.<lang>.jsx` — one file per page per
language. Nav labels, contact details, page titles and descriptions live in
`lib/site-data.js`. Editing a page means editing three files.
