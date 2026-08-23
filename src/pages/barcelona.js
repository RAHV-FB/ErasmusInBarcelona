import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';
import * as b from '../data/barcelona-practical.js';

export default function barcelona() {
  const airportRows = b.airport.options.map((o) => `<tr>
            <th scope="row">${esc(o.name)}<span class="cell-note">${esc(o.bestFor)}</span></th>
            <td data-label="Time">${esc(o.time)}</td>
            <td data-label="Fare">${esc(o.fare)}<span class="cell-note">${esc(o.fareNote)}</span></td>
            <td data-label="Detail">${esc(o.detail)}</td>
          </tr>`).join('\n          ');

  const ticketRows = b.tickets.map((t) => `<tr>
            <th scope="row">${esc(t.name)}</th>
            <td data-label="Price">${esc(t.price)}</td>
            <td data-label="Covers">${esc(t.what)}</td>
            <td data-label="Airport metro">${t.airport ? 'Yes' : 'No'}</td>
          </tr>`).join('\n          ');

  const stayRows = b.staying.map((s) => `<tr>
            <th scope="row">${esc(s.area)}<span class="cell-note">${esc(s.note)}</span></th>
            <td data-label="To Gràcia">${esc(s.forOffice)}</td>
            <td data-label="To Barceloneta">${esc(s.forSea)}</td>
          </tr>`).join('\n          ');

  const afternoons = b.afternoons.map((a) => `<li>
            <span class="facts__term">${esc(a.time)}</span>
            <span class="facts__value">${esc(a.what)}</span>
          </li>`).join('\n          ');

  const lines = (s) => s.lines.join(', ');

  const body = `
  <section class="container hero hero--tight">
    <div style="max-width:56ch">
      <h1>Planning your course in Barcelona</h1>
      <p class="lede">Where to stay before your course location is confirmed, how to get from the airport
        to class, and which transport ticket is worth buying for a five-day week.</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="section-head">
        <h2>Where classes run</h2>
        <p>${d.contact.venueNote}</p>
      </div>
      <div class="cols cols--split">
        <div>
          <h3>Gràcia</h3>
          <p>Around the office at ${d.contact.address}, five minutes on foot from the Sagrada Família.</p>
          <ul class="facts">
            <li><span class="facts__term">${b.stations.sagradaFamilia.name}</span><span class="facts__value">${lines(b.stations.sagradaFamilia)} · about 5 minutes' walk</span></li>
            <li><span class="facts__term">${b.stations.verdaguer.name}</span><span class="facts__value">${lines(b.stations.verdaguer)} · about 10 minutes' walk</span></li>
          </ul>
          <p class="meta">Wherever your course runs, the office stays here.</p>
        </div>
        <div>
          <h3>Barceloneta</h3>
          <p>By the sea, a few kilometres from the office. The neighbourhood is served by
            ${b.stations.barceloneta.name} on ${lines(b.stations.barceloneta)} — the same line that runs
            back up to Verdaguer.</p>
          <p class="meta">We send the address of your course location when you sign up.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container">
      <div class="section-head">
        <h2>Where to stay</h2>
        <p>${b.bookingAdvice}</p>
      </div>
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr><th scope="col">Area</th><th scope="col">To Gràcia</th><th scope="col">To Barceloneta</th></tr>
          </thead>
          <tbody>
          ${stayRows}
          </tbody>
        </table>
      </div>
      <p class="meta" style="margin-top:16px">Metro times, door to door, at ordinary times of day. We
        don't book accommodation.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>From the airport</h2>
        <p>${b.airport.name} is ${b.airport.distanceKm} km south of the city, with terminals
          ${b.airport.terminals}. Which route suits you depends on where you're staying.</p>
      </div>
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr><th scope="col">Option</th><th scope="col">Time</th><th scope="col">Fare</th><th scope="col">How it works</th></tr>
          </thead>
          <tbody>
          ${airportRows}
          </tbody>
        </table>
      </div>
      <p class="callout"><b>Before you buy a ticket at the airport:</b> ${b.airportTicketRule}</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="section-head">
        <h2>Which ticket to buy</h2>
        <p>If you're making roughly two public-transport trips a day, a T-casual will usually cover the
          basic commute. If you expect to use transport more often, compare it with Hola Barcelona.</p>
      </div>
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr><th scope="col">Ticket</th><th scope="col">Price</th><th scope="col">What it covers</th><th scope="col">Airport metro</th></tr>
          </thead>
          <tbody>
          ${ticketRows}
          </tbody>
        </table>
      </div>
      <div class="cols cols--split" style="margin-top:28px">
        <div>
          <h3>Getting to and from the airport</h3>
          <p>The R2 Nord train is covered by an integrated ticket, so a T-casual journey works. The L9
            airport metro is not: there you need the ${esc(b.AIRPORT_FARE)} airport ticket, or a pass that includes the
            airport stations.</p>
        </div>
        <div>
          <h3>If you'll be out most evenings</h3>
          <p>The Hola Barcelona Travel Card is unlimited for two to five days and includes the airport
            metro both ways.</p>
        </div>
      </div>
      <p class="meta" style="margin-top:18px">Fares checked ${b.checked} and they do change.
        <a href="${b.sources.tmbFares}" rel="noopener">Current TMB fares ↗</a></p>
    </div>
  </section>

  <figure class="media media--band">
    ${img(d.images.cathedral, { sizes: '100vw' })}
    <figcaption class="container">Plaça de la Seu</figcaption>
  </figure>

  <section class="section">
    <div class="container cols cols--split">
      <div>
        <h2>Lunch and the day around class</h2>
        <p>${b.lunch}</p>
        <h2 style="margin-top:1.6em">Language</h2>
        <p>${b.language}</p>
      </div>
      <div>
        <h2>Free afternoons</h2>
        <p>Two afternoons are the week's cultural activities. The rest are yours.</p>
        <ul class="facts">
          ${afternoons}
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container cols cols--split">
      <div>
        <h2>Access</h2>
        <p>${b.accessibility}</p>
      </div>
      <div>
        <h2>Elsewhere in Spain</h2>
        <p>This page is Barcelona only. SpainBcn also runs weeks in Málaga, Mallorca, Gran Canaria,
          Tenerife and Tarragona.</p>
        <p><a class="link-strong" href="${d.spainbcn.locations}" rel="noopener">See all locations ↗</a></p>
      </div>
    </div>
  </section>

  <section class="section section--rule">
    <div class="container">
      <p><a class="link-strong" href="/dates/">See Barcelona course dates →</a></p>
    </div>
  </section>`;

  return page({
    path: '/barcelona/',
    current: 'barcelona',
    crumb: 'Barcelona',
    title: 'Planning Your Staff Training Week in Barcelona | SpainBcn-Programs',
    description: 'Where to stay, how to get from Barcelona airport to class, which transport ticket to buy for a five-day course, and where the two course venues are.',
  }, body);
}
