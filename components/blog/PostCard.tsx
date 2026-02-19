import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";

export default function PostCard({
  post,
  variant = "default",
}: {
  post: Post;
  variant?: "default" | "featured" | "compact";
}) {
  const categoryLabel = CATEGORIES[post.category]?.name || post.category;

  if (variant === "compact") {
    return (
      <article className="group">
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-900"
        >
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 dark:text-white">
              {post.title}
            </h3>
            <time className="text-xs text-gray-500">{post.date}</time>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md dark:border-gray-800">
      {post.thumbnail && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
      )}
      <div className="p-5">
        <Link href={`/blog/${post.slug}`}>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {categoryLabel}
            </span>
            <time dateTime={post.date}>{post.date}</time>
            {post.readingTime && <span>{post.readingTime}min read</span>}
          </div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 dark:text-gray-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Link>
      </div>
    </article>
  );
}
