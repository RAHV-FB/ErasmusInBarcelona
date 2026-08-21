// ============================================================
// Barcelona practical data — fares, airport options, metro lines.
//
// This is the volatile half of the site. Every figure here carries the
// date it was last checked and the page it came from, so a review is a
// matter of walking the `source` links rather than guessing which
// numbers have moved. Nothing here is repeated in a template: the
// Barcelona page renders it.
//
// Priority of sources, highest first: TMB and ATM for fares and metro,
// AMB for taxi, Barcelona's own tourism board for airport connections.
// Where the operator is private and no official figure could be
// confirmed, the field says so rather than carrying a guess.
// ============================================================

export const checked = '2026-08-21';

export const sources = {
  tmbFares: 'https://www.tmb.cat/en/barcelona-fares-metro-bus',
  tmbAirport: 'https://www.tmb.cat/en/visit-barcelona/public-transport/metro-airport',
  atmTcasual: 'https://www.atm.cat/en/titols-i-tarifes/t-casual',
  holaBarcelona: 'https://www.holabarcelona.com/tickets/hola-bcn-barcelona-travel-card',
  aerobus: 'https://www.aerobusbcn.com/',
  rodalies: 'https://rodalies.gencat.cat/en/sobre-rodalies/linies-i-estacions/servei_rodalia_barcelona/r2n/index.html',
  taxi: 'https://taxi.amb.cat/en/usuaris/tarifes-del-taxi',
  airport: 'https://www.aena.es/en/josep-tarradellas-barcelona-el-prat.html',
};

// Metro lines at the stations that matter for the two course areas.
// Read off TMB's own station pages on the date above.
export const stations = {
  sagradaFamilia: { name: 'Sagrada Família', lines: ['L2', 'L5'] },
  verdaguer: { name: 'Verdaguer', lines: ['L4', 'L5'] },
  barceloneta: { name: 'Barceloneta', lines: ['L4'] },
  passeigDeGracia: { name: 'Passeig de Gràcia', lines: ['L2', 'L3', 'L4'], rodalies: true },
  collblanc: { name: 'Collblanc', lines: ['L5', 'L9 Sud', 'L10 Sud'] },
};

// The airport, and the four ways in that a participant actually chooses
// between. Times are ranges because they are; fares are exact where an
// official body publishes them.
export const airport = {
  name: 'Josep Tarradellas Barcelona–El Prat (BCN)',
  distanceKm: 16,
  terminals: 'T1 and T2',
  options: [
    {
      id: 'train',
      name: 'R2 Nord train',
      bestFor: 'Passeig de Gràcia, then one metro line to either area',
      time: '20–25 min to Passeig de Gràcia',
      fare: 'One journey on an integrated ticket',
      fareNote: 'A T-casual journey covers it, which the airport metro does not.',
      detail: 'Runs from Terminal 2 about every 30 minutes and stops at Barcelona-Sants and '
        + 'Barcelona-Passeig de Gràcia. From Terminal 1, take the free shuttle bus to Terminal 2 first.',
    },
    {
      id: 'metro',
      name: 'Metro L9 Sud',
      bestFor: 'The Sagrada Família area, changing at Collblanc',
      time: '45–55 min to Sagrada Família',
      fare: '€5.90',
      fareNote: 'The airport ticket. No other single-journey ticket is valid at the airport stations.',
      detail: 'Serves both terminals every 7 minutes. It does not reach the city centre directly — '
        + 'it ends at Zona Universitària — but it meets L5 at Collblanc, and L5 runs straight to '
        + 'Verdaguer and Sagrada Família.',
    },
    {
      id: 'aerobus',
      name: 'Aerobús',
      bestFor: 'Plaça de Catalunya and the central hotels around it',
      time: 'About 35 min',
      fare: 'Set by the operator',
      fareNote: 'A private coach service, not part of the integrated fare system.',
      detail: 'A1 from Terminal 1 and A2 from Terminal 2, every 8 to 15 minutes, round the clock. '
        + 'Stops at Plaça d’Espanya, Gran Via–Urgell, Plaça de la Universitat and Plaça de Catalunya.',
    },
    {
      id: 'taxi',
      name: 'Taxi',
      bestFor: 'Late arrivals, heavy luggage, or three or four people sharing',
      time: '25–40 min',
      fare: 'Around €30–40',
      fareNote: 'Metered: €2.80 to start, €1.35/km by day and €1.66/km at night and at weekends, '
        + 'plus a €4.60 airport supplement. Traffic adds to it.',
      detail: 'Ranks are outside both terminals. Fares are set by the metropolitan authority, so '
        + 'every licensed taxi charges the same.',
    },
  ],
};

// Fares, from TMB and ATM. The airport restriction is the one that
// catches people out, so it is a field rather than a footnote.
export const tickets = [
  {
    id: 'single',
    name: 'Single ticket',
    price: '€2.90',
    what: 'One journey, with changes, on metro and bus.',
    airport: false,
  },
  {
    id: 't-casual',
    name: 'T-casual',
    price: '€13.00',
    what: '10 journeys in one zone, for one person. Changes within 75 minutes count as one journey.',
    airport: false,
  },
  {
    id: 'airport',
    name: 'Airport ticket',
    price: '€5.90',
    what: 'One metro journey to or from the airport stations.',
    airport: true,
  },
  {
    id: 'hola',
    name: 'Hola Barcelona Travel Card',
    price: 'From €12.50',
    what: 'Unlimited travel for 2 to 5 days, airport metro included both ways.',
    airport: true,
  },
];

// Stated by ATM, in answer to their own question "Can I go to the
// Airport with a T-casual?". Worth quoting because getting it wrong
// means buying a second ticket at the barrier.
export const airportTicketRule = 'The single ticket and the T-casual are not valid at the Aeroport T1 '
  + 'and Aeroport T2 metro stations on L9 Sud. Arrive there with one and you have to buy the €5.90 '
  + 'airport ticket before you can leave the station. The R2 Nord train and the buses are not affected.';

// Areas to stay in, judged on how each one reaches the two course
// areas. Gràcia office: Sagrada Família (L2, L5) and Verdaguer (L4, L5).
// Barceloneta: Barceloneta (L4). L4 therefore serves both, which is
// what makes the recommendation below hold.
export const staying = [
  {
    area: 'Sagrada Família and around',
    forOffice: 'Walk, 5–15 minutes',
    forSea: 'L4 from Verdaguer, about 15 minutes',
    note: 'Next to the office and the Gràcia course rooms. Quieter in the evening than the centre.',
  },
  {
    area: 'Eixample Dreta, towards Passeig de Gràcia',
    forOffice: 'L4 or L5, 5–10 minutes',
    forSea: 'L4 direct, about 10 minutes',
    note: 'The safest choice if your course location isn\'t confirmed yet: L4 runs from here to both '
      + 'areas, and the airport train stops at Passeig de Gràcia.',
  },
  {
    area: 'Gràcia proper, above Diagonal',
    forOffice: 'L4, or a 20-minute walk',
    forSea: 'Two lines, about 25 minutes',
    note: 'A neighbourhood rather than a tourist quarter, with squares and restaurants. Further from the sea.',
  },
  {
    area: 'Born, Barceloneta and the Old Town',
    forOffice: 'L4 from Barceloneta or Jaume I, about 15 minutes',
    forSea: 'Walk',
    note: 'Best if your week runs by the sea. Busy and more expensive in season.',
  },
];

export const bookingAdvice = 'If you can, wait until your course location is confirmed before booking '
  + 'accommodation you cannot cancel. If you have to book before then, staying near L4 gives you a '
  + 'direct line to both areas — it runs from the Sagrada Família area down to Barceloneta.';

// Free afternoons, sorted by how much of one they take. Practical, not
// a tour of the city: the two cultural activities are already arranged.
export const afternoons = [
  { time: 'An hour or two', what: 'The Sagrada Família itself, or the Gràcia squares north of the office.' },
  { time: 'Half an afternoon', what: 'The Gothic Quarter and Born, or Parc de la Ciutadella and the beach.' },
  { time: 'A full afternoon', what: 'Montjuïc, Park Güell, or the coast north of the city by train.' },
];

export const lunch = 'Lunch is not included. Both course areas have cafés and restaurants within a few '
  + 'minutes\' walk, and a menú del día — a set lunch of two courses — is the usual weekday option.';

export const language = 'Signs, announcements and menus are in Catalan and Spanish, often with English '
  + 'as well. Courses are taught in English, except the Spanish programmes, which are taught in Spanish.';

export const accessibility = 'The two course areas are different buildings, so step-free access is not '
  + 'the same in both. Tell us what you need when you enquire and we will confirm what the venue for '
  + 'your week can do before you commit to travel.';
