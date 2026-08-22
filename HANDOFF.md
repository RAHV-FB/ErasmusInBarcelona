# ErasmusInBarcelona.com — how it is set up, and how to publish

**Live at <https://www.erasmusinbarcelona.com> since 22 August 2026.** Valid certificate, every
page answering, legacy URLs redirecting, the old Webnode site no longer in the path.

This document is what the site *is*. [PUBLISHING.md](PUBLISHING.md) is how to work on it from a
terminal, and [README.md](README.md) is how the site is built from source.

> **One outstanding risk: the registrant contact may still be unverified.** After the transfer,
> dinahosting warned "Dominio pendiente de verificar el contacto registrante" and named
> **spainbcnmiriam@gmail.com**. ICANN requires suspension if that email is never acted on, and a
> suspended domain is down no matter how correct everything else is. Check from a terminal:
>
> ```bash
> curl -sS https://dinahosting.com/special/api.php \
>   --data-urlencode "AUTH_USER=$DINA_USER" --data-urlencode "AUTH_PWD=$DINA_PASS" \
>   --data-urlencode "command=Domain_Contacts_GetRegistrantVerificationInfo" \
>   --data-urlencode "domain=erasmusinbarcelona.com" \
>   --data-urlencode "responseType=Json"
> ```

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
git push origin claude/site-health-check-df5ie0
```

`.github/workflows/deploy-dinahosting.yml` builds, mirrors over FTPS with `lftp`, checks every
file arrived, then checks the live site. Around nine minutes, most of it upload.

### Or from a terminal

```bash
bash upload-to-dinahosting.sh                # build, upload, verify
bash upload-to-dinahosting.sh --dry-run      # list what would go, send nothing
bash upload-to-dinahosting.sh --verify-only  # check the live site, upload nothing
```

`curl` only, so nothing to install on a Mac. Three or four minutes, and it is the faster route
when something is broken and you want it fixed now.

Either way: **look at the site afterwards.** The checks confirm that pages answer, that the 404
is a real 404, that legacy URLs still land and that the stylesheet arrives whole. They cannot
tell you the price is wrong.

---

## What is still open

- **Delete the `SITE_CHECK_URL` repository variable.** It was pointing CI's post-deploy check at
  the preview URL during the migration. With the domain live, deleting it makes CI check
  `https://www.erasmusinbarcelona.com` instead.
- **Make the repository private,** as the owner asked. `deploy-pages.yml` has already been
  removed, so nothing will start failing when you do — Pages from a private repository needs a
  paid plan.
- **Cancel Webnode** once September comes round.
- **Consider renaming the default branch to `main`.** The deploy workflow already triggers on
  both names.

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
