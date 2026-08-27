"use client";

import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 border-b transition-colors",
        scrolled
          ? "border-border bg-bg/70 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
      style={{ zIndex: "var(--z-nav)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <span className="font-mono text-sm tracking-widest">PRAVIN K</span>

        <ul className="hidden items-center gap-8 text-sm text-text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-text">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent-blue hover:text-text"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-sm border border-border px-4 py-2 text-sm transition-colors hover:border-accent-blue hover:text-accent-blue md:inline-flex"
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
