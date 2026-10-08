# softnine

소프트나인 회사 홈페이지 — https://www.softnine.co.kr

정적 사이트(HTML/CSS)이며 GitHub Pages로 배포합니다.

## 구성
- `index.html` — 메인 페이지 (소개 / 제품 / 문의)
- `assets/style.css` — 스타일
- `CNAME` — 커스텀 도메인 (`www.softnine.co.kr`)

## 배포
Settings › Pages › Source: **Deploy from a branch**, Branch: `main` / `(root)`.
`main`에 푸시하면 1~2분 내 반영됩니다.

## DNS (도메인 구입처)
| 호스트 | 타입 | 값 |
|---|---|---|
| www | CNAME | softnine217.github.io |
| @ | A | 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153 |
