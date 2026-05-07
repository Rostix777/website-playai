// Mobile menu
var menuBtn = document.getElementById('menuBtn');
var mobileNav = document.getElementById('mobileNav');
menuBtn.addEventListener('click', function() {
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
function closeMobileMenu() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}
