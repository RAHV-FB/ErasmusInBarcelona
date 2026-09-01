# Making a change

For whoever picks this up next. [HANDOFF.md](HANDOFF.md) says what the site *is* — it has been
live at <https://www.erasmusinbarcelona.com> since 22 August 2026 — [PUBLISHING.md](PUBLISHING.md)
how to work on it from a terminal, and [README.md](README.md) how it is built from source. This
one is about the day you have to change something.

It is a live business site now. A bad deploy is not a broken preview.

---

## The rule everything else follows

**Every fact the site states lives in `src/data/` and is rendered from there.** A price, a date,
an address, a fare, a person, a programme name, the OID. Never typed into a page.

This is not tidiness. A figure copied into a template does not look wrong — it looks right,
until the data changes and the copy does not, and then one page contradicts another and nobody
notices for a year. Both of those had already happened when this file was written: the airport
fare was in four places, and the founding year in four.

`node scripts/guards.mjs` now fails on it, using the values from the data itself, so the check
cannot fall behind what it is checking.

---

## Where things are

```text
~/ErasmusInBarcelona
├── build.mjs                    every route, and the build that writes dist/
├── server.mjs                   the local server: same redirect table, in JavaScript
├── src/
│   ├── data/                    every fact the site states
│   │   ├── site-data.js           prices, dates, people, the OID, the addresses
│   │   ├── course-groups.js       the nine Barcelona course groups and their courses
│   │   ├── barcelona-practical.js transport, fares, airport, neighbourhoods
│   │   ├── redirects.js           the legacy URL table, and the 410 list
│   │   └── analytics.js           Umami, once, including the EU host
│   ├── pages/                   one module per page, rendered from src/data/
│   ├── layout.js                SITE_URL, head, nav, footer, breadcrumbs, JSON-LD
│   └── assets/
│       ├── css/site.css           the whole stylesheet
│       ├── js/site.js             menu, date filter, group planner, sign-up form
│       └── images/                the WebP files the site serves
├── tools/
│   ├── build-htaccess.mjs       redirects.js → the production .htaccess
│   ├── build-images.mjs         uploads/, Images-Erasmus/ and source-photos/ → src/assets/images
│   └── refresh-dates.mjs        the DATES-SPAINBCN sheet → dates in site-data.js
├── scripts/
│   ├── guards.mjs               the publish guards, run by CI and both deploys
│   ├── health-check.mjs         the browser audit, npm run check
│   └── link-check.mjs           off-site links, npm run links
├── uploads/  Images-Erasmus/  source-photos/
│                                photograph originals; never published
├── notes/production-report.md   what was decided, and what is still unresolved
├── upload-to-dinahosting.sh     build, upload, verify — curl only
├── cutover.sh                   the domain move, kept for the other eight domains
├── .github/workflows/           check.yml on every change, deploy-dinahosting.yml on main
└── dist/                        generated on every build. Never edit it, never commit it
```

---

## Before you commit

```bash
npm run build:live
npm run guards
npm run check
```

`build:live` writes `dist/` plus the production `.htaccess`. `guards` is the cheap pass — no
browser, a second or two. `check` opens every page in a real browser at eight widths, and
catches console errors, failed requests, dead internal links, missing or duplicate metadata,
heading levels skipped, images without alt text or dimensions, third-party requests on load, tap
targets under 44px and horizontal overflow. `guards` catches the things a browser cannot see —
see the table below.

Run `npm run links` too if you touched a link to SpainBcn or anywhere else off-site. It is not
in CI because it fetches somebody else's server for every link, which is not a thing to do on
every push.

**First time on a machine:** `npm install`, then `npx playwright install chromium`. The second
one is not optional and not implied by the first — `npm install` fetches the Playwright library,
the browser it drives is a separate download, and without it `npm run check` stops before it
starts.

The commands above carry no trailing `#` comments on purpose. macOS ships zsh, and an
interactive zsh does not treat `#` as a comment, so pasting an annotated block hands the
annotation to the command as arguments — which is how `bash upload-to-dinahosting.sh
--verify-only  # check the live site` becomes `unknown option: #`.

One trap: `npm run check` rebuilds `dist/` with `node build.mjs`, which does **not** write
`.htaccess`. If you are about to upload by hand, run `npm run build:live` again afterwards.

---

## What will stop you, and what it means

| Guard | What it caught | What to do |
|---|---|---|
| `robots.txt disallows everything` | a `PROTOTYPE=1` build | build with `npm run build:live`, not `build:pages` |
| `noindex on pages meant to be indexed` | the same | as above; only `404.html` may carry it |
| `built but not in sitemap.xml` | a new page that nothing links to for crawlers | add the route to `PAGES` in `build.mjs` — the sitemap follows it |
| `in sitemap.xml but not built` | a page removed but still advertised | rebuild; if it is really gone, remove its route |
| `redirect disagrees` / `redirect missing from .htaccess` | `dist/.htaccess` out of step with `redirects.js` | `node tools/build-htaccess.mjs`. Never edit `.htaccess` |
| `redirect chain` | a legacy URL pointing at another legacy URL | point it at the real page. One hop only |
| `course week(s) already over` | a stale export from the dates sheet | re-export. `ALLOW_STALE_DATES=1` publishes anyway |
| `has "…" typed in` | a fact copied into a template | render it from `src/data/` |
| `forces HTTPS on %{HTTPS} alone` | the scheme rule lost its `X-Forwarded-Proto` condition | put it back. This one takes the site **down**, not just wrong — see below |
| `preview host is exempted in N RewriteCond line(s)` | the `*.dinaserver.com` exemption dropped from a rule | both rules need it, or a preview check bounces to the live domain |
| `it must be absolute and start https://…` | a redirect target went relative again | Apache expands it against `http://` behind Varnish, so every legacy URL takes two hops |
| `targets a #fragment without the NE flag` | a rule lost `NE` or `QSD` | without `NE` Apache escapes `#` to `%23`; without `QSD` it appends the query after the fragment |
| `contains forbidden "…"` | a value from the previous site came back | the old OID, the old fees, a Webnode or tag-manager reference. Check the source, not the symptom |
| `internal link to legacy path` | a page links through a redirect | link straight to the destination |
| `is marked gone but a page is built there` | `GONE` and the build disagree | a path is either gone (410) or a page, never both |

The guards run in CI on every pull request and on every push to a branch that deploys, and
again inside both deploy paths. They are the same file in all three places.

---

## The jobs you are most likely to have

**A price changes.** `pricing` in `src/data/site-data.js`. Every page that mentions it follows.
Check it against www.spainbcn.com first — SpainBcn's prices are the source, not this site's.

**The course weeks need refreshing.** `npm run dates` reads the DATES-SPAINBCN sheet linked in
`datesSource` and rewrites `dates` in `src/data/site-data.js` — Barcelona rows only; preview with
`npm run dates -- --dry-run`, review with `git diff`. Hand-editing the array is the fallback. One
row per course, so several rows share a calendar week; anything that counts weeks goes through
`weeks`, never `dates`, or the site says twelve weeks when there are six.

The pages render only weeks that have not ended at build time, and the guard fails a publish once
a listed week has ended, so the snapshot cannot silently mislead — but only a refresh brings the
next weeks in. **The current export runs out on 13 November 2026**, so this is the recurring
content job.

**A new page.** Add the module to `src/pages/`, then its route to `PAGES` in `build.mjs`. The
sitemap, the canonical, the breadcrumb and the nav all read from there. The guards will tell you
if you missed the sitemap.

**A legacy URL needs redirecting.** `src/data/redirects.js`, and nothing else. `server.mjs` and
the production `.htaccess` are both generated from it, so they cannot disagree. Point it at the
page that actually answers, not at another redirect.

**A photograph.** Original into `uploads/` or `source-photos/`, then `npm run images`, then
reference the generated name in `site-data.js`. Originals are never published. Nothing is ever
hotlinked.

**Analytics or the sign-up form.** `src/data/analytics.js` is the only place analytics is
configured, and `data-host-url` is the attribute that keeps the data in the EU — drop it and the
tracker reports to the US instead. If anything about either third party changes, `/privacy/` and
`/cookies/` change **in the same commit**, and you re-check the network behaviour rather than
assuming it.

---

## How it gets published

The push is the deploy, and `main` is the only branch that publishes. A push anywhere else runs
the checks and uploads nothing.

`.github/workflows/deploy-dinahosting.yml` builds, runs the guards, mirrors `dist/` into the web
root over FTPS, verifies every file landed, then checks the live site over HTTP. It took about
nine minutes end to end on its last run.

To publish by hand instead — the same guards, a deeper verification, and it asks for the
password rather than reading a secret:

| Command | What it does |
|---|---|
| `bash upload-to-dinahosting.sh` | build, upload, verify |
| `bash upload-to-dinahosting.sh --dry-run` | say what would change, send nothing |
| `bash upload-to-dinahosting.sh --verify-only` | check the live site, upload nothing |

`main` is the repository's default and only long-lived branch (since 31 August 2026).

## How to undo one

There is no snapshot. The deploy mirrors `dist/` into the web root and deletes whatever is not
in it, so the live site is always exactly what the repository last built — which means a bad
change is undone by making the repository right and deploying again, not by restoring anything.

**A bad `.htaccess` can make the site unreachable rather than merely wrong**, and that is the
case where this matters. Varnish terminates TLS in front of Apache, so `%{HTTPS}` is always
`off` inside `.htaccess`; a scheme rule that tests it alone redirects HTTPS to HTTPS for ever.
It happened minutes after the domain went live. `npm run check` cannot reproduce it — it serves
`dist/` with no proxy in front — so `npm run guards` reads the generated file instead. If the
site ever goes unreachable after a deploy, look at the rewrite rules first.

```bash
git revert <the bad commit>
git push origin <the branch that deploys>
```

That is roughly nine minutes to green. If you need it faster, or CI is not available, run
`bash upload-to-dinahosting.sh` from a checkout of the last good commit; the upload is the slow
part and the whole site is under 5 MB.

Two things the deploy never touches, so neither is at risk: `cgi-bin/` and `.well-known/`.

---

## What no check can tell you

The guards catch a build that should not be published. They cannot catch a price that is simply
wrong, a sentence that says something SpainBcn does not say, or a date nobody re-exported. That
judgement is a person's, every time.

Three standing rules from `CLAUDE.md` worth repeating because nothing enforces them:

- **Never invent a fact.** Not a date, a price, a programme name, a testimonial or a member of
  staff. If it cannot be verified, leave it out and record it under "Unresolved" in
  `notes/production-report.md`.
- **Do not modify anything SpainBcn-owned**, and keep cross-links to SpainBcn.com explicit.
- **Say something specific or say nothing.** If a sentence gives the reader nothing they did not
  already know, delete it.
