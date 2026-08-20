import { page, img } from '../layout.js';
import * as d from '../data/site-data.js';

export default function barcelona() {
  const body = `
  <section class="container hero">
    <div style="max-width:52ch">
      <h1>Planning your course in Barcelona</h1>
      <p class="lede">Where the courses run, how to reach them, and what you need to arrange yourself.</p>
    </div>
  </section>

  <figure class="media media--band">
    ${img(d.images.barceloneta, { sizes: '100vw', eager: true })}
    <figcaption class="container">The Barceloneta seafront, a few streets from the seaside classrooms</figcaption>
  </figure>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Where courses run</h2>
        <p>${d.contact.venueNote}</p>
      </div>
      <ul class="facts">
        <li><span class="facts__term">Office and course rooms</span><span class="facts__value">${d.contact.address}.
          ${d.contact.officeNote}</span></li>
        <li><span class="facts__term">Barceloneta</span><span class="facts__value">Classrooms by the sea, used for
          part of the programme depending on the week.</span></li>
        <li><span class="facts__term">Access</span><span class="facts__value">Tell us what you need and we will
          confirm what the venue for your week can accommodate.</span></li>
      </ul>
      <figure class="media" style="margin-top:28px">
        ${img(d.images.facilities, { sizes: '(min-width: 860px) 60vw, 100vw' })}
        <figcaption>The school: a classroom, the hallway, the terrace, and a group at work</figcaption>
      </figure>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>Getting here</h2>
        <p>Fly into Barcelona–El Prat (BCN). An airport bus, a train and taxis all run from the terminals into the
          centre, and the office is a short metro ride from there.</p>
        <p>Around the city, the metro is the simplest way to reach both venues: L5 Sagrada Família or L4/L5
          Verdaguer for the office.</p>
      </div>
      <div>
        <h2>Tickets</h2>
        <p>Barcelona uses the T-mobilitat ticketing system, and the conditions differ between city journeys and the
          airport. Check the current fares for the journeys you expect to make before you buy.</p>
        <p class="meta"><a href="https://www.tmb.cat/en/barcelona-fares-metro-bus" rel="noopener">TMB fares and
          tickets ↗</a></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>Before you travel</h2>
        <ul>
          <li>You book your own accommodation; it is not part of the course fee.</li>
          <li>Check which venue your week uses before you book somewhere to stay.</li>
          <li>Summers are hot and winters are mild — check the forecast before you pack.</li>
        </ul>
      </div>
      <div>
        <h2>Language</h2>
        <p>Catalan and Spanish are both official in Barcelona. Courses are taught in English, except the Spanish
          programmes, which are taught in Spanish.</p>
        <h2>Free afternoons</h2>
        <p>Two afternoons are the week's cultural activities. The rest are yours, and the team is happy to point
          you at something near the venue.</p>
      </div>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Still deciding on a week?</h2>
      <p class="lede">The scheduled Barcelona weeks are on the dates page, and other dates open on request.</p>
      <div class="btn-row">
        <a class="btn" href="/dates/">See the dates</a>
        <a class="btn btn--ghost" href="/your-week/">What a week looks like</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/barcelona/',
    current: 'barcelona',
    crumb: 'Barcelona',
    title: 'Planning Your Erasmus+ Course in Barcelona | SpainBcn-Programs',
    description: 'Where the Barcelona courses run, how to reach the venues, tickets, accommodation and what to arrange before you travel.',
  }, body);
}
