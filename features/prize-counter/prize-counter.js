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
