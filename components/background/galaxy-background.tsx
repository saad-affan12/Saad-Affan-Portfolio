"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  speedX: number;
  speedY: number;
  phase: number;
  layer: 1 | 2;
}

interface Meteor {
  x: number;
  y: number;
  speed: number;
  angle: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  color: string;
  phase: number;
}

interface LightParticle {
  x: number;
  y: number;
  baseSize: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  speedX: number;
  speedY: number;
  color: string;
  phase: number;
  connections: number[];
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lightParticlesRef = useRef<LightParticle[]>([]);
  const timeRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const isDark = () => themeRef.current === "dark";

  const generateStars = useCallback((w: number, h: number): Star[] => {
    const isMobile = w < 768;
    const layer1Count = isMobile ? 30 : 80;
    const layer2Count = isMobile ? 12 : 35;

    const stars: Star[] = [];

    for (let i = 0; i < layer1Count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.3 + Math.random() * 0.7,
        opacity: 0.12 + Math.random() * 0.2,
        baseOpacity: 0.12 + Math.random() * 0.2,
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: (Math.random() - 0.5) * 0.04,
        phase: Math.random() * Math.PI * 2,
        layer: 1,
      });
    }

    for (let i = 0; i < layer2Count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.8 + Math.random() * 1.2,
        opacity: 0.15 + Math.random() * 0.3,
        baseOpacity: 0.15 + Math.random() * 0.3,
        speedX: (Math.random() - 0.5) * 0.025,
        speedY: (Math.random() - 0.5) * 0.025,
        phase: Math.random() * Math.PI * 2,
        layer: 2,
      });
    }

    return stars;
  }, []);

  const generateParticles = useCallback((w: number, h: number, dark: boolean): Particle[] => {
    const isMobile = w < 768;
    const count = dark ? (isMobile ? 12 : 25) : 0;
    const maxOpacity = dark ? 0.02 : 0;
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 0.8 + Math.random() * 1.5,
      opacity: 0.004 + Math.random() * maxOpacity,
      speedX: (Math.random() - 0.5) * 0.015,
      speedY: dark ? -0.005 - Math.random() * 0.015 : (Math.random() - 0.5) * 0.008,
      color: "#ffffff",
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const generateLightParticles = useCallback((w: number, h: number): LightParticle[] => {
    const isMobile = w < 768;
    const count = isMobile ? 25 : 50;
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#6366f1", "#a78bfa"];
    const particles: LightParticle[] = [];

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        baseSize: 0.5 + Math.random() * 2,
        size: 0.5 + Math.random() * 2,
        baseOpacity: 0.02 + Math.random() * 0.06,
        opacity: 0.02 + Math.random() * 0.06,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        color,
        phase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    return particles;
  }, []);

  const spawnMeteor = useCallback((w: number, h: number): Meteor => {
    const angle = -25 + (Math.random() - 0.5) * 10;
    const rad = (angle * Math.PI) / 180;
    const isMobile = w < 768;
    return {
      x: w * (0.2 + Math.random() * 0.5),
      y: h * (0.0 + Math.random() * 0.3),
      speed: isMobile ? 1.5 + Math.random() * 1.5 : 2 + Math.random() * 2,
      angle: rad,
      length: 30 + Math.random() * 40,
      opacity: 0.5 + Math.random() * 0.3,
      life: 0,
      maxLife: 80 + Math.random() * 60,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    starsRef.current = generateStars(w, h);
    particlesRef.current = generateParticles(w, h, isDark());
    lightParticlesRef.current = generateLightParticles(w, h);
    meteorsRef.current = [];
    let meteorTimer = 0;

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      starsRef.current = generateStars(w, h);
      particlesRef.current = generateParticles(w, h, isDark());
      lightParticlesRef.current = generateLightParticles(w, h);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / w,
        y: e.clientY / h,
      };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      timeRef.current++;
      meteorTimer++;

      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;

      ctx.clearRect(0, 0, w, h);

      if (isDark()) {
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#020617");
        grad.addColorStop(0.4, "#050B1F");
        grad.addColorStop(1, "#000814");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const glowGrad = ctx.createRadialGradient(w * 0.5, 0, 0, w * 0.5, 0, w * 0.5);
        glowGrad.addColorStop(0, "rgba(59, 130, 246, 0.025)");
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, w, h);

        const glowGrad2 = ctx.createRadialGradient(w * 0.85, h * 0.85, 0, w * 0.85, h * 0.85, w * 0.4);
        glowGrad2.addColorStop(0, "rgba(139, 92, 246, 0.012)");
        glowGrad2.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad2;
        ctx.fillRect(0, 0, w, h);

        const stars = starsRef.current;
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const parallaxFactor = star.layer === 1 ? 1 : 0.6;
          const px = star.x + mx * 4 * (1 - parallaxFactor);
          const py = star.y + my * 4 * (1 - parallaxFactor);

          star.x += star.speedX;
          star.y += star.speedY;

          if (star.x < -10) star.x = w + 10;
          if (star.x > w + 10) star.x = -10;
          if (star.y < -10) star.y = h + 10;
          if (star.y > h + 10) star.y = -10;

          const twinkle = star.layer === 1
            ? 1
            : 0.85 + 0.15 * Math.sin(timeRef.current * 0.015 + star.phase);

          const alpha = star.baseOpacity * twinkle;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = "#ffffff";

          ctx.beginPath();
          ctx.arc(px, py, star.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;

        const meteorMaxCount = w < 768 ? 1 : 2;
        const meteorInterval = 300 + Math.random() * 400;
        if (meteorTimer > meteorInterval && meteorsRef.current.length < meteorMaxCount) {
          meteorsRef.current.push(spawnMeteor(w, h));
          meteorTimer = 0;
        }

        const meteors = meteorsRef.current;
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.x -= m.speed * Math.cos(m.angle);
          m.y += m.speed * Math.sin(Math.abs(m.angle));
          m.life++;

          const lifeRatio = m.life / m.maxLife;
          m.opacity = Math.max(0, 1 - lifeRatio) * (lifeRatio < 0.05 ? lifeRatio / 0.05 : 1);

          if (m.life >= m.maxLife || m.x < -100 || m.y > h + 100) {
            meteors.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = m.opacity * 0.8;

          const meteorGrad = ctx.createLinearGradient(
            m.x, m.y,
            m.x - m.length * Math.cos(m.angle),
            m.y + m.length * Math.sin(Math.abs(m.angle))
          );
          meteorGrad.addColorStop(0, "rgba(147, 197, 253, 0.7)");
          meteorGrad.addColorStop(0.3, "rgba(96, 165, 250, 0.25)");
          meteorGrad.addColorStop(1, "transparent");

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 1;
          ctx.shadowColor = "#60a5fa";
          ctx.shadowBlur = 3;

          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(
            m.x - m.length * Math.cos(m.angle),
            m.y + m.length * Math.sin(Math.abs(m.angle))
          );
          ctx.stroke();

          ctx.shadowBlur = 5;
          ctx.fillStyle = "#e0f2fe";
          ctx.beginPath();
          ctx.arc(m.x, m.y, 1, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0;
        }

        const darkParticles = particlesRef.current;
        for (let i = 0; i < darkParticles.length; i++) {
          const p = darkParticles[i];
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;

          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const accentGlow = ctx.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.3, w * 0.35);
        accentGlow.addColorStop(0, "rgba(59, 130, 246, 0.04)");
        accentGlow.addColorStop(1, "transparent");
        ctx.fillStyle = accentGlow;
        ctx.fillRect(0, 0, w, h);

        const warmGlow = ctx.createRadialGradient(w * 0.2, h * 0.7, 0, w * 0.2, h * 0.7, w * 0.25);
        warmGlow.addColorStop(0, "rgba(139, 92, 246, 0.025)");
        warmGlow.addColorStop(1, "transparent");
        ctx.fillStyle = warmGlow;
        ctx.fillRect(0, 0, w, h);

        const cyanGlow = ctx.createRadialGradient(w * 0.85, h * 0.2, 0, w * 0.85, h * 0.2, w * 0.2);
        cyanGlow.addColorStop(0, "rgba(6, 182, 212, 0.02)");
        cyanGlow.addColorStop(1, "transparent");
        ctx.fillStyle = cyanGlow;
        ctx.fillRect(0, 0, w, h);

        const lightMouseGlow = ctx.createRadialGradient(
          mouseRef.current.x * w, mouseRef.current.y * h, 0,
          mouseRef.current.x * w, mouseRef.current.y * h, w * 0.2
        );
        lightMouseGlow.addColorStop(0, "rgba(59, 130, 246, 0.06)");
        lightMouseGlow.addColorStop(1, "transparent");
        ctx.fillStyle = lightMouseGlow;
        ctx.fillRect(0, 0, w, h);

        const lightP = lightParticlesRef.current;
        const connectionDist = w < 768 ? 100 : 150;

        ctx.globalAlpha = 1;

        for (let i = 0; i < lightP.length; i++) {
          const p = lightP[i];
          p.x += p.speedX;
          p.y += p.speedY;

          const parallaxFactor = 0.15;
          const px = p.x + mx * 20 * parallaxFactor;
          const py = p.y + my * 20 * parallaxFactor;

          if (p.x < -20) { p.x = w + 20; }
          if (p.x > w + 20) { p.x = -20; }
          if (p.y < -20) { p.y = h + 20; }
          if (p.y > h + 20) { p.y = -20; }

          const pulse = 0.7 + 0.3 * Math.sin(timeRef.current * 0.008 + p.phase);
          p.opacity = p.baseOpacity * pulse * 4;
          p.size = p.baseSize * (0.9 + 0.1 * Math.sin(timeRef.current * 0.01 + p.phase * 1.3));

          const mouseDx = px - mouseRef.current.x * w;
          const mouseDy = py - mouseRef.current.y * h;
          const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
          const mouseProximity = Math.max(0, 1 - mouseDist / (w * 0.15));
          const finalOpacity = Math.min(p.opacity + mouseProximity * 0.08, 0.35);

          if (finalOpacity > 0.01) {
            ctx.globalAlpha = finalOpacity;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.5, p.size + mouseProximity * 1.5), 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 0.4;

        for (let i = 0; i < lightP.length; i++) {
          const a = lightP[i];
          const ax = a.x + mx * 20 * 0.15;
          const ay = a.y + my * 20 * 0.15;

          for (let j = i + 1; j < lightP.length; j++) {
            const b = lightP[j];
            const dx = ax - (b.x + mx * 20 * 0.15);
            const dy = ay - (b.y + my * 20 * 0.15);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
              const alpha = 0.4 * (1 - dist / connectionDist) * a.baseOpacity * b.baseOpacity * 200;
              if (alpha > 0.01) {
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = "#3b82f6";
                ctx.beginPath();
                ctx.moveTo(ax, ay);
                ctx.lineTo(b.x + mx * 20 * 0.15, b.y + my * 20 * 0.15);
                ctx.stroke();
              }
            }
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
  }, [generateStars, generateParticles, spawnMeteor, generateLightParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
