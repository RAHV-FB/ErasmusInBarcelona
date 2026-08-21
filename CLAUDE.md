# Project instructions (persistent)

Site: **ErasmusInBarcelona.com** — the Barcelona site of SpainBcn-Programs. Static HTML built by
`node build.mjs` from `src/pages/*.js` and `src/data/site-data.js`. Read README.md before changing
anything.

## Architecture rules

- **One source of truth.** Every fact the site states — price, date, address, OID, programme name,
  person, document — lives in `src/data/site-data.js` and is rendered from there. Never type a
  fact into a page template, and never state one in two places with different words.
- **Plain HTML out.** No framework, no client-side rendering, no build-time magic beyond string
  templates. Titles, descriptions, canonicals, Open Graph and JSON-LD are in the markup, never
  assigned by script.
- **CSS decides layout, not JavaScript.** `src/assets/js/site.js` handles the menu, the date
  filter, the group planner and loading the sign-up form. Nothing else. No React, Vue, Tailwind,
  Bootstrap, jQuery or animation libraries.
- **Two third parties, both on a leash.** Umami Cloud runs on every page, on its EU region:
  cookie-free, query strings and fragments excluded, do-not-track respected, reporting only from
  the production domains, no Distinct ID, no replay, no custom events, configured once in
  `src/data/analytics.js`. The EU endpoint is set by `data-host-url`; drop it and the tracker
  silently reports to the US instead. forms.app loads only after the visitor allows
  it, and never before — no script, no iframe, no preconnect. Nothing else may be added. If either
  changes, `/privacy/` and `/cookies/` change with it in the same commit, and the network behaviour
  is re-checked rather than assumed.
- **Never send anything personal to analytics.** No names, emails, form contents, planner answers,
  or identifiers. The planner's answers travel in the query string, which is exactly why the
  tracker excludes query strings.
- **Images are local.** Originals stay in `uploads/` and `source-photos/` (never published);
  `tools/build-images.mjs` produces the WebP files in `src/assets/images` under descriptive names.
  No hotlinking, ever.
- **Run `npm run check` before committing.** It fails on dead links, missing or duplicate
  metadata, broken heading order, missing alt text, third-party requests, tap targets under 44 px
  and horizontal overflow at eight widths.

## Facts

Authority, in order: the organisation's DATES-SPAINBCN sheet (course weeks) → www.spainbcn.com
(prices, programme names, certificates, formats) → the organisation's published contact and legal
details. The old erasmusinbarcelona.com is history, not a source. Never invent a date, price,
programme name, testimonial or member of staff, and never restate a claim SpainBcn does not make.
If a fact cannot be verified, leave it out and record it under "Unresolved" in
notes/production-report.md.

## Visual system

White `#FAFAF7`, graphite `#202124`, cobalt `#3157D5` carry the site; powder `#DCE9FA` for the
occasional section; mint, coral and sun `#F3CE67` are accents, not section colours. One sans
family, square geometry, 0–2px radius, real photography.

Restraint is part of the design. Headings are sentence case. Uppercase is only for tiny labels —
eyebrows, day names, footer column headings. No coral full stop after headings. "Barcelona", not
"BCN", outside location metadata. "EiB" only in the favicon. `→` for a major internal action, `↗`
for a link that leaves the site, and nowhere else. Numbered sections only where the sequence
matters. Do not demonstrate the whole system on every page.

## Writing

Explain the service, never the website. No sentence whose subject is this page, this site, this
link, the form, the catalogue or where the answers travel. Technical and legal explanation belongs
on `/privacy/`, not in the middle of a conversion page.

A photograph does not need a caption because it exists. Caption only what a reader cannot see —
a place, a date — and keep the alt text descriptive either way.

Say something specific or say nothing. No marketing language, no conversational asides that
announce their own honesty, no tricolons, no "designed to", no "not just X but Y", no
"whether you're X or Y", no invented urgency or scarcity. If a sentence gives the reader nothing
they did not already know, delete it.

## Boundaries

Do not modify anything SpainBcn-owned. Cross-links to SpainBcn.com stay explicit and marked with
`↗`. State the ownership relationship three times in total: the header, once on /about/, and the
footer's legal line.
