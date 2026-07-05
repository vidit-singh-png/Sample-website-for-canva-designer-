/* =========================================================
   CANVA DESIGNER PORTFOLIO — script.js
   Note: There is NO contact form in this site by design.
   The Contact section uses direct links only:
   WhatsApp (wa.me), tel:, mailto:, and Instagram.
   This file only handles UI interactivity.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 2. ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = section.id;
      }
    });
    navAnchors.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', setActiveLink);

  /* ---------- 3. NAVBAR BACKGROUND ON SCROLL + BACK TO TOP ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    navbar.style.boxShadow = scrolled ? '0 8px 24px -12px rgba(0,0,0,0.5)' : 'none';
    backToTop.classList.toggle('show', window.scrollY > 500);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 4. PORTFOLIO FILTER ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hide', !matches);
      });
    });
  });

  /* ---------- 5. LIGHTBOX (click on a portfolio card) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxMedia = document.getElementById('lightboxMedia');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const mediaEl = card.querySelector('.card-media');
      const tag = card.querySelector('.card-tag').textContent;
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('p').textContent;

      lightboxMedia.style.background = mediaEl.style.background;
      lightboxMedia.innerHTML = mediaEl.innerHTML;
      lightboxTag.textContent = tag;
      lightboxTag.style.color = getComputedStyle(card).getPropertyValue('--tag-color');
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- 6. SCROLL REVEAL ANIMATIONS ---------- */
  // Tag elements that should fade/slide in on scroll
  const revealTargets = document.querySelectorAll(
    '.about-grid, .services-grid .service-card, .portfolio-grid .card, .pricing-grid .price-card, .testimonial-grid .testimonial-card, .contact-grid .contact-card, .section-head'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- 7. HERO STAT COUNTERS ---------- */
  const statNumbers = document.querySelectorAll('.stat-num');

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + (progress === 1 ? '+' : '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCount);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (statNumbers.length) {
    statsObserver.observe(document.querySelector('.hero-stats'));
  }

  /* ---------- 8. SKILL BAR ANIMATION ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  /* ---------- 9. SMOOTH SCROLL FOR ALL ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70; // navbar height offset
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});

/* =========================================================
   HOW TO EDIT THIS SITE FOR YOURSELF (for non-coders)
========================================================= */
// 1. Replace "Your Name" everywhere in index.html with your real name.
// 2. Swap the phone number in tel: and wa.me links (Contact section + floating
//    WhatsApp button at the bottom of index.html) with YOUR WhatsApp number,
//    in international format with no + or spaces, e.g. wa.me/919876543210.
// 3. Update the WhatsApp pre-filled message text after "?text=" if you want a
//    different greeting message to appear when someone messages you.
// 4. Replace the mailto: email and Instagram username with your own.
// 5. To add real images instead of icon placeholders in the Portfolio cards,
//    replace the `<div class="card-media" style="background:...">` with an
//    <img src="assets/your-image.jpg" alt="Project name"> tag, and adjust
//    the .card-media CSS (object-fit: cover) if needed.
// 6. To add/remove a pricing plan, copy or delete a ".price-card" block in
//    the Pricing section of index.html.