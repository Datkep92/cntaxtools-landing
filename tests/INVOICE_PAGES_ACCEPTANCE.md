# Hai trang công cụ hóa đơn — 27/10/2026

- `/phan-loai-hoa-don/`: khởi tạo sort, không dò bộ tải, không yêu cầu CNTaxTools. Giữ đọc XML/ZIP, chọn MST mua/bán, xác nhận trước ghi, chống trùng và cách ly xung đột.
- `/tai-pdf/`: khởi tạo PDF độc lập. Chọn thư mục XML (gồm thư mục con) hoặc nhập nhiều XML, chọn thư mục lưu, bấm tải trực tiếp. Không cần chọn MST, chạy phân loại hoặc sao chép XML. Tự lấy một bên MST trong XML cho manifest, ưu tiên bên chung; không tạo hồ sơ trong ứng dụng.
- HTML ngoại tuyến có hai tệp riêng và SHA-256. Mỗi điểm vào chạy được một mình. Các liên kết chuyển công cụ là điều hướng sang trang khác; không chuyển tiếp trạng thái hay dữ liệu.
- Source/build: `D:/Projects/cntaxtools-organizer`, tools/build.cjs. Landing được dựng bằng `node tools/build-invoice-pages.cjs D:/Projects/cntaxtools-organizer/dist`, giữ shell/CSP/menu; theme riêng trong tools/invoice-site.css. Không nhập stylesheet landing vào công cụ.
- 10 unit/build/bridge tests đạt. Chrome fixture đạt: trang PDF mới với một XML một chiều; nhập nhiều XML; thư mục con; cùng key/hash, key khác nội dung; 121 người bán cùng người mua chỉ dùng một chủ thể manifest; PDF đã có, thiếu mã, xem trước; ngưng trong khi ghép nối; phân loại chạy lại không trùng và hủy không ghi.
- Chrome qua CompanionService/HTTP/MessageChannel thật trong mã CNTaxTools, PDF và quyền sử dụng là fixture: tải/ghi/đọc lại/xem trước và ACK đạt. Không coi là tải thực tế nhà cung cấp hoặc kiểm bản quyền bằng tài khoản thật.
- Hai bộ kiểm landing đạt 9 chiều rộng 320–1920, menu, điều hướng hai URL, trạng thái kết nối và đầu vào PDF. Đã xem ảnh PC/mobile; có sửa chồng nút tại 320px. Không có Safari/thiết bị di động thật.
- Chưa kiểm mọi nhà cung cấp thật. Giữ nguyên giới hạn bridge đang có: 100 chủ thể MST, 10.000 hóa đơn/lượt; không nới quyền, cookie hoặc API backend. Trang PDF vẫn cần bộ tải CNTaxTools đang chạy và quyền mạng cục bộ/cửa sổ của trình duyệt.
- Bằng chứng local: HoaDonNhe/artifacts/split-landing-acceptance.json, separate-pdf-native.log; cntaxtools-organizer/artifacts/separate-unit.log, separate-browser.log. Chỉ fixture, không dùng dữ liệu khách.
