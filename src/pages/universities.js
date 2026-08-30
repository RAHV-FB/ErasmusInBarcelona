import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

// The areas whose Barcelona weeks a university participant would join.
const UNI_AREAS = ['ai', 'english', 'spanish'];

export default function universities() {
  const { hours20, hours25 } = d.pricing.barcelona;
  const uni = d.universityProgrammes;

  const groups = uni.groups.map((g) => `<div>
          <h3>${esc(g.label)}</h3>
          <ul>
            ${g.items.map((p) => `<li><a href="${p.url}" rel="noopener">${esc(p.name)} ↗</a></li>`).join('\n            ')}
          </ul>
        </div>`).join('\n        ');

  const rows = d.dates.filter((r) => UNI_AREAS.includes(r.area)).slice(0, 5);
  const board = rows.length
    ? `<div class="board">
        ${rows.map((w) => `<a class="board__row" href="/dates/">
          <span class="board__when">${w.label} <span class="board__month">${w.month}</span></span>
          <span class="board__course">${esc(w.course)}</span>
        </a>`).join('\n        ')}
      </div>
      <div class="board__foot">
        <a class="link-strong" href="/dates/">All Barcelona dates →</a>
      </div>`
    : `<p>No scheduled Barcelona week in the current calendar.</p>
      <p><a class="link-strong" href="/contact/">Ask us about your dates →</a></p>`;

  const body = `
  <section class="container hero hero--tight">
    <div class="cols cols--lead">
      <div>
        <h1>Erasmus+ staff training in Barcelona for university staff</h1>
        <p class="lede">One-week courses for university teaching, research and administrative staff,
          run by SpainBcn-Programs in Barcelona: AI and digital tools, English, Spanish and
          presentation skills.</p>
        <ul class="price price--inline">
          <li><span class="price__amount">${d.pricing.currency}${hours20}</span><span class="price__hours">20 hours</span></li>
          <li><span class="price__amount">${d.pricing.currency}${hours25}</span><span class="price__hours">25 hours</span></li>
        </ul>
        <p class="meta">Per person, per week, in Barcelona.</p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.officeClassroom, { sizes: '(min-width: 860px) 48vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section section--tight" id="ai">
    <div class="container cols cols--split">
      <div>
        <h2>AI and digital tools for university work</h2>
        <p><a class="link-strong" href="${uni.dedicated.url}" rel="noopener">${esc(uni.dedicated.name)} —
          the one-week course for ${esc(uni.dedicated.audience)} ↗</a></p>
        <p>${esc(uni.dedicated.desc)} Its published audience is university staff alone.</p>
      </div>
      <div>
        <h2>AI as the subject</h2>
        <p><a class="link-strong" href="${uni.groups[0].items[0].url}" rel="noopener">Artificial
          Intelligence in Education ↗</a></p>
        <p>Practical AI for planning, materials and feedback. University staff are in its audience
          alongside teachers, school leaders and education administrators.</p>
      </div>
    </div>
  </section>

  <section class="section" id="english">
    <div class="container">
      <div class="section-head">
        <h2>Courses university staff join</h2>
      </div>
      <p>Each programme names university staff in its audience. The links go to the programme's own
        entry on SpainBcn.</p>
      <div class="grid-cards grid-cards--three">
        ${groups}
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>How a week runs</h2>
        <ul class="facts">
          <li><span class="facts__term">Pattern</span><span class="facts__value">${d.schedule.pattern}</span></li>
          <li><span class="facts__term">Hours</span><span class="facts__value">${d.schedule.hours}</span></li>
          <li><span class="facts__term">Fee</span><span class="facts__value">${d.pricing.currency}${hours20} for
            20 hours a week, ${d.pricing.currency}${hours25} for 25. ${d.pricing.includes}</span></li>
          <li><span class="facts__term">Certificate</span><span class="facts__value">${d.schedule.certificate}, issued on the final day.</span></li>
        </ul>
        <p style="margin-top:20px"><a class="link-strong" href="/your-week/">See a typical Barcelona week →</a></p>
      </div>
      <div>
        <h2>Booking and your mobility</h2>
        <p>You can book through your institution or directly with us. The courses are commonly used
          for Erasmus+ KA1 staff mobility.</p>
        <p>${d.booking.payment}</p>
        <p><a class="link-strong" href="/plan-a-mobility/">Registration details and documents for
          coordinators →</a></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Next Barcelona weeks</h2>
      </div>
      ${board}
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Ask about a week</h2>
      <p class="lede">Send the course, the level and the dates you have in mind.</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Ask about a week</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/universities/',
    current: 'universities',
    crumb: 'University staff',
    title: 'Erasmus+ Courses for University Staff in Barcelona | SpainBcn-Programs',
    description: `Erasmus+ KA1 staff training in Barcelona for university teaching, research and administrative staff: University AI & ICT, English, Spanish and presentation skills. ${d.pricing.currency}${hours20} for 20 hours a week, ${d.pricing.currency}${hours25} for 25.`,
  }, body);
}
