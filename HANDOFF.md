# ErasmusInBarcelona.com — publishing, and what is left to do

> **Before anything else: the registrant contact is unverified.** The panel warns
> "Dominio pendiente de verificar el contacto registrante" and names **spainbcnmiriam@gmail.com**.
> ICANN requires the domain be suspended if that email is not acted on, usually within 15 days
> of the transfer. A suspended domain takes the site down whatever else is configured. Find that
> email and click the link.

**Status, 22 August 2026: the site is built, uploaded, serving correctly on the hosting, and
approved by the owner for publication. The registrar transfer has completed — dinahosting is
the registrar as of 07:42 UTC — but the domain still points at Webnode, because the
nameservers have not moved yet.** What remains is listed under [What is left](#what-is-left).
[PUBLISHING.md](PUBLISHING.md) covers doing all of it from a terminal, without the panel.

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

`erasmusinbarcelona.com` is a live business site running on **Webnode**, which was also its
registrar until 22 August 2026 and is still its mail provider; the nameservers it uses are
Register.it's. A dinahosting account for the domain already existed, paid to 21 November 2026,
with an empty web root — nobody had ever published to it. The new site now sits on that
account and serves correctly there, and the owner has approved it for publication.

The registrar transfer completed on **22 August 2026 at 07:42 UTC**: the registry lists
Dinahosting s.l. (IANA 1262) and the status is `active`. **The nameservers are still
`ns1.register.it` and `ns2.register.it`** — a registrar transfer does not move DNS. Until they
move, the domain serves the old Webnode site, which is the correct state of affairs and not a
problem to solve in a hurry.

It is, however, the thing to do next, and not to leave indefinitely: those nameservers belong
to the provider the domain has just left. Do not assume they keep answering for ever.

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
| Domain expiry | 17/11/2027, auto-renew on |
| dinahosting nameservers | `ns.dinahosting.com`, `ns2`, `ns3`, `ns4` |

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

Mail, settled by the owner on 22 August 2026: **no mailbox on this domain has ever been
created or used.** The site's contact address is `Hola@SpainBcn.com`, on a different domain.
So there is nothing to migrate and nothing that can be lost — the earlier caution about
checking the mailbox before cancelling Webnode does not apply.

The MX and SPF records are still recreated as-is at cutover anyway. Not to preserve mail, but
because changing the web host and the mail records in one move makes any failure twice as hard
to read. Move them separately, afterwards, or not at all.

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

In order. Nothing here needs judgement; it needs the transfer to finish.

### 1. Wait for the panel to catch up — done at the registry, pending in the panel

The transfer completed at the registry on 22 August 2026 at 07:42 UTC. dinahosting's own panel
had not yet listed the domain under DOMINIOS as of 08:10 UTC, so there was no zone to edit and
no nameserver field to change. That is provisioning lag, normally hours. Check with:

```bash
curl -s https://rdap.verisign.com/com/v1/domain/erasmusinbarcelona.com \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['status'], [n['ldhName'] for n in d['nameservers']])"
```

If the panel still does not list it after a few hours, dinahosting's support chat can push it
through.

### 2. Point the nameservers at dinahosting, and build the zone

```bash
export DINA_USER=... DINA_PASS=...
bash cutover.sh                # dry run — says what it would do
bash cutover.sh --zone         # write the A records
bash cutover.sh --switch-ns    # move the nameservers, after typing the domain to confirm
bash cutover.sh --watch        # poll DNS, then tell you to issue the certificate
```

Zone first, nameservers second — the other order makes dinahosting authoritative for a domain
whose records still point at a parking IP, and the site goes dark until somebody notices.
`cutover.sh` enforces that order.

**dinahosting already has a zone for this domain, and it is wrong.** It was initialised on
30 August 2018 and holds `A @` and `A www` both pointing at `82.98.135.43` — a dinahosting
parking address, not this hosting. Those two records are what `--zone` rewrites. Nothing else
is in that zone: no MX, no TXT.

The zone should end up as:

| Record | Value |
|---|---|
| `A @` | `82.98.164.84` |
| `A www` | `82.98.164.84` |
| `MX` / `TXT` | not created — see below |

`cutover.sh` writes no MX or TXT record. Nothing has ever sent or received mail on this domain,
and the only zone command whose parameters are documented in a page readable from here is
`Domain_Zone_UpdateTypeA`. Guessing parameter names for a DNS write is worse than leaving mail
unconfigured, and leaving it unconfigured changes nothing in practice. If mail is ever wanted,
add it in the panel and record it here.

The `_dmarc` and `autoconfig` records simply cease to exist once the nameservers move; both
belong to providers being left.

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

Eleven pages, the 404, four legacy redirects, `site.css` whole. Then check by hand that
`http://erasmusinbarcelona.com/` reaches `https://www.erasmusinbarcelona.com/` in one hop —
the canonical is **www**, chosen because every indexed URL of the old site is on www and
switching would make each legacy redirect two hops for no gain.

Then delete the `SITE_CHECK_URL` repository variable so CI checks the real site.

### 5. Tidy up

- Cancel Webnode. It is paid to **September 2026**, so let the new site serve the live domain
  for a while first. Nothing is gained by cancelling early.
- Make the repository private (the owner asked). **Pages from a private repository needs a
  paid plan**, so remove `.github/workflows/deploy-pages.yml` at the same time or it will
  start failing on every push. The prototype it deploys has been superseded anyway.
- Consider renaming the default branch to `main`; the deploy workflow already triggers on
  both.

---

## Traps

Every one of these cost time. They are not hypothetical.

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

**The host rate-limits, and answers 429.** Fire a dozen requests at it in a few seconds and it
starts returning `429 Too Many Requests`, which looks exactly like a broken page — one deploy
failed on `/no-such-page/` answering 429 instead of 404. Both checkers now space their
requests out and wait a 429 out rather than believing it.

**Every deploy re-uploads every file, and takes eight or nine minutes.** The server does not
preserve the timestamps lftp sets, so the mirror sees every file as changed. It is left this
way deliberately: comparing on size alone would skip a changed file that happened to keep its
length, and the whole site is under 5 MB. Do not "optimise" it without thinking that through.

**Varnish terminates TLS, so `%{HTTPS}` is always `off` inside Apache.** A rule that forces
HTTPS by testing `%{HTTPS}` alone redirects every HTTPS request to HTTPS; the proxy forwards
plain HTTP again and the browser gives up with `ERR_TOO_MANY_REDIRECTS`. The site is then
completely unreachable, not merely misconfigured. The scheme rule has to consult
`%{HTTP:X-Forwarded-Proto}` as well — and the two canonical rules are kept separate, one for
scheme and one for host, because a single rule cannot express "either of these, but not on the
preview host".

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
