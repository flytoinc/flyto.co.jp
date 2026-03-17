/**
 * FLYTO Inc. - Main JavaScript
 * Handles: header scroll, hamburger menu, scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHamburger();
  initScrollReveal();
});

/* ── Header scroll effect ── */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ── Hamburger menu ── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Update aria
    hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  // Close menu when link is clicked
  const mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Scroll reveal animations ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  reveals.forEach(el => observer.observe(el));
}
