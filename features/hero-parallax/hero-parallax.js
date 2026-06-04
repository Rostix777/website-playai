// ==================== HERO KEY VISUAL PARALLAX ====================
// Each layer moves at a different speed on scroll for depth effect.
// Crown also gently floats up and down independently.

(function() {
  var scene = document.getElementById('heroKvScene');
  if (!scene) return;

  var layers = scene.querySelectorAll('.hero-kv-layer');
  if (!layers.length) return;

  // Respect reduced motion
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) return;

  var ticking = false;
  var crownLayer = scene.querySelector('.hero-kv-crown');
  var startTime = Date.now();

  // ---------- ENTRY ANIMATION ----------
  // Animate layers flying in from below on page load
  var entryDone = false;
  var entryStart = null;
  var ENTRY_DURATION = 900; // ms
  var ENTRY_STAGGER = 100; // ms between layers

  function easeOutExpo(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateEntry(timestamp) {
    if (!entryStart) entryStart = timestamp;
    var elapsed = timestamp - entryStart;
    var allDone = true;

    for (var i = 0; i < layers.length; i++) {
      var layerDelay = i * ENTRY_STAGGER;
      var t = Math.max(0, elapsed - layerDelay) / ENTRY_DURATION;
      if (t < 1) allDone = false;
      t = Math.min(t, 1);
      var ease = easeOutExpo(t);

      var startY = 50; // px from below
      var startScale = 0.85;
      var y = startY * (1 - ease);
      var s = startScale + (1 - startScale) * ease;

      layers[i].style.transform = 'translateY(' + y.toFixed(1) + 'px) scale(' + s.toFixed(3) + ')';
    }

    if (!allDone) {
      requestAnimationFrame(animateEntry);
    } else {
      entryDone = true;
      // Reset transforms to clean state, then start scroll parallax
      for (var j = 0; j < layers.length; j++) {
        layers[j].style.transform = '';
      }
      requestAnimationFrame(updateParallax);
    }
  }

  // Start entry after a brief delay for CSS opacity to begin
  setTimeout(function() {
    requestAnimationFrame(animateEntry);
  }, 100);

  // ---------- SCROLL PARALLAX + CROWN FLOAT ----------
  function updateParallax() {
    if (!entryDone) return;

    var rect = scene.getBoundingClientRect();
    var viewH = window.innerHeight;

    // scrollProgress centered around 0
    var scrollProgress = ((viewH - rect.top) / (viewH + rect.height)) - 0.5;

    // Crown float (independent sine wave)
    var elapsed = (Date.now() - startTime) / 1000;
    var crownFloat = Math.sin(elapsed * 0.5) * 10; // 10px amplitude, ~6s cycle

    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var speed = parseFloat(layer.dataset.parallaxSpeed) || 0.1;
      var maxRotate = parseFloat(layer.dataset.parallaxRotate) || 0;

      var translateY = scrollProgress * speed * viewH;
      var rotate = scrollProgress * maxRotate;

      // Crown gets extra float
      if (layer === crownLayer) {
        translateY += crownFloat;
      }

      layer.style.transform = 'translateY(' + translateY.toFixed(1) + 'px) rotate(' + rotate.toFixed(1) + 'deg)';
    }

    requestAnimationFrame(updateParallax);
  }
})();
