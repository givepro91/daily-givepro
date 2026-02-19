# Plan: 수익화 블로그 (Monetized Blog)

> 작성일: 2026-02-19
> 상태: Draft
> 레벨: Starter (Static Blog + Monetization)

---

## 1. 프로젝트 개요

### 1.1 목표
SEO에 최적화된 개인 블로그를 구축하여 Google AdSense와 제휴 마케팅(쿠팡파트너스 등)을 통해 수익을 창출한다.

### 1.2 핵심 가치
- **무료 운영**: Vercel 무료 플랜으로 호스팅 비용 $0
- **SEO 최적화**: 검색 엔진 상위 노출로 유기적 트래픽 확보
- **수익화 구조**: 광고 + 제휴 마케팅 이중 수익 모델
- **콘텐츠 중심**: MDX 기반으로 글 작성에 집중할 수 있는 구조

### 1.3 대상 사용자
- 블로그 운영자 본인 (1인 운영)
- 블로그 방문자 (검색 유입 + 직접 방문)

---

## 2. 기술 스택

| 영역 | 기술 | 선택 이유 |
|------|------|-----------|
| **프레임워크** | Next.js 15 (App Router) | SSG/SSR 지원, SEO 최적화, React 생태계 |
| **스타일링** | Tailwind CSS 4 | 빠른 개발, 반응형 내장, 번들 최소화 |
| **콘텐츠** | MDX (contentlayer 또는 next-mdx-remote) | 마크다운 + React 컴포넌트 조합 |
| **호스팅** | Vercel (무료) | Next.js 공식 지원, 자동 배포, CDN |
| **분석** | Google Analytics 4 | 트래픽 분석, 수익화 최적화 데이터 |
| **광고** | Google AdSense | 자동/수동 광고 배치 |
| **제휴** | 쿠팡파트너스, 아마존 어필리에이트 | 제품 리뷰/추천 수익 |

---

## 3. 핵심 기능 목록

### 3.1 Must Have (MVP)

| # | 기능 | 설명 | 우선순위 |
|---|------|------|----------|
| F1 | **블로그 포스트 시스템** | MDX 기반 글 작성, 카테고리/태그 분류 | P0 |
| F2 | **SEO 최적화** | 메타태그, OG 이미지, sitemap.xml, robots.txt | P0 |
| F3 | **반응형 레이아웃** | 모바일/태블릿/데스크톱 대응 | P0 |
| F4 | **Google AdSense 연동** | 광고 컴포넌트, 자동 광고 스크립트 | P0 |
| F5 | **제휴 링크 컴포넌트** | 제품 카드, 추천 링크 관리 | P0 |
| F6 | **RSS 피드** | 구독자 확보용 RSS/Atom 피드 | P1 |

### 3.2 Should Have (v1.1)

| # | 기능 | 설명 | 우선순위 |
|---|------|------|----------|
| F7 | **다크 모드** | 시스템 설정 연동 테마 전환 | P1 |
| F8 | **목차(TOC)** | 긴 글에서 자동 생성 목차 | P1 |
| F9 | **관련 글 추천** | 태그 기반 관련 포스트 표시 | P1 |
| F10 | **검색 기능** | 클라이언트 사이드 전문 검색 | P2 |

### 3.3 Nice to Have (v1.2)

| # | 기능 | 설명 | 우선순위 |
|---|------|------|----------|
| F11 | **뉴스레터 구독** | 이메일 수집 (Mailchimp 등) | P2 |
| F12 | **댓글 시스템** | Giscus (GitHub Discussions 기반) | P2 |
| F13 | **조회수 표시** | 인기 글 표시용 | P3 |

---

## 4. 페이지 구조

```
/                       → 홈 (최신 글 목록 + 인기 글)
/blog                   → 전체 글 목록 (페이지네이션)
/blog/[slug]            → 개별 포스트 (광고 + 제휴 링크 배치)
/category/[category]    → 카테고리별 글 목록
/tag/[tag]              → 태그별 글 목록
/about                  → 소개 페이지
/sitemap.xml            → 사이트맵 (자동 생성)
/robots.txt             → 크롤러 설정
/feed.xml               → RSS 피드
```

---

## 5. 수익화 전략

### 5.1 Google AdSense 배치 계획

| 위치 | 광고 유형 | 설명 |
|------|-----------|------|
| 헤더 하단 | 배너 광고 (728x90) | 페이지 상단 노출 |
| 본문 중간 | 인피드 광고 | 자연스러운 콘텐츠 사이 배치 |
| 사이드바 | 디스플레이 광고 (300x250) | 데스크톱에서 고정 노출 |
| 포스트 하단 | 멀티플렉스 광고 | 관련 글과 함께 표시 |

### 5.2 제휴 마케팅 전략

- **제품 리뷰 포스트**: 상세 리뷰 + 구매 링크
- **추천 제품 컴포넌트**: 글 내 자연스러운 제품 카드 삽입
- **비교 포스트**: 제품 비교표 + 각 구매 링크
- **추적**: UTM 파라미터로 전환율 분석

---

## 6. 프로젝트 디렉토리 구조 (예상)

```
git-blog/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (AdSense 스크립트)
│   ├── page.tsx                # 홈페이지
│   ├── blog/
│   │   ├── page.tsx            # 글 목록
│   │   └── [slug]/
│   │       └── page.tsx        # 개별 포스트
│   ├── category/[category]/
│   │   └── page.tsx            # 카테고리별 목록
│   ├── tag/[tag]/
│   │   └── page.tsx            # 태그별 목록
│   ├── about/
│   │   └── page.tsx            # 소개
│   ├── sitemap.ts              # 사이트맵 자동 생성
│   ├── robots.ts               # robots.txt
│   └── feed.xml/
│       └── route.ts            # RSS 피드
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   ├── TableOfContents.tsx
│   │   └── RelatedPosts.tsx
│   ├── ads/
│   │   ├── AdBanner.tsx        # AdSense 배너
│   │   ├── InArticleAd.tsx     # 본문 중간 광고
│   │   └── AdSenseScript.tsx   # 스크립트 로더
│   └── affiliate/
│       ├── ProductCard.tsx     # 제휴 제품 카드
│       └── AffiliateLink.tsx   # 추적 링크 컴포넌트
├── content/
│   └── posts/                  # MDX 글 파일들
│       ├── my-first-post.mdx
│       └── ...
├── lib/
│   ├── mdx.ts                 # MDX 파싱 유틸
│   ├── posts.ts               # 포스트 데이터 처리
│   └── seo.ts                 # SEO 메타데이터 헬퍼
├── public/
│   ├── images/                # 이미지 리소스
│   └── og/                    # OG 이미지
├── styles/
│   └── globals.css            # Tailwind 글로벌 스타일
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. 구현 순서 (마일스톤)

### Phase 1: 기본 블로그 구조 (MVP Core)
1. Next.js 프로젝트 초기화
2. Tailwind CSS 설정
3. 기본 레이아웃 (Header, Footer, 반응형)
4. MDX 콘텐츠 시스템 구축
5. 블로그 목록/상세 페이지

### Phase 2: SEO 최적화
1. 메타태그 시스템 (title, description, OG)
2. sitemap.xml 자동 생성
3. robots.txt 설정
4. 구조화된 데이터 (JSON-LD)
5. RSS 피드

### Phase 3: 수익화 연동
1. Google AdSense 스크립트 연동
2. 광고 컴포넌트 개발 (배너, 인피드, 사이드바)
3. 제휴 링크 컴포넌트 개발
4. Google Analytics 4 연동

### Phase 4: 부가 기능
1. 다크 모드
2. 목차(TOC) 자동 생성
3. 관련 글 추천
4. 카테고리/태그 페이지

---

## 8. 비용 분석

| 항목 | 비용 | 비고 |
|------|------|------|
| Vercel 호스팅 | **무료** | Hobby 플랜 (월 100GB 대역폭) |
| 도메인 (선택) | 약 $10~15/년 | .com 기준, 없으면 .vercel.app 사용 |
| Google AdSense | **무료** | 승인 필요 (콘텐츠 10~20개 이상 권장) |
| 쿠팡파트너스 | **무료** | 가입 후 바로 사용 |
| GA4 | **무료** | Google Analytics |
| **총 비용** | **$0 ~ $15/년** | 도메인 구매 시에만 비용 발생 |

---

## 9. AdSense 승인 준비 체크리스트

- [ ] 최소 15~20개 이상의 양질의 콘텐츠
- [ ] 개인정보처리방침 페이지
- [ ] 연락처/소개 페이지
- [ ] 명확한 사이트 네비게이션
- [ ] 독창적인 콘텐츠 (복사/번역 금지)
- [ ] 커스텀 도메인 권장 (필수는 아님)

---

## 10. 리스크 및 대응

| 리스크 | 영향 | 대응 방안 |
|--------|------|-----------|
| AdSense 승인 지연 | 초기 수익 없음 | 콘텐츠 품질 확보 후 신청, 제휴 마케팅 먼저 시작 |
| Vercel 무료 한도 초과 | 서비스 중단 | 트래픽 모니터링, 이미지 최적화, CDN 활용 |
| SEO 효과 지연 | 트래픽 부족 | 장기적 콘텐츠 전략, 소셜 미디어 홍보 병행 |
| MDX 빌드 성능 | 빌드 시간 증가 | 콘텐츠 증가 시 contentlayer → velite 마이그레이션 고려 |
