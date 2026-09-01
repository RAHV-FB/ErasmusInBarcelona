import { page, esc } from '../layout.js';
import * as d from '../data/site-data.js';

export default function dates() {
  const weeks = d.upcomingWeeks;
  const used = [...new Set(weeks.flatMap((w) => w.courses.map((c) => c.area)))];
  const filters = [{ id: 'all', label: 'All' },
    ...d.courseAreas.filter((a) => used.includes(a.id)).map((a) => ({ id: a.id, label: a.label }))];

  const chips = filters.map((f, i) => `<button type="button" class="chip" data-filter="${f.id}"
          aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(f.label)}</button>`).join('\n        ');

  const rows = weeks.map((w) => `<a class="board__row" href="/contact/"
          data-area="${[...new Set(w.courses.map((c) => c.area))].join(' ')}">
          <span class="board__when">${w.label} <span class="board__month">${w.month}</span></span>
          <span class="board__course">${w.courses.map((c) => esc(c.course)).join(' · ')}</span>
        </a>`).join('\n        ');

  const board = weeks.length
    ? `<div class="filters" role="group" aria-label="Filter weeks by subject">
        <span class="filters__label meta">Filter by subject</span>
        ${chips}
      </div>
      <p class="meta" data-dates-count role="status">${weeks.length} weeks</p>
      <div class="board" data-dates>
        ${rows}
      </div>`
    : `<p>No scheduled Barcelona week in the current calendar. ${esc(d.datesSource.note)}</p>
      <p><a class="link-strong" href="/contact/">Ask us about your dates <span aria-hidden="true">→</span></a></p>`;

  const body = `
  <section class="container hero">
    <div style="max-width:52ch">
      <h1>Staff training dates in Barcelona</h1>
      <p class="lede">${weeks.length
        ? `The ${weeks.length} scheduled course weeks in Barcelona run ${d.schedule.days}.`
        : `Scheduled course weeks in Barcelona run ${d.schedule.days}.`}
        We can also run a course in a week that isn't listed.</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      ${board}
      <div class="board__foot">
        <span class="meta">From the course calendar, ${new Date(d.datesSource.importedOn + 'T12:00:00Z')
          .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}.</span>
      </div>

      <div class="cols cols--split" style="margin-top:44px">
        <div>
          <h2>What "scheduled" means</h2>
          <p>The week is in the calendar and open for registration. It doesn't mean a place is being
            held for you — write to us and we'll confirm your place, the level and the fee before you
            book travel.</p>
        </div>
        <div>
          <h2>If your week isn't listed</h2>
          <p>We can run any course in the catalogue in another week, and a second level can open in a
            week that's already listed. ${esc(d.schedule.twoWeeks)}</p>
          <p class="meta">Ask early if you can, so the documents your Erasmus+ application needs are
            ready in time.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>Barcelona course fee</h2>
        <ul class="price">
          <li><span class="price__amount">${d.pricing.currency}${d.pricing.barcelona.hours20}</span><span class="price__hours">20 hours a week</span></li>
          <li><span class="price__amount">${d.pricing.currency}${d.pricing.barcelona.hours25}</span><span class="price__hours">25 hours a week</span></li>
        </ul>
        <p style="margin-top:16px">Per person, per week. ${d.pricing.includes}</p>
      </div>
      <div>
        <h2>Elsewhere in Spain</h2>
        <p>${d.destinationsSentence}</p>
        <p><a class="link-strong" href="${d.spainbcn.locations}" rel="noopener">See SpainBcn locations <span aria-hidden="true">↗</span></a></p>
      </div>
    </div>
  </section>`;

  return page({
    path: '/dates/',
    current: 'dates',
    crumb: 'Dates',
    title: 'Erasmus+ Staff Training Dates in Barcelona | SpainBcn-Programs',
    description: d.upcomingWeeks.length
      ? `The ${d.upcomingWeeks.length} scheduled staff-training weeks in Barcelona, with the courses running in each. Other weeks and levels on request.`
      : 'The scheduled staff-training weeks in Barcelona. Other weeks and levels on request.',
  }, body);
}
