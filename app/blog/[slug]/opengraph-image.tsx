import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";

export const alt = "Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title || "Daily Givepro";
  const category = post?.category
    ? CATEGORIES[post.category]?.name || post.category
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #111827 0%, #1e3a5f 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {category && (
          <div
            style={{
              fontSize: 22,
              color: "#93c5fd",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {category}
          </div>
        )}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Daily Givepro
        </div>
      </div>
    ),
    { ...size }
  );
}
