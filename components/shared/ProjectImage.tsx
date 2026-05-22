"use client";

import Image from "next/image";
import { projects } from "@/lib/data";

interface ProjectImageProps {
  src: string | null;
  alt: string;
  initials: string;
  gradientClass: string;
}

export default function ProjectImage({ src, alt, initials, gradientClass }: ProjectImageProps) {
  const hasImage = src !== null && src !== "";

  if (hasImage) {
    return (
      <div className="relative h-48 w-full overflow-hidden bg-card">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-10" style={{ background: 'var(--img-fade-overlay)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <div className="flex gap-3">
            {projectActions(alt)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-48 bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
      <div className="absolute inset-0 z-10" style={{ background: 'var(--img-fade-overlay)' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-5xl font-bold text-foreground/5 select-none tracking-tighter">
          {initials}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 via-transparent to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
        <div className="flex gap-3">
          {projectActions(alt)}
        </div>
      </div>
    </div>
  );
}

function projectActions(projectName: string) {
  const project = projects.find((p) => p.name === projectName);
  if (!project) return null;

  return (
    <>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-foreground/90 text-background px-4 py-2 text-xs font-medium hover:bg-foreground transition-all"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Live Demo
        </a>
      )}
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-lg bg-card/80 text-foreground backdrop-blur-sm border border-border px-4 py-2 text-xs font-medium hover:bg-card transition-all"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        Source
      </a>
    </>
  );
}


