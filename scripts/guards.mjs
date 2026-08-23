// ============================================================
// Publish guards — everything that must be true before a build
// reaches the server, in one place.
//
//   node scripts/guards.mjs                 check dist/ and src/
//   node scripts/guards.mjs --source-only   check src/ only, no build needed
//
// Both deploy paths ran their own copy of these in bash: the same
// prototype and sitemap checks written twice, in two languages, free to
// drift apart. They call this instead, so there is one definition and
// adding a guard means adding it once.
//
// It uses nothing but Node's own modules, so CI and the deploy can run
// it without installing anything.
//
// A guard belongs here when publishing without it would put something
// wrong in front of a visitor and no other check would notice. It does
// not belong here if a browser is needed to see it — that is
// `npm run check`.
//
// The 2026-08-22 migration audit added its invariants here too: nothing
// from the previous site may ever be published again, and no page may
// slip out of the one-source-of-truth architecture.
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REDIRECTS, GONE } from '../src/data/redirects.js';
import * as data from '../src/data/site-data.js';
import * as practical from '../src/data/barcelona-practical.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SOURCE_ONLY = process.argv.includes('--source-only');
const LIVE_ORIGIN = 'https://www.erasmusinbarcelona.com';

const problems = [];
const warnings = [];
const fail = (m) => problems.push(m);
const warn = (m) => warnings.push(m);
const read = (rel) => fs.readFileSync(path.join(DIST, rel), 'utf8');
const has = (rel) => fs.existsSync(path.join(DIST, rel));

// ------------------------------------------------------------
// Everything the site cannot be served without.
// ------------------------------------------------------------
const REQUIRED = ['index.html', '404.html', 'robots.txt', 'sitemap.xml',
  'assets/css/site.css', 'assets/js/site.js', '.htaccess'];

if (!SOURCE_ONLY) {
  if (!fs.existsSync(DIST)) {
    fail('dist/ does not exist. Run `npm run build:live` first.');
  } else {
    for (const f of REQUIRED) if (!has(f)) fail(`missing from the build: ${f}`);
  }
}

const buildable = !SOURCE_ONLY && has('index.html') && has('sitemap.xml');

// ------------------------------------------------------------
// A prototype build must never be published.
//
// PROTOTYPE=1 produces a robots.txt that disallows everything and a
// noindex stub at each legacy path. Publishing one would take the site
// out of the index, so both markers are checked independently. 404.html
// carries noindex in every build, correctly, and is the one exception.
// ------------------------------------------------------------
const htmlFiles = [];
if (buildable) {
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) htmlFiles.push(p);
    }
  }(DIST));

  if (/^Disallow: \/$/m.test(read('robots.txt'))) {
    fail('robots.txt disallows everything — this is a PROTOTYPE=1 build.');
  }

  const stray = htmlFiles
    .filter((f) => path.relative(DIST, f) !== '404.html')
    .filter((f) => fs.readFileSync(f, 'utf8').includes('content="noindex'))
    .map((f) => path.relative(DIST, f));
  if (stray.length) fail(`noindex on pages meant to be indexed: ${stray.join(', ')}`);
}

// ------------------------------------------------------------
// Nothing from the previous site may ever be published again: the old
// OID and the mislabelled "PIC" phone number, the old €350/€700/€800
// fees, the Webnode runtime and its CDN, tag managers, the old
// certificate name, and 2025 course years. Scanned in every text file
// the build ships, not only HTML — llms.txt and the sitemap carry
// facts too.
// ------------------------------------------------------------
if (buildable) {
  const FORBIDDEN = [
    'E10139423',
    '933769240',
    '€350', '350€', '€700', '700€', '€800', '800€',
    'clvaw-cdnwnd', 'cdnwnd.com', 'webnode',
    'googletagmanager', 'google-analytics.com', 'gtag(',
    'Certificate of Participation',
    '2025',
  ];
  const textFiles = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(html|txt|xml)$/.test(e.name)) textFiles.push(p);
    }
  }(DIST));
  for (const file of textFiles) {
    const text = fs.readFileSync(file, 'utf8').toLowerCase();
    for (const bad of FORBIDDEN) {
      if (text.includes(bad.toLowerCase())) {
        fail(`${path.relative(DIST, file)} contains forbidden "${bad}" — a value from the previous site.`);
      }
    }
  }

  // The current OID is on every page (the footer carries it), and no
  // page carries any other OID-shaped identifier.
  for (const file of htmlFiles) {
    const text = fs.readFileSync(file, 'utf8');
    const oids = [...new Set(text.match(/E10\d{6}/g) || [])];
    if (!oids.includes(data.organisation.oid)) {
      fail(`${path.relative(DIST, file)}: current OID ${data.organisation.oid} missing`);
    }
    for (const oid of oids) {
      if (oid !== data.organisation.oid) fail(`${path.relative(DIST, file)}: unexpected OID ${oid}`);
    }
  }
}

// ------------------------------------------------------------
// The sitemap has to name the live origin, and list every page that
// was built — no more and no less. A page missing from it is a page
// that does not get crawled; a URL in it that was not built is a 404
// offered to Google.
// ------------------------------------------------------------
if (buildable) {
  const sitemap = read('sitemap.xml');
  if (!sitemap.includes(`${LIVE_ORIGIN}/`)) {
    fail(`sitemap.xml does not point at ${LIVE_ORIGIN}. Check SITE_URL in src/layout.js.`);
  }

  const built = [];
  (function walk(dir, base = '') {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(dir, e.name), `${base}/${e.name}`);
      else if (e.name === 'index.html') built.push(`${base}/`);
    }
  }(DIST));

  const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => { try { return new URL(m[1]).pathname; } catch { return m[1]; } });

  for (const p of built) if (!listed.includes(p)) fail(`built but not in sitemap.xml: ${p}`);
  for (const p of listed) if (!built.includes(p)) fail(`in sitemap.xml but not built: ${p}`);
}

// ------------------------------------------------------------
// The .htaccess is generated from redirects.js, and until it is on the
// server nothing exercises it: `npm run check` tests server.mjs, which
// reimplements the same table in JavaScript. So the two are compared
// here rather than discovered to disagree in production.
//
// The legacy redirects are RewriteRules with an absolute https target.
// That is not cosmetic: Apache expands a relative target using its own
// idea of the scheme, and Varnish terminates TLS in front of it, so its
// own idea is always http — which the scheme rule then answers with a
// second 301. Two hops for every URL the old site had indexed, the
// first of them in the clear. Measured on the live site on
// 22 August 2026 before this was fixed.
// ------------------------------------------------------------
if (buildable) {
  const htaccess = read('.htaccess');

  // ^pattern$ target [R=301…] — per-directory context, so the pattern has
  // no leading slash. The canonical rules use ^(.*)$ and are skipped.
  const rules = new Map(
    [...htaccess.matchAll(/RewriteRule \^(\S+)\$ (\S+) \[R=301/g)]
      .filter((m) => !m[1].includes('('))
      .map((m) => ['/' + m[1].replace(/\\/g, ''), m[2]]),
  );
  const goneRules = [...htaccess.matchAll(/RewriteRule \^(\S+)\$ - \[R=410/g)]
    .map((m) => '/' + m[1].replace(/\\/g, ''));

  for (const [from, to] of Object.entries(REDIRECTS)) {
    // /home and /home/ share one page; the generator strips the slash, so
    // look the bare form up the same way.
    const rule = rules.get(from) ?? rules.get(from.replace(/\/$/, '') || '/');
    if (!rule) { fail(`redirect missing from .htaccess: ${from}`); continue; }

    if (!rule.startsWith(`${LIVE_ORIGIN}/`) && rule !== LIVE_ORIGIN + '/') {
      fail(`${from} redirects to "${rule}" in .htaccess — it must be absolute and start\n`
        + `      ${LIVE_ORIGIN}/, or Apache hands back an http:// Location behind Varnish\n`
        + '      and every legacy URL takes two hops. See tools/build-htaccess.mjs.');
    } else if (rule.slice(LIVE_ORIGIN.length) !== to) {
      fail(`redirect disagrees: ${from} → ${to} in redirects.js, `
        + `${rule.slice(LIVE_ORIGIN.length)} in .htaccess`);
    }
  }
  for (const from of rules.keys()) {
    if (!(from in REDIRECTS) && !(from + '/' in REDIRECTS)) {
      fail(`.htaccess redirects ${from}, which redirects.js does not`);
    }
  }
  for (const p of GONE) {
    if (!goneRules.includes(p)) fail(`gone path missing from .htaccess: ${p}`);
  }

  // One hop, no chains, no dead ends — and the gone list stays disjoint.
  for (const [from, to] of Object.entries(REDIRECTS)) {
    const target = to.split('#')[0];
    if (target in REDIRECTS) {
      fail(`redirect chain: ${from} → ${to} → ${REDIRECTS[target]}. One hop only.`);
    }
    if (GONE.includes(target)) fail(`redirect ${from} → ${to}: target is gone`);
    const file = target === '/' ? 'index.html' : path.join(target.replace(/^\//, ''), 'index.html');
    if (!has(file)) fail(`${from} redirects to ${to}, which the build does not contain`);
  }
  for (const p of GONE) {
    if (p in REDIRECTS) fail(`${p} is both a redirect and gone`);
    if (has(path.join(p.replace(/^\//, ''), 'index.html'))) {
      fail(`${p} is marked gone but a page is built there`);
    }
  }
}

// ------------------------------------------------------------
// No page links to a legacy path: after the migration, internal links
// go straight to the destination, never through a redirect.
// ------------------------------------------------------------
if (buildable) {
  const legacy = new Set([...Object.keys(REDIRECTS), ...GONE]);
  for (const file of htmlFiles) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/(?:href|src)="([^"]*)"/g)) {
      const url = m[1];
      if (!url.startsWith('/')) continue;
      const pathname = url.split(/[?#]/)[0];
      if (legacy.has(pathname) || legacy.has(pathname.replace(/\/$/, ''))) {
        fail(`${path.relative(DIST, file)}: internal link to legacy path ${url}`);
      }
    }
  }
}

// ------------------------------------------------------------
// The canonical redirect, and the condition that keeps the site up.
//
// Varnish sits in front of Apache and terminates TLS, so %{HTTPS} is
// always "off" inside .htaccess however the visitor arrived. A scheme
// rule that tests %{HTTPS} alone therefore redirects every HTTPS
// request to HTTPS, the proxy forwards plain HTTP again, and the
// browser gives up: ERR_TOO_MANY_REDIRECTS. Not a misconfigured site,
// an unreachable one. That happened, minutes after the domain went
// live on 22 August 2026.
//
// Nothing else in the repository can catch it. `npm run check` serves
// dist/ through server.mjs with no proxy in front, and the preview host
// is exempt from the rule, so neither can reproduce what the live site
// sees. So the generated file is read here instead.
// ------------------------------------------------------------
if (buildable) {
  const htaccess = read('.htaccess');
  const scheme = htaccess.split('\n').findIndex((l) => /RewriteCond\s+%\{HTTPS\}/.test(l));
  if (scheme === -1) {
    fail('.htaccess has no scheme rule — the canonical redirect to HTTPS is missing.');
  } else {
    // The X-Forwarded-Proto condition has to sit in the same RewriteCond
    // chain as the %{HTTPS} test: one intervening RewriteRule and it is
    // guarding a different rule.
    const rest = htaccess.split('\n').slice(scheme + 1);
    const chain = rest.slice(0, rest.findIndex((l) => /RewriteRule/.test(l)) + 1);
    if (!chain.some((l) => /X-Forwarded-Proto/i.test(l))) {
      fail('.htaccess forces HTTPS on %{HTTPS} alone, with no X-Forwarded-Proto condition.\n'
        + '      Varnish terminates TLS, so %{HTTPS} is always "off" and this redirects\n'
        + '      https to https — ERR_TOO_MANY_REDIRECTS, and the site is unreachable.\n'
        + '      See tools/build-htaccess.mjs, and "Traps" in HANDOFF.md.');
    }
  }

  // The preview host has to stay exempt, or checking the build there
  // bounces to the live domain and tests nothing. It has to be exempt in
  // a RewriteCond, not merely mentioned — the comment above the rule
  // names it too, and a comment exempts nothing.
  const exemptions = htaccess.split('\n')
    .filter((l) => /^\s*RewriteCond/.test(l) && /dinaserver/i.test(l)).length;
  if (exemptions < 2) {
    fail(`the *.dinaserver.com preview host is exempted in ${exemptions} RewriteCond line(s), not 2.\n`
      + '      Both the scheme rule and the canonical-host rule need it, or checking a\n'
      + '      build on the preview URL bounces to the live domain and tests nothing.');
  }
}

// ------------------------------------------------------------
// Course weeks that have already happened.
//
// `dates` is a hand export from the DATES-SPAINBCN sheet and no page
// compares a row against today, so a stale export does not look stale:
// the home page goes on calling a week that has been and gone
// "upcoming". Nothing else in the repository would catch it.
//
// Set ALLOW_STALE_DATES=1 to publish anyway — for an urgent fix that has
// nothing to do with the dates. It is deliberately something you have to
// type.
// ------------------------------------------------------------
{
  const today = new Date().toISOString().slice(0, 10);
  const past = data.weeks.filter((w) => w.end < today);
  const future = data.weeks.filter((w) => w.end >= today);

  if (past.length) {
    const list = past.map((w) => `${w.label} ${w.month}`.trim()).join(', ');
    const message = `${past.length} course week(s) already over, still listed as upcoming: ${list}.\n`
      + `      Re-export the Barcelona rows from ${data.datesSource.sheet}\n`
      + '      into `dates` in src/data/site-data.js. To publish regardless: ALLOW_STALE_DATES=1';
    if (process.env.ALLOW_STALE_DATES === '1') warn(`${message}\n      (allowed by ALLOW_STALE_DATES)`);
    else fail(message);
  }

  if (!future.length && !past.length) fail('`dates` is empty — the site would offer no weeks at all.');
  else if (future.length && future.length < 3) {
    warn(`only ${future.length} course week(s) left in the future — time to re-export the sheet.`);
  }
}

// ------------------------------------------------------------
// Facts typed into a template instead of read from data.
//
// The rule the whole repository rests on is that every fact lives in
// src/data/ and is rendered from there. A figure copied into a template
// does not look wrong — it looks right, until the data changes and the
// copy does not, and then one page contradicts another.
//
// The values come from the data itself, so the guard cannot fall behind
// what it is guarding.
// ------------------------------------------------------------
{
  const facts = [
    ['pricing.barcelona.hours20', String(data.pricing.barcelona.hours20)],
    ['pricing.barcelona.hours25', String(data.pricing.barcelona.hours25)],
    ['organisation.founded', String(data.organisation.founded)],
    ['organisation.oid', data.organisation.oid],
    ['organisation.nif', data.organisation.nif],
    ['reviews.rating', data.reviews.rating],
    ['reviews.count', String(data.reviews.count)],
    ['contact.email', data.contact.email],
    ['contact.phone', data.contact.phone],
    ['contact.street', data.contact.street],
    ['contact.postcode', data.contact.postcode],
    ['AIRPORT_FARE', practical.AIRPORT_FARE],
    ...practical.tickets.map((t) => [`tickets.${t.id}.price`, t.price]),
  ].filter(([, v]) => v && !/^(From |Around |Set by)/.test(v));

  // Values a template may legitimately contain. Each needs a reason.
  const ALLOWED = new Set([
    // '400' etc. appear in image sizes attributes; none do today, but a
    // width would be a false positive rather than a duplicated fact.
  ]);

  const templates = [
    ...fs.readdirSync(path.join(ROOT, 'src/pages')).map((f) => `src/pages/${f}`),
    'src/layout.js',
  ].filter((f) => f.endsWith('.js'));

  for (const rel of templates) {
    const lines = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;          // a comment may name a value
      for (const [field, value] of facts) {
        if (ALLOWED.has(value)) continue;
        const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = /^[\w.]+$/.test(value) ? `\\b${escaped}\\b` : escaped;
        if (new RegExp(pattern).test(line)) {
          fail(`${rel}:${i + 1} has "${value}" typed in. It is ${field} — render it from the data.`);
        }
      }
    });
  }
}

// ------------------------------------------------------------
for (const w of warnings) console.log(`  warning: ${w}`);
if (problems.length) {
  console.error(`\n${problems.length} guard(s) failed:\n`);
  for (const p of problems) console.error(`  · ${p}`);
  console.error('');
  process.exit(1);
}
const scope = SOURCE_ONLY ? 'source' : `${fs.readdirSync(DIST).length} entries in dist/`;
console.log(`guards passed (${scope})`);
