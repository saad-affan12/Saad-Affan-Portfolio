<div align="center">

# Mohammed Saad Affan — Portfolio

<img 
  src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&duration=2500&pause=600&color=0EA5E9&center=true&vCenter=true&width=520&lines=Full-Stack+Engineer;AI+%26+Frontend+Specialist;Next.js+%7C+TypeScript+%7C+Tailwind;Deployed+on+Vercel" 
/>

🌐 **Live Website**  
👉 https://saad-portfolio-ashy.vercel.app/

</div>

---

## Overview

Production-ready personal portfolio built with **Next.js 15**, **React 19**, and **TypeScript**. Features a premium dual-theme system (dark + light), custom cursor with liquid inertia, command palette search, visitor analytics, and zero-runtime errors.

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4, CSS custom properties |
| **Animation** | Framer Motion, custom RAF loops |
| **Database** | Supabase (visitor analytics) |
| **Fonts** | Inter, Clash Display |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## Features

- **Dual theme** — Dark futuristic + premium light (Apple/Linear-inspired)
- **Custom cursor** — Triangle SVG with liquid inertia, magnetic pull, smart hover scaling, theme-adaptive glow. Single RAF loop, zero re-renders
- **Command palette** — Bottom-right search trigger (⌘K), fuzzy real-time search across 50+ items (pages, projects, skills, CLI commands)
- **Visitor analytics** — Supabase-powered count with graceful fallback when unconfigured
- **Ambient glow** — Cursor-reactive spotlight that follows mouse position
- **Floating triangles** — SVG background decoration with hydration-safe rendering
- **Smooth scroll** — Lenis-powered smooth scrolling
- **Page transitions** — Framer Motion AnimatePresence between routes
- **Responsive** — Mobile-first, touch-aware (cursor auto-disabled on touch devices)
- **Performance** — 60fps animations, dynamic imports for heavy components, GPU-accelerated effects

---

## Pages

| Route | Content |
|---|---|
| `/` | Hero, skills, featured projects, experience timeline |
| `/projects` | All projects with filtering |
| `/resume` | Full resume / CV |
| `/roadmap` | Learning roadmap & goals |
| `/tools` | Tooling & tech stack |
| `/cli` | CLI-style terminal interface |

---

## Getting Started

```bash
# Clone
git clone https://github.com/saad-affan12/saad-affan12.github.io.git

# Install
npm install

# Environment (optional — for visitor analytics)
cp .env.example .env.local
# Add your Supabase credentials

# Dev
npm run dev

# Build
npm run build

# Start
npm run start
```

### Environment Variables

Optional — visitor count gracefully hides when unconfigured:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API
│   └── api/visitors/       # Visitor counter API route
├── components/
│   ├── background/         # Galaxy & dot-grid backgrounds
│   ├── effects/            # PremiumCursor, FloatingTriangle, CursorSpotlight
│   ├── layout/             # TopNavbar, Footer, BottomDock
│   ├── providers/          # SmoothScrollProvider
│   ├── sections/           # Page sections (Hero, Skills, etc.)
│   └── shared/             # SearchBar, CommandPalette, VisitorCount, etc.
├── hooks/                  # Custom React hooks
├── lib/                    # Data, search index, Supabase client
└── public/                 # Static assets, fonts
```

---

## Build

```bash
npm run build
```

All pages are statically generated. Output:

```
✓ 10 static pages generated
✓ 1 API route (visitors)
✓ First Load JS shared: ~102 kB
```

---

## License

MIT

---

<div align="center">
Built by Mohammed Saad Affan
</div>
