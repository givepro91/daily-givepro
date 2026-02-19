import { Post } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Daily Givepro";

const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME || "Daily Givepro";

export function generateArticleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    image: post.thumbnail
      ? `${SITE_URL}${post.thumbnail}`
      : `${SITE_URL}/og-default.png`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function getCanonicalUrl(path: string) {
  return `${SITE_URL}${path}`;
}
