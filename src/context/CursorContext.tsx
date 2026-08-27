"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CursorMode = "default" | "view" | "code" | "talk";

interface CursorContextValue {
  mode: CursorMode;
  setCursor: (mode: CursorMode) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CursorMode>("default");

  const value = useMemo<CursorContextValue>(
    () => ({ mode, setCursor: setMode }),
    [mode],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor(): CursorContextValue {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return ctx;
}
