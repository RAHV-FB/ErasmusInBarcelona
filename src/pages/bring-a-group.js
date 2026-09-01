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
        <p class="lede">Programmes for secondary, high-school and VET student groups, in English or
          Spanish, with the accompanying teachers taking part alongside the students.</p>
        <p class="meta">Looking for training for your staff instead?
          <a href="/join-a-course/">See the courses <span aria-hidden="true">→</span></a></p>
        <div class="btn-row">
          <a class="btn" href="#plan">Plan your group</a>
          <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
        </div>
      </div>
      <figure class="media media--photo">
        ${img(d.images.ciutadella, { sizes: '(min-width: 860px) 45vw, 100vw', eager: true })}
        <figcaption>Parc de la Ciutadella</figcaption>
      </figure>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="section-head">
        <h2>What we can build</h2>
      </div>
      <ul class="facts">
        <li><span class="facts__term">Who it is for</span><span class="facts__value">Secondary,
          high-school and VET student groups, travelling with their own teachers.</span></li>
        <li><span class="facts__term">Subjects</span><span class="facts__value">Language, AI and ICT,
          and culture and citizenship are the usual choices, on their own or combined across the
          week. Ask about other subjects. <a href="/join-a-course/">See the areas <span aria-hidden="true">→</span></a></span></li>
        <li><span class="facts__term">Language</span><span class="facts__value">English or Spanish.</span></li>
        <li><span class="facts__term">Length</span><span class="facts__value">A week is usual. We also
          run two-week and shorter programmes.</span></li>
        <li><span class="facts__term">Accompanying teachers</span><span class="facts__value">They stay
          with the group through the week and take part in the sessions.</span></li>
        <li><span class="facts__term">Beyond the classroom</span><span class="facts__value">Job shadowing
          at Spanish schools and education organisations, and educational visits, on their own or as part
          of the week.</span></li>
      </ul>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="gallery-quad">
        <figure class="media media--photo">
          ${img(d.images.jovenesClass, { sizes: '(min-width: 640px) 45vw, 100vw' })}
        </figure>
        <figure class="media media--photo">
          ${img(d.images.jovenesCertificates, { sizes: '(min-width: 640px) 45vw, 100vw' })}
        </figure>
        <figure class="media media--photo">
          ${img(d.images.jovenesViewpoint, { sizes: '(min-width: 640px) 45vw, 100vw' })}
        </figure>
        <figure class="media media--photo">
          ${img(d.images.jovenesSculpture, { sizes: '(min-width: 640px) 45vw, 100vw' })}
        </figure>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>What a group price covers</h2>
        <p>${esc(d.pricing.groups)}</p>
        <ul>
          <li>Teaching</li>
          <li>Course materials</li>
          <li>The course rooms</li>
          <li>Agreed cultural activities, with someone from the team along</li>
          <li>Certificates and the documents your project needs</li>
        </ul>
        <p class="meta">${esc(d.booking.vatLine)}</p>
      </div>
      <div>
        <h2>Travel and accommodation</h2>
        <p>Your school arranges travel, accommodation, meals, local transport and insurance. Students
          are in our care during the programme hours and the agreed activities, and in yours the rest
          of the time.</p>
        <p><a class="link-strong" href="/barcelona/">Where groups usually stay in Barcelona <span aria-hidden="true">→</span></a></p>
      </div>
    </div>
  </section>

  <section class="section section--powder" id="plan">
    <div class="container cols cols--lead">
      <div data-planner>
        <h2>Plan your group</h2>
        <p>Start with what you already know.</p>
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

  <figure class="media media--band">
    ${img(d.images.studentCertificates, { sizes: '100vw' })}
  </figure>

  <section class="section section--rule">
    <div class="container cols cols--split">
      <div>
        <h2>What happens next</h2>
        <ol class="steps">
          <li>You send the group, the subject and the dates you are considering.</li>
          <li>We propose the programme and quote it in writing.</li>
          <li>When you accept, we confirm the arrangements and send the documents your project needs.</li>
        </ol>
        <p class="meta">${d.contact.replyTime}</p>
      </div>
      <div>
        <h2>If you are the coordinator</h2>
        <p>We provide the documents, the registration details and the written invoicing terms your
          project needs.</p>
        <p><a class="link-strong" href="/plan-a-mobility/">Institutional programmes <span aria-hidden="true">→</span></a></p>
      </div>
    </div>
  </section>
`;

  return page({
    path: '/bring-a-group/',
    current: 'group',
    crumb: 'Student groups',
    title: 'Erasmus+ Student Group Programmes in Barcelona | SpainBcn-Programs',
    description: 'Programmes in Barcelona for secondary, high-school and VET student groups: what we build, what a group price covers, what your school arranges, and how a quote works.',
  }, body);
}
