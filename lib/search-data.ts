export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  category: string;
}

export const searchData: SearchItem[] = [
  // Pages
  { id: "page-home", title: "Home", description: "Portfolio overview — hero, about, experience", href: "/#hero", icon: "🏠", category: "Pages" },
  { id: "page-roadmap", title: "Roadmap", description: "Journey, experience, and timeline", href: "/roadmap", icon: "🗺️", category: "Pages" },
  { id: "page-projects", title: "Projects", description: "Featured work and case studies", href: "/projects", icon: "📁", category: "Pages" },
  { id: "page-resume", title: "Resume", description: "Skills, education, and experience", href: "/resume", icon: "📄", category: "Pages" },
  { id: "page-tools", title: "Tools", description: "Toolkit and setup", href: "/tools", icon: "🛠️", category: "Pages" },
  { id: "page-cli", title: "CLI", description: "Interactive terminal", href: "/cli", icon: "💻", category: "Pages" },

  // Sections
  { id: "sec-hero", title: "About Me", description: "Mohammed Saad Affan A — Full-Stack & AI Developer", href: "/#hero", icon: "👤", category: "Sections" },
  { id: "sec-stack", title: "Tech Stack", description: "Languages, frameworks, tools, and core concepts", href: "/#stack", icon: "⚡", category: "Sections" },
  { id: "sec-projects", title: "Featured Work", description: "Real-world projects with focus on performance", href: "/#projects", icon: "📁", category: "Sections" },
  { id: "sec-experience", title: "Experience", description: "Academic projects, club involvement, and hands-on work", href: "/#experience", icon: "💼", category: "Sections" },
  { id: "sec-education", title: "Education", description: "VIT, Islamiah Boys — CS, AI & ML", href: "/#education", icon: "🎓", category: "Sections" },
  { id: "sec-setup", title: "My Toolkit", description: "Editor, terminal, version control, and more", href: "/#setup", icon: "🛠️", category: "Sections" },
  { id: "sec-github", title: "GitHub Activity", description: "Contributions heatmap, repos, and activity status", href: "/#github", icon: "📊", category: "Sections" },
  { id: "sec-contact", title: "Get in Touch", description: "Let's talk — open to collaborations and internships", href: "/#contact", icon: "✉️", category: "Sections" },
  { id: "sec-sponsor", title: "Support My Work", description: "Sponsor on GitHub", href: "/#sponsor", icon: "❤️", category: "Sections" },

  // Projects
  { id: "proj-secure-vote", title: "Secure Vote System", description: "Enterprise-grade online voting with RBAC, JWT, one-vote enforcement", href: "/projects#secure-vote-system", icon: "🗳️", category: "Projects" },
  { id: "proj-neuroadaptive", title: "NeuroAdaptive UX", description: "Client-side adaptive interface that responds to user behavior", href: "/projects#neuroadaptive-ux", icon: "🧠", category: "Projects" },
  { id: "proj-smart-ai", title: "Smart AI Attendance System", description: "IoT face recognition attendance with ESP32-CAM and anti-spoofing", href: "/projects#smart-ai-attendance-system", icon: "📷", category: "Projects" },
  { id: "proj-stress", title: "Student Stress Prediction", description: "ML system predicting stress from lifestyle and academic factors", href: "/projects#student-stress-prediction", icon: "📈", category: "Projects" },

  // Education
  { id: "edu-vit", title: "VIT — B.Tech CS (AI & ML)", description: "Vellore Institute of Technology — 8.11 CGPA", href: "/#education", icon: "🎓", category: "Education" },
  { id: "edu-ibhss-hs", title: "Islamiah Boys — Higher Secondary", description: "Mathematics and Computer Science", href: "/#education", icon: "📚", category: "Education" },
  { id: "edu-ibhss-m", title: "Islamiah Boys — Matriculation", description: "Foundations in mathematics and analytical thinking", href: "/#education", icon: "📖", category: "Education" },

  // Skills / Tech
  { id: "skill-python", title: "Python", description: "Programming language", href: "/#stack", icon: "🐍", category: "Skills" },
  { id: "skill-java", title: "Java", description: "Programming language", href: "/#stack", icon: "☕", category: "Skills" },
  { id: "skill-js", title: "JavaScript", description: "Programming language", href: "/#stack", icon: "📜", category: "Skills" },
  { id: "skill-ts", title: "TypeScript", description: "Programming language", href: "/#stack", icon: "📘", category: "Skills" },
  { id: "skill-react", title: "React", description: "Frontend library", href: "/#stack", icon: "⚛️", category: "Skills" },
  { id: "skill-nextjs", title: "Next.js", description: "React framework", href: "/#stack", icon: "▲", category: "Skills" },
  { id: "skill-tailwind", title: "Tailwind CSS", description: "Utility-first CSS framework", href: "/#stack", icon: "🎨", category: "Skills" },
  { id: "skill-nodejs", title: "Node.js", description: "JavaScript runtime", href: "/#stack", icon: "🟢", category: "Skills" },
  { id: "skill-mongodb", title: "MongoDB", description: "NoSQL database", href: "/#stack", icon: "🍃", category: "Skills" },
  { id: "skill-mysql", title: "MySQL", description: "Relational database", href: "/#stack", icon: "🗄️", category: "Skills" },
  { id: "skill-docker", title: "Docker", description: "Containerization platform", href: "/#stack", icon: "🐳", category: "Skills" },
  { id: "skill-git", title: "Git", description: "Version control", href: "/#stack", icon: "🔀", category: "Skills" },
  { id: "skill-flask", title: "Flask", description: "Python web framework", href: "/#stack", icon: "🔬", category: "Skills" },
  { id: "skill-framer", title: "Framer Motion", description: "Animation library for React", href: "/#stack", icon: "🎬", category: "Skills" },
  { id: "skill-ml", title: "Machine Learning", description: "Scikit-learn, Pandas, NumPy, XGBoost", href: "/#stack", icon: "🤖", category: "Skills" },
  { id: "skill-dsa", title: "DSA", description: "Data Structures & Algorithms", href: "/#stack", icon: "🧮", category: "Skills" },

  // Experience
  { id: "exp-ml", title: "ML Developer @ VIT", description: "Student stress prediction with SVM, RF, XGBoost", href: "/roadmap", icon: "💼", category: "Experience" },
  { id: "exp-film", title: "Member @ VIT Film Society", description: "Creative initiatives and technical event participation", href: "/roadmap", icon: "🎬", category: "Experience" },

  // External / Social
  { id: "ext-github", title: "GitHub Profile", description: "saad-affan12 — view all repositories", href: "https://github.com/saad-affan12", icon: "🐙", category: "External" },
  { id: "ext-linkedin", title: "LinkedIn Profile", description: "Connect on LinkedIn", href: "https://www.linkedin.com/in/saad-affan-566553319", icon: "🔗", category: "External" },
  { id: "ext-email", title: "Send Email", description: "saadaffan129@gmail.com", href: "mailto:saadaffan129@gmail.com", icon: "📧", category: "External" },
  { id: "ext-instagram", title: "Instagram", description: "@saad_affan12", href: "https://www.instagram.com/saad_affan12/", icon: "📸", category: "External" },
  { id: "ext-resume", title: "Download Resume", description: "View or download my resume", href: "/resume.pdf", icon: "📄", category: "External" },

  // CLI commands
  { id: "cli-help", title: "CLI — help", description: "List all available CLI commands", href: "/cli", icon: "💻", category: "CLI" },
  { id: "cli-projects", title: "CLI — projects", description: "Browse featured projects", href: "/cli", icon: "💻", category: "CLI" },
  { id: "cli-skills", title: "CLI — skills", description: "View tech stack", href: "/cli", icon: "💻", category: "CLI" },
  { id: "cli-contact", title: "CLI — contact", description: "Get contact information", href: "/cli", icon: "💻", category: "CLI" },
  { id: "cli-about", title: "CLI — about", description: "About Saad Affan", href: "/cli", icon: "💻", category: "CLI" },
  { id: "cli-roadmap", title: "CLI — roadmap", description: "View journey and timeline", href: "/cli", icon: "💻", category: "CLI" },
];
