import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "45px",
          background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 70,
            fontWeight: 600,
            color: "#050505",
          }}
        >
          PK
        </span>
      </div>
    ),
    { ...size },
  );
}
