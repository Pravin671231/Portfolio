@AGENTS.md

## Conventions

**Post-merge status updates.** When a branch merges into `main`:

1. Merge the branch.
2. Commit a `## Project Status` update below describing what shipped (direct commit to `main` is fine — no branch protection on this repo, so a doc-only change doesn't need its own branch/PR).
3. Only then close the associated GitHub issue(s) via `gh issue close` — closure comes *after* the status entry that documents it, not before. PR bodies should avoid `Closes #N` auto-closing keywords, since those close issues instantly at merge time, before step 2 can happen.

## Project Status

- **PR #37 — "Add local Claude skills for repo workflows"** — merged 2026-08-27 (commit `f4d4ba6`). Vendored three workflow skills into `.claude/skills/` so they travel with the repo instead of living only in a user's global Claude config: `discuss-plan-build` (discuss → confirm → Plan Mode → confirm → task list + Auto/Manual → execute), `auto-pr-merge` (PR → CI wait → squash-merge → branch cleanup → local sync → follow-up doc-sync per this convention), and `auto-commit-push` (stage/commit/push, no gates). Content copied verbatim from the global versions; no associated issue.
- **PR #36 — "M1: MVP animation systems"** — merged 2026-08-27 (commit `f663f2b`). Turned the M0 heading-only stubs into the real, animated MVP: Hero (AnimatedText + GlowBackground + scroll indicator), About (staggered ScrollReveal), ProjectCard/ProjectPreview with hover overlay + tag stagger, Projects' GSAP pinned horizontal scroll (≥1024px, motion-enabled) with a genuinely separate vertical-stack fallback otherwise, project case-study route (`/projects/[slug]`), Process's GSAP-scrubbed timeline, `/api/github` route + live-stats Github section (count-up + seeded mock contribution grid), Contact's char-stagger headline + magnetic CTA, and cursor-mode wiring (`view`/`code`/`talk`) across all three touch points. Issues #14–#23 closed explicitly below, per this convention.
- **PR #35 — "M0: Scaffold, theming, and core primitives"** — merged 2026-08-27 (commit `7fbcdde`). Next.js 16 scaffold (Tailwind v4, TypeScript, Turbopack), dark/light theming via CSS variables + `@theme inline`, core hooks (`useMediaQuery`, `useReducedMotion`, `useMousePosition`), UI primitives (`AnimatedText`, `ScrollReveal`, `GlowBackground`, `MagneticButton`), `CustomCursor`, `SmoothScrollProvider` (Lenis + GSAP), layout shell with heading-only stubs for every section. Closed issues #1–#13 (auto-closed by the PR merge, before this convention existed — noted here for the record).
