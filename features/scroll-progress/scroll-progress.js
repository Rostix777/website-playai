// Scroll progress bar
var scrollBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', function() {
  var h = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
}, { passive: true });
