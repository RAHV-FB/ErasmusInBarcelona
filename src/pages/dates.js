import { page, esc } from '../layout.js';
import * as d from '../data/site-data.js';

export default function dates() {
  const used = [...new Set(d.dates.map((w) => w.area))];
  const filters = [{ id: 'all', label: 'All' },
    ...d.courseAreas.filter((a) => used.includes(a.id)).map((a) => ({ id: a.id, label: a.label }))];

  const chips = filters.map((f, i) => `<button type="button" class="chip" data-filter="${f.id}"
          aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(f.label)}</button>`).join('\n        ');

  const rows = d.dates.map((w) => `<a class="board__row" href="/contact/" data-area="${w.area}">
          <span class="board__when">${w.label} <span class="board__month">${w.month}</span></span>
          <span class="board__course">${esc(w.course)}</span>
        </a>`).join('\n        ');

  const body = `
  <section class="container hero">
    <div style="max-width:52ch">
      <h1>Course dates in Barcelona</h1>
      <p class="lede">Every scheduled course week in Barcelona. Courses run Monday to Friday.
        ${d.datesSource.note}</p>
      <p class="meta">Groups are small — confirm your week before booking travel.</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="filters" role="group" aria-label="Filter weeks by subject">
        <span class="filters__label meta">Filter by subject</span>
        ${chips}
      </div>
      <p class="meta" data-dates-count>${d.dates.length} scheduled weeks</p>
      <p class="visually-hidden">Every week listed below is a scheduled week.</p>
      <div class="board" data-dates>
        ${rows}
      </div>
      <div class="board__foot">
        <span class="meta">Exported from the course calendar on ${d.datesSource.importedOn}.</span>
        <a class="link-strong" href="/contact/">Ask about another week →</a>
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>What a week costs</h2>
        <ul class="price">
          <li><span class="price__amount">${d.pricing.currency}${d.pricing.barcelona.hours20}</span><span class="price__hours">20 hours a week</span></li>
          <li><span class="price__amount">${d.pricing.currency}${d.pricing.barcelona.hours25}</span><span class="price__hours">25 hours a week</span></li>
        </ul>
        <p class="meta" style="margin-top:16px">Per person, per week. ${d.pricing.includes}</p>
      </div>
      <div>
        <h2>Looking elsewhere in Spain?</h2>
        <p>This page lists Barcelona only. SpainBcn also runs weeks in Málaga, Mallorca, Gran Canaria, Tenerife
          and Tarragona.</p>
        <p><a class="link-strong" href="${d.spainbcn.locations}" rel="noopener">See SpainBcn locations ↗</a></p>
      </div>
    </div>
  </section>`;

  return page({
    path: '/dates/',
    current: 'dates',
    crumb: 'Dates',
    title: 'Erasmus+ Course Dates in Barcelona | SpainBcn-Programs',
    description: `The ${d.dates.length} scheduled Erasmus+ course weeks in Barcelona, with the subject and dates of each. Other dates and levels open on request.`,
  }, body);
}
