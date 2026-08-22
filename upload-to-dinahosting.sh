#!/usr/bin/env bash
# ============================================================
# Publish erasmusinbarcelona.com to dinahosting, from a terminal.
#
#   bash upload-to-dinahosting.sh              # build, upload, verify
#   bash upload-to-dinahosting.sh --dry-run    # say what would change, touch nothing
#   bash upload-to-dinahosting.sh --verify-only    # check the live site, upload nothing
#   bash upload-to-dinahosting.sh --check-url https://www.erasmusinbarcelona.com
#
# Four stages, stopping at the first failure:
#
#   1. Pre-flight   rebuild from source and run the guards. If either
#                   fails nothing is uploaded, so a stale dist/ can
#                   never reach the server.
#   2. Login        password typed hidden, never stored; TLS on the
#                   control channel; the web root confirmed to exist
#                   before anything is written.
#   3. Upload       every file, then every file's size read back off
#                   the server. Then prune whatever the site no longer
#                   contains.
#   4. Verify       over HTTP, because "the bytes uploaded" is not
#                   "the site works".
#
# curl only — macOS ships it, so there is nothing to install. The
# GitHub Actions workflow does the same job with lftp on every push;
# this is for publishing by hand when that is not what you want.
# ============================================================
set -uo pipefail

FTP_HOST="${FTP_HOST:-erasmusinbarcelona-com.espacioseguro.com}"
FTP_USER="${FTP_USER:-erasmusinbarcelona}"
WEB_ROOT="${WEB_ROOT:-www}"
CHECK_URL="${CHECK_URL:-http://erasmusinbarcelona.hl1639.dinaserver.com}"
DIST="dist"

# Excluded from both upload and prune: the server owns these, and a
# prune that did not know that would delete Let's Encrypt's challenge
# directory mid-issuance.
SERVER_OWNED=("cgi-bin" ".well-known")

DRY_RUN=0
VERIFY_ONLY=0
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift ;;
    --verify-only) VERIFY_ONLY=1; shift ;;
    --check-url) CHECK_URL="$2"; shift 2 ;;
    --host) FTP_HOST="$2"; shift 2 ;;
    --user) FTP_USER="$2"; shift 2 ;;
    -h|--help) sed -n '2,26p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
done

cd "$(dirname "$0")"

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
fail() { printf '\033[31m%s\033[0m\n' "$*" >&2; exit 1; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$*"; }

# ------------------------------------------------------------
# 1. Pre-flight
# ------------------------------------------------------------
bold "1. Building"

if [ "$VERIFY_ONLY" = 1 ]; then
  [ -d "$DIST" ] || fail "$DIST/ does not exist — run without --verify-only first."
  ok "using the existing $DIST/ ($(find "$DIST" -type f | wc -l | tr -d ' ') files)"
fi

if [ "$VERIFY_ONLY" = 0 ]; then
command -v node >/dev/null || fail "node is not installed. The build needs Node 18 or newer."
node build.mjs || fail "build failed"
node tools/build-htaccess.mjs || fail ".htaccess generation failed"

[ -f "$DIST/.htaccess" ] || fail "$DIST/.htaccess is missing — the server would lose its redirects and its 404."
[ -f "$DIST/index.html" ] || fail "$DIST/index.html is missing."

if grep -q '^Disallow: /$' "$DIST/robots.txt"; then
  fail "$DIST/robots.txt disallows everything. This is a PROTOTYPE=1 build; publishing it would remove the site from search results."
fi

stray=$(grep -rl 'content="noindex' "$DIST" --include='*.html' | grep -v "^$DIST/404\.html$" || true)
[ -n "$stray" ] && fail "noindex on pages meant to be indexed:
$stray"

grep -q 'https://www.erasmusinbarcelona.com/' "$DIST/sitemap.xml" \
  || fail "sitemap.xml does not point at the live domain. Check SITE_URL in src/layout.js."

ok "$(find "$DIST" -type f | wc -l | tr -d ' ') files, $(du -sh "$DIST" | cut -f1) — robots.txt allows indexing, only 404.html is noindex"
fi

# ------------------------------------------------------------
# 2. Login
# ------------------------------------------------------------
bold "2. Connecting to $FTP_HOST"

if [ "$VERIFY_ONLY" = 1 ]; then
  ok "skipped — verifying only"
fi

if [ "$DRY_RUN" = 0 ] && [ "$VERIFY_ONLY" = 0 ]; then
  printf 'FTP password for %s: ' "$FTP_USER"
  read -rs FTP_PASS
  printf '\n'
  [ -n "$FTP_PASS" ] || fail "no password given"
else
  FTP_PASS=""
fi

# --ftp-ssl-control encrypts the login and leaves the data channel in
# the clear. The files are a public website, and on this network a
# protected data channel has been seen truncating files at exactly
# 16384 bytes. Stage 3 reads every size back, so if that ever happens
# here it is caught rather than published.
CURL=(curl --silent --show-error --ftp-ssl-control --connect-timeout 20 --max-time 300)
remote_url() { printf 'ftp://%s/%s' "$FTP_HOST" "$1"; }

if [ "$DRY_RUN" = 0 ] && [ "$VERIFY_ONLY" = 0 ]; then
  "${CURL[@]}" --list-only --user "$FTP_USER:$FTP_PASS" "$(remote_url "$WEB_ROOT/")" >/dev/null \
    || fail "could not list $WEB_ROOT/ — wrong password, or the web root is somewhere else.
The FTP user lands in the account home; the web root is one level down, at ~/www/.
Panel → FTP shows the host and the user; reset the password there if you need to."
  ok "logged in, $WEB_ROOT/ is there"
fi

# ------------------------------------------------------------
# 3. Upload, verify, prune
# ------------------------------------------------------------
bold "3. Uploading"

if [ "$VERIFY_ONLY" = 1 ]; then
  ok "skipped — verifying only"
else

( cd "$DIST" && find . -type f | sed 's#^\./##' ) | sort > /tmp/eib-local.txt
count=$(wc -l < /tmp/eib-local.txt | tr -d ' ')

if [ "$DRY_RUN" = 1 ]; then
  echo "  would upload $count files to $FTP_HOST:$WEB_ROOT/"
  sed 's/^/    /' /tmp/eib-local.txt | head -12
  [ "$count" -gt 12 ] && echo "    … and $((count - 12)) more"
  echo
  echo "  dry run — nothing was sent"
  exit 0
fi

printf '  %s files to %s:%s/ — continue? [y/N] ' "$count" "$FTP_HOST" "$WEB_ROOT"
read -r reply
case "$reply" in y|Y|yes|YES) ;; *) fail "stopped" ;; esac

failed=0
n=0
while IFS= read -r rel; do
  n=$((n + 1))
  printf '\r  %d/%d  %-58.58s' "$n" "$count" "$rel"
  attempt=0
  while :; do
    attempt=$((attempt + 1))
    if "${CURL[@]}" --ftp-create-dirs --upload-file "$DIST/$rel" \
         --user "$FTP_USER:$FTP_PASS" "$(remote_url "$WEB_ROOT/$rel")"; then
      break
    fi
    if [ "$attempt" -ge 3 ]; then
      printf '\n'
      echo "  upload failed after 3 attempts: $rel" >&2
      failed=1
      break
    fi
    sleep 3
  done
done < /tmp/eib-local.txt
printf '\r%-72s\r' ''
[ "$failed" = 0 ] || fail "some files did not upload — the site on the server is now part old, part new. Fix the cause and run again."
ok "$count files uploaded"

bold "   Verifying sizes on the server"
mismatch=""
while IFS= read -r rel; do
  want=$(wc -c < "$DIST/$rel" | tr -d ' ')
  got=$("${CURL[@]}" --head --user "$FTP_USER:$FTP_PASS" "$(remote_url "$WEB_ROOT/$rel")" \
        | awk 'tolower($1)=="content-length:"{print $2}' | tr -d '\r')
  if [ "$want" != "${got:-missing}" ]; then
    mismatch="$mismatch
  $rel: server has ${got:-nothing}, should be $want"
    [ "${got:-0}" = "16384" ] && mismatch="$mismatch  ← truncated at 16384; re-run with a protected data channel disabled"
  fi
done < /tmp/eib-local.txt
[ -n "$mismatch" ] && fail "these files are wrong on the server:$mismatch"
ok "every file byte-for-byte the size it should be"

bold "   Pruning what the site no longer contains"
list_remote() {                       # recursive: prints file paths under $1
  local dir="$1" line name
  while IFS= read -r line; do
    name="${line%$'\r'}"
    [ -z "$name" ] && continue
    case "$name" in .|..) continue ;; esac
    if [ -z "$dir" ]; then
      for owned in "${SERVER_OWNED[@]}"; do [ "$name" = "$owned" ] && continue 2; done
    fi
    local path="${dir:+$dir/}$name"
    if "${CURL[@]}" --head --user "$FTP_USER:$FTP_PASS" "$(remote_url "$WEB_ROOT/$path")" \
         | grep -qi '^content-length:'; then
      printf '%s\n' "$path"
    else
      list_remote "$path"
    fi
  done < <("${CURL[@]}" --list-only --user "$FTP_USER:$FTP_PASS" "$(remote_url "$WEB_ROOT/${dir:+$dir/}")")
}

if ! list_remote "" | sort > /tmp/eib-remote.txt; then
  fail "could not list the server. Not printing an all-clear over a directory I could not read."
fi
[ -s /tmp/eib-remote.txt ] || fail "the server listing came back empty, which cannot be right after an upload."

stale=$(comm -13 /tmp/eib-local.txt /tmp/eib-remote.txt)
if [ -n "$stale" ]; then
  echo "$stale" | while IFS= read -r rel; do
    [ -z "$rel" ] && continue
    echo "    deleting $rel"
    "${CURL[@]}" --user "$FTP_USER:$FTP_PASS" --quote "DELE $WEB_ROOT/$rel" \
      "$(remote_url "$WEB_ROOT/")" >/dev/null || echo "    could not delete $rel" >&2
  done
else
  ok "nothing stale"
fi

fi   # end of upload stage

# ------------------------------------------------------------
# 4. Live verification
# ------------------------------------------------------------
bold "4. Checking $CHECK_URL"

# The host rate-limits. A fast run of requests starts coming back 429,
# which is this script being impatient rather than the site being
# wrong, so a 429 is waited out rather than believed.
http() {
  local i out
  for i in 1 2 3 4; do
    out=$(curl -s -o /dev/null -w '%{http_code}' --max-time 30 "$1")
    [ "$out" = "429" ] || { printf '%s' "$out"; return; }
    sleep 20
  done
  printf '%s' "$out"
}

loc() {
  local i headers out
  for i in 1 2 3 4; do
    headers=$(curl -sI --max-time 30 "$1")
    out=$(printf '%s' "$headers" | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r')
    printf '%s' "$headers" | grep -qi '^HTTP/[0-9.]* 429' || { printf '%s' "$out"; return; }
    sleep 20
  done
  printf '%s' "$out"
}

bad=0
for path in / /join-a-course/ /dates/ /contact/ /your-week/ /about/ /barcelona/ /bring-a-group/ /plan-a-mobility/ /privacy/ /cookies/; do
  code=$(http "$CHECK_URL$path")
  [ "$code" = "200" ] && ok "200 $path" || { echo "  ✗ $code $path"; bad=1; }
  sleep 2
done

code=$(http "$CHECK_URL/no-such-page/")
[ "$code" = "404" ] && ok "404 on a page that does not exist" || { echo "  ✗ /no-such-page/ answered $code, should be 404"; bad=1; }

for pair in /about-us/:/about/ /program-information/:/your-week/ /we-come-to-you/:/plan-a-mobility/ /currently-open-dates/:/dates/; do
  from="${pair%%:*}"; to="${pair##*:}"
  where=$(loc "$CHECK_URL$from")
  case "$where" in
    *"$to") ok "$from → $to" ;;
    *) echo "  ✗ $from went to '${where:-nowhere}', should be $to"; bad=1 ;;
  esac
  sleep 2
done

size=$(curl -s --max-time 30 "$CHECK_URL/assets/css/site.css" | wc -c | tr -d ' ')
want=$(wc -c < "$DIST/assets/css/site.css" | tr -d ' ')
[ "$size" = "$want" ] && ok "site.css served whole ($want bytes)" || { echo "  ✗ site.css served $size bytes, built $want"; bad=1; }

echo
[ "$bad" = 0 ] && bold "Published. $CHECK_URL is serving this build." \
               || fail "Uploaded, but the site is not answering correctly. Do not leave it like this."
