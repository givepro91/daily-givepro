import { getLatestPosts } from "@/lib/posts";
import PostList from "@/components/blog/PostList";
import AdBanner from "@/components/ads/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";

export const metadata: Metadata = {
  title: "Daily Givepro - 테크, 리뷰, 튜토리얼 블로그",
  description:
    "개발자를 위한 기술 트렌드, 제품 리뷰, 실전 튜토리얼, 일상 이야기를 나누는 블로그. VS Code, Next.js, TypeScript 등 실용적인 개발 정보를 제공합니다.",
  openGraph: {
    title: "Daily Givepro - 테크, 리뷰, 튜토리얼 블로그",
    description:
      "개발자를 위한 기술 트렌드, 제품 리뷰, 실전 튜토리얼, 일상 이야기를 나누는 블로그.",
    url: SITE_URL,
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  const posts = getLatestPosts(6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Daily Givepro
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          테크, 리뷰, 튜토리얼, 일상 이야기를 나누는 블로그
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Latest Posts
          </h2>
          <Link
            href="/blog"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            View all &rarr;
          </Link>
        </div>
        <PostList posts={posts} />
      </section>

      <AdBanner
        slot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER || ""}
        format="horizontal"
        className="mt-10"
      />
    </div>
  );
}
