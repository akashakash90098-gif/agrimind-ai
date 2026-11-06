/**
 * AGRIMIND AI — MAIN SITE SCRIPTS
 * Global Navigation, Mobile Menu, Scroll Reveal, Modals, Toasts, Image Fallbacks, Particles
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initLanguageDropdown();
  initScrollReveal();
  initBackToTop();
  highlightActiveNav();
  initImageFallbacks();
  initHeroParticles();
});

/**
 * Sticky Navbar on Scroll
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Drawer Menu
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggle || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  toggle.addEventListener('click', toggleMenu);

  // Close drawer when any mobile nav link is clicked
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Language Selector Dropdown
 */
function initLanguageDropdown() {
  const wrappers = document.querySelectorAll('.lang-selector-wrapper');

  wrappers.forEach(wrapper => {
    const btn = wrapper.querySelector('.lang-select-btn');
    const options = wrapper.querySelectorAll('.lang-option');

    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper.classList.toggle('open');
    });

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = opt.getAttribute('data-lang');
        if (window.agrimindI18n && window.agrimindI18n.setLanguage) {
          window.agrimindI18n.setLanguage(selectedLang);
        }
        wrapper.classList.remove('open');
      });
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    wrappers.forEach(w => w.classList.remove('open'));
  });
}

/**
 * Active Navigation Link Highlighting
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop();
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Scroll Reveal Animations (IntersectionObserver)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Graceful Image Fallback Handler
 * Prevents broken layouts if any remote image is unreachable
 */
function initImageFallbacks() {
  const images = document.querySelectorAll('img');
  const fallbackSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='100%25' height='100%25' fill='%2318382B'/%3E%3Ccircle cx='400' cy='230' r='60' fill='%23244C37'/%3E%3Cpath d='M400 270 A40 40 0 0 1 370 200 C390 190 410 180 430 170 C435 190 440 210 440 230 C440 255 420 270 400 270 Z' fill='%23D4F58A'/%3E%3Ctext x='400' y='340' font-family='sans-serif' font-size='20' font-weight='600' fill='%23FFFFFF' text-anchor='middle'%3EAgriMind AI — Cultivated Field%3C/text%3E%3C/svg%3E`;

  images.forEach(img => {
    img.addEventListener('error', () => {
      img.src = fallbackSvg;
      img.style.objectFit = 'cover';
    });
  });
}

/**
 * Subtle Animated Sunlight Particles in Hero
 */
function initHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  // Add 15 lightweight floating sunlight particles
  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 5 + 3;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 5;

    dot.style.cssText = `
      position: absolute;
      left: ${posX}%;
      top: ${posY}%;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(212, 245, 138, 0.7) 0%, rgba(212, 245, 138, 0) 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: floatParticle ${duration}s ease-in-out ${delay}s infinite alternate;
      opacity: 0.6;
    `;
    container.appendChild(dot);
  }

  // Inject particle animation keyframes once if not present
  if (!document.getElementById('particleKeyframes')) {
    const style = document.createElement('style');
    style.id = 'particleKeyframes';
    style.innerHTML = `
      @keyframes floatParticle {
        0% { transform: translateY(0) scale(0.8); opacity: 0.2; }
        50% { opacity: 0.7; }
        100% { transform: translateY(-35px) scale(1.2); opacity: 0.1; }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Global Toast Notification Helper
 */
window.showToast = function(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? '✓' 
    : type === 'warning' 
    ? '⚠' 
    : type === 'danger' 
    ? '✕' 
    : 'ℹ';

  toast.innerHTML = `
    <span style="font-weight: bold; color: var(--color-lime);">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

/**
 * Modal Dialog Helpers
 */
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

// Close modal when clicking backdrop or close buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (e.target.closest('.modal-close') || e.target.hasAttribute('data-modal-close')) {
    const backdrop = e.target.closest('.modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});
