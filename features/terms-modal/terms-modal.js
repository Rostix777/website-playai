// Terms modal
function openTermsModal() {
  document.getElementById('termsModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTermsModal() {
  document.getElementById('termsModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('termsModal').addEventListener('click', function(e) {
  if (e.target === this) closeTermsModal();
});
if (new URLSearchParams(window.location.search).get('terms') === 'open') {
  openTermsModal();
}
