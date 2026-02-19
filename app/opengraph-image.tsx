import { ImageResponse } from "next/og";

export const alt = "Daily Givepro - 테크, 리뷰, 튜토리얼 블로그";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111827 0%, #1e3a5f 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 8,
          }}
        >
          Daily Givepro
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#93c5fd",
            marginTop: 8,
          }}
        >
          테크 / 리뷰 / 튜토리얼 / 일상
        </div>
      </div>
    ),
    { ...size }
  );
}
