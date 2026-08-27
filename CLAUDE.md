@AGENTS.md

## Conventions

**Post-merge status updates.** When a branch merges into `main`:

1. Merge the branch.
2. Commit a `## Project Status` update below describing what shipped (direct commit to `main` is fine — no branch protection on this repo, so a doc-only change doesn't need its own branch/PR).
3. Only then close the associated GitHub issue(s) via `gh issue close` — closure comes *after* the status entry that documents it, not before. PR bodies should avoid `Closes #N` auto-closing keywords, since those close issues instantly at merge time, before step 2 can happen.

## Project Status

- **PR #35 — "M0: Scaffold, theming, and core primitives"** — merged 2026-08-27 (commit `7fbcdde`). Next.js 16 scaffold (Tailwind v4, TypeScript, Turbopack), dark/light theming via CSS variables + `@theme inline`, core hooks (`useMediaQuery`, `useReducedMotion`, `useMousePosition`), UI primitives (`AnimatedText`, `ScrollReveal`, `GlowBackground`, `MagneticButton`), `CustomCursor`, `SmoothScrollProvider` (Lenis + GSAP), layout shell with heading-only stubs for every section. Closed issues #1–#13 (auto-closed by the PR merge, before this convention existed — noted here for the record).
