# Hướng dẫn Deploy CN Tax Tools Landing Page lên GitHub

## Tổng quan

Landing page được thiết kế để deploy dễ dàng lên GitHub Pages với GitHub Actions tự động.

## Cách deploy nhanh nhất

### 1. Tạo repository trên GitHub

```bash
# Tạo repository mới trên GitHub UI hoặc dùng GitHub CLI
gh repo create cntaxtools-landing --public --clone
```

### 2. Copy files vào repository

```bash
# Copy tất cả files trong thư mục landing-page vào repository
cp -r landing-page/* cntaxtools-landing/
cd cntaxtools-landing
```

### 3. Commit và push

```bash
git add .
git commit -m "CN Tax Tools landing page"
git push origin main
```

### 4. Bật GitHub Pages

- Vào repository > Settings > Pages
- Source: **GitHub Actions** (không phải "Deploy from a branch")
- GitHub sẽ tự động deploy khi có push lên nhánh main

### 5. Truy cập website

```
https://YOUR_USERNAME.github.io/cntaxtools-landing/
```

## Cấu trúc files quan trọng

```
landing-page/
├── index.html              # Trang chính
├── styles.css              # Styles
├── script.js               # JavaScript
├── .nojekyll               # Bỏ qua Jekyll processing
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
└── assets/                 # Hình ảnh, icons
```

## GitHub Actions Workflow

File `.github/workflows/deploy.yml` đã được cấu hình sẵn:

- Trigger: khi push lên nhánh `main`
- Build: không cần build (static site)
- Deploy: tự động deploy lên GitHub Pages

## Cập nhật website

Mỗi khi sửa code:

```bash
git add .
git commit -m "Update landing page"
git push
```

GitHub sẽ tự động deploy lại trong 1-2 phút.

## Kiểm tra deploy

- Vào repository > tab **Actions**
- Click vào workflow run để xem log
- Nếu thành công, website sẽ được cập nhật

## Troubleshooting

### Lỗi 404
- Kiểm tra đã bật GitHub Pages chưa
- Kiểm tra tên repository có đúng không
- Đợi 1-2 phút sau khi bật

### Lỗi CSS/JS không tải
- Kiểm tra đường dẫn file trong HTML
- Mở DevTools (F12) > Console để xem lỗi

### Lỗi GitHub Actions
- Vào tab **Actions** để xem log lỗi
- Kiểm tra file `deploy.yml` có đúng cú pháp không

## Custom domain (tuỳ chọn)

1. Vào repository > Settings > Pages
2. Phần **Custom domain**: nhập domain của bạn
3. Cập nhận DNS theo hướng dẫn của GitHub

## Liên hệ hỗ trợ

- Zalo: 039.599.5035
- GitHub: https://github.com/Datkep92/CnTaxTools
