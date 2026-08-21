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
// Everything below was checked against those sources on
// 2026-08-20. Re-check prices, dates and programme names against
// SpainBcn before each publish.
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
  officeNote: 'Five minutes on foot from the Sagrada Família. Metro L5 Sagrada Família, L4/L5 Verdaguer.',
  venueNote: 'Classes also run at Barceloneta, by the sea. We confirm which venue your week uses with your registration.',
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
export const formsApp = {
  id: '6a6cadc0a2c530505fdac56f',
  host: 'https://rear0ghq.forms.app',
  privacy: 'https://forms.app/en/privacy-policy',
  cookies: 'https://forms.app/en/cookie-policy',
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

export const venues = [
  { area: 'Gràcia', note: 'The office and course rooms, five minutes on foot from the Sagrada Família.' },
  { area: 'Barceloneta', note: 'Classrooms by the sea, used for part of the programme depending on the week.' },
];

// Fees per person, Barcelona, from the subject-area pages on SpainBcn.
// Other Spanish destinations cost more; they are SpainBcn's to publish.
export const pricing = {
  currency: '€',
  barcelona: { hours20: 400, hours25: 450 },
  includes: 'The fee covers the course, materials, the week\'s two cultural activities and your certificate of attendance.',
  travel: 'Travel, accommodation and meals are arranged separately, by you or by your institution.',
  groups: 'A private programme or a group project is quoted for the group: tell us the group and we confirm the fee and the invoicing in writing before you commit.',
};

export const schedule = {
  pattern: 'Classes run Monday to Friday mornings.',
  hours: 'You choose 20 or 25 hours a week when you book, and the fee follows it.',
  twoWeeks: 'Two-week courses run to 50 hours.',
  activities: 'Two afternoons are given to the week\'s cultural activities. Both are included in the fee, both are optional, and someone from the team goes with the group.',
  materials: 'Course materials are handed out on the first day, matched to the levels in the room.',
  certificate: 'Certificate of attendance',
  certificateNote: 'Issued on the final day of the course.',
  groupSize: 'Small international groups. Participants usually come from several European countries in the same week.',
};

// Documents the organisation provides for Erasmus+ paperwork.
export const documents = [
  { name: 'Invitation letter', note: 'For grant agreements and travel.' },
  { name: 'Pre-registration confirmation', note: 'For KA1 applications.' },
  { name: 'Acceptance letter', note: 'When a participant signs up and confirms, if their institution needs one.' },
  { name: 'Course description and programme', note: 'With the contact hours and what the week covers.' },
  { name: 'Certificate of attendance', note: 'Issued on the final day.' },
  { name: 'Europass Mobility support', note: 'Course information, dates and confirmation.' },
  { name: 'Invoice', note: 'For your grant records.' },
];

// What we can host beyond a scheduled course week.
export const projectFormats = [
  'Scheduled course weeks your staff join',
  'Private course weeks for one institution',
  'Tailored training, with subject areas combined',
  'Programmes for student groups',
  'Job shadowing placements',
  'Educational visits',
];

// ============================================================
// COURSES
//
// SpainBcn keeps the catalogue: 39 programmes across 14 subject
// areas. This site curates them into six choices and links each
// programme to its own entry on SpainBcn. Programme names are
// SpainBcn's own — never a name invented here.
// ============================================================
const SB = 'https://www.spainbcn.com/';

export const courseAreas = [
  {
    id: 'ai',
    label: 'AI and digital teaching',
    short: 'AI, digital tools and classroom technology.',
    desc: 'Digital tools and AI for planning, materials, feedback and classroom work.',
    subjects: [{ name: 'AI & ICT in Education', url: SB + 'group-ai-ict.html' }],
    programmes: [
      { name: 'Artificial Intelligence in Education', url: SB + 'group-ai-ict.html#artificial-intelligence-in-education' },
      { name: 'School AI & ICT', url: SB + 'group-ai-ict.html#school-ai-and-ict' },
      { name: 'AI for Language Teaching', url: SB + 'group-ai-ict.html#ai-for-language-teaching' },
      { name: 'AI & ICT Intensive (two weeks)', url: SB + 'group-ai-ict.html#ai-and-ict-intensive-two-weeks' },
    ],
  },
  {
    id: 'english',
    label: 'English and communication',
    short: 'Language, methodology and presentation.',
    desc: 'Your own English, teaching through it, and speaking in front of a room.',
    subjects: [
      { name: 'English', url: SB + 'group-english.html' },
      { name: 'Presentation & Communication', url: SB + 'group-presentation.html' },
      { name: 'CLIL & Bilingual Teaching', url: SB + 'group-clil.html' },
    ],
    programmes: [
      { name: 'General English by level', url: SB + 'group-english.html#general-english-by-level' },
      { name: 'Teaching Methodology in English', url: SB + 'group-english.html#teaching-methodology-in-english' },
      { name: 'Presentation Skills', url: SB + 'group-presentation.html#presentation-skills' },
      { name: 'CLIL', url: SB + 'group-clil.html#clil' },
    ],
  },
  {
    id: 'spanish',
    label: 'Spanish',
    short: 'Language, culture and teaching.',
    desc: 'Spanish in a small group, with the city and its history as the material.',
    subjects: [{ name: 'Spanish', url: SB + 'group-spanish.html' }],
    programmes: [
      { name: 'General Spanish by level', url: SB + 'group-spanish.html#general-spanish-by-level' },
      { name: 'Culture & History in Spanish', url: SB + 'group-spanish.html#culture-and-history-in-spanish' },
      { name: 'Teaching Methodology in Spanish', url: SB + 'group-spanish.html#teaching-methodology-in-spanish' },
    ],
  },
  {
    id: 'inclusion',
    label: 'Inclusion and special needs',
    short: 'SEN, inclusion and classroom support.',
    desc: 'Special educational needs, and classrooms where a mixed group works.',
    subjects: [
      { name: 'Special Needs Education (SEN)', url: SB + 'group-sen.html' },
      { name: 'Inclusion & Diversity', url: SB + 'group-inclusion.html' },
    ],
    programmes: [
      { name: 'Special Needs Education', url: SB + 'group-sen.html#special-needs-education' },
      { name: 'Digital tools for SEN', url: SB + 'group-sen.html#digital-tools-for-sen' },
      { name: 'Inclusion & Integration', url: SB + 'group-inclusion.html#inclusion-and-integration' },
      { name: 'Learning by Doing', url: SB + 'group-inclusion.html#learning-by-doing' },
    ],
  },
  {
    id: 'wellbeing',
    label: 'Wellbeing and classroom practice',
    short: 'Wellbeing, mindfulness and classroom management.',
    desc: 'Staying well in the job, and the routines that keep a class calm and learning.',
    subjects: [
      { name: 'Wellbeing for Educators', url: SB + 'group-wellbeing.html' },
      { name: 'Classroom Management', url: SB + 'group-classroom.html' },
    ],
    programmes: [
      { name: 'Mental Health & Well-being for Teachers', url: SB + 'group-wellbeing.html#mental-health-and-well-being-for-teachers' },
      { name: 'Yoga & Meditation', url: SB + 'group-wellbeing.html#yoga-and-meditation' },
      { name: 'Classroom Management, foundations', url: SB + 'group-classroom.html#classroom-management-foundations' },
      { name: 'Classroom Management, advanced', url: SB + 'group-classroom.html#classroom-management-advanced' },
    ],
  },
  {
    id: 'creative',
    label: 'Creative and experiential learning',
    short: 'Art, outdoor learning, sustainability and citizenship.',
    desc: 'Art, field work, sustainability and human rights as ways into other subjects.',
    subjects: [
      { name: 'Art & Creative Teaching', url: SB + 'group-art.html' },
      { name: 'Outdoor & Experiential Learning', url: SB + 'group-outdoor.html' },
      { name: 'Sustainability & Eco-Education', url: SB + 'group-sustainability.html' },
      { name: 'Citizenship & Human Rights', url: SB + 'group-citizenship.html' },
      { name: 'Leadership & Careers', url: SB + 'group-leadership.html' },
    ],
    programmes: [
      { name: 'Art-Based Teaching', url: SB + 'group-art.html#art-based-teaching' },
      { name: 'Outdoor Learning, basics', url: SB + 'group-outdoor.html#outdoor-learning-basics' },
      { name: 'Sustainability, green basics', url: SB + 'group-sustainability.html#sustainability-green-basics' },
      { name: 'Leadership', url: SB + 'group-leadership.html#leadership' },
    ],
  },
];


// ============================================================
// COURSE WEEKS IN BARCELONA
//
// Exported by hand from the organisation's DATES-SPAINBCN sheet
// (gid 480287972) on 2026-08-20 — the owner asked for no live
// connection. Barcelona rows only; the other destinations belong
// to SpainBcn. Course labels are the sheet's own.
//
// The sheet records scheduled weeks and nothing else, so every
// row here is "scheduled". Do not invent another state.
// ============================================================
export const datesSource = {
  sheet: 'https://docs.google.com/spreadsheets/d/1V2xozrjvgq4rIP1V-iPUSz5nrvTqSZWV0y9mr4f2kOE/edit?gid=480287972',
  importedOn: '2026-08-20',
  note: 'Other dates and levels open on request.',
};

export const dates = [
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'English', area: 'english' },
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'Spanish', area: 'spanish' },
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'AI & ICT', area: 'ai' },
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'Public Speaking', area: 'english' },
  { start: '2026-09-14', end: '2026-09-18', label: '14–18', month: 'Sep', course: 'Integration and classroom management', area: 'wellbeing' },
  { start: '2026-09-21', end: '2026-09-25', label: '21–25', month: 'Sep', course: 'Mindfulness in the classroom', area: 'wellbeing' },
  { start: '2026-09-28', end: '2026-10-02', label: '28 Sep – 2 Oct', month: '', course: 'English', area: 'english' },
  { start: '2026-10-12', end: '2026-10-16', label: '12–16', month: 'Oct', course: 'English', area: 'english' },
  { start: '2026-10-19', end: '2026-10-23', label: '19–23', month: 'Oct', course: 'English', area: 'english' },
  { start: '2026-10-19', end: '2026-10-23', label: '19–23', month: 'Oct', course: 'AI & ICT', area: 'ai' },
  { start: '2026-11-09', end: '2026-11-13', label: '9–13', month: 'Nov', course: 'English', area: 'english' },
  { start: '2026-11-09', end: '2026-11-13', label: '9–13', month: 'Nov', course: 'AI & ICT', area: 'ai' },
];

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
  { year: '1997', title: 'The beginning', text: 'María Ángeles and Miriam founded SpainBcn in Barcelona, to share the city, its language and its culture with international students.' },
  { year: '2000s', title: 'Teaching Spanish', text: 'Students came from all over the world to learn Spanish, and saw Spain while they were here.' },
  { year: '2010s', title: 'From language courses to European mobility', text: 'European teachers began arriving through Erasmus+ staff mobility, and the catalogue grew from language classes into professional training.' },
  { year: 'Today', title: 'Barcelona and five more destinations', text: 'Courses run in Barcelona, Málaga, Mallorca, Gran Canaria, Tenerife and Tarragona, for schools, universities, VET and adult-education organisations across Europe.' },
];

// ============================================================
// PHOTOGRAPHY — the organisation's own photographs, processed by
// tools/build-images.mjs into src/assets/images/. Originals stay
// in uploads/ and source-photos/, which are not published.
// ============================================================
export const images = {
  // The certificates moment, and the two Barcelona classroom shots, carry
  // the site: faces close enough to read, daylight, nobody posed stiffly.
  certificates: {
    file: 'course-group-with-certificates',
    alt: 'A course group holding up their certificates at the end of the week',
    focus: '50% 42%',
  },
  classGroup: {
    file: 'course-group-in-class-barcelona',
    alt: 'Participants and their trainer at the desks of a Barcelona classroom',
    focus: '50% 48%',
  },
  arcDeTriomf: {
    file: 'course-group-arc-de-triomf-barcelona',
    alt: 'A course group waving on the palm-lined promenade in front of the Arc de Triomf in Barcelona',
    focus: '50% 52%',
  },
  cafeTerrace: {
    file: 'course-group-cafe-terrace-barcelona',
    alt: 'Course participants raising their glasses at a café terrace in Barcelona',
    focus: '50% 50%',
  },
  cathedral: {
    file: 'course-group-barcelona-cathedral',
    alt: 'A course group in the square in front of Barcelona cathedral',
    focus: '50% 58%',
  },
  officeClassroom: {
    file: 'course-group-spainbcn-classroom',
    alt: 'Participants at laptops in the SpainBcn classroom in Barcelona',
    focus: '50% 55%',
  },
  workingSession: {
    file: 'course-group-working-session',
    alt: 'Participants working with coloured card and paper at classroom tables',
    focus: '50% 45%',
  },
  spanishOffice: {
    file: 'spanish-course-group-spainbcn-office',
    alt: 'A Spanish course group in the sitting room at the SpainBcn office in Barcelona',
    focus: '50% 72%',
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
  barceloneta: {
    file: 'barceloneta-seafront-barcelona',
    alt: 'Palm trees and evening light on the Barceloneta seafront',
    focus: '50% 50%',
  },
  founders: {
    file: 'spainbcn-founders-1997',
    alt: 'María Ángeles and Miriam at the SpainBcn exhibition stand in 1997',
    focus: '50% 45%',
  },
};

// Only photographs that a page actually uses are processed. The rest of the
// archive is listed in tools/build-images.mjs; the originals are in uploads/
// and source-photos/, neither of which is published.
