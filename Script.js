// Simple, mobile-first portfolio interactions
// No libraries, no frameworks

document.addEventListener('DOMContentLoaded', function () {

  const navLinksContainer = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const currentYearEl = document.getElementById('currentYear');

  // 1. Set current year in footer
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile navigation open / close
  function toggleMenu() {
    if (!navLinksContainer ||!menuToggle) return;
    navLinksContainer.classList.toggle('open');
    const isOpen = navLinksContainer.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  }

  function closeMenu() {
    if (!navLinksContainer) return;
    navLinksContainer.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // 3. Auto close menu after clicking a link
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navLinksContainer ||!menuToggle) return;
    if (!navLinksContainer.contains(e.target) &&!menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // 4. Active navigation highlighting based on scroll
  function setActiveLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // 5. Simple scroll-reveal using IntersectionObserver
  const revealElements = document.querySelectorAll(
    '.edu-card,.interest-card,.strength-item,.about-text-card,.stat-card,.goals-card,.contact-card'
  );

  // Add initial hidden state
  revealElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // 6. Back-to-top button (created via JS, so HTML still works without JS)
  const backToTop = document.createElement('button');
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '↑';
  backToTop.style.cssText = `
    position:fixed;
    right:16px;
    bottom:18px;
    width:44px;
    height:44px;
    border-radius:100px;
    background:linear-gradient(135deg,#7C3AED,#FF5E8A);
    color:#fff;
    font-size:18px;
    font-weight:700;
    box-shadow:0 8px 20px rgba(124,58,237,0.35);
    opacity:0;
    pointer-events:none;
    transform:translateY(10px);
    transition: all 0.28s ease;
    z-index:999;
    display:grid;
    place-items:center;
  `;
  document.body.appendChild(backToTop);

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
      backToTop.style.transform = 'translateY(10px)';
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
