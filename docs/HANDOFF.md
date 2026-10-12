# Handoff: the interactive redesign ("The Bench")

Where the work stands, so it can be picked up in another session. Read this,
then `docs/interactive-redesign-spec.md` (the specification the build
follows), then `README.md` and `DEPLOY.md`.

## Branches

- `redesign/interactive`: the work. Pushed to GitHub. Draft pull request #1
  into `main` exists only so the build check runs.
- `feature/command-menu`: step 6 item 5, the command menu.
- `feature/lamp`: step 6 item 4, the lamp switch, merged into
  `redesign/interactive`.
- `feature/transitions`: step 6 items 1 and 3, finished, checked and merged
  into `redesign/interactive`. The copy on GitHub is the unfinished commit
  (fd9f4e4) from before the merge; it can be deleted.
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
| 6 Section 7 features | Done; the command menu's look is waiting on the owner |
| 7 Checks, rewrite DESIGN.md, correct PRODUCT.md | Not started |

### Step 6, section 7 features (in the spec's order)

1. Shared-element transition between a project and its page (Projects card
   to the Qasa page and back, by link or by Back and Forward): **done**.
   `components/PageMorph.jsx`; see "The project transition" below.
2. Link previews: **done**. 1200×630 pictures in
   `public/assets/preview/`, made by `scripts/make-previews.mjs` (needs a
   local Chrome; rerun it after the bench, a screenshot on it or a page title
   changes: build, run the script, build again). Redirect stubs in `public/`
   carry the card too.
3. Scroll progress on the header's ruler: **done**. A 3×16px ruler-yellow
   mark on `.ruler-edge`, CSS only (`animation-timeline: scroll(root block)`),
   from the right in right-to-left, from 768px up (below that the header
   scrolls away). Browsers without scroll-driven animations, and pages too
   short to scroll, draw no mark.
4. Lamp switch (light and dark bench): **done**, look approved by the owner,
   and the site opens on the dark bench (his choice). See "The lamp" below.
5. Command menu (button and Ctrl+K: jump to any page or exhibit, switch
   language, copy the email address): **done**, and it works the lamp and
   Effects too. See "The command menu" below.
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

- Home page JavaScript, counting every chunk the page can load later (the
  exhibits on scroll, the command menu when opened): 178.8KB (en) / 180.8KB
  (ar) / 181.2KB (ku) of 200KB. The lamp switch is 1.3KB of it; the command
  menu 3.2KB (its button 0.7KB, the words 0.2KB, the menu's own chunk
  2.3KB).
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
- The inline head scripts in `app/[lang]/layout.jsx` set `html[data-motion]`
  and `html[data-lamp]` before first paint; every animation hangs off
  `data-motion="on"`, the light bench off `data-lamp="on"`.
- Colours: anything printed on the mat uses `mat`, `mat-line`, `chalk`,
  `chalk-dim` and `ruler`, which change with the lamp. Device parts use
  `graphite`, `silk` and `silk-dim` (lettering on a device body), `pcb`,
  `marker` (yellow as a fill under graphite text), `screen` and `signal`,
  which do not. A device's shadow on the mat uses `--shadow-device`, or
  `rgb(var(--drop) / calc(alpha * var(--drop-k)))`. A new colour that is a
  hex value in a component is the same in both lamps, so check it on both.
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
  in the `offline` slot). The lamp's name, "المصباح" / "چرا", he approved.
  The command menu adds the `menu` slot in each copy file: name ("Search" /
  "بحث" / "گەڕان"), the field's hint, the group names Pages, Services and
  Settings, "Copy the email address", "Copied" and "Nothing matches.".
- The repairs he actually does, for the teardown.
- Real pictures of the print work and the Chrispy screens; client quotes.
- Whether the footer motto stays in English on Arabic and Kurdish pages.
- Latin words inside Arabic and Kurdish sentences ("Qasa", "Excel", "(POS)")
  are drawn by the Arabic face; setting them in Archivo caused layout shift,
  so it was backed out.

## The command menu

The search button at the end of the nav, or Ctrl+K (⌘K on a Mac; the key's
place, so an Arabic layout works too), opens a dialog drawn as a device: a
graphite bezel round a light screen, so it is the same under either lamp.
- Files: `components/command/CommandButton.jsx` (the button and the
  shortcut, in every page's code), `CommandMenu.jsx` (the menu, its own
  chunk, fetched once the page is idle or when the button is hovered or
  focused), `command.css`; `lib/menu.js` builds its words in the layout from
  the copy files, `SITE` and `PAGE_META`, so the menu needs no copy file.
- Items: the five pages (Qasa POS included), the three services on the bench
  and "Start a request", the three languages, copy the email address, Lamp
  and Effects. Typing narrows the list; letters written more than one way in
  Arabic and Kurdish match as one, and English words match in every
  language (for example "arabic", "lamp").
- Keys: Enter takes the first item; Down and Up move through the items and
  back to the field; Home and End; Esc closes; a click outside closes. Focus
  goes back where it was, except that a service on the same page brings its
  section up and focuses its heading, as the bench does. On a phone the list
  takes focus when it opens, so no keyboard covers it (Chrome ignores
  `autofocus` on a dialog itself, so it is set on the list).
- Copying falls back to selecting the address where the clipboard is not
  allowed. Lamp and Effects close the menu first, so the lamp's light still
  spreads from its bulb.
- The header: the button is 44px; from 768px it shows its shortcut too.
  Below 390px the nav links' padding is 4px (was 8px), so the button fits in
  the first row at 360px in all three languages; from 390px nothing moved.
- Checked: every item by keyboard and pointer in en and ar at 1440px, and
  by touch in en at 390px and ku and ar at 360px; the accessibility tree
  (a modal dialog named Search, a named field, five named groups); header
  heights unchanged (72px from 768px, 96px at 360–390px); with the lamp off
  every page is pixel-identical to before outside the header; no console
  errors or layout shift; the lamp, its transition and the project
  transition still pass.
- Not checked: Firefox, Safari, a real phone, a screen reader by ear.

## The lamp

A bulb in the header (`components/LampSwitch.jsx`), beside Effects, icon
only with "Lamp" as its name, so it fits the phone header from 360px; at
320px the two switches take a row of their own.
- Light bench (`html[data-lamp='on']` in `app/globals.css`): mat `#e6ede7`,
  grid `#93b3a3` (the dark bench's 1.9:1), text `#0f3d30` (10.2:1),
  secondary text `#3d6455` (5.6:1), ruler marks and the focus ring `#8a5a00`
  (5.0:1), and a pool of warm light from above the top of the screen
  (`body::before`, fixed). Device shadows soften (`--drop`, `--drop-k`). The
  request builder's fields take a 1px edge there, or they vanish on the
  pale mat.
- Remembered in `localStorage` (`lamp`), applied before the first paint, with
  the browser bar's colour (`theme-color`). Back to a page kept in the
  browser's memory, or a switch in another tab, brings the page in line.
- With motion on, a View Transition: the lit page grows out of the bulb
  (`lamp-light` keyframes, centred by `--lamp-x`, `--lamp-y`, `--lamp-r`),
  or shrinks back into it. Fixes after the owner found it "sometimes
  glitchy": colours change at once while it switches (`data-switching`
  turns transitions off), so no control fades in after the light has passed
  it; the circle is drawn by CSS from its first frame; a second press while
  the light moves ends the first change and switches back at once (a click
  on the bulb lands on the page's root during the transition and is caught
  there), where it used to jump and then crossfade.
- `scripts/404.html` and `scripts/offline.html` follow the lamp too.
- Checked: with the lamp off, all 20 full pages (en and ar, 1440px and
  390px) and the 404 and offline pages are pixel-identical to before apart
  from the header, where the bulb now sits; every page lit, in en, ar and ku; the switch
  recorded frame by frame (once, twice quickly by mouse and by keyboard, on a
  phone); reduced motion; the project transition still passes.
- Not checked: Firefox, Safari, a real phone.
- Step 7 has to write the light bench into `DESIGN.md`; the spec's colour
  table describes only the dark one.

## The project transition

How it works (the comments in `components/PageMorph.jsx` say more):
- Both pages render `PageMorph` with the same name. On Projects it is the
  card's own `<article>` (`as="article"`, `item`), so neither page has a new
  wrapper and the 24px grid is untouched. The frame that travels is the
  `[data-frame]` inside: the card's `DeviceScreen frame`, the till's screen.
- Leaving: a click on a router link to the other page, or the Navigation API
  `navigate` event for Back and Forward. Arriving: the other end's first
  render suspends until the old page's picture is taken, then names its
  frame and lets the transition run. It sets `data-morphing` and fires
  `morphend`, so the till's island waits for the morph before swapping in.
- Arriving on Projects: focus goes to the card's "Read more", not the h1.
  Back and Forward put the page exactly where the visitor was. Arriving by
  the link on Qasa centres the card.
- Scroll on Back and Forward. Chrome restores a page's place only once the
  transition lets the page be drawn again, after the new picture is taken,
  so the page jumped under the morph, to the wrong place. It decides this
  when the entry is left, so a trip that leaves an entry keeps its place and
  sets `history.scrollRestoration = 'manual'` on it; the next arrival there
  puts the place back and sets `auto` again. Entries pushed in between are
  handed back to the browser at once. A trip that never arrives (the visitor
  goes elsewhere first) is dropped, and the place is still put back on a
  later Back, a frame after the page is drawn (in the same frame it counted
  as layout shift).
- The card's picture is `loading="lazy"`, and a lazy picture is not fetched
  while the transition holds the page; it is switched to eager before
  `decode()`, which had been waiting out the 2s limit on every Back.
- `:root::view-transition { direction: ltr }` in `globals.css`, for every
  transition on the site: on a right-to-left page Chrome counted each frame
  of a picture changing width as layout shift. Frames frozen mid-morph are
  pixel-identical with and without it (this morph, the bench's, and the
  language switch, in Arabic).
- No new user-visible strings.

Checked (built site, headless Chrome 155 driven over the DevTools protocol,
as `scripts/make-previews.mjs` does; the browser extension was not
connected): Projects → Read more → Back → Forward → Qasa's "Projects" link,
in en, ar and ku at 1440px and 390px (touch); with reduced motion; with
Effects off (ar, 390px); without the Navigation API (links still morph, Back
and Forward are plain navigations and land in the right place); a trip
abandoned for another page. Every step morphed with the shared frame (or,
with motion off, did not animate), landed in the right place, put focus as
above, left the till's swap until after the morph, and logged no console
errors and no layout shift. The ruler mark on every page in all three
languages, at 767px and 768px, and on pages that cannot scroll. Mid-morph
screenshots looked right.

Not checked:
- Firefox and Safari (no browser for them here). Both have View
  Transitions and the Navigation API in recent versions; neither had
  `calc-size()` when the grid work was done.
- A real phone, and the timing on a slow one.

Found along the way, not changed (they are not this branch's):
- Back from another page (say About) to Projects, with no transition
  involved, lands short of where the visitor was (1158 → 689 in one run,
  1226 → 757 in another), on `redesign/interactive` as well. The browser's
  own restoration under the router. The same `manual` and put-back approach
  would fix it site-wide, but it touches every page.
- Kurdish Projects at 390px sometimes logs a 0.036 layout shift while the
  page loads, with or without this branch (the font arriving, by its
  timing).
