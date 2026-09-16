(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var out = document.getElementById('typewriter');
  var text = '> developer in Python, JavaScript e YAML';

  if (out) {
    if (reduced) {
      out.textContent = text;
    } else {
      var i = 0;
      var timer = setInterval(function () {
        out.textContent = text.slice(0, ++i);
        if (i >= text.length) clearInterval(timer);
      }, 42);
    }
  }

  var btn = document.getElementById('joinBtn');
  var note = document.getElementById('copyNote');

  if (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-link');
      window.open(url, '_blank', 'noopener');

      if (note && navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          note.textContent = 'Invito copiato negli appunti.';
          setTimeout(function () { note.textContent = ''; }, 2600);
        }).catch(function () {});
      }
    });
  }
})();
