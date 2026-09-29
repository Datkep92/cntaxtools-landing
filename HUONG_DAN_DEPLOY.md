# Hướng dẫn deploy CN Tax Tools Landing Page lên GitHub

## Tổng quan

Landing page chuyên nghiệp để quảng cáo và bán ứng dụng CN Tax Tools.

## Cấu trúc files

```
landing-page/
├── index.html              # Trang chính
├── styles.css              # Styles chính
├── script.js               # JavaScript
├── .nojekyll               # Bỏ qua Jekyll processing
├── .gitignore              # Files bỏ qua khi commit
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── assets/                 # Hình ảnh, icons
│   ├── app-screenshot.svg
│   ├── avatar-1.svg
│   ├── avatar-2.svg
│   └── avatar-3.svg
├── README.md               # Hướng dẫn cơ bản
├── DEPLOY.md               # Hướng dẫn deploy chi tiết
├── QUICKSTART.md           # Hướng dẫn nhanh
└── HUONG_DAN_DEPLOY.md     # File này
```

## Cách deploy nhanh nhất

### Bước 1: Tạo repository trên GitHub

1. Đăng nhập vào GitHub
2. Click nút **New** để tạo repository mới
3. Đặt tên repository: `cntaxtools-landing` (hoặc tên bạn muốn)
4. Chọn **Public** (bắt buộc cho GitHub Pages miễn phí)
5. KHÔNG chọn "Add README" (vì chúng ta đã có sẵn)
6. Click **Create repository**

### Bước 2: Push code lên GitHub

Mở terminal (PowerShell/CMD) và chạy các lệnh sau:

```bash
cd "C:\Users\cana2\OneDrive\Desktop\hoadon_auto_clicker_v2\desktop - Copy - Copy\landing-page"

git init
git add .
git commit -m "CN Tax Tools landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cntaxtools-landing.git
git push -u origin main
```

**Lưu ý:** Thay `YOUR_USERNAME` bằng username GitHub của bạn.

### Bước 3: Bật GitHub Pages

1. Vào repository vừa tạo trên GitHub
2. Click **Settings** (tab cùng cấp với Code, Issues, Pull requests...)
3. Menu bên trái, click **Pages**
4. Phần **Source**: chọn **GitHub Actions** (không phải "Deploy from a branch")
5. GitHub sẽ tự động deploy khi có push lên nhánh main

### Bước 4: Truy cập website

Sau khi deploy (khoảng 1-2 phút), truy cập:

```
https://YOUR_USERNAME.github.io/cntaxtools-landing/
```

## Cập nhật website

Mỗi khi bạn sửa code và muốn cập nhật:

```bash
git add .
git commit -m "Update landing page"
git push
```

GitHub sẽ tự động deploy lại trong vài phút.

## Kiểm tra deploy

- Vào repository > tab **Actions**
- Click vào workflow run để xem log
- Nếu thành công, website sẽ được cập nhật

## Lỗi thường gặp

### Lỗi 404 khi truy cập
- Kiểm tra đã bật GitHub Pages chưa
- Kiểm tra tên repository có đúng không
- Đợi 1-2 phút sau khi bật

### Lỗi CSS/JS không tải
- Kiểm tra đường dẫn file trong HTML có đúng không
- Mở DevTools (F12) > Console để xem lỗi

### Lỗi push lên GitHub
- Kiểm tra đã cài Git chưa: `git --version`
- Kiểm tra đã đăng nhập GitHub chưa
- Thử lệnh: `git remote -v` để xem remote URL

### Lỗi GitHub Actions
- Vào tab **Actions** để xem log lỗi
- Kiểm tra file `deploy.yml` có đúng cú pháp không

## Xóa website

Vào repository > Settings > Pages > Source: chọn **None** > Save

## Custom domain (tuỳ chọn)

1. Vào repository > Settings > Pages
2. Phần **Custom domain**: nhập domain của bạn
3. Cập nhận DNS theo hướng dẫn của GitHub

## Liên hệ hỗ trợ

- Zalo: 039.599.5035
- GitHub: https://github.com/Datkep92/CnTaxTools
