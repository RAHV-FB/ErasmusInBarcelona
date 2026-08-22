// ============================================================
// Legacy paths from the previous erasmusinbarcelona.com, each
// mapped to the page that now answers it. One hop only — no
// redirect chains.
//
// The inventory comes from the 2026-08-20 capture of the old site
// (notes/audit.md) plus the URLs still in search indexes on
// 2026-08-22. Old course pages go to the matching subject area on
// /join-a-course/, whose rows link on to the SpainBcn programme
// pages — not to the SpainBcn catalogue directly, so a visitor
// stays in the Barcelona context they searched for.
//
// server.mjs answers these with a 301. A static host cannot, so
// the prototype build also writes a small redirecting page at
// each of these paths.
// ============================================================
export const REDIRECTS = {
  '/home': '/',
  '/home/': '/',
  '/school-teachers/': '/join-a-course/',
  '/universities/': '/join-a-course/',
  '/erasmus-ka1-courses/': '/join-a-course/',
  '/english-courses-for-teachers/': '/join-a-course/#english',
  '/english-courses/': '/join-a-course/#english',
  '/c1-english/': '/join-a-course/#english',
  '/creative-english/': '/join-a-course/#english',
  '/language-methodology/': '/join-a-course/#english',
  '/clil/': '/join-a-course/#english',
  '/a1-spanish/': '/join-a-course/#spanish',
  '/a2-spanish/': '/join-a-course/#spanish',
  '/b1-spanish/': '/join-a-course/#spanish',
  '/b2-spanish/': '/join-a-course/#spanish',
  '/c1-spanish/': '/join-a-course/#spanish',
  '/sen/': '/join-a-course/#inclusion',
  '/course-catalogue/': '/join-a-course/',
  '/program-information/': '/your-week/',
  '/ai-ict/': '/join-a-course/#ai',
  '/ict/': '/join-a-course/#ai',
  '/ict-integration/': '/join-a-course/#ai',
  '/e-learning-ict/': '/join-a-course/#ai',
  '/school-students/': '/bring-a-group/',
  '/english-courses-students/': '/bring-a-group/',
  '/spanish-courses-for-students/': '/bring-a-group/',
  '/ict-courses-for-students/': '/bring-a-group/',
  '/other-courses-for-students/': '/bring-a-group/',
  '/currently-open-dates/': '/dates/',
  '/summer-dates/': '/dates/',
  '/season-courses/': '/dates/',
  '/create-your-own-course/': '/plan-a-mobility/',
  '/we-come-to-you/': '/plan-a-mobility/',
  '/about-us/': '/about/',
  '/our-team/': '/about/#team',
  '/10-reasons/': '/about/',
  '/2025-at-a-glance/': '/about/',
  '/privacy-policy/': '/privacy/',
};

// Legacy paths with nothing to redirect to: Webnode artefacts with no
// intent behind them. Answered 410 Gone, so search engines drop them
// instead of retrying a 404 forever.
export const GONE = [
  '/blank-page2/',
];
