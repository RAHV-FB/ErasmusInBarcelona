// ============================================================
// Prepares production images from the organisation's originals.
//
//   node tools/build-images.mjs
//
// Sources: uploads/ (the organisation's own photographs, kept as
// the untouched archive) and the twelve team portraits, which were
// downloaded once from the old site's CDN into source-photos/team/.
// Output: src/assets/images/, descriptive filenames, WebP, two
// widths for photographs that are ever displayed large.
// Re-running is cheap and idempotent.
// ============================================================
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'src/assets/images';
const WIDTHS = [800, 1600];

// original file → production name (descriptive, no upload ids)
const PHOTOS = {
  'photo_uploads-1787246875557-jx0m.jpeg': 'student-group-with-certificates-barcelona',
  'photo_uploads-1787246867970-fhh3.jpeg': 'english-course-group-classroom-barcelona',
  'photo_uploads-1787246867962-f6e1.jpg': 'ict-training-group-around-table-barcelona',
  'photo_uploads-1787246875558-wqfk.jpeg': 'ict-training-group-laptops-classroom',
  'photo_uploads-1787246868124-4i9m.png': 'ict-course-group-spainbcn-office',
  'photo_uploads-1787246879625-qvdv.jpeg': 'spanish-course-group-spainbcn-office',
  'photo_uploads-1787246868160-zxrv.jpeg': 'spanish-course-group-office-barcelona',
  'photo_uploads-1787246868207-igg7.jpeg': 'spanish-course-for-teachers-classroom',
  'photo_uploads-1787246879624-bjwh.jpeg': 'spanish-teacher-group-spainbcn-office',
  'photo_uploads-1787246868632-mye6.png': 'student-group-park-guell-barcelona',
  'photo_uploads-1787246868171-k047.jpeg': 'student-group-ciutadella-barcelona',
  'photo_uploads-1787246868139-ji5r.jpeg': 'student-group-viewpoint-barcelona',
  'photo_uploads-1787246882590-ijcs.png': 'barceloneta-seafront-barcelona',
  'photo_uploads-1787246868436-z9ma.png': 'spainbcn-founders-1997',
  'photo_uploads-1787246868185-3qqb.png': 'spainbcn-school-facilities-barcelona',
};

fs.mkdirSync(path.join(OUT, 'team'), { recursive: true });

const manifest = {};
for (const [src, name] of Object.entries(PHOTOS)) {
  const from = path.join('uploads', src);
  if (!fs.existsSync(from)) { console.warn('missing original:', from); continue; }
  const meta = await sharp(from).metadata();
  const sizes = [];
  for (const w of WIDTHS) {
    if (w > meta.width) continue;
    const to = path.join(OUT, `${name}-${w}.webp`);
    await sharp(from).resize({ width: w }).webp({ quality: 76 }).toFile(to);
    sizes.push(w);
  }
  if (!sizes.length) {
    const to = path.join(OUT, `${name}-${meta.width}.webp`);
    await sharp(from).webp({ quality: 76 }).toFile(to);
    sizes.push(meta.width);
  }
  manifest[name] = { widths: sizes, ratio: +(meta.width / meta.height).toFixed(4) };
  console.log(name, sizes.join('/'), `${meta.width}x${meta.height}`);
}

// Team portraits: one modest width, square-ish crop handled in CSS.
const TEAM_DIR = 'source-photos/team';
if (fs.existsSync(TEAM_DIR)) {
  for (const f of fs.readdirSync(TEAM_DIR)) {
    const from = path.join(TEAM_DIR, f);
    if (!fs.statSync(from).isFile() || !/\.(jpe?g|png|webp)$/i.test(f)) continue;
    const name = 'team-' + path.parse(f).name.toLowerCase();
    const meta = await sharp(from).metadata();
    // The portraits vary a lot in size; never upscale a small original.
    const w = Math.min(480, meta.width);
    await sharp(from)
      .resize({ width: w, height: Math.round(w * 11 / 10), fit: 'cover', position: 'top' })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, 'team', `${name}.webp`));
    manifest[name] = { widths: [w], ratio: 10 / 11, team: true, source: `${meta.width}x${meta.height}` };
    console.log('team:', name, `${meta.width}x${meta.height} -> ${w}`);
  }
}

// Sharing card: a JPEG, because not every social scraper reads WebP.
await sharp('uploads/photo_uploads-1787246875557-jx0m.jpeg')
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82 })
  .toFile(path.join(OUT, 'og-image.jpg'));
console.log('og-image.jpg 1200x630');

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('\n' + Object.keys(manifest).length + ' images written to ' + OUT);
