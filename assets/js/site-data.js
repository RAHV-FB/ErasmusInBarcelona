// ============================================================
// ErasmusInBarcelona.com — single source of shared facts.
// Every page reads from this file. Do NOT hard-code these
// values in page markup.
// ============================================================

export const organisation = {
  name: "Erasmus in Barcelona",
  by: "SpainBcn-Programs",
  legalName: "SpainBcn-Programs in Barcelona SL",
  founded: 1997,
  // OID as published on erasmusinbarcelona.com home/schools/students/universities pages.
  // ⚠ DISCREPANCY: the current /contact/ page shows OID E10139423 + PIC 933769240.
  // Using the consistently-published value; verify with SpainBcn before launch.
  oid: "E10336106",
  transparency: "Erasmus in Barcelona is the Barcelona-focused website of SpainBcn-Programs.",
};

export const contact = {
  email: "Hola@SpainBcn.com",
  phone: "(+34) 633 163 789",
  phoneHref: "tel:+34633163789",
  whatsapp: "https://api.whatsapp.com/send?phone=+34633163789",
  address: "Carrer del Pare Lainez, 19, 08025 Barcelona", // legal notice says Local 2, 08024 — flagged in audit
  addressNote: "Course venues vary by programme and week — always confirm with us.",
  googleReviews: "https://goo.gl/maps/nS8RbxhKpNhsZcL67",
  facebook: "https://www.facebook.com/SpainBcnStaffTrainingWeek/",
  instagram: "https://www.instagram.com/spainbcnerasmus/",
  linkedin: "https://www.linkedin.com/in/stafftrainingweek/",
  youtube: "https://www.youtube.com/channel/UC1fJvZvC-r-WkChV9XxoLzA/featured",
};

// Verified from the owner's Google Business panel (Aug 2026).
export const reviews = { rating: "4.9", count: 136, url: "https://goo.gl/maps/nS8RbxhKpNhsZcL67" };

export const spainbcn = {
  home: "https://spainbcn.com",
  catalogue: "https://spainbcn.com", // deep catalogue URL to be confirmed
  locations: "https://spainbcn.com/locations",
};

export const venues = [
  { area: "Gràcia", note: "Headquarters and course rooms in the centre of the neighbourhood." },
  { area: "Barceloneta", note: "Seaside classrooms a few streets from the beach." },
];

export const schedule = {
  staff: "Monday to Friday, 10:00–14:00 (20 h/week) or 10:00–15:00 (25 h/week), plus two afternoon activities.",
  weeks: "One week (5 days) or two weeks (10 days).",
  certificate: "Certificate of Participation issued on the final day.",
  staffFee: "€400 per person per week",
  groupFee: null, // group pricing depends on numbers, duration, content — contact
};

// Six curated areas. Detail curriculum lives on SpainBcn.
export const courseAreas = [
  { id: "ai", label: "AI & digital teaching", desc: "Practical AI tools, apps and digital methods you can use in class the following Monday." },
  { id: "english", label: "English & communication", desc: "Language levels A1–C2, methodology, CLIL, theatre, public speaking and presentation skills." },
  { id: "spanish", label: "Spanish", desc: "Spanish for non-native teachers and staff, with culture built into the classes." },
  { id: "inclusion", label: "Inclusion & special needs", desc: "SEN strategies, assistive digital tools and genuinely inclusive classrooms." },
  { id: "wellbeing", label: "Wellbeing & classroom practice", desc: "Classroom management, teacher wellbeing, mindfulness and yoga at school." },
  { id: "creative", label: "Creative & experiential teaching", desc: "Art-based strategies, outdoor learning, sustainability and learning by doing." },
];

// Selected Barcelona programmes per area (curation, not the catalogue).
export const featuredProgrammes = [
  { area: "ai", name: "AI in Education", desc: "Practical AI for lesson planning, teaching and classroom activities.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "ai", name: "ICT & AI — Technology in the Classroom", desc: "Apps, platforms and digital resources that support everyday teaching.", duration: "1–2 weeks", hours: "20–50 h", lang: "English" },
  { area: "ai", name: "AI for Language Teaching", desc: "AI-driven practice, feedback and assessment for language classrooms.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "english", name: "Practical English (A1–C2)", desc: "Fluency and confidence for teachers and staff, at your level.", duration: "1–2 weeks", hours: "20–50 h", lang: "English" },
  { area: "english", name: "CLIL", desc: "Teach subject content through English while building students' language.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "english", name: "Public Speaking & Presentation Skills", desc: "Confident speaking for classrooms, meetings and conferences.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "spanish", name: "Spanish (A1–C2)", desc: "Real-life communication with native trainers, culture included.", duration: "1–2 weeks", hours: "20–50 h", lang: "Spanish" },
  { area: "spanish", name: "Culture & History in Spanish", desc: "Language practice built around Barcelona and Spain themselves.", duration: "1 week", hours: "20 / 25 h", lang: "Spanish" },
  { area: "inclusion", name: "Special Needs Education (SEN)", desc: "Tools for tailored learning plans and supporting every student.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "inclusion", name: "Integration & Classroom Management", desc: "Routines, clear behaviour strategies and classrooms that work for everyone.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "wellbeing", name: "Mindfulness in the Classroom", desc: "Mindfulness and wellbeing practices for you and your students.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "wellbeing", name: "Mental Health & Wellbeing for Teachers", desc: "Burnout prevention and sustainable teaching routines.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "creative", name: "Art-Based Teaching Strategies", desc: "Use artistic activities across subjects, from painting to digital art.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "creative", name: "Outdoor Learning", desc: "Field work and city-as-classroom methods, tested in Barcelona.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
  { area: "creative", name: "Eco-Courses in Sustainability", desc: "Teach environmental responsibility with practical school projects.", duration: "1 week", hours: "20 / 25 h", lang: "English" },
];

// ============================================================
// LIVE DATES — imported 2026-08-20 from the organisation's
// "DATES-SPAINBCN" Google Sheet (gid 480287972), Barcelona rows,
// upcoming weeks only. The sheet is the authoritative source and
// is re-exported manually here on each update (no live connection,
// by the owner's request). Other Spain locations intentionally
// excluded — they live on SpainBcn.com.
// ============================================================
export const datesSource = {
  sheet: "https://docs.google.com/spreadsheets/d/1V2xozrjvgq4rIP1V-iPUSz5nrvTqSZWV0y9mr4f2kOE/edit?gid=480287972",
  importedOn: "2026-08-20",
  note: "Scheduled weeks · other dates and levels open on request",
};
export const dates = [
  { start: "2026-09-14", end: "2026-09-18", day: "14–18", month: "SEP", year: 2026, area: "english", programme: "English", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-09-14", end: "2026-09-18", day: "14–18", month: "SEP", year: 2026, area: "ai", programme: "AI & ICT", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-09-14", end: "2026-09-18", day: "14–18", month: "SEP", year: 2026, area: "spanish", programme: "Spanish", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-09-14", end: "2026-09-18", day: "14–18", month: "SEP", year: 2026, area: "english", programme: "Public Speaking", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-09-14", end: "2026-09-18", day: "14–18", month: "SEP", year: 2026, area: "inclusion", programme: "Integration & Classroom Management", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-09-21", end: "2026-09-25", day: "21–25", month: "SEP", year: 2026, area: "wellbeing", programme: "Mindfulness in the Classroom", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-09-28", end: "2026-10-02", day: "28–02", month: "SEP–OCT", year: 2026, area: "english", programme: "English", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-10-12", end: "2026-10-16", day: "12–16", month: "OCT", year: 2026, area: "english", programme: "English", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-10-19", end: "2026-10-23", day: "19–23", month: "OCT", year: 2026, area: "english", programme: "English", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-10-19", end: "2026-10-23", day: "19–23", month: "OCT", year: 2026, area: "ai", programme: "AI & ICT", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-11-09", end: "2026-11-13", day: "09–13", month: "NOV", year: 2026, area: "ai", programme: "AI & ICT", hours: "20 / 25 h", status: "scheduled" },
  { start: "2026-11-09", end: "2026-11-13", day: "09–13", month: "NOV", year: 2026, area: "english", programme: "English", hours: "20 / 25 h", status: "scheduled" },
];

export const team = {
  coordinator: { name: "Miriam", role: "Academic coordinator", img: "miriam" },
  members: [
    { name: "Miriam", role: "Academic coordinator", img: "miriam" },
    { name: "Adriana", role: "Administration & logistics", img: "adriana" },
    { name: "Russell", role: "ICT & AI trainer", img: "russell" },
    { name: "Julie", role: "English trainer", img: "julie" },
    { name: "Nigel", role: "English trainer", img: "nigel" },
    { name: "James", role: "English trainer", img: "james" },
    { name: "Marius", role: "English trainer", img: "marius" },
    { name: "Jan", role: "English trainer", img: "jan" },
    { name: "Mike", role: "English & ICT trainer", img: "mike" },
    { name: "Toni", role: "Spanish & ICT trainer", img: "toni" },
    { name: "Alberto", role: "Spanish trainer", img: "alberto" },
    { name: "Sandra", role: "Spanish trainer", img: "sandra" },
  ],
};

// ============================================================
// PHOTOGRAPHY — real photographs uploaded by the organisation
// (uploads/). PRODUCTION: move to /assets/images/ under the
// descriptive `file` names below.
// ============================================================
export const images = {
  certificates: { src: "uploads/photo_uploads-1787246875557-jx0m.jpeg", alt: "Student group holding their certificates in an ICT classroom after a SpainBcn programme in Barcelona", file: "student-group-with-certificates-ict-classroom-barcelona.jpg" },
  englishGroup: { src: "uploads/photo_uploads-1787246867970-fhh3.jpeg", alt: "Adult English B2–C1 course group in a Barcelona classroom", file: "english-b2-c1-adult-course-group-classroom-barcelona.jpg" },
  aiClassroom: { src: "uploads/photo_uploads-1787246880578-kn57.png", alt: "Teachers working on laptops during an AI & ICT training course in Barcelona", file: "ai-ict-teacher-training-classroom-laptops.jpg" },
  ictTable: { src: "uploads/photo_uploads-1787246867962-f6e1.jpg", alt: "ICT teacher-training group working around a table in Barcelona", file: "ict-teacher-training-group-around-table-barcelona.jpg" },
  ictLaptops: { src: "uploads/photo_uploads-1787246875558-wqfk.jpeg", alt: "ICT teacher-training group with laptops in the classroom", file: "ict-teacher-training-group-with-laptops-classroom.jpg" },
  ictOffice: { src: "uploads/photo_uploads-1787246868124-4i9m.png", alt: "ICT course group with laptops at the SpainBcn office", file: "ict-teacher-course-group-laptops-spainbcn-office.jpg" },
  spanishA1: { src: "uploads/photo_uploads-1787246879625-qvdv.jpeg", alt: "Spanish A1 course group at the SpainBcn office", file: "spanish-a1-course-group-spainbcn-office.jpg" },
  spanishA2: { src: "uploads/photo_uploads-1787246868160-zxrv.jpeg", alt: "Spanish A2 course group at the SpainBcn office", file: "spanish-a2-course-group-spainbcn-office.jpg" },
  spanishClassroom: { src: "uploads/photo_uploads-1787246868207-igg7.jpeg", alt: "Spanish course for teachers in a Barcelona classroom", file: "spanish-teacher-course-group-in-classroom.jpg" },
  spanishTeachers: { src: "uploads/photo_uploads-1787246879624-bjwh.jpeg", alt: "Spanish teacher group at the SpainBcn office", file: "spanish-teacher-group-spainbcn-office.jpg" },
  parkGuell: { src: "uploads/photo_uploads-1787246868632-mye6.png", alt: "Student group under the stone colonnade of Park Güell during a Barcelona programme", file: "student-group-park-guell-barcelona.jpg" },
  ciutadella: { src: "uploads/photo_uploads-1787246868171-k047.jpeg", alt: "Student group at the Cascada Monumental in Parc de la Ciutadella, Barcelona", file: "student-group-cascada-monumental-ciutadella-barcelona.jpg" },
  viewpoint: { src: "uploads/photo_uploads-1787246868139-ji5r.jpeg", alt: "Student group at an outdoor viewpoint over Barcelona", file: "student-group-outdoor-viewpoint-barcelona.jpg" },
  barceloneta: { src: "uploads/photo_uploads-1787246882590-ijcs.png", alt: "Palm trees and evening light on the Barceloneta seafront", file: "barceloneta-beach-sunset-barcelona.jpg" },
  founders: { src: "uploads/photo_uploads-1787246868436-z9ma.png", alt: "María Angeles and Miriam at the SpainBcn exhibition stand in 1997", file: "spainbcn-founders-1997-exhibition-stand.jpg" },
  facilities: { src: "uploads/photo_uploads-1787246868185-3qqb.png", alt: "SpainBcn school facilities in Barcelona", file: "spainbcn-school-facilities-collage.jpg" },
  logoMark: { src: "uploads/photo_uploads-1787246868126-ius6.png", alt: "", file: "spainbcn-logo-mark.png" },
  // Category GRAPHICS (not photographs) — do not use as photography:
  // digital-skills 0wx4.jpeg · inclusion-wellbeing job9.jpeg · languages-arts 30e8.jpeg
};

// Team portraits still hotlinked from the organisation's current CDN —
// download to /assets/images/ in production.
const cdn = "https://8493d733cb.clvaw-cdnwnd.com/ee052f7eedd77712b075ddda3dcdb575/";
const ph = "?ph=8493d733cb";
export const portraits = {
  miriam: { src: cdn + "200000448-d3278d327a/WhatsApp%20Image%202023-09-03%20at%2013.58.22.jpeg" + ph, alt: "Miriam, academic coordinator" },
  adriana: { src: cdn + "200000454-549dc549de/Screenshot%202023-09-03%20at%2015.28.51.png" + ph, alt: "Adriana, administration" },
  russell: { src: cdn + "200000426-8a0158a017/russell.jpeg" + ph, alt: "Russell, ICT and AI trainer" },
  julie: { src: cdn + "200000428-2de6a2de6c/julie.jpeg" + ph, alt: "Julie, English trainer" },
  nigel: { src: cdn + "200000436-4655046552/nigel.jpeg" + ph, alt: "Nigel, English trainer" },
  james: { src: cdn + "200000434-578c7578c9/james.jpeg" + ph, alt: "James, English trainer" },
  marius: { src: cdn + "200000458-62a1362a14/marius.jpeg" + ph, alt: "Marius, English trainer" },
  jan: { src: cdn + "200000432-715e3715e5/jan-0.jpeg" + ph, alt: "Jan, English trainer" },
  mike: { src: cdn + "200000452-7dba87dbaa/Screenshot%202023-09-03%20at%2014.00.02-7.png" + ph, alt: "Mike, English and ICT trainer" },
  toni: { src: cdn + "200000440-33bc233bc4/toni-2.jpeg" + ph, alt: "Toni, Spanish and ICT trainer" },
  alberto: { src: cdn + "200000442-f1ecff1ed1/Screenshot%202023-08-28%20at%2016.34.28-removebg-preview.jpeg" + ph, alt: "Alberto, Spanish trainer" },
  sandra: { src: cdn + "200000456-974a2974a4/sandra.jpeg" + ph, alt: "Sandra, Spanish trainer" },
};

// Images the layout still needs but no asset exists yet.
export const missingImages = [
  { slot: "gracia-street", need: "Street in Gràcia near the SpainBcn course rooms" },
  { slot: "metro", need: "Barcelona metro entrance or platform used by participants" },
];
