// ============================================================
// Page shell: <head>, header, footer, and the small helpers the
// page templates share. Everything factual comes from
// src/data/site-data.js.
// ============================================================

import * as data from './data/site-data.js';
import manifest from './assets/images/manifest.json' with { type: 'json' };

export const SITE_URL = 'https://www.erasmusinbarcelona.com';

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
  return `<img src="/assets/images/${image.file}-${widest}.webp"${m.widths.length > 1 ? `
    srcset="${srcset}" sizes="${esc(sizes)}"` : ''}
    width="${widest}" height="${height}" alt="${esc(image.alt)}"
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
  { href: '/join-a-course/', label: 'Courses', key: 'join' },
  { href: '/bring-a-group/', label: 'Groups', key: 'group' },
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
          <li class="nav__cta"><a class="btn" href="/contact/">Plan a mobility</a></li>
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
            <li><a href="/join-a-course/">Join a course</a></li>
            <li><a href="/bring-a-group/">Bring a group</a></li>
            <li><a href="/plan-a-mobility/">Plan a mobility</a></li>
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
        <span>© ${organisation.founded}–2026 ${organisation.legalName}</span>
        <span>Erasmus+ OID ${organisation.oid}</span>
        <a href="/privacy/">Privacy</a>
        <a href="/cookies/">Cookies</a>
      </div>
    </div>
  </footer>`;
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
${meta.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow">'}
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
<link rel="stylesheet" href="/assets/css/site.css">
${ld}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header(meta.current)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}
