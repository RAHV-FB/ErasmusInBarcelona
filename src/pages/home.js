import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

const ROUTES = [
  { href: '/join-a-course/', label: 'I’m joining a course', note: 'Scheduled weeks for teachers and education staff.' },
  { href: '/bring-a-group/', label: 'I’m bringing students', note: 'Programmes built around a school or VET group.' },
  { href: '/plan-a-mobility/', label: 'I’m organising for my institution', note: 'Coordinators arranging staff or student mobility.' },
];

export default function home() {
  const soon = d.dates.slice(0, 6);

  const routes = ROUTES.map((r, i) => `<li>
          <a href="${r.href}">
            <span class="routes__index">0${i + 1}</span>
            <span class="routes__label">${r.label}
              <span class="routes__note">${r.note}</span>
            </span>
            <span aria-hidden="true">→</span>
          </a>
        </li>`).join('\n        ');

  const board = soon.map((w) => `<a class="board__row" href="/dates/">
          <span class="board__when">${w.label} <span class="board__month">${w.month}</span></span>
          <span class="board__course">${esc(w.course)}</span>
        </a>`).join('\n        ');

  const areas = d.courseAreas.map((a) => `<div>
          <h3><a href="/join-a-course/#${a.id}">${esc(a.label)}</a></h3>
          <p>${esc(a.short)}</p>
        </div>`).join('\n        ');

  const body = `
  <section class="container hero">
    <div class="cols cols--lead">
      <div>
        <h1 class="hero__title">Erasmus+ courses and programmes in Barcelona</h1>
        <p class="lede hero__lede">Staff training, student groups and tailored programmes run by
          SpainBcn-Programs, in Barcelona since ${d.organisation.founded}.</p>
        <div class="btn-row">
          <a class="btn" href="/dates/">See Barcelona dates</a>
          <a class="btn btn--ghost" href="/join-a-course/">Find a course</a>
        </div>
      </div>
      <figure class="media media--photo">
        ${img(d.images.certificates, { sizes: '(min-width: 860px) 48vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <p class="eyebrow">Start here</p>
      <ul class="routes">
        ${routes}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Upcoming weeks in Barcelona</h2>
        <p>${d.dates.length} weeks are in the current calendar. Any course can also be requested for a
          week that is not listed.</p>
      </div>
      <div class="board">
        ${board}
      </div>
      <div class="board__foot">
        <a class="link-strong" href="/dates/">All ${d.dates.length} scheduled weeks →</a>
        <span class="meta">Confirm your place before booking travel.</span>
      </div>
    </div>
  </section>

  <figure class="media media--band">
    ${img(d.images.arcDeTriomf, { sizes: '100vw' })}
  </figure>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Course areas</h2>
      </div>
      <div class="grid-cards grid-cards--three">
        ${areas}
      </div>
      <p style="margin-top:28px"><a class="link-strong" href="/join-a-course/">See courses in Barcelona →</a></p>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--lead">
      <div>
        <h2>A typical course week</h2>
        <p>Class every morning, Monday to Friday, at 20 or 25 hours for the week. Two afternoons are
          the week’s cultural activities; the rest are free.</p>
        <p><a class="link-strong" href="/your-week/">What a week involves →</a></p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.classGroup, { sizes: '(min-width: 860px) 48vw, 100vw' })}
      </figure>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--aside">
      <div>
        <h2>Barcelona</h2>
        <p>${d.contact.venueNote}</p>
        <p><a class="link-strong" href="/barcelona/">Plan your stay in Barcelona →</a></p>
      </div>
      <div class="hero-media hero-media--even">
        <figure class="media media--photo">${img(d.images.cafeTerrace, { sizes: '(min-width: 860px) 28vw, 50vw' })}</figure>
        <figure class="media media--photo">${img(d.images.barceloneta, { sizes: '(min-width: 860px) 28vw, 50vw' })}</figure>
      </div>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Tell us what you're planning</h2>
      <p class="lede">Your possible dates, the subject and the number of participants.
        ${d.contact.replyTime}</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Contact the Barcelona team</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/',
    current: '',
    title: 'Erasmus+ Courses & Mobility in Barcelona | SpainBcn-Programs',
    description: 'Erasmus+ staff training, student group programmes and tailored education mobility in Barcelona, run by SpainBcn-Programs since 1997.',
  }, body);
}
