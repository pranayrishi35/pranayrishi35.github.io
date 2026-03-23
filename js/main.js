/* ═══════════════════════════════════════════════
   main.js  —  Pranay Rishi Portfolio
   ───────────────────────────────────────────────
   Sections:
   1. Setup
   2. Matrix Rain Canvas
   3. Magnetic Cursor
   4. Scroll Progress Bar
   5. Navbar (scroll + active links + hamburger)
   6. Hero Animations
   7. Scroll-Triggered Animations
      7a. About
      7b. Skills — animated SVG rings
      7c. Timeline line draw + card reveals
      7d. Projects
      7e. Achievements
      7f. Certifications
      7g. Contact
   8. 3-D Card Tilt on hover
   9. Stat counter (hero)
   10. Init
═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1. SETUP
───────────────────────────────────────────── */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   2. MATRIX RAIN CANVAS
───────────────────────────────────────────── */
function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF0123456789<>{}[]!@#$%^&*';
  const charArr = chars.split('');
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(6,10,20,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f5ff';
    ctx.font = '13px Space Mono, monospace';

    drops.forEach((y, i) => {
      const ch = charArr[Math.floor(Math.random() * charArr.length)];
      ctx.fillStyle = i % 5 === 0 ? '#8b5cf6' : '#00f5ff';
      ctx.globalAlpha = 0.55;
      ctx.fillText(ch, i * 18, y * 18);
      ctx.globalAlpha = 1;
      if (y * 18 > canvas.height && Math.random() > 0.97) drops[i] = 0;
      drops[i]++;
    });
  }

  if (!prefersReduced) setInterval(draw, 50);
}

/* ─────────────────────────────────────────────
   3. MAGNETIC CURSOR
───────────────────────────────────────────── */
function initCursor() {
  if (window.matchMedia('(max-width:768px)').matches) return;
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.1 });
  });

  // Ring lags behind
  (function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    gsap.set(ring, { x: rx, y: ry });
    requestAnimationFrame(loop);
  })();

  // Hover interactions
  const hoverTargets = 'a, button, .skill-card, .project-card, .ach-card, .cert-card, .contact-link';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

/* ─────────────────────────────────────────────
   4. SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   5. NAVBAR
───────────────────────────────────────────── */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const links    = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  // Scroll → glass navbar
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));

  // Hamburger menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ─────────────────────────────────────────────
   6. HERO ANIMATIONS
───────────────────────────────────────────── */
function initHero() {
  // Count-up stats
  document.querySelectorAll('.stat-n[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    gsap.to({ val: 0 }, {
      val: target, duration: 2.5, delay: 0.8,
      ease: 'power2.out',
      onUpdate() { el.textContent = Math.round(this.targets()[0].val); }
    });
  });

  // Scroll cue fade out
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: '30% top',
    scrub: true,
    onUpdate: self => {
      const cue = document.querySelector('.scroll-cue');
      if (cue) cue.style.opacity = 1 - self.progress;
    }
  });

  // Typewriter
  new Typed('#typed-text', {
    strings: [
      'Cybersecurity Solutions.',
      'National Debates &amp; MUN.',
      'Anti-Fraud Systems.',
      'OSINT Intelligence.',
      'Edge-AI Visor Tech.',
      "Tomorrow's Innovations."
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1800,
    loop: true
  });
}

/* ─────────────────────────────────────────────
   7a. ABOUT  — staggered word reveal
───────────────────────────────────────────── */
function initAbout() {
  // Visual slides in
  gsap.from('#about-visual', {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    x: -60, opacity: 0, duration: 1, ease: 'power3.out'
  });

  // Paragraphs stagger in
  gsap.from('.reveal-p', {
    scrollTrigger: { trigger: '#about-text', start: 'top 75%' },
    y: 30, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power2.out'
  });

  // Section titles across whole page
  document.querySelectorAll('.section-title, .section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 24, opacity: 0, duration: 0.7, ease: 'power2.out'
    });
  });
}

/* ─────────────────────────────────────────────
   7b. SKILLS  — ring fill animation
───────────────────────────────────────────── */
function initSkills() {
  const CIRCUMFERENCE = 2 * Math.PI * 32; // ≈ 201.06

  document.querySelectorAll('.skill-card').forEach((card, i) => {
    const level = parseInt(card.dataset.level) || 0;
    const ring  = card.querySelector('.ring-fill');
    const target = CIRCUMFERENCE * (1 - level / 100);

    // Card fade-up
    gsap.from(card, {
      scrollTrigger: { trigger: '#skills-grid', start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.6,
      delay: i * 0.08,
      ease: 'power2.out'
    });

    // Ring stroke animation
    ScrollTrigger.create({
      trigger: '#skills-grid',
      start: 'top 78%',
      onEnter: () => {
        gsap.to(ring, {
          strokeDashoffset: target,
          duration: 1.2,
          delay: i * 0.1,
          ease: 'power3.out'
        });
      },
      once: true
    });
  });
}

/* ─────────────────────────────────────────────
   7c. TIMELINE  — line draw + card reveals
───────────────────────────────────────────── */
function initTimeline() {
  const line    = document.getElementById('tl-line');
  const timeline = document.getElementById('timeline');
  if (!line || !timeline) return;

  // Draw the line as you scroll through the section
  gsap.to(line, {
    height: timeline.scrollHeight,
    ease: 'none',
    scrollTrigger: {
      trigger: timeline,
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: 0.6
    }
  });

  // Each entry slides in from its side
  document.querySelectorAll('.tl-entry').forEach((entry, i) => {
    const side = entry.dataset.side;
    gsap.from(entry.querySelector('.tl-card'), {
      scrollTrigger: { trigger: entry, start: 'top 80%' },
      x: side === 'left' ? -40 : 40,
      opacity: 0, duration: 0.8,
      ease: 'power2.out'
    });
    gsap.from(entry.querySelector('.tl-dot'), {
      scrollTrigger: { trigger: entry, start: 'top 80%' },
      scale: 0, opacity: 0, duration: 0.5, delay: 0.2,
      ease: 'back.out(1.7)'
    });
  });
}

/* ─────────────────────────────────────────────
   7d. PROJECTS
───────────────────────────────────────────── */
function initProjects() {
  gsap.from('#featured-project', {
    scrollTrigger: { trigger: '#featured-project', start: 'top 78%' },
    y: 50, opacity: 0, duration: 0.9, ease: 'power3.out'
  });

  gsap.from('.project-card', {
    scrollTrigger: { trigger: '#projects-grid', start: 'top 80%' },
    y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out'
  });
}

/* ─────────────────────────────────────────────
   7e. ACHIEVEMENTS
───────────────────────────────────────────── */
function initAchievements() {
  gsap.from('.ach-card', {
    scrollTrigger: { trigger: '.ach-grid', start: 'top 78%' },
    x: -40, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power2.out'
  });
}

/* ─────────────────────────────────────────────
   7f. CERTIFICATIONS
───────────────────────────────────────────── */
function initCertifications() {
  gsap.from('.cert-card', {
    scrollTrigger: { trigger: '#certs-grid', start: 'top 80%' },
    y: 30, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out'
  });
}

/* ─────────────────────────────────────────────
   7g. CONTACT
───────────────────────────────────────────── */
function initContact() {
  gsap.from('#contact-wrapper .section-label, #contact-wrapper .section-title, #contact-wrapper .contact-desc', {
    scrollTrigger: { trigger: '#contact-wrapper', start: 'top 78%' },
    y: 24, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out'
  });

  gsap.from('.contact-link', {
    scrollTrigger: { trigger: '.contact-links', start: 'top 82%' },
    x: -30, opacity: 0, duration: 0.6, stagger: 0.14, ease: 'power2.out'
  });
}

/* ─────────────────────────────────────────────
   8. 3-D CARD TILT ON HOVER
───────────────────────────────────────────── */
function initCardTilt() {
  if (prefersReduced) return;
  const targets = document.querySelectorAll('.skill-card, .project-card, .cert-card, .ach-card');

  targets.forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - top)  / height - 0.5;
      gsap.to(card, {
        rotateY:  x * 12,
        rotateX: -y * 12,
        scale: 1.03,
        duration: 0.35,
        ease: 'power2.out',
        transformPerspective: 800,
        transformOrigin: 'center'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.5, ease: 'power2.out'
      });
    });
  });
}

/* ─────────────────────────────────────────────
   9. HERO PARTICLE PARALLAX
───────────────────────────────────────────── */
function initParallax() {
  gsap.to('#matrix-canvas', {
    y: 120,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}

/* ─────────────────────────────────────────────
   10. INIT — runs after DOM ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initCursor();
  initScrollProgress();
  initNavbar();
  initHero();
  initAbout();
  initSkills();
  initTimeline();
  initProjects();
  initAchievements();
  initCertifications();
  initContact();
  initCardTilt();
  initParallax();

  // Refresh ScrollTrigger after images/fonts load
  window.addEventListener('load', () => ScrollTrigger.refresh());
});
