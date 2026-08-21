import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

const INDEX_LABELS = {
  ai: 'AI + digital',
  english: 'English',
  spanish: 'Spanish',
  inclusion: 'Inclusion',
  wellbeing: 'Wellbeing',
  creative: 'Creative',
};

/** The next scheduled Barcelona weeks for one subject area. */
function nextWeeks(areaId, limit = 3) {
  return d.dates.filter((w) => w.area === areaId).slice(0, limit);
}

export default function joinACourse() {
  const { hours20, hours25 } = d.pricing.barcelona;

  const jumpIndex = d.courseAreas.map((a) =>
    `<a href="#${a.id}">${esc(INDEX_LABELS[a.id] || a.label)}</a>`).join('\n        ');

  const directory = d.courseAreas.map((a) => {
    const programmes = a.programmes.map((p) =>
      `<li><a href="${p.url}" rel="noopener">${esc(p.name)}</a></li>`).join('\n              ');

    const weeks = nextWeeks(a.id);
    const when = weeks.length
      ? `<ul class="area__dates">
              ${weeks.map((w) => `<li><a href="/dates/"><b>${w.label}</b> ${w.month}
                <span>${esc(w.course)}</span></a></li>`).join('\n              ')}
            </ul>
            <p class="area__more"><a href="/dates/">All Barcelona dates →</a></p>`
      : `<p class="area__none">Dates on request</p>
            <p class="area__more"><a href="/contact/">Ask about a week →</a></p>`;

    return `<article class="area" id="${a.id}">
          <div class="area__subject">
            <h3>${esc(a.label)}</h3>
            <p>${esc(a.desc)}</p>
          </div>
          <div class="area__programmes">
            <ul>
              ${programmes}
            </ul>
            <p class="area__more"><a href="${a.subjects[0].url}" rel="noopener">Full ${esc(a.subjects[0].name)} area on SpainBcn ↗</a></p>
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
        <h1>Courses in Barcelona</h1>
        <p class="lede">Staff training for teachers and education professionals. Choose an area below,
          then check the Barcelona weeks that match it.</p>
        <div class="btn-row">
          <a class="btn" href="/dates/">See all dates</a>
          <a class="btn btn--ghost" href="/contact/">Ask about another week</a>
        </div>
      </div>
      <figure class="media media--photo">
        ${img(d.images.spanishOffice, { sizes: '(min-width: 860px) 48vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <h2 class="visually-hidden">Course areas</h2>
      <nav class="jump" aria-label="Course areas">
        ${jumpIndex}
      </nav>

      <div class="directory">
        ${directory}
      </div>
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
        <p style="margin-top:16px">${d.pricing.includes}</p>
        <p class="meta">${d.pricing.travel}</p>
      </div>
      <div>
        <h2>Documents for your mobility</h2>
        <p>We provide the course description and programme, pre-registration and acceptance
          documents, the invoice, and your certificate of attendance.</p>
        <p><a class="link-strong" href="/plan-a-mobility/">Documents and project support →</a></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Choosing a week</h2>
      </div>
      <ul class="facts">
        <li><span class="facts__term">Length</span><span class="facts__value">One week, or two. ${d.schedule.twoWeeks}</span></li>
        <li><span class="facts__term">Hours</span><span class="facts__value">${d.schedule.hours}</span></li>
        <li><span class="facts__term">Language</span><span class="facts__value">English, or Spanish for the Spanish programmes.</span></li>
        <li><span class="facts__term">Group</span><span class="facts__value">${d.schedule.groupSize}</span></li>
        <li><span class="facts__term">Certificate</span><span class="facts__value">${d.schedule.certificate}, issued on the final day.</span></li>
      </ul>
      <p style="margin-top:20px"><a class="link-strong" href="/your-week/">See a typical Barcelona week →</a></p>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Tell us the week you want</h2>
      <p class="lede">Send the subject, your level and the dates you have in mind. ${d.contact.replyTime}</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Ask about a course</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/join-a-course/',
    current: 'join',
    crumb: 'Courses',
    title: 'Erasmus+ Staff Training Courses in Barcelona | SpainBcn-Programs',
    description: `Erasmus+ courses in Barcelona for teachers and education staff, with the next scheduled week for each subject. ${d.pricing.currency}${hours20} for 20 hours a week, ${d.pricing.currency}${hours25} for 25.`,
  }, body);
}
