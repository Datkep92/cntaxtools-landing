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
     4. NÚT TẢI — tự dò bản mới nhất trong GitHub Releases
     ----------------------------------------------------------------------
     Mọi nút tải đánh dấu `data-dl`. Trong HTML, href của chúng đã trỏ sẵn về
     /releases/latest (GitHub tự chuyển hướng tới release mới nhất) nên kể cả khi
     JavaScript bị chặn, mạng lỗi hay API GitHub sập, nút vẫn tải đúng bản mới —
     chỉ mất tiện lợi là phải bấm thêm một lần ở trang Releases.

     Có JavaScript thì tra API để lấy thẳng link file .exe. api.github.com có
     CORS `*` nên gọi thẳng từ trình duyệt được, không cần máy chủ.

     Cùng lần tra đó, mọi nhãn `data-dl-ver` cũng được đổi theo — để trang không
     còn rơi lại số phiên bản cũ sau khi đã phát hành bản mới.

     Vì sao bấm lúc chưa tra xong vẫn tải đúng: chặn sự kiện click, chờ tối đa
     3 giây cho lời gọi về rồi mới chuyển trang. Quá hạn thì thả theo href sẵn có.

     Cache localStorage 30 phút: GitHub giới hạn 60 lượt/giờ cho request không
     đăng nhập, và bản mới không xuất hiện dày đặc đến vậy. */
  (function downloadLinks() {
    var buttons = $$('[data-dl]');
    var labels = $$('[data-dl-ver]');
    if ((!buttons.length && !labels.length) || !window.fetch) return;

    var REPO = 'Datkep92/HoaDonNhe';
    var API = 'https://api.github.com/repos/' + REPO + '/releases/latest';
    var CACHE_KEY = 'cntax.dl.v1';
    var TTL_MS = 30 * 60 * 1000;
    var WAIT_CLICK_MS = 3000;

    var url = null;        // link .exe đã dò được
    var version = null;    // số phiên bản đã đổi lên nhãn
    var pending = null;    // promise đang chờ, dùng lại cho mọi lần bấm

    /* Chỉ nhận đúng tệp bộ cài của CN Tax Tools: bỏ qua .sha256, bỏ qua bản
       payload CN-Tax-Tools-vX.Y.Z.exe (dùng cho self-update, không phải để cài). */
    function pickAsset(assets) {
      if (!Array.isArray(assets)) return null;
      for (var i = 0; i < assets.length; i++) {
        var name = assets[i] && assets[i].name;
        if (typeof name === 'string' && /^CN-Tax-Tools-Setup-v\d+\.\d+\.\d+\.exe$/.test(name)) {
          return assets[i].browser_download_url || null;
        }
      }
      return null;
    }

    /* Số phiên bản lấy từ tag (v1.0.9), không có thì lấy từ tên tệp */
    function pickVersion(data) {
      var tag = data && typeof data.tag_name === 'string' ? data.tag_name : '';
      var m = tag.match(/(\d+\.\d+\.\d+)/);
      if (m) return m[1];
      var assets = data && data.assets;
      if (Array.isArray(assets) && assets[0] && typeof assets[0].name === 'string') {
        var n = assets[0].name.match(/(\d+\.\d+\.\d+)/);
        if (n) return n[1];
      }
      return null;
    }

    /* Nhãn nào bắt đầu bằng "v<số>" thì thay tiền tố đó, giữ nguyên phần còn lại.
       "v1.0.9 là bản mới nhất" -> "v1.0.10 là bản mới nhất" */
    function applyVersion(value) {
      if (!value) return;
      version = value;
      labels.forEach(function (el) {
        var text = el.textContent || '';
        if (!/^v\d+\.\d+\.\d+/.test(text)) return;
        el.textContent = 'v' + value + text.replace(/^v\d+\.\d+\.\d+/, '');
      });
    }

    function readCache() {
      try {
        var raw = window.localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        var data = JSON.parse(raw);
        if (!data || typeof data !== 'object') return null;
        if (Date.now() - Number(data.at || 0) > TTL_MS) return null;
        // Chỉ nhận link https của chính repo phát hành, không tin dữ liệu lạ ghi vào
        if (typeof data.url === 'string' && data.url.indexOf('https://github.com/' + REPO + '/releases/download/') !== 0) {
          return null;
        }
        return data;
      } catch (error) {
        return null;   // localStorage bị chặn (chế độ riêng tư) — bỏ qua cache
      }
    }

    function writeCache(value) {
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(value));
      } catch (error) { /* bỏ qua */ }
    }

    function apply(cached) {
      if (!cached) return;
      if (cached.url && !url && buttons.length) {
        url = cached.url;
        buttons.forEach(function (btn) { btn.setAttribute('href', cached.url); });
      }
      if (cached.version && !version) applyVersion(cached.version);
    }

    function resolve() {
      var needUrl = buttons.length && !url;
      var needVersion = labels.length && !version;
      if (!needUrl && !needVersion) return Promise.resolve(url);
      if (pending) return pending;

      pending = window.fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(function (data) {
          var found = { url: pickAsset(data && data.assets), version: pickVersion(data) };
          if (found.url && !url) {
            url = found.url;
            buttons.forEach(function (btn) { btn.setAttribute('href', found.url); });
          }
          if (found.version && !version) applyVersion(found.version);
          if (found.url || found.version) writeCache({ url: url, version: version, at: Date.now() });
          return found.url;
        })
        .catch(function () {
          return null;   // mạng lỗi / API lỗi / đổi cấu trúc -> giữ nguyên href dự phòng
        })
        .then(function (value) {
          pending = null;   // cho phép thử lại ở lượt sau nếu lần này hỏng
          return value;
        });

      return pending;
    }

    apply(readCache());
    if ((buttons.length && !url) || (labels.length && !version)) resolve();

    /* Bấm trước khi tra xong -> chờ một nhịp rồi mới đi, không mất lượt tải */
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        if (url) return;   // đã có link thẳng, để trình duyệt xử lý
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

        event.preventDefault();
        var fallback = btn.getAttribute('href');
        var settled = false;
        var wait = window.setTimeout(function () { go(fallback); }, WAIT_CLICK_MS);

        function go(target) {
          if (settled) return;
          settled = true;
          window.clearTimeout(wait);
          window.location.href = target;
        }

        resolve().then(function (value) { go(value || fallback); });
      });
    });
  })();

  /* ----------------------------------------------------------------------
     4a. THÔNG BÁO MOBILE — nhắc nhở, KHÔNG chặn tải
     ----------------------------------------------------------------------
     CN Tax Tools chỉ có bản cài Windows, tệp .exe không chạy được trên
     iOS/Android. Nhưng khách vẫn được tải bình thường: hộp thoại cản trước
     đây khiến người dùng bấm xong phải bấm thêm lần nữa mới tải, mất lượt.

     Nên nay chỉ hiện một thông báo nhỏ (toast) cạnh nút, tự ẩn sau vài giây.
     Quan trọng nhất: KHÔNG gọi preventDefault. Sự kiện click đi tiếp như bình
     thường nên điện thoại vẫn tải được file (để gửi qua Zalo/USB sang máy
     tính), chỉ là được nhắc trước.

     Cố tình không bắt mọi thứ không phải desktop: iPad và iPhone ở chế độ
     desktop vẫn cài được app Windows.

     Hiện một lần rồi ẩn trong 24 giờ (lưu localStorage): khách đã biết rồi
     thì lần sau bấm là tải thẳng, không phải đọc lại thông báo mỗi lần bấm. */
  (function mobileNotice() {
    var box = document.getElementById('mnotice');
    if (!box) return;

    var closeBtn = document.getElementById('mnotice-x');
    var HIDE_MS = 9000;
    var COOLDOWN_MS = 24 * 60 * 60 * 1000;
    /* Giữ nguyên key cũ: khách đã bấm chịu cảnh báo hộp thoại lần trước thì
       vẫn được ẩn trong 24h, không phải đọc lại thông báo dạng toast. */
    var FLAG_KEY = 'cntax.oswarn.shown';
    var timer = null;

    /* iPad và iPhone ở chế độ desktop báo UA là "MacIntel", nên phải xét cả
       maxTouchPoints — iPadOS 13+ cũng tự giả lập UA này. */
    function isMobile() {
      if (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent)) return false;
      if (/Android|iPhone|iPod|IEMobile|Mobile|Silk/i.test(navigator.userAgent)) return true;
      /* Còn lại dùng tín hiệu con trỏ: cảm ứng và không hover — gần như chắc
         chắn là điện thoại hoặc tablet. */
      return window.matchMedia('(hover: none), (pointer: coarse)').matches;
    }

    function shownRecently() {
      try {
        return Date.now() - Number(window.localStorage.getItem(FLAG_KEY) || 0) < COOLDOWN_MS;
      } catch (error) {
        return false;   // localStorage bị chặn — coi như chưa báo
      }
    }
    function markShown() {
      try { window.localStorage.setItem(FLAG_KEY, String(Date.now())); } catch (error) { /* bỏ qua */ }
    }

    function hide() {
      if (timer) { window.clearTimeout(timer); timer = null; }
      box.hidden = true;
    }
    function show() {
      box.hidden = false;
      if (timer) window.clearTimeout(timer);
      /* Bấm lần nữa trong lúc đang hiện thì reset đồng hồ, không để người
         dùng đọc bị cắt ngang. */
      timer = window.setTimeout(hide, HIDE_MS);
    }

    if (closeBtn) closeBtn.addEventListener('click', hide);

    /* Bắt ở thẻ gốc (capture) để bắt được cả lượt bấm bằng chuột phải / phím
       tắt. KHÔNG gọi preventDefault và KHÔNG return sớm theo phím sửa đổi:
       người dùng mở tab mới / Ctrl-click vẫn nên được thấy nhắc nhở. */
    document.addEventListener('click', function (event) {
      var target = event.target.closest ? event.target.closest('[data-dl]') : null;
      if (!target) return;

      if (!isMobile()) return;
      if (shownRecently()) return;          // đã báo trong 24h — im lặng cho tải thẳng

      show();
      markShown();
    }, true);
  })();

  /* ----------------------------------------------------------------------
     4b. BÁO TELEGRAM KHI KHÁCH BẤM TẢI
     ----------------------------------------------------------------------
     Dùng sendBeacon chứ không phải fetch: beacon được gửi đi dù trang đang
     rời đi sang GitHub, không phải chờ, và không cần chặn sự kiện click — nên
     việc báo cáo không bao giờ làm mất một lượt tải. Worker đọc quốc gia và
     thiết bị từ header của Cloudflare, trang chỉ gửi đường dẫn.

     Blob kiểu text/plain để không vướng preflight CORS (endpoint mở '*' vì
     landing nằm ở domain khác). Gửi hỏng thì im lặng — đây chỉ là thống báo,
     không được phép làm hỏng trang. */
  (function reportDownload() {
    var GATEWAY = 'https://hoadon-support-gateway.linhnhaxac10.workers.dev/v1/landing/download';
    var buttons = $$('[data-dl]');
    if (!buttons.length || !navigator.sendBeacon) return;   // trình duyệt quá cũ thì bỏ qua

    function report() {
      var payload = JSON.stringify({ page: window.location.pathname + window.location.hash });
      try {
        navigator.sendBeacon(GATEWAY, new Blob([payload], { type: 'text/plain' }));
      } catch (error) {
        // im lặng
      }
    }

    // Bắt ở thẻ gốc (capture) để báo được cả lượt bấm bằng chuột phải / phím
    // tắt — không chặn mặc định nên không ảnh hưởng tới việc mở tab mới.
    document.addEventListener('click', function (event) {
      var target = event.target.closest ? event.target.closest('[data-dl]') : null;
      if (target) report();
    }, true);
  })();

  /* ----------------------------------------------------------------------
     5. Cuộn mượt tới anchor + đưa focus về đích
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
     6. Reveal — luôn có lưới an toàn, không bao giờ ẩn vĩnh viễn
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
     7. Đánh dấu mục đang xem
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
