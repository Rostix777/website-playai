// Prize pool animated counter + distribution bar
(function() {
  var showcase = document.getElementById('prizePoolShowcase');
  var counter = document.getElementById('prizePoolCounter');
  var distBar = document.getElementById('prizeDistBar');
  if (!showcase || !counter) return;

  var counted = false;
  var prizeObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !counted) {
        counted = true;
        // Animate counter from 0 to 95
        var target = 95;
        var duration = 1600;
        var start = performance.now();
        function tick(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          var ease = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        // Animate distribution bar
        setTimeout(function() { if (distBar) distBar.classList.add('animated'); }, 400);
        prizeObs.unobserve(showcase);
      }
    });
  }, { threshold: 0.2 });
  prizeObs.observe(showcase);
})();

// Lottie cursor follower on prizes section
(function() {
  var section = document.querySelector('.prizes-section');
  var lottie = document.getElementById('prizeLottie');
  if (!section || !lottie) return;
  // Only on hover-capable devices
  if (window.matchMedia('(hover: none)').matches) return;

  section.addEventListener('mouseenter', function() {
    section.classList.add('lottie-active');
  });
  section.addEventListener('mouseleave', function() {
    section.classList.remove('lottie-active');
  });
  section.addEventListener('mousemove', function(e) {
    lottie.style.left = e.clientX + 'px';
    lottie.style.top = e.clientY + 'px';
  });
})();
