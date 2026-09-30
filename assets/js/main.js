/* ==========================================================================
   CN Tax Tools — Landing 2026 · main.js
   Không phụ thuộc thư viện ngoài. Tôn trọng prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var yr = $('#yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ----------------------------------------------------------------------
     1. Header dính + thanh tiến độ + dock
     ---------------------------------------------------------------------- */
  var hdr = $('#hdr'), pbar = $('#pbar'), dock = $('#dock');
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (hdr) hdr.classList.toggle('is-stuck', y > 8);
    if (pbar) {
      var pct = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;
      pbar.style.width = (pct * 100).toFixed(2) + '%';
    }
    if (dock) dock.classList.toggle('is-on', y > 380);
    ticking = false;
  }
  function requestScroll() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------------------
     2. Menu trượt — đóng bằng 4 cách: ✕ · burger · bấm ngoài · ESC
     ---------------------------------------------------------------------- */
  var burger = $('#burger'), nav = $('#nav'), scrim = $('#scrim'), sheetClose = $('#sheet-close');
  var menuOpen = false;

  function lockScroll(on) {
    var b = document.body;
    if (on) {
      var pad = window.innerWidth - document.documentElement.clientWidth;
      if (pad > 0) b.style.paddingRight = pad + 'px';
      b.style.overflow = 'hidden';
    } else { b.style.overflow = ''; b.style.paddingRight = ''; }
  }
  function focusables() {
    return $$('a[href], button:not([disabled])', nav).filter(function (el) { return el.offsetParent !== null; });
  }
  function setMenu(open) {
    if (!nav || !burger) return;
    menuOpen = open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    if (open) {
      lockScroll(true);
      if (scrim) { scrim.hidden = false; void scrim.offsetWidth; scrim.classList.add('is-open'); }
      nav.classList.add('is-open');
      var f = focusables();
      if (f.length) f[0].focus();
    } else {
      lockScroll(false);
      if (scrim) {
        scrim.classList.remove('is-open');
        window.setTimeout(function () { if (!menuOpen) scrim.hidden = true; }, 300);
      }
      nav.classList.remove('is-open');
    }
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!menuOpen); });
  if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
  if (sheetClose) sheetClose.addEventListener('click', function () { setMenu(false); burger && burger.focus(); });
  if (nav) {
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    nav.addEventListener('keydown', function (e) {
      if (!menuOpen || e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) { setMenu(false); burger && burger.focus(); }
  });
  var wide = window.matchMedia('(min-width: 1001px)');
  (wide.addEventListener ? wide.addEventListener.bind(wide, 'change') : wide.addListener.bind(wide))(function (e) {
    if ((e.matches !== undefined ? e.matches : e) && menuOpen) setMenu(false);
  });

  /* ----------------------------------------------------------------------
     3. Slide demo giao diện
     ---------------------------------------------------------------------- */
  var vp = $('#deco-vp');
  if (vp) {
    var slides = $$('[data-slide]', vp);
    var pipsBox = $('#pips');
    var capT = $('#cap-t'), capD = $('#cap-d');
    var cur = 0, timer = null;
    var AUTO = 6500;

    var CAPS = [
      ['Quản lý nhiều MST', 'Thêm bao nhiêu khách hàng cũng được. Mỗi MST một phiên riêng, tự đăng nhập lại khi hết hạn.'],
      ['Tải hóa đơn hàng loạt', 'Chọn năm + quý là ứng dụng tự kéo toàn bộ hóa đơn theo định dạng bạn chọn.'],
      ['Quản lý hàng hóa & tồn kho', 'Hóa đơn tải về được tách thành dòng hàng hóa, đối chiếu mã với danh mục và theo dõi tồn.'],
      ['Sao kê, dòng tiền & công nợ', 'Nạp sao kê ngân hàng, app tự khớp từng dòng và chỉ ra dòng nào lệch cần xem lại.']
    ];

    // Dựng nút chuyển slide
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pip';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', 'slide-' + i);
      b.setAttribute('aria-label', (i + 1) + '. ' + CAPS[i][0]);
      b.addEventListener('click', function () { go(i); restart(); });
      pipsBox && pipsBox.appendChild(b);
      s.id = 'slide-' + i;
    });
    var pips = $$('.pip', pipsBox);

    function go(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === cur;
        s.hidden = !on;
        s.classList.toggle('is-on', on);
      });
      pips.forEach(function (p, k) {
        p.setAttribute('aria-current', String(k === cur));
        p.setAttribute('aria-selected', String(k === cur));
        p.tabIndex = k === cur ? 0 : -1;
      });
      if (capT) capT.textContent = CAPS[cur][0];
      if (capD) capD.textContent = CAPS[cur][1];
    }

    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
    function start() { if (!REDUCED && !timer) timer = window.setInterval(function () { go(cur + 1); }, AUTO); }
    function restart() { stop(); start(); }

    var next = $('#next'), prev = $('#prev');
    if (next) next.addEventListener('click', function () { go(cur + 1); restart(); });
    if (prev) prev.addEventListener('click', function () { go(cur - 1); restart(); });

    // Phím mũi tên khi khung slide có tiêu điểm
    vp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); restart(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); restart(); }
    });

    // Vuốt ngang trên cảm ứng
    var sx = 0, sy = 0, swiping = false;
    vp.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiping = true; stop();
    }, { passive: true });
    vp.addEventListener('touchend', function (e) {
      if (!swiping) return;
      swiping = false;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? cur + 1 : cur - 1);
      start();
    }, { passive: true });

    // Dừng tự chạy khi rê chuột / tab ẩn
    ['mouseenter', 'focusin'].forEach(function (ev) { vp.addEventListener(ev, stop); });
    ['mouseleave', 'focusout'].forEach(function (ev) { vp.addEventListener(ev, start); });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

    go(0);
    start();
  }

  /* ----------------------------------------------------------------------
     4. Cuộn mượt tới anchor + đưa focus về đích
     ---------------------------------------------------------------------- */
  function headerOffset() { return (hdr ? hdr.offsetHeight : 0) + 14; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    var target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: REDUCED ? 'auto' : 'smooth' });
    target.setAttribute('tabindex', '-1');
    window.setTimeout(function () { target.focus({ preventScroll: true }); }, REDUCED ? 0 : 620);
    if (history.replaceState) history.replaceState(null, '', id);
  });

  /* ----------------------------------------------------------------------
     5. Reveal — luôn có lưới an toàn, không bao giờ ẩn vĩnh viễn
     ---------------------------------------------------------------------- */
  var revealables = $$('[data-rv]');
  function revealAll() { revealables.forEach(function (el) { el.classList.add('is-in'); }); }
  if (revealables.length) {
    if (REDUCED || !('IntersectionObserver' in window) || document.visibilityState === 'hidden') {
      revealAll();
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    }
    window.setTimeout(revealAll, 5000);
  }

  /* ----------------------------------------------------------------------
     6. Đánh dấu mục đang xem
     ---------------------------------------------------------------------- */
  var sections = $$('main section[id]');
  var navLinks = $$('.nav a[href^="#"]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { sio.observe(s); });
  }
})();
