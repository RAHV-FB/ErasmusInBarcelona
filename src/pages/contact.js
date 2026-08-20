import { page } from '../layout.js';
import * as d from '../data/site-data.js';

export default function contact() {
  const body = `
  <section class="container hero">
    <div style="max-width:52ch">
      <h1>Tell us what you're planning</h1>
      <p class="lede">A rough idea is enough. It helps if you include your possible dates, the subject, the number
        of participants and your institution.</p>
      <p class="meta">Asking is not a booking. ${d.contact.replyTime}</p>
    </div>
  </section>

  <section class="section section--tight" id="enquiry">
    <div class="container">
      <div class="summary-box" data-enquiry-summary hidden>
        <h2 style="font-size:1.05rem">What you picked</h2>
        <dl></dl>
        <p class="meta" style="margin-top:12px">Include this in your message — the email link below already has it.</p>
      </div>

      <div class="cols cols--split" style="margin-top:clamp(24px,3vw,36px)">
        <div>
          <h2>Write or call</h2>
          <ul class="facts">
            <li><span class="facts__term">Email</span><span class="facts__value"><a href="${d.contact.emailHref}" data-mail-prefill>${d.contact.email}</a></span></li>
            <li><span class="facts__term">Phone and WhatsApp</span><span class="facts__value"><a href="${d.contact.phoneHref}">${d.contact.phone}</a> · <a href="${d.contact.whatsapp}" rel="noopener">WhatsApp ↗</a></span></li>
            <li><span class="facts__term">Office</span><span class="facts__value">${d.contact.address}<br>${d.contact.officeNote}</span></li>
          </ul>
          <p class="meta" style="margin-top:18px">${d.contact.venueNote}</p>
        </div>

        <div>
          <h2>Or use the sign-up form</h2>
          <div class="embed-note">
            <p>The form is hosted by forms.app, so we do not load it until you ask. What you send goes through
              forms.app and reaches us by email.</p>
            <p class="meta">Loading it tells that company your IP address and lets it set its own cookies in your
              browser. You can skip it and write to us instead — the same message reaches the same person.
              <a href="/privacy/">Privacy</a>.</p>
            <button type="button" class="btn" data-load-form
              data-form-id="${d.spainbcn.formsAppId}" data-form-host="${d.spainbcn.formsAppHost}">Load the form</button>
            <div id="form-embed"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>What happens next</h2>
        <ol>
          <li>You write with the course or the group and the dates you have in mind.</li>
          <li>We confirm availability and the fee in writing.</li>
          <li>When you sign up and confirm, we send an acceptance letter if your institution needs one.</li>
          <li>Your ${d.schedule.certificate.toLowerCase()} is issued on the final day of the course.</li>
        </ol>
      </div>
      <div>
        <h2>Bringing a group or running a project?</h2>
        <p>The group and mobility pages cover what we can organise and the documents we provide.</p>
        <p><a class="link-strong" href="/bring-a-group/">Student groups →</a></p>
        <p><a class="link-strong" href="/plan-a-mobility/">Institutional mobility →</a></p>
      </div>
    </div>
  </section>`;

  return page({
    path: '/contact/',
    current: '',
    crumb: 'Contact',
    title: 'Contact the Barcelona Team | Erasmus in Barcelona',
    description: 'Email, phone and WhatsApp for SpainBcn-Programs in Barcelona, plus the sign-up form. Tell us your dates, subject and group and we reply within two working days.',
  }, body);
}
