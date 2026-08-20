// ============================================================
// Build: renders src/pages/*.js into dist/ as plain static HTML
// and copies the assets. No runtime framework, no client-side
// rendering — every page ships complete.
//
//   npm run build
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL } from './src/layout.js';
import * as data from './src/data/site-data.js';

import home from './src/pages/home.js';
import joinACourse from './src/pages/join-a-course.js';
import bringAGroup from './src/pages/bring-a-group.js';
import planAMobility from './src/pages/plan-a-mobility.js';
import dates from './src/pages/dates.js';
import yourWeek from './src/pages/your-week.js';
import barcelona from './src/pages/barcelona.js';
import about from './src/pages/about.js';
import contact from './src/pages/contact.js';
import privacy from './src/pages/privacy.js';
import cookies from './src/pages/cookies.js';
import notFound from './src/pages/not-found.js';

const DIST = 'dist';

// route → renderer. The route is also the canonical URL.
export const PAGES = {
  '/': home,
  '/join-a-course/': joinACourse,
  '/bring-a-group/': bringAGroup,
  '/plan-a-mobility/': planAMobility,
  '/dates/': dates,
  '/your-week/': yourWeek,
  '/barcelona/': barcelona,
  '/about/': about,
  '/contact/': contact,
  '/privacy/': privacy,
  '/cookies/': cookies,
  '/404.html': notFound,
};

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else if (entry.name !== 'manifest.json') fs.copyFileSync(src, dst);
  }
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

let count = 0;
for (const [route, render] of Object.entries(PAGES)) {
  const file = route.endsWith('.html')
    ? path.join(DIST, route.slice(1))
    : path.join(DIST, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, render());
  count++;
}

copyDir('src/assets', path.join(DIST, 'assets'));

// robots.txt and a sitemap, generated from the same route list.
const urls = Object.keys(PAGES).filter((r) => !r.endsWith('.html'));
fs.writeFileSync(path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n') +
  `\n</urlset>\n`);

console.log(`${count} pages → ${DIST}/`);
console.log(`${urls.length} URLs in sitemap.xml · ${data.dates.length} course weeks · ` +
  `${data.courseAreas.length} subject areas`);
