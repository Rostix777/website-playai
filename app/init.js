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
