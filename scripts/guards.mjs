// ============================================================
// Static invariants over dist/. Run after a build; exits 1 on the
// first class of violation found.
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
import { organisation } from '../src/data/site-data.js';

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
// Report.
// ------------------------------------------------------------
if (failures.length) {
  console.error(`guards: ${failures.length} violation${failures.length === 1 ? '' : 's'}\n`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log(`guards: ${pages.length} pages clean — no legacy values, no legacy links, ` +
  `${Object.keys(REDIRECTS).length} redirects coherent, sitemap matches the build`);
