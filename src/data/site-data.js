// ============================================================
// ErasmusInBarcelona.com — single source of shared facts.
//
// Every page renders from this file at build time. Nothing here
// may be re-typed into a template: if a number, a price, a date
// or an address appears on the site, it comes from here.
//
// Sources, in the order they take precedence:
//   1. the organisation's own DATES-SPAINBCN sheet (course weeks)
//   2. www.spainbcn.com, the current catalogue and price list
//   3. the organisation's published contact/legal details
// Each block records when it was checked against those sources.
// Re-check prices, dates and programme names against SpainBcn
// before each publish.
// ============================================================

export const organisation = {
  name: 'Erasmus in Barcelona',
  by: 'SpainBcn-Programs',
  legalName: 'SPAINBCN-PROGRAMS IN BARCELONA S.L.',
  nif: 'B72643455',
  founded: 1997,
  oid: 'E10336106',
  founders: 'María Ángeles and Miriam',
};

const OFFICE_WALK = 'five minutes on foot from the Sagrada Família';

export const contact = {
  email: 'Hola@SpainBcn.com',
  emailHref: 'mailto:Hola@SpainBcn.com',
  phone: '(+34) 633 163 789',
  phoneHref: 'tel:+34633163789',
  whatsapp: 'https://wa.me/34633163789',
  street: 'Carrer del Pare Lainez 19',
  postcode: '08025',
  city: 'Barcelona',
  get address() { return `${this.street}, ${this.postcode} ${this.city}`; },
  officeWalk: OFFICE_WALK,
  officeNote: `${OFFICE_WALK.charAt(0).toUpperCase()}${OFFICE_WALK.slice(1)}. Metro: Sagrada Família (L2, L5), Verdaguer (L4, L5).`,
  venueNote: 'Courses run in two parts of the city: Gràcia, around the office, and Barceloneta by the '
    + 'sea. We confirm which one when you sign up.',
  replyTime: 'We normally reply within two working days.',
};

// Only the accounts the organisation currently publishes.
export const social = [
  { name: 'Facebook', url: 'https://www.facebook.com/SpainBcnStaffTrainingWeek/' },
  { name: 'Instagram', url: 'https://www.instagram.com/spainbcnerasmus/' },
];

export const reviews = {
  rating: '4.9',
  count: 134,
  url: 'https://www.google.com/search?q=reviews+spainbcn-programs+barcelona&tbm=lcl',
};

export const spainbcn = {
  home: 'https://www.spainbcn.com/',
  catalogue: 'https://www.spainbcn.com/courses.html',
  locations: 'https://www.spainbcn.com/locations.html',
  projects: 'https://www.spainbcn.com/projects.html',
  barcelona: 'https://www.spainbcn.com/barcelona.html',
  about: 'https://www.spainbcn.com/about.html',
  contact: 'https://www.spainbcn.com/contact.html',
};

// ============================================================
// The organisation's sign-up form, hosted by forms.app. Nothing is
// requested from forms.app until a visitor allows it.
//
// The form itself ("Sign Up Now!") asks four questions; the ids are
// its own, read from the published form definition, and are used to
// pass the group planner's answers into the matching field.
// ============================================================
// Who serves the site. Named in /privacy/ as the processor for the server
// logs. Details from Dinahosting's own legal notice, dinahosting.com/legal.
export const hosting = {
  name: 'Dinahosting S.L.',
  country: 'Spain',
  place: 'Santiago de Compostela',
  privacy: 'https://en.dinahosting.com/legal/proteccion-datos',
};

export const formsApp = {
  id: '6a6cadc0a2c530505fdac56f',
  host: 'https://rear0ghq.forms.app',
  privacy: 'https://forms.app/en/privacy-policy',
  cookies: 'https://forms.app/en/cookie-policy',
  // The "Sign Up!" side tab, on every page except the contact page (which
  // carries the form itself). These are the dashboard's own sidetab embed
  // settings, copied from its snippet on 30 August 2026 — including its
  // host, which the snippet issues as eu.forms.app rather than the form's
  // subdomain above. The local stand-in tab (layout.js, site.css) is drawn
  // from the same values; its position in site.css matches `align`.
  sidetab: {
    host: 'https://eu.forms.app',
    text: 'Sign Up!',
    color: '#ff9e24',
    align: { horizontal: 'right', vertical: 'middle' },
    width: '400px',
    height: '300px',
  },
  fields: {
    name: { id: '6a6cae069a7b7458ace74c76', label: 'Full name', type: 'name' },
    email: { id: '6a6cae229a7b7458ace74c77', label: 'Email', type: 'email' },
    interest: {
      id: '6a6cae849a7b7458ace74c7f',
      label: 'What course, location and date are you interested in?',
      type: 'line',
    },
    message: { id: '6a6cae579a7b7458ace74c79', label: 'Any questions or comments?', type: 'block' },
  },
};

// Fees per person, Barcelona, from the subject-area pages on SpainBcn.
// Other Spanish destinations cost more; they are SpainBcn's to publish.
export const pricing = {
  currency: '€',
  barcelona: { hours20: 400, hours25: 450 },
  includesList: ['The teaching', 'All course materials', 'The week\'s two cultural activities'],
  includes: 'The fee covers the teaching, all course materials and the week\'s two cultural activities.',
  travel: 'You arrange travel, accommodation and meals.',
  travelKa1: 'Under Erasmus+ KA1, travel and accommodation come from the grant\'s own budget lines '
    + 'rather than from the course fee.',
  groups: 'A private week or a group project is quoted on numbers, length and content, and the fee and the invoicing are confirmed in writing before you commit.',
};

// The other SpainBcn destinations, from spainbcn.com/locations.html
// (checked 2026-08-20). Barcelona is this site's own and is not listed.
export const destinations = ['Málaga', 'Mallorca', 'Gran Canaria', 'Tenerife', 'Tarragona'];
export const destinationsSentence = `SpainBcn also runs course weeks in ${destinations.slice(0, -1).join(', ')} and ${destinations[destinations.length - 1]}.`;

// Booking, money and cancellation, from SpainBcn's published terms
// (spainbcn.com/terms.html, reviewed there 4 August 2026). These are the
// questions a participant or a finance office actually asks, so the site
// answers them rather than sending people to read the terms.
// What the site sells, for anyone editing the copy: Erasmus+ KA1 staff
// training in Barcelona, for teachers and other people working in
// education — schools, universities, VET centres, adult education. Both
// teaching and non-teaching staff, depending on the course. Erasmus+ is
// the usual funding route but people also book through their institution
// or directly with us. Student groups and institutional programmes are
// separate offers.
//
// That belongs in the page titles and descriptions, and in the booking
// and institutional copy. It does not belong in the first four lines a
// visitor reads, which is why there is no data field for it: writing it
// out once, where it helps, beats interpolating a taxonomy everywhere.

const VAT_LINE = 'The fee is exempt from VAT as an educational service, so no VAT is added and none '
  + 'appears on the invoice.';

export const booking = {
  steps: [
    'You write with the course and the week. We reply within two working days.',
    'We send the pre-registration confirmation and the documents a KA1 application needs.',
    'You sign up and confirm. We send an acceptance letter if your institution needs one.',
    'We set out the fee, the dates and the invoicing in writing. That confirmation is the contract.',
  ],
  contractWith: 'We invoice whoever is booking — your institution, or the participant directly.',
  vatLine: VAT_LINE,
  vat: `${VAT_LINE} If your finance office needs that in writing for a purchase order or a grant claim, ask.`,
  payment: 'There is no deposit, and nothing is payable until the arrangement is agreed in writing.',
  cancellation: 'Cancel more than 14 days before the course and we refund the fee in full. At 14 days '
    + 'or less we refund half and hold the rest as credit towards another week, at any SpainBcn '
    + 'destination. We don\'t apply that if you have to cancel because of illness, a family emergency, '
    + 'lost funding or a problem at your institution.',
  changes: 'Changing a participant\'s name, moving to another week or switching course costs nothing.',
};

// The atoms below exist so that pages needing part of a fact — the days
// alone, the activities without their terms — compose from the same
// strings the full sentences use, and the two can never disagree.
const DAYS = 'Monday to Friday';
const CERTIFICATE = 'Certificate of attendance';
const ACTIVITIES = 'Two afternoons are given to the week\'s cultural activities.';
const ACTIVITIES_TERMS = 'Both are included in the fee, both are optional, and someone from the team goes with the group.';

export const schedule = {
  days: DAYS,
  pattern: `Classes run ${DAYS} mornings.`,
  hoursShort: '20 or 25 hours',
  hours: 'You choose 20 or 25 hours a week when you book.',
  // The two-week format belongs to one programme. Every SpainBcn subject
  // area publishes "One week, Mon-Fri"; only AI & ICT adds "or two
  // (50 over two weeks)", for the AI & ICT Intensive. Checked area by
  // area on spainbcn.com, 2026-08-22.
  twoWeeks: 'Courses run one week; the two-week AI & ICT Intensive runs 50 hours across two adjacent weeks.',
  activitiesShort: ACTIVITIES,
  activitiesTerms: ACTIVITIES_TERMS,
  activities: `${ACTIVITIES} ${ACTIVITIES_TERMS}`,
  freeAfternoons: 'The other three afternoons are yours.',
  materials: 'Course materials are handed out on the first day.',
  certificate: CERTIFICATE,
  certificateNote: 'Issued on the final day of the course.',
  certificateLine: `${CERTIFICATE}, issued on the final day of the course.`,
  groupSize: 'Groups are small, usually with participants from several European countries.',
  // Counted from the `level` fields in src/data/course-groups.js on
  // 2026-09-01: 12 of the 27 courses run for all levels, 9 at a single
  // introductory or advanced level, and the English and Spanish groups
  // also run language weeks grouped by level.
  levels: 'Most courses run for all levels or at a single introductory or advanced level; the English and Spanish language weeks group by level from A1 to C1.',
  // Checked area by area on spainbcn.com, 2026-08-22; the Language + ICT
  // exception is the one SpainBcn's AI & ICT area publishes.
  language: 'Courses are taught in English, except the Spanish courses, which are taught in Spanish. The Language + ICT week runs in either.',
};

// The example week SpainBcn publishes for Barcelona
// (spainbcn.com/barcelona.html, checked 2026-08-20). Which activities
// run changes from week to week; /your-week/ says so beside the table.
export const exampleWeek = [
  { day: 'Monday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Old town walking tour', kind: 'activity' }] },
  { day: 'Tuesday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Free', kind: 'free' }] },
  { day: 'Wednesday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Free', kind: 'free' }] },
  { day: 'Thursday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Montjuïc and the Olympic Stadium', kind: 'activity' }] },
  { day: 'Friday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Free', kind: 'free' }] },
];

// Documents the organisation provides for Erasmus+ paperwork.
export const documents = [
  { name: 'Invitation letter', note: 'For grant agreements and travel.' },
  { name: 'Pre-registration confirmation', note: 'For KA1 applications.' },
  { name: 'Acceptance letter', note: 'Sent once a place is confirmed, where one is needed.' },
  { name: 'Course description and programme', note: 'With the contact hours and what the week covers.' },
  { name: schedule.certificate, note: schedule.certificateNote },
  { name: 'Europass Mobility support', note: 'Course information, dates and confirmation.' },
  { name: 'Invoice', note: 'For your grant records.' },
];

// What we can host beyond a scheduled course week.
export const projectFormats = [
  'A scheduled course week your staff join',
  'A private course week for your institution alone',
  'A week combining several subjects, scoped to what the project has to achieve',
  'Job shadowing at Spanish schools and education organisations',
  'Educational visits',
];

// ============================================================
// SUBJECT AREAS
//
// The DATES-SPAINBCN sheet tags each course week with one of these
// areas; the /dates/ filter groups weeks by them, and
// tools/refresh-dates.mjs validates every imported row against the
// ids. The courses this site sells are the nine Barcelona course
// groups in src/data/course-groups.js; the full SpainBcn catalogue
// stays on spainbcn.com.
// ============================================================
const SB = 'https://www.spainbcn.com/';

export const courseAreas = [
  { id: 'ai', label: 'AI and digital teaching' },
  { id: 'english', label: 'English and communication' },
  { id: 'spanish', label: 'Spanish' },
  { id: 'inclusion', label: 'Inclusion and special needs' },
  { id: 'wellbeing', label: 'Wellbeing and classroom practice' },
  { id: 'creative', label: 'Creative and experiential learning' },
];


// ============================================================
// UNIVERSITY STAFF
//
// The programmes whose published audience on SpainBcn names
// university staff, for /universities/. University AI & ICT is the
// one written for higher education alone — its audience is
// university teaching, research and administrative staff, nobody
// else. Audiences checked programme by programme on the SpainBcn
// subject-area pages, 2026-08-22.
// ============================================================
export const universityProgrammes = {
  dedicated: {
    name: 'University AI & ICT',
    url: SB + 'group-ai-ict.html#university-ai-and-ict',
    audience: 'university teaching, research and administrative staff',
    desc: 'Digital tools for lectures, seminars and research support, and where AI fits academic work.',
  },
  groups: [
    {
      label: 'AI and digital teaching',
      areaId: 'ai',
      items: [
        { name: 'Artificial Intelligence in Education', url: SB + 'group-ai-ict.html#artificial-intelligence-in-education' },
        { name: 'Innovative teaching methods with ICT', url: SB + 'group-ai-ict.html#innovative-teaching-methods-with-ict' },
      ],
    },
    {
      label: 'English and communication',
      areaId: 'english',
      items: [
        { name: 'General English by level', url: SB + 'group-english.html#general-english-by-level' },
        { name: 'Culture & History in English', url: SB + 'group-english.html#culture-and-history-in-english' },
        { name: 'Presentation Skills', url: SB + 'group-presentation.html#presentation-skills' },
        { name: 'Advanced Presentation Skills', url: SB + 'group-presentation.html#advanced-presentation-skills' },
      ],
    },
    {
      label: 'Spanish',
      areaId: 'spanish',
      items: [
        { name: 'General Spanish by level', url: SB + 'group-spanish.html#general-spanish-by-level' },
        { name: 'Culture & History in Spanish', url: SB + 'group-spanish.html#culture-and-history-in-spanish' },
      ],
    },
  ],
};

// ============================================================
// COURSE WEEKS IN BARCELONA
//
// A snapshot of the organisation's DATES-SPAINBCN sheet
// (gid 480287972), refreshed by `npm run dates`
// (tools/refresh-dates.mjs), which rewrites `dates` and
// datesSource.importedOn — the date of the last refresh — in
// place. Barcelona rows only; the other destinations belong to
// SpainBcn. Course labels are the sheet's own.
//
// The sheet records scheduled weeks and nothing else, so every
// row here is "scheduled". Do not invent another state.
// ============================================================
export const datesSource = {
  sheet: 'https://docs.google.com/spreadsheets/d/1V2xozrjvgq4rIP1V-iPUSz5nrvTqSZWV0y9mr4f2kOE/edit?gid=480287972',
  importedOn: '2026-08-23',
  note: 'Other dates and levels open on request.',
};

export const dates = [
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'English', area: 'english' },
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'Spanish', area: 'spanish' },
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'Integration and classroom management', area: 'wellbeing' },
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'Public Speaking', area: 'english' },
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'AI & ICT', area: 'ai' },
  { start: '2026-09-21', end: '2026-09-25', label: '21–25', month: 'Sep', course: 'Mindfulness in the classroom', area: 'wellbeing' },
  { start: '2026-09-28', end: '2026-10-02', label: '28 Sep – 2 Oct', month: '', course: 'English', area: 'english' },
  { start: '2026-10-12', end: '2026-10-16', label: '12–16', month: 'Oct', course: 'English', area: 'english' },
  { start: '2026-10-19', end: '2026-10-23', label: '19–23', month: 'Oct', course: 'English', area: 'english' },
  { start: '2026-10-19', end: '2026-10-23', label: '19–23', month: 'Oct', course: 'AI & ICT', area: 'ai' },
  { start: '2026-11-09', end: '2026-11-13', label: '9–13', month: 'Nov', course: 'AI & ICT', area: 'ai' },
  { start: '2026-11-09', end: '2026-11-13', label: '9–13', month: 'Nov', course: 'English', area: 'english' },
];

// `dates` has one row per course, so several rows share a calendar week.
// Anything that counts or lists weeks must go through here, or the site
// says "12 weeks" when there are twelve courses across six.
export const weeks = (() => {
  const byWeek = new Map();
  for (const row of dates) {
    const key = `${row.start}|${row.end}`;
    if (!byWeek.has(key)) {
      byWeek.set(key, { start: row.start, end: row.end, label: row.label, month: row.month, courses: [] });
    }
    byWeek.get(key).courses.push({ course: row.course, area: row.area });
  }
  return [...byWeek.values()];
})();

// What the pages render: the weeks that have not ended by the build
// date, so a stale snapshot can never present a past week as upcoming.
// `dates` and `weeks` above stay unfiltered on purpose — the publish
// guard (scripts/guards.mjs) reads them to demand a re-export, and
// `npm run dates` rewrites the raw rows.
const today = new Date().toISOString().slice(0, 10);
export const upcomingWeeks = weeks.filter((w) => w.end >= today);

/** The next upcoming weeks offering one of the sheet's course labels. */
export const upcomingWeeksFor = (labels, limit) => upcomingWeeks
  .map((w) => ({ ...w, courses: w.courses.filter((c) => labels.includes(c.course)) }))
  .filter((w) => w.courses.length)
  .slice(0, limit);

// ============================================================
// PEOPLE — names and roles as the organisation publishes them.
// ============================================================
export const team = {
  core: [
    { name: 'Miriam', role: 'Academic coordinator', img: 'team-miriam' },
    { name: 'Adriana', role: 'Administration', img: 'team-adriana' },
    { name: 'Russell', role: 'ICT and AI trainer', img: 'team-russell' },
  ],
  trainers: [
    { name: 'Julie', role: 'English', img: 'team-julie' },
    { name: 'Nigel', role: 'English', img: 'team-nigel' },
    { name: 'James', role: 'English', img: 'team-james' },
    { name: 'Marius', role: 'English', img: 'team-marius' },
    { name: 'Jan', role: 'English', img: 'team-jan' },
    { name: 'Mike', role: 'English and ICT', img: 'team-mike' },
    { name: 'Toni', role: 'Spanish and ICT', img: 'team-toni' },
    { name: 'Alberto', role: 'Spanish', img: 'team-alberto' },
    { name: 'Sandra', role: 'Spanish', img: 'team-sandra' },
  ],
};

export const history = [
  { year: '1997', title: 'The beginning', text: 'María Ángeles and Miriam founded SpainBcn in Barcelona, teaching Spanish to international students.' },
  { year: '2000s', title: 'A language school', text: 'Students came from all over the world to learn Spanish in Barcelona.' },
  { year: '2010s', title: 'From language courses to European mobility', text: 'European teachers began arriving through Erasmus+ staff mobility, and the catalogue grew from language classes into professional training.' },
  { year: 'Today', title: 'Barcelona and five more destinations', text: `Courses run in ${['Barcelona', ...destinations.slice(0, -1)].join(', ')} and ${destinations[destinations.length - 1]}, for schools, universities, VET and adult-education organisations across Europe.` },
];

// ============================================================
// PHOTOGRAPHY — the organisation's own photographs, processed by
// tools/build-images.mjs into src/assets/images/. Originals stay
// in uploads/ and source-photos/, which are not published.
// ============================================================
export const images = {
  // Each photograph appears on exactly one page, with two exceptions the
  // owner named in the files themselves: blueScreenClassroom opens both
  // /universities/ and the AI course group, and each group's hero appears
  // again on its /courses/ index card. Alt text claims only what the
  // photograph shows; a place is named only when it is identifiable.
  heroGroup: {
    file: 'course-group-sunlit-room',
    alt: 'A course group photographed together in a sunlit room',
  },
  arcDeTriomf: {
    file: 'course-group-arc-de-triomf-barcelona',
    alt: 'A course group waving on the palm-lined promenade in front of the Arc de Triomf in Barcelona',
    focus: '50% 52%',
  },
  spanishWhiteboard: {
    file: 'spanish-course-group-whiteboard',
    alt: 'A course group in front of a whiteboard of Spanish grammar notes',
  },
  cafeTerrace: {
    file: 'course-group-cafe-terrace-barcelona',
    alt: 'Course participants raising their glasses at a café terrace in Barcelona',
    focus: '50% 50%',
  },
  barceloneta: {
    file: 'barceloneta-seafront-barcelona',
    alt: 'Palm trees and evening light on the Barceloneta seafront',
    focus: '50% 50%',
  },
  galleryRoom: {
    file: 'course-group-gallery-room',
    alt: 'A course group photographed together in a room hung with framed prints',
  },
  ictDayByDay: {
    file: 'ict-course-group-day-by-day',
    alt: "An ICT course group around the table in the SpainBcn classroom, the week's day-by-day programme on the screen",
  },
  ciutadella: {
    file: 'student-group-ciutadella-barcelona',
    alt: 'A student group at the Cascada Monumental in Parc de la Ciutadella, Barcelona',
    focus: '50% 58%',
  },
  seaGroup: {
    file: 'student-group-viewpoint-barcelona',
    alt: 'A student group sitting together at a viewpoint over the sea in Barcelona',
    focus: '50% 50%',
  },
  studentCertificates: {
    file: 'student-group-certificates-classroom',
    alt: 'A student group holding up their certificates in the classroom',
    focus: '50% 45%',
  },
  parkGuell: {
    file: 'student-group-park-guell-barcelona',
    alt: 'A student group under the stone colonnade in Park Güell, Barcelona',
    focus: '50% 65%',
  },
  staffOffice: {
    file: 'staff-group-spainbcn-office',
    alt: 'A course group in the sitting room at the SpainBcn office, under the SpainBcn-Programs sign',
  },
  sittingRoom: {
    file: 'course-group-spainbcn-sitting-room',
    alt: 'A course group in wicker chairs around the table in the SpainBcn sitting room',
    focus: '50% 55%',
  },
  spanishOffice: {
    file: 'spanish-course-group-spainbcn-office',
    alt: 'A Spanish course group in the sitting room at the SpainBcn office in Barcelona',
    focus: '50% 72%',
  },
  officeClassroom: {
    file: 'course-group-spainbcn-classroom',
    alt: 'Participants at laptops in the SpainBcn classroom in Barcelona',
    focus: '50% 55%',
  },
  founders: {
    file: 'spainbcn-founders-1997',
    alt: 'María Ángeles and Miriam at the SpainBcn exhibition stand in 1997',
    focus: '50% 45%',
  },
  // From the SpainBcn archive (see source-photos/spainbcn/README.md for
  // what each may claim), processed for the course-group pages.
  cathedralSquare: {
    file: 'course-group-cathedral-square-barcelona',
    alt: 'A course group in the square in front of Barcelona cathedral',
    focus: '50% 55%',
  },
  cardWorkshop: {
    file: 'course-group-coloured-card-workshop',
    alt: 'Participants working with coloured card at classroom tables',
  },
  barcelonaClassroom: {
    file: 'course-group-barcelona-classroom',
    alt: 'Participants and their trainer at the desks of a Barcelona classroom',
  },

  // ----------------------------------------------------------
  // The owner's Images-Erasmus delivery of 31 August 2026,
  // placed on the course-group pages (and the two pages the
  // filenames name). Processed by tools/build-images.mjs from
  // Images-Erasmus/, which keeps the originals.
  // ----------------------------------------------------------
  blueScreenClassroom: {
    file: 'course-group-blue-screen-classroom',
    alt: 'A course group in front of the blue screen of the classroom, two of them holding certificates',
  },
  aiLaptopsClassroom: {
    file: 'ai-course-laptops-classroom',
    alt: 'Participants at laptops in rows of desks in a modern classroom',
  },
  aiLaptopRows: {
    file: 'ai-course-laptop-rows',
    alt: 'A course group working at laptops in a modern classroom',
  },
  aiWhiteboard: {
    file: 'ai-course-interactive-whiteboard',
    alt: 'A trainer and a participant matching vocabulary pairs on an interactive whiteboard',
  },
  aiWhiteboardPair: {
    file: 'ai-course-whiteboard-pair',
    alt: 'Two participants working together at an interactive whiteboard',
  },
  staffTrainingRoom: {
    file: 'staff-training-course-room',
    alt: 'A staff training group of thirteen photographed in the course room',
  },
  yogaStudio: {
    file: 'wellbeing-course-yoga-studio',
    alt: 'Five participants balancing on one leg in a bright studio',
    focus: '50% 45%',
  },
  mindfulnessStudio: {
    file: 'wellbeing-course-mindfulness-studio',
    alt: 'A session in a movement studio, four participants in embroidered Spanish shawls, Mindfulness on the whiteboard',
  },
  parkActivity: {
    file: 'wellbeing-course-park-activity',
    alt: 'Participants at a balance exercise among the trees of a park',
  },
  puppetsWorkshop: {
    file: 'wellbeing-course-puppets-workshop',
    alt: 'Participants holding hand puppets in a workshop space, a picture book behind them',
  },
  montjuicView: {
    file: 'outdoor-course-montjuic-view',
    alt: 'Course participants above the open-air pool on Montjuïc, Barcelona spread out below',
  },
  climbingWall: {
    file: 'outdoor-course-climbing-wall',
    alt: 'Three participants at an indoor climbing wall, one of them on the holds',
  },
  wetlandWalk: {
    file: 'sustainability-course-wetland-walk',
    alt: 'Five participants beside a wetland on a nature walk',
  },
  gothicCourtyard: {
    file: 'outdoor-course-gothic-courtyard',
    alt: 'A course group on the stone staircase of a Gothic courtyard in Barcelona',
    focus: '50% 40%',
  },
  senClassroom: {
    file: 'inclusion-course-school-classroom',
    alt: 'A course group in a school classroom with child-size chairs and a mosaic screen',
  },
  senCertificates: {
    file: 'inclusion-course-certificates-gallery',
    alt: 'Seven participants holding their certificates in a room hung with paintings',
    focus: '50% 55%',
  },
  cardWorktable: {
    file: 'inclusion-course-card-worktable',
    alt: 'Participants folding coloured card around a white worktable',
  },
  whiteboardGroup: {
    file: 'classroom-course-whiteboard-group',
    alt: 'A course group of twelve in front of the classroom whiteboard',
  },
  gameTable: {
    file: 'classroom-course-game-table',
    alt: 'A course group around a table with a board game mid-play',
  },
  guidedActivity: {
    file: 'classroom-course-guided-activity',
    alt: 'A guided group exercise on the terrace of a park',
  },
  largeClass: {
    file: 'classroom-course-large-class',
    alt: 'A large course group standing behind the front tables of a classroom',
  },
  drawingStudio: {
    file: 'creative-course-drawing-studio',
    alt: 'Participants drawing at the table of a painter\'s studio, the painter standing behind them',
  },
  easels: {
    file: 'creative-course-easels',
    alt: 'Two participants and their tutor beside easels holding their charcoal drawings',
  },
  galleryGroup: {
    file: 'creative-course-gallery-group',
    alt: 'A course group in a gallery hung with paintings, certificates in hand',
  },
  arcadeCafe: {
    file: 'ethics-course-arcade-cafe',
    alt: 'A course group at the tables of a café under a Barcelona arcade',
  },
  institutionVisit: {
    file: 'ethics-course-institution-visit',
    alt: 'A course group on a seminar visit to a Catalan children\'s-services institution',
  },
  englishWorksheets: {
    file: 'english-course-worksheets-table',
    alt: 'An English course group around the table with their worksheets',
    focus: '50% 42%',
  },
  englishBeginners: {
    file: 'english-course-beginners-whiteboard',
    alt: 'A beginners\' English group waving, the week\'s grammar on the whiteboard',
  },
  englishWaving: {
    file: 'english-course-group-waving',
    alt: 'Eight participants waving in the SpainBcn sitting room',
  },
  englishWordgame: {
    file: 'english-course-wordgame-whiteboard',
    alt: 'Two participants at a word game on the interactive whiteboard',
  },
  // The Jovenes set, for /bring-a-group/: a student week in four
  // photographs — in class, the certificates, and two evenings out.
  jovenesClass: {
    file: 'student-group-laptops-classroom',
    alt: 'A student class at laptops, their teachers standing at the back',
  },
  jovenesCertificates: {
    file: 'student-group-certificates-teacher',
    alt: 'A student group holding up their certificates with their teacher',
  },
  jovenesViewpoint: {
    file: 'student-group-viewpoint-dusk-barcelona',
    alt: 'A student group with their teachers at a viewpoint over Barcelona at dusk',
  },
  jovenesSculpture: {
    file: 'student-group-sculpture-courtyard',
    alt: 'A student group in front of a large sculpture in a floodlit stone courtyard, on an evening visit',
    focus: '50% 70%',
  },
  spanishSittingRoom: {
    file: 'spanish-course-sitting-room',
    alt: 'A Spanish course group among the plates and paintings of the SpainBcn sitting room',
  },
  spanishOfficeGroup: {
    file: 'spanish-course-office-group',
    alt: 'A Spanish course group under the SpainBcn-Programs sign in the office',
  },
  spanishStudioWhiteboard: {
    file: 'spanish-course-studio-whiteboard',
    alt: 'A Spanish course group in an art studio, Spanish phrases on the whiteboard',
  },
  spanishPrintsWall: {
    file: 'spanish-course-prints-wall',
    alt: 'A course group in front of a wall of framed Spanish scenes',
  },
};

// Only photographs that a page actually uses are processed. The rest of the
// archive is listed in tools/build-images.mjs; the originals are in uploads/
// and source-photos/, neither of which is published.
