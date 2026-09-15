(function () {
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var typewriterEl = document.getElementById('typewriter');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phrase = '> developer in Python, JavaScript, YAML...';

  if (typewriterEl) {
    if (reduceMotion) {
      typewriterEl.textContent = phrase;
    } else {
      var i = 0;
      var typing = setInterval(function () {
        typewriterEl.textContent = phrase.slice(0, i + 1);
        i++;
        if (i >= phrase.length) clearInterval(typing);
      }, 45);
    }
  }

  var copyBtn = document.getElementById('copy-btn');
  var copyFeedback = document.getElementById('copy-feedback');

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', function (e) {
      var link = copyBtn.getAttribute('data-link');
      if (navigator.clipboard && link) {
        e.preventDefault();
        navigator.clipboard.writeText(link).then(function () {
          copyFeedback.textContent = 'link copiato! apertura in corso...';
          setTimeout(function () {
            window.open(link, '_blank', 'noopener');
          }, 400);
        }).catch(function () {
          window.open(link, '_blank', 'noopener');
        });
      }
    });
  }
})();
