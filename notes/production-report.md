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

What is placed now, and why. The organisation's own `uploads/` photographs carry the site — each
appears exactly once — with two frames from www.spainbcn.com kept where no upload fits:

| Where | Photograph | Why this one |
| --- | --- | --- |
| Home hero | A staff training session in progress, the group at laptops | The only frame of a course actually happening, not posed for the camera |
| Home, typical week | A course group at a whiteboard of Spanish grammar | The morning's work still on the board |
| Home band | A course group in front of the Arc de Triomf | Blue sky, palms, waving; unmistakably Barcelona (from spainbcn.com) |
| Home, between sessions | A café terrace in Barcelona · the Barceloneta seafront | People enjoying themselves, then the light (the terrace from spainbcn.com) |
| Join a course | Participants at laptops with their trainer · a group among framed prints | A course in session under the SpainBcn sign, then the range of people who come |
| Bring a group | Students at Parc de la Ciutadella · at a viewpoint · a band of students holding certificates | Sunlit, joyful, plainly students; the certificates close the story |
| Institutional programmes | A staff group in the office sitting room | A whole visiting team in one frame |
| Your week | An ICT course group, the day-by-day programme on screen | The screen literally shows the week this page describes |
| Barcelona band | A student group under the Park Güell colonnade | The city and a group in one frame |
| About | María Ángeles and Miriam in 1997 · a Spanish course group in the sitting room | The history, then how a week looks today |
| Contact | A course group in wicker chairs in the sitting room | The room an enquiry leads to |

Left unpublished: the dim ICT frame (825×464, too dark to print well), the four-view strip of the
school (139px tall), and the three category graphics and logo mark, which are text as image, not
photographs. All originals stay in `uploads/`.

**Crops.** A photograph carries a focal point in `site-data.js` wherever the CSS crop would
otherwise lose the faces, applied as `object-position`; frames already close to their displayed
ratio need none. The twelve team
portraits are cropped to the most salient region instead of a fixed top crop, with four —
Adriana, Julie, Russell and Sandra — given an explicit face box, because they are whole-body
holiday snapshots in which no automatic crop found a head. They now read as one set.

Only photographs a page actually uses are processed; the rest of the archive is listed in
`tools/build-images.mjs` and can be brought back by uncommenting a line.

### Sources

All 16 photographs and all 12 team portraits are served from this site. The portraits were
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


---

## 21 August 2026 — content rewrite and usefulness audit

The site looked complete and stopped one sentence before the useful part. This pass replaced
cautious, generic copy with researched answers, and moved every volatile figure into data that
carries the date it was checked.

### New: `src/data/barcelona-practical.js`

Fares, airport options, metro lines, neighbourhoods and free-afternoon suggestions, each with the
source it came from and one `checked` date for the file. Nothing here is written into a template.

### Barcelona — rewritten around decisions, not description

The page now answers what it used to gesture at. Before: Barcelona has an airport, there is a metro,
there are tickets, check the fares, check the venue, summers are hot, Catalan and Spanish are
official. After:

- **Where classes run.** Gràcia and Barceloneta, with the metro lines and walking times for each,
  and the office address separated from the course location — the office is always Carrer del Pare
  Lainez; which area a week runs in depends on the course, the week and availability, and is settled
  at sign-up.
- **Where to stay.** Four areas compared on how long each takes to reach *both* course areas, with a
  strategy for booking before your location is confirmed: stay on L4, which runs from the Sagrada
  Família area down to Barceloneta, so either area is a direct ride. That recommendation is
  geography, checked station by station on TMB's own pages.
- **From the airport.** Four options compared on time, fare and how they work. Two findings worth
  the research: metro L9 Sud does not reach the city centre — it ends at Zona Universitària — but it
  meets L5 at Collblanc, and L5 runs straight to Verdaguer and Sagrada Família; and the R2 Nord
  train reaches Passeig de Gràcia, which is on L2, L3 and L4.
- **Which ticket.** A five-day course is about ten journeys, which is exactly one €13 T-casual.
  Stated plainly, with the trap named in a callout: the single ticket and the T-casual are **not**
  valid at the Aeroport T1/T2 metro stations, and arriving with one means buying the €5.90 airport
  ticket at the barrier. ATM publishes that as an answer to its own FAQ.
- Lunch, language, free afternoons by how long they take, and access — each two or three sentences.

Deleted: the weather section, "Catalan and Spanish are both official", "check the current fares",
"something near the venue".

### Sources checked, 21 August 2026

| Fact | Source |
| --- | --- |
| Single €2.90 · T-casual €13.00 (10 journeys, 1 zone, 3 changes in 75 min) · T-usual €22.80 · Airport ticket €5.90 | tmb.cat fares page, and the ATM T-casual page |
| T-casual and single not valid at Aeroport T1/T2 on L9 Sud; the train and buses are unaffected | ATM, "Can I go to the Airport with a T-casual?" |
| Hola Barcelona Travel Card, 1–5 days, from €12.50, airport metro both ways | tmb.cat, holabarcelona.com |
| L9 Sud every 7 min; interchanges Torrassa (L1), Collblanc (L5), Zona Universitària (L3) | tmb.cat airport metro page |
| L5 station order incl. Collblanc → Diagonal → Verdaguer → Sagrada Família; L4 incl. Barceloneta → Passeig de Gràcia → Verdaguer; L2 and L3 at Passeig de Gràcia | TMB's own station pages, enumerated |
| Airport 16 km south, T1 and T2; Aerobús A1/A2 ~35 min, every 8–15 min; R2 Nord from T2, ~20 min to Sants, every ~30 min; bus 46 | Barcelona's tourism board, reviewed there June 2026 |
| Taxi: €2.80 start, €1.35/km day, €1.66/km night and weekends, €4.60 airport supplement | AMB metropolitan taxi fares |
| Barcelona fee €400 (20 h) / €450 (25 h); 20 or 25 hours, 50 over two weeks; introductory and advanced levels; English except Spanish programmes | spainbcn.com course pages, incl. their structured course data |
| Fee covers teaching, all course materials, two cultural activities; VAT-exempt as an educational service | spainbcn.com terms |
| Booking sequence, cancellation terms, free changes of name/week/course, no deposit | spainbcn.com terms |
| Document names and what each is for; OID E10336106; registered as SPAINBCN-PROGRAMS IN BARCELONA S.L. | spainbcn.com projects and terms |
| Any course can be requested for an unlisted Barcelona week | spainbcn.com Barcelona page |
| Office address, and that course locations vary by week and are confirmed at registration | spainbcn.com contact page, confirmed by the owner |

### Answers that replaced deferrals

Facts that were on SpainBcn's terms page and nowhere a participant would look are now on the pages
where the question arises: the four-step route from enquiry to confirmed place, who the invoice goes
to, that there is no deposit, that the fee is VAT-exempt, and the cancellation terms — full refund
beyond 14 days, half plus credit inside 14 days, exceptions for illness, family emergency, withdrawn
funding or a problem at the sending institution, and no charge for changing a name, a week or a
course.

Groups: what we can build, who it is for, the language, the length, what a group price covers and
what the school arranges — instead of three tiles ending in "contact us". The quote is explained
rather than withheld: it depends on participant numbers, length and content, so send those three.

Mobility: registration details a coordinator has to type into an application (OID, portal name,
legal name, NIF, address), when to make contact and why, and what changes after approval.

Dates: what "scheduled" means, stated once — in the calendar and open, not a confirmed place — and
what to do when a week is not listed.

Courses: fee stated as **Included in the course fee**, with travel and accommodation as their own
positive heading rather than "what the fee does not cover". Areas now say what they teach in plain
terms and which language they are taught in. Areas with no scheduled week say "No scheduled
Barcelona week in the current calendar" and point at contact.

### Copy removed

The interface descriptions ("Six ways into the catalogue"), the AI register in the area
descriptions ("tried on your own lessons", "with the city and its history as the material",
"staying well in the job"), the marketing question that opened the home CTA, the team block on the
home page that repeated About, and the group tiles that described a process instead of answering
anything. A scan of the built HTML for 55 banned constructions returns no genuine hits.

### Lengths

| Page | Before | After |
| --- | --- | --- |
| Home | 768 | 638 |
| Contact | 392 | 352 |
| About | 647 | 664 |
| Dates | 421 | 546 |
| Courses | 763 | 894 |
| Groups | 677 | 823 |
| Mobility | 591 | 854 |
| Your week | 609 | 835 |
| Barcelona | 591 | 1349 |

### Captions

Five before, three after: "María Ángeles and Miriam, 1997", "Plaça de la Seu", "Parc de la
Ciutadella". Each names something the photograph cannot tell you. Removed: "The classroom at Carrer
del Pare Lainez 19" and "Barceloneta", both of which described what was visible. Alt text is
unchanged.

### QA

`npm run check` passes on all 12 pages at eight widths. No page overflows horizontally at 390, 768
or 1280, and no comparison table needs sideways scrolling at any of them — below 720px the tables
restack into labelled rows. All 41 external links resolve. The privacy and network QA is 27 of 27,
unchanged by the rewrite.

### Needs owner confirmation

1. **Class start and finish times.** Neither site publishes them. The page says classes run Monday to
   Friday mornings at 20 or 25 hours and that the timetable is sent before the course. Real clock
   times would be more useful.
2. **Student group limits** — minimum and maximum group size, the age range accepted, and the
   shortest programme you will run. The page currently says a week is the usual shape and invites the
   three numbers; it does not state limits, because none are published.
3. **The Barceloneta course location.** Only the neighbourhood is named. If an address can be
   published, the page can give walking times as it does for Gràcia.
4. **Aerobús fare.** Three different figures appear across the operator's site, the city's ticket
   shop and its tourism pages, so no number is published — the row gives the times, frequency and
   stops and says the fare is set by the operator.
5. **Accessibility at each course area.** Currently answered as "tell us and we will confirm before
   you commit". If step-free access is known for either area, it can be stated.
6. **The Google reviews link** still points at a search, not a place listing.


---

## 21 August 2026 — positioning audit

A separate pass on one question: does a new visitor know what is being sold and whether it is for
them, within seconds?

**It did not.** The home page led with "Erasmus+ courses and programmes in Barcelona" over "Staff
training, student groups and tailored programmes" — which names no product, blends all three offers
into one sentence, says nothing about who may attend, and leaves "Erasmus" doing work it cannot do.
Someone searching "Erasmus Barcelona" for a student exchange had nothing to correct them. The most
prominent button on every page said "Plan a mobility" — the secondary offer — and went to /contact/.

### Verified before writing

Every clause of the new positioning is SpainBcn's own claim, not an inference:

| Claim | Source |
| --- | --- |
| "Erasmus+ staff mobility courses for teachers and staff of schools, VET centers, universities and other education organizations" | spainbcn.com home |
| "for schools, universities, VET and adult-education organizations across Europe" | spainbcn.com/about.html |
| "Erasmus+ KA1 eligible" | spainbcn.com/courses.html |
| Non-teaching staff: school leaders, school support and administrative staff, university teaching, research and administrative staff, education administrators, coordinators | the audience lists in SpainBcn's structured course data |
| Booking and invoicing privately rather than through an institution | spainbcn.com/terms.html |

### Changes

- **`offer` in `site-data.js`** — the product, the audience, the institution types, the staff scope
  and the funding position, written once and drawn on in short forms elsewhere.
- **Home** — H1 is now *Staff training courses in Barcelona*. The lede names Erasmus+ KA1 and the
  five institution types; the line under it says funding is common but not required; the CTAs are
  *See course dates* and *Choose a course*. The three offers are separated under "Three things we
  run": staff training first, then student groups, then institutional programmes.
- **Header CTA** — "Plan a mobility" → "Contact us", so the button's label matches where it goes and
  stops promoting the secondary offer above the principal one.
- **Navigation** — "Courses / Groups" → "Staff training / Student groups". Footer and breadcrumbs
  match.
- **Courses** — H1 is *Staff training courses in Barcelona*, with the KA1 context, the teaching and
  non-teaching scope, and the funding note on the first screen.
- **Dates** — *Staff training dates in Barcelona*, so the list cannot read as student-exchange dates.
- **Your week** — *A staff training week in Barcelona*.
- **Institutional programmes** — renamed from "Planning a mobility for your institution", and it now
  points staff sending individuals to the Courses page. Student groups points there too.
- **Titles and descriptions** rewritten on all nine public pages.

### Sweeps

"Erasmus+ week", "Erasmus programme" and "education programme(s)" no longer appear anywhere.
"Mobility" survives in three places only: "Erasmus+ staff mobility" in the About history,
"coordinators arranging an Erasmus+ mobility" where it is the reader's own word, and "Europass
Mobility support", a document name. KA1 appears once in the home body and twice each on Courses,
Dates and Your Week — each time naming the application a document is for, never as decoration.

### The six visitors

| Visitor | Answered on the first screen by |
| --- | --- |
| Teacher with Erasmus+ funding | "Erasmus+ KA1 courses for teachers and education staff" |
| University administrator | "…from schools, universities…"; the scope line names administrative and support staff |
| Non-teaching school employee | "teaching and non-teaching staff alike", on Home and Courses |
| Institution paying directly | "Erasmus+ funding is common, but it is not required to attend" |
| Parent or student searching "Erasmus Barcelona" | H1 "Staff training courses", audience "teachers and education staff" |
| Coordinator with 20 students | Nav "Student groups"; second of the three routes, "arranged with the school" |

### QA

12 pages healthy at eight widths, no horizontal overflow at 390 or 1280, 41 external links resolve,
privacy and network QA 27 of 27.

---

## 22 August 2026 — independent production audit and migration cleanup

The domain went live on the new hosting this morning (see HANDOFF.md). This audit crawled
production independently of the repository, on the assumption that the old and new sites might be
coexisting — the state an external audit had described. They are not: the cutover replaced the
old site wholesale. The deploy mirrors `dist/` into the web root and deletes what the build no
longer produces, so no legacy HTML, script or document survives on the domain. What remained were
gaps and defects at the edges, all fixed in this pass.

### What the crawl found

Every route was probed live over HTTPS and HTTP, on www and the apex.

- The 11 canonical pages and 404.html answer correctly; robots.txt and sitemap.xml are the
  build's own. `/contact/` is the rebuilt contact page — the legacy contact page, with its
  obsolete OID and Webnode stack, is gone.
- The 25 mapped legacy paths all answered 301 — **but in two hops through plain http://**.
  Varnish terminates TLS in front of Apache, so Apache expanded the relative `RedirectMatch`
  targets against `http://`, and every legacy redirect bounced https → http → https.
  `tools/build-htaccess.mjs` now writes absolute https targets as `RewriteRule`s: one hop from
  any scheme or host. Targets carrying a `#fragment` discard the query string (QSD), which
  Apache would otherwise append after the fragment.
- Fourteen legacy routes still in search indexes answered 404 with no redirect. Thirteen are now
  mapped in `src/data/redirects.js` — `/summer-dates/` → `/dates/`; `/sen/` →
  `/join-a-course/#inclusion`; `/clil/`, `/creative-english/`, `/c1-english/`,
  `/english-courses/`, `/language-methodology/` → `/join-a-course/#english`; `/a1-spanish/`
  through `/c1-spanish/` → `/join-a-course/#spanish`; `/erasmus-ka1-courses/` →
  `/join-a-course/`. Old course pages go to the matching subject area on this site, whose rows
  link on to the SpainBcn programme pages — not straight to the SpainBcn catalogue, so a visitor
  who searched for Barcelona stays in the Barcelona context. `/blank-page2/`, a Webnode artefact
  with no intent behind it, answers **410 Gone** (a new `GONE` list, honoured by server.mjs, the
  .htaccess and a deploy check).
- Host canonicalisation: `http://www` → `https://www` and `https://apex` → `https://www` in one
  hop each. `http://apex` takes two (an upstream forced-https answer precedes Apache); ordinary,
  and not reachable from `.htaccess`.
- An unknown URL answers a branded 404; `llms.txt` was 404 and is now generated (below).

Live pages carry no Webnode, cdnwnd, Google Tag Manager or analytics residue: the only
third-party request on page view is the Umami EU tracker, configured exactly as `/privacy/`
describes, and forms.app appears in the markup only as the consent-gated loader.

### Facts re-verified against the sources

Checked on 2026-08-22, spainbcn.com and the DATES-SPAINBCN sheet:

| Fact | Result |
| --- | --- |
| Barcelona fee €400 / 20 h, €450 / 25 h | Confirmed, including SpainBcn's structured offer data |
| OID **E10336106**, no E10139423 or "PIC 933769240" anywhere current | Confirmed — the old pair appears nowhere on either live site |
| Legal name, NIF B72643455, address 08025, phone 633 163 789, Hola@SpainBcn.com | Confirmed; Erasmus@SpainBcn.com and 93 376 92 40 appear nowhere current |
| The 12 course rows on `/dates/` | Match the sheet's 12 future Barcelona rows exactly |
| 4.9 from 134 Google reviews | Confirmed on SpainBcn's homepage today |
| Cancellation, VAT exemption, "confirmation is the contract", no deposit | All on spainbcn.com/terms.html in the same words |
| "Receiving partner in Spain", "job shadowing at Spanish schools and education organisations" | Verbatim SpainBcn claims |
| **Two-week model** | **Corrected — see below** |

**The one factual error found:** the site said "One- and two-week courses" and "A two-week course
is 50 hours" as if every course had a two-week form. Every SpainBcn subject area publishes
"Format: One week, Mon–Fri"; only AI & ICT adds "or two (50 over two weeks)", for the named
**AI & ICT Intensive**. The home and courses ledes now say one-week courses, and
`schedule.twoWeeks` reads "Courses run one week; the two-week AI & ICT Intensive runs 50 hours
across two adjacent weeks" — rendered on the courses, dates and your-week pages.

Two smaller one-source violations on `/dates/` were fixed: "Six course weeks" (hardcoded) now
renders from `weeks.length`, and "From the course calendar, 20 August 2026" now renders from
`datesSource.importedOn`.

### New guards

`scripts/guards.mjs` (`npm run guards`, and a deploy step before upload) fails the build if:
the old OID, the "PIC" number, €350/€700/€800, a 2025 date, Webnode/cdnwnd, a tag manager or
"Certificate of Participation" appears in the output; any page lacks (or contradicts) the current
OID; a redirect targets anything but a built page, or chains; any page links to a legacy path;
or the sitemap disagrees with the built, indexable pages. The post-deploy check now also tests
the 410 and two of the new redirects, live.

### AI search

`build.mjs` now writes `/llms.txt`: Erasmus in Barcelona is the Barcelona website of
SpainBcn-Programs (legal name and OID from `site-data.js`), not a separate organisation, with
one line per page and the three SpainBcn links. JSON-LD was audited as appropriate rather than
voluminous: EducationalOrganization (home and About), BreadcrumbList, no invented ratings, no
Course or Event instances this site should not be asserting. SpainBcn's own structured data
lists erasmusinbarcelona.com under `sameAs`, so the entity relationship is stated from both
sides.

### Legacy assets off this domain

The old site's syllabus PDFs, application DOCX files and images were served from Webnode's CDN
(`8493d733cb.clvaw-cdnwnd.com`), catalogued in notes/audit.md. No page on this domain links to
any of them, and this domain cannot redirect or remove them. Webnode is paid up to September
2026; cancelling it (already planned in HANDOFF.md) removes the account's CDN files. Until then
they may linger in search caches; if any indexed document with the old OID or fees needs faster
removal, that is a Search Console / Webnode-account action for the owner.

### Search-index state

Google still shows old titles and snippets (":: Erasmus in Barcelona - Schools and
Universities", the €350 student fee) for URLs that now 301 — stale representations of retired
pages, not live content. No page change can fix a stale snippet; the 301s, the sitemap and a
recrawl will. That is the owner's Search Console list below.

### Owner actions — nothing here can be done from this repository

1. **Search Console**: add the property (or re-verify), submit `sitemap.xml`, request indexing
   of the main pages, and watch the legacy URLs fall out as their 301/410s are recrawled.
2. **Registrant verification** (HANDOFF.md): confirm spainbcnmiriam@gmail.com acted on
   dinahosting's "pendiente de verificar" notice — an unverified contact suspends the domain.
3. **Cancel Webnode** after September 2026 — this also removes the legacy CDN documents.
4. **Delete `SITE_CHECK_URL`**, make the repository private, disable GitHub Pages (the
   prototype still serves at rahv-fb.github.io, noindexed and robots-disallowed, harmless but
   unnecessary).
5. **Mail alias**: if Erasmus@SpainBcn.com still receives mail, keep it forwarding internally;
   it appears on no current page and should stay that way.

### Needs a human — unchanged or newly flagged

The earlier lists stand (class times, group limits, Barceloneta address, Aerobús fare, venue
accessibility, the Google reviews link form). Newly flagged, all legally sensitive and none
changed by this pass:

1. **"Students are in our care during the programme hours and the agreed activities"**
   (/bring-a-group/). Neither SpainBcn page publishes a supervision or safeguarding policy.
   The sentence allocates responsibility; it should be reviewed against actual practice and,
   ideally, by someone qualified. LEGAL REVIEW REQUIRED.
2. **Group programme lengths** ("two-week and shorter programmes", /bring-a-group/): consistent
   with the custom-quoted group offer, but not published by SpainBcn; confirm with the team.
3. **Photographs of minors**: `/privacy/` says group programmes are arranged with the school,
   which is responsible for consent. Confirm that this matches how photo permissions are
   actually gathered for student groups.

### Verification of this pass

`npm run check` — all 12 pages healthy at eight widths (metadata, headings, alt text, dead
links, third-party requests, tap targets, overflow). `npm run links` — all 41 external links
and anchors resolve, every SpainBcn cross-link included. `npm run guards` — clean.
`server.mjs` answers the new 301s, the 410 and the 404 exactly as the generated `.htaccess`
does. The live re-crawl after the next deploy is the deploy workflow's own final step, extended
by this pass.

---

## 22 August 2026 — editorial and credibility audit

Audited at commit `30c7d61` (the head of PR #3), read as one document: every page in sequence,
then again in a different order, with the visible prose extracted and measured. This pass is about
what the automated gates cannot see: whether every sentence deserves to be there, and whether any
claim is stronger than what the organisation can stand behind. No humanizer pass was run and no
detection score was consulted.

### Overall: a strong human voice, with a little residue

The corpus is 5,410 visible words across eleven pages and the 404. The vocabulary scan against
thirty generic-AI words found one hit — "journey", on the Barcelona page, meaning a metro journey.
No sentence ends in a "-ing benefit" clause. Sentence openers are varied ("We" leads at 10% of
304 sentences). The best copy is exactly where it should be: the Barcelona and your-week pages
read like someone who has done the week many times. What residue existed was repetition, not
style — one sentence appeared on five pages — plus a handful of claims whose provenance had never
been established.

### What was measured

- **14 sentences appeared on more than one page.** Most are components rendered from one data
  source where both audiences genuinely need them (the cancellation terms on the courses,
  your-week and institutional pages; the document list for participants and coordinators). Those
  stay: real businesses repeat the facts people care about, and each is one source in
  `site-data.js`.
- **"We normally reply within two working days" appeared on five pages** — the most repeated
  sentence on the site, closing almost every page's CTA block. It now appears where someone is
  actually about to write: the contact page, the booking steps, and the group process. The three
  pure CTA repetitions (home, courses, institutional) are gone.
- **24 of 105 headings are functional/interrogative** ("What we can build", "If your week isn't
  listed") — varied enough, and each marks a real section. Left alone.
- **Em dashes: 14 across 5,400 words**, mostly on the Barcelona page doing real work. Left alone.
- **"In writing" appears seven times.** It stays: written confirmation is the organisation's own
  published policy (spainbcn.com/terms.html says "ask us to confirm in writing anything you need
  settled"), and each instance is the policy operating in context, not reassurance.
- **The "Send the subject, the level and the dates you have in mind" pattern** recurs across CTA
  blocks. It is SpainBcn's own house phrasing — their projects page says "Write with the group,
  the topic and the dates you have in mind" — so it reads as the organisation's voice, not a
  template's. Kept.

### Claims verified this pass, and their sources

| Claim | Verdict | Source |
| --- | --- | --- |
| "Most courses run at an introductory and an advanced level" | **True: 25 of 39** programmes carry "Introductory and Advanced" | SpainBcn structured course data, counted |
| The example week (old-town walking tour, Montjuïc and the Olympic Stadium) | Verbatim SpainBcn's own "typical week" | spainbcn.com/barcelona.html |
| "Someone from the team goes with the group" to both activities | SpainBcn: "we go with you to both" | spainbcn.com/barcelona.html |
| "Five minutes on foot from the Sagrada Família" | SpainBcn's own wording, verbatim | spainbcn.com/barcelona.html |
| "We can also run a course in a week that isn't listed" | SpainBcn: "You can also request any week in Barcelona" | spainbcn.com/barcelona.html |
| Cultural activities can change | SpainBcn terms: schedule and activities "can be modified or canceled; bad weather is the usual reason" | spainbcn.com/terms.html |

### Claims corrected, softened or completed

1. **"Any subject in the catalogue" (student groups) — narrowed.** SpainBcn's "run any catalog
   course privately" sentence is about staff training; nothing published extends it to student
   groups, and much of the catalogue is teacher-facing. The subjects row now leads with the
   verified usual choices (language, AI and ICT, culture and citizenship — the planner's own
   options) and invites other subjects as a question, not a promise.
2. **Document turnaround promises — removed.** "Within a few working days" (institutional) and "a
   couple of working days to prepare" (dates) had no source; the only established service level is
   the two-working-day reply. Both sentences now say why to ask early without promising a
   turnaround.
3. **The language rule — completed.** "English, except the Spanish programmes" was silent about
   the one exception SpainBcn publishes: the Language + ICT week also runs in Spanish. The courses
   fact row and the Barcelona language note now carry it.
4. **Home and courses titles no longer near-identical.** They differed only by "KA1"; the home
   title is now "Erasmus+ Staff Training in Barcelona", and the courses description now leads with
   the six subject areas instead of repeating the home description's opening.
5. **The organisation's OID added to the JSON-LD** as an `identifier` property — the same shape
   SpainBcn's own structured data uses, and the value is visible in every page footer. The two
   sites now assert the same entity the same way from both sides.

### Deliberately unchanged

The cancellation terms in three places, the document list in two, "in writing" wherever it
appears, the "What…"/"If…" headings, the em dashes, "secondary, high-school and VET" (the wording
enquiries actually use can revisit it), "Course materials are handed out on the first day" and
the laptop advice (both plausible trainer practice, neither published — on the confirmation list
below), and — untouched as flagged before — "Students are in our care during the programme hours
and the agreed activities", which is a responsibility allocation, not prose, and needs the
operational and legal answer first. Note that it must also cohere with "accompanying teachers…
stay with the group through the week": the two sentences describe one supervision model and
should be reviewed together.

### Questions only the team can answer

1. Student groups: the actual supervision model (programme hours, activities, travel between
   them, lunch, emergencies) — and whether "in our care" is the wording a lawyer would keep.
2. Student groups: real duration limits (is "two-week and shorter programmes" sold in practice?
   what is the shortest?), and the actual subject scope.
3. Job shadowing: current host relationships, lead time, whether placement can be promised, and
   whether "receiving partner" is the right term for every format described (course provider /
   host organisation / receiving organisation differ across mobility types).
4. Documents: what turnaround can honestly be promised, and what "Europass Mobility support"
   consists of (completing receiving-organisation fields? signing? assisting?).
5. Cancellation: are the illness/family/funding exceptions binding policy or goodwill? Does the
   cross-destination credit adjust for price differences, and does it expire?
6. No deposit: universal, including large private group projects?
7. "That confirmation is the contract" and the VAT exemption: confirm with the lawyer and the
   accountant respectively; internal consistency with SpainBcn's terms page is not legal review.
8. Materials on the first day; laptop required or recommended for AI/ICT, and whether a tablet
   does.
9. Class clock times (still unpublished anywhere), the Barceloneta venue address, and the
   accessibility-check workflow behind "tell us what you need when you enquire".

### Copy that should not be touched

"There's no canteen, so lunch is on your own." · "The other three are yours." · "Wherever your
course runs, the office stays here." · "We send the address of your course location when you sign
up." · the airport-ticket trap callout · the accommodation advice ("wait until your course
location is confirmed before booking accommodation you cannot cancel… staying near L4") ·
"It doesn't mean a place is being held for you" · the metered taxi row ("every licensed taxi
charges the same") · "Bring a laptop for the AI and ICT courses — you'll be trying the tools on
your own material." (wording; practice on the list above) · "María Ángeles and Miriam started
SpainBcn in 1997, originally with Spanish-language programmes for international students." ·
"The office address does not change. Course locations do." · "This route doesn't stop here." ·
the privacy page's "It holds no identifier and never leaves your browser."

### Metrics after this pass

11 canonical pages + 404 · 5,410 visible words · 14 sentences on more than one page (all
single-source components kept deliberately; the five-page repetition is gone) · 7 pages edited,
5 untouched · 3 claims softened or corrected, 6 verified with sources, 9 question areas handed to
the team. `npm run check`, `npm run links` equivalent state and `npm run guards` all pass after
the changes.

### Stale search index, again

Google's snippets still show Webnode-era text ("Empowering you for Global Impact", €350 fees,
":: Erasmus in Barcelona - Schools and Universities" titles). Every such URL was re-requested
live during this audit: all 301 or 410. None of it is live content, and nothing on the current
pages should be rewritten because of it. The fix remains the Search Console recrawl already on
the owner list.
