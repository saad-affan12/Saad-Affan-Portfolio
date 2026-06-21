# Skills Section Refactor — Premium Black Glass Badges

**Date:** 2026-06-21  
**Status:** Approved  
**Audience:** Developer Portfolio / Recruiter-facing  

## Goal

Redesign the Skills/Technologies section of Saad Affan's portfolio from purple translucent cards into premium black glass pill-shaped badges that match the polish of Linear, Vercel, Framer, and Raycast. Official brand logos, high contrast, maximal readability.

## Non-goals

- Do not change the category filter system
- Do not change the infinite-scroll marquee behavior
- Do not change the data model (skills.json)
- Do not alter the purple atmospheric dark-mode background
- Do not add decorative effects that reduce readability

## Card Design

```
┌─────────────────────────────────────────────┐
│  [Brand SVG 28px]  Technology Name          │
│                     font-semibold text-base  │
│                     color: #FFFFFF           │
└─────────────────────────────────────────────┘
  min-h-[88px] · px-6 · rounded-full · gap-3
  bg-[rgba(10,10,12,0.95)]
  border border-[rgba(255,255,255,0.08)]
  backdrop-filter: blur(10px)
```

- **Shape:** Full pill (`rounded-full` / `border-radius: 999px`)
- **Height:** `min-h-[88px]` — tall enough for recognizable logos
- **Padding:** Intentional horizontal space (`px-6`) — badges look proportional
- **Background:** `rgba(10,10,12,0.95)` — near-black, maximum contrast against the purple atmospheric background behind it
- **Border:** `1px solid rgba(255,255,255,0.08)` — a hairline glass edge, no glow
- **Backdrop blur:** `10px` — subtle glass separation from the background
- **Icon size:** 28px × 28px SVGs, original brand colors
- **Text:** `font-semibold text-base text-white` — clean, readable, no purple tint

### Hover Effect

```css
transform: scale(1.03);
box-shadow: 0 0 12px rgba(124, 58, 237, 0.12);
transition: all 300ms ease-out;
```

- Subtle 3% scale increase
- Very faint purple rim glow (nearly invisible, just enough to signal interactivity)
- Smooth 300ms ease-out
- No neon, no strong colored shadows

## Brand Icons

A comprehensive SVG icon system at `components/shared/BrandIcons.tsx`:

### Official brand logos (original colors retained)
- **TypeScript** → `#3178C6` blue
- **JavaScript** → `#F7DF1E` yellow
- **React** → `#61DAFB` cyan
- **Next.js** → white
- **Node.js** → `#339933` green
- **Express** → white
- **MongoDB** → `#47A248` green
- **MySQL** → `#4479A1` blue
- **Python** → `#3776AB` blue + `#FFD43B` yellow
- **Java** → `#007396` blue-orange
- **C** → `#A8B9CC` grey-blue
- **C++** → `#00599C` blue
- **Git** → `#F05032` orange
- **GitHub** → white
- **Docker** → `#2496ED` blue
- **Firebase** → `#FFCA28` yellow
- **Tailwind CSS** → `#06B6D4` cyan
- **Framer Motion** → `#0055FF` blue
- **Vercel** → white
- **Figma** → `#F24E1E` red + `#A259FF` purple
- **Bootstrap** → `#7952B3` purple
- **PHP** → `#777BB4` purple
- **SQL** → `#E38C00` orange
- **JSON** → white
- **Bash** → `#4EAA25` green
- **Flask** → white
- **NumPy** → `#013243` blue
- **Scikit-learn** → `#F7931E` orange

### Code symbol icons (conceptual items without brand logos)
- **DSA** → binary tree / node diagram icon
- **OOP** → class/blueprint icon
- **DBMS** → database cylinder icon
- **Operating Systems** → terminal/OS icon
- **Computer Architecture** → CPU/chip icon
- **REST APIs** → API/link icon
- **Authentication** → shield/lock icon
- **AI Systems** → neural network nodes icon
- **Intelligent Interfaces** → brain/spark icon
- **Performance Optimization** → gauge/speed icon
- **Full Stack Systems** → layered stack icon
- **AI-driven UX** → magic wand icon

## Marquee Animation

| Property | Current | New |
|----------|---------|-----|
| Duration per loop | 35s | **45s** |
| Direction | L/R alternating | Unchanged |
| Timing | linear | Unchanged |

45 seconds per loop creates a noticeably slower, more readable scroll — users can read tech names without eye strain.

## Spacing

- **Between rows:** `gap-y-5` (20px)
- **Between cards:** `gap-x-6` (24px)
- Edge fade gradients: `w-16 sm:w-32` (unchanged)

## Grid View (category filter)

When a specific category is selected:
- Grid layout: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3`
- Same pill card design, no animation
- Same icon + text treatment

## Files Changed

| File | Change |
|------|--------|
| `components/shared/BrandIcons.tsx` | Rewrite: 28+ official brand SVGs + code symbol icons + `getSkillIcon()` lookup |
| `components/sections/Skills.tsx` | Rewrite: new pill card design, slow marquee, brand-colored icons, hover effects |
| `app/globals.css` | Update marquee keyframes: 35s → 45s |

## Verification

- Build must compile with zero errors
- All 28+ icons render with correct brand colors
- Marquee scrolls at noticeably slower speed
- Category filters work identically to before
- Cards read as near-black glass pills, not purple
- Text is white `#FFFFFF`, not tinted
- No icons are broken, missing, or fallback Lucide icons
