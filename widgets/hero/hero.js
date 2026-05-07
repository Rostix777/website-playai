// ===== THREE-STATE HERO ENGINE =====
var SEASON_START = new Date('2026-05-11T00:00:00Z').getTime();
var SEASON_END   = new Date('2026-06-11T23:59:59Z').getTime();
var COOKIE_NAME  = 'pb_returning';

function getHeroState() {
  var now = Date.now();
  if (now > SEASON_END) return 'closed';
  if (now >= SEASON_START || getCookie(COOKIE_NAME)) return 'participant';
  return 'new_user';
}

function applyHeroState(state) {
  document.querySelectorAll('[data-hero-state]').forEach(function(el) {
    el.classList.toggle('active', el.dataset.heroState === state);
  });

  // Header badge: show LIVE only in participant state
  var headerStatus = document.getElementById('headerStatus');
  if (headerStatus) headerStatus.style.display = (state === 'participant') ? 'flex' : (state === 'new_user' ? 'flex' : 'none');

  // Leaderboard preview section: hide for participant (it's in hero) and closed
  var lbSection = document.getElementById('leaderboard');
  if (lbSection) lbSection.classList.toggle('state-hide', state === 'participant');

  // Benefits & How It Works: hide for closed
  var benefits = document.getElementById('benefits');
  var howItWorks = document.getElementById('how-it-works');
  if (benefits) benefits.classList.toggle('state-hide', state === 'closed');
  if (howItWorks) howItWorks.classList.toggle('state-hide', state === 'closed');

  // FOMO banner text update for closed
  var fomoBanner = document.querySelector('.fomo-banner');
  if (fomoBanner && state === 'closed') fomoBanner.classList.add('state-hide');

  // Set cookie on any CTA click (mark as returning user)
  document.querySelectorAll('.btn-primary').forEach(function(btn) {
    btn.addEventListener('click', function() { setCookie(COOKIE_NAME, '1', 90); }, { once: true });
  });
}

// Header scroll effect
var header = document.getElementById('siteHeader');
window.addEventListener('scroll', function() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Init hero state
var heroState = getHeroState();
applyHeroState(heroState);
// Re-check state every minute (handles live transition at midnight)
setInterval(function() { var s = getHeroState(); applyHeroState(s); }, 60000);
