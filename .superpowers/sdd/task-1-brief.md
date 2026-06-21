# Task: Create BrandIcons.tsx with Official Brand SVGs + Lookup System

## Requirements
Create `components/shared/BrandIcons.tsx` — a comprehensive SVG icon library and lookup system.

## File Location
`D:\Projects\Project-1\Saad-Affan-Portfolio-main\components\shared\BrandIcons.tsx`

## Interfaces to Export

```typescript
interface SkillIconDef {
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

// Lookup: normalize skill name, return icon definition or null
function getSkillIcon(name: string): SkillIconDef | null

// Render component: renders icon at given size with brand color as currentColor
function SkillBrandIcon({ name, size = 32 }: { name: string; size?: number }): JSX.Element | null
```

## Brand Icons (use brand colors, not purple)

Each SVG should be a simple, clean representation of the official logo. Use standard SVG paths. Icons should be recognizable at 32-36px.

| Skill | Brand Color | SVG Description |
|-------|-------------|-----------------|
| TypeScript | `#3178C6` | Blue square with TS text |
| JavaScript | `#F7DF1E` | Yellow square with JS text |
| React | `#61DAFB` | Atom/nucleus with orbit paths |
| Next.js | `#FFFFFF` | "N" text logo |
| Node.js | `#339933` | Node.js hex seal |
| Express | `#FFFFFF` | Lightning bolt "e" |
| MongoDB | `#47A248` | MongoDB leaf logo |
| MySQL | `#4479A1` | MySQL dolphin silhouette |
| Python | `#3776AB` | Python blue/yellow logo |
| Java | `#007396` | Java coffee cup logo |
| C | `#A8B9CC` | C letter logo |
| C++ | `#00599C` | C++ with ++ text |
| Git | `#F05032` | Git branch logo |
| GitHub | `#FFFFFF` | Octocat silhouette |
| Docker | `#2496ED` | Docker whale with containers |
| Firebase | `#FFCA28` | Flame/flare icon |
| Tailwind CSS | `#06B6D4` | Tailwind wind icon |
| Framer Motion | `#0055FF` | Framer diamond/pyramid |
| Vercel | `#FFFFFF` | Vercel triangle/chevron |
| Figma | `#F24E1E` | Figma square + circle logo |
| Bootstrap | `#7952B3` | Bootstrap B logo |
| PHP | `#777BB4` | PHP elephant |
| SQL | `#E38C00` | Database cylinder with SQL |
| JSON | `#FFFFFF` | JSON braces/object |
| Bash | `#4EAA25` | Terminal prompt |
| Flask | `#FFFFFF` | Flask outline |
| NumPy | `#013243` | NumPy cube/array |
| Scikit-learn | `#F7931E` | Scikit-learn hexagon/gear |
| HTML5 | `#E34F26` | HTML5 shield |
| CSS3 | `#1572B6` | CSS3 shield |
| Pandas | `#150458` | Pandas circle line |
| XGBoost | `#EC1C24` | XGBoost target |
| VS Code | `#007ACC` | VS Code infinity/flame |
| Postman | `#FF6C37` | Postman eye/globe |

## Code Symbol Icons (conceptual items, color: `#94A3B8`)

| Skill | Symbol |
|-------|--------|
| DSA | Binary tree / node diagram |
| OOP | Class blueprint / inheritance |
| DBMS | Database cylinder |
| Operating Systems | Terminal / OS monitor |
| Computer Architecture | CPU / chip |
| REST APIs | Link / chain nodes |
| Authentication | Shield / checkmark |
| AI Systems | Neural network nodes |
| Intelligent Interfaces | Brain / spark lines |
| Performance Optimization | Speed gauge |
| Full Stack Systems | Layered stack bars |
| AI-driven UX | Magic wand / sparkles |

## Name Normalization
The getSkillIcon() function must normalize these name variants:

```typescript
const NORMALIZE_MAP: Record<string, string> = {
  "typescript": "TypeScript",
  "javascript": "JavaScript",
  "react": "React",
  "next.js": "Next.js",
  "nextjs": "Next.js",
  "node.js": "Node.js",
  "nodejs": "Node.js",
  "express.js": "Express",
  "expressjs": "Express",
  "mongodb": "MongoDB",
  "mysql": "MySQL",
  "python": "Python",
  "java": "Java",
  "c++": "C++",
  "c": "C",
  "git": "Git",
  "github": "GitHub",
  "docker": "Docker",
  "firebase": "Firebase",
  "tailwind css": "Tailwind CSS",
  "tailwindcss": "Tailwind CSS",
  "framer motion": "Framer Motion",
  "framer": "Framer Motion",
  "vercel": "Vercel",
  "figma": "Figma",
  "bootstrap": "Bootstrap",
  "php": "PHP",
  "sql": "SQL",
  "json": "JSON",
  "bash": "Bash",
  "flask": "Flask",
  "numpy": "NumPy",
  "scikit-learn": "Scikit-learn",
  "scikitlearn": "Scikit-learn",
  "html5": "HTML5",
  "css3": "CSS3",
  "pandas": "Pandas",
  "xgboost": "XGBoost",
  "vs code": "VS Code",
  "vscode": "VS Code",
  "postman": "Postman",
  "dsa": "DSA",
  "oop": "OOP",
  "dbms": "DBMS",
  "operating systems": "Operating Systems",
  "operatingsystems": "Operating Systems",
  "computer architecture": "Computer Architecture",
  "computerarchitecture": "Computer Architecture",
  "rest apis": "REST APIs",
  "restapis": "REST APIs",
  "authentication": "Authentication",
  "ai systems": "AI Systems",
  "aisystems": "AI Systems",
  "intelligent interfaces": "Intelligent Interfaces",
  "intelligentinterfaces": "Intelligent Interfaces",
  "performance optimization": "Performance Optimization",
  "performanceoptimization": "Performance Optimization",
  "full stack systems": "Full Stack Systems",
  "fullstacksystems": "Full Stack Systems",
  "ai-driven ux": "AI-driven UX",
  "aidrivenux": "AI-driven UX",
}
```

## Rendering
- `SkillBrandIcon` wraps the icon component, sets `width={size} height={size}` and `fill={color}`
- Use `fill="currentColor"` on the SVG with the parent setting the CSS `color` property to the brand color
- Each SVG viewBox should be `0 0 24 24` for consistency

## Previous file to replace
The current `BrandIcons.tsx` has `GitHubIcon`, `LinkedInIcon`, `GmailIcon`, `InstagramIcon` — keep those exports exactly as they are (they're used by SocialLinks). Add the new skill icon system alongside them.

## Report Path
Write a report to `.superpowers/sdd/task-1-report.md` with:
1. Number of icons created (brand + code symbol)
2. List of all skill names mapped
3. Any normalization edge cases found
4. Build test result
