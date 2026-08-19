---
name: Mustafa Deari Ahmed — Portfolio
description: A dark terminal/dev-console portfolio for a computer engineering student working across software and hardware.
colors:
  bg: "#0d1117"
  panel: "#161b22"
  border: "#30363d"
  accent: "#4fd1a5"
  accent-dim: "#39a37e"
  amber: "#d4a72c"
  text: "#c9d1d9"
  text-dim: "#8b949e"
  white: "#f0f6fc"
typography:
  display:
    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace"
    fontSize: "clamp(28px, 5vw, 44px)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  title:
    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
  rtl-body:
    fontFamily: "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
  pill: "10px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.sm}"
    padding: "9px 16px"
  button-primary-hover:
    backgroundColor: "{colors.accent-dim}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "9px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-dim}"
    rounded: "{rounded.sm}"
    padding: "9px 16px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "9px 16px"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "20px"
  tag-pill:
    backgroundColor: "transparent"
    textColor: "{colors.amber}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
---

# Design System: Mustafa Deari Ahmed — Portfolio

## Overview

**Creative North Star: "The Night Build"**

The site reads as a single terminal session left running late at night: a `whoami` prompt, `//` comments, a blinking text cursor, monospace type throughout. It is precise and quietly confident — the craft is meant to speak for itself rather than announce itself, so there is no marketing chrome, no gradient hero illustration, no glassmorphism. Yet it is not cold: the near-black background is offset by a warm amber secondary and two slow-drifting blurred color blobs that give the dark canvas ambient glow, like monitor bloom in a dark room, rather than stark cyberpunk starkness.

Everything, including headings, is set in the same monospace stack. Hierarchy comes from size, weight, and color, not from switching typefaces — this is deliberate and load-bearing, not an oversight to "fix" with a display font.

**Key Characteristics:**
- One font family for the entire system; hierarchy is size/weight/color only.
- Flat surfaces at rest; depth and glow appear only on hover/interaction.
- A single accent (mint) carries all interactive/primary meaning; amber is reserved for status-like content (role title, project tags).
- Ambient, not decorative: background blobs and the scanline overlay create atmosphere without competing with content.
- Motion is purposeful and disabled under `prefers-reduced-motion` (typewriter, cursor blink, reveal-on-scroll, hover lifts). The one exception is the ambient flow-field background, which always runs — see the Motion section for why.

## Colors

A near-black terminal palette carrying one cool accent and one warm accent, with a restrained neutral ramp for text and surfaces.

### Primary
- **Terminal Mint** (`#4fd1a5`): the system's one interactive accent — links, the primary button's text/border, active nav state, the pulsing `@` in the brand mark, the prompt glyph. Also used at low opacity as a background-blob light source.
- **Terminal Mint, Dimmed** (`#39a37e`): the hover/fill state of Terminal Mint — primary button hover background, hover border on cards, the underline-prompt color, text-selection background.

### Secondary
- **Signal Amber** (`#d4a72c`): reserved for status-like content only — the role/title line under the hero name, and project-card status tags (`live`, `shipped`, `completed`). Also lights the second background blob. It never appears on interactive controls.

### Neutral
- **Void Black** (`#0d1117`): page background.
- **Raised Panel** (`#161b22`): the background of cards and service tiles — one step lighter than Void Black, never a shadow-based lift.
- **Hairline Border** (`#30363d`): all resting borders — header underline, section dividers, card edges, ghost-button border.
- **Console Text** (`#c9d1d9`): default body text color.
- **Muted Console Text** (`#8b949e`): secondary text — taglines, descriptions, nav links at rest, labels, footnote.
- **Bright White** (`#f0f6fc`): reserved for the highest-emphasis text only — the h1 name, card/service titles, the brand mark.

### Named Rules
**The One Accent Rule.** Terminal Mint is the only color that means "interactive." Signal Amber marks status/metadata and must never double as a link, button, or active-state color — mixing the two collapses the system's only semantic distinction.

## Typography

**Display Font:** SFMono-Regular, with Consolas / Liberation Mono / Menlo / Courier as fallbacks
**Body Font:** same stack
**Label Font:** same stack
**Arabic / Kurdish Sorani:** Noto Sans Arabic, with Segoe UI / Tahoma as fallbacks

**Character:** One monospace voice throughout, functioning as both a technical signal (this person builds software) and a hierarchy tool — size, weight, and the three neutral text colors (Console / Muted / Bright White) do all the work a second typeface would normally do.

### Hierarchy
- **Display** (700, `clamp(28px, 5vw, 44px)`, line-height 1.3): the h1 name on the home hero; the sub-page variant clamps to `clamp(24px, 4vw, 34px)` on About/Projects/Contact page headers.
- **Title** (700, 15–16px, line-height 1.4): card titles, service titles, and the brand mark — bright white, used sparingly for the highest-emphasis line inside a component.
- **Body** (400, 15px, line-height 1.7): default paragraph text; a compact 13.5px variant is used for card/service descriptions where density matters more than reading comfort.
- **Label** (400, 12px, letter-spacing 0.12em, uppercase where used): section titles (prefixed with `// `), nav links (13px, not uppercase), the terminal prompt line, footnote, and the 11px status-tag pills.

### Right-to-left type

Arabic and Kurdish Sorani are set in **Noto Sans Arabic** at line-height 1.9 —
looser than the Latin 1.7, because a proportional face at the mono size reads
tight. This is the one sanctioned exception to the One Font Rule, and it exists
because there is no monospace Arabic in any system font stack: forcing the mono
stack on those scripts produces fallback glyphs with broken letter joining,
which is illegible rather than characterful. Noto Sans Arabic was chosen over
the other candidates because it covers the Kurdish-specific letters (`ڕ ڵ ۆ ێ`)
that many Arabic faces omit.

The terminal voice is preserved by keeping every *machine* string in the mono
face and LTR in all three languages — the `mustafa@portfolio` wordmark, the
`whoami` prompt, the `//` section markers, the `/* … */` annotations in the
About copy, email addresses, phone numbers, and URLs. The contrast between a
proportional sentence and a monospace code fragment inside it is the point, not
an inconsistency to flatten.

### Named Rules
**The One Font Rule.** No second typeface is introduced for "elegance" or
contrast. Hierarchy comes from size, weight, and the three neutral text colors.
The single exception is script coverage, above: a language the mono stack
cannot render gets a face that can, and nothing else does.

## Layout

A single centered content column (`max-width: 820px`, `24px` horizontal padding) — this is a narrow, reading-width layout, not a wide marketing grid. Sections stack vertically, each with generous vertical rhythm (`64px` top/bottom padding, tightening to `44px` under 600px) and a hairline bottom border, except the last section on a page. The services and project cards use a responsive auto-fit grid (`minmax(220px, 1fr)`) that collapses to a single column on narrow viewports. Internal spacing runs on an approximate 8/12/18/24px scale (tight component gaps → grid gaps → section-level padding).

## Elevation & Depth

Flat by default. Surfaces (cards, service tiles, the sticky header) carry no shadow at rest — depth is implied only by the `Raised Panel` background stepping one level lighter than `Void Black`. Shadow appears solely as a response to interaction: on hover, cards lift (`translateY(-5px)`) and gain a soft dual shadow (`0 12px 28px rgba(0,0,0,.35), 0 0 0 1px rgba(79,209,165,.12)`) — a diffuse drop shadow plus a hairline mint glow ring. The sticky header instead uses a translucent blur (`backdrop-filter: blur(4px)` over `rgba(13,17,23,0.94)`) to separate itself from scrolling content.

### Shadow Vocabulary
- **card-hover-lift** (`box-shadow: 0 12px 28px rgba(0,0,0,.35), 0 0 0 1px rgba(79,209,165,.12)`): the only shadow in the system; applied to `.card` and `.service-card` on `:hover`.

### Named Rules
**The Flat-By-Default Rule.** Nothing casts a shadow at rest. Shadow is exclusively a hover/interaction signal, never a static styling choice — a component that needs to look "important" gets a border or Bright White text, not a permanent shadow.

## Shapes

Small, consistent corner radii rather than sharp rectangles or heavily rounded cards: `4px` on buttons, `6px` on cards/tiles, a full `10px` pill on status tags, and `50%` circles for the decorative background blobs (the only fully round elements). Borders are always `1px` hairlines in `Hairline Border`, never thicker. There is no diagonal, angular, or clipped-corner geometry anywhere in the system.

## Components

### Buttons
- **Shape:** `4px` radius, `1px` border, `9px 16px` padding, `13px` label-scale text.
- **Primary (`.btn`):** transparent background, `Terminal Mint` text and border. Hover fills the background with `Terminal Mint, Dimmed`, flips text to `Void Black`, and lifts `translateY(-2px)`. Click spawns a circular ripple (white at 50% opacity, scale 0→3, fading out) from the pointer position.
- **Ghost (`.btn.ghost`):** transparent background, `Hairline Border` border, `Muted Console Text` text. Hover brightens the border to `Muted Console Text` and text to `Console Text`, with no background fill — a deliberately quieter secondary action.

### Cards / Containers
- **Corner Style:** `6px` radius.
- **Background:** `Raised Panel`, `1px` `Hairline Border` border at rest.
- **Shadow Strategy:** none at rest; see Elevation & Depth for the hover lift.
- **Internal Padding:** `20px` (service cards) to `22px` (project cards).
- Used identically for both the three-column services grid and the stacked project list — one card pattern, two layouts.

### Status Tag Pill
- **Style:** `Signal Amber` text, `10px` pill radius, `1px` border in a dark amber-brown (`#3a3120`), `2px 8px` padding, `11px` label text. Used only for project status (`live`, `shipped`, `completed`, `design`) — never repurposed as a generic badge.

### Navigation
- Label-scale (13px) `Muted Console Text` links that turn `Terminal Mint` on hover/active. The active/hover state is signaled by a 1px underline that grows in from the left edge (`right: 100% → 0`) rather than appearing instantly — the same "typing in" motion language as the hero's typewriter effect.

### Terminal Prompt & Cursor (signature)
The hero's `whoami` line and the blinking block cursor after the h1 are the system's signature flourish: a typewriter effect types out the prompt and name on page load (staggered by 250ms per element), followed by a `1s` step-end blinking cursor. Both are fully suppressed under `prefers-reduced-motion`, where the final text simply appears with no animation.

## Do's and Don'ts

### Do:
- **Do** keep the entire system on one monospace font family; introduce new hierarchy through size, weight, or the three neutral text colors.
- **Do** keep cards and panels flat at rest and reserve shadow for the hover-lift state only.
- **Do** use `Signal Amber` strictly for status/metadata (role line, project tags) and never for links, buttons, or other interactive elements.
- **Do** respect `prefers-reduced-motion` on every animation (typewriter, cursor blink, reveal-on-scroll, hover transforms) — implemented site-wide and must be preserved in any new component. The ambient background is the one documented exception; do not extend it to anything else.
- **Do** keep the content column narrow (`820px` max-width) — this is a reading-width personal site, not a wide marketing layout.

### Don't:
- **Don't** introduce a second (serif/display) typeface for "polish" — it breaks the terminal illusion the whole system is built on.
- **Don't** add gradients, glassmorphism, or drop shadows at rest — the only permitted shadow is the single hover-lift value documented in Elevation & Depth.
- **Don't** use rounded/pill shapes beyond the documented radii (`4px`/`6px`/`10px`/`50%`) or introduce heavier, more playful corner rounding.
- **Don't** invent additional accent colors — Terminal Mint and Signal Amber are the only two, each with a fixed, non-overlapping role.

## Where things live (post-Next.js migration, 2026-08-19)
| Concern | File |
|---|---|
| Colour, type, motion tokens; base element styles; scanline overlay | `app/globals.css` |
| Section/card/button/list vocabulary | `components/sections.jsx` |
| Header, Footer, Typewriter, FlowBackground | `components/*.jsx` |
| Nav labels, contact details, page titles | `lib/site-data.js` |
| Page content, one file per page per language | `app/[lang]/_content/` |
| Deployment, basePath, URLs | `DEPLOY.md` |

**Motion is now gated centrally.** `html[data-motion="on"]` is set before first
paint only when JS runs *and* the visitor has not asked for reduced motion;
every animation in the system hangs off it, and `components/Reveal.jsx` decides
only *when* an element enters, never *what* it does. No-JS, failed hydration,
and `prefers-reduced-motion` all resolve to the same state: the page fully
rendered, with no animation.

**One deliberate exception: the flow-field background always animates.**
`components/FlowBackground.jsx` loads `flow-bg.js` unconditionally, outside the
`data-motion` switch. This has been reverted twice by well-meaning passes that
read it as a bug; it is not one.

The reasoning: reduced motion exists to suppress motion that disorients — things
that enter, exit, track the cursor's focus, or move the reader's place on the
page. This is ambient wallpaper. It drifts slowly at low contrast behind an
opaque content column, and nothing about the page's layout or reading position
depends on it. Gating it does not produce a calmer page, it produces a dead flat
one — and the site owner's own machine has Windows animations off, so gating it
means *he* never sees his own background. He has asked for it twice.

Everything else — typewriter, caret blink, scroll reveals, hover lifts — remains
fully gated under `prefers-reduced-motion`. If you are tempted to make this
consistent with the rest, don't; change the words here first and get the owner to
agree.

**The background is a flow field, not blobs.** The "two slow-drifting blurred
color blobs" described in the Overview above were replaced by the particle flow
field in `public/assets/flow-bg.js` (2026-07-27). The ambient-glow intent is the
same; the mechanism is not.
