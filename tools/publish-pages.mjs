// ============================================================
// Publish the built site to the repository root, which is where
// GitHub Pages serves this project site from.
//
//   npm run publish:pages
//
// GitHub Pages is configured to publish a branch, root folder, so
// the built files have to live beside the source. Everything this
// script writes is generated: it removes what it published last
// time before copying the new build in, and it never touches a
// source directory. `.nojekyll` stops Pages running Jekyll over
// the repository.
//
// The prototype is built with BASE_PATH and PROTOTYPE set, so its
// links work under /ErasmusInBarcelona/ and search engines are
// asked to leave it alone.
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const MANIFEST = path.join(ROOT, '.pages-published.json');

// Never delete these, whatever a stale manifest says.
const PROTECTED = new Set(['src', 'tools', 'scripts', 'notes', 'uploads', 'source-photos',
  'node_modules', 'dist', '.git', '.github', 'build.mjs', 'server.mjs', 'package.json',
  'package-lock.json', 'README.md', 'CLAUDE.md', 'github.md', '.gitignore']);

const BASE_PATH = process.env.BASE_PATH || '/ErasmusInBarcelona';
const SITE_URL = process.env.SITE_URL || 'https://rahv-fb.github.io' + BASE_PATH;

execFileSync(process.execPath, [path.join(ROOT, 'build.mjs')], {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH, SITE_URL, PROTOTYPE: '1' },
});

// Remove what the previous publish put here.
if (fs.existsSync(MANIFEST)) {
  for (const name of JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))) {
    if (PROTECTED.has(name)) continue;
    fs.rmSync(path.join(ROOT, name), { recursive: true, force: true });
  }
}

const published = [];
for (const entry of fs.readdirSync(DIST, { withFileTypes: true })) {
  if (PROTECTED.has(entry.name)) {
    throw new Error(`build produced "${entry.name}", which would overwrite a source path`);
  }
  fs.cpSync(path.join(DIST, entry.name), path.join(ROOT, entry.name), { recursive: true });
  published.push(entry.name);
}

published.sort();
fs.writeFileSync(MANIFEST, JSON.stringify(published, null, 2) + '\n');

console.log(`\npublished to the repository root for ${SITE_URL}/`);
console.log('  ' + published.join(', '));
console.log('\nCommit and push; GitHub Pages rebuilds the branch it publishes.');
