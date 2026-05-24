// ===== SCROLL UP ONE SECTION BUTTON =====
(function() {
  var btn = document.getElementById('scrollUpBtn');
  if (!btn) return;

  // Collect all visible sections
  function getVisibleSections() {
    var sections = document.querySelectorAll('main > section, .hero');
    var visible = [];
    sections.forEach(function(s) {
      if (s.offsetParent !== null && !s.classList.contains('state-hide')) {
        visible.push(s);
      }
    });
    return visible;
  }

  // Find which section is currently in view (topmost visible)
  function getCurrentSectionIndex(sections) {
    var scrollY = window.scrollY + window.innerHeight * 0.3;
    var idx = 0;
    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) {
        idx = i;
        break;
      }
    }
    return idx;
  }

  // Show/hide button based on scroll position
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      btn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
      ticking = false;
    });
  }, { passive: true });

  // Scroll to previous section on click
  btn.addEventListener('click', function() {
    var sections = getVisibleSections();
    var current = getCurrentSectionIndex(sections);
    var target = Math.max(0, current - 1);
    sections[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
