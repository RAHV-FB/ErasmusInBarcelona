# ErasmusInBarcelona.com

The Barcelona site of SpainBcn-Programs: Erasmus+ courses for education staff, programmes for
student groups, and institutional mobility. Plain static HTML, built from one data file.

## Run it

```bash
npm install          # Playwright and sharp, both dev-only
npm start            # build, then serve on http://127.0.0.1:4173
npm run build        # build dist/ only
npm run check        # build, serve, and audit every page in a browser
npm run links        # check every off-site link and anchor (hits real servers)
npm run images       # regenerate the images in src/assets/images
```

Node 18+. The published site is `dist/` — static files, no server-side anything.

## How it fits together

```
src/data/site-data.js     every fact the site states, in one place
src/pages/*.js            one module per page, returning its HTML
src/layout.js             <head>, header, footer, image helpers, structured data
src/assets/css/site.css   the whole stylesheet
src/assets/js/site.js     menu, date filter, group planner, form loading
src/assets/images/        production images (WebP, generated)
build.mjs                 renders src/pages → dist/
server.mjs                static server: clean URLs, legacy redirects, real 404
tools/build-images.mjs    originals → resized WebP with descriptive names
scripts/health-check.mjs  the browser audit behind `npm run check`
uploads/, source-photos/  the untouched original photographs; never published
notes/                    the live-site audit and the production report
```

Every number, price, date, address, programme name and person on the site comes from
`src/data/site-data.js`. Nothing factual belongs in a page template. Change the data, run
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

Weeks are exported by hand from the sheet, as the owner asked — no live connection. Update the
`dates` array in `src/data/site-data.js`, set `datesSource.importedOn`, and rebuild. The home
page, the courses page and the dates page all read from it.

## Third parties

The site loads nothing from anyone else on page view: no fonts, no analytics, no tag manager, no
CDN, no cookies, no local storage. The one exception is the sign-up form on `/contact/`, which is
hosted by forms.app and is requested only when a visitor presses the button asking for it. That is
what `/privacy/` and `/cookies/` describe; if a third party is ever added, both pages have to
change with it.

## Before publishing

- Confirm the hosting company named in `/privacy/` under "When you open a page".
- Point `SITE_URL` in `src/layout.js` at the live domain if it is not
  `https://www.erasmusinbarcelona.com`.
- Reproduce the redirect table in `server.mjs` in the production server configuration.
- Serve `404.html` with a 404 status.
