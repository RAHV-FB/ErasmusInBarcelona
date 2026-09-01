// ============================================================
// Refresh the Barcelona course weeks from the DATES-SPAINBCN sheet.
//
//   node tools/refresh-dates.mjs             fetch, rewrite site-data.js
//   node tools/refresh-dates.mjs --dry-run   fetch, print, change nothing
//
// Reads the sheet named in `datesSource` in src/data/site-data.js —
// the same Google sheet the hand export came from — keeps the
// Barcelona rows whose week has not ended, and rewrites the `dates`
// array and `datesSource.importedOn` in place. Everything else in the
// file is left byte for byte as it was; review with `git diff` before
// publishing, exactly as with a hand export.
//
// It refuses to write rather than guess: an unrecognised course
// label, a date it cannot parse or an empty result all stop it with
// nothing changed. When a new course appears on the sheet, add it to
// COURSES below with the subject area it belongs to.
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { datesSource, dates as currentDates, courseAreas } from '../src/data/site-data.js';
import { courseGroups } from '../src/data/course-groups.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src/data/site-data.js');
const DRY = process.argv.includes('--dry-run');

// Sheet course label (lower-cased, whitespace collapsed) → the label the
// site shows and the subject area on /join-a-course/ it belongs to.
// Variants seen on the sheet ("AI &ICT") normalise to one label here.
const COURSES = {
  'english':                              { label: 'English', area: 'english' },
  'rural english':                        { label: 'Rural English', area: 'english' },
  'teaching methodology for english':     { label: 'Teaching Methodology for English', area: 'english' },
  'methodology':                          { label: 'Methodology', area: 'english' },
  'public speaking':                      { label: 'Public Speaking', area: 'english' },
  'spanish':                              { label: 'Spanish', area: 'spanish' },
  'spanish a1-a2':                        { label: 'Spanish A1–A2', area: 'spanish' },
  'spanish b1-b2':                        { label: 'Spanish B1–B2', area: 'spanish' },
  'ai & ict':                             { label: 'AI & ICT', area: 'ai' },
  'ai &ict':                              { label: 'AI & ICT', area: 'ai' },
  'mindfulness in the classroom':         { label: 'Mindfulness in the classroom', area: 'wellbeing' },
  'integration and classroom management': { label: 'Integration and classroom management', area: 'wellbeing' },
  'sen':                                  { label: 'SEN', area: 'inclusion' },
  'eco':                                  { label: 'ECO', area: 'creative' },
  'outdoor learning':                     { label: 'Outdoor Learning', area: 'creative' },
  'citizenship':                          { label: 'Citizenship', area: 'creative' },
  'leadership & soft skills':             { label: 'Leadership & Soft Skills', area: 'creative' },
};

const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };

const fail = (msg) => { console.error(`refresh-dates: ${msg}`); process.exit(1); };

// The sheet's edit URL is the recorded source; the CSV export of the
// same document and tab is what a script can read without an account.
const m = datesSource.sheet.match(/\/d\/([\w-]+)\/.*[?&]gid=(\d+)/);
if (!m) fail(`cannot read a document id and gid from datesSource.sheet: ${datesSource.sheet}`);
const csvUrl = `https://docs.google.com/spreadsheets/d/${m[1]}/export?format=csv&gid=${m[2]}`;

const res = await fetch(csvUrl, { redirect: 'follow' });
if (!res.ok) fail(`the sheet answered ${res.status}. Is it still shared as "anyone with the link"?`);
const csv = await res.text();
if (!/^Year,Area,Course,Start Date,End Date/.test(csv)) {
  fail('the first row is not the expected header (Year,Area,Course,Start Date,End Date,…).\n'
    + 'The sheet layout has changed — update tools/refresh-dates.mjs to match it.');
}

// Minimal CSV field split. The sheet's values contain no commas today;
// quoted fields are handled anyway so one added comma cannot corrupt a row.
function fields(line) {
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQ = false;
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out.map((f) => f.trim());
}

function parseDate(s) {
  const p = s.match(/^(\d{1,2}) ([A-Z][a-z]{2}) (\d{4})$/);
  if (!p || !MONTHS[p[2]]) return null;
  return { y: +p[3], m: MONTHS[p[2]], d: +p[1], mon: p[2] };
}
const iso = (d) => `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.d).padStart(2, '0')}`;

const today = new Date().toISOString().slice(0, 10);
const rows = [];
const unknown = new Set();

for (const line of csv.split(/\r?\n/).slice(1)) {
  if (!line.trim()) continue;
  const [, area, course, startRaw, endRaw] = fields(line);
  if (area !== 'Barcelona') continue;             // other destinations are SpainBcn's
  const start = parseDate(startRaw);
  const end = parseDate(endRaw);
  if (!start || !end) fail(`cannot parse the dates in this row: ${line}`);
  if (iso(end) < today) continue;                 // the week has already ended
  const key = course.replace(/\s+/g, ' ').trim().toLowerCase();
  const known = COURSES[key];
  if (!known) { unknown.add(course); continue; }
  rows.push({
    start: iso(start),
    end: iso(end),
    // Same-month weeks read "14–18" under a month column; a week that
    // crosses a month boundary carries both months in the label.
    label: start.mon === end.mon ? `${start.d}–${end.d}` : `${start.d} ${start.mon} – ${end.d} ${end.mon}`,
    month: start.mon === end.mon ? start.mon : '',
    course: known.label,
    area: known.area,
  });
}

if (unknown.size) {
  fail(`the sheet has course label(s) this script does not know:\n`
    + [...unknown].map((c) => `  · "${c}"`).join('\n')
    + '\nAdd each to COURSES in tools/refresh-dates.mjs, with its subject area, and run again.');
}
if (!rows.length) fail('no upcoming Barcelona weeks found — the site would offer nothing. Not writing.');

const areaIds = new Set(courseAreas.map((a) => a.id));
for (const r of rows) if (!areaIds.has(r.area)) fail(`"${r.course}" maps to area "${r.area}", which site-data.js does not define.`);

// A label no course group claims still renders on /dates/ and the home
// board, but every "Next in Barcelona" column skips it silently — say so
// rather than let the two quietly disagree.
const claimed = new Set(courseGroups.flatMap((g) => g.dateCourses));
const unclaimed = [...new Set(rows.map((r) => r.course))].filter((c) => !claimed.has(c));
if (unclaimed.length) {
  console.warn('warning: no course group lists these labels in its dateCourses, so their weeks '
    + 'will not appear in any "Next in Barcelona" column:\n'
    + unclaimed.map((c) => `  · "${c}"`).join('\n')
    + '\nAdd each to the right group in src/data/course-groups.js if it should.');
}

// Keep the sheet's own row order within a start date, so a re-run with an
// unchanged sheet produces an unchanged file.
rows.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));

const body = rows.map((r) =>
  `  { start: '${r.start}', end: '${r.end}', label: '${r.label}', month: '${r.month}', course: '${r.course}', area: '${r.area}' },`,
).join('\n');

const weekCount = new Set(rows.map((r) => r.start)).size;
console.log(`${rows.length} course rows across ${weekCount} weeks, Barcelona, ending ${rows[rows.length - 1].end}:`);
for (const r of rows) console.log(`  ${r.start} → ${r.end}  ${r.course}`);

const before = JSON.stringify(currentDates);
const after = JSON.stringify(rows);
const unchanged = before === after;

if (DRY) { console.log('\n--dry-run: nothing written.'); process.exit(0); }

let src = fs.readFileSync(DATA, 'utf8');
const arrayRe = /(export const dates = \[\n)[\s\S]*?(\n\];)/;
if (!arrayRe.test(src)) fail('could not find `export const dates = [` in src/data/site-data.js.');
src = src.replace(arrayRe, `$1${body}$2`);
const importedRe = /(importedOn: ')[\d-]+(')/;
if (!importedRe.test(src)) fail('could not find datesSource.importedOn in src/data/site-data.js.');
src = src.replace(importedRe, `$1${today}$2`);
fs.writeFileSync(DATA, src);

// Saying "no change" and then writing the file reads as a bug. The weeks
// can be unchanged and the file still change, because importedOn records
// when the sheet was last read — which is worth committing on its own: it
// is the difference between a date nobody has checked since August and one
// checked this morning.
if (unchanged) {
  console.log(`\nThe weeks are unchanged. Recorded the check: importedOn ${today}.`);
} else {
  console.log(`\nWrote the weeks to src/data/site-data.js (importedOn: ${today}).`);
}
console.log('Review with `git diff src/data/site-data.js`, then `npm run check` and publish.');
