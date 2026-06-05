// Mobile card carousel — converts grids to swipeable carousels on small screens
(function() {
  function initCarousels() {
    if (window.innerWidth >= 640) return;
    if (document.querySelector('.mobile-carousel')) return;

    var SELECTORS = ['.benefits-grid', '.prizes-layout', '.transparency-grid'];

    SELECTORS.forEach(function(sel) {
      var grid = document.querySelector(sel);
      if (!grid) return;

      var cards = Array.from(grid.children);
      if (cards.length < 2) return;

      grid.classList.add('mobile-carousel');

      // --- Dots ---
      var dotsWrap = document.createElement('div');
      dotsWrap.className = 'carousel-dots';
      cards.forEach(function(_, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.onclick = function() { scrollToCard(i); };
        dotsWrap.appendChild(dot);
      });
      grid.parentNode.insertBefore(dotsWrap, grid.nextSibling);
      var dots = dotsWrap.querySelectorAll('.carousel-dot');

      // --- Helpers ---
      function getMetrics() {
        var cw = cards[0].offsetWidth;
        var g = parseInt(getComputedStyle(grid).gap) || 16;
        return { cardWidth: cw, gap: g, step: cw + g };
      }

      function scrollToCard(i) {
        var m = getMetrics();
        grid.scrollTo({ left: i * m.step, behavior: 'smooth' });
      }

      function getCurrentIndex() {
        var m = getMetrics();
        return Math.round(grid.scrollLeft / m.step);
      }

      function updateDots(idx) {
        idx = Math.max(0, Math.min(idx, cards.length - 1));
        dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
      }

      // --- Scroll listener ---
      var scrollTimer;
      grid.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
          var idx = getCurrentIndex();
          // Infinite loop: if scrolled past last card, snap to first
          if (idx >= cards.length) {
            grid.scrollTo({ left: 0, behavior: 'auto' });
            updateDots(0);
          } else {
            updateDots(idx);
          }
        }, 80);
      }, { passive: true });

      // --- Infinite loop: append clones for seamless wrap ---
      // Clone first few cards and append to end for peek effect
      var cloneCount = Math.min(2, cards.length);
      for (var c = 0; c < cloneCount; c++) {
        var clone = cards[c].cloneNode(true);
        clone.classList.add('carousel-clone');
        clone.setAttribute('aria-hidden', 'true');
        // Remove IDs from clones to avoid duplicates
        clone.querySelectorAll('[id]').forEach(function(el) { el.removeAttribute('id'); });
        grid.appendChild(clone);
      }

      // When scroll settles on a clone, jump back to real card
      grid.addEventListener('scrollend', function() {
        var idx = getCurrentIndex();
        if (idx >= cards.length) {
          var realIdx = idx - cards.length;
          var m = getMetrics();
          grid.scrollTo({ left: realIdx * m.step, behavior: 'auto' });
          updateDots(realIdx);
        }
      });

      // Fallback for browsers without scrollend
      var endTimer;
      grid.addEventListener('scroll', function() {
        clearTimeout(endTimer);
        endTimer = setTimeout(function() {
          var idx = getCurrentIndex();
          if (idx >= cards.length) {
            var realIdx = idx - cards.length;
            var m = getMetrics();
            grid.scrollTo({ left: realIdx * m.step, behavior: 'auto' });
            updateDots(realIdx);
          }
        }, 200);
      }, { passive: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
  } else {
    initCarousels();
  }
})();
