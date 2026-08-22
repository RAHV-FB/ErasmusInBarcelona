# Publishing from a terminal

Everything here runs in a shell. Nothing needs a browser, a control panel or a person clicking.
[HANDOFF.md](HANDOFF.md) describes what the site *is* — hosting, domain, DNS, and the traps this
hosting has. This is how to work on it.

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
so it is safe on any branch — and it is the only thing that looks at a change before the
decision to publish it. [CONTRIBUTING.md](CONTRIBUTING.md) is the guide to making the change
itself.

The push is the deploy: `.github/workflows/deploy-dinahosting.yml` builds and uploads — but
only from a branch it watches, today `main` and `claude/site-health-check-df5ie0`, and `main`
does not exist yet. A push to any other branch is checked and uploads nothing. To publish
without waiting for CI, or when CI is not an option:

```bash
bash upload-to-dinahosting.sh
```

Both build from source and both run `scripts/guards.mjs` — one file, so no two callers can
enforce different things. They do not verify equally afterwards: the workflow checks that every
file in `dist/` came back in a remote listing, then five pages, the 404 and three redirects.
The shell script reads every file's size back off the server, then checks eleven pages, the
404, four redirects and `site.css` served whole. When you want to know the site is right, run
the script.

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
| `Domain_Dnss_Set` | **which nameservers a domain uses** — `domain`, and a repeated `dnss[]` per nameserver |
| `Domain_Dnss_Get` | read them back |
| `Domain_Zone_GetAll` | the whole zone — `domain` |
| `Domain_Zone_UpdateTypeA` | change an A record — `domain`, `hostname` (`@` for the apex), `ip`, optional `oldIp` |
| `Domain_Zone_AddTypeMX`, `Domain_Zone_AddTypeTXT` | mail records, if ever needed |
| `Domain_Contacts_GetRegistrantVerificationInfo` | whether the registrant email has been verified |
| `Domain_NameServer_*` | **not** the above — this family registers glue records, and wants a hostname and an IP |
| `System_GetRequestTypes` | transport types; useful only as an auth check |

`Domain_Dnss_Set` is worth a second look, because its documentation is wrong. It describes
`dnss` as "comma separated values"; the API answers `Param "dnss" value syntax is not valid` to
that, url-encoded or raw, with two nameservers or four. It wants `dnss[]=ns1&dnss[]=ns2`,
repeated. **Where the docs and the API disagree, the API is right** — and simulation mode is
how you find out which without changing anything.

**The full command list is in the documentation sidebar under "LIST OF COMMANDS", grouped by
area.** It needs JavaScript, so a plain fetch returns the marketing page instead — open it in a
browser and expand the group. Twenty-one plausible names were guessed before that list was
read, and every one of them came back "Unknown command." Read the list.

Two things about simulation mode. `SIMULATE=true` is safe for checking whether a command
exists — an unknown one still answers "Unknown command." But **it returns fabricated sample
data for read commands**: `Domain_Zone_GetAll` under simulate reports a zone that is not yours,
which looks exactly like evidence that something has gone badly wrong. Never read state through
it.

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

## `cutover.sh` — done, and reusable

This moved the domain on 22 August 2026 and ran clean end to end. It is kept because the same
account holds eight other domains, and every one of them will need the same three steps.

```bash
export DINA_USER=... DINA_PASS=...
DOMAIN=other.com NEW_IP=1.2.3.4 OLD_IP=<whatever is there now> bash cutover.sh
bash cutover.sh --zone         # A @ and A www → NEW_IP
bash cutover.sh --switch-ns    # nameservers → dinahosting, after typing the domain
bash cutover.sh --watch        # poll public DNS until it agrees
```

The default is a dry run. It verifies credentials before anything else, treats any non-success
response as fatal, reads the nameservers back after setting them, and will not move nameservers
before the zone is written — that order is what keeps a domain from going dark.

**The certificate is still a panel step**, and the only one: CERTIFICADOS → the domain →
Certificado Let's Encrypt → Instalar, *after* `dig` shows the new IP. Validation runs over HTTP
on the domain itself, so doing it earlier simply fails. `.well-known/` is excluded from the
deploy's prune so issuance cannot be interrupted by a deploy landing at the wrong moment.

If a future domain needs this scripted too, look for a `Ssl_` or `Certificate_` group in the
command list rather than guessing names.

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
exactly like a broken page. Both checkers already wait a 429 out; anything new should too.

**Assume no interactive terminal.** Anything a future script needs must come from an
environment variable or a flag — with the deliberate exception of the FTP password in
`upload-to-dinahosting.sh`, which is interactive on purpose.
