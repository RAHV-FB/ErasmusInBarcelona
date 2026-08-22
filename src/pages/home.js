import { page, img, esc } from '../layout.js';
import * as d from '../data/site-data.js';

const ROUTES = [
  { href: '/join-a-course/', label: 'Staff training courses',
    note: 'Scheduled weeks in Barcelona. Join one on your own or with colleagues.' },
  { href: '/bring-a-group/', label: 'Student groups',
    note: 'Programmes for secondary, high-school and VET groups, arranged with the school.' },
  { href: '/plan-a-mobility/', label: 'Institutional programmes',
    note: 'Private course weeks, job shadowing and educational visits arranged for your institution.' },
];

export default function home() {
  const soon = d.weeks.slice(0, 4);

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
          <span class="board__course">${w.courses.map((c) => esc(c.course)).join(' · ')}</span>
        </a>`).join('\n        ');

  const areas = d.courseAreas.map((a) => `<div>
          <h3><a href="/join-a-course/#${a.id}">${esc(a.label)}</a></h3>
          <p>${esc(a.short)}</p>
        </div>`).join('\n        ');

  const body = `
  <section class="container hero">
    <div class="cols cols--lead">
      <div>
        <h1 class="hero__title">Staff training courses in Barcelona</h1>
        <p class="lede hero__lede">One-week courses for teachers and other people working in
          education, with small international groups throughout the year.</p>
        <div class="btn-row">
          <a class="btn" href="/dates/">See course dates</a>
          <a class="btn btn--ghost" href="/join-a-course/">Explore courses</a>
        </div>
        <p class="meta" style="margin-top:20px">Run by SpainBcn-Programs, in Barcelona since
          ${d.organisation.founded}.</p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.certificates, { sizes: '(min-width: 860px) 48vw, 100vw', eager: true })}
      </figure>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <ul class="routes">
        ${routes}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Upcoming weeks in Barcelona</h2>
      </div>
      <div class="board">
        ${board}
      </div>
      <div class="board__foot">
        <a class="link-strong" href="/dates/">All ${d.weeks.length} weeks →</a>
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
        <h2>A typical staff training week</h2>
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
      <h2>Questions about a course or a group?</h2>
      <div class="btn-row">
        <a class="btn" href="/contact/">Get in touch</a>
        <a class="btn btn--ghost" href="${d.contact.emailHref}">${d.contact.email}</a>
      </div>
    </div>
  </section>`;

  return page({
    path: '/',
    current: '',
    title: 'Erasmus+ Staff Training in Barcelona | SpainBcn-Programs',
    description: 'Erasmus+ KA1 staff training in Barcelona for teachers and education staff from schools, universities, VET and adult education. Erasmus+ funding is not required. Student groups and institutional programmes arranged separately.',
  }, body);
}
