// ============================================================
// Analytics configuration — the one place it is set.
//
// The organisation's Umami Cloud account is in Umami's EU region, so
// this site is served the EU tracker and reports to the EU endpoint.
// That last part is not automatic: the script's own default collector
// is gateway.umami.is whichever host it was loaded from, so data-host-url
// has to name the EU endpoint explicitly. Checked by reading the served
// script, which resolves the collector as
//   (data-host-url || "https://gateway.umami.is") + "/api/send"
// and by posting to https://eu.umami.is/api/send, which accepts this
// website id. Umami's own FAQ states its cloud servers are in the US
// and the EU.
//
// Everything here is checked against the tracker actually served from
// eu.umami.is, which reads: website-id, host-url, exclude-search,
// exclude-hash, do-not-track, domains, tag, auto-track, before-send,
// fetch-credentials, performance. data-domains is an allowlist on
// sending, not just on counting: with it set, the script returns early
// and posts nothing from any other hostname.
// ============================================================

export const analytics = {
  provider: 'Umami Cloud',
  operator: 'Umami Software, Inc.',
  region: 'EU',

  scriptUrl: 'https://eu.umami.is/script.js',

  // Where the tracker posts. Sent as data-host-url, because the script
  // would otherwise fall back to its US-facing default.
  hostUrl: 'https://eu.umami.is',
  collector: 'https://eu.umami.is/api/send',

  // Public: it appears in the markup of every page. UMAMI_WEBSITE_ID
  // overrides it so a test build can report somewhere else.
  websiteId: process.env.UMAMI_WEBSITE_ID || 'f9c5e5d1-589b-49ca-8ca5-80758bfbef10',

  // Only these hosts report. Anything else — the GitHub Pages prototype, a
  // fork, localhost — loads the script and sends nothing.
  domains: process.env.UMAMI_DOMAINS || 'erasmusinbarcelona.com,www.erasmusinbarcelona.com',

  // The group planner carries its answers to /contact/ in the query
  // string, so query strings and fragments must never be recorded.
  excludeSearch: true,
  excludeHash: true,
  respectDoNotTrack: true,
};

/** The tracker tag, or '' when no website id is configured. */
export function analyticsTag() {
  if (!analytics.websiteId) return '';
  return `<script defer src="${analytics.scriptUrl}"
  data-website-id="${analytics.websiteId}"
  data-host-url="${analytics.hostUrl}"
  data-domains="${analytics.domains}"
  data-exclude-search="true"
  data-exclude-hash="true"
  data-do-not-track="true"></script>`;
}
