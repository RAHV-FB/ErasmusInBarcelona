# ============================================================
# github.md — source repository association
# ============================================================
repo: RAHV-FB/ErasmusInBarcelona
branch: main

## Last sync
date: 2026-08-20T19:10:00Z

### Updated in this project
- Site imported into the repository on branch `claude/site-health-check-df5ie0`; every page now maps 1:1 to a repo file
- Full health check run against all 12 routes in a real browser — fixes and findings recorded in notes/production-report.md
- React vendored locally (assets/vendor/) so no page depends on a CDN; server.mjs + scripts/health-check.mjs added so the site can be run and re-checked
- Site pages rebuilt from the live erasmusinbarcelona.com audit, the owner's DATES-SPAINBCN Google Sheet, and 20 owner-uploaded photographs

## Screen map
| Project screen | Repo files |
| --- | --- |
| index.dc.html | index.dc.html (route `/`) |
| join-a-course.dc.html | join-a-course.dc.html (route `/join-a-course`) |
| bring-a-group.dc.html | bring-a-group.dc.html (route `/bring-a-group`) |
| plan-a-mobility.dc.html | plan-a-mobility.dc.html (route `/plan-a-mobility`) |
| dates.dc.html | Google Sheet DATES-SPAINBCN gid=480287972 (manual re-export, no live connection by owner's request) |
| your-week.dc.html · barcelona.dc.html · about.dc.html · contact.dc.html · privacy.dc.html · cookies.dc.html · 404.dc.html | same filenames at the repo root; routes without the `.dc.html` suffix (see server.mjs) |
| assets/js/site-data.js | single shared data source for all pages |
