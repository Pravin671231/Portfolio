"use client";

import { animate, motion, useInView, useMotionValue, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/context/CursorContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fetchGithubStats } from "@/lib/github";

const GITHUB_USER = "Pravin671231";

/**
 * Deterministic seeded PRNG (mulberry32) — never Math.random() here, since
 * this grid must render identically on the server and the client to avoid
 * a hydration mismatch. Fixed seed, computed once at module scope.
 */
function seededGrid(seed: number, count: number): number[] {
  let t = seed;
  const cells: number[] = [];
  for (let i = 0; i < count; i++) {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    cells.push(((r ^ (r >>> 14)) >>> 0) / 4294967296);
  }
  return cells;
}

const GRID_CELLS = seededGrid(42, 140);

const gridContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.008 } },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

function CountUp({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState("00");

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(2, "0")),
    });
    return () => controls.stop();
  }, [inView, value, motionValue, prefersReducedMotion]);

  const shown = inView && prefersReducedMotion ? String(value).padStart(2, "0") : display;

  return (
    <div>
      <p ref={ref} className="font-mono text-4xl font-semibold">
        {shown}
      </p>
      <p className="mt-2 text-sm text-text-muted">{label}</p>
    </div>
  );
}

export function Github() {
  const [stats, setStats] = useState({ repos: 0, followers: 0, totalStars: 0 });
  const { setCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    fetchGithubStats().then(setStats);
  }, []);

  return (
    <section id="github" className="relative px-(--space-container-x) py-(--space-section-y)">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">GitHub</p>
        <h2 className="mb-12 text-h1 font-semibold">
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursor("code")}
            onMouseLeave={() => setCursor("default")}
          >
            Open Source Activity
          </a>
        </h2>

        <div className="mb-12 grid grid-cols-3 gap-6">
          <CountUp value={stats.repos} label="Repositories" />
          <CountUp value={stats.followers} label="Followers" />
          <CountUp value={stats.totalStars} label="Stars" />
        </div>

        <motion.div
          className="mx-auto grid max-w-xl gap-1"
          style={{ gridTemplateColumns: "repeat(20, minmax(0,1fr))" }}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          variants={gridContainerVariants}
        >
          {GRID_CELLS.map((intensity, i) => (
            <motion.div
              key={i}
              variants={cellVariants}
              className="aspect-square rounded-sm bg-accent-blue"
              style={{ opacity: 0.1 + intensity * 0.6 }}
            />
          ))}
        </motion.div>
        <p className="mt-4 font-mono text-xs text-text-faint">
          Mock activity grid — real contribution data requires the authenticated GitHub GraphQL API
          (Phase 2).
        </p>
      </div>
    </section>
  );
}
