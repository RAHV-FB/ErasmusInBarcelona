import { page, img, portrait, esc } from '../layout.js';
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

  const people = d.team.core.map((p) => `<li>
            ${portrait(p)}
            <span class="people__name">${p.name}</span>
            <span class="people__role">${p.role}</span>
          </li>`).join('\n          ');

  const body = `
  <section class="container hero">
    <div class="cols cols--lead">
      <div>
        <h1 class="hero__title">Bring your Erasmus+ week to Barcelona</h1>
        <p class="lede hero__lede">Staff training, student groups and tailored education programmes run by
          SpainBcn-Programs in Gràcia and Barceloneta.</p>
        <div class="btn-row">
          <a class="btn" href="/dates/">Find a week</a>
          <a class="btn btn--ghost" href="/contact/">Tell us your plan</a>
        </div>
        <p class="meta" style="margin-top:22px">In Barcelona since ${d.organisation.founded}. Small international groups.</p>
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
        <p>The ${d.dates.length} scheduled weeks, Monday to Friday. ${d.datesSource.note}</p>
      </div>
      <div class="board">
        ${board}
      </div>
      <div class="board__foot">
        <a class="link-strong" href="/dates/">All ${d.dates.length} scheduled weeks →</a>
        <span class="meta">Groups are small — confirm your week before booking travel.</span>
      </div>
    </div>
  </section>

  <figure class="media media--band">
    ${img(d.images.arcDeTriomf, { sizes: '100vw' })}
  </figure>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>What do you want to work on?</h2>
      </div>
      <div class="grid-cards grid-cards--three">
        ${areas}
      </div>
      <p style="margin-top:28px"><a class="link-strong" href="/join-a-course/">See the Barcelona courses →</a></p>
    </div>
  </section>

  <section class="section section--powder">
    <div class="container cols cols--lead">
      <div>
        <h2>A typical course week</h2>
        <p>Classes run Monday to Friday mornings. You choose 20 or 25 hours a week when you book.
          Two afternoons are given to the week’s cultural activities, and someone from the team goes with the group.</p>
        <p><a class="link-strong" href="/your-week/">See what a week looks like →</a></p>
        <p style="margin-top:24px">Bringing students instead? Programmes can be built around your group’s dates,
          size and subject, in English or Spanish. <a class="link-strong" href="/bring-a-group/">Plan a student
          group →</a></p>
      </div>
      <figure class="media media--photo">
        ${img(d.images.classGroup, { sizes: '(min-width: 860px) 48vw, 100vw' })}
      </figure>
    </div>
  </section>

  <section class="section">
    <div class="container cols cols--aside">
      <div>
        <h2>Barcelona, between sessions</h2>
        <p>The office is in Gràcia, five minutes on foot from the Sagrada Família, and classes also run at
          Barceloneta by the sea. Afternoons are yours unless the week’s cultural activity is on.</p>
        <p><a class="link-strong" href="/barcelona/">Practical information for your stay →</a></p>
      </div>
      <div class="hero-media hero-media--even">
        <figure class="media media--photo">${img(d.images.cafeTerrace, { sizes: '(min-width: 860px) 28vw, 50vw' })}</figure>
        <figure class="media media--photo">${img(d.images.barceloneta, { sizes: '(min-width: 860px) 28vw, 50vw' })}</figure>
      </div>
    </div>
  </section>

  <section class="section section--rule">
    <div class="container cols cols--split">
      <div>
        <h2>The people behind your week</h2>
        <p>Miriam coordinates the courses and Adriana handles registration and paperwork. The trainers
          teach in their own subject areas.</p>
        <p class="meta"><a href="${d.reviews.url}" rel="noopener">${d.reviews.rating}/5 from ${d.reviews.count} Google reviews ↗</a></p>
        <p><a class="link-strong" href="/about/">Meet the team →</a></p>
      </div>
      <div>
        <ul class="people people--three">
          ${people}
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--cobalt">
    <div class="container">
      <h2>Not sure which course fits your project?</h2>
      <p class="lede">Tell us your dates, subject and number of participants. ${d.contact.replyTime}</p>
      <div class="btn-row">
        <a class="btn" href="/contact/">Ask the Barcelona team</a>
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
