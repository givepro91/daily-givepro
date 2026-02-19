import { MetadataRoute } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = getAllCategories().map((cat) => ({
    url: `${SITE_URL}/category/${cat.name}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tagUrls = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tag/${encodeURIComponent(tag.name)}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...postUrls,
    ...categoryUrls,
    ...tagUrls,
  ];
}
