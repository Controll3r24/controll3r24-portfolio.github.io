(function () {
  var slots = document.querySelectorAll('.slot');

  slots.forEach(function (slot) {
    function on() { slot.classList.add('slot-active'); }
    function off() { slot.classList.remove('slot-active'); }

    slot.addEventListener('mouseenter', on);
    slot.addEventListener('mouseleave', off);
    slot.addEventListener('focus', on);
    slot.addEventListener('blur', off);

    slot.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') slot.blur();
    });
  });
})();
