# Design: 수익화 블로그 (Monetized Blog)

> 작성일: 2026-02-19
> 상태: Draft
> Plan 참조: `docs/01-plan/features/monetized-blog.plan.md`

---

## 1. 기술 아키텍처

### 1.1 시스템 구성도

```
┌─────────────────────────────────────────────────────────┐
│                     Vercel (CDN + Edge)                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │  Static HTML │    │  API Routes  │                   │
│  │  (SSG Pages) │    │  (RSS, etc.) │                   │
│  └──────┬───────┘    └──────┬───────┘                   │
│         │                   │                           │
│  ┌──────┴───────────────────┴───────┐                   │
│  │         Next.js App Router       │                   │
│  │   ┌───────────────────────────┐  │                   │
│  │   │     MDX Content Layer     │  │                   │
│  │   │  (content/posts/*.mdx)    │  │                   │
│  │   └───────────────────────────┘  │                   │
│  └──────────────────────────────────┘                   │
│                                                         │
│  External Services:                                     │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐              │
│  │ AdSense  │ │   GA4    │ │ 쿠팡파트너스│              │
│  └──────────┘ └──────────┘ └────────────┘              │
└─────────────────────────────────────────────────────────┘
```

### 1.2 빌드 & 렌더링 전략

| 페이지 | 렌더링 | 이유 |
|--------|--------|------|
| `/` (홈) | SSG | 빌드 시 최신 글 목록 생성 |
| `/blog` | SSG | 전체 글 목록 정적 생성 |
| `/blog/[slug]` | SSG (`generateStaticParams`) | 각 포스트 정적 생성, SEO 필수 |
| `/category/[category]` | SSG (`generateStaticParams`) | 카테고리별 목록 정적 생성 |
| `/tag/[tag]` | SSG (`generateStaticParams`) | 태그별 목록 정적 생성 |
| `/about` | SSG | 정적 페이지 |
| `/sitemap.xml` | Route Handler | 동적 사이트맵 생성 |
| `/feed.xml` | Route Handler | RSS 피드 생성 |

모든 페이지는 **SSG (Static Site Generation)** 을 기본으로 하여 Vercel 무료 플랜 최적화.

---

## 2. 데이터 모델

### 2.1 포스트 Frontmatter 스키마

```typescript
// lib/types.ts

interface Post {
  // 필수 필드
  slug: string;              // URL 슬러그 (파일명에서 자동 추출)
  title: string;             // 제목
  description: string;       // 요약 (SEO meta description)
  date: string;              // 작성일 (YYYY-MM-DD)
  category: string;          // 카테고리 (1개)
  tags: string[];            // 태그 (복수)

  // 선택 필드
  thumbnail?: string;        // 썸네일 이미지 경로
  published?: boolean;       // 발행 여부 (기본값: true)
  updatedDate?: string;      // 수정일
  readingTime?: number;      // 읽기 시간 (분, 자동 계산)

  // 수익화 필드
  enableAds?: boolean;       // 광고 표시 여부 (기본값: true)
  affiliateProducts?: AffiliateProduct[];  // 제휴 제품 목록
}

interface AffiliateProduct {
  name: string;              // 제품명
  url: string;               // 제휴 링크 URL
  image?: string;            // 제품 이미지
  price?: string;            // 가격 표시
  platform: 'coupang' | 'amazon' | 'other';  // 제휴 플랫폼
}
```

### 2.2 MDX 파일 예시

```mdx
---
title: "2026년 최고의 키보드 추천 TOP 5"
description: "개발자를 위한 기계식 키보드 추천 리스트. 실사용 후기와 함께."
date: "2026-02-19"
category: "리뷰"
tags: ["키보드", "장비", "개발환경"]
thumbnail: "/images/posts/keyboard-review.jpg"
enableAds: true
affiliateProducts:
  - name: "레오폴드 FC660M"
    url: "https://link.coupang.com/..."
    image: "/images/products/leopold.jpg"
    price: "139,000원"
    platform: "coupang"
---

# 2026년 최고의 키보드 추천 TOP 5

본문 내용...

<ProductCard product={affiliateProducts[0]} />

계속 작성...
```

### 2.3 카테고리 구조

```typescript
// lib/categories.ts

const CATEGORIES = {
  'tech': { name: '기술', description: '개발 & IT 기술 관련 글' },
  'review': { name: '리뷰', description: '제품 리뷰 & 추천' },
  'tutorial': { name: '튜토리얼', description: '따라하기 쉬운 가이드' },
  'life': { name: '일상', description: '일상 & 생각' },
} as const;
```

---

## 3. 컴포넌트 설계

### 3.1 컴포넌트 트리

```
app/layout.tsx (RootLayout)
├── AdSenseScript                    # AdSense 자동 광고 스크립트
├── GoogleAnalytics                  # GA4 스크립트
├── ThemeProvider                    # 다크모드 (v1.1)
├── Header
│   ├── Logo
│   ├── Navigation (카테고리 메뉴)
│   └── ThemeToggle (v1.1)
├── main
│   └── {children}                   # 페이지별 콘텐츠
└── Footer
    ├── SocialLinks
    └── Copyright

app/page.tsx (HomePage)
├── HeroSection                      # 블로그 소개
├── PostList (최신 글 6개)
│   └── PostCard[]
│       ├── Thumbnail
│       ├── PostMeta (날짜, 카테고리, 읽기시간)
│       └── PostExcerpt
└── AdBanner                         # 홈 하단 광고

app/blog/[slug]/page.tsx (PostPage)
├── PostHeader
│   ├── PostTitle
│   ├── PostMeta
│   └── ShareButtons
├── AdBanner                         # 본문 상단 광고
├── article
│   ├── TableOfContents (v1.1)       # 사이드 목차
│   ├── MDXContent                   # 본문 (MDX 렌더링)
│   │   ├── <ProductCard />          # MDX 내 제휴 컴포넌트
│   │   ├── <InArticleAd />          # MDX 내 중간 광고
│   │   └── (기본 마크다운 요소들)
│   └── AffiliateSection             # 제휴 제품 모음
├── AdBanner                         # 본문 하단 광고
├── RelatedPosts (v1.1)
└── Comments (v1.2, Giscus)
```

### 3.2 핵심 컴포넌트 상세 설계

#### 3.2.1 AdSenseScript (광고 스크립트 로더)

```typescript
// components/ads/AdSenseScript.tsx
// - <head>에 AdSense 스크립트 삽입
// - 환경변수: NEXT_PUBLIC_ADSENSE_CLIENT_ID
// - next/script의 afterInteractive 전략 사용
// - 개발 환경에서는 로드하지 않음

interface Props {
  clientId: string;  // ca-pub-XXXXXXXX
}
```

#### 3.2.2 AdBanner (광고 배너)

```typescript
// components/ads/AdBanner.tsx
// - Google AdSense 디스플레이 광고 유닛
// - 반응형 크기 대응 (data-ad-format="auto")
// - 슬롯별 다른 광고 유닛 ID 지원
// - 개발 환경에서는 플레이스홀더 표시

interface Props {
  slot: string;                    // AdSense 광고 슬롯 ID
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}
```

#### 3.2.3 InArticleAd (본문 중간 광고)

```typescript
// components/ads/InArticleAd.tsx
// - MDX 본문 내에서 사용하는 인아티클 광고
// - data-ad-format="fluid"
// - data-ad-layout="in-article"

interface Props {
  slot: string;
}
```

#### 3.2.4 ProductCard (제휴 제품 카드)

```typescript
// components/affiliate/ProductCard.tsx
// - 제휴 제품을 카드 형태로 표시
// - 이미지, 제품명, 가격, 구매 버튼
// - rel="nofollow sponsored" 적용
// - target="_blank" + noopener noreferrer
// - UTM 파라미터 자동 추가

interface Props {
  product: AffiliateProduct;
  variant?: 'card' | 'inline' | 'banner';
}
```

#### 3.2.5 PostCard (포스트 카드)

```typescript
// components/blog/PostCard.tsx
// - 블로그 목록에서 사용하는 포스트 카드
// - 썸네일, 제목, 설명, 메타정보

interface Props {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}
```

#### 3.2.6 MDXComponents (MDX 커스텀 컴포넌트)

```typescript
// components/mdx/MDXComponents.tsx
// - MDX에서 사용할 커스텀 컴포넌트 매핑
// - 기본 HTML 요소 스타일 오버라이드

const MDXComponents = {
  // 기본 요소 오버라이드
  h1: (props) => <h1 className="..." {...props} />,
  h2: (props) => <h2 className="..." id={slugify(props.children)} {...props} />,
  h3: (props) => <h3 className="..." id={slugify(props.children)} {...props} />,
  a: (props) => <a className="..." target="_blank" rel="noopener" {...props} />,
  img: (props) => <Image className="..." {...props} />,
  pre: (props) => <CodeBlock {...props} />,
  code: (props) => <InlineCode {...props} />,
  blockquote: (props) => <Callout {...props} />,

  // 커스텀 컴포넌트
  ProductCard,
  InArticleAd,
  Callout,
  CodeBlock,
};
```

---

## 4. 라우팅 & 페이지 상세 설계

### 4.1 홈페이지 (`/`)

```typescript
// app/page.tsx
// - 최신 포스트 6개 표시 (SSG)
// - 카테고리별 인기 글 섹션
// - 광고 배너 1개 (하단)

export default async function HomePage() {
  const latestPosts = getLatestPosts(6);
  return (
    <>
      <HeroSection />
      <PostList posts={latestPosts} />
      <AdBanner slot="home-bottom" format="horizontal" />
    </>
  );
}
```

### 4.2 블로그 목록 (`/blog`)

```typescript
// app/blog/page.tsx
// - 전체 포스트 목록 (최신순)
// - 페이지네이션 (10개씩)
// - 카테고리 필터 탭

// URL: /blog?page=1&category=tech
export default async function BlogPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category || 'all';
  const { posts, totalPages } = getPaginatedPosts(page, 10, category);

  return (
    <>
      <CategoryTabs current={category} />
      <PostList posts={posts} />
      <Pagination current={page} total={totalPages} />
      <AdBanner slot="blog-list-bottom" />
    </>
  );
}
```

### 4.3 포스트 상세 (`/blog/[slug]`)

```typescript
// app/blog/[slug]/page.tsx
// - MDX 렌더링
// - SEO 메타데이터 (generateMetadata)
// - 광고 배치 (상단, 하단)
// - 구조화된 데이터 (JSON-LD: Article)
// - OG 이미지

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [post.thumbnail || '/og/default.png'],
    },
    alternates: {
      canonical: `https://yourdomain.com/blog/${params.slug}`,
    },
  };
}
```

### 4.4 사이트맵 (`/sitemap.xml`)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const postUrls = posts.map((post) => ({
    url: `https://yourdomain.com/blog/${post.slug}`,
    lastModified: post.updatedDate || post.date,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: 'https://yourdomain.com', changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://yourdomain.com/blog', changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://yourdomain.com/about', changeFrequency: 'monthly', priority: 0.5 },
    ...postUrls,
  ];
}
```

### 4.5 RSS 피드 (`/feed.xml`)

```typescript
// app/feed.xml/route.ts
// - RSS 2.0 XML 생성
// - 최신 20개 포스트 포함
// - Content-Type: application/xml

export async function GET() {
  const posts = getLatestPosts(20);
  const xml = generateRSSFeed(posts);
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

---

## 5. MDX 콘텐츠 시스템 설계

### 5.1 MDX 처리 파이프라인

```
content/posts/*.mdx
       │
       ▼
┌──────────────────┐
│  gray-matter     │  → Frontmatter 파싱 (메타데이터 추출)
└──────┬───────────┘
       ▼
┌──────────────────┐
│  next-mdx-remote │  → MDX → React 컴포넌트 변환
└──────┬───────────┘
       ▼
┌──────────────────┐
│  rehype/remark   │  → 플러그인 처리
│  plugins         │
│  - rehype-prism  │     → 코드 하이라이팅
│  - remark-gfm    │     → GitHub Flavored Markdown
│  - rehype-slug   │     → 헤딩에 id 추가 (TOC용)
│  - reading-time  │     → 읽기 시간 계산
└──────┬───────────┘
       ▼
  React Component (렌더링)
```

### 5.2 콘텐츠 유틸리티 함수

```typescript
// lib/posts.ts

// 모든 포스트 조회 (발행된 것만, 날짜 역순)
function getAllPosts(): Post[]

// 슬러그로 단일 포스트 조회 (MDX 소스 포함)
function getPostBySlug(slug: string): Post & { content: string }

// 최신 N개 포스트
function getLatestPosts(count: number): Post[]

// 페이지네이션 포스트 조회
function getPaginatedPosts(page: number, perPage: number, category?: string):
  { posts: Post[]; totalPages: number }

// 카테고리별 포스트
function getPostsByCategory(category: string): Post[]

// 태그별 포스트
function getPostsByTag(tag: string): Post[]

// 모든 카테고리 목록 (포스트 수 포함)
function getAllCategories(): { name: string; count: number }[]

// 모든 태그 목록 (포스트 수 포함)
function getAllTags(): { name: string; count: number }[]

// 관련 포스트 (같은 태그 기반, 최대 4개)
function getRelatedPosts(currentSlug: string, tags: string[]): Post[]

// 모든 슬러그 (generateStaticParams용)
function getAllPostSlugs(): string[]
```

---

## 6. SEO 설계

### 6.1 메타데이터 전략

```typescript
// app/layout.tsx - 기본 메타데이터

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: '블로그 이름',
    template: '%s | 블로그 이름',
  },
  description: '블로그 설명',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '블로그 이름',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_ID',
    other: { 'naver-site-verification': 'NAVER_WEBMASTER_ID' },
  },
};
```

### 6.2 구조화된 데이터 (JSON-LD)

```typescript
// lib/seo.ts

// 블로그 포스트용 JSON-LD
function generateArticleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: {
      '@type': 'Person',
      name: '작성자 이름',
      url: 'https://yourdomain.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: '블로그 이름',
      logo: { '@type': 'ImageObject', url: 'https://yourdomain.com/logo.png' },
    },
    image: post.thumbnail,
    mainEntityOfPage: `https://yourdomain.com/blog/${post.slug}`,
  };
}

// 웹사이트용 JSON-LD
function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '블로그 이름',
    url: 'https://yourdomain.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://yourdomain.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}
```

### 6.3 robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

---

## 7. 수익화 컴포넌트 상세 설계

### 7.1 AdSense 연동 아키텍처

```
환경변수:
  NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
  NEXT_PUBLIC_AD_SLOT_BANNER=1234567890
  NEXT_PUBLIC_AD_SLOT_INARTICLE=0987654321
  NEXT_PUBLIC_AD_SLOT_SIDEBAR=1122334455

광고 배치 레이아웃 (포스트 페이지):
┌────────────────────────────────────────────┐
│  Header                                     │
├────────────────────────────────────────────┤
│  [AdBanner - 상단 배너 728x90]              │
├──────────────────────────┬─────────────────┤
│  PostTitle               │                 │
│  PostMeta                │   Sidebar       │
│  ─────────────           │   ┌───────────┐ │
│  본문 시작...             │   │ AdBanner  │ │
│                          │   │ 300x250   │ │
│  [InArticleAd]           │   └───────────┘ │
│                          │                 │
│  본문 계속...             │   ┌───────────┐ │
│                          │   │ TOC (v1.1)│ │
│  <ProductCard />         │   └───────────┘ │
│                          │                 │
│  본문 끝                  │                 │
├──────────────────────────┴─────────────────┤
│  [AdBanner - 하단 배너]                      │
│  AffiliateSection (제품 모음)                │
│  RelatedPosts (v1.1)                        │
├────────────────────────────────────────────┤
│  Footer                                     │
└────────────────────────────────────────────┘

모바일 레이아웃: 사이드바 숨김, 광고는 본문 흐름에 맞춰 배치
```

### 7.2 광고 표시 규칙

| 규칙 | 설명 |
|------|------|
| 개발 환경 | 플레이스홀더 회색 박스 표시 (실제 광고 로드 안 함) |
| `enableAds: false` | 해당 포스트 광고 비표시 |
| 모바일 | 사이드바 광고 숨김, 인아티클 광고는 유지 |
| 최소 간격 | 광고 간 최소 300px 간격 유지 |

### 7.3 제휴 링크 컴포넌트 변형

```
┌─ card (기본) ─────────────────────────┐
│ ┌──────┐                              │
│ │ 이미지│  제품명                      │
│ │      │  ★★★★★                       │
│ └──────┘  가격: 139,000원             │
│           [쿠팡에서 구매하기 →]        │
│  ⚠️ 쿠팡파트너스 활동으로 수수료 제공  │
└───────────────────────────────────────┘

┌─ inline (본문 내) ────────────────────┐
│ 📦 레오폴드 FC660M (139,000원)  [→]  │
└───────────────────────────────────────┘

┌─ banner (비교표 상단) ────────────────┐
│ ┌────────┐ ┌────────┐ ┌────────┐     │
│ │ 제품 A │ │ 제품 B │ │ 제품 C │     │
│ │  이미지 │ │  이미지 │ │  이미지 │     │
│ │ 99,000 │ │139,000 │ │ 89,000 │     │
│ │ [구매] │ │ [구매] │ │ [구매] │     │
│ └────────┘ └────────┘ └────────┘     │
└───────────────────────────────────────┘
```

---

## 8. 스타일 시스템 설계

### 8.1 디자인 토큰 (Tailwind CSS)

```typescript
// tailwind.config.ts

const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
  darkMode: 'class',  // v1.1 다크모드 대비
  theme: {
    extend: {
      colors: {
        // 브랜드 컬러
        primary: { 50: '...', 500: '...', 900: '...' },
        // 의미 컬러
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '768px',
            // MDX 본문 타이포그래피 커스터마이징
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

### 8.2 반응형 브레이크포인트

| 브레이크포인트 | 크기 | 레이아웃 |
|---------------|------|----------|
| Mobile | < 768px | 1컬럼, 사이드바 숨김, 풀 폭 광고 |
| Tablet | 768px ~ 1024px | 1컬럼, 사이드바 하단 이동 |
| Desktop | > 1024px | 2컬럼 (콘텐츠 + 사이드바) |

### 8.3 MDX 본문 스타일링

`@tailwindcss/typography` 플러그인의 `prose` 클래스 기반:

```html
<article class="prose prose-lg prose-neutral dark:prose-invert max-w-none">
  {MDX 렌더링 결과}
</article>
```

---

## 9. 환경변수 설계

```env
# .env.local (Vercel 환경변수에도 등록)

# 사이트 정보
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=블로그 이름

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_BANNER=1234567890
NEXT_PUBLIC_AD_SLOT_INARTICLE=0987654321
NEXT_PUBLIC_AD_SLOT_SIDEBAR=1122334455

# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_VERIFICATION=verification-code

# Naver Webmaster
NEXT_PUBLIC_NAVER_VERIFICATION=verification-code
```

---

## 10. 의존성 목록

### 10.1 Production Dependencies

```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next-mdx-remote": "^5.0.0",
  "gray-matter": "^4.0.3",
  "reading-time": "^1.5.0",
  "rehype-prism-plus": "^2.0.0",
  "rehype-slug": "^6.0.0",
  "rehype-autolink-headings": "^7.0.0",
  "remark-gfm": "^4.0.0"
}
```

### 10.2 Dev Dependencies

```json
{
  "@tailwindcss/typography": "^0.5.0",
  "tailwindcss": "^4.0.0",
  "typescript": "^5.0.0",
  "@types/react": "^19.0.0",
  "@types/node": "^22.0.0"
}
```

---

## 11. 구현 순서 (상세)

### Phase 1: 프로젝트 초기화 & 기본 블로그

```
순서  파일/작업                          의존성
─────────────────────────────────────────────────
1.1   npx create-next-app@latest         없음
1.2   Tailwind CSS + Typography 설정      1.1
1.3   환경변수 설정 (.env.local)          1.1
1.4   lib/types.ts (타입 정의)            없음
1.5   lib/posts.ts (콘텐츠 유틸)          1.4
1.6   content/posts/ 샘플 MDX 3개        1.4
1.7   components/mdx/MDXComponents.tsx    1.5
1.8   components/layout/Header.tsx        1.2
1.9   components/layout/Footer.tsx        1.2
1.10  app/layout.tsx (루트 레이아웃)       1.8, 1.9
1.11  components/blog/PostCard.tsx        1.4
1.12  app/page.tsx (홈)                   1.5, 1.11
1.13  app/blog/page.tsx (목록)            1.5, 1.11
1.14  app/blog/[slug]/page.tsx (상세)     1.5, 1.7
1.15  app/about/page.tsx                  1.10
```

### Phase 2: SEO 최적화

```
순서  파일/작업                          의존성
─────────────────────────────────────────────────
2.1   lib/seo.ts (JSON-LD 헬퍼)          Phase 1
2.2   app/layout.tsx 메타데이터 추가       2.1
2.3   app/blog/[slug] generateMetadata    2.1
2.4   app/sitemap.ts                      1.5
2.5   app/robots.ts                       없음
2.6   app/feed.xml/route.ts (RSS)         1.5
```

### Phase 3: 수익화 연동

```
순서  파일/작업                          의존성
─────────────────────────────────────────────────
3.1   components/ads/AdSenseScript.tsx     Phase 1
3.2   components/ads/AdBanner.tsx          3.1
3.3   components/ads/InArticleAd.tsx       3.1
3.4   components/affiliate/ProductCard.tsx Phase 1
3.5   components/affiliate/AffiliateLink  3.4
3.6   app/layout.tsx에 AdSense 추가       3.1
3.7   app/layout.tsx에 GA4 추가           Phase 1
3.8   포스트 페이지에 광고 배치             3.2, 3.3
```

### Phase 4: 부가 기능 (v1.1)

```
순서  파일/작업                          의존성
─────────────────────────────────────────────────
4.1   ThemeProvider (다크모드)             Phase 1
4.2   components/blog/TableOfContents.tsx  Phase 1
4.3   components/blog/RelatedPosts.tsx     1.5
4.4   app/category/[category]/page.tsx     1.5
4.5   app/tag/[tag]/page.tsx              1.5
```

---

## 12. 성능 목표

| 지표 | 목표 | 측정 도구 |
|------|------|-----------|
| Lighthouse Performance | > 90 | Chrome DevTools |
| Lighthouse SEO | > 95 | Chrome DevTools |
| LCP (Largest Contentful Paint) | < 2.5s | Web Vitals |
| FID (First Input Delay) | < 100ms | Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Web Vitals |
| 번들 사이즈 (JS) | < 100KB gzip | next build |
