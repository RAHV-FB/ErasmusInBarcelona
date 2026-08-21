# Production report — ErasmusInBarcelona.com

Current as of 2026-08-20. This replaces the earlier report written against the Design Component
prototype; that prototype no longer exists in the repository, and several of the facts it recorded
turned out to be wrong (see "Factual corrections" below).

## What the site is now

Twelve static pages built by `build.mjs` from `src/pages/*.js`, rendering `src/data/site-data.js`.
No runtime framework, no client-side rendering, no third-party requests on page view.

| Route | Page |
| --- | --- |
| `/` | Home |
| `/join-a-course/` | Courses for teachers and education staff |
| `/bring-a-group/` | Student group programmes, with the group planner |
| `/plan-a-mobility/` | Coordinators and institutions |
| `/dates/` | The scheduled Barcelona weeks |
| `/your-week/` | What a course week looks like |
| `/barcelona/` | Venues, travel, practical information |
| `/about/` | History, team, organisation |
| `/contact/` | Email, phone, WhatsApp, sign-up form |
| `/privacy/` · `/cookies/` | Legal, matching what the site actually does |
| `/404.html` | Served with a 404 status |

## Factual corrections

Checked against www.spainbcn.com and the organisation's own course calendar on 2026-08-20.

| Was | Now | Source |
| --- | --- | --- |
| €400 per person per week for both 20 h and 25 h | €400 for 20 h a week, €450 for 25 h | SpainBcn subject-area pages |
| "Certificate of Participation" | Certificate of attendance, issued on the final day | SpainBcn, throughout |
| "Classes 10:00–14:00" / "10:00–15:00" | "Classes run Monday to Friday mornings"; 20 or 25 hours chosen at booking | SpainBcn publishes no clock times — see "Unresolved" |
| Invented programme names ("Technology in the Classroom", "Practical English (A1–C2)", "Mindfulness in the Classroom" as a programme, …) | Only SpainBcn's own 39 programme names, each linking to its own entry | SpainBcn catalogue |
| Catalogue link pointed at the SpainBcn homepage | `https://www.spainbcn.com/courses.html` | SpainBcn navigation |
| 10–20 "View programme" links all going to the homepage | Every programme name links to its own anchor on the relevant subject-area page | SpainBcn |
| "around twenty courses across some thirty weeks" | Removed; the catalogue's size is SpainBcn's to state | — |
| "Every trainer is a native speaker with specialised teaching certifications" | Removed. "Courses are taught by trainers working in their own subject areas" | Unsupportable as stated |
| Address conflict: 08025 vs "Local 2, 08024" | Carrer del Pare Lainez 19, 08025 Barcelona, everywhere | SpainBcn contact, Barcelona and privacy pages all agree |
| Google reviews "4.9 / 136" | 4.9 from 134 reviews | SpainBcn homepage |
| OID shown on many pages | E10336106, in the footer, on /about/ and once on /plan-a-mobility/ | SpainBcn |
| LinkedIn and YouTube links | Removed; the organisation currently publishes Facebook and Instagram only | SpainBcn footer |
| "university internships" among the formats | Removed. The formats listed are the six SpainBcn publishes | SpainBcn projects page |
| "Custom courses for accepted projects" | "A private programme or a group project is quoted for the group" | — |
| Course weeks with a "confirmed" state | Every week is "scheduled"; the calendar records no other state | The organisation's own sheet |
| Dates: 12 Barcelona weeks | Unchanged — all 12 verified row by row against the sheet | DATES-SPAINBCN, gid 480287972 |

## Copy

Removed: "on purpose", "actually local", "a short honest list", "roughly is fine", "the week you
get back", "Photos usually happen", "One per afternoon is plenty", "bring whatever you normally
take to a working session", "lunch like a local", "The team replies from Barcelona", "Erasmus in
Barcelona is SpainBcn in Barcelona", "This website is the Barcelona-focused home of…", the
seasonal Barcelona-tourism section, the T-casual ticket recommendation, the dinner-time
observation, the two unsupported transport generalisations, and the repeated ownership
disclaimers in CTA blocks.

The ownership relationship is now stated three times in total: in the header, once on /about/,
and in the footer's legal line.

## Design

The visual system is unchanged — white ground, cobalt, graphite, square geometry, real
photography — but several devices were used less:

- **Uppercase**: 44 uppercase runs remain across nine pages, all of them tiny labels: one eyebrow,
  the footer column headings, the timetable day names, the registered company name and the
  acronym CLIL. Every heading is sentence case.
- **The coral full stop** after headings: gone.
- **"BCN"** as a substitute for Barcelona: gone, except the airport code.
- **"EiB"**: only the favicon. The header carries the full name and "by SpainBcn-Programs".
- **Arrows**: 4 on the home page, 11 on the longest page. `→` for a major internal action, `↗` for
  a link that leaves the site. Never appended to social or navigation links.
- **01/02/03 numbering**: only the three routes on the home page.
- **Colour blocks**: cobalt, white and graphite carry the site; powder is used for one or two
  sections a page; mint appears only in the timetable; coral and sun are accents, not sections.
- **Hero imagery** varies by page: one large photograph on the home, courses, groups and week
  pages, a full-width band on the Barcelona page, and none on the mobility, dates or contact
  pages. The home page's second photograph moved down to the section it illustrates.
- **The group planner** exists once, on /bring-a-group/. The duplicate on the home page is gone.

## Images

### Photography pass — 2026-08-20 (second review)

Every photograph in the archive was looked at, not just listed. The first selection was placing
weak frames in the most prominent slots: the home hero was a wide classroom shot where the people
were a small band between an empty ceiling and a foreground of empty desks and backpacks; the
your-week hero was dim, cluttered and 825px wide; the Barcelona page carried a 713px strip of four
tiny views. Meanwhile the warmest frames in the archive were unused.

The organisation's current site, www.spainbcn.com, turned out to hold a much larger library of its
own photographs. Seven were brought in (see source-photos/spainbcn/README.md for what each one
shows and which page it comes from, which is what the alt text may claim). Photographs of the other
Spanish destinations were left alone: this site is Barcelona only.

What is placed now, and why:

| Where | Photograph | Why this one |
| --- | --- | --- |
| Home hero | A course group holding up their certificates | Faces fill the frame, everyone laughing; the warmest frame available |
| Home, typical week | Participants at the desks of a Barcelona classroom | Daylight from the window, relaxed, nobody posed |
| Home band | A course group in front of the Arc de Triomf | Blue sky, palms, waving; unmistakably Barcelona |
| Home, between sessions | A café terrace in Barcelona · the Barceloneta seafront | People enjoying themselves, then the light |
| Join a course | A course group in the sitting room at the office | The most human frame in the archive: a dozen faces, all smiling |
| Bring a group | Students at Parc de la Ciutadella · students at a viewpoint | Sunlit, joyful, plainly students |
| Your week | Participants working with coloured card | Shows the actual work of a session |
| Barcelona band | A course group in front of the cathedral | The city and the group in one frame |
| Barcelona, venue | The classroom at the office in Gràcia | Shows the real room, with people in it |
| About | María Ángeles and Miriam in 1997 | The history, unchanged |

Dropped from the site: the bare-classroom certificates shot, the dim ICT frame, the four-view
strip of the school, and the soft AI-classroom video still. All originals stay in `uploads/`.

**Crops.** Each photograph now carries a focal point in `site-data.js`, applied as
`object-position`, so a wide or tall crop keeps the faces rather than the ceiling. The twelve team
portraits are cropped to the most salient region instead of a fixed top crop, with four —
Adriana, Julie, Russell and Sandra — given an explicit face box, because they are whole-body
holiday snapshots in which no automatic crop found a head. They now read as one set.

Only photographs a page actually uses are processed; the rest of the archive is listed in
`tools/build-images.mjs` and can be brought back by uncommenting a line.

### Sources

All 12 photographs and all 12 team portraits are served from this site. The portraits were
downloaded from the old CDN and are no longer hotlinked; `clvaw-cdnwnd.com` appears nowhere.
Originals stay in `uploads/` and `source-photos/`, neither of which is published. Production files
carry descriptive names (`student-group-park-guell-barcelona-1600.webp`), are WebP, and are served
at up to three widths with `srcset`. No placeholder is visible anywhere on the site.

## Forms

The contact page offers the organisation's own forms.app sign-up form. Nothing is requested from
forms.app until the visitor presses "Load the form"; the page states what that discloses before
they press it. Email, telephone and WhatsApp are in plain text next to it. The group planner's
answers travel to /contact/ in the URL, are shown back to the visitor, and are pre-filled into the
email link, so nothing is typed twice. The third-party form embed cannot itself be pre-filled.

## Privacy and cookies

Rewritten to describe this site: no cookies, no local storage, no analytics, no advertising, no
maps, no fonts or assets from anyone else. Server access logs, the consent-gated form, what
happens when you write to us, photographs, retention, legal bases, rights and the AEPD. The
consent banner is gone, because there is nothing left to consent to on page view.

## Verification

- **Cross-browser**: Chromium (Chrome and Edge), Firefox 153 and WebKit 26.5 (Safari and iOS),
  every route at 320, 375, 390, 430, 768, 1024, 1280 and 1440 px — 88 combinations per engine, no
  horizontal overflow and no console errors in any of them, plus an iPhone 13 profile for tap
  behaviour.
- **Accessibility**: keyboard path from skip link to footer, focus moved into the mobile menu and
  returned to its button on Escape, `aria-expanded` and scroll lock, one `<h1>` per page and no
  skipped heading levels, alt text on every image, no tap target under 44 px, and every text
  colour at or above 4.5:1 against its background.
- **Performance**: 32–338 KB and 4–8 requests for an initial view, cumulative layout shift 0.0000
  on every page.
- **Links**: every internal link resolves, every legacy path redirects in one hop to a page that
  answers 200, and `/no-such-page` answers 404.

`npm run check` re-runs all of the above except the cross-browser matrix.

## Unresolved — needs a human

1. **Class times.** SpainBcn publishes "Monday to Friday mornings" and a 20 or 25 hour choice, but
   no clock times. The old site's "10:00–14:00 / 10:00–15:00" could not be confirmed, so the site
   no longer states times. If they are correct, put them in `schedule` in `site-data.js`.
2. **The hosting company** named in `/privacy/`. The policy describes the server logs of the host
   used for spainbcn.com; confirm who will host this site before publishing.
3. **Google reviews link.** The rating and count come from SpainBcn's homepage; the link here is a
   Google local-results search rather than the organisation's own review URL, which the current
   SpainBcn markup does not expose in a stable form.
4. **Minimum group size.** The old site said five students. Nothing on SpainBcn confirms it, so it
   is not stated here.
5. **Venue accessibility.** No published information, so the Barcelona page invites the question
   instead of answering it.
6. **The last four course weeks** were verified against the organisation's own sheet; SpainBcn's
   own dates page was rate-limiting requests and could not be read as a second source.

---

## Differentiation, privacy and copy pass — 2026-08-21

### Courses page: the main structural change

It was a subject list with a description and programme links under each — the same shape as a
catalogue page on SpainBcn, with fewer programmes. It is now a Barcelona directory: a jump index of
the six areas, then one row per area in three zones — the subject and what it covers, the programme
names (each linking to its own entry on SpainBcn), and **the next scheduled Barcelona weeks for that
subject**, read from the same `dates` data the dates page uses. Areas with no scheduled week say
"Dates on request" and link to the enquiry, because other dates open on request.

That third column is the difference: SpainBcn answers "what courses exist", this page answers "when
can I do this in Barcelona". Catalogue totals ("all 39 programmes across 14 subject areas") are gone
— those are SpainBcn's numbers to keep current, not ours.

### Page structures no longer share one template

Home is routes and upcoming weeks; Courses is the directory; Groups is the planner; Dates is the
board; Your week is the timetable; Barcelona is venue and travel facts; Mobility is a two-state
project layout (already funded / still preparing) plus the document list; About is history and
people; Contact is the form. Three pages no longer end with a cobalt block: Groups ends at the
planner, Barcelona at a link to the dates, About at the organisation details.

### Copy removed

"A real person replies…" (now "We normally reply within two working days", used once per page at
most) · "Six ways into the catalogue…" · "The full programme descriptions live on SpainBcn" · "Your
answers travel with you to the enquiry" · "Nothing is stored on your device — the answers travel in
the link" · "Reviews are published by the people who wrote them, on Google" (now just the rating and
count) · "Participants meet the same small Barcelona team during the week" · "This site covers the
courses and education programmes we run in Barcelona…" · the whole forms.app explanation on the
contact page. Headings moved from questions to statements where the question added nothing:
"Programme formats", "Choosing a week", "Your first day", "Arriving", "Reviews", "How the courses
run". Three question headings remain, all on pages where they read as an actual question to the
visitor.

### Fees

"What the fee does not cover" is gone. The fee block now reads: €400 for 20 hours, €450 for 25, then
"The fee covers the course, materials, the week's two cultural activities and your certificate of
attendance", then one neutral line about travel and accommodation. The second column is "Documents
for your mobility" rather than a list of exclusions, and the Erasmus+ budget-line explanation is off
the pricing block entirely.

### Captions

Nine visible captions became three, all of which identify a place rather than narrate the picture:
"Parc de la Ciutadella, Barcelona", "Plaça de la Seu, Barcelona", "The classroom at Carrer del Pare
Lainez 19", plus "Barceloneta" and "María Ángeles and Miriam, 1997". Alt text is unchanged and still
describes every photograph.

### Analytics — Umami

Umami Cloud, the organisation's own account, on Umami's EU region, with this site's own website id
— not spainbcn.com's, which would have mixed the two together. Configured in
`src/data/analytics.js`, one place:

    data-host-url="https://eu.umami.is"   reports to the EU endpoint
    data-exclude-search="true"            query strings never recorded
    data-exclude-hash="true"              fragments never recorded
    data-do-not-track="true"              browsers asking not to be tracked are not counted
    data-domains="erasmusinbarcelona.com,www.erasmusinbarcelona.com"

No Distinct ID, no `umami.identify()`, no session replay, no custom events, no form or planner data.
Verified by capturing the actual request the tracker makes (see QA below).

`data-host-url` is the part that is easy to get wrong. Loading the script from `eu.umami.is` does
**not** by itself keep the data in the EU: the file served there is byte-identical to the one at
`cloud.umami.is`, and it resolves its collector as `(data-host-url || "https://gateway.umami.is") +
"/api/send"`. Without the attribute an EU-region site reports to the US-facing gateway. Both were
read directly from the served script and both endpoints were probed. Umami's own FAQ states its
cloud servers are in the US and the EU.

The website id is public — it is in the markup of every page — so it lives in `analytics.js` rather
than in a repository variable. `UMAMI_WEBSITE_ID` still overrides it, which is how the network QA
below points a build at a throwaway id.

### The sign-up form — forms.app

Nothing is requested from forms.app until a visitor allows it: no script, no iframe, no preconnect,
no cookie. Where the form will be, the contact page shows a blurred abstract backdrop — irregular
blocks, `inert` and `aria-hidden`, deliberately not the shape of a form, with no labels, no fields
and no submit button, so nothing can be mistaken for something to fill in. The permission card sits
above it: one line of text, the button, and the links out. After permission the backdrop and the
card both disappear and only the form remains. The choice is stored as `eib-privacy-v1` in local storage and read before first
paint, so a returning visitor with permission sees the form directly, with no flash of the gate. The
form area reserves the embed's height, so nothing moves when it mounts.

Withdrawing permission in "Privacy choices" unmounts the embed and restores the gate, and later
visits do not load it. Cookies already set on forms.app's own domain can only be cleared in the
browser — said once, in the cookie policy, not in the contact flow.

The planner's answers are passed into the form's own "What course, location and date are you
interested in?" field using the embed's documented `answers` option. Names, email addresses and
anything the visitor types are never passed.

**Audited from the published form definition:** four questions (full name, email, course/location/
date, comments); no CAPTCHA forced; no analytics, pixel, tag-manager or webhook integrations
configured; its own cookie modal disabled. The form could not be rendered in this sandbox — the
browser here cannot reach forms.app — so a visual check in a normal browser is the one thing left.

### Privacy and cookies pages

Both rewritten in the present tense for the stack as it now works: server logs, the local privacy
preference, Umami (what it records, that it uses no cookies, that IP is used transiently and not
stored, that query strings and fragments are excluded, no Distinct ID, no replay, legitimate
interest under Article 6(1)(f)), and forms.app (consent before loading, what it receives, its own
cookies, its policies linked, consent under Article 6(1)(a) plus Article 22.2 LSSI-CE, and the
contract basis for the enquiry itself). Both meta descriptions updated: neither says "no analytics"
or "sets no cookies" any more.

### Network QA — measured, not assumed

Both third parties were intercepted locally so their real requests could be observed.

| Scenario | Result |
| --- | --- |
| Fresh visit, no choice | Umami script requested · **zero forms.app requests** · zero cookies · nothing in local storage · banner shown · blurred gate shown |
| "Necessary only" | Banner gone · preference stored `formsApp:false` · **still zero forms.app requests** · Umami still running |
| "Allow sign-up form" | forms.app requested **only after the click** (`cdn.formsapp.io/embed.js`) · gate removed · iframe mounted |
| Return visit with permission | No banner · form loads automatically · gate never visible |
| Withdrawal | Embed removed · gate restored · preference `false` · later visits do not load it |
| Umami payload, from a URL carrying planner answers and a fragment | `url` sent as `/contact/` — no query string, no fragment · no planner answers anywhere in the payload · no Distinct ID · no cookies set |

### Everything else

`npm run check` passes on all 12 pages: metadata, heading order, alt text, dead links, third-party
requests on load, tap targets and horizontal overflow at 320, 375, 390, 430, 768, 1024, 1280 and
1440 px. A scan of the built HTML for the 30 phrases this pass was asked to remove finds none.

### Deployed and checked live

Pushed to `claude/site-health-check-df5ie0`; the Actions workflow built and deployed it. On
https://rahv-fb.github.io/ErasmusInBarcelona/ every route answers 200, an unknown path answers 404,
the 22 legacy paths still redirect to their new pages, and every page carries `noindex` with
robots.txt disallowing everything, because this is still a prototype build. The deployed HTML
contains the tracker, which loads and sends nothing: `data-domains` is an allowlist on sending, not
only on counting — the script returns early on any other hostname, github.io included. No forms.app
reference appears before consent.

The same build was re-checked with `BASE_PATH=/ErasmusInBarcelona`, so the sub-path prefixing of
links, images and `srcset` candidates is confirmed on the form the project site actually serves.


### Hosting named

The site will be served by Dinahosting S.L., a Spanish company in Santiago de Compostela; setup and
the domain transfer are in progress. It is now one fact in `site-data.js` (`hosting`) and rendered
into `/privacy/` in three places — the server-log section, the list of who else sees your
information, and the retention list — plus a link to its data protection page. The transfers section
says hosting is in Spain. Until the transfer completes the prototype is served by GitHub Pages,
which is why that build is `noindex` and disallowed in robots.txt.

### The permission gate, second pass

The first version drew the real form's four fields. It read as a form, which is the opposite of what
it is, so it was replaced: a blurred, irregular backdrop that shows something is there and cannot be
mistaken for anything to fill in, with the permission card layered above it. Same behaviour, same 26
network checks, same reserved height.


### Analytics moved to the EU region

The account is in Umami's EU region, so the tracker is served from `eu.umami.is` and, through
`data-host-url`, reports there too. Confirmed in a browser: the page view was intercepted at
`https://eu.umami.is/api/send`, which only happens if the attribute is applied — without it the
request would have gone to `gateway.umami.is` instead. `/privacy/` and `/cookies/` now say the
analytics data is handled in the EU, and the transfers section distinguishes hosting and analytics
(both EU) from forms.app (outside the EEA, under Standard Contractual Clauses).

`npm run check` gained a rule to match: the tracker's host is the only third party a page may
contact on load, it is answered inside the test rather than allowed out, and a page that fails to
request it now fails the check. Anything else leaving the page is still a failure.

Two test hits were recorded against the real website id while working out which region holds it —
hostname `region-check.invalid`, url `/setup-region-check`. They are the only artificial traffic.
