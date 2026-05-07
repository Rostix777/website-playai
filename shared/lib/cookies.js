// Cookie helpers
function getCookie(name) {
  var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}
function setCookie(name, val, days) {
  var d = new Date(); d.setTime(d.getTime() + days * 86400000);
  document.cookie = name + '=' + encodeURIComponent(val) + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
}
function getManualLang() {
  var m = document.cookie.match(/pb_lang_manual=([^;]+)/);
  return m ? m[1] : null;
}
