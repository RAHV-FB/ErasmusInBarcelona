import { page, img, portrait, esc } from '../layout.js';
import * as d from '../data/site-data.js';

export default function about() {
  const timeline = d.history.map((h) => `<li>
          <span class="timeline__year">${h.year}</span>
          <div>
            <h3>${esc(h.title)}</h3>
            <p>${esc(h.text)}</p>
          </div>
        </li>`).join('\n        ');

  const core = d.team.core.map((p) => `<li>
            ${portrait(p)}
            <span class="people__name">${p.name}</span>
            <span class="people__role">${p.role}</span>
          </li>`).join('\n          ');

  const trainers = d.team.trainers.map((p) => `<li>
            ${portrait(p)}
            <span><span class="people__name">${p.name}</span>
            <span class="people__role">${p.role}</span></span>
          </li>`).join('\n          ');

  const body = `
  <section class="container hero">
    <div class="cols cols--lead">
      <div>
        <h1>In Barcelona since 1997</h1>
        <p class="lede">${d.organisation.founders} started SpainBcn in ${d.organisation.founded},
          originally with Spanish-language programmes for international students. Today we run
          staff-training courses, student-group programmes and projects for schools and other
          education organisations.</p>
        <p>Erasmus in Barcelona is the Barcelona site of SpainBcn-Programs.
          <a href="${d.spainbcn.catalogue}" rel="noopener">Full SpainBcn catalogue ↗</a></p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.founders, { sizes: '(min-width: 860px) 45vw, 100vw', eager: true })}
        <figcaption>${d.organisation.founders}, 1997</figcaption>
      </figure>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Our history</h2>
      </div>
      <ul class="timeline">
        ${timeline}
      </ul>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--split">
      <div>
        <h2>How the courses run</h2>
        <p>Groups are small and international: most weeks bring together participants from several
          European countries. Trainers teach in their own subject areas.</p>
      </div>
      <div>
        <h2>Reviews</h2>
        <p><a class="link-strong" href="${d.reviews.url}" rel="noopener">${d.reviews.rating}/5 from
          ${d.reviews.count} Google reviews ↗</a></p>
      </div>
    </div>
  </section>

  <section class="section" id="team">
    <div class="container">
      <div class="section-head">
        <h2>The team</h2>
      </div>
      <ul class="people">
        ${core}
      </ul>

      <h3 style="margin-top:clamp(32px,4vw,48px)">Trainers</h3>
      <ul class="people people--list">
        ${trainers}
      </ul>
    </div>
  </section>

  <section class="section section--rule">
    <div class="container cols cols--split">
      <div>
        <h2>Organisation</h2>
        <ul class="facts">
          <li><span class="facts__term">Registered as</span><span class="facts__value">${d.organisation.legalName}</span></li>
          <li><span class="facts__term">NIF</span><span class="facts__value">${d.organisation.nif}</span></li>
          <li><span class="facts__term">Erasmus+ OID</span><span class="facts__value">${d.organisation.oid}</span></li>
          <li><span class="facts__term">Office</span><span class="facts__value">${d.contact.address}</span></li>
        </ul>
        <p class="meta">The office address does not change. Course locations do —
          <a href="/barcelona/">see where classes run →</a></p>
      </div>
      <div>
        <h2>Elsewhere in Spain</h2>
        <p>SpainBcn also runs course weeks in Málaga, Mallorca, Gran Canaria, Tenerife and Tarragona.</p>
        <p><a class="link-strong" href="${d.spainbcn.locations}" rel="noopener">See all locations ↗</a></p>
      </div>
    </div>
  </section>`;

  return page({
    path: '/about/',
    current: 'about',
    crumb: 'About',
    title: 'About SpainBcn-Programs in Barcelona | Erasmus in Barcelona',
    description: 'SpainBcn-Programs has taught in Barcelona since 1997. The team, the trainers, the registered company and the Erasmus+ OID.',
  }, body);
}
