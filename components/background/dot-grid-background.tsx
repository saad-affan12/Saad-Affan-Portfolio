"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseOpacity: number;
  phase: number;
  size: number;
  baseSize: number;
  colorIndex: number;
}

const DOT_COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#a78bfa"];

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const dotsRef = useRef<Dot[]>([]);
  const timeRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const isMobile = w < 768;
    const gridSpacing = isMobile ? 48 : 40;
    const dotBaseSize = isMobile ? 1.5 : 2.2;

    const generateDots = () => {
      const cols = Math.floor(w / gridSpacing) + 2;
      const rows = Math.floor(h / gridSpacing) + 2;
      const offsetX = (w % gridSpacing) / 2;
      const offsetY = (h % gridSpacing) / 2;
      const dots: Dot[] = [];

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * gridSpacing + offsetX;
          const y = r * gridSpacing + offsetY;
          const distFromCenter = Math.sqrt(
            Math.pow((x - w / 2) / (w / 2), 2) +
            Math.pow((y - h / 2) / (h / 2), 2)
          );
          const centerFade = Math.max(0.4, 1 - distFromCenter * 0.3);
          dots.push({
            x,
            y,
            baseOpacity: (0.35 + Math.random() * 0.2) * centerFade,
            phase: Math.random() * Math.PI * 2,
            size: dotBaseSize,
            baseSize: dotBaseSize,
            colorIndex: Math.floor(Math.random() * DOT_COLORS.length),
          });
        }
      }

      dotsRef.current = dots;
    };

    generateDots();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * newDpr;
      canvas.height = h * newDpr;
      ctx.scale(newDpr, newDpr);
      generateDots();
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / w, y: e.clientY / h };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      timeRef.current++;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x * w;
      const my = mouseRef.current.y * h;
      const parallaxX = (mouseRef.current.x - 0.5) * 2;
      const parallaxY = (mouseRef.current.y - 0.5) * 2;

      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const dx = dot.x + parallaxX * 8 - mx;
        const dy = dot.y + parallaxY * 8 - my;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 120;
        const mouseInfluence = Math.max(0, 1 - mouseDist / mouseRadius);

        const pulse = 0.75 + 0.25 * Math.sin(timeRef.current * 0.004 + dot.phase);
        const alpha = dot.baseOpacity * pulse + mouseInfluence * 0.25;

        const sizeBoost = mouseInfluence * 3;
        const finalSize = dot.baseSize + sizeBoost;

        if (alpha > 0.005) {
          ctx.globalAlpha = Math.min(alpha, 0.65);

          const colorIdx = mouseInfluence > 0.1
            ? Math.floor(mouseInfluence * (DOT_COLORS.length - 1 - dot.colorIndex) + dot.colorIndex) % DOT_COLORS.length
            : dot.colorIndex;
          ctx.fillStyle = DOT_COLORS[colorIdx];

          ctx.beginPath();
          ctx.arc(
            dot.x + parallaxX * 8,
            dot.y + parallaxY * 8,
            finalSize,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        if (mouseInfluence > 0.3) {
          ctx.globalAlpha = mouseInfluence * 0.08;
          ctx.fillStyle = DOT_COLORS[dot.colorIndex];
          ctx.beginPath();
          ctx.arc(
            dot.x + parallaxX * 8,
            dot.y + parallaxY * 8,
            finalSize + 6 * mouseInfluence,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const ax = a.x + parallaxX * 8;
        const ay = a.y + parallaxY * 8;

        const nearMouse = Math.sqrt(
          Math.pow(ax - mx, 2) + Math.pow(ay - my, 2)
        ) < 150;

        if (!nearMouse) continue;

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = ax - (b.x + parallaxX * 8);
          const dy = ay - (b.y + parallaxY * 8);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            const alpha = 0.5 * (1 - dist / 60);
            ctx.globalAlpha = alpha * 0.3;
            ctx.strokeStyle = "#3b82f6";
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(b.x + parallaxX * 8, b.y + parallaxY * 8);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ width: "100vw", height: "100vh", pointerEvents: "none" }}
    />
  );
}
