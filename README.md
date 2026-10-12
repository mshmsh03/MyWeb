# Portfolio — Mustafa Deari Ahmed

Personal portfolio site for Mustafa Deari Ahmed, Computer Engineering
student — software & hardware.

> **Work in progress:** the redesign on this branch is part-way through. Before
> changing anything, read [`docs/HANDOFF.md`](docs/HANDOFF.md): where the work
> stands, the rules it follows and what to do next.

**Live:** https://mshmsh03.github.io/MyWeb/

## Stack

- [Next.js](https://nextjs.org) (App Router), exported as static HTML — no
  Node server runs in production
- [Tailwind CSS v4](https://tailwindcss.com), no component library — the
  bench (a cutting mat with working devices on it, drawn with CSS 3D
  transforms) is hand-built; no WebGL and no animation library
- Fonts are fetched at build time by `next/font` and served from the site's
  own files; no visitor's browser calls a font host
- Hosted on GitHub Pages as a project page (`/MyWeb/` base path)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # next build, then postbuild — writes the static site to out/
npm run start    # serve out, on an ephemeral port
```

## Languages

Every page is built once and rendered for three languages — English,
Arabic, and Kurdish Sorani (`ckb`) — each on its own route (`/en/`, `/ar/`,
`/ku/`) with proper `dir`/`lang`, hreflang, canonical, and JSON-LD, not
toggled client-side.

## Project structure

| Path | What's there |
| --- | --- |
| `app/[lang]/_content/` | Every word on the site, one file per language (`copy.en.js`, `copy.ar.js`, `copy.ku.js`), all the same shape; the till's own words are in `till.{en,ar,ku}.js`, because it switches language by itself |
| `app/[lang]/_pages/` | The page layouts, one per page, shared by all three languages |
| `components/bench/` | The first screen: the name on the mat and the three devices, drawn as CSS 3D boxes |
| `components/exhibits/` | The three working devices: the site viewer, the till and the teardown. Each loads its code only when the visitor nears it |
| `components/PageMorph.jsx` | Carries a project's screen between Projects and the project's own page, both ways, including Back and Forward |
| `components/RequestBuilder.jsx` | The request a visitor writes, shown as a chat message, which opens in their own WhatsApp or email |
| `components/sections.jsx` | The shared vocabulary the pages are built from: headings, ruled lists, links, browser windows and device screens |
| `lib/jobs.js` | The list of work, with the screenshot each job has |
| `lib/till/money.mjs` | The till's money rules (rounding, discount, change), tested with `npm test` |
| `lib/site-data.js` | Nav labels, contact details, page titles, screenshot sizes — the site's chrome |
| `lib/page.jsx` | `createLangPage()` — the shared boilerplate every route file is built from |
| `lib/metadata.js` | Canonical / hreflang / OG / JSON-LD builders |
| `app/globals.css` | Colour, type, spacing, and motion tokens |

## Docs

- [`PRODUCT.md`](./PRODUCT.md) — what this site is, who it's for, and what's deliberately out of scope
- [`DESIGN.md`](./DESIGN.md) — the design system
- [`DEPLOY.md`](./DEPLOY.md) — how the build works, the `NEXT_PUBLIC_BASE_PATH` setup, and how a deploy reaches the live site

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to
GitHub Pages automatically. The one-time setting this depends on:
**Settings → Pages → Build and deployment → Source: GitHub Actions.**

The site currently lives at a GitHub Pages *project* URL (`/MyWeb/`).
Moving to a custom domain later is a one-line change
(`NEXT_PUBLIC_BASE_PATH=""`) — see `DEPLOY.md`.
