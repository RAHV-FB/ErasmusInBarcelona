// ============================================================
// ErasmusInBarcelona.com — local/static server.
// Zero dependencies. `node server.mjs` (or `npm start`).
//
// Serves the .dc.html pages under clean routes so the site can
// be browsed the way it will be published:
//   /                → index.dc.html
//   /join-a-course   → join-a-course.dc.html
//   anything unknown → 404.dc.html with a 404 status
//
// Routes are served WITHOUT a trailing slash on purpose: the
// pages link each other as "./page.dc.html" and load data as
// "./assets/js/site-data.js", so the document base has to stay
// at the site root.
// ============================================================
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '127.0.0.1';

// Clean route → page file. Keep in step with the pages on disk.
const ROUTES = {
  '/': 'index.dc.html',
  '/join-a-course': 'join-a-course.dc.html',
  '/bring-a-group': 'bring-a-group.dc.html',
  '/plan-a-mobility': 'plan-a-mobility.dc.html',
  '/dates': 'dates.dc.html',
  '/your-week': 'your-week.dc.html',
  '/barcelona': 'barcelona.dc.html',
  '/about': 'about.dc.html',
  '/contact': 'contact.dc.html',
  '/privacy': 'privacy.dc.html',
  '/cookies': 'cookies.dc.html',
};

// Legacy paths from the current live site (see notes/production-report.md).
const REDIRECTS = {
  '/home': '/',
  '/school-teachers': '/join-a-course',
  '/universities': '/join-a-course',
  '/english-courses-for-teachers': '/join-a-course',
  '/ai-ict': '/join-a-course',
  '/ict-integration': '/join-a-course',
  '/e-learning-ict': '/join-a-course',
  '/ict': '/join-a-course',
  '/course-catalogue': '/join-a-course',
  '/school-students': '/bring-a-group',
  '/english-courses-students': '/bring-a-group',
  '/spanish-courses-for-students': '/bring-a-group',
  '/ict-courses-for-students': '/bring-a-group',
  '/other-courses-for-students': '/bring-a-group',
  '/currently-open-dates': '/dates',
  '/season-courses': '/dates',
  '/create-your-own-course': '/plan-a-mobility',
  '/about-us': '/about',
  '/our-team': '/about',
  '/10-reasons': '/about',
  '/2025-at-a-glance': '/about',
  '/privacy-policy': '/privacy',
};

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

function send(res, status, body, type, extra = {}) {
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': Buffer.byteLength(body), ...extra });
  res.end(body);
}

function sendFile(res, status, file) {
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const stat = fs.statSync(file);
  res.writeHead(status, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Cache-Control': file.endsWith('.dc.html') ? 'no-cache' : 'public, max-age=3600',
  });
  fs.createReadStream(file).pipe(res);
}

// Resolve a request path to a file inside ROOT, or null if it escapes.
function safeFile(urlPath) {
  const rel = decodeURIComponent(urlPath).replace(/^\/+/, '');
  const file = path.resolve(ROOT, rel);
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) return null;
  return fs.existsSync(file) && fs.statSync(file).isFile() ? file : null;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method not allowed', 'text/plain; charset=utf-8', { Allow: 'GET, HEAD' });
  }

  const url = new URL(req.url, `http://${req.headers.host || HOST}`);
  let pathname = url.pathname;

  // Normalise a trailing slash away (except the root itself).
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const to = pathname.replace(/\/+$/, '') + url.search;
    return send(res, 308, '', 'text/plain; charset=utf-8', { Location: to });
  }

  const redirect = REDIRECTS[pathname];
  if (redirect) return send(res, 301, '', 'text/plain; charset=utf-8', { Location: redirect + url.search });

  const route = ROUTES[pathname];
  if (route) {
    const file = path.join(ROOT, route);
    if (fs.existsSync(file)) return sendFile(res, 200, file);
  }

  const file = safeFile(pathname);
  if (file) return sendFile(res, 200, file);

  const notFound = path.join(ROOT, '404.dc.html');
  if (fs.existsSync(notFound)) return sendFile(res, 404, notFound);
  return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
});

server.listen(PORT, HOST, () => {
  console.log(`Erasmus in Barcelona — serving ${ROOT}`);
  console.log(`  http://${HOST}:${PORT}/`);
});
