// ==================== COOKIE CONSENT ====================
(function() {
  // If already consented, skip
  if (document.cookie.indexOf('pb_cookie_consent=') !== -1) return;

  // Build banner
  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<p>We use essential cookies and third-party services (CarrotQuest, Google Translate) to improve your experience. ' +
    '<a href="https://freedom24.com/documents" target="_blank" rel="noopener">Cookie Policy</a></p>' +
    '<div class="cookie-btns">' +
      '<button class="cookie-btn cookie-btn-decline" id="cookieDecline">Decline</button>' +
      '<button class="cookie-btn cookie-btn-accept" id="cookieAccept">Accept</button>' +
    '</div>';

  document.body.appendChild(banner);

  // Show with animation
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      banner.classList.add('visible');
    });
  });

  function setCookieConsent(value) {
    document.cookie = 'pb_cookie_consent=' + value + '; path=/; max-age=31536000; SameSite=Lax';
    banner.classList.remove('visible');
    setTimeout(function() { banner.remove(); }, 400);
  }

  document.getElementById('cookieAccept').addEventListener('click', function() {
    setCookieConsent('accepted');
  });
  document.getElementById('cookieDecline').addEventListener('click', function() {
    setCookieConsent('declined');
  });
})();
