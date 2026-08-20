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
  replyTime: 'A real person replies within two working days, usually sooner.',
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
  // The organisation's sign-up form, hosted by forms.app. Loaded only
  // when a visitor asks for it — see src/assets/js/site.js.
  formsAppId: '6a6cadc0a2c530505fdac56f',
  formsAppHost: 'https://rear0ghq.forms.app',
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
  includes: 'Course materials and the week\'s two cultural activities are included.',
  excludes: 'Travel, accommodation and meals are not part of the fee. Under Erasmus+ they come from the grant\'s own budget lines.',
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
    desc: 'Digital tools and AI you can use for planning, materials and feedback, tried on your own lessons.',
    subjects: [{ name: 'AI & ICT in Education', url: SB + 'group-ai-ict.html' }],
    total: 9,
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
    desc: 'Your own English, how you teach in it, and speaking in front of a room.',
    subjects: [
      { name: 'English', url: SB + 'group-english.html' },
      { name: 'Presentation & Communication', url: SB + 'group-presentation.html' },
      { name: 'CLIL & Bilingual Teaching', url: SB + 'group-clil.html' },
    ],
    total: 8,
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
    desc: 'Spanish in a small group, with the city and its history used as the material.',
    subjects: [{ name: 'Spanish', url: SB + 'group-spanish.html' }],
    total: 3,
    programmes: [
      { name: 'General Spanish by level', url: SB + 'group-spanish.html#general-spanish-by-level' },
      { name: 'Culture & History in Spanish', url: SB + 'group-spanish.html#culture-and-history-in-spanish' },
      { name: 'Teaching Methodology in Spanish', url: SB + 'group-spanish.html#teaching-methodology-in-spanish' },
    ],
  },
  {
    id: 'inclusion',
    label: 'Inclusion and special needs',
    desc: 'Teaching learners with special educational needs, and classrooms where a mixed group works.',
    subjects: [
      { name: 'Special Needs Education (SEN)', url: SB + 'group-sen.html' },
      { name: 'Inclusion & Diversity', url: SB + 'group-inclusion.html' },
    ],
    total: 6,
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
    desc: 'Staying well in a demanding job, and the routines that keep a class calm and learning.',
    subjects: [
      { name: 'Wellbeing for Educators', url: SB + 'group-wellbeing.html' },
      { name: 'Classroom Management', url: SB + 'group-classroom.html' },
    ],
    total: 4,
    programmes: [
      { name: 'Mental Health & Well-being for Teachers', url: SB + 'group-wellbeing.html#mental-health-and-well-being-for-teachers' },
      { name: 'Yoga & Meditation', url: SB + 'group-wellbeing.html#yoga-and-meditation' },
      { name: 'Classroom Management, foundations', url: SB + 'group-classroom.html#classroom-management-foundations' },
      { name: 'Classroom Management, advanced', url: SB + 'group-classroom.html#classroom-management-advanced' },
    ],
  },
  {
    id: 'creative',
    label: 'Creative, outdoor and citizenship',
    desc: 'Art, field work, sustainability and human rights as ways into other subjects.',
    subjects: [
      { name: 'Art & Creative Teaching', url: SB + 'group-art.html' },
      { name: 'Outdoor & Experiential Learning', url: SB + 'group-outdoor.html' },
      { name: 'Sustainability & Eco-Education', url: SB + 'group-sustainability.html' },
      { name: 'Citizenship & Human Rights', url: SB + 'group-citizenship.html' },
      { name: 'Leadership & Careers', url: SB + 'group-leadership.html' },
    ],
    total: 9,
    programmes: [
      { name: 'Art-Based Teaching', url: SB + 'group-art.html#art-based-teaching' },
      { name: 'Outdoor Learning, basics', url: SB + 'group-outdoor.html#outdoor-learning-basics' },
      { name: 'Sustainability, green basics', url: SB + 'group-sustainability.html#sustainability-green-basics' },
      { name: 'Leadership', url: SB + 'group-leadership.html#leadership' },
    ],
  },
];

export const catalogue = { areas: 14, programmes: 39 };

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
  certificates: { file: 'student-group-with-certificates-barcelona', alt: 'Course group holding their certificates in the classroom at the end of a week in Barcelona' },
  englishGroup: { file: 'english-course-group-classroom-barcelona', alt: 'English course group in a Barcelona classroom' },
  ictTable: { file: 'ict-training-group-around-table-barcelona', alt: 'ICT training group working around a table in Barcelona' },
  ictLaptops: { file: 'ict-training-group-laptops-classroom', alt: 'ICT training group working on laptops in the classroom' },
  ictOffice: { file: 'ict-course-group-spainbcn-office', alt: 'ICT course group with laptops at the SpainBcn office' },
  spanishOffice: { file: 'spanish-course-group-spainbcn-office', alt: 'Spanish course group at the SpainBcn office' },
  spanishGroup: { file: 'spanish-course-group-office-barcelona', alt: 'Spanish course group at the SpainBcn office in Barcelona' },
  spanishClassroom: { file: 'spanish-course-for-teachers-classroom', alt: 'Spanish course for teachers in a Barcelona classroom' },
  spanishTeachers: { file: 'spanish-teacher-group-spainbcn-office', alt: 'Spanish teacher group at the SpainBcn office' },
  parkGuell: { file: 'student-group-park-guell-barcelona', alt: 'Student group under the stone colonnade of Park Güell during a Barcelona programme' },
  ciutadella: { file: 'student-group-ciutadella-barcelona', alt: 'Student group at the Cascada Monumental in Parc de la Ciutadella, Barcelona' },
  viewpoint: { file: 'student-group-viewpoint-barcelona', alt: 'Student group at an outdoor viewpoint over Barcelona' },
  barceloneta: { file: 'barceloneta-seafront-barcelona', alt: 'Palm trees and evening light on the Barceloneta seafront' },
  founders: { file: 'spainbcn-founders-1997', alt: 'María Ángeles and Miriam at the SpainBcn exhibition stand in 1997' },
  facilities: { file: 'spainbcn-school-facilities-barcelona', alt: 'Four views of the school in Barcelona: a classroom, the hallway, the terrace and students working' },
};
