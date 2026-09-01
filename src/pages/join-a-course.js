import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';
import { courseGroups } from '../data/course-groups.js';

/** The next upcoming Barcelona weeks whose sheet labels belong to the group. */
const nextWeeks = (group, limit = 3) => d.upcomingWeeksFor(group.dateCourses, limit);

export default function joinACourse() {
  const { hours20, hours25 } = d.pricing.barcelona;

  const jumpIndex = courseGroups.map((g) =>
    `<a href="#${g.slug}">${esc(g.navLabel)}</a>`).join('\n        ');

  const directory = courseGroups.map((g) => {
    const courses = g.courses.map((c) =>
      `<li><a href="/courses/${g.slug}/#${c.id}">${esc(c.title)}</a></li>`).join('\n              ');

    const weeks = nextWeeks(g);
    const when = weeks.length
      ? `<ul class="area__dates">
              ${weeks.map((w) => `<li><a href="/dates/"><b>${w.label}</b> ${w.month}
                <span>${w.courses.map((c) => esc(c.course)).join(' · ')}</span></a></li>`).join('\n              ')}
            </ul>
            <p class="area__more"><a href="/dates/">All Barcelona dates <span aria-hidden="true">→</span></a></p>`
      : `<p class="area__none">No scheduled Barcelona week in the current calendar.</p>
            <p class="area__more"><a href="/contact/">Ask us about your dates <span aria-hidden="true">→</span></a></p>`;

    return `<article class="area" id="${g.slug}">
          <div class="area__subject">
            <h3><a href="/courses/${g.slug}/">${esc(g.navLabel)}</a></h3>
            <p>${esc(g.short)}</p>
            <p class="area__lang">Taught in ${esc(g.language)}</p>
          </div>
          <div class="area__programmes">
            <ul>
              ${courses}
            </ul>
            <p class="area__more"><a href="/courses/${g.slug}/">Full group page <span aria-hidden="true">→</span></a></p>
          </div>
          <div class="area__when">
            <p class="eyebrow">Next in Barcelona</p>
            ${when}
          </div>
        </article>`;
  }).join('\n        ');

  const body = `
  <section class="container hero hero--tight">
    <div class="cols cols--lead">
      <div>
        <h1>Staff training courses in Barcelona</h1>
        <p class="lede">One-week courses for teachers and education staff, ${d.schedule.days}, at
          ${d.schedule.hoursShort} a week.</p>
        <ul class="price price--inline">
          <li><span class="price__amount">${d.pricing.currency}${hours20}</span><span class="price__hours">20 hours</span></li>
          <li><span class="price__amount">${d.pricing.currency}${hours25}</span><span class="price__hours">25 hours</span></li>
        </ul>
        <p class="meta">Per person, per week, in Barcelona.</p>
        <p><a class="link-strong" href="/universities/">Erasmus+ staff training for university staff <span aria-hidden="true">→</span></a></p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.staffTrainingRoom, { sizes: '(min-width: 860px) 48vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <h2 class="visually-hidden">Course groups</h2>
      <nav class="jump" aria-label="Course groups">
        ${jumpIndex}
      </nav>

      <div class="directory">
        ${directory}
      </div>
      <p class="meta" style="margin-top:16px">The full SpainBcn catalogue, with the other Spanish
        destinations, is on <a href="${d.spainbcn.catalogue}" rel="noopener">SpainBcn.com <span aria-hidden="true">↗</span></a>.</p>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>Included in the course fee</h2>
        <ul>
          ${d.pricing.includesList.map((i) => `<li>${esc(i)}</li>`).join('\n          ')}
        </ul>
        <p>You can book through your institution or directly with us. The courses are commonly used
          for Erasmus+ KA1 staff mobility.</p>
        <p class="meta">${esc(d.booking.vatLine)}</p>
      </div>
      <div>
        <h2>Travel and accommodation</h2>
        <p>${d.pricing.travel} ${d.pricing.travelKa1}</p>
        <p><a class="link-strong" href="/barcelona/">Where to stay and how to reach class <span aria-hidden="true">→</span></a></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--lead">
      <div>
      <div class="section-head">
        <h2>Choosing a week</h2>
      </div>
      <ul class="facts">
        <li><span class="facts__term">Length</span><span class="facts__value">${esc(d.schedule.twoWeeks)}</span></li>
        <li><span class="facts__term">Hours</span><span class="facts__value">${d.schedule.hours}</span></li>
        <li><span class="facts__term">Who comes</span><span class="facts__value">Courses are open to both
          teaching and non-teaching staff, depending on the subject.</span></li>
        <li><span class="facts__term">Levels</span><span class="facts__value">${esc(d.schedule.levels)}
          Say which level you need when you enquire.</span></li>
        <li><span class="facts__term">Language</span><span class="facts__value">${esc(d.schedule.language)}</span></li>
        <li><span class="facts__term">Group</span><span class="facts__value">${d.schedule.groupSize}</span></li>
        <li><span class="facts__term">Certificate</span><span class="facts__value">${esc(d.schedule.certificateLine)}</span></li>
        <li><span class="facts__term">If plans change</span><span class="facts__value">${d.booking.cancellation}</span></li>
      </ul>
      <p style="margin-top:20px"><a class="link-strong" href="/your-week/">See a typical Barcelona week <span aria-hidden="true">→</span></a></p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.galleryRoom, { sizes: '(min-width: 860px) 45vw, 100vw' })}
      </figure>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Ask about a week</h2>
      <p class="lede">Send the subject, the level and the dates you have in mind.</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Ask about a week</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/join-a-course/',
    current: 'join',
    crumb: 'Staff training',
    title: 'Erasmus+ KA1 Staff Training Courses in Barcelona | SpainBcn-Programs',
    description: `The ${courseGroups.length} Barcelona course groups with their courses, and the next scheduled Erasmus+ KA1 weeks. ${d.pricing.currency}${hours20} for 20 hours a week, ${d.pricing.currency}${hours25} for 25. Erasmus+ funding is not required.`,
  }, body);
}
