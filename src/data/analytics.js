// ============================================================
// Analytics configuration — the one place it is set.
//
// The organisation already uses Umami Cloud (cloud.umami.is) for
// spainbcn.com. This site needs its OWN website in the same Umami
// account: reusing another site's id would mix the two together.
//
//   Umami → Settings → Websites → Add website
//     Name:   Erasmus in Barcelona
//     Domain: erasmusinbarcelona.com
//   then copy the Website ID it gives you.
//
// Supply it to the build as UMAMI_WEBSITE_ID. Without it the build
// prints a notice and ships no tracker at all — the site never
// guesses an id.
//
// Everything here is checked against the tracker actually served
// from cloud.umami.is, which reads: website-id, host-url,
// exclude-search, exclude-hash, do-not-track, domains, tag,
// auto-track, before-send, fetch-credentials, performance.
// ============================================================

export const analytics = {
  provider: 'Umami Cloud',
  operator: 'Umami Software, Inc.',
  scriptUrl: 'https://cloud.umami.is/script.js',

  // Where the tracker posts its data. The script's own default, stated
  // here so the privacy policy can name it without guessing.
  collector: 'https://gateway.umami.is/api/send',

  websiteId: process.env.UMAMI_WEBSITE_ID || '',

  // Only these hosts report. Anything else — a preview build, a fork,
  // localhost — loads the script and sends nothing. UMAMI_DOMAINS exists so
  // a local build can be pointed at a test host to inspect the payload.
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
  data-domains="${analytics.domains}"
  data-exclude-search="true"
  data-exclude-hash="true"
  data-do-not-track="true"></script>`;
}
