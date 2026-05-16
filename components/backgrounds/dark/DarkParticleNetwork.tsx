"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const CONFIG = {
  nodeCount: 55,
  maxDistance: 130,
  nodeSpeed: 0.35,
  nodeRadius: 2.2,
  nodeColor: "rgba(139, 92, 246, 0.45)",
  lineColor: "rgba(99, 102, 241, 0.15)",
  glowColor: "rgba(139, 92, 246, 0.08)",
  backgroundColor: "transparent",
};

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isHub: boolean;
}

export default function DarkParticleNetwork() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const isVisibleRef = useRef(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || resolvedTheme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const isMobile = () => window.innerWidth < 768;

    const initNodes = (): Node[] => {
      const count = isMobile() ? 28 : CONFIG.nodeCount;
      return Array.from({ length: count }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.nodeSpeed,
        vy: (Math.random() - 0.5) * CONFIG.nodeSpeed,
        radius: i < count * 0.1 ? CONFIG.nodeRadius * 2 : CONFIG.nodeRadius,
        isHub: i < count * 0.1,
      }));
    };

    nodesRef.current = initNodes();

    const animate = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const maxDist = isMobile() ? 90 : CONFIG.maxDistance;

      for (const node of nodesRef.current) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x;
          const dy = nodesRef.current[i].y - nodesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(nodesRef.current[i].x, nodesRef.current[i].y);
            ctx.lineTo(nodesRef.current[j].x, nodesRef.current[j].y);
            ctx.strokeStyle = CONFIG.lineColor.replace("0.15", String((1 - dist / maxDist) * 0.18));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const node of nodesRef.current) {
        if (node.isHub) {
          ctx.save();
          ctx.shadowBlur = 8;
          ctx.shadowColor = CONFIG.glowColor;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(139, 92, 246, 0.7)";
          ctx.fill();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.nodeColor;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(() => {
      resize();
      nodesRef.current = initNodes();
    });
    ro.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        cancelAnimationFrame(animRef.current);
      } else {
        isVisibleRef.current = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[-1] pointer-events-none will-change-transform"
      aria-hidden="true"
    />
  );
}
DarkParticleNetwork.displayName = "DarkParticleNetwork";
