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
      : `<p class="area__none">No scheduled Barcelona week in the current calendar.</p>
            <p class="area__more"><a href="/contact/">Ask us about your dates →</a></p>`;

    return `<article class="area" id="${a.id}">
          <div class="area__subject">
            <h3>${esc(a.label)}</h3>
            <p>${esc(a.desc)}</p>
            <p class="area__lang">Taught in ${esc(a.language)}</p>
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
        <h1>Staff training courses in Barcelona</h1>
        <p class="lede">One-week courses for teachers and education staff, Monday to Friday, with
          20- or 25-hour options.</p>
        <ul class="price price--inline">
          <li><span class="price__amount">${d.pricing.currency}${hours20}</span><span class="price__hours">20 hours</span></li>
          <li><span class="price__amount">${d.pricing.currency}${hours25}</span><span class="price__hours">25 hours</span></li>
        </ul>
        <p class="meta">Per person, per week, in Barcelona.</p>
        <p><a class="link-strong" href="/universities/">Erasmus+ staff training for university staff →</a></p>
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
        <h2>Included in the course fee</h2>
        <ul>
          ${d.pricing.includesList.map((i) => `<li>${esc(i)}</li>`).join('\n          ')}
        </ul>
        <p>You can book through your institution or directly with us. The courses are commonly used
          for Erasmus+ KA1 staff mobility.</p>
        <p class="meta">The fee is exempt from VAT as an educational service, so none is added and none
          appears on the invoice.</p>
      </div>
      <div>
        <h2>Travel and accommodation</h2>
        <p>${d.pricing.travel} ${d.pricing.travelKa1}</p>
        <p><a class="link-strong" href="/barcelona/">Where to stay and how to reach class →</a></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Choosing a week</h2>
      </div>
      <ul class="facts">
        <li><span class="facts__term">Length</span><span class="facts__value">${esc(d.schedule.twoWeeks)}</span></li>
        <li><span class="facts__term">Hours</span><span class="facts__value">${d.schedule.hours}</span></li>
        <li><span class="facts__term">Who comes</span><span class="facts__value">Courses are open to both
          teaching and non-teaching staff, depending on the subject.</span></li>
        <li><span class="facts__term">Levels</span><span class="facts__value">Most courses run at an
          introductory and an advanced level. Say which one you want when you enquire.</span></li>
        <li><span class="facts__term">Language</span><span class="facts__value">English, except the Spanish
          programmes, which are taught in Spanish. The Language + ICT week runs in English or
          Spanish.</span></li>
        <li><span class="facts__term">Group</span><span class="facts__value">${d.schedule.groupSize}</span></li>
        <li><span class="facts__term">Certificate</span><span class="facts__value">${d.schedule.certificate}, issued on the final day.</span></li>
        <li><span class="facts__term">If plans change</span><span class="facts__value">${d.booking.cancellation}</span></li>
      </ul>
      <p style="margin-top:20px"><a class="link-strong" href="/your-week/">See a typical Barcelona week →</a></p>
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
    description: `The six subject areas taught in Barcelona, with the next scheduled Erasmus+ KA1 week for each. ${d.pricing.currency}${hours20} for 20 hours a week, ${d.pricing.currency}${hours25} for 25. Erasmus+ funding is not required.`,
  }, body);
}
