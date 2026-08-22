# Publishing from a terminal

Everything here runs in a shell. Nothing needs a browser, a control panel or a person
clicking. Written for whoever automates the next stage — read
[What still needs writing](#what-still-needs-writing) for the specific scripts, and
[HANDOFF.md](HANDOFF.md) for why the hosting behaves the way it does.

The one thing a terminal cannot decide is whether the site is *correct*. The build guards catch
a prototype build and a broken redirect table; they cannot catch a wrong price. That judgement
stays with a person.

---

## The loop

```bash
git clone https://github.com/RAHV-FB/ErasmusInBarcelona.git
cd ErasmusInBarcelona

# edit src/… — never dist/, never the server

npm run build:live        # dist/ plus the production .htaccess
npm start                 # serve it at http://127.0.0.1:4173 and look
npm run guards            # the publish guards — no browser, a second or two
npm install && npm run check   # browser audit of every page, first run only

git commit -am "…"
git push origin claude/site-health-check-df5ie0
```

`.github/workflows/check.yml` runs the build, the guards and the browser audit on every pull
request, and on every push to a branch that deploys. It publishes nothing and uses no secrets,
so it is safe on branches the deploy ignores — and it is the only thing that looks at a change
before the decision to publish it. [CONTRIBUTING.md](CONTRIBUTING.md) is the guide to making
the change itself.

The push is the deploy: `.github/workflows/deploy-dinahosting.yml` builds and uploads — but only
from a branch it watches, today `main` and `claude/site-health-check-df5ie0`, and `main` does not
exist yet. A push to any other branch is checked and uploads nothing. To publish without waiting
for CI, or when CI is not an option:

```bash
bash upload-to-dinahosting.sh
```

Both build from source and both run `scripts/guards.mjs` — one file, so no two callers can
enforce different things. They do not verify equally afterwards: the workflow checks that every
file in `dist/` came back in a remote listing, then five pages, the 404 and three redirects. The
shell script reads every file's size back off the server, then checks eleven pages, the 404, four
redirects and `site.css` served whole. When you want to know the site is right, run the script.

---

## The deploy script

```bash
bash upload-to-dinahosting.sh                # build, upload, verify
bash upload-to-dinahosting.sh --dry-run      # list what would go, send nothing
bash upload-to-dinahosting.sh --verify-only  # check the live site, upload nothing
bash upload-to-dinahosting.sh --check-url https://www.erasmusinbarcelona.com
```

`curl` only. macOS ships it, so there is nothing to install — no Homebrew, no lftp, no Node
modules beyond what the build already needs.

It reads its settings from the environment, so it can run unattended:

| Variable | Default |
|---|---|
| `FTP_HOST` | `erasmusinbarcelona-com.espacioseguro.com` |
| `FTP_USER` | `erasmusinbarcelona` |
| `WEB_ROOT` | `www` |
| `CHECK_URL` | the hosting's preview URL |

The password is the one thing it will not take from the environment — it prompts, hidden, and
never stores it. **If you are scripting an unattended deploy, do not add a `FTP_PASS`
variable.** Use the GitHub workflow, where the password is a repository secret and never
reaches a shell history, a process list or a file on disk.

---

## Credentials

| Where | What |
|---|---|
| GitHub repository secrets | `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` — used by the workflow |
| GitHub repository variables | `DEPLOY_DIR` (default `/www/`), `SITE_CHECK_URL` (delete at cutover) |
| dinahosting panel | the same FTP password; reset under FTP if it is ever lost |

Rotating the password means changing it in the panel and updating the `FTP_PASSWORD` secret.
Nothing else refers to it.

---

## Doing the rest without a browser

The remaining work — the DNS zone, the nameservers, the certificate — has been described so
far as panel clicking. It does not have to be. **dinahosting has a public API**, documented at
<https://en.dinahosting.com/api/documentation>, and it covers domains, DNS and hosting.

- Endpoint: `https://dinahosting.com/special/api.php`
- Auth: HTTP Basic, or `AUTH_USER` / `AUTH_PWD` as parameters
- Request: plain URL-encoded `key=value`, or JSON-RPC, or XML-RPC
- Response: ask for `responseType=Json`
- There is a **simulation mode** — use it before every write

Commands are `Area_Thing_Verb`. Confirmed to exist:

| Command | For |
|---|---|
| `Domain_Zone_UpdateTypeA` | change an A record — `domain`, `hostname`, `ip`, optional `oldIp` |
| `Domain_Zone_AddTypeMX` | add an MX record |
| `Domain_Zone_UpdateTypeAAAA` | change an AAAA record |
| `Domain_Zone_DeleteTypeSRV` | delete an SRV record |
| `Domain_NameServer_Modify` | change the domain's nameservers |
| `System_GetRequestTypes` | a harmless call for checking credentials |

Only `Domain_Zone_UpdateTypeA`'s parameters are recorded here because that is the only one
whose documentation page could be read from this environment; the rest are blocked to
automated fetching. **Read each command's page before calling it rather than guessing its
parameters** — a DNS write with a wrong parameter name is not a typo you find out about
politely.

Start by confirming the credentials work and the domain is visible:

```bash
curl -sS "https://dinahosting.com/special/api.php" \
  --data-urlencode "AUTH_USER=$DINA_USER" \
  --data-urlencode "AUTH_PWD=$DINA_PASS" \
  --data-urlencode "command=System_GetRequestTypes" \
  --data-urlencode "responseType=Json"
```

If that returns cleanly, everything below can be scripted.

---

## What still needs writing

Three scripts. None of them is difficult; all of them touch a live domain, so each should
support a dry run and refuse to continue on an unexpected response.

### 1. `cutover.sh` — written, not yet run

```bash
export DINA_USER=... DINA_PASS=...
bash cutover.sh                # dry run, the default
bash cutover.sh --zone         # A @ and A www → 82.98.164.84
bash cutover.sh --switch-ns    # nameservers → dinahosting, after typing the domain
bash cutover.sh --watch        # poll DNS, then hand over to the certificate step
```

It checks the credentials before anything else, treats any non-success response as fatal, and
refuses to move the nameservers before the zone is written. It has **not been run against the
live API** — this environment cannot reach dinahosting — so watch the first `--zone` run and
confirm the result in the panel under Zonas DNS before going on to `--switch-ns`.

### 2. `issue-certificate.sh` — Let's Encrypt

Only once `dig` shows `82.98.164.84`. Validation is over HTTP on the domain itself, so issuing
it earlier fails — there is a 2021 failure of exactly this kind still sitting in this account's
notifications.

`.well-known/` does not exist in the web root yet: it answered 404 on the preview host on
22 August 2026. Issuance creates it. The deploy excludes it from the prune so that once it is
there the next deploy cannot delete it out from under a renewal — which is not the same as a
promise that the directory is already present.

Afterwards, assert `https://www.erasmusinbarcelona.com/` answers 200 with a valid certificate,
and that `http://` reaches it in one redirect.

**Then check the response headers for `X-Robots-Tag`.** The hosting adds
`noindex, nofollow` to everything served on the `*.dinaserver.com` preview name — correctly for a
preview, and it is the host doing it, not anything in `dist/.htaccess`. Whether it follows the
preview hostname or the account cannot be established until the domain answers here, and if it
follows the account the live site ships deindexed with every guard still green. One
`curl -sSI https://www.erasmusinbarcelona.com/` settles it.

### 3. `finish.sh` — the tidying

- Delete the `SITE_CHECK_URL` repository variable so CI checks the real domain.
- Remove `.github/workflows/deploy-pages.yml`. The GitHub Pages prototype it deploys has been
  superseded, and Pages from a private repository needs a paid plan.
- Make the repository private. **After** the workflow above is removed, not before.
- Cancel Webnode. It is paid to **September 2026**, so there is no hurry and no reason to
  cancel before the new site has been serving the live domain for a while.

---

## Rules for anything automated here

**Verify the outcome, not the tool's opinion of it.** `lftp` has twice exited non-zero after
uploading every file without error. Both deploy paths therefore check what is on the server and
what the site returns over HTTP. Apply the same standard to DNS: read the record back, do not
trust the write's response.

**Never write to the server directly.** Not the files, not `.htaccess`. The next deploy
overwrites the web root with what the repository builds, so anything edited in place is lost —
silently, and usually at the worst moment. Redirects go in `src/data/redirects.js`.

**One fact, one place.** `SITE_URL` in `src/layout.js` decides the canonical origin, the
sitemap, the Open Graph URLs and the `.htaccess` redirect. Change it there; never in two
places.

**Space out HTTP checks.** The host answers `429` to a fast run of requests, which reads
exactly like a broken page — it failed all eight deploy runs up to 22 August 2026, every one of
them after the upload had already succeeded and every file had been verified on the server.
Measured against the hosting: a burst draws 429 from the fourth request onwards, four to six get
through at three seconds apart, and one clears after about twenty seconds of quiet. Both checkers
now space their requests and wait a 429 out; anything new must too.

**Assume no interactive terminal.** Anything a future script needs must come from an
environment variable or a flag — with the deliberate exception of the FTP password in
`upload-to-dinahosting.sh`, which is interactive on purpose.
