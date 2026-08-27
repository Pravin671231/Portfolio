# Software Requirements Specification — Pravin K Portfolio

## 1. Purpose & Scope

This document specifies the requirements for an animation-forward personal developer portfolio website, inspired by UpCurvv-style scroll storytelling (staggered text reveals, pinned horizontal scroll, magnetic buttons, custom cursor, animated counters) but with original visual identity and content.

The build is scoped as an **MVP**: eight priority animation systems are implemented end-to-end with full fidelity; every remaining section from the original 32-part animation concept is still present and functional, using a single simple scroll-reveal treatment, and explicitly deferred to Phase 2 for its bespoke motion design. This document covers both scopes and marks each item accordingly.

Content (project case studies, bio copy, certifications, testimonials) is placeholder data at MVP time, clearly marked for later replacement with real content.

## 2. Tech Stack

| Concern | Technology | Verified stable version (Aug 2026) |
|---|---|---|
| Framework | Next.js (App Router), TypeScript | Next.js 16.3.x, TypeScript ^5 (resolves 5.9.x — confirmed by an actual `create-next-app@latest` run; its template hasn't moved to TS 6/7 yet despite both existing on npm) |
| Styling | Tailwind CSS, plain CSS for gradients/glows/hover micro-interactions | Tailwind CSS 4.3.x — CSS-first config (`@theme` in `globals.css`), not a JS config file |
| Component animation | **Motion** (formerly Framer Motion) | `motion` ^12, imported from `motion/react` — `framer-motion` is a deprecated compatibility alias, do not install it new |
| Scroll-driven / pinned animation | GSAP + ScrollTrigger | GSAP 3.15.x — fully free as of April 2025, including ScrollTrigger and every plugin |
| Smooth scrolling | Lenis (synced to GSAP's ticker) | `lenis` 1.3.x (package renamed from `@studio-freight/lenis`) |
| Icons | Lucide React | latest |

Runtime: Node.js Active LTS (24.x) for local dev and CI. Package versions above drift — re-verify before install rather than trusting this table indefinitely.

## 3. Site Structure

```
/                      Home — all sections composed on one page
/projects/[slug]       Project case-study detail page
/api/github            Server route: live GitHub stats for Pravin671231
```

## 4. Functional Requirements — MVP Priority Systems (full fidelity)

### FR-1 Hero
- Displays a staggered word-reveal headline ("Hi, I'm Pravin.") on page load (mount-triggered, not scroll-triggered).
- Subtitle line fades in after the headline stagger completes.
- Renders `GlowBackground`: CSS grid pattern + blurred radial gradient blobs, with a small mouse-parallax offset (±15–20px, spring-damped) on desktop.
- Displays an animated scroll-indicator (chevron) with an infinite bob loop.
- Under `prefers-reduced-motion: reduce`: headline appears via plain opacity fade (no stagger/mask), parallax locked to zero, scroll indicator static.

### FR-2 About
- Section content (heading, body copy, portrait) enters via `ScrollReveal` (fade + slide-up), staggered per element via incremented delay, firing once when ~30% of the section is in view.

### FR-3 Project Cards
- Each project renders as a large preview image with title and tag row.
- On hover (desktop): dark overlay fades in with a "VIEW CASE STUDY" label sliding up, and tags stagger in.
- Sets the custom cursor to `view` mode while hovered.
- Links to `/projects/[slug]`.

### FR-4 Horizontal Pinned Project Scroll
- At viewport width ≥1024px, with motion enabled (no touch pointer, no reduced-motion preference): the projects section pins in place while GSAP ScrollTrigger scrubs a horizontal translation across the project card track, driven 1:1 (or lightly smoothed) by scroll position.
- Below 1024px, on touch-pointer devices, or under reduced motion: renders the identical set of project cards as a plain vertical stack using `ScrollReveal` only. No ScrollTrigger instance is created in this branch.
- Must never leave the page in a "stuck" horizontal-scroll state on mobile — this is the single highest-risk behavior to verify.

### FR-5 "How I Build" Process Timeline
- A vertical line's fill (`scaleY`) is scrubbed by GSAP ScrollTrigger as the user scrolls through the section.
- Each step card fades/slides in independently via `ScrollReveal`.
- Under reduced motion: the line renders fully filled statically; no ScrollTrigger instance is created.

### FR-6 GitHub Section
- Server route `GET /api/github` fetches live public data for GitHub user `Pravin671231` (profile + repo list) and returns `{ repos, followers, totalStars }`, with a 1-hour cache and a safe zeroed fallback on fetch failure.
- An optional `GITHUB_TOKEN` environment variable, if set, is sent as a bearer token to raise the GitHub API rate limit.
- Displayed stats count up from 0 via animated numbers once the block scrolls into view (fires once).
- Displays a contribution-calendar-style grid of animated cells. **Known limitation:** the public unauthenticated GitHub REST API does not expose real contribution-calendar data (that requires the authenticated GraphQL API); MVP uses seeded/mock cell data, clearly commented as such, with the same visual stagger-in treatment. Wiring in real data is a Phase 2 item.

### FR-7 Contact
- Large multi-line headline ("LET'S / BUILD / IT.") reveals character-by-character, triggered when scrolled into view.
- Primary CTA is wrapped in the magnetic-button behavior (see FR-8) and sets the custom cursor to `talk` mode on hover.
- Reuses `GlowBackground` for visual continuity with the Hero section.

### FR-8 Custom Cursor & Magnetic Buttons
- A custom cursor (small dot) tracks the pointer with spring physics on desktop.
- Cursor mode switches contextually: `view` over project cards, `code` over GitHub links, `talk` over the contact CTA, `default` elsewhere — each mode shows an expanded label.
- Fully disabled (native cursor restored) on touch-pointer devices and under reduced motion.
- Magnetic pull (button displaces toward the cursor, clamped to 5–10px, springs back on mouse-leave) is applied only to primary CTAs (Contact CTA; optionally Hero CTA), not to every interactive element.

## 5. Functional Requirements — Phase 2 Stub Sections (present, simple scope in MVP)

All of the following exist as real, functional sections wired into the page, using only the generic `ScrollReveal` fade/slide entrance (or, for Navbar, a simple scroll-position threshold check) — not GSAP, not bespoke choreography. Each has a noted Phase 2 target for its full treatment.

| Section | MVP scope | Phase 2 target |
|---|---|---|
| Navbar | Static/simple fade on load; background blur toggles past a scroll threshold | Entrance stagger for nav items; smooth shrink-on-scroll animation |
| Footer | Static content, simple hover states | — (no Phase 2 planned) |
| About card | Plain static card | Mouse-tilt (`rotateX`/`rotateY`, ±3°) |
| Stack | Responsive grid of skill nodes, each `ScrollReveal` | SVG connection-line diagram between related nodes, GSAP stroke-dashoffset draw-in |
| Journey | Simple vertical list of experience entries | Unify visually with Process's animated line treatment |
| Certifications | Card grid, `ScrollReveal` per card | Hover lift + border glow + icon rotation |
| Testimonials | Static row/grid of quote cards | Auto-advancing/draggable carousel |
| Command Palette | `Ctrl+K` opens a plain modal with a filterable static nav list; Enter navigates | Fuzzy search, animated open/close, keyboard highlight navigation |
| Page transitions | None (default Next.js navigation) | `AnimatePresence`-based route transition |
| Floating decorative code glyphs | A few CSS-keyframe-animated glyphs near Hero/About | — (decorative, low priority) |
| Project case-study page | Static detail layout (image, title, description, tags, links) using `ScrollReveal` | Progressive section-by-section reveal (Problem → Architecture → Features → Stack → Result) |

## 6. Non-Functional Requirements

- **NFR-1 Responsive:** Full functional parity across mobile (~375px), tablet (~768px), and desktop (~1440px) viewport widths; complex desktop-only effects (pinned horizontal scroll, custom cursor, strong parallax) degrade gracefully rather than breaking layout on smaller/touch viewports.
- **NFR-2 Reduced motion:** Every animation system respects `prefers-reduced-motion: reduce` with a documented static/instant fallback (see FR sections above); no GSAP instance is ever created when reduced motion is active.
- **NFR-3 Performance:** No continuous full-screen particle/3D backgrounds; background motion limited to 2–3 slow-moving gradient blobs at low opacity (0.03–0.08). `next/image` used with explicit sizing to avoid layout shift (CLS).
- **NFR-4 Build correctness:** `next build` completes with zero TypeScript and zero ESLint errors; all GSAP/Motion files are correctly marked as Client Components. Enforced automatically by CI (`.github/workflows/ci.yml`, set up in M0) on every push/PR to `main`, not just checked manually before merge.
- **NFR-5 Content integrity:** No fabricated external links (project repo/live URLs use `#` placeholders where no real link exists); placeholder testimonials read as obviously placeholder rather than fabricated realistic endorsements.

## 7. Data Requirements

Typed data modules under `src/data/`:

- `Project` — slug, title, tagline, description, tags, coverImage, liveUrl, repoUrl, featured, optional caseStudy breakdown.
- `StackNode` — id, name, category, icon, optional `connectsTo` (reserved for Phase 2 diagram).
- `ExperienceEntry` — id, role, organization, start/end, summary, highlights.
- `Certification` — id, title, issuer, date, credentialUrl.
- `Testimonial` — id, quote, author, role, avatar.

## 8. Out of Scope (MVP)

- Real GitHub contribution-calendar data (requires authenticated GraphQL integration).
- Bespoke motion for any Phase 2 stub section listed in §5.
- Page-transition animation between routes.
- CMS/backend for editing content — content is static, file-based.
