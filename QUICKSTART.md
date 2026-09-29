# Hướng dẫn nhanh - Deploy lên GitHub

## Bước 1: Tạo repo

Tạo repository mới trên GitHub với tên: `cntaxtools-landing`

## Bước 2: Push code

```bash
cd "C:\Users\cana2\OneDrive\Desktop\hoadon_auto_clicker_v2\desktop - Copy - Copy\landing-page"

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cntaxtools-landing.git
git push -u origin main
```

## Bước 3: Bật Pages

Vào repo > Settings > Pages > Source: **GitHub Actions**

## Bước 4: Xem website

```
https://YOUR_USERNAME.github.io/cntaxtools-landing/
```

---

**Lưu ý:** Thay `YOUR_USERNAME` bằng username GitHub của bạn.
