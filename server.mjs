// ============================================================
// ErasmusInBarcelona.com — static server for dist/.
// Zero dependencies. `npm start` (build first, or use `npm run dev`).
//
// Serves the built site exactly as it should be published:
// directory URLs with a trailing slash, the legacy redirect map,
// and 404.html with a real 404 status.
// ============================================================
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REDIRECTS } from './src/data/redirects.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '127.0.0.1';
// Set when serving a build made for a sub-path, so the local server
// behaves exactly like GitHub Pages does for a project site.
const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');


const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function send(res, status, body, extra = {}) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': Buffer.byteLength(body), ...extra });
  res.end(body);
}

function sendFile(res, status, file) {
  const ext = path.extname(file).toLowerCase();
  const stat = fs.statSync(file);
  res.writeHead(status, {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Content-Length': stat.size,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000',
    'X-Content-Type-Options': 'nosniff',
  });
  fs.createReadStream(file).pipe(res);
}

function resolve(pathname) {
  const rel = decodeURIComponent(pathname).replace(/^\/+/, '');
  const target = path.resolve(ROOT, rel);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null;
  if (fs.existsSync(target)) {
    if (fs.statSync(target).isDirectory()) {
      const index = path.join(target, 'index.html');
      return fs.existsSync(index) ? index : null;
    }
    return target;
  }
  return null;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method not allowed', { Allow: 'GET, HEAD' });
  }
  if (!fs.existsSync(ROOT)) return send(res, 500, 'Run `npm run build` first.');

  const url = new URL(req.url, `http://${req.headers.host || HOST}`);
  let pathname = url.pathname;

  if (BASE_PATH) {
    if (pathname === BASE_PATH) return send(res, 301, '', { Location: BASE_PATH + '/' });
    if (!pathname.startsWith(BASE_PATH + '/')) {
      // Outside the project path, exactly as GitHub Pages would answer.
      return send(res, 404, 'Not found');
    }
    pathname = pathname.slice(BASE_PATH.length) || '/';
  }

  const redirect = REDIRECTS[pathname] || REDIRECTS[pathname.replace(/\/$/, '')];
  if (redirect) return send(res, 301, '', { Location: BASE_PATH + redirect });

  // Directory URLs keep their trailing slash, so relative links and
  // canonical URLs agree with each other.
  if (!path.extname(pathname) && !pathname.endsWith('/')) {
    const asDir = resolve(pathname + '/');
    if (asDir) return send(res, 301, '', { Location: BASE_PATH + pathname + '/' + url.search });
  }

  const file = resolve(pathname);
  if (file) return sendFile(res, 200, file);

  const notFound = path.join(ROOT, '404.html');
  if (fs.existsSync(notFound)) return sendFile(res, 404, notFound);
  return send(res, 404, 'Not found');
});

server.listen(PORT, HOST, () => {
  console.log(`Erasmus in Barcelona — serving ${ROOT}`);
  console.log(`  http://${HOST}:${PORT}${BASE_PATH}/`);
});
