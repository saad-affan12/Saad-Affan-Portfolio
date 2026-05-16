"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const orb1Style: React.CSSProperties = {
  position: "absolute",
  top: "-20%",
  left: "-10%",
  width: "50vw",
  height: "50vw",
  maxWidth: "700px",
  maxHeight: "700px",
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)",
  willChange: "transform",
};

const orb2Style: React.CSSProperties = {
  position: "absolute",
  bottom: "-15%",
  right: "-5%",
  width: "45vw",
  height: "45vw",
  maxWidth: "600px",
  maxHeight: "600px",
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
  willChange: "transform",
};

const orb3Style: React.CSSProperties = {
  position: "absolute",
  top: "40%",
  right: "-10%",
  width: "35vw",
  height: "35vw",
  maxWidth: "500px",
  maxHeight: "500px",
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.05) 40%, transparent 70%)",
  willChange: "transform",
};

export default function BackgroundAnimation() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (theme !== "light") return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <div className="orb-float-slow" style={orb1Style} />
      <div className="orb-float-medium" style={orb2Style} />
      <div className="orb-float-fast" style={orb3Style} />

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .orb-float-slow {
            animation: orbFloat 14s ease-in-out infinite alternate;
          }
          .orb-float-medium {
            animation: orbFloat 10s ease-in-out infinite alternate;
          }
          .orb-float-fast {
            animation: orbFloat 8s ease-in-out infinite alternate;
          }
        }

        @keyframes orbFloat {
          0% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -40px) scale(1.05);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          75% {
            transform: translate(40px, 30px) scale(1.02);
          }
          100% {
            transform: translate(-30px, -20px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
