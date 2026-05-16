import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mohammed Saad Affan A | Full-Stack Engineer & AI Systems Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 50%, rgba(99,102,241,0.12) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(139,92,246,0.08) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(59,130,246,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "0 80px",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              textAlign: "center",
              lineHeight: 1.15,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Mohammed Saad Affan A
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#94a3b8",
              textAlign: "center",
              marginTop: 4,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Full-Stack Engineer &bull; AI Systems Builder
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 24,
              fontSize: 14,
              color: "#64748b",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <span>github.com/saad-affan12</span>
            <span style={{ color: "#334155" }}>&#x2022;</span>
            <span>linkedin.com/in/saad-affan-566553319</span>
            <span style={{ color: "#334155" }}>&#x2022;</span>
            <span>VIT Vellore</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(to right, #6366F1, #8B5CF6, #38BDF8)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
