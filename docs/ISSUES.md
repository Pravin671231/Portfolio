# GitHub Issues — Pravin K Portfolio

Ready-to-create GitHub issues for `Pravin671231/Portfolio`, grouped by milestone (see [MILESTONES.md](./MILESTONES.md)). Each entry can be created directly via `gh issue create --title "..." --body "..." --milestone "..." --label "..."`.

Suggested label set: `setup`, `ci`, `primitive`, `hook`, `data`, `section`, `animation`, `gsap`, `motion`, `api`, `docs`, `polish`, `a11y`, `phase-2`.

---

## Milestone: M0 — Scaffold & Core Primitives

### 1. Scaffold Next.js project with TypeScript, Tailwind, App Router
- **Description:** Run `create-next-app` in the repo root with TypeScript, Tailwind, App Router, `src/` directory, ESLint, and `@/*` import alias. Install `motion`, `gsap`, `lenis`, `lucide-react`, `clsx`, `tailwind-merge`. Add `.env.example` documenting the optional `GITHUB_TOKEN`.
- **Acceptance criteria:** `npm run dev` boots the default page with no errors; all listed dependencies present in `package.json`; `.env.example` committed, `.env.local` gitignored.
- **Labels:** `setup`

### 1a. Set up CI pipeline (GitHub Actions)
- **Description:** Add `.github/workflows/ci.yml` running on `push` to `main` and on every `pull_request`: checkout → `actions/setup-node` (Node **24**, Active LTS as of Aug 2026 — re-verify at build time, this drifts, `cache: npm`) → `npm ci` → `npm run lint` → `npm run build` → `npx tsc --noEmit`. No deploy step in this milestone (deploy pipeline, if wanted, is a separate later decision) — this is verification-only CI, matching SRS NFR-4 (build correctness) so every later PR is checked automatically instead of relying on manual `next build` runs. Cache `~/.npm`/`node_modules` via `setup-node`'s built-in npm cache to keep runs fast.
  - **Important ordering note (discovered while implementing M0):** `build` must run **before** `tsc --noEmit`, not after. Next.js 16's typed-routes convention (`LayoutProps<"/">` etc., used in `src/app/layout.tsx`) is an ambient type generated into `.next/types/` only after `next build` (or `next dev`) has run at least once — on a fresh checkout, running `tsc --noEmit` first fails with `Cannot find name 'LayoutProps'`. `next build` already performs its own full type-check, so the standalone `tsc --noEmit` afterward is a fast, cache-independent confirmation, not the first type-check.
- **Acceptance criteria:** workflow runs green on a trivial PR against `main`; a deliberately broken build (bad import) or lint error fails the workflow; workflow file references only scripts that exist in `package.json` (`lint`, `build`) plus `tsc --noEmit` for an explicit type-check step, run after `build` so `.next/types` already exists.
- **Labels:** `setup`, `ci`

### 2. Add `lib/utils.ts` and global Tailwind/CSS config
- **Description:** `cn()` helper (clsx + tailwind-merge); `globals.css` base styles, the `@theme` block defining custom colors/fonts/radii per `docs/DESIGN-TOKENS.md` (Tailwind v4 CSS-first config — `create-next-app --tailwind` no longer generates a `tailwind.config.ts`), and any keyframes needed by `FloatingCode`.
- **Acceptance criteria:** `cn()` importable from `@/lib/utils`; custom theme values (colors, fonts) available as Tailwind utility classes via the `@theme` block in `globals.css`.
- **Labels:** `setup`

### 3. Build `useReducedMotion`, `useMediaQuery`, `useMousePosition` hooks
- **Description:** `hooks/useReducedMotion.ts` (matchMedia on `prefers-reduced-motion: reduce`, subscribes to changes), `hooks/useMediaQuery.ts` (generic matchMedia hook), `hooks/useMousePosition.ts` (raw `{x,y}` from `mousemove`).
- **Acceptance criteria:** each hook returns correct values in isolation with no SSR/hydration mismatch warnings; `useReducedMotion` responds live to OS/DevTools toggle.
- **Labels:** `hook`

### 4. Build typed data layer (`src/data/*.ts`)
- **Description:** `projects.ts` (`Project` interface, seeded with TechCart/MovieNest/PhoneShop/LeafFlow placeholders, `liveUrl`/`repoUrl` as `#`), `skills.ts` (`StackNode`), `experience.ts` (`ExperienceEntry`), `certifications.ts` (`Certification`), `testimonials.ts` (`Testimonial`). Each file headed with a `// TODO: replace with real content` comment.
- **Acceptance criteria:** all interfaces exported and typed; no fabricated real URLs; placeholder testimonial text reads as obviously placeholder.
- **Labels:** `data`

### 5. Build `AnimatedText` primitive
- **Description:** Word/char stagger text-reveal component (`text`, `mode: 'chars'|'words'`, `trigger: 'mount'|'inView'`, `delay`, `staggerChildren` props); mask + `y: 100%→0%` via Motion variants; reduced-motion fallback is a plain opacity fade with no stagger.
- **Acceptance criteria:** works standalone with both `mount` and `inView` triggers; visibly degrades correctly under reduced motion.
- **Labels:** `primitive`, `motion`

### 6. Build `ScrollReveal` primitive
- **Description:** Generic `whileInView` fade/slide wrapper (`opacity 0→1`, `y: 24→0`, `viewport={{once:true, amount:0.2}}`, consistent ease curve). This is the single entrance primitive reused by About and every Phase-2 stub section.
- **Acceptance criteria:** fires once per mount when scrolled into view; configurable `delay`/`y`/`duration` via props.
- **Labels:** `primitive`, `motion`

### 7. Build `GlowBackground` primitive
- **Description:** CSS grid pattern + blurred radial-gradient blobs (plain CSS) with a small Motion-driven mouse-parallax transform (±15–20px, spring-damped) sourced from `useMousePosition`. Reduced motion: parallax locked to zero, gradient/grid still renders statically.
- **Acceptance criteria:** used by both Hero and Contact; no parallax listener overhead when reduced motion is active.
- **Labels:** `primitive`, `motion`

### 8. Build `MagneticButton` primitive
- **Description:** Wraps a child button/link; on `mousemove` within bounds, pulls it toward the cursor (clamped 5–10px) via spring-animated transform; resets on `mouseleave`. Disabled entirely (no listeners) on touch-pointer devices and under reduced motion.
- **Acceptance criteria:** displacement never exceeds the clamp; fully inert (plain button) on touch/reduced-motion.
- **Labels:** `primitive`, `motion`

### 9. Build `CustomCursor` + `CursorContext`
- **Description:** Fixed-position spring-following cursor dot; `CursorContext` exposes `setCursor(mode)` with modes `default|view|code|talk`; expanded pill/label shown for non-default modes. Mounted once at the root layout. Fully disabled (native cursor restored) on touch-pointer devices and under reduced motion.
- **Acceptance criteria:** mode switches correctly when hovering elements that call `setCursor`; native cursor is visible and no dot renders on a touch-emulated viewport or with reduced motion active.
- **Labels:** `primitive`, `motion`, `a11y`

### 10. Build `SmoothScrollProvider` (Lenis) and wire into layout
- **Description:** Mounts Lenis app-wide, syncs its scroll tick with `gsap.ticker`/`ScrollTrigger.update()` so Lenis and ScrollTrigger don't fight each other. Skipped entirely (native scroll) under reduced motion.
- **Acceptance criteria:** smooth scroll active site-wide on desktop; native scroll behavior when reduced motion is set; no jank/fighting between Lenis and ScrollTrigger-pinned sections (verify once Projects/Process exist).
- **Labels:** `primitive`, `gsap`

### 11. Build layout shell: `layout.tsx`, `Navbar`, `Footer`, `page.tsx`
- **Description:** Root layout wires `SmoothScrollProvider`, `CursorContext` + `CustomCursor`, fonts, metadata. `Navbar`: simple fade on load, background blur past a scroll-position threshold (no GSAP). `Footer`: static content, simple hover states. `page.tsx` assembles the full section list in order (including stub sections as empty/placeholder components initially).
- **Acceptance criteria:** every section from the SRS is present in `page.tsx` (even if a stub renders a heading only, until its own issue lands); Navbar blur toggles correctly on scroll.
- **Labels:** `section`, `setup`

### 11a. Implement dark/light theme toggle
- **Description:** Per `docs/DESIGN-TOKENS.md` "Theming mechanism" — CSS-variable-based dark/light palette (both tables in DESIGN-TOKENS §1), applied via a `data-theme` attribute on `<html>`, with a small `ThemeProvider`/`useTheme` hook and a toggle button in `Navbar`. Initial resolution order: persisted `localStorage` choice → OS `prefers-color-scheme` → dark default. No transition animation on toggle. Reference implementation already exists in `mock-ui/index.html` (inline script) — port the same variable/attribute approach into `globals.css` + Tailwind config rather than reinventing it.
- **Acceptance criteria:** toggling flips every themed surface instantly with no flash-of-wrong-theme on load; choice persists across reloads; falls back to OS preference when nothing is stored; no hydration mismatch warning in Next.js (resolve theme in an inline script before hydration, same pattern as the mockup).
- **Labels:** `polish`, `a11y`

---

## Milestone: M1 — MVP Animation Systems

### 12. Implement Hero section
- **Description:** Per SRS FR-1 — `GlowBackground` + `AnimatedText` mount-triggered word stagger headline, subtitle fade-in, animated scroll-indicator chevron.
- **Acceptance criteria:** matches FR-1 behavior and reduced-motion fallback exactly.
- **Labels:** `section`, `animation`, `motion`

### 13. Implement About section
- **Description:** Per SRS FR-2 — heading/body/portrait staggered in via `ScrollReveal`, fires once at ~30% visibility.
- **Acceptance criteria:** matches FR-2; no re-fire on scroll-up oscillation at the trigger boundary.
- **Labels:** `section`, `animation`

### 14. Implement `ProjectCard` and `ProjectPreview`
- **Description:** Per SRS FR-3 — hover overlay with "VIEW CASE STUDY", tag stagger, sets cursor to `view` mode, links to `/projects/[slug]`.
- **Acceptance criteria:** matches FR-3; overlay/tag animation only active on hover-capable (non-touch) devices.
- **Labels:** `section`, `animation`, `motion`

### 15. Implement `Projects` horizontal pinned scroll + mobile fallback
- **Description:** Per SRS FR-4 — GSAP ScrollTrigger pin + scrub at ≥1024px with motion enabled; identical cards rendered as a plain vertical `ScrollReveal` stack otherwise, with zero ScrollTrigger instances created in that branch.
- **Acceptance criteria:** page never gets stuck in horizontal scroll on mobile/touch/reduced-motion (explicit manual test); smooth pin/scrub behavior at desktop widths.
- **Labels:** `section`, `animation`, `gsap`, `a11y`

### 16. Implement project case-study route (`/projects/[slug]`)
- **Description:** `ProjectCaseStudy.tsx` + `app/projects/[slug]/page.tsx` — static detail layout (image, title, description, tags, links) using `ScrollReveal` for section entrances. Full progressive-reveal choreography is Phase 2.
- **Acceptance criteria:** each seeded project resolves to a working detail page; 404/graceful handling for unknown slugs.
- **Labels:** `section`

### 17. Implement "How I Build" Process timeline
- **Description:** Per SRS FR-5 — GSAP ScrollTrigger scrubs vertical line `scaleY`; steps individually `ScrollReveal`-animated; reduced motion renders the line fully filled statically with no ScrollTrigger instance.
- **Acceptance criteria:** matches FR-5.
- **Labels:** `section`, `animation`, `gsap`

### 18. Implement `/api/github` route and `lib/github.ts`
- **Description:** Per SRS FR-6 — server route fetches live stats for `Pravin671231` (repo count, followers, summed stars), 1-hour cache, safe fallback on failure, optional `GITHUB_TOKEN` bearer header.
- **Acceptance criteria:** hitting `/api/github` directly returns plausible real JSON; failure path returns a zeroed fallback without throwing.
- **Labels:** `api`

### 19. Implement `Github` section UI
- **Description:** Per SRS FR-6 — animated count-up numbers (fires once in view) fed by `/api/github`; mock/seeded contribution-style grid with staggered entrance, explicitly commented as placeholder data pending real GraphQL integration.
- **Acceptance criteria:** counters animate once and match live API values; grid renders and staggers in once.
- **Labels:** `section`, `animation`, `motion`

### 20. Implement Contact section
- **Description:** Per SRS FR-7 — "LET'S / BUILD / IT." character-reveal on scroll-into-view via `AnimatedText`, `MagneticButton`-wrapped primary CTA, cursor `talk` mode, reused `GlowBackground`.
- **Acceptance criteria:** matches FR-7.
- **Labels:** `section`, `animation`, `motion`

### 21. Wire magnetic buttons and cursor modes across primary CTAs
- **Description:** Confirm `MagneticButton` and cursor-mode context calls are applied consistently on Contact's CTA, project cards, and GitHub links per SRS FR-8 — not applied broadly to nav links or secondary buttons.
- **Acceptance criteria:** cursor label swaps correctly across all three interactive contexts (`view`/`code`/`talk`); magnetic effect present only on primary CTAs.
- **Labels:** `polish`, `motion`

---

## Milestone: M2 — Stub Sections (Phase-2-ready)

### 22. Implement Stack section (stub)
- **Description:** Responsive grid of `StackNode`s from `data/skills.ts`, each entrance via `ScrollReveal`. No SVG connection diagram (Phase 2).
- **Labels:** `section`, `phase-2`

### 23. Implement Journey section (stub)
- **Description:** Simple vertical list from `data/experience.ts`, `ScrollReveal` per entry. No connecting animated line (Phase 2).
- **Labels:** `section`, `phase-2`

### 24. Implement Certifications section (stub)
- **Description:** Card grid from `data/certifications.ts`, `ScrollReveal` per card. No hover flip/glow (Phase 2).
- **Labels:** `section`, `phase-2`

### 25. Implement Testimonials section (stub)
- **Description:** Static row/grid from `data/testimonials.ts`, `ScrollReveal` entrance, no carousel logic (Phase 2).
- **Labels:** `section`, `phase-2`

### 26. Implement `CommandPalette` (stub)
- **Description:** `Ctrl+K`/`Cmd+K` toggles a plain modal with a text input filtering a static nav-link list; `Enter` navigates via `next/navigation`. No fuzzy search or animated open/close (Phase 2).
- **Labels:** `section`, `phase-2`

### 27. Implement `FloatingCode` decorative primitive
- **Description:** A handful of absolutely-positioned decorative glyphs near Hero/About with a plain CSS `@keyframes float` — no JS animation library involved.
- **Labels:** `primitive`, `phase-2`

---

## Milestone: M3 — Responsive, Reduced-Motion & Polish

### 28. Full responsive breakpoint pass
- **Description:** Manually verify every section at ~375px, ~768px, ~1440px widths; confirm no layout breakage, no horizontal overflow, correct fallback behavior for Projects' pinned scroll and the custom cursor.
- **Labels:** `polish`, `a11y`

### 29. Full reduced-motion pass
- **Description:** Toggle `prefers-reduced-motion: reduce` (OS or DevTools emulation) and re-verify every animated system collapses to its documented static/instant fallback with no console errors from GSAP attaching to unmounted refs.
- **Labels:** `polish`, `a11y`

### 30. Performance & Lighthouse pass
- **Description:** Chrome DevTools Performance recording during Hero parallax and Projects horizontal scroll (check for dropped frames); Lighthouse run against `next build && next start` focused on Performance score and CLS; confirm all placeholder images use `next/image` with explicit sizing.
- **Labels:** `polish`

### 31. Build/type-check clean pass
- **Description:** `next build` completes with zero TypeScript and zero ESLint errors; confirm every GSAP/Motion file has the correct `'use client'` boundary.
- **Labels:** `polish`

### 32. Metadata, favicon, and SEO polish
- **Description:** Add page metadata (title/description/OG tags) in `layout.tsx`, favicon, and any remaining SEO basics. Source the monogram mark, favicon sizes, and OG image layout from `brand-kit/index.html` (§02 Favicon, §03 Social Share Image) rather than redesigning them here — export real `app/icon.tsx`/`favicon.ico` and an `app/opengraph-image.tsx` (or static PNG) matching that reference.
- **Labels:** `polish`
