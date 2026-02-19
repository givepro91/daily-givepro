# monetized-blog Analysis Report

> **Analysis Type**: Gap Analysis (Design vs Implementation)
> **Project**: git-blog
> **Version**: 0.1.0
> **Analyst**: Claude (gap-detector)
> **Date**: 2026-02-19
> **Design Doc**: [monetized-blog.design.md](../02-design/features/monetized-blog.design.md)

---

## 1. Overall Scores

| Category | Score | Status |
|----------|:-----:|:------:|
| Data Model Match | 95% | HIGH |
| Content Utility Functions | 100% | HIGH |
| Component Implementation | 68% | MEDIUM |
| Page / Routing Match | 100% | HIGH |
| SEO Implementation | 78% | MEDIUM |
| Monetization Components | 82% | MEDIUM |
| Style System | 60% | LOW |
| Environment Variables | 100% | HIGH |
| Dependencies | 92% | HIGH |
| MDX System | 75% | MEDIUM |
| **Overall Match Rate** | **82%** | **MEDIUM** |

---

## 2. Gap List

### 2.1 Immediate Actions (High Priority)

| # | Action | File | Impact |
|---|--------|------|--------|
| 1 | Add `verification` metadata (google, naver) | app/layout.tsx | SEO |
| 2 | Add `publisher.logo` to Article JSON-LD | lib/seo.ts | SEO |
| 3 | Add `rehype-autolink-headings` to MDX options | app/blog/[slug]/page.tsx | Installed but unused |
| 4 | Add h1, pre, code, blockquote overrides to MDXComponents | components/mdx/MDXComponents.tsx | MDX quality |
| 5 | Create `.env.example` file | Project root | Convention |

### 2.2 Short-term Actions (Medium Priority)

| # | Action | File | Impact |
|---|--------|------|--------|
| 6 | Add Thumbnail rendering to PostCard | components/blog/PostCard.tsx | Visual |
| 7 | Implement ShareButtons component | components/blog/ShareButtons.tsx | Social |
| 8 | Add banner variant to ProductCard | components/affiliate/ProductCard.tsx | Monetization |
| 9 | Implement SocialLinks in Footer | components/layout/Footer.tsx | Engagement |
| 10 | Add UTM parameter auto-append to affiliate links | components/affiliate/ProductCard.tsx | Analytics |

### 2.3 Deferred (v1.1 Scope)

| # | Action | Notes |
|---|--------|-------|
| 11 | ThemeProvider + ThemeToggle | Dark mode |
| 12 | TableOfContents | Side navigation |
| 13 | Sidebar component with ad slot | Desktop layout |

---

## 3. Convention Compliance: 97%

| Category | Compliance |
|----------|:----------:|
| Naming (PascalCase/camelCase) | 100% |
| Folder Structure | 100% |
| Import Order | 100% |
| Env Variables | 90% |

---

## 4. Design Document Updates Needed

| # | Update | Reason |
|---|--------|--------|
| 1 | Next.js 15 -> 16.x | Implementation uses 16.1.6 |
| 2 | next-mdx-remote v5 -> v6 | Implementation uses ^6.0.0 |
| 3 | Font: Pretendard -> Geist | Implementation uses Geist |
| 4 | Tailwind config for v4 | No tailwind.config.ts in v4 |

---

## 5. Summary

- **Match Rate: 82%** (below 90% threshold)
- 5 immediate fixes needed to reach ~90%
- Core functionality (routing, data, utilities) is solid at 100%
- Gaps are primarily in component granularity and SEO completeness
