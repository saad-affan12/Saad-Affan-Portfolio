"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseOpacity: number;
  phase: number;
}

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const dotsRef = useRef<Dot[]>([]);
  const gridLinesRef = useRef<{ x: number[]; y: number[] }>({ x: [], y: [] });
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
    const gridSpacing = isMobile ? 64 : 56;
    const dotSize = isMobile ? 1 : 1.5;

    const generateGrid = () => {
      const cols = Math.floor(w / gridSpacing) + 2;
      const rows = Math.floor(h / gridSpacing) + 2;
      const offsetX = (w % gridSpacing) / 2;
      const offsetY = (h % gridSpacing) / 2;

      const xLines: number[] = [];
      const yLines: number[] = [];
      const dots: Dot[] = [];

      for (let c = 0; c < cols; c++) {
        const x = c * gridSpacing + offsetX;
        xLines.push(x);
        for (let r = 0; r < rows; r++) {
          const y = r * gridSpacing + offsetY;
          if (c === 0) yLines.push(y);
          dots.push({
            x,
            y,
            baseOpacity: 0.10 + Math.random() * 0.12,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      gridLinesRef.current = { x: xLines, y: yLines };
      dotsRef.current = dots;
    };

    generateGrid();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * newDpr;
      canvas.height = h * newDpr;
      ctx.scale(newDpr, newDpr);
      generateGrid();
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / w, y: e.clientY / h };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      timeRef.current++;

      ctx.clearRect(0, 0, w, h);

      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;
      const parallaxX = mx * 2;
      const parallaxY = my * 2;

      const { x: xLines, y: yLines } = gridLinesRef.current;

      ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
      ctx.lineWidth = 0.5;

      for (const x of xLines) {
        ctx.beginPath();
        ctx.moveTo(x + parallaxX * 0.1, 0);
        ctx.lineTo(x + parallaxX * 0.1, h);
        ctx.stroke();
      }

      for (const y of yLines) {
        ctx.beginPath();
        ctx.moveTo(0, y + parallaxY * 0.1);
        ctx.lineTo(w, y + parallaxY * 0.1);
        ctx.stroke();
      }

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const pulse = 0.8 + 0.2 * Math.sin(timeRef.current * 0.006 + dot.phase);
        const alpha = dot.baseOpacity * pulse;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(71, 85, 105, 0.9)";
        ctx.beginPath();
        ctx.arc(
          dot.x + parallaxX * 0.15,
          dot.y + parallaxY * 0.15,
          dotSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
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
