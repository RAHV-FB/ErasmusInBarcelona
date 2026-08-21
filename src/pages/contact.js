import { page, esc } from '../layout.js';
import * as d from '../data/site-data.js';

// A drawing of the real form's four questions, shown until forms.app is
// allowed to load. Shapes only: no inputs, nothing focusable, hidden from
// screen readers, so nobody can type into something that will be replaced.
function skeleton() {
  const line = (label, tall = false) => `<div class="skeleton__field">
        <span class="skeleton__label">${esc(label)}</span>
        <span class="skeleton__box${tall ? ' skeleton__box--tall' : ''}"></span>
      </div>`;
  const f = d.formsApp.fields;
  return `<div class="skeleton" aria-hidden="true" inert>
      ${line(f.name.label)}
      ${line(f.email.label)}
      ${line(f.interest.label)}
      ${line(f.message.label, true)}
      <span class="skeleton__button">Submit</span>
    </div>`;
}

export default function contact() {
  const body = `
  <section class="container hero hero--tight">
    <div style="max-width:52ch">
      <h1>Tell us what you're planning</h1>
      <p class="lede">A rough idea is enough. It helps to include your dates, the subject, the number
        of participants and your institution.</p>
      <p class="meta">A question is not a booking. ${d.contact.replyTime}</p>
    </div>
  </section>

  <section class="section section--tight" id="enquiry">
    <div class="container cols cols--aside">
      <div>
        <div class="summary-box" data-enquiry-summary hidden>
          <h2>Your group</h2>
          <dl></dl>
        </div>

        <h2>Write or call</h2>
        <ul class="facts">
          <li><span class="facts__term">Email</span><span class="facts__value"><a href="${d.contact.emailHref}" data-mail-prefill>${d.contact.email}</a></span></li>
          <li><span class="facts__term">Phone and WhatsApp</span><span class="facts__value"><a href="${d.contact.phoneHref}">${d.contact.phone}</a> · <a href="${d.contact.whatsapp}" rel="noopener">WhatsApp ↗</a></span></li>
          <li><span class="facts__term">Office</span><span class="facts__value">${d.contact.address}<br>${d.contact.officeNote}</span></li>
        </ul>

        <h2 style="margin-top:2em">What happens next</h2>
        <ol>
          <li>You write with the course or the group and the dates you have in mind.</li>
          <li>We confirm availability and the fee in writing.</li>
          <li>When you sign up and confirm, we send an acceptance letter if your institution needs one.</li>
          <li>Your ${d.schedule.certificate.toLowerCase()} is issued on the final day of the course.</li>
        </ol>
      </div>

      <div class="form-panel">
        <h2>Sign-up form</h2>
        <div class="form-slot">
          <div id="form-embed"></div>
          <div class="form-gate" data-form-gate
            data-form-id="${d.formsApp.id}"
            data-form-host="${d.formsApp.host}"
            data-form-answer-field="${d.formsApp.fields.interest.id}">
            ${skeleton()}
            <div class="form-gate__ask">
              <p>Provided by forms.app. Allow it to load here.</p>
              <button type="button" class="btn" data-privacy-set="true">Allow sign-up form</button>
              <p class="meta">
                <a href="${d.formsApp.privacy}" rel="noopener">forms.app privacy ↗</a> ·
                <a href="${d.formsApp.cookies}" rel="noopener">cookies ↗</a> ·
                <a href="${d.contact.emailHref}">use email instead</a>
              </p>
              <p class="form-gate__failed" data-form-failed hidden>The form couldn't be loaded. Email
                <a href="${d.contact.emailHref}">${d.contact.email}</a> or message us on
                <a href="${d.contact.whatsapp}" rel="noopener">WhatsApp ↗</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  return page({
    path: '/contact/',
    current: '',
    crumb: 'Contact',
    title: 'Contact the Barcelona Team | Erasmus in Barcelona',
    description: 'Email, phone and WhatsApp for SpainBcn-Programs in Barcelona, and the sign-up form for a course week or a group.',
  }, body);
}
