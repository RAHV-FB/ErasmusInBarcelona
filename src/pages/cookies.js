import { page } from '../layout.js';
import * as d from '../data/site-data.js';

export default function cookies() {
  const body = `
  <section class="container hero">
    <div style="max-width:52ch">
      <h1>Cookies</h1>
      <p class="lede">This site sets no cookies and stores nothing on your device.</p>
      <p class="meta">Last reviewed 20 August 2026.</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container prose">
      <p>There is no consent banner on this site, because there is nothing to consent to. No analytics, no
        advertising, no tag manager, no tracking pixels, and no cookies of our own. Images, stylesheets and
        scripts are all served from this site, so opening a page does not tell another company that you did.</p>

      <h2>The one exception</h2>
      <p>The contact page offers a sign-up form run by forms.app. It is not loaded until you press the button
        asking for it. If you do, forms.app can set its own cookies in your browser — those cookies are theirs, not
        ours. We do not read them and we cannot delete them for you, but clearing site data in your browser
        removes them.</p>
      <p>You can use the site, including everything on the contact page, without ever loading the form: our email
        address and telephone number are written in plain text there.</p>

      <h2>Links to other companies</h2>
      <p>Following a link to SpainBcn.com, to our social accounts, to Google reviews or to public transport
        information takes you to a site with its own cookies and its own policy. Nothing is sent to them while you
        stay here.</p>

      <h2>Questions</h2>
      <p>The full detail is in our <a href="/privacy/">privacy policy</a>. Anything else, write to
        <a href="${d.contact.emailHref}">${d.contact.email}</a>.</p>
    </div>
  </section>`;

  return page({
    path: '/cookies/',
    current: '',
    crumb: 'Cookies',
    title: 'Cookies | Erasmus in Barcelona',
    description: 'This site sets no cookies and runs no analytics. The only third-party content is a sign-up form that loads solely when you ask for it.',
  }, body);
}
