# Website 1.9.4 — 13/11/2026

- Cây riêng: `artifacts/release-1.9.4/landing`, nhánh `codex/release-1.9.4-landing`, nền `8a62ba8`.
- Liên kết tải hiện tại, lựa chọn Setup/EXE, sao chép link, hướng dẫn và dữ liệu có cấu trúc thống nhất 1.9.4. Giữ nguyên nội dung lịch sử 1.9.3 trở xuống.
- Giữ sáu ảnh hướng dẫn và nội dung 1.9.4 đã chuẩn bị; không sửa giao diện công cụ phân loại/PDF độc lập.
- `node --test tests/invoice-seo.test.cjs tests/release-downloads.test.cjs`: 3/3 đạt. `git diff --check`: đạt.
- Chrome thật chạy không cửa sổ: trang chủ 1440px và 390px không tràn ngang; mọi nút tải hiện tại dẫn 1.9.4. Bộ kiểm header/menu/modal đạt 8 chiều rộng 320–1920px, không lỗi JavaScript. Đã xem ảnh hai khổ.
- Bằng chứng ngoài website: `../landing-check/final-local.json`, `final-root-1440.png`, `final-root-390.png`.
- Đây là kiểm tra website cục bộ bằng Chrome trên Windows; chưa phải Safari, thiết bị di động vật lý hoặc nghiệm thu EXE. Chưa đẩy website công khai; chỉ đẩy sau khi bản GitHub 1.9.4 và tệp tải đã được nghiệm thu.
