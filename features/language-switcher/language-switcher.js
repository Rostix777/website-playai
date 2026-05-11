// ==================== GOOGLE TRANSLATE / LANGUAGE SWITCHER ====================
var LANGS = [
  {code:'da',short:'DA',cc:'dk',label:'Dansk'},
  {code:'de',short:'DE',cc:'de',label:'Deutsch'},
  {code:'et',short:'ET',cc:'ee',label:'Eesti'},
  {code:'en',short:'ENG',cc:'gb',label:'English'},
  {code:'es',short:'ES',cc:'es',label:'Español'},
  {code:'fr',short:'FR',cc:'fr',label:'Français'},
  {code:'it',short:'IT',cc:'it',label:'Italiano'},
  {code:'lt',short:'LT',cc:'lt',label:'Lietuvių'},
  {code:'nl',short:'NL',cc:'nl',label:'Nederlands'},
  {code:'pl',short:'PL',cc:'pl',label:'Polski'},
  {code:'pt',short:'PT',cc:'pt',label:'Português'},
  {code:'ro',short:'RO',cc:'ro',label:'Română'},
  {code:'tr',short:'TR',cc:'tr',label:'Türkçe'},
  {code:'cs',short:'CZ',cc:'cz',label:'Čeština'},
  {code:'el',short:'GR',cc:'gr',label:'Ελληνικά'},
  {code:'bg',short:'BG',cc:'bg',label:'Български'},
  {code:'kk',short:'KZ',cc:'kz',label:'Казақша'},
  {code:'ru',short:'RU',cc:'ru',label:'Русский'},
  {code:'tg',short:'TJ',cc:'tj',label:'Тоҷикӣ'},
  {code:'uk',short:'UA',cc:'ua',label:'Українська'},
  {code:'hy',short:'AM',cc:'am',label:'Հայերեն'},
  {code:'ar',short:'AR',cc:'sa',label:'العربية'},
  {code:'zh-CN',short:'CN',cc:'cn',label:'中文'}
];

function flagImg(cc, size) {
  return '<img src="https://flagcdn.com/w40/' + cc + '.png" width="' + (size||16) + '" height="' + (size||12) + '" style="vertical-align:middle;border-radius:2px;" alt="">';
}

var currentLang = 'en';

function buildLangDropdown() {
  var dd = document.getElementById('langDropdown');
  dd.innerHTML = LANGS.map(function(l) {
    return '<a href="#" data-lang="' + l.code + '"' + (l.code === currentLang ? ' class="active"' : '') + '>' + flagImg(l.cc) + ' ' + l.short + '</a>';
  }).join('');
  dd.addEventListener('click', function(e) {
    e.preventDefault();
    var a = e.target.closest('a[data-lang]');
    if (!a) return;
    switchLang(a.dataset.lang);
    dd.classList.remove('open');
  });
}

function toggleLangDropdown() {
  document.getElementById('langDropdown').classList.toggle('open');
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('#langBtn') && !e.target.closest('#langDropdown')) {
    document.getElementById('langDropdown').classList.remove('open');
  }
});

function switchLang(code) {
  currentLang = code;
  var label = LANGS.find(function(l) { return l.code === code; });
  document.getElementById('langBtn').innerHTML = (label ? flagImg(label.cc) + ' ' + label.short : flagImg('gb') + ' ENG') +
    ' <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
  document.querySelectorAll('#langDropdown a').forEach(function(a) {
    a.classList.toggle('active', a.dataset.lang === code);
  });
  document.cookie = 'pb_lang_manual=' + code + '; path=/; max-age=31536000';
  if (code === 'en') {
    var frame = document.querySelector('.goog-te-banner-frame');
    if (frame) {
      var btn = frame.contentDocument.querySelector('.goog-close-link');
      if (btn) btn.click();
    }
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
    location.reload();
    return;
  }
  document.cookie = 'googtrans=/en/' + code + '; path=/';
  document.cookie = 'googtrans=/en/' + code + '; path=/; domain=.' + location.hostname;
  var sel = document.querySelector('.goog-te-combo');
  if (sel) {
    sel.value = code;
    sel.dispatchEvent(new Event('change'));
  } else {
    location.reload();
  }
}

function detectBrowserLang() {
  var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  var exact = LANGS.find(function(l) { return nav === l.code.toLowerCase(); });
  if (exact) return exact.code;
  var prefix = nav.split('-')[0];
  var partial = LANGS.find(function(l) { return l.code.toLowerCase().split('-')[0] === prefix; });
  return partial ? partial.code : 'en';
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: LANGS.map(function(l) { return l.code; }).join(','),
    autoDisplay: false
  }, 'google_translate_element');
}

function updateLangUI(code) {
  currentLang = code;
  var label = LANGS.find(function(l) { return l.code === code; });
  document.getElementById('langBtn').innerHTML = (label ? flagImg(label.cc) + ' ' + label.short : flagImg('gb') + ' ENG') +
    ' <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
  document.querySelectorAll('#langDropdown a').forEach(function(a) {
    a.classList.toggle('active', a.dataset.lang === code);
  });
}

buildLangDropdown();

var manualChoice = getManualLang();
if (manualChoice) {
  updateLangUI(manualChoice);
} else if (!document.cookie.includes('googtrans')) {
  var detected = detectBrowserLang();
  if (detected !== 'en') {
    setTimeout(function() { switchLang(detected); }, 1000);
  }
} else {
  var match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  if (match) {
    updateLangUI(match[1]);
  }
}

// --- Google Translate DOM-mutation guard ---
// GT injects inline style "top:…px; position:relative" on <body> and
// inserts banner/overlay iframes. A MutationObserver reverts those
// changes so CSS animations are not disrupted by layout shifts.
(function() {
  function cleanGTBody() {
    if (document.body.style.top && document.body.style.top !== '0px') {
      document.body.style.top = '0px';
    }
    if (document.body.style.position === 'relative') {
      document.body.style.position = '';
    }
  }
  function hideGTUI() {
    document.querySelectorAll('.skiptranslate, iframe.goog-te-banner-frame, .goog-te-spinner-pos, #goog-gt-tt').forEach(function(el) {
      if (el.style.display !== 'none') {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.height = '0';
      }
    });
  }
  // Run immediately
  cleanGTBody();
  hideGTUI();
  // Observe body attribute changes + child additions
  var gtObs = new MutationObserver(function(mutations) {
    var needClean = false;
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      if (m.type === 'attributes' && m.target === document.body) needClean = true;
      if (m.type === 'childList' && m.addedNodes.length) needClean = true;
    }
    if (needClean) {
      cleanGTBody();
      hideGTUI();
    }
  });
  gtObs.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'], childList: true });
  gtObs.observe(document.documentElement, { childList: true });
})();
