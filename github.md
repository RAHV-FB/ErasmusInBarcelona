# ============================================================
# github.md — source repository association
# ============================================================
repo: RAHV-FB/ErasmusInBarcelona
branch: main

## Last sync
date: 2026-08-20T21:00:00Z

### Updated in this project
- The Design Component prototype was converted to production static HTML. `.dc.html` pages,
  `support.js` and the vendored React runtime are gone from the repository.
- Pages are now built by `build.mjs` from `src/pages/*.js` and `src/data/site-data.js`; the
  published output is `dist/`.
- Facts were re-verified against www.spainbcn.com and the organisation's course calendar, and
  corrected where they disagreed — see notes/production-report.md for the table.
- All images, including the twelve team portraits, are served from this repository. No asset is
  hotlinked from clvaw-cdnwnd.com any more.

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

## GitHub Pages
`.github/workflows/deploy-pages.yml` builds the site and deploys it to Pages on every push to this
branch, so <https://rahv-fb.github.io/ErasmusInBarcelona/> tracks the branch without any generated
file being committed. The Pages source is set to GitHub Actions, so this workflow is the only
deployer; if it is ever set back to a branch, GitHub's own Jekyll build races it and the workflow
warns. The deployment is marked `noindex` while it is a prototype.
