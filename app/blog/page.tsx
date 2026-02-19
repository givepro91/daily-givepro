import { getPaginatedPosts, getAllCategories } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import PostList from "@/components/blog/PostList";
import Pagination from "@/components/blog/Pagination";
import AdBanner from "@/components/ads/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "개발 기술, 제품 리뷰, 실전 튜토리얼, 일상 이야기까지. Daily Givepro의 모든 블로그 글을 한눈에 확인하세요.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category || "all";
  const { posts, totalPages } = getPaginatedPosts(page, 10, category);
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Blog
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-3 py-1 text-sm ${
            category === "all"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => {
          const label = CATEGORIES[cat.name]?.name || cat.name;
          return (
            <Link
              key={cat.name}
              href={`/blog?category=${cat.name}`}
              className={`rounded-full px-3 py-1 text-sm ${
                category === cat.name
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {label} ({cat.count})
            </Link>
          );
        })}
      </div>

      <PostList posts={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />

      <AdBanner
        slot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER || ""}
        format="horizontal"
        className="mt-8"
      />
    </div>
  );
}
