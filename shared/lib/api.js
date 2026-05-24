// ===== PUBLIC API CLIENT =====
// Connects to Portfolio Battle Landing API with graceful fallback to hardcoded data.
// When API is unavailable, the site works with static data as before.

var PB_API = (function() {
  // Switch to production when domain is ready
  var BASE_URL = 'https://play.freedomf24.com/api/v1';
  var CACHE = {};
  var LANG = (getManualLang && getManualLang()) || 'en';

  function fetchJSON(endpoint, params) {
    params = params || {};
    params.lang = params.lang || LANG;
    var qs = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
    var url = BASE_URL + endpoint + (qs ? '?' + qs : '');

    // In-memory cache (keyed by full URL)
    if (CACHE[url] && (Date.now() - CACHE[url].ts < CACHE[url].ttl)) {
      return Promise.resolve(CACHE[url].data);
    }

    return fetch(url, { mode: 'cors' })
      .then(function(res) {
        if (!res.ok) throw new Error('API ' + res.status);
        // Parse cache TTL from header
        var cc = res.headers.get('cache-control') || '';
        var m = cc.match(/max-age=(\d+)/);
        var ttl = m ? parseInt(m[1]) * 1000 : 30000;
        return res.json().then(function(data) {
          CACHE[url] = { data: data, ts: Date.now(), ttl: ttl };
          return data;
        });
      });
  }

  return {
    // GET /seasons/current
    getSeason: function() {
      return fetchJSON('/seasons/current');
    },

    // GET /leaderboard
    getLeaderboard: function(limit) {
      return fetchJSON('/leaderboard', { limit: limit || 5 });
    },

    // GET /winners
    getWinners: function() {
      return fetchJSON('/winners');
    },

    // GET /tickers/allowed
    getTickers: function(limit) {
      return fetchJSON('/tickers/allowed', { limit: limit || 1000 });
    },

    // GET /offer
    getOffer: function(format) {
      return fetchJSON('/offer', { format: format || 'html' });
    },

    // Check if API is reachable
    ping: function() {
      return fetchJSON('/seasons/current', { include_counts: false })
        .then(function() { return true; })
        .catch(function() { return false; });
    }
  };
})();
