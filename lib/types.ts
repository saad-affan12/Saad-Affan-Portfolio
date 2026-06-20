export interface Hero {
  name: string;
  shortName: string;
  initials: string;
  tagline: string;
  role: string;
  description: string;
  email: string;
  location: string;
  birthDate: string;
  github: string;
  linkedin: string;
  instagram: string;
  portfolio: string;
  repo: string;
  resume: string;
  image: string;
  availability: string;
}

export interface Project {
  name: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  metrics?: string[];
  highlights: string[];
  github: string;
  live: string | null;
  image: string | null;
  featured: boolean;
  status: string;
  priority: number;
  problem?: string;
  solution?: string;
  architectureDescription?: string;
  architectureDiagram?: string;
  challenges?: string;
  learnings?: string;
  screenshots?: string[];
  achievements?: string[];
}

export interface RoadmapItem {
  role: string;
  company: string;
  type: string;
  period: string;
  badge?: string;
  logo?: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  degree?: string;
  program?: string;
  period: string;
  cgpa?: string;
  specialization?: string;
  description?: string;
  skills: string[];
  logo?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
}

export interface Socials {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  [key: string]: string;
}

export interface SetupCard {
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface DockLink extends NavLink {
  icon: string;
}

export interface SponsorInfo {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface FooterLinks {
  links: NavLink[];
  meta: NavLink[];
  contact: NavLink[];
}

export interface Settings {
  setupCards: SetupCard[];
  footerLinks: FooterLinks;
  topNavLinks: NavLink[];
  dockLinks: DockLink[];
  sponsorInfo: SponsorInfo;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export interface CLI {
  welcomeMessage: string;
  initialCommands: string[];
  commandHelp: Record<string, string>;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  logo?: string;
  current: boolean;
  order: number;
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  readTime: string;
  tags: string[];
  content: string;
  published: boolean;
  cover?: string;
  publishedAt?: string;
  category?: string;
}

export interface ChangelogItem {
  version: string;
  title: string;
  date: string;
  description: string;
  highlights: string[];
}

export type DataKey = 'hero' | 'projects' | 'roadmap' | 'education' | 'skills' | 'socials' | 'settings' | 'seo' | 'cli' | 'blog' | 'changelog';

export interface DataMap {
  hero: Hero;
  projects: Project[];
  roadmap: RoadmapItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  socials: Socials;
  settings: Settings;
  seo: SEO;
  cli: CLI;
  blog: BlogPost[];
  changelog: ChangelogItem[];
}

export type DataValue<T extends DataKey> = DataMap[T];

export const DATA_FILES: Record<DataKey, string> = {
  hero: 'hero.json',
  projects: 'projects.json',
  roadmap: 'roadmap.json',
  education: 'education.json',
  skills: 'skills.json',
  socials: 'socials.json',
  settings: 'settings.json',
  seo: 'seo.json',
  cli: 'cli.json',
  blog: 'blog.json',
  changelog: 'changelog.json',
};
