# Publishing from a terminal

Everything here runs in a shell. Nothing needs a browser, a control panel or a person
clicking. Written for whoever automates the next stage — read
[What still needs writing](#what-still-needs-writing) for the specific scripts, and
[HANDOFF.md](HANDOFF.md) for why the hosting behaves the way it does.

The one thing a terminal cannot decide is whether the site is *correct*. The build guards catch
a prototype build and a broken redirect table; they cannot catch a wrong price. That judgement
stays with a person.

**Where this stands, 22 August 2026.** The registrar transfer completed that morning:
`erasmusinbarcelona.com` is in the dinahosting account, expiring 17 November 2027. Its
nameservers are still `ns1/ns2.register.it` and the domain still serves the old Webnode site,
so [cutover](#1-cutoversh--point-the-domain-at-this-hosting) is now the next thing to do and
nothing is waiting on anyone else.

---

## The loop

```bash
git clone https://github.com/RAHV-FB/ErasmusInBarcelona.git
cd ErasmusInBarcelona

# edit src/… — never dist/, never the server

npm run build:live        # dist/ plus the production .htaccess
npm start                 # serve it at http://127.0.0.1:4173 and look
npm install               # first run only — Playwright and sharp
npm run check             # browser audit of every page

git commit -am "…"
git push origin <your-branch>
```

The push is the deploy — but only from a branch the workflow watches.
`.github/workflows/deploy-dinahosting.yml` triggers on `main` and
`claude/site-health-check-df5ie0`, and `main` does not exist yet, so today exactly one branch
deploys. A push to any other branch builds nothing and uploads nothing. Either merge into the
watched branch, add yours to the `branches:` list, or publish by hand:

```bash
bash upload-to-dinahosting.sh
```

Both build from source, run the same pre-flight guards, and refuse a prototype build. They do
not verify equally afterwards: the workflow checks that every file in `dist/` came back in a
remote listing, then five pages, the 404 and three redirects. The shell script reads every
file's size back off the server, then checks eleven pages, the 404, four redirects and
`site.css` served whole. When you want to know the site is right, run the script.

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
| `CHECK_PACE` | `3` — seconds between HTTP checks |
| `CHECK_BACKOFF` | `20` — seconds to wait out a 429, multiplied by the attempt |
| `CHECK_RETRIES` | `4` |

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

### 1. `cutover.sh` — point the domain at this hosting

The registrar transfer is done, so the only preconditions left to assert are that the domain
is visible in the dinahosting account, that it still resolves, and that the preview URL
already serves this build.

1. Build the zone at dinahosting: `A @ → 82.98.164.84`, `A www → 82.98.164.84`.
2. Recreate mail as it is today, so nothing about mail changes in the same move:
   `MX @ 10 imap.mail.webnode.com`, `TXT @ v=spf1 a mx include:spfuser.webnode.com -all`.
   No mailbox on this domain has ever been created or used, so there is nothing to migrate and
   nothing to lose — but changing hosting and mail in one step makes a failure twice as hard to
   read. Drop the `_dmarc` and `autoconfig` records; both belong to providers being left.

   Copying rather than moving borrows against the cancellation: those records name Webnode's
   servers, so they stop meaning anything the moment Webnode is switched off. Moving mail to
   dinahosting is its own change, and it has to happen **before** the cancellation in
   `finish.sh`, not after. HANDOFF.md step 2 says the same thing; if the two ever disagree
   again, they are describing one zone and both are wrong until someone reconciles them.
3. Only then `Domain_NameServer_Modify` to dinahosting's nameservers.
4. Poll until the world agrees:
   ```bash
   until [ "$(dig +short www.erasmusinbarcelona.com @8.8.8.8)" = "82.98.164.84" ]; do sleep 60; done
   ```
5. `bash upload-to-dinahosting.sh --verify-only --check-url https://www.erasmusinbarcelona.com`

The zone must exist **before** the nameservers move, or dinahosting's servers become
authoritative for a domain they have no records for, and the site goes dark for as long as it
takes to notice.

The apex TTL is 3600s. Lower it a day ahead if you can, or expect up to an hour in which some
resolvers still send visitors to Webnode. Nothing breaks; they see the old site for a while.

### 2. `issue-certificate.sh` — Let's Encrypt

Only once `dig` shows `82.98.164.84`. Validation is over HTTP on the domain itself, so issuing
it earlier fails — there is a 2021 failure of exactly this kind still sitting in this account's
notifications.

`.well-known/` does not exist in the web root yet: it answers 404 on the preview host as of
22 August 2026. Issuance creates it. The point of the deploy excluding it from the prune is
that once it is there, the next deploy cannot delete it out from under a renewal — so do not
read the exclusion as a promise that the directory is already present.

Afterwards, assert `https://www.erasmusinbarcelona.com/` answers 200 with a valid certificate,
and that `http://` reaches it in one redirect.

**Then check the response headers for `X-Robots-Tag`.** The hosting adds
`x-robots-tag: noindex, nofollow` to everything served on the `*.dinaserver.com` preview name —
correctly, since a preview should not be indexed, and it is the host doing it, not anything in
`dist/.htaccess`. Whether it is bound to the preview hostname or to the account cannot be
established until the domain answers here, and the difference matters: if it follows the
account, the live site ships deindexed and every build guard in the repository would still have
passed. One `curl -sSI https://www.erasmusinbarcelona.com/` settles it.

### 3. `finish.sh` — the tidying

- Delete the `SITE_CHECK_URL` repository variable so CI checks the real domain.
- Remove `.github/workflows/deploy-pages.yml`. The GitHub Pages prototype it deploys has been
  superseded, and Pages from a private repository needs a paid plan.
- Make the repository private. **After** the workflow above is removed, not before.
- Cancel Webnode. It is paid to **September 2026** — weeks away, not months, so this is a
  deadline rather than a loose end. The domain has to be cut over and the certificate issued
  before the plan lapses, or DNS still points at a Webnode site that has stopped being served.
  Confirm the expiry date in the Webnode account, and open the `@erasmusinbarcelona.com`
  mailbox once before cancelling: nobody has ever used it, and that is the one step with no
  undo.

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

**Space out HTTP checks.** The host rate-limits bursts, and a 429 reads exactly like a broken
page. This is not a footnote: it failed all eight deploy runs up to and including 22 August
2026, every one of them after the upload had already succeeded and every file had been verified
on the server. The job went red on the 404 check, the first request in the workflow that had no
retry on it, and the site was fine the whole time.

Measured against the hosting on 22 August 2026: a burst draws 429 from the fourth request
onwards; at three seconds apart four to six get through before one is refused; a 429 clears
after about twenty seconds of quiet. Pacing alone is therefore not enough. Both checkers now go
through one helper that paces itself *and* waits a 429 out, tuned by `CHECK_PACE`,
`CHECK_BACKOFF` and `CHECK_RETRIES`. Anything new must do the same. curl's `--retry` alone will
not do — it gives up on its own schedule and tells you nothing about why.

A full `--verify-only` run against the hosting on 22 August 2026 took three backoffs to get
through seventeen checks, and passed: eleven pages, the 404, four redirects and `site.css`
whole.

**Assume no interactive terminal.** Anything a future script needs must come from an
environment variable or a flag — with the deliberate exception of the FTP password in
`upload-to-dinahosting.sh`, which is interactive on purpose.
