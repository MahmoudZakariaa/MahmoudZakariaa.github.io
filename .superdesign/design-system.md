# Mahmoud Zakaria — Portfolio Design System

## Product context

Personal software-engineer portfolio for Mahmoud Zakaria (Giza, Egypt). Single English landing page that converts two audiences: recruiters and freelance clients. Job-to-be-done: prove capability in OutSystems + full-stack .NET in under a minute, then make contact easy.

## Key page

One long scroll: Nav → Hero → About → Experience → Projects → Skills → Contact → Footer.

## Branding & styling

### Color (locked)

| Name | Hex | Use |
| --- | --- | --- |
| Void | `#0B0F14` | Page background base |
| Depth | `#121820` | Gradient end / atmospheric plane |
| Surface | `#161D27` | Secondary bands, form fields |
| Ink | `#E8EEF6` | Primary text |
| Mist | `#9AA8BC` | Secondary text |
| Signal | `#3DDC97` | Accent: CTAs, active nav, focus only |
| Rule | `#243041` | Hairline dividers |

Atmosphere: calm dark IDE evening — subtle depth gradients, no neon glow, no purple washes, no glassmorphism stacks, no aurora rainbows.

### Typography (locked)

- Display / brand name / section titles: **Syne** (bold, distinctive)
- Body / UI: **Source Sans 3**
- Do not substitute Inter, Roboto, Arial, system-ui, Geist, or monospace for display

Type scale: hero name dominant; one short supporting sentence; section titles quieter than hero; body ≤ ~70ch.

### Layout

- Left-aligned content in a readable max-width (~1100px), not centered marketing stack
- Hero is one composition: role first as a modest subtitle (not a mega display title — name lives only in nav/header), one sentence, two CTAs; full-bleed dark background plane — no inset hero image card
- Experience as a vertical timeline / rules, not identical rounded cards
- Projects as stacked editorial rows (title + stack + two bullets), not a three-equal SaaS card grid
- Skills as quiet grouped columns
- Contact: direct links + simple form

### Motion

Only 2–3 deliberate motions: one orchestrated page-load/hero moment OR restrained scroll reveal; soft CTA/project hover; active-nav accent underline. Prefer `prefers-reduced-motion`. Avoid per-card fade-up spam.

### Imagery & logos

- Hero uses a full-bleed atmospheric photo with dark overlay (readable text)
- Each project row includes a dedicated cover image
- Skills include a quiet monochrome tech-logo strip (.NET, Angular, TypeScript, Docker, Git, Node.js, React, MySQL)
- Prefer real brand SVG marks over invented icons; no emoji substitutes

### Components tone

- Primary button: solid Signal on Void, high contrast
- Secondary button: ghost / outline Rule with Ink text
- Form: Surface fields, Rule borders, clear focus ring in Signal
- No pill clusters, floating badges, fake stats, emoji

## Content (must appear)

- Name: Mahmoud Zakaria
- Role: Associate Software Engineer | OutSystems & Full-Stack .NET Developer
- About: CV summary + one sentence on AI-assisted engineering / modern AI coding tools
- Experience: ENVNT (Nov 2025–Present); ITI trainee (Mar–Aug 2025)
- Projects: AGC Lubricants; PharmaLink; Library Management System
- Skills from CV groups; Education: Mechatronics, Fayoum University 2023
- Contact: mahmoudmzakaria22@gmail.com, +20 100 614 4154, LinkedIn, GitHub

## Non-goals

Multi-page app chrome, light mode, blog, dashboard layout, bento link-in-bio, CRT/terminal gimmick, 3D/Three.js hero.
