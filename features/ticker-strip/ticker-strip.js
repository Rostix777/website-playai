// ==================== LIVE TICKERS STRIP ====================
var STRIP_TICKERS = ['FRHC.US','AAPL.US','NVDA.US','TSLA.US','MSFT.US','GOOGL.US','AMZN.US','META.US','NFLX.US','AMD.US'];
var TRADERNET_API = 'https://tradernet.com/securities/export?tickers=';
var tickerCache = {};

function renderTickerStrip() {
  var track = document.getElementById('tickersTrack');
  var items = STRIP_TICKERS.map(function(t) {
    var d = tickerCache[t];
    if (!d) return '';
    var sym = t.replace('.US','');
    var price = d.ltp != null ? '$' + Number(d.ltp).toFixed(2) : '—';
    var pcp = d.pcp != null ? Number(d.pcp) : 0;
    var cls = pcp >= 0 ? 'up' : 'down';
    var sign = pcp >= 0 ? '+' : '';
    return '<div class="ticker-item">' +
      '<span class="ticker-logo">' + sym[0] + '</span>' +
      '<span class="ticker-symbol">' + sym + '</span>' +
      '<span class="ticker-price">' + price + '</span>' +
      '<span class="ticker-change ' + cls + '">' + sign + pcp.toFixed(2) + '%</span>' +
    '</div>';
  }).join('');
  track.innerHTML = items + items;
}

async function fetchTickerQuote(ticker) {
  try {
    var res = await fetch(TRADERNET_API + ticker);
    var data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      tickerCache[ticker] = data[0];
    }
  } catch(e) {}
}

async function refreshTickers() {
  await Promise.all(STRIP_TICKERS.map(function(t) { return fetchTickerQuote(t); }));
  renderTickerStrip();
}

refreshTickers();
setInterval(refreshTickers, 30000);
