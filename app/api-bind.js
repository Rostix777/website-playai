// ===== API DATA BINDING =====
// Fetches data from API and updates DOM. Falls back silently to hardcoded data.

(function() {
  // ---------- SEASON ----------
  function applySeason(data) {
    // Update hero state from server-side status
    var stateMap = {
      'scheduled': 'new_user',
      'registration_open': 'new_user',
      'active': 'participant',
      'completed': 'closed',
      'cancelled': 'closed'
    };
    var newState = stateMap[data.status] || 'new_user';

    // Update season dates in hero engine (global vars)
    if (data.starts_at) window.SEASON_START = new Date(data.starts_at).getTime();
    if (data.ends_at) window.SEASON_END = new Date(data.ends_at).getTime();

    // Use server time instead of client time for accuracy
    if (data.server_time) window.PB_SERVER_TIME_OFFSET = new Date(data.server_time).getTime() - Date.now();

    // Re-apply hero state if it changed
    if (typeof applyHeroState === 'function') applyHeroState(newState);
    if (typeof updateCountdown === 'function') updateCountdown();

    // Update participant count everywhere
    if (data.participants_total) {
      var count = data.participants_total.toLocaleString();
      document.querySelectorAll('.total, [data-participants]').forEach(function(el) {
        el.textContent = count + ' players';
      });
      // Hero stats
      var statParticipants = document.querySelector('[data-stat="participants"]');
      if (statParticipants) statParticipants.textContent = count + '+';
    }
  }

  // ---------- HELPERS ----------
  // Country name → ISO 3166-1 alpha-2 mapping
  var COUNTRY_MAP = {
    'afghanistan':'AF','albania':'AL','algeria':'DZ','andorra':'AD','angola':'AO',
    'argentina':'AR','armenia':'AM','australia':'AU','austria':'AT','azerbaijan':'AZ',
    'bahrain':'BH','bangladesh':'BD','belarus':'BY','belgium':'BE','bolivia':'BO',
    'bosnia and herzegovina':'BA','brazil':'BR','brunei':'BN','bulgaria':'BG',
    'cambodia':'KH','cameroon':'CM','canada':'CA','chile':'CL','china':'CN',
    'colombia':'CO','costa rica':'CR','croatia':'HR','cuba':'CU','cyprus':'CY',
    'czech republic':'CZ','czechia':'CZ','denmark':'DK','dominican republic':'DO',
    'ecuador':'EC','egypt':'EG','el salvador':'SV','estonia':'EE','ethiopia':'ET',
    'finland':'FI','france':'FR','georgia':'GE','germany':'DE','ghana':'GH',
    'greece':'GR','guatemala':'GT','honduras':'HN','hong kong':'HK','hungary':'HU',
    'iceland':'IS','india':'IN','indonesia':'ID','iran':'IR','iraq':'IQ',
    'ireland':'IE','israel':'IL','italy':'IT','jamaica':'JM','japan':'JP',
    'jordan':'JO','kazakhstan':'KZ','kenya':'KE','korea':'KR','south korea':'KR',
    'kuwait':'KW','kyrgyzstan':'KG','latvia':'LV','lebanon':'LB','libya':'LY',
    'liechtenstein':'LI','lithuania':'LT','luxembourg':'LU','malaysia':'MY',
    'maldives':'MV','malta':'MT','mexico':'MX','moldova':'MD','monaco':'MC',
    'mongolia':'MN','montenegro':'ME','morocco':'MA','myanmar':'MM',
    'netherlands':'NL','new zealand':'NZ','nigeria':'NG','north macedonia':'MK',
    'norway':'NO','oman':'OM','pakistan':'PK','panama':'PA','paraguay':'PY',
    'peru':'PE','philippines':'PH','poland':'PL','portugal':'PT','qatar':'QA',
    'romania':'RO','russia':'RU','saudi arabia':'SA','senegal':'SN','serbia':'RS',
    'singapore':'SG','slovakia':'SK','slovenia':'SI','south africa':'ZA',
    'spain':'ES','sri lanka':'LK','sweden':'SE','switzerland':'CH','taiwan':'TW',
    'tajikistan':'TJ','tanzania':'TZ','thailand':'TH','tunisia':'TN','turkey':'TR',
    'turkmenistan':'TM','ukraine':'UA','united arab emirates':'AE','uae':'AE',
    'united kingdom':'GB','uk':'GB','united states':'US','usa':'US',
    'uruguay':'UY','uzbekistan':'UZ','venezuela':'VE','vietnam':'VN'
  };

  // Resolve country_code: accepts ISO code ("KZ") or full name ("Kazakhstan")
  function resolveCountryCode(input) {
    if (!input) return null;
    var s = input.trim();
    // Already an ISO code
    if (s.length === 2 && s === s.toUpperCase()) return s;
    // Lookup by name
    return COUNTRY_MAP[s.toLowerCase()] || null;
  }

  // Convert ISO 3166-1 alpha-2 code to emoji flag (e.g. "DE" → 🇩🇪)
  function countryFlag(input) {
    var code = resolveCountryCode(input);
    if (!code) return '';
    var cp1 = 0x1F1E6 + code.charCodeAt(0) - 65;
    var cp2 = 0x1F1E6 + code.charCodeAt(1) - 65;
    return String.fromCodePoint(cp1, cp2);
  }

  // ---------- LEADERBOARD ----------
  function renderLeaderboardRow(p, compact) {
    var rankText = p.rank;
    var avatarHTML = p.avatar_url
      ? '<span class="lb-avatar"><img src="' + p.avatar_url + '" alt="' + p.display_name + '"></span>'
      : '<span class="lb-avatar">' + (p.display_name !== 'Anonymous' ? p.display_name.replace(/[^A-Z]/g, '').slice(0, 2) : '??') + '</span>';

    var returnClass = p.profit_loss_percent >= 0 ? 'positive' : 'negative';
    var returnSign = p.profit_loss_percent >= 0 ? '+' : '';
    var returnText = returnSign + p.profit_loss_percent.toFixed(2) + '%';

    var changeHTML = '';
    if (p.rank_change === null || p.rank_change === 0) {
      changeHTML = '<span class="lb-change same">&mdash;</span>';
    } else if (p.rank_change > 0) {
      changeHTML = '<span class="lb-change up">&#9650; ' + p.rank_change + '</span>';
    } else {
      changeHTML = '<span class="lb-change down">&#9660; ' + Math.abs(p.rank_change) + '</span>';
    }

    var flag = countryFlag(p.country_code || p.country);
    var flagHTML = flag ? '<span class="lb-flag">' + flag + '</span>' : '';

    var valueTD = compact ? '' : '<td><span class="lb-value">$' + p.portfolio_value.toLocaleString() + '</span></td>';

    return '<tr' + (p.display_name === 'Anonymous' ? ' style="opacity:0.5; border-top:1px dashed var(--border);"' : '') + '>' +
      '<td><span class="lb-rank">' + rankText + '</span></td>' +
      '<td><div class="lb-player">' + avatarHTML + '<span class="lb-name">' + p.display_name + '</span>' + flagHTML + '</div></td>' +
      '<td><span class="lb-return ' + returnClass + '">' + returnText + '</span></td>' +
      '<td>' + changeHTML + '</td>' +
      valueTD +
    '</tr>';
  }

  function applyLeaderboard(data) {
    // Update participant count in header
    var totalEls = document.querySelectorAll('.lb-header .total');
    totalEls.forEach(function(el) {
      el.textContent = data.participants_total.toLocaleString() + ' players';
    });

    // Update "Updated X ago" text
    if (data.updated_at) {
      var ago = Math.round((Date.now() - new Date(data.updated_at).getTime()) / 60000);
      var agoText = ago < 60 ? ago + 'm ago' : Math.round(ago / 60) + 'h ago';
      document.querySelectorAll('.lb-meta span:first-child').forEach(function(el) {
        el.textContent = 'Updated ' + agoText;
      });
    }

    // Render hero leaderboard (compact, no portfolio value column)
    var heroTbody = document.querySelector('#heroParticipant .leaderboard-table tbody');
    if (heroTbody && data.top.length) {
      var heroHTML = '';
      data.top.forEach(function(p) { heroHTML += renderLeaderboardRow(p, true); });
      if (data.last_place) {
        heroHTML += renderLeaderboardRow(data.last_place, true);
      }
      heroTbody.innerHTML = heroHTML;
    }

    // Render standalone leaderboard (full, with portfolio value)
    var fullTbody = document.querySelector('#leaderboard .leaderboard-table tbody');
    if (fullTbody && data.top.length) {
      var fullHTML = '';
      data.top.forEach(function(p) { fullHTML += renderLeaderboardRow(p, false); });
      if (data.last_place) {
        fullHTML += '<tr class="lb-separator-row"><td colspan="5" style="text-align:center; padding:0.5rem 1rem; font-size:1.25rem; color:var(--muted-fg); letter-spacing:0.25em;">&hellip;</td></tr>';
        fullHTML += '<tr style="opacity:0.7;">';
        var lp = data.last_place;
        var lpAvatar = lp.avatar_url
          ? '<span class="lb-avatar"><img src="' + lp.avatar_url + '" alt="' + lp.display_name + '"></span>'
          : '<span class="lb-avatar">??</span>';
        var lpReturnClass = lp.profit_loss_percent >= 0 ? 'positive' : 'negative';
        var lpReturnSign = lp.profit_loss_percent >= 0 ? '+' : '';
        fullHTML += '<td><span class="lb-rank">#' + lp.rank.toLocaleString() + '</span></td>';
        fullHTML += '<td><div class="lb-player">' + lpAvatar + '<span class="lb-name">' + lp.display_name + '</span></div></td>';
        fullHTML += '<td><span class="lb-return ' + lpReturnClass + '">' + lpReturnSign + lp.profit_loss_percent.toFixed(2) + '%</span></td>';
        fullHTML += '<td><span class="lb-change down">&#9660; ' + Math.abs(lp.rank_change || 0) + '</span></td>';
        fullHTML += '<td><span class="lb-value">$' + lp.portfolio_value.toLocaleString() + '</span></td>';
        fullHTML += '</tr>';
      }
      fullTbody.innerHTML = fullHTML;
    }
  }

  // ---------- WINNERS ----------
  function applyWinners(data) {
    if (data.status !== 'final' || !data.winners.length) return;

    var podium = document.querySelector('.closed-podium');
    if (!podium) return;

    var placeLabels = ['1st place', '2nd place', '3rd place', '4th place', '5th place'];
    var placeClasses = ['winner-gold', 'winner-silver', 'winner-bronze', 'winner-4th', 'winner-5th'];
    var couponsLabels = ['40 stocks', '25 stocks', '15 stocks', '10 stocks', '5 stocks'];

    var html = '';
    data.winners.forEach(function(w, i) {
      var avatarSrc = w.avatar_url || 'https://i.pravatar.cc/96?img=' + (i * 5 + 1);
      html += '<div class="closed-winner-card glass ' + (placeClasses[i] || 'winner-5th') + '">' +
        '<div class="closed-winner-place">' + (placeLabels[i] || (i + 1) + 'th place') + '</div>' +
        '<div class="closed-winner-avatar"><img src="' + avatarSrc + '" alt="' + w.display_name + '"></div>' +
        '<div class="closed-winner-name">' + w.display_name + '</div>' +
        '<div class="closed-winner-return font-mono">+' + w.profit_loss_percent.toFixed(2) + '%</div>' +
        '<div class="closed-winner-prize">' + (w.coupons || couponsLabels[i]) + ' stocks</div>' +
      '</div>';
    });
    podium.innerHTML = html;
  }

  // ---------- TICKERS ----------
  function applyTickers(data) {
    if (!data.items || !data.items.length) return;

    // Replace the hardcoded tickers array
    window.tickers = data.items.map(function(t) {
      return { t: t.ticker.replace('.US', ''), n: t.name || t.ticker };
    });

    // Re-render if modal is open
    if (typeof filterTickers === 'function') filterTickers();
  }

  // ---------- DISCLAIMER ----------
  function applyDisclaimer(data) {
    if (!data.sections || !data.sections.length) return;
    var legalEl = document.getElementById('footerLegalText');
    if (!legalEl) return;
    var html = data.sections.map(function(s) {
      return '<p>' + s.content + '</p>';
    }).join('');
    legalEl.innerHTML = html;
  }

  // ---------- INIT ----------
  // Try API, fall back silently to hardcoded data
  PB_API.getSeason()
    .then(function(data) {
      console.log('[PB API] Season loaded:', data.season_id, data.status);
      applySeason(data);

      // Load leaderboard and other data
      return Promise.all([
        PB_API.getLeaderboard(5).then(applyLeaderboard).catch(function(e) {
          console.warn('[PB API] Leaderboard unavailable:', e.message);
        }),
        PB_API.getWinners().then(applyWinners).catch(function(e) {
          console.warn('[PB API] Winners unavailable:', e.message);
        }),
        PB_API.getTickers(1000).then(applyTickers).catch(function(e) {
          console.warn('[PB API] Tickers unavailable:', e.message);
        }),
        PB_API.getDisclaimer().then(applyDisclaimer).catch(function(e) {
          console.warn('[PB API] Disclaimer unavailable, using fallback:', e.message);
        })
      ]);
    })
    .catch(function(e) {
      console.info('[PB API] API unavailable, using hardcoded data. (' + e.message + ')');
    });

  // Refresh leaderboard every 3 minutes when API is available
  setInterval(function() {
    PB_API.getLeaderboard(5).then(applyLeaderboard).catch(function() {});
  }, 180000);

})();
