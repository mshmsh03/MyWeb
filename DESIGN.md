---
name: Mustafa Deari Ahmed
description: A carbon-copy job-ticket book. Every piece of work is a ticket on white, canary or pink paper, and the next blank ticket is the visitor's.
colors:
  carbon: "#1a2a7c"
  carbon-deep: "#111c5a"
  carbon-line: "#4356b4"
  ground: "#f4f5fb"
  ground-dim: "#bcc5f0"
  sheet: "#fbfbf7"
  canary: "#ffe35c"
  pink: "#ffc4d2"
  ink: "#0f1838"
  ink-soft: "#3a4366"
  form: "#2540c4"
  serial: "#d1232a"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 5.2vw, 3.6rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 120"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.8vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 120"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.2vw, 1.7rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 120"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.09em"
    fontVariation: "'wdth' 70"
  serial:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
    fontVariation: "'wdth' 120"
  rtl-display:
    fontFamily: "'Noto Kufi Arabic', 'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
    fontSize: "clamp(1.75rem, 3.8vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.45
    letterSpacing: "normal"
  rtl-body:
    fontFamily: "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "normal"
rounded:
  paper: "3px"
spacing:
  gutter: "20px"
  gutter-wide: "24px"
  sheet: "20px"
  sheet-wide: "28px"
  stack: "24px"
  band: "48px"
  band-wide: "64px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.paper}"
    padding: "8px 20px"
    height: "44px"
  button-ink-hover:
    backgroundColor: "{colors.form}"
    textColor: "{colors.sheet}"
  button-canary:
    backgroundColor: "{colors.canary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "8px 20px"
    height: "44px"
  button-canary-hover:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
  button-paper:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "8px 20px"
    height: "44px"
  sheet-white:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "{spacing.sheet-wide}"
  sheet-canary:
    backgroundColor: "{colors.canary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "{spacing.sheet-wide}"
  sheet-pink:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "{spacing.sheet-wide}"
  field-label:
    textColor: "{colors.form}"
    typography: "{typography.label}"
  serial-number:
    textColor: "{colors.serial}"
    typography: "{typography.serial}"
  nav-link:
    backgroundColor: "{colors.carbon-deep}"
    textColor: "{colors.ground-dim}"
    padding: "12px 8px"
  nav-link-active:
    backgroundColor: "{colors.carbon-deep}"
    textColor: "{colors.ground}"
---

# Design System: Mustafa Deari Ahmed

Recorded 2026-10-08 from the shipped build. This document replaces the dark terminal identity ("The Night Build": monospace type, mint and amber on near-black, a typewriter prompt, a moving flow-field background). The owner retired that identity on 2026-10-08 and nothing of it carries over: no monospace, no prompt, no code comments as decoration, no moving background.

## Overview

**Creative North Star: "The Job-Ticket Book"**

The site is drawn as the carbon-copy ticket book a workshop keeps on the counter. The ground is carbon paper. On it lie sheets in the three stocks such a book has: the white top copy, the canary copy, the pink copy. Each sheet carries what a printer would have put on it (labels and tick boxes in form blue, ruled lines to write along, a row of holes where it tears off) and what was then written on it in blue-black ink, with a red number stamped in the corner by a numbering machine.

Every piece of work, whatever its kind, is written up as the same ticket: a website, a till, a business card. That sameness is the argument: any job is taken on the same way. The paper says what kind of job it was before a word is read. The book ends on a blank ticket made out to the visitor, and filling it in composes the message they send.

Colours are named for the material they are, so a rule reads as what it describes. Nothing on the site is a card, a pill, a badge or a panel; it is the ground, a sheet, something printed on the sheet, or something written on it.

### Motion

The grammar is paper: a sheet is fed in from below and comes to rest (26px rise with a fade, 700ms, exponential deceleration `cubic-bezier(0.16, 1, 0.3, 1)`). It happens once per sheet. A stack of tickets may arrive as a list, each 80ms after the last, capped at four steps. The pink copy under the hero ticket slides out to where it rests (900ms, once). A tick box is crossed the way a pen crosses it: two strokes, 220ms each, the second 120ms after the first. Nothing loops, and there is no background animation of any kind.

Every one of those animations hangs off `html[data-motion="on"]`, which is set before first paint only when JavaScript runs and the visitor has not asked for reduced motion, and is switched back off if the page fails to hydrate within three seconds. No JavaScript, a failed bundle and `prefers-reduced-motion` all resolve to the same state: the page fully rendered, with no animation. There is no exception to this. Hover and focus feedback is a 200ms change of colour or shadow; the one hover that moves a sheet (a linked ticket lifting 4px) is held behind the reduced-motion preference as well.

**Key Characteristics:**
- A carbon-blue ground with paper lying on it; all content that is "an item" is on a sheet, all connective text is written on the ground.
- Three paper stocks that code the kind of job: white for websites, canary for software, pink for print.
- Two blues and a red with fixed jobs: form blue is what the printer put there, blue-black ink is what was written, red is the ticket number and nothing else.
- One Latin family in three widths; a kufi and a plain sans for Arabic and Kurdish.
- Rows, not tiles: label and value along a ruled line, in every language.
- Sheets feed in once; nothing loops; all of it is off unless motion is both possible and wanted.

## Colors

A printed-stationery palette: one saturated ground, three paper stocks, and three inks. Every pair in use clears 4.5:1 except the two noted below, which are held to large sizes.

### Primary
- **Carbon** (`#1a2a7c`): the ground the book lies on, and the colour seen through every punched hole. The browser theme colour.
- **Carbon, in shadow** (`#111c5a`): the same paper where it is covered: the header band and the footer.
- **Form Blue** (`#2540c4`): what the printer put on the sheet: field labels, the tick-box outline, the role line under a printed header, link underlines on paper, the focus ring and the focused ruled line on paper, and the carbon-copy message once the visitor has written something. Also the hover fill of the ink button.

### Secondary
- **Canary** (`#ffe35c`): the yellow copy. As paper it is the software stock, the carbon copy under the hero ticket, and the full-width closing ticket. On the ground it is the highlighter: the mark under the current page, the current language, the focus ring, the underline of a link, the one filled button, and text selection.
- **Pink** (`#ffc4d2`): the pink copy. The print stock, and the bottom sheet of the hero set.

### Tertiary
- **Numbering-Machine Red** (`#d1232a`): ticket numbers only.

### Neutral
- **White Top Copy** (`#fbfbf7`): the website stock and the default sheet; the text colour on the ink button.
- **Blue-Black Ink** (`#0f1838`): everything written on paper; ruled lines on paper at 20 to 30 percent; the filled button on paper.
- **Ink, lighter hand** (`#3a4366`): secondary writing on paper: the "work done" line, captions, placeholders, the empty carbon copy.
- **Ground Text** (`#f4f5fb`): headings and primary text written on the ground.
- **Ground Text, dim** (`#bcc5f0`): leads, descriptions, resting nav links and footer contact lines on the ground.
- **Ground Rule** (`#4356b4`): hairlines drawn on the ground: the ruled list, the header's lower edge, the footer's upper edge. A rule only, never text (1.9:1 against the ground).

### Named Rules
**The Paper Says the Kind Rule.** A job's stock is decided by its kind and nothing else: website on white, software on canary, print on pink. The mapping lives in one place (`STOCK` in `lib/jobs.js`). Wherever the stocks appear as a code, the kind is also written in words, so colour is never the only cue.

**The Printer and the Pen Rule.** Form blue is for what was on the sheet before anyone wrote on it; ink is for what was written. A label is never ink and a value is never form blue. The single crossing is deliberate: the carbon-copy message is written by the visitor but shows in blue, because that is what comes through carbon paper.

**The Red Is the Number Rule.** Red appears only as a ticket number, and only at 1.4rem bold in the wide cut. It measures 5.1:1 on white, 4.1:1 on canary and 3.5:1 on pink, which holds at that size and fails below it. Do not use it for errors, emphasis, or small text.

## Typography

**Display Font:** Archivo, expanded (`wdth` 120), weights 700 to 900 (with ui-sans-serif, system-ui)
**Body Font:** Archivo, normal width, 400 to 600
**Label Font:** Archivo, condensed (`wdth` 70), 600, capitals
**Arabic / Kurdish display:** Noto Kufi Arabic (with Noto Sans Arabic, Segoe UI, Tahoma)
**Arabic / Kurdish text:** Noto Sans Arabic (with Segoe UI, Tahoma)

**Character:** One family does everything a printed form asks of type: the same face set condensed for the small print, normal for what is read, and expanded and heavy for the name across the top. Arabic and Kurdish get the same division of labour from two faces, a geometric kufi for printed headers and a plain sans for reading; both carry the Kurdish letters that many Arabic faces omit. All fonts are fetched at build time and served from the site's own files. Figures are tabular everywhere.

### Hierarchy
- **Display** (900, `clamp(1.9rem, 5.2vw, 3.6rem)`, line-height 1, tracking -0.02em, wide): a header printed on paper. The name across the hero ticket (in capitals), the product name on the case-study sheet (up to 4rem), and the closing line on the canary ticket.
- **Headline** (800, `clamp(1.75rem, 3.8vw, 2.75rem)`, line-height 1.08, tracking -0.015em, wide): section headings written on the ground. Page titles use the same cut one step larger (`clamp(2rem, 5vw, 3.25rem)`).
- **Title** (800, `clamp(1.35rem, 2.2vw, 1.7rem)`, line-height 1.15, wide): the name on a job ticket. Names in ruled rows and ledger lines are 1.15rem (700 on the ground, 800 on paper); the group heading on the Projects page is 1.25rem, 700.
- **Body** (400, 1rem, line-height 1.6): everything read. Leads and sheet intros are 1.05rem. Prose caps its own measure at 58 to 62ch. 600 marks the value that answers a label; captions are 0.85rem.
- **Label** (600, 0.78rem, tracking 0.09em, condensed capitals, form blue, never wraps): the pre-printed field label. The role line under a printed header is the same voice at 1.05rem with 0.04em tracking.
- **Serial** (700, 1.4rem, line-height 1, wide, red): the ticket number, three digits, zero-padded.

### Right-to-left type

Arabic and Kurdish Sorani switch family at the root: Noto Sans Arabic at line-height 1.85, because joined script with marks above and below needs the room. Anything set in the display cut takes Noto Kufi Arabic instead, with line-height opened to 1.4 to 1.6 and tracking reset to normal. The width axis belongs to the Latin face and has no effect on either Arabic face. Arabic and Kurdish have no capitals, so labels are set slightly larger (0.82rem, and 1.1rem for the role line) instead of being spaced.

### Named Rules
**The Three Widths Rule.** Condensed is for what the printer set small, normal is for reading, expanded is for a printed header. Width is the hierarchy tool; do not add a second Latin family, and do not use the wide cut for running text or the condensed cut for sentences.

**The No Tracking in Arabic Rule.** Letter-spacing is never applied to Arabic or Kurdish, positive or negative. It pulls joined script apart. Every tracked style in the build resets to normal under RTL, and any new one must do the same.

**The Latin Stays Latin Rule.** A machine string (a domain, the email address, the phone number) and a name written in Latin on its own material (the owner's name, Qasa POS, a client's name) stays in the Latin face and left-to-right in every language, isolated so the bidi algorithm cannot reorder it inside an Arabic or Kurdish sentence. The owner's name and the motto are never translated or transliterated.

## Layout

One centred column, 1080px at most, with a 20px gutter (24px from 640px up). It is that wide so a ticket's fields can sit beside its screenshot; prose does not use it and caps its own measure at about 60ch. A sheet holding only a few short lines is narrowed instead of being left mostly blank (the About sheet stops at 820px).

Pages are a stack of bands on the ground, 48px of padding above and below each (64px from 640px up), tightened where a page title runs straight into its sheet. There are no dividers between bands; the ground is continuous and the sheets do the separating. Tickets in a list sit 24px apart and lie square. Sheets are padded 20px (28px from 640px up; 36px on the fill-in ticket).

Inside a sheet the unit is the ruled row: a label column sized to its longest label and a value column taking the rest, sharing one grid so values line up down the sheet in any language. A job ticket puts its name and number across the full width, then its fields and its screenshot side by side from 1024px up (roughly 1 : 1.08) and stacked below that. A ledger line runs name and job, what was done, then the number, in three columns from 768px up; below that the number moves to the top of the line. The ruled list on the ground is a container: its two sides sit side by side only when the list itself is at least 42rem wide, so the same list stacks in a narrow column on a wide screen.

The header is one row and sticky from 768px up. On a phone the name takes the first row, the nav and language switch share the second, and the header scrolls away with the page. Every tap target is at least 44px tall. All spacing and positioning is logical, so the layout mirrors under RTL without special cases; the two arrows mirror with it.

## Elevation & Depth

There is one level above the ground, and paper is on it. A sheet at rest casts the shadow of something thin lying flat: a hard 1px edge and a tight, dark drop pulled in under the sheet. A sheet that is a link casts a longer shadow when it is picked up. Nothing printed or written on a sheet casts a shadow of its own. There is no blur, no translucency and no glow anywhere; the header is opaque.

### Shadow Vocabulary
- **Sheet** (`box-shadow: 0 1px 0 rgba(8, 13, 48, 0.25), 0 18px 34px -16px rgba(5, 9, 40, 0.75)`): every sheet lying on the ground, and a screenshot shown directly on the ground.
- **Lift** (`box-shadow: 0 1px 0 rgba(8, 13, 48, 0.25), 0 28px 44px -18px rgba(5, 9, 40, 0.85)`): a job ticket that links somewhere, while its link is hovered; paired with a 4px rise over 300ms.
- **Ruled-line focus** (`box-shadow: inset 0 -2px 0 #2540c4`): the line under a field on the fill-in ticket, while the field has focus.

### Named Rules
**The Paper on the Ground Rule.** Only a sheet casts a shadow, and only onto the ground. A screenshot on paper takes a hairline ink border and no shadow; the same screenshot on the ground takes the sheet shadow and no border.

## Shapes

Paper has cut corners that are very slightly soft (3px radius) and that is the only radius in the system; buttons share it because they are printed on, or cut from, the same stock. Nothing is a pill and nothing is a circle except the punched holes.

A sheet torn from the book carries a perforation along its top edge: a row of 6px holes on a 16px pitch, 9px down from the edge, spaced to fit the sheet exactly so none is cut in half. The holes are punched, not printed: each shows the ground colour through the paper. Perforation marks a sheet that tears off and gets filled in or handed over (the fill-in ticket and its copies, the About sheet, the closing ticket); past jobs filed in the book are plain sheets.

Lines are 1px: ink at 25 to 30 percent on paper, the ground rule colour on the ground. The one heavier line is the 3px double rule under the printed header of the hero ticket. Only the copies in the hero set are turned (the pink copy by 1.1 degrees, the canary copy by half a degree, mirrored under RTL); everything else lies square.

## Components

### Buttons
- **Shape:** paper corner (3px), 44px minimum height, 8px by 20px padding, 0.95rem semibold, with an optional arrow after the words.
- **Ink:** the one filled action on paper. Blue-black fill, white-copy text; hover turns the fill form blue.
- **Canary:** the one filled action on the ground. Canary fill, ink text; hover turns it white.
- **Paper:** the quieter outline beside an ink button on paper. Ink border at 40 percent, ink text; hover firms the border and tints the fill with ink at 5 percent.
- **Focus:** the site-wide ring: 2px, 3px offset, canary on the ground and form blue on paper.
- One filled button per group. The others in the row are outlines or text links.

### Text links
Semibold, with a 2px underline 4px below the baseline: form blue on paper, canary on the ground. Hover turns the words the underline's colour. 44px tall. A link that leaves the site ends in the outward arrow; one that goes deeper into the site ends in the forward arrow.

### Sheets
The container for anything that is an item. Paper corner, sheet shadow, ink text, one of three stocks, optional perforation. Internal padding 20px, 28px from 640px. A sheet never sits inside another sheet.

### Field rows
Label and value on a ruled line: the label in the condensed form-blue capitals, the value in ink, 10px above and below, a 1px ink rule under each row and one above the first. Labels share a single column. This is the pattern for facts of any kind: a job's "job" and "work done", the facts on the case-study sheet, the About sheet, the contact details.

### Ticket number
The label "No." in the label style, then three zero-padded digits in red, wide, 1.4rem bold, always left-to-right. It sits at the inline end of a ticket's top line, level with the name, on every ticket.

### Job ticket
A sheet on the stock for its kind. Top line: the name in the title cut and the number. Below, two field rows (job, work done) and a text link on one half, the screenshot on the other with a hairline border. When the ticket links somewhere the link's hit area covers the whole sheet, so the ticket is one target, and the sheet lifts on hover. A job only gets a ticket of its own when it has a real screenshot.

### Ledger sheet
Jobs without a picture are entered as lines on one sheet of their stock: name and job, what was done, the number, with a 1px rule between lines. However many jobs, it is one sheet.

### Ruled list (on the ground)
For a short set of parallel things with no sheet of their own (services, what to send): a term in the wide cut at 1.15rem and a sentence about it in dim ground text, separated by ground rules, 20px above and below each row.

### Fill-in ticket (signature)
The next ticket in the book, made out to the visitor. A perforated white sheet over a pink copy turned beneath it. In the corner at the inline end, the form's title in the label style beside the next number. On the home page the owner's name is printed across the top in the display cut with the role line and the offer under it, closed by the double rule. Then ruled rows: customer (a text field), job (four tick boxes), details (a text area that grows), taken by. Fields have no box; the ruled line under the row is the field's edge, and it thickens and turns form blue on focus. A tick box is a 24px square with a 2px form-blue outline; ticking it draws a cross in ink.

Pulled out from under the sheet is the canary copy, turned half a degree. Whatever was written above comes through on it in form blue as the message that will be sent, so the visitor reads it before sending; untouched, it carries one line in the lighter ink saying so. The copy holds the actions: one ink button (send on WhatsApp) and two text links (email, call). The site sends and stores nothing, and with no JavaScript the fields are plain fields and the links open an empty chat or email.

### Closing ticket
Every page except Contact ends on a canary band the full width of the page with a perforation along its top: one line in the display cut, then one ink button and paper buttons for the other ways to reach him. It is the one place a stock is used at full bleed.

### Navigation
A carbon-in-shadow band with a ground rule beneath it. The owner's name at the start in wide extrabold capitals, 0.95rem. Nav links are 0.95rem medium in dim ground text, turning full ground text on hover and when current; the current page is marked by a 2px canary stroke under the word that grows from the reading start. The language switch is the three language codes in condensed capitals, the current one in canary. The footer is the same band: the motto in the wide cut, then the email address and phone number.

### Icons
Two, drawn at one weight (16px, 1.75px round stroke, current colour): a forward arrow and an outward arrow. Both mirror under RTL. The pen cross in a tick box is the visitor's mark, not an icon.

## Do's and Don'ts

### Do:
- **Do** put every piece of work on the stock for its kind (website white, software canary, print pink) and say the kind in words wherever the colour is used as a code.
- **Do** write facts as label-and-value rows on ruled lines, with labels in the condensed form-blue capitals and values in ink.
- **Do** give every ticket its number in red at 1.4rem, at the inline end of its top line.
- **Do** keep domains, the email address, the phone number and Latin names in the Latin face and left-to-right in all three languages.
- **Do** reset letter-spacing to normal and open the leading for Arabic and Kurdish on every style that tracks or tightens Latin.
- **Do** gate anything that animates on html[data-motion="on"], run it once, and make sure the page is complete without it.
- **Do** keep prose to about 60ch inside the 1080px column, and keep every tap target at least 44px tall.
- **Do** keep English, Arabic and Kurdish in step: the same sheets, rows and order in each.

### Don't:
The first five are the owner's standing rules. They are design constraints here, not preferences.
- **Don't** put a status on a project: no live, shipped, version or in-progress pill, tag or wording anywhere.
- **Don't** set a kicker or eyebrow above a heading. A form label names a value on its own row; it never sits alone over a heading to introduce it.
- **Don't** lay work out as a grid of identical tiles. A job with a screenshot is a full-width ticket; jobs without one are lines on a single sheet.
- **Don't** decorate with icons. The two drawn arrows are the whole set.
- **Don't** invent imagery. A job gets a picture only when a real screenshot of it exists; no mockups, stock photos, illustrations or placeholders.
- **Don't** bring back anything from the retired terminal identity: monospace type, prompts, code-comment labels, a typewriter effect, a moving background.
- **Don't** animate anything on a loop, and don't make an exception to the reduced-motion rule for ambience.
- **Don't** use red for anything but a ticket number, or set it smaller than 1.4rem bold.
- **Don't** add a paper stock, a second accent, a gradient, a blur or a glow. Three papers and three inks are the palette.
- **Don't** round anything past the 3px paper corner, and don't nest a sheet inside a sheet.
- **Don't** letter-space Arabic or Kurdish, and don't translate or transliterate the owner's name or the motto.

## Where things live

| Concern | File |
|---|---|
| Colour, shadow, radius, font and easing tokens; base element styles; the perforation, the machine-string rule, the motion layer | `app/globals.css` |
| Font loading (Archivo with its width axis, Noto Kufi Arabic, Noto Sans Arabic); the script that arms motion before first paint | `app/[lang]/layout.jsx` |
| The whole vocabulary: links, buttons, the two icons, bands, headings, ruled lists, sheets, labels, numbers, field rows, screenshots, job tickets, ledger sheets, the closing ticket | `components/sections.jsx` |
| The fill-in ticket and its carbon copy | `components/JobTicket.jsx` |
| Header and footer | `components/Header.jsx`, `components/Footer.jsx` |
| The motion switch, and when an element enters | `components/MotionRoot.jsx`, `components/Reveal.jsx` |
| The list of jobs, their numbers, and which paper each kind is on | `lib/jobs.js` |
| Name, motto, contact details, nav labels, page titles, screenshot sizes | `lib/site-data.js` |
| Page arrangements, one per page | `app/[lang]/_pages/` |
| Every word on the site, one file per language | `app/[lang]/_content/` |
| Screenshots of work | `public/assets/work/` |
| Product truth and the owner's content decisions | `PRODUCT.md` |
| Deployment, base path, URLs | `DEPLOY.md` |
