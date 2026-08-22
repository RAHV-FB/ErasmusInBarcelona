# ErasmusInBarcelona.com — publishing, and what is left to do

**Status, 22 August 2026: the site is built, uploaded and serving correctly on the hosting.
It is not yet on the domain, because the domain still points at Webnode.** The registrar
transfer completed on the morning of 22 August, so nothing is waiting on anyone else any more:
[What is left](#what-is-left) starts at step 2, and every step of it is mechanical.

See it now: <http://erasmusinbarcelona.hl1639.dinaserver.com/?v=1>

Add a query string. Without one you will very likely get a cached copy of dinahosting's
placeholder page from before the first upload, and conclude nothing has been deployed. That
mistake cost an hour.

---

## Contents

1. [The situation in one paragraph](#the-situation-in-one-paragraph)
2. [Hosting and domain](#hosting-and-domain)
3. [Two ways to publish](#two-ways-to-publish)
4. [What is left](#what-is-left)
5. [Traps](#traps)
6. [How the site is built](#how-the-site-is-built)

---

## The situation in one paragraph

`erasmusinbarcelona.com` is a live business site running on **Webnode**, with its DNS at
**Register.it** and its mail at Webnode too. A dinahosting account for the domain already
existed, paid to 21 November 2026, with an empty web root — nobody had ever published to it.
A registrar transfer from Register.it to dinahosting was opened on 21 August 2026 at 15:12 and
completed on 22 August at about 08:10 UTC — faster than the five days it was expected to take.
The domain is now registered through Dinahosting S.L. and expires 17 November 2027. Its
nameservers are still `ns1/ns2.register.it`, which is the normal state straight after a
transfer and is why nothing has changed for a visitor. The new site sits on that dinahosting
account and serves correctly there. Next the nameservers move to dinahosting, the zone is
rebuilt there, and the domain starts answering from the new site.

The old Webnode site stays up and untouched until that moment. There is no window where the
domain serves nothing.

---

## Hosting and domain

| Item | Value |
|---|---|
| Hosting | dinahosting, Hosting Profesional Linux (erasmusinbarcelona.com), expires 21/11/2026 |
| Server | `hl1639.dinaserver.com`, IP `82.98.164.84`, Debian 11 |
| Stack | Apache, PHP 7.4, MariaDB 11.8, Varnish in front |
| **Web root** | **`~/www/`** — one level below where FTP and SSH land |
| **FTP host** | **`erasmusinbarcelona-com.espacioseguro.com`**, user `erasmusinbarcelona` |
| SSH | same host and credentials; enabled; the panel has a web terminal that logs in with no password |
| Preview URL | `erasmusinbarcelona.hl1639.dinaserver.com` |
| Panel | <https://panel.dinahosting.com> |
| Certificate | none yet — Let's Encrypt (`CERLET`) is free in the panel and must wait for DNS |

**DNS today** (authoritative: `ns1.register.it`, `ns2.register.it`):

| Record | Value | Whose |
|---|---|---|
| `A @` | `3.73.27.108`, `3.125.172.46` | Webnode |
| `CNAME www` | `erasmus-in-barcelona5.webnode.page` | Webnode |
| `MX @` | `10 imap.mail.webnode.com` | Webnode |
| `TXT @` | `v=spf1 a mx include:spfuser.webnode.com -all` | Webnode |
| `CNAME _dmarc` | `_dmarc-user.webnode.com` (→ `v=DMARC1; p=none;`) | Webnode |
| `CNAME autoconfig` | `tb-wb.securemail.pro` | Register.it, left over |

Nothing else resolves. There is no `ftp` record, which is why the FTP host the panel used to
display (`ftp.erasmusinbarcelona.com`) does not work and the `espacioseguro.com` name does.

The owner's decision on mail: **nobody uses `@erasmusinbarcelona.com`** — the site's contact
address is `Hola@SpainBcn.com`, a different domain — so mail ends up at dinahosting with
everything else. It does not get there in the same step as the website; see step 2 for why, and
for the deadline that ordering creates. Before the Webnode plan is cancelled, somebody should
open that mailbox once and confirm there is nothing in it worth keeping. That is the one step
with no undo.

---

## Two ways to publish

Both build from source and both refuse to upload a build that should not be published. Use
either; they produce the same result.

### From a terminal

```bash
bash upload-to-dinahosting.sh              # build, upload, verify
bash upload-to-dinahosting.sh --dry-run    # say what would change, send nothing
bash upload-to-dinahosting.sh --verify-only  # check the live site, upload nothing
```

`curl` only — macOS ships it, so there is nothing to install. Four stages, stopping at the
first failure:

1. **Pre-flight.** Rebuilds `dist/` from source and runs the guards, so a stale build can
   never reach the server.
2. **Login.** Password typed hidden, never stored. TLS on the control channel. The web root
   is confirmed to exist before anything is written.
3. **Upload,** retrying each file up to three times, then reading every file's size back off
   the server, then pruning what the site no longer contains.
4. **Verification over HTTP,** because "the bytes uploaded" is not "the site works": eleven
   pages, a real 404, four legacy redirects, and `site.css` served whole.

Point stage 4 somewhere else with `--check-url https://www.erasmusinbarcelona.com` once the
domain is live.

### From GitHub

`.github/workflows/deploy-dinahosting.yml` does the same on every push to `main` or
`claude/site-health-check-df5ie0`, using `lftp`. Credentials are repository secrets
(`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`); `DEPLOY_DIR` and `SITE_CHECK_URL` are
repository variables.

`SITE_CHECK_URL` is currently `http://erasmusinbarcelona.hl1639.dinaserver.com` so the
post-deploy check tests the hosting rather than the old Webnode site. **Delete that variable
at cutover** and the check falls back to `https://www.erasmusinbarcelona.com`.

---

## What is left

In order. Nothing here needs judgement; the transfer that was blocking it is done.
[PUBLISHING.md](PUBLISHING.md) covers the same ground for whoever is scripting it rather than
clicking it.

### 1. Wait for the registrar transfer — done

Completed 22 August 2026, about 08:10 UTC. Confirmed at the registry rather than in the panel:
RDAP for `erasmusinbarcelona.com` names Dinahosting S.L. as registrar and gives an expiry of
17 November 2027.

### 2. Point the nameservers at dinahosting, and build the zone

The domain is in the dinahosting account. Set its nameservers to dinahosting's and create:

| Record | Value |
|---|---|
| `A @` | `82.98.164.84` |
| `A www` | `82.98.164.84` |
| `MX @` | `10 imap.mail.webnode.com` — copied, not changed |
| `TXT @` | `v=spf1 a mx include:spfuser.webnode.com -all` — copied, not changed |
| `CNAME _dmarc` | drop the Webnode CNAME; a plain `TXT _dmarc` with `v=DMARC1; p=none;` is fine |
| `autoconfig` | drop it — Register.it's, and meaningless here |

**Mail is copied across unchanged, not moved.** An earlier version of this step had mail
moving to dinahosting at the same time; doing both at once makes a failure twice as hard to
read, and there is nothing to gain from the haste — no mailbox on this domain has ever been
created or used. The cost is that those two records name Webnode's servers, so they stop
meaning anything the moment Webnode is cancelled. Moving mail to dinahosting is therefore its
own change, and it has to happen **before** the cancellation in step 5, not after.

**Lower the TTLs a day beforehand** if you can. The apex is currently 3600s, so without that
there is up to an hour where some resolvers still send visitors to Webnode. Nothing breaks;
they just see the old site for a while.

### 3. Issue the certificate

Panel → CERTIFICADOS → domain `erasmusinbarcelona.com` → **Certificado Let's Encrypt**
(`CERLET`, free) → Instalar. **Only after DNS resolves to `82.98.164.84`** — Let's Encrypt
validates over HTTP on the domain itself, so issuing it earlier just fails. There is a stale
notification in this account of exactly that going wrong for `summercampsbarcelona.com` in
2021.

Then turn on "Forzar HTTPS" if the panel offers it, and confirm `.well-known/` still exists
in the web root — the deploy excludes it from the prune precisely so issuance is not
interrupted.

### 4. Verify against the real domain

```bash
bash upload-to-dinahosting.sh --verify-only --check-url https://www.erasmusinbarcelona.com
```

Eleven pages, the 404, four legacy redirects, `site.css` whole. Then check the response
headers for `X-Robots-Tag`: the hosting adds `noindex, nofollow` to everything on the
`*.dinaserver.com` preview name, and nothing in `dist/.htaccess` does that. If it turns out to
follow the account rather than the preview hostname, the live site ships deindexed with every
build guard still green. `curl -sSI https://www.erasmusinbarcelona.com/` settles it. Then check
by hand that
`http://erasmusinbarcelona.com/` reaches `https://www.erasmusinbarcelona.com/` in one hop —
the canonical is **www**, chosen because every indexed URL of the old site is on www and
switching would make each legacy redirect two hops for no gain.

Then delete the `SITE_CHECK_URL` repository variable so CI checks the real site.

### 5. Tidy up

- Cancel Webnode, after the mailbox check above.
- Make the repository private (the owner asked). **Pages from a private repository needs a
  paid plan**, so remove `.github/workflows/deploy-pages.yml` at the same time or it will
  start failing on every push. The prototype it deploys has been superseded anyway.
- Consider renaming the default branch to `main`; the deploy workflow already triggers on
  both.

---

## Traps

Every one of these cost time. They are not hypothetical.

**The host rate-limits bursts, and a 429 reads exactly like a broken page.** This is the one
that cost the most: every deploy run up to and including 22 August 2026 went red on it, always
*after* the upload had succeeded and every file had been verified on the server. The job died
on the 404 check — the first request in the workflow with no retry behind it — and the site was
correct the whole time. Measured on the hosting: a burst draws 429 from the fourth request
onwards, three seconds apart gets four to six through before one is refused, and a 429 clears
after about twenty seconds of quiet. Pacing alone is not enough; both checkers now pace
themselves *and* wait a 429 out. Anything new must too.

**The FTP host must be `erasmusinbarcelona-com.espacioseguro.com`.** The server presents a
certificate for `*.espacioseguro.com` on port 21. Dial it as `hl1639.dinaserver.com` and a
client that verifies the hostname waits for a handshake that cannot finish — the failure is a
thirty-second silence reported as "Timeout (control socket)", which reads like the server
being unreachable. It is not: port 21 is open and AUTH TLS completes in about a second.

**The web root is `~/www/`, not where FTP lands.** FTP and SSH land in the account home,
which also contains `Maildir`, `logs` and the rest of the account. A mirror with `--delete`
pointed there would take all of it. Both deploy paths refuse to target anything but `www/`.

**Dotfiles are invisible unless you ask for them.** `set ftp:list-options -a` in lftp, or the
server lists no `.htaccess` and no `.nojekyll` and a completeness check reports two files
missing that are sitting right there. `curl --list-only` has the same blind spot, so the
shell script's prune cannot see dotfiles either — harmless, since both are uploaded every
time, but do not be surprised by it.

**Upload one file at a time.** Four in parallel and the host starts refusing data connections
part-way through; individual files die with "max-retries exceeded" while their neighbours
succeed. The whole site is under 5 MB, so sequential costs a few minutes.

**Do not trust lftp's exit code.** It has returned 1 twice after runs whose logs show every
file transferring and no error at all. Both deploy paths therefore verify the result — file
sizes on the server, then the site over HTTP — rather than asking the tool whether it thinks
it succeeded.

**A protected FTPS data channel truncates files at exactly 16,384 bytes on some networks.**
Seen on the sibling spainbcn.com project; not reproducible from GitHub's runners, where every
file arrives byte-exact. The shell script uses `--ftp-ssl-control` (login encrypted, data in
the clear — the files are a public website) and reads every size back, so if it ever happens
the deploy stops rather than publishing half a stylesheet.

**`Redirect` in Apache matches on prefix.** `Redirect 301 /home /` also catches `/home/` and
sends it to `//`. Every legacy redirect uses anchored `RedirectMatch` for this reason. Add new
ones to `src/data/redirects.js` and rebuild — never to the server.

**`%{HTTP_HOST}` includes the port.** The rule exempting the preview host from the canonical
redirect has to allow for `:8080` and friends, or it silently stops applying and every check
against a non-standard port bounces to the live domain.

**404.html is `noindex`, correctly.** A guard that rejects any `noindex` page rejects every
build. The prototype build is identified by its own markers instead: a `robots.txt` that
disallows everything, and a redirecting stub at each legacy path.

**Your browser caches the preview URL hard.** Append a query string when checking.

---

## How the site is built

Plain static HTML from one data file. `README.md` covers it properly; the short version:

```
src/data/site-data.js     every fact the site states
src/pages/*.js            one module per page
src/data/redirects.js     the legacy URL map — used by server.mjs AND the production .htaccess
build.mjs                 renders src/pages → dist/
tools/build-htaccess.mjs  renders src/data/redirects.js + SITE_URL → dist/.htaccess
server.mjs                local static server that behaves like production
```

```bash
npm run build:live   # dist/ plus the production .htaccess
npm start            # build and serve on http://127.0.0.1:4173
npm run check        # browser audit of every page (needs `npm install` first)
```

`dist/` is not committed. Both deploy paths build it themselves, so what reaches the server is
always what the source says.

The canonical origin is `https://www.erasmusinbarcelona.com`, set as `SITE_URL` in
`src/layout.js`. `tools/build-htaccess.mjs` follows it — change it in one place and the
canonical tags, the sitemap and the redirect all agree.
