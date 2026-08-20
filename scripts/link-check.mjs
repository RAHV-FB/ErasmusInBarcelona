// ============================================================
// External link check — every off-site link in the build, plus
// the anchor it points at.
//
//   npm run links
//
// Separate from `npm run check` because it makes real requests to
// other people's servers. Run it before publishing and after any
// change to the programme links. SpainBcn rate-limits repeated
// requests: a 429, or a 200 with an empty body, means "try again
// in a minute", not "the link is broken".
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SKIP_HOSTS = ['www.erasmusinbarcelona.com']; // our own canonical/OG URLs

if (!fs.existsSync(DIST)) {
  console.error('Run `npm run build` first.');
  process.exit(1);
}

const urls = new Set();
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      for (const m of fs.readFileSync(p, 'utf8').matchAll(/href="(https?:\/\/[^"]+)"/g)) urls.add(m[1]);
    }
  }
}(DIST));

const checked = [...urls].filter((u) => !SKIP_HOSTS.includes(new URL(u).host)).sort();
let problems = 0;

for (const url of checked) {
  const [base, fragment] = url.split('#');
  let status = 0;
  let body = '';
  try {
    const res = await fetch(base, { redirect: 'follow', headers: { 'User-Agent': 'erasmusinbarcelona-link-check' } });
    status = res.status;
    body = await res.text();
  } catch (e) {
    status = 'network: ' + e.message.slice(0, 40);
  }

  let note = '';
  if (status !== 200) {
    note = status === 429 ? 'rate-limited, re-run later' : 'FAILED';
    if (status !== 429) problems++;
  } else if (!body.length) {
    note = 'empty body, rate-limited — re-run later';
  } else if (fragment) {
    if (body.includes(`id="${fragment}"`)) note = 'anchor ok';
    else { note = 'ANCHOR MISSING'; problems++; }
  }

  console.log(`${String(status).padEnd(4)} ${url}${note ? '  — ' + note : ''}`);
  await new Promise((r) => setTimeout(r, 1200));
}

console.log(problems ? `\n${problems} bad link(s) of ${checked.length}.` : `\nAll ${checked.length} external links resolve.`);
process.exit(problems ? 1 : 0);
