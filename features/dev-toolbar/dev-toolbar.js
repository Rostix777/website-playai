// Dev toolbar — activated via ?dev query param
(function() {
  if (!new URLSearchParams(window.location.search).has('dev')) return;

  var states = ['new_user', 'participant', 'closed'];
  var labels = { new_user: 'New User', participant: 'Live / Participant', closed: 'Season Closed' };

  // Build toolbar
  var bar = document.createElement('div');
  bar.className = 'dev-toolbar';
  bar.innerHTML = '<span class="dev-toolbar-label">DEV</span><span>Hero state:</span>';

  states.forEach(function(state) {
    var btn = document.createElement('button');
    btn.textContent = labels[state];
    btn.dataset.state = state;
    btn.addEventListener('click', function() {
      applyHeroState(state);
      updateActive(state);
      // Update URL without reload
      var url = new URL(window.location);
      url.searchParams.set('state', state);
      history.replaceState(null, '', url);
    });
    bar.appendChild(btn);
  });

  document.body.appendChild(bar);

  function updateActive(current) {
    bar.querySelectorAll('button').forEach(function(b) {
      b.classList.toggle('active', b.dataset.state === current);
    });
  }

  // Apply state from URL param or detect current
  var param = new URLSearchParams(window.location.search).get('state');
  if (param && states.indexOf(param) !== -1) {
    applyHeroState(param);
    updateActive(param);
  } else {
    updateActive(getHeroState());
  }
})();
