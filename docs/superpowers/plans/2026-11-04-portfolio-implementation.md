# Mahmoud Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Mahmoud Zakaria’s English single-page portfolio (Vite + React + TypeScript) to Netlify with Netlify Forms, matching the approved design spec and Superdesign draft.

**Architecture:** One React SPA. All copy/links live in `src/content.ts`. CSS variables in `src/styles/global.css`. Section components compose in `src/App.tsx`. Contact uses Netlify Forms with `public/__forms.html` for build-time detection. Logos already exist under `public/logos/`.

**Tech Stack:** Vite 6+, React 19, TypeScript 5.7+, Vitest, `@netlify/vite-plugin`, Netlify CLI (`npx netlify`), Google Fonts (Syne + Source Sans 3)

## Global Constraints

- English only; audiences = recruiters + freelance clients
- Content = CV-accurate + exactly one AI-assisted engineering sentence in About
- Hero: no oversized display name (name only in Nav); role line is a modest subtitle
- Tokens: `--bg #0B0F14`, depth `#121820`, `--surface #161D27`, `--text #E8EEF6`, `--muted #9AA8BC`, `--accent #3DDC97`, `--border #243041`
- Fonts: Syne (display), Source Sans 3 (body) — never Inter/Roboto/Arial as primary
- No React Router; no purple/neon/glassmorphism/pill clusters/fake stats
- Form name `contact`; honeypot `bot-field`; fields `name`, `email`, `message`
- Git: **do not commit unless the user explicitly asks** (skip commit steps)
- Spec: `docs/superpowers/specs/2026-11-04-portfolio-design.md`
- Superdesign preview: https://p.superdesign.dev/draft/6f2d655b-b745-4c54-90f9-9b8e103d750e

---

## File map

| Path | Responsibility |
| --- | --- |
| `package.json`, `vite.config.ts`, `vitest.config.ts`, `tsconfig*.json`, `index.html` | Tooling |
| `netlify.toml` | Build `npm run build`, publish `dist` |
| `public/__forms.html` | Netlify Forms detection |
| `public/logos/*` | AGC, ENVNT, OutSystems, ITI, PharmaLink (+ tech SVGs) |
| `public/images/*` | Hero + project covers |
| `src/content.ts` | Typed site content |
| `src/lib/encodeFormBody.ts` | URL-encode form payload for Netlify |
| `src/lib/encodeFormBody.test.ts` | Unit tests for encoder |
| `src/styles/global.css` | Tokens + layout + motion |
| `src/components/*.tsx` | Nav, Hero, About, Experience, Projects, Skills, ContactForm, Footer |
| `src/App.tsx`, `src/main.tsx` | Composition + mount |

---

### Task 1: Scaffold Vite + React + TS + Vitest + Netlify plugin

**Files:**
- Create/overwrite: `package.json`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `netlify.toml`, `.gitignore`
- Preserve: `docs/`, `.superdesign/`, `public/logos/`

**Interfaces:**
- Produces: scripts `dev`, `build`, `preview`, `test`

- [ ] **Step 1: Scaffold without wiping protected paths**

```powershell
Set-Location C:\Users\Envntor\Projects\mahmoud-portfolio
# If package.json missing, scaffold into a temp folder then merge:
npm create vite@latest _vite_tmp -- --template react-ts
Copy-Item _vite_tmp\* . -Recurse -Force -Exclude node_modules
# Keep public/logos — do not delete public/
Remove-Item _vite_tmp -Recurse -Force
```

Expected: `src/App.tsx`, `vite.config.ts`, `index.html` exist; `public/logos/agc.png` still exists.

- [ ] **Step 2: Install dependencies**

```powershell
npm install
npm install -D vitest @netlify/vite-plugin jsdom @testing-library/react @testing-library/jest-dom
```

Expected: exit code 0.

- [ ] **Step 3: Write `vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";

export default defineConfig({
  plugins: [react(), netlify()],
});
```

- [ ] **Step 4: Write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

- [ ] **Step 5: Update `package.json` scripts**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

- [ ] **Step 6: Write `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 7: Ensure `.gitignore` contains**

```
node_modules
dist
.netlify
.superdesign/tmp
*.local
```

- [ ] **Step 8: Update `index.html` fonts + title**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mahmoud Zakaria — Software Engineer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Syne:wght@600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 9: Verify build**

```powershell
npm run build
```

Expected: `dist/index.html` created; exit code 0.

---

### Task 2: `encodeFormBody` helper (TDD) + static form skeleton + images

**Files:**
- Create: `src/lib/encodeFormBody.ts`, `src/lib/encodeFormBody.test.ts`, `public/__forms.html`
- Copy: images into `public/images/`

**Interfaces:**
- Produces: `encodeFormBody(data: Record<string, string>): string`

- [ ] **Step 1: Write failing test**

```ts
// src/lib/encodeFormBody.test.ts
import { describe, it, expect } from "vitest";
import { encodeFormBody } from "./encodeFormBody";

describe("encodeFormBody", () => {
  it("encodes Netlify contact fields including form-name", () => {
    const body = encodeFormBody({
      "form-name": "contact",
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hello & thanks",
      "bot-field": "",
    });
    expect(body).toContain("form-name=contact");
    expect(body).toContain("name=Ada%20Lovelace");
    expect(body).toContain("email=ada%40example.com");
    expect(body).toContain("message=Hello%20%26%20thanks");
    expect(body).toContain("bot-field=");
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```powershell
npm test -- src/lib/encodeFormBody.test.ts
```

Expected: FAIL — `Cannot find module './encodeFormBody'` or similar.

- [ ] **Step 3: Implement**

```ts
// src/lib/encodeFormBody.ts
export function encodeFormBody(data: Record<string, string>): string {
  return new URLSearchParams(data).toString();
}
```

- [ ] **Step 4: Run test — expect PASS**

```powershell
npm test -- src/lib/encodeFormBody.test.ts
```

Expected: 1 passed.

- [ ] **Step 5: Copy images**

```powershell
$src = "C:\Users\Envntor\.cursor\projects\c-Users-Envntor-Projects-mahmoud-portfolio\assets"
$dst = "C:\Users\Envntor\Projects\mahmoud-portfolio\public\images"
New-Item -ItemType Directory -Path $dst -Force | Out-Null
Copy-Item "$src\hero-atmosphere.jpg" "$dst\hero-atmosphere.jpg" -Force
Copy-Item "$src\project-agc.jpg" "$dst\project-agc.jpg" -Force
Copy-Item "$src\project-pharmalink.jpg" "$dst\project-pharmalink.jpg" -Force
Copy-Item "$src\project-library.jpg" "$dst\project-library.jpg" -Force
```

Expected: four jpg files under `public/images/`.

- [ ] **Step 6: Write `public/__forms.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      hidden
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
      <input name="bot-field" />
    </form>
  </body>
</html>
```

---

### Task 3: `src/content.ts` (single source of truth)

**Files:**
- Create: `src/content.ts`
- Create: `src/content.test.ts` (smoke asserts required links)

**Interfaces:**
- Produces: named export `content` with shape used by all components below

- [ ] **Step 1: Write failing content smoke test**

```ts
// src/content.test.ts
import { describe, it, expect } from "vitest";
import { content } from "./content";

describe("content", () => {
  it("includes required external links and logos", () => {
    expect(content.person.name).toBe("Mahmoud Zakaria");
    expect(content.projects[0].href).toBe("https://azbgulf.com/home");
    expect(content.projects[0].logoSrc).toBe("/logos/agc.png");
    expect(content.projects[1].href).toBe(
      "https://github.com/MahmoudZakariaa/PharmaLink-Angular",
    );
    expect(content.projects[1].logoSrc).toBe("/logos/pharmalink.png");
    expect(content.experience[0].href).toBe("https://envnt.sa/");
    expect(content.experience[0].logoSrc).toBe("/logos/envnt.svg");
    expect(content.experience[1].href).toBe("https://iti.gov.eg/");
    expect(content.experience[1].logoSrc).toBe("/logos/iti.png");
    expect(content.about.aiSentence.length).toBeGreaterThan(20);
  });
});
```

- [ ] **Step 2: Run — expect FAIL** (`Cannot find module './content'`)

```powershell
npm test -- src/content.test.ts
```

- [ ] **Step 3: Implement full `src/content.ts`**

```ts
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
    {
      title: "Library Management System",
      stack: "ASP.NET Core Web API, EF Core, SQL Server",
      coverSrc: "/images/project-library.jpg",
      bullets: [
        "Role-based access and due-date tracking.",
        "Robust RESTful backend services with EF Core.",
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
```

- [ ] **Step 4: Download tech logos into `public/logos/tech/`**

```powershell
$dir = "C:\Users\Envntor\Projects\mahmoud-portfolio\public\logos\tech"
New-Item -ItemType Directory -Path $dir -Force | Out-Null
$logos = @{
  "dotnet.svg" = "https://cdn.simpleicons.org/dotnet/E8EEF6"
  "angular.svg" = "https://cdn.simpleicons.org/angular/E8EEF6"
  "typescript.svg" = "https://cdn.simpleicons.org/typescript/E8EEF6"
  "docker.svg" = "https://cdn.simpleicons.org/docker/E8EEF6"
  "git.svg" = "https://cdn.simpleicons.org/git/E8EEF6"
  "nodedotjs.svg" = "https://cdn.simpleicons.org/nodedotjs/E8EEF6"
  "react.svg" = "https://cdn.simpleicons.org/react/E8EEF6"
  "mysql.svg" = "https://cdn.simpleicons.org/mysql/E8EEF6"
}
foreach ($k in $logos.Keys) {
  Invoke-WebRequest -Uri $logos[$k] -OutFile (Join-Path $dir $k) -UseBasicParsing
}
```

- [ ] **Step 5: Run content tests — expect PASS**

```powershell
npm test -- src/content.test.ts
```

---

### Task 4: Global CSS + App shell

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/main.tsx`, `src/App.tsx`
- Delete unused: `src/App.css`, `src/index.css` (if present)

**Interfaces:**
- Consumes: none
- Produces: CSS variables + `.wrap`, `.section`, `.btn`, `.btn-ghost`

- [ ] **Step 1: Write `src/styles/global.css`**

```css
:root {
  --bg: #0b0f14;
  --depth: #121820;
  --surface: #161d27;
  --text: #e8eef6;
  --muted: #9aa8bc;
  --accent: #3ddc97;
  --border: #243041;
  --font-display: "Syne", sans-serif;
  --font-body: "Source Sans 3", sans-serif;
  --wrap: 1100px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--text);
  background: linear-gradient(180deg, var(--bg), var(--depth));
  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: var(--accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.wrap {
  width: min(100% - 2rem, var(--wrap));
  margin-inline: auto;
}

.section {
  padding-block: 4.5rem;
}

.section h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 700;
  margin: 0 0 1.25rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.15rem;
  border-radius: 6px;
  border: 1px solid transparent;
  background: var(--accent);
  color: #04110a;
  font-weight: 700;
  font-family: var(--font-body);
  text-decoration: none;
  cursor: pointer;
  transition: transform 160ms ease, filter 160ms ease;
}

.btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.btn-ghost {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}

.logo-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.55rem;
  border-radius: 8px;
  background: #f4f7fb;
}

.logo-chip img {
  height: 28px;
  width: auto;
}

.reveal {
  animation: rise 600ms ease both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .reveal,
  .btn {
    animation: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Wire `src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 3: Temporary `App.tsx` shell**

```tsx
export default function App() {
  return (
    <>
      <header />
      <main id="main">
        <p className="wrap">Portfolio shell</p>
      </main>
      <footer />
    </>
  );
}
```

- [ ] **Step 4: Build**

```powershell
npm run build
```

Expected: exit 0.

---

### Task 5: Nav + Hero + About

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/Hero.tsx`, `src/components/About.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.person`, `content.nav`, `content.hero`, `content.about`

- [ ] **Step 1: `Nav.tsx`**

```tsx
import { content } from "../content";

export function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(11,15,20,0.85)",
      }}
    >
      <nav
        className="wrap"
        aria-label="Primary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          minHeight: "4rem",
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          {content.person.name}
        </a>
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {content.nav.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} style={{ color: "var(--muted)" }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: `Hero.tsx` (no giant name)**

```tsx
import { content } from "../content";

export function Hero() {
  const { hero } = content;
  return (
    <section
      id="top"
      className="reveal"
      style={{
        position: "relative",
        minHeight: "78vh",
        display: "grid",
        alignItems: "end",
        overflow: "hidden",
      }}
    >
      <img
        src={hero.backgroundSrc}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(11,15,20,0.55), rgba(11,15,20,0.92))",
          zIndex: 1,
        }}
      />
      <div className="wrap" style={{ position: "relative", zIndex: 2, paddingBlock: "5rem" }}>
        <p
          style={{
            margin: "0 0 0.75rem",
            color: "var(--muted)",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            maxWidth: "40rem",
          }}
        >
          {hero.role}
        </p>
        <p style={{ margin: "0 0 1.5rem", maxWidth: "36rem", fontSize: "1.125rem" }}>
          {hero.blurb}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a className="btn" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn btn-ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `About.tsx`**

```tsx
import { content } from "../content";

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <h2>About</h2>
        <p style={{ maxWidth: "42rem", color: "var(--muted)" }}>{content.about.summary}</p>
        <p style={{ maxWidth: "42rem" }}>{content.about.aiSentence}</p>
        <p style={{ color: "var(--muted)" }}>{content.about.education}</p>
        <p style={{ color: "var(--muted)" }}>{content.about.languages}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Compose in `App.tsx`**

```tsx
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify**

```powershell
npm run build
npm run dev
```

Expected: page loads; name only in header; role is subtitle-sized; About shows AI sentence.

---

### Task 6: Experience + Projects + Skills

**Files:**
- Create: `src/components/Experience.tsx`, `src/components/Projects.tsx`, `src/components/Skills.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content.experience`, `content.projects`, `content.skills`, `content.techLogos`, `content.outsystems`

- [ ] **Step 1: `Experience.tsx`**

```tsx
import { content } from "../content";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <h2>Experience</h2>
        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {content.experience.map((job) => (
            <li
              key={job.org}
              style={{
                borderTop: "1px solid var(--border)",
                paddingBlock: "1.5rem",
              }}
            >
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <span className="logo-chip">
                  <img src={job.logoSrc} alt={job.logoAlt} />
                </span>
                <div>
                  <strong>{job.role}</strong>
                  <div style={{ color: "var(--muted)" }}>
                    <a href={job.href} target="_blank" rel="noopener noreferrer">
                      {job.org}
                    </a>{" "}
                    · {job.period}
                  </div>
                </div>
              </div>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b} style={{ color: "var(--muted)" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `Projects.tsx`**

```tsx
import { content } from "../content";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <h2>Projects</h2>
        <div style={{ display: "grid", gap: "2.5rem" }}>
          {content.projects.map((p) => (
            <article
              key={p.title}
              style={{
                display: "grid",
                gap: "1.25rem",
                gridTemplateColumns: "minmax(0, 280px) minmax(0, 1fr)",
                alignItems: "start",
                borderTop: "1px solid var(--border)",
                paddingTop: "1.5rem",
              }}
            >
              <img
                src={p.coverSrc}
                alt=""
                style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--border)" }}
              />
              <div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                  {p.logoSrc ? (
                    <span className="logo-chip">
                      <img src={p.logoSrc} alt={p.logoAlt ?? ""} />
                    </span>
                  ) : null}
                  <h3 style={{ margin: 0, fontFamily: "var(--font-display)" }}>{p.title}</h3>
                </div>
                <p style={{ color: "var(--muted)" }}>{p.stack}</p>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b} style={{ color: "var(--muted)" }}>
                      {b}
                    </li>
                  ))}
                </ul>
                {p.href ? (
                  <a className="btn btn-ghost" href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.hrefLabel ?? "Open"}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Add a mobile media query in `global.css`:

```css
@media (max-width: 720px) {
  #projects article {
    grid-template-columns: 1fr !important;
  }
}
```

- [ ] **Step 3: `Skills.tsx`**

```tsx
import { content } from "../content";

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <h2>Skills</h2>
        <p style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <span className="logo-chip">
            <img src={content.outsystems.logoSrc} alt={content.outsystems.label} />
          </span>
          <a href={content.outsystems.href} target="_blank" rel="noopener noreferrer">
            {content.outsystems.label}
          </a>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            marginTop: "1.5rem",
          }}
        >
          {content.skills.map((g) => (
            <div key={g.title}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>{g.title}</h3>
              <ul style={{ paddingLeft: "1.1rem", color: "var(--muted)" }}>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul
          aria-label="Technology logos"
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            padding: 0,
            marginTop: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {content.techLogos.map((t) => (
            <li key={t.name} title={t.name}>
              <img src={t.src} alt={t.name} style={{ height: 22, opacity: 0.85 }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update `App.tsx` to include Experience, Projects, Skills**

```tsx
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Build + visual check**

```powershell
npm run build
npm run dev
```

Expected: AGC/PharmaLink/ITI/ENVNT/OutSystems logos visible; AGC + PharmaLink links work.

---

### Task 7: ContactForm + Footer

**Files:**
- Create: `src/components/ContactForm.tsx`, `src/components/Footer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `encodeFormBody`, `content.person`, `content.socials`
- Produces: POST `application/x-www-form-urlencoded` to `/`

- [ ] **Step 1: `ContactForm.tsx`**

```tsx
import { FormEvent, useState } from "react";
import { content } from "../content";
import { encodeFormBody } from "../lib/encodeFormBody";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      "form-name": "contact",
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      "bot-field": String(fd.get("bot-field") ?? ""),
    };
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormBody(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <h2>Contact</h2>
        <p style={{ color: "var(--muted)" }}>
          <a href={`mailto:${content.person.email}`}>{content.person.email}</a>
          {" · "}
          <a href={content.person.phoneHref}>{content.person.phone}</a>
        </p>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, flexWrap: "wrap" }}>
          {content.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          style={{
            marginTop: "1.5rem",
            display: "grid",
            gap: "0.85rem",
            maxWidth: "32rem",
          }}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p style={{ position: "absolute", left: "-10000px" }} aria-hidden="true">
            <label>
              Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <label>
            Name
            <input
              required
              name="name"
              type="text"
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.35rem",
                padding: "0.65rem 0.75rem",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            />
          </label>
          <label>
            Email
            <input
              required
              name="email"
              type="email"
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.35rem",
                padding: "0.65rem 0.75rem",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            />
          </label>
          <label>
            Message
            <textarea
              required
              name="message"
              rows={5}
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.35rem",
                padding: "0.65rem 0.75rem",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                resize: "vertical",
              }}
            />
          </label>
          <button className="btn" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
          {status === "success" ? <p role="status">Message sent. Thanks — I’ll reply soon.</p> : null}
          {status === "error" ? (
            <p role="alert">Couldn’t send right now. Email me directly instead.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `Footer.tsx`**

```tsx
import { content } from "../content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        paddingBlock: "1.5rem",
        color: "var(--muted)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span>
          © {year} {content.person.name}
        </span>
        <div style={{ display: "flex", gap: "1rem" }}>
          {content.socials.slice(0, 2).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Final `App.tsx`**

```tsx
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run all tests + build**

```powershell
npm test
npm run build
```

Expected: all tests pass; `dist/` contains assets + `__forms.html` copied from `public/`.

---

### Task 8: Deploy to Netlify

**Files:** none (CLI)

**Interfaces:**
- Produces: live production URL

- [ ] **Step 1: Check auth**

```powershell
npx netlify status
```

Expected if logged out: `Not logged in`.

- [ ] **Step 2: Login (user completes browser OAuth)**

```powershell
npx netlify login
```

Then re-run `npx netlify status` until it shows the account email.

- [ ] **Step 3: Create/link site (non-interactive where possible)**

```powershell
npx netlify sites:create --name mahmoud-zakaria-portfolio
npx netlify link --id <SITE_ID_FROM_CREATE>
```

If name taken, pick `mahmoud-zakaria-portfolio-<suffix>`.

- [ ] **Step 4: Draft deploy**

```powershell
npx netlify deploy
```

Expected: draft URL printed; Forms detection mentions `contact` or `__forms.html` present in publish dir.

- [ ] **Step 5: Production deploy**

```powershell
npx netlify deploy --prod
```

Expected: production URL like `https://mahmoud-zakaria-portfolio.netlify.app`.

- [ ] **Step 6: Smoke test**

1. Open production URL on desktop + phone width  
2. Click AGC live site + PharmaLink GitHub  
3. Submit contact form once; confirm entry in Netlify → Forms  
4. Report the production URL to the user

---

## Spec coverage self-review

| Spec requirement | Task |
| --- | --- |
| Single-page English portfolio | 5–7 |
| CV content + AI sentence only | 3 |
| Nav / Hero (no giant name) / About / Experience / Projects / Skills / Contact / Footer | 5–7 |
| Dark tokens + Syne / Source Sans 3 | 1, 4 |
| Logos + AGC/PharmaLink/ENVNT/ITI/OutSystems links | 3, 6 |
| Netlify Forms + `__forms.html` | 2, 7, 8 |
| Motion 2–3 + reduced motion | 4 (`.reveal`, `.btn` hover) + optional nav underline polish in Task 5 if time |
| Deploy Netlify | 8 |
| No router / no CMS / no fake stats | Global constraints |

**Placeholder scan:** none intentionally left.  
**Type consistency:** `content.experience`, `content.projects`, `encodeFormBody(Record<string,string>)` used consistently across tasks.

**Note on commits:** user rule forbids commits unless requested — commit steps omitted on purpose.
