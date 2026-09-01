# ErasmusInBarcelona.com

The Barcelona site of SpainBcn-Programs: Erasmus+ courses for education staff, programmes for
student groups, and institutional mobility. Plain static HTML, built from one data file.

## Run it

| Command | What it does |
|---|---|
| `npm install` | Playwright and sharp, both dev-only |
| `npx playwright install chromium` | the browser `npm run check` drives — a separate download, once per machine |
| `npm start` | build, then serve on <http://127.0.0.1:4173> |
| `npm run build` | build `dist/` only |
| `npm run build:live` | build `dist/` with the production `.htaccess` |
| `npm run guards` | build, then verify the publish invariants — no browser, a second or two |
| `npm run check` | build, serve, and audit every page in a browser |
| `npm run links` | check every off-site link and anchor (hits real servers) |
| `npm run images` | regenerate the images in `src/assets/images` |
| `npm run dates` | refresh the Barcelona course weeks from the sheet (`-- --dry-run` to preview) |
| `npm run serve` | serve the existing `dist/` without rebuilding |

Changing something? [CONTRIBUTING.md](CONTRIBUTING.md) has the recipe for each of the usual
jobs, what will stop you and why, how it gets published and how to undo it.

### The GitHub Pages prototype

The Pages deploy workflow was removed when the domain went live on 22 August 2026. The prototype
at <https://rahv-fb.github.io/ErasmusInBarcelona/> still serves — noindexed and robots-disallowed —
until the owner disables Pages (owner action 4 in notes/production-report.md). It is not the live
site and no longer updates.

`npm run build:pages` remains for building and checking a prototype locally, the way Pages
served it:

```bash
npm run build:pages
BASE_PATH=/ErasmusInBarcelona npm run check
```

## How it fits together

```
src/data/                 every fact the site states: site-data.js (shared facts),
                          course-groups.js (the nine Barcelona course groups),
                          barcelona-practical.js (fares, airport, metro),
                          redirects.js, analytics.js
src/pages/*.js            one module per page, returning its HTML
src/layout.js             <head>, header, footer, image helpers, structured data
src/assets/css/site.css   the whole stylesheet
src/assets/js/site.js     menu, date filter, group planner, form loading
src/assets/images/        production images (WebP, generated)
build.mjs                 renders src/pages → dist/
server.mjs                static server: clean URLs, legacy redirects, real 404
tools/build-images.mjs    originals → resized WebP with descriptive names
tools/refresh-dates.mjs   the DATES-SPAINBCN sheet → `dates` in site-data.js
scripts/health-check.mjs  the browser audit behind `npm run check`
scripts/guards.mjs        the publish guards, shared by CI and both deploy paths
uploads/, Images-Erasmus/, source-photos/
                          the untouched original photographs; never published
notes/                    the live-site audit and the production report
```

Every number, price, date, address, programme name and person on the site comes from
`src/data/`. Nothing factual belongs in a page template. Change the data, run
`npm run build`, and every page that mentions it follows.

Pages are ordinary HTML when they arrive: titles, descriptions, canonicals, Open Graph tags and
JSON-LD are all in the markup, not assigned by script. JavaScript handles the menu, the date
filter, the group planner and loading the sign-up form — nothing else. Layout is CSS only; no
JavaScript decides what the page looks like at any width.

## Facts and where they come from

In this order of authority:

1. the organisation's own DATES-SPAINBCN sheet, for the course weeks;
2. [www.spainbcn.com](https://www.spainbcn.com/), for prices, programme names, certificates and formats;
3. the organisation's published contact and legal details.

The previous erasmusinbarcelona.com is history, not a source. If those sources disagree with
what is on the page, the page is wrong.

Re-check before each publish: the Barcelona fee (currently €400 for 20 h a week, €450 for 25),
the scheduled weeks, and the programme names and their links on SpainBcn.

## Adding or changing a course week

`npm run dates` reads the sheet's public CSV export and rewrites the `dates` array and
`datesSource.importedOn` in `src/data/site-data.js` (`npm run dates -- --dry-run` to preview);
review with `git diff`, rebuild, publish. Hand-editing the array remains the fallback. The home
page (through the derived `weeks`), `/dates/`, `/join-a-course/`, `/universities/` and each
course-group page read from it, and the pages render only the weeks that have not yet ended at
build time.

## Third parties

Two, and no more.

**Umami Cloud** runs on every page, on Umami's EU region. It is configured in
`src/data/analytics.js`: cookie-free, query strings and fragments excluded, do-not-track respected,
reporting only from the production domains. The website id is this site's own, not spainbcn.com's,
and it is public — it appears in the markup of every page. `data-host-url` is not optional: without
it the tracker falls back to its US-facing collector whichever host the script came from. Set
`UMAMI_WEBSITE_ID` to report a test build somewhere else.

**forms.app** provides the sign-up form: embedded on `/contact/`, and opened by the "Sign Up!"
side tab on every other page. It is requested only after the visitor allows it — until then the
tab is a local stand-in (same place, same colour, no request) that opens a panel offering the
choice and the email address. Their choice is stored as `eib-privacy-v1` in local storage and read
before first paint. "Privacy choices" in the footer changes it; withdrawing unmounts both embeds.

`/privacy/` and `/cookies/` describe exactly this. If either service changes, those pages change in
the same commit — and the network behaviour gets re-checked, not assumed.

## Publishing

The live site is <https://www.erasmusinbarcelona.com>, hosted by Dinahosting and served by Apache.

`.github/workflows/deploy-dinahosting.yml` builds the site on every push to `main`, generates
`dist/.htaccess`, and mirrors `dist/` into the web root over FTPS with `lftp`. The mirror deletes
whatever is no longer in `dist/`, so the live site is exactly what this repository builds —
except `cgi-bin/` and `.well-known/`, which belong to the server and are excluded. Credentials are
repository secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`); the web root is the repository
variable `DEPLOY_DIR`, defaulting to `/www/`. The workflow refuses to publish a prototype build or
to mirror anywhere but the web root; after uploading it lists the server and fails if any file in
`dist/` is missing, then checks five pages, the 404 status, the 410 and five legacy redirects
over HTTP.

Uploads run one file at a time. In parallel the host starts refusing data connections part-way
through and individual files die while their neighbours succeed.

`FTP_SERVER` must be the hosting's `<account>.espacioseguro.com` name, which the panel shows under
FTP once FTP SSL is on — not `ftp.<domain>` and not the `hl####.dinaserver.com` server name. That
is the name on the certificate the server presents on port 21, and dialling any other one fails the
hostname check by hanging for thirty seconds rather than saying anything. The upload refuses to
start against a host it knows cannot match.

`tools/build-htaccess.mjs` writes the Apache configuration from `src/data/redirects.js` and
`SITE_URL` — the same two sources `server.mjs` uses — so local and production behaviour cannot
drift. Nothing is edited on the server: a change there is overwritten by the next deploy.

[PUBLISHING.md](PUBLISHING.md) is the terminal-only runbook — the edit-to-live loop, the deploy
script's flags and environment, and the dinahosting API for the DNS and certificate work that
would otherwise mean a control panel. [HANDOFF.md](HANDOFF.md) records the state of the domain
migration and the traps this hosting has.

Before publishing a change that touches any of this:

- Confirm the hosting company named in `/privacy/` under "When you open a page".
- Point `SITE_URL` in `src/layout.js` at the live domain if it is not
  `https://www.erasmusinbarcelona.com`; `tools/build-htaccess.mjs` follows it.
- Add a legacy path to `src/data/redirects.js`, never to the server.
