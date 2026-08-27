"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";

const MAX_PARALLAX = 18; // px, within the 15-20px range from docs/DESIGN-TOKENS.md

interface GlowBackgroundProps {
  className?: string;
}

export function GlowBackground({ className }: GlowBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = useMousePosition(!prefersReducedMotion);

  // Normalize raw viewport position to a small clamped offset around center.
  const rawX = prefersReducedMotion
    ? 0
    : Math.max(-MAX_PARALLAX, Math.min(MAX_PARALLAX, (x / (typeof window !== "undefined" ? window.innerWidth : 1) - 0.5) * MAX_PARALLAX * 2));
  const rawY = prefersReducedMotion
    ? 0
    : Math.max(-MAX_PARALLAX, Math.min(MAX_PARALLAX, (y / (typeof window !== "undefined" ? window.innerHeight : 1) - 0.5) * MAX_PARALLAX * 2));

  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const blobAX = useTransform(springX, (v) => v);
  const blobAY = useTransform(springY, (v) => v);
  const blobBX = useTransform(springX, (v) => -v);
  const blobBY = useTransform(springY, (v) => -v);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <motion.div
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-accent-blue opacity-[0.06] blur-[90px]"
        style={{ x: blobAX, y: blobAY }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-accent-cyan opacity-[0.05] blur-[90px]"
        style={{ x: blobBX, y: blobBY }}
      />
    </div>
  );
}
