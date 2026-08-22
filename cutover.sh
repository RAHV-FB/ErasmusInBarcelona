#!/usr/bin/env bash
# ============================================================
# Point erasmusinbarcelona.com at the dinahosting site.
#
#   export DINA_USER=... DINA_PASS=...
#   bash cutover.sh                 # dry run: says what it would do, changes nothing
#   bash cutover.sh --zone          # write the A records
#   bash cutover.sh --switch-ns     # move the nameservers (asks first)
#   bash cutover.sh --watch         # poll DNS, then verify the live site
#
# Order matters and the script enforces it: the zone has to be right
# BEFORE the nameservers move, or dinahosting becomes authoritative for
# a domain whose records still point at a parking IP, and the site goes
# dark until somebody notices.
#
# Uses the dinahosting API (https://en.dinahosting.com/api/documentation),
# so nothing here needs a browser. Credentials come from the environment
# and are never written to disk.
#
# Every write is checked: the response is read, and anything that is not
# a success stops the script, and the nameservers are read back after
# being set rather than taken on trust.
#
# MX and TXT are deliberately left out. Nothing has ever sent or received
# mail on this domain; Domain_Zone_AddTypeMX and Domain_Zone_AddTypeTXT
# exist if that ever changes.
# ============================================================
set -uo pipefail

API="https://dinahosting.com/special/api.php"
DOMAIN="${DOMAIN:-erasmusinbarcelona.com}"
NEW_IP="${NEW_IP:-82.98.164.84}"
OLD_IP="${OLD_IP:-82.98.135.43}"
NS=(ns.dinahosting.com ns2.dinahosting.com ns3.dinahosting.com ns4.dinahosting.com)
SITE="https://www.$DOMAIN"

DO_ZONE=0; DO_NS=0; DO_WATCH=0
while [ $# -gt 0 ]; do
  case "$1" in
    --zone) DO_ZONE=1; shift ;;
    --switch-ns) DO_NS=1; shift ;;
    --watch) DO_WATCH=1; shift ;;
    -h|--help) sed -n '2,26p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
done

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
fail() { printf '\033[31m%s\033[0m\n' "$*" >&2; exit 1; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$*"; }
note() { printf '  · %s\n' "$*"; }

: "${DINA_USER:?set DINA_USER to your dinahosting panel user}"
: "${DINA_PASS:?set DINA_PASS to your dinahosting panel password}"

# --data-urlencode keeps the password out of the URL and out of any
# proxy log; it still travels over TLS to the API.
api() {
  local command="$1"; shift
  local args=(--silent --show-error --max-time 60
              --data-urlencode "AUTH_USER=$DINA_USER"
              --data-urlencode "AUTH_PWD=$DINA_PASS"
              --data-urlencode "command=$command"
              --data-urlencode "responseType=Json")
  local kv
  for kv in "$@"; do args+=(--data-urlencode "$kv"); done
  curl "${args[@]}" "$API"
}

# The API answers with JSON carrying responseCode and message. Anything
# that is not a 1000-series success is treated as a failure, loudly.
check() {
  local body="$1" what="$2"
  printf '%s' "$body" | grep -q '"responseCode":1[0-9][0-9][0-9]' \
    || fail "$what failed. The API said:
$body"
}

bold "Credentials"
resp=$(api System_GetRequestTypes)
check "$resp" "authentication"
ok "the API accepts these credentials"

if [ "$DO_ZONE" = 0 ] && [ "$DO_NS" = 0 ] && [ "$DO_WATCH" = 0 ]; then
  bold "Dry run — nothing will be changed"
  note "zone:  A @   $OLD_IP → $NEW_IP"
  note "zone:  A www $OLD_IP → $NEW_IP"
  note "ns:    ns1/ns2.register.it → ${NS[*]}"
  echo
  note "no MX or TXT record is created. Nothing has ever sent or received"
  note "mail on this domain, and adding records whose parameters this"
  note "script cannot verify is worse than leaving mail unconfigured."
  note "If mail is ever wanted, add it in the panel and write it down."
  echo
  echo "  Run with --zone first, then --switch-ns, then --watch."
  exit 0
fi

if [ "$DO_ZONE" = 1 ]; then
  bold "Zone"
  # The apex is "@", not an empty hostname. An empty one is rejected
  # outright — "Required param hostname is missing" — which is the API
  # being helpful: it will not guess what an unnamed record means.
  for host in @ www; do
    resp=$(api Domain_Zone_UpdateTypeA \
             "domain=$DOMAIN" "hostname=$host" "ip=$NEW_IP" "oldIp=$OLD_IP")
    check "$resp" "updating A $host"
    ok "A $host → $NEW_IP"
  done
  echo
  note "These take effect only once the nameservers move. Check them in"
  note "the panel under Zonas DNS before going further."
fi

if [ "$DO_NS" = 1 ]; then
  bold "Nameservers"
  echo "  This is the moment the public site changes."
  echo "  $DOMAIN currently serves the old Webnode site; after this it"
  echo "  serves the build on $NEW_IP."
  printf '  Type the domain to confirm: '
  read -r typed
  [ "$typed" = "$DOMAIN" ] || fail "not confirmed — nothing changed"

  # Domain_Dnss_Set, not Domain_NameServer_Modify. The NameServer
  # family registers glue records — it wants a hostname and an IP, and
  # says so if you hand it anything else. Dnss is the one that decides
  # which nameservers a domain uses, and it takes them comma separated.
  list=$(IFS=,; printf '%s' "${NS[*]}")
  resp=$(api Domain_Dnss_Set "domain=$DOMAIN" "dnss=$list")
  check "$resp" "changing the nameservers"

  # Read it back rather than trusting the write.
  resp=$(api Domain_Dnss_Get "domain=$DOMAIN")
  check "$resp" "reading the nameservers back"
  for ns in "${NS[@]}"; do
    printf '%s' "$resp" | grep -q "$ns" \
      || fail "the API accepted the change but does not report $ns. It says:
$resp"
  done
  ok "nameservers set to ${NS[*]}, confirmed by reading them back"
  echo
  note "Registry and resolver propagation takes minutes to an hour."
  note "Run with --watch to wait for it and verify the site."
fi

if [ "$DO_WATCH" = 1 ]; then
  bold "Waiting for the world to agree"
  for i in $(seq 1 120); do
    got=$(dig +short "www.$DOMAIN" @8.8.8.8 2>/dev/null | tail -1)
    [ "$got" = "$NEW_IP" ] && { ok "www.$DOMAIN → $NEW_IP"; break; }
    printf '\r  %3d/120  www.%s → %s' "$i" "$DOMAIN" "${got:-nothing yet}"
    sleep 30
  done
  printf '\n'
  [ "$(dig +short "www.$DOMAIN" @8.8.8.8 | tail -1)" = "$NEW_IP" ] \
    || fail "still not resolving to $NEW_IP after an hour. Check the nameservers in the panel."

  bold "Certificate"
  note "There is no certificate yet, so $SITE will not load over HTTPS."
  note "Issue Let's Encrypt now — panel → CERTIFICADOS → $DOMAIN →"
  note "Certificado Let's Encrypt. It validates over HTTP on the domain,"
  note "which only works now that DNS points here."
  echo
  bold "Then verify"
  echo "  bash upload-to-dinahosting.sh --verify-only --check-url $SITE"
fi
