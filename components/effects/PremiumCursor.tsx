"use client";

import { useEffect, useRef, useState } from "react";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

const INTERACTIVE = "a, button, input, textarea, select, [role='button'], [data-cursor]";

export default function PremiumCursor() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: -100, y: -100 });
  const prev = useRef({ x: -100, y: -100 });
  const rot = useRef(0);
  const rotTarget = useRef(0);
  const st = useRef({ scale: 1, hidden: false });
  const hoveredEl = useRef<Element | null>(null);
  const idlePhase = useRef(0);
  const lastMove = useRef(Date.now());
  const rafId = useRef(0);
  const [ready, setReady] = useState<false | "hidden" | "visible">(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)").matches;
    if (!fine) {
      setReady("hidden");
      return;
    }
    setReady("visible");

    document.documentElement.classList.add("hide-native-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      lastMove.current = Date.now();
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest(INTERACTIVE) as HTMLElement | null;
      hoveredEl.current = el;
      if (el) {
        const type = el.getAttribute("data-cursor");
        if (type === "text") st.current.scale = 0.65;
        else if (type === "card") st.current.scale = 1.5;
        else st.current.scale = 1.25;
      } else {
        const tag = target.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || (target as HTMLElement).isContentEditable) {
          st.current.scale = 0.5;
        } else {
          st.current.scale = 1;
        }
      }
      st.current.hidden = false;
    };

    const onLeave = () => { st.current.hidden = true; };
    const onEnter = () => { st.current.hidden = false; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const loop = () => {
      // Velocity for rotation
      const vx = mouse.current.x - prev.current.x;
      const vy = mouse.current.y - prev.current.y;
      prev.current = { x: mouse.current.x, y: mouse.current.y };

      const idle = Date.now() - lastMove.current > 2500;

      // Liquid inertia — slower lerp for floating feel
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.10);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.10);

      // Micro rotation from horizontal velocity (±12° max)
      rotTarget.current = clamp(vx * 0.5, -12, 12);
      rot.current = lerp(rot.current, rotTarget.current, 0.06);

      // Magnetic pull toward interactive elements
      let magX = 0;
      let magY = 0;
      if (hoveredEl.current && st.current.scale > 1) {
        const rect = (hoveredEl.current as HTMLElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mouse.current.x;
        const dy = cy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 80) {
          const strength = 0.15 * (1 - dist / 80);
          magX = dx * strength;
          magY = dy * strength;
        }
      }

      // Idle micro-float
      let idleX = 0;
      let idleY = 0;
      let idleR = 0;
      if (idle && st.current.scale === 1) {
        idlePhase.current += 0.015;
        idleX = Math.sin(idlePhase.current) * 1.2;
        idleY = Math.cos(idlePhase.current * 0.7) * 0.8;
        idleR = Math.sin(idlePhase.current * 0.5) * 0.8;
      }

      if (svgRef.current) {
        const x = pos.current.x + magX + idleX - 10;
        const y = pos.current.y + magY + idleY - 10;
        const r = rot.current + idleR;
        svgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${st.current.scale}) rotate(${r}deg)`;
        svgRef.current.style.opacity = st.current.hidden ? "0" : "1";
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("hide-native-cursor");
    };
  }, []);

  if (!ready || ready === "hidden") return null;

  return (
    <svg
      ref={svgRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform premium-cursor-glow"
      style={{
        width: 20,
        height: 20,
        transformOrigin: "10px 10px",
        transition: "opacity 0.25s ease",
      }}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 2.5L15 15M2.5 2.5L7.5 17.5L10 10L17.5 7.5L2.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground"
      />
    </svg>
  );
}
