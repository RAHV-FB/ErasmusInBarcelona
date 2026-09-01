// ============================================================
// /courses/ — the Barcelona catalogue: the course groups, each
// linking to its own page. Group content from course-groups.js,
// every fact from site-data.js.
// ============================================================
import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';
import { courseGroups } from '../data/course-groups.js';

export default function courses() {
  const { hours20, hours25 } = d.pricing.barcelona;

  const cards = courseGroups.map((g, i) => `<article class="group-card">
        <figure class="group-card__photo">
          ${img(d.images[g.image], { sizes: '(min-width: 960px) 30vw, (min-width: 640px) 45vw, 100vw', eager: i < 3 })}
        </figure>
        <div class="group-card__body">
          <h3><a href="/courses/${g.slug}/">${esc(g.navLabel)}</a></h3>
          <p>${esc(g.short)}</p>
          <p class="meta">${g.courses.length} courses · Taught in ${esc(g.language)}</p>
        </div>
      </article>`).join('\n      ');

  const body = `
  <section class="container hero hero--tight">
    <h1>Course groups in Barcelona</h1>
    <p class="lede">One-week Erasmus+ KA1 staff training for teachers and education staff, in
      ${courseGroups.length} groups. Every group runs ${d.schedule.days}, at ${d.schedule.hoursShort}
      a week, with the same fee.</p>
    <ul class="price price--inline">
      <li><span class="price__amount">${d.pricing.currency}${hours20}</span><span class="price__hours">20 hours</span></li>
      <li><span class="price__amount">${d.pricing.currency}${hours25}</span><span class="price__hours">25 hours</span></li>
    </ul>
    <p class="meta">Per person, per week, in Barcelona. ${esc(d.pricing.includes)}</p>
  </section>

  <section class="section section--tight">
    <div class="container">
      <h2 class="visually-hidden">The groups</h2>
      <div class="group-cards">
      ${cards}
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>Choosing between them</h2>
        <p>Every course states its objectives and learning outcomes. ${esc(d.schedule.levels)}
          If a project sits across two groups, say so — a week can be built around it.</p>
        <p><a class="link-strong" href="/join-a-course/">Fees, cancellation and how joining works <span aria-hidden="true">→</span></a></p>
      </div>
      <div>
        <h2>When they run</h2>
        <p>${esc(d.schedule.pattern)} ${esc(d.datesSource.note)}</p>
        <p><a class="link-strong" href="/dates/">All Barcelona dates <span aria-hidden="true">→</span></a></p>
      </div>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Not sure which group fits?</h2>
      <p class="lede">Describe your school, your project or your development plan, and we suggest
        a course. ${esc(d.contact.replyTime)}</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Ask us</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/courses/',
    current: 'courses',
    crumb: 'Course groups',
    title: 'Erasmus+ KA1 Course Groups in Barcelona | SpainBcn-Programs',
    description: `The ${courseGroups.length} Barcelona course groups — ${courseGroups.map((g) => g.navLabel).join(' · ')}. ${d.pricing.currency}${hours20} for 20 hours a week, ${d.pricing.currency}${hours25} for 25.`,
  }, body);
}
