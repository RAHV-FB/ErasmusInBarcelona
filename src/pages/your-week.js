import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

// The example week SpainBcn publishes for Barcelona. Which activities run
// changes from week to week, which the page says next to the table.
const WEEK = [
  { day: 'Monday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Old town walking tour', kind: 'activity' }] },
  { day: 'Tuesday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Free', kind: 'free' }] },
  { day: 'Wednesday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Free', kind: 'free' }] },
  { day: 'Thursday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Montjuïc and the Olympic Stadium', kind: 'activity' }] },
  { day: 'Friday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Free', kind: 'free' }] },
];

export default function yourWeek() {
  const week = WEEK.map((day) => `<div class="week__day">
          <p class="week__name">${day.day}</p>
          ${day.slots.map((s) => `<div class="week__slot week__slot--${s.kind}">
            <b>${s.kind === 'class' ? 'Morning' : 'Afternoon'}</b>${esc(s.label)}
          </div>`).join('\n          ')}
        </div>`).join('\n        ');

  const documents = d.documents.map((doc) =>
    `<li><span class="facts__term">${esc(doc.name)}</span><span class="facts__value">${esc(doc.note)}</span></li>`)
    .join('\n          ');

  const steps = d.booking.steps.map((s) => `<li>${esc(s)}</li>`).join('\n          ');

  const body = `
  <section class="container hero hero--tight">
    <div class="cols cols--lead">
      <div>
        <h1>A staff training week in Barcelona</h1>
        <p class="lede">From your first morning to the certificate on Friday, here's how a typical week
          works.</p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.ictDayByDay, { sizes: '(min-width: 860px) 45vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="section-head">
        <h2>From enquiry to confirmed place</h2>
      </div>
      <ol class="steps">
        ${steps}
      </ol>
      <p class="meta">${d.booking.payment}</p>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container">
      <div class="section-head">
        <h2>The five days</h2>
        <p>${d.schedule.pattern} ${d.schedule.hours} ${esc(d.schedule.twoWeeks)}</p>
      </div>
      <div class="week">
        ${week}
      </div>
      <p class="meta" style="margin-top:16px">An example week. The cultural activities vary by week;
        both are included in the fee and optional to attend. We send the final timetable before you
        arrive.</p>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>Your first morning</h2>
        <p>You go to the course location we confirmed when you signed up — Gràcia or Barceloneta, not
          necessarily the office.</p>
        <p>${d.schedule.materials} ${d.schedule.groupSize}</p>

        <h2 style="margin-top:1.6em">What to bring</h2>
        <p>Bring a laptop for the AI and ICT courses — you'll be trying the tools on your own material.
          For other subjects a notebook is enough, unless your trainer asks for something specific.</p>
      </div>
      <div>
        <h2>Lunch and afternoons</h2>
        <p>There's no canteen, so lunch is on your own. Both course areas have cafés and restaurants
          within a few minutes' walk.</p>
        <p>Two afternoons are the week's cultural activities, and someone from the team goes with the
          group. The other three are yours.</p>
        <p><a class="link-strong" href="/barcelona/">What to do with a free afternoon →</a></p>
      </div>
    </div>
  </section>

  <section class="section section--rule">
    <div class="container cols cols--split">
      <div>
        <h2>Documents we provide</h2>
        <p>We can provide these documents when your institution needs them. Your
          ${d.schedule.certificate.toLowerCase()} is issued on the final day of the course.</p>
        <ul class="facts">
          ${documents}
        </ul>
      </div>
      <div>
        <h2>If something changes</h2>
        <p>${d.booking.cancellation}</p>
        <p>${d.booking.changes}</p>

        <h2 style="margin-top:1.6em">Who to ask</h2>
        <ul class="facts">
          <li><span class="facts__term">Email</span><span class="facts__value"><a href="${d.contact.emailHref}">${d.contact.email}</a></span></li>
          <li><span class="facts__term">Phone and WhatsApp</span><span class="facts__value"><a href="${d.contact.phoneHref}">${d.contact.phone}</a></span></li>
        </ul>
      </div>
    </div>
  </section>`;

  return page({
    path: '/your-week/',
    current: 'week',
    crumb: 'Your week',
    title: 'What a Staff Training Week in Barcelona Looks Like | SpainBcn-Programs',
    description: 'The five days of a staff-training week in Barcelona: hours, cultural afternoons, what to bring, the documents provided and what happens if your plans change.',
  }, body);
}
