// ============================================================
// Prepares production images from the organisation's originals.
//
//   node tools/build-images.mjs
//
// Sources: uploads/ (the organisation's own photographs, kept as
// the untouched archive), Images-Erasmus/ (the owner's 31 August
// 2026 delivery, kept whole as a second untouched archive),
// source-photos/spainbcn/ (photographs from www.spainbcn.com, same
// owner — see the README there), and the twelve team portraits in
// source-photos/team/, downloaded once from the old site's CDN.
// None of the source directories is ever published.
// Output: src/assets/images/, descriptive filenames, WebP, two
// widths for photographs that are ever displayed large.
// Re-running is cheap and idempotent.
// ============================================================
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'src/assets/images';
const WIDTHS = [800, 1200, 1600];   // a middle step so a 1440 viewport
                                    // does not always fetch the widest file

// original file → production name (descriptive, no upload ids)
const PHOTOS = {
  'screenshot-2026-08-30-course-group.webp': 'course-group-sunlit-room',
  'photo_uploads-1787246868207-igg7.jpeg': 'spanish-course-group-whiteboard',
  'photo_uploads-1787246867962-f6e1.jpg': 'ict-course-group-day-by-day',
  'photo_uploads-1787246867970-fhh3.jpeg': 'course-group-gallery-room',
  'photo_uploads-1787246879625-qvdv.jpeg': 'spanish-course-group-spainbcn-office',
  'photo_uploads-1787246879624-bjwh.jpeg': 'staff-group-spainbcn-office',
  'photo_uploads-1787246868160-zxrv.jpeg': 'course-group-spainbcn-sitting-room',
  'photo_uploads-1787246868171-k047.jpeg': 'student-group-ciutadella-barcelona',
  'photo_uploads-1787246868139-ji5r.jpeg': 'student-group-viewpoint-barcelona',
  'photo_uploads-1787246868632-mye6.png': 'student-group-park-guell-barcelona',
  'photo_uploads-1787246875557-jx0m.jpeg': 'student-group-certificates-classroom',
  'photo_uploads-1787246882590-ijcs.png': 'barceloneta-seafront-barcelona',
  'photo_uploads-1787246868436-z9ma.png': 'spainbcn-founders-1997',
  // Still in uploads/, left unpublished:
  //   ...880578-kn57  AI classroom (a soft video still; was briefly the home hero)
  //   ...875558-wqfk  ICT group with laptops — too dim and too small (825x464) to print well
  //   ...868185-3qqb  Four small views of the school (713px wide, too small to place)
  //   ...868124-4i9m  trainer classroom (was the staff-training hero until the owner's
  //                   Staff Training photograph arrived)
  // The three category graphics and the logo mark in uploads/ are not photographs.
  // screenshot-2026-08-30-course-group.webp was supplied by the owner on
  // 30 August 2026 for the home hero.
};

// The photographs the owner supplied in Images-Erasmus/ on 31 August 2026
// for the course-group pages. Files named for a page go to that page; the
// rest were placed by subject. Only the ones a page uses are processed;
// the folder keeps the whole delivery as the untouched archive.
const ERASMUS = {
  // Renamed from the delivery's "ai:ict" — a colon cannot be checked out on Windows.
  'Main - universities page + main ai-ict page.jpeg': 'course-group-blue-screen-classroom',
  'secondary ict page.jpeg': 'ai-course-laptops-classroom',
  'aulas Gran Canaria 4.png': 'ai-course-laptop-rows',
  'WhatsApp Image 2026-08-06 at 23.02.03.jpeg': 'ai-course-interactive-whiteboard',
  'WhatsApp Image 2026-08-06 at 23.02.03 (2).jpeg': 'ai-course-whiteboard-pair',
  'Staff Training -main.jpg': 'staff-training-course-room',
  '565375908_1327804759037420_4533452975364599949_n.jpg': 'wellbeing-course-yoga-studio',
  '001a.jpeg': 'wellbeing-course-mindfulness-studio',
  'IMG20230810185734.jpg': 'wellbeing-course-park-activity',
  '524130581_1262690682215495_566023478563279110_n.jpg': 'wellbeing-course-puppets-workshop',
  '006.jpeg': 'outdoor-course-montjuic-view',
  '01 Outdoors.jpeg': 'outdoor-course-climbing-wall',
  '02 SUSTANIABILITY - copia.jpg': 'sustainability-course-wetland-walk',
  'IMG20230509140713.jpg': 'outdoor-course-gothic-courtyard',
  'sen01.jpg': 'inclusion-course-school-classroom',
  'SEN.jpeg': 'inclusion-course-certificates-gallery',
  'area-inclusion.webp': 'inclusion-course-card-worktable',
  'IMG-20230630-WA0010.jpg': 'classroom-course-whiteboard-group',
  'Marzo 14-16.jpg': 'classroom-course-game-table',
  '04 concert in the park.jpg': 'classroom-course-guided-activity',
  'ENGLIHS B.jpg': 'classroom-course-large-class',
  '01 ART.jpg': 'creative-course-drawing-studio',
  '02ll.jpg': 'creative-course-easels',
  '000.jpeg': 'creative-course-gallery-group',
  '00.jpeg': 'ethics-course-arcade-cafe',
  'Adopcion 1.jpg': 'ethics-course-institution-visit',
  '00 SpainBcn ENGLISH with JAMES.jpg': 'english-course-worksheets-table',
  'May 9 -13 Level Beginners.jpg': 'english-course-beginners-whiteboard',
  'ENGLISH 7.jpg': 'english-course-group-waving',
  'WhatsApp Image 2026-08-06 at 23.02.03 (1).jpeg': 'english-course-wordgame-whiteboard',
  'Jovenes 1.jpg': 'student-group-certificates-teacher',
  'Jovenes 2.jpg': 'student-group-viewpoint-dusk-barcelona',
  'Jovenes 3.jpg': 'student-group-sculpture-courtyard',
  'Jovenes 4.jpg': 'student-group-laptops-classroom',
  'SPANISH 1.jpg': 'spanish-course-sitting-room',
  'Marzo 27-31 español.jpg': 'spanish-course-office-group',
  'SPANISH 3.jpg': 'spanish-course-studio-whiteboard',
  'SPANISH 4.jpg': 'spanish-course-prints-wall',
};

// Already-compressed sources are re-encoded a little more gently, so a
// second generation of WebP does not show. Only the photographs a page
// still uses are processed; the rest of the archive stays in source-photos/.
const SPAINBCN = {
  'location-2.webp': 'course-group-arc-de-triomf-barcelona',
  'group-of-people-sitting-at-a-long-table.webp': 'course-group-cafe-terrace-barcelona',
  'a-group-of-seven-women-and-one-young-man.webp': 'course-group-spainbcn-classroom',
  'loc-barcelona-group.webp': 'course-group-cathedral-square-barcelona',
  'a-group-of-women-sitting-around-a-table.webp': 'course-group-coloured-card-workshop',
  'loc-barcelona-class.webp': 'course-group-barcelona-classroom',
};

// Two portraits are whole-body snapshots where no automatic crop finds a
// usable head-and-shoulders frame. cx/cy is the face, h the share of the
// image height the crop should cover.
const PORTRAIT_CROP = {
  'julie.jpeg': { cx: 0.50, cy: 0.44, h: 0.40 },
  'adriana.png': { cx: 0.50, cy: 0.60, h: 0.58 },
  'russell.jpeg': { cx: 0.26, cy: 0.55, h: 0.66 },
  'sandra.jpeg': { cx: 0.42, cy: 0.42, h: 0.63 },
};

// Everything under OUT is generated, so start from empty and leave no
// stale file behind when a photograph stops being used.
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'team'), { recursive: true });

const manifest = {};

// One pipeline for all three photograph sets: .rotate() bakes in any
// EXIF orientation, and the ratio follows the same orientation so the
// rendered width/height can never be the transpose of the pixels.
async function processSet(photos, dir, quality) {
  for (const [src, name] of Object.entries(photos)) {
    const from = path.join(dir, src);
    if (!fs.existsSync(from)) { console.warn('missing original:', from); continue; }
    const meta = await sharp(from).metadata();
    const upright = (meta.orientation || 1) >= 5;   // EXIF says the pixels are rotated
    const sourceW = upright ? meta.height : meta.width;
    const sizes = [];
    for (const w of WIDTHS) {
      if (w > sourceW) continue;
      await sharp(from).rotate().resize({ width: w }).webp({ quality })
        .toFile(path.join(OUT, `${name}-${w}.webp`));
      sizes.push(w);
    }
    if (!sizes.length) {
      await sharp(from).rotate().webp({ quality }).toFile(path.join(OUT, `${name}-${sourceW}.webp`));
      sizes.push(sourceW);
    }
    const ratio = upright ? meta.height / meta.width : meta.width / meta.height;
    manifest[name] = { widths: sizes, ratio: +ratio.toFixed(4) };
    console.log(name, sizes.join('/'), `${meta.width}x${meta.height}${upright ? ' (rotated)' : ''}`);
  }
}

await processSet(PHOTOS, 'uploads', 76);
await processSet(ERASMUS, 'Images-Erasmus', 76);
// Already-compressed sources re-encode a little more gently (see above).
await processSet(SPAINBCN, 'source-photos/spainbcn', 82);

// Team portraits: one modest width, square-ish crop handled in CSS.
const TEAM_DIR = 'source-photos/team';
if (fs.existsSync(TEAM_DIR)) {
  for (const f of fs.readdirSync(TEAM_DIR)) {
    const from = path.join(TEAM_DIR, f);
    if (!fs.statSync(from).isFile() || !/\.(jpe?g|png|webp)$/i.test(f)) continue;
    const name = 'team-' + path.parse(f).name.toLowerCase();
    const meta = await sharp(from).metadata();
    // The portraits vary a lot: some are head-and-shoulders, some are
    // whole-body holiday snaps. Cropping to the most salient region finds
    // the face in both, where a fixed top crop cut some people at the eyes
    // and left others as a dot in a landscape. Never upscale a small original.
    const crop = PORTRAIT_CROP[f];
    let pipeline = sharp(from);
    let sourceW = meta.width;

    if (crop) {
      const height = Math.round(meta.height * crop.h);
      const width = Math.round(height * 10 / 11);
      const left = Math.max(0, Math.min(meta.width - width, Math.round(meta.width * crop.cx - width / 2)));
      const top = Math.max(0, Math.min(meta.height - height, Math.round(meta.height * crop.cy - height / 2)));
      pipeline = pipeline.extract({ left, top, width, height });
      sourceW = width;
    }

    const w = Math.min(480, sourceW);
    await pipeline
      .resize({ width: w, height: Math.round(w * 11 / 10), fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, 'team', `${name}.webp`));
    manifest[name] = { widths: [w], ratio: 10 / 11, team: true, source: `${meta.width}x${meta.height}` };
    console.log('team:', name, `${meta.width}x${meta.height} -> ${w}${crop ? ' (face crop)' : ''}`);
  }
}

// The icon: source in tools/, both published forms generated here, so the
// output directory can be wiped without losing anything hand-made.
fs.copyFileSync('tools/favicon.svg', path.join(OUT, 'favicon.svg'));
await sharp('tools/favicon.svg').resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
console.log('favicon.svg · apple-touch-icon.png');

// Sharing card: a JPEG, because not every social scraper reads WebP.
await sharp('source-photos/spainbcn/a-group-of-thirteen.webp')
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82 })
  .toFile(path.join(OUT, 'og-image.jpg'));
console.log('og-image.jpg 1200x630');

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('\n' + Object.keys(manifest).length + ' images written to ' + OUT);
