"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION_BASE, EASE_IN_OUT } from "@/lib/motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-(--space-container-x)">
      <GlowBackground />

      <div className="relative max-w-3xl text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">
          Available for work
        </p>
        <h1 className="text-display font-semibold tracking-tight">
          <AnimatedText text="Hi, I'm Pravin." mode="words" trigger="mount" />
        </h1>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg text-text-muted md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION_BASE, delay: prefersReducedMotion ? 0.1 : 0.7 }}
        >
          Full Stack Developer building fast, thoughtful products with Next.js, TypeScript &amp; Node.js.
        </motion.p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <MagneticButton>
            <a
              href="#projects"
              className="rounded-sm bg-text px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              View My Work
            </a>
          </MagneticButton>
          <a
            href="#contact"
            className="rounded-sm border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent-blue hover:text-accent-blue"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 flex flex-col items-center text-text-faint"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 1.6, repeat: Infinity, ease: EASE_IN_OUT }
        }
      >
        <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em]">Scroll</span>
        <ChevronDown size={16} aria-hidden />
      </motion.div>
    </section>
  );
}
