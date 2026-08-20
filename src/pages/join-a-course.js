import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

export default function joinACourse() {
  const { hours20, hours25 } = d.pricing.barcelona;

  const areas = d.courseAreas.map((a) => {
    const programmes = a.programmes.map((p) =>
      `<li><a href="${p.url}" rel="noopener">${esc(p.name)}</a></li>`).join('\n            ');
    // One external marker per area rather than one per link.
    const subjects = a.subjects.map((s) => esc(s.name)).join(', ');
    return `<article class="area" id="${a.id}">
        <div class="area__head">
          <h3 class="area__title">${esc(a.label)}</h3>
        </div>
        <p class="area__desc">${esc(a.desc)}</p>
        <ul class="area__list">
            ${programmes}
        </ul>
        <p class="area__more meta"><a href="${a.subjects[0].url}" rel="noopener">All ${a.total} programmes in
          ${subjects} on SpainBcn ↗</a></p>
      </article>`;
  }).join('\n      ');

  const soon = d.dates.slice(0, 5).map((w) => `<a class="board__row" href="/dates/">
          <span class="board__when">${w.label} <span class="board__month">${w.month}</span></span>
          <span class="board__course">${esc(w.course)}</span>
        </a>`).join('\n        ');

  const body = `
  <section class="container hero">
    <div class="cols cols--lead">
      <div>
        <h1>Courses for teachers and education staff</h1>
        <p class="lede">Scheduled one- and two-week courses in Barcelona for teachers, trainers, school leaders
          and support staff, from primary to university and VET. You join an international group.</p>
        <div class="btn-row">
          <a class="btn" href="/dates/">See the dates</a>
          <a class="btn btn--ghost" href="/contact/">Ask about a week</a>
        </div>
      </div>
      <figure class="media media--photo">
        ${img(d.images.spanishOffice, { sizes: '(min-width: 860px) 45vw, 100vw', eager: true })}
        <figcaption>A course group at the SpainBcn office in Gràcia</figcaption>
      </figure>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>Barcelona course fee</h2>
        <ul class="price">
          <li><span class="price__amount">${d.pricing.currency}${hours20}</span><span class="price__hours">20 hours a week</span></li>
          <li><span class="price__amount">${d.pricing.currency}${hours25}</span><span class="price__hours">25 hours a week</span></li>
        </ul>
        <p class="meta" style="margin-top:16px">Per person, per week. ${d.pricing.includes}</p>
      </div>
      <div>
        <h2>What the fee does not cover</h2>
        <p>${d.pricing.excludes}</p>
        <p class="meta">Fees for the other Spanish destinations are published on
          <a href="${d.spainbcn.catalogue}" rel="noopener">SpainBcn ↗</a>.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>How a course week works</h2>
      </div>
      <ul class="facts">
        <li><span class="facts__term">Format</span><span class="facts__value">One week, or two. ${d.schedule.twoWeeks}</span></li>
        <li><span class="facts__term">Hours</span><span class="facts__value">${d.schedule.hours}</span></li>
        <li><span class="facts__term">Timetable</span><span class="facts__value">${d.schedule.pattern} ${d.schedule.activities}</span></li>
        <li><span class="facts__term">Group</span><span class="facts__value">${d.schedule.groupSize}</span></li>
        <li><span class="facts__term">Materials</span><span class="facts__value">${d.schedule.materials}</span></li>
        <li><span class="facts__term">Certificate</span><span class="facts__value">${d.schedule.certificate}. ${d.schedule.certificateNote}</span></li>
      </ul>
      <p style="margin-top:24px"><a class="link-strong" href="/your-week/">What the week looks like day by day →</a></p>
    </div>
  </section>

  <section class="section section--rule">
    <div class="container">
      <div class="section-head">
        <h2>Choose a subject area</h2>
        <p>Six ways into the catalogue, with a few of the programmes in each. Every programme name links to its
          description on SpainBcn, which keeps the full catalogue, the levels and the course codes.</p>
      </div>
      ${areas}
      <p style="margin-top:28px"><a class="link-strong" href="${d.spainbcn.catalogue}" rel="noopener">All
        ${d.catalogue.programmes} programmes across ${d.catalogue.areas} subject areas on SpainBcn ↗</a></p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Next weeks in Barcelona</h2>
      </div>
      <div class="board">
        ${soon}
      </div>
      <div class="board__foot">
        <a class="link-strong" href="/dates/">All ${d.dates.length} scheduled weeks →</a>
        <span class="meta">${d.datesSource.note}</span>
      </div>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Tell us the week you want</h2>
      <p class="lede">Send us the subject, your level and the dates you have in mind. ${d.contact.replyTime}</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Ask about a course</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/join-a-course/',
    current: 'join',
    crumb: 'Join a course',
    title: 'Erasmus+ Staff Training Courses in Barcelona | SpainBcn-Programs',
    description: `Erasmus+ courses in Barcelona for teachers and education staff. ${d.pricing.currency}${hours20} for 20 hours a week, ${d.pricing.currency}${hours25} for 25, materials and two cultural activities included.`,
  }, body);
}
