import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

const PLANNER = [
  { key: 'group', legend: 'Who is coming', options: ['Secondary students', 'High-school students', 'VET students', 'Staff group'] },
  { key: 'size', legend: 'How many', options: ['Up to 9', '10–19', '20–29', '30 or more'] },
  { key: 'focus', legend: 'Subject', options: ['English', 'Spanish', 'AI & ICT', 'Culture', 'Mixed'] },
  { key: 'duration', legend: 'How long', options: ['A week', 'Two weeks', 'Something shorter'] },
  { key: 'when', legend: 'Dates', options: ['We have dates', 'We are flexible'] },
];

export default function bringAGroup() {
  const planner = PLANNER.map((g) => `<fieldset class="planner__group">
          <legend class="planner__legend">${g.legend}</legend>
          <div class="planner__options">
            ${g.options.map((o) => `<button type="button" class="chip" aria-pressed="false"
              data-planner-group="${g.key}" data-planner-option="${esc(o)}">${esc(o)}</button>`).join('\n            ')}
          </div>
        </fieldset>`).join('\n        ');

  const body = `
  <section class="container hero">
    <div class="cols cols--lead">
      <div>
        <h1>Bring your students to Barcelona</h1>
        <p class="lede">Education programmes for secondary, high-school and VET groups, built around your dates,
          your subject and the size of the group. Programmes can run in English or Spanish, with the accompanying
          teachers involved throughout the week.</p>
        <div class="btn-row">
          <a class="btn" href="#plan">Plan your group</a>
          <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
        </div>
      </div>
      <figure class="media media--photo">
        ${img(d.images.ciutadella, { sizes: '(min-width: 860px) 45vw, 100vw', eager: true })}
        <figcaption>Parc de la Ciutadella, Barcelona</figcaption>
      </figure>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>How a group programme comes together</h2>
      </div>
      <div class="tiles">
        <div>
          <h3>Define the objectives</h3>
          <p>Tell us what you want students to work on during the programme, and the dates you are looking at.</p>
        </div>
        <div>
          <h3>We build the programme</h3>
          <p>Classes, trainers, venue and cultural activities. ${d.pricing.groups}</p>
        </div>
        <div>
          <h3>The group comes to Barcelona</h3>
          <p>We run the agreed programme, and provide the agreed documentation afterwards.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--powder" id="plan">
    <div class="container cols cols--lead">
      <div data-planner>
        <h2>Plan your group</h2>
        <p>Start with what you know.</p>
        <div class="planner">
          ${planner}
        </div>
        <div class="btn-row">
          <a class="btn" href="/contact/" data-planner-cta>Send this to the Barcelona team</a>
        </div>
      </div>
      <figure class="media media--photo">
        ${img(d.images.seaGroup, { sizes: '(min-width: 860px) 35vw, 100vw' })}
      </figure>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>Programme formats</h2>
        <ul>
          ${d.projectFormats.map((f) => `<li>${esc(f)}</li>`).join('\n          ')}
        </ul>
        <p class="meta">If your project needs something this page does not name, ask us.</p>
      </div>
      <div>
        <h2>Practical points</h2>
        <ul>
          <li>Accompanying teachers stay with the group through the week.</li>
          <li>${d.schedule.activities}</li>
          <li>Travel, accommodation and meals are arranged by your school and are not part of the fee.</li>
          <li>${d.schedule.certificate} for participants, issued on the final day.</li>
        </ul>
      </div>
    </div>
  </section>
`;

  return page({
    path: '/bring-a-group/',
    current: 'group',
    crumb: 'Bring a group',
    title: 'Erasmus+ Student Group Programmes in Barcelona | SpainBcn-Programs',
    description: 'Programmes in Barcelona for secondary, high-school and VET student groups, built around your dates, subject and group size, in English or Spanish.',
  }, body);
}
