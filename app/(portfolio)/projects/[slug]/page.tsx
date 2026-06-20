import { readDataFile } from "@/lib/data-store";
import type { Project } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, ShieldAlert, Cpu, Database, CheckCircle, Code, Layers } from "lucide-react";

const SLUG_MAP: Record<string, string> = {
  "smart-attendance": "smart-ai-attendance-system",
  "neuroadaptive": "neuroadaptive-ux",
  "securevote": "secure-vote-system",
  "student-stress": "student-stress-prediction",
};

// Hardcoded sample mock snippets for an interactive engineering aesthetic
const PROJECT_CODE_SNIPPETS: Record<string, { title: string; lang: string; code: string }> = {
  "secure-vote-system": {
    title: "VoterVerification.ts",
    lang: "typescript",
    code: `// Secure Voter JWT check and unique ballot validation
export async function castVote(voterId: string, electionId: string, ballot: string) {
  const session = await db.startSession();
  try {
    session.startTransaction();
    
    // Enforce one-vote rule atomically in MongoDB
    const voter = await Voter.findOneAndUpdate(
      { _id: voterId, "ballots.electionId": { $ne: electionId } },
      { $push: { ballots: { electionId, castedAt: new Date() } } },
      { session, new: true }
    );

    if (!voter) {
      throw new Error("Citizen has already cast a ballot for this election.");
    }
    
    await ElectionResult.updateOne(
      { electionId, "candidate.id": ballot },
      { $inc: { "candidate.votes": 1 } },
      { session }
    );

    await session.commitTransaction();
    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return { success: false, error: error.message };
  }
}`
  },
  "neuroadaptive-ux": {
    title: "interactionEngine.ts",
    lang: "typescript",
    code: `// Local dynamic typing cadence and friction calculator
export function calculateFriction(metrics: InteractionMetrics): UXState {
  const { typingSpeed, correctionCount, mouseJitter, idleDuration } = metrics;
  
  // Calculate rolling fatigue quotient
  const speedFriction = Math.max(0, (120 - typingSpeed) * 0.4);
  const mistakeFriction = correctionCount * 12;
  const cursorFriction = mouseJitter * 2.5;

  const totalStress = speedFriction + mistakeFriction + cursorFriction;

  if (idleDuration > 10000) return "Idle";
  if (totalStress > 85) return "Stressed";
  if (totalStress > 45) return "Rushed";
  return "Calm";
}`
  },
  "smart-ai-attendance-system": {
    title: "anti_spoofing_cnn.py",
    lang: "python",
    code: `# CNN Anti-spoofing checker for real skin texture vs screen printouts
import tensorflow as tf

def build_anti_spoofing_model():
    model = tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(128, 128, 3)),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(2, activation='softmax') # [Spoof, Real]
    ])
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model`
  },
  "student-stress-prediction": {
    title: "stress_pipeline.py",
    lang: "python",
    code: `# ML Preprocessing Pipeline with Dimensionality Reduction and XGBoost
from sklearn.pipeline import Pipeline
from sklearn.decomposition import PCA
from xgboost import XGBClassifier

def create_training_pipeline(n_components=5):
    # Chain feature scaling, PCA decorrelation, and classifier
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('pca', PCA(n_components=n_components)),
        ('classifier', XGBClassifier(
            max_depth=4,
            learning_rate=0.05,
            n_estimators=200,
            subsample=0.8
        ))
    ])
    return pipeline`
  }
};

export default async function ProjectShowcasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actualSlug = SLUG_MAP[slug] || slug;

  const projects = await readDataFile<Project[]>("projects") || [];
  const project = projects.find((p) => p.slug === actualSlug);

  if (!project) {
    notFound();
  }

  const snippet = PROJECT_CODE_SNIPPETS[slug] || PROJECT_CODE_SNIPPETS[actualSlug];

  return (
    <main className="min-h-screen py-16 sm:py-24 relative overflow-hidden">
      {/* Premium background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="cinematic-container relative space-y-10 sm:space-y-14">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
            Back to projects
          </Link>
        </div>

        {/* Header Title Section */}
        <div className="space-y-4 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/25 uppercase">
              {project.status || "Completed"}
            </span>
            <span className="text-xs font-mono text-muted-foreground">{project.date}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text">
                {project.name}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-accent/15 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <ExternalLink size={12} />
                  Live Demo
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-accent/30 transition-all"
              >
                <Github size={12} />
                Source Code
              </a>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.metrics?.map((metric, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card/40 p-4 font-mono text-center"
            >
              <div className="text-xs text-muted-foreground mb-1">Highlight</div>
              <div className="text-sm font-bold text-accent">{metric}</div>
            </div>
          ))}
        </div>

        {/* Case Study Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Main Case Study Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Problem & Solution Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border bg-card/40 p-5 space-y-2">
                <h3 className="text-sm font-semibold tracking-wide text-foreground flex items-center gap-2 uppercase font-mono">
                  <ShieldAlert size={14} className="text-red-400" />
                  The Problem
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {project.problem || "Unspecified critical engineering issues solved during execution."}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card/40 p-5 space-y-2">
                <h3 className="text-sm font-semibold tracking-wide text-foreground flex items-center gap-2 uppercase font-mono">
                  <CheckCircle size={14} className="text-emerald-400" />
                  The Solution
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {project.solution || "Clean structural software updates implemented to resolve the baseline issue."}
                </p>
              </div>
            </div>

            {/* Architecture section */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-foreground">Architecture Highlight</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.architectureDescription || "High-level modular integration diagram representing processing state flow."}
              </p>
              {project.architectureDiagram && (
                <div className="rounded-xl border border-border bg-black/[0.04] dark:bg-black/40 p-4 sm:p-5 font-mono text-xs overflow-x-auto text-accent flex items-center justify-center min-h-[70px]">
                  <span className="whitespace-pre tracking-wide text-center">{project.architectureDiagram}</span>
                </div>
              )}
            </div>

            {/* Snippet Showcase */}
            {snippet && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-foreground">Key Implementation Details</h3>
                <div className="rounded-xl border border-border bg-muted/20 dark:bg-[#0d0d14] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-black/[0.03] dark:bg-black/[0.3] border-b border-border text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Code size={12} className="text-accent" />
                      {snippet.title}
                    </span>
                    <span className="uppercase">{snippet.lang}</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[11px] sm:text-xs font-mono text-muted-foreground dark:text-gray-300 leading-relaxed max-w-full">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Metadata Column */}
          <div className="space-y-6">
            {/* Tech Stack Box */}
            <div className="rounded-xl border border-border bg-card/40 p-5 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-accent/5 px-2.5 py-1 text-xs font-mono font-medium text-accent border border-accent/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Learnings */}
            <div className="rounded-xl border border-border bg-card/40 p-5 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                Challenges & Learnings
              </h3>
              <div className="space-y-3.5">
                {project.challenges && (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-foreground uppercase tracking-wide font-mono">Challenge:</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{project.challenges}</p>
                  </div>
                )}
                {project.learnings && (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-foreground uppercase tracking-wide font-mono">Learning:</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{project.learnings}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <div className="rounded-xl border border-border bg-card/40 p-5 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                  Impact Metrics
                </h3>
                <ul className="space-y-2">
                  {project.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
