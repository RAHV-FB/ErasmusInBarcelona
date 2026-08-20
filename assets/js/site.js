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
        var match = area === 'all' || row.getAttribute('data-area') === area;
        row.hidden = !match;
        if (match) shown++;
      });
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === area));
      });
      if (count) {
        count.textContent = shown === rows.length
          ? shown + ' scheduled weeks'
          : shown + ' of ' + rows.length + ' scheduled weeks';
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

  /* ---------- contact: carry the planner's answers over ---------- */

  var summary = document.querySelector('[data-enquiry-summary]');
  if (summary) {
    var LABELS = {
      group: 'Who is coming',
      size: 'Group size',
      focus: 'Subject',
      duration: 'Length',
      when: 'Dates',
    };
    var params = new URLSearchParams(window.location.search);
    var list = summary.querySelector('dl');
    var lines = [];

    Object.keys(LABELS).forEach(function (key) {
      var value = params.get(key);
      if (!value) return;
      value = value.replace(/[^\w\s+&,'’–—-]/g, '').slice(0, 60);
      var dt = document.createElement('dt');
      dt.textContent = LABELS[key];
      var dd = document.createElement('dd');
      dd.textContent = value;
      list.append(dt, dd);
      lines.push(LABELS[key] + ': ' + value);
    });

    if (lines.length) {
      summary.hidden = false;
      // Carry the same answers into the mail link, so nobody types them twice.
      document.querySelectorAll('[data-mail-prefill]').forEach(function (a) {
        a.setAttribute('href', a.getAttribute('href').split('?')[0] +
          '?subject=' + encodeURIComponent('Group enquiry') +
          '&body=' + encodeURIComponent(lines.join('\n') + '\n\n'));
      });
    }
  }

  /* ---------- the sign-up form, loaded only when asked ---------- */

  var formButton = document.querySelector('[data-load-form]');
  if (formButton) {
    formButton.addEventListener('click', function () {
      var target = document.getElementById('form-embed');
      var id = formButton.getAttribute('data-form-id');
      var host = formButton.getAttribute('data-form-host');
      formButton.disabled = true;
      formButton.textContent = 'Loading the form…';

      var mount = document.createElement('div');
      mount.setAttribute('formsappId', id);
      target.replaceChildren(mount);

      var s = document.createElement('script');
      s.src = 'https://cdn.formsapp.io/embed.js';
      s.async = true;
      s.onload = function () {
        try {
          new window.formsapp(id, 'standard', { width: '100%', height: '640px' }, host);
          formButton.remove();
        } catch (e) {
          target.textContent = 'The form could not be loaded. Please write to us instead.';
        }
      };
      s.onerror = function () {
        formButton.disabled = false;
        formButton.textContent = 'Load the form';
        target.textContent = 'The form could not be loaded. Please write to us instead.';
      };
      document.head.appendChild(s);
    });
  }
}());
