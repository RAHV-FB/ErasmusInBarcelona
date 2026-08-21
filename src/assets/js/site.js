/* ============================================================
   ErasmusInBarcelona.com — the small amount of behaviour the
   site actually needs. Layout is CSS; this file only handles
   the menu, the date filter, the group planner and the
   consent-gated form embed.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- navigation ---------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var open = function (state) {
      nav.setAttribute('data-open', String(state));
      toggle.setAttribute('aria-expanded', String(state));
      toggle.textContent = state ? 'Close' : 'Menu';
      document.body.setAttribute('data-nav-open', String(state));
      if (state) {
        var first = nav.querySelector('a');
        if (first) first.focus();
      }
    };

    toggle.addEventListener('click', function () {
      open(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        open(false);
        toggle.focus();
      }
    });

    // A resize past the breakpoint leaves the panel hidden by CSS;
    // clear the state so the button and the body agree with it.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && toggle.getAttribute('aria-expanded') === 'true') open(false);
    });
  }

  /* ---------- date filter ---------- */

  var board = document.querySelector('[data-dates]');
  if (board) {
    var chips = document.querySelectorAll('[data-filter]');
    var rows = board.querySelectorAll('[data-area]');
    var count = document.querySelector('[data-dates-count]');

    var apply = function (area) {
      var shown = 0;
      rows.forEach(function (row) {
        var match = area === 'all'
          || (' ' + row.getAttribute('data-area') + ' ').indexOf(' ' + area + ' ') > -1;
        row.hidden = !match;
        if (match) shown++;
      });
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === area));
      });
      if (count) {
        count.textContent = shown === rows.length
          ? shown + ' weeks'
          : shown + ' of ' + rows.length + ' weeks';
      }
    };

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () { apply(chip.getAttribute('data-filter')); });
    });
  }

  /* ---------- group planner ---------- */

  var planner = document.querySelector('[data-planner]');
  if (planner) {
    var cta = planner.querySelector('[data-planner-cta]');
    var base = cta ? cta.getAttribute('href').split('?')[0] : '/contact/';
    var chosen = {};

    var refresh = function () {
      if (!cta) return;
      var params = new URLSearchParams();
      Object.keys(chosen).forEach(function (k) { if (chosen[k]) params.set(k, chosen[k]); });
      var q = params.toString();
      cta.setAttribute('href', q ? base + '?' + q + '#enquiry' : base + '#enquiry');
    };

    planner.querySelectorAll('[data-planner-option]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.getAttribute('data-planner-group');
        var value = btn.getAttribute('data-planner-option');
        var already = chosen[group] === value;
        chosen[group] = already ? '' : value;
        planner.querySelectorAll('[data-planner-group="' + group + '"]').forEach(function (b) {
          b.setAttribute('aria-pressed', String(!already && b === btn));
        });
        refresh();
      });
    });
  }

  /* ---------- the sign-up form, and only ever after permission ---------- */

  var gate = document.querySelector('[data-form-gate]');
  var mountPoint = document.getElementById('form-embed');
  var instance = null;

  var loadForm = function () {
    if (!gate || !mountPoint || instance) return;
    var id = gate.getAttribute('data-form-id');
    var host = gate.getAttribute('data-form-host');
    var answerField = gate.getAttribute('data-form-answer-field');

    gate.setAttribute('data-loading', 'true');

    var script = document.querySelector('script[data-formsapp]');
    var start = function () {
      try {
        // The standard embed attaches to an element carrying the form id.
        var mount = document.createElement('div');
        mount.setAttribute('formsappId', id);
        mountPoint.replaceChildren(mount);

        var options = { width: '100%', height: '640px' };
        // The planner's own answers, into the field that asks for them.
        // Never a name, an email address or anything the visitor typed.
        if (answerField && enquiryLines.length) {
          options.answers = {};
          options.answers[answerField] = encodeURIComponent(enquiryLines.join(' · '));
        }
        instance = new window.formsapp(id, 'standard', options, host);
        gate.hidden = true;
        gate.removeAttribute('data-loading');
      } catch (e) {
        failForm();
      }
    };

    if (window.formsapp) { start(); return; }

    if (!script) {
      script = document.createElement('script');
      script.src = 'https://cdn.formsapp.io/embed.js';
      script.async = true;
      script.setAttribute('data-formsapp', '');
      script.addEventListener('load', start);
      script.addEventListener('error', failForm);
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', start);
    }
  };

  function failForm() {
    if (!gate) return;
    gate.removeAttribute('data-loading');
    var fallback = gate.querySelector('[data-form-failed]');
    if (fallback) fallback.hidden = false;
    var action = gate.querySelector('[data-privacy-set]');
    if (action) action.hidden = true;
  }

  var unloadForm = function () {
    if (instance && instance.destroy) {
      try { instance.destroy(); } catch (e) {}
    }
    instance = null;
    if (mountPoint) mountPoint.replaceChildren();
    if (gate) gate.hidden = false;
  };

  /* ---------- privacy choices ---------- */

  var STORE = 'eib-privacy-v1';

  var readPrivacy = function () {
    try {
      var p = JSON.parse(localStorage.getItem(STORE) || 'null');
      return p && typeof p.formsApp === 'boolean' ? p : null;
    } catch (e) { return null; }
  };

  var writePrivacy = function (formsApp) {
    var value = { version: 1, formsApp: formsApp, decidedAt: new Date().toISOString() };
    try { localStorage.setItem(STORE, JSON.stringify(value)); } catch (e) {}
    document.documentElement.classList.add('privacy-decided');
    document.documentElement.classList.toggle('formsapp-allowed', formsApp);
    return value;
  };

  var banner = document.querySelector('[data-privacy-banner]');
  var dialog = document.querySelector('[data-privacy-dialog]');
  var stateLabel = document.querySelector('[data-privacy-state]');

  var showState = function () {
    var p = readPrivacy();
    if (stateLabel) stateLabel.textContent = p && p.formsApp ? 'Allowed' : 'Not allowed';
    if (dialog) {
      dialog.querySelectorAll('[data-privacy-set]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(!!p && String(p.formsApp) === b.getAttribute('data-privacy-set')));
      });
    }
  };

  if (banner && !readPrivacy()) banner.hidden = false;
  showState();

  document.querySelectorAll('[data-privacy-set]').forEach(function (button) {
    button.addEventListener('click', function () {
      var allow = button.getAttribute('data-privacy-set') === 'true';
      writePrivacy(allow);
      if (banner) banner.hidden = true;
      showState();
      if (allow) loadForm();
      else unloadForm();
    });
  });

  document.querySelectorAll('[data-privacy-open]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (!dialog) return;
      showState();
      if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
    });
  });

  document.querySelectorAll('[data-privacy-close]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (!dialog) return;
      if (dialog.close) dialog.close(); else dialog.removeAttribute('open');
    });
  });

  /* ---------- contact: carry the planner's answers over ---------- */

  var enquiryLines = [];
  var summary = document.querySelector('[data-enquiry-summary]');
  if (summary) {
    var LABELS = { group: 'Group', size: 'Size', focus: 'Subject', duration: 'Length', when: 'Dates' };
    var params = new URLSearchParams(window.location.search);
    var list = summary.querySelector('dl');

    Object.keys(LABELS).forEach(function (key) {
      var value = params.get(key);
      if (!value) return;
      value = value.replace(/[^\w\s+&,'’–—-]/g, '').slice(0, 60);
      var dt = document.createElement('dt');
      dt.textContent = LABELS[key];
      var dd = document.createElement('dd');
      dd.textContent = value;
      list.append(dt, dd);
      enquiryLines.push(LABELS[key] + ': ' + value);
    });

    if (enquiryLines.length) {
      summary.hidden = false;
      document.querySelectorAll('[data-mail-prefill]').forEach(function (a) {
        a.setAttribute('href', a.getAttribute('href').split('?')[0] +
          '?subject=' + encodeURIComponent('Group enquiry') +
          '&body=' + encodeURIComponent(enquiryLines.join('\n') + '\n\n'));
      });
    }
  }

  // Last, so an already-allowed form is built with the planner's answers
  // rather than before they have been read out of the URL.
  if (gate && document.documentElement.classList.contains('formsapp-allowed')) loadForm();
}());
