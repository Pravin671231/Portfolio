"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { useCursor } from "@/context/CursorContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DURATION_FAST } from "@/lib/motion";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "./ProjectPreview";

const tagContainerVariants: Variants = {
  rest: {},
  hover: { transition: { staggerChildren: 0.05 } },
};

const tagVariants: Variants = {
  rest: { opacity: 0.6, y: 0 },
  hover: { opacity: 1, y: -2, transition: { duration: DURATION_FAST } },
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { setCursor } = useCursor();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  return (
    <motion.div
      initial="rest"
      whileHover={canHover ? "hover" : undefined}
      onMouseEnter={() => canHover && setCursor("view")}
      onMouseLeave={() => canHover && setCursor("default")}
      className="group block overflow-hidden rounded-lg border border-border bg-bg-elevated"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectPreview project={project} />
        <div className="p-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint">
            Project {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mb-1 text-h2 font-semibold">{project.title}</h3>
          <p className="mb-4 text-sm text-text-muted">
            {project.tagline} — {project.description}
          </p>
          <motion.div variants={tagContainerVariants} className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={tagVariants}
                className="rounded-sm bg-accent-blue/10 px-3 py-1 font-mono text-xs text-accent-blue"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
