// ============================================================
// One template for every course-group page under /courses/.
// The group content comes from src/data/course-groups.js; every
// fee, schedule and booking fact comes from site-data.js.
//
// The courses open and close with native <details>, so the page
// needs no JavaScript to work.
// ============================================================
import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

/** The next scheduled Barcelona weeks whose sheet label belongs to this group. */
function nextWeeks(group, limit = 4) {
  return d.dates.filter((w) => group.dateCourses.includes(w.course)).slice(0, limit);
}

function courseEntry(c) {
  const photo = c.image
    ? `<figure class="media media--photo course__photo">
          ${img(d.images[c.image], { sizes: '(min-width: 860px) 40vw, 100vw' })}
        </figure>`
    : '';
  return `<details class="course" id="${c.id}">
        <summary>
          <h3 class="course__title">${esc(c.title)}</h3>
          <span class="course__level">${esc(c.level)}</span>
        </summary>
        <div class="course__body">
          ${photo}
          <p>${esc(c.summary)}</p>
          <p><b>Who it is for.</b> ${esc(c.audience)}</p>
          <h4>Objectives</h4>
          <ul>
            ${c.objectives.map((o) => `<li>${esc(o)}</li>`).join('\n            ')}
          </ul>
          <h4>Learning outcomes</h4>
          <ul>
            ${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join('\n            ')}
          </ul>
          <p class="course__ask"><a class="link-strong" href="/contact/">Ask about this course →</a></p>
        </div>
      </details>`;
}

export function renderCourseGroup(g) {
  const { hours20, hours25 } = d.pricing.barcelona;
  const weeks = nextWeeks(g);

  const when = weeks.length
    ? `<div class="board">
        ${weeks.map((w) => `<a class="board__row" href="/dates/">
          <span class="board__when">${esc(w.label)} <span class="board__month">${esc(w.month)}</span></span>
          <span class="board__course">${esc(w.course)}</span>
        </a>`).join('\n        ')}
      </div>
      <div class="board__foot">
        <a class="link-strong" href="/dates/">All Barcelona dates →</a>
        <p class="meta">${esc(d.datesSource.note)}</p>
      </div>`
    : `<p>No scheduled Barcelona week in the current calendar. ${esc(d.datesSource.note)}</p>
      <div class="board__foot">
        <a class="link-strong" href="/contact/">Ask us about your dates →</a>
        <a class="link-strong" href="/dates/">All Barcelona dates →</a>
      </div>`;

  const body = `
  <section class="container hero hero--tight">
    <div class="cols cols--lead">
      <div>
        <p class="eyebrow">Course group</p>
        <h1>${esc(g.title)}</h1>
        <p class="lede">${esc(g.lede)}</p>
        <p>${esc(g.welcome)}</p>
        <ul class="price price--inline">
          <li><span class="price__amount">${d.pricing.currency}${hours20}</span><span class="price__hours">20 hours</span></li>
          <li><span class="price__amount">${d.pricing.currency}${hours25}</span><span class="price__hours">25 hours</span></li>
        </ul>
        <p class="meta">Per person, per week, in Barcelona.</p>
      </div>
      <figure class="media media--photo">
        ${img(d.images[g.image], { sizes: '(min-width: 860px) 48vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="section-head">
        <h2>The courses in this group</h2>
        <p>Open a course for its objectives and learning outcomes. Say which one you want when
          you enquire — or describe your project and we suggest one.</p>
      </div>
      <div class="course-list">
        ${g.courses.map(courseEntry).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container">
      <h2>How these courses work</h2>
      <div class="cols cols--split">
        <div>
          <p>${esc(g.method)}</p>
          <ul class="facts">
            <li><span class="facts__term">Format</span><span class="facts__value">${esc(d.schedule.pattern)} ${esc(d.schedule.hours)}</span></li>
            <li><span class="facts__term">Language</span><span class="facts__value">${esc(g.language)}</span></li>
            <li><span class="facts__term">Group</span><span class="facts__value">${esc(d.schedule.groupSize)}</span></li>
            <li><span class="facts__term">Materials</span><span class="facts__value">${esc(d.schedule.materials)}</span></li>
            <li><span class="facts__term">Activities</span><span class="facts__value">${esc(d.schedule.activities)}</span></li>
            <li><span class="facts__term">Certificate</span><span class="facts__value">${esc(d.schedule.certificate)}, ${esc(d.schedule.certificateNote.charAt(0).toLowerCase() + d.schedule.certificateNote.slice(1))}</span></li>
            <li><span class="facts__term">Where</span><span class="facts__value">${esc(d.contact.venueNote)}</span></li>
          </ul>
          <p style="margin-top:20px"><a class="link-strong" href="/your-week/">See a typical Barcelona week →</a></p>
        </div>
        <div>
          <h3>Fees and booking</h3>
          <p>${esc(d.pricing.includes)} ${esc(d.pricing.travel)}</p>
          <p>You can book through your institution or directly with us. ${esc(d.pricing.travelKa1)}</p>
          <p>${esc(d.booking.payment)}</p>
          <p class="meta">${esc(d.booking.vat)}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Next in Barcelona</h2>
      ${when}
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Ask about this group</h2>
      <p class="lede">Send the course, the level and the dates you have in mind. ${esc(d.contact.replyTime)}</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Ask about a course</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
      <p style="margin-top:24px"><a href="/courses/">All course groups →</a></p>
    </div>
  </section>`;

  return page({
    path: `/courses/${g.slug}/`,
    current: 'courses',
    crumb: g.title,
    title: `${g.navLabel} — Erasmus+ KA1 courses, Barcelona`,
    description: `${g.desc} ${d.pricing.currency}${hours20} for 20 hours a week, ${d.pricing.currency}${hours25} for 25.`,
  }, body);
}
