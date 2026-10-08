# Portfolio — Mustafa Deari Ahmed

Personal portfolio site for Mustafa Deari Ahmed, Computer Engineering
student — software & hardware.

**Live:** https://mshmsh03.github.io/MyWeb/

## Stack

- [Next.js](https://nextjs.org) (App Router), exported as static HTML — no
  Node server runs in production
- [Tailwind CSS v4](https://tailwindcss.com), no component library — the
  job-ticket look (carbon-blue ground, paper sheets, printed-form type) is
  hand-built
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
| `app/[lang]/_content/` | Every word on the site, one file per language (`copy.en.js`, `copy.ar.js`, `copy.ku.js`), all the same shape |
| `app/[lang]/_pages/` | The page layouts, one per page, shared by all three languages |
| `components/sections.jsx` | The shared vocabulary the pages are built from: sheets, fields, tickets, ruled lists |
| `components/JobTicket.jsx` | The ticket a visitor fills in, which turns into a WhatsApp message or an email in their own browser |
| `lib/jobs.js` | The list of work shown as tickets, in the order it is numbered |
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
