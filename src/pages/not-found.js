import { page } from '../layout.js';
import * as d from '../data/site-data.js';

export default function notFound() {
  const body = `
  <section class="container hero">
    <div style="max-width:52ch">
      <h1>This route doesn't stop here</h1>
      <p class="lede">The page you asked for does not exist. These do:</p>
      <ul>
        <li><a href="/join-a-course/">Courses for teachers and education staff</a></li>
        <li><a href="/bring-a-group/">Programmes for student groups</a></li>
        <li><a href="/dates/">Course dates in Barcelona</a></li>
        <li><a href="/contact/">Contact the Barcelona team</a></li>
      </ul>
      <p class="meta">Or write to <a href="${d.contact.emailHref}">${d.contact.email}</a>.</p>
    </div>
  </section>`;

  return page({
    path: '/404.html',
    current: '',
    noindex: true,
    title: 'Page not found | Erasmus in Barcelona',
    description: 'The page you asked for does not exist on this site.',
  }, body);
}
