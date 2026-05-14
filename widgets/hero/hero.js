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
  var isClosed = state === 'closed';

  document.querySelectorAll('[data-hero-state]').forEach(function(el) {
    el.classList.toggle('active', el.dataset.heroState === state);
  });

  // Header badge: show LIVE only in participant state
  var headerStatus = document.getElementById('headerStatus');
  if (headerStatus) headerStatus.style.display = (state === 'participant') ? 'flex' : (state === 'new_user' ? 'flex' : 'none');

  // Sections to hide when season is closed
  var closedHideIds = ['benefits', 'how-it-works', 'prizes', 'transparency', 'join'];
  closedHideIds.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.toggle('state-hide', isClosed);
  });

  // Also hide by selector for elements without IDs
  var closedHideSelectors = ['.fomo-banner', '.ticker-strip', '.final-cta', '.ask-ai-section', '.sticky-cta'];
  closedHideSelectors.forEach(function(sel) {
    var el = document.querySelector(sel);
    if (el) el.classList.toggle('state-hide', isClosed);
  });

  // Leaderboard: show only for participant (in hero) and closed; hide for new_user
  var lbSection = document.getElementById('leaderboard');
  if (lbSection) lbSection.classList.toggle('state-hide', state === 'participant' || state === 'new_user');

  // Leaderboard nav links: hide when leaderboard section is hidden
  var lbHidden = state === 'new_user';
  document.querySelectorAll('.nav-leaderboard').forEach(function(el) {
    el.classList.toggle('state-hide', lbHidden);
  });

  // Reorder sections for closed state: hero → coupons → faq → leaderboard
  var orderMap = { 'hero': 1, 'coupons': 2, 'faq': 3, 'leaderboard': 4 };
  Object.keys(orderMap).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.order = isClosed ? orderMap[id] : '';
  });

  // Main content wrapper needs flex for order to work
  var main = document.querySelector('main') || document.getElementById('hero').parentElement;
  // We use body-level class to enable flex ordering via CSS
  document.body.classList.toggle('season-closed', isClosed);

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
