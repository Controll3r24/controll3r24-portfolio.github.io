(function () {
  var slots = document.querySelectorAll('.slot:not(.empty)');

  slots.forEach(function (slot) {
    slot.addEventListener('mouseenter', function () {
      slot.classList.add('slot-active');
    });
    slot.addEventListener('mouseleave', function () {
      slot.classList.remove('slot-active');
    });
    slot.addEventListener('focus', function () {
      slot.classList.add('slot-active');
    });
    slot.addEventListener('blur', function () {
      slot.classList.remove('slot-active');
    });
    slot.setAttribute('tabindex', '0');
  });
})();
