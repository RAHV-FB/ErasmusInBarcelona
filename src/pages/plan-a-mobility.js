import { page, esc } from '../layout.js';
import * as d from '../data/site-data.js';

export default function planAMobility() {
  const documents = d.documents.map((doc) =>
    `<li><span class="facts__term">${esc(doc.name)}</span><span class="facts__value">${esc(doc.note)}</span></li>`).join('\n        ');

  const formats = d.projectFormats.map((f) => `<li>${esc(f)}</li>`).join('\n          ');

  const body = `
  <section class="container hero hero--tight">
    <div style="max-width:54ch">
      <h1>Planning a mobility for your institution</h1>
      <p class="lede">What SpainBcn-Programs can host in Barcelona, which documents it issues and when,
        how a quote and an invoice work, and the registration details your application needs.</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Tell us about the project</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="states">
        <div class="state">
          <p class="eyebrow">You already have funding</p>
          <ul class="facts">
            <li><span class="facts__term">Programme</span><span class="facts__value">We build the week around the objectives, dates and group in your project.</span></li>
            <li><span class="facts__term">Receiving partner</span><span class="facts__value">We act as the receiving partner in Spain and confirm every arrangement in writing.</span></li>
            <li><span class="facts__term">Documents</span><span class="facts__value">Invitation letter, acceptance letters, certificates and the invoice for your grant records.</span></li>
          </ul>
        </div>
        <div class="state">
          <p class="eyebrow">You are preparing the project</p>
          <ul class="facts">
            <li><span class="facts__term">Course descriptions</span><span class="facts__value">Descriptions and programmes to attach to the application.</span></li>
            <li><span class="facts__term">Pre-registration</span><span class="facts__value">Pre-registration confirmation for KA1 applications.</span></li>
            <li><span class="facts__term">Dates and fees</span><span class="facts__value">Confirmed in writing before you submit, so the Spain-based part of the budget is costed.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container">
      <div class="section-head">
        <h2>Documents we provide</h2>
        <p>SpainBcn-Programs · Erasmus+ OID ${d.organisation.oid} · registered as ${d.organisation.legalName}</p>
      </div>
      <ul class="facts">
        ${documents}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>Programme formats</h2>
        <ul>
          ${formats}
        </ul>
        <p class="meta">Formats can be combined inside one programme — training in the mornings and job
          shadowing later in the week, for instance.</p>
      </div>
      <div>
        <h2>Fees and invoicing</h2>
        <p>Course fees are per person and are published on each subject-area page: in Barcelona,
          ${d.pricing.currency}${d.pricing.barcelona.hours20} for 20 hours and
          ${d.pricing.currency}${d.pricing.barcelona.hours25} for 25. A private week or a group project
          is quoted on participant numbers, length and content.</p>
        <p>${d.booking.vat}</p>
        <p>The contract and the invoice go to whoever is booking: your institution, or the participant
          if they book privately. ${d.booking.payment}</p>
        <p class="meta">${d.pricing.travel}</p>
        <h2 style="margin-top:1.6em">Where it runs</h2>
        <p>Barcelona is the base: the office is in Gràcia and classes also run at Barceloneta.
          Depending on the group and the dates, a project can also run at SpainBcn's other Spanish
          destinations — <a href="${d.spainbcn.locations}" rel="noopener">see locations ↗</a>.</p>
      </div>
    </div>
  </section>

  <section class="section section--rule">
    <div class="container cols cols--split">
      <div>
        <h2>Registration details for your application</h2>
        <ul class="facts">
          <li><span class="facts__term">Erasmus+ OID</span><span class="facts__value">${d.organisation.oid}</span></li>
          <li><span class="facts__term">In the participant portal</span><span class="facts__value">SpainBcn-Programs</span></li>
          <li><span class="facts__term">Legal name</span><span class="facts__value">${d.organisation.legalName}</span></li>
          <li><span class="facts__term">NIF</span><span class="facts__value">${d.organisation.nif}</span></li>
          <li><span class="facts__term">Address</span><span class="facts__value">${d.contact.address}, Spain</span></li>
        </ul>
      </div>
      <div>
        <h2>When to get in touch</h2>
        <p>Before you submit, if you can. The pre-registration confirmation and the course description
          your application needs take a couple of working days to prepare, and we can confirm dates and
          fees in writing so the Spanish part of the budget is costed rather than estimated.</p>
        <p>After approval we act as the receiving partner: we deliver the programme, confirm every
          arrangement in writing and issue the documents your grant administration needs.</p>
        <p class="meta">If a participant has to withdraw: ${d.booking.cancellation.toLowerCase()}</p>
      </div>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Tell us what your project needs</h2>
      <p class="lede">The group, the objectives and the dates you have in mind. ${d.contact.replyTime}</p>
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
