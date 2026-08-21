import { page } from '../layout.js';
import * as d from '../data/site-data.js';

export default function cookies() {
  const body = `
  <section class="container hero hero--tight">
    <div style="max-width:52ch">
      <h1>Cookies and privacy choices</h1>
      <p class="lede">This site sets no cookies of its own. One external service can, and only if you
        allow it.</p>
      <p class="meta">Last reviewed 20 August 2026.</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container prose">
      <h2>Our privacy preference</h2>
      <p>We store your answer about the sign-up form in your browser's local storage, under
        <code>eib-privacy-v1</code>, so the site remembers it. It is not a cookie, holds no
        identifier and never leaves your browser.</p>

      <h2>Umami analytics</h2>
      <p>Umami runs on every page and uses no cookies. It counts visits and pages; it does not
        identify you or follow you to other sites. Details are in the
        <a href="/privacy/">privacy policy</a>.</p>

      <h2>The sign-up form</h2>
      <p>The form on the contact page comes from forms.app and is not loaded unless you allow it.
        Once loaded, it uses its own cookies under its
        <a href="${d.formsApp.cookies}" rel="noopener">cookie policy ↗</a>. Those cookies are set by
        forms.app on its own domain, so we cannot delete them for you; clearing site data in your
        browser removes them.</p>

      <h2>Change your choice</h2>
      <p><button type="button" class="btn btn--ghost" data-privacy-open>Open privacy choices</button></p>
    </div>
  </section>`;

  return page({
    path: '/cookies/',
    current: '',
    crumb: 'Cookies',
    title: 'Cookies and Privacy Choices | Erasmus in Barcelona',
    description: 'Umami analytics runs without cookies; the forms.app sign-up form loads only with your permission and then uses its own cookies. Change your choice here.',
  }, body);
}
