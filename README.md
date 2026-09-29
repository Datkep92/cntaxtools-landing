# CN Tax Tools - Landing Page

Landing page chuyên nghiệp để quảng cáo và bán ứng dụng CN Tax Tools.

## Công nghệ

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript
- Google Fonts (Inter)
- GitHub Pages

## Cấu trúc

```
landing-page/
├── index.html          # Trang chính
├── styles.css          # Styles chính
├── script.js           # JavaScript
├── .nojekyll           # File để GitHub Pages không dùng Jekyll
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
└── README.md           # File này
```

## Deploy lên GitHub Pages

### Cách 1: Deploy thủ công

1. Tạo repository mới trên GitHub
2. Push code lên repository:
   ```bash
   cd landing-page
   git init
   git add .
   git commit -m "Initial landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cntaxtools-landing.git
   git push -u origin main
   ```
3. Vào repository > Settings > Pages
4. Source: Deploy from a branch
5. Branch: main / Root
6. Save

### Cách 2: Deploy tự động với GitHub Actions

1. Tạo repository mới trên GitHub
2. Push code lên repository (bao gồm cả file `.github/workflows/deploy.yml`)
3. GitHub sẽ tự động deploy khi có push lên nhánh main
4. Vào repository > Settings > Pages để xem URL

## Truy cập

Sau khi deploy, truy cập: `https://YOUR_USERNAME.github.io/cntaxtools-landing/`

## Liên hệ

- Zalo: 039.599.5035
- GitHub: https://github.com/Datkep92/CnTaxTools
