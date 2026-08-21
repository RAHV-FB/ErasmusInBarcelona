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
  officeNote: 'Five minutes on foot from the Sagrada Família. Metro: Sagrada Família (L2, L5), Verdaguer (L4, L5).',
  venueNote: 'Courses run in the Gràcia and Barceloneta areas, depending on the course, the week and '
    + 'availability. Your course location is confirmed when you sign up.',
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

// The office never moves. Course rooms do: which area a given week runs
// in depends on the course, the week and what is free, and it is settled
// at sign-up rather than published in advance.
export const venues = [
  { area: 'Gràcia', note: 'Around the office, five minutes on foot from the Sagrada Família.' },
  { area: 'Barceloneta', note: 'By the sea, on the L4 metro line.' },
];

// Fees per person, Barcelona, from the subject-area pages on SpainBcn.
// Other Spanish destinations cost more; they are SpainBcn's to publish.
export const pricing = {
  currency: '€',
  barcelona: { hours20: 400, hours25: 450 },
  includesList: ['The teaching', 'All course materials', 'The week\'s two cultural activities'],
  includes: 'The fee covers the teaching, all course materials and the week\'s two cultural activities.',
  travel: 'You arrange travel, accommodation and meals. Under Erasmus+ KA1 those come from the grant\'s '
    + 'own travel and individual support lines, not from the course fee.',
  groups: 'A private programme or a group project is quoted for the group: tell us the group and we confirm the fee and the invoicing in writing before you commit.',
};

// Booking, money and cancellation, from SpainBcn's published terms
// (spainbcn.com/terms.html, reviewed there 4 August 2026). These are the
// questions a participant or a finance office actually asks, so the site
// answers them rather than sending people to read the terms.
// ============================================================
// What is being sold, and to whom. Stated in full once — on the home
// page — and drawn on in shorter forms elsewhere. Every clause is
// SpainBcn's own claim:
//   "Erasmus+ staff mobility courses for teachers and staff of schools,
//    VET centers, universities and other education organizations"
//                                            — spainbcn.com
//   "for schools, universities, VET and adult-education organizations"
//                                            — spainbcn.com/about.html
//   "Erasmus+ KA1 eligible"                  — spainbcn.com/courses.html
//   Private booking, and invoicing the individual rather than an
//   institution, is set out in spainbcn.com/terms.html.
//
// The funding line must not suggest we rule on anyone's grant. Whether a
// particular participant's Erasmus+ application is approved is a matter
// for their national agency, not for us.
// ============================================================
export const offer = {
  product: 'Staff training courses in Barcelona',
  audience: 'teachers and education staff',
  institutions: 'schools, universities, VET centres, adult education and other education organisations',
  ka1: 'Erasmus+ KA1 courses for teachers and education staff from schools, universities, VET centres, '
    + 'adult education and other education organisations.',
  staffScope: 'Courses are for teaching and non-teaching staff alike: classroom teachers, school '
    + 'leaders, trainers, coordinators, and administrative and support staff, where the course suits '
    + 'the role.',
  funding: 'Erasmus+ funding is not required. Courses are also open to participants funded directly '
    + 'by their institution or privately.',
  notStudents: 'Programmes for student groups are arranged separately, with the school.',
};

export const booking = {
  steps: [
    'You write with the course and the week. We reply within two working days.',
    'We send the pre-registration confirmation and the documents a KA1 application needs.',
    'You sign up and confirm. We send an acceptance letter if your institution needs one.',
    'We set out the fee, the dates and the invoicing in writing. That confirmation is the contract.',
  ],
  contractWith: 'The contract is with whoever is invoiced: your institution, or you if you book privately.',
  vat: 'The fee is exempt from VAT as an educational service, so no VAT is added and none appears on '
    + 'the invoice. If your finance office needs that in writing for a purchase order or a grant claim, ask.',
  payment: 'There is no deposit and no payment schedule to agree before you enquire. Nothing is payable '
    + 'until the invoicing arrangement is agreed in writing.',
  cancellation: 'Cancel more than 14 days before the course and the fee is refunded in full. At 14 days '
    + 'or less, half is refunded and the other half is held as credit towards another week, at any '
    + 'SpainBcn destination. Illness, a family emergency, withdrawn funding or a problem at your '
    + 'institution are treated as exceptions and not charged.',
  changes: 'Changing the name of a participant, moving to another week or switching course costs nothing.',
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
    desc: 'Artificial intelligence, digital teaching tools and practical classroom uses of ICT.',
    language: 'English; the Language + ICT week also runs in Spanish',
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
    desc: 'English language for teachers, teaching methodology, CLIL and public speaking.',
    language: 'English',
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
    desc: 'Spanish language by level, Spanish culture and history, and methodology for teaching Spanish.',
    language: 'Spanish',
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
    desc: 'Special educational needs, inclusive classrooms, integration and classroom management.',
    language: 'English',
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
    desc: 'Teacher wellbeing and mental health, mindfulness, yoga and meditation in school.',
    language: 'English',
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
    desc: 'Art in education, outdoor and experiential learning, sustainability and citizenship.',
    language: 'English',
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
