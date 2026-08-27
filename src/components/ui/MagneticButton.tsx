"use client";

import { motion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const MAX_PULL = 8; // px, within the 5-10px range from docs/DESIGN-TOKENS.md

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useReducedMotion();
  const disabled = isTouch || prefersReducedMotion;

  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  if (disabled) {
    // Fully inert — no listeners attached, plain wrapper.
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    springX.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, offsetX * 0.3)));
    springY.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, offsetY * 0.3)));
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
