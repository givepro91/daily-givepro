import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import PostList from "@/components/blog/PostList";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORIES[category]?.name || category;
  const description =
    CATEGORIES[category]?.description ||
    `${label} 관련 블로그 글을 확인하세요.`;
  return {
    title: `${label} - 카테고리`,
    description: `${description} Daily Givepro에서 ${label} 관련 최신 글을 읽어보세요.`,
    alternates: {
      canonical: `${SITE_URL}/category/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const label = CATEGORIES[category]?.name || category;

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {label}
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        {CATEGORIES[category]?.description || `Posts in ${category}`}
      </p>
      <PostList posts={posts} />
    </div>
  );
}
