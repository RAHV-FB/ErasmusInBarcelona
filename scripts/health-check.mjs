// ============================================================
// Site health check — builds the site, serves it, and inspects
// every page in a real browser.
//
//   npm run check              (build + check)
//   npm run check -- --shots   (also write full-page PNGs)
//
// It fails on anything that would be a defect in production:
// console errors, failed requests, dead internal links, missing
// or duplicate metadata, broken heading order, images without
// alt text, third-party requests on page load, horizontal
// overflow at eight widths, touch targets under 44px, and a 404
// route that answers with the wrong status.
// ============================================================
import { chromium } from 'playwright';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT || 4199);
// Set BASE_PATH to check a build made for a sub-path (the GitHub Pages
// prototype); the build and the server both read the same variable.
const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');
const BASE = `http://127.0.0.1:${PORT}${BASE_PATH}`;
const SHOTS = process.argv.includes('--shots');
const SHOT_DIR = path.join(ROOT, '.health-shots');
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1280, 1440];

execFileSync(process.execPath, [path.join(ROOT, 'build.mjs')], { cwd: ROOT, stdio: 'inherit' });

const ROUTES = ['/', '/join-a-course/', '/bring-a-group/', '/plan-a-mobility/', '/dates/',
  '/your-week/', '/barcelona/', '/about/', '/contact/', '/privacy/', '/cookies/'];
const ORIGIN = `http://127.0.0.1:${PORT}`;

const server = spawn(process.execPath, [path.join(ROOT, 'server.mjs')], {
  cwd: ROOT, env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore',
});
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop);

for (let i = 0; i < 60; i++) {
  try { await fetch(BASE + '/'); break; } catch { await new Promise((r) => setTimeout(r, 200)); }
}
if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });

// Playwright normally finds its own browser. When the installed
// Playwright and the browsers on disk are different versions — a
// container with a pre-seeded browser cache — it looks for a build that
// isn't there, so fall back to whichever Chromium is present.
function findChromium() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const dir = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!dir || !fs.existsSync(dir)) return undefined;
  const candidates = fs.readdirSync(dir)
    .filter((n) => n.startsWith('chromium'))
    .map((n) => [path.join(dir, n, 'chrome-linux', 'chrome'),
      path.join(dir, n, 'chrome-linux', 'headless_shell')])
    .flat()
    .filter((f) => fs.existsSync(f));
  return candidates[0];
}

let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  const executablePath = findChromium();
  if (!executablePath) throw err;
  browser = await chromium.launch({ executablePath });
}

let problems = 0;
const titles = new Map();
const descriptions = new Map();

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const errors = [];
  const failed = [];
  const thirdParty = [];

  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('requestfailed', (r) => failed.push(r.url() + ' — ' + (r.failure()?.errorText || '')));
  page.on('request', (r) => { if (!r.url().startsWith(BASE) && !r.url().startsWith('data:')) thirdParty.push(r.url()); });
  page.on('response', (r) => { if (r.status() >= 400) failed.push('HTTP ' + r.status() + ' ' + decodeURIComponent(r.url())); });

  await page.goto(BASE + route, { waitUntil: 'load', timeout: 45000 });
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle').catch(() => {});

  const info = await page.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute('content') || '';
    const headings = [...document.querySelectorAll('h1, h2, h3, h4')].map((h) => +h.tagName[1]);
    let badOrder = null;
    for (let i = 1; i < headings.length; i++) {
      if (headings[i] > headings[i - 1] + 1) badOrder = `h${headings[i - 1]} → h${headings[i]}`;
    }
    return {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      og: ['og:title', 'og:description', 'og:image', 'og:url'].filter((p) => !meta(`meta[property="${p}"]`)),
      lang: document.documentElement.lang,
      h1s: document.querySelectorAll('h1').length,
      badOrder,
      schema: [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((s) => { try { return JSON.parse(s.textContent)['@type']; } catch { return 'INVALID'; } }),
      unrendered: (document.body.innerText.match(/\{\{[^}]+\}\}|IMAGE REQUIRED|undefined|NaN/g) || []).slice(0, 5),
      noAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.getAttribute('src')),
      emptyAltNonDecorative: [...document.images].filter((i) => i.alt === '' && !i.closest('[aria-hidden]')).length,
      brokenImgs: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute('src')),
      noDimensions: [...document.images].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).map((i) => i.getAttribute('src')),
      links: [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')))],
      blankNoRel: [...document.querySelectorAll('a[target="_blank"]')]
        .filter((a) => !(a.rel || '').includes('noopener')).map((a) => a.getAttribute('href')),
      // Inline controls sitting in a line of text are exempt from the target
      // size rule (WCAG 2.5.8 "inline"), which is what .linkish is.
      smallTargets: [...document.querySelectorAll('a.btn, button, .chip, .nav-toggle')]
        .filter((el) => !el.classList.contains('linkish'))
        .filter((el) => { const r = el.getBoundingClientRect(); return r.width && (r.height < 44 || r.width < 44); })
        .map((el) => el.textContent.trim().slice(0, 24)),
      storage: (() => { try { return Object.keys(localStorage).length + Object.keys(sessionStorage).length; } catch { return -1; } })(),
      cookies: document.cookie.length,
    };
  });

  // internal links must resolve to something the server serves
  const internal = info.links.filter((h) => h.startsWith('/'));
  const dead = [];
  for (const href of internal) {
    const url = href.split('#')[0];
    if (!url) continue;
    const res = await fetch(ORIGIN + url, { redirect: 'manual' });
    if (res.status >= 400) dead.push(href + ' → ' + res.status);
  }

  const overflow = [];
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    let m = null;
    for (let i = 0; i < 6; i++) {
      await page.waitForTimeout(300);
      const now = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));
      if (m && now.scrollW === m.scrollW) break;
      m = now;
    }
    if (m.scrollW > m.clientW + 1) {
      const who = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        let worst = null;
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (!r.width || r.left < -1000 || r.right <= vw + 1) continue;
          const pr = el.parentElement?.getBoundingClientRect();
          if (pr && pr.right > vw + 1) continue;
          if (!worst || r.right > worst.right) {
            worst = { right: r.right, desc: el.tagName.toLowerCase() + ' "' + (el.textContent || '').trim().slice(0, 30) + '"' };
          }
        }
        return worst ? worst.desc + ' reaching ' + Math.round(worst.right) + 'px' : 'source not identified';
      });
      overflow.push(`${w}px → ${m.scrollW}px (${who})`);
    }
  }

  if (SHOTS) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SHOT_DIR, (route === '/' ? 'home' : route.replace(/\//g, '')) + '.png'), fullPage: true });
  }

  const issues = [];
  if (!info.title) issues.push('no <title>');
  if (info.title.length > 70) issues.push(`title is ${info.title.length} characters`);
  if (titles.has(info.title)) issues.push(`title duplicates ${titles.get(info.title)}`);
  titles.set(info.title, route);
  if (!info.description) issues.push('no meta description');
  if (descriptions.has(info.description)) issues.push(`description duplicates ${descriptions.get(info.description)}`);
  descriptions.set(info.description, route);
  if (!info.canonical) issues.push('no canonical');
  if (info.og.length) issues.push('missing Open Graph: ' + info.og.join(', '));
  if (info.lang !== 'en') issues.push('lang is "' + info.lang + '"');
  if (info.h1s !== 1) issues.push(info.h1s + ' <h1> elements');
  if (info.badOrder) issues.push('heading level skipped: ' + info.badOrder);
  if (info.schema.includes('INVALID')) issues.push('invalid JSON-LD');
  if (info.unrendered.length) issues.push('placeholder or unrendered text: ' + info.unrendered.join(', '));
  if (info.noAlt.length) issues.push('images without alt: ' + info.noAlt.join(', '));
  if (info.brokenImgs.length) issues.push('images not loaded: ' + info.brokenImgs.join(', '));
  if (info.noDimensions.length) issues.push('images without width/height: ' + info.noDimensions.join(', '));
  if (dead.length) issues.push('dead internal links: ' + dead.join(', '));
  if (info.blankNoRel.length) issues.push('target=_blank without noopener: ' + info.blankNoRel.join(', '));
  if (info.smallTargets.length) issues.push('touch targets under 44px: ' + info.smallTargets.join(', '));
  if (info.storage > 0) issues.push('page wrote ' + info.storage + ' storage entries on load');
  if (info.cookies > 0) issues.push('page set cookies on load');
  if (thirdParty.length) issues.push('third-party requests on load: ' + [...new Set(thirdParty)].slice(0, 4).join(', '));
  if (failed.length) issues.push('failed requests: ' + failed.slice(0, 4).join(' | '));
  if (errors.length) issues.push('console errors: ' + errors.slice(0, 4).join(' | '));
  if (overflow.length) issues.push('horizontal overflow at ' + overflow.join('; '));

  problems += issues.length;
  console.log(`${issues.length ? 'FAIL' : ' OK '}  ${route}`);
  for (const i of issues) console.log('        · ' + i);
  await ctx.close();
}

// ---- whole-build checks ----
const buildIssues = [];
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p); else files.push(p);
  }
}(DIST));

const html = files.filter((f) => f.endsWith('.html'));
for (const f of html) {
  const src = fs.readFileSync(f, 'utf8');
  const rel = f.replace(DIST, '');
  if (/\.dc\.html/.test(src)) buildIssues.push(`${rel} still links to a .dc.html page`);
  const external = [...src.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)].map((m) => m[1])
    .filter((u) => /\.(png|jpe?g|webp|gif|svg|woff2?)($|\?)/i.test(u));
  if (external.length) buildIssues.push(`${rel} loads external assets: ${external.join(', ')}`);
  if (/fonts\.googleapis|fonts\.gstatic|googletagmanager|google-analytics/.test(src)) {
    buildIssues.push(`${rel} references Google fonts or analytics`);
  }
}

const res404 = await fetch(BASE + '/no-such-page');
if (res404.status !== 404) buildIssues.push(`/no-such-page answered ${res404.status}, expected 404`);

const redirects = { '/school-teachers/': '/join-a-course/', '/our-team/': '/about/#team', '/privacy-policy/': '/privacy/', '/home': '/' };
for (const [from, to] of Object.entries(redirects)) {
  const r = await fetch(BASE + from, { redirect: 'manual' });
  const loc = r.headers.get('location');
  if (r.status !== 301 || loc !== BASE_PATH + to) {
    buildIssues.push(`${from} → ${r.status} ${loc}, expected 301 ${BASE_PATH + to}`);
  } else {
    const onward = await fetch(BASE + to.split('#')[0], { redirect: 'manual' });
    if (onward.status !== 200) buildIssues.push(`${from} redirects to ${to}, which answered ${onward.status}`);
  }
}

for (const f of ['robots.txt', 'sitemap.xml', '404.html', 'assets/css/site.css', 'assets/js/site.js']) {
  if (!fs.existsSync(path.join(DIST, f))) buildIssues.push('missing from the build: ' + f);
}

const bytes = files.reduce((n, f) => n + fs.statSync(f).size, 0);
console.log(`\nBuild: ${html.length} pages, ${files.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
for (const i of buildIssues) console.log('  · ' + i);
problems += buildIssues.length;

await browser.close();
stop();
console.log(problems ? `\n${problems} problem(s) found.` : '\nAll pages healthy.');
process.exit(problems ? 1 : 0);
