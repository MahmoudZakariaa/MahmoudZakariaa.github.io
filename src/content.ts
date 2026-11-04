export type NavItem = { id: string; label: string };

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
  bullets: string[];
};

export type ProjectItem = {
  title: string;
  stack: string;
  href?: string;
  hrefLabel?: string;
  logoSrc?: string;
  logoAlt?: string;
  coverSrc: string;
  bullets: string[];
};

export type SkillGroup = { title: string; items: string[] };

export type TechLogo = { name: string; src: string };

export const content = {
  person: {
    name: "Mahmoud Zakaria",
    role: "Associate Software Engineer | OutSystems & Full-Stack .NET Developer",
    location: "Giza, Egypt",
    email: "mahmoudmzakaria22@gmail.com",
    phone: "+20 100 614 4154",
    phoneHref: "tel:+201006144154",
  },
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mahmoud-zakaria-8421a0203",
    },
    { label: "GitHub", href: "https://github.com/Mahmoud22620" },
    {
      label: "HackerRank",
      href: "https://www.hackerrank.com/profile/mahmouddzakaria1",
    },
    { label: "LeetCode", href: "https://leetcode.com/u/b6Md56AIA2/" },
  ],
  nav: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],
  hero: {
    role: "Associate Software Engineer | OutSystems & Full-Stack .NET Developer",
    blurb:
      "I build enterprise web apps with OutSystems and full-stack .NET — scalable features, clean integrations, and practical automation.",
    primaryCta: { label: "View projects", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    backgroundSrc: "/images/hero-atmosphere.jpg",
  },
  about: {
    summary:
      "Associate Software Engineer with experience in enterprise application development, low-code platforms, and full-stack .NET solutions using OutSystems, Angular, and ASP.NET Core. Skilled in building scalable applications, RESTful integrations, and AI-assisted automation workflows using n8n and modern AI coding tools. Strong understanding of OOP, SOLID principles, Clean Architecture, and Agile methodologies, with a passion for problem solving, automation, and modern software engineering practices.",
    aiSentence:
      "I work daily with AI-assisted engineering — pairing modern AI coding tools with automation workflows to ship carefully reviewed, production-ready software faster.",
    education:
      "B.Eng. in Mechatronics, Fayoum University (2023) — GPA 3.4 / 4.0, Ranked 2nd",
    languages: "Arabic (Native), English (Professional Working Proficiency)",
  },
  experience: [
    {
      role: "Associate Software Engineer",
      org: "ENVNT",
      period: "Nov 2025 — Present",
      href: "https://envnt.sa/",
      logoSrc: "/logos/envnt.svg",
      logoAlt: "ENVNT",
      bullets: [
        "Develop and maintain enterprise web applications on OutSystems (Reactive Web, data modeling, reusable components, workflows, REST/SOAP integrations).",
        "Collaborate across teams on delivery, code reviews, and Architecture Canvas / 4-Layer Architecture practices.",
        "Use AI-assisted development tools and workflow automation to improve productivity and streamline processes.",
      ],
    },
    {
      role: "Full-Stack Developer Trainee (.NET, Angular, SQL Server)",
      org: "ITI, Egypt",
      period: "Mar 2025 — Aug 2025",
      href: "https://iti.gov.eg/",
      logoSrc: "/logos/iti.png",
      logoAlt: "Information Technology Institute",
      bullets: [
        "Completed intensive training in ASP.NET Core, Angular, SQL Server, and Clean Architecture.",
        "Built RESTful APIs, authentication, and applied OOP, SOLID, Git, and Agile in real projects.",
      ],
    },
  ] satisfies ExperienceItem[],
  projects: [
    {
      title: "AGC Lubricants",
      stack: "Angular, ASP.NET Core Web API, JWT, SQL Server (Freelance)",
      href: "https://azbgulf.com/home",
      hrefLabel: "Visit live site",
      logoSrc: "/logos/agc.png",
      logoAlt: "Azb Gulf / AGC",
      coverSrc: "/images/project-agc.jpg",
      bullets: [
        "Full-stack web app with admin dashboard, secure authentication, and content management.",
        "JWT auth, role-based access, responsive UI, and optimized RESTful APIs.",
      ],
    },
    {
      title: "PharmaLink",
      stack: "Angular + ASP.NET Core, EF Core, SQL Server (Clean Architecture)",
      href: "https://github.com/MahmoudZakariaa/PharmaLink-Angular",
      hrefLabel: "View on GitHub",
      logoSrc: "/logos/pharmalink.png",
      logoAlt: "PharmaLink",
      coverSrc: "/images/project-pharmalink.jpg",
      bullets: [
        "Pharmacy platform with medicine availability, AI-powered alternatives, ordering, and admin dashboard.",
        "Clean Architecture, RESTful APIs, authentication, and responsive Angular UI.",
      ],
    },
  ] satisfies ProjectItem[],
  skills: [
    {
      title: "Languages",
      items: ["C", "Java", "C#", "JavaScript", "TypeScript"],
    },
    {
      title: "Frameworks",
      items: [
        "ASP.NET Core",
        "Web API",
        "MVC",
        "EF Core",
        "Angular",
        "SignalR (basic)",
      ],
    },
    {
      title: "Low-Code",
      items: ["OutSystems Platform", "Reactive Web", "Low-Code Development"],
    },
    {
      title: "Databases",
      items: ["SQL Server", "MySQL", "Database Design"],
    },
    {
      title: "API & Integration",
      items: ["RESTful APIs", "SOAP APIs", "Third-Party Integrations"],
    },
    {
      title: "Automation & AI",
      items: [
        "n8n",
        "AI Workflow Automation",
        "API Orchestration",
        "Agentic AI Concepts",
      ],
    },
    {
      title: "AI Coding Tools",
      items: ["GitHub Copilot CLI", "Claude CLI", "Gemini CLI"],
    },
    {
      title: "Concepts",
      items: [
        "OOP",
        "SOLID",
        "Design Patterns",
        "Clean Architecture",
        "JWT Authentication",
      ],
    },
    {
      title: "Methodologies",
      items: ["Agile/Scrum", "CI/CD Fundamentals"],
    },
    {
      title: "Tools",
      items: [
        "Git",
        "Docker",
        "Postman",
        "SSMS",
        "Visual Studio",
        "Linux/Ubuntu (basic)",
      ],
    },
  ] satisfies SkillGroup[],
  outsystems: {
    label: "OutSystems",
    href: "https://www.outsystems.com/",
    logoSrc: "/logos/outsystems.png",
  },
  techLogos: [
    { name: ".NET", src: "/logos/tech/dotnet.svg" },
    { name: "Angular", src: "/logos/tech/angular.svg" },
    { name: "TypeScript", src: "/logos/tech/typescript.svg" },
    { name: "Docker", src: "/logos/tech/docker.svg" },
    { name: "Git", src: "/logos/tech/git.svg" },
    { name: "Node.js", src: "/logos/tech/nodedotjs.svg" },
    { name: "React", src: "/logos/tech/react.svg" },
    { name: "MySQL", src: "/logos/tech/mysql.svg" },
  ] satisfies TechLogo[],
} as const;
