// Mobile sticky CTA
var stickyCta = document.getElementById('stickyCta');
window.addEventListener('scroll', function() {
  stickyCta.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });
