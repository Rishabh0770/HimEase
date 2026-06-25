/* ============================================================
   MilesOnWheel — script.js (Premium Edition)
   ============================================================ */

/* ── 1. DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Year in footer ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Rotating Taglines (smooth fade) ── */
  const taglines = [
    "Where Mountains Meet Memories",
    "Your Himalayan Adventure Starts Here",
    "Discover, Explore, Experience Himachal"
  ];
  let taglineIndex = 0;
  const taglineEl = document.getElementById('rotating-tagline');
  if (taglineEl) {
    taglineEl.style.transition = 'opacity 0.4s ease';
    setInterval(() => {
      taglineEl.style.opacity = '0';
      setTimeout(() => {
        taglineIndex = (taglineIndex + 1) % taglines.length;
        taglineEl.textContent = taglines[taglineIndex];
        taglineEl.style.opacity = '1';
      }, 400);
    }, 5000);
  }

  /* ── Social Proof Notification Bar ── */
  const notifications = [
    "🎒 Rahul from Delhi just booked a Manali Package",
    "🌸 Priya from Bangalore just booked a Shimla Tour",
    "⛰️ Arjun from Mumbai just booked a Spiti Trek",
    "🏔️ Sarah from Pune just booked a Ladakh Package",
    "🌿 Vikram from Chennai just booked a Kinnaur Tour"
  ];
  let notifIndex = 0;
  const notifBar = document.getElementById('notification-bar');
  const notifText = document.getElementById('notification-text');

  if (notifBar && notifText) {
    notifText.textContent = notifications[0];
    setTimeout(() => { notifBar.style.opacity = '1'; }, 2200);
    setInterval(() => {
      notifBar.style.opacity = '0';
      setTimeout(() => {
        notifIndex = (notifIndex + 1) % notifications.length;
        notifText.textContent = notifications[notifIndex];
        notifBar.style.opacity = '1';
      }, 500);
    }, 7000);
  }

  /* ── Contact form UX ── */
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('contactSuccess');
  if (form && ok) {
    form.addEventListener('submit', (e) => {
      // Formspree will handle real submit; UX feedback for JS-only fallback
      setTimeout(() => {
        ok.classList.remove('d-none');
        setTimeout(() => ok.classList.add('d-none'), 4000);
      }, 400);
    });
  }

  /* ── Intersection Observer — Scroll Reveal ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up, .scale-in, .destination-card, .pkg-card')
    .forEach(el => revealObserver.observe(el));

  /* ── Navbar Scroll Effect ── */
  const header = document.querySelector('header.sticky-top');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
        header.style.paddingTop = '2px';
        header.style.paddingBottom = '2px';
      } else {
        header.classList.remove('scrolled');
        header.style.paddingTop = '';
        header.style.paddingBottom = '';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') && link.getAttribute('href').includes('#' + id)) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ── 3-in-1 Packages hover background change ── */
  document.querySelectorAll('.package-section').forEach(section => {
    section.addEventListener('mouseenter', () => {
      const bg = section.getAttribute('data-bg');
      if (bg) {
        const card = document.querySelector('.packages-card');
        if (card) card.style.backgroundImage = `url('${bg}')`;
      }
    });
  });

  /* ── Callback Modal — open/close ── */
  const formModal = document.getElementById('formModal');
  const closeFormBtn = document.getElementById('closeFormBtn');

  // All book-btn triggers modal
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (formModal) {
        formModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeFormBtn && formModal) {
    closeFormBtn.addEventListener('click', () => closeModal());
  }
  if (formModal) {
    formModal.addEventListener('click', (e) => {
      if (e.target === formModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formModal && formModal.style.display === 'flex') closeModal();
  });

  function closeModal() {
    if (!formModal) return;
    formModal.style.animation = 'fadeOut 0.2s ease forwards';
    setTimeout(() => {
      formModal.style.display = 'none';
      formModal.style.animation = '';
      document.body.style.overflow = '';
    }, 200);
  }

  /* ── About cards 3D tilt ── */
  document.querySelectorAll('.about-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * 8;
      const rotY = ((x - cx) / cx) * 8;
      card.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
      card.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 40px rgba(0,0,0,0.3)`;
    });
    card.addEventListener('mouseleave', () => {
      card.classList.add('reset');
      card.style.transform = 'rotateX(0) rotateY(0)';
      card.style.boxShadow = '0 8px 40px rgba(0,0,0,0.25)';
      setTimeout(() => card.classList.remove('reset'), 300);
    });
  });

  /* ── Stat counter animation ── */
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.hero-stat-num').forEach(el => {
          const target = el.getAttribute('data-count');
          if (!target) return;
          animateCount(el, parseInt(target, 10));
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  function animateCount(el, target) {
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  /* ── Preloader (light) ── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none';
      setTimeout(() => preloader.remove(), 600);
    });
  }

  /* ── AOS init ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 750,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }

  /* ── Reviews iframe resize ── */
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'resize') {
      const iframe = document.getElementById('reviews-iframe');
      if (iframe) iframe.style.height = e.data.height + 'px';
    }
  });

}); // end DOMContentLoaded

/* ============================================================
   HERO BACKGROUND SLIDESHOW — Premium crossfade
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const images = [
    "images/img1.webp",
    "images/img5.webp",
    "images/img2.webp",
    "images/img4.webp",
    "images/img3.webp"
  ];

  let current = 0;
  const slideshow = document.querySelector('.hero-bg-slideshow');
  if (!slideshow) return;

  // Create two layers for seamless crossfade
  const layerA = document.createElement('div');
  const layerB = document.createElement('div');
  [layerA, layerB].forEach(l => {
    l.style.cssText = `
      position:absolute;inset:0;
      background-size:cover;background-position:center;
      transition:opacity 1.4s cubic-bezier(0.4,0,0.2,1);
      animation: heroZoom 9s ease-in-out infinite alternate;
    `;
  });
  slideshow.style.cssText = 'position:absolute;inset:0;z-index:1;';
  slideshow.appendChild(layerA);
  slideshow.appendChild(layerB);

  layerA.style.backgroundImage = `url(${images[0]})`;
  layerA.style.opacity = '1';
  layerB.style.opacity = '0';

  let useA = true;

  function preloadImage(src) {
    return new Promise(res => {
      const img = new Image();
      img.src = src;
      img.onload = res;
      img.onerror = res;
    });
  }

  async function nextSlide() {
    const nextIdx = (current + 1) % images.length;
    await preloadImage(images[nextIdx]);

    const incoming = useA ? layerA : layerB;
    const outgoing = useA ? layerB : layerA;

    incoming.style.backgroundImage = `url(${images[nextIdx]})`;
    incoming.style.opacity = '1';
    outgoing.style.opacity = '0';

    current = nextIdx;
    useA = !useA;
  }

  setInterval(nextSlide, 5500);
});

/* ============================================================
   WHATSAPP WIDGET
   ============================================================ */
function toggleChat() {
  const chatBox = document.getElementById('chatBox');
  const overlay = document.getElementById('chatOverlay');
  if (!chatBox) return;
  chatBox.classList.toggle('show');
  if (overlay) overlay.classList.toggle('show');
}

function openWhatsApp() {
  const phone = '917018434170';
  const msg = "Hi, I'd like to know more about your travel packages.";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ============================================================
   HERO SWIPER — Destination Slider
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const heroBg = document.getElementById('heroBg');
  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');

  if (!document.querySelector('.heroSwiper')) return;

  const swiper = new Swiper('.heroSwiper', {
    slidesPerView: 2.4,
    spaceBetween: 24,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    speed: 700,
    breakpoints: {
      0:   { slidesPerView: 1.15, spaceBetween: 14 },
      640: { slidesPerView: 1.8,  spaceBetween: 18 },
      768: { slidesPerView: 2.4,  spaceBetween: 24 }
    },
    navigation: {
      nextEl: '.hero-next',
      prevEl: '.hero-prev'
    },
    pagination: {
      el: '.hero-swiper-pagination',
      clickable: true
    },
    on: {
      init: function () {
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          updateHeroContent(activeSlide);
          activeSlide.classList.add('active-card');
        }
      },
      slideChange: function () {
        document.querySelectorAll('.heroSwiper .swiper-slide').forEach(s => s.classList.remove('active-card'));
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          updateHeroContent(activeSlide);
          activeSlide.classList.add('active-card');
        }
      }
    }
  });

  function updateHeroContent(slide) {
    const title = slide.getAttribute('data-title');
    const desc = slide.getAttribute('data-desc');
    const bg = slide.getAttribute('data-bg');
    if (heroTitle && title) heroTitle.textContent = title;
    if (heroDesc && desc) heroDesc.textContent = desc;
    if (heroBg && bg) {
      heroBg.style.opacity = '0';
      setTimeout(() => {
        heroBg.style.backgroundImage = `url('${bg}')`;
        heroBg.style.opacity = '1';
      }, 300);
    }
  }
});

/* ============================================================
   SMOOTH ANCHOR SCROLL (offset for sticky navbar)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = document.querySelector('header')?.offsetHeight || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   TOUR CARD — click navigation (keep original logic)
   ============================================================ */
// Tour card click is handled via inline onclick in HTML — retained as-is.

/* ============================================================
   PACKAGE SECTION hover bg (outside DOMContentLoaded for safety)
   ============================================================ */
document.querySelectorAll('.package-section').forEach(section => {
  section.addEventListener('mouseenter', () => {
    const bg = section.getAttribute('data-bg');
    const card = document.querySelector('.packages-card');
    if (bg && card) card.style.backgroundImage = `url('${bg}')`;
  });
});