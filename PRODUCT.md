# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally (the owner's decision, 2026-10-08): local business owners who need a website, a point-of-sale system or a hardware repair, and employers deciding whether to offer Mustafa a job or an internship. Both come to judge real, finished work and decide whether to get in touch.

Most of them arrive on a phone. The research behind the redesign (`docs/interactive-redesign-spec.md`, section 2) found that 87.5% of web traffic in Iraq is mobile and that about 80% of phones are Android, mostly budget brands. Links to the site are shared on WhatsApp and Instagram and open in their in-app browsers. The site has to work well there first.

## Product Purpose

The personal site of Mustafa Deari Ahmed. It presents Mustafa's software and hardware work as one capability and gives visitors a quick way to get in touch. Success means a visitor leaves convinced that Mustafa can deliver on a real engagement (a website, a point-of-sale system, a repair, or a job or internship) and sends a request on WhatsApp, by email or by phone.

## Positioning

Mustafa works on both software and hardware: websites (including multilingual Arabic and Kurdish sites), point-of-sale systems for shops, and diagnosing and repairing computers. Most student portfolios show one side only. This site's answer is to let the visitor operate the evidence instead of reading claims about it: everything the site says Mustafa can build, the visitor can use. The site is a workbench with three working devices: a laptop showing the real client websites, a till that rings up and prints a sale, and a computer that comes apart part by part. Each one ends in the same action: a request to Mustafa.

## Operating Context

Five pages in three languages (English, Arabic and Kurdish Sorani): Home, Projects, the Qasa POS page under Projects, About and Contact, plus a 404 page and an offline page. The home page carries the bench, the three exhibits (the site viewer, the live till and the teardown), a short list of work and the request builder. Further features: a transition between the Projects card and the Qasa page, link previews for WhatsApp and Instagram, a scroll mark on the header's ruler, a lamp switch for a light and a dark bench (the site opens on the dark one), a command menu (the search button or Ctrl+K), sound for the till (off until the visitor turns it on), and installing the site so it works offline.

Services offered: website development (including multilingual sites), point-of-sale systems, and hardware maintenance and repair. Work referenced on the site: the Ellin Company and Bright Volition websites; Qasa POS, a sample point-of-sale system that shows what Mustafa can build for a client; Chrispy POS, the version of Qasa built for a client's kiosk; the Chrispy menu website; and print work (the Krofi rebrand and menu, the Chrispy printed menu, the Ellin business card, the Ellin and Bright Volition company profiles).

## Capabilities and Constraints

Confirmed contact channels: email (mustafadiyary03@gmail.com), phone and WhatsApp (both +964 772 811 0303). The site is a Next.js static export on GitHub Pages under `/MyWeb/`, with no backend. The request builder writes the message in the visitor's browser and hands it to their own WhatsApp, mail or phone app; the site sends and stores nothing, and fetches nothing from other hosts. The limits the build stays inside (performance on a mid-range Android phone on a slow 4G connection, WCAG 2.2 AA, right-to-left, no new dependency without a stated reason) are in `docs/interactive-redesign-spec.md`, section 8. The current site content is the complete set of real evidence: do not invent credentials, links, projects, numbers, testimonials or pictures.

The owner's standing content decisions (2026-10-08 and earlier), which the design must not bring back: no status on projects (no live, shipped, version or in progress); no location for Mustafa; no dated log or timeline; no courses or certificates; no skills list; no technology tags; no GitHub link; no "designer" label; no Network Setup service; and no mention of the Prayer Times app, the WebMCP till, GarageLog, Diyari, Steam Demo Remover or the Al Rwad QA work. Qasa POS is presented as a sample of what Mustafa can build, never as a finished product for sale, and Chrispy POS is the client version of it. WhatsApp and the phone are the same number. A job gets a picture only when a real one is in the repository.

## Brand Commitments

Name: Mustafa Deari Ahmed, written in Latin in every language. Motto, kept from the first site: "Built by hand, deployed with intent." It is shown in English on every page; whether it stays in English on the Arabic and Kurdish pages is still the owner's to decide.

On 2026-10-08 the owner retired the terminal identity and then rejected the job-ticket book that replaced it as too simple. The brief since then: a site that is interactive and unique, with many working features that show what Mustafa can build; not a template, not technical, not plain, and with no pointless moving background. The site is now "The Bench" (see `DESIGN.md`). The primary action on every page is to send a request, written in the request builder, on WhatsApp. English, Arabic and Kurdish Sorani are kept in step.

## Evidence on Hand

Real, verifiable work referenced on the site: the Ellin Company website (ellincompany.com) and the Bright Volition website (brightvolition.com), each with screenshots of its English, Arabic and Kurdish pages at desktop and phone sizes; Qasa POS (screenshots in `public/assets/work/`, and the live till, a small working copy of its sell screen with Qasa's own sample products); Chrispy POS and the Chrispy menu website; and the print work listed under Operating Context. Mustafa is a Computer Engineering student at Tishk International University, Erbil, open to internships, freelance work and collaboration. No testimonials, press, benchmarks or further case studies exist, and future work must not fabricate any.

Still to come from the owner: the repairs Mustafa actually does (until then the teardown says only diagnosis, part replacement and maintenance), real pictures of the print work and the Chrispy screens with the clients' agreement, and two or three short client quotes.

## Product Principles

- Show, do not claim: anything the site says Mustafa can build, the visitor can operate.
- Lead with real work over aspirational claims; every project referenced exists.
- Present software and hardware as one skill set: every device on the bench ends in the same request.
- Keep the way to get in touch quick and visible on every page.
- Speak to both a paying client's practical need and an employer's judgement of skill, without leaning towards either.
- Work first on a budget Android phone on a slow connection, in all three languages, by touch, by keyboard and with a screen reader.
