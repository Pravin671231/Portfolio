"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// Server never sets data-theme (it's applied by the inline init script,
// synchronously, before hydration) — "dark" matches that un-hydrated state.
function getServerSnapshot(): Theme {
  return "dark";
}

function setThemeAttribute(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // localStorage unavailable (private browsing, etc.) — theme just won't persist.
  }
  listeners.forEach((listener) => listener());
}

/**
 * Does NOT run the initial dark/light resolution itself — that already
 * happened synchronously, before hydration, via the inline script rendered
 * in layout.tsx (see docs/DESIGN-TOKENS.md "Theming mechanism"). This
 * provider reads the already-set `data-theme` attribute via
 * useSyncExternalStore, which is what lets React correct a server/client
 * snapshot difference during hydration without a mismatch warning.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setThemeAttribute(theme === "light" ? "dark" : "light"),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

/** String constant (no request-time/user data) injected as a raw <script>
 * in layout.tsx, before hydration, to resolve the theme without a flash. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var r=t||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',r);}catch(e){}})();`;
