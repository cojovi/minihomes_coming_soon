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

  // A&L RV Park reservation form — real submission via FormSubmit AJAX endpoint
  const rvForm = document.getElementById('rv-reserve-form');
  if (rvForm) {
    const rvStatus = rvForm.querySelector('.rv-status');
    const rvBtn = rvForm.querySelector('button[type="submit"]');
    const rvDateInput = rvForm.querySelector('#rv-movein');
    const defaultMoveIn = rvDateInput ? rvDateInput.value : '2026-07-06';

    rvForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(rvForm);
      const name = (data.get('name') || '').trim();
      const phone = (data.get('phone') || '').trim();
      const email = (data.get('email') || '').trim();
      const honey = (data.get('_honey') || '').trim();

      rvStatus.textContent = '';
      rvStatus.classList.remove('success', 'error');

      // Honeypot tripped — silently bail like a successful bot trap
      if (honey) return;

      if (!name) {
        rvStatus.textContent = 'Please enter your full name.';
        rvStatus.classList.add('error');
        rvForm.querySelector('#rv-name').focus();
        return;
      }
      if (!phone) {
        rvStatus.textContent = 'Please enter a phone number we can reach you at.';
        rvStatus.classList.add('error');
        rvForm.querySelector('#rv-phone').focus();
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        rvStatus.textContent = 'Please enter a valid email address.';
        rvStatus.classList.add('error');
        rvForm.querySelector('#rv-email').focus();
        return;
      }

      rvBtn.disabled = true;
      rvBtn.classList.add('is-loading');

      try {
        const res = await fetch(rvForm.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });

        if (!res.ok) throw new Error('Request failed');

        rvStatus.textContent = "You're on the list! We'll text or call you to confirm your studio reservation.";
        rvStatus.classList.add('success');
        rvForm.reset();
        if (rvDateInput) rvDateInput.value = defaultMoveIn;
      } catch {
        rvStatus.textContent = "Something went wrong submitting the form. Please call us directly so you don't lose your spot.";
        rvStatus.classList.add('error');
      }

      rvBtn.disabled = false;
      rvBtn.classList.remove('is-loading');
    });
  }

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
