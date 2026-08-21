import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

// The example week SpainBcn publishes for Barcelona. Activities vary
// by week, which the page says next to the table.
const WEEK = [
  { day: 'Monday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Old town walking tour', kind: 'activity' }] },
  { day: 'Tuesday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Afternoon free', kind: 'free' }] },
  { day: 'Wednesday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Afternoon free', kind: 'free' }] },
  { day: 'Thursday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Montjuïc and the Olympic Stadium', kind: 'activity' }] },
  { day: 'Friday', slots: [{ label: 'Class', kind: 'class' }, { label: 'Afternoon free', kind: 'free' }] },
];

export default function yourWeek() {
  const week = WEEK.map((day) => `<div class="week__day">
          <p class="week__name">${day.day}</p>
          ${day.slots.map((s) => `<div class="week__slot week__slot--${s.kind}">
            <b>${s.kind === 'class' ? 'Morning' : 'Afternoon'}</b>${esc(s.label)}
          </div>`).join('\n          ')}
        </div>`).join('\n        ');

  const documents = d.documents.map((doc) => `<li>${esc(doc.name)}</li>`).join('\n          ');

  const body = `
  <section class="container hero">
    <div class="cols cols--lead">
      <div>
        <h1>Your Barcelona week</h1>
        <p class="lede">What to expect before you arrive, during the course and between sessions.</p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.workingSession, { sizes: '(min-width: 860px) 45vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Before you arrive</h2>
      </div>
      <ul class="facts">
        <li><span class="facts__term">Registration</span><span class="facts__value">Write to us with the course and
          the week you want. A question is not a booking, and we confirm your place in writing.</span></li>
        <li><span class="facts__term">Your venue</span><span class="facts__value">${d.contact.venueNote}</span></li>
        <li><span class="facts__term">Travel and stay</span><span class="facts__value">You arrange your travel and accommodation
          separately. We confirm the course venue before you travel.</span></li>
        <li><span class="facts__term">Paperwork</span><span class="facts__value">Tell us what your institution needs —
          invitation letter, acceptance letter or course description — and we send it before you travel.</span></li>
      </ul>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container">
      <div class="section-head">
        <h2>An example week</h2>
        <p>${d.schedule.pattern} ${d.schedule.hours} The cultural activities change from week to week; this is the
          pattern a Barcelona week usually follows.</p>
      </div>
      <div class="week">
        ${week}
      </div>
      <p class="meta" style="margin-top:16px">${d.schedule.activities}</p>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>Your first day</h2>
        <p>You meet the trainer and the rest of the group at the venue confirmed with your registration.
          ${d.schedule.materials}</p>
        <p>${d.schedule.groupSize}</p>
      </div>
      <div>
        <h2>Afternoons</h2>
        <p>Two afternoons are the week's cultural activities, and someone from the team goes with the group.
          The other afternoons are yours.</p>
        <p><a class="link-strong" href="/barcelona/">Practical information about the city →</a></p>
      </div>
    </div>
  </section>

  <section class="section section--rule">
    <div class="container cols cols--split">
      <div>
        <h2>At the end of the week</h2>
        <p>Your ${d.schedule.certificate.toLowerCase()} is issued on the final day.</p>
        <p>For the rest of the mobility paperwork, we provide:</p>
        <ul>
          ${documents}
        </ul>
      </div>
      <div>
        <h2>Who to ask</h2>
        <p>Miriam coordinates the courses and Adriana handles registrations and paperwork. The same team is
          reachable before, during and after the week.</p>
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
    title: 'What an Erasmus+ Course Week in Barcelona Looks Like',
    description: 'Before you arrive, the classroom week, the cultural afternoons and the certificate: what to expect from a course week in Barcelona.',
  }, body);
}
