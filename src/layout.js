// ============================================================
// Page shell: <head>, header, footer, and the small helpers the
// page templates share. Everything factual comes from
// src/data/site-data.js.
// ============================================================

import fs from 'node:fs';
import { createHash } from 'node:crypto';
import * as data from './data/site-data.js';
import { analyticsTag } from './data/analytics.js';
import manifest from './assets/images/manifest.json' with { type: 'json' };

// The stylesheet and the script are cached for a year (.htaccess), so
// their URLs carry a hash of their content: change a file and every page
// asks for a new URL. Without this, a returning visitor renders new pages
// with last week's stylesheet — which is how the course pages first
// reached the owner unstyled.
const assetVersion = (rel) => createHash('md5')
  .update(fs.readFileSync(new URL(rel, import.meta.url)))
  .digest('hex').slice(0, 10);
const CSS_V = assetVersion('./assets/css/site.css');
const JS_V = assetVersion('./assets/js/site.js');

// Where the build will be published. The GitHub Pages prototype sets both
// of these (see `npm run build:pages`); a real deploy needs neither.
export const SITE_URL = process.env.SITE_URL || 'https://www.erasmusinbarcelona.com';

// A GitHub project site is served from a sub-path, so every root-relative
// link needs that prefix. build.mjs applies it to the rendered HTML.
export const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');

// A prototype should never be indexed alongside the real site.
export const PROTOTYPE = process.env.PROTOTYPE === '1';

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/** Responsive <img> for a photograph in src/assets/images. */
export function img(image, { sizes = '100vw', eager = false, className = '' } = {}) {
  const m = manifest[image.file];
  if (!m) throw new Error('unknown image: ' + image.file);
  const widest = m.widths[m.widths.length - 1];
  const height = Math.round(widest / m.ratio);
  const srcset = m.widths.map((w) => `/assets/images/${image.file}-${w}.webp ${w}w`).join(', ');
  // Each photograph carries its own focal point, so a crop keeps the faces.
  const style = image.focus ? ` style="object-position: ${esc(image.focus)}"` : '';
  return `<img src="/assets/images/${image.file}-${widest}.webp"${m.widths.length > 1 ? `
    srcset="${srcset}" sizes="${esc(sizes)}"` : ''}
    width="${widest}" height="${height}" alt="${esc(image.alt)}"${style}
    ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}${className ? ` class="${className}"` : ''}>`;
}

/** Portrait from src/assets/images/team. */
export function portrait(person, size = 'people') {
  const m = manifest[person.img];
  const w = m.widths[0];
  return `<img src="/assets/images/team/${person.img}.webp" width="${w}" height="${Math.round(w * 11 / 10)}"
    alt="${esc(person.name)}, ${esc(person.role.toLowerCase())} at SpainBcn-Programs" loading="lazy" decoding="async">`;
}

const NAV = [
  { href: '/courses/', label: 'Courses', key: 'courses' },
  { href: '/join-a-course/', label: 'Staff training', key: 'join' },
  { href: '/universities/', label: 'Universities', key: 'universities' },
  { href: '/bring-a-group/', label: 'Student groups', key: 'group' },
  { href: '/dates/', label: 'Dates', key: 'dates' },
  { href: '/your-week/', label: 'Your week', key: 'week' },
  { href: '/barcelona/', label: 'Barcelona', key: 'barcelona' },
  { href: '/about/', label: 'About', key: 'about' },
];

function header(current) {
  const items = NAV.map((n) => `<li><a href="${n.href}"${n.key === current ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('\n          ');
  return `<header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="/">
        <span class="brand__name">Erasmus in Barcelona</span>
        <span class="brand__by">by SpainBcn-Programs</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="nav" id="site-nav" aria-label="Main">
        <ul class="nav__list">
          ${items}
          <li class="nav__cta"><a class="btn" href="/contact/">Contact us</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function footer() {
  const { contact, organisation, social, spainbcn } = data;
  const socialLinks = social.map((s) => `<li><a href="${s.url}" rel="noopener">${s.name}</a></li>`).join('\n            ');
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <p class="footer__brand">Erasmus in Barcelona</p>
          <p class="footer__by">by SpainBcn-Programs</p>
        </div>
        <div>
          <h2>Pages</h2>
          <ul>
            <li><a href="/courses/">Course groups</a></li>
            <li><a href="/join-a-course/">Staff training courses</a></li>
            <li><a href="/universities/">University staff</a></li>
            <li><a href="/bring-a-group/">Student groups</a></li>
            <li><a href="/plan-a-mobility/">Institutional programmes</a></li>
            <li><a href="/dates/">Dates</a></li>
            <li><a href="/your-week/">Your week</a></li>
            <li><a href="/barcelona/">Barcelona</a></li>
            <li><a href="/about/">About</a></li>
          </ul>
        </div>
        <div>
          <h2>SpainBcn-Programs</h2>
          <ul>
            <li><a href="${spainbcn.catalogue}" rel="noopener">Full course catalogue ↗</a></li>
            <li><a href="${spainbcn.locations}" rel="noopener">Other locations in Spain ↗</a></li>
            <li><a href="${spainbcn.projects}" rel="noopener">Projects and groups ↗</a></li>
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            <li><a href="${contact.emailHref}">${contact.email}</a></li>
            <li><a href="${contact.phoneHref}">${contact.phone}</a></li>
            <li>${contact.address}</li>
            ${socialLinks}
          </ul>
        </div>
      </div>
      <div class="footer__legal">
        <span>© ${organisation.founded}–${new Date().getFullYear()} ${organisation.legalName}</span>
        <span>Erasmus+ OID ${organisation.oid}</span>
        <a href="/privacy/">Privacy</a>
        <a href="/cookies/">Cookies</a>
        <button type="button" class="linkish" data-privacy-open>Privacy choices</button>
      </div>
    </div>
  </footer>`;
}

// The consent banner and the settings panel behind "Privacy choices".
// Both ship on every page; the banner only shows itself when no choice
// has been recorded yet.
function privacyUi() {
  return `<div class="privacy-banner" data-privacy-banner role="region" aria-label="Privacy choices" hidden>
    <div class="privacy-banner__inner">
      <div>
        <p class="privacy-banner__title">Privacy choices</p>
        <p>We use cookie-free Umami analytics to see how this site is used. The sign-up form is
          provided by forms.app and loads only if you allow it; forms.app uses its own cookies.</p>
      </div>
      <div class="privacy-banner__actions">
        <button type="button" class="btn btn--ghost" data-privacy-set="false">Necessary only</button>
        <button type="button" class="btn" data-privacy-set="true">Allow sign-up form</button>
        <a href="/privacy/">Privacy</a>
      </div>
    </div>
  </div>

  <dialog class="privacy-dialog" data-privacy-dialog aria-label="Privacy choices">
    <h2>Privacy choices</h2>
    <div class="privacy-dialog__row">
      <div>
        <h3>Sign-up form</h3>
        <p class="meta">Provided by forms.app, which uses its own cookies. Loaded only with your
          permission.</p>
      </div>
      <p class="privacy-dialog__state"><span data-privacy-state>Not allowed</span></p>
    </div>
    <div class="privacy-dialog__actions">
      <button type="button" class="btn btn--ghost" data-privacy-set="false">Not allowed</button>
      <button type="button" class="btn" data-privacy-set="true">Allowed</button>
    </div>
    <div class="privacy-dialog__row">
      <div>
        <h3>Umami analytics</h3>
        <p class="meta">Cookie-free website analytics. No advertising, no cross-site tracking.</p>
      </div>
    </div>
    <div class="privacy-dialog__actions">
      <a class="link-strong" href="/privacy/">Privacy policy</a>
      <button type="button" class="btn btn--ghost" data-privacy-close>Close</button>
    </div>
  </dialog>`;
}

// The "Sign Up!" side tab. The real forms.app tab can only exist after the
// visitor allows forms.app, so until then this local stand-in holds its
// place — same spot, same colour, same words, drawn here with no request —
// and opens a small panel offering that choice, with the email address for
// anyone who would rather not take it. site.js swaps in the real embed the
// moment forms.app is allowed. The contact page carries the form itself,
// so it goes without the tab.
function signupTab() {
  const t = data.formsApp.sidetab;
  return `<div class="signup-tab" data-signup-tab
    data-form-id="${data.formsApp.id}" data-form-host="${t.host}"
    data-tab-text="${esc(t.text)}" data-tab-color="${esc(t.color)}"
    data-tab-align-h="${t.align.horizontal}" data-tab-align-v="${t.align.vertical}"
    data-tab-width="${t.width}" data-tab-height="${t.height}">
    <button type="button" class="signup-tab__open" style="background-color:${esc(t.color)}"
      data-signup-open aria-expanded="false" aria-controls="signup-panel">
      <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
        <path fill="currentColor" fill-rule="evenodd" d="M1.5 1h13c.28 0 .5.22.5.5v9c0 .28-.22.5-.5.5H8.2l-3.5 3.3c-.26.25-.7.06-.7-.29V11H1.5c-.28 0-.5-.22-.5-.5v-9c0-.28.22-.5.5-.5zM4 4v1h8V4H4zm0 3v1h5V7H4z"/>
      </svg>
      ${esc(t.text)}</button>
    <div class="signup-tab__panel" id="signup-panel" hidden>
      <h2>Sign up</h2>
      <p data-signup-ask>The sign-up form is provided by forms.app and loads only if you allow it;
        forms.app uses its own cookies.</p>
      <p data-signup-failed hidden>The form couldn't be loaded.</p>
      <div class="signup-tab__actions">
        <button type="button" class="btn" data-privacy-set="true">Allow sign-up form</button>
        <button type="button" class="btn btn--ghost" data-signup-close>Close</button>
      </div>
      <p>Or email <a href="${data.contact.emailHref}">${data.contact.email}</a> or message us on
        <a href="${data.contact.whatsapp}" rel="noopener">WhatsApp ↗</a>.</p>
      <p class="meta"><a href="/privacy/">Privacy</a></p>
    </div>
  </div>`;
}

function organisationSchema() {
  const { organisation, contact, spainbcn, social } = data;
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: organisation.by,
    legalName: organisation.legalName,
    alternateName: organisation.name,
    url: SITE_URL + '/',
    sameAs: [spainbcn.home, ...social.map((s) => s.url)],
    email: contact.email,
    telephone: contact.phone,
    foundingDate: String(organisation.founded),
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Erasmus Organisation ID (OID)',
      value: organisation.oid,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.street,
      postalCode: contact.postcode,
      addressLocality: contact.city,
      addressCountry: 'ES',
    },
  };
}

function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', url: SITE_URL + '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.name, item: c.url,
    })),
  };
}

/**
 * Render a full page.
 * @param {{path:string,title:string,description:string,current?:string,
 *          crumb?:string,schema?:object[],noindex?:boolean}} meta
 */
export function page(meta, body) {
  const url = SITE_URL + meta.path;
  const schemas = [];
  if (meta.path === '/' || meta.path === '/about/') schemas.push(organisationSchema());
  if (meta.crumb) schemas.push(breadcrumbSchema([{ name: meta.crumb, url }]));
  if (meta.schema) schemas.push(...meta.schema);

  const ld = schemas.map((s) =>
    `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<link rel="canonical" href="${url}">
${meta.noindex || PROTOTYPE ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow">'}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Erasmus in Barcelona">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/assets/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Course group holding their certificates at the end of a week in Barcelona">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#3157D5">
<link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/css/site.css?v=${CSS_V}">
<script>
/* Read the visitor's forms.app choice before first paint, so an allowed
   form never flashes its permission gate and the banner never appears
   to someone who has already answered it. */
try {
  var p = JSON.parse(localStorage.getItem('eib-privacy-v1') || 'null');
  if (p && typeof p.formsApp === 'boolean') {
    document.documentElement.classList.add('privacy-decided');
    if (p.formsApp) document.documentElement.classList.add('formsapp-allowed');
  }
} catch (e) {}
</script>
${ld}
${analyticsTag()}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header(meta.current)}
<main id="main">
${body}
</main>
${footer()}
${meta.path === '/contact/' ? '' : signupTab()}
${privacyUi()}
<script src="/assets/js/site.js?v=${JS_V}" defer></script>
</body>
</html>
`;
}
