"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePositionValue } from "@/hooks/useMousePositionValue";
import { cn } from "@/lib/utils";

const MAX_PARALLAX = 18; // px, within the 15-20px range from docs/DESIGN-TOKENS.md

interface GlowBackgroundProps {
  className?: string;
}

// Normalize a raw viewport coordinate to a small clamped offset around center.
// `value === 0` is the pre-first-mousemove state (the MotionValue's initial):
// resolve it to no offset so SSR and the first client render agree (`window` is
// absent on the server) — a real pointer at x=0 landing here is a 1px non-issue.
function parallax(value: number, extent: number): number {
  if (value === 0 || extent <= 0) return 0;
  const offset = (value / extent - 0.5) * MAX_PARALLAX * 2;
  return Math.max(-MAX_PARALLAX, Math.min(MAX_PARALLAX, offset));
}

export function GlowBackground({ className }: GlowBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = useMousePositionValue(!prefersReducedMotion);

  const rawX = useTransform(x, (v) =>
    prefersReducedMotion
      ? 0
      : parallax(v, typeof window !== "undefined" ? window.innerWidth : 0),
  );
  const rawY = useTransform(y, (v) =>
    prefersReducedMotion
      ? 0
      : parallax(v, typeof window !== "undefined" ? window.innerHeight : 0),
  );

  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const blobBX = useTransform(springX, (v) => -v);
  const blobBY = useTransform(springY, (v) => -v);

  return (
    <div
      data-testid="glow-parallax"
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <motion.div
        data-testid="glow-blob"
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-accent-blue opacity-[0.06] blur-[90px]"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-accent-cyan opacity-[0.05] blur-[90px]"
        style={{ x: blobBX, y: blobBY }}
      />
    </div>
  );
}
