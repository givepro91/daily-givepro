import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import PostList from "@/components/blog/PostList";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded} - 태그`,
    description: `#${decoded} 태그가 달린 블로그 글 모음. Daily Givepro에서 관련 콘텐츠를 확인하세요.`,
    alternates: {
      canonical: `${SITE_URL}/tag/${encodeURIComponent(decoded)}`,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        #{decoded}
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        {posts.length}개의 글에 #{decoded} 태그가 사용되었습니다
      </p>
      <PostList posts={posts} />
    </div>
  );
}
