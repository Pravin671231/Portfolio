# Design Tokens — Pravin K Portfolio

Reference doc for the visual design system. This is a spec, not code — the Tailwind config setup step (see `docs/ISSUES.md` #2) implements these values as an `@theme` block in `globals.css` (Tailwind v4's CSS-first config — there is no `tailwind.config.ts` by default), and `mock-ui/index.html` demonstrates them applied via Tailwind utility classes. Cross-references [SRS.md](./SRS.md) §2 (Tech Stack), §6 NFR-3 (performance ceiling on background motion), and the per-section animation parameters in §4.

## 1. Color Palette

Dark-first, single accent pair (indigo/cyan — a simple, modern, high-trust combination that reads clearly in both themes), per the original spec's "UpCurvv-inspired" background system (SRS §2, §6 NFR-3). The site supports a **light mode** as well — dark is the default theme; light is a full token override, not a separate design.

Tokens are implemented as CSS custom properties holding space-separated RGB triplets (e.g. `--color-bg: 5 5 5`) so Tailwind can consume them with alpha-channel support via `rgb(var(--color-bg) / <alpha-value>)`. This lets every existing utility class (`bg-bg`, `text-text-muted`, `bg-accent-blue/10`, etc.) work unchanged in both themes — only the variable values change.

| Token | Dark (default) | Light | Usage |
|---|---|---|---|
| `--color-bg` | `#050505` | `#ffffff` | Page background |
| `--color-bg-elevated` | `#0b0b0d` | `#f4f4f6` | Cards, panels, elevated surfaces |
| `--color-border` | `#1f1f23` | `#e2e2e6` | Hairline borders, dividers |
| `--color-text` | `#f5f5f7` | `#0a0a0c` | Primary text |
| `--color-text-muted` | `#9a9aa2` | `#52525b` | Secondary/body text |
| `--color-text-faint` | `#5c5c64` | `#8b8b93` | Tertiary labels, timestamps |
| `--color-accent-blue` | `#6366f1` (indigo) | `#4338ca` | Primary accent, links, glow blob A (darkened slightly in light mode for AA contrast on white) |
| `--color-accent-cyan` | `#38bdf8` (sky/cyan) | `#0284c7` | Secondary accent, glow blob B |
| `--color-accent-blue-soft` | `#6366f1` at 8–12% alpha | `#4338ca` at 8–12% alpha | Hover backgrounds, tag chips |
| `--color-success` | `#34d399` | `#059669` | Status indicators (e.g. "available for work") |
| `--color-grid-line` | `#ffffff` at 4% alpha | `#000000` at 4% alpha | `GlowBackground` grid pattern lines |

### Theming mechanism

- Theme is applied via a `data-theme="dark" | "light"` attribute on `<html>`, not a Tailwind `dark:` class — the CSS-variable approach above means components never need theme-conditional class lists.
- Initial theme resolution order: a persisted user choice (`localStorage`) → OS `prefers-color-scheme` → dark (default).
- Toggling is instant (no transition animation) to stay consistent with NFR-2/NFR-3 — a full-page color swap is not treated as "motion" requiring a reduced-motion fallback, but if a transition is added later it must itself respect `prefers-reduced-motion`.
- `mock-ui/index.html` implements this exact mechanism (see its inline `<script>`) as the reference for the real `ThemeProvider`/toggle button built in the Next.js app (Phase 2 item — not one of the 8 MVP systems, but small enough to fold into Navbar work in M1 if desired).

Glow blobs use `--color-accent-blue`/`--color-accent-cyan` as `radial-gradient` centers, capped at **0.03–0.08 opacity** per SRS NFR-3 — never brighter than content.

> Token names (`accent-blue`, `accent-cyan`) are kept stable identifiers, not literal hue descriptions — if the palette shifts again later, update the hex values here rather than renaming the tokens, so the Tailwind class names (`bg-accent-blue`, `text-accent-cyan`, etc.) never need to change across the codebase.

## 2. Typography

| Token | Value | Usage |
|---|---|---|
| `--font-sans` | `"Geist", "Inter", system-ui, sans-serif` | Body, UI text |
| `--font-mono` | `"Geist Mono", "JetBrains Mono", monospace` | Code snippets, `FloatingCode`, tags, stat labels |
| `--text-display` | `clamp(2.5rem, 6vw, 5.5rem)` / weight 600 / line-height 1.05 | Hero headline, Contact "LET'S BUILD IT." |
| `--text-h1` | `clamp(2rem, 4vw, 3rem)` / weight 600 / line-height 1.1 | Section headings |
| `--text-h2` | `1.5rem` / weight 600 / line-height 1.2 | Card titles, sub-headings |
| `--text-body` | `1rem` / weight 400 / line-height 1.6 | Paragraph copy |
| `--text-label` | `0.8125rem` / weight 500 / letter-spacing 0.04em / uppercase | Eyebrow labels ("PROJECT 01", "ABOUT") |
| `--text-caption` | `0.75rem` / weight 400 | Meta text, footnotes |

## 3. Spacing Scale

Tailwind's default 4px-base scale is used as-is (`1`–`96`). Section-level rhythm:

| Token | Value | Usage |
|---|---|---|
| `--space-section-y` | `clamp(5rem, 12vw, 9rem)` | Vertical padding between major sections |
| `--space-container-x` | `clamp(1.25rem, 5vw, 3rem)` | Horizontal page gutters |
| `--space-card-gap` | `1.5rem` | Gap between cards in a grid |

## 4. Radii & Shadows

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `0.5rem` | Tags, chips, small buttons |
| `--radius-md` | `1rem` | Cards |
| `--radius-lg` | `1.5rem` | Project preview panels, modals |
| `--radius-full` | `9999px` | Pills, cursor dot, avatar |
| `--shadow-glow-sm` | `0 0 24px -8px var(--color-accent-blue)` at low alpha | Hover glow on cards/buttons |
| `--shadow-glow-lg` | `0 0 120px -20px var(--color-accent-cyan)` at low alpha | Ambient section glow |

## 5. Motion (spec for later implementation — this doc does not animate)

Durations/easings referenced by the FR sections in `SRS.md`; consumed by the actual Motion/GSAP code in M1/M2, **not** by `mock-ui/index.html`, which stays static.

| Token | Value | Used by |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | `ScrollReveal`, most entrance animations |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Scroll-indicator bob, cursor spring easing reference |
| `--duration-fast` | `0.2s` | Hover micro-interactions (plain CSS tier) |
| `--duration-base` | `0.4s` | Component-level Motion transitions |
| `--duration-slow` | `0.8s` | Section entrance reveals |
| `--duration-float` | `6s–10s` | `FloatingCode` decorative loops (SRS §5) |
| `--stagger-word` | `0.08s` | `AnimatedText` word mode (Hero) |
| `--stagger-char` | `0.03s–0.04s` | `AnimatedText` char mode (Contact) |
| `--magnetic-max-pull` | `8px` (range 5–10px) | `MagneticButton` clamp |
| `--parallax-max-offset` | `15–20px` | `GlowBackground` mouse parallax clamp |

## 6. Breakpoints

Matches Tailwind defaults plus the SRS NFR-1 reference widths:

| Token | Value | Notes |
|---|---|---|
| `--bp-mobile` | `375px` (design reference) | Vertical stack only, no pinned scroll, no custom cursor |
| `--bp-tablet` | `768px` (`md:`) | Still vertical stack |
| `--bp-desktop` | `1024px` (`lg:`) | Horizontal pinned project scroll and custom cursor activate here (SRS FR-4, FR-8) |
| `--bp-wide` | `1440px` (design reference) | Max content width reference for large displays |

## 7. Z-Index Layers

| Token | Value | Usage |
|---|---|---|
| `--z-base` | `0` | Page content |
| `--z-nav` | `40` | Navbar |
| `--z-command-palette` | `50` | Command palette modal/overlay |
| `--z-cursor` | `60` | Custom cursor (always topmost, ignored by pointer-events) |
