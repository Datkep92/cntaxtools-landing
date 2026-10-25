(function () {
  'use strict';
  var modal = document.getElementById('admin-modal');
  var button = document.getElementById('admin-btn');
  if (!modal || !button) return;
  var panel = modal.querySelector('.dlm__box');
  var body = modal.querySelector('.dlm__bd');
  var timer, previous, overflow, padding;
  panel.tabIndex = -1;
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'admin-modal');
  button.setAttribute('aria-expanded', 'false');
  function open() {
    clearTimeout(timer);
    if (modal.classList.contains('is-open')) return;
    previous = button;
    overflow = document.body.style.overflow;
    padding = document.body.style.paddingRight;
    var gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) document.body.style.paddingRight = gap + 'px';
    document.body.style.overflow = 'hidden';
    modal.hidden = false;
    body.scrollTop = 0;
    void modal.offsetWidth;
    modal.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    panel.focus({ preventScroll: true });
  }
  function close() {
    if (modal.hidden || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = overflow;
    document.body.style.paddingRight = padding;
    if (previous) previous.focus({ preventScroll: true });
    timer = setTimeout(function () { modal.hidden = true; }, 300);
  }
  button.addEventListener('click', open);
  modal.addEventListener('click', function (event) {
    if (event.target.closest('[data-admin-close]')) close();
  });
  document.addEventListener('keydown', function (event) {
    if (modal.hidden || !modal.classList.contains('is-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    var items = Array.from(panel.querySelectorAll('a[href],button')).filter(function (el) { return el.getClientRects().length; });
    var first = items[0], last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {
      event.preventDefault(); first.focus();
    }
  });
})();
