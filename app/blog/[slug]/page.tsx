import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/posts";
import { generateArticleJsonLd } from "@/lib/seo";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import AdBanner from "@/components/ads/AdBanner";
import ProductCard from "@/components/affiliate/ProductCard";
import PostList from "@/components/blog/PostList";
import ShareButtons from "@/components/blog/ShareButtons";
import Link from "next/link";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      images: post.thumbnail
        ? [{ url: post.thumbnail }]
        : [{ url: "/og-default.png" }],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = generateArticleJsonLd(post);
  const relatedPosts = getRelatedPosts(post.slug, post.tags);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Post Header */}
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href={`/category/${post.category}`}
            className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          >
            {post.category}
          </Link>
          <time dateTime={post.date}>{post.date}</time>
          {post.readingTime && <span>{post.readingTime}min read</span>}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
        <div className="mt-4">
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app"}/blog/${post.slug}`}
            title={post.title}
          />
        </div>
      </header>

      {/* Top Ad */}
      {post.enableAds && (
        <AdBanner
          slot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER || ""}
          format="horizontal"
          className="mb-8"
        />
      )}

      {/* MDX Content */}
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
                [rehypePrismPlus, { ignoreMissing: true }],
              ],
            },
          }}
        />
      </div>

      {/* Affiliate Products */}
      {post.affiliateProducts && post.affiliateProducts.length > 0 && (
        <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Recommended Products
          </h2>
          <div className="space-y-4">
            {post.affiliateProducts.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Bottom Ad */}
      {post.enableAds && (
        <AdBanner
          slot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER || ""}
          format="horizontal"
          className="mt-8"
        />
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Related Posts
          </h2>
          <PostList posts={relatedPosts} />
        </section>
      )}
    </article>
  );
}
