/* ── Subtech VtuApp — main.js ─────────────────────────── */

'use strict';

/* ── Navbar scroll effect ─────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile burger
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    });
  });
})();

/* ── Intersection Observer — fade-ins ────────────────── */
(function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings slightly
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        let delay = 0;
        siblings.forEach((el, idx) => { if (el === entry.target) delay = idx * 90; });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

/* ── Animated counters ────────────────────────────────── */
(function initCounters() {
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-val[data-target]').forEach(el => observer.observe(el));

  // Hero users counter (fetched from API)
  const heroUsers = document.getElementById('heroUsers');
  if (heroUsers) {
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => {
        heroUsers.dataset.target = data.users;
        heroUsers.dataset.suffix = '+';
        // Observe it after data loads
        observer.observe(heroUsers);
      })
      .catch(() => {
        heroUsers.textContent = '50K+';
      });
  }
})();

/* ── Contact form ─────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = document.getElementById('contactBtn');
  const msg = document.getElementById('contactMsg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    msg.className = 'form-feedback';

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setMsg(msg, 'All fields are required.', 'err');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg(msg, 'Please enter a valid email address.', 'err');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(msg, '✦ ' + data.message, 'ok');
        form.reset();
      } else {
        setMsg(msg, data.error || 'Something went wrong.', 'err');
      }
    } catch {
      setMsg(msg, 'Network error — please try again.', 'err');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
})();

/* ── Waitlist form ────────────────────────────────────── */
(function initWaitlist() {
  const input = document.getElementById('waitlistEmail');
  const btn   = document.getElementById('waitlistBtn');
  const msg   = document.getElementById('waitlistMsg');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    msg.textContent = '';
    msg.className = 'form-feedback';
    const email = input.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg(msg, 'Enter a valid email address.', 'err');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Joining…';

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(msg, '✦ ' + data.message, 'ok');
        input.value = '';
      } else {
        setMsg(msg, data.error || 'Something went wrong.', 'err');
      }
    } catch {
      setMsg(msg, 'Network error — please try again.', 'err');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Notify Me';
    }
  });
})();

/* ── Helper ───────────────────────────────────────────── */
function setMsg(el, text, type) {
  el.textContent = text;
  el.className = 'form-feedback ' + type;
}
