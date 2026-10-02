# CN Tax Tools — Landing Page 2026 (bản gọn)

Trang landing page tĩnh bán ứng dụng **CN Tax Tools** — công cụ hỗ trợ kế toán hộ kinh doanh và công ty.
Không framework, không build step, không phụ thuộc mạng ngoài.

> **🌐 Đang chạy:** <https://datkep92.github.io/cntaxtools-landing/>
> **📋 Đưa lên Google:** xem [SEARCH-CONSOLE.md](SEARCH-CONSOLE.md) — 6 bước, tầm 10 phút

---

## 0. Công cụ trong repo

| Lệnh | Việc |
| --- | --- |
| `node tools/set-domain.cjs <ten-mien> [--slug <repo>] [--sub www]` | Đổi URL gốc trong cả 3 file cùng lúc |
| `node tools/check-contrast.cjs` | Kiểm 39 cặp màu đạt WCAG AA ở light + dark mode |
| `node tools/gsc.cjs <lenh>` | Thao tác Google Search Console từ terminal |

```powershell
# Ví dụ: đổi sang tên miền riêng
node tools/set-domain.cjs cntaxtools.vn
```

### Search Console từ terminal

```powershell
node tools/gsc.cjs list                # property nào đang có trong tài khoản
node tools/gsc.cjs submit               # gửi sitemap.xml
node tools/gsc.cjs status /             # trạng thái index của trang chủ
node tools/gsc.cjs perf                 # lượt click / hiển thị 30 ng��y qua
node tools/gsc.cjs perf 7 "kéo hóa đơn" # lọc theo từ khoá
```

Cài đặt một lần (xem `SEARCH-CONSOLE.md` mục 7 để biết vì sao cần 2 bước này):

```powershell
gcloud auth application-default login --scopes=openid,https://www.googleapis.com/auth/webmasters
gcloud services enable searchconsole.googleapis.com --project=hddt-49af7
```

---

## 1. Cấu trúc trang (6 khối, ngắn gọn)

| # | Khối | Nội dung |
| --- | --- | --- |
| 1 | **Hero** | Định vị: kéo hóa đơn từ Tổng cục Thuế, đối chiếu sao kê cho kế toán |
| 2 | **Slide giao diện** | 4 slide: quản lý MST · tải hóa đơn · hàng hóa & tồn kho · sao kê & công nợ |
| 3 | **Hai nhóm người dùng** | 2 thẻ: Hộ kinh doanh · Kế toán — mỗi thẻ gồm danh sách nhu cầu + dải "ứng dụng cho bạn" |
| 4 | **Đang phát triển** | 6 tính năng đang xây dựng + kênh gửi yêu cầu |
| 5 | **CTA cuối** | Tải ứng dụng / nhắn Zalo |
| 6 | **Footer** | Liên kết + liên hệ |

### Khối 3 — chia theo đúng hai nhóm khách hàng

| | **Hộ kinh doanh**<br><small>Chủ hộ, chủ doanh nghiệp</small> | **Kế toán**<br><small>Phụ trách nhiều MST</small> |
| --- | --- | --- |
| Cần | Số lượng hàng hóa còn lại trong kho<br>Dòng tiền vào – ra trong kỳ<br>Đã chạm ngưỡng thuế kê khai chưa *(đang xây dựng)*<br>Còn nợ ai, và ai còn nợ mình | Số liệu đầy đủ để lên báo cáo<br>Kiểm tra thông tin giao dịch giữa hóa đơn và sao kê<br>Tạo và cập nhật sổ công nợ<br>Kéo hóa đơn hàng loạt cho nhiều MST |
| Ứng dụng cho bạn | Mọi hóa đơn về một kho chung, tự tách thành dòng hàng hóa, cập nhật tồn kho và công nợ theo từng lần tải | Tự giải CAPTCHA, tự khớp từng dòng sao kê với hóa đơn và báo dòng lệch, xuất file Excel đúng mẫu MISA |

Hai thẻ xuống hàng dưới 860px, song song từ 860px. Nhờ `.who-list { flex: 1 }` + `.who-note { margin-top: auto }` nên hai dải "ứng dụng cho bạn" luôn **thẳng hàng nhau** ở đáy dù nội dung dài khác nhau.

**Cố ý không có:** bảng giá, dùng thử 30 ngày, cảm nhận khách hàng, FAQ, so sánh "cách làm thủ công", hướng dẫn 3 bước.
Ứng dụng đang được phát triển nên không công bố giá.

---

## 2. Chạy thử

```powershell
cd landing-v4
python -m http.server 8000     # hoặc:  npx serve .
```

Mở <http://localhost:8000>. Kiểm tra mobile: F12 → Toggle device toolbar (Ctrl+Shift+M).

---

## 2b. Nút tải — tự dò bản mới nhất

Nút tải **không** ghim cứng đường dẫn. Trong HTML, `href` trỏ sẵn về
`github.com/Datkep92/HoaDonNhe/releases/latest` — GitHub tự chuyển hướng tới
bản mới nhất, nên **ngay cả khi JavaScript bị chặn hay mạng lỗi, nút vẫn tải đúng
bản mới** (chỉ mất tiện lợi là phải bấm thêm một lần ở trang Releases).

Có JS thì `assets/js/main.js` (mục 4) tra `api.github.com` để lấy thẳng link file:

| Việc | Cách làm |
| --- | --- |
| Chọn đúng tệp | Khớp `CN-Tax-Tools-Setup-vX.Y.Z.exe` — bỏ qua `.sha256`, bỏ qua bản payload `CN-Tax-Tools-vX.Y.Z.exe` (dùng cho self-update, không phải để cài) |
| Đổi số phiên bản | Mọi nhãn `data-dl-ver` tự cập nhật: `v1.0.9` → `v1.0.10` |
| Bấm khi API chưa về | Chặn sự kiện, chờ tối đa 3 giây rồi mới chuyển trang — không mất lượt tải |
| Cache | `localStorage` 30 phút (GitHub giới hạn 60 lượt/giờ cho request không đăng nhập) |
| An toàn | Chỉ nhận link `https` của chính repo phát hành; cache hết hạn hoặc trỏ repo khác thì bỏ qua |
| Không có mạng | Mọi lỗi đều rơi về `href` dự phòng, không hiện lỗi ra màn hình |

> **Khi phát hành bản mới:** không cần sửa gì trên trang. Đổi tag release trong
> `HoaDonNhe` là nút tải và số phiên bản tự cập nhật trong vòng 30 phút.
> Riêng `softwareVersion` trong JSON-LD vẫn ghi tay trong `index.html` — sửa nếu muốn khớp.

---

## 2c. Thông báo trên điện thoại (nhắc nhở, không chặn tải)

Ứng dụng chỉ có bản cài **Windows 10/11 64-bit** — tệp `.exe` không chạy được
trên iOS/Android. Khi khách bấm nút tải trên điện thoại, `assets/js/main.js`
(mục 4a) hiện một thông báo nhỏ `#mnotice` ở đáy màn hình nhắc họ mở trang bằng
máy tính — **nhưng vẫn tải bình thường**, không chặn.

> Vì sao không chặn: trước đây dùng `<dialog>` + `showModal()` chặn lần bấm đầu.
> Khách phải bấm lần hai mới tải được, và nhiều người tưởng trang lỗi nên bỏ luôn.
> Nhiều khách muốn tải file `.exe` về máy để chuyển qua Zalo/USB sang máy tính,
> nên cấm tải là cắt mất nhu cầu thật. Nay chỉ nhắc, không cản.

| Việc | Cách làm |
| --- | --- |
| Nhận biết điện thoại | UA (`Android`/`iPhone`/`Mobile`…) + tín hiệu con trỏ `hover: none` / `pointer: coarse` |
| Không bắt nhầm iPad | iPadOS báo UA là `Macintosh` — có `maxTouchPoints > 1` thì coi như desktop, vẫn cài app Windows được |
| Không mất lượt tải | Handler bắt ở thẻ gốc nhưng **không** gọi `preventDefault()` — click đi tiếp như bình thường |
| Không lặp lại mỗi lần bấm | Hiện một lần rồi ẩn trong 24 giờ (`localStorage`, key `cntax.oswarn.shown`) |
| Không mất focus | Toast dùng `role="status" aria-live="polite"`, không khoá nền, không nuốt focus như modal |
| Tự ẩn | Sau 9 giây, hoặc bấm nút **✕** |
| Bỏ qua thông báo | Ctrl-click, chuột phải, mở tab mới → vẫn được tải, chỉ không bắt buộc đóng gì |

Vì sao không dùng `<dialog>` nữa: `showModal()` khoá nền và giữ focus trong hộp —
đúng cái cảm giác "bị chặn" mà yêu cầu cần bỏ. Toast chỉ hiện trên chính nó
(`pointer-events` mặc định), nên mọi thao tác bên dưới vẫn bấm được bình thường.

Vị trí toast dính đáy, tự nhích lên khi có dock (dock chỉ hiện ở `<1001px`), và
`z-index: 70` — cao hơn dock (45) lẫn header (50) nên không bị đè. Màu sắc lấy từ
biến CSS sẵn có nên tự đúng ở cả chế độ sáng lẫn tối.

> Chỉ cần sửa `index.html` (khối `<div class="mnotice">`) và `assets/js/main.js`
> (IIFE `mobileNotice`) nếu muốn đổi nội dung thông báo.

---

## 3. Deploy lên GitHub Pages

### Cách A — dùng workflow có sẵn trong repo này

File `.github/workflows/pages.yml` tự deploy mỗi khi push vào `main` mà có thay đổi trong `landing-v4/`.

```powershell
git add landing-v4 .github/workflows/pages.yml
git commit -m "landing: rut gon, them slide demo giao dien"
git push origin main
```

Sau đó vào **Settings → Pages → Source: GitHub Actions**.

### Cách B — tách repo riêng (khuyến nghị cho landing)

```powershell
cd ..
git clone --depth 1 https://github.com/<tai-khoan>/<repo-landing>.git cntaxtools-landing
robocopy "hoadon_auto_clicker_v2\landing-v4" cntaxtools-landing /MIR
cd cntaxtools-landing
git add .
git commit -m "CN Tax Tools landing"
git push
```

Rồi **Settings → Pages → Source: Deploy from a branch → main / (root)**.

### Cách C — Cloudflare Pages / Netlify / Vercel

| Nền tảng | Build command | Publish directory |
| --- | --- | --- |
| Cloudflare Pages | *(để trống)* | `landing-v4` |
| Netlify | *(để trống)* | `landing-v4` |
| Vercel | *(để trống)* | `landing-v4` |

---

## 4. Trước khi lên domain thật

Đổi URL gốc bằng script (sửa đồng thời `canonical`, `og:url`, `hreflang`, toàn bộ
URL trong JSON-LD, `robots.txt`, `sitemap.xml` — không sót chỗ nào):

```powershell
node tools/set-domain.cjs cntaxtools.vn
```

Nếu thích làm tay: tìm `datkep92.github.io` trong `index.html`, `robots.txt`,
`sitemap.xml` → thay bằng domain của bạn. Dùng Notepad **Save as → UTF-8**,
không dùng UTF-16.

### ⚠️ Token xác minh sẽ phải lấy lại

Mỗi property trong Search Console có token riêng. Token
`_ym4zbT-vyDN5vEuqdj5oLXCSZIKvVM84SHVmLxIJL8` **chỉ dùng cho `github.io`**, sang
tên miền mới thì vô hiệu.

Cần làm lại: thêm property mới trong Search Console → lấy token → thay ở **hai**
chỗ:

| Chỗ | File |
| --- | --- |
| Thẻ meta | `index.html`, trong `<head>` |
| File HTML | `google-site-verification.html` (thay cả nội dung file) |

Nội dung cần thay bằng thông tin thật:

| Chỗ | Hiện tại | Cần làm |
| --- | --- | --- |
| Số điện thoại (4 chỗ) | `039.599.5035` | SĐT thật của bạn |
| Fanpage / kênh YouTube | link trang chủ | Link thật |
| 4 slide demo | số liệu ví dụ | Nên thay bằng ảnh chụp thật (xem mục 5) |
| Danh sách "Đang phát triển" | 6 mục | Cập nhật theo tiến độ thật |

---

## 5. Muốn thay slide bằng ảnh chụp thật

Hiện 4 slide được dựng bằng HTML/CSS nên sắc nét ở mọi kích thước và không tốn băng thông.
Nếu muốn dùng ảnh PNG thật, thay mỗi `<div class="slide__in">…</div>` bằng:

```html
<img class="slide__img" src="assets/img/shot-mst.png" alt="Giao diện quản lý nhiều MST"
     width="1120" height="496" loading="lazy" decoding="async">
```

rồi thêm CSS:

```css
.slide__img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top center; }
```

Giữ nguyên chiều cao `.deco__vp` để 4 slide vẫn chồng tuyệt đối, trang không bị dài ra.

---

## 6. Những gì đã tối ưu

**Ít cuộn**
- Trang rút từ **12.178px → 4.987px** (giảm 59%) so với bản đầy đủ
- 4 slide xếp chồng `position: absolute` trong **một khung cao cố định** → chuyển slide không làm trang dài thêm
- Bỏ 5 khối không còn liên quan (giá, trial, cảm nhận, FAQ, so sánh thủ công)

**Slide**
- Tự chạy 6,5s · dừng khi rê chuột / tab ẩn / đang focus
- Vuốt ngang trên cảm ứng · nút ← → · phím mũi tên · 4 nút chấm
- Caption đổi theo slide
- `role="tablist"` + `aria-current` + `aria-roledescription="slide"`

**Mobile**
- H1 61 ký tự được hạ cỡ chữ riêng dưới 480px → **3 dòng trên mobile, 2 dòng trên desktop**
- Cụm tô màu trong H1 **không dùng `white-space: nowrap`** — khi không vừa sẽ tràn ra ngoài khung rồi bị `overflow-x: hidden` cắt mất chữ. Để xuống dòng tự nhiên an toàn hơn
- Bố cục 1 cột dưới 1024px, 2 cột (sidebar + nội dung) từ 1024px
- Khung slide cao bậc thang `436 → 452 → 496px` khớp đúng mốc bố cục
- Dòng bảng thứ 3 + ghi chú chi tiết ẩn dưới 1024px để **không slide nào bị cắt nội dung**
- **Hai nút CTA luôn nằm cùng một hàng** (`flex: 1 1 0` + nhãn rút gọn) từ 320px trở lên
- Menu trượt đáy màn hình, đóng bằng ✕ · burger · bấm ngoài · ESC
- Thanh tải nhanh cố định đáy (dựa trên `env(safe-area-inset-bottom)`)
- Không tràn ngang ở bất kỳ bề rộng nào

**Kỹ thuật**
- 1 CSS + 1 JS + icon SVG nội tuyến (sprite `<symbol>`)
- Không webfont, không thư viện, không tracking
- Đường dẫn tương đối → chạy được ở mọi nơi, kể cả subpath GitHub Pages

**A11y & SEO**
- Lighthouse Accessibility / Best Practices / SEO đều **1.0**
- Skip link, `aria-*` cho slide / menu, `:focus-visible`
- Open Graph + Twitter Card + JSON-LD `SoftwareApplication` + `BreadcrumbList`
- `sitemap.xml`, `robots.txt`, `manifest`, trang 404 riêng

**Dark mode**
- Tự theo hệ điều hành, có token riêng + `--on-brand` để chữ trên nút luôn đọc được
- Rule dark-mode cho thành phần nằm ở **cuối file** (xem cảnh báo bên dưới)

---

## 7. ⚠️ Hai chỗ dễ sửa sai

**1. Không đặt `backdrop-filter` / `filter` / `transform` lên `.hdr`.**
Ba thuộc tính đó khiến `.hdr` thành **containing block** cho phần tử `position: fixed` con.
Menu trượt sẽ bị neo vào khung header 62px thay vì đáy màn hình, rồi phủ lên nút burger khiến **không đóng được**.
Hiệu ứng blur đang đặt trên `.hdr::before` — pseudo-element không có phần tử con nên không gây vấn đề này.

**2. Rule dark-mode cho thành phần phải nằm ở cuối `style.css`.**
Các rule cùng độ ưu tiên sẽ bị rule đứng sau đè. Đặt `.tag--ok { … }` trong dark-mode ở giữa file thì
rule light phía dưới vẫn thắng và nhãn sẽ sáng khi nền tối.

---

## 8. Kết quả kiểm thử

| Hạng mục | Kết quả |
| --- | --- |
| Lighthouse A11y / Best Practices / SEO | **1.0 / 1.0 / 1.0** — 0 lỗi |
| Slide bị cắt nội dung | 0 (12 bề rộng × 4 slide) |
| Số dòng H1 | 3 dòng ≤480px · 2 dòng >480px |
| Tràn ngang 320 → 1440px | 0px |
| Vùng chạm < 24px | 0 |
| Tương phản dark mode | đạt AA |
| Lỗi console | 0 |
| Còn nhắc "dùng thử 30 ngày" / bảng giá | không có |
| Icon SVG không dùng | 0 |
| Rule CSS của lớp đã bỏ | 0 |

Đã kiểm thử: menu trượt (4 cách đóng), slide (tự chạy / nút / vuốt / phím), reveal, thanh cuộn, dock, JSON-LD, anchor.

Trình duyệt: Chrome/Edge 120+, Firefox 121+, Safari 17+ (iOS & macOS).
