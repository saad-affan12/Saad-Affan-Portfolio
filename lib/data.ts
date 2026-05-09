export const personalInfo = {
  name: "Mohammed Saad Affan A",
  shortName: "Saad Affan",
  initials: "MSA",
  tagline: "Building scalable systems and intelligent interfaces.",
  role: "Full-Stack Engineer \u2022 AI Systems Builder",
  description:
    "I\u2019m Mohammed Saad Affan A, a Computer Science student at Vellore Institute of Technology (VIT), focused on building scalable full-stack applications and intelligent AI-driven systems.\n\nI work on modern web technologies, backend engineering, machine learning, and futuristic user experiences with a strong focus on performance, architecture, and clean design.\n\nCurrently exploring AI systems, advanced full-stack engineering, and modern software practices while building impactful real-world projects.",
  email: "saadaffan129@gmail.com",
  location: "Vellore, India",
  birthDate: "2006-06-15",
  github: "https://github.com/saad-affan12",
  linkedin: "https://www.linkedin.com/in/saad-affan-566553319",
  instagram: "https://www.instagram.com/saad_affan12/",
  resume: "/resume.pdf",
  image: "/img/saad.png",
  availability: "Open to collaborations, internships, and AI projects.",
};

export const stackCategories = [
  {
    id: "programming",
    title: "Languages",
    items: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript"],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    items: ["Node.js", "Express.js", "Flask", "REST APIs", "Authentication"],
  },
  {
    id: "database",
    title: "Database",
    items: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    id: "ml",
    title: "Machine Learning",
    items: ["Scikit-learn", "Pandas", "NumPy", "XGBoost", "AI Systems"],
  },
  {
    id: "tools",
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "VS Code", "Postman", "Vercel"],
  },
  {
    id: "concepts",
    title: "Core Concepts",
    items: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Architecture"],
  },
  {
    id: "special",
    title: "Special",
    items: ["Intelligent Interfaces", "Performance Optimization", "Full Stack Systems", "AI-driven UX"],
  },
];

export const projects = [
  {
    name: "Secure Vote System",
    slug: "secure-vote-system",
    date: "2025",
    description:
      "Enterprise-grade online voting platform with role-based access, JWT authentication, one-vote enforcement, and secure MongoDB-backed election management. Features admin-controlled election lifecycle and real-time result tracking.",
    tags: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "JWT"],
    highlights: [
      "Role-Based Access Control (RBAC) with admin/voter separation",
      "JWT-authenticated secure sessions",
      "One-vote-per-user enforcement with duplicate prevention",
      "Real-time election result management",
    ],
    github: "https://github.com/saad-affan12/secure-vote-system",
    live: "https://secure-vote-system-eta.vercel.app/",
    image: "/images/projects/secure-vote-system.svg",
  },
  {
    name: "NeuroAdaptive UX",
    slug: "neuroadaptive-ux",
    date: "2025",
    description:
      "Client-side intelligent interface system that adapts in real-time to user interaction patterns. Tracks typing rhythm, mouse movement, and interaction intensity to dynamically adjust UI feedback without any backend or data storage.",
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    highlights: [
      "Real-time behavioral pattern analysis (typing, mouse, corrections)",
      "Dynamic UI state adaptation (Calm, Rushed, Stressed, Idle)",
      "Zero backend \u2014 fully client-side with complete privacy",
      "Smooth animated transitions between behavioral states",
    ],
    github: "https://github.com/saad-affan12/NeuroAdaptive-UX",
    live: "https://neuroadaptive.vercel.app/",
    image: "/images/projects/neuroadaptive-ux.svg",
  },
  {
    name: "Smart AI Attendance System",
    slug: "smart-ai-attendance-system",
    date: "2025",
    description:
      "IoT-powered intelligent attendance system combining ESP32-CAM real-time face capture, deep learning face recognition, anti-spoofing detection, and automated attendance logging with LED/buzzer feedback.",
    tags: ["Python", "Flask", "OpenCV", "TensorFlow", "ESP32-CAM", "IoT"],
    highlights: [
      "Real-time face detection and recognition via ESP32-CAM",
      "Anti-spoofing CNN model (live vs photo/screen detection)",
      "Automated Excel attendance logging with timestamp",
      "Hardware feedback: Green LED (valid), Red LED + Buzzer (invalid)",
    ],
    github: "https://github.com/saad-affan12/Smart-AI-Attendance-System-IoT",
    live: null,
    image: "/images/projects/smart-ai-attendance-system.svg",
  },
  {
    name: "Student Stress Prediction",
    slug: "student-stress-prediction",
    date: "2026",
    description:
      "Machine learning system predicting student stress levels from lifestyle and academic factors. Compares Logistic Regression, Random Forest, SVM+PCA, and XGBoost with optimized feature engineering achieving ~85% accuracy.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost"],
    highlights: [
      "Multi-model comparison: LR, RF, SVM+PCA, XGBoost",
      "Feature engineering and hyperparameter tuning",
      "XGBoost achieved ~85% prediction accuracy",
      "PCA-based dimensionality reduction for SVM optimization",
    ],
    github: "https://github.com/saad-affan12/student-stress-prediction",
    live: null,
    image: "/images/projects/student-stress-prediction.svg",
  },
];

export const roadmap = [
  {
    role: "Machine Learning Developer",
    company: "Vellore Institute of Technology",
    type: "Academic Project",
    period: "Mar 2026",
    badge: "AI/ML",
    description:
      "Built a student stress prediction system using SVM, Random Forest, and XGBoost achieving ~85% accuracy through optimized feature engineering and hyperparameter tuning.",
    highlights: [
      "Implemented and compared SVM, Random Forest, and XGBoost classifiers",
      "Feature engineering and hyperparameter tuning for optimal accuracy",
      "Achieved ~85% prediction accuracy on real student data",
    ],
  },
  {
    role: "Member",
    company: "VIT Film Society",
    type: "Club / Volunteer",
    period: "Dec 2025 \u2013 Present",
    badge: "Creative",
    description:
      "Actively contributing to collaborative creative initiatives and technical event participation within VIT's film community.",
    highlights: [
      "Collaborative creative project development",
      "Technical event coordination and participation",
      "Cross-team communication and creative ideation",
    ],
  },
];

export const education = [
  {
    institution: "Vellore Institute of Technology (VIT)",
    degree: "Bachelor\u2019s of Computer Science",
    period: "Jun 2024 \u2013 Nov 2026",
    cgpa: "8.11 CGPA",
    specialization: "AI & ML",
    description:
      "Currently pursuing Bachelor\u2019s of Computer Science with specialization in AI & ML, building strong foundations in scalable systems, programming, artificial intelligence, and modern software engineering.",
    skills: [
      "Technical English",
      "Computer Organisation and Architecture",
      "Programming",
      "Python",
      "Java",
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Web Development",
      "Object-Oriented Programming",
      "AI & Machine Learning",
    ],
    logo: "/education/vit-logo.png",
  },
  {
    institution: "Islamiah Boys Higher Secondary School",
    program: "Higher Secondary \u2014 Mathematics and Computer Science",
    period: "Jun 2023 \u2013 Mar 2024",
    description:
      "Successfully completed the English Access Microscholarship Program, strengthening communication and English proficiency.\n\nPerformed among the top ranks in Computer Science at the school level during the academic year.",
    skills: ["Communication", "Computer Science", "Mathematics", "Problem Solving"],
    logo: "/education/ibhss-logo.png",
  },
  {
    institution: "Islamiah Boys Higher Secondary School",
    program: "Matriculation",
    period: "Jun 2021 \u2013 Apr 2022",
    description:
      "Built strong foundations in mathematics, analytical thinking, and academic discipline.",
    skills: ["Mathematics", "Science", "Analytical Thinking"],
    logo: "/education/ibhss-logo.png",
  },
];

export const setupCards = [
  { title: "Editor", description: "VS Code", icon: "code" },
  { title: "Terminal", description: "PowerShell", icon: "terminal" },
  { title: "Framework", description: "Next.js 15", icon: "globe" },
  { title: "Version Control", description: "Git & GitHub", icon: "git-branch" },
  { title: "API Testing", description: "Postman", icon: "beaker" },
  { title: "Containerization", description: "Docker", icon: "container" },
  { title: "Fuel", description: "Coffee", icon: "coffee" },
];

export const footerLinks = {
  links: [
    { label: "Home", href: "/" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "Tools", href: "/tools" },
  ],
  meta: [
    { label: "Sitemap", href: "/sitemap.xml" },
    {
      label: "Source Code",
      href: "https://github.com/saad-affan12/Saad-Affan-Portfolio",
    },
  ],
  contact: [
    { label: "Email", href: "mailto:saadaffan129@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/saad-affan-566553319",
    },
    { label: "GitHub", href: "https://github.com/saad-affan12" },
    { label: "Instagram", href: "https://www.instagram.com/saadaffan_offx?igsh=MWtkbzJnaDlndWx4MA==" },
  ],
};

export const topNavLinks = [
  { label: "Roadmap", href: "/roadmap" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Tools", href: "/tools" },
];

export const dockLinks = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Roadmap", href: "/roadmap", icon: "roadmap" },
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Resume", href: "/resume", icon: "resume" },
  { label: "Tools", href: "/tools", icon: "tools" },
];

export const sponsorInfo = {
  title: "Support My Work",
  description: "If you find my projects useful, consider sponsoring on GitHub.",
  buttonLabel: "Sponsor on GitHub",
  buttonHref: "https://github.com/sponsors",
};
