# ============================================================
# github.md — source repository association
# ============================================================
repo: RAHV-FB/ErasmusInBarcelona
branch: main

## Last sync
date: 2026-08-31

### Updated in this project
- The branch history was consolidated. Every `claude/*` working branch is fully merged into
  `main`; `main` is the only branch developed and deployed from now on.
- Two clicks still need the repository owner: switch the default branch to `main` and delete the
  stale `claude/*` branches — the steps are in HANDOFF.md under "What is still open".
- Earlier sync notes — the prototype-to-production conversion, the fact verification against
  www.spainbcn.com, the image localisation — are recorded in notes/production-report.md.

## Screen map
| Route | Source | Built to |
| --- | --- | --- |
| `/` | src/pages/home.js | dist/index.html |
| `/join-a-course/` | src/pages/join-a-course.js | dist/join-a-course/index.html |
| `/bring-a-group/` | src/pages/bring-a-group.js | dist/bring-a-group/index.html |
| `/plan-a-mobility/` | src/pages/plan-a-mobility.js | dist/plan-a-mobility/index.html |
| `/dates/` | src/pages/dates.js | dist/dates/index.html |
| `/your-week/` | src/pages/your-week.js | dist/your-week/index.html |
| `/barcelona/` | src/pages/barcelona.js | dist/barcelona/index.html |
| `/about/` | src/pages/about.js | dist/about/index.html |
| `/contact/` | src/pages/contact.js | dist/contact/index.html |
| `/privacy/` · `/cookies/` | src/pages/privacy.js · cookies.js | dist/privacy/ · dist/cookies/ |
| `/404.html` | src/pages/not-found.js | dist/404.html |
| shared shell | src/layout.js | header, footer, `<head>`, structured data |
| all facts | src/data/site-data.js | every page |
| course weeks | Google Sheet DATES-SPAINBCN gid=480287972 | exported by hand into site-data.js |

## Not published
`uploads/` and `source-photos/` hold the original photographs and are excluded from `dist/`.
`dist/` itself is generated and git-ignored; build it with `npm run build`.

## Deployment
`.github/workflows/deploy-dinahosting.yml` builds `dist/` and mirrors it to the live host over
FTPS on every push to `main`. The GitHub Pages workflow is gone — the site left Pages when the
domain went live on 22 August 2026. HANDOFF.md holds the hosting details, PUBLISHING.md the
terminal route.
