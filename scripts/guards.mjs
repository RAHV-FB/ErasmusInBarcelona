// ============================================================
// Static invariants over dist/. Run after a build; exits 1 on the
// first class of violation found.
//
// Two audits converged on this file. Sections 1-5 are the migration
// invariants: nothing from the previous site, no internal link to a
// legacy path, a coherent redirect table, a sitemap matching the
// build. Sections 6-9 are the publishing invariants: the build is not
// a prototype, the generated .htaccess agrees with redirects.js and
// keeps the two rules the live site depends on, the course dates are
// not stale, and no fact is typed into a template.
//
// These encode what the 2026-08-22 migration audit established must
// never come back:
//   - values from the previous site (the old OID, the old PIC label,
//     the old fees, the Webnode runtime and its CDN, Google tag
//     managers, the old certificate name);
//   - a page slipping out of the one-source-of-truth architecture
//     (an internal link to a legacy path, a sitemap entry that is not
//     a built page, a redirect that chains into another redirect).
//
// `npm run build` first; then `node scripts/guards.mjs`.
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REDIRECTS, GONE } from '../src/data/redirects.js';
import * as data from '../src/data/site-data.js';
import * as practical from '../src/data/barcelona-practical.js';
import { SITE_URL } from '../src/layout.js';

const { organisation } = data;

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
if (!fs.existsSync(DIST)) {
  console.error('guards: dist/ does not exist — run `npm run build` first.');
  process.exit(1);
}

const failures = [];

// Every built HTML file, and the text sidecars that carry facts.
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(html|txt|xml)$/.test(entry.name)) files.push(p);
  }
})(DIST);

// ------------------------------------------------------------
// 1. Nothing from the previous site may ever be published again.
//    The old OID and the mislabelled "PIC" phone number, the old
//    €350/€700/€800 fees, the Webnode runtime and CDN, tag managers,
//    the old certificate name, and 2025 course years.
// ------------------------------------------------------------
const FORBIDDEN = [
  'E10139423',
  '933769240',
  '€350', '350€', '€700', '700€', '€800', '800€',
  'clvaw-cdnwnd', 'cdnwnd.com', 'webnode',
  'googletagmanager', 'google-analytics.com', 'gtag(',
  'Certificate of Participation',
  '2025',
];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const bad of FORBIDDEN) {
    if (text.toLowerCase().includes(bad.toLowerCase())) {
      failures.push(`${path.relative(ROOT, file)}: contains forbidden "${bad}"`);
    }
  }
}

// ------------------------------------------------------------
// 2. The current OID appears on every page (the footer carries it),
//    and no page carries any other OID-shaped identifier.
// ------------------------------------------------------------
const pages = files.filter((f) => f.endsWith('.html'));
for (const file of pages) {
  const text = fs.readFileSync(file, 'utf8');
  const oids = [...new Set(text.match(/E10\d{6}/g) || [])];
  if (!oids.includes(organisation.oid)) {
    failures.push(`${path.relative(ROOT, file)}: current OID ${organisation.oid} missing`);
  }
  for (const oid of oids) {
    if (oid !== organisation.oid) {
      failures.push(`${path.relative(ROOT, file)}: unexpected OID ${oid}`);
    }
  }
}

// ------------------------------------------------------------
// 3. The redirect table stays coherent: every target is a built page
//    (plus an optional fragment), never another redirect, never a
//    gone path — one hop, no chains, no dead ends.
// ------------------------------------------------------------
const routes = new Set(['/']);
(function routesOf(dir, prefix) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const route = `${prefix}${entry.name}/`;
    if (fs.existsSync(path.join(dir, entry.name, 'index.html'))) routes.add(route);
    routesOf(path.join(dir, entry.name), route);
  }
})(DIST, '/');

for (const [from, to] of Object.entries(REDIRECTS)) {
  const target = to.split('#')[0];
  if (!routes.has(target)) failures.push(`redirect ${from} → ${to}: target is not a built page`);
  if (REDIRECTS[target]) failures.push(`redirect ${from} → ${to}: target is itself a redirect`);
  if (GONE.includes(target)) failures.push(`redirect ${from} → ${to}: target is gone`);
}
for (const p of GONE) {
  if (REDIRECTS[p]) failures.push(`${p} is both a redirect and gone`);
  if (routes.has(p)) failures.push(`${p} is marked gone but a page is built there`);
}

// ------------------------------------------------------------
// 4. No page links to a legacy path: after the migration, internal
//    links go straight to the destination, never through a redirect.
// ------------------------------------------------------------
const legacy = new Set([...Object.keys(REDIRECTS), ...GONE]);
for (const file of pages) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/(?:href|src)="([^"]*)"/g)) {
    const url = m[1];
    if (!url.startsWith('/')) continue;
    const pathname = url.split(/[?#]/)[0];
    if (legacy.has(pathname) || legacy.has(pathname.replace(/\/$/, ''))) {
      failures.push(`${path.relative(ROOT, file)}: internal link to legacy path ${url}`);
    }
  }
}

// ------------------------------------------------------------
// 5. The sitemap lists exactly the indexable built pages: every <loc>
//    is a built route, and no route with an index,follow page is
//    missing from it.
// ------------------------------------------------------------
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const siteUrl = locs.length ? new URL(locs[0]).origin : '';
for (const loc of locs) {
  const route = loc.slice(siteUrl.length);
  if (!routes.has(route)) failures.push(`sitemap lists ${loc}, which is not a built page`);
  const file = path.join(DIST, route.slice(1), 'index.html');
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8').includes('content="noindex')) {
    failures.push(`sitemap lists ${loc}, which is noindex`);
  }
}
for (const route of routes) {
  const file = path.join(DIST, route === '/' ? 'index.html' : route.slice(1) + '/index.html');
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('content="noindex')) continue;
  if (!locs.some((l) => l.endsWith(route))) failures.push(`built page ${route} is missing from the sitemap`);
}

// ------------------------------------------------------------
// 6. A prototype build must never be published.
//
//    PROTOTYPE=1 produces a robots.txt that disallows everything and a
//    noindex stub at each legacy path. Publishing one would take the
//    site out of the index, so both markers are checked independently.
//    404.html carries noindex in every build, correctly, and is the one
//    exception.
// ------------------------------------------------------------
const robots = path.join(DIST, 'robots.txt');
if (fs.existsSync(robots) && /^Disallow: \/$/m.test(fs.readFileSync(robots, 'utf8'))) {
  failures.push('robots.txt disallows everything — this is a PROTOTYPE=1 build');
}
for (const file of pages) {
  if (path.relative(DIST, file) === '404.html') continue;
  if (fs.readFileSync(file, 'utf8').includes('content="noindex')) {
    failures.push(`${path.relative(ROOT, file)}: noindex on a page meant to be indexed`);
  }
}

// ------------------------------------------------------------
// 7. The generated .htaccess, which nothing else exercises.
//
//    `npm run check` tests server.mjs, a JavaScript reimplementation of
//    the same table, so the Apache configuration that actually runs is
//    only ever seen in production. Three things are read back out of it.
//
//    Every redirect target must be absolute and https. Varnish
//    terminates TLS in front of Apache, so Apache expands a relative
//    target against http:// — every legacy URL then bounced
//    https → http → https, two hops with an insecure middle. Measured
//    on the live site on 22 August 2026, before it was fixed.
//
//    The scheme rule must consult X-Forwarded-Proto and not %{HTTPS}
//    alone, for the same reason and with a worse failure: %{HTTPS} is
//    always "off" behind the proxy, so testing it alone redirects https
//    to https for ever. ERR_TOO_MANY_REDIRECTS, and a site that is
//    unreachable rather than merely wrong. That happened, minutes after
//    the domain went live.
//
//    And both rules must keep exempting the preview host, or a build
//    checked there bounces to the live domain and tests nothing.
// ------------------------------------------------------------
const htaccessPath = path.join(DIST, '.htaccess');
if (!fs.existsSync(htaccessPath)) {
  failures.push('dist/.htaccess is missing — run `node tools/build-htaccess.mjs`');
} else {
  const htaccess = fs.readFileSync(htaccessPath, 'utf8');
  const origin = new URL(SITE_URL).origin;

  // RewriteRule ^path$ https://origin/target [flags]
  const rules = new Map(
    [...htaccess.matchAll(/RewriteRule \^(\S+)\$\s+(\S+)\s+\[([^\]]*)\]/g)]
      .map((m) => [`/${m[1].replace(/\\/g, '')}`, { target: m[2], flags: m[3] }]),
  );

  for (const [from, to] of Object.entries(REDIRECTS)) {
    const rule = rules.get(from);
    if (!rule) { failures.push(`redirect missing from .htaccess: ${from}`); continue; }
    if (!rule.target.startsWith(`${origin}/`)) {
      failures.push(`.htaccess sends ${from} to "${rule.target}" — it must be absolute and start `
        + `${origin}/, or Apache answers with an http:// Location behind Varnish and every `
        + 'legacy URL takes two hops');
    } else if (rule.target.slice(origin.length) !== to) {
      failures.push(`.htaccess sends ${from} to ${rule.target.slice(origin.length)}, `
        + `redirects.js says ${to}`);
    }
    // A # in a target is escaped to %23 without NE, and Apache appends
    // the query string after the fragment without QSD.
    if (to.includes('#')) {
      for (const flag of ['NE', 'QSD']) {
        if (!rule.flags.split(',').includes(flag)) {
          failures.push(`.htaccess rule for ${from} targets a #fragment without the ${flag} flag`);
        }
      }
    }
  }

  const lines = htaccess.split('\n');
  const scheme = lines.findIndex((l) => /RewriteCond\s+%\{HTTPS\}/.test(l));
  if (scheme === -1) {
    failures.push('.htaccess has no scheme rule — the canonical redirect to HTTPS is missing');
  } else {
    const rest = lines.slice(scheme + 1);
    const chain = rest.slice(0, rest.findIndex((l) => /RewriteRule/.test(l)) + 1);
    if (!chain.some((l) => /X-Forwarded-Proto/i.test(l))) {
      failures.push('.htaccess forces HTTPS on %{HTTPS} alone, with no X-Forwarded-Proto '
        + 'condition — behind Varnish that redirects https to https for ever and the site '
        + 'becomes unreachable');
    }
  }

  const exemptions = lines.filter((l) => /^\s*RewriteCond/.test(l) && /dinaserver/i.test(l)).length;
  if (exemptions < 2) {
    failures.push(`the *.dinaserver.com preview host is exempted in ${exemptions} RewriteCond `
      + 'line(s), not 2 — both the scheme rule and the canonical-host rule need it');
  }
}

// ------------------------------------------------------------
// 8. Course weeks that have already happened.
//
//    `dates` is a hand export from the DATES-SPAINBCN sheet and no page
//    compares a row against today, so a stale export does not look
//    stale: the home page goes on calling a week that has been and gone
//    "upcoming". Nothing else in the repository would catch it.
//
//    ALLOW_STALE_DATES=1 publishes anyway, for an urgent fix that has
//    nothing to do with the dates. It is deliberately something you
//    have to type.
// ------------------------------------------------------------
{
  const today = new Date().toISOString().slice(0, 10);
  const past = data.weeks.filter((w) => w.end < today);
  const future = data.weeks.filter((w) => w.end >= today);

  if (past.length) {
    const list = past.map((w) => `${w.label} ${w.month}`.trim()).join(', ');
    const message = `${past.length} course week(s) already over, still listed as upcoming: `
      + `${list} — re-export the Barcelona rows from ${data.datesSource.sheet} into \`dates\` `
      + 'in src/data/site-data.js (ALLOW_STALE_DATES=1 publishes regardless)';
    if (process.env.ALLOW_STALE_DATES === '1') console.warn(`guards: warning — ${message}`);
    else failures.push(message);
  }
  if (!future.length && !past.length) failures.push('`dates` is empty — the site offers no weeks');
  else if (future.length && future.length < 3) {
    console.warn(`guards: warning — only ${future.length} course week(s) left in the future`);
  }
}

// ------------------------------------------------------------
// 9. A fact typed into a template instead of read from src/data/.
//
//    The rule the repository rests on. A figure copied into a template
//    does not look wrong — it looks right, until the data changes and
//    the copy does not. The values come from the data itself, so this
//    cannot fall behind what it is guarding.
// ------------------------------------------------------------
{
  const facts = [
    ['pricing.barcelona.hours20', String(data.pricing.barcelona.hours20)],
    ['pricing.barcelona.hours25', String(data.pricing.barcelona.hours25)],
    ['organisation.founded', String(organisation.founded)],
    ['organisation.oid', organisation.oid],
    ['organisation.nif', organisation.nif],
    ['reviews.rating', data.reviews.rating],
    ['reviews.count', String(data.reviews.count)],
    ['contact.email', data.contact.email],
    ['contact.phone', data.contact.phone],
    ['contact.street', data.contact.street],
    ['contact.postcode', data.contact.postcode],
    ['AIRPORT_FARE', practical.AIRPORT_FARE],
    ...practical.tickets.map((t) => [`tickets.${t.id}.price`, t.price]),
  ].filter(([, v]) => v && !/^(From |Around |Set by)/.test(v));

  const templates = [
    ...fs.readdirSync(path.join(ROOT, 'src/pages')).map((f) => `src/pages/${f}`),
    'src/layout.js',
  ].filter((f) => f.endsWith('.js'));

  for (const rel of templates) {
    fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n').forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;      // a comment may name a value
      for (const [field, value] of facts) {
        const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = /^[\w.]+$/.test(value) ? `\\b${escaped}\\b` : escaped;
        if (new RegExp(pattern).test(line)) {
          failures.push(`${rel}:${i + 1} has "${value}" typed in — it is ${field}, `
            + 'render it from the data');
        }
      }
    });
  }
}

// ------------------------------------------------------------
// Report.
// ------------------------------------------------------------
if (failures.length) {
  console.error(`guards: ${failures.length} violation${failures.length === 1 ? '' : 's'}\n`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log(`guards: ${pages.length} pages clean — no legacy values, no legacy links, ` +
  `${Object.keys(REDIRECTS).length} redirects coherent, sitemap matches the build`);
