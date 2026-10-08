# Interactive redesign — specification

Written 2026-10-08. This replaces the job-ticket look on branch `redesign/job-tickets`, which the owner found too simple. Nothing in this document is built yet.

## 1. What the owner asked for

- A site that is **interactive and unique, with many working features**, so that a visitor can see he is capable of building such things.
- Not simple, not a template, not "only for programmers".
- No pointless moving background.
- It must still win work from two audiences, weighted equally: local business owners (website, point-of-sale system, repair) and employers (job or internship).

## 2. The idea

**Everything the site claims, the visitor can operate.**

The site is a workbench. On it sit three devices, one for each thing he does, and each device is switched on and really works:

1. a **laptop** running his real client websites, which the visitor can switch between languages and screen sizes;
2. a **till** the visitor can ring up a sale on, which rounds dinars, takes dollars, flips to Kurdish or Arabic, and prints a receipt;
3. an **open computer** the visitor can take apart, part by part.

Every device ends in the same action: a request to him, already written, sent on WhatsApp.

Research behind this choice (full report: `reports/Interactive portfolio site research.md`, kept out of git):

- Award juries and users agree that one clear idea beats a pile of animations, and that a working demo of the person's own skill is the strongest centrepiece.
- No award-featured portfolio was found that is built around a live point-of-sale demo or a hardware interaction. That space is open.
- 87.5% of web traffic in Iraq is mobile and about 80% of phones are Android, mostly budget brands. A site that stutters on a mid-range Android phone fails most of his visitors.
- Scroll-jacking, custom cursors and long preloaders are the three most-criticised portfolio habits. None is used here.

## 3. The look: "The Bench"

A self-healing cutting mat seen from above and slightly in front, the kind used for both print trimming and electronics repair. The mat's printed grid is the page's layout grid.

### Colours

| Name | Hex | Used for |
|---|---|---|
| Mat | `#0F3D30` | The ground of every page |
| Mat line | `#2C6A55` | The printed grid, ruler ticks, hairlines. Never text |
| Chalk | `#F3F6F2` | Headings and main text on the mat; light parts of the devices |
| Chalk dim | `#B5CCC2` | Secondary text on the mat |
| Graphite | `#14191A` | Device bodies, dark panels, text on light surfaces |
| Signal orange | `#FF6A2B` | The one action colour: primary buttons and active states. As a fill with graphite text, never as small text on the mat |
| Ruler yellow | `#F2D24B` | Measurement marks, highlights, the focus ring |

Screens inside the devices are light (`#F7F8F5` ground, graphite text), so the working parts read like real interfaces and stay legible outdoors on a phone.

All text must reach 4.5:1 contrast (3:1 for text 24px and larger). Verify each pairing when it is first used.

### Type

| Role | Face | Notes |
|---|---|---|
| Display | Archivo, width axis 110–125, weight 800–900 | Headlines and the name. On pointer devices the width axis may react to the pointer (Latin only) |
| Labels | Archivo, width axis 70, weight 600, capitals | Small labels on devices and rulers. Never placed above a heading as a kicker |
| Text | Archivo, normal width, 400–500 | Body, 17px base, lines no longer than 65 characters |
| Money and receipts | IBM Plex Mono | Only on the till and its receipt. It is the face his Qasa till uses |
| Arabic and Kurdish display | Noto Kufi Arabic | |
| Arabic and Kurdish text | Noto Sans Arabic | Line-height 1.85 |

Fonts are loaded with `next/font` so they are served from the site's own files.

Rules for Arabic and Kurdish: never letter-space, never split text into single letters for animation, never apply a text stroke. Names written in Latin (Qasa POS, Chrispy, Krofi, domains, the phone number, his own name) stay in the Latin face and left-to-right.

### Depth and motion

- Devices are built with CSS 3D transforms from ordinary HTML elements, not WebGL. This is deliberate: their screens are then real, working HTML, they cost almost nothing to draw on a budget phone, and they work inside the in-app browsers of WhatsApp and Instagram.
- Devices cast soft contact shadows on the mat. Nothing else has a shadow.
- Motion is physical: things are picked up, set down, slid open, printed. Direct manipulation uses a spring; transitions run 200–500ms with an ease-out curve.
- Nothing loops on its own. An idle movement may run for at most five seconds after load.
- Every animation is switched off under `prefers-reduced-motion`, and the header carries an "Effects" switch that does the same thing by hand.

## 4. The first screen

- The name is printed across the mat in large chalk letters, the way a mat carries its maker's name. It is the page's `h1`.
- The three devices sit on the mat across it, turned three-quarters toward the viewer. Each carries a short label: Websites, Point of sale, Hardware. Moving the pointer tilts the whole bench a few degrees.
- Choosing a device brings it forward and its screen grows into the full exhibit below (View Transitions API where supported, an instant jump elsewhere).
- Along the bottom: one sentence saying what he does, the primary action "Start a request" in signal orange, and "See the work".
- On a phone the name takes two lines, the devices sit in a compact cluster below it, each is a large tap target, and the two actions stay in the first screen.

A still image of the bench is in the HTML from the start, so the first screen is complete before any script runs. The interactive version takes over once it has loaded.

## 5. The exhibits

Each exhibit is a real set of HTML controls. Each works by keyboard, by touch and with a screen reader, and each has a plain fallback when scripts fail.

### 5.1 Site viewer (the laptop)

- A browser frame showing a real client site. Tabs: Ellin Company, Bright Volition.
- **Language** control: English, Arabic, Kurdish. The frame swaps to a real screenshot of that language's page, so the right-to-left mirror is visible.
- **Size** control: desktop, phone. The frame changes width with an animation and shows the matching screenshot.
- Two or three hotspots per site, each a one-line fact already stated on the current site.
- A link to the live site.
- Assets: all twelve screenshots are already in `public/assets/work/`, captured from the live sites on 2026-10-08 with their origin recorded in the files.

| Site | Desktop, 1200×572 | Phone, 780×1688 (a 390×844 screen at 2×) |
|---|---|---|
| Ellin Company | `ellin.jpg` (English), `ellin-ar.jpg`, `ellin-ku.jpg` | `ellin-en-phone.jpg`, `ellin-ar-phone.jpg`, `ellin-ku-phone.jpg` |
| Bright Volition | `bright-volition.jpg` (English), `bright-volition-ar.jpg`, `bright-volition-ku.jpg` | `bright-volition-en-phone.jpg`, `bright-volition-ar-phone.jpg`, `bright-volition-ku-phone.jpg` |

The live addresses are `https://ellincompany.com/{en,ar,ku}/` and `https://brightvolition.com/{en,ar,ku}/`.

### 5.2 Live till (the till)

A small working copy of the sell screen of Qasa POS.

- Eight sample products in three categories, taken from Qasa's own sample data and labelled as a sample.
- The order is drawn as a receipt. Lines can be added, increased and removed.
- A 10% discount switch.
- Totals: subtotal, discount, rounding to the nearest 250 dinars, total, and the dollar equivalent at a sample rate shown on screen.
- Pay in dinars or in dollars. Paying in dollars gives the change in dinars.
- A language switch inside the till turns it Kurdish or Arabic and mirrors it, whatever language the page is in.
- "Charge" prints the receipt: the paper feeds out of the printer slot with a torn edge.
- The printed receipt ends with the action: "Want a till like this for your shop?", which opens the request builder with "POS system" already chosen.
- The money rules (rounding, discount, change) are pure functions with unit tests that run in the build.

### 5.3 Teardown (the open computer)

- A desktop computer drawn in layers. An "Open" control, as both a slider and a pair of buttons, lifts the side panel away and separates the parts: cooler and fan, memory, storage, power supply, motherboard.
- Choosing a part shows its name, what it does in one plain sentence, and the usual signs that it is failing.
- A symptom picker: "will not turn on", "very slow", "hot or noisy", "nothing on the screen". Choosing one lights up the parts usually responsible.
- The action: "Send this to Mustafa", which opens the request builder with the symptom already written.
- **Blocked on the owner:** the list of repairs he actually does. Until he confirms it, the text says only what the current site says: diagnosis, part replacement and maintenance.

### 5.4 Request builder (every page)

- Choose what is needed: Website, POS system, Hardware repair, Job or internship offer.
- Add a line of detail and a name, both optional.
- The message is shown as it will be sent, as a chat bubble, and updates with every change.
- Send on WhatsApp, or by email, or call. Nothing is sent or stored by the site; the message is built in the visitor's browser and handed to their own app.
- An exhibit can open it with a choice already made.

The composing logic already exists in `components/JobTicket.jsx` on `redesign/job-tickets` and is reused.

## 6. Pages

| Page | What is on it |
|---|---|
| Home | The bench, the three exhibits, a short list of work, the request builder |
| Projects | Websites as small browser frames, software as device screens, print work as a list until real pictures exist |
| Qasa POS | The live till at full size, then the existing copy about what Qasa does |
| About | The existing rows, laid out as the specification plate on the back of a device |
| Contact | The request builder at full size and the direct lines |
| 404 | A missing part on the bench, with the way back |

All pages exist in English, Arabic and Kurdish, as now. Switching language plays a short mirror transition.

## 7. Further features, in order of value

Built only after the pages above are approved.

1. Shared-element transitions between a project and its page.
2. Link previews: an image and description for each page, so a link sent on WhatsApp or Instagram shows the bench.
3. Scroll progress shown on the mat's ruler (CSS scroll-driven animation, with a plain fallback where unsupported).
4. A lamp switch for a light and a dark bench.
5. A command menu (button and Ctrl+K): jump to any page or exhibit, switch language, copy the email address.
6. Sound for the till and printer, off until the visitor turns it on.
7. Installable and usable offline, like his till.

## 8. Limits the build must stay inside

**Performance**, measured on a mid-range Android phone on a slow 4G profile:

- Largest Contentful Paint under 2.5s, Interaction to Next Paint under 200ms, Cumulative Layout Shift under 0.1.
- No more than 200KB of compressed JavaScript before the first interaction on the home page.
- No WebGL and no 3D library. No smooth-scroll library. Exhibits load their code when they scroll into view.
- No preloader.

**Accessibility**, WCAG 2.2 level AA:

- Everything works by keyboard with a visible focus ring.
- Touch targets at least 44px.
- Any slider or drag has a button alternative.
- No sound plays without being asked for.
- No scroll-jacking and no custom cursor.

**Right-to-left**: every exhibit mirrors. Directional motion follows the reading direction.

**Security**: the site stays a static export with no backend. No secrets, no trackers, no requests to other hosts at run time apart from the visitor's own WhatsApp, mail and phone links. No new dependency without a stated reason; every dependency pinned by the lockfile.

**Housekeeping carried over from the audit of 2026-10-08:**

- Run `npm audit fix` (never `--force`) and report what remains.
- In `.github/workflows/deploy.yml`, keep `contents: read` at workflow level and move `pages: write` and `id-token: write` to the `deploy` job.

## 9. Content rules that still hold

- No status on projects: no "live", "shipped", version numbers or "in progress".
- No location for him, no dated timeline, no courses or certificates, no skills list, no technology tags, no GitHub link, no "designer" label.
- No Network Setup service.
- Do not mention: the Prayer Times app, the WebMCP till, GarageLog, Diyari, Steam Demo Remover, Al Rwad.
- Qasa POS is a sample that shows what he can build for a client. Chrispy POS is the client version of it.
- WhatsApp and phone are the same number.
- No invented facts, numbers, testimonials or pictures. A job gets a picture only when a real one is in the repository.
- No small label placed above a heading.

## 10. Build order

Work on a new branch, `redesign/interactive`, cut from `redesign/job-tickets`. That branch already holds the content structure this build needs: one copy file per language in `app/[lang]/_content/`, page layouts in `app/[lang]/_pages/`, the list of work in `lib/jobs.js`, fonts through `next/font`, and the request composer.

| Step | Work | Done when |
|---|---|---|
| 0 | Housekeeping (section 8). Confirm `npm run build` passes | Build passes; audit result reported |
| 1 | Colours, type and mat grid. The bench with three devices. The request builder | Home's first screen works in three languages at 390px and 1440px |
| — | **Stop and show the owner.** Screenshots at both widths, in English and Kurdish | He approves the look before anything else is built |
| 2 | Live till, with tests for the money rules | A sale can be rung up, paid in either currency and printed, in all three languages |
| 3 | Site viewer, with its twelve screenshots | Both sites switch language and size |
| 4 | Teardown | Opens, parts explain themselves, symptoms light parts |
| 5 | Projects, Qasa, About, Contact, 404 | Every page is on the new look |
| — | **Stop and show the owner** | |
| 6 | Further features from section 7, in order, each one only if the limits in section 8 still hold | |
| 7 | Checks: keyboard, screen reader, reduced motion, the performance limits, three languages, phone and desktop. Rewrite `DESIGN.md` for the built site and correct `PRODUCT.md` | All limits met and recorded |

Commit after each step with a plain message. Do not merge into `main` and do not deploy: the owner decides when it goes live.

## 11. Decisions and what is still open

Decided by the owner's go-ahead on 2026-10-08:

- The look is The Bench as described in section 3.
- The lamp switch and sound are both wanted, in the order section 7 gives. Sound stays off until the visitor turns it on.

Still waiting on the owner. None of these blocks the build:

- The repairs he actually does, for the teardown text. Until then it says only: diagnosis, part replacement and maintenance.
- Real pictures of the print work and the Chrispy screens, with his clients' agreement.
- Two or three short quotes from clients. Reviews are what small business owners look for first, and the site has none.
- A read of the Arabic and Kurdish wording.
