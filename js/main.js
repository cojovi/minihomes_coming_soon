(function () {
  'use strict';

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll reveal — hero is above the fold, show immediately
  const revealEls = document.querySelectorAll('.reveal');
  document.querySelectorAll('.hero .reveal, .coming-soon-strip.reveal').forEach((el) => {
    el.classList.add('is-visible');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Layer items highlight on scroll in anatomy section
  const layerItems = document.querySelectorAll('.layer-item');
  const anatomyScroll = document.querySelector('.anatomy-scroll');
  if (anatomyScroll && layerItems.length) {
    layerItems.forEach((item, i) => {
      item.addEventListener('mouseenter', () => {
        layerItems.forEach((li) => li.classList.remove('is-active'));
        item.classList.add('is-active');
      });
      if (i === 0) item.classList.add('is-active');
    });
  }

  // Email form handling (stores locally until backend is wired)
  function handleSubmit(form, statusEl) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      const email = input.value.trim();

      statusEl.textContent = '';
      statusEl.className = form.querySelector('.form-status')?.className.includes('cta')
        ? 'form-status cta-status'
        : 'form-status';

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        statusEl.textContent = 'Please enter a valid email address.';
        statusEl.classList.add('error');
        input.focus();
        return;
      }

      btn.disabled = true;
      btn.classList.add('is-loading');

      // Simulate network + persist to localStorage waitlist
      await new Promise((r) => setTimeout(r, 800));

      try {
        const key = 'cmac_waitlist';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem(key, JSON.stringify(existing));
        }
        statusEl.textContent = "You're on the list! We'll be in touch at launch.";
        statusEl.classList.add('success');
        input.value = '';
      } catch {
        statusEl.textContent = 'Something went wrong. Please try again.';
        statusEl.classList.add('error');
      }

      btn.disabled = false;
      btn.classList.remove('is-loading');
    });
  }

  document.querySelectorAll('.notify-form').forEach((form) => {
    const statusEl = form.querySelector('.form-status') || form.querySelector('.cta-status');
    if (statusEl) handleSubmit(form, statusEl);
  });

  // Sync both email inputs
  const emailHero = document.getElementById('email-hero');
  const emailCta = document.getElementById('email-cta');
  if (emailHero && emailCta) {
    [emailHero, emailCta].forEach((input) => {
      input.addEventListener('blur', () => {
        const other = input === emailHero ? emailCta : emailHero;
        if (input.value && !other.value) other.value = input.value;
      });
    });
  }
})();
