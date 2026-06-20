"use client";

import React, { useEffect, useRef } from "react";
import { useBackgroundState } from "@/components/providers/BackgroundStateProvider";

export default function EngineeringBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Floating glass panels refs
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const panel4Ref = useRef<HTMLDivElement>(null);

  // Gradient mesh blobs refs
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  // Light beam indicators (sliding glow points) refs
  const beamV1Ref = useRef<HTMLDivElement>(null);
  const beamV2Ref = useRef<HTMLDivElement>(null);
  const beamH1Ref = useRef<HTMLDivElement>(null);

  const { activeDiagram, workstationMode, searchFocused } = useBackgroundState();

  // Animation values stored in refs for 60 FPS performance without React re-renders
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollYRef = useRef(0);

  // Store background context state in ref
  const stateRef = useRef({ activeDiagram, workstationMode, searchFocused });
  useEffect(() => {
    stateRef.current = { activeDiagram, workstationMode, searchFocused };
  }, [activeDiagram, workstationMode, searchFocused]);

  // Track scroll position in ref
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse coordinates in ref
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate offsets from the center of the window (-1 to 1)
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // requestAnimationFrame render loop
  useEffect(() => {
    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.0025;

      // Lerp mouse variables for zero-lag smooth motion
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;

      const scrollY = scrollYRef.current;
      const { activeDiagram, workstationMode, searchFocused } = stateRef.current;

      // Update Cursor Spotlight position dynamically on the container
      if (containerRef.current) {
        const clientX = (mouse.x * window.innerWidth / 2) + window.innerWidth / 2;
        const clientY = (mouse.y * window.innerHeight / 2) + window.innerHeight / 2;
        containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
      }

      // 1. ANIMATED GRADIENT MESH BLOBS (Layer 1)
      // Slow, sweeping elliptical trajectories
      const blob1X = Math.sin(time) * 140 + (mouse.x * 40);
      const blob1Y = Math.cos(time * 0.8) * 140 + (mouse.y * 40);
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${blob1X}px, ${blob1Y}px, 0)`;
      }

      const blob2X = Math.cos(time * 1.1) * 120 - (mouse.x * 50);
      const blob2Y = Math.sin(time * 0.9) * 120 - (mouse.y * 50);
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${blob2X}px, ${blob2Y}px, 0)`;
      }

      const blob3X = Math.sin(time * 0.7) * 90 + (mouse.x * 30);
      const blob3Y = Math.cos(time * 1.2) * 90 - (mouse.y * 30);
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${blob3X}px, ${blob3Y}px, 0)`;
      }

      // 2. SLIDING GLOW DOTS ON THE DATA HIGHWAYS (Layer 4)
      const slidingPos1 = ((time * 140) % 100);
      const slidingPos2 = (((time * 110) + 40) % 100);
      const slidingPos3 = (((time * 120) + 20) % 100);

      if (beamV1Ref.current) {
        beamV1Ref.current.style.top = `${slidingPos1}%`;
      }
      if (beamV2Ref.current) {
        beamV2Ref.current.style.top = `${slidingPos2}%`;
      }
      if (beamH1Ref.current) {
        beamH1Ref.current.style.left = `${slidingPos3}%`;
      }

      // 3. LAYERED PARALLAX GLASS PANELS (Layer 2 & 3)
      // Panel 1: Hero area
      if (panel1Ref.current) {
        const p1X = mouse.x * -25;
        const p1Y = (scrollY * 0.08) + (mouse.y * -25);
        const rotX = mouse.y * -5;
        const rotY = mouse.x * 5;
        panel1Ref.current.style.transform = `translate3d(${p1X}px, ${p1Y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Panel 2: Projects area
      if (panel2Ref.current) {
        const p2X = mouse.x * -16;
        const p2Y = (scrollY * 0.12) + (mouse.y * -16);
        const rotX = mouse.y * -3;
        const rotY = mouse.x * 3;
        panel2Ref.current.style.transform = `translate3d(${p2X}px, ${p2Y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Panel 3: Experience area
      if (panel3Ref.current) {
        const p3X = mouse.x * -20;
        const p3Y = (scrollY * 0.06) + (mouse.y * -20);
        const rotX = mouse.y * -4;
        const rotY = mouse.x * 4;
        panel3Ref.current.style.transform = `translate3d(${p3X}px, ${p3Y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Panel 4: Roadmap area
      if (panel4Ref.current) {
        const p4X = mouse.x * -10;
        const p4Y = (scrollY * 0.04) + (mouse.y * -10);
        const rotX = mouse.y * -2;
        const rotY = mouse.x * 2;
        panel4Ref.current.style.transform = `translate3d(${p4X}px, ${p4Y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 bg-[#020617] overflow-hidden select-none pointer-events-none perspective-[1200px]"
    >
      {/* ----------------------------------------------------
          LAYER 1: ANIMATED GRADIENT MESH
          ---------------------------------------------------- */}
      <div className="absolute inset-0 overflow-hidden opacity-30 mix-blend-screen filter blur-[120px] will-change-transform">
        {/* Blob 1: Primary Blue */}
        <div
          ref={blob1Ref}
          className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-60"
        />
        {/* Blob 2: Secondary Violet */}
        <div
          ref={blob2Ref}
          className="absolute -bottom-1/4 -right-1/4 w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 opacity-50"
        />
        {/* Blob 3: Accent Cyan */}
        <div
          ref={blob3Ref}
          className="absolute top-1/3 left-1/3 w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-45"
        />
      </div>

      {/* ----------------------------------------------------
          THE SYSTEM GRID (AI STARTUP KIT GRID NET)
          ---------------------------------------------------- */}
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* ----------------------------------------------------
          LAYER 4: AMBIENT DATA HIGHWAYS & LIGHT BEAMS
          ---------------------------------------------------- */}
      {/* Vertical Highway 1 */}
      <div className="absolute top-0 left-[25vw] w-[1px] h-full bg-white/[0.015] pointer-events-none">
        <div
          ref={beamV1Ref}
          className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[80px] bg-gradient-to-b from-transparent via-[#06b6d4]/40 to-transparent"
        />
      </div>
      {/* Vertical Highway 2 */}
      <div className="absolute top-0 left-[75vw] w-[1px] h-full bg-white/[0.015] pointer-events-none">
        <div
          ref={beamV2Ref}
          className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[80px] bg-gradient-to-b from-transparent via-[#8b5cf6]/40 to-transparent"
        />
      </div>
      {/* Horizontal Highway 1 */}
      <div className="absolute top-[35vh] left-0 w-full h-[1px] bg-white/[0.015] pointer-events-none">
        <div
          ref={beamH1Ref}
          className="absolute top-1/2 -translate-y-1/2 w-[80px] h-[3px] bg-gradient-to-r from-transparent via-[#2563eb]/40 to-transparent"
        />
      </div>

      {/* ----------------------------------------------------
          LAYER 2 & 3: GLASSMORPHISM FLOATING PANELS & HOLOGRAPHIC SHEETS
          ---------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden preserve-3d">
        
        {/* Panel 1: Hero area top-left */}
        <div
          ref={panel1Ref}
          className="absolute top-[12vh] left-[5vw] w-[340px] h-[190px] rounded-2xl border border-white/[0.07] bg-slate-900/10 backdrop-blur-[16px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out will-change-transform"
        >
          {/* Holographic grid sheet */}
          <div className="absolute inset-0 rounded-2xl opacity-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px]" />
          {/* Corner indicators */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/20" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/20" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/20" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/20" />
          {/* Engineering status code */}
          <div className="absolute bottom-3 left-4 font-mono text-[8px] tracking-wider text-[#06b6d4]/40">
            LOC: [ 0x5F11 ] / DEV_CORE: LIVE
          </div>
          <div className="absolute top-3 right-4 font-mono text-[8px] tracking-wider text-slate-400/40">
            [ ENGINE_MOD ]
          </div>
        </div>

        {/* Panel 2: Projects area */}
        <div
          ref={panel2Ref}
          className="absolute top-[52vh] right-[10vw] w-[280px] h-[170px] rounded-2xl border border-white/[0.07] bg-slate-900/10 backdrop-blur-[16px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out will-change-transform"
        >
          <div className="absolute inset-0 rounded-2xl opacity-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute top-3 left-4 font-mono text-[8px] tracking-wider text-[#2563eb]/45">
            [ ECOSYSTEM_MAP_09 ]
          </div>
          {/* Simplified vector schematic */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
              <circle cx="20" cy="20" r="8" stroke="#FFF" strokeWidth="1" />
              <circle cx="50" cy="20" r="8" stroke="#FFF" strokeWidth="1" />
              <circle cx="80" cy="20" r="8" stroke="#FFF" strokeWidth="1" />
              <path d="M28 20 L42 20 M58 20 L72 20" stroke="#FFF" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Panel 3: Experience area */}
        <div
          ref={panel3Ref}
          className="absolute top-[105vh] left-[8vw] w-[320px] h-[190px] rounded-2xl border border-white/[0.07] bg-slate-900/10 backdrop-blur-[16px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out will-change-transform"
        >
          <div className="absolute inset-0 rounded-2xl opacity-[0.08] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
          <div className="absolute top-4 left-5 font-mono text-[8px] tracking-wider text-[#8b5cf6]/40">
            // WORKFLOW_TIMELINE
          </div>
          <div className="absolute bottom-4 left-5 font-mono text-[8px] text-slate-500/40">
            SYSTEM_STATUS: OK
          </div>
        </div>

        {/* Panel 4: Roadmap area */}
        <div
          ref={panel4Ref}
          className="absolute top-[162vh] right-[10vw] w-[300px] h-[160px] rounded-2xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-[12px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07),0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out will-change-transform"
        >
          <div className="absolute inset-0 rounded-2xl opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
          <div className="absolute top-4 left-5 font-mono text-[8px] tracking-wider text-[#06b6d4]/40">
            ROADMAP_INDEX_v4
          </div>
        </div>

      </div>

      {/* ----------------------------------------------------
          LAYER 6: DEPTH FOG & NOISE OVERLAY
          ---------------------------------------------------- */}
      {/* Matte noise texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.012]" />

      {/* Radial vignette fade for deep edge contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#020617_95%)] pointer-events-none" />

      {/* ----------------------------------------------------
          LAYER 5: CURSOR SPOTLIGHT
          ---------------------------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500 bg-[radial-gradient(circle_550px_at_var(--mouse-x)_var(--mouse-y),rgba(37,99,235,0.045),transparent_100%)]"
      />
    </div>
  );
}
