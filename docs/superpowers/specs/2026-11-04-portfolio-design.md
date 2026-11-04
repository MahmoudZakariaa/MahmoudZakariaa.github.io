# Mahmoud Zakaria Portfolio — Design Spec

Date: 2026-11-04  
Status: Approved for planning  
Stack: Vite + React + TypeScript → Netlify

## Goal

Ship a single-page English portfolio that serves both recruiters and freelance clients, sourced primarily from Mahmoud’s CV, plus one explicit AI-assisted engineering highlight. Deploy to Netlify with a working contact form.

## Audience & positioning

- Primary audiences: hiring managers / tech recruiters **and** freelance clients
- Language: English only
- Role line: Associate Software Engineer | OutSystems & Full-Stack .NET Developer
- Location: Giza, Egypt

## Content sources

### From CV (authoritative)

- Contact: mahmoudmzakaria22@gmail.com, +20 100 614 4154
- Links: LinkedIn, GitHub (Mahmoud22620), HackerRank, LeetCode
- Summary: enterprise apps, OutSystems, Angular, ASP.NET Core, REST, automation
- Experience:
  - Associate Software Engineer — ENVNT (Nov 2025 – Present); company site: https://envnt.sa/; OutSystems platform: https://www.outsystems.com/
  - Full-Stack Developer Trainee (.NET, Angular, SQL Server) — ITI, Egypt (Mar 2025 – Aug 2025); org site: https://iti.gov.eg/
- Projects:
  - AGC Lubricants — Angular, ASP.NET Core Web API, JWT, SQL Server (Freelance); live site: https://azbgulf.com/home; company logo from Azb Gulf
  - PharmaLink — Angular + ASP.NET Core, EF Core, SQL Server (Clean Architecture); repo: https://github.com/MahmoudZakariaa/PharmaLink-Angular; logo from repo `src/assets/images/logos/logo.png`
  - Library Management System — ASP.NET Core Web API, EF Core, SQL Server
- Skills groups: Languages, Frameworks, Low-Code, Databases, API & Integration, Automation & AI, AI Coding Tools, Concepts, Methodologies, Tools
- Education: B.Eng. Mechatronics, Fayoum University (2023), GPA 3.4/4.0, Rank 2nd
- Languages: Arabic (Native), English (Professional Working Proficiency)

### Allowed addition beyond CV

- One concise About / summary sentence on **AI-assisted engineering** (productivity with modern AI coding tools and automation workflows). Do **not** add Hostinger, Netlify-as-skill-flex, or personal tooling inventory beyond what the CV already implies.

### Placeholders

- Project external demo/repo URLs: omit or link to GitHub profile until specific repos are provided
- No fake metrics, testimonials, or invented clients

## Information architecture

Single scrollable page:

1. **Nav** — brand name, in-page section anchors, Contact CTA
2. **Hero** — role + one supporting sentence + CTAs: View projects / Get in touch (no oversized display name — name appears only in Nav); full-bleed dark atmospheric background (not an inset card image)
3. **About** — CV professional summary + AI-assisted engineering sentence
4. **Experience** — ENVNT then ITI as a clean timeline (not card-heavy)
5. **Projects** — three projects; each: title, stack tags as plain text (not pill clusters), two bullets, optional link
6. **Skills** — grouped lists from CV (collapsed visually into readable columns; avoid icon-row clutter)
7. **Contact** — email, phone, LinkedIn, GitHub + Netlify Forms (name, email, message)
8. **Footer** — short copyright + social links

## Visual design

### Direction

Dark, calm, technical atmosphere (evening IDE depth). Not neon, not purple-glow SaaS, not cream/serif brochure.

### Tokens

| Token | Value |
| --- | --- |
| `--bg` | `#0B0F14` with subtle gradient toward `#121820` |
| `--surface` | `#161D27` |
| `--text` | `#E8EEF6` |
| `--muted` | `#9AA8BC` |
| `--accent` | `#3DDC97` (CTAs / active nav only) |
| `--border` | `#243041` |

### Typography

- Display / name: **Syne**
- Body: **Source Sans 3**
- Avoid default stacks (Inter, Roboto, Arial, system-ui as primary)

### Motion (exactly 2–3)

1. Section reveal on scroll (subtle fade/translate)
2. Soft hover on project links and CTAs
3. Accent underline on active nav item

### Explicit non-goals

- Hero cards, floating badges, stat strips, emoji decoration
- Multi-page routing
- Blog, CMS, auth, database

## Technical architecture

### App structure

```
mahmoud-portfolio/
  public/
    __forms.html          # Netlify Forms detection skeleton
  src/
    content.ts            # All copy & CV-derived data
    App.tsx               # Section composition
    components/
      Nav.tsx
      Hero.tsx
      About.tsx
      Experience.tsx
      Projects.tsx
      Skills.tsx
      ContactForm.tsx
      Footer.tsx
    styles/
      global.css          # tokens, base, motion
  netlify.toml
  package.json
  vite.config.ts
```

### Stack choices

- Vite + React + TypeScript
- `@netlify/vite-plugin` for local Netlify-aware dev
- No React Router (single page + hash/id anchors)
- Content isolated in `content.ts` for easy edits without touching layout

### Netlify

`netlify.toml`:

- `command = "npm run build"`
- `publish = "dist"`
- Optional SPA fallback not required for single index page without client routes; omit catch-all unless hash routing needs it (prefer element `id` anchors)

Forms:

- Form name: `contact`
- Fields: `name`, `email`, `message` + honeypot `bot-field`
- Static detection file: `public/__forms.html` mirroring field names
- React form posts with hidden `form-name=contact` (AJAX or standard POST per Netlify Forms skill)

Env / secrets: none required for v1.

### Deploy flow

1. `npx netlify login` (account currently not logged in)
2. Link or create site
3. `npx netlify deploy --prod` (or Git-connected continuous deploy later)

## Error handling & UX

- Contact form: disable submit while sending; show success or failure inline
- External links: `target="_blank"` + `rel="noopener noreferrer"`
- Accessibility: semantic landmarks, visible focus, sufficient contrast on accent/text

## Testing (lightweight)

- Local: `npm run build` succeeds; preview contact form markup present in `public/__forms.html`
- Manual: section anchors, mobile layout, form honeypot field hidden
- Post-deploy: submit one real test message in Netlify Forms UI

## Out of scope (v1)

- i18n / Arabic locale
- Case-study detail pages
- Blog, analytics dashboards, dark/light toggle
- Hostinger deploy path (Netlify only for this project)

## Success criteria

- Live Netlify URL loads on mobile and desktop
- All CV sections above are represented accurately
- AI-assisted engineering appears once, professionally
- Contact submissions appear in Netlify Forms
- First viewport reads as one composition with brand-first hero
