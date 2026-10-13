---
name: Mustafa Deari Ahmed
description: The Bench. A cutting mat seen from above, with three working devices on it, a lamp over it, and a request that is written on the visitor's own phone.
colors:
  mat: "#0f3d30"
  mat-line: "#2c6a55"
  chalk: "#f3f6f2"
  chalk-dim: "#b5ccc2"
  ruler: "#f2d24b"
  mat-lit: "#e6ede7"
  mat-line-lit: "#93b3a3"
  chalk-lit: "#0f3d30"
  chalk-dim-lit: "#3d6455"
  ruler-lit: "#8a5a00"
  graphite: "#14191a"
  graphite-soft: "#4a5753"
  silk: "#f3f6f2"
  silk-dim: "#b5ccc2"
  pcb: "#2c6a55"
  marker: "#f2d24b"
  signal: "#ff6a2b"
  screen: "#f7f8f5"
  bubble: "#dcebe3"
typography:
  maker:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "calc(100cqi / 16.15)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "normal"
    fontVariation: "'wdth' 125"
  display:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 115"
  headline:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 115"
  title:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 115"
  name:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "normal"
    fontVariation: "'wdth' 120"
  body:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  lead:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 70"
  nav:
    fontFamily: "Archivo, 'Archivo Metric', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "normal"
  money:
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  rtl-display:
    fontFamily: "'Noto Kufi Arabic', 'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
    fontSize: "clamp(1.9rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.45
    letterSpacing: "normal"
  rtl-body:
    fontFamily: "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "normal"
rounded:
  screen-glass: "2px"
  part: "6px"
  screen: "8px"
  bezel: "10px"
  device: "16px"
  device-wide: "20px"
  phone: "34px"
  round: "999px"
spacing:
  unit: "24px"
  gutter: "20px"
  gutter-wide: "24px"
  band: "48px"
  band-wide: "96px"
  header: "72px"
  column: "1200px"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.part}"
    padding: "0 20px"
    height: "48px"
  button-signal-hover:
    backgroundColor: "#ff8a5c"
    textColor: "{colors.graphite}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    rounded: "{rounded.part}"
    padding: "0 20px"
    height: "48px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    rounded: "{rounded.part}"
    padding: "0 16px"
    height: "48px"
  chip-chosen:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.part}"
    padding: "0 16px"
    height: "48px"
  field:
    backgroundColor: "{colors.screen}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.part}"
    padding: "0 14px"
    height: "48px"
  device-body:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.silk}"
    rounded: "{rounded.device}"
    padding: "10px"
  device-screen:
    backgroundColor: "{colors.screen}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.screen}"
  message-bubble:
    backgroundColor: "{colors.bubble}"
    textColor: "{colors.graphite}"
    padding: "10px 14px"
  nav-link:
    backgroundColor: "{colors.mat}"
    textColor: "{colors.chalk-dim}"
    typography: "{typography.nav}"
    padding: "0 8px"
    height: "44px"
  nav-link-active:
    backgroundColor: "{colors.mat}"
    textColor: "{colors.chalk}"
  device-label:
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
  command-item-active:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.part}"
    padding: "8px 10px"
    height: "44px"
---

# Design System: Mustafa Deari Ahmed

Recorded 2026-10-13 from the build on `redesign/interactive`. This document replaces the job-ticket book ("The Job-Ticket Book": carbon-blue ground, white, canary and pink paper stocks, red ticket numbers). The owner found that look too simple, and nothing of it carries over: no paper stocks, no perforations, no ticket numbers.

## Overview

**Creative North Star: "The Bench"**

The site is a self-healing cutting mat seen from above, the kind used both for trimming print and for repairing electronics. The mat's printed grid is the page's layout grid. Three devices stand on it, one for each kind of work Mustafa takes on, and each is switched on and works: a laptop running real client sites, a till that rings up a sale, and an open computer to take apart. Everything the site claims, the visitor can operate.

Anything printed on the mat (headings, text, ruled rows, links, ruler marks) is chalk on green. Anything that is a device (a bezel, a screen, a phone, the till, the command menu) is graphite with a light screen, and looks the same whatever the light. A lamp over the bench lights it: the mat turns pale and what is printed on it turns green, while the devices stay as they are. The site opens on the dark bench.

Every device ends in the same place: the request builder, where the visitor's message is drawn as a chat bubble on a phone lying on the mat and sent from their own WhatsApp.

### Motion

Motion is physical: devices are set down on the mat, picked up, carried into their exhibit; a receipt is printed out of a slot; the light spreads from the bulb. Transitions run 160 to 560ms and ease out. Three curves are named in `app/globals.css`: `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`) for things arriving, `--ease-out-quart` (`cubic-bezier(0.25, 1, 0.5, 1)`, also the default at 200ms) for colour and small moves, and `--ease-set-down` (`cubic-bezier(0.34, 1.4, 0.64, 1)`), which overshoots a little and settles, for something put down. Direct manipulation runs on a damped spring stepped once a frame and stops when it settles: the bench's tilt under a mouse (at most 4 degrees top to bottom, 7 side to side) and the teardown's opening. Nothing loops and nothing runs while the visitor is still. The page glides to a place within itself (`scroll-behavior: smooth`), Back and Forward within the page included; Back and Forward to another page put that page straight back where the visitor left it.

Every animation hangs off `html[data-motion="on"]`. An inline script in the head sets it before first paint: on, unless the system asks for reduced motion or the visitor has switched Effects off (the stored choice wins over the system setting either way). If the page has not hydrated within eight seconds, it is switched off; if the bundle then does arrive, `MotionRoot` switches it back as the visitor has it (nothing replays, because what moves when first drawn has already been drawn). No script, a failed bundle, reduced motion and Effects off all give the same page, complete and still. Effects in the header and in the command menu switch it by hand; `MotionRoot` follows a change of the system setting live unless the visitor has chosen.

**Key Characteristics:**
- A green cutting mat whose 24px grid is the page grid; every band and rule lands on a grid line.
- Two kinds of colour: what is printed on the mat changes with the lamp; what belongs to a device never does.
- Devices are built from ordinary elements with CSS 3D transforms, and their screens are real, working HTML.
- One action colour, signal orange, always a fill under graphite text.
- One Latin family in three widths, IBM Plex Mono for money on the till only, a kufi and a plain sans for Arabic and Kurdish.
- Every device ends in a request the visitor sends from their own phone.
- All motion is off unless it is both possible and wanted.

## Colors

A green mat with chalk on it, graphite devices with light screens, and one orange for action. The tokens are split in two. `mat`, `mat-line`, `chalk`, `chalk-dim` and `ruler` are what is printed on the mat and change with the lamp; the `-lit` tokens are their values on the light bench (`html[data-lamp='on']`). `graphite`, `graphite-soft`, `silk`, `silk-dim`, `pcb`, `marker`, `signal`, `screen` and `bubble` belong to the devices and are the same on both benches.

### Primary
- **Signal Orange** (`#ff6a2b`): the one action colour. Always a fill under graphite text: the primary button in a group, a chosen chip or key, the Charge key, the keyboard-focused item in the command menu, the Effects and discount switches when on. Its hover is `#ff8a5c`, written as a value in each component, not as a token. Never text, on either bench.

### Secondary
- **Ruler Yellow** (`#f2d24b`, lit `#8a5a00`): measurement marks on the mat: the dimension line under each bench device, the mark under the current page, the current language code, the underline of a text link and its hover colour, the scroll mark on the header ruler, the opened length on the teardown's ruler, and the focus ring. On the light bench it turns deep amber, because yellow vanishes on a pale mat.
- **Marker** (`#f2d24b`): the same yellow as a device colour, which does not change with the lamp. A fill under graphite text: text selection, the skip link, the viewer's marks, the parts the teardown lights up, the lit bulb's glass.

### Neutral
- **Mat** (`#0f3d30`, lit `#e6ede7`): the ground of every page and the browser bar colour (`theme-color` follows the lamp).
- **Mat Line** (`#2c6a55`, lit `#93b3a3`): the printed grid, the ruler ticks, band rules and every hairline on the mat. Never text.
- **Chalk** (`#f3f6f2`, lit `#0f3d30`): headings and main text on the mat, the label under each device, the chosen state of a nav link.
- **Chalk Dim** (`#b5ccc2`, lit `#3d6455`): secondary text on the mat: leads, descriptions, resting nav links, the header switches, the footer contact lines, the outline of a quiet button or chip (at 55 to 70 percent). On the light bench it is also the 1px edge of the request builder's fields.
- **Graphite** (`#14191a`): device bodies and bezels, and text on every light surface. The focus ring inside a screen.
- **Graphite Soft** (`#4a5753`): secondary text on a screen: hints, captions, the till's labels, placeholders, the command menu's group names.
- **Silk** (`#f3f6f2`) and **Silk Dim** (`#b5ccc2`): lettering printed on a device body (the viewer's tabs and tips, the printer's label, the teardown's flags). The dark bench's chalk values, fixed.
- **PCB** (`#2c6a55`): circuit boards: the motherboard in the bench computer and the teardown, and the board on the 404 and offline pages.
- **Screen** (`#f7f8f5`): the ground of every screen inside a device, the request builder's fields and the till's keys.
- **Bubble** (`#dcebe3`): the message the visitor is about to send.

Device surfaces also use fixed greys written as values in their own files: graphite faces lit from above (`#2b3436` top, `#1f2729` sides, `#181f20` front, `#101516` bezel), screen chrome `#e6ebe7` (the browser bar, the till's ground, the command menu's hover), and `#fdfdf9` receipt paper.

### The light pool
On the light bench `body::before` lays a fixed pool of warm light from just above the top of the screen, under everything on the mat: `radial-gradient(ellipse 80% 65% at 50% -10%, rgb(255 251 236 / 0.85), rgb(255 251 236 / 0.3) 50%, transparent 80%)`. At its brightest the mat reads `#fbf9eb`. It stays put while the page scrolls.

### Contrast, as computed
Text on the mat, dark bench / light bench (the light figure is on the plain pale mat; under the brightest part of the pool it rises):
- Chalk on mat: 11.14:1 / 10.19:1 (11.47:1 in the pool).
- Chalk Dim on mat: 7.15:1 / 5.59:1 (6.30:1 in the pool).
- Ruler on mat (link hover, current language): 8.15:1 / 4.98:1 (5.60:1 in the pool).
- Mat Line on mat: 1.91:1 / 1.91:1 (2.15:1 in the pool). A rule only, never text.

Text on devices, the same on both benches:
- Graphite on screen 16.64:1; Graphite Soft on screen 7.09:1.
- Graphite on signal 6.21:1; on its hover `#ff8a5c` 7.64:1; on marker 11.91:1; on bubble 14.39:1.
- Graphite on `#e6ebe7` 14.70:1; Graphite Soft on `#e6ebe7` 6.26:1; on the phone's header `#ebf0ec` 6.55:1; on the About plate `#e9eeea` 6.43:1; on receipt paper 7.41:1.
- Silk on graphite 16.28:1; Silk Dim on graphite 10.46:1, on the printer top `#2b3436` 7.52:1.
- Chalk `#f3f6f2` on PCB (the 404 figure) 5.84:1.

Below the line, flagged rather than hidden:
- On the light bench the outline of a quiet button or chip (Chalk Dim at 55 to 60 percent) is 2.30:1 to 2.51:1 against the mat, under 3:1 for a control's edge. On the dark bench it is 3.28:1 to 3.62:1. Its words carry it on both.
- On the light bench a Signal fill is 2.40:1 against the pale mat (a chosen chip, the Effects track, the primary buttons). On the dark bench it is 4.25:1. A chosen chip also carries a tick and a button its words, so no state rests on the fill's edge alone.
- On the light bench a Marker fill on the mat (the number on a likely part in the teardown's parts list, and its "!" mark) is 1.25:1 against it. The likely state does not rest on it: the chip also takes a ruler edge (4.98:1) and the "!", graphite on the marker (11.91:1), and a screen reader hears "often the cause".
- The till's category marks: hot `#b9503a` is 4.61:1 on a key and 4.07:1 on the till's ground; cold `#2f6aa0` 5.34:1 and 4.72:1. They are marks with the category written beside them, not text.
- A key's edge `#7a8580` is 3.17:1 on the till's ground and 3.59:1 on a key.

### Named Rules
**The Lamp Split Rule.** Anything printed on the mat uses `mat`, `mat-line`, `chalk`, `chalk-dim` or `ruler`, and changes with the lamp. Anything that belongs to a device uses `graphite`, `graphite-soft`, `silk`, `silk-dim`, `pcb`, `marker`, `signal`, `screen` or `bubble`, and does not. A hex value written in a component is the same on both benches, so check it on both.

**The One Action Rule.** Signal orange is the one action colour, and it is always a fill under graphite text. One signal fill per group of actions; the others are outlines or text links. It is never text, on either bench.

**The Shadow Takes the Lamp Rule.** A device's shadow on the mat is `--shadow-device`, or `rgb(var(--drop) / calc(alpha * var(--drop-k)))`. Never a fixed shadow colour: the same shadows soften on the pale mat.

## Typography

**Display Font:** Archivo, wide (`wdth` 115 for headings, 120 for names and terms, 125 for the maker's name), 800 to 900 (with a local fallback face, 'Archivo Metric', scaled to Archivo's metrics, then ui-sans-serif, system-ui)
**Body Font:** Archivo, normal width, 400 to 600
**Label Font:** Archivo, condensed (`wdth` 70), 600, capitals
**Money Font:** IBM Plex Mono, 400 and 600, on the till and its receipt only
**Arabic / Kurdish display:** Noto Kufi Arabic (with Noto Sans Arabic, Segoe UI, Tahoma)
**Arabic / Kurdish text:** Noto Sans Arabic (with Segoe UI, Tahoma)

**Character:** One Latin family does everything the mat and the devices need: condensed capitals for what is printed small on a device or along a ruler, normal width for reading, wide and heavy for what is printed large across the mat. Plex Mono is the face Qasa prints its prices in, so the till's money looks like the real till's. All fonts are fetched at build time by `next/font` and served from the site's own files. The Arabic faces are not preloaded, so English pages never download them. Figures are tabular everywhere.

### Hierarchy
- **Maker** (900, wide 125, capitals, line-height 0.92): the name printed across the mat on the home page, the page's `h1`. Sized to the column by container units: on a phone two lines locked into one block (`100cqi / 6.5` and `100cqi / 9.4`), from 768px one line (`100cqi / 16.15`). Always in Latin.
- **Display** (800, `clamp(2.5rem, 7vw, 4.75rem)`, line-height 0.98, tracking -0.02em, wide 115): the title of every other page.
- **Headline** (800, `clamp(1.9rem, 4vw, 3rem)`, line-height 1.02, tracking -0.015em, wide 115): section headings, each exhibit's heading, the request builder's heading.
- **Title** (800, `clamp(1.4rem, 2.6vw, 1.9rem)`, line-height 1.1, tracking -0.01em, wide 115): a group heading on Projects.
- **Name** (700, 1.1rem, line-height 1.375, wide 120): the term in a ruled row and a job's name in a list. A pictured job's name on Projects is 1.3rem, 800.
- **Body** (400, 1.0625rem, line-height 1.6): everything read. Prose caps its measure at 58 to 60ch. 600 marks a job line or a value. Captions and hints are 0.85 to 0.95rem.
- **Lead** (400, 1.1rem, chalk-dim, 60ch): the paragraph under a page title.
- **Label** (600, 0.8rem, line-height 1.2, tracking 0.08em, condensed capitals, lines balanced): the label under a device, a field's label, the role line, the language codes (0.85rem), the command menu's group names. Never above a heading.
- **Nav** (500, 0.95rem): nav links and footer lines. The header's name is 0.95rem, 800, wide, capitals, tracking 0.01em.
- **Money** (Plex Mono 400, 600 for totals; tabular, always left to right): every figure on the till and the receipt. The till's total is 1.75rem; the receipt is 0.8125rem.

### Right-to-left type
Arabic and Kurdish Sorani switch family at the root: Noto Sans Arabic at line-height 1.85. Anything with the display class takes Noto Kufi Arabic, with leading opened (1.35 for page titles, 1.45 for headlines, 1.5 for titles, 1.6 for names) and tracking reset to normal. The width axis belongs to Archivo and has no effect on either Arabic face. Labels have no capitals to set in Arabic or Kurdish, so they are set larger instead of spaced: 0.88rem at line-height 1.6. The till carries its own language and direction, which may differ from the page's, and switches face with them; the receipt keeps the language it was printed in. Each paragraph is one run of text, so nothing jumps when the Arabic face arrives.

### Named Rules
**The Three Widths Rule.** Condensed is for what is printed small, normal is for reading, wide is for what is printed large. Width is the hierarchy tool; do not add a second Latin family. Plex Mono is the till's own face and appears nowhere else.

**The No Tracking in Arabic Rule.** Letter-spacing is never applied to Arabic or Kurdish, positive or negative, and their text is never split into single letters or given a stroke. Every tracked style resets to normal under right-to-left, and any new one must do the same.

**The Latin Stays Latin Rule.** A machine string (a domain, the email address, the phone number) and a name written in Latin (the owner's name, Qasa POS, a client's name) stays in the Latin face and left to right in every language, isolated so the bidi algorithm cannot reorder it. Latin words inside an Arabic or Kurdish sentence ("Qasa", "Excel", "(POS)") are left to the Arabic face, because switching them to Archivo caused layout shift. The owner's name and the motto are never translated or transliterated.

## Layout

The mat's grid is a 1px line every 24px (`--unit`) and a heavier one every 120px, drawn from the centre of the page outwards; the minor lines are the mat line at 42 percent. The column is at most 1200px (fifty cells) and always a whole number of pairs of cells, rounded down to a multiple of 48px, so it is centred on the grid with both edges on a line. The gutter is 20px, 24px from 640px.

Pages are a stack of bands, 48px above and below (two cells), 96px from 640px (four cells). Every band of a page, every heading and every ruled row is rounded up to a whole number of cells with `calc-size(auto, round(up, size, var(--unit)))`, so each rule printed across the page lies on a grid line. Band rules are painted as an inset 1px shadow over the band's top edge, not drawn as borders, so they take no space and push nothing off the grid. A ruled list draws each row's rule above it and the last one just below its edge. Browsers without `calc-size()` lay out the same, without the rounding.

A ruled list puts its term and its sentence side by side only when the list itself is at least 42rem wide (a container query), so the same list stacks in a narrow column. On Contact two lists share rows through subgrid from 1024px, so each rule runs straight across both. The till and the teardown stack below 1280px and put their side column beside the device from there.

The header is the ruler printed along the top of the mat: an opaque mat-coloured strip with ticks standing on its bottom edge (a 4px tick every 12px, 8px every 24px, 14px every 120px, placed like the grid). From 768px it is one row, three cells (72px) tall, and sticky, and a scroll to an anchor stops one cell below it. Below 768px it scrolls away with the page and takes two rows, four cells (96px) at 360 to 390px: the nav and the command button, then the language codes with the lamp and Effects. At 320px the two switches take a row of their own. The owner's name shows in the header only from 1024px; below that the home page prints it large under the header and Home in the nav does its job. Below 390px nav links have 4px of padding instead of 8px. Every tap target is at least 44px; buttons and chips are 48px.

All spacing and positioning is logical, so the layout mirrors under right-to-left without special cases. The devices turn toward the reading direction, the arrows mirror, and the scroll mark runs from the right.

## Elevation & Depth

Depth is real 3D, not shadow on flat cards. The bench devices and the teardown computer are boxes built from ordinary elements with CSS 3D transforms (`preserve-3d`, a perspective of 1100px from the top of each plot, pitched -17 degrees and turned 27 degrees toward the reading direction on the bench). Their faces are graphite lit from above: the top lightest, the sides less, the front least. Their screens are real HTML. There is no WebGL and no 3D library.

Only a device casts a shadow, and only onto the mat. Nothing printed on the mat has one. There is no blur and no glass effect; the command menu's backdrop dims the bench in the device shadow's own colour.

### Shadow Vocabulary
- **Device** (`box-shadow: 0 22px 36px -14px rgb(var(--drop) / calc(0.75 * var(--drop-k)))`, the `--shadow-device` token): every device standing flat on the mat: a browser frame, a device screen, the viewer, the till, the request builder's phone, the command menu.
- **Contact** (`radial-gradient(closest-side, rgb(var(--drop) / calc(0.62 * var(--drop-k))), rgb(var(--drop) / calc(0.32 * var(--drop-k))) 55%, transparent)`): the soft shadow under a 3D device on the bench, lying flat on the floor.
- **Back panel** (`box-shadow: 0 26px 40px -16px rgb(var(--drop) / calc(0.8 * var(--drop-k)))`): the About plate's graphite panel, written in its own file.
- **Bezel rim** (`box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.06)`): the edge of a graphite device body (the till, the command menu); the bench faces use 0.05.
- **Backdrop** (`rgb(var(--drop) / calc(0.55 * var(--drop-k)))`): the bench behind the open command menu.

`--drop` is the shadow's colour (`3 18 13` on the dark bench, `22 46 36` lit) and `--drop-k` its strength (1 dark, 0.55 lit).

### Named Rules
**The Only Devices Cast Shadows Rule.** A shadow means a thing standing on the mat. Text, rules, lists and links have none; a screen inside a device has none of its own.

## Shapes

Devices have rounded corners in proportion to their size, and the mat and what is printed on it have none. The control corner is 6px (`--radius-part`): buttons, chips, fields, keys, menu items. Screens are 8px inside 16px bodies (20px from 640px) on the till and the command menu; a device screen's bezel is 10px; the request builder's phone is 34px round a 26px screen; the viewer in phone size is 30px. A bench screen's glass is 2px. Fully round shapes are for things that are round: the till's quantity keys, the viewer's marks, the teardown's flags, switch knobs, the avatar.

Lines on the mat are 1px in the mat line. Lines on a screen are 1px (`#c3ccc7` on the till and command menu, graphite at 10 to 20 percent elsewhere). The About plate's rows start under a 3px double rule. The till's order is torn along its bottom in teeth, and the receipt standing out of the bench printer on a saw edge.

## Components

### Buttons
- **Shape:** 6px corner, 48px tall, 20px inline padding, semibold body size.
- **Signal:** the one filled action in a group: "Start a request", the request builder's send, each exhibit's request. Signal fill, graphite text; hover `#ff8a5c`.
- **Outline:** the quieter one beside it: a 1px chalk-dim border at 60 percent, chalk text; hover firms the border to chalk.
- **Focus:** the site-wide ring, 2px solid ruler with a 3px offset on the mat, graphite inside a screen.

### Text links
Semibold, a 2px underline 4px below the baseline, 44px tall. On the mat the underline is ruler and the hover turns the words ruler. On a screen the underline is graphite at 40 percent, firming to graphite on hover. A link that leaves the site ends in the outward arrow; one that goes deeper ends in the forward arrow. Links never prefetch.

### Chips (choices)
A real checkbox or radio drawn as a 48px chip: 1px chalk-dim border at 55 percent, chalk text, 16px padding. Chosen is a signal fill with graphite text and a tick, so the state never rests on colour alone. Used for the request builder's needs, the viewer's language and size, the teardown's parts and symptoms. The till's keys and the teardown's chips keep a visible chosen state in forced colours.

### Fields
The request builder's fields are screens laid on the mat: a screen-coloured box with a 6px corner and graphite text, 48px tall, no border on the dark bench and a 1px chalk-dim inset edge on the light bench, where they would otherwise vanish. Each line takes the direction of what is typed on it. Focus is the site ring.

### The bench (signature)
The home page's first screen, complete as server-rendered HTML before any script runs. The maker's name across the mat, the role in a label under it, then three plots in a row (184px tall on a phone, 310px from 640px, 390px from 1024px), each a link to its exhibit: the laptop showing a client site in the page's language, the till with Qasa's sell screen and a receipt standing out of its printer, and the computer with its glass side showing the parts. Under each device a dimension line in ruler with the device's name in a chalk label. Along the bottom the offer in chalk-dim, then "Start a request" in signal and "See the work" as an outline.

When first drawn the devices are set down on the mat one after another (from 34px above, 480ms, set-down curve, 90ms apart); this happens once and not again when Effects is switched on later. Pointed at, focused or chosen, a device is lifted 14px (380ms). Under a mouse the bench tilts on a spring. Choosing a device grows its screen into the exhibit's frame with a View Transition (the `exhibit` group, 460ms, expo; the rest of the page crossfades in 260ms) and focuses the exhibit's heading. With Effects off or no View Transitions, it is a link and jumps.

### Site viewer (the laptop)
A graphite browser window (10px corner, device shadow) with dot tabs for Ellin Company and Bright Volition, an address bar that is the link to the live site, and real screenshots. Language (English, Arabic, Kurdish) and size (desktop, phone) are chips. Changing size resizes the window (420ms, quart) and rounds it into a 30px phone; another language is wiped in from its own reading start (420ms), another site fades in (260ms). Marks on the screenshot are marker dots with a graphite rim, each a 44px target, opening a one-line fact in a graphite tip; the same facts are listed under the window for reading without pointing.

### Live till (the till)
A working copy of Qasa's sell screen in a graphite till (16px body, 20px from 640px), with a receipt printer beside it from 1280px and below it before. Category keys and product tiles on `#e6ebe7`, the order drawn as a receipt with a torn bottom edge, quantity keys inside 44px targets, a 10% discount switch, totals with rounding to 250 dinars and the dollar equivalent, payment in dinars or dollars, and Charge as the one signal key (1.0625rem). A language key turns the till Kurdish or Arabic and mirrors it, whatever the page's language. Money is in Plex Mono. Charge prints the receipt out of the slot (480ms); a new line slides in (260ms), a changed quantity bumps (260ms, set-down), the switch's knob slides (240ms). The receipt ends with a request that opens the request builder with "POS system" chosen. A sound switch on the till turns on synthesised sound; it is off on every load.

### Teardown (the open computer)
The computer from the bench, larger and turned so the open side faces the reader. A slider and two buttons open it; the parts (cooler and fan, memory, storage, power supply, motherboard) slide out on a spring in the order they are built up. Each part carries a numbered flag on a leader line. Choosing a part (on the drawing or in its list) shows its name, what it does and the usual signs it is failing, each sign ticked in ruler. A symptom ("will not turn on", "very slow", "hot or noisy", "nothing on the screen") lights the parts usually responsible in marker. The opened length is drawn on a ruler. The request, "Send this to Mustafa", opens the request builder with the symptom written. The repairs text says only diagnosis, part replacement and maintenance.

### Request builder
On every page that asks for work. The heading in the headline cut, a lead, then the needs as chips (Website, POS system, Hardware repair, Job or internship offer), the name and details as fields, each marked optional. Beside it (below it under 1024px) a 384px graphite phone with the owner's avatar and number in its header; the message is drawn as a bubble at the inline end and changes with every keystroke, and untouched it shows one line in graphite-soft saying so. Under the bubble the send button in signal and two text links, email and call. The site sends and stores nothing. An exhibit opens it with a need chosen and a line written, by a link with `data-need` or by `?need=` in the address. Without script the fields are plain fields and the links open an empty chat or email.

### Navigation (header)
The ruler strip described under Layout. The name at the start from 1024px, in wide extrabold capitals. Nav links are 0.95rem medium, chalk-dim at rest and chalk on hover and when current; the current page is marked by a 2px ruler stroke under the word that grows from the reading start (200ms, only with motion). The command button ends the nav: a 22px magnifier, 44px, showing its shortcut in a keycap from 768px. Then the language switch, the three codes in condensed capitals (0.85rem), the current one in ruler; each is a plain link to the same page in that language. Then the lamp, a 44px bulb drawn as a line icon whose glass fills with marker and gives off rays when lit, named "Lamp" for screen readers. Then Effects, a label beside a 32px switch: on is a signal track with a graphite knob at the inline end, off is a chalk-dim outline with the knob at the start. From 768px a 3 by 16px ruler mark travels along the header's ticks as the page scrolls, driven by the scroll position (CSS only); browsers without scroll-driven animation, and pages too short to scroll, draw none.

### Command menu
Opened by the header button or Ctrl+K (⌘K on a Mac). A modal dialog drawn as a device: a graphite bezel (16px, 10px padding, device shadow) round a light screen, 36rem wide at most, the same under either lamp. The field at the top with a magnifier and an Esc keycap (hidden on touch screens), a graphite line under it on focus. Five groups under condensed labels: the five pages (Qasa POS included), the three services on the bench and "Start a request", the three languages, copy the email address, and Lamp and Effects with switches that show how they stand. Typing narrows the list; English words match in every language. A pointer greys an item (`#e6ebe7`); the keyboard fills it in signal with a 2px graphite rim. With motion on the device is set down over the bench (240ms, expo, from 10px above) and the bench dims (200ms); closing is immediate.

### Projects
Websites as small browser frames (a light bar with three dots and the address, the screenshot, device shadow) in two columns from 768px; software on a device screen (a graphite bezel, 10px) beside its text, 7 : 5 from 1024px; print work, and every job without a real picture, as lines along ruled rows. Under each picture the name, the job and what was done. Qasa POS's card is one end of the project transition.

### Project transition
Projects' Qasa card and the Qasa page share a device: going from one to the other by a link, or by Back and Forward, carries the screen across with a View Transition (the `qasa` group, 460ms, expo) while the page around it crossfades. Arriving on Projects focuses the card's "Read more" and Back and Forward land where the visitor was. Only with motion on.

### Qasa page
A back link, the title in Latin, the role line as a label under it and a lead; then the live till at full size, then ruled rows of facts and copy, and device screens of the till in the other direction (the Kurdish screen on English and Arabic pages, the English one on Kurdish) and of the reports.

### About plate
The facts laid out as the specification plate on the back of a device: a light plate (`#e9eeea`, 6px corner) of label-and-value rows under the owner's name in wide black capitals and the role, riveted to a graphite back panel (14px corner) with screw heads in its corners, and a fan, vents and a power inlet beside it from 768px (a strip of vents and inlet under the plate below that). The rows start under a 3px double rule; labels are graphite-soft condensed capitals. The last row lists the clients and links to the work.

### Contact
The page title and lead, the request builder at full size, then two ruled lists side by side from 1024px: the direct lines (email, phone, WhatsApp, the same number) and what to put in a message.

### Footer
The bottom edge of the mat, with a 1px mat-line border above it: the motto in the wide cut, bold, always in English, then the email address and phone number in chalk-dim, turning chalk on hover.

### 404 and offline pages
Standalone pages that follow the lamp. On the mat a piece of motherboard in PCB green with the device shadow: on the 404 page four memory slots with the third empty, outlined in a dashed ruler line, with a dimension line over it and "404"; on the offline page an empty port with its cable unplugged. Then the message, each block a whole number of cells tall with a rule above it, and ruler-underlined links: the 404 page says it in English, Arabic and Kurdish with a link home in each; the offline page is written in one language at a time, with a link to try again and one home.

### Icons
Line icons, drawn at one weight with round caps, only where a control needs one: the forward and outward arrows (16px, 1.75px stroke, mirrored under right-to-left), the magnifier and the bulb (22px), a tick in a chosen chip or menu item, and the till's speaker (not mirrored). None is decoration.

## Do's and Don'ts

### Do:
- **Do** use `mat`, `mat-line`, `chalk`, `chalk-dim` and `ruler` for anything printed on the mat, and the device tokens for anything that is a device; check a hex value written in a component on both benches.
- **Do** use signal orange only as a fill under graphite text, one per group of actions.
- **Do** give a device's shadow the `--drop` colour and the `--drop-k` strength, so it softens on the light bench.
- **Do** keep every band, heading and ruled row a whole number of 24px cells tall, and paint band rules rather than drawing borders.
- **Do** hang every animation off `html[data-motion="on"]`, run it once, and keep the page complete without it.
- **Do** keep domains, the email address, the phone number and Latin names in the Latin face and left to right in all three languages.
- **Do** reset letter-spacing to normal and open the leading for Arabic and Kurdish on every style that tracks or tightens Latin.
- **Do** keep every tap target at least 44px, give every slider or drag a button alternative, and draw the focus ring on every control.
- **Do** mirror every exhibit under right-to-left, with directional motion following the reading direction.
- **Do** keep English, Arabic and Kurdish in step: the same sections, rows and order in each.
- **Do** load an exhibit's code only when it comes near the screen, and keep the home page under 200KB of compressed JavaScript.

### Don't:
The owner's standing content rules. They are design constraints here, not preferences.
- **Don't** put a status on a project: no "live", "shipped", version numbers or "in progress".
- **Don't** show a location for the owner, a dated timeline, courses or certificates, a skills list, technology tags, a GitHub link or a "designer" label.
- **Don't** offer a Network Setup service.
- **Don't** mention the Prayer Times app, the WebMCP till, GarageLog, Diyari, Steam Demo Remover or Al Rwad.
- **Don't** present Qasa POS as a client's product: it is a sample of what can be built for a client, and Chrispy POS is the client version of it.
- **Don't** invent facts, numbers, testimonials or pictures. A job gets a picture only when a real one is in the repository.
- **Don't** place a small label above a heading.

The limits the build stays inside.
- **Don't** use WebGL, a 3D library or a smooth-scroll library, and don't add a preloader, scroll-jacking or a custom cursor.
- **Don't** play sound without being asked.
- **Don't** add a backend, a tracker or a request to another host at run time apart from the visitor's own WhatsApp, mail and phone links, and don't add a dependency without a stated reason.
- **Don't** let a change push Largest Contentful Paint past 2.5s, Interaction to Next Paint past 200ms or Cumulative Layout Shift past 0.1 on a mid-range Android phone on slow 4G.

And the system's own.
- **Don't** animate anything on a loop or with no one acting, and don't make an exception to reduced motion or Effects off.
- **Don't** set signal orange as text, or add a second action colour.
- **Don't** give a shadow to anything that is not a device standing on the mat.
- **Don't** letter-space Arabic or Kurdish, split it into letters or stroke it, and don't translate or transliterate the owner's name or the motto.

## Where things live

| Concern | File |
|---|---|
| Colour, font, radius and easing tokens; the light bench and its pool of light; the mat grid and the rounding to cells; the column; the ruler edge and its scroll mark; the language, lamp and project view transitions | `app/globals.css` |
| Font loading (Archivo with its width axis, Noto Kufi Arabic, Noto Sans Arabic); the inline scripts that set `data-motion` and `data-lamp` before first paint | `app/[lang]/layout.jsx` |
| Links, buttons, the arrows, bands, headings, ruled lists, browser frames and device screens | `components/sections.jsx` |
| The bench, its devices, the tilt and the transition into an exhibit | `components/bench/` |
| The exhibits (viewer, till, teardown), each with its own CSS | `components/exhibits/*/` |
| IBM Plex Mono | `components/exhibits/till/font.js` |
| The request builder; composing the message | `components/RequestBuilder.jsx`, `lib/request.js` |
| Header, footer, lamp, Effects, motion switch | `components/Header.jsx`, `Footer.jsx`, `LampSwitch.jsx`, `EffectsSwitch.jsx`, `MotionRoot.jsx` |
| The command menu and its words | `components/command/`, `lib/menu.js` |
| The project transition | `components/PageMorph.jsx` |
| The About plate's back panel | `app/[lang]/_pages/about.css` |
| The list of work and its screenshots | `lib/jobs.js` |
| Name, motto, contact details, nav labels, page titles | `lib/site-data.js` |
| Page arrangements, one per page | `app/[lang]/_pages/` |
| Every word on the site, one file per language | `app/[lang]/_content/` |
| The 404 and offline pages | `scripts/404.html`, `scripts/offline.html` |
| Screenshots of work; link-preview pictures | `public/assets/work/`, `public/assets/preview/` |
| The specification and where the build stands | `docs/interactive-redesign-spec.md`, `docs/HANDOFF.md` |
