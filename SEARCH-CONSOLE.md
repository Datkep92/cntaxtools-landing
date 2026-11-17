# Google Search Console — CNTaxTools

Cập nhật: 17/11/2026.

## Địa chỉ chính

- Website: https://cntaxtools.com/
- Sitemap: https://cntaxtools.com/sitemap.xml
- Search Console: sc-domain:cntaxtools.com
- Kho nguồn: Datkep92/cntaxtools-landing, nhánh master.

## Đã kiểm bằng API Google

- Đã xác minh tên miền cntaxtools.com bằng bản ghi DNS TXT của Google.
- Search Console trả về quyền siteOwner cho sc-domain:cntaxtools.com.
- Giữ mục địa chỉ GitHub cũ để theo dõi việc chuyển trang.
- Không dùng công cụ Đổi địa chỉ cho mục cũ ở đường dẫn /cntaxtools-landing/; Google không hỗ trợ chuyển từ mục có đường dẫn như vậy.

## Website

Địa chỉ chính, dữ liệu mô tả trang, sitemap, robots và bộ tạo trang công cụ dùng https://cntaxtools.com/. Không đổi các liên kết tải ứng dụng hoặc tiện ích chat. Bản sửa mô tả đúng phiên bản ứng dụng 1.9.6 đang được tải.

## Xác minh và gửi sitemap

- Giữ bản ghi google-site-verification trong DNS. Không xoá sau khi đã xác minh.
- Gửi sitemap trên mục sc-domain:cntaxtools.com sau khi nội dung công khai đã cập nhật đúng địa chỉ và HTTPS hoạt động.
- Gửi sitemap thành công nghĩa là Google đã nhận yêu cầu, không phải Google đã lập chỉ mục toàn bộ website.
- Google tự quyết định thời điểm thu thập và hiển thị trang trong kết quả tìm kiếm.

## Truy cập bằng CLI

Dùng Google Cloud CLI để đăng nhập rồi gọi REST API Search Console và Site Verification. API yêu cầu đúng quyền và tiêu đề x-goog-user-project cho dự án hddt-49af7. Không lưu hoặc in mật khẩu, access token hay refresh token vào tài liệu/kho Git.

Phiên xử lý này dùng cấu hình Google tách biệt trong thư mục công việc của chat; không đổi tài khoản Google Cloud mặc định.

## Cần kiểm sau khi xuất bản

1. GitHub Pages hoàn tất và địa chỉ cũ chuyển về đúng trang mới.
2. Chứng chỉ HTTPS hợp lệ, bật chuyển hướng bắt buộc dùng HTTPS.
3. Sitemap và robots công khai dùng tên miền mới.
4. Gửi sitemap bằng API Google, đọc lại trạng thái nhận và lỗi của sitemap.
5. Theo dõi báo cáo lập chỉ mục trong Search Console.

Tài liệu chính thức:
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://support.google.com/webmasters/answer/9370220
- https://developers.google.com/webmaster-tools/v1/sitemaps/submit
- https://developers.google.com/site-verification/v1/webResource/insert
