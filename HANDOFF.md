# ErasmusInBarcelona.com — how it is set up, and how to publish

**Live at <https://www.erasmusinbarcelona.com> since 22 August 2026.** Valid certificate, every
page answering, legacy URLs redirecting, the old Webnode site no longer in the path.

This document is what the site *is*. [PUBLISHING.md](PUBLISHING.md) is how to work on it from a
terminal, and [README.md](README.md) is how the site is built from source.

> **One outstanding risk: the registrant contact may still be unverified.** After the transfer,
> dinahosting warned "Dominio pendiente de verificar el contacto registrante" and named
> **spainbcnmiriam@gmail.com**. ICANN requires suspension if that email is never acted on, and a
> suspended domain is down no matter how correct everything else is.
>
> Checked 22 August 2026, the evening after the transfer: the public registry (RDAP) shows only
> the two normal registrar locks — **no `clientHold` or `serverHold`**, the statuses a failed
> verification produces — so nothing is wrong *yet*. Three things about this trap:
>
> - **A verification link from Webnode does not count.** Verification is per registrar; clicking
>   Webnode's email verified the contact with the old registrar, the day before the transfer
>   away from it completed. If dinahosting requires its own round, that is a separate email.
> - **The email goes to spainbcnmiriam@gmail.com, not to whoever runs the site.** "Nothing in my
>   inbox" proves nothing — the message would be sitting in that mailbox, from dinahosting,
>   subject along the lines of "verificación del contacto registrante".
> - **The window is about 15 days from the transfer** (2013 RAA), so if it applies at all it
>   runs out in early September 2026.
>
> The definitive answer is one API call, from any terminal, with the dinahosting panel login:
>
> ```bash
> curl -sS https://dinahosting.com/special/api.php \
>   --data-urlencode "AUTH_USER=$DINA_USER" --data-urlencode "AUTH_PWD=$DINA_PASS" \
>   --data-urlencode "command=Domain_Contacts_GetRegistrantVerificationInfo" \
>   --data-urlencode "domain=erasmusinbarcelona.com" \
>   --data-urlencode "responseType=Json"
> ```
>
> If it answers verified (or that no verification is pending), delete this whole block. If it
> answers pending, get into spainbcnmiriam@gmail.com and click dinahosting's link. To re-check
> the public side without credentials:
> `curl -sS https://rdap.verisign.com/com/v1/domain/erasmusinbarcelona.com | grep -o '"status":[^]]*]'`
> — any status containing `hold` means suspended.

---

## Contents

1. [The shape of it](#the-shape-of-it)
2. [Hosting and domain](#hosting-and-domain)
3. [How to publish](#how-to-publish)
4. [What is still open](#what-is-still-open)
5. [Traps](#traps)
6. [How the migration went](#how-the-migration-went)

---

## The shape of it

Static HTML, built from one data file, served by Apache on shared hosting behind Varnish. No
database, no PHP, no framework. The repository is the source of truth for every byte in the web
root: both deploy paths rebuild from source and mirror the result, deleting anything on the
server that the build no longer produces.

```
GitHub (source)  ──push──▶  Actions ──FTPS──▶  ~/www/  ◀──FTPS──  upload-to-dinahosting.sh
                                                  │
                                            Apache + Varnish
                                                  │
                                    https://www.erasmusinbarcelona.com
```

Nothing is ever edited on the server. The next deploy would overwrite it.

---

## Hosting and domain

| Item | Value |
|---|---|
| Live URL | <https://www.erasmusinbarcelona.com> — apex redirects to www |
| Hosting | dinahosting, Hosting Profesional Linux, expires 21/11/2026 |
| Server | `hl1639.dinaserver.com`, IP `82.98.164.84`, Debian 11 |
| Stack | Apache, **Varnish in front**, PHP 7.4, MariaDB 11.8 |
| **Web root** | **`~/www/`** — one level below where FTP and SSH land |
| **FTP host** | **`erasmusinbarcelona-com.espacioseguro.com`**, user `erasmusinbarcelona`, FTPS |
| SSH | same host and credentials; the panel also has a web terminal that needs no password |
| Preview URL | `erasmusinbarcelona.hl1639.dinaserver.com` — bypasses the canonical redirect |
| Registrar | dinahosting (IANA 1262) since 22/08/2026; domain expires 17/11/2027, auto-renew on |
| Nameservers | `ns.dinahosting.com`, `ns2`, `ns3`, `ns4` |
| Certificate | Let's Encrypt, issued 22/08/2026 through the panel |
| Panel | <https://panel.dinahosting.com> |

**The DNS zone**, at dinahosting:

| Record | Value |
|---|---|
| `A @` | `82.98.164.84` |
| `A www` | `82.98.164.84` |

That is the whole zone. There is deliberately **no MX and no TXT**: no mailbox on this domain has
ever been created or used, and the site's contact address is `Hola@SpainBcn.com`, on a different
domain. Mail sent to `@erasmusinbarcelona.com` goes nowhere, which is what it did in practice
before as well. If mail is ever wanted, `Domain_Zone_AddTypeMX` and `Domain_Zone_AddTypeTXT`
exist, and whatever gets added belongs in this table.

**Webnode** hosted the old site, the old mail and the domain registration until 22 August 2026.
It is paid up to **September 2026** and can be cancelled after that. Nothing depends on it now.

---

## How to publish

Both routes build from source, run the same guards, and verify the result. Use either.

### Push to GitHub

```bash
git commit -am "…"
git push origin main
```

`.github/workflows/deploy-dinahosting.yml` builds, mirrors over FTPS with `lftp`, checks every
file arrived, then checks the live site. Around nine minutes, most of it upload.

### Or from a terminal

| Command | What it does |
|---|---|
| `bash upload-to-dinahosting.sh` | build, upload, verify |
| `bash upload-to-dinahosting.sh --dry-run` | list what would go, send nothing |
| `bash upload-to-dinahosting.sh --verify-only` | check the live site, upload nothing |

`curl` only, so nothing to install on a Mac. Three or four minutes, and it is the faster route
when something is broken and you want it fixed now.

Either way: **look at the site afterwards.** The checks confirm that pages answer, that the 404
is a real 404, that legacy URLs still land and that the stylesheet arrives whole. They cannot
tell you the price is wrong.

### Refreshing the course weeks, then publishing — the whole loop

The recurring job. `dates` in `src/data/site-data.js` is a snapshot of the DATES-SPAINBCN
sheet's Barcelona rows, and it goes stale: the first listed week ends, the site keeps calling it
upcoming, and eventually the list runs out. `tools/refresh-dates.mjs` re-reads the sheet — the
same one named in `datesSource`, over its public CSV export — keeps the Barcelona weeks that
have not ended, and rewrites the array in place. Nothing else in the file is touched.

From a terminal, start to finish:

Once per machine — the clone, the dev dependencies, and the browser `npm run check` drives.
That last one is a separate download and `npm install` does not imply it:

```bash
git clone https://github.com/RAHV-FB/ErasmusInBarcelona.git ~/ErasmusInBarcelona
cd ~/ErasmusInBarcelona
git checkout main
npm install
npx playwright install chromium
```

Then every refresh, from `~/ErasmusInBarcelona`:

```bash
cd ~/ErasmusInBarcelona
git pull origin main
npm run dates
git diff src/data/site-data.js
npm run check
bash upload-to-dinahosting.sh
git commit -am "Refresh course weeks from the sheet"
git push origin main
```

Line by line: `npm run dates` reads the sheet into `src/data/site-data.js` and prints every week
it wrote; `git diff` is you reading what changed before it ships; `npm run check` opens every
page in a real browser, a minute or two; `upload-to-dinahosting.sh` builds, uploads and verifies.
It asks for the hosting account's FTP password and stores nothing — user `erasmusinbarcelona`,
host `erasmusinbarcelona-com.espacioseguro.com`, both already the script's defaults, so the
password is the only thing typed. The push then publishes the same bytes again through CI, which
is harmless and keeps the repository and the server telling one story; pushing *without* running
the upload script works too, and is just the slower nine-minute route.

Neither block carries a trailing `#` comment, and that is deliberate. macOS ships zsh, and an
interactive zsh does not treat `#` as a comment — it hands the annotation to the command as
arguments, which is how an annotated line becomes `unknown option: #`.

What the script refuses to do, by design: write anything when the sheet has a course label it
does not recognise (add it to `COURSES` in `tools/refresh-dates.mjs` with its subject area),
when a date does not parse, or when no upcoming Barcelona week remains. `npm run dates -- --dry-run`
prints what would be written without touching the file. Rows for the other destinations are
ignored — they are SpainBcn's. If the sheet's sharing is ever tightened off "anyone with the
link", the CSV export stops answering and the script says so; nothing breaks silently.

---

## What is still open

- **Delete the `SITE_CHECK_URL` repository variable.** It was pointing CI's post-deploy check at
  the preview URL during the migration. With the domain live, deleting it makes CI check
  `https://www.erasmusinbarcelona.com` instead.
- **Make the repository private,** as the owner asked. `deploy-pages.yml` has already been
  removed, so nothing will start failing when you do — Pages from a private repository needs a
  paid plan.
- **Cancel Webnode** once September comes round.

Closed 31 August 2026: `main` became the default branch and every `claude/*` branch — each one
verified fully merged — was deleted. `main` is the repository's only branch; everything is
developed on it and deploys from it.

---

## Traps

Every one of these cost real time, and two of them took the site down.

**Varnish terminates TLS, so `%{HTTPS}` is always `off` inside Apache.** A rule that forces HTTPS
by testing `%{HTTPS}` alone redirects every HTTPS request to HTTPS; the proxy forwards plain HTTP
again and the browser stops with `ERR_TOO_MANY_REDIRECTS`. The site is then unreachable, not
merely misconfigured — this happened, minutes after the domain went live. The scheme rule must
also require `%{HTTP:X-Forwarded-Proto} != https`, and the canonical-host rule is kept separate,
because one `RewriteCond` chain cannot express "either of these, but never on the preview host".
A local Apache with no proxy in front cannot reproduce this. Neither can the preview URL, which
is exempt from the rule.

**The FTP host must be `erasmusinbarcelona-com.espacioseguro.com`.** The server presents a
certificate for `*.espacioseguro.com` on port 21. Dial it as `hl1639.dinaserver.com` and a client
that verifies the hostname waits for a handshake that cannot finish — reported as "Timeout
(control socket)", which reads like the server being unreachable when it is answering fine.

**The web root is `~/www/`, not where FTP lands.** FTP and SSH land in the account home, which
also holds `Maildir`, `logs` and the rest of the account. A mirror with `--delete` pointed there
would take all of it. Both deploy paths refuse any target but `www/`.

**Dotfiles are invisible unless you ask for them.** `set ftp:list-options -a` in lftp, or the
server lists no `.htaccess` and no `.nojekyll`, and a completeness check reports two files
missing that are sitting right there.

**Upload one file at a time.** Four in parallel and the host starts refusing data connections
part-way through; files die with "max-retries exceeded" while their neighbours succeed.

**Do not trust lftp's exit code.** It has returned 1 twice after runs whose logs show every file
transferring and no error at all. Both deploy paths verify the result instead — file sizes on the
server, then the site over HTTP.

**The host rate-limits, and answers 429.** A dozen quick requests and it starts refusing, which
looks exactly like a broken page. Both checkers space their requests and wait a 429 out.

**`Redirect` in Apache matches on prefix.** `Redirect 301 /home /` also catches `/home/` and
sends it to `//`. Every legacy redirect uses anchored `RedirectMatch`. Add new ones to
`src/data/redirects.js` and rebuild — never to the server.

**`%{HTTP_HOST}` includes the port**, so the preview-host exemption has to allow for `:8080` or
it silently stops applying.

**404.html is `noindex`, correctly.** A guard that rejects any `noindex` page rejects every
build. The prototype build is identified by its own markers instead: a `robots.txt` that
disallows everything, and a redirecting stub at each legacy path.

**The preview host carries `x-robots-tag: noindex, nofollow`, the live domain does not.**
The hosting adds it to everything served on `*.dinaserver.com`, and nothing in `.htaccess` does
— so before the cutover there was no way to tell whether it followed the preview hostname or
the account. It follows the hostname: checked on 22 August 2026 after go-live,
`https://www.erasmusinbarcelona.com/` returns no `x-robots-tag` and its markup says
`index, follow`. Worth re-checking on the next domain rather than assuming, because the failure
is silent — every build guard passes while the site is invisible.

**macOS zsh does not strip `#` comments, so annotated commands cannot be pasted.** An
interactive zsh treats `#` as an ordinary character unless `interactive_comments` is set, so
pasting `bash upload-to-dinahosting.sh --verify-only  # check the live site` hands the script
five extra arguments and it stops with `unknown option: #`. The same paste through `npm` is
quieter and worse: npm appends them to the script and runs it anyway. Every command block in
these documents is therefore comment-free, and the explanations sit beside them in tables.

**`npm install` does not install the browser.** `npm run check` drives Chromium through
Playwright, and the browser is a separate download: `npx playwright install chromium`, once per
machine. Without it the check stops before it starts, and until recently it did so behind a
Playwright banner wrapped in a Node stack trace. It now says the one line that matters.

**Your browser caches these URLs hard.** Append a query string when checking anything.

---

## How the migration went

Recorded because the same account holds eight other domains, and the next one will hit the same
things.

The site was built and uploaded to the hosting first, and checked on the preview URL, while the
domain still served Webnode. That part was uneventful once the FTPS certificate mismatch was
understood. The registrar transfer from Webnode completed on the morning of 22 August; a registrar
transfer does **not** move DNS, so the nameservers stayed at Register.it until they were changed
explicitly.

The cutover itself was: write the zone, then move the nameservers, then issue the certificate,
then verify — in that order, each step confirmed before the next. The order matters. Nameservers
before the zone would have made dinahosting authoritative for a domain whose records still
pointed at a 2018 parking address. The certificate before DNS cannot validate at all; there is a
2021 failure of exactly that still sitting in this account's notifications.

What went wrong was the thing that could not be tested in advance: DNS propagated in minutes
rather than the expected hour, and the redirect loop described above took the site down until a
corrected `.htaccess` was deployed. If there is a lesson for the next domain, it is that a
staging URL exempt from the canonical redirect cannot exercise the canonical redirect, and the
proxy in front of Apache changes what that rule sees.
