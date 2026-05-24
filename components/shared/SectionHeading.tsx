import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", align === "center" && "text-center", className)}>
      {eyebrow && (
        <span className="section-label">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-gradient">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
