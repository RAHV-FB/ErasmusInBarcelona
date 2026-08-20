# ErasmusInBarcelona.com

The Barcelona-focused site of SpainBcn-Programs, rebuilt as the "Barcelona Workshop"
redesign. Twelve pages plus a shared header and footer, all reading their facts from
one data file.

## Run it

```bash
npm start            # http://127.0.0.1:4173
```

`server.mjs` has no dependencies — Node 18+ is all you need. It serves the pages under
the routes the site will publish under, redirects the legacy paths from the current live
site, and answers unknown paths with the 404 page and a real 404 status.

| Route | Page |
| --- | --- |
| `/` | `index.dc.html` |
| `/join-a-course` | `join-a-course.dc.html` |
| `/bring-a-group` | `bring-a-group.dc.html` |
| `/plan-a-mobility` | `plan-a-mobility.dc.html` |
| `/dates` | `dates.dc.html` |
| `/your-week` | `your-week.dc.html` |
| `/barcelona` | `barcelona.dc.html` |
| `/about` | `about.dc.html` |
| `/contact` | `contact.dc.html` |
| `/privacy` · `/cookies` | `privacy.dc.html` · `cookies.dc.html` |

Routes are served without a trailing slash on purpose: pages link each other as
`./page.dc.html` and load data as `./assets/js/site-data.js`, so the document base has
to stay at the site root.

## Check it

```bash
npm install          # Playwright, dev-only
npm run check        # add -- --shots for full-page PNGs in .health-shots/
```

`scripts/health-check.mjs` opens every route in Chromium and fails on anything that
would be a defect in production: a page that never mounts, console errors, failed
requests, unrendered `{{ bindings }}`, local images that don't load, links to files that
don't exist, a missing `<title>`/`lang`/`<h1>`, horizontal overflow at 1440 / 768 / 390 /
320 px, or a 404 route answering with the wrong status. Third-party assets are reported
as warnings, not failures — they can be blocked by the network the check runs on.

## How a page works

Pages are Design Components (`.dc.html`): a `<x-dc>` template with `{{ bindings }}`, and a
`class Component extends DCLogic` that supplies the values. `support.js` mounts them in
the browser. React is vendored in `assets/vendor/` and loaded before `support.js`, so no
page depends on a CDN being reachable.

Every fact — contact details, OID, dates, programmes, team, photography — comes from
`assets/js/site-data.js`. Do not hard-code any of it in page markup; edit the data file
and every page follows.

## Layout

```
*.dc.html                 pages, one per route
SiteHeader/SiteFooter     shared components imported by every page
assets/js/site-data.js    single source of shared facts
assets/vendor/            React UMD builds (no CDN at runtime)
support.js                Design Component runtime
uploads/                  the organisation's own photographs
notes/                    live-site audit and production report
server.mjs                local/static server
scripts/health-check.mjs  browser health check
```

## Before launch

- **Team portraits are hotlinked** from the organisation's current CDN
  (`assets/js/site-data.js` → `portraits`). Download them into `assets/images/` — if the
  CDN goes away the About page loses all twelve faces.
- **Photograph weights**: `uploads/` is ~15 MB, with two PNGs near 4 MB. Resize and
  convert to JPEG/WebP under the descriptive `file` names already listed in
  `site-data.js` before publishing.
- **Contact form** composes a prefilled email in the visitor's mail app; there is no
  backend endpoint yet.
- **Redirect table** in `server.mjs` mirrors `notes/production-report.md` — reproduce it
  in the production server config.
- **OID discrepancy** (`E10336106` site-wide vs `E10139423` on the current contact page)
  is still open — see `notes/audit.md`.
