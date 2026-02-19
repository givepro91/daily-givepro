# Daily Givepro 수익화 진행 로그

## 현재 상태 (2026-02-19)

### 완료된 작업

| # | 항목 | 상태 | 비고 |
|---|------|------|------|
| 1 | Vercel 배포 | DONE | https://daily-givepro.vercel.app |
| 2 | SEO 최적화 | DONE | sitemap, robots, JSON-LD, canonical, OG 이미지 |
| 3 | 콘텐츠 확충 | DONE | 18개 포스트 (1000자+ 각각) |
| 4 | 접근성 개선 | DONE | skip-to-content, aria-labels, semantic HTML |
| 5 | 보안 헤더 | DONE | X-Frame-Options, X-Content-Type-Options 등 |
| 6 | 개인정보처리방침 | DONE | /privacy 페이지 |
| 7 | 커스텀 404 | DONE | /not-found 페이지 |
| 8 | AdSense 메타 태그 | DONE | ca-pub-3394566688847940 |
| 9 | AdSense GDPR 동의 메시지 | DONE | Google CMP 2가지 선택사항 |
| 10 | AdSense 소유권 인증 | DONE | 심사 요청 완료 |
| 11 | ads.txt | DONE | public/ads.txt 배포 완료 |

### 대기 중

| # | 항목 | 상태 | 비고 |
|---|------|------|------|
| A | AdSense 심사 | WAITING | 며칠~최대 2~4주 소요 |
| B | Google Analytics 4 | BLOCKED | AdSense 콘솔에서 "준비중" 표시 |

---

## 다음 스텝 (AdSense 심사 대기 중 진행 가능)

### STEP 1: Google Search Console 등록
- URL: https://search.google.com/search-console
- 방법: URL 접두어 → https://daily-givepro.vercel.app 입력
- 인증: HTML 태그 방식 → content 값 복사
- Vercel 환경변수: `NEXT_PUBLIC_GOOGLE_VERIFICATION = {복사한값}`
- 재배포 후 소유권 확인
- **사이트맵 제출**: Search Console → Sitemaps → `sitemap.xml` 입력

### STEP 2: Naver Search Advisor 등록
- URL: https://searchadvisor.naver.com
- 방법: 사이트 등록 → HTML 태그 인증 → content 값 복사
- Vercel 환경변수: `NEXT_PUBLIC_NAVER_VERIFICATION = {복사한값}`
- 재배포 후 소유권 확인
- **사이트맵 제출**: sitemap.xml
- **RSS 제출**: /feed.xml

### STEP 3: Google Analytics 4 설정 (AdSense 준비 완료 후)
- URL: https://analytics.google.com
- 방법: 속성 만들기 → 데이터 스트림 → 웹 → 사이트 URL 입력
- 측정 ID 복사 (G-XXXXXXXXXX)
- Vercel 환경변수: `NEXT_PUBLIC_GA_MEASUREMENT_ID = {측정ID}`
- 재배포

### STEP 4: AdSense 승인 후 광고 설정
- AdSense 콘솔에서 광고 단위 생성
- Vercel 환경변수 추가:
  ```
  NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-3394566688847940
  NEXT_PUBLIC_AD_SLOT_BANNER = {배너 광고 슬롯 ID}
  NEXT_PUBLIC_AD_SLOT_INARTICLE = {본문 내 광고 슬롯 ID}
  NEXT_PUBLIC_AD_SLOT_SIDEBAR = {사이드바 광고 슬롯 ID}
  ```
- 재배포 후 광고 노출 확인

### STEP 5: 제휴 마케팅 등록 (선택)
- 쿠팡 파트너스: https://partners.coupang.com
- 아마존 어소시에이트: https://affiliate-program.amazon.com
- 포스트 내 ProductCard 컴포넌트로 상품 추천 가능 (이미 구현됨)

### STEP 6: 커스텀 도메인 연결 (선택)
- Vercel Settings → Domains → 도메인 추가
- DNS 설정 후 HTTPS 자동 적용
- 연결 후 NEXT_PUBLIC_SITE_URL 환경변수 업데이트 필요

---

## 환경변수 체크리스트 (Vercel Settings → Environment Variables)

| 변수명 | 상태 | 값 |
|--------|------|-----|
| NEXT_PUBLIC_SITE_URL | SET | https://daily-givepro.vercel.app |
| NEXT_PUBLIC_SITE_NAME | SET | Daily Givepro |
| NEXT_PUBLIC_AUTHOR_NAME | TODO | 본인 이름 입력 |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | TODO | G-XXXXXXXXXX |
| NEXT_PUBLIC_GOOGLE_VERIFICATION | TODO | Search Console 인증 코드 |
| NEXT_PUBLIC_NAVER_VERIFICATION | TODO | Naver 인증 코드 |
| NEXT_PUBLIC_ADSENSE_CLIENT_ID | TODO | ca-pub-3394566688847940 |
| NEXT_PUBLIC_AD_SLOT_BANNER | TODO | AdSense 승인 후 |
| NEXT_PUBLIC_AD_SLOT_INARTICLE | TODO | AdSense 승인 후 |
| NEXT_PUBLIC_AD_SLOT_SIDEBAR | TODO | AdSense 승인 후 |
