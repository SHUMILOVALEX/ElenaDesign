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

  // Highlight current page in nav
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) link.classList.add('is-current');
  });

  // FAQ accordion
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var q = item.querySelector('.accordion-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(function (i) {
        i.classList.remove('is-open');
        var btn = i.querySelector('.accordion-q');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Gallery filters (AND across groups)
  var filterGroups = document.querySelectorAll('[data-filter-group]');
  var baCards = document.querySelectorAll('.ba-card');
  if (filterGroups.length && baCards.length) {
    var active = {};
    filterGroups.forEach(function (group) {
      active[group.dataset.filterGroup] = 'all';
    });

    function applyFilters() {
      baCards.forEach(function (card) {
        var tags = (card.dataset.tags || '').split(' ');
        var visible = Object.keys(active).every(function (group) {
          return active[group] === 'all' || tags.indexOf(active[group]) !== -1;
        });
        card.style.display = visible ? '' : 'none';
      });
    }

    filterGroups.forEach(function (group) {
      group.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          active[group.dataset.filterGroup] = btn.dataset.filterValue;
          applyFilters();
        });
      });
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
});
