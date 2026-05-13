// Scroll-triggered animations (IntersectionObserver)
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-in').forEach(function(el) { observer.observe(el); });

// ESC key closes modals
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeTermsModal();
    closeTickersModal();
    closeMobileMenu();
  }
});

// Hash-based modal routing (back/forward browser navigation)
window.addEventListener('hashchange', function() {
  var hash = window.location.hash;
  if (hash === '#stocks') {
    openTickersModal();
  } else {
    if (document.getElementById('tickersModal').classList.contains('open')) closeTickersModal();
  }
  if (hash === '#terms') {
    openTermsModal();
  } else {
    if (document.getElementById('termsModal').classList.contains('open')) closeTermsModal();
  }
});
