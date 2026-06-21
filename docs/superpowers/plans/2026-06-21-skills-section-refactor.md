# Skills Section Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Skills section with premium black glass pill badges, official brand-colored SVGs, slower marquee, and maximum readability.

**Architecture:** Replace the external `skillicons.dev` image-based icon system with a comprehensive local SVG icon library in `BrandIcons.tsx`. Rewrite the `Skills.tsx` card rendering to use pill-shaped near-black glass cards with brand-colored icons and white text. Slow marquee animation to 45s.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, React (inline SVGs)

## Global Constraints

- Every brand icon MUST use its official brand colors — no purple recoloring
- Text on skill pills MUST be `#FFFFFF` white, no tinting
- Card background MUST be `rgba(10,10,12,0.95)` — near-black, maximum contrast
- All existing functionality (filters, marquee, categories, infinite scroll) preserved exactly
- Build must compile with zero errors
- No external image or icon dependencies — all SVGs inline

---

### Task 1: Update Marquee Animation Speed in globals.css

**Files:**
- Modify: `app/globals.css` (lines ~712-703 at `@utility animate-marquee-left` and `@utility animate-marquee-right`)

- [ ] **Step 1: Change marquee-left duration from 35s to 45s**

```css
@utility animate-marquee-left {
  animation: marquee-left 45s linear infinite;
}
```

- [ ] **Step 2: Change marquee-right duration from 35s to 45s**

```css
@utility animate-marquee-right {
  animation: marquee-right 45s linear infinite;
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npx next build 2>&1 | tail -5`
Expected: No errors, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "perf: slow marquee animation to 45s for readability"
```

---

### Task 2: Rewrite BrandIcons.tsx with Official Brand SVGs + lookup system

**Files:**
- Rewrite: `components/shared/BrandIcons.tsx`

**Interfaces:**
- Produces: `getSkillIcon(name: string): { icon: React.ComponentType<SVGProps<SVGSVGElement>>, color: string } | null`
- Produces: `<SkillBrandIcon name="TypeScript" size={28} />` component

This task creates the complete SVG icon library. Each brand icon is a self-contained React SVG component with official brand colors. A lookup map normalizes skill names and returns the correct icon + brand color. Conceptual items (DSA, OOP, etc.) get clean code-symbol SVGs.

- [ ] **Step 1: Write BrandIcons.tsx with all brand SVGs and the lookup system**

File: `components/shared/BrandIcons.tsx`

The file structure:
1. Icon utility type (`SkillIconDef = { component: ...; color: string }`)
2. Individual SVG icon components (brands + symbols)
3. `SKILL_ICON_MAP: Record<string, SkillIconDef>` — maps normalized skill names
4. `getSkillIcon(name: string)` — normalize + lookup function
5. `<SkillBrandIcon name={...} size={...} />` — render component

Brand icons to include with their official colors:

| Skill | Brand Color |
|-------|------------|
| TypeScript | `#3178C6` |
| JavaScript | `#F7DF1E` |
| React | `#61DAFB` |
| Next.js | `#FFFFFF` |
| Node.js | `#339933` |
| Express | `#FFFFFF` |
| MongoDB | `#47A248` |
| MySQL | `#4479A1` |
| Python | `#3776AB` |
| Java | `#007396` |
| C | `#A8B9CC` |
| C++ | `#00599C` |
| Git | `#F05032` |
| GitHub | `#FFFFFF` |
| Docker | `#2496ED` |
| Firebase | `#FFCA28` |
| Tailwind CSS | `#06B6D4` |
| Framer Motion | `#0055FF` |
| Vercel | `#FFFFFF` |
| Figma | `#F24E1E` |
| Bootstrap | `#7952B3` |
| PHP | `#777BB4` |
| SQL | `#E38C00` |
| JSON | `#FFFFFF` |
| Bash | `#4EAA25` |
| Flask | `#FFFFFF` |
| NumPy | `#013243` |
| Scikit-learn | `#F7931E` |
| HTML5 | `#E34F26` |
| CSS3 | `#1572B6` |
| Pandas | `#150458` |
| XGBoost | `#EC1C24` |
| VS Code | `#007ACC` |
| Postman | `#FF6C37` |

Code symbol icons for conceptual items (color: `#94A3B8` slate-400):

| Skill | Symbol |
|-------|--------|
| DSA | Binary tree / node network |
| OOP | Class / blueprint diagram |
| DBMS | Database cylinder |
| Operating Systems | Terminal prompt |
| Computer Architecture | CPU / chip |
| REST APIs | Link / API nodes |
| Authentication | Shield / lock |
| AI Systems | Neural network nodes |
| Intelligent Interfaces | Brain / spark |
| Performance Optimization | Gauge / speedometer |
| Full Stack Systems | Layered stack |
| AI-driven UX | Magic wand / sparkles |

- [ ] **Step 2: Verify BrandIcons.tsx compiles**

Run: `npx next build 2>&1 | tail -10`
Expected: Build succeeds, no errors related to BrandIcons.

- [ ] **Step 3: Commit**

```bash
git add components/shared/BrandIcons.tsx
git commit -m "feat: add comprehensive SVG brand icon library with getSkillIcon()"
```

---

### Task 3: Rewrite Skills.tsx with Premium Black Glass Pill Design

**Files:**
- Modify: `components/sections/Skills.tsx`

**Interfaces:**
- Consumes: `getSkillIcon(name)` from `BrandIcons.tsx`
- Consumes: `useData('skills')` (unchanged)
- Preserves: All filter/marquee/category behavior

- [ ] **Step 1: Rewrite Skills.tsx with new pill card design**

The new component architecture:

1. Remove the old `SkillIcon` function entirely (replaced by `SkillBrandIcon`)
2. Keep `getRowItems()` helper (unchanged)
3. Keep all state/category/filter logic (unchanged)
4. Rewrite the pill card rendering with:
   - `rounded-full` pills
   - `min-h-[88px]` height
   - `bg-[rgba(10,10,12,0.95)]` near-black background
   - `border border-white/8` subtle edge
   - `backdrop-blur` glass effect
   - 28px brand-colored SVG icons
   - `text-base font-semibold text-white` labels
   - Hover: `scale-[1.03]` + subtle purple shadow
   - 24px horizontal / 20px vertical spacing

- [ ] **Step 2: Build and verify**

Run: `npx next build 2>&1 | tail -10`
Expected: Build succeeds with zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat: redesign skills section with premium black glass pill cards"
```

---

### Task 4: Self-Review ✓

- Spec coverage: All requirements mapped (marquee speed → Task 1, brand icons → Task 2, pill design → Task 3)
- No placeholders, TBDs, or TODOs
- Type consistency: `getSkillIcon` returns `{ icon, color }` — used in Task 3
