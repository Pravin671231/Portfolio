"use client";

import { motion, type Variants } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  mode?: "chars" | "words";
  trigger?: "mount" | "inView";
  delay?: number;
  staggerChildren?: number;
  className?: string;
}

const unitVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function AnimatedText({
  text,
  mode = "words",
  trigger = "mount",
  delay = 0,
  staggerChildren,
  className,
}: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const stagger = staggerChildren ?? (mode === "chars" ? 0.035 : 0.08);

  if (prefersReducedMotion) {
    // Structurally simpler fallback: plain opacity fade, no mask/stagger.
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={trigger === "mount" ? { opacity: 1 } : undefined}
        whileInView={trigger === "inView" ? { opacity: 1 } : undefined}
        viewport={trigger === "inView" ? { once: true } : undefined}
        transition={{ duration: 0.3, delay }}
      >
        {text}
      </motion.span>
    );
  }

  const units = mode === "words" ? text.split(" ") : text.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const visibilityProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : { initial: "hidden", whileInView: "visible", viewport: { once: true } };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={containerVariants}
      {...visibilityProps}
    >
      {units.map((unit, index) => (
        <span
          key={`${unit}-${index}`}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "top" }}
        >
          <motion.span className="inline-block" variants={unitVariants}>
            {unit === " " ? " " : unit}
            {mode === "words" && index < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
