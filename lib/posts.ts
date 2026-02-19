import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"));
}

function parsePost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    category: data.category || "uncategorized",
    tags: data.tags || [],
    thumbnail: data.thumbnail,
    published: data.published !== false,
    updatedDate: data.updatedDate,
    readingTime: Math.ceil(stats.minutes),
    enableAds: data.enableAds !== false,
    affiliateProducts: data.affiliateProducts,
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostFiles()
    .map(parsePost)
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const fileName = `${slug}.mdx`;
  const fullPath = path.join(postsDirectory, fileName);
  if (!fs.existsSync(fullPath)) return null;
  return parsePost(fileName);
}

export function getLatestPosts(count: number): Post[] {
  return getAllPosts().slice(0, count);
}

export function getPaginatedPosts(
  page: number,
  perPage: number,
  category?: string
): { posts: Post[]; totalPages: number } {
  let posts = getAllPosts();
  if (category && category !== "all") {
    posts = posts.filter((p) => p.category === category);
  }
  const totalPages = Math.ceil(posts.length / perPage);
  const start = (page - 1) * perPage;
  return { posts: posts.slice(start, start + perPage), totalPages };
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) =>
    p.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1))
  );
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(currentSlug: string, tags: string[]): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.tags.some((t) => tags.includes(t)))
    .slice(0, 4);
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
