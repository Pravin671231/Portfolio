"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

export interface MousePositionValue {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * MotionValue-based sibling of `useMousePosition`. Returns `x`/`y` as
 * `MotionValue`s updated in place on `mousemove` — so consumers can feed them
 * straight into `useSpring`/`useTransform` without re-rendering on every move.
 *
 * `useSpring` in motion@13 only re-targets when its source is a MotionValue;
 * passing plain numbers (as `useMousePosition` returns) leaves the spring
 * frozen at its initial value. Cursor/parallax effects must use this hook.
 *
 * `enabled` lets a consumer (e.g. CustomCursor, GlowBackground) opt out of
 * attaching the mousemove listener entirely — not just ignoring the value —
 * when touch/reduced-motion makes tracking pointless. The values then stay
 * at their `0` start.
 */
export function useMousePositionValue(enabled: boolean = true): MousePositionValue {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    const handler = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [enabled, x, y]);

  return { x, y };
}
