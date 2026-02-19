import type { MDXComponents as MDXComponentsType } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/affiliate/ProductCard";
import InArticleAd from "@/components/ads/InArticleAd";

function slugify(text: React.ReactNode): string {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export const mdxComponents: MDXComponentsType = {
  h1: () => null,
  h2: ({ children, ...props }) => (
    <h2 id={slugify(children)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 id={slugify(children)} {...props}>
      {children}
    </h3>
  ),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }) => (
    <Image
      src={src || ""}
      alt={alt || ""}
      width={768}
      height={432}
      sizes="(max-width: 768px) 100vw, 768px"
      className="rounded-lg"
      style={{ width: "100%", height: "auto" }}
      {...props}
    />
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-pink-600 dark:bg-gray-800 dark:text-pink-400"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-blue-500 bg-blue-50 p-4 text-gray-700 dark:bg-blue-950/30 dark:text-gray-300"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ProductCard,
  InArticleAd,
};
