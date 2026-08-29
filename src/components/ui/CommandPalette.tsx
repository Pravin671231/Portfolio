"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#process", label: "Process" },
  { href: "#github", label: "GitHub" },
  { href: "#journey", label: "Journey" },
  { href: "#certifications", label: "Certifications" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function close() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        close();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  const filtered = LINKS.filter((link) =>
    link.label.toLowerCase().includes(query.toLowerCase()),
  );

  function navigateTo(href: string) {
    router.push(href);
    close();
  }

  return (
    <div
      className="fixed inset-0 flex items-start justify-center bg-bg/80 px-4 pt-[20vh]"
      style={{ zIndex: "var(--z-command-palette)" }}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-lg border border-border bg-bg-elevated shadow-glow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search size={16} className="text-text-faint" aria-hidden />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered[0]) {
                navigateTo(filtered[0].href);
              }
            }}
            placeholder="Jump to a section…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-text-faint"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-text-faint">No matches</li>
          )}
          {filtered.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => navigateTo(link.href)}
                className="block w-full rounded-sm px-3 py-2 text-left text-sm text-text-muted transition-colors hover:bg-bg hover:text-text"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
