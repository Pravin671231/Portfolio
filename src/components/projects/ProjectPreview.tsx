"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DURATION_FAST, EASE_OUT_EXPO } from "@/lib/motion";
import type { Project } from "@/data/projects";

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: DURATION_FAST } },
};

const labelVariants: Variants = {
  rest: { y: 12, opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: DURATION_FAST, ease: EASE_OUT_EXPO } },
};

export function ProjectPreview({ project }: { project: Project }) {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  return (
    <motion.div
      className="relative aspect-video overflow-hidden rounded-lg bg-bg-elevated"
      initial="rest"
      animate="rest"
      whileHover={canHover ? "hover" : undefined}
    >
      <Image
        src={project.coverImage}
        alt={`${project.title} preview`}
        fill
        sizes="(min-width: 1024px) 480px, 100vw"
        className="object-cover"
      />
      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 flex items-center justify-center bg-bg/70"
      >
        <motion.span
          variants={labelVariants}
          className="font-mono text-xs uppercase tracking-[0.08em] text-text"
        >
          View case study →
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
