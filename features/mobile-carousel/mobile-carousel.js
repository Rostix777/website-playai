// Mobile card carousel — converts grids to swipeable carousels on small screens
(function() {
  if (window.innerWidth >= 640) return;

  var SELECTORS = ['.benefits-grid', '.prizes-layout', '.transparency-grid'];

  SELECTORS.forEach(function(sel) {
    var grid = document.querySelector(sel);
    if (!grid) return;

    var cards = Array.from(grid.children);
    if (cards.length < 2) return;

    // Add carousel class
    grid.classList.add('mobile-carousel');

    // Create dots
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'carousel-dots';
    cards.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.onclick = function() {
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      };
      dotsWrap.appendChild(dot);
    });
    grid.parentNode.insertBefore(dotsWrap, grid.nextSibling);

    // Update dots on scroll
    var dots = dotsWrap.querySelectorAll('.carousel-dot');
    var scrollTimer;
    grid.addEventListener('scroll', function() {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function() {
        var scrollLeft = grid.scrollLeft;
        var cardWidth = cards[0].offsetWidth;
        var gap = parseInt(getComputedStyle(grid).gap) || 16;
        var idx = Math.round(scrollLeft / (cardWidth + gap));
        idx = Math.max(0, Math.min(idx, cards.length - 1));
        dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
      }, 50);
    }, { passive: true });
  });
})();
