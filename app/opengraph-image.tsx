import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f0ede0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: -1, color: "#1a1a1a" }}>
          Anubhav Sinha
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6e6e6e",
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          CS @ Tufts · AI Development · Finance
        </div>
      </div>
    ),
    { ...size }
  );
}
