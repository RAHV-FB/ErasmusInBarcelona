// ============================================================
// Site health check — renders every page in a real browser and
// reports anything that would be a defect in production.
//
//   npm run check              (starts its own server)
//   npm run check -- --shots   (also write full-page PNGs)
//
// Needs Playwright: npm install (playwright is a devDependency).
// Checks per page: boot errors, console errors, failed requests,
// unrendered {{ bindings }}, broken images, missing <title>/lang,
// horizontal overflow at 1440 / 768 / 390 / 320.
// ============================================================
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT || 4199);
const BASE = `http://127.0.0.1:${PORT}`;
const SHOTS = process.argv.includes('--shots');
const SHOT_DIR = path.join(ROOT, '.health-shots');

const ROUTES = ['/', '/join-a-course', '/bring-a-group', '/plan-a-mobility', '/dates',
  '/your-week', '/barcelona', '/about', '/contact', '/privacy', '/cookies'];
const WIDTHS = [1440, 768, 390, 320];

const server = spawn(process.execPath, [path.join(ROOT, 'server.mjs')], {
  env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore',
});
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop);

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try { await fetch(BASE + '/'); return; } catch { await new Promise(r => setTimeout(r, 200)); }
  }
  throw new Error('server did not start on ' + BASE);
}

await waitForServer();
if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
let problems = 0;

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: WIDTHS[0], height: 1000 } });
  const page = await ctx.newPage();
  const errors = [], failed = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 200)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('requestfailed', r => failed.push(r.url() + ' — ' + (r.failure()?.errorText || '')));
  page.on('response', r => { if (r.status() >= 400) failed.push('HTTP ' + r.status() + ' ' + decodeURIComponent(r.url())); });

  await page.goto(BASE + route, { waitUntil: 'load', timeout: 45000 });
  // The page mounts client-side, then loads site-data.js; give both time.
  await page.waitForFunction(() => document.body.innerText.trim().length > 200, null, { timeout: 20000 })
    .catch(() => errors.push('page never rendered any text'));
  // Scroll the whole page so lazy-loaded images actually start loading.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });

  // Local images must decode; remote (CDN) ones may be unreachable from here.
  await page.waitForFunction(() => [...document.images]
    .filter(i => new URL(i.src, location.href).origin === location.origin)
    .every(i => i.complete), null, { timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('networkidle').catch(() => {});

  const info = await page.evaluate(() => ({
    title: document.title,
    lang: document.documentElement.lang,
    hasH1: !!document.querySelector('h1'),
    unrendered: (document.body.innerText.match(/\{\{[^}]+\}\}/g) || []).slice(0, 5),
    brokenLocalImgs: [...document.images]
      .filter(i => new URL(i.src, location.href).origin === location.origin)
      .filter(i => !i.complete || i.naturalWidth === 0)
      .map(i => i.getAttribute('src')).slice(0, 8),
    brokenRemoteImgs: [...document.images]
      .filter(i => new URL(i.src, location.href).origin !== location.origin)
      .filter(i => !i.complete || i.naturalWidth === 0)
      .map(i => i.getAttribute('src')).slice(0, 8),
    localLinks: [...new Set([...document.querySelectorAll('a[href]')]
      .map(a => a.getAttribute('href'))
      .filter(h => h && !/^(https?:|mailto:|tel:|#)/.test(h)))],
  }));

  const overflow = [];
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    // Re-measure until the layout settles: the header and week timetable
    // re-render on resize, and a mid-relayout reading is meaningless.
    let m = null;
    for (let i = 0; i < 6; i++) {
      await page.waitForTimeout(400);
      const now = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));
      if (m && now.scrollW === m.scrollW) break;
      m = now;
    }
    if (m.scrollW > m.clientW + 1) {
      // Name the widest offending element so the report is actionable.
      const who = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        let worst = null;
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (!r.width || r.left < -1000) continue;
          if (r.right <= vw + 1) continue;
          const pr = el.parentElement?.getBoundingClientRect();
          if (pr && pr.right > vw + 1) continue;
          if (!worst || r.right > worst.right) {
            worst = { right: r.right, desc: el.tagName.toLowerCase() +
              (el.id ? '#' + el.id : '') + ' "' + (el.innerText || '').trim().slice(0, 30) + '"' };
          }
        }
        return worst ? worst.desc + ' reaching ' + Math.round(worst.right) + 'px' : 'source not identified';
      });
      overflow.push(`${w}px → content ${m.scrollW}px (${who})`);
    }
  }

  if (SHOTS) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SHOT_DIR, (route === '/' ? 'home' : route.slice(1)) + '.png'), fullPage: true });
  }

  // Requests for the raw "{{ binding }}" src attributes happen before the
  // page mounts; they are runtime noise, not site defects.
  const remote = u => !u.includes(BASE);
  const realFailures = failed.filter(f => !/\{\{|%7B%7B/.test(f) && !remote(f));
  const remoteFailures = failed.filter(f => remote(f));
  // Resource failures carry no URL in the console text; they are reported
  // from the response/requestfailed handlers above instead.
  const realErrors = errors.filter(e => !/^Failed to load resource/.test(e));
  const missingPages = info.localLinks
    .map(h => h.replace(/^\.\//, '').split('#')[0])
    .filter(h => h && !fs.existsSync(path.join(ROOT, h)));

  const issues = [];
  if (!info.title) issues.push('no <title>');
  if (!info.lang) issues.push('no lang attribute');
  if (!info.hasH1) issues.push('no <h1>');
  if (info.unrendered.length) issues.push('unrendered bindings: ' + info.unrendered.join(', '));
  if (info.brokenLocalImgs.length) issues.push('images not loaded: ' + info.brokenLocalImgs.join(', '));
  if (missingPages.length) issues.push('links to missing files: ' + missingPages.join(', '));
  if (overflow.length) issues.push('horizontal overflow at ' + overflow.join('; '));
  if (realFailures.length) issues.push('failed requests: ' + realFailures.slice(0, 5).join(' | '));
  if (realErrors.length) issues.push('console errors: ' + realErrors.slice(0, 5).join(' | '));

  // Third-party assets (the team-portrait CDN) are reported, not failed:
  // they can be blocked by the network this check runs on.
  const warnings = [];
  if (info.brokenRemoteImgs.length) warnings.push(info.brokenRemoteImgs.length + ' third-party image(s) did not load (hotlinked CDN)');
  if (remoteFailures.length) warnings.push(remoteFailures.length + ' third-party request(s) failed');

  problems += issues.length;
  console.log(`${issues.length ? 'FAIL' : ' OK '}  ${route}  — "${info.title}"`);
  for (const i of issues) console.log('        · ' + i);
  for (const w of warnings) console.log('        ~ warning: ' + w);
  await ctx.close();
}

// The 404 route must answer with a 404 status, not a 200.
const res = await fetch(BASE + '/no-such-page');
if (res.status !== 404) { console.log(`FAIL  /no-such-page — expected 404, got ${res.status}`); problems++; }
else console.log(' OK   /no-such-page — 404 page served with a 404 status');

await browser.close();
stop();
console.log(problems ? `\n${problems} problem(s) found.` : '\nAll pages healthy.');
process.exit(problems ? 1 : 0);
