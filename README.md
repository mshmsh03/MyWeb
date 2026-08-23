# Portfolio — Mustafa Deari Ahmed

Personal portfolio site for Mustafa Deari Ahmed, Computer Engineering
student — software & hardware.

**Live:** https://mshmsh03.github.io/MyWeb/

## Stack

- [Next.js](https://nextjs.org) (App Router), exported as static HTML — no
  Node server runs in production
- [Tailwind CSS v4](https://tailwindcss.com), no component library — the
  terminal aesthetic (monospace type, GitHub-dark palette, scanline wash) is
  hand-built
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
| `app/[lang]/_content/` | Page content, one file per page per language |
| `components/sections.jsx` | The shared section/card vocabulary the content files are built from |
| `components/FlowBackground.jsx` | The always-on ambient particle background — a deliberate, documented exception to the site's reduced-motion rule, see `DESIGN.md` |
| `lib/site-data.js` | Nav labels, footer text, contact details — the site's chrome |
| `lib/page.jsx` | `createLangPage()` — the shared boilerplate every route file is built from |
| `lib/metadata.js` | Canonical / hreflang / OG / JSON-LD builders |
| `app/globals.css` | Colour, type, spacing, and motion tokens |

## Docs

- [`PRODUCT.md`](./PRODUCT.md) — what this site is, who it's for, and what's deliberately out of scope
- [`DESIGN.md`](./DESIGN.md) — the design system, including the reduced-motion exception for the background
- [`DEPLOY.md`](./DEPLOY.md) — how the build works, the `NEXT_PUBLIC_BASE_PATH` setup, and how a deploy reaches the live site

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to
GitHub Pages automatically. The one-time setting this depends on:
**Settings → Pages → Build and deployment → Source: GitHub Actions.**

The site currently lives at a GitHub Pages *project* URL (`/MyWeb/`).
Moving to a custom domain later is a one-line change
(`NEXT_PUBLIC_BASE_PATH=""`) — see `DEPLOY.md`.
