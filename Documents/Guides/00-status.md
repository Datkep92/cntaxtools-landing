# Trạng thái CNTaxTools landing

## 17/11/2026 — chuyển tên miền và Search Console

- Nguồn chuẩn trước sửa: GitHub master 237f69991608a72a7cafe6d802fce16cad0d4a10. Có tiện ích Tawk.to trên trang chủ; giữ nguyên.
- GoDaddy CLI đã đổi A @ về bốn IP GitHub Pages và CNAME www về datkep92.github.io. Đã đọc lại API và DNS công cộng.
- GitHub Pages đã gắn cntaxtools.com. GitHub tự tạo CNAME.
- Google Site Verification đã xác minh cntaxtools.com bằng DNS TXT. Search Console trả siteOwner cho sc-domain:cntaxtools.com.
- Bản sửa dùng tên miền mới trong canonical, hreflang, dữ liệu mô tả, sitemap, robots và bộ tạo trang công cụ.
- Sửa softwareVersion từ 1.9.5 thành 1.9.6 để khớp bản tải hiện có. Lỗi này đã tái hiện trên bản trước sửa.
- Kiểm tra bản chuẩn bị: node --test tests/invoice-seo.test.cjs tests/release-downloads.test.cjs đạt 3/3.
- Chờ: xuất bản bản sửa, HTTPS GitHub, gửi và đọc lại sitemap Google. Chưa xác nhận giao diện bằng trình duyệt trong phiên này.
- Không lưu thông tin đăng nhập trong kho. Không xoá mục Search Console cũ.
