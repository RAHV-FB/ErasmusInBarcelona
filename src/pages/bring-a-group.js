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
        <p class="lede">Programmes for secondary, high-school and VET groups, in English or Spanish,
          with the accompanying teachers taking part alongside the students.</p>
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
        <li><span class="facts__term">Subjects</span><span class="facts__value">Any subject area in the
          catalogue, on its own or combined across the week — most often language, AI and ICT, or
          culture and citizenship. <a href="/join-a-course/">See the areas →</a></span></li>
        <li><span class="facts__term">Language</span><span class="facts__value">English or Spanish.</span></li>
        <li><span class="facts__term">Length</span><span class="facts__value">A week is the usual shape.
          Two weeks and shorter programmes both run; tell us what your project allows.</span></li>
        <li><span class="facts__term">Accompanying teachers</span><span class="facts__value">They stay
          with the group through the week and take part in the sessions.</span></li>
        <li><span class="facts__term">Beyond the classroom</span><span class="facts__value">Job shadowing
          at Spanish schools and education organisations, and educational visits, on their own or mixed
          into one programme.</span></li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>What a group price covers</h2>
        <p>A group programme is quoted rather than listed, because the three things that set the price
          are yours to tell us: how many participants, how long, and what the programme contains.
          Send those three and we come back with a figure and the invoicing arrangement in writing.</p>
        <ul>
          <li>Teaching and the trainers</li>
          <li>Course materials</li>
          <li>The course rooms</li>
          <li>Agreed cultural activities, with a member of the team accompanying the group</li>
          <li>Certificates and the documents your project needs</li>
        </ul>
        <p class="meta">The fee is exempt from VAT as an educational service.</p>
      </div>
      <div>
        <h2>What your school arranges</h2>
        <p>Travel to Spain and within it, accommodation, meals, local transport and insurance. We do not
          book accommodation or act as a travel agency, and we do not supervise students outside the
          programme hours and the agreed activities.</p>
        <p>Under Erasmus+ those costs come from the grant's own budget lines rather than from what you
          pay us.</p>
        <p><a class="link-strong" href="/barcelona/">Where groups usually stay in Barcelona →</a></p>
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

  <section class="section section--rule">
    <div class="container cols cols--split">
      <div>
        <h2>What happens next</h2>
        <ol class="steps">
          <li>You send the group, the subject and the dates you are considering.</li>
          <li>We propose the programme for the Spain-based part and quote it in writing.</li>
          <li>When you accept, we confirm the arrangements and send the documents your project needs.</li>
        </ol>
        <p class="meta">${d.contact.replyTime} Asking is not a commitment.</p>
      </div>
      <div>
        <h2>If you are the coordinator</h2>
        <p>The documents, the OID, the receiving-partner role and how invoicing works are set out for
          institutions on their own page.</p>
        <p><a class="link-strong" href="/plan-a-mobility/">Planning a mobility for your institution →</a></p>
      </div>
    </div>
  </section>
`;

  return page({
    path: '/bring-a-group/',
    current: 'group',
    crumb: 'Bring a group',
    title: 'Erasmus+ Student Group Programmes in Barcelona | SpainBcn-Programs',
    description: 'Programmes in Barcelona for secondary, high-school and VET student groups: what we build, what a group price covers, what your school arranges, and how a quote works.',
  }, body);
}
