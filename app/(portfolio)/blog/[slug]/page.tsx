import { readDataFile } from "@/lib/data-store";
import type { BlogPost } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await readDataFile<BlogPost[]>("blog") || [];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-16 sm:py-24 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="cinematic-container relative max-w-3xl space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
            Back to writing
          </Link>
        </div>

        {/* Post Header */}
        <div className="space-y-4 border-b border-white/[0.06] pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-accent/5 px-3 py-1 text-xs font-mono font-medium text-accent border border-accent/15"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
              <Share2 size={12} />
              Share
            </button>
          </div>
        </div>

        {/* Post Content */}
        <article className="prose dark:prose-invert max-w-none text-muted-foreground dark:text-gray-300 leading-relaxed text-sm sm:text-base space-y-6">
          <p className="whitespace-pre-line leading-relaxed">{post.content}</p>
        </article>
      </div>
    </main>
  );
}
