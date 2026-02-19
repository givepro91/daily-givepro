import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import PostList from "@/components/blog/PostList";
import type { Metadata } from "next";

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
  return {
    title: `${label} Posts`,
    description: `${label} category posts`,
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
