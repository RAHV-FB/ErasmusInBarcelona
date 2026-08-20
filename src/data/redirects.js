// ============================================================
// Legacy paths from the previous erasmusinbarcelona.com, each
// mapped to the page that now answers it. One hop only — no
// redirect chains.
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
  '/english-courses-for-teachers/': '/join-a-course/#english',
  '/course-catalogue/': '/join-a-course/',
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
  '/season-courses/': '/dates/',
  '/create-your-own-course/': '/plan-a-mobility/',
  '/about-us/': '/about/',
  '/our-team/': '/about/#team',
  '/10-reasons/': '/about/',
  '/2025-at-a-glance/': '/about/',
  '/privacy-policy/': '/privacy/',
};
