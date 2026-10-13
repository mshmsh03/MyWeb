---
version: 1
slug: "app-lang-page-jsx"
primary_target: "app/[lang]/page.jsx"
related_targets: ["app/[lang]/projects/page.jsx","app/[lang]/about/page.jsx","app/[lang]/contact/page.jsx","app/[lang]/projects/qasa/page.jsx"]
---

# Portfolio — all pages

Scope: the whole site (Home, About, Projects, Qasa POS, Contact, and the 404 and offline pages) in English, Arabic and Kurdish. Mode: Persuade.

Audience and job: local business owners who need a website, a point-of-sale system or a repair, and employers deciding on a job or internship, weighted equally. Both should see that Mustafa can build working things, believe the work gets done, and send a request. The owner asked (2026-10-08) for a site that is interactive and unique, with many working features: not simple, not a template, not only for programmers, and no pointless moving background.

Action: send a request on WhatsApp (or email, or call), composed in the request builder. Proof: the client sites running in the viewer, the till that rings up a sale, the computer that comes apart, and the list of delivered work. Constraints: the content rules in `docs/interactive-redesign-spec.md` section 9 and the limits in section 8.

## Direction contract

THESIS: The site is a workbench, and everything it claims the visitor can operate. Three devices stand on it, one for each kind of work, and each is switched on and works. It refuses the developer portfolio's hero-over-card-grid, the terminal costume, and animation for its own sake.

OWN-WORLD: A green self-healing cutting mat seen from above, its printed 24px grid the page grid, with a ruler printed along the top. Chalk text and ruler-yellow measurement marks on the mat; graphite devices built from CSS 3D boxes with light, real HTML screens; signal orange as the one action fill under graphite text. A lamp lights the bench: the mat turns pale and its print turns green and amber, while the devices stay as they are. Archivo in three widths (condensed caps for labels, normal for text, wide and heavy for what is printed large), IBM Plex Mono for money on the till only, Noto Kufi Arabic over Noto Sans Arabic for Arabic and Kurdish.

STORY: The visitor sees whose bench it is and what is on it, picks up a device and works it (switches a client site's language and size, rings up and prints a sale, takes the computer apart and names a symptom), and every device hands them to the same request, already started, which they send from their own phone.

FIRST VIEWPORT (as built and approved): The owner's name printed across the mat in wide black capitals, two lines on a phone and one from 768px, with the role in a condensed label under it. Below it three devices in a row, turned toward the reading direction: a laptop showing a client site in the page's language, a till showing Qasa's sell screen with a receipt standing out of its printer, and a computer with a glass side. Under each a ruler-yellow dimension line with its name. Along the bottom the offer, "Start a request" in signal orange and "See the work" as an outline. Complete as HTML before any script runs.

FORM: The bench. Signature interactions: choosing a device grows its screen into the working exhibit below (a View Transition); the request builder draws the visitor's message as a chat bubble on a phone lying on the mat, changing with every keystroke. Further features: the project morph between Projects and the Qasa page, link previews, the scroll mark on the header ruler, the lamp, the command menu (button and Ctrl+K), till sound off until asked for, installable and offline. Motion grammar: things are set down, picked up, carried and printed, once; direct manipulation runs on a spring; nothing loops; every animation hangs off `html[data-motion="on"]` and the Effects switch turns it off by hand.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Finish record (2026-10-13): The owner approved the bench, the pages, the lamp and the command menu. Steps 0 to 6 of the specification are done. DESIGN.md and its sidecar were rewritten from the built code on `redesign/interactive`, with both benches and their contrast ratios. The site is not live: it is on `redesign/interactive`, and `main` still serves the previous site until the owner decides otherwise. Step 7's checks are done and recorded in `docs/HANDOFF.md`: keyboard, what screen readers are given, reduced motion, contrast and the three languages at phone and desktop sizes pass; on a slow phone the home page's largest paint sits at the 2.5s limit. PRODUCT.md is corrected. Firefox, Safari, a real phone and a screen reader by ear are not checked. The light bench carries contrast below the line, recorded in DESIGN.md and not yet changed: the edges of outline buttons and chips (2.30 to 2.51:1), signal fills (2.40:1) and marker fills (1.25:1) against the pale mat.

Waiting on the owner, as listed in HANDOFF.md:
- A read of the Arabic and Kurdish wording (the strings from steps 1 to 5 were sent; step 6 adds the till's "Sound", the preview picture descriptions and the offline page words). The lamp's name and the command menu's words are approved.
- The repairs Mustafa actually does, for the teardown. Until then it says only diagnosis, part replacement and maintenance.
- Real pictures of the print work and the Chrispy screens, and client quotes.
- Whether the footer motto stays in English on Arabic and Kurdish pages.
- Latin words inside Arabic and Kurdish sentences ("Qasa", "Excel", "(POS)") are drawn by the Arabic face; setting them in Archivo caused layout shift, so it was backed out.
