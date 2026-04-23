// ── Grid canvas background ──
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const size = 40;
  const isLight = document.body.classList.contains('light-mode');

  ctx.strokeStyle = isLight ? 'rgba(236, 72, 153, 0.08)' : 'rgba(236, 72, 153, 0.12)';
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= canvas.width; x += size) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += size) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  const grad = ctx.createRadialGradient(
    canvas.width * 0.5, canvas.height * 0.3, 0,
    canvas.width * 0.5, canvas.height * 0.3, canvas.width * 0.6
  );
  grad.addColorStop(0,   isLight ? 'rgba(236, 72, 153, 0.05)' : 'rgba(236, 72, 153, 0.09)');
  grad.addColorStop(0.5, isLight ? 'rgba(240, 171, 252, 0.03)' : 'rgba(240, 171, 252, 0.04)');
  grad.addColorStop(1,   'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
drawGrid();
window.addEventListener('resize', drawGrid);

// ── Typed text ──
const roles = [ 'Web Design Enthusiast', 'Aspiring Data Scientist', 'AI & ML Enthusiast'];
let ri = 0, ci = 0, del = false;

function type() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const cur = roles[ri];
  if (!del) {
    el.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 55 : 95);
}
type();

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(13,13,31,0.98)'
    : 'rgba(13,13,31,0.88)';
});

// ── Active nav link ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
});

// ── Back to top ──
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 400));
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Reveal on scroll ──
const revealEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revObs.observe(el));

// ── Section animations ──
function addAnimClass(selector, animClass, delayIndex) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add(animClass);
    if (delayIndex) el.classList.add(`anim-delay-${Math.min(i + 1, 6)}`);
  });
}

// Interests
addAnimClass('#interests .interest-card', 'anim-fade-up', true);
addAnimClass('#interests .section-label-wrap', 'anim-zoom-in');
addAnimClass('#interests .section-heading', 'anim-fade-up');

// About
addAnimClass('#about .about-photo-frame', 'anim-fade-left');
addAnimClass('#about .about-text', 'anim-fade-right');
addAnimClass('#about .edu-item', 'anim-fade-up', true);
addAnimClass('#about .section-label-wrap', 'anim-zoom-in');
addAnimClass('#about .section-heading', 'anim-fade-up');

// Skills
addAnimClass('#skills .skill-tile', 'anim-zoom-in', true);
addAnimClass('#skills .section-label-wrap', 'anim-zoom-in');
addAnimClass('#skills .section-heading', 'anim-fade-up');
addAnimClass('#skills .section-sub', 'anim-fade-up');

// Projects
addAnimClass('#projects .project-card-v2', 'anim-fade-up', true);
addAnimClass('#projects .section-label-wrap', 'anim-zoom-in');
addAnimClass('#projects .section-heading', 'anim-fade-up');

// Contact
addAnimClass('#contact .contact-info-item', 'anim-fade-left', true);
addAnimClass('#contact .section-label-wrap', 'anim-zoom-in');
addAnimClass('#contact .section-heading', 'anim-fade-up');
addAnimClass('#contact .section-sub', 'anim-fade-up');
addAnimClass('#contact .contact-box', 'anim-zoom-in');

// Footer
document.querySelector('.site-footer')?.classList.add('anim-fade-up');

// Observe all animated elements
const animEls = document.querySelectorAll(
  '.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-zoom-in, .anim-flip-up'
);
const animObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      animObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
animEls.forEach(el => animObs.observe(el));

// ── EmailJS config — replace with your actual values ──
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);

// ── Contact form (only if present) ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    const btn = this.querySelector('.btn-send');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then(() => {
        msg.textContent = "Message sent! I'll get back to you soon.";
        msg.className = 'mt-3 text-center text-success';
        msg.classList.remove('d-none');
        this.reset();
      })
      .catch(() => {
        msg.textContent = 'Something went wrong. Please try again.';
        msg.className = 'mt-3 text-center text-danger';
        msg.classList.remove('d-none');
      })
      .finally(() => {
        btn.disabled = false;
        btn.innerHTML = 'Send Message <i class="bi bi-arrow-up-right ms-2"></i>';
        setTimeout(() => msg.classList.add('d-none'), 5000);
      });
  });
}

// ── Mobile menu nav links — close then scroll ──
document.querySelectorAll('#mobileMenu .mobile-nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    const offcanvasEl = document.getElementById('mobileMenu');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) {
      bsOffcanvas.hide();
      offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }, { once: true });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
const themeBtn = document.getElementById('themeToggle');
let light = false;

themeBtn.addEventListener('click', () => {
  light = !light;
  document.body.classList.toggle('light-mode', light);
  themeBtn.innerHTML = light ? '<i class="bi bi-moon-fill"></i>' : '<i class="bi bi-sun-fill"></i>';
  drawGrid();
});
