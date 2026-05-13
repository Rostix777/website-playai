// Terms modal
function openTermsModal() {
  document.getElementById('termsModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (window.location.hash !== '#terms') {
    history.pushState(null, '', '#terms');
  }
}
function closeTermsModal() {
  document.getElementById('termsModal').classList.remove('open');
  document.body.style.overflow = '';
  if (window.location.hash === '#terms') {
    history.pushState(null, '', window.location.pathname + window.location.search);
  }
}
document.getElementById('termsModal').addEventListener('click', function(e) {
  if (e.target === this) closeTermsModal();
});
// Support legacy query param
if (new URLSearchParams(window.location.search).get('terms') === 'open') {
  openTermsModal();
}
// Open via hash on load
if (window.location.hash === '#terms') {
  openTermsModal();
}
