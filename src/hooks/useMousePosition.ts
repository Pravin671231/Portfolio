"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * `enabled` lets a consumer (e.g. CustomCursor, GlowBackground) opt out of
 * attaching the mousemove listener entirely — not just ignoring the value —
 * when touch/reduced-motion makes tracking pointless.
 */
export function useMousePosition(enabled: boolean = true): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    const handler = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [enabled]);

  return position;
}
