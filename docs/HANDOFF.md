# Handoff: the interactive redesign ("The Bench")

Where the work stands, so it can be picked up in another session. Read this,
then `docs/interactive-redesign-spec.md` (the specification the build
follows), then `README.md` and `DEPLOY.md`.

## Branches

- `redesign/interactive`: the work. Pushed to GitHub. Draft pull request #1
  into `main` exists only so the build check runs.
- The step 6 feature branches (`feature/transitions`, `feature/lamp`,
  `feature/command-menu`) were merged into `redesign/interactive` and, at the
  owner's request, deleted on GitHub and locally on 2026-10-13.
- `redesign/job-tickets`: the job-ticket look the owner turned down, still on
  GitHub.
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
| 6 Section 7 features | Done, approved by the owner |
| 7 Checks, rewrite DESIGN.md, correct PRODUCT.md | Done and recorded; the home page's largest paint is at the 2.5s limit (see "Step 7: the checks") |

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
   language, copy the email address): **done**, look and words approved by
   the owner, and it works the lamp and Effects too. See "The command menu"
   below.
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
   `components/OfflineWorker.jsx`. About 480KB is saved at install; the
   Arabic faces are saved when first used. Every build gets a new cache
   version (Next's build id changes); the new worker copies what is unchanged
   across from the old cache and downloads the rest (see "Small fixes after
   step 7").

## Numbers at the last push

- Home page JavaScript, counting every chunk the page can load later (the
  exhibits on scroll, the command menu when opened): 179.2KB (en) / 181.1KB
  (ar) / 181.5KB (ku) of 200KB. The lamp switch is 1.3KB of it; the command
  menu 3.2KB (its button 0.7KB, the words 0.2KB, the menu's own chunk
  2.3KB).
- Slow phone, measured in step 7 (method and detail below): largest paint
  1.6–2.4s on About, Contact and Projects, 2.0–2.8s on Qasa, 2.4–3.0s on the
  home page; layout shift 0.036 or less; every tap measured 40–104ms.
- 37 unit tests (`npm test`).

## Step 7: the checks

Done on 2026-10-13 against the built site, in headless Chrome 155 driven over
the DevTools protocol (the check scripts were kept outside the repository).

### Performance on a slow phone

Profile: 390px at 2x, CPU slowed 4x, 1.6 Mbit/s down and 750 kbit/s up, cold
cache, no service worker, compressed server. DevTools' latency setting has no
effect in this setup (the earlier "under 1.6s" figure was measured without
any round trips, so it was too kind), so a small local proxy adds them: 150ms
before each response, and two more round trips for each new connection. That
is stricter than GitHub Pages, which serves a page over one HTTP/2
connection. Two cold loads of every page in all three languages:

| Page | Largest paint | Layout shift |
|---|---|---|
| Home | en 2.8s; ar 2.5–2.9s; ku 2.4–3.0s | 0.010 or less |
| Projects | 1.8–2.4s | 0.036 (Kurdish, the known font shift), else 0.001 |
| Qasa POS | 2.0–2.8s | 0.001 or less |
| About | 1.6–2.0s | 0.004 or less |
| Contact | 1.6–1.9s | 0.001 or less |

- The largest paint is text (or, on Projects, the first project picture) and
  comes with the first paint. The home page, and Qasa in some runs, are at or
  a little over the 2.5s limit here. The time goes to the browser's first
  layout once the stylesheets are in (0.7–1.2s at 4x). About a third of it is
  Windows loading its own fonts for the fallback faces, which a phone does
  differently, and with one HTTP/2 connection the home page measured 1.5–2.9s.
  A real phone on a real slow connection is still the test that settles it.
  Skipping the layout of the sections below the first screen
  (`content-visibility`) was tried and made no reliable difference, so it was
  not kept.
- The first load after the machine has been idle is erratic (one 6.5s run);
  it was repeated and not counted.
- Lighthouse 12.8 (mobile, simulated throttling) gives the home page a
  largest paint of 3.3s in English and 5.4–5.5s in Arabic and Kurdish (Qasa:
  2.9s and 5.0s). Its model charges the slow network with every download that
  finished before the first paint in a fast run, including the Arabic fonts
  (about 345KB), which the throttled browser does not wait for.
  PageSpeed Insights uses the same model, so expect those numbers there. The
  same fonts share the slow connection with the scripts, which is why Arabic
  and Kurdish pages become interactive later (about 4.5–5.5s; English 3–4s). Lighter Arabic fonts (fewer weights, or no separate display face)
  would help both, but that changes the approved look.
- Taps, from the touch to the next frame, in all three languages: choosing a
  bench device 40–48ms; till keys 40–88ms; the request builder 40–56ms; the
  lamp 64–80ms; opening the command menu 96–104ms.

Found and fixed:
- Motion was lost on slow phones. The head script switched motion off if the
  page had not hydrated within three seconds, and nothing switched it back.
  Arabic and Kurdish pages on this profile hydrate in 4–5.5s, so in a quarter
  of those loads the bench, the till, the viewer, the lamp and the menu stood
  still for the whole visit. The failsafe now allows eight seconds, and
  `MotionRoot` puts motion back as the visitor has it when the bundle does
  run. With scripts blocked, motion still goes off at eight seconds.
- The lamp held up its own tap. The light's centre and reach were custom
  properties on the root, which every element inherits, so the whole page was
  restyled twice before the light could start (about 150ms at 4x). They are
  now given to the transition's two pictures only, through a small style
  element. Frames taken mid-transition are pixel-identical before and after;
  the tap went from as much as 224ms to 64–80ms.
- The 404 page had no icon, so browsers asked for `/favicon.ico` at the
  domain root. It now uses the site's icon, as the offline page does.

### Keyboard

- Tab and Shift+Tab through every page in English, Arabic and Kurdish at
  1440px (both lamps) and English at 390px: the same stops both ways (77 on
  the home page), in reading order, none hidden, off screen or under the
  sticky header, and each with a visible focus ring (the viewer's marks ring
  their dot by design).
- Worked by keyboard alone in all three languages: the skip link; Enter on a
  bench device (its exhibit's heading takes focus); arrow keys in the viewer's
  choices; Enter and Space on the till's keys, the discount switch and Charge;
  the teardown's slider by arrow keys and End (mirrored in right-to-left, as
  the browser does), and its parts; Space on the request builder's needs; the
  lamp and Effects; Ctrl+K, Esc, and focus going back to where it was.

### Screen readers, by what they are given

- axe-core 4.10 (WCAG 2.0, 2.1 and 2.2 A and AA, and best practice) on every
  page in all three languages, at 1440px on the dark bench and 390px on the
  light one, and on the home page again with every exhibit worked and with
  the command menu open: no violations. The 404 and offline pages: none.
- The accessibility tree: banner, navigation, main and footer on every page,
  one h1, sections as h2 and their parts as h3, named regions for the request
  builder and the till's order; the till announces each sale ("Iced latte: 2.
  Total 16,750 IQD.").
- axe could not judge the contrast of text drawn over the mat's grid (it is
  painted with gradients) or under the lamp's pool, so every piece of visible
  text was checked against the solid colour behind it instead, in all three
  languages, on both benches, at both widths, with the exhibits worked: all
  of it passes AA. The one flag, the receipt printer's name on the light
  bench, sits on the printer's own dark body (7.5:1), not on the mat.

### Reduced motion and Effects off

With the system's reduced motion (English, 1440px) and with Effects off
(Arabic, 390px, touch), every moving part of the home page was worked: no
view transition starts (bench, lamp, language switch), the bench does not
tilt, and nothing in the till, viewer, teardown or menu moves. Still running:
colour fades on hover and on a chosen chip, and the ruler's scroll mark, which
follows the scroll position as a scroll bar does. A control run with motion on
caught movement in every step.

### Three languages, phone and desktop

Every page in English, Arabic and Kurdish at 390 and 1440px on both benches,
and at 360px (English, Kurdish) and 320px (Arabic): no sideways scroll, no broken
picture, no console error, no layout shift above 0.006 on load, every tap
target at least 44px. The skip link is the exception: 27–31px tall when it
shows, for keyboards only, and over WCAG 2.2's 24px. Full-page screenshots
were looked at in part. The project transition, the lamp and the command menu
regression checks pass again; 37 unit tests pass.

### Not checked

Firefox, Safari, a real phone, a real slow connection, and a screen reader by
ear (NVDA, VoiceOver, TalkBack).

## Back and Forward

Fixed on 2026-10-13, after step 7, at the owner's request.

What was wrong:
- Back or Forward to another page glided there. With motion on, `html` has
  `scroll-behavior: smooth`, and Chrome uses it when it puts a page back
  where it was. The page went in where the page just left had been scrolled
  (often its top), then glided to where the visitor had been: 0.65s on a
  desktop, 0.85s on the slow phone profile, and the mouse wheel did nothing
  until it got there. Forward from far down a long page to a short one showed
  the short page's bottom first, footer and all, and glided up from there.
- Back from an exhibit did not go back up to the bench. With motion on,
  choosing a device on the bench scrolled to the exhibit inside the
  transition and then pushed the `#exhibit` entry, so the entry being left
  kept the exhibit's place instead of the bench's: Back changed the address
  and stayed put. (With Effects off the device is a plain link and was fine;
  the command menu pushes first and was fine.)
- Not wrong, after all: the note under "The project transition" that Back to
  Projects lands short of where the visitor was (1158 → 689). The check that
  found it scrolled the page itself before clicking (bringing the sticky
  header's link to the middle of the screen moves the page), so the page had
  been left at 689. Back lands where the page was left, before this change
  and after it.

What changed:
- `components/MotionRoot.jsx`, `pageTurnScroll`: on a traversal to another
  page (the Navigation API's `currententrychange`, type "traverse", from an
  entry with a different path), the page's scrolling is instant for two
  frames. React draws the page during the router's `popstate` handling and
  Chrome puts the place back in the next frame, so the page's first frame is
  in place. Back and Forward within a page (between the bench and an exhibit)
  still glide. Browsers without the Navigation API are left as they were.
- `components/bench/BenchStage.jsx`: `history.pushState` before
  `scrollIntoView` in the bench's transition.
- `PageMorph` is unchanged; its two pages keep their own places (`manual`),
  as before.

Checked (built site, headless Chrome 155; Back and Forward sent as the
browser's own buttons send them, `Page.navigateToHistoryEntry`):
- Six round trips, each left from somewhere down the page, then Back, Forward
  and Back again: Projects to About, home to Contact, home to Projects by the
  link in the page, About to Projects, Qasa to Contact, Contact to home. In
  English and Kurdish at 1440px and English and Arabic at 390px (touch), every
  step lands exactly where the visitor was. Frame by frame (English 1440px,
  and Arabic 390px with the CPU slowed 4x), the page's first frame is already
  in place, on Back and on Forward to a short page; the previous build, run
  alongside, glided as described above.
- The bench and an exhibit, by the bench (Effects on and off) and by the
  command menu, English 1440px and Arabic 390px: Back glides up to where the
  visitor was, Forward down to the exhibit again.
- Back across the language switch, with the browser's page memory and
  without it: the page comes back in place without gliding (unchanged).
- The project transition (English 1440px, Arabic 390px touch and with Effects
  off, Kurdish with reduced motion), the lamp, the command menu, keyboard use
  in all three languages: pass as before. 37 unit tests pass.
- Layout shift. In some round trips the frame in which a page goes in at its
  place is reported as a shift of the footer (0.12 to 0.25): Chrome measures
  the footer's move between the two pages from the new scroll position. For
  the browser's own Back and Forward the entry is marked as following input
  (`hadRecentInput`), so it does not count towards CLS; a script calling
  `history.back()` would count it, and the site never does. Before the change
  the same kind of entry came on Forward instead (0.13), marked the same way.

Not changed then (Back pressed while the page was still gliding within
itself was fixed afterwards; see "Small fixes after step 7"):
- The command menu check failed 4 of 16 English runs on this build and none
  of 15 on the previous one; the last 12 runs alternated the two builds and
  all passed. In each failure the word typed after Esc and Ctrl+K never
  reached the field: most likely Ctrl+K arrived before the menu had heard of
  its own closing (`CommandButton` reads its state, which the dialog's
  `close` event updates a task later) and so closed it again. A person cannot
  press the two keys that close together; neither change touches the menu.

Not checked: Firefox and Safari (whether they glide too), a real phone, and
the phone's back gesture.

## Small fixes after step 7

Done on 2026-10-13 at the owner's request, for the small issues left open
above and in step 6, with one more found on the way. Checked on the built
site in headless Chrome 155; the offline checks used a local server that can
drop every connection mid-check and logs every file it sends, with nothing
left to the browser's own cache.

- Back pressed while the page was still gliding within itself (to an exhibit
  chosen in the command menu, 0.5 to 0.9s after choosing) stayed near the
  exhibit: Chrome took the glide for the visitor scrolling and did not put
  the page back. `MotionRoot` now keeps each history entry's place from the
  scroll events; on Back or Forward within a page it stops a glide still
  running and goes to that place, gliding with motion on. Checked 0.3 to 1.2s
  after choosing, by the menu and by the bench, in English and Kurdish at
  1440px and English and Arabic at 390px: back at the bench's place every
  time.
- Offline, a link to a page the worker had not saved logged Next's "Failed to
  fetch RSC payload" (and a "Failed to load resource" line) before the
  offline page showed. The worker now answers the router's request for a
  page's data, when there is neither network nor a saved copy, with an empty
  204 (`networkFirst`, only for requests with the router's `RSC: 1`); Next
  takes that as a plain page and loads it in full without a word, and the
  offline page answers. Checked in English and Kurdish at 1440px and Arabic
  at 390px: the offline page in the right language, nothing in the console.
- The offline page and the 404 page now take part in the site's
  page-to-page transition and skip it, so they still appear at once. The
  site's pages ask for one (`@view-transition`), and Chrome reported
  "Transition was aborted ... opt-in disabled" as an error on a page that
  does not take part: arriving offline, or at the 404 page from a page of
  the site.
- Found on the way, and older: switching language with Effects off or with
  reduced motion logged "AbortError: Transition was skipped". The head
  script skips the transition, and Chrome reports the rejected `ready`
  promise unless it is caught; it now is, there and on the offline and 404
  pages. Step 7's checks missed it. Checked: the language switch with
  Effects off, reduced motion and motion on, and the 404 page reached from a
  page of the site, all with nothing in the console.
- Updates. Every deploy gave the worker a new cache, and the new worker
  downloaded its whole install set again and dropped everything saved as it
  was used, the Arabic fonts among them: offline after an update, Arabic and
  Kurdish pages fell back to the system's faces. `scripts/offline.mjs` now
  writes a hash of every file the worker may keep into it (`FILES`: the
  install set, every picture and every hashed file, 108 in all); each worker
  keeps that list in its cache (`sw-files`), and the next one copies across
  every file whose hash is unchanged before it downloads the rest. A worker
  from before the list is trusted for the hashed files only, whose names
  change with their content. Measured (a returning visitor who has opened
  the English and Arabic home pages):

  | Update | Downloaded | Saved as used, after it |
  |---|---|---|
  | Previous worker, to a copy differing only in its version | all 38 install files (about 480KB as GitHub Pages sends them) | the 4 Arabic font files and 2 pictures gone |
  | Previous worker to this one (the first deploy of this change) | 21: pages, offline pages, manifests, pictures, icons and the 2 changed scripts | all fonts kept; the 2 pictures gone, once |
  | This worker to a rebuild of the same code | 3: the three home pages (about 75KB compressed) | all kept |

  After each update the Arabic home page opened offline in its own faces,
  with nothing in the console (after the first deploy of this change, one of
  the two lost pictures failed to load, twice).

Not fixed: the small jump when the Arabic fonts arrive.
- With the fonts held back until after the first paint (a first visit on a
  slow connection), their arrival moves the Arabic and Kurdish pages by up
  to 0.036: Kurdish Projects at 390px, then the home pages (0.010 to 0.025)
  and About at 390px (0.018 to 0.020); the rest 0.011 or less. All are under
  Google's 0.1 line for "good". On the Kurdish home page at 1440px, 0.019 of
  its 0.025 comes from Archivo (the owner's name, set wide), not from the
  Arabic faces.
- next/font's stand-in face (Arial) is sized on Latin letters. Measured on
  the site's visible text it is about right for Arabic (0.4% wide on
  average) and 4.5% wide for Kurdish, but single sentences are more than 3%
  off either way (three in four Kurdish ones, two in five Arabic ones), so
  no one size keeps every line break. Faces sized per weight on Arabic
  letters were tried: Kurdish Projects went to 0.002, but other pages moved
  more (Arabic Qasa 0.044 at 1440px, Arabic Contact 0.024 at 390px), 0.21 in
  all over the 20 pages and widths against 0.17 before. Not kept. (Turbopack
  ignores `adjustFontFallback: false`; naming a `fallback` replaces its
  face.)
- What would remove it is the owner's call, together with the Arabic fonts'
  speed (step 7): `font-display: optional` (never a jump, but a first
  visit's first page on a slow connection is set in the system's Arabic
  face), a preload on Arabic and Kurdish pages (the fonts arrive sooner,
  and a slow phone's first paint comes later), or lighter fonts.

Not checked: Firefox and Safari, a real phone, a real loss of connection
(airplane mode), and an update on GitHub Pages itself.

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
  `data-motion="on"`, the light bench off `data-lamp="on"`. If the page has not
  hydrated in eight seconds, motion is switched off; `MotionRoot` switches it
  back when the bundle arrives later.
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
- Code that adds a history entry and scrolls (the bench, the command menu)
  calls `history.pushState` first: the browser keeps the place of the entry
  being left as it is at that moment.
- A script that skips a view transition catches its `ready` promise
  (`v.ready.catch(...)`), or Chrome logs the skip as an error.
- Exhibits load their code near the screen (island pattern in
  `components/exhibits/*/`, `useIsland` in `components/useNearView.js`).

## Waiting on the owner

- A read of the Arabic and Kurdish wording (list of new strings from steps
  1–5 was sent; step 6 adds: till "Sound" / "الصوت" / "دەنگ", the preview
  picture descriptions in the `preview` copy slot, and the offline page words
  in the `offline` slot). Approved already: the lamp's name, "المصباح" /
  "چرا", and the command menu's words (the `menu` slot in each copy file).
- The repairs he actually does, for the teardown.
- Real pictures of the print work and the Chrispy screens; client quotes.
- Whether the footer motto stays in English on Arabic and Kurdish pages.
- Latin words inside Arabic and Kurdish sentences ("Qasa", "Excel", "(POS)")
  are drawn by the Arabic face; setting them in Archivo caused layout shift,
  so it was backed out.
- The Arabic fonts: keep them as they are, or make them lighter or load them
  differently. That decides both their speed on a slow phone (step 7) and
  the small jump when they arrive (see "Small fixes after step 7").

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
  (`lamp-light` keyframes, centred by `--lamp-x`, `--lamp-y`, `--lamp-r`,
  which are set on the transition's two pictures, never on the root),
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
- Back from another page (say About) to Projects was recorded here as
  landing short of where the visitor was (1158 → 689). It does not: the
  check had moved the page before leaving it. See "Back and Forward", which
  fixed what was wrong with Back.
- Kurdish Projects at 390px sometimes logs a 0.036 layout shift while the
  page loads, with or without this branch (the font arriving, by its
  timing). Looked into after step 7 and left for the owner; see "Small fixes
  after step 7".
