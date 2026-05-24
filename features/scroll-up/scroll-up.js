// ===== SCROLL UP ONE SECTION BUTTON =====
(function() {
  var btn = document.getElementById('scrollUpBtn');
  if (!btn) return;

  // Collect all visible sections
  function getVisibleSections() {
    var all = document.querySelectorAll('section[id]');
    var visible = [];
    all.forEach(function(s) {
      // Skip hidden sections
      if (s.classList.contains('state-hide')) return;
      if (s.style.display === 'none') return;
      if (s.offsetHeight === 0) return;
      visible.push(s);
    });
    return visible;
  }

  // Find which section the user is currently viewing
  function getCurrentSectionIndex(sections) {
    var scrollY = window.scrollY + 120; // offset for header
    var idx = 0;
    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].getBoundingClientRect().top + window.scrollY <= scrollY) {
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
    if (!sections.length) return;
    var current = getCurrentSectionIndex(sections);
    var target = Math.max(0, current - 1);
    sections[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
