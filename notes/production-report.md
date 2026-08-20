# Production report — ErasmusInBarcelona.com redesign
2026-08-20 · built in this workspace as Design Component pages (one per route)

## What changed
- New intent-led IA: / · join-a-course · bring-a-group · plan-a-mobility · dates · your-week · barcelona · about · contact · privacy · cookies · 404. No course-code navigation; SpainBcn.com remains the catalogue and is linked explicitly.
- New "Barcelona Workshop" visual system (v2, after client reset): single grotesk sans, #FAFAF7 ground, cobalt/powder/mint colour blocks, coral/sun accents, square 0–2px geometry, poster hero with real-photo collage, indexed situation rows, programme-board dates, real week timetable, tangible group planner. Visually unrelated to SpainBcn; ownership stated in header ("BY SPAINBCN-PROGRAMS ↗"), About, final CTA and footer.
- Copy rewritten: short, concrete, no marketing slop, no repeated OID/price/contact (OID appears once per page at most; contact in footer + contact page).

## Pages built (12)
index, join-a-course, bring-a-group, plan-a-mobility, dates, your-week, barcelona, about, contact, privacy (legal text preserved verbatim, restyled), cookies (with working consent controls), 404. Shared SiteHeader (sticky, mobile drawer, Escape/scroll-lock) + SiteFooter (compact cookie banner: equal-weight Necessary only / Accept all, choice stored locally, no trackers shipped).

## Images
Reused (owner uploads, uploads/ → rename per site-data.js `file` keys in production): certificates group (home hero, groups), English course group (courses), ICT office/table groups (home, courses, mobility, your-week), Spanish classroom (home), Park Güell + Ciutadella + viewpoint student groups (groups, home, your-week), Barceloneta seafront (barcelona, home), founders 1997 (about). Team portraits: 12 real people, still hotlinked from the current site CDN — download in production.
Not used: AI-generated Dec-2025 image (excluded per brief), category graphics (not photography), soft/upscaled ai-classroom shot (quality).
Still missing (honest placeholder slots): Gràcia street near course rooms; metro shot no longer required by any layout.

## Data
Single source: assets/js/site-data.js — organisation, contact, venues, schedule/fees, 6 course areas, 16 featured programmes, team, images, reviews (4.9/136, verified from Google Business panel).
Dates: imported 2026-08-20 from the owner's DATES-SPAINBCN Google Sheet (gid 480287972), Barcelona upcoming rows only (12 weeks, Sep 2026–Nov 2026). Sheet stays authoritative; re-export manually into site-data.js on each update (owner requested no live connection). Non-Barcelona rows intentionally excluded (SpainBcn territory).
⚠ Unresolved discrepancies to confirm with SpainBcn: contact page OID E10139423 + PIC 933769240 vs. site-wide OID E10336106 (used the latter); postcode 08025 (public pages) vs 08024 Local 2 (legal notice — kept verbatim in privacy).

## Legacy → redirects (for production server config)
/school-teachers/, /universities/, /english-courses-for-teachers/, /ai-ict/, /ict-integration/, /e-learning-ict/, /ict/, /course-catalogue/ → /join-a-course/
/school-students/, /english-courses-students/, /spanish-courses-for-students/, /ict-courses-for-students/, /other-courses-for-students/ → /bring-a-group/
/currently-open-dates/, /season-courses/ → /dates/
/create-your-own-course/ → /plan-a-mobility/
/about-us/, /our-team/, /10-reasons/, /2025-at-a-glance/ → /about/
/contact/ → /contact/ · /privacy-policy/ → /privacy/ · /home/ → /
Delete (content absorbed or obsolete): flat course-code catalogue page, repeated OID/fee blocks, "For more information contact us!" billboard, GTM + double Google Maps iframes (not carried over — re-add analytics only as a deliberate, consented decision).

## Responsive
System-level: clamp() type/spacing, wrap-based grids, JS breakpoints only for header nav (920px) and week timetable (768px); no fixed widths, 44–52px touch targets, 16px form inputs (no iOS zoom). Verifier-checked at desktop + no-overflow probing; spot-check 320/375/390/430/768/1024/1280/1440 before launch is still recommended.

## Technical
- Pages are .dc.html Design Components (this workspace's format; content/structure ports 1:1 to static HTML). Form backend: none invented — contact form composes a prefilled email in the visitor's own mail app (marked TODO for a real endpoint).
- Consent: eib-consent-v1 in localStorage; no optional cookies/trackers actually ship.
- Repo RAHV-FB/ErasmusInBarcelona associated (github.md); browsing tools were unavailable this session, so no repo files were imported or modified — SpainBcn untouched.

## Files
Pages: index, join-a-course, bring-a-group, plan-a-mobility, dates, your-week, barcelona, about, contact, privacy, cookies, 404 (.dc.html) · Shared: SiteHeader.dc.html, SiteFooter.dc.html · Data: assets/js/site-data.js · Docs: notes/audit.md, notes/production-report.md, github.md, CLAUDE.md

---

## Site health check — 2026-08-20 (repo import)

Every page rendered in Chromium at 1440 / 768 / 390 / 320 px, with console errors,
failed requests, broken images, unrendered bindings and link targets recorded. Result
after the fixes below: **all 12 routes healthy**, one standing warning (team portraits
hotlinked from a third-party CDN).

### Fixed
- **The site could not render at all without internet access.** `support.js` fetched
  React and ReactDOM from unpkg.com at boot; when that host is unreachable (offline,
  blocked network, unpkg outage) every page stayed blank. React 18.3.1 UMD is now
  vendored in `assets/vendor/` and loaded before `support.js`, which skips the CDN when
  `window.React` already exists.
- **No page had a `<title>`, a `lang` attribute or a meta description in its markup.**
  Titles were only set in `componentDidMount`, i.e. after JS booted — a blank browser
  tab until mount, and nothing for crawlers or no-JS clients. Static `<title>` (matching
  each page's own runtime title verbatim), `<meta name="description">` drawn from the
  page's own lede, and `lang="en"` added to all twelve pages.
- **Home page overflowed horizontally on phones** (632 px of content in a 390 px
  viewport). The hero photo grid used `grid-template-columns: 1.3fr 1fr`; the tall
  figure's `aspect-ratio` plus a definite height gave the column a 544 px min-content
  contribution. Columns are now `minmax(0, …fr)`, and the aspect-ratio wrapper carries an
  explicit `width: 100%`.
- **Team strip on the home page overflowed to 640 px whenever the portrait CDN was
  unreachable** — broken images fall back to their `width="200"` attribute, blowing out
  `repeat(3, 1fr)`. All fixed-count grids (`repeat(N, 1fr)` on home, join-a-course,
  your-week) are now `repeat(N, minmax(0, 1fr))`.

### Verified working
Cookie banner (appears once, stores the choice in `eib-consent-v1`, stays gone on
reload) · mobile nav drawer (opens, locks scroll, closes on Escape) · dates filtering ·
home group planner selection state · contact `mailto:` composition · all internal links
resolve to files that exist · 404 route answers with a 404 status.

### Still open (not code defects)
Portraits hotlinked from the current site CDN · ~15 MB of unoptimised uploads, two PNGs
near 4 MB · contact form has no backend endpoint · the `{{ binding }}` image URLs in the
raw template fire a few 404s per page before the component mounts, which is inherent to
the Design Component runtime.

### Running it
`npm start` serves the site on the routes it will publish under, including the legacy
redirect table from this report. `npm run check` re-runs the audit above. See README.md.
