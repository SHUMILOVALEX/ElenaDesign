document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');

  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('.project-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.project-card');
      var isOpen = card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      btn.textContent = isOpen ? 'Свернуть ↑' : 'Подробнее о проекте →';
    });
  });
});
