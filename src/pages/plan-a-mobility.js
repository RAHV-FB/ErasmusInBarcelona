import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

export default function planAMobility() {
  const documents = d.documents.map((doc) =>
    `<li><span class="facts__term">${esc(doc.name)}</span><span class="facts__value">${esc(doc.note)}</span></li>`).join('\n        ');

  const formats = d.projectFormats.map((f) => `<li>${esc(f)}</li>`).join('\n          ');

  const body = `
  <section class="container hero hero--tight">
    <div class="cols cols--lead">
      <div>
        <h1>Institutional programmes in Barcelona</h1>
        <p class="lede">Private course weeks, job shadowing and educational visits for schools and other
          education organisations, with the documents your Erasmus+ application needs.</p>
        <p class="meta">Sending individual staff to a scheduled week instead?
          <a href="/join-a-course/">See the courses <span aria-hidden="true">→</span></a></p>
        <div class="btn-row">
          <a class="btn" href="/contact/">Tell us about the project</a>
          <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
        </div>
      </div>
      <figure class="media media--photo">
        ${img(d.images.staffOffice, { sizes: '(min-width: 860px) 45vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="states">
        <div class="state">
          <p class="eyebrow">You already have funding</p>
          <ul class="facts">
            <li><span class="facts__term">Programme</span><span class="facts__value">We build the week around the objectives, dates and group in your project.</span></li>
            <li><span class="facts__term">Receiving partner</span><span class="facts__value">We act as the receiving partner in Spain.</span></li>
            <li><span class="facts__term">Documents</span><span class="facts__value">Invitation letter, acceptance letters, certificates and the invoice for your grant records.</span></li>
          </ul>
        </div>
        <div class="state">
          <p class="eyebrow">You are preparing the project</p>
          <ul class="facts">
            <li><span class="facts__term">Course descriptions</span><span class="facts__value">Descriptions and programmes to attach to the application.</span></li>
            <li><span class="facts__term">Pre-registration</span><span class="facts__value">Pre-registration confirmation for KA1 applications.</span></li>
            <li><span class="facts__term">Dates and fees</span><span class="facts__value">We confirm the dates and fees in writing before you submit your application.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container">
      <div class="section-head">
        <h2>Documents we provide</h2>
      </div>
      <ul class="facts">
        ${documents}
      </ul>
    </div>
  </section>

  <figure class="media media--band">
    ${img(d.images.barcelonaClassroom, { sizes: '100vw' })}
  </figure>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>Programme formats</h2>
        <ul>
          ${formats}
        </ul>
        <p class="meta">These can be combined: training in the mornings and job shadowing later in the
          week, for example.</p>
      </div>
      <div>
        <h2>Fees and invoicing</h2>
        <p>Course fees are per person: in Barcelona,
          ${d.pricing.currency}${d.pricing.barcelona.hours20} for 20 hours and
          ${d.pricing.currency}${d.pricing.barcelona.hours25} for 25. ${esc(d.pricing.groups)}</p>
        <p>${esc(d.booking.contractWith)} ${d.booking.payment}</p>
        <p class="meta">${esc(d.booking.vatLine)} ${d.pricing.travelKa1}</p>
        <h2 style="margin-top:1.6em">Where it runs</h2>
        <p>Barcelona, in the Gràcia and Barceloneta areas. A project can also run at SpainBcn's
          ${d.destinations.length} other Spanish destinations —
          <a href="${d.spainbcn.locations}" rel="noopener">see locations <span aria-hidden="true">↗</span></a>.</p>
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
        <p>If possible, contact us before you submit, so the course description, the pre-registration
          confirmation and the dates and fees are ready in time for your application.</p>
        <h2 style="margin-top:1.6em">If a participant withdraws</h2>
        <p>${d.booking.cancellation}</p>
      </div>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Where to start</h2>
      <p class="lede">Send us the group, the objectives and the dates you have in mind.</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Get in touch</a>
        <a class="btn btn--ghost" href="${d.spainbcn.projects}" rel="noopener">How projects work on SpainBcn <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/plan-a-mobility/',
    current: '',
    crumb: 'Institutional programmes',
    title: 'Erasmus+ Institutional Programmes in Barcelona | SpainBcn-Programs',
    description: 'For Erasmus+ coordinators: private course weeks, job shadowing and educational visits in Barcelona, with the documents, quotes and registration details your grant administration needs.',
  }, body);
}
