/* ============================================================
   MAIN.JS — Gym One Fitness
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile Menu ─────────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Sticky Navbar ───────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* ── Active Nav Link ─────────────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === page ||
      (page === '' && href === 'index.html') ||
      (page === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  /* ── Scroll Animations (IntersectionObserver) ────────── */
  const animEls = document.querySelectorAll('.fade-up, .fade-in');
  if (animEls.length) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    animEls.forEach(el => io.observe(el));
  }

  /* ── Counter Animation ───────────────────────────────── */
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    const tick = now => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const cio = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(c => cio.observe(c));
  }

  /* ── "Start Free Trial" → contact page ──────────────── */
  document.querySelectorAll('a[href="contact.html#contact-form"]').forEach(a => {
    a.addEventListener('click', e => {
      // If already on contact page, smooth scroll
      if (page === 'contact.html') {
        e.preventDefault();
        const target = document.getElementById('contact-form');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Netlify Form UX ─────────────────────────────────── */
  const form = document.querySelector('form[data-netlify="true"]');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('.form-submit');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      }
    });
  }

})();
