import { page } from '../layout.js';
import * as d from '../data/site-data.js';

export default function contact() {
  const body = `
  <section class="container hero hero--tight">
    <div style="max-width:52ch">
      <h1>Tell us what you're planning</h1>
      <p class="lede">Include your possible dates, the subject and the number of participants.
        ${d.contact.replyTime}</p>
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
        <ol class="steps">
          <li>We check the course and the week.</li>
          <li>We confirm availability, the level and the fee in writing.</li>
          <li>If you register, we send the confirmation and the documents your project needs.</li>
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
            <div class="form-gate__behind" aria-hidden="true" inert>${'<span></span>'.repeat(9)}</div>
            <div class="form-gate__ask">
              <p>Provided by forms.app. Allow it to load here.</p>
              <button type="button" class="btn" data-privacy-set="true">Allow sign-up form</button>
              <p class="meta"><a href="/privacy/">Privacy</a></p>
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
    description: 'Email, phone and WhatsApp for SpainBcn-Programs in Barcelona, and the sign-up form for a staff training week, a student group or an institutional programme.',
  }, body);
}
