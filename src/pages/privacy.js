import { page } from '../layout.js';
import * as d from '../data/site-data.js';
import { analytics } from '../data/analytics.js';

// This page describes what the site actually does. Whenever any of it
// changes, this page changes in the same commit. The forms.app form's own
// configuration — no CAPTCHA, no analytics integrations — is the one part
// that lives outside this repository, so re-check it there.
export default function privacy() {
  const body = `
  <section class="container hero hero--tight">
    <div style="max-width:52ch">
      <h1>Privacy</h1>
      <p class="lede">What this website does with information about you.</p>
      <p class="meta">Last reviewed 20 August 2026.</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container prose">
      <h2>Who we are</h2>
      <p>${d.organisation.legalName} (NIF ${d.organisation.nif}), trading as SpainBcn-Programs and
        publishing this site as Erasmus in Barcelona, is the data controller.</p>
      <ul>
        <li>${d.contact.address}, Spain</li>
        <li><a href="${d.contact.emailHref}">${d.contact.email}</a></li>
        <li><a href="${d.contact.phoneHref}">${d.contact.phone}</a></li>
      </ul>

      <h2>When you open this website</h2>
      <p>The site is hosted by ${d.hosting.name}, a Spanish company based in ${d.hosting.place}. A
        line is written to an access log each time a file is requested. It normally contains your IP
        address, the date and time, the file requested, the response code, how much data was sent,
        the page you came from and the browser and operating system your request announces. We use
        those logs to keep the site running and to deal with abuse of the server. Legal basis: our
        legitimate interest in a website that stays up and is not attacked, Article 6(1)(f) GDPR.
        ${d.hosting.name} handles them on our instructions, as our processor.</p>
      <p class="meta"><a href="${d.hosting.privacy}" rel="noopener">${d.hosting.name} data
        protection ↗</a></p>
      <p>The site stores one thing on your device: your answer to the privacy choice below, under the
        name <code>eib-privacy-v1</code> in your browser's local storage. It records whether you
        allowed the sign-up form and when you answered. It holds no identifier and never leaves your
        browser. Keeping it is strictly necessary to remember your answer, so it needs no consent of
        its own.</p>

      <h2>Website analytics</h2>
      <p>We use Umami to understand how people use this website. It records the pages visited, the
        referring page, browser, operating system, device, screen size, language and approximate
        location. Umami does not use cookies, and we do not use it to identify visitors or follow
        them to other websites.</p>
      <p>The analytics system uses the IP address of the request to derive an approximate location
        and an anonymous session, but the IP address itself is not stored in the analytics data. We
        have configured the tracker not to record URL query strings or fragments, so the answers the
        group planner carries to the contact page never reach it. We do not send names, email
        addresses, form contents or planner answers to Umami, and we do not use its Distinct ID or
        session-replay features. Visitors whose browser asks not to be tracked are not counted.</p>
      <p>Analytics is provided by ${analytics.provider}, operated by ${analytics.operator}, on its
        European region. The tracker is served from
        <code>${new URL(analytics.scriptUrl).host}</code> and reports to
        <code>${new URL(analytics.collector).host}</code>, so the analytics data is handled in the
        European Union. Legal basis: our legitimate interest in understanding general website use
        and improving the service, Article 6(1)(f) GDPR.</p>

      <h2>The sign-up form</h2>
      <p>The sign-up form on the contact page is provided by forms.app. We do not connect to
        forms.app when you open the website: the form is loaded only after you choose to allow it,
        and your answer is remembered so you are not asked again.</p>
      <p>Once it loads, forms.app receives the technical information needed to serve the form and may
        set its own cookies in your browser; its current cookie policy states that forms created by
        its members use cookies. It may process technical information such as your IP address,
        browser, operating system, device information and the time and interactions on the form, as
        well as everything you enter into it. If you arrive from the group planner, the answers you
        selected there are passed into the field that asks what you are interested in; nothing else
        is passed. forms.app handles form data on our instructions, as our processor, and sends us
        the completed answers by email.</p>
      <p>Legal basis for loading it: your consent, Article 6(1)(a) GDPR, together with Article 22.2
        LSSI-CE for what it then stores on your device. Legal basis for handling what you send:
        taking steps at your request before entering into a contract, Article 6(1)(b). You never have
        to use it — our email address, telephone number and WhatsApp are on the contact page in plain
        text.</p>
      <p class="meta"><a href="${d.formsApp.privacy}" rel="noopener">forms.app privacy policy ↗</a> ·
        <a href="${d.formsApp.cookies}" rel="noopener">forms.app cookie policy ↗</a></p>

      <h2>When you contact us</h2>
      <p>If you email, call or send a WhatsApp message, we hold what you send: your name, contact
        details, institution and whatever you tell us about the course or group you are planning. We
        use it to answer you and to organise the course. Legal basis: steps taken at your request
        before a contract and performance of it, Article 6(1)(b) GDPR; for a general question, our
        legitimate interest in answering it, Article 6(1)(f).</p>

      <h2>Course registration and administration</h2>
      <p>Registrations, invoices and the documents your institution needs are kept in our own email
        and files, reachable by the small number of people at SpainBcn who organise courses and issue
        invoices, and by our accountants for invoicing and tax filings.</p>

      <h2>Photographs</h2>
      <p>The photographs on this site are our own, taken during courses and programmes and published
        with the agreement of the people in them. If you are in one and would rather not be, write to
        <a href="${d.contact.emailHref}">${d.contact.email}</a> and we will take it down.</p>

      <h2>Who else sees your information</h2>
      <ul>
        <li>${d.hosting.name}, for the server logs described above.</li>
        <li>${analytics.operator}, on its European region, for the analytics described above.</li>
        <li>forms.app, if you choose to load and send the form.</li>
        <li>Our accountants, for invoicing and tax filings.</li>
      </ul>
      <p>We do not sell your information, we do not share it for advertising, and we do not publish a
        list of participants.</p>

      <h2>Transfers outside the European Economic Area</h2>
      <p>Hosting is in ${d.hosting.country} and analytics is on ${analytics.provider}'s European
        region, so neither leaves the EU in normal use. forms.app is outside the EEA; where a
        provider processes data outside the EEA it does so under the European Commission's Standard
        Contractual Clauses, Article 46(2)(c) GDPR, incorporated in its data processing terms. Ask
        us and we will send you the terms that apply to our accounts.</p>

      <h2>How long we keep things</h2>
      <ul>
        <li>Enquiries that do not lead to a course: up to two years.</li>
        <li>Registrations, invoices and grant documents: as long as Spanish accounting and tax law
          requires.</li>
        <li>Server access logs: the period set in ${d.hosting.name}'s service terms.</li>
        <li>Analytics: aggregate counts, kept for as long as the analytics account is open.</li>
      </ul>

      <h2>Your rights</h2>
      <p>You can ask us for a copy of what we hold about you, to correct it, to delete it, to
        restrict or object to how we use it, or to receive it in a portable form. Where we rely on
        your consent you can withdraw it at any time, including through
        <button type="button" class="linkish" data-privacy-open>privacy choices</button>, without
        affecting what was done before. Write to
        <a href="${d.contact.emailHref}">${d.contact.email}</a> and we will answer within one month.</p>
      <p>You can also complain to the Spanish data protection authority, the Agencia Española de
        Protección de Datos (<a href="https://www.aepd.es" rel="noopener">aepd.es ↗</a>).</p>

      <h2>Student groups and minors</h2>
      <p>Student group programmes are arranged with the school or institution, which is responsible
        for consent and for the participants in its care. We do not collect information directly from
        students through this website.</p>

      <h2>Changes</h2>
      <p>If what the site does changes, this page changes with it, and the review date changes too.</p>
    </div>
  </section>`;

  return page({
    path: '/privacy/',
    current: '',
    crumb: 'Privacy',
    title: 'Privacy | Erasmus in Barcelona',
    description: 'How this site handles your information: cookie-free Umami analytics, a sign-up form from forms.app that loads only with your permission, server logs, enquiries and your rights.',
  }, body);
}
