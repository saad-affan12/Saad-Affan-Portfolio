"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const CONFIG = {
  starCount: 120,
  minRadius: 0.3,
  maxRadius: 1.2,
  minSpeed: 0.08,
  maxSpeed: 0.25,
  starColor: "rgba(255, 255, 255, ",
  minOpacity: 0.2,
  maxOpacity: 0.7,
  backgroundColor: "transparent",
  twinkleSpeed: 0.005,
};

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
  vx: number;
  vy: number;
  opacity: number;
  phase: number;
  isBright: boolean;
}

export default function Starfield() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
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

    const initStars = (): Star[] => {
      const count = isMobile() ? 60 : CONFIG.starCount;
      const maxRadius = isMobile() ? 1.0 : CONFIG.maxRadius;
      return Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: CONFIG.minRadius + Math.random() * (maxRadius - CONFIG.minRadius),
        speed: CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed),
        vx: (Math.random() - 0.5) * 0.1,
        vy: -(CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed)),
        opacity: CONFIG.minOpacity + Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity),
        phase: Math.random() * Math.PI * 2,
        isBright: Math.random() < 0.2,
      }));
    };

    starsRef.current = initStars();

    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      for (const star of starsRef.current) {
        star.x += star.vx;
        star.y += star.vy;

        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }
        if (star.y > canvas.height + 5) {
          star.y = -5;
          star.x = Math.random() * canvas.width;
        }
        if (star.x < -5) {
          star.x = canvas.width + 5;
        }
        if (star.x > canvas.width + 5) {
          star.x = -5;
        }

        const twinkle =
          CONFIG.minOpacity +
          (star.isBright ? CONFIG.maxOpacity : CONFIG.maxOpacity * 0.6) *
            (0.5 + 0.5 * Math.sin(time * CONFIG.twinkleSpeed + star.phase));

        const r = star.isBright ? star.radius * 1.5 : star.radius;
        ctx.beginPath();
        ctx.arc(star.x, star.y, r, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.starColor + twinkle + ")";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(() => {
      resize();
      starsRef.current = initStars();
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
Starfield.displayName = "Starfield";
