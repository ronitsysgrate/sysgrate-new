/**
 * SYSGRATE UI RUNTIME & ANIMATION HELPER
 * Lightweight, zero-dependency helper for scroll reveals, animated counters,
 * interactive horizontal rails, and tab switchers.
 */
(function () {
  'use strict';

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollReveals() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length) return;

    if (isReduced || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => {
        el.setAttribute('data-revealed', 'true');
        el.style.opacity = '1';
        if (el.dataset.reveal === 'stagger') {
          Array.from(el.children).forEach(c => { c.style.opacity = '1'; });
        }
      });
      return;
    }

    const animMap = {
      rise: 'sg-rise',
      left: 'sg-slide-l',
      right: 'sg-slide-r',
      zoom: 'sg-zoom',
      blur: 'sg-blur',
      tilt: 'sg-tilt'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        obs.unobserve(el);
        el.setAttribute('data-revealed', 'true');

        const kind = el.dataset.reveal || 'rise';

        if (kind === 'stagger') {
          Array.from(el.children).forEach((child, idx) => {
            child.style.animation = 'sg-rise 0.85s cubic-bezier(.22,.61,.36,1) both';
            child.style.animationDelay = (idx * 110) + 'ms';
          });
        } else {
          const animName = animMap[kind] || 'sg-rise';
          el.style.animation = `${animName} 0.85s cubic-bezier(.22,.61,.36,1) both`;
        }
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05
    });

    revealEls.forEach(el => observer.observe(el));
  }

  function initCounters() {
    const counterEls = document.querySelectorAll('[data-counter]');
    if (!counterEls.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        obs.unobserve(el);

        const targetVal = parseFloat(el.getAttribute('data-counter')) || 0;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

        if (isReduced) {
          el.textContent = prefix + targetVal.toFixed(decimals) + suffix;
          return;
        }

        const startTime = performance.now();
        const duration = 1400; // ms

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          // Cubic ease-out
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = targetVal * easeProgress;

          el.textContent = prefix + currentVal.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = prefix + targetVal.toFixed(decimals) + suffix;
          }
        }

        requestAnimationFrame(update);
      });
    }, {
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.1
    });

    counterEls.forEach(el => observer.observe(el));
  }

  function initRailControls() {
    document.querySelectorAll('[data-rail-prev], [data-rail-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        const rail = btn.closest('.sg-practice-rail') || document.querySelector('.sg-practice-rail');
        if (!rail) return;
        const track = rail.querySelector('.sg-practice-track');
        if (!track) return;

        const isPrev = btn.hasAttribute('data-rail-prev');
        const scrollAmount = isPrev ? -340 : 340;

        // If animation is running, temporarily offset or scroll
        rail.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    });
  }

  function initTabs() {
    document.querySelectorAll('[data-tab-group]').forEach(group => {
      const tabs = group.querySelectorAll('[data-tab-target]');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetId = tab.getAttribute('data-tab-target');
          tabs.forEach(t => t.classList.remove('active', 'is-on'));
          tab.classList.add('active', 'is-on');

          const container = document.querySelector(`[data-tab-container="${group.getAttribute('data-tab-group')}"]`) || document;
          container.querySelectorAll('[data-tab-content]').forEach(content => {
            if (content.getAttribute('data-tab-content') === targetId) {
              content.style.display = '';
              content.style.animation = 'sg-rise 0.4s cubic-bezier(.22,.61,.36,1) both';
            } else {
              content.style.display = 'none';
            }
          });
        });
      });
    });
  }

  function init() {
    initScrollReveals();
    initCounters();
    initRailControls();
    initTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export to global for manual re-initialization (e.g. after SPA route change)
  window.SysgrateUI = {
    init: init,
    initScrollReveals: initScrollReveals,
    initCounters: initCounters
  };
})();
