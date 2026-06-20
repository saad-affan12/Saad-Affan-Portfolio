import { readDataFile } from "@/lib/data-store";
import type { BlogPost } from "@/lib/types";
import Link from "next/link";
import TiltCard from "@/components/effects/TiltCard";
import { BookOpen, Calendar, Clock } from "lucide-react";

export default async function BlogIndexPage() {
  const posts = await readDataFile<BlogPost[]>("blog") || [];
  const publishedPosts = posts.filter(p => p.published);

  return (
    <main className="min-h-screen py-16 sm:py-24 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="cinematic-container relative space-y-12">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-widest uppercase text-accent font-semibold">
            Writing
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Engineering Insights
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Detailed guides, code architectures, and deep dives into system performance and client-side design.
          </p>
        </div>

        {publishedPosts.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.05] rounded-2xl bg-card/20">
            <BookOpen className="mx-auto text-muted-foreground mb-3" size={32} />
            <p className="text-sm text-muted-foreground font-mono">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {publishedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <TiltCard className="h-full">
                  <div className="relative h-full bg-card border border-border rounded-xl p-6 transition-all duration-300 group-hover:border-accent/30 flex flex-col justify-between space-y-4">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
                    
                    <div className="space-y-3 z-10">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 z-10">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-accent/5 px-2.5 py-0.5 text-[10px] font-mono font-medium text-accent border border-accent/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
