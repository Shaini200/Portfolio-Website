// ════════════════════════════════════════════════
//  SHAINI KAVINDYA PORTFOLIO  —  main.js
// ════════════════════════════════════════════════

/* ─────────────────────────────────────────────────
   ✏️  EMAILJS CONFIG  —  Replace these 3 values
   ─────────────────────────────────────────────────
   1. Go to https://www.emailjs.com and sign up free
   2. Add a Gmail service  →  copy SERVICE_ID
   3. Create a template with these variables:
        {{from_name}}  {{from_email}}
        {{phone}}      {{subject}}   {{message}}
      Then copy TEMPLATE_ID
   4. Account → General → copy PUBLIC_KEY
   ───────────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = '93ZJCAcBTgXIqiCvH';    
const EMAILJS_SERVICE_ID  = 'service_9zp49a9';   
const EMAILJS_TEMPLATE_ID = 'template_zk4navq';   

/* ── Init EmailJS ─────────────────────────────── */
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ── Navbar scroll effect ─────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ── Mobile nav toggle ────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', open);
    const spans = navToggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
}

/* ── Contact Form with EmailJS ────────────────── */
const form      = document.getElementById('contactForm');
const formNote  = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');
const btnIcon   = document.getElementById('btnIcon');

function setNote(msg, color) {
  if (!formNote) return;
  formNote.textContent = msg;
  formNote.style.color = color;
}

function setBtnState(loading) {
  if (!submitBtn) return;
  submitBtn.disabled = loading;
  if (loading) {
    submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
  } else {
    submitBtn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
  }
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Guard: check EmailJS is configured
    if (
      EMAILJS_PUBLIC_KEY  === 'YOUR_PUBLIC_KEY'  ||
      EMAILJS_SERVICE_ID  === 'YOUR_SERVICE_ID'  ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID'
    ) {
      setNote('⚠️ Please add your EmailJS credentials in js/main.js first.', '#f59e0b');
      return;
    }

    setBtnState(true);
    setNote('', '');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form
      );

      //  Success
      setNote('✓ Message sent successfully! I\'ll get back to you soon.', '#0aafa5');
      form.reset();

    } catch (error) {
      //  Error
      console.error('EmailJS error:', error);
      setNote('✗ Failed to send. Please try emailing shainikavindya2@gmail.com directly.', '#ef4444');

    } finally {
      setBtnState(false);
      // Auto-clear note after 6s
      setTimeout(() => setNote('', ''), 6000);
    }
  });
}

/* ── Scroll reveal ────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.service-card, .project-card, .project-card-full, .skill-item, .timeline-item, .about-detail-item'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
    observer.observe(el);
  });
}

