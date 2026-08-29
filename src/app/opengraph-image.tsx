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
          position: "relative",
          background: "#050505",
          padding: "0 96px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -180,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "#6366f1",
            opacity: 0.22,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -160,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "#38bdf8",
            opacity: 0.2,
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 22,
            letterSpacing: 4,
            color: "#6366f1",
            marginBottom: 24,
          }}
        >
          PRAVIN K
        </span>
        <span
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#f5f5f7",
            marginBottom: 20,
          }}
        >
          Full Stack Developer
        </span>
        <span style={{ fontSize: 28, color: "#9a9aa2" }}>
          Building fast, thoughtful products with Next.js &amp; TypeScript.
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 40,
            right: 64,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 20,
            color: "#5c5c64",
          }}
        >
          pravin671231.dev
        </span>
      </div>
    ),
    { ...size },
  );
}
