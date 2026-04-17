/* ============================================================
   Gym One Fitness — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Hamburger menu ----
  var toggle   = document.querySelector('.nav__toggle');
  var navLinks = document.querySelector('.nav__links');
  var nav      = document.querySelector('.nav');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (nav && !nav.contains(e.target)) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Active nav link ----
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Netlify form success ----
  var params = new URLSearchParams(window.location.search);
  if (params.get('success') === 'true') {
    document.querySelectorAll('.form-success').forEach(function (el) {
      el.style.display = 'block';
    });
    document.querySelectorAll('form[data-netlify]').forEach(function (f) {
      f.style.display = 'none';
    });
  }

});
