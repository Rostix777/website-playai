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

// Click-spawned confetti — reusable for any section
(function() {
  var LOTTIE_SRC = 'https://lottie.host/0e8f8fbb-a4c2-4156-a03a-519d241c2df4/iJbQKH43Sq.lottie';
  var MAX_ACTIVE = 20;

  function attachConfetti(section) {
    if (!section) return;
    var active = [];
    section.style.position = section.style.position || 'relative';
    section.style.cursor = 'pointer';

    section.addEventListener('click', function(e) {
      if (e.target.closest('a, button')) return;

      while (active.length >= MAX_ACTIVE) {
        var old = active.shift();
        if (old.parentNode) old.parentNode.removeChild(old);
      }

      var el = document.createElement('dotlottie-wc');
      el.setAttribute('src', LOTTIE_SRC);
      el.setAttribute('autoplay', '');
      el.className = 'prize-confetti';
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';

      var scale = 0.85 + Math.random() * 0.35;
      el.style.transform = 'translate(-50%, -50%) scale(' + scale.toFixed(2) + ')';

      section.appendChild(el);
      active.push(el);

      setTimeout(function() { el.classList.add('fade-out'); }, 900);
      setTimeout(function() {
        if (el.parentNode) el.parentNode.removeChild(el);
        var idx = active.indexOf(el);
        if (idx !== -1) active.splice(idx, 1);
      }, 1500);
    });
  }

  attachConfetti(document.querySelector('.prizes-section'));
  attachConfetti(document.getElementById('heroClosed'));
})();
