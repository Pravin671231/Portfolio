# GitHub Milestones — Pravin K Portfolio

These are written as ready-to-create GitHub Milestone entries for `Pravin671231/Portfolio`. Target dates are intentionally left as `TBD` — fill in before creating (e.g. via `gh api repos/Pravin671231/Portfolio/milestones -f title=... -f description=... -f due_on=...` or the GitHub web UI).

---

## M0 — Scaffold & Core Primitives

**Description:** Stand up the Next.js/TypeScript/Tailwind project, install the animation stack (Framer Motion, GSAP, Lenis, Lucide), and build every low-level primitive (hooks, data layer, reusable UI primitives, custom cursor, layout shell) that every later section depends on.

**Target date:** TBD

**Covers:** project setup, `lib/utils.ts`, global CSS/Tailwind config, `hooks/useReducedMotion.ts`, `hooks/useMediaQuery.ts`, `hooks/useMousePosition.ts`, `data/projects.ts`, `data/skills.ts`, `data/experience.ts`, `data/certifications.ts`, `data/testimonials.ts`, `ui/AnimatedText.tsx`, `ui/ScrollReveal.tsx`, `ui/GlowBackground.tsx`, `ui/MagneticButton.tsx`, `ui/CustomCursor.tsx` + `CursorContext`, `layout/SmoothScrollProvider.tsx`, `layout/Navbar.tsx`, `layout/Footer.tsx`, `app/layout.tsx`, `app/page.tsx` shell.

---

## M1 — MVP Animation Systems

**Description:** Implement the eight highest-impact animation systems end-to-end: Hero, About, project cards, horizontal pinned project scroll, the "How I Build" process timeline, the GitHub live-stats section, the Contact section, and magnetic-button/cursor wiring.

**Target date:** TBD

**Covers:** `sections/Hero.tsx`, `sections/About.tsx`, `projects/ProjectCard.tsx`, `projects/ProjectPreview.tsx`, `sections/Projects.tsx` (pinned scroll + mobile fallback), `app/projects/[slug]/page.tsx`, `projects/ProjectCaseStudy.tsx`, `sections/Process.tsx`, `app/api/github/route.ts`, `lib/github.ts`, `sections/Github.tsx`, `sections/Contact.tsx`, magnetic/cursor wiring on primary CTAs.

---

## M2 — Stub Sections (Phase-2-ready)

**Description:** Scaffold the remaining sections from the original animation spec as real, functional components using the shared `ScrollReveal` entrance — simple now, explicitly ready for bespoke motion treatment in a later milestone.

**Target date:** TBD

**Covers:** `sections/Stack.tsx`, `sections/Journey.tsx`, `sections/Certifications.tsx`, `sections/Testimonials.tsx`, `ui/CommandPalette.tsx`, `ui/FloatingCode.tsx`.

---

## M3 — Responsive, Reduced-Motion & Polish

**Description:** Full breakpoint verification pass (mobile/tablet/desktop), `prefers-reduced-motion` fallback verification across every animated system, performance/Lighthouse/CLS pass, and final build/type-check/SEO polish.

**Target date:** TBD

**Covers:** cross-viewport manual QA, reduced-motion QA, Chrome DevTools performance recording, Lighthouse run, `next build` clean pass, metadata/favicon/SEO tags, `next/image` sizing audit.

---

## M4 — Phase 2 Enhancements (post-MVP, not yet scoped into issues)

**Description:** Layer in the bespoke motion treatment for every section listed as a stub in the SRS §5 — Navbar entrance/shrink, About card mouse-tilt, Stack SVG connection diagram, Journey timeline unification, Certifications hover treatment, Testimonials carousel, Command Palette polish, route page transitions, and the real (authenticated) GitHub contribution-calendar data. Left as a placeholder milestone — break into issues once M0–M3 ship.

**Target date:** TBD
