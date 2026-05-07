// Countdown — works for both start (new_user) and end (participant)
function updateCountdown() {
  var now = Date.now();
  var state = getHeroState();
  var target = (state === 'participant') ? SEASON_END : SEASON_START;
  var diff = Math.max(0, target - now);
  var d = Math.floor(diff / 86400000); diff -= d * 86400000;
  var h = Math.floor(diff / 3600000); diff -= h * 3600000;
  var m = Math.floor(diff / 60000); diff -= m * 60000;
  var s = Math.floor(diff / 1000);

  // Pre-season countdown digits
  var cdDays = document.getElementById('cd-days');
  if (cdDays) {
    cdDays.textContent = String(d).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
  }

  // Header compact countdown
  var hc = document.getElementById('headerCountdown');
  if (hc) {
    if (state === 'new_user') hc.textContent = 'starts ' + d + 'd ' + h + 'h';
    else if (state === 'participant') hc.textContent = 'ends ' + d + 'd ' + h + 'h';
    else hc.textContent = 'ended';
  }

  // Participant inline countdown
  var lci = document.getElementById('liveCountdownInline');
  if (lci) lci.textContent = 'in ' + d + 'd ' + h + 'h ' + m + 'm';
}

updateCountdown();
setInterval(updateCountdown, 1000);
