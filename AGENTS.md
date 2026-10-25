# CNTaxTools landing workspace

## Repository / deploy
- This workspace is Datkep92/cntaxtools-landing, branch master. Work here, not in a temporary clone. Change repository state only through Apelin git tools.
- Static HTML/CSS/JS: no compiler, npm, Theos, SDK or package build required. GitHub Pages deploys master at https://datkep92.github.io/cntaxtools-landing/.
- Root index.html, assets/css/style.css, assets/js/main.js and assets/js/admin.js provide the landing UI. phan-loai-hoa-don/index.html is the separate built organizer tool. It has a strict inline CSP; do not load the landing stylesheet globally into it.
- Bump the stylesheet/script query version in index.html after changes to avoid stale browser cache.

## Run / test
- Serve locally: `python3 -m http.server 8765 --bind 127.0.0.1` from the root.
- Open http://127.0.0.1:8765/tests/layout.html in Safari. It uses real WebKit iframe viewports at 320, 375, 390, 768, 1024, 1280, 1440 and 1920px, testing header hit regions, overflow, mobile menu open/scroll/close, admin modal focus/ESC/backdrop and admin SVG sizes. It is noindex and must not enter sitemap.
- Also test the main page directly with dedicated UI tools: Safari portrait, tap hamburger, scroll menu to the admin card, close menu, inspect the admin section. Capture actual screenshots, not only HTTP results.
- Desktop iframe layout tests are NOT a physical Windows/macOS or Chrome test; state this distinction in reports.

## Confirmed identity / contacts
- Facebook admin display name: Nguyễn Đạt. linhnhaxac.vn is a URL slug, not the person's name.
- Intentionally display Zalo number 0395995035, but link to https://zalo.me/0932155035, per user correction.
- Mobile admin info belongs at the bottom of the menu; desktop uses an accessible person-icon modal. Do not add another admin button to the narrow mobile header.
