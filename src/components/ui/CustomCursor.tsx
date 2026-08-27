"use client";

import { AnimatePresence, motion, useSpring } from "motion/react";
import { useEffect } from "react";
import { useCursor } from "@/context/CursorContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LABELS: Record<string, string> = {
  view: "VIEW",
  code: "CODE ↗",
  talk: "LET'S TALK",
};

export function CustomCursor() {
  const { mode } = useCursor();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useReducedMotion();
  const disabled = isTouch || prefersReducedMotion;

  const { x, y } = useMousePosition(!disabled);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (disabled) return;
    document.body.classList.add("cursor-none-desktop");
    return () => document.body.classList.remove("cursor-none-desktop");
  }, [disabled]);

  if (disabled) return null;

  const label = mode !== "default" ? LABELS[mode] : null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0"
      style={{ x: springX, y: springY, zIndex: "var(--z-cursor)" }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-text"
        animate={{
          width: label ? "auto" : 8,
          height: label ? "auto" : 8,
          padding: label ? "6px 14px" : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {label && (
            <motion.span
              key={mode}
              className="whitespace-nowrap font-mono text-xs font-medium text-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
