# Handoff: the interactive redesign ("The Bench")

Where the work stands, so it can be picked up in another session. Read this,
then `docs/interactive-redesign-spec.md` (the specification the build
follows), then `README.md` and `DEPLOY.md`.

## Branches

- `redesign/interactive`: the work. Pushed to GitHub. Draft pull request #1
  into `main` exists only so the build check runs.
- `feature/transitions`: unfinished step 6 work (see below).
  Branched from `redesign/interactive` at f1b7d82; one commit, fd9f4e4.
  It is not merged and has not been reviewed or browser-checked by me.
- `main`: the live site. **Never push to it, merge into it or deploy.** The
  owner decides when the redesign goes live.

## The owner's standing rules

- Commits are authored as the owner (`mshmsh03
  <161251274+mshmsh03@users.noreply.github.com>`, set in the repo's git
  config), with plain messages: no co-author or "generated with" lines, and no
  mention of Claude, Anthropic or AI anywhere (commits, pull requests, code
  comments, files).
- Spec section 9 (content rules) exactly: no invented facts, numbers,
  testimonials, pictures or services.
- Spec section 8 (limits): no WebGL, no 3D library, no smooth-scroll
  library, no custom cursor, no scroll-jacking, no loading screen, no new
  dependency without a stated reason, no requests to other hosts at run time.
- New Arabic and Kurdish wording reuses the existing copy where it can; every
  new string is listed for the owner to check.
- Before calling something done, look at every changed page in a real browser
  at 390px and 1440px, in English and one right-to-left language, and say
  plainly what was and was not checked.
- Report the home page's compressed JavaScript against the 200KB limit after
  each step (`node scripts/js-budget.mjs`).

## Progress (spec section 10)

| Step | State |
|---|---|
| 0 Housekeeping | Done |
| 1 Bench and request builder | Done, look approved by the owner |
| 2 Live till | Done |
| 3 Site viewer | Done |
| 4 Teardown | Done (repairs text: only "diagnosis, part replacement and maintenance" until the owner confirms more) |
| 5 Projects, Qasa, About, Contact, 404 | Done, reviewed, approved by the owner |
| 6 Section 7 features | In progress, see below |
| 7 Checks, rewrite DESIGN.md, correct PRODUCT.md | Not started |

### Step 6, section 7 features (in the spec's order)

1. Shared-element transition between a project and its page (Projects card
   to the Qasa page and back): **started, unfinished**, on `feature/transitions`
   (`components/PageMorph.jsx`, changes in `Projects.jsx`, `Qasa.jsx`,
   `sections.jsx`, `globals.css`). Review it, finish it, check it in a
   browser with motion on and off, then merge it into `redesign/interactive`.
2. Link previews: **done**. 1200×630 pictures in
   `public/assets/preview/`, made by `scripts/make-previews.mjs` (needs a
   local Chrome; rerun it after the bench, a screenshot on it or a page title
   changes: build, run the script, build again). Redirect stubs in `public/`
   carry the card too.
3. Scroll progress on the header's ruler: **started, unfinished**, on the same branch
   (`app/globals.css`, CSS scroll-driven animation on the header ruler).
4. Lamp switch (light and dark bench): **not started**. Touches every
   colour, so do it on its own, before the command menu.
5. Command menu (button and Ctrl+K: jump to any page or exhibit, switch
   language, copy the email address): **not started**. Load its code on
   demand; it must not push the home page past 200KB.
6. Sound for the till and printer: **done**. Switch on the till, off on
   every load; Web Audio synthesis in `lib/till/sound.mjs` (tests in
   `sound.test.mjs`). Levels were judged by numbers only: listen on a real
   phone and adjust `CUES` if needed. The speaker icon is not mirrored in
   right-to-left.
7. Installable and offline: **done**. Per-language manifests, icons in
   `public/assets/icons/` (PNGs rasterised locally from the SVGs), service
   worker `scripts/sw.js` written to `out/sw.js` with its install list by
   `scripts/offline.mjs` (called from `scripts/postbuild.mjs`), offline page
   `scripts/offline.html` in three languages, registration in
   `components/OfflineWorker.jsx`. About 473KB is saved at install; the
   Arabic faces are saved when first used. Every build gets a new cache
   version (Next's build id changes), so returning visitors re-download the
   install set after each deploy. Offline, clicking a link to an unsaved page
   logs a Next "Failed to fetch RSC payload" message before the offline page
   shows.

## Numbers at the last push

- Home page JavaScript, counting the exhibit chunks that load on scroll:
  about 172KB (en) / 173KB (ar, ku) of 200KB.
- Measured on a slow phone profile (390px, 4× CPU slowdown, 1.6 Mbit/s,
  compressed server) before step 6: largest paint under 1.6s on every page;
  layout shift 0.038 or less on all 15 pages; choosing a bench device 40–64ms;
  till and request-builder taps 56–104ms. Re-measure after step 6.
- 37 unit tests (`npm test`).

## How to check

```
npm ci
npm test
npm run build                 # next build, then scripts/postbuild.mjs
node scripts/js-budget.mjs    # add --check to fail over the limit
mkdir -p preview && rm -rf preview/MyWeb && cp -r out preview/MyWeb
npx serve preview -p 3000     # http://localhost:3000/MyWeb/en/
```

The site lives under `/MyWeb/` (GitHub Pages project page), so serve a folder
that contains `out` renamed to `MyWeb`. CI (`.github/workflows/deploy.yml`)
runs the tests, the build, checks every page and the offline files exist, and
checks the JavaScript limit; it deploys only from `main`.

## Things to know about the code

- Every band of a page, headings and ruled rows are rounded up to whole 24px
  grid cells (`main > *` and `.on-grid` in `app/globals.css`, using
  `calc-size()`), so the rules lie on the mat's grid lines. Band rules are
  painted (`RULE_TOP`), not borders, so they take no space. Browsers without
  `calc-size()` (Safari, Firefox today) lay out as before.
- The inline head script in `app/[lang]/layout.jsx` sets `html[data-motion]`
  before first paint; every animation hangs off `data-motion="on"`.
- Keep each paragraph one run of text (no separately wrapped words inside
  Arabic or Kurdish sentences): a separate run jumps when the Arabic font
  arrives and counts as layout shift.
- Links never prefetch (`Anchor` in `components/sections.jsx`, header links).
- Exhibits load their code near the screen (island pattern in
  `components/exhibits/*/`, `useIsland` in `components/useNearView.js`).

## Waiting on the owner

- A read of the Arabic and Kurdish wording (list of new strings from steps
  1–5 was sent; step 6 adds: till "Sound" / "الصوت" / "دەنگ", the preview
  picture descriptions in the `preview` copy slot, and the offline page words
  in the `offline` slot).
- The repairs he actually does, for the teardown.
- Real pictures of the print work and the Chrispy screens; client quotes.
- Whether the footer motto stays in English on Arabic and Kurdish pages.
- Latin words inside Arabic and Kurdish sentences ("Qasa", "Excel", "(POS)")
  are drawn by the Arabic face; setting them in Archivo caused layout shift,
  so it was backed out.
