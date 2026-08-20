import { page, esc } from '../layout.js';
import * as d from '../data/site-data.js';

export default function planAMobility() {
  const documents = d.documents.map((doc) =>
    `<li><span class="facts__term">${esc(doc.name)}</span><span class="facts__value">${esc(doc.note)}</span></li>`).join('\n        ');

  const formats = d.projectFormats.map((f) => `<li>${esc(f)}</li>`).join('\n          ');

  const body = `
  <section class="container hero">
    <div style="max-width:52ch">
      <h1>Planning a mobility for your institution</h1>
      <p class="lede">For Erasmus+ coordinators, school leadership and institutions arranging mobility for their
        staff or students. Tell us the project, and the Barcelona team builds and runs the Spanish part.</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Tell us about the project</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>

  <section class="section section--rule">
    <div class="container cols cols--split">
      <div>
        <h2>Wherever the project stands</h2>
        <h3>You have an approved project</h3>
        <p>We act as the receiving partner in Spain: we run the programme, confirm every arrangement in writing,
          and provide the documents your grant administration needs.</p>
        <h3>You are still preparing it</h3>
        <p>We provide the course descriptions and pre-registration documents your application needs, and confirm
          dates and fees in writing, so you can plan the Spanish part before you submit.</p>
      </div>
      <div>
        <h2>What we can organise</h2>
        <ul>
          ${formats}
        </ul>
        <p class="meta">Need a different format? Tell us what your project requires.</p>
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container">
      <div class="section-head">
        <h2>Documents we provide</h2>
        <p>For Erasmus+ staff mobility. SpainBcn-Programs · Erasmus+ OID ${d.organisation.oid}</p>
      </div>
      <ul class="facts">
        ${documents}
      </ul>
      <p class="meta" style="margin-top:20px">In the EU participant portal we are registered as
        ${d.organisation.legalName}</p>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>Fees and invoicing</h2>
        <p>Course fees are per person and are published on each subject-area page. ${d.pricing.groups}</p>
        <p>${d.pricing.excludes}</p>
      </div>
      <div>
        <h2>Where the programme runs</h2>
        <p>Barcelona is the base: the office is in Gràcia, five minutes on foot from the Sagrada Família, and
          classes also run at Barceloneta.</p>
        <p class="meta">Depending on the group and the dates, a project can also run at SpainBcn's other Spanish
          destinations — <a href="${d.spainbcn.locations}" rel="noopener">see locations ↗</a>.</p>
      </div>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Tell us what your project needs</h2>
      <p class="lede">The group, the objectives and the dates you have in mind. Asking is not a commitment.
        ${d.contact.replyTime}</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Start the conversation</a>
        <a class="btn btn--ghost" href="${d.spainbcn.projects}" rel="noopener">How projects work on SpainBcn ↗</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/plan-a-mobility/',
    current: '',
    crumb: 'Plan a mobility',
    title: 'Plan an Erasmus+ Mobility in Barcelona | SpainBcn-Programs',
    description: 'For Erasmus+ coordinators and institutions: tailored training, student groups, job shadowing and educational visits in Barcelona, with the documents your grant administration needs.',
  }, body);
}
